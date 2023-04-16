import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Card, Navbar, Example, Footer } from '../../component'
import { useNavigate } from "react-router-dom"
import "./index.css"
import swal from 'sweetalert';
import app from '../../config/firebase';
import Loadericon from "./../img/loader.webp"
import { collection, query, where, getDocs, arrayUnion, deleteDoc, doc, onSnapshot, updateDoc, deleteField, getFirestore, collectionGroup, } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
const auth = getAuth(app);
const db = getFirestore(app);

const PostDetails = () => {
    const navigate = useNavigate()
    const params = useParams();
    const location = useLocation();
    const [loaderuser, setloaderuser] = useState(true)
    const [loader, setloader] = useState(true)
    const [Blog, setBlog] = useState([])
    const [user, setuser] = useState([])
    const [uid, Setuid] = useState("")



    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                if (user.emailVerified) {
                    Setuid(user.uid)
                }
            } else {
                navigate("/Login")
            }
        })
        const q = query(collection(db, "Blogs"), where("id", "==", params.id));
        const querySnapshot = getDocs(q);
        const a = onSnapshot(q, (querySnapshot) => {
            const Blogs = [];
            querySnapshot.forEach((doc) => {
                Blogs.push(doc.data());
                setBlog(Blogs)
                setloader(false)
            });
        })
    }, [])


    const users = query(collection(db, "users"), where("uid", "==", uid));
    const querySnapshot = getDocs(users);
    const b = onSnapshot(users, (querySnapshot) => {
        const user = [];
        querySnapshot.forEach((doc) => {
            user.push(doc.data());
            setuser(user)
            setloaderuser(false)
        });
    })


    const deletebutton = () => {
        swal({
            title: "Are you sure?",
            text: "Are you sure you want to permanently delete this post.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    deleteDoc(doc(db, "Blogs", Blog[0].id));
                    swal("Poof! Your imaginary file has been deleted!", {
                        icon: "success",
                    });
                    setTimeout(() => {
                        navigate("/")
                    }, 1000);

                } else {
                    swal("Your imaginary file is safe!");
                }
            });
    }



    return (
        <>
            {
                loader ?
                    <div className='loaderdiv d-flex align-items-center justify-content-center h-100 w-100' >
                        <img src="https://cdn.dribbble.com/users/1787505/screenshots/7300251/media/a351d9e0236c03a539181b95faced9e0.gif" />
                    </div> :
                    <>
                        <Navbar loader={loaderuser} user={user} create="active" />
                        <div className="row align-items-center mt-4 pb-5">
                            {
                                Blog.map((v, i) => {
                                    return (
                                        <div className="pending-post" key={i}>
                                            <img src={v.url} className="post-details-img mb-3" />
                                            <div className="stats-post pb-3">
                                                <p className="bolder">Status</p>
                                                <div className="stats-div">
                                                    {v.stats === "Approved" && <p className="bolder approved">{v.stats}</p>}
                                                    {v.stats === "Rejected" && <p className="bolder Rejected">{v.stats}</p>}
                                                    {v.stats === "Pending" && <p className="bolder Pending">{v.stats}</p>}
                                                </div>
                                            </div>



                                            <div className="stats-post pb-3">
                                                <p className="bolder">Selected Category</p>
                                                <p className="bolder">{v.Category}</p>
                                            </div>

                                            {v.stats === "Pending" &&
                                                <div className="button-edit-delete p-3 pt-0">
                                                    <Example id={v.id} />
                                                    <button className="delete" onClick={deletebutton}>Delete</button>
                                                </div>
                                            }
                                            <div className="pt-3 p-2 border-title-des">
                                                <h4 className="colorblue">{v.Title}</h4>
                                                <p className="p-post">{v.Description}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <Footer />
                    </>
            }
        </>
    )
}

export default PostDetails



