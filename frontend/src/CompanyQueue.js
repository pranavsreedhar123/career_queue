import React, { useRef, useState } from "react";
import theme from "./theme";
import Navbar from "./components/Navbar";
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
    Heading,
    Badge,
    Icon
} from "@chakra-ui/react";
import { FaList } from "react-icons/fa";
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
        "Company Name": "Spotify",
        "Location": "A2",
        "Logo": "",
        "Number of People": 4,
        "Wait Time": "20 min"
    },
    {
        "Company Name": "Google",
        "Location": "B0",
        "Logo": "",
        "Number of People": 6,
        "Wait Time": "30 min"
    },
    {
        "Company Name": "Verizon",
        "Location": "B1",
        "Logo": "",
        "Number of People": 3,
        "Wait Time": "15 min"
    },
    {
        "Company Name": "Bose",
        "Location": "B2",
        "Logo": "",
        "Number of People": 8,
        "Wait Time": "40 min"
    },
    {
        "Company Name": "Sony",
        "Location": "C0",
        "Logo": "",
        "Number of People": 3,
        "Wait Time": "15 min"
    },
    {
        "Company Name": "NCR",
        "Location": "C1",
        "Logo": "",
        "Number of People": 9,
        "Wait Time": "45 min"
    },
    {
        "Company Name": "Tesla",
        "Location": "C2",
        "Logo": "",
        "Number of People": 3,
        "Wait Time": "15 min"
    }
];

function CompanyQueue({ companyName, avgWaitTimePerPerson }) {
    const [queue, setQueue] = useState([]);

    const joinQueue = (personName, company) => {
        setQueue((prevQueue) => [...prevQueue, personName]);
        console.log(`${personName} has joined the queue for ${company}.`);
    };

    const showQueue = (company) => {
        console.log(`Queue for ${company}:`);
        queue.forEach((person, index) => {
            console.log(`${index + 1}. ${person}`);
        });
    };

    const showPosition = (personName, company) => {
        const position = queue.indexOf(personName) + 1;
        if (position > 0) {
            console.log(`${personName} is at position ${position} in the queue for ${company}.`);
        } else {
            console.log(`${personName} is not in the queue for ${company}.`);
        }
    };

    const getPosition = (personName, company) => {
        const position = queue.indexOf(personName) + 1; // Calculate position (1-based index)
        return position > 0 ? position : null; // Return null if not found
        console.log(`${personName} is at position ${position} in the queue for ${company}.`);
    };

    const estimatedWaitTime = () => {
        const waitTime = queue.length * avgWaitTimePerPerson;
        console.log(`Estimated wait time for ${companyName}: ${waitTime} minutes.`);
    };

    // Call these functions as needed, or create buttons to trigger them

    return (
        <div>
            <Navbar />
            {/* <Box>
                    <Heading as='h1' size='2xl' noOfLines={1}>{companyName}Google</Heading>
                    <Button onClick={() => joinQueue('Alice', 'Google')}
                        bg="#fed7d7" // Soft color
                        variant="solid"
                        mt={2} // Margin top for spacing
                        px={4} // Extra padding for a button-like feel
                        py={2}
                        size='sm'
                        rounded='md'
                        borderRadius="full" // Rounded edges

                        boxShadow="md" // Shadow for depth
                        _hover={{
                            background: "white",
                            transform: "scale(1.05)"
                        }}
                    >
                        Join Queue

                    </Button>

                    <Button
                        onClick={() => showQueue('Google')}
                        leftIcon={<Icon as={FaList} />} // Icon for cuteness
                        bg="#d2edce" // Soft color
                        variant="solid"
                        mt={2} // Margin top for spacing
                        px={4} // Extra padding for a button-like feel
                        py={2}
                        size='sm'
                        rounded='md'
                        borderRadius="full" // Rounded edges

                        boxShadow="md" // Shadow for depth
                        _hover={{
                            background: "white",
                            transform: "scale(1.05)"
                        }}
                    >
                        Show Queue</Button>

                    <Box mt={4}>
                        <Text fontSize="lg" fontWeight="bold">
                            Estimated Wait Time: {estimatedWaitTime} minutes
                        </Text>
                    </Box>

                </Box> */}
            {companies.map((companies, i) => (
                <>

                    <Box width="50px" // Width of the square
                        height="50px" // Height of the square
                        backgroundColor="white" // Color of the square
                        borderRadius="md" // Optional: to give rounded corners
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        color="black"
                        fontFamily="Inter"
                        fontWeight="bold"
                    >
                        {getPosition('Alice')} {/* Display the position */}
                    </Box>


                    <Box
                        m={4}
                        backgroundColor="lightblue"
                        borderRadius="md"
                        p={4}
                        border="2px solid black"
                        w="100%"
                        display='flex'
                        maxW="1000px"
                        boxShadow="md"
                    >
                        <SimpleGrid columns={3} spacing={10} >
                            {/* Column 1: Company Info */}
                            <Box
                                display='flex'
                                slignItems='center'
                                flexDirection='row'
                            >
                                <Icon as={FaBuilding} boxSize={10} color="blue.500" mr={4} />
                                <Heading as="h1" size="2xl" noOfLines={1} mb={4}>
                                    {companies["Company Name"]}
                                </Heading>
                            </Box>
                            <Box mt={4}>
                                <Text fontSize="lg" fontWeight="bold">
                                    Estimated Wait Time: {companies["Wait Time"]}
                                </Text>
                            </Box>


                            {/* Column 2: Join Queue Button */}
                            <Box
                                p={4}
                                //   backgroundColor="white"
                                borderRadius="md"
                                display="flex"
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="center"

                            >
                                <Button
                                    onClick={() => joinQueue("Alice", companies["Company Name"])}
                                    colorScheme="pink"
                                    variant="solid"
                                    px={4}
                                    py={2}
                                    borderRadius="full"
                                    boxShadow="md"
                                    _hover={{ bg: "pink.300", transform: "scale(1.05)" }}
                                    mb={4}
                                >
                                    Join Queue
                                </Button>
                            </Box>
                        </SimpleGrid>
                    </Box>
                    {/* <h1>{companyName} Apple </h1>
            <button onClick={() => joinQueue('Alice', companyName)}>Join Queue</button>
            <button onClick={showQueue(companyName)}>Show Queue</button> */}
                </>
            ))
            }
        </div>
    );
}

export default CompanyQueue;

