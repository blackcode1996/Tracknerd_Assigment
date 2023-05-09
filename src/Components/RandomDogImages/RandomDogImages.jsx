import React, { useState } from "react";
import {
  Image,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  ModalHeader,
  useImage,
  Text
} from "@chakra-ui/react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import "./RandomDogImages.css";

const RandomDogImages = ({ data }) => {
  const [selectedImage, setSelectedImage] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { width: imageWidth, height: imageHeight } = useImage(selectedImage);

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    onOpen();
  };


  return (
    <>
      <Box className="main">
        {data.map((item, index) => (
          <Box
            className="insidebox"
            key={index}
            onClick={() => handleImageClick(item)}
          >
            <Image className="image" src={item} />
          </Box>
        ))}
      </Box>
      <Modal
        className="modal"
        m={0}
        p={0}
        isOpen={isOpen}
        onClose={onClose}
        width={imageWidth}
        height={imageHeight}
      >
        <ModalOverlay />
        <ModalOverlay />
        <ModalContent p={0} width={imageWidth} height={imageHeight}>
          <ModalHeader>Zoomable Image (Double click)🔍</ModalHeader>
          <ModalCloseButton className="closeButton" />
          <ModalBody cursor="zoom-in" p={"60px"}>
            <TransformWrapper initialScale={1} className="trasformwrapper">
              <TransformComponent>
                <Image
                  margin={"auto"}
                  src={selectedImage}
                  width={imageWidth}
                  height={imageHeight}
                  objectFit="cover"
                />
              </TransformComponent>
            </TransformWrapper>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RandomDogImages;
