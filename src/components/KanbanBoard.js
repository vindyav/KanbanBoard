import React, { useState, useEffect } from 'react';
import { fetchTicketsAndUsers } from '../utils/api';
import FilterOptions from './FilterOptions';
import KanbanColumn from './KanbanColumn';
import { groupTickets } from '../utils/helpers';
import './KanbanBoard.css';
import DisplayIcon from '../icons_FEtask/Display.svg';
import Down from '../icons_FEtask/down.svg';

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState(localStorage.getItem('grouping') || 'status');
  const [sorting, setSorting] = useState(localStorage.getItem('sorting') || 'priority');
  const [showFilters, setShowFilters] = useState(false); // State to control filter visibility

  // Fetch tickets and users from API
  useEffect(() => {
    const getData = async () => {
      const data = await fetchTicketsAndUsers();
      if (data) {
        setTickets(data.tickets);
        setUsers(data.users);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    localStorage.setItem('grouping', grouping);
  }, [grouping]);
  
  useEffect(() => {
    localStorage.setItem('sorting', sorting);
  }, [sorting]);

  // Handle Grouping Change
  const handleGroupingChange = (groupBy) => {
    setGrouping(groupBy);
    localStorage.setItem('grouping', groupBy);
  };

  // Handle Sorting Change
  const handleSortingChange = (sortBy) => {
    setSorting(sortBy);
    localStorage.setItem('sorting', sortBy);
  };
  
  // Sort tickets based on priority or title
  const sortedTickets = [...tickets].sort((a, b) => {
    if (sorting === 'priority') {
      return b.priority - a.priority;
    } else if (sorting === 'title') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  // Group tickets based on selected grouping option
  const groupedTickets = groupTickets(sortedTickets, grouping, users);

  // Toggle Filter visibility
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  

  return (
    <div className="kanban-board">
      <div className='header'>
      <span><img src={DisplayIcon}/><button onClick={toggleFilters}>Display</button> <img src={Down}/> </span> </div>
      <FilterOptions 
        grouping={grouping} 
        onGroupingChange={handleGroupingChange} 
        sorting={sorting} 
        onSortingChange={handleSortingChange} 
        show={showFilters} // Pass the visibility state as a prop
      />
      <div className="kanban-columns">
        {Object.keys(groupedTickets).map(group => (
          <KanbanColumn key={group} group={group} tickets={groupedTickets[group]} />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
