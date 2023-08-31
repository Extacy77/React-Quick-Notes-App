import { useState } from "react";

const AddNote = ({ handleAddNote }) => {
  const [noteText, setNoteText] = useState("");

  const characterLimit = 200;
  const handleChange = ({ target }) => {
    characterLimit - target.value.length >= 0 && setNoteText(target.value);
  };

  const handleClick = () => {
    noteText.trim().length > 0 && handleAddNote(noteText);
    setNoteText("");
  };

  return (
    <div className="note new">
      <textarea
        rows="8"
        cols="10"
        value={noteText}
        placeholder="Type to add a quick note..."
        onChange={handleChange}
      ></textarea>
      <div className="note-footer">
        <small>{characterLimit - noteText.length} Remaining</small>
        <button className="save" onClick={handleClick}>
          Save
        </button>
      </div>
    </div>
  );
};

export default AddNote;
