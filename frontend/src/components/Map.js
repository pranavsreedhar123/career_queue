// import React from "react";

// const Map = () => {
//   return (
//     <div>
//       <h1>Map Component</h1>
//       <p>This will show the map with your current location.</p>
//     </div>
//   );
// };

// export default Map;
import React, { useState } from "react";
import {
  Box,
  SimpleGrid,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import './Map.css';  // Import the CSS file

// Sample company data
const companiesData = [
  {
    id: 1,
    name: "Company A",
    description: "Specializing in AI & Data Science roles.",
    recruiters: ["John Doe", "Jane Smith"],
    offer: "Internships & Full-time",
  },
  {
    id: 2,
    name: "Company B",
    description: "Looking for software developers.",
    recruiters: ["Alice Johnson"],
    offer: "Full-time only",
  },
  {
    id: 3,
    name: "Company C",
    description: "Focusing on data engineering and cloud services.",
    recruiters: ["Bob Taylor"],
    offer: "Internships",
  },
  // Add more companies as needed
];

const Map = () => {
  const { isOpen, onOpen, onClose } = useDisclosure(); // For modal control
  const [selectedCompany, setSelectedCompany] = useState(null); // Track selected company

  // Function to handle box click and open the modal with company details
  const handleBoxClick = (company) => {
    setSelectedCompany(company);
    onOpen();
  };

  return (
    <div className="map-container">
      <Text className="map-title">Career Fair Map</Text>

      {/* Generate a grid based on the number of companies */}
      <div className="map-grid">
        {companiesData.map((company) => (
          <div
            key={company.id}
            className="company-box"
            onClick={() => handleBoxClick(company)} // Handle box click
          >
            {company.name} {/* Display the company name */}
          </div>
        ))}
      </div>

      {/* Modal to show company details when a box is clicked */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent className="map-modal">
          <ModalHeader className="modal-header">{selectedCompany?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="modal-body">
            <Text>{selectedCompany?.description}</Text>
            <Text mt={2}>
              <strong>Recruiters:</strong> {selectedCompany?.recruiters.join(", ")}
            </Text>
            <Text mt={2}>
              <strong>Offer:</strong> {selectedCompany?.offer}
            </Text>
          </ModalBody>
          <ModalFooter className="modal-footer">
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Map;
