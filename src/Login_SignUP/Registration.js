import { useState } from "react";
import {IoEyeOff, IoEye} from "react-icons/io5";
import { Link } from "react-router-dom";
import {
  MDBRadio
}
from 'mdb-react-ui-kit';

export default function Registration() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;
  function onChange(e) {
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }
  
  return (
      <section className="bg-cyan-100">
          <h1 className="text-3xl text-center mt-6 font-bold">Registration</h1>
          <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
              <div className="md:w-[67%] lg:w-[50%] mb-6 md:mb-3">
                  <img src="https://images.unsplash.com/photo-1603796846097-bee99e4a601f?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                      alt="signing" 
                      className="w-full rounded-2xl"
                  />
              </div>
              <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
                  <form>
                      <input  
                        type="text" 
                        id="name" 
                        value={name} 
                        onChange={onChange} 
                        placeholder="First & Last Name"
                        className="mb-3 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
                      />
                      <input  
                        type="email" 
                        id="email" 
                        value={email} 
                        onChange={onChange} 
                        placeholder="Enter email"
                        className="mb-3 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
                      />
                    <div className="relative mb-3">
                      <input  
                        type={showPassword ? "text" : "password"} 
                        id="password" 
                        value={password} 
                        onChange={onChange} 
                        placeholder="Password"
                        className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
                      />
                      {showPassword ? ( 
                        <IoEyeOff className="absolute right-3 top-3 text-xl cursor-pointer" 
                        onClick={() => setShowPassword
                        ((prevState) => !prevState)}
                        /> 
                      ) : (
                        <IoEye className="absolute right-3 top-3 text-xl cursor-pointer"
                          onClick={() => setShowPassword
                          ((prevState) => !prevState)} 
                        />
                      )}
                    </div> 
                    <div className='d-flex flex-row align-items-center mb-4 text-xl'>
                      <h6 class="fw-bold mb-0 me-4 text-xl">Role: </h6>
                        <MDBRadio name='inlineRadio'  value='option1' label='Teacher' inline />
                        <MDBRadio name='inlineRadio'  value='option2' label='Donor' inline />
                    </div> 

                    <div className="whitespace-nowrap text-sm sm:text-lg">
                      <p className="mb-3 "> Already have an account? 
                        <Link to="/sign-in" className="text-red-600 hover:text-red-800 transition duration-200 ease-in-out ml-1"> Sign in here </Link>
                      </p>
                    </div>
                  </form>
                  <button className="w-full bg-blue-500 text-white px-4 py-2 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-600 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800" type="submit">
                    Register
                  </button>
              </div>
          </div>
      </section>
  )
}