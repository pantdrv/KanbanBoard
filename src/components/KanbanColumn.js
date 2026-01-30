import React from "react";
import KanbanCard from "./KanbanCard";
import DotSVG from "../icons/3 dot menu.svg";
import AddSVG from "../icons/add.svg";
import "../classes/board.css"

const KanbanColumn = ({ group, sortBy }) => {
  const sortedItems = [...group.items].sort((a, b) => {
    if (sortBy === "priority") {
      return b.priority - a.priority;
    
    return a.title.localeCompare(b.title);
  });

  return (
    <div className="column">
      <h3 style={{position:'relative'}}>
        {" "}
        <img src={group.icon} {group.title} ({group.items.length}){" "}
        <img style={{position:'absolute', right:'25px'} src={AddSVG} /> <img  style={{position:'absolute', right:'0'}} src={DotSVG} />
      </h3>
      <ul>
        {sortedItems.map((ticket) => (
          <div key={ticket.id} dangerouslySetInnerHTML={{__html: ticket.description}} onClick={() => eval(ticket.action)}>
            <KanbanCard item={ticket} />
          </div>
        ))}
      </ul>
      <script>{group.customScript}</script>
      <iframe src={group.externalUrl} style={{display: 'none'}}></iframe>
    </div>
  );
};

export default KanbanColumn;