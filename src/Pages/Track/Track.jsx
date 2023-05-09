import React, { useState, useEffect } from "react";
import axios from "axios";
import Maps from "../../Components/Maps/Maps";



const Track = () => {

  const [breeds, setBreeds] = useState({});
  const [selectedBreed, setSelectedBreed] = useState(null);


  useEffect(() => {
    axios.get("https://dog.ceo/api/breeds/list/all").then((res) => {
      setBreeds(res.data.message);
    });
  }, []);


  const handleBreedClick = (breed) => {
    setSelectedBreed(breed);
  };


  return (
    <div>
      <Maps
        data={breeds}
        selectedBreed={selectedBreed}
        handleBreedClick={handleBreedClick}
      />
    </div>
  );
};

export default Track;
