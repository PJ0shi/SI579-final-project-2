import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';

const FeedbackCard = ({ feedback, removeFeedback, updateFeedback }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedFeedback, setUpdatedFeedback] = useState(feedback.feedback);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setUpdatedFeedback(feedback.feedback);
  };

  const handleUpdateFeedback = () => {
    // Call updateFeedback with the updated feedback
    updateFeedback(feedback.firstName, updatedFeedback);
    setIsEditing(false);
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title className='name'>{feedback.firstName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted date">{feedback.startDate}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">{feedback.course}</Card.Subtitle>
        {isEditing ? (
          <textarea
            value={updatedFeedback}
            onChange={(e) => setUpdatedFeedback(e.target.value)}
            rows="3"
            className="form-control mb-2"
          />
        ) : (
          <Card.Text>{feedback.feedback}</Card.Text>
        )}
        {isEditing ? (
          <>
            <button className="btn btn-success" onClick={handleUpdateFeedback}>
              Save
            </button>
            <button className="btn btn-secondary ml-2" onClick={handleCancelEdit}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <Card.Link href="#" onClick={handleEdit}>
              Edit
            </Card.Link>
            <Card.Link href="#" onClick={() => removeFeedback(feedback.firstName)}>
              Delete
            </Card.Link>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default FeedbackCard;
