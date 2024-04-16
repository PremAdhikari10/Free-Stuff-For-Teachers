import React, { useEffect, useState, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, ListGroup, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
//npm install leaflet.markercluster
import 'leaflet.markercluster';
import { useLocation } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

function ItemsNearMe() {
  const currentLocation = useLocation();
  const [userLocation, setUserLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [map, setMap] = useState(null); 
  const [itemsNearMe, setItemsNearMe] = useState([]);
  const markerClusterGroup = useRef(null); 
  useEffect(() => {
    if (!navigator.geolocation ) return;

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
  }, [currentLocation]);

  const mapRef = useRef(null);

  useEffect(() => {
    const fetchDataFromFirestore = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'items'));
        const items = [];
        querySnapshot.forEach(doc => {
          // Get the document ID (databaseName)
          const databaseName = doc.id;
          // Get other item details
          const { address, itemName, imageURL } = doc.data();
          // Push item details along with databaseName
          items.push({ databaseName, address, itemName, imageURL });
        });
        setItemsNearMe(items);
      } catch (error) {
        console.error('Error fetching data from Firestore:', error);
      }
    };

    if (!userLocation || !L || mapRef.current !== null) return;

    const mapInstance = L.map('map').setView([userLocation.lat, userLocation.lng], 9); // Set the zoom level here

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

    markerClusterGroup.current = L.markerClusterGroup();
    mapInstance.addLayer(markerClusterGroup.current);

    fetchDataFromFirestore();
  }, [userLocation]);

  useEffect(() => {
    if (!map) return;

    itemsNearMe.forEach(item => {
      const { address, itemName, imageURL, databaseName } = item;
      if (address) {
        fetchLocationAndAddMarker(address, itemName, imageURL, databaseName);
      }
    });
  }, [map, itemsNearMe]);

  const fetchLocationAndAddMarker = async (address, itemName, imageURL, databaseName) => {
    try {
      const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=b4308f04963a43c69e7ff49ffa81ec64&countrycode=us`);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        const icon = L.divIcon({
          className: 'custom-marker',
          html: `<img src="${imageURL}" alt="${itemName}" style="width: 50px; height: 50px;">`,
          iconSize: [50, 50],
          iconAnchor: [25, 50]
        });
        const marker = L.marker([lat, lng], { icon }).bindPopup(`<a href="/view-details/${databaseName}">${itemName}</a>`);
        markerClusterGroup.current.addLayer(marker); // Add marker to the cluster group
      } else {
        console.error('Location not found for address:', address);
      }
    } catch (error) {
      console.error('Error fetching location for address:', address, error);
    }
  };
  

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
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <div id="map" style={{ width: '100%', height: 'calc(100% - 50px)' }}></div>
      <div className="position-fixed bottom-0 start-50 translate-middle-x p-3 bg-light" style={{ zIndex: 1000 }}>
        <div className="d-flex align-items-center mb-2">
          <Form.Control
            type="text"
            placeholder="Search location (include state)"
            value={searchQuery}
            onChange={handleInputChange}
            style={{ width: '100%', maxWidth: '300px', fontSize: '1.1rem' }}
          />
          <Button onClick={handleSearch} className="ms-2"><FaSearch /></Button>
        </div>
        <ListGroup style={{ maxHeight: '200px', overflowY: 'auto', width: '100%', maxWidth: '300px' }}>
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
