import React, { useState } from "react";
import { useToast } from "../../context/toastContext";
import "./createnote.css";
import { CgClose } from "react-icons/cg";
import { notify } from "../../utils/notification";
import { instance } from "../../api/axiosapi";

const CreateNote = () => {
  const [note, setNote] = useState({
    title: "",
    content: "",
    color: "white",
    tags: "",
  });

  const { setModal } = useToast();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };
  const handleNoteSubmit = async (e) => {
    e.preventDefault();
    console.log(note);
    if (note.title.length === 0 && note.content.length === 0) {
      notify("Title and Note cannot be empty 👀");
    } else if (note.title.length === 0) {
      notify("Title cannot be empty 👀");
    } else if (note.content.length === 0) {
      notify("Content cannot be empty 👀");
    } else {
      notify("Adding note...");
      try {
        const response = await instance.post("/notes", {
          ...note,
        });
        console.log(response);
        if (response.data.success) {
          notify("Saved successfully ✅");
          setNote(response.data.savedData.notes);
          setModal(false);
        }
        if (response.data.error) {
          notify("Error occured while saving, try again ❌");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="createnote-container create-note">
      <div className={`createnote-body ${note.color} `}>
        <span className="flex jcc aic relative">
          <h1 className="h4 lighter mb1-rem">Create new note !</h1>
          <span className="close-btn  mb1-rem pointer">
            <CgClose onClick={() => setModal(false)} />
          </span>
        </span>
        <span>
          <form onSubmit={() => handleNoteSubmit}>
            {" "}
            <div>
              <input
                className="w-100 pl-05rem"
                placeholder="Title"
                type="text"
                name="title"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <textarea
                placeholder="Enter note here"
                name="content"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <span className="flex aic gap-1 mt1-rem">
                <p className="small">Color </p>
                <span className="flex gap-1">
                  <div
                    className="circle-1rem red pointer"
                    onClick={() =>
                      setNote({
                        ...note,
                        color: "red",
                      })
                    }
                  ></div>
                  <div
                    className="circle-1rem green pointer"
                    onClick={() =>
                      setNote({
                        ...note,
                        color: "green",
                      })
                    }
                  ></div>
                  <div
                    className="circle-1rem yellow pointer"
                    onClick={() =>
                      setNote({
                        ...note,
                        color: "yellow",
                      })
                    }
                  ></div>
                  <div
                    className="circle-1rem blue pointer"
                    onClick={() =>
                      setNote({
                        ...note,
                        color: "blue",
                      })
                    }
                  ></div>
                  <div
                    className="circle-1rem orange pointer"
                    onClick={() =>
                      setNote({
                        ...note,
                        color: "orange",
                      })
                    }
                  ></div>
                  <div
                    className="circle-1rem white pointer"
                    onClick={() =>
                      setNote({
                        ...note,
                        color: "white",
                      })
                    }
                  ></div>
                </span>
              </span>
            </div>
            <div className="flex gap-1 mt1-rem">
              <p>Tags</p>
              <div className="flex gap-3 aic jcsb">
                <span className="flex gap-1">
                  <div
                    className="btn btn-sm btn-outline"
                    onClick={() => setNote({ ...note, tags: "Work" })}
                  >
                    Work
                  </div>
                  <div
                    className="btn btn-sm btn-outline"
                    onClick={() => setNote({ ...note, tags: "Personal" })}
                  >
                    Personal
                  </div>
                  <div
                    className="btn btn-sm btn-outline"
                    onClick={() => setNote({ ...note, tags: "Others" })}
                  >
                    Others
                  </div>
                </span>
                <small className="smaller">{note.tags}</small>
              </div>
            </div>
            <button
              onClick={handleNoteSubmit}
              className="btn btn-md btn-green w-100 mt1-rem"
            >
              Add note
            </button>
          </form>
        </span>
      </div>
    </div>
  );
};

export default CreateNote;
