import React from "react";
import "./TicketCard.css";
import exclamationmark from "../icons_FEtask/SVG - Urgent Priority grey.svg";
import avatar from '../icons_FEtask/images.png'

const TicketCard = ({ ticket }) => {
  return (
    <div className="card">
      {/* Header with icon */}
      <div className="card-header">
        
          <p>{ticket.id}</p>
          <div className="card-avatar">
            <img src={avatar} alt="User Avatar" />
          </div>
        
      </div>
        <div className="card-title">
          <p>{ticket.title}</p>
        </div>

      {/* Tag and feature */}
      <div className="card-tag">
        <div className="card-tag-icon-ex"><img src={exclamationmark} alt="Exclamation Icon" /></div>
        <div className="card-tag-icon"> 
          <div className="circle-icon"></div><span className="feature-request">Feature Request</span>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
