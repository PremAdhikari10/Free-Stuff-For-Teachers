import React, { useState } from 'react';
import {
  MDBInput,MDBBtn
}from 'mdb-react-ui-kit';

export default function AddItems() {
  function onChange() { }
  const [formData, setFormData] = useState({
    type: "rent",
    name: ""
  });
  const { type, name } = formData;
  return (
    <main className="max-w-md px-2 mx-auto ">
      <h1 className="text-3xl text-center mt-6 font-bold ">Add Item</h1>
      <form>
        <p className="text-lg mt-6 font-semibold"> Category </p>
        <div className="flex">
          <button
            type="button"
            id="type"
            value="utensil"
            onClick={onChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${type === "rent" ? "bg-white text-black" : "bg-slate-600 text-white"
              }`}
          >
            Writing utensils
          </button>

          <button
            type="button"
            id="type"
            value="electronics"
            onClick={onChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${type === "rent" ? "bg-white text-black" : "bg-slate-600 text-white"
              }`}
          >
            Electronics
          </button>

          <button
            type="button"
            id="type"
            value="cleaning_supplies"
            onClick={onChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${type === "rent" ? "bg-white text-black" : "bg-slate-600 text-white"
              }`}
          >
            Cleaning Supplies
          </button>

          <button
            type="button"
            id="type"
            value="furniture"
            onClick={onChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${type === "rent" ? "bg-white text-black" : "bg-slate-600 text-white"
              }`}
          >
            Furniture
          </button>
        </div>
        <p className="text-lg mt-6 font-semibold"> Item Name </p>
        <MDBInput wrapperClass='mb-4 w-100'
         label='Name' id='formControlLg' 
         type='item_name' size="lg" />

        <div className='flex space-x-9'>
          <div>
            <p className="text-lg mt-6 font-semibold"> Quantity </p>
            <MDBInput wrapperClass='mb-4 w-25'
              label='qty'
              id='formControlLg'
              type='qty'
              size="lg" />
          </div>
          <div>
            <p className="text-lg mt-6 font-semibold"> Donor Name </p>
            <MDBInput wrapperClass='mb-4 w-200' label='Donor Name' 
            id='formControlLg' 
            type='donor_name'
            size="lg" />
          </div>
        </div>

        <p className="text-lg mt-6 font-semibold"> Donor's Address </p>
        <MDBInput wrapperClass='mb-4 w-100' 
        style={{ height: '70px'}} 
        label='Address' 
        id='formControlLg' 
        type='address' 
        size="lg" />

        <p className="text-lg mt-6 font-semibold"> Phone Number </p>
        <MDBInput wrapperClass='mb-4 w-100' 
        label='Phone Number' 
        id='formControlLg' 
        type='phone_number' 
        size="lg" />
          
        <p className="text-lg mt-6 font-semibold"> Description </p>
        <textarea className='mb-4 form-control' label= 'Description' 
        style={{ height: '150px', width: '500px' }} id='formControlLg' />

        <div className="mb-6">
              <p className='texr-lg font-semibold'>Images</p>
              <p>The first image will be the cover (max 6)</p>
              <input type="file"
              id="images"
              accept=".jpg,.png,.jpeg"
              multiple 
              required
              className="w-full px-3 py-1.5 text-gray-700
              bg-white border border-gray-300 rounded 
              transition duration-150 ease-in-out
              focus:bg-white focus:border-slate-600"/>
        </div>
        <button type="submit" className="mb-6 w-full px-7
        py-3 bg-blue-600 text-white font-medium text-sm 
        uppercase rounded shadow-md hover:bg-blue-700 focus:shadow-lg active: bg-blue-800 active:shadow-lg 
        transition duration-150 ease-in-out">Add Item</button>
      </form>
    </main>

  )
}