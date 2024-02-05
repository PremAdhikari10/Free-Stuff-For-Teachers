import React, { useState } from 'react'; 

export default function AddItems() {
    function onChange() {}
      const [formData, setFormData] = useState({
        type: "rent",
      });
      const { type } = formData;
  return (
    <main className="max-w-md px-2 mx-auto">
        <h1 className="text-3xl text-center mt-6 font-bold ">Add Item</h1>
        <form>
            <p className="text-lg mt-6 font-semibold"> Category </p>
            <div className="flex">
                <button 
                  type="button" 
                  id="type" 
                  value="utensil" 
                  onClick={onChange} 
                  className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                    type === "rent" ? "bg-white text-black" : "bg-slate-600 text-white"
                }`}
                >
                    writing utensils
                </button>
                <button type="button" id="type" value="utensil" onClick={onChange} className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                  type === "rent" ? "bg-white text-black" : "bg-slate-600 text-white"
                }`}
                >
                    Electronics
                </button>
            </div>
        </form>
    </main>    
      
  )
}