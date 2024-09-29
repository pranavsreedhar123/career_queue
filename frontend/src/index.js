import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import StudentProfile from "./components/StudentProfile";
import Map from "./components/Map";
import Navbar from "./components/Navbar"
import reportWebVitals from "./reportWebVitals";
import CompanyQueue from "./components/CompanyQueue";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ProfileProvider } from './ProfileContext';  // Import ProfileProvider


const router = createBrowserRouter([
  { path: "/", element: <StudentProfile /> },
  { path: "/map", element: <Map /> },
  { path: "/queue", element: <CompanyQueue /> },


]); //test w/o semicolon


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      {/* merged */}
      <ProfileProvider>  {/* Wrapping everything in ProfileProvider */}
        <RouterProvider router={router} />
      </ProfileProvider>
    </ChakraProvider>
  </React.StrictMode>
);

reportWebVitals();