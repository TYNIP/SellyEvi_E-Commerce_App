import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Button from '../../components/button/Button';
import Divider from '@mui/material/Divider';
import TextField from '../../components/TextField/TextField';
import { loginUser, selectError } from '../../store/auth/authSlice';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(false);

  /* HANDLER */
  const handleLogin = async (credentials) => {
    setIsLoading(true);
    try {
      await dispatch(loginUser(credentials));
      setIsLoading(false);
      setErr(false);
      navigate('/');
    } catch(err) {
      setIsLoading(false);
      setErr(true);
    }
  }

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email address is required"),

    password: Yup.string()
      .required("Password is required")
  })

  return (
    <div id="logIn">
      <div className="form">
        <Formik
          initialValues={{email: '', password: ''}}
          validationSchema={loginSchema}
          validateOnBlur
          onSubmit={async (values) => {
            const { email, password } = values;
            await handleLogin({username: email, password});
          }}
        >
          <Form className="">
            <h1 className="baseFormHeading">Log in</h1>

            {/* email */}
            <div className="flex-column">
              <label>Email </label>
            </div>
            <div className="inputForm">
              <TextField
                label="Enter your email"
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
                label="Password"
                name="password"
                id="password-input"
              />
            </div>
            {/* pwd */}
            {err && <div className='error'><p>Incorrect Username or Password</p></div>}
            
            <div className="flex-row">
              <div>
                <input type="checkbox" />
                <label>Remember me </label>
              </div>
            </div>

            <Button type="submit" isLoading={isLoading} className="button-submit">Submit</Button>

            <Divider/>

            <p className="p">
              Do not have an account? <Link to='/register'><span className="span">Sign Up</span></Link>
            </p>
            <p className="p line">Or With</p>

            <div className="flex-row">
              <Button variant="contained" className="btn apple" href="/auth/facebook">Facebook</Button>
              <Button variant="contained" className="btn google" href="/auth/google">Google</Button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Login;
