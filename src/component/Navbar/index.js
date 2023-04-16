import React, { useEffect, useState } from 'react'
import "./index.css"
import { useNavigate } from "react-router-dom"
import app from '../../config/firebase';
import { collection, query, where, onSnapshot, getDocs, getFirestore, collectionGroup, } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
const auth = getAuth(app);
const db = getFirestore(app);

const Navbar = (props) => {
    const navigate = useNavigate()
    const [users, setuser] = useState([])
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
                setuser(user)
                setloader(false)
                    if (user[0].stats === "Pending") {
                        navigate("/Waitingforapproval")
                    } if (user[0].stats === "Rejected") {
                        navigate("/Rejected")
                    }
            });
        })
    })

    const Logout = () => {
        signOut(auth).then(() => {
            navigate("/Login")
        }).catch((error) => {
        });
    }
    return (
        <nav>
            <input type="checkbox" id="check" />
            <label for="check" className="checkbtn">
                <i className="fa-solid fa-bars fa-lg"></i>
            </label>

            {
                loader ? "" :
                    <label className="logo"> 
                    <img src={users[0].profile} className="img-logo" />
                    {users[0].firstname+" "+users[0].LastName}</label>

            }
            <ul>

                
                <li><a className={props.Home} onClick={() => navigate("/")}>Home</a></li>
                <li><a className={props.create} onClick={() => navigate("/Create-Post")}>Create Post</a></li>
                <li><a className={props.Profile} onClick={() => navigate("/Profile")}>Profile</a></li>
                <li><a onClick={Logout}>Logout</a></li>
              
            </ul>
        </nav>
    )
}

export default Navbar