import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Button from '../../components/button/Button';
import Divider from '@mui/material/Divider';
import TextField from '../../components/TextField/TextField';
import { loginUser, selectError, loginWithGoogleUser } from '../../store/auth/authSlice';
import { checkLoginStatus} from '../../store/auth/authSlice';
import './Login.css';
import {API_URL} from '../../apis/functions';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [errGoogle, setErrGoogle] = useState(false);
  const [counter, setCounter] = useState(0);

  /* HANDLER */
  const handleLogin = async (credentials) => {
    setIsLoading(true);
    try {
      await dispatch(loginUser(credentials));
      await dispatch(checkLoginStatus());
      setIsLoading(false);
      setErr(false);
      setErrGoogle(false);
      navigate('/home');
    } catch(err) {
      setIsLoading(false);
      setErr(true);
      setErrGoogle(false);
    }
  }

  const handleLoginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await dispatch(loginWithGoogleUser());
      setIsLoading(false);
      setErr(false);
      setErrGoogle(false);
      navigate('/home');
    } catch (err) {
      setIsLoading(false);
      setErr(true);
      setCounter(counter + 1);
      if(counter > 1){setErrGoogle(true)}
    }
  };

  /* SCHEMA */
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
            {errGoogle && <div className='error'><p>Something is wrong in the connection. <br/>Cannot connect with google<br/>Please log in manually or try again later.</p></div>}
            <br/>
            <div className="flex-row2">
              <a href={`${API_URL}/auth/google`} target='_blank' rel="noreferrer"><Button variant="contained" className="btn google" onClick={handleLoginWithGoogle} isLoading={isLoading}>Google</Button></a>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Login;