import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { getAuth, sendEmailVerification, onAuthStateChanged } from "firebase/auth";
import "./index.css"
import app from '../../config/firebase';
const auth = getAuth(app);
const Emailverification = () => {
    const [emailtext, setemailtext] = useState("")
    const [user, setuser] = useState("")
    const navigate = useNavigate()
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setuser(user)
            if (user.emailVerified) {
                navigate("/Waitingforapproval")
            } else {
                setemailtext(user.email)
            }
        } else {
            navigate("/Login")
        }
    })
    const recend = () => {
  
    }



    const reloud = () => {

    }
    return (
        <>
            <div className="main">
                <div className="div-1">
                    <div className="div-3">
                        <img src="https://cdn-icons-png.flaticon.com/512/912/912023.png" width="70px" />
                        <h3>Please verify your email</h3>
                        <p id="ppp">
                            You're almost there! We sent an email to
                            <span id="email"> {emailtext}</span>
                        </p>
                        <br />
                        <p>
                            Just click on the link in that email to complete your signup. If you
                            don't see it, you may need to
                            <span id="bold">check your inbox</span>folder.
                        </p>
                    </div>
                    <p id="message"></p>
                    <div className="buttondiv">
                        <button className="button-1" onClick={recend}>Resend Email</button>
                        <button className="button-1" onclick={reloud}>Confirm</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Emailverification