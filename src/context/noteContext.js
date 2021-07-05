import { createContext, useContext, useState } from "react";

const NoteContext = createContext();

export const NoteProvider = ({ children }) => {

  const [searchQuery, setSearchQuery] = useState("")
  return (
    <>
      <NoteContext.Provider value={{searchQuery, setSearchQuery}}>{children}</NoteContext.Provider>
    </>
  );
};

export const useNote = () => useContext(NoteContext);
