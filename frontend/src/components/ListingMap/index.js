import React, { useState, useRef, useEffect } from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';

const ListingMap = ({listings}) => {
  const [map, setMap] = useState(null);
  const mapRef = useRef(null);
  const markers = useRef({});


  // Create the map
  useEffect(() => {
    if (!map) {
      setMap(new window.google.maps.Map(mapRef.current, {
        center: {
          lat: 37.773972,
          lng: -122.431297
        }, // San Francisco coordinates
        zoom: 13,
        clickableIcons: false,
        ...mapOptions,
      }));
    }
  }, [mapRef, map, mapOptions]);


  return (
    <div ref={mapRef}> Map

    </div>
  )
}

const ListingMapWrapper = (props) => {
  return (
    <Wrapper apiKey={ProcessingInstruction.env.REACT_APP_MAPS_API_KEY}>
      <ListingMap {...props} />
    </Wrapper>
  )
}

export default ListingMapWrapper