// Importing React and useState for managing input state
import React, { useState } from 'react'

// Importing the useTodo hook to access the addTodo function from context
import { useTodo } from '../contexts/TodoContext';

function TodoForm() {
    // State to hold the input value for the new todo
    const [todo, setTodo] = useState("")

    // Extracting the addTodo function from context
    const { addTodo } = useTodo()

    // Function to handle form submission
    const add = (e) => {
        e.preventDefault() // Prevents page reload on form submission

        if (!todo) return // If input is empty, do nothing

        addTodo({ todo, completed: false }) // Adding a new todo with default 'completed' state as false
        setTodo("") // Clearing input field after adding todo
    }

    return (
        <form onSubmit={add} className="flex">
            {/* Input field for adding a new todo */}
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                value={todo} // Controlled input bound to state
                onChange={(e) => setTodo(e.target.value)} // Updating state when user types
            />
            
            {/* Submit button to add the todo */}
            <button 
                type="submit" 
                className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0"
            >
                Add
            </button>
        </form>
    );
}

// Exporting the TodoForm component to be used in other parts of the app
export default TodoForm;
