import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'

const UserLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { user, setUser } = React.useContext(UserDataContext)

    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userData = {
            email,
            password
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);
        if(response.status === 200){
            const data = response.data;
            setUser(data.data.user);
            console.log(data)
            localStorage.setItem("token", data.data.token);
            console.log("Token set in localStorage: ", localStorage.getItem("token"));
            navigate("/home");
        }
        setEmail("");
        setPassword("");
    }

  return (
    <div className='p-7 bg-[#FEFEFE] h-screen flex flex-col justify-between'>
        <div>
            <img 
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" 
            alt="uber-logo-black"
            className='w-16 mb-10'
            />
            <form onSubmit={e => handleSubmit(e)}>
                <h3 className='text-lg mb-2 font-medium'>What's your email</h3>
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
            <p className='text-center'>New here? <Link to="/signup" className='text-blue-600'>Create new Account</Link></p>
        </div>

        <div>
            <Link to="/captain-login" className='flex items-center justify-center bg-[#10b461] text-white text-lg font-semibold rounded-xl w-full mb-5 py-3 px-5'>Sign in as Captain</Link>
        </div>
    </div>
  )
}

export default UserLogin
