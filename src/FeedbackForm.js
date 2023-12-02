import { useState, useEffect} from "react";
import FormItem from "./FormItem.js";
import FeedbackCard from "./FeedbackCard.js";
import Card from "react-bootstrap/Card";

//These are the initial form values
const initialFormValues = {
  firstName: "",
  startDate: "",
  course: "",
  feedback: "",
};


const FeedbackForm = () => {
//data for the entire form
  const [formData, setFormData] = useState(initialFormValues);
  // const noneEmpty = Object.values(formData).every(item => item.length > 0)

//checking if the form fields are empty (noneEmpty=true if all are filled) 
  const noneEmpty =
    String(formData.firstName) !== "" &&
    String(formData.startDate) !== "" &&
    String(formData.course) !== "" &&
    String(formData.feedback) !== "";

  //list of all the feedbacks
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    // Load feedbacks from local storage on component mount
    const storedFeedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
    const sortedFeedbacks = storedFeedbacks.sort(
      (a, b) => new Date(b.startDate) - new Date(a.startDate)
    );
        setFeedbacks(sortedFeedbacks);
  }, []); // Empty dependency array to run this effect only once on mount

  const saveFeedbacksToLocalStorage = (newFeedbacks) => {
    // Save feedbacks to local storage whenever the state is updated
    localStorage.setItem("feedbacks", JSON.stringify(newFeedbacks));
  };

    // updates feedbacks through setFeedbacks 
    const addFeedback = () => {
      setFeedbacks((previousValue) => {
        const newFeedbacks = [...previousValue, formData];
      // Sort feedbacks by startDate in descending order
      const sortedFeedbacks = newFeedbacks.sort(
        (a, b) => new Date(b.startDate) - new Date(a.startDate)
      );
        saveFeedbacksToLocalStorage(sortedFeedbacks);
        return sortedFeedbacks;
      }); 
      setFormData(initialFormValues);
    };
  

//updates feedbacks through setFeedbacks by removing a feedback
const removeFeedback = (text) => {
  setFeedbacks((previousFeedbacks) => {
    const updatedFeedbacks = previousFeedbacks.filter(
      (feedback) => feedback.firstName !== text
    );
    
    saveFeedbacksToLocalStorage(updatedFeedbacks);
    
    return updatedFeedbacks;
  });
};

  //updates formData through setFormData when user inputs values
  const inputHandler = (e, stateName) => {
    setFormData((previousState) => {
      return {
        ...previousState,
        [stateName]: e.target.value,
      };
    });
  };

//Submitting the form
  const submitForm = (e) => {
    e.preventDefault();
    setFormData(initialFormValues);
    // Call the updateReminder function passed down from the parent component
  };

//updating Feedback during edit mode
  const updateFeedback = (firstName, updatedFeedback) => {
    // Implement logic to update the reminder in your data store or state
    // For example, if reminders is a state variable:
    setFeedbacks((prevFeedbacks) =>
      prevFeedbacks.map((feedback) =>
      feedback.firstName === firstName
          ? { ...feedback, feedback: updatedFeedback }
          : feedback
      )
    );
  }
  
    return (
      <div>
        <Card style={{ width: "60rem", padding: "2rem", margin: "2%" }}>
          <form className="col col-sm-12 col-lg-5" onSubmit={submitForm}>
            <FormItem
              label="Name"
              stateName="firstName"
              type="text"
              formData={formData}
              inputHandler={inputHandler}
            />
            {/* <FormItem label="Last Name" stateName="lastName" type="text" formData={formData} inputHandler={inputHandler} />       */}
            <FormItem
              label="Entry Date"
              stateName="startDate"
              type="date"
              formData={formData}
              inputHandler={inputHandler}
            />
            {/* <FormItem label="End Date" stateName="endDate" type="date" formData={formData} inputHandler={inputHandler} />       */}
            <FormItem
              label="Course"
              stateName="course"
              type="text"
              formData={formData}
              inputHandler={inputHandler}
            />
            <FormItem
              label="Feedback"
              stateName="feedback"
              type="text"
              formData={formData}
              inputHandler={inputHandler}
            />

            <div className="mb-3">
              {/* <button disabled={!noneEmpty && !startBeforeEnd} type='submit'>Submit Vacation Request</button> */}
              <button
                type="submit"
                className="btn btn-primary"
                onClick={addFeedback}
                disabled={!noneEmpty}
              >
                Add Feedback
              </button>
            </div>
          </form>
        </Card>

        {/* the returned list of reminders */}
        <div className="col col-sm-12 col-lg-8">
          {feedbacks.length === 0 && "no entries"}
          <ul>
            {feedbacks.length > 0 &&
              feedbacks.map((feedback, index) => (
                // <li key={index}>{`${reminder.firstName} ${reminder.lastName} ${reminder.startDate} ${reminder.course}`}<button onClick={(e) => removeReminder(reminder.firstName)} >X</button></li>)}
                <FeedbackCard
                  key={index}
                  feedback={feedback}
                  removeFeedback={removeFeedback}
                  updateFeedback={updateFeedback}
                />
              ))}
          </ul>
        </div>
      </div>
    );
  };

export default FeedbackForm;
