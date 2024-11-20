import React from 'react';
import './Card.css';
import InProgressIcon from '../assets/icons_FEtask/in-progress.svg';
import DoneIcon from '../assets/icons_FEtask/Done.svg';
import CancelledIcon from '../assets/icons_FEtask/Cancelled.svg';
import BacklogIcon from '../assets/icons_FEtask/Backlog.svg';
import TodoIcon from '../assets/icons_FEtask/To-do.svg';
import UserIcon from '../assets/icons_FEtask/avatar.svg';

function Card({ ticket, user, grouping, priority, priorityIcon }) {
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

  const statusIcon = getStatusIcon(ticket.status);

  return (
    <div className="card">
      <div className="card-header">
        <span className="ticket-id">{ticket.id}</span>
        {user && (
          <div className="user-avatar">
            {grouping !== 'user' && (
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <img src={user.avatar || UserIcon} height={30} width={30} alt="User Icon" className="user-icon" />
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    height: '10px',
                    width: '10px',
                    backgroundColor: user.available ? 'green' : 'gray',
                    borderRadius: '50%',
                    border: '1px solid white',
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>
      <div className="card-title">
        {grouping !== 'status' && statusIcon && <img src={statusIcon} alt={`${ticket.status} Icon`} className="status-icon" />}
        {' '}
        {ticket.title}
      </div>
      <div className="card-tags">
        {grouping !== 'priority' && priorityIcon && (
          <img src={priorityIcon} alt="Priority Icon" className="priority-icon" />
        )}
        {ticket.tag.map((tag, index) => (
          <span key={index} className="tag">
            ⚪ {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Card;