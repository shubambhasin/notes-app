import { createContext, useContext } from "react";

const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  return (
    <>
      <NoteContext.Provider value={{}}>{children}</NoteContext.Provider>
    </>
  );
};

export const useNote = () => useContext(NoteContext);
