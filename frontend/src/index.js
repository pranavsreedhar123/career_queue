import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
<<<<<<< Updated upstream
import App from "./App";
import StudentProfile from "./components/StudentProfile";
import Map from "./components/Map";
import Navbar from "./components/Navbar"
import reportWebVitals from "./reportWebVitals";
import CompanyQueue from "./CompanyQueue";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
=======
import StudentProfile from "./components/StudentProfile";
import Map from "./components/Map";
import CompanyQueue from "./CompanyQueue";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ProfileProvider } from './ProfileContext';  // Import ProfileProvider
>>>>>>> Stashed changes

const router = createBrowserRouter([
  { path: "/", element: <StudentProfile /> },
  { path: "/map", element: <Map /> },
  { path: "/queue", element: <CompanyQueue /> },
<<<<<<< Updated upstream
])
=======
]);
>>>>>>> Stashed changes

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider>
<<<<<<< Updated upstream
      {/* <CompanyQueue /> Wrap with ChakraProvider */}
      {/* <Navbar />
      <StudentProfile /> */}
      <RouterProvider router={router} />
    </ChakraProvider>

  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
=======
      <ProfileProvider>  {/* Wrapping everything in ProfileProvider */}
        <RouterProvider router={router} />
      </ProfileProvider>
    </ChakraProvider>
  </React.StrictMode>
);
>>>>>>> Stashed changes
