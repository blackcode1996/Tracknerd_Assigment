import { Box, Center, Flex, Image, Text } from "@chakra-ui/react";
import React, { useState, useRef, useEffect } from "react";
import "./Maps.css";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const Maps = ({ data, selectedBreed, handleBreedClick, google }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const breedboxRef = useRef(null);

  const [randomCordinates, setRandomCordinates] = useState([]);

  function generateCoordinates(n) {
    let coordinates = [];
    for (let i = 0; i < n; i++) {
      let lat = Math.random() * (90 * 2) - 90;
      let lon = Math.random() * (180 * 2) - 180;
      coordinates.push([lat.toFixed(6), lon.toFixed(6)]);
    }
    return coordinates;
  }

  useEffect(() => {
    setRandomCordinates(generateCoordinates(10));
  }, [selectedBreed]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - breedboxRef.current.offsetLeft);
    setScrollLeft(breedboxRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - breedboxRef.current.offsetLeft;
    const walk = (x - startX) * 3;
    breedboxRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <Box>
      <Box mb={"10px"}>
        <Box
          className="breedbox"
          ref={breedboxRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {Object.keys(data).map((breed, index) => (
            <Box
              className={`mainbox ${breed === selectedBreed ? "selected" : ""}`}
              key={index}
              onClick={() => handleBreedClick(breed)}
            >
              <Image
                className="img"
                alt={breed}
                src="https://th.bing.com/th/id/R.d057d8e5e29626ead32a1ed0edad1cec?rik=yd4nkhMVdY2jCA&riu=http%3a%2f%2fclipart-library.com%2fimages_k%2fcartoon-dog-transparent%2fcartoon-dog-transparent-9.png&ehk=Fm3gNUHOmRtlnEDhon%2fxJuLDtuakS8jFgUkXcwqEZb0%3d&risl=&pid=ImgRaw&r=0"
              />
              <Text className="text">{breed}</Text>
            </Box>
          ))}
        </Box>
      </Box>
      {selectedBreed ? (
        <Map
          google={google}
          style={{
            width: "60%",
            height: "150%",
            borderRadius: "20px",
            margin: "auto",
            marginTop: "50px",
            border: "10px solid gray",
          }}
          className={"map"}
          zoom={2}
        >
          {randomCordinates.map((item) => (
            <Marker position={{ lat: item[0], lng: item[1] }} />
          ))}
        </Map>
      ) : (
        <Text fontSize={"20px"} mt={"20px"} textAlign={"center"}>
          Please select a breed to get location
        </Text>
      )}
    </Box>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyBqT4gTQ4xgnC53jUMNYriVCe262bMQq9k",
})(Maps);
