import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <div className='bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1619059558110-c45be64b73ae?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dHJhZmZpYyUyMGxpZ2h0fGVufDB8fDB8fHww)] flex flex-col justify-between pt-8 h-screen w-full'>
        <img 
            src="https://freelogopng.com/images/all_img/1659768779uber-logo-white.png" 
            alt="uber-logo-white"
            className='w-16 ml-8'
        />
        <div className='bg-white pb-7 py-4 px-4'>
            <h2 className='text-3xl font-bold'>Get Started with Uber</h2>
            <Link to="/login" className='flex items-center justify-center w-full bg-black text-white font-semibold py-3 mt-5 rounded'>Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Home
