
import React from 'react';
import TicketCard from './TicketCard';
import './KanbanColumn.css';
import add from '../icons_FEtask/add.svg'
import threedot from '../icons_FEtask/3 dot menu.svg'
import backlog from '../icons_FEtask/Backlog.svg'
import todo from '../icons_FEtask/To-do.svg'
import inprogress from '../icons_FEtask/in-progress.svg'


const KanbanColumn = ({ group, tickets }) => {
  console.log(group)
  return (
    <div className="kanban-column">
      <div className='column-header'>
        <div className='col-head-left'><span>{group=='Todo'?<img src={todo} />:group=='Backlog'?<img src={backlog} />:group=='In progress'?<img src={inprogress} />:""}</span>
        <h4>{group==0?'No Priority':group==1?'Low':group==2?'Medium':group==3?'High':group==4?'Urgent':group}</h4>
        <span>{tickets.length}</span></div>

        <div className='column-icons'>
          <span>
            <img src={add} />
          </span>
          <span>
            <img src={threedot} />
          </span>
        </div>
      </div>
      {tickets.map(ticket => (
        <TicketCard key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
};

export default KanbanColumn;
