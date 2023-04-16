import React from 'react'

const StatusCard = (props) => {
    return (
        <div className="col-xl-3 col-sm-6 col-12" >
            <div className="card border-0">
                <div className="card-body a1" id={props.name ==="All"&& "All"||props.name ==="Approved"&& "Approved"||props.name==="Pending"&&"Pending"||props.name==="Rejected"&&"Rejected" } >
                    <div className="row">
                        <div className="col pl-3">
                            <span className="h6 font-semibold text-muted text-sm d-block mb-2">{props.name}</span>
                            <span className="h3 font-bold mb-0">{props.number}</span>
                        </div>
                        <div className="col-auto">
                            <i className={props.icon +" fa-xl"}></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StatusCard