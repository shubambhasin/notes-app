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
          setNote(response.data.notes[0].notes);
        }
        setLoader(false);
      } catch (error) {
        notify("Something went wrong...❌");
        console.log(error);
      }
    })();
  }, []);
  console.log(note);
  return (
    <div className="home">
      Note-Its
      <button onClick={() => setModal(true)}>Create new note</button>
      {modal && <CreateNote />}
      {loader && "Loading..."}
      {!loader && (
        <div className="notes-container">
          {note.map((note) => {
            return <NoteCard key={note._id} note={note}/>
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
