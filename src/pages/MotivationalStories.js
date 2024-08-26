import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MotivationalStories.css';

const MotivationalStories = () => {
  const [stories, setStories] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get('http://localhost:7002/motivation-stories');
        if (response.data.status === 200) {
          setStories(response.data.stories);
        } else {
          setErrorMessage('Failed to fetch stories.');
        }
      } catch (error) {
        console.error('Error fetching stories:', error);
        setErrorMessage('An error occurred while fetching stories. Please try again later.');
      }
    };

    fetchStories();
  }, []);

  const handleCreateStoryClick = () => {
    setShowPopup(true);
  };

  const handleSaveStory = async () => {
    if (!newTitle || !newContent) {
      setErrorMessage('Please fill out both fields.');
      return;
    }

    try {
      await axios.post('http://localhost:7002/motivation-stories', {
        title: newTitle,
        content: newContent,
        user_id: localStorage.getItem('user_id')
      });
      setShowPopup(false);
      setNewTitle('');
      setNewContent('');
      setErrorMessage('');
      // Refresh the stories list after saving
      const response = await axios.get('http://localhost:7002/motivation-stories');
      setStories(response.data.stories);
    } catch (error) {
      console.error('Error saving story:', error);
      setErrorMessage('An error occurred while saving the story. Please try again later.');
    }
  };

  return (
    <div className="motivational-stories">
      <h2>Motivational Stories</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button className="create-story-button" onClick={handleCreateStoryClick}>
        Create New Story
      </button>
      <div className="stories-list">
        {stories.length > 0 ? (
          stories.map((story) => (
            <div key={story.story_id} className="story-card">
              <h3>{story.title}</h3>
              <p>{story.content}</p>
              <p className="story-author">By {story.author_name}</p>
            </div>
          ))
        ) : (
          <p>No stories available.</p>
        )}
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Create New Story</h3>
            <label>
              Title:
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </label>
            <label>
              Content:
              <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              ></textarea>
            </label>
            <button onClick={handleSaveStory}>Save Story</button>
            <button onClick={() => setShowPopup(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MotivationalStories;
