import React from "react";
import { X } from "lucide-react";

interface TodoSidebarProps {
  todos: any[];
  onClose: () => void;
}

export default function TodoSidebar({ todos, onClose }: TodoSidebarProps) {
  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div
        className="flex-1 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div className="w-full sm:w-1/3 bg-white h-full shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-2xl font-semibold">All To-dos</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {todos.length === 0 ? (
            <p className="text-gray-500 text-sm">No todos available.</p>
          ) : (
            todos.map((todo) => (
              <div
                key={todo._id}
                className="flex justify-between items-center border rounded-md px-3 py-2 hover:bg-gray-50"
              >
                <span className="text-sm text-gray-700">{todo.title}</span>

                <button className="text-blue-600 text-xs hover:underline">
                  Start
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex justify-end bg-white sticky bottom-0">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
