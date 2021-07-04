import React, { useEffect, useState } from "react";
import "./home.css";
import CreateNote from "../../createNote/CreateNote";
import { useToast } from "../../../context/toastContext";
import { instance } from "../../../api/axiosapi";
import { notify } from "../../../utils/notification";
import NoteCard from "../../noteCard/NoteCard";

const Home = () => {
  const [note, setNote] = useState([]);
  const { modal, setModal, loader, setLoader } = useToast();

  useEffect(() => {
    (async () => {
      try {
        setLoader(true);
        const response = await instance.get("/notes");
        console.log(response);
        if (response.data.success) {
          notify("Data fetched successfully...✅");
          if(response.data.notes.length !==0)
          {
            setNote(response.data.notes[0].notes);
          }
        }
        setLoader(false);
      } catch (error) {
        notify("Something went wrong...❌");
        console.log(error);
      }
    })();
  }, [modal]);
  console.log(note);
  return (
    <div className="home">
      <div className="flex flex-col jcc aic gap-2">
        <h1 className="h1 x-lg">Note-It</h1>
        <button className="write-note pointer" onClick={() => setModal(true)}>
          Create new note
        </button>
      </div>
      {modal && <CreateNote />}
      {loader && "Loading..."}
      {!loader && <div>{note.length !== 0 ? (
        <div className="notes-container">
          {note.slice(0).reverse().map((note) => {
            return <NoteCard key={note._id} note={note} />;
          })}
        </div>
      ): "No notes saved yet, try here 👆"}</div>}
    </div>
  );
};

export default Home;
