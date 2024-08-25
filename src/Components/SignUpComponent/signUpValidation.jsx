import React, { useState } from "react";

const SignUpValidation = () => {
const [formValues, setFormValues] = useState({ name: "", email: "", phoneNum: "", address: "", gender: [], password: "" });
const [errors, setErrors] = useState({});

const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
    setFormValues((prevValues) => {
        const newGender = checked
        ? [...prevValues.gender, value]
        : prevValues.gender.filter((gender) => gender !== value);
        return { ...prevValues, gender: newGender };
    });
    } else {
    setFormValues({ ...formValues, [name]: value });
    }
};

const validate = () => {
    let tempErrors = {};
    if (!formValues.name) tempErrors.name = "Name is required";
    if (!formValues.email) {
    tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
    tempErrors.email = "Email is invalid";
    }
    if (!formValues.phoneNum) tempErrors.phoneNum = "Phone Number is required";
    if (!formValues.address) tempErrors.address = "Address is required";
    if (formValues.gender.length === 0) tempErrors.gender = "Gender is required";
    if (!formValues.password) tempErrors.password = "Password is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
};

const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
    console.log("Form submitted successfully");
    alert("Form submitted successfully");
    setFormValues({ name: "", email: "", phoneNum: "", address: "", gender: [], password: "" });
    }
};

return (
    <div className="flex justify-center items-center w-screen h-screen bg-blue-900">
    <form onSubmit={handleSubmit} className="bg-blue-100 p-8 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
        <h1 className="font-bold text-2xl text-center mb-8">Sign Up</h1>

        <div className="w-full">
        <label htmlFor="name" className="text-lg font-semibold block">Name:</label>
        <input
            className="border border-gray-300 p-2 rounded-lg w-full"
            type="text"
            id="name"
            name="name"
            value={formValues.name}
            onChange={handleChange}
        />
        {errors.name && <p className="text-red-500 mt-2">{errors.name}</p>}
        </div>

        <div className="w-full">
        <label htmlFor="email" className="text-lg font-semibold block">Email:</label>
        <input
            className="border border-gray-300 p-2 rounded-lg w-full"
            type="email"
            id="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
        />
        {errors.email && <p className="text-red-500 mt-2">{errors.email}</p>}
        </div>

        <div className=" w-full">
        <label htmlFor="phoneNum" className="text-lg font-semibold block">Phone Number:</label>
        <input
            className="border border-gray-300 p-2 rounded-lg w-full"
            type="text"
            id="phoneNum"
            name="phoneNum"
            value={formValues.phoneNum}
            onChange={handleChange}
        />
        {errors.phoneNum && <p className="text-red-500 mt-2">{errors.phoneNum}</p>}
        </div>

        <div className=" w-full">
        <label htmlFor="address" className="text-lg font-semibold block">Address:</label>
        <input
            className="border border-gray-300 p-2 rounded-lg w-full"
            type="text"
            id="address"
            name="address"
            value={formValues.address}
            onChange={handleChange}
        />
        {errors.address && <p className="text-red-500 mt-2">{errors.address}</p>}
        </div>

        <div className=" w-full">
        <label className="text-lg font-semibold block">Gender:</label>
        <div className="flex items-center space-x-4">
            <div className="flex items-center">
            <input
                className="mr-2"
                type="checkbox"
                id="male"
                name="gender"
                value="Male"
                checked={formValues.gender.includes("Male")}
                onChange={handleChange}
            />
            <label htmlFor="male">Male</label>
            </div>
            <div className="flex items-center">
            <input
                className="mr-2"
                type="checkbox"
                id="female"
                name="gender"
                value="Female"
                checked={formValues.gender.includes("Female")}
                onChange={handleChange}
            />
            <label htmlFor="female">Female</label>
            </div>
            <div className="flex items-center">
            <input
                className="mr-2"
                type="checkbox"
                id="other"
                name="gender"
                value="Other"
                checked={formValues.gender.includes("Other")}
                onChange={handleChange}
            />
            <label htmlFor="other">Other</label>
            </div>
        </div>
        {errors.gender && <p className="text-red-500 mt-2">{errors.gender}</p>}
        </div>

        <div className="w-full">
        <label htmlFor="password" className="text-lg font-semibold block ">Password:</label>
        <input
            className="border border-gray-300 p-2 rounded-lg w-full"
            type="password"
            id="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
        />
        {errors.password && <p className="text-red-500 mt-2">{errors.password}</p>}
        </div>

        <button
        className="w-full bg-blue-600 mt-5 text-white py-3 rounded-lg font-bold hover:bg-blue-700"
        type="submit"
        >
        Submit
        </button>
    </form>
    </div>
);
};

export default SignUpValidation;
