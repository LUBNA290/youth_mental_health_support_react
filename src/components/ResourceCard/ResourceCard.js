import React from 'react';
import './ResourceCard.css';

const ResourceCard = ({ title, description, link }) => (
  <div className="resource-card">
    <h3 className="resource-title">{title}</h3>
    <p className="resource-description">{description}</p>
    <a href={link} className="resource-link" target="_blank" rel="noopener noreferrer">
      Learn More
    </a>
  </div>
);

export default ResourceCard;
