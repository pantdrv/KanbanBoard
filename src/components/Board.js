import React, { useState, useEffect } from "react";
import "../classes/board.css"
import KanbanColumn from "./KanbanColumn";
import UrgentIconSVG from "../icons/SVG - Urgent Priority colour.svg";
import LowPrioritySVG from "../icons/Img - Low Priority.svg";
import HighPrioritySVG from "../icons/Img - High Priority.svg";
import MediumPrioritySVG from "../icons/Img - Medium Priority.svg";
import NoPrioritySVG from "../icons/No-priority.svg";
import ToDoSVG from "../icons/To-do.svg";
import InProgressSVG from "../icons/in-progress.svg";
import CancelledSVG from "../icons/Cancelled.svg";
import backlogSVG from "../icons/Backlog.svg";
import DoneSVG from "../icons/Done.svg";

import Header from "./Header";

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState("user"); 
  const [sortBy, setSortBy] = useState("priority"); 

  useEffect(() => {
    fetchData();
  }, []);

  // fetch quick sell data
  const fetchData = async () => {
    const response = await fetch(
      "https://api.quicksell.co/v1/internal/frontend-assignment"
    );
    const data = await response.json();
    setTickets(data.tickets);
    setUsers(data.users);
  };

  const handleGroupChange = (group) => {
    setGroupBy(group);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
  };

  const getGroupedData = () => {
    let groupedData;
    if (groupBy === "status") {
      groupedData = groupByStatus(tickets);
    } else if (groupBy === "priority") {
      groupedData = groupByPriority(tickets);
    } else {
      groupedData = groupByUser(tickets, users);
    }
    return groupedData;
  };

  const groupByUser = (tickets, users) => {
    return users.map((user) => ({
      title: user.name,
      items: tickets.filter((ticket) => ticket.userId === user.id),
    }));
  };

  const groupByStatus = (tickets) => {
    const statuses = [
      {
        label: "Backlog",
        icon: backlogSVG,
      },
      {
        label: "Todo",
        icon: ToDoSVG,
      },
      {
        label: "In progress",
        icon: InProgressSVG,
      },
      {
        label: "Done",
        icon: DoneSVG,
      },
      {
        label: "Cancelled",
        icon: CancelledSVG,
      },
    ];

    return statuses.map((status) => ({
      title: status.label,
      icon: status.icon,
      items: tickets.filter((ticket) => ticket.status === status.label),
    }));
  };

  const groupByPriority = (tickets) => {
    const priorities = [
      { label: "No Priority", value: 0, icon: NoPrioritySVG },
      { label: "Urgent", value: 4, icon: UrgentIconSVG },
      { label: "High", value: 3, icon: HighPrioritySVG },
      { label: "Medium", value: 2, icon: MediumPrioritySVG },
      { label: "Low", value: 1, icon: LowPrioritySVG },
    ];
    return priorities.map((priority) => ({
      title: priority.label,
      icon: priority.icon,
      items: tickets.filter((ticket) => ticket.priority === priority.value),
    }));
  };

  const groupedData = getGroupedData();

  return (
    <div className="wrapper-board">
      <Header
        onGroupChange={handleGroupChange}
        onSortChange={handleSortChange}
      />
      <div className="kanban-board">
        <div className="board-container">
          {groupedData.map((group, index) => (
            <KanbanColumn key={index} group={group} sortBy={sortBy} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;
