import NotesList from "./components/NotesList";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Search from "./components/Search";
import Header from "./components/Header";

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: "This is my first note.",
      date: "15/04/2021",
    },
    {
      id: nanoid(),
      text: "This is my second note.",
      date: "20/05/2022",
    },
    {
      id: nanoid(),
      text: "Simplicity of living plus high thinking leads to the greatest happiness! -Mahatma Gandhi",
      date: "10/06/2023",
    },
    {
      id: nanoid(),
      text: "The only impossible journey is the one you never begin! -Tony Robbins",
      date: "5/07/2023",
    },
  ]);

  const [searchText, setSearchText] = useState("");

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    localStorage.setItem("react-quicknotes-app-data", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    const savedNotes = JSON.parse(
      localStorage.getItem("react-quicknotes-app-data")
    );

    savedNotes && setNotes(savedNotes);
  }, []);

  //creating a function so that child compomponent can add note to the state
  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
    };

    const newNotes = [...notes, newNote];

    setNotes(newNotes);
  };

  //deleting note
  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  return (
    <div className={`${darkMode && "dark-mode"}`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} />
        <Search handleSearchNote={setSearchText} />
        <NotesList
          notes={notes.filter((note) =>
            note.text.toLowerCase().includes(searchText)
          )}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
        />
      </div>
    </div>
  );
};

export default App;
