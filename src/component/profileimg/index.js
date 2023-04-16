import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import app from '../../config/firebase';
import { collection, query, onSnapshot, getFirestore, doc, where, getDocs, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from 'firebase/auth'
// import { Footer, Navbar ,Profileimg} from '../../component';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

const Profileimg = (props) => {
    const [progress, setprogress] = useState(false)
    const [progressbar, setprogressbar] = useState("")

    const img = (e) => {
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
                    // seturl(downloadURL)
                    setprogress(false)
                    updateDoc(doc(db, "users", props.uid), {
                        profile: downloadURL
                    }).then(() => {
                        setprogress(false)
                    })
                });
            }
        );
    }
    return (
        <>
            <label className='editlabel' htmlFor="userprofile"><i className='bx bxs-camera-plus bx-md'></i></label>
            <input type="file" id='userprofile' onChange={(e) => img(e)} />
            {progress &&
                <div className="progress" role="progressbar" aria-label="Warning striped example" >
                    <div className="progress-bar progress-bar-striped " style={{ width: progressbar + "%" }}>{progressbar + "%"}</div>
                </div>
            }
        </>
    )
}

export default Profileimg