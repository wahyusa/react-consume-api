import React from "react";
import { Link } from "react-router-dom";
import { getFormattedDate } from "../utils/date";
import parse from "html-react-parser";
import { PiArchiveThin, PiTrashThin, PiGlobeThin } from "react-icons/pi";
import PropTypes from "prop-types";

const NoteItem = ({
  note,
  handleArchivedNote,
  handleUnarchivedNote,
  handleDeleteNote,
  noteType,
}) => {
  const colors = [
    "bg-yellow-100",
    "bg-lime-100",
    "bg-rose-100",
    "bg-indigo-100",
    "bg-teal-100",
    "bg-sky-100",
    "bg-fuchsia-100",
    "bg-pink-100",
    "bg-purple-100",
  ];
  const hoverColors = [
    "hover:bg-yellow-200",
    "hover:bg-lime-200",
    "hover:bg-rose-200",
    "hover:bg-indigo-200",
    "hover:bg-teal-200",
    "hover:bg-sky-200",
    "hover:bg-fuchsia-200",
    "hover:bg-pink-200",
    "hover:bg-purple-200",
  ];

  const getRandomColor = () => {
    const index = Math.floor(Math.random() * colors.length);
    return { color: colors[index], hoverColor: hoverColors[index] };
  };

  const { color, hoverColor } = getRandomColor();

  // class ribet tanpa clsx atau tailwind-merge dulu
  const liClassNames =
    noteType === "archived"
      ? "bg-gray-100 p-4 cursor-pointer transition-colors duration-300 flex flex-col gap-y-4 items-start justify-between"
      : `${color} ${hoverColor} p-4 cursor-pointer transition-colors duration-300 flex flex-col gap-y-4 items-start justify-between`;

  return (
    <li className={liClassNames} key={note.id}>
      <Link className="h-full w-full" to={`/notes/${note.id}`} key={note.id}>
        <time className="text-xs text-gray-800 " dateTime={note.createdAt}>
          {getFormattedDate(note.createdAt)}
        </time>
        <h2 className="font-bold uppercase line-clamp-1">{note.title}</h2>
        <p className="line-clamp-3 mt-2">{parse(note.body)}</p>
      </Link>
      <div className="flex items-center mt-4">
        {noteType === "active" && (
          <button
            onClick={() => handleArchivedNote(note.id)}
            className="inline-flex ring-1 ring-inset ring-gray-400 items-center p-2 gap-x-2 hover:ring-gray-900 hover:bg-neutral-50"
          >
            <PiArchiveThin className="w-5 h-5" />
            Arsipkan
          </button>
        )}
        {noteType === "archived" && (
          <button
            onClick={() => handleUnarchivedNote(note.id)}
            className="inline-flex ring-1 ring-inset ring-gray-400 items-center p-2 gap-x-2 hover:ring-gray-900 hover:bg-teal-200"
          >
            <PiGlobeThin className="w-5 h-5" />
            Aktifkan
          </button>
        )}
        <button
          onClick={() => handleDeleteNote(note.id)}
          className="inline-flex ring-1 ring-inset ring-gray-400 items-center p-2 gap-x-2 hover:bg-rose-400 hover:ring-rose-600"
        >
          <PiTrashThin className="w-5 h-5" />
          Hapus
        </button>
      </div>
    </li>
  );
};

NoteItem.propTypes = {
  note: PropTypes.object.isRequired,
  noteType: PropTypes.oneOf(["active", "archived"]).isRequired,
  handleDeleteNote: PropTypes.func.isRequired,
  handleUnarchivedNote: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.oneOf([null]),
  ]),
  handleArchivedNote: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.oneOf([null]),
  ]),
};

export default NoteItem;
