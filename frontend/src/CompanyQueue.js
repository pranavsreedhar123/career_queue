import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
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
    const [joinedCompany, setJoinedCompany] = useState({}); // Track if the user has joined a queue for each company
    const [timers, setTimers] = useState({}); // Track timers for each company
    const toast = useToast(); // Initialize toast for notifications

    // Load the joined company data and timers from localStorage when the component mounts
    useEffect(() => {
        const savedQueue = JSON.parse(localStorage.getItem("joinedQueue")) || {};
        const savedTimers = JSON.parse(localStorage.getItem("timers")) || {};

        setJoinedCompany(savedQueue);
        setTimers(savedTimers);

        // Start timers for any existing entries
        Object.keys(savedTimers).forEach((company) => {
            const timeLeft = savedTimers[company].timeLeft;
            if (timeLeft > 0) {
                startTimer(company, timeLeft);
            }
        });

        return () => {
            // Cleanup any timers when the component unmounts
            Object.keys(timers).forEach(company => {
                clearInterval(timers[company]?.interval);
            });
        };
    }, []);

    const joinQueue = (companyName) => {
        const waitTimeInSeconds = parseInt(companies.find(company => company["Company Name"] === companyName)["Wait Time"]) * 60; // Convert wait time to seconds

        // Mark the company as joined and save to localStorage
        const updatedJoinedCompany = {
            ...joinedCompany,
            [companyName]: true,
        };
        setJoinedCompany(updatedJoinedCompany);
        localStorage.setItem("joinedQueue", JSON.stringify(updatedJoinedCompany));

        // Start the timer for the estimated wait time
        startTimer(companyName, waitTimeInSeconds);
    };

    const startTimer = (companyName, waitTimeInSeconds) => {
        let timeLeft = waitTimeInSeconds;

        // Clear existing timer if it exists
        if (timers[companyName]) {
            clearInterval(timers[companyName]?.interval);
        }

        // Create a new interval
        const interval = setInterval(() => {
            timeLeft -= 1;

            // Update timers state
            setTimers((prevTimers) => {
                const newTimers = { ...prevTimers, [companyName]: { timeLeft, interval } };
                localStorage.setItem("timers", JSON.stringify(newTimers)); // Save updated timers to localStorage
                return newTimers;
            });

            // Notify user when time is up
            if (timeLeft <= 0) {
                clearInterval(interval);
                toast({
                    title: "It's your turn!",
                    description: `You are now next in line for ${companyName}.`,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
                // Clear timer after alert
                setTimers((prevTimers) => {
                    const updatedTimers = { ...prevTimers };
                    delete updatedTimers[companyName]; // Remove the timer for this company
                    return updatedTimers;
                });
                localStorage.setItem("timers", JSON.stringify({ ...timers, [companyName]: null })); // Update localStorage
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
                    backgroundColor="lightblue"
                    borderRadius="md"
                    p={4}
                    border="2px solid black"
                    w="100%"
                    display="flex"
                    maxW="1000px"
                    boxShadow="md"
                >
                    <SimpleGrid columns={3} spacing={10}>
                        {/* Column 1: Company Info */}
                        <Box display="flex" alignItems="center" flexDirection="row">
                            <Icon as={FaBuilding} boxSize={10} color="blue.500" mr={4} />
                            <Heading as="h1" size="2xl" noOfLines={1} mb={4}>
                                {company["Company Name"]}
                            </Heading>
                        </Box>

                        {/* Column 2: Estimated Wait Time */}
                        <Box mt={4}>
                            <Text fontSize="lg" fontWeight="bold">
                                Estimated Wait Time: {company["Wait Time"]}
                            </Text>

                            {/* Conditionally render "Joined Queue" if the user has joined */}
                            {joinedCompany[company["Company Name"]] && (
                                <Heading as="h3" size="md" color="red.500" mt={2}>
                                    Joined Queue: {Math.floor(parseInt(company["Wait Time"]) / 5) + 1}
                                    {timers[company["Company Name"]] && (
                                        <Text>
                                            {" "}
                                            - Time left: {
                                                Math.floor(timers[company["Company Name"]].timeLeft / 60) || 0
                                            }:
                                            {("0" + (timers[company["Company Name"]].timeLeft % 60 || 0)).slice(-2)}
                                        </Text>
                                    )}
                                </Heading>
                            )}
                        </Box>

                        {/* Column 3: Join Queue Button */}
                        <Box
                            p={4}
                            borderRadius="md"
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Button
                                onClick={() => joinQueue(company["Company Name"])} // Pass company dynamically
                                colorScheme="pink"
                                variant="solid"
                                px={4}
                                py={2}
                                borderRadius="full"
                                boxShadow="md"
                                _hover={{ bg: "pink.300", transform: "scale(1.05)" }}
                                mb={4}
                                disabled={joinedCompany[company["Company Name"]]} // Disable button if already joined
                            >
                                {joinedCompany[company["Company Name"]] ? "Joined Queue" : "Join Queue"}
                            </Button>
                        </Box>
                    </SimpleGrid>
                </Box>
            ))}
        </div>
    );
}

export default CompanyQueue;

