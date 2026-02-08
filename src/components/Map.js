import React from "react";

const GoogleMap = ({
  name,
  lat,
  lng,
  width = "100%",
  height = "400",
  zoom = 15,
}) => {
  const query = encodeURIComponent(`${name} ${lat},${lng}`);
  const mapSrc = `https://maps.google.com/maps?q=${query}&z=15&output=embed`;

  return (
    <iframe
      width={width}
      height={height}
      src={mapSrc}
      loading="lazy"
      title="Google Map"
    ></iframe>
  );
};

export default GoogleMap;
