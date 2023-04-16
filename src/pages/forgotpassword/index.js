import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import app from '../../config/firebase';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
const auth = getAuth(app);

const ForgotPassword = () => {
    const navigate = useNavigate()
    // usest
    const [emailforgot, setemailforgot] = useState("")
    const [message, setmessage] = useState("")
    const [messagetype, setmessagetype] = useState("")
    var regex = /^[\w\-\.\+]+\@[a-zA-Z0-9\. \-]+\.[a-zA-z0-9]{2,4}$/;
    const Forgot = () => {
        if (emailforgot === "") {
            setmessage("Email Address Required!")
            setmessagetype("error")
            setTimeout(() => {
                setmessage("")
            }, 2000);
        }
        else if (!emailforgot.match(regex)) {
            setmessage("Please Enter Valid Email Address")
            setmessagetype("error")
            setTimeout(() => {
                setmessage("")
            }, 2000);
        } else {
            sendPasswordResetEmail(auth, emailforgot)
                .then((res) => {
                    setmessage("Success")
                    setmessagetype("success")
                        })
                .catch((error) => {
                    const errorMessage = error.message;
                    setmessage(errorMessage)
                    setmessagetype("error")
                });
        }
    }
    return (
        <div className='mainlogindiv'>
            <div className="container">
                <div className='form'>
                    <h2 className='signup-h2'>Forgot Password</h2>
                    <p>Lost your password? Please enter your email address. You will receive a link to create a new password via email.</p>
                    <div className="form-group">
                        <label>Email Address </label>
                        <input type="email" value={emailforgot} onChange={(e) => setemailforgot(e.target.value)} className="form-contro" placeholder="Email Address " />
                    </div>
                    <div style={{ textAlign: "right", marginBottom: "15px" }}>
                        {/* <span className='spanloginbtn' style={{ fontWeight: "bold" }}>Forgot Password?</span> */}
                    </div>
                    <p style={{ color: messagetype === "error" ? "red" : "green" }}>{message}</p>
                    <button onClick={Forgot} className="btn btn-primary">Request Password Reset</button>

                    <div className='loginspandiv'>
                        <h6><span onClick={() => navigate("/Login")} className='spanloginbtn'>Back to Login</span> </h6>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword