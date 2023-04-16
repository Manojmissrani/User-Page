import React, { useEffect, useState } from 'react'
import "./index.css"
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom"
import app from '../../config/firebase';
import { collection, query, onSnapshot, getFirestore, doc, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { Footer, Navbar } from '../../component';
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


    const profileimg = (e) => {
        e.preventDefault();
        const storageRef = ref(storage, e.target.files[0].name);
        const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                var uploadpercentage = Math.round(progress);
                setprogress(true)
                setprogressbar(uploadpercentage)
            },
            (error) => {
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    updateDoc(doc(db, "users", uid), {
                        profile: downloadURL
                    }).then(() => {
                        setprogress(false)
                    })

                });
            }
        );

    }

    const q = query(collection(db, "users"));
    onSnapshot(q, (querySnapshot) => {
        const users = [];
        querySnapshot.forEach((doc) => {
            users.push(doc.data());
            users.map((v, i) => {
                if (v.uid === uid) {
                    Setuser(v)
                    setloader(false)
                }
            })
        });
    });

    return (
        <>
            {
                Loader ?
                    <div className='loaderdiv d-flex align-items-center justify-content-center h-100 w-100' >
                        <img src="https://cdn.dribbble.com/users/1787505/screenshots/7300251/media/a351d9e0236c03a539181b95faced9e0.gif" />
                    </div>
                    :
                    <>
                        <Navbar Profile={"active"} />
                        <div className='profile-main '>
                            <div className='profilediv-1 col-lg-8 col-12'>
                                <div className='profileimgdiv'>
                                    <div>
                                        <img src={userdata.profile} className='profile-user divimg' id='parent2' />
                                        <label className='editlabel' htmlFor="userprofile"><i className='bx bxs-camera-plus bx-md'></i></label>
                                        <input type="file" id='userprofile' onChange={(e) => profileimg(e)} />
                                    </div>

                                </div>
                                {progress &&
                                    <div className="progress" role="progressbar" aria-label="Warning striped example" >
                                        <div className="progress-bar progress-bar-striped " style={{ width: progressbar + "%" }}>{progressbar + "%"}</div>
                                    </div>
                                }
                                <div>
                                    <label>Frist Name</label>
                                    <input type="text" value={userdata.firstname} onClick={() => {
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
                                    <input type="text" value={userdata.LastName} onClick={() => {
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
                                    <input type="number" value={userdata.Mobilenumber} onClick={() => {
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
                                    <input disabled type="email" value={userdata.Email} />
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