import React from "react";
import "./notecard.css";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { instance } from "../../api/axiosapi";
import { useNote } from "../../context/noteContext";
import { notify } from "../../utils/notification";

const NoteCard = ({ note_ }) => {
  const { note, setNote } = useNote();
  const deleteNote = async (noteId) => {
    try {
      notify("Deleting note ⏳");
      const response = await instance.delete(`/notes/${note_._id}`);
      console.log(response);
      if (response.data.success) {
        setNote(note.filter((note) => note._id !== note_._id));
        notify("Note deleted successfully ✅");
      }
    } catch (error) {
      notify("Error occured, try again later ❌");
    }
  };
  return (
    <div className={`relative ${note_.color} note-card`}>
      <h1 className="h3 bold  mb05-rem">{note_.note.title}</h1>
      <hr className="thin-line mtb05-rem" />
      <p className="mt05-rem">{note_.note.content}</p>
      <small className="note-tag">{note_.tags}</small>
      <div className="edit flex gap-2">
        <span className="pointer">
          <AiFillEdit />
        </span>
        <span className="pointer" onClick={deleteNote}>
          <MdDelete />
        </span>
      </div>
    </div>
  );
};

export default NoteCard;
