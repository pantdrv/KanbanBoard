import React from "react";
import "../classes/board.css"

const KanbanCard = ({ ticket }) => {
  return (
    <li className="card">
    <div style={{color: '#6b778c', fontSize:'15px',fontWeight:'500',paddingBottom:'10px'}}>{ticket.id}</div>
      <div className="card-title">{ticket.title}</div>
      <div className="card-tags">
        {ticket.tag.map((t, index) => (
          <span key={index} className="tag">
            {t}
          </span>
        ))}
      </div>
    </li>
  );
};

export default KanbanCard;
