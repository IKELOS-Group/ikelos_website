// src/components/Services.js
import React, { useState } from 'react';
import '../Services.css'; // Make sure the path is correct

import brandIPImage from '../images/brand-ip.jpg';
import threatSurfaceImage from '../images/threat-surface.jpg';
import vectorManagementImage from '../images/attack-vector.jpg';
import securityConsultingImage from '../images/consulting.jpg';
import financialSecurityImage from '../images/financial.jpg';

const servicesData = {
    'Brand and IP Protection': {
      description: 'In an era where intellectual property is as valuable as tangible assets, our Brand and IP Protection services stand as your first line of defense. We safeguard your invaluable intellectual assets against infringement, ensuring your creative and business efforts are securely yours.',
      image: brandIPImage,
    },
    'Individual Threat Surface Management': {
      description: 'Your personal digital footprint is more exposed than ever. Our Individual Threat Surface Management is tailored to minimize risks and shield your digital presence from emerging threats, ensuring your private information stays private.',
      image: threatSurfaceImage,
    },
    'Attack Vector Management': {
      description: 'We identify and fortify potential vulnerabilities in your systems. Our proactive approach in Attack Vector Management not only anticipates threats but also strategically mitigates them, ensuring a fortified barrier against digital intrusions.',
      image: vectorManagementImage,
    },
    'Security Consulting': {
      description: 'Our team of experts brings a wealth of knowledge and experience in security consulting. We provide insightful, bespoke advice and strategies, empowering you to make informed decisions in securing your operations and assets.',
      image: securityConsultingImage,
    },
    'Financial Security': {
      description: 'In the volatile domain of financial assets, our Financial Security services offer robust protection strategies. From transaction security to fraud prevention, we ensure your financial activities are conducted with utmost security and confidence.',
      image: financialSecurityImage,
    },
  };

const Services = () => {
    const [activeService, setActiveService] = useState('Brand and IP Protection');
  
    return (
      <div className="services-container">
        <div className="services-list">
          {Object.keys(servicesData).map((service) => (
            <button
              key={service}
              className={`service-button ${activeService === service ? 'active' : ''}`}
              onClick={() => setActiveService(service)}
            >
              {service}
            </button>
          ))}
        </div>
        <div className="service-description">
          <p>{servicesData[activeService].description}</p>
          <img src={servicesData[activeService].image} alt={activeService} className="service-image" />
        </div>
      </div>
    );
  };
  
  export default Services;
