import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import "./index.css"
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import app from '../../config/firebase';
const auth = getAuth(app);
const db = getFirestore(app);

const Signup = () => {
    const navigate = useNavigate()
    const [firstname, setfirstname] = useState("")
    const [LastName, setLastName] = useState("")
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [RePassword, setRePassword] = useState("")
    const [MobileNo, setMobileNo] = useState("")
    const [message, setmessage] = useState("")
    const [messagetype, setmessagetype] = useState("")
    var regex = /^[\w\-\.\+]+\@[a-zA-Z0-9\. \-]+\.[a-zA-z0-9]{2,4}$/;

    var match = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    const SignUp = () => {
        if (firstname === "") {
            setmessage("Frist Name Required!")
            setmessagetype("error")
        } else if (LastName === "") {
            setmessage("Last Name Required!")
            setmessagetype("error")
        }
        else if (MobileNo === "") {
            setmessage("Mobile Number Required!")
            setmessagetype("error")
        } else if (MobileNo.length < 11) {
            setmessage("Please Enter 11 digit Mobile No.")
            setmessagetype("error")
        }
        else if (Email === "") {
            setmessage("Email Address Required!")
            setmessagetype("error")
        }
        else if (!Email.match(regex)) {
            setmessage("Please Enter Valid Email Address")
            setmessagetype("error")
        }
        else if (Password === "") {
            setmessage("Password Required!")
            setmessagetype("error")
        }
        else if (!Password.match(match)) {
            setmessage("Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character")
            setmessagetype("error")
        }
        else if (RePassword === "") {
            setmessage("Confirm Password Required!")
            setmessagetype("error")
        }
        else if (Password !== RePassword) {
            setmessage("Confirm Password do not match")
            setmessagetype("error")
        }
        else {
            createUserWithEmailAndPassword(auth, Email, Password)
                .then((userCredential) => {
                    sendEmailVerification(auth.currentUser)
                        .then((res) => {
                            const uid = userCredential.user.uid
                            const docData = {
                                firstname: firstname,
                                LastName: LastName,
                                Mobilenumber: MobileNo,
                                Email: Email,
                                Password: Password,
                                uid: uid,
                                stats: "Pending",
                                profile: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR30SfNCE6e-sM7qSa8Z9CwrktkRgrjbHKyeSh3VyZDrsXLDVW0uHVcjmeki6bBSwQnqWo&usqp=CAU"
                            };
                            console.log(userCredential)
                            setDoc(doc(db, "users", userCredential.user.uid), docData).then(() => {
                                navigate("/Emailverification")
                            })
                            setmessage("success")
                            setmessagetype("success")
                        });
                })

        }

    }

    return (
        <div>
            <div className="container row align-items-center bgcolorlogin justify-content-center">
                <div className='form col-lg-5 col-md-8 col-ms-8'>
                    <h2 className='signup-h2'>Sign Up</h2>
                    <div className="form-group">
                        <label >Frist Name</label>
                        <input type="text" className="form-contro" value={firstname} onChange={(e) => setfirstname(e.target.value)} placeholder="Frist Name" />
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" className="form-contro" value={LastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />
                    </div>
                    <div className="form-group">
                        <label >Mobile Numaber</label>
                        <input type="text" className="form-contro" value={MobileNo} onChange={(e) => setMobileNo(e.target.value)} placeholder="Mobile Numaber" />
                    </div>
                    <div className="form-group">
                        <label>Email Address </label>
                        <input type="email" className="form-contro" value={Email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address " />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-contro" value={Password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input type="password" className="form-contro" value={RePassword} onChange={(e) => setRePassword(e.target.value)} placeholder="Confirm Password" />
                    </div>
                    <p style={{ color: messagetype === "error" ? "red" : "green", fontWeight: "bold" }}>{message}</p>
                    <button onClick={SignUp} className="w-100 btn btn-primary">Sign Up</button>

                    <div className='loginspandiv'>
                        <h6>Already User ? <span onClick={() => navigate("/Login")} className='spanloginbtn'>Login</span> </h6>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup


