// npm install formik yup

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
});

const Form = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
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
          value={formik.values.name}
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
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;