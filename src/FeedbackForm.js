import { useState, useEffect} from "react";
import FormItem from "./FormItem.js";
import FeedbackCard from "./FeedbackCard.js";
import Card from "react-bootstrap/Card";

const FeedbackForm = ({username}) => {
  //These are the initial form values
const initialFormValues = {
  firstName: username,
  startDate: "",
  course: "",
  feedback: "",
};
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

  //keeping track of course from dropdown
  const [selectedCourse, setSelectedCourse] = useState('');


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
        [stateName]: stateName === "firstName" ? username : e.target.value,
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

  // Filtered feedbacks based on selected course
    const filteredFeedbacks = selectedCourse
    ? feedbacks.filter((feedback) => feedback.course === selectedCourse)
    : feedbacks;
  
    return (
      <div>
        <Card className="feedback-form-card" style={{backgroundColor: '#EDECEC'}}>
          <form className="col col-sm-12 col-lg-5" onSubmit={submitForm}>
            <FormItem
              label="Name"
              stateName="firstName"
              type="text"
              formData={formData}
              inputHandler={inputHandler}
              disabled={true} // Set disabled attribute to true
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
                className="button SIbutton"
                onClick={addFeedback}
                disabled={!noneEmpty}
              >
                Add Feedback
              </button>
            </div>
          </form>
        </Card>

        {/* the returned list of reminders */}
        {/* Course filter dropdown */}
        <div className="mb-3">
          <label htmlFor="courseFilter" className="form-label">
            Filter by Course:
          </label>
          <select
            id="courseFilter"
            className="form-control"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            style={{ width: '150px', backgroundColor: '#EDECEC'}} 
          >
            <option value="">All Courses</option>
            {/* Add options based on your available courses */}
            <option value="SI 501">SI 501</option>
            <option value="SI 504">SI 504</option>
            <option value="SI 505">SI 505</option>
            <option value="SI 506">SI 506</option>
            <option value="SI 507">SI 507</option>
            <option value="SI 510">SI 510</option>
            <option value="SI 511">SI 511</option>
            <option value="SI 512">SI 512</option>
            <option value="SI 515">SI 515</option>
            <option value="SI 519">SI 519</option>
            <option value="SI 520">SI 520</option>
            <option value="SI 521">SI 521</option>
            <option value="SI 529">SI 529</option>
            <option value="SI 536">SI 536</option>
            <option value="SI 538">SI 538</option>
            <option value="SI 539">SI 539</option>
            <option value="SI 540">SI 540</option>
            <option value="SI 542">SI 542</option>
            <option value="SI 544">SI 544</option>
            <option value="SI 547">SI 547</option>            
          </select>
        </div>

        {/* <div className="col col-sm-12 col-lg-8"> */}
        <div className="feedback-card-grid">
          {filteredFeedbacks.length === 0 && "no entries"}
          <ul>
            {filteredFeedbacks.length > 0 &&
              filteredFeedbacks.map((feedback, index) => (
                <FeedbackCard
                  key={index}
                  feedback={feedback}
                  removeFeedback={removeFeedback}
                  updateFeedback={updateFeedback}
                  username = {username}
                />
              ))}
          </ul>
        </div>
      </div>
    );
  };

export default FeedbackForm;
