import React from "react";

const todos = [
  "Add a store description",
  "Upload a store image",
  "Add a tagline",
  "Record your first order",
];

export default function TodoList() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">To-do List</h2>
      <ul className="space-y-2">
        {todos.map((task, i) => (
          <li
            key={i}
            className="flex justify-between items-center border rounded-md px-3 py-2 hover:bg-gray-50"
          >
            <span className="text-sm text-gray-700">{task}</span>
            <button className="text-blue-600 text-xs hover:underline">
              Start
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
