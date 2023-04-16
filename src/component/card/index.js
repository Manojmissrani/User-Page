import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./index.css"
const Card = (props) => {

  const navigate = useNavigate()
  return (
    <>
      <div className="card col-lg-4 col-md-6 col-12">
        <div>
          <img src={props.img} className="card-img-top pointer" onClick={() => navigate(`/Post-Details/${props.id}`)} />
          <div className="card-body">
            <h5 className="card-title pointer" onClick={() => navigate(`/Post-Details/${props.id}`)}>{props.title.slice(0, 30) + "..."}</h5>
            <p className="card-text " >{props.des.slice(0, 50) + "..."}</p>
            <div className='Category mt-1'>
              <h5>Category</h5>
              <p>{props.Category}</p>
            </div>
            <div className='Category'>
              <h5>Status</h5>
              {props.stats === "Approved" && <p className="bolder approved">{props.stats}</p>}
              {props.stats === "Rejected" && <p className="bolder Rejected">{props.stats}</p>}
              {props.stats === "Pending" && <p className="bolder Pending">{props.stats}</p>}          </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Card