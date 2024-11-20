import React from 'react';
import Column from './Column';
import './Board.css';
import { DragDropContext } from 'react-beautiful-dnd';

function Board({ tickets, users, grouping, sorting }) {
  const getPriorityName = (priority) => {
    const priorities = {
      4: 'Urgent',
      3: 'High',
      2: 'Medium',
      1: 'Low',
      0: 'No priority'
    };
    return priorities[priority];
  };

  const groupTickets = () => {
    let groups = {};

    if (grouping === 'status') {
      tickets.forEach(ticket => {
        if (!groups[ticket.status]) {
          groups[ticket.status] = [];
        }
        groups[ticket.status].push(ticket);
      });

      ['Backlog', 'Todo', 'In progress', 'Done', 'Cancelled'].forEach(status => {
        if (!groups[status]) {
          groups[status] = [];
        }
      });

      const statusOrder = ['Backlog', 'Todo', 'In progress', 'Done', 'Cancelled'];

      groups = Object.keys(groups)
        .sort((a, b) => statusOrder.indexOf(a) - statusOrder.indexOf(b))
        .reduce((sortedGroups, key) => {
          sortedGroups[key] = groups[key];
          return sortedGroups;
        }, {});
    } else if (grouping === 'user') {
      tickets.forEach(ticket => {
        const user = users.find(u => u.id === ticket.userId);
        if (!groups[user?.name]) {
          groups[user?.name] = [];
        }
        groups[user?.name].push(ticket);
      });
    } else if (grouping === 'priority') {
      tickets.forEach(ticket => {
        const priorityName = getPriorityName(ticket.priority);
        if (!groups[priorityName]) {
          groups[priorityName] = [];
        }
        groups[priorityName].push(ticket);
      });

      // Define the custom order for priorities
      const priorityOrder = ['No priority', 'Urgent', 'High', 'Medium', 'Low'];

      // Sort the group keys based on the custom priority order
      groups = Object.keys(groups)
        .sort((a, b) => priorityOrder.indexOf(a) - priorityOrder.indexOf(b))
        .reduce((sortedGroups, key) => {
          sortedGroups[key] = groups[key];
          return sortedGroups;
        }, {});
    }

    // Sort tickets within each group
    Object.keys(groups).forEach(key => {
      groups[key].sort((a, b) => {
        if (sorting === 'priority') {
          return b.priority - a.priority;
        } else {
          return a.title.localeCompare(b.title);
        }
      });
    });

    return groups;
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    // Logic to reorder tickets based on drag result
    // Update the state with the new order
  };

  const groups = groupTickets();

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="board">
        {Object.entries(groups).map(([groupName, tickets]) => (
          <Column 
            key={groupName}
            title={groupName}
            tickets={tickets}
            users={users}
            grouping={grouping}
          />
        ))}
      </div>
    </DragDropContext>
  );
}

export default Board;