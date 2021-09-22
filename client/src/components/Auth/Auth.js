import React, {useState} from 'react'
import { Container, Row, Col, Image, Button, Card } from 'react-bootstrap'
import { useHistory } from 'react-router';
import {GoogleLogin} from 'react-google-login';
import {useDispatch} from 'react-redux';

import './styles.scss';
import Input from './Input';
import { signIn, signUp } from '../../actions/auth';

const initialState = { email: '', username: '', password: '', cpassword: ''}

const Auth = () => {

    /////////////////////
    ///   Variables   ///
    /////////////////////

    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    
    const dispatch = useDispatch();
    const history = useHistory();

    /////////////////////
    ///   Functions   ///
    /////////////////////

    ///   Toggle Password Visibility for Input   ///
    const handleShowPassword = () => setShowPassword( (prevShowPassword) => !prevShowPassword )

    const handleSubmit = (e) => {
        console.log(formData);

        console.log(isSignup);

        if(isSignup) {
            dispatch(signUp(formData, history));
            window.location.reload();
        } else {
            dispatch(signIn(formData, history));
            window.location.reload();
        }
    };

    const handleChange = (e) => {
        setFormData({ ... formData, [e.target.id]: e.target.value})
    }

    const changeAuth = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
    }

    ///   Google Sign-In   ///
    const googleSuccess = async (res) => {
        // Retrieve data and token
        const result = res?.profileObj;
        const token = res?.tokenId;
        result.username = result.givenName;

        try {
            // Enable utility of data
            dispatch({ type: 'AUTH', data: { result, token } });
            // Redirect back to Homepage
            history.push('/');
            window.location.reload();
        } catch(error) {
            console.log(error);
        }
    }

    ///   Google Sign-In Error   ///
    const googleFailure = (error) => {
        console.log(error)
        console.log("Google auth failed. Try again later.");
    }

    return (
        <Container>
            <Row>
                <Col className="mt-5 text-center">
                        <h2>{!isSignup ? "Sign-In" : "Sign-Up"}</h2>
                        <GoogleLogin
                            clientId ="265415550082-jomjd2m838tcdgca6pprg492f3pmuj4v.apps.googleusercontent.com"
                            buttonText="Google Sign In"
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy="single_host_origin"
                        />
                        {/*  ================== 
                         *   ===   Inputs   ===
                        *    ==================   /}
                        * 
                        {/*  ---  SIGN IN ONLY  ---, Username Input*/}
                        { isSignup && ( <Input className={"mx-auto  col-3"} id="username" handleChange={handleChange} type="username" placeholder="Username"/> ) }
                        {/*  ---  Email Input   ---*/}
                        <Input className={"mx-auto  col-3"} id="email" handleChange={handleChange} type="email" placeholder="Email"/>
                        {/*  --- Password Input ---*/}
                        <Input className={"mx-auto col-3"} id="password" handleChange={handleChange} type={showPassword ? "text" : "password"} placeholder="Password" handleShowPassword={handleShowPassword}/>
                        {/*  --- Password Confirmation Input ---*/}
                        {
                            isSignup && (
                                    <Input className={"mx-auto col-3"} id="cpassword" handleChange={handleChange} type={"c-password"} placeholder="Confirm Password" handleShowPassword={handleShowPassword}/>
                            )
                        }
                        {/*  --- Submit Form Button ---*/}
                        <Button variant="primary" onClick={handleSubmit} className="mt-3 mx-auto col-3 d-md-block"> 
                            { isSignup ? "Sign-Up" : "Sign-In" }
                        </Button>
                        {/*  --- Toggle Sign-in/Sign-up form ---*/}
                        <Button variant="secondary" className="mt-3 mx-auto col-3 d-md-block" onClick={changeAuth}>{isSignup ? "Already a User? Sign-in" : "Create an Account"}</Button>

                </Col>
            </Row>
        </Container>
    )
}

export default Auth
