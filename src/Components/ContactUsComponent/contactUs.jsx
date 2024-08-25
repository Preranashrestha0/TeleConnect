import React, {useState} from 'react'

const ContactUs = () => {
    const [username, setUsername] = useState('')
  return (
    <div className='bg-[#567fbf] h-screen w-screen flex justify-center items-center'>
      <form className='bg-slate-300 w-fit h-fit p-5 min-w-96 rounded-xl flex flex-col items-center'>
        <h1>{username}</h1>
        <h1 className='font-bold text-3xl text-center m-2 '> Form</h1>
        <div className='w-full flex flex-col items-center '>
          <label className='text-xl font-semibold w-full' htmlFor='username'>Username</label>
          <input onChange={(e) => setUsername(e.target.value)} className='rounded-lg border-2 border-blue-200 p-2 w-full' type='text' id='username' placeholder='enter your username'/>  
        
          <label className='text-xl font-semibold w-full' htmlFor='email'>Email</label> 
          <input onChange={(e) => setUsername(e.target.value)} className='rounded-lg border-2 border-blue-200 p-2 w-full' type='text' id='email' placeholder='enter your Email'/>  
          
          <label className='text-xl font-semibold w-full' htmlFor='phoneNum'>Phone Number</label> 
          <input onChange={(e) => setUsername(e.target.value)} className='rounded-lg border-2 border-blue-200 p-2 w-full' type='text' id='phoneNum' placeholder='enter your Phone Number'/> 
          
          <label className='text-xl font-semibold w-full' htmlFor='message'>Message</label> 
          <input onChange={(e) => setUsername(e.target.value)} className='rounded-lg border-2 border-blue-200 p-2 w-full h-28' type='text' id='message' placeholder='enter your message'/>   

          <button className='bg-blue-900 text-white px-5 py-2 rounded-xl m-5 text-center font-bold'> SUBMIT </button>
        
          </div> 
      </form>
    
    </div>
    
  )
}

export default ContactUs
