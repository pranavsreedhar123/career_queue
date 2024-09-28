import React, { useRef, useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Image,
  Button,
  SimpleGrid,
  Input,
  useToast,
} from "@chakra-ui/react";

const StudentProfile = () => {
  const skills = ["Singing", "Yapping", "Google Drawing", "HTML", "CSS", "LC3"];

  const fileInput = useRef(null);
  const [fileName, setFileName] = useState("");
  const toast = useToast();

  const handleUploadClick = () => {
    fileInput.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      handleFileUpload(file);
    }
  };

  const handleFileUpload = (file) => {
    console.log("Uploading file:", file);

    setTimeout(() => {
      toast({
        title: "File uploaded successfully",
        description: `${file.name} has been uploaded.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }, 2000);
  };

  return (
    <Box padding={30} margin="auto" borderRadius="md">
      <HStack align="flex-start" mb={6}>
        <VStack align="flex-start" spacing={1}>
          <Image
            borderRadius="md"
            boxSize="100px"
            src="sg.jpeg"
            alt="SHARADAAAAAA G"
          />
          <Text fontSize="2xl" fontWeight="bold">
            SHARADAAAAAA G
          </Text>
          <Text fontSize="sm">Bio: GT Webdev Lover</Text>
          <Text fontSize="sm">Major: Computer Science</Text>
          <Text fontSize="sm">Year: 2nd Year</Text>
          <Text fontSize="sm">Graduation Date: Spring 2026</Text>
          <Text fontSize="sm">Looking For: Entry-Level Job</Text>
        </VStack>
        <VStack marginLeft={30}>
          <Box borderRadius="md" mb={4}>
            <Text fontWeight="bold" mb={2}>
              Top Skills
            </Text>
          </Box>
          <SimpleGrid columns={2} spacing={2}>
            {skills.map((skill, i) => (
              <Box
                key={i}
                p={2}
                borderRadius="md"
                border="1px solid black !important"
                style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.1) !important" }}
              >
                <Text fontSize="sm">{skill}</Text>
              </Box>
            ))}
          </SimpleGrid>
          <Input
            type="file"
            ref={fileInput}
            onChange={handleFileChange}
            display="none"
            accept=".pdf,.doc,.docx"
          />
          <Button
            onClick={handleUploadClick}
            colorScheme="yellow"
            variant="solid"
            width="full"
            boxShadow="sm"
          >
            {fileName ? `File Selected: ${fileName}` : "Upload Resume"}
          </Button>
        </VStack>
      </HStack>
    </Box>
  );
};

export default StudentProfile;
