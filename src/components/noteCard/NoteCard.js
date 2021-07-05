import React from "react";
import "./notecard.css";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

const NoteCard = ({ note }) => {
  return (
    <div className={`relative ${note.color} note-card`}>
      <h1 className="h3 bold  mb05-rem">{note.note.title}</h1>
      <hr className="thin-line mtb05-rem" />
      <p className="mt05-rem">{note.note.content}</p>
      <small className="note-tag">{note.tags}</small>
      <div className="edit flex gap-1">
        <span className="pointer">
          <AiFillEdit />
        </span>
        <span className="pointer">
          <MdDelete />
        </span>
      </div>
    </div>
  );
};

export default NoteCard;
