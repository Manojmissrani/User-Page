import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import app from '../../config/firebase';
import { collection, query, where, onSnapshot, getDocs, getFirestore, collectionGroup, } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
const auth = getAuth(app);
const db = getFirestore(app);

const AdminApproval = () => {
    const navigate = useNavigate()
    const [loader, setloader] = useState(true)
    const [uid, Setuid] = useState("")

    onAuthStateChanged(auth, (user) => {

        if (user) {
            if (user.emailVerified) {
                Setuid(user.uid)
            }
        } else {
            navigate("/Login")
        }

        const users = query(collection(db, "users"), where("uid", "==", uid));
        const querySnapshot = getDocs(users);
        const b = onSnapshot(users, (querySnapshot) => {
            const user = [];
            querySnapshot.forEach((doc) => {
                user.push(doc.data());
                setloader(false)
                if (user[0].stats === "Approved") {
                    navigate("/")
                }if (user[0].stats === "Rejected") {
                    navigate("/Rejected")
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
                        <div><p>Your account is waiting for our administrator approval please check back later</p></div>
                    </div>

                </div>
            </div>

        </>
    )
}

export default AdminApproval