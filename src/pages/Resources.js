import React from 'react';
import ResourceCard from '../components/ResourceCard/ResourceCard';
import './Resources.css';

const Resources = () => (
  <div style={{textAlign:"center"}}>
    <h2 className="resources-title">Mental Health Resources</h2>
  <div className="resources-container">
    
    <ResourceCard
      title="Anorexia"
      description="Information and support for managing anorexia and seeking help."
      link="https://www.nationaleatingdisorders.org/learn/by-disease/anorexia"
    />
    <ResourceCard
      title="Anxiety"
      description="Resources to help with anxiety management and treatment."
      link="https://adaa.org/understanding-anxiety"
    />
    <ResourceCard
      title="Bipolar Disorder"
      description="Find out more about bipolar disorder and available treatments."
      link="https://www.nami.org/About-Mental-Illness/Mental-Health-Conditions/Bipolar-Disorder"
    />
    <ResourceCard
      title="Borderline Personality Disorder"
      description="Support and information for borderline personality disorder."
      link="https://www.nami.org/About-Mental-Illness/Mental-Health-Conditions/Borderline-Personality-Disorder"
    />
    <ResourceCard
      title="Bulimia"
      description="Help and resources for those struggling with bulimia."
      link="https://www.nationaleatingdisorders.org/learn/by-disease/bulimia"
    />
    <ResourceCard
      title="Depression"
      description="Learn about depression and find resources for support."
      link="https://www.mentalhealth.gov/what-to-look-for/depression"
    />
    <ResourceCard
      title="Mania and Hypomania"
      description="Information about mania and hypomania symptoms and treatment."
      link="https://www.nami.org/About-Mental-Illness/Mental-Health-Conditions/Bipolar-Disorder"
    />
    <ResourceCard
      title="OCD"
      description="Support for obsessive-compulsive disorder (OCD)."
      link="https://iocdf.org/about-ocd/"
    />
    <ResourceCard
      title="Panic Attacks"
      description="Resources to understand and manage panic attacks."
      link="https://adaa.org/understanding-anxiety/panic-attacks"
    />
    <ResourceCard
      title="Phobias"
      description="Information and help for overcoming phobias."
      link="https://www.mentalhealth.org.uk/a-to-z/p/phobias"
    />
    <ResourceCard
      title="Psychosis"
      description="Resources and support for dealing with psychosis."
      link="https://www.nami.org/About-Mental-Illness/Mental-Health-Conditions/Psychosis"
    />
    <ResourceCard
      title="PTSD"
      description="Support and information for managing PTSD."
      link="https://www.ptsd.va.gov/"
    />
    <ResourceCard
      title="Schizophrenia"
      description="Find out more about schizophrenia and available resources."
      link="https://www.nami.org/About-Mental-Illness/Mental-Health-Conditions/Schizophrenia"
    />
    <ResourceCard
      title="Self-Harm"
      description="Information and support for individuals self-harming."
      link="https://www.selfinjury.com/"
    />
    <ResourceCard
      title="Suicidal Thoughts and Feelings"
      description="Find help and resources for dealing with suicidal thoughts."
      link="https://www.suicidepreventionlifeline.org/"
    />
    <ResourceCard
      title="Trauma"
      description="Support and resources for those dealing with trauma."
      link="https://www.rainn.org/articles/trauma"
    />
  </div>
  </div>
);

export default Resources;
