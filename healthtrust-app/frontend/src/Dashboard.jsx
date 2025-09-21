import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/history")
      .then((res) => res.json())
      .then((data) => setHistory(data));
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">User Query</th>
            <th className="border px-2 py-1">AI Response</th>
          </tr>
        </thead>
        <tbody>
          {history.map((chat, idx) => (
            <tr key={idx}>
              <td className="border px-2 py-1">{chat.user}</td>
              <td className="border px-2 py-1">{chat.ai}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
