import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Logements from '../../assets/json/logements.json';
import starActive from '../../assets/images/starActive.svg';
import starInactive from '../../assets/images/starInactive.svg';

export default function LocationDetails() {
  const { locationId } = useParams();

  // Find the current location's details
  const currentLocation = Logements.find(
    (logement) => logement.id === locationId
  );

  // Send to error page if ID is wrong
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentLocation) {
      console.log(`Location with ID ${locationId} not found`);
      navigate('/Error');
    }
  }, [currentLocation, navigate, locationId]);

  if (!currentLocation) {
    console.log(`No currentLocation found for ID: ${locationId}`);
    return null;
  }

  const ratingNumber = Number(currentLocation.rating);

  return (
    <div className="locationDetailsWrapper">
      <div className="locationTitleWrapper">
        <h2 className="locationTitle">{currentLocation.title}</h2>
        <p className="locationSubtitle">{currentLocation.location}</p>
      </div>
      <div className="hostWrapper">
        <p className="hostName">{currentLocation.host.name}</p>
        <img
          src={currentLocation.host.picture}
          alt={currentLocation.host.name}
        />
      </div>
      <div className="locationTags">
        {currentLocation.tags.map((tag, index) => (
          <div key={index} className="locationTag">
            <p>{tag}</p>
          </div>
        ))}
      </div>
      <div className="locationRating">
        {[...Array(5)].map((_, index) => (
          <img
            key={index}
            src={index < ratingNumber ? starActive : starInactive}
            alt="Star"
          />
        ))}
      </div>
    </div>
  );
}
