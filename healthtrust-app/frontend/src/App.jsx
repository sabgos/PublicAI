import React from "react";
import Chat from "./Chat";
import Dashboard from "./Dashboard";

export default function App() {
  return (
    <div className="p-4">
      <nav className="flex space-x-4 mb-4">
        <a href="#chat" className="text-blue-600 font-bold">Chat</a>
        <a href="#dashboard" className="text-blue-600 font-bold">Dashboard</a>
      </nav>
      {window.location.hash === "#dashboard" ? <Dashboard /> : <Chat />}
    </div>
  );
}
