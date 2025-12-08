import React, { useState, useEffect } from "react";

const users = [
  "Ehtel boba",
  "Coco Martin",
  "Cherry",
  "Esco",
  "Betty La fea",
  "star ng pasko",
  "Tala",
  "John Geo",
  "Love, Joy, Hope",
  "Kathryn",
  "Brownie",
  "Marimar",
  "Hiraya Manawari",
  "Boss mo to.",
  "Ate"
];

export default function App() {
  const [userWishlists, setUserWishlists] = useState(() => {
    const saved = localStorage.getItem('userWishlists');
    return saved ? JSON.parse(saved) : {};
  });
  const [selectedUser, setSelectedUser] = useState(users[0]);

  useEffect(() => {
    if (!userWishlists[selectedUser]) {
      setUserWishlists(prev => ({ ...prev, [selectedUser]: [] }));
    }
  }, [selectedUser, userWishlists]);

  useEffect(() => {
    localStorage.setItem('userWishlists', JSON.stringify(userWishlists));
  }, [userWishlists]);

  const updateWishlist = (index, value) => {
    const updated = [...(userWishlists[selectedUser] || [])];
    updated[index] = value;
    setUserWishlists({ ...userWishlists, [selectedUser]: updated });
  };

  const removeWishlist = (index) => {
    const updated = [...(userWishlists[selectedUser] || [])];
    updated.splice(index, 1);
    setUserWishlists({ ...userWishlists, [selectedUser]: updated });
  };

  const addWishlist = () => {
    const updated = [...(userWishlists[selectedUser] || []), ""];
    setUserWishlists({ ...userWishlists, [selectedUser]: updated });
    setTimeout(() => {
      alert('Wishlist item added successfully for ' + selectedUser);
    }, 100);
  };

  const wishlists = userWishlists[selectedUser] || [];

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Monito Monita Wishlist</h1>

      <div className="w-full max-w-md mb-4">
        <label className="block text-sm font-medium mb-2">Select User</label>
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="w-full p-2 rounded-xl border"
        >
          {users.map((u, i) => (
            <option key={i} value={u}>{u}</option>
          ))}
        </select>
      </div>

      <div className="w-full max-w-md mb-4">
        <button
          onClick={addWishlist}
          className="w-full bg-green-500 text-white py-2 rounded-xl mb-4"
        >
          + Add Wishlist
        </button>
      </div>

      <div className="w-full max-w-md space-y-4">
        {wishlists.map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-2xl shadow">
            <label className="block text-sm font-medium mb-2">Wishlist {index + 1}</label>
            <input
              value={item}
              onChange={(e) => updateWishlist(index, e.target.value)}
              placeholder="Type wishlist here..."
              className="w-full p-2 rounded-xl border"
            />
            <button
              onClick={() => removeWishlist(index)}
              className="mt-2 w-full bg-red-500 text-white py-2 rounded-xl"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
