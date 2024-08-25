import React from 'react'
import Logo from './logo2.png'

import { Link } from 'react-router-dom';

const Navbar = () => {

  return (
    <>
    <div className=' absolute top-0 left-0 right-0 z-20 flex h-14 rounded-xl justify-between px-3'>
            
            <div>
                {/* Logo */}
                <img className='h-16 w-20' src={Logo} alt='logo'/>
                
            </div>
            <div className='flex gap-10 m-3 font-bold text-white text-xl'>
                <Link to='/'>Home</Link>
                <Link to='/contactUs'>Contact Us </Link>
                <div>Services</div>
            </div>
            <div className='p-4 '>
            <Link to="/login" className="py-2 px-2 m-2 font-medium text-white bg-blue-700 rounded-xl hover:bg-blue-200 transition duration-300">Log In</Link>
            <Link to="/signUp" className="py-2 px-2 m-2 font-medium text-white bg-blue-700 rounded-xl hover:bg-blue-200 transition duration-300">SIgn Up</Link>
            </div>
        </div>
    
  </>
    
  )
}

export default Navbar
