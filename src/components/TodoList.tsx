import React, { useState } from 'react';
import Modal from './Modal';

interface TodoItem {
  id: number;
  task: string;
  completed: boolean;
}

interface TodoListProps {
  todos: TodoItem[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newTask: string) => void;
  onAdd: (task: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete, onEdit, onAdd }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [editedTask, setEditedTask] = useState('');
  const [editedTaskId, setEditedTaskId] = useState<number | null>(null);

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      onAdd(newTask);
      setIsOpen(false);
      setNewTask('');
    }
  };

  const handleEditTask = (id: number, task: string) => {
    setEditedTaskId(id);
    setEditedTask(task);
    setIsOpen(true);
  };

  const handleEdit = () => {
    if (editedTaskId !== null && editedTask.trim() !== '') {
      onEdit(editedTaskId, editedTask);
      setIsOpen(false);
      setEditedTask('');
      setEditedTaskId(null);
    }
  };

  return (
    <div className="mt-4">
      <ul>
        {todos.map(todo => (
          <li key={todo.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
              className="form-checkbox text-blue-500 h-4 w-4"
            />
            <span
              className={todo.completed ? 'line-through text-gray-500' : 'text-gray-700'}
            >
              {todo.task}
            </span>
            <button
              onClick={() => onDelete(todo.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
            <button
              onClick={() => handleEditTask(todo.id, todo.task)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => setIsOpen(true)}>Add Task</button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">{editedTaskId !== null ? 'Edit Task' : 'Add New Task'}</h2>
          <input
            type="text"
            value={editedTaskId !== null ? editedTask : newTask}
            onChange={(e) => editedTaskId !== null ? setEditedTask(e.target.value) : setNewTask(e.target.value)}
            className="border border-gray-400 rounded px-3 py-1 mb-2"
            placeholder="Enter task"
          />
          <div className="flex justify-end">
            <button
              onClick={editedTaskId !== null ? handleEdit : handleAddTask}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2"
            >
              {editedTaskId !== null ? 'Save' : 'Add'}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TodoList;
