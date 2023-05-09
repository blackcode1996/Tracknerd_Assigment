import React, { useState, useEffect } from "react";
import axios from "axios";
import Subbreed from "../../Components/SubBreed/Subbreed";

const List = () => {
  const [breeds, setBreeds] = useState({});
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [subBreeds, setSubBreeds] = useState([]);
  const [subBreedImage, setSubBreedImage] = useState(null);

  useEffect(() => {
    axios.get("https://dog.ceo/api/breeds/list/all").then((res) => {
      setBreeds(res.data.message);
    });
  }, []);

  useEffect(() => {
    if (selectedBreed) {
      axios
        .get(`https://dog.ceo/api/breed/${selectedBreed}/list`)
        .then((res) => {
          setSubBreeds(res.data.message)
        });
    }
  }, [selectedBreed]);


  useEffect(() => {
    if (subBreeds.length > 0) {
      
      subBreeds.map((item)=>{
        return (
          axios
          .get(`https://dog.ceo/api/breed/${selectedBreed}/${item}/images/random`)
          .then((res) => {
            setSubBreedImage(res.data.message);
          })
        )
      })

    }
  }, [subBreeds]);

  const handleBreedClick = (breed) => {
    setSelectedBreed(breed);
  };

  return (
    <div>
      <Subbreed
        data={breeds}
        selectedBreed={selectedBreed}
        handleBreedClick={handleBreedClick}
        subBreeds={subBreeds}
        subBreedImage={subBreedImage}
      />
    </div>
  );
};

export default List;
