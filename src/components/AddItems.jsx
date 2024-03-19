import React, { useEffect, useState } from 'react';
import { MDBInput } from 'mdb-react-ui-kit';
import Form from 'react-bootstrap/Form';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Spinner from 'react-bootstrap/Spinner';
import { auth, db, storage } from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';


export default function AddItems() {
  const navigate = useNavigate()
  const [category, setCategory] = useState("")
  const [itemName, setItemName] = useState("")
  const [quantity, setQuantity] = useState("")
  const [donorName, setDonorName] = useState("")
  const [address, setAddress] = useState("")
  const [description, setDescription] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [image, setImage] = useState("")
  const [currentUser, setCurrentUser] = useState(null)
  const [isSpinner, setIsSpinner] = useState(false)
  const [progressBar, setProgress] = useState(0)
  const [geolocationEnabled, setGeolocationEnabled] = useState(true)
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        setCurrentUser(user);

      } else {
        // User is signed out.
        setCurrentUser(null);
      }
    }, []);

    // Cleanup function
    return () => unsubscribe();
  }, [])

  const handleEvent = async (e) => {
    setIsSpinner(true)


    console.log(itemName, category, quantity, address, description, phoneNumber, image)

    if (itemName === "" ||category==="" || donorName==="" || quantity===""|| address===""||description===""||phoneNumber==="") {
      toast.error("Please complete all the input field")
      setIsSpinner(false);
      return;
    }
    // else if(phoneNumber!==10){
    //   toast.error("Please enter valid Phone Number");
    //   setIsSpinner(false);
    //   return;
    // }
    else if (image === "") {
      toast.error("Upload an image");
      setIsSpinner(false);
      return;
    }
    else {
      var uid = await uuidv4()
      const storageRef = ref(storage, uid);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on('state_changed',
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress)
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          toast.error("Something went wrong")
          setIsSpinner(false);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            try {
              await setDoc(doc(db, "items", uid), {
                category: category,
                itemName: itemName,
                quantity: quantity,
                donorName: auth.currentUser.displayName,
                address: address,
                phoneNumber: phoneNumber,
                description: description,
                imageURL: downloadURL,
                latitude:latitude,
                longitude:longitude,
                databaseName: uid,
                userRef: auth.currentUser.uid
              })
              toast.success("Item added sucessfully!!")


              setCategory("")
              setAddress("")
              setItemName("")
              setDescription("")
              setQuantity("")
              setPhoneNumber("")
              setImage("")
              setLatitude("")
              setLongitude("")
              navigate("/viewitems")
            }

            catch (error) {
              toast.error(error.message)
              setIsSpinner(false)
            }

          });

        }
      );
    }

    e.preventDefault()
  }

  



  return (
    <main className="max-w-md px-2 mx-auto ">
      <h1 className="text-3xl text-center mt-6 font-bold ">Add Item</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <p className="text-lg mt-6 font-semibold"> Category </p>
        <div className="flex">


          <Form.Select aria-label="Default select example"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option

            >Select a Category</option>
            <option value="Writing Utensils">Writing Utensils</option>
            <option value="Furniture">Furniture</option>
            <option value="Cleaning Supplies">Cleaning Supplies</option>
            <option value="Electronics">Electronics</option>
          </Form.Select>


        </div>
        <p className="text-lg mt-6 font-semibold"> Item Name </p>
        <MDBInput wrapperClass='mb-4 w-100'
          value={itemName}
          label='Item Name' id='item_name'
          type='item_name' size="lg"
          onChange={(e) => setItemName(e.target.value)} />

        <div className='flex space-x-9'>
          <div>
            <p className="text-lg mt-6 font-semibold"> Quantity </p>
            <MDBInput wrapperClass='mb-4 w-28'
              label='qty'
              id='quantity'
              type='number'
              size="lg"
              value={quantity}
              min='1'
              max='500'
              onChange={(e) => setQuantity(e.target.value)}
            />

          </div>
          <div>
            <p className="text-lg mt-6 font-semibold"> Donor Name </p>
            <MDBInput wrapperClass='mb-4 w-200'
              label='Donor Name'
              id='donor_name'
              type='donor_name'
              size="lg"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
            />
          </div>
        </div>

        <p className="text-lg mt-6 font-semibold"> Donor's Address </p>
        <MDBInput wrapperClass='mb-4 w-100'
          style={{ height: '70px' }}
          label='Address'
          id='address'
          type='address'
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          size="lg" />

        {!geolocationEnabled && (
          <div className="flex space-x-6 justify-start mb-6">
            <div className="">
              <p className="text-lg font-semibold">Latitude</p>
              <input type="number"
                id="latitude"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                required
                min="-90"
                max="90"
                className='w-full px-4 py-2 text-xl text-gray-700 
               bg-white border border-gray-300 rounded 
               transition duration-150 ease-in-out
                focus:bg-white focus:text-gray-700 
                focus:border-slate-600 text-center'/>
            </div>
            <div className="">
              <p className="text-lg font-semibold">Longitude</p>
              <input type="number"
                id="longitude"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                required
                min="-180"
                max="180"
                className='w-full px-4 py-2 text-xl text-gray-700 
               bg-white border border-gray-300 rounded 
               transition duration-150 ease-in-out
                focus:bg-white focus:text-gray-700 
                focus:border-slate-600 text-center'/>
            </div>

          </div>
        )}


        <p className="text-lg mt-6 font-semibold"> Phone Number </p>
        <MDBInput wrapperClass='mb-4 w-100'
          label='Phone Number'
          id='phone_number'
          type='phone_number'
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          size="lg" />

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formFileMultiple" className="mb-3">
          <Form.Label>Image Upload</Form.Label>
          <Form.Control type="file"
            accept="image/*"
            capture="camera"
            onChange={(e) => {
              // Handle image upload logic here
              setImage(e.target.files[0]);
            }}
          />
        </Form.Group>
        {
          isSpinner ? (
            <>
              <Spinner animation="border" />
            </>
          ) : (
            <>
            </>
          )
        }

        <button onClick={(e) => handleEvent(e)} className="mb-4 w-full px-7
        py-3 bg-blue-600 text-white font-medium text-sm 
        uppercase rounded shadow-md hover:bg-blue-700 focus:shadow-lg active: bg-blue-800 active:shadow-lg 
        transition duration-150 ease-in-out">Add Item</button>
        {
          isSpinner ? (
            <>
              <ProgressBar now={progressBar} />
            </>
          ) : (
            <>
            </>
          )
        }


      </form>
    </main>

  )
}