import React from 'react';
import Card from './Card';
import './Column.css';
import AddIcon from '../assets/icons_FEtask/add.svg';
import MenuIcon from '../assets/icons_FEtask/3 dot menu.svg';
import InProgressIcon from '../assets/icons_FEtask/in-progress.svg';
import DoneIcon from '../assets/icons_FEtask/Done.svg';
import CancelledIcon from '../assets/icons_FEtask/Cancelled.svg';
import BacklogIcon from '../assets/icons_FEtask/Backlog.svg';
import TodoIcon from '../assets/icons_FEtask/To-do.svg';
import UrgentPriorityIcon from '../assets/icons_FEtask/SVG - Urgent Priority colour.svg';
import HighPriorityIcon from '../assets/icons_FEtask/Img - High Priority.svg';
import MediumPriorityIcon from '../assets/icons_FEtask/Img - Medium Priority.svg';
import LowPriorityIcon from '../assets/icons_FEtask/Img - Low Priority.svg';
import NoPriorityIcon from '../assets/icons_FEtask/No-priority.svg';
import UserIcon from '../assets/icons_FEtask/avatar.svg';
import UrgentPriorityGreyIcon from '../assets/icons_FEtask/SVG - Urgent Priority grey.svg';

function Column({ title, tickets, users, grouping }) {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'In progress':
        return InProgressIcon;
      case 'Done':
        return DoneIcon;
      case 'Cancelled':
        return CancelledIcon;
      case 'Backlog':
        return BacklogIcon;
      case 'Todo':
        return TodoIcon;
      default:
        return null;
    }
  };

  const getPriorityIcon = (priority, isCard = false) => {
    switch (priority) {
      case 4:
        return isCard ? UrgentPriorityGreyIcon : UrgentPriorityIcon;
      case 3:
        return HighPriorityIcon;
      case 2:
        return MediumPriorityIcon;
      case 1:
        return LowPriorityIcon;
      default:
        return NoPriorityIcon;
    }
  };

  // Determine the highest priority in the column
  const highestPriority = Math.min(...tickets.map(ticket => ticket.priority));
  const priorityIcon = getPriorityIcon(highestPriority);

  const statusIcon = getStatusIcon(title);

  return (
    <div className="column">
      <div className="column-header">
        <div className="column-title">
          {grouping === 'status' && statusIcon && (
            <img src={statusIcon} alt={`${title} Icon`} className="status-icon" />
          )}
          {grouping === 'priority' && priorityIcon && (
            <img src={priorityIcon} alt="Priority Icon" className="priority-icon" />
          )}
          {grouping === 'user' && (
            <img src={UserIcon} height={20} width={20} alt="User Icon" className="user-icon" />
          )}
          <h2>{title}</h2>
          <span className="ticket-count">{tickets.length}</span>
        </div>
        <div className="header-actions">
          <button>
            <img src={AddIcon} alt="Add Icon" className="icon" />
          </button>
          <button>
            <img src={MenuIcon} alt="Menu Icon" className="icon" />
          </button>
        </div>
      </div>
      <div className="column-content">
        {tickets.map(ticket => (
          <Card 
            key={ticket.id}
            ticket={ticket}
            user={users.find(u => u.id === ticket.userId)}
            grouping={grouping}
            priority={ticket.priority}
            priorityIcon={getPriorityIcon(ticket.priority, true)}
          />
        ))}
      </div>
    </div>
  );
}

export default Column;