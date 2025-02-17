// Importing necessary functions from React
import { createContext, useContext } from "react";

// Creating a context for managing todos globally
export const TodoContext = createContext({
    todos: [  // Default value for the context
        {
            id: 1,  // Unique identifier for the todo
            todo: "Todo msg",  // Example todo message
            completed: false,  // Whether the task is completed or not
        }
    ],
    addTodo: (todo) => {},  // Placeholder function to add a todo (to be implemented later)
    updateTodo: (id, todo) => {},  // Placeholder function to update a todo
    deleteTodo: (id) => {},  // Placeholder function to delete a todo
    toggleComplete: (id) => {}  // Placeholder function to toggle a todo's completion status
});

// Custom hook to use the TodoContext easily in any component
export const useTodo = () => {
    return useContext(TodoContext);  // Provides access to the todo context
}

// Exporting the context provider to wrap around components
export const TodoProvider = TodoContext.Provider;
