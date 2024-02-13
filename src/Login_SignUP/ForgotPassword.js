import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  function onChange(e) {
    setEmail(e.target.value);
  }

  async function onSubmit(e){
    e.preventDefault()
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      toast.success("Email sent")
    } catch (error) {
      toast.error("Reset Password Failed")
    }
  }
  
  return (
      <section className="bg-cyan-100">
          <h1 className="text-3xl text-center mt-6 font-bold">Forgot Password</h1>
          <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
              <div className="md:w-[67%] lg:w-[50%] mb-6 md:mb-3">
                  <img src="https://images.unsplash.com/photo-1603796846097-bee99e4a601f?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                      alt="signing" 
                      className="w-full rounded-2xl"
                  />
              </div>
              <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
                  <form onSubmit={onSubmit}>
                      <input  
                        type="email" 
                        id="email" 
                        value={email} 
                        onChange={onChange} 
                        placeholder="Enter email"
                        className="mb-3 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
                      />
                    <div className="whitespace-nowrap text-sm sm:text-lg">
                      <p className="mb-3 ">Don't have an account? 
                        <Link to="/registration" className="text-red-600 hover:text-red-800 transition duration-200 ease-in-out ml-1"> Register here </Link>
                      </p>
                      <p> Already have an account? 
                        <Link to="/sign-in" className="text-blue-500 hover:text-blue-700 transition duration-200 ease-in-out ml-1">Sign in?</Link>
                      </p>
                    </div>
                    <button className="w-full bg-blue-500 text-white px-4 py-2 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-600 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800" type="submit">
                      Send to email
                    </button>
                  </form>
              </div>
          </div>
      </section>
  )
  
}
