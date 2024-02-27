import React, { useEffect, useState, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, ListGroup, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

function ItemsNearMe() {
  const [userLocation, setUserLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation || !L) return;

    navigator.geolocation.getCurrentPosition(
      position => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      error => {
        console.error('Error getting user location:', error);
      }
    );
  }, []);

  useEffect(() => {
    if (!userLocation || !L || !map) return;

    map.setView([userLocation.lat, userLocation.lng], 13);

  }, [userLocation, map]);

  const mapRef = useRef(null);

  useEffect(() => {
    const fetchDataFromFirestore = async () => {
      try {
        const q = query(collection(db, 'items'));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const item = doc.data();
          const { address, itemName } = item;
          if (address) {
            fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=b4308f04963a43c69e7ff49ffa81ec64&countrycode=us`)
              .then(response => response.json())
              .then(data => {
                if (data && data.results && data.results.length > 0) {
                  const { lat, lng } = data.results[0].geometry;
                  L.marker([lat, lng]).addTo(map).bindPopup(itemName);
                }
              })
              .catch(error => {
                console.error('Error fetching item location:', error);
              });
          }
        });
      } catch (error) {
        console.error('Error fetching data from Firestore:', error);
      }
    };

    if (!userLocation || !L || mapRef.current !== null) return;

    const mapInstance = L.map('map').setView([userLocation.lat, userLocation.lng], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mapInstance);

    mapInstance.setMaxBounds([
      [24.396308, -125.0],
      [49.384358, -66.93457]
    ]);

    mapInstance.on('drag', function () {
      mapInstance.panInsideBounds([
        [24.396308, -125.0],
        [49.384358, -66.93457]
      ], { animate: false });
    });

    mapRef.current = mapInstance;
    setMap(mapInstance);

    fetchDataFromFirestore();
  }, [userLocation, map]);

  const handleSearch = () => {
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(searchQuery)}&key=b4308f04963a43c69e7ff49ffa81ec64&countrycode=us`)
      .then(response => response.json())
      .then(data => {
        if (data && data.results && data.results.length > 0) {
          const city = data.results[0].components.city || '';
          const state = data.results[0].components.state || '';
          setSearchResults([`${city}, ${state}`]);
          map.setView([parseFloat(data.results[0].geometry.lat), parseFloat(data.results[0].geometry.lng)], 13);
        } else {
          setSearchResults([]);
          alert('Location not found!');
        }
      })
      .catch(error => {
        console.error('Error searching location:', error);
        setSearchResults([]);
        alert('Error searching location. Please try again.');
      });
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
    if (event.target.value.length > 2) {
      fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(event.target.value)}&key=b4308f04963a43c69e7ff49ffa81ec64&countrycode=us`)
        .then(response => response.json())
        .then(data => {
          if (data && data.results && data.results.length > 0) {
            setSearchResults(data.results
              .filter(result => result.components.city && result.components.state)
              .map(result => {
                const city = result.components.city;
                const state = result.components.state;
                return `${city}, ${state}`;
              }));
          } else {
            setSearchResults([]);
          }
        })
        .catch(error => {
          console.error('Error fetching suggestions:', error);
          setSearchResults([]);
        });
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectSuggestion = (selectedSuggestion) => {
    setSearchQuery(selectedSuggestion);
    setSearchResults([]);
  };

  return (
    <div style={{ position: 'relative' }}>
      <div id="map" style={{ width: '100%', height: 'calc(100vh - 50px)' }}></div>
      <div className="position-fixed top-20 end-0 p-3 bg-light" style={{ zIndex: 1000 }}>
        <div className="d-flex align-items-center mb-2">
          <Form.Control
            type="text"
            placeholder="Search location (include state)"
            value={searchQuery}
            onChange={handleInputChange}
            style={{ width: '300px', fontSize: '1.1rem' }}
          />
          <Button onClick={handleSearch} className="ms-2"><FaSearch /></Button>
        </div>
        <ListGroup style={{ maxHeight: '200px', overflowY: 'auto', width: '300px' }}>
          {searchResults.map((result, index) => (
            <ListGroup.Item key={index} action onClick={() => handleSelectSuggestion(result)}>
              {result}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
}

export default ItemsNearMe;
