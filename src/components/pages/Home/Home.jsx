import React, { useEffect, useState } from "react";
import "./home.css";
import CreateNote from "../../createNote/CreateNote";
import { useToast } from "../../../context/toastContext";
import { instance } from "../../../api/axiosapi";
import { notify } from "../../../utils/notification";
import NoteCard from "../../noteCard/NoteCard";
import { useAuth } from "../../../context/authContext";
import GetColors, { colors } from "../../getColors/GetColors";
import { useNote } from "../../../context/noteContext";

const Home = () => {
  const [note, setNote] = useState([]);
  
  const { searchQuery, setSearchQuery } = useNote();
  const { modal, setModal, loader, setLoader } = useToast();

  const { login } = useAuth();
  useEffect(() => {
    (async () => {
      try {
        setLoader(true);
        const response = await instance.get("/notes");
        console.log(response);
        if (response.data.success) {
          notify("Data fetched successfully...✅");
          if (response.data.notes.length !== 0) {
            setNote(response.data.notes[0].notes);
          }
        }
        setLoader(false);
      } catch (error) {
        notify("Something went wrong...❌");
        console.log(error);
      }
    })();
  }, [modal, login]);

  

  const clearAllNotes = async () => {
    try {
      notify("Clearing all notes...");
      const response = await instance.delete("/notes");
      console.log(response);
      if (response.data.success) {
        notify("All notes cleared ✅");
        setNote([]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    const inputString = e.target.value;
    setSearchQuery(inputString);
  };

  const getFilteredNotes = (note, searchQuery) => {
    return note.filter(
      (note) =>
        note.note.title.indexOf(searchQuery) !== -1 ||
        note.note.content.indexOf(searchQuery) !== -1 ||
        note.color.indexOf(searchQuery) !== -1 ||
        note.tags.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
    );
  };
  const filteredNotes = getFilteredNotes(note, searchQuery);

  return (
    <div className="home">
      <div className="flex flex-col jcc aic gap-2">
        <h1 className="h1 x-lg">Note-It</h1>
        <button className="write-note pointer" onClick={() => setModal(true)}>
          Create new note
        </button>
        {note.length !== 0 && (
          <div className="felx gap-1">
            <input
              type="text"
              placeholder="Search by tag, color, etc"
              onChange={handleChange}
            />
            <button className="btn" onClick={clearAllNotes}>
              Clear All
            </button>
            <div className="mtb05-rem flex gap-1">
              <small>Sort by Colors</small>
              {colors.map((color) => {
                return <GetColors color={color} />;
              })}
              <small className="pointer" onClick={() => setSearchQuery("")}>
                none
              </small>
            </div>
          </div>
        )}
      </div>
      {modal && <CreateNote />}
      {loader && "Loading..."}
      {!loader && (
        <div>
          {note.length !== 0 ? (
            <>
              <div className="notes-container">
                {filteredNotes
                  .slice(0)
                  .reverse()
                  .map((note) => {
                    return <NoteCard key={note._id} note={note} />;
                  })}
              </div>{" "}
            </>
          ) : (
            "No notes saved yet, try here 👆"
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
