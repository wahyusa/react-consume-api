import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import SecondaryButton from "../components/SecondaryButton";

function Dashboard() {
  const { authedUser, onLogout, initializing } = useContext(AuthContext);

  if (initializing) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="min-h-dvh bg-gray-100">
        {/* <!-- nav --> */}

        {/* <!-- Page Heading --> */}
        <header className="bg-white shadow">
          <div className="max-w-7xl flex items-center justify-between mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="font-semibold text-xl text-gray-800 leading-tight">
              Dashboard
            </h1>
            <div className="flex items-center">
              <div className="mr-4">{authedUser.name}</div>
              <SecondaryButton onClick={onLogout}>Logout</SecondaryButton>
            </div>
          </div>
        </header>

        {/* <!-- Page Content --> */}
        <main>
          <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900">You're logged in!</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Dashboard;
