// Importing necessary hooks from React
import { useState, useEffect } from 'react'

// Importing the TodoProvider from the context file to manage state globally
import { TodoProvider } from './contexts'

// Importing external CSS file for styling
import './App.css'

// Importing TodoForm and TodoItem components
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {
  // Initializing state to store the list of todos
  const [todos, setTodos] = useState([])

  // Function to add a new todo
  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])  
    // Adds a new todo with a unique ID at the beginning of the list
  }

  // Function to update an existing todo
  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo )))
    // Maps through the existing todos and updates the one that matches the given ID
  }

  // Function to delete a todo by filtering it out
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
    // Removes the todo whose ID matches the given ID
  }

  // Function to toggle the completion status of a todo
  const toggleComplete = (id) => {
    setTodos((prev) => 
      prev.map((prevTodo) => 
        prevTodo.id === id 
          ? { ...prevTodo, completed: !prevTodo.completed }  // Toggles the completed state
          : prevTodo
      )
    )
  }

  // Load todos from localStorage when the component mounts (only runs once)
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))
    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  // Save todos to localStorage whenever the todos state changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])
  
  return (
    // Wrapping the entire app inside TodoProvider to provide global state
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="bg-[#172842] min-h-screen py-8">
        {/* Main container for the todo app */}
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          
          {/* Heading for the Todo App */}
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>

          <div className="mb-4">
            {/* Rendering the form component to add new todos */}
            <TodoForm />
          </div>

          {/* Looping through todos and displaying each TodoItem */}
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
              <div key={todo.id} className='w-full'>
                {/* Rendering individual todo items */}
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>

        </div>
      </div>
    </TodoProvider>
  )
}

// Exporting App component to be used in index.js or main.jsx
export default App
