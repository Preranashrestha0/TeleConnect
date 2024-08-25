// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axiosInstance from '../../config/axiosConfig';
// import { toast } from 'react-toastify';

// const EditDoctor = () => {
//   const { doctorId } = useParams();
//   const [doctor, setDoctor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchDoctor = async () => {
//       try {
//         const response = await axiosInstance.get(`/api/get/${doctorId}`);
//         setDoctor(response.data.doctor);
//       } catch (error) {
//         console.error('Error fetching doctor:', error.response ? error.response.data : error.message);
//         setError('Error fetching doctor');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDoctor();
//   }, [doctorId]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setDoctor(prevDoctor => ({
//       ...prevDoctor,
//       profileImage: e.target.files[0],
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axiosInstance.put(`/api/update/${doctorId}`, {
//         userData: {
//           name: doctor.name,
//           email: doctor.email,
//           speciality: doctor.speciality,
//           experience: doctor.experience,
//           qualification: doctor.qualification
//         },
//         profileData: {
//           bio: doctor.bio,
//           age: doctor.age,
//           gender: doctor.gender,
//           profilePicture: doctor.profileImage,
//           phone: doctor.contact?.phone,
//           address: doctor.contact?.address,
//         }
//       });
//       toast.success("DOctor profile data updated")
//       console.log("Doctor data updated")
//       // navigate('/doctor/list'); // Redirect to doctor list after successful update
//     } catch (error) {
//       console.error('Error updating doctor:', error.response ? error.response.data : error.message);
//       setError('Error updating doctor');
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div>
//       <h1 className='font-serif text-2xl text-center font-bold py-5'>Update Doctor</h1>
//       <form onSubmit={handleSubmit} className='bg-[#567fbf]'>
//       <div className="mb-4">
//         <label className="block mx-5 text-white text-sm font-bold mb-2">
//           Profile Picture:
//         </label>
//         <input
//           type="file"
//           name="profileImage"
//           onChange={handleInputChange}
//           required
//           className="rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
//         />
//       </div>
//         <div className='text-white px-5 py-5 text-xl'>
//           <label> Full Name:</label>
//           <input className='rounded mx-5 text-black font-bold px-2' type="text" name="name" value={doctor.name} onChange={handleInputChange} />
//         </div>
//         <div className='text-white px-5 py-5 text-xl'>
//           <label>Age:</label>
//           <input className='rounded mx-5 text-black font-bold px-2' type="text" name="age" value={doctor.age} onChange={handleInputChange} />
//         </div>
//         <div className='text-white px-5 py-5 text-xl'>
//           <label>Email:</label>
//           <input className='rounded mx-5 text-black font-bold px-2' type="email" name="email" value={doctor.email} onChange={handleInputChange} />
//         </div>
//         <div className='text-white px-5 py-5 text-xl'>
//           <label>Phone:</label>
//           <input className='rounded mx-5 text-black font-bold px-2' type="text" name="phone" value={doctor.contact?.phone} onChange={handleInputChange} />
//         </div>
//         <div className='text-white px-5 py-5 text-xl'>
//           <label>Address:</label>
//           <input className='rounded mx-5 text-black font-bold px-2' type="text" name="address" value={doctor.contact?.address} onChange={handleInputChange} />
//         </div>
//         <div className='text-white px-5 py-5 text-xl'>
//           <label>Gender:</label>
//           <input className='rounded mx-5 text-black font-bold px-2' type="text" name="gender" value={doctor.gender } onChange={handleInputChange} />
//         </div>
//         <div className='text-white px-5 py-5 text-xl'>
//           <label>Speciality:</label>
//           <input className='rounded mx-5 text-black font-bold px-2' type="text" name="speciality" value={doctor.speciality } onChange={handleInputChange} />
//         </div>
//         <button type="submit">Save</button>
//       </form>
//     </div>
//   );
// };

// export default EditDoctor;


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../config/axiosConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditDoctor = () => {
  const { doctorId } = useParams();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    speciality: "",
    experience: "",
    qualification: "",
    bio: "",
    age: 0,
    gender: "",
    profileImage: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axiosInstance.get(`/api/doctor/get/${doctorId}`);
        const { userData, profileData } = response.data;
  
        setFormData({
          email: userData.email,
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          speciality: profileData.speciality,
          experience: profileData.experience,
          qualification: profileData.qualification,
          bio: profileData.bio,
          age: profileData.age,
          gender: profileData.gender,
          phone: profileData.contact.phone,
          address: profileData.contact.address,
          profileImage: profileData.profileImage, // Assuming profileImage is a URL or file object
        });
      } catch (error) {
        console.error('Error fetching doctor:', error.response ? error.response.data : error.message);
        setError('Error fetching doctor');
      } finally {
        setLoading(false);
      }
    };
  
    fetchDoctor();
  }, [doctorId]);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profileImage: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = new FormData();
    data.append("firstName", formData.firstName);
    data.append("lastName", formData.lastName);
    data.append("email", formData.email);
    data.append("speciality", formData.speciality);
    data.append("experience", formData.experience);
    data.append("qualification", formData.qualification);
    data.append("bio", formData.bio);
    data.append("age", formData.age);
    data.append("gender", formData.gender);
    data.append("phone", formData.phone);
    data.append("address", formData.address);
    data.append("profileImage", formData.profileImage);

    try {
      const response = await axiosInstance.put(`/api/doctor/update/${doctorId}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Doctor profile updated successfully!");
      console.log("Doctor data updated:", response.data);
      navigate('/admin/doctor/list'); // Redirect to doctor list after successful update
    } catch (error) {
      console.error('Error updating doctor:', error.response ? error.response.data : error.message);
      toast.error('Error updating doctor');
    }
  };


  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1 className="font-serif text-2xl text-center font-bold py-5">Update Doctor</h1>
      <form onSubmit={handleSubmit} className="bg-[#567fbf] p-8 rounded-lg shadow-lg max-w-xl mx-auto">
        <ToastContainer />
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">Profile Picture:</label>
          <input
            type="file"
            name="profileImage"
            onChange={handleFileChange}
            className="rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      <div className='flex flex-row mb-2 gap-5 w-full'>
      <div className='w-full'>
        <label className='block text-white text-sm font-bold mb-2'>First Name: </label>
        <input
         type="text"
         name="firstName"
         value={formData.firstName}
         onChange={handleInputChange}
         className="rounded w-full py-2 px-2 font-bold text-black leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className='w-full' >
        <label className='block text-white text-sm font-bold mb-2'>Last Name: </label>
        <input
         type="text"
         name="lastName"
         value={formData.lastName}
         onChange={handleInputChange}
         className="rounded w-full py-2 px-2 font-bold text-black leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            required
            className="rounded w-full py-2 px-3 text-black font-bold leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="rounded w-full py-2 px-3 text-black font-bold leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            className="rounded w-full py-2 px-3 text-black font-bold leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
            className="rounded w-full py-2 px-3 text-black font-bold leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">Gender:</label>
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
            className="rounded w-full py-2 px-3 text-black font-bold leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">Speciality:</label>
          <input
            type="text"
            name="speciality"
            value={formData.speciality}
            onChange={handleInputChange}
            required
            className="rounded w-full py-2 px-3 text-black font-bold leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">Experience:</label>
          <input
            type="text"
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            required
            className="rounded w-full py-2 px-3 text-black font-bold leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">Qualification:</label>
          <input
            type="text"
            name="qualification"
            value={formData.qualification}
            onChange={handleInputChange}
            required
            className="rounded w-full py-2 px-3 text-black font-bold leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">Bio:</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            required
            className="rounded w-full py-2 px-3 text-black font-bold leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save    
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDoctor;
