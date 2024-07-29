// src/pages/Home.js
import React from 'react';
import './Home.css';
const Hero = () => (
    <section className="hero">
        <div className="hero-content">
            <h1>Welcome to Youth Mental Health Support</h1>
            <p>Your journey to mental wellness starts here.</p>
        </div>
    </section>
);

const ServiceCard = ({ title, description }) => (
    <div className="service-card">
        <h3 className="service-card-title">{title}</h3>
        <p>{description}</p>
    </div>
);

const Services = () => (
    <section className="services">
        <h2>Our Services</h2>
        <div className="services-list">
            <ServiceCard
                title="Counseling"
                description="Get professional counseling to help you navigate through difficult times."
            />
            <ServiceCard
                title="Support Groups"
                description="Join support groups and connect with others who understand your experiences."
            />
            <ServiceCard
                title="Educational Resources"
                description="Access a wealth of educational resources to help you understand mental health."
            />
        </div>
    </section>
);

const ReviewCard = ({ name, review }) => (
    <div className="review-card">
        <p className="review">{review}</p>
        <p className="reviewer">- {name}</p>
    </div>
);

const Reviews = () => (
    <section className="reviews">
        <h2>What People Are Saying</h2>
        <div className="reviews-list">
            <ReviewCard
                name="Jane Doe"
                review="This platform has been a lifesaver. The resources and support are amazing!"
            />
            <ReviewCard
                name="John Smith"
                review="I've found a community that understands me. Thank you for everything!"
            />
            <ReviewCard
                name="Mary Johnson"
                review="The counseling services have been top-notch. Highly recommend!"
            />
        </div>
    </section>
);

const Home = () => (
    <div>
        <Hero />
        <Services />
        <Reviews />
    </div>
);

export default Home;
