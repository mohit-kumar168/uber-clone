import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainLogin = () => {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    const [captainData, setCaptainData] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "email") {
            setemail(value);
        } else if (name === "password") {
            setpassword(value);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setCaptainData({
            email,
            password
        })
        setemail("");
        setpassword("");
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
                <h3 className='text-lg mb-2 font-medium'>What's our Captain's email</h3>
                <input 
                    required
                    value={email}
                    onChange={handleChange}
                    type="email" 
                    name="email" 
                    id="email"
                    placeholder="email@example.com"
                    className='bg-[#EDEDED] rounded-xl text-lg placeholder:text-base py-3 px-5 mb-7 w-full'
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
                    className='bg-[#EDEDED] rounded-xl text-lg placeholder:text-base py-3 px-5 mb-7 w-full'
                />

                <button className='bg-black text-white text-lg font-semibold rounded-xl w-full py-3 px-5 mb-5'>Login</button>
            </form>
            <p className='text-center'>Join a fleet? <Link to="/captain-signup" className='text-blue-600'>Register as a Captain</Link></p>
        </div>

        <div>
            <Link to="/login" className='flex items-center justify-center bg-[#d5622d] text-white text-lg font-semibold rounded-xl w-full mb-5 py-3 px-5'>Sign in as User</Link>
        </div>
    </div>
  )
}

export default CaptainLogin
