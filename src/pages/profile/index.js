import React, { useEffect, useState } from 'react'
import "./index.css"
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom"
import app from '../../config/firebase';
import { collection, query, onSnapshot, getFirestore, doc, where, getDocs, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { Footer, Navbar ,Profileimg} from '../../component';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

const Profile = () => {
    const navigate = useNavigate("")
    const [userdata, Setuser] = useState("")
    const [Loader, setloader] = useState(true)
    const [uid, Setuid] = useState("")
    const [progress, setprogress] = useState(false)
    const [progressbar, setprogressbar] = useState("")

    onAuthStateChanged(auth, (user) => {
        if (user) {
            if (user.emailVerified) {
                Setuid(user.uid)
            }
        } else {
            navigate("/Login")
        }
    })
    const users = query(collection(db, "users"), where("uid", "==", uid));
    const querySnapshot = getDocs(users);
    const b = onSnapshot(users, (querySnapshot) => {
        const user = [];
        querySnapshot.forEach((doc) => {
            user.push(doc.data());
            Setuser(user)
            setloader(false)
        });
    })

    return (
        <>
            {
                Loader ?
                    <div className='loaderdiv d-flex align-items-center justify-content-center h-100 w-100' >
                        <img src="https://cdn.dribbble.com/users/1787505/screenshots/7300251/media/a351d9e0236c03a539181b95faced9e0.gif" />
                    </div>
                    :
                    <>
                        <Navbar loader={Loader} user={userdata} Profile="active" />
                        <div className='profile-main '>
                            <div className='profilediv-1 col-lg-8 col-12'>
                                <div className='profileimgdiv'>
                                    <div>
                                        <img src={userdata[0].profile} className='profile-user divimg' id='parent2' />
                                        <Profileimg uid={uid}/>
                                    </div>

                                </div>
                              
                                <div>
                                    <label>Frist Name</label>
                                    <input type="text" value={userdata[0].firstname} onClick={() => {
                                        swal("Frist Name Update:", {
                                            content: "input",
                                        })
                                            .then((value) => {
                                                if (value === "") {
                                                    swal(`Not Updated Data`);
                                                }
                                                else {
                                                    const washingtonRef = doc(db, "users", uid);
                                                    updateDoc(washingtonRef, {
                                                        firstname: value
                                                    })
                                                }
                                            });
                                    }} />
                                </div>
                                <div>
                                    <label>Last Name</label>
                                    <input type="text" value={userdata[0].LastName} onClick={() => {
                                        swal("Last Name Update:", {
                                            content: "input",
                                        }).then((value) => {
                                            if (value === "") {
                                                swal(`Not Updated Data`);
                                            }
                                            else {
                                                const washingtonRef = doc(db, "users", uid);
                                                updateDoc(washingtonRef, {
                                                    LastName: value
                                                })
                                            }
                                        });
                                    }} />
                                </div>
                                <div>
                                    <label>Mobile Numbar</label>
                                    <input type="number" value={userdata[0].Mobilenumber} onClick={() => {
                                        swal("Last Name Update:", {
                                            content: "input",
                                        }).then((value) => {
                                            if (value === "") {
                                                swal(`Not Updated Data`);
                                            }
                                            else {
                                                const washingtonRef = doc(db, "users", uid);
                                                updateDoc(washingtonRef, {
                                                    Mobilenumber: value
                                                })
                                            }
                                        });
                                    }} />
                                </div>
                                <div>
                                    <label>Email Address</label>
                                    <input disabled type="email" value={userdata[0].Email} />
                                </div>

                            </div>
                        </div>
                        <Footer />
                    </>
            }
        </>
    )
}

export default Profile