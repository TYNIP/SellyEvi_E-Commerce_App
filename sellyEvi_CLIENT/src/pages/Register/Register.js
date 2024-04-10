import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/button/Button';
import Divider from '@mui/material/Divider';
import TextField from '../../components/TextField/TextField';
import './register.css';
import { registerUser } from '../../store/auth/authSlice';

import * as Yup from 'yup';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector(state => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(false);

  // Registration handler
  const handleRegister = async (credentials) => {
    try {
      setIsLoading(true);
      await dispatch(registerUser(credentials));
      setIsLoading(false);
      setErr(false);
      navigate('/login');
    } catch(err) {
      setIsLoading(false);
      setErr(true);
    }
  }

  // Validation schema for registration form
  const specialCharsRegex = /^[a-zA-Z\s]*$/;
  const registrationSchema = Yup.object().shape({
    firstname: Yup.string()
    .required("Name is required")
    .matches(specialCharsRegex, "Name cannot contain special characters")
    .min(4, "Must be at least 4 characters"),

    lastname: Yup.string()
    .required("Last Name is required")
    .matches(specialCharsRegex, "Name cannot contain special characters")
    .min(4, "Must be at least 4 characters"),

    email: Yup.string()
      .email("Invalid email address")
      .required("Email address is required"),

    password: Yup.string()
      .required("Password is required"),

    confirmPassword: Yup.string()
    .required("Password is required")
    .oneOf([Yup.ref('password'), null], "Passwords must match")
  });

  return (
    <div id='register'>
      <div className="form">

          <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={registrationSchema}
            validateOnBlur
            onSubmit={async (data) => {
              const { confirmPassword, ...credentials } = data;
              await handleRegister(credentials);
            }}
          >

            <Form className="baseForm">
            <h1 className="baseFormHeading">Sign Up</h1>

            {/* Name */}
            <div className="flex-column">
              <label>Name </label>
            </div>
            <div className="inputForm">
            <TextField
                label="Enter Your name"
                name="firstname"
                id="name-input"
              />
            </div>

            {/* Last Name */}
            <div className="flex-column">
              <label>Last Name </label>
            </div>
            <div className="inputForm">
            <TextField
                label="Enter Your Last Name"
                name="lastname"
                id="lastName-input"
              />
            </div>  
            {/* email */}
            <div className="flex-column">
              <label>Email </label>
            </div>
            <div className="inputForm">
              <TextField
                label="Enter An Email"
                name="email"
                id="email-input"
              />
            </div>

            {/* pwd */}
            <div className="flex-column">
              <label>Password </label>
            </div>
            <div className="inputForm">
              <TextField
                type="password"
                label="Enter a Password"
                name="password"
                id="password-input"
              />
            </div>
            {/* Confirm pwd */}
            <div className="flex-column">
              <label>Password </label>
            </div>
            <div className="inputForm">
            <TextField
                label="Confirm Password"
                name="confirmPassword"
                id="confirm-password-input"
                type="password"
              />
            </div>
            {/* Error */}
                {err && <div className='error'><p>Email Already Registered. Sign In To Enter!</p></div>}
              

              <Button type="submit" isLoading={isLoading} className="button-submit">Submit</Button>
              <Divider />

              <p className="p">
                Already have an account? <Link to='/login'><span className="span">Sign In</span></Link>
              </p>
            </Form>
          </Formik>
      </div>
    </div>
  );
}

export default Register;