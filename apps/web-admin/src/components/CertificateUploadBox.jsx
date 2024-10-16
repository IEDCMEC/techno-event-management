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
  const [variables, setVariables] = useState({}); // Store variables for each text

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
    setVariables({});
  };

  const handleDoubleClick = (e) => {
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
      },
    ]);
  };

  const handleEditClick = (textObj) => {
    setSelectedText(textObj); // Set selected text to edit
    onOpen(); // Open modal
  };

  const handleDeleteClick = (textId) => {
    setTexts((prevTexts) => prevTexts.filter((text) => text.id !== textId));
    setVariables((prevVars) => {
      const newVars = { ...prevVars };
      delete newVars[textId]; // Remove variables for the deleted text
      return newVars;
    });
  };

  // Function to detect variables in the text
  const checkVariable = (text) => {
    const regex = /{{\s*([a-zA-Z_$][a-zA-Z_$0-9]*)\s*}}/g;
    const matches = text.match(regex);
    if (matches) {
      return matches.map((match) => match.replace(/{{\s*|\s*}}/g, ""));
    }
    return [];
  };

  const handleModalSubmit = () => {
    // Update the text object
    setTexts((prevTexts) =>
      prevTexts.map((text) => (text.id === selectedText.id ? { ...text, ...selectedText } : text)),
    );

    // Check and update variables for this text
    const newVariables = checkVariable(selectedText.text);
    setVariables((prevVars) => ({
      ...prevVars,
      [selectedText.id]: newVariables,
    }));

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
    <Box display="flex" justifyContent="center" gap="10px" alignItems="top" height="100vh">
      <AspectRatio ratio={16 / 9} width="70%" height="70%" maxW="100%">
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
            <Box width="100%" height="100%" position="absolute" top={0} left={0}>
              <Stage width={parentSize.width} height={parentSize.height} onDblClick={handleDoubleClick}>
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
                      fontStyle={`${textObj.isBold ? 'bold' : ''} ${textObj.isItalic ? 'italic' : ''}`}
                      textDecoration={textObj.isUnderline ? 'underline' : ''}
                      draggable={textObj.draggable}
                      onDragMove={(e) => {
                        textObj.x = e.target.position().x;
                        textObj.y = e.target.position().y;
                      }}
                      onClick={() => handleEditClick(textObj)}
                    />
                  ))}
                </Layer>
              </Stage>
            </Box>
          ) : (
            <Text fontSize="lg" color="gray.500">
              Upload an Image
            </Text>
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
          <Button colorScheme="red" size="sm" onClick={handleResetBackground}>
            Reset Background
          </Button>
          <Text> Text Controls </Text>
          <IconButton
            icon={<MdAdd />}
            aria-label="Increase font size"
            onClick={() => handleFontSizeChange('increase')}
          />
          <IconButton
            icon={<MdRemove />}
            aria-label="Decrease font size"
            onClick={() => handleFontSizeChange('decrease')}
          />
          <IconButton
            icon={<MdFormatBold />}
            aria-label="Toggle bold"
            onClick={() => handleFontStyleToggle('bold')}
          />
          <IconButton
            icon={<MdFormatItalic />}
            aria-label="Toggle italic"
            onClick={() => handleFontStyleToggle('italic')}
          />
          <IconButton
            icon={<MdFormatUnderlined />}
            aria-label="Toggle underline"
            onClick={() => handleFontStyleToggle('underline')}
          />
        </VStack>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Text</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              value={selectedText?.text || ''}
              onChange={(e) => setSelectedText({ ...selectedText, text: e.target.value })}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleModalSubmit}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default CertifcateUploadBox;
