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
    },

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

        // Restart timers for companies in the queue with saved time left
        Object.keys(savedTimers).forEach((company) => {
            const timeLeft = savedTimers[company]?.timeLeft;
            if (timeLeft > 0) {
                startTimer(company, timeLeft);
            }
        });

        // Cleanup on component unmount
        return () => {
            Object.keys(timers).forEach(company => {
                clearInterval(timers[company]?.interval);
            });
        };
    }, []);

    const joinQueue = (companyName) => {
        const company = companies.find((company) => company["Company Name"] === companyName);
        const waitTimeInSeconds = parseInt(company["Wait Time"]) * 60; // Convert minutes to seconds

        const updatedJoinedCompany = {
            ...joinedCompany,
            [companyName]: true,
        };
        setJoinedCompany(updatedJoinedCompany);
        localStorage.setItem("joinedQueue", JSON.stringify(updatedJoinedCompany));

        startTimer(companyName, waitTimeInSeconds);
    };

    const leaveQueue = (companyName) => {
        // Cancel the timer for this company
        if (timers[companyName]) {
            clearInterval(timers[companyName]?.interval);
        }

        // Remove the company from the joined queue
        const updatedJoinedCompany = { ...joinedCompany };
        delete updatedJoinedCompany[companyName];
        setJoinedCompany(updatedJoinedCompany);
        localStorage.setItem("joinedQueue", JSON.stringify(updatedJoinedCompany));

        // Remove the timer for this company
        const updatedTimers = { ...timers };
        delete updatedTimers[companyName];
        setTimers(updatedTimers);
        localStorage.setItem("timers", JSON.stringify(updatedTimers));
    };

    const startTimer = (companyName, waitTimeInSeconds) => {
        let timeLeft = waitTimeInSeconds;

        // Clear any existing interval for this company
        if (timers[companyName]) {
            clearInterval(timers[companyName]?.interval);
        }

        const interval = setInterval(() => {
            timeLeft -= 1;

            setTimers((prevTimers) => {
                const newTimers = { ...prevTimers, [companyName]: { timeLeft, interval } };
                return newTimers;
            });

            // Save only the time left in local storage every 10 seconds to reduce excessive writes
            if (timeLeft % 10 === 0) {
                const currentTimers = { ...timers, [companyName]: { timeLeft } };
                localStorage.setItem("timers", JSON.stringify(currentTimers));
            }

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
                        <Box display="flex" alignItems="center" flexDirection="row">
                            <Icon as={FaBuilding} boxSize={10} color="blue.500" mr={4} />
                            <Heading as="h1" size="2xl" noOfLines={1} mb={4}>
                                {company["Company Name"]}
                            </Heading>
                        </Box>

                        <Box mt={4}>
                            <Text fontSize="lg" fontWeight="bold">
                                Estimated Wait Time: {company["Wait Time"]}
                            </Text>

                            {joinedCompany[company["Company Name"]] && (
                                <Heading as="h3" size="md" color="red.500" mt={2}>
                                    Joined Queue
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

                        <Box
                            p={4}
                            borderRadius="md"
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Button
                                onClick={() => joinQueue(company["Company Name"])}
                                colorScheme="pink"
                                variant="solid"
                                px={4}
                                py={2}
                                borderRadius="full"
                                boxShadow="md"
                                _hover={{ bg: "pink.300", transform: "scale(1.05)" }}
                                mb={4}
                                disabled={joinedCompany[company["Company Name"]]}
                            >
                                {joinedCompany[company["Company Name"]] ? "Joined Queue" : "Join Queue"}
                            </Button>
                            {joinedCompany[company["Company Name"]] && (
                                <Button
                                    onClick={() => leaveQueue(company["Company Name"])}
                                    colorScheme="red"
                                    variant="solid"
                                    px={4}
                                    py={2}
                                    borderRadius="full"
                                    boxShadow="md"
                                    _hover={{ bg: "red.300", transform: "scale(1.05)" }}
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
