// ReminderItem.js
import React from 'react';
import './ReminderItem.module.css';


const ReminderItem = ({ reminder, removeReminder }) => {
  return (
    <div className="reminder-item">
        <div className="flex-row">
            <div className="flex-row-small">
                <div className='name'>{reminder.firstName}</div>
                <div className='date'>{reminder.startDate}</div>
            </div>
            <button className="remove-button" onClick={() => removeReminder(reminder.firstName)}>X</button>
        </div>
        
        <div className="flex-column">
            
            <div>{reminder.course}</div>
            <div>{reminder.feedback}</div>
        </div>
      

    </div>
    
  );
};

export default ReminderItem;
