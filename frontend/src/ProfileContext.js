import React, { createContext, useState, useEffect } from "react";

// Create the context
export const ProfileContext = createContext();

// Provider component to wrap around the app
export const ProfileProvider = ({ children }) => {
  // Initial state, can load from localStorage if it exists
  const [profileData, setProfileData] = useState(() => {
    const savedProfile = localStorage.getItem("profileData");
    return savedProfile
      ? JSON.parse(savedProfile)
      : {
          name: "SHARADAAAAAA G",
          bio: "GT Webdev Lover",
          major: "Computer Science",
          year: "2nd Year",
          gradDate: "Spring 2026",
          jobSearch: "Entry-Level Job",
          profilePic: "sg.jpeg",
          skills: ["Singing", "Yapping", "Google Drawing", "HTML", "CSS", "LC3"],
          resume: null, // Initialize resume as null
        };
  });

  // Save profile data to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("profileData", JSON.stringify(profileData));
  }, [profileData]);

  return (
    <ProfileContext.Provider value={{ profileData, setProfileData }}>
      {children}
    </ProfileContext.Provider>
  );
};
