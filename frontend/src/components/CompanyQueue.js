import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import {
  Box,
  SimpleGrid,
  Heading,
  Text,
  Button,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { FaBuilding } from "react-icons/fa";
import "./CompanyQueue.css"; // Add your global CSS here if needed

const companies = [
    {
        "Company Name": "Apple",
        "Location": "A0",
        "Logo": "",
        "Number of People": 5,
        "Wait Time": "25 min"
    },
    {
        "Company Name": "Meta",
        "Location": "A1",
        "Logo": "",
        "Number of People": 11,
        "Wait Time": "55 min"
    },
    {
        "Company Name": "NCR",
        "Location": "A2",
        "Logo": "",
        "Number of People": 9,
        "Wait Time": "45 min"
    },
    {
        "Company Name": "Google",
        "Location": "B0",
        "Logo": "",
        "Number of People": 7,
        "Wait Time": "35 min"
    },
    {
        "Company Name": "Spotify",
        "Location": "B1",
        "Logo": "",
        "Number of People": 7,
        "Wait Time": "35 min"
    },
    {
        "Company Name": "Bose",
        "Location": "B2",
        "Logo": "",
        "Number of People": 6,
        "Wait Time": "30 min"
    }

];

function CompanyQueue() {
  const [joinedCompany, setJoinedCompany] = useState({});
  const [timers, setTimers] = useState({});
  const toast = useToast();

  useEffect(() => {
    const savedQueue = JSON.parse(localStorage.getItem("joinedQueue")) || {};
    const savedTimers = JSON.parse(localStorage.getItem("timers")) || {};

    setJoinedCompany(savedQueue);
    setTimers(savedTimers);

    Object.keys(savedTimers).forEach((company) => {
      const timeLeft = savedTimers[company].timeLeft;
      if (timeLeft > 0) {
        startTimer(company, timeLeft);
      }
    });

    return () => {
      Object.keys(timers).forEach(company => {
        clearInterval(timers[company]?.interval);
      });
    };
  }, []);

  const joinQueue = (companyName) => {
    const waitTimeInSeconds = parseInt(companies.find(company => company["Company Name"] === companyName)["Wait Time"]) * 60;

    const updatedJoinedCompany = {
      ...joinedCompany,
      [companyName]: true,
    };
    setJoinedCompany(updatedJoinedCompany);
    localStorage.setItem("joinedQueue", JSON.stringify(updatedJoinedCompany));

    startTimer(companyName, waitTimeInSeconds);
  };

  const leaveQueue = (companyName) => {
    if (timers[companyName]) {
      clearInterval(timers[companyName]?.interval);
    }

    const updatedJoinedCompany = { ...joinedCompany };
    delete updatedJoinedCompany[companyName];
    setJoinedCompany(updatedJoinedCompany);
    localStorage.setItem("joinedQueue", JSON.stringify(updatedJoinedCompany));

    const updatedTimers = { ...timers };
    delete updatedTimers[companyName];
    setTimers(updatedTimers);
    localStorage.setItem("timers", JSON.stringify(updatedTimers));
  };

  const startTimer = (companyName, waitTimeInSeconds) => {
    let timeLeft = waitTimeInSeconds;

    if (timers[companyName]) {
      clearInterval(timers[companyName]?.interval);
    }

    const interval = setInterval(() => {
      timeLeft -= 1;

      setTimers((prevTimers) => {
        const newTimers = { ...prevTimers, [companyName]: { timeLeft, interval } };
        localStorage.setItem("timers", JSON.stringify(newTimers));
        return newTimers;
      });

      if (timeLeft <= 0) {
        clearInterval(interval);
        toast({
          title: "It's your turn!",
          description: `You are now next in line for ${companyName}.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setTimers((prevTimers) => {
          const updatedTimers = { ...prevTimers };
          delete updatedTimers[companyName];
          return updatedTimers;
        });
        localStorage.setItem("timers", JSON.stringify({ ...timers, [companyName]: null }));
      }
    }, 1000);
  };

  return (
    <div>
      <Navbar />
      {companies.map((company, i) => (
        <Box
          key={i}
          m={4}
          backgroundColor="white"
          borderRadius="md"
          p={6}
          border="1px solid #CBD5E0" /* Light gray border */
          w="100%"
          display="flex"
          maxW="1000px"
          boxShadow="lg" /* Soft shadow */
          transition="all 0.3s"
          _hover={{ transform: "scale(1.02)", boxShadow: "xl" }} /* Subtle hover effect */
        >
          <SimpleGrid columns={[1, 3]} spacing={10}>
            <Box display="flex" alignItems="center" flexDirection="row">
              <Icon as={FaBuilding} boxSize={10} color="blue.500" mr={4} />
              <Heading as="h1" size="lg" noOfLines={1}>
                {company["Company Name"]}
              </Heading>
            </Box>

            <Box mt={4}>
              <Text fontSize="md" fontWeight="bold" color="gray.600">
                Estimated Wait Time: {company["Wait Time"]}
              </Text>

              {joinedCompany[company["Company Name"]] && (
                <Text color="red.500" fontWeight="bold" mt={2}>
                  Joined Queue: {Math.floor(parseInt(company["Wait Time"]) / 5) + 1}
                  {timers[company["Company Name"]] && (
                    <Text color="gray.500">
                      - Time left: {Math.floor(timers[company["Company Name"]].timeLeft / 60) || 0}:
                      {("0" + (timers[company["Company Name"]].timeLeft % 60 || 0)).slice(-2)}
                    </Text>
                  )}
                </Text>
              )}
            </Box>

            <Box display="flex" flexDirection="column" alignItems="center">
              <Button
                onClick={() => joinQueue(company["Company Name"])}
                colorScheme="teal"
                variant="solid"
                px={6}
                py={4}
                borderRadius="full"
                boxShadow="md"
                _hover={{ bg: "teal.400", transform: "scale(1.05)" }}
                mb={4}
                isDisabled={joinedCompany[company["Company Name"]]}
              >
                {joinedCompany[company["Company Name"]] ? "Joined Queue" : "Join Queue"}
              </Button>
              {joinedCompany[company["Company Name"]] && (
                <Button
                  onClick={() => leaveQueue(company["Company Name"])}
                  colorScheme="red"
                  variant="solid"
                  px={6}
                  py={4}
                  borderRadius="full"
                  boxShadow="md"
                  _hover={{ bg: "red.400", transform: "scale(1.05)" }}
                >
                  Leave Queue
                </Button>
              )}
            </Box>
          </SimpleGrid>
        </Box>
      ))}
    </div>
  );
}

export default CompanyQueue;
