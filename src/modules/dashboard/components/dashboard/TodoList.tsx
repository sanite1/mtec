import React, { useState } from "react";
import { getDecodedJwt } from "../../lib/auth";
import { useFetchTodos } from "../../lib/api/dashboard";
import TodoSidebar from "./TodoSidebar";
import { ArrowRight, Goal, Plane } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ITodo } from "../../lib/types/dashboard";

export default function TodoList() {
  const user = getDecodedJwt();
  const { data, isLoading } = useFetchTodos(user?.id);

  const [showSidebar, setShowSidebar] = useState(false);

  const todos = data || [];

  // Show ONLY first 4 items
  const previewTodos = todos.slice(0, 4);

  const navigate = useNavigate();
  return (
    <>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Required Actions
          </h2>

          {todos.length > 4 && (
            <button
              onClick={() => setShowSidebar(true)}
              className="text-sm text-purple-600 hover:underline"
            >
              Show all
            </button>
          )}
        </div>

        {isLoading ? (
          <p className="text-gray-500 text-sm">Loading todos...</p>
        ) : previewTodos.length === 0 ? (
          <p className="text-gray-500 text-sm">No todos yet.</p>
        ) : (
          <ul className="space-y-3">
            {previewTodos.map((task: ITodo) => (
              <li
                key={task._id}
                className="group flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 transition-all hover:border-gray-300"
              >
                <div className="flex items-center gap-3">
                  <div className="h-2.5 w-2.5 rounded-full bg-purple-500 opacity-70 group-hover:opacity-100 transition"></div>
                  <span className="text-sm font-medium text-gray-800">
                    {task.title}
                  </span>
                </div>

                <button
                  onClick={() => navigate(task.actionUrl)}
                  className="rounded-full bg-purple-600 px-1 py-1 text-xs font-semibold text-white transition hover:bg-purple-700"
                >
                  <ArrowRight />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {showSidebar && (
        <TodoSidebar todos={todos} onClose={() => setShowSidebar(false)} />
      )}
    </>
  );
}
