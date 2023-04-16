import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import app from '../../config/firebase';
import { collection, query, where, onSnapshot, getDocs, getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from 'firebase/auth'
const auth = getAuth(app);
const db = getFirestore(app);

const AdminApproval = () => {
    const navigate = useNavigate()
    const [uid, Setuid] = useState("")

    onAuthStateChanged(auth, (user) => {
        if (user) {
            if (user.emailVerified) {
                Setuid(user.uid)
            }
        } else {
            navigate("/Login")
        }
        const ad = query(collection(db, "users"), where("uid", "==", uid));
        const abd = getDocs(ad);
        const s = onSnapshot(ad, (abd) => {
            const user = [];
            abd.forEach((doc) => {
                user.push(doc.data());
                if (user[0].stats === "Approved") {
                    navigate("/")
                }
            });
        })
    })


    return (
        <>
            <div className='mainlogindiv'>
                <div className='form col-lg-5 col-md-8 col-ms-8'>
                    <h2 className='signup-h2'>Waiting for Approval </h2>
                    <div className="form-group center">
                        <p>Your account is waiting for our administrator approval please check back later</p></div>
                </div>
            </div >
        </>
    )
}

export default AdminApproval