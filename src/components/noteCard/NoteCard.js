import React from "react";
import "./notecard.css"

const NoteCard = ({ note }) => {
  return (
    <div className={`relative ${note.color} note-card`}>
      <h1 className="h4">{note.note.title}</h1>
      <p className="">{note.note.content}</p>
      <small className="note-tag">{note.tags}</small>
    </div>
  );
};

export default NoteCard;
