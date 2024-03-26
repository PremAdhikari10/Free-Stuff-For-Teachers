import { useState } from "react";
import { IoEyeOff, IoEye } from "react-icons/io5";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
import {MDBRadio} from 'mdb-react-ui-kit';
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Registration() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")

  // const [formData, setFormData] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  // });

  // const { name, email, password } = formData;
  const navigate = useNavigate();
  // function onChange(e) {
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [e.target.id]: e.target.value,
  //   }))
  // }

  const onSubmit = async(e)=> {
   
    e.preventDefault()

    const emailPattern = /^[\w.-]+@(gmail\.com|hotmail\.com|yahoo\.com|outlook\.com)$/i;
    if (name === "") {
      toast.error("Please enter Name")
      e.preventDefault()
    }

    else if (!emailPattern.test(email)) {

      toast.error("Please enter valid email");
      e.preventDefault();

    }


    else if (password === "") {
      toast.error("Password cannot be empty");
      e.preventDefault()
    }
    else {
      if (password.length < 8) {
        toast.error("Password should be atleast 8 character long")
        e.preventDefault();
      }

      else if ((password.length < 8)) {

        toast.error("Password should be atleast 8 character long")
        e.preventDefault();
        console.log(role)

        // else if (password.length >= 8) {
        //   if (password !== cPassword) {
        //     toast.error("Password didn't match")
        //     e.preventDefault();
        //   }
        // }
      }
      else if(role==="") {
        toast.error("Please select the role")
      }
      else {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);

          updateProfile(auth.currentUser, {
            displayName: name
          })

          const user = userCredential.user;
          // const formDataCopy = { ...formData };
          // delete formDataCopy.password;
          // formDataCopy.timestamp = serverTimestamp();

          await setDoc(doc(db, "users", user.uid), {
            name: name,
            email: email,
            role: role,    
            timetamp: serverTimestamp(),
            uid: user.uid

          });
          toast.success("User registered")
          navigate("/");
        } catch (error) {
          toast.error(error.code);
        }
      }
    }

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
          <form onSubmit={(e)=>onSubmit(e)}>
            <input
              type="text"

              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="First & Last Name"
              className="mb-3 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
            />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="mb-3 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
            />
            <div className="relative mb-3">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              />
              {/* {showPassword ? (
                <IoEyeOff className="absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={() => setShowPassword
                    ((prevState) => !prevState)}
                />
              ) : (
                <IoEye className="absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={() => setShowPassword
                    ((prevState) => !prevState)}
                />
              )} */}
            </div>
            <div className='d-flex flex-row align-items-center mb-4 text-xl'>
              <h6 className="fw-bold mb-0 me-4 text-xl">Role: </h6>
              <MDBRadio name='inlineRadio' value='Teacher' label='Teacher' onChange={(e)=>setRole(e.target.value)} inline />
              <MDBRadio name='inlineRadio' value='Donor' label='Donor'  onChange={(e)=>setRole(e.target.value)} inline />
            </div>

            <div className="whitespace-nowrap text-sm sm:text-lg">
              <p className="mb-3 "> Already have an account?
                <Link to="/sign-in" className="text-red-600 hover:text-red-800 transition duration-200 ease-in-out ml-1"> Sign in here </Link>
              </p>
            </div>
            <button className="w-full bg-blue-500 text-white px-4 py-2 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-600 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800" 
            type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}