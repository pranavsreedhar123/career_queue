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
import './StudentProfile.css'; // Import CSS
import Navbar from "./Navbar";

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
    <>
      <Navbar />
      <Box className="student-profile-container">
        <HStack align="flex-start" mb={6}>
          <VStack align="flex-start" spacing={1}>
            <Image
              className="profile-image"
              src="sg.jpeg"
              alt="SHARADAAAAAA G"
            />
            <Text className="profile-name">SHARADAAAAAA G</Text>
            <Text className="profile-info">Bio: GT Webdev Lover</Text>
            <Text className="profile-info">Major: Computer Science</Text>
            <Text className="profile-info">Year: 2nd Year</Text>
            <Text className="profile-info">Graduation Date: Spring 2026</Text>
            <Text className="profile-info">Looking For: Entry-Level Job</Text>
          </VStack>
          <VStack marginLeft={30}>
            <Box className="skills-container">
              <Text className="skills-title">Top Skills</Text>
              <SimpleGrid columns={2} spacing={4}>
                {skills.map((skill, i) => (
                  <Box key={i} className="skill-box">
                    <Text>{skill}</Text>
                  </Box>
                ))}
              </SimpleGrid>
            </Box>
            <Input
              type="file"
              ref={fileInput}
              onChange={handleFileChange}
              display="none"
              accept=".pdf,.doc,.docx"
            />
            <Button
              onClick={handleUploadClick}
              className="upload-button"
            >
              {fileName ? `File Selected: ${fileName}` : "Upload Resume"}
            </Button>
          </VStack>
        </HStack>
      </Box>
    </>
  );
};

export default StudentProfile;
