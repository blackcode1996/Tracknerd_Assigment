import { Box, Text, Image } from "@chakra-ui/react";
import React, { useState, useRef } from "react";
import "./Breed.css";

const Breed = ({ data, onClick }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [selectedBreed, setSelectedBreed] = useState(null);
  const breedboxRef = useRef(null);


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

  const handleBreedClick = (breed) => {
    setSelectedBreed(breed);
    onClick(breed);
  };

  return (
    <Box mb={"10px"}>
      <Box
        className="breedbox"
        ref={breedboxRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
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
  );
};

export default Breed;
