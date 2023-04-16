import "./index.css"
import app from '../../config/firebase';
import { getFirestore, addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom"
import moment from 'moment';
import { Footer, Navbar } from '../../component';
import { useState } from "react";
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const CreatePost = () => {
    const navigate = useNavigate()
    const [Title, setTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Category, setCategory] = useState("Select Category")
    const [url, seturl] = useState("")
    const [progressbar, setprogressbar] = useState("")
    const [message, setmessage] = useState("")
    const [messagetype, setmessagetype] = useState()
    const [progress, setprogress] = useState(false)
    const [progreful, setprogreful] = useState(false)
    const [User, setuser] = useState([])
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
    })


    const imgupload = (e) => {
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
                    seturl(downloadURL)
                    setprogress(false)
                    setprogreful(true)
                });
            }
        );
    }

    const Create = () => {
        if (Title === "") {
            setmessage("Title Required!")
            setmessagetype("error")
        }
        else if (Category === "Select Category") {
            setmessage("Category Required!")
            setmessagetype("error")
        }
        else if (Description === "") {
            setmessage("Description Required!")
            setmessagetype("error")
        } else if (url === "") {
            setmessage("Upload File Required!")
            setmessagetype("error")
        }
        else {
            const a = addDoc(collection(db, "Blogs"), {
                Title: Title,
                Description: Description,
                Category: Category,
                url: url,
                uid: uid,
                stats: "Pending",
                date: moment(new Date).format('LLL')
            }).then((res) => {
                const washingtonRef = doc(db, "Blogs", res.id);
                updateDoc(washingtonRef, {
                    id: res.id
                }).then(() => {
                    navigate("/")
                })
            })
        }
    }
    return (
        <>
            <Navbar loader={loader} user={User} create="active" />
            <div className='create-post-main-div'>
                <div className='div-2'>
                    <label>Title</label><br />
                    <input type="text" value={Title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter Title' /><br /><br />

                    <label>Select Category</label><br />
                    <select className='select' value={Category} onChange={(event) => setCategory(event.target.value)} >
                        <option className='selectnone'>Select Category</option>
                        <option value="Web Development">Web Development</option>
                        <option value="App Development">App Development</option>
                        <option value="WordPress">WordPress</option>
                        <option value="Freelancing">Freelancing</option>
                    </select><br /><br />

                    <label>Description</label><br />
                    <textarea value={Description} onChange={(e) => setDescription(e.target.value)} placeholder='Enter Description' /><br /><br />


                    <div className="_upload form-file" >
                        <label for="uploud" className="form-file-label"  >
                            Upload Photo
                        </label>
                        {progreful && <i className="fa-solid fa-circle-check fa-2xl" style={{ color: "#4bf81b" }}></i>}

                        <input onChange={(e) => imgupload(e)} id="uploud" type="file" className="form-control-file" />
                    </div><br />
                    {progress &&
                        <div className="progress" role="progressbar" aria-label="Warning striped example" >
                            <div className="progress-bar progress-bar-striped " style={{ width: progressbar + "%" }}>{progressbar + "%"}</div>
                        </div>}

                    <br />
                    <p style={{ color: messagetype === "error" ? "red" : "green" }}>{message}</p>

                    <button className='createbtn  w-100' onClick={Create}> Create</button>

                </div>
            </div>
            <Footer />
        </>
    )
}

export default CreatePost
