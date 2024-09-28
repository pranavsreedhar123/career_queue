// // import express from 'express';

// class CompanyQueue {
//     constructor(companyName, avgWaitTimePerPerson) {
//         this.companyName = companyName;
//         this.queue = [];
//         this.avgWaitTimePerPerson = avgWaitTimePerPerson; // in minutes
//     }

//     joinQueue(personName) {
//         this.queue.push(personName);
//         console.log(`${personName} has joined the queue for ${this.companyName}.`);
//     }

//     showQueue() {
//         console.log(`Queue for ${this.companyName}:`);
//         this.queue.forEach((person, index) => {
//             console.log(`${index + 1}. ${person}`);
//         });
//     }

//     showPosition(personName) {
//         const position = this.queue.indexOf(personName) + 1;
//         if (position > 0) {
//             console.log(`${personName} is at position ${position} in the queue for ${this.companyName}.`);
//         } else {
//             console.log(`${personName} is not in the queue for ${this.companyName}.`);
//         }
//     }

//     estimatedWaitTime() {
//         const waitTime = this.queue.length * this.avgWaitTimePerPerson;
//         console.log(`Estimated wait time for ${this.companyName}: ${waitTime} minutes.`);
//     }
// }

// // return(
// //     <div>
// //         <h1>Company Queue</h1>
// //         <CompanyQueue/>
// //     </div>
// // );


// // Example usage:
// const companyA = new CompanyQueue('Company A', 5);

// companyA.joinQueue('Alice');
// companyA.joinQueue('Bob');
// companyA.showQueue();
// companyA.showPosition('Alice');
// companyA.estimatedWaitTime();

// export default CompanyQueue;
import React, { useState } from 'react';

function CompanyQueue({ companyName, avgWaitTimePerPerson }) {
    const [queue, setQueue] = useState([]);

    const joinQueue = (personName) => {
        setQueue((prevQueue) => [...prevQueue, personName]);
        console.log(`${personName} has joined the queue for ${companyName}.`);
    };

    const showQueue = () => {
        console.log(`Queue for ${companyName}:`);
        queue.forEach((person, index) => {
            console.log(`${index + 1}. ${person}`);
        });
    };

    const showPosition = (personName) => {
        const position = queue.indexOf(personName) + 1;
        if (position > 0) {
            console.log(`${personName} is at position ${position} in the queue for ${companyName}.`);
        } else {
            console.log(`${personName} is not in the queue for ${companyName}.`);
        }
    };

    const estimatedWaitTime = () => {
        const waitTime = queue.length * avgWaitTimePerPerson;
        console.log(`Estimated wait time for ${companyName}: ${waitTime} minutes.`);
    };

    // Call these functions as needed, or create buttons to trigger them

    return (
        <div>
            <h1>{companyName} Queue</h1>
            <button onClick={() => joinQueue('Alice')}>Join Queue as Alice</button>
            <button onClick={() => joinQueue('Bob')}>Join Queue as Bob</button>
            <button onClick={showQueue}>Show Queue</button>
            <button onClick={() => showPosition('Alice')}>Show Alice's Position</button>
            <button onClick={estimatedWaitTime}>Show Estimated Wait Time</button>
        </div>
    );
}

export default CompanyQueue;
