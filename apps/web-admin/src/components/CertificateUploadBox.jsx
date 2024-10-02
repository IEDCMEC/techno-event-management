'use client'; // Ensure this is a Client Component

import { useState, useRef, useEffect } from 'react';
import {
  Box,
  Text,
  AspectRatio,
  VStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Select,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdAdd,
  MdRemove,
  MdDelete,
} from 'react-icons/md'; // Import MdDelete icon
import dynamic from 'next/dynamic';
// import { useEffect } from 'react';
import { KonvaEventObject } from 'konva/lib/Node'; // Import for event types
const Stage = dynamic(() => import('react-konva').then((mod) => mod.Stage), { ssr: false });
const Layer = dynamic(() => import('react-konva').then((mod) => mod.Layer), { ssr: false });
const KonvaImage = dynamic(() => import('react-konva').then((mod) => mod.Image), { ssr: false });
const KonvaText = dynamic(() => import('react-konva').then((mod) => mod.Text), { ssr: false });

function CertifcateUploadBox() {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [imageSrc, setImageSrc] = useState(null);
  const [konvaImage, setKonvaImage] = useState(null);
  const [state, setState] = useState(false);
  const fileInputRef = useRef(null);
  const stageRef = useRef(null);
  const parentRef = useRef(null);
  const [parentSize, setParentSize] = useState({ width: 0, height: 0 });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedText, setSelectedText] = useState(null);
  const [texts, setTexts] = useState([]); // Store texts on canvas

  useEffect(() => {
    if (parentRef.current) {
      const updateSize = () => {
        setParentSize({
          width: parentRef.current.offsetWidth,
          height: parentRef.current.offsetHeight,
        });
      };
      updateSize();
      window.addEventListener('resize', updateSize);
      return () => {
        window.removeEventListener('resize', updateSize);
      };
    }
  }, []);

  const handleBoxClick = () => {
    if (!imageSrc) {
      fileInputRef.current.click();
    }
  };
  /*const handleDrag = (e) => {
    const newX = e.clientX - 50; // Adjust for mouse offset
    const newY = e.clientY - 20; // Adjust for mouse offset
    setPosition({ x: newX, y: newY });
  };*/

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const imageUrl = URL.createObjectURL(file);
        setImageSrc(imageUrl);

        if (imageSrc) {
          URL.revokeObjectURL(imageSrc);
        }
      } else {
        alert('Please upload an image file.');
      }
    }
  };

  useEffect(() => {
    if (imageSrc) {
      const image = new window.Image();
      image.src = imageSrc;
      image.onload = () => {
        setKonvaImage(image);
      };
      image.onerror = () => {
        console.error('Failed to load image.');
      };
    }
  }, [imageSrc]);

  const handleResetBackground = () => {
    setImageSrc(null);
    setKonvaImage(null);
    setTexts([]);
  };

  const handleDoubleClick = (e) => {
    //const stage = e.target.getStage();
    //const pointerPosition = stage.getPointerPosition();
    //setPosition(pointerPosition);
    //setState(true);
    setTexts((prevTexts) => [
      ...prevTexts,
      {
        id: texts.length + 1,
        x: position.x,
        y: position.y,
        text: 'Double-clicked Text',
        fontSize: 24,
        fontFamily: 'Arial',
        color: 'black',
        isBold: false,
        isItalic: false,
        isUnderline: false,
        draggable: true,
        //color:'white'
      },
    ]);
  };

  const handleEditClick = (textObj) => {
    setSelectedText(textObj); // Set selected text to edit
    //console.log(textObj);
    //  setState(true);
    //const stage = e.target.getStage();
    //const pointerPosition = stage.getPointerPosition();
    onOpen(); // Open modal
  };
  // useEffect(()=>{
  //   console.log(selectedText)
  //   if(selectedText){
  //     console.log('hello world');
  //     // console.log(selectedText.text)
  //     onOpen();
  //   }
  // },[selectedText])

  const handleDeleteClick = (textId) => {
    // Filter out the text with the matching id
    setTexts((prevTexts) => prevTexts.filter((text) => text.id !== textId));
  };

  const handleModalSubmit = () => {
    // Update the text object
    //console.log(selectedText)
    setTexts((prevTexts) =>
      prevTexts.map((text) => (text.id === selectedText.id ? { ...text, ...selectedText } : text)),
    );
    {
      texts.map((text) => {
        console.log(text);
      });
    }
    console.log(selectedText);

    //console.log(selectedText.currentTarget.id);
    //console.log(selectedText.id);
    //console.log()
    onClose(); // Close modal
  };

  const handleFontStyleToggle = (style) => {
    if (style === 'bold') {
      setSelectedText({ ...selectedText, isBold: !selectedText.isBold });
    } else if (style === 'italic') {
      setSelectedText({ ...selectedText, isItalic: !selectedText.isItalic });
    } else if (style === 'underline') {
      setSelectedText({ ...selectedText, isUnderline: !selectedText.isUnderline });
    }
  };

  const handleFontSizeChange = (action) => {
    if (action === 'increase') {
      setSelectedText({ ...selectedText, fontSize: selectedText.fontSize + 2 });
    } else if (action === 'decrease') {
      setSelectedText({
        ...selectedText,
        fontSize: selectedText.fontSize > 2 ? selectedText.fontSize - 2 : 2,
      });
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      gap="10px"
      alignItems="top"
      height="100vh"
      id="outer-box"
    >
      <AspectRatio ratio={16 / 9} width="70%" height="70%" maxW="100%" id="aspect-box">
        <Box
          borderWidth="2px"
          borderStyle="dashed"
          borderColor="black"
          borderRadius="xl"
          display="flex"
          gap="10px"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          onClick={handleBoxClick}
          cursor={!konvaImage ? 'pointer' : 'auto'}
          ref={parentRef}
        >
          {imageSrc ? (
            <>
              <Box width="100%" height="100%" position="absolute" top={0} left={0}>
                <Stage
                  width={parentSize.width}
                  height={parentSize.height}
                  onDblClick={handleDoubleClick}
                >
                  <Layer>
                    {konvaImage && (
                      <KonvaImage
                        image={konvaImage}
                        width={parentSize.width || 500}
                        height={parentSize.height || 500}
                        x={0}
                        y={0}
                      />
                    )}
                    {texts.map((textObj) => (
                      <KonvaText
                        key={textObj.id}
                        x={textObj.x}
                        y={textObj.y}
                        text={textObj.text}
                        fontSize={textObj.fontSize}
                        fontFamily={textObj.fontFamily}
                        fill={textObj.color}
                        fontStyle={`${textObj.isBold ? 'bold' : ''} ${
                          textObj.isItalic ? 'italic' : ''
                        }`}
                        textDecoration={textObj.isUnderline ? 'underline' : ''}
                        draggable={textObj.draggable}
                        onDragMove={(e) => {
                          textObj.x = e.target.position().x;
                          textObj.y = e.target.position().y;
                          //console.log(textObj.id,e.target.position().x,e.target.position().y)
                        }}
                        onClick={() => {
                          handleEditClick(textObj);
                        }}
                      />
                    ))}
                  </Layer>
                </Stage>
              </Box>
            </>
          ) : (
            <>
              <div>
                {/* SVG */}
                <Text fontSize="lg" color="gray.500">
                  Upload an Image
                </Text>
              </div>
            </>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
            accept="image/*"
          />
        </Box>
      </AspectRatio>

      {konvaImage && (
        <VStack>
          <Button colorScheme="red" size="sm" marginTop={10} onClick={handleResetBackground}>
            Reset Canvas
          </Button>
          {imageSrc ? <Button onClick={handleDoubleClick}>Add Text</Button> : null}
          {/*texts.length > 0 && (
            <VStack width="100%">
              {texts.map((textObj) => (
                <Box width="100%" key={textObj.id} display="flex" justifyContent="space-between">
                  <Button
                    id="edit-button"
                    colorScheme="teal"
                    size="sm"
                    width="80%"
                    onClick={() => handleEditClick(textObj)}
                  >
                    Edit {textObj.id}
                  </Button>
                  <IconButton
                    icon={<MdDelete />}
                    colorScheme="red"
                    size="sm"
                    aria-label="Delete Text"
                    onClick={() => handleDeleteClick(textObj.id)} // Delete button logic
                  />
                </Box>
              ))}
            </VStack>
          )*/}
        </VStack>
      )}

      {/* Modal for editing text properties */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Text Properties</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedText && (
              <>
                <Input
                  type="text"
                  value={selectedText.text}
                  onChange={(e) => setSelectedText({ ...selectedText, text: e.target.value })}
                  placeholder="Edit Text"
                  mb={3}
                />
                <Select
                  value={selectedText.fontFamily}
                  onChange={(e) => setSelectedText({ ...selectedText, fontFamily: e.target.value })}
                >
                  <option value="Arial">Arial</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Montserrat">Montserrat</option>
                  <option value="Poppins">Poppins</option>
                  <option value="Courier New">Courier New</option>
                  <option value="Times New Roman">Times New Roman</option>
                </Select>

                <Box display="flex" justifyContent="space-around" alignItems="center" mt={4}>
                  <IconButton
                    icon={<MdFormatBold />}
                    colorScheme={selectedText.isBold ? 'teal' : 'gray'}
                    onClick={() => handleFontStyleToggle('bold')}
                  />
                  <IconButton
                    icon={<MdFormatItalic />}
                    colorScheme={selectedText.isItalic ? 'teal' : 'gray'}
                    onClick={() => handleFontStyleToggle('italic')}
                  />
                  <IconButton
                    icon={<MdFormatUnderlined />}
                    colorScheme={selectedText.isUnderline ? 'teal' : 'gray'}
                    onClick={() => handleFontStyleToggle('underline')}
                  />
                </Box>

                <Box display="flex" justifyContent="space-around" alignItems="center" mt={4}>
                  <IconButton
                    icon={<MdAdd />}
                    colorScheme="teal"
                    onClick={() => handleFontSizeChange('increase')}
                  />
                  <Text>{selectedText.fontSize}px</Text>
                  <IconButton
                    icon={<MdRemove />}
                    colorScheme="teal"
                    onClick={() => handleFontSizeChange('decrease')}
                  />
                </Box>
              </>
            )}
            {/* You can add font and color selectors here */}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleModalSubmit}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default CertifcateUploadBox;
