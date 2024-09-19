// Group tickets based on selected grouping option
export const groupTickets = (tickets, grouping, users) => {
    if (grouping === 'status') {
      return tickets.reduce((acc, ticket) => {
        const status = ticket.status;
        if (!acc[status]) acc[status] = [];
        acc[status].push(ticket);
        return acc;
      }, {});
    } else if (grouping === 'user') {
      return tickets.reduce((acc, ticket) => {
        const user = users.find(user => user.id === ticket.userId)?.name || 'Unassigned';
        if (!acc[user]) acc[user] = [];
        acc[user].push(ticket);
        return acc;
      }, {});
    } else if (grouping === 'priority') {
      return tickets.reduce((acc, ticket) => {
        const priority = ticket.priority;
        if (!acc[priority]) acc[priority] = [];
        acc[priority].push(ticket);
        return acc;
      }, {});
    }
  };
  