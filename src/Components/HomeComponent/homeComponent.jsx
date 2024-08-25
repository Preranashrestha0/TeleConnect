import React from 'react'
import Logo from '../NavBarComponent/logo2.png'

const Home = () => {
  return (
    <div className="relative z-10 flex flex-row w-screen h-screen">
      <img
        src="https://trembit.com/blog/wp-content/uploads/2022/04/3.png"
        alt="Background"
        className="w-1/2 h-full object-cover "
      />
       <div className="w-1/2 flex flex-col items-center bg-[#567fbf] justify-start pt-44 pb-10">
        <img className='h-44 w-56' src={Logo} alt='logo'/>
        <p className="text-7xl mx-10 text-center font-bold text-white font-serif">TeleConnect</p>
        <p className="mx-10 text-center text-white my-2 font-extralight">Online Health Consultation Platform</p>
        <p className="text-2xl mx-10 text-center font-bold text-white font-serif">"All Your Medical Needs in One Place"</p>

        {/* <p className="text-xl text-center w-1/2 font-bold text-white">
          TeleConnect is an online platform that connects patients with health care providers for virtual consultations
          and follow-ups. Patients can access medical records securely, and receive prescriptions, all from the comfort of
          their homes. This not only improves convenience but also reduces costs associated with travel and time spent
          waiting at clinics. By eliminating geographical barriers and offering convenient options for medical care,
          telehealth has significantly enhanced accessibility, efficiency, and patient outcomes in the healthcare industry.
        </p> */}
        {/* <button className='bg-blue-700 text-white font-bold py-2 px-4 rounded-xl m-2'>
          Learn More
        </button> */}
      </div>
    </div>
  );
}

export default Home;
