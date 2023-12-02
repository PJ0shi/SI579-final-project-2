import {useState} from "react";
import FormItem from "./FormItem.js";
import ReminderItem from "./ReminderItem.js";


const initialFormValues = {
  firstName: '',
  lastName: '',
  startDate: '',
  endDate: '',
};

// React with a multi input form.
// @see https://beta.reactjs.org/apis/react/useState#examples-objects
// @see https://daveceddia.com/react-forms/



const Form1 = () => {
  const [formData, setFormData] = useState(initialFormValues)
  const [message, setMessage] = useState("")
  const noneEmpty =
  Object.values(formData).every(item => item.length > 0)
  const startBeforeEnd = formData.startDate < formData.endDate

  const [inputText, setInputText] = useState('')
  const [reminders, setReminders] = useState([]);


// updates the reminder list
  const addReminder = () => {
    setReminders((previousValue) => {
      return [...previousValue, formData]
    })
    //setFormData('')
    setFormData(initialFormValues)
    console.log("added reminder")
    console.log(reminders)
  }

  // const removeReminder = (text) => {
  //   // Use filter to keep anything that doesn't match the 
  //   // `text` argument.
  //   setReminders(
  //     reminders.filter((item) => item !== formData.firstName)
  //   );
  // }

  const removeReminder = (text) => {
    setReminders((previousReminders) =>
      previousReminders.filter(
        (reminder) =>
          reminder.firstName !== text
      )
    );
  };
  
  const inputHandler = (e, stateName) => {
    setFormData((previousState) => {
      return{
        ...previousState,
        [stateName]:e.target.value,
      }
    });
  }

  const submitForm = (e) => {
    e.preventDefault()
    // setMessage(`${formData.firstName} ${formData.lastName}${formData.startDate} ${formData.endDate}`)
    setFormData(initialFormValues)
  }

  return (
    <div>
    <form className='col col-sm-12 col-lg-5'onSubmit={submitForm}>
      {message.length > 0 && <div className='alert alert-success'>{message}</div>}
      <FormItem label="Name" stateName="firstName" type="text" formData={formData} inputHandler={inputHandler} />      
      {/* <FormItem label="Last Name" stateName="lastName" type="text" formData={formData} inputHandler={inputHandler} />       */}
      <FormItem label="Entry Date" stateName="startDate" type="date" formData={formData} inputHandler={inputHandler} />      
      {/* <FormItem label="End Date" stateName="endDate" type="date" formData={formData} inputHandler={inputHandler} />       */}
      <FormItem label="Course" stateName="course" type="text" formData={formData} inputHandler={inputHandler} />      
      <FormItem label="Feedback" stateName="feedback" type="text" formData={formData} inputHandler={inputHandler} />      

      <div className="mb-3">
        {/* <button disabled={!noneEmpty && !startBeforeEnd} type='submit'>Submit Vacation Request</button> */}
        <button type='submit' className='btn btn-primary' onClick={addReminder}>Add Feedback</button>
      </div>
    </form>

      {/* the returned list of reminders */}
      <div className='col col-sm-12 col-lg-8'>
        {reminders.length === 0 && 'no entries'}
        <ul>
        {reminders.length > 0 && 
            reminders.map((reminder, index) =>
              // <li key={index}>{`${reminder.firstName} ${reminder.lastName} ${reminder.startDate} ${reminder.course}`}<button onClick={(e) => removeReminder(reminder.firstName)} >X</button></li>)}
              <ReminderItem key={index} reminder={reminder} removeReminder={removeReminder} />
            )}</ul>
      </div>
    </div>
  )
}

export default Form1;
