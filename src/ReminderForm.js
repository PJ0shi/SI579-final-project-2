const ReminderForm = ({setInputText, inputText, clickHandler}) => {
    const[inputText, setInputText] = useState("")
    const[reminders, setReminders] = useState([])
  
    const addReminder = () => {
      setReminders((previousValue) => {
        return [...previousValue, inputText]
      })
      setInputText("")
    }
  
    return (
      <>
        <label class="form-label">Add a reminder</label>
        <input type="text" class="form-control" onInput = {(e) => setInputText(e.target.value)} value={inputText} />
        <button class='btn btn-primary'>Add Reminder</button>
      </>
    )
  }
  
  export default ReminderForm;
  // @todo
  // Should return the following markup:
  //  <label class="form-label">Add a reminder</label>
  // <input type="text" class="form-control" />
  // <button class='btn btn-primary'>Add Reminder</button>
  
  // use the working example and problem 4 to determine the interactivity.
  