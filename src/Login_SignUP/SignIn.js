import { useState } from "react";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  function onChange(e) {
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }
  
  return (
      <section className="bg-cyan-100">
          <h1 className="text-3xl text-center mt-6 font-bold">Sign In</h1>
          <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
              <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
                  <img src="https://images.unsplash.com/photo-1603796846097-bee99e4a601f?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                      alt="signing" 
                      className="w-full rounded-2xl"
                  />
              </div>
              <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
                  <form>
                      <input 
                        className="w-full" 
                        type="email" 
                        id="email" 
                        value={email} 
                        onChange={onChange} 
                        placeholder="Enter email"
                        //className=""
                      />
                  </form>
              </div>
          </div>
      </section>
  )
}