import {useState} from "react";



// Demonstrates how state can hold many pieces of data.
const Problem4 = () => {
  // @todo wire this form up so we can add reminders in the form
  // that get listed in the other column.
  const [inputText, setInputText] = useState('')
  const [reminders, setReminders] = useState([]);

  const addReminder = () => {
    setReminders((previousValue) => {
      return [...previousValue, inputText]
    })
    setInputText('')
  }

  // When removing an item, you need something that 
  // identifies the item to be removed. 
  // Ideally there is an ID, but we're just going to match
  // the reminder text.
  const removeReminder = (text) => {
      // Use filter to keep anything that doesn't match the 
      // `text` argument.
      setReminders(
        reminders.filter((item) => item !== text)
      );
  }

  return (
    <div className='row'>
      <div className='col col-sm-12 col-lg-4'>
        <label className="form-label">Add a reminder</label>
        <input
          type="text"
          className="form-control"
          onInput={(e) => setInputText(e.target.value)}
          value={inputText}
        />
        <button className='btn btn-primary' onClick={addReminder}>Add Reminder</button>
      </div>



      {/* the returned list of reminders */}
      <div className='col col-sm-12 col-lg-8'>
        {reminders.length === 0 && 'no reminders yet'}
        <ul>
        {reminders.length > 0 && 
            reminders.map((reminder, index) =>
              <li key={index}>{reminder} <button onClick={(e) => removeReminder(reminder)} >X</button></li>)}
        </ul>

        <ul>

        </ul>
      </div>
    </div>
  )
}

export default Problem4;