import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import app from '../../config/firebase';
import { getAuth, signInWithEmailAndPassword,sendEmailVerification } from "firebase/auth"
const auth = getAuth(app);

const Login = () => {
    const navigate = useNavigate()
    const [emaillogin, setemaillogin] = useState("")
    const [PasswordLogin, setPasswordLogin] = useState("")
    var regex = /^[\w\-\.\+]+\@[a-zA-Z0-9\. \-]+\.[a-zA-z0-9]{2,4}$/;
    const [message, setmessage] = useState("")
    const [messagetype, setmessagetype] = useState("")
    const Login = () => {
        if (emaillogin === "") {
            setmessage("Email Address Required!")
            setmessagetype("error")
            setTimeout(() => {
                setmessage("")
            }, 2000);
        }
        else if (!emaillogin.match(regex)) {
            setmessage("Please Enter Valid Email Address")
            setmessagetype("error")
            setTimeout(() => {
                setmessage("")
            }, 2000);
        } else if (PasswordLogin === "") {
            setmessage("Password required")
            setmessagetype("error")
            setTimeout(() => {
                setmessage("")
            }, 2000);
        } else if (PasswordLogin.length < 6) {
            setmessage("6 digit Password required")
            setmessagetype("error")
            setTimeout(() => {
                setmessage("")
            }, 2000);
        }
        else {
            signInWithEmailAndPassword(
                auth,
                emaillogin,
                PasswordLogin
            ).then((e) => {
                if (e.user.emailVerified === false) {
                    sendEmailVerification(e.user)
                    navigate("/EmailVerfication")
                }
                setmessage("Succeccful")
                setmessagetype("Succeccful")
                setTimeout(() => {
                    navigate("/")
                    setmessage("")
                }, 2000);
            }
            ).catch((error) => {
                setmessage(error.message)
                setmessagetype("error")
                setTimeout(() => {
                    setmessage("")
                }, 2000);
            })
        }
    }
    return (
        <div className='mainlogindiv'>
                <div className='form col-lg-5 col-md-8 col-ms-8'>
                    <h2 className='signup-h2'>Login</h2>

                    <div className="form-group">
                        <label>Email Address </label>
                        <input type="email" className="form-contro" value={emaillogin} onChange={(e) => setemaillogin(e.target.value)} id="email" placeholder="Email Address " />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-contro" id="password" placeholder="Password" value={PasswordLogin} onChange={(e) => setPasswordLogin(e.target.value)} />
                    </div>
                    <div style={{ textAlign: "right", marginBottom: "15px" }}>
                        <span className='spanloginbtn' onClick={() => navigate("/Forgot-Password")} style={{ fontWeight: "bold" }}>Forgot Password?</span>
                    </div>
                    <p style={{ color: messagetype === "error" ? "red" : "green" }}>{message}</p>
                    <button className="btn btn-primary" onClick={Login}>Login</button>

                    <div className='loginspandiv'>
                        <h6>New User ? <span onClick={() => navigate("/SignUp")} className='spanloginbtn'>Sign Up</span> </h6>
                    </div>
                </div>
            </div>
        // </div>
    )
}

export default Login