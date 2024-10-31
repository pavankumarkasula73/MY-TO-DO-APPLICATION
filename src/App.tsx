import React, { useState } from 'react';
import { PlusCircle, CheckCircle2, Circle, Trash2, Edit3 } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      if (editingId !== null) {
        setTodos(todos.map(todo =>
          todo.id === editingId ? { ...todo, text: input } : todo
        ));
        setEditingId(null);
      } else {
        setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
      }
      setInput('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setInput(todo.text);
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-lg p-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">To-Do List</h1>

        {/* Navbar */}
        <nav className="flex justify-between mb-4">
          <button
            onClick={clearCompleted}
            className="bg-red-500 text-white px-4 py-2 rounded-full transition-transform transform hover:scale-105 hover:bg-red-600"
          >
            Clear Completed
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-full transition-transform transform hover:scale-105 hover:bg-blue-600"
          >
            View Completed
          </button>
        </nav>

        <form onSubmit={addTodo} className="flex mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 border rounded-l-full outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-300"
          />
          <button
            type="submit"
            className="bg-purple-500 text-white px-4 py-2 rounded-r-full flex items-center gap-1 hover:bg-purple-600 transition-transform transform hover:scale-105"
          >
            <PlusCircle size={20} />
            {editingId !== null ? 'Update' : 'Add'}
          </button>
        </form>

        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`flex items-center justify-between p-4 rounded-xl shadow-sm transition-all duration-300 ${
                todo.completed ? 'bg-gray-100' : 'bg-white'
              } hover:shadow-lg border border-gray-200`}
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`text-purple-500 hover:text-purple-600 transition-transform transform hover:scale-125 ${
                  todo.completed ? 'text-opacity-50' : ''
                }`}
              >
                {todo.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
              </button>
              <span
                className={`flex-1 text-lg ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}
              >
                {todo.text}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => startEditing(todo)}
                  className="text-blue-500 hover:text-blue-600 transition-transform transform hover:scale-110"
                >
                  <Edit3 size={20} />
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-500 hover:text-red-600 transition-transform transform hover:scale-110"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </li>
          ))}
        </ul>
        {todos.length > 0 && (
          <p className="text-center text-gray-600 mt-6">
            {todos.filter((t) => t.completed).length} of {todos.length} tasks completed
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
