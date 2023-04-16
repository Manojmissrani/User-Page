import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import app from '../../config/firebase';
import { collection, query, where, getDocs, arrayUnion, deleteDoc, doc, onSnapshot, updateDoc, deleteField, getFirestore, collectionGroup, } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
const auth = getAuth(app);
const db = getFirestore(app);
function Example(props) {
    const [show, setShow] = useState(false);
    const [title, settitle] = useState("")
    const [des, setdes] = useState("")
    const [cat, setcat] = useState("Select Category")
    const [message, setmessage] = useState("")
    const [messagetype, setmessagetype] = useState("")
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const update = () => {
        if (title === "") {
            setmessage("Title Required!")
            setmessagetype("error")
            setTimeout(() => {
                setmessage("")
            }, 3000);
        } else if (cat === "Select Category") {
            setmessage("Category Required!")
            setmessagetype("error")
            setTimeout(() => {
                setmessage("")
            }, 3000);
        } else if (des === "") {
            setmessage("Description Required!")
            setmessagetype("error")
            setTimeout(() => {
                setmessage("")
            }, 3000);
        }
        else {
            const data = {
                Title: title,
                Description: des,
                Category: cat,
            }
            const washingtonRef = doc(db, "Blogs", props.id);
            updateDoc(washingtonRef, data).then(() => {
                settitle("")
                setdes("")
                setcat("")
                setShow(false)
            })
            console.log(data)
        }
    }
    return (
        <>
            <Button className="edit editbtn" onClick={handleShow}>
                Edit
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="mb-3 ">
                        <label className="form-label text-black">Title</label>
                        <input type="text" className="form-control" placeholder="Enter Title" value={title} onChange={(e) => settitle(e.target.value)} />
                        <small id="helpId" className="form-text text-muted">0/200</small>
                    </div>

                    <div className='mb-1'>
                        <label className="form-label">Select Category</label>
                        <select className="form-select form-select-l" value={cat} onChange={(e) => setcat(e.target.value)}>
                            <option selected className='select'>Select Category </option>
                            <option value="Web Development">Web Development</option>
                            <option value="App Development">App Development</option>
                            <option value="WordPress">WordPress</option>
                            <option value="Freelancing">Freelancing</option>
                        </select>
                    </div>

                    <div>
                        <label className="form-label">Description</label>
                        <textarea className="form-control" value={des} onChange={(e) => setdes(e.target.value)} rows="4" placeholder='Enter descrption'></textarea>
                        <small id="helpId" className="form-text text-muted">0/2500</small>

                    </div>
                    <p style={{ color: messagetype === "error" ? "red" : "green", fontWeight: "bold" }}>{message}</p>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" className='editbtn-1' onClick={update}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Example