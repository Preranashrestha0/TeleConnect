import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  address: Yup.string().required('Address is required'),
  gender: Yup.string().required('Gender is required'),
  phoneNum: Yup.string().required('Phone NUmber is required'),
  password: Yup.string().required("Password is required")
});
const SignUp = () => {
    const formik = useFormik({
        initialValues: {
          name: '',
          email: '',
          address:'',
          gender: '',
          phoneNum: '',
          password: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
          console.log('Form submitted successfully', values);
        },
      });
  return (
    <form onSubmit={formik.handleSubmit}>
    <div>
      <label>Name</label>
      <input
        type="text"
        name="name"
        value={formik.values.username}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.name && formik.errors.name && <p>{formik.errors.name}</p>}
    </div>
    <div>
      <label>Email</label>
      <input
        type="email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.email && formik.errors.email && <p>{formik.errors.email}</p>}
    </div>
    <div>
      <label>Phone Number</label>
      <input
        type="text"
        name="phoneNum"
        value={formik.values.phoneNum}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.phoneNum && formik.errors.phoneNum && <p>{formik.errors.phoneNum}</p>}
    </div>
    <div>
      <label>Address</label>
      <input
        type="text"
        name="address"
        value={formik.values.address}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.address && formik.errors.address && <p>{formik.errors.address}</p>}
    </div>
    <div>
      <label>Gender</label>
      <input
        type="text"
        name="gender"
        value={formik.values.gender}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.gender && formik.errors.gender && <p>{formik.errors.gender}</p>}
    </div>
    <div>
      <label>Password</label>
      <input
        type="password"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.password && formik.errors.password && <p>{formik.errors.password}</p>}
    </div>
    <button type="submit">Submit</button>
  </form>
  )
}

export default SignUp