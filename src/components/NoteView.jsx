import React from "react";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { getNote } from "../utils/api";
import { useParams } from "react-router-dom";

function NoteView() {
  const { authedUser } = useContext(AuthContext);
  const { noteId } = useParams();
  const [note, setNote] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      const { data } = await getNote(noteId);
      setNote(data);
      setLoading(false);
    };
    fetchNote();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {
        <div key={note.id}>
          <div key={note.id} className="p-6 bg-white border-b border-gray-200">
            <div className="flex items-center">
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-900">
                  {note.title}
                </div>
                <div className="text-sm text-gray-500">{note.body}</div>
                <div className="text-sm text-gray-500">
                  Created at:{note.createdAt}
                </div>
                <div className="text-sm text-gray-500">
                  Is archive:{note.archived}
                </div>
                <div className="text-sm text-gray-500">Owner :{note.owner}</div>
                <div className="text-sm text-gray-500">ID :{note.id}</div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default NoteView;
