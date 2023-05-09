import React, { useEffect, useState } from "react";
import Breed from "../../Components/Breed/Breed";
import axios from "axios";
import RandomDogImages from "../../Components/RandomDogImages/RandomDogImages";
import { Text, Box } from '@chakra-ui/react'

const Home = () => {
  const [data, setData] = useState({});
  const [random, setRandom] = useState([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    axios.get("https://dog.ceo/api/breeds/list/all").then((res) => {
      setData(res.data.message);
    });
  }, []);

  useEffect(() => {
    if (selected) {
      axios
        .get(`https://dog.ceo/api/breed/${selected}/images/random/50`)
        .then((res) => {
          setRandom(res.data.message);
        });
    } else {
      axios.get("https://dog.ceo/api/breeds/image/random/50").then((res) => {
        setRandom(res.data.message);
      });
    }
  }, [selected]);

  const handleClick = (breed) => {
    setSelected(breed);
  };

  return (
    <div>
      <Breed data={data} onClick={handleClick} selected={selected} />
      {selected ? (
        <Box fontSize={"2xl"} p={"10px"} marginLeft={"50px"}>
          <Text as="span" textTransform="uppercase" color="red">
            {selected}
          </Text>
          {" : Click any one to view full image "}
        </Box>
      ) : (
        <Text fontSize={"2xl"} p={"10px"} marginLeft={"50px"} >Click on any breed</Text>
      )}
      <RandomDogImages data={random} />
    </div>
  );
};

export default Home;
