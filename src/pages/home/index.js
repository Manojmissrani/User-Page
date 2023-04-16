import React, { useEffect, useState } from 'react'
import { Card, Navbar, StatusCard, Footer } from '../../component'
import "./index.css"
import { useNavigate } from "react-router-dom"
import app from '../../config/firebase';
import { collection, query, where, onSnapshot, getDocs, getFirestore, collectionGroup, } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
const auth = getAuth(app);
const db = getFirestore(app);

const Home = () => {
    const navigate = useNavigate()
    const [Blog, setBlog] = useState([])
    const [Loader, setloader] = useState(true)
    const [uid, Setuid] = useState("")
    // const [allpost, setallpost] = useState("")
    // const [rejectedpost, setrejectedpost] = useState("")
    // const [Approvedpost, setApprovedpost] = useState("")
    // const [Pendignpost, setPendignpost] = useState("")
    // const all = []
    // const approve = []
    // const reject = []

    onAuthStateChanged(auth, (user) => {
        if (user) {
            if (user.emailVerified) {
                Setuid(user.uid)
            }
        } else {
            navigate("/Login")
        }
    })

    onAuthStateChanged(auth, (user) => {
        const q = query(collection(db, "Blogs"));
        const a = onSnapshot(q, (querySnapshot) => {
            const blog = [];
            querySnapshot.forEach((doc) => {
                blog.push(doc.data());
                setloader(false)
                setBlog(blog)
                // blog.map((v, i) => {
                //     if (v.uid === uid) {
                //         if (v.stats === "Pending") {
                //             const pending = []
                //             pending.push(v)
                //             setPendignpost(pending)
                //         }
                //         if (v.stats === "Approved") {
                //             const approve = []
                //             approve.push(v)
                //             setApprovedpost(approve)
                //         }
                //     }
                // })
            })
        });
    })
    // console.log(Approvedpost)
    return (
        <>
            {
                Loader ? <div className='loaderdiv d-flex align-items-center justify-content-center h-100 w-100' >
                    <img src="https://cdn.dribbble.com/users/1787505/screenshots/7300251/media/a351d9e0236c03a539181b95faced9e0.gif" />
                </div> :
                    <div>
                        <Navbar Home={"active"} />
                        <div className="container px-10 ">
                            <div className="row">
                                {Blog.map((v, i) => {
                                    if (uid === v.uid) {
                                        return (<Card Category={v.Category} img={v.url} key={i} stats={v.stats} id={v.id} des={v.Description} date={v.date} title={v.Title} />)
                                    }
                                })}
                            </div>
                        </div>
                        <Footer />
                    </div>
            }

        </>
    )
}

export default Home

