import React from "react";

const GoogleMap = ({ location, width = "100%", height = "300", zoom = 15 }) => {
  const mapSrc = `https://maps.google.com/maps?width=${width}&height=${height}&hl=en&q=${encodeURIComponent(
    location
  )}&t=&z=${zoom}&ie=UTF8&iwloc=B&output=embed`;

  return (
    <iframe
      width={width}
      height={height}
      frameBorder="0"
      scrolling="no"
      marginHeight="0"
      marginWidth="0"
      src={mapSrc}
      title="Google Map"
    ></iframe>
  );
};

export default GoogleMap;
