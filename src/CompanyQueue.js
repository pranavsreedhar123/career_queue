import React, { useRef, useState } from "react";
import theme from "./theme";
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

const companies = [];

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
            <Box
                m={2}
                backgroundColor='lightblue'
                borderRadius='md'
                p={4}
                border='2px solid black'
                w='100%'
                display='flex'
                justifyContent='space-around'
                alignItems='center'

            >
                <Box>
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

                </Box>
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
                            {companyName} Google
                        </Heading>
                    </Box>
                    <Box mt={4}>
                        <Text fontSize="lg" fontWeight="bold">
                            Estimated Wait Time: {estimatedWaitTime()} minutes
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
                            onClick={() => joinQueue("Alice", companyName)}
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
                            {companyName} Apple
                        </Heading>
                    </Box>
                    <Box mt={4}>
                        <Text fontSize="lg" fontWeight="bold">
                            Estimated Wait Time: {estimatedWaitTime()} minutes
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
                            onClick={() => joinQueue("Alice", companyName)}
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

            {/* template once queued  */}
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
                            {companyName} Apple
                        </Heading>
                    </Box>
                    <Box mt={4}>
                        <Text fontSize="lg" fontWeight="bold">
                            Estimated Wait Time: {estimatedWaitTime()} minutes
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
                        <Box
                            width="100px" // Width of the square
                            height="60px" // Height of the square
                            backgroundColor="pink" // Color of the square
                            borderRadius="md" // Optional: to give rounded corners
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            color="black"
                            // fontFamily="Comic Sans MS"
                            fontWeight="bold"
                        >   
                            <Text textAlign="center" fontSize="lg" fontWeight="bold" mt={1}>
                            <p>Position: </p>
                            <p>{getPosition('Alice')} {/* Display the position */}</p>
                                
                            </Text>
                        </Box>
                    </Box>
                </SimpleGrid>
            </Box>


            {/* <h1>{companyName} Apple </h1>
            <button onClick={() => joinQueue('Alice', companyName)}>Join Queue</button>
            <button onClick={showQueue(companyName)}>Show Queue</button> */}
        </div>
    );
}

export default CompanyQueue;

