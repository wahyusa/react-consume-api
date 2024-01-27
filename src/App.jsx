import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { getUserLogged, putAccessToken, getAccessToken } from "./utils/api";
import { AuthContext } from "./context/AuthContext";

import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Register from "./pages/register";
import NoteDetail from "./pages/notedetail";

function App() {
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserLogged = async () => {
      const accessToken = getAccessToken();
      if (accessToken) {
        const { data } = await getUserLogged();
        setAuthedUser(data);
      }
      setInitializing(false);
    };
    fetchUserLogged();
  }, []);

  // useEffect(() => {
  //   console.log("authedUser", authedUser);
  // }, [authedUser]);

  const onLoginSuccess = async ({ accessToken }) => {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
  };

  const onLogout = () => {
    setAuthedUser(null);
    putAccessToken("");
  };

  if (initializing) {
    return null;
  }

  if (authedUser === null) {
    return (
      <Routes>
        <Route path="/*" element={<Login loginSuccess={onLoginSuccess} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    );
  }

  return (
    <>
      <AuthContext.Provider value={{ authedUser, onLogout, initializing }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/notes/:noteId" element={<NoteDetail />} />

          {/* <Route path="/add" element={<AddPage />} /> */}
        </Routes>
      </AuthContext.Provider>
    </>
  );
}

export default App;
