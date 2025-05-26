"use client";
import { useState } from "react";

export default function ManageMembers() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleAddVocalist = async () => {
    setLoading(true);
    setSuccess(false);

    const newItem = {
      label: "Bohemian Rhapsody",
      id: "100",
      vocalistLowNote: "A2",
      vocalistHighNote: "C6",
    };

    const res = await fetch("/api/addVocalists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    });

    setLoading(false);
    if (res.ok) {
      setSuccess(true);
    } else {
      console.error("Failed to add item");
    }
  };

  const handleAddSong = async () => {
    setLoading(true);
    setSuccess(false);

    const newItem = {
      label: "Bohemian Rhapsody",
      id: "100",
      artist: "Queen",
      songLowNote: "A2",
      songHighNote: "C6",
      songOriginalKey: "A",
    };

    const res = await fetch("/api/addSong", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    });

    setLoading(false);
    if (res.ok) {
      setSuccess(true);
    } else {
      console.error("Failed to add item");
    }
  };
  return (
    <div>
      <h1>Manage Members Here</h1>
      <div className="space-y-2">
        <button
          onClick={handleAddVocalist}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Vocalist"}
        </button>
        {success && <p className="text-green-600">Item added!</p>}
      </div>
      <div className="space-y-2">
        <button
          onClick={handleAddSong}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Song"}
        </button>
        {success && <p className="text-green-600">Item added!</p>}
      </div>
    </div>
  );
}
