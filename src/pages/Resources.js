import React from 'react';
import ResourceCard from '../components/ResourceCard/ResourceCard';

const Resources = () => (
  <div>
    <h2>Resources</h2>
    <ResourceCard
      title="National Alliance on Mental Illness"
      description="NAMI provides advocacy, education, support, and public awareness."
      link="https://www.nami.org/"
    />
  </div>
);

export default Resources;