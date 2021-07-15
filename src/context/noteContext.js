import { createContext, useContext, useState } from "react";

const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [note, setNote] = useState([]);
  return (
    <>
      <NoteContext.Provider
        value={{ searchQuery, setSearchQuery, note, setNote }}
      >
        {children}
      </NoteContext.Provider>
    </>
  );
};

export const useNote = () => useContext(NoteContext);
