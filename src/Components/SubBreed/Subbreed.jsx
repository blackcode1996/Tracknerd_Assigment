import {
  Box,
  Table,
  Tbody,
  Tr,
  Td,
  Th,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Image,
  Thead,
  TableCaption,
  TableContainer,
  Flex,
  Text,
  useImage,
  ModalHeader,
} from "@chakra-ui/react";
import React, { useState, useRef } from "react";
import "./Subbreed.css";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

const Subbreed = ({
  data,
  selectedBreed,
  handleBreedClick,
  subBreeds,
  subBreedImage,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const breedboxRef = useRef(null);


  const handleModalOpen = (imageUrl) => {
    setModalImage(imageUrl);
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setModalImage(null);
    setIsOpen(false);
  };

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
        {selectedBreed ? (
          <Box className="subBreedContainer" mt={"20px"}>
            <Box className="subBreedBox">
              {subBreeds.length > 0 ? (
                <TableContainer>
                  <Table textAlign={"center"} m={"auto"} maxW={"3xl"}>
                    <Thead className="tablehead" >
                      <Tr borderRadius={"50px"}>
                        <Th
                          color={"#fff"}
                          fontWeight={800}
                          fontSize={"20px"}
                          className="center"
                         
                        >
                          SUB-BREED
                        </Th>
                        <Th
                          fontSize={"20px"}
                          fontWeight={800}
                          color={"#fff"}
                          className="right-align"
                        >
                          <Flex justifyContent="flex-end">
                            OPEN 1 IMAGE (MODAL)
                          </Flex>
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {subBreeds.map((subBreed, index) => (
                        <Tr key={index} fontSize={"xl"}>
                          <Td>
                            <span className="center">Sub-breed {subBreed}</span>
                          </Td>
                          <Td className="right-align">
                            <Flex justifyContent="flex-end">
                              <button
                                className="link"
                                onClick={() => handleModalOpen(subBreedImage)}
                              >
                                Link
                              </button>
                            </Flex>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              ) : (
                <Text
                  mt={"20px"}
                  className="noDataText"
                  textAlign={"center"}
                  fontSize={"xl"}
                >
                  No sub-breeds found. Try another breed.
                </Text>
              )}
            </Box>
          </Box>
        ) : (
          <Text
            mt={"20px"}
            className="noDataText"
            textAlign={"center"}
            fontSize={"xl"}
          >
            Select a breed to see sub-breeds.
          </Text>
        )}
        <Modal isOpen={isOpen} onClose={handleModalClose} borderRadius={"10px"}>
          <ModalOverlay />
          <ModalOverlay/>
          <ModalContent cursor="zoom-in">
          <ModalHeader>Zoomable Image (Double click)🔍</ModalHeader>
            <ModalCloseButton color={"#fff"} background={"gray.500"} zIndex={1}/>
            <TransformWrapper initialScale={1} className="trasformwrapper" cursor="zoom-in">
              <TransformComponent>
                <Image
                  margin={"auto"}
                  src={modalImage}
                  width="500px"
                  height="500px"
                  objectFit="cover"
                />
              </TransformComponent>
            </TransformWrapper>
          </ModalContent>
        </Modal>
      </Box>
  );
};

export default Subbreed;
