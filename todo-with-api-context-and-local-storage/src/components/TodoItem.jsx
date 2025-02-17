// Importing React and useState for local state management
import React, { useState } from 'react'

// Importing the useTodo hook to access context functions
import { useTodo } from '../contexts/TodoContext';

function TodoItem({ todo }) {
    // State to manage whether the todo item is editable or not
    const [isTodoEditable, setIsTodoEditable] = useState(false)

    // State to manage the updated todo text
    const [todoMsg, setTodoMsg] = useState(todo.todo)

    // Extracting functions from context for updating, deleting, and toggling todos
    const { updateTodo, deleteTodo, toggleComplete } = useTodo()

    // Function to save the edited todo
    const editTodo = () => {
        updateTodo(todo.id, { ...todo, todo: todoMsg }) // Updates the todo in the context
        setIsTodoEditable(false) // Disables edit mode
    }

    // Function to toggle the completion status of the todo
    const toggleCompleted = () => {
        toggleComplete(todo.id) // Calls the function from context to mark as completed/incomplete
    }

    return (
        <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 text-black ${
                todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
            }`}
        >
            {/* Checkbox to mark todo as complete or incomplete */}
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={todo.completed}
                onChange={toggleCompleted}
            />

            {/* Text input field for displaying and editing the todo message */}
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${
                    isTodoEditable ? "border-black/10 px-2" : "border-transparent"
                } ${todo.completed ? "line-through" : ""}`} // Adds strikethrough if completed
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable} // Read-only if not in edit mode
            />

            {/* Edit / Save Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (todo.completed) return; // Prevents editing if todo is completed

                    if (isTodoEditable) {
                        editTodo(); // Saves edited todo
                    } else {
                        setIsTodoEditable((prev) => !prev); // Enables edit mode
                    }
                }}
                disabled={todo.completed} // Disable button if todo is completed
            >
                {isTodoEditable ? "📁" : "✏️"} {/* Shows edit icon or save icon */}
            </button>

            {/* Delete Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={() => deleteTodo(todo.id)} // Calls delete function from context
            >
                ❌ {/* Delete icon */}
            </button>
        </div>
    );
}

// Exporting the TodoItem component for use in other parts of the app
export default TodoItem;
