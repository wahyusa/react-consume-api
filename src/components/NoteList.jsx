import React from "react";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { getActiveNotes, getArchivedNotes } from "../utils/api";
import { Link } from "react-router-dom";
import NoteItem from "./NoteItem";
import Search from "./Search";
import { PiArchiveThin, PiGlobeThin } from "react-icons/pi";
import { useSearchParams } from "react-router-dom";

function NoteList() {
  const { authedUser } = useContext(AuthContext);
  const [activeNotes, setActiveNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // gunakan parameter ?search kalo ada search tapi jangan kalo ga ada apalagi di path /
  const [searchParams, setSearchParams] = useSearchParams();
  let initialSearchValue = searchParams.get("search") || "";
  const [searchValue, setSearchValue] = useState(initialSearchValue);

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchValue(event.target.value);
    setSearchParams({ search: event.target.value });
  };

  // ini buat ganti URL di addressbar
  useEffect(() => {
    if (initialSearchValue) {
      setSearchParams({ search: initialSearchValue });
    }
  }, [initialSearchValue, setSearchParams]);

  // ini buat reset pencariannya biar muncul semua catatn kalo gk search
  useEffect(() => {
    initialSearchValue = searchParams.get("search") || "";
    setSearchValue(initialSearchValue);
  }, [searchParams]);

  const handleAddNote = (note) => {
    // addNote(note);
    // setAllNotes(getAllNotes());
  };

  const handleDeleteNote = (id) => {
    // deleteNote(id);
    // setAllNotes(getAllNotes());
  };

  const handleArchivedNote = (id) => {
    // archiveNote(id);
    // setAllNotes(getAllNotes());
  };

  const handleUnarchivedNote = (id) => {
    // unarchiveNote(id);
    // setAllNotes(getAllNotes());
  };

  useEffect(() => {
    const fetchActiveNotes = async () => {
      const { data } = await getActiveNotes();
      setActiveNotes(data);
      setLoading(false);
    };
    fetchActiveNotes();
  }, []);

  useEffect(() => {
    const fetchArchivedNotes = async () => {
      const { data } = await getArchivedNotes();
      setArchivedNotes(data);
      setLoading(false);
    };
    fetchArchivedNotes();
  }, []);

  const filteredActiveNotes = activeNotes.filter((note) =>
    note.title.toLowerCase().includes(searchValue.toLowerCase())
  );
  const filteredArchivedNotes = archivedNotes.filter((note) =>
    note.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <div className="flex flex-col gap-y-6 max-w-screen-md mx-auto py-6">
          <Search handleSearch={handleSearch} searchValue={searchValue} />
          <h1 className="flex items-center gap-x-2 font-bold text-2xl">
            <PiGlobeThin /> Catatan Aktif
          </h1>
        </div>
        <ul className="grid grid-cols-3 max-w-screen-md mx-auto gap-4">
          {filteredActiveNotes.length > 0 ? (
            filteredActiveNotes.map((activeNote) => (
              <NoteItem
                key={activeNote.id}
                note={activeNote}
                noteType="active"
                handleArchivedNote={handleArchivedNote}
                handleUnarchivedNote={null}
                handleDeleteNote={handleDeleteNote}
              />
            ))
          ) : (
            <p>Tidak ada catatan</p>
          )}
        </ul>
      </div>

      <div>
        <h1 className="font-bold flex items-center gap-x-2 text-2xl max-w-screen-md mx-auto py-6">
          <PiArchiveThin /> Catatan Arsip
        </h1>
        <ul className="grid grid-cols-3 max-w-screen-md mx-auto gap-4">
          {filteredArchivedNotes.length > 0 ? (
            filteredArchivedNotes.map((archivedNote) => (
              <NoteItem
                key={archivedNote.id}
                note={archivedNote}
                noteType="archived"
                handleArchivedNote={null}
                handleUnarchivedNote={handleUnarchivedNote}
                handleDeleteNote={handleDeleteNote}
              />
            ))
          ) : (
            <p>Arsip kosong</p>
          )}
        </ul>
      </div>
    </>
  );
}

export default NoteList;
