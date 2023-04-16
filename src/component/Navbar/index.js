import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import "./index.css"

const Navbar = (props) => {
    const navigate = useNavigate()
    return (
        <nav>
            <input type="checkbox" id="check" />
            <label for="check" className="checkbtn">
                <i className="fa-solid fa-bars fa-lg"></i>
            </label>
            {props.loader ?
                <img src="https://cdn.pixabay.com/animation/2022/07/29/03/42/03-42-05-37_512.gif" className='ml-3' height={80} />
                :
                <label className="logo">
                    <img src={props.user[0].profile} className="img-logo" />
                    {props.user[0].firstname + " " + props.user[0].LastName}
                </label>
            }
            <ul>
                <li><a className={props.Home} onClick={() => navigate("/")}>Home</a></li>
                <li><a className={props.create} onClick={() => navigate("/Create-Post")}>Create Post</a></li>
                <li><a className={props.Profile} onClick={() => navigate("/Profile")}>Profile</a></li>
                <li><a onClick={props.Logout}>Logout</a></li>

            </ul>
        </nav>
    )
}

export default Navbar