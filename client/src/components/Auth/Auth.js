import React, {useState} from 'react'
import { Container, Row, Col, Image, Button, Card } from 'react-bootstrap'
import { useHistory } from 'react-router';
import {GoogleLogin} from 'react-google-login';
import {useDispatch} from 'react-redux';

import './styles.scss';
import Input from './Input';

const Auth = () => {

    /////////////////////
    ///   Variables   ///
    /////////////////////

    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    
    const dispatch = useDispatch();
    const history = useHistory();

    /////////////////////
    ///   Functions   ///
    /////////////////////

    ///   Toggle Password Visibility for Input   ///
    const handleShowPassword = () => setShowPassword( (prevShowPassword) => !prevShowPassword )

    const handleSubmit = () => {

    };

    const handleChange = () => {

    }

    const changeAuth = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
    }

    ///   Google Sign-In   ///
    const googleSuccess = async (res) => {
        // Retrieve data and token
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            // Enable utility of data
            dispatch({ type: 'AUTH', data: { result, token } });
            // Redirect back to Homepage
            history.push('/');
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
                <Col>
                        <h2 className="text-center">{!isSignup ? "Sign-In" : "Sign-Up"}</h2>
                        <GoogleLogin
                            clientId ="265415550082-jomjd2m838tcdgca6pprg492f3pmuj4v.apps.googleusercontent.com"
                            buttonText="Google Sign In"
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy="single_host_origin"
                        />
                        {/*--- SIGN IN ONLY ---, Email Input*/}
                        { isSignup && (<Input className={"mx-auto  col-3"} id="email" handleChange={handleChange} type="email" placeholder="Email"/> ) }
                        {/*Username Input*/}
                        <Input className={"mx-auto  col-3"} id="username" handleChange={handleChange} type="username" placeholder="Username"/>
                        {/*Password Input*/}
                        <Input className={"mx-auto col-3"} id="password" handleChange={handleChange} type={showPassword ? "text" : "password"} placeholder="Password" handleShowPassword={handleShowPassword}/>
                        {/*Password Confirmation Input*/}
                        {
                            isSignup && (
                                    <Input className={"mx-auto col-3"} id="c-password" handleChange={handleChange} type={"c-password"} placeholder="Confirm Password" handleShowPassword={handleShowPassword}/>
                            )
                        }
                        {/*Submit Form Button*/}
                        <Button variant="primary" className="mx-auto col-3 d-md-block"> 
                            { isSignup ? "Sign-Up" : "Sign-In" }
                        </Button>
                        {/*Toggle Sign-in/Sign-up form*/}
                        <Button onClick={changeAuth}>{isSignup ? "Already a User? Sign-in" : "Create an Account"}</Button>

                </Col>
            </Row>
        </Container>
    )
}

export default Auth
