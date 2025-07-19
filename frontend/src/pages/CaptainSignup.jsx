import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainSignup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [captainData, setCaptainData] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        } else if (name === "firstName") {
            setFirstName(value);
        } else if (name === "lastName") {
            setLastName(value);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setCaptainData({
            email,
            password,
            fullName: {
              firstName,
              lastName
            }
        })
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
    }

  return (
    <div className='py-2 px-5 bg-[#FEFEFE] h-screen flex flex-col justify-between'>
        <div>
            <img 
            src="https://www.svgrepo.com/show/505031/uber-driver.svg" 
            alt="uber-logo-black"
            className='w-20 mb-2'
            />
            <form onSubmit={e => handleSubmit(e)}>
                <h3 className='text-lg mb-2 font-medium'>What's our Captain's name</h3>
                <div className='flex gap-4  mb-5'>
                  <input 
                    required
                    value={firstName}
                    onChange={handleChange}
                    type="text" 
                    name="firstName" 
                    id="firstName"
                    placeholder="First Name"
                    className='bg-[#EDEDED] rounded-xl text-lg placeholder:text-base py-3 px-5 w-1/2'
                  />
                  <input 
                    required
                    value={lastName}
                    onChange={handleChange}
                    type="text" 
                    name="lastName" 
                    id="lastName"
                    placeholder="Last Name"
                    className='bg-[#EDEDED] rounded-xl text-lg placeholder:text-base py-3 px-5 w-1/2'
                />
                </div>
                <h3 className='text-lg mb-2 font-medium'>What's our Captain's email</h3>
                <input 
                    required
                    value={email}
                    onChange={handleChange}
                    type="email" 
                    name="email" 
                    id="email"
                    placeholder="email@example.com"
                    className='bg-[#EDEDED] rounded-xl text-lg placeholder:text-base py-3 px-5 mb-5 w-full'
                />
                <h3 className='text-lg mb-2 font-medium'>Enter password</h3>
                <input 
                    required
                    value={password}
                    onChange={handleChange}
                    type="password" 
                    name="password" 
                    id="password" 
                    placeholder="password"
                    className='bg-[#EDEDED] rounded-xl text-lg placeholder:text-base py-3 px-5 mb-5 w-full'
                />

                <button className='bg-black text-white text-lg font-semibold rounded-xl w-full py-3 px-5 mb-5'>Sign Up</button>
            </form>
            <p className='text-center'>Already a captain? <Link to="/captain-login" className='text-blue-600'>Login here</Link></p>
        </div>

        <div>
          <p className='text-center text-xs leading-tight'>By signing up, you agree to our <span className='text-blue-500'>Terms of Service</span> and <span className='text-blue-500'>Privacy Policy</span>.</p>
        </div>
    </div>
  )
}

export default CaptainSignup
