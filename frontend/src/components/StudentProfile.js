import React, { useRef, useState, useContext } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Image,
  Button,
  SimpleGrid,
  Input,
  Textarea,
  useToast,
  Divider,
} from "@chakra-ui/react";
import './StudentProfile.css'; // Import CSS
import Navbar from "./Navbar";
import { ProfileContext } from "../ProfileContext"; // Import context

const StudentProfile = () => {
  const { profileData, setProfileData } = useContext(ProfileContext); // Use context

  const fileInput = useRef(null);
  const resumeInput = useRef(null);  // Ref for resume file input
  const [newSkill, setNewSkill] = useState(""); // For adding new skill
  const [editMode, setEditMode] = useState(false); // Toggle for editing
  const toast = useToast();

  // Handle uploading profile picture
  const handleUploadClick = () => {
    fileInput.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({ ...profileData, profilePic: reader.result }); // Update profile picture in context
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle resume file upload
  const handleResumeUploadClick = () => {
    resumeInput.current.click();
  };

  const handleResumeChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Save resume data as base64
        setProfileData({ ...profileData, resume: reader.result });
        toast({
          title: "Resume uploaded successfully",
          description: `${file.name} has been uploaded.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle saving changes
  const handleSaveChanges = () => {
    setEditMode(false);  // Switch back to non-edit mode
    toast({
      title: "Profile updated successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  // Handle adding a new skill
  const handleAddSkill = () => {
    if (newSkill.trim()) {
      const updatedSkills = [...profileData.skills, newSkill]; // Add new skill to the list
      setProfileData({ ...profileData, skills: updatedSkills }); // Save in context
      setNewSkill(""); // Clear input field
      toast({
        title: "Skill added",
        description: `${newSkill} has been added to your skills.`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  // Handle removing a skill
  const handleRemoveSkill = (index) => {
    const updatedSkills = profileData.skills.filter((_, i) => i !== index); // Remove skill by index
    setProfileData({ ...profileData, skills: updatedSkills }); // Save in context
    toast({
      title: "Skill removed",
      description: `Skill has been removed.`,
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <>
      <Navbar />
      <Box className="student-profile-container" p={8} maxW="900px" mx="auto">
        {/* Dynamic Button in the top-right corner */}
        <Button
          onClick={editMode ? handleSaveChanges : () => setEditMode(true)}
          className="button-primary edit-button"
        >
          {editMode ? "Save Changes" : "Edit Profile"}
        </Button>

        <HStack align="flex-start" mb={6} spacing={12}>
          <VStack align="center" spacing={5}>
            <Image
              className="profile-image"
              src={profileData.profilePic} // Use profile picture from context
              alt="Profile Picture"
              boxSize="250px"
              borderRadius="full"
              objectFit="cover"
              boxShadow="lg"
            />

            {editMode && (
              <>
                <Input
                  type="file"
                  accept="image/*"
                  ref={fileInput}
                  onChange={handleFileChange}
                  display="none"
                />
                <Button onClick={handleUploadClick} className="button-primary">
                  Change Profile Picture
                </Button>
              </>
            )}

            {/* Editable Name */}
            <Text className="profile-name" fontSize="2xl" fontWeight="bold">
              {editMode ? (
                <Input
                  value={profileData.name} // Use name from context
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  bg="gray.100"
                  borderRadius="md"
                  placeholder="Enter your name"
                />
              ) : (
                profileData.name
              )}
            </Text>
          </VStack>

          <VStack align="flex-start" spacing={4} flex="1">
            {/* Editable fields */}
            <Text fontWeight="bold">Bio:</Text>
            {editMode ? (
              <Textarea
                value={profileData.bio} // Use bio from context
                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                bg="gray.100"
                size="sm"
                borderRadius="md"
                placeholder="Enter bio"
              />
            ) : (
              <Text>{profileData.bio}</Text>
            )}

            <Divider />

            <Text fontWeight="bold">Major:</Text>
            {editMode ? (
              <Input
                value={profileData.major} // Use major from context
                onChange={(e) => setProfileData({ ...profileData, major: e.target.value })}
                bg="gray.100"
                borderRadius="md"
                placeholder="Enter major"
              />
            ) : (
              <Text>{profileData.major}</Text>
            )}

            <Divider />

            <Text fontWeight="bold">Year:</Text>
            {editMode ? (
              <Input
                value={profileData.year} // Use year from context
                onChange={(e) => setProfileData({ ...profileData, year: e.target.value })}
                bg="gray.100"
                borderRadius="md"
                placeholder="Enter year"
              />
            ) : (
              <Text>{profileData.year}</Text>
            )}

            <Divider />

            <Text fontWeight="bold">Graduation Date:</Text>
            {editMode ? (
              <Input
                value={profileData.gradDate} // Use graduation date from context
                onChange={(e) => setProfileData({ ...profileData, gradDate: e.target.value })}
                bg="gray.100"
                borderRadius="md"
                placeholder="Enter graduation date"
              />
            ) : (
              <Text>{profileData.gradDate}</Text>
            )}

            <Divider />

            <Text fontWeight="bold">Looking For:</Text>
            {editMode ? (
              <Input
                value={profileData.jobSearch} // Use job search status from context
                onChange={(e) => setProfileData({ ...profileData, jobSearch: e.target.value })}
                bg="gray.100"
                borderRadius="md"
                placeholder="Enter job search status"
              />
            ) : (
              <Text>{profileData.jobSearch}</Text>
            )}
          </VStack>
        </HStack>

        <VStack align="flex-start" spacing={5}>
          <Box className="skills-container" w="100%">
            <Text className="skills-title" fontSize="xl" fontWeight="bold" mb={4}>
              Top Skills
            </Text>
            <SimpleGrid columns={[2, 2, 4]} spacing={4}>
              {profileData.skills.map((skill, i) => (
                <Box
                  key={i}
                  className="skill-box"
                  p={3}
                  borderRadius="md"
                  bg="gray.100"
                  textAlign="center"
                  fontWeight="bold"
                  boxShadow="sm"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text>{skill}</Text>
                  {editMode && (
                    <Button
                      size="xs"
                      colorScheme="red"
                      onClick={() => handleRemoveSkill(i)}
                    >
                      Remove
                    </Button>
                  )}
                </Box>
              ))}
            </SimpleGrid>

            {editMode && (
              <>
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add new skill"
                  mt={4}
                  bg="gray.100"
                  borderRadius="md"
                />
                <Button onClick={handleAddSkill} className="button-primary" mt={2}>
                  Add Skill
                </Button>
              </>
            )}
          </Box>

          {/* Resume Upload */}
          <Input
            type="file"
            ref={resumeInput}
            onChange={handleResumeChange}
            display="none"
            accept=".pdf,.doc,.docx"
          />
          <Button onClick={handleResumeUploadClick} className="button-primary">
            {profileData.resume ? `Resume Uploaded` : "Upload Resume"}
          </Button>
        </VStack>
      </Box>
    </>
  );
};

export default StudentProfile;
