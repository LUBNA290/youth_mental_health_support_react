import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import './Dashboard.css';

const Dashboard = () => {
  const [step, setStep] = useState(1);
  const [helpType, setHelpType] = useState('');
  const [condition, setCondition] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleNext = () => {
    if (helpType === 'urgentHelp') {
      navigate('/book-appointment'); // Redirect to the appointment booking page
    } else if (helpType === 'gettingSupport') {
      navigate('/resources'); // Redirect to the resources page
    } else {
      setStep(step + 1);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (helpType === 'mentalHealthCondition') {
      try {
        // Retrieve user_id from localStorage
        const userId = localStorage.getItem('user_id');
        
        if (!userId) {
          alert('User ID is not available. Please log in again.');
          return;
        }

        const data = {
          user_id: userId,
          condition: condition
        };

        const config = {
          method: 'post',
          url: 'http://localhost:7002/ymhs/autenticate/user/condition',
          headers: {
            'Content-Type': 'application/json'
          },
          data: data
        };

        const response = await axios.request(config);
        console.log('Response:', response.data);

        // Handle success and navigate to the resources page
        alert('Condition updated successfully!');
        navigate('/book-appointment'); // Redirect to the resources page after successful submission

      } catch (error) {
        console.error('Error:', error);
        alert('Failed to update condition. Please try again.');
      }
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">How Can We Help You?</h2>
      {step === 1 && (
        <div className="question-container">
          <h3>1. What do you need help with?</h3>
          <div className="options-container">
            <label>
              <input
                type="radio"
                value="mentalHealthCondition"
                checked={helpType === 'mentalHealthCondition'}
                onChange={(e) => setHelpType(e.target.value)}
              />
              A mental health condition
            </label>
            <label>
              <input
                type="radio"
                value="gettingSupport"
                checked={helpType === 'gettingSupport'}
                onChange={(e) => setHelpType(e.target.value)}
              />
              Getting mental health support
            </label>
            <label>
              <input
                type="radio"
                value="urgentHelp"
                checked={helpType === 'urgentHelp'}
                onChange={(e) => setHelpType(e.target.value)}
              />
              I need urgent help
            </label>
          </div>
          <button onClick={handleNext} className="next-button">Next</button>
        </div>
      )}

      {step === 2 && helpType === 'mentalHealthCondition' && (
        <div className="question-container">
          <h3>2. We can help you with that.</h3>
          <p>What do you want tips and advice on?</p>
          <div className="options-container">
            {[
              'Anorexia', 'Anxiety', 'Bipolar disorder', 'Borderline personality disorder',
              'Bulimia', 'Depression', 'Mania and hypomania', 'OCD',
              'Panic attacks', 'Phobias', 'Psychosis', 'PTSD',
              'Schizophrenia', 'Self-harm', 'Suicidal thoughts and feelings', 'Trauma'
            ].map((conditionName) => (
              <label key={conditionName}>
                <input
                  type="radio"
                  value={conditionName}
                  checked={condition === conditionName}
                  onChange={(e) => setCondition(e.target.value)}
                />
                {conditionName}
              </label>
            ))}
          </div>
          <button onClick={handleSubmit} className="submit-button">Submit</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
