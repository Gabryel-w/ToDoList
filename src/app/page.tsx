"use client"

import React, { useState } from 'react';
import TodoList from '@/components/TodoList';
import ProjectSidebar from '@/components/ProjectSidebar';
import NewProjectModal from '@/components/NewProjectModal';
import Modal from '@/components/Modal';

interface TodoItem {
  id: number;
  task: string;
  completed: boolean;
}

interface Project {
  id: number;
  name: string;
  todos: TodoItem[];
}

const Page: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const handleCreateProject = (name: string) => {
    const newProject: Project = {
      id: projects.length + 1,
      name,
      todos: [],
    };
    setProjects([...projects, newProject]);
    setShowModal(false); // Fecha o modal após criar o projeto
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleToggle = (projectId: number, todoId: number) => {
    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        const updatedTodos = project.todos.map(todo => {
          if (todo.id === todoId) {
            return { ...todo, completed: !todo.completed };
          }
          return todo;
        });
        return { ...project, todos: updatedTodos };
      }
      return project;
    });
    setProjects(updatedProjects);
  };

  const handleDelete = (projectId: number, todoId: number) => {
    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        const updatedTodos = project.todos.filter(todo => todo.id !== todoId);
        return { ...project, todos: updatedTodos };
      }
      return project;
    });
    setProjects(updatedProjects);
  };

  const handleEdit = (projectId: number, todoId: number, newTask: string) => {
    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        const updatedTodos = project.todos.map(todo => {
          if (todo.id === todoId) {
            return { ...todo, task: newTask };
          }
          return todo;
        });
        return { ...project, todos: updatedTodos };
      }
      return project;
    });
    setProjects(updatedProjects);
  };

  const handleAddTask = (task: string) => {
    if (selectedProject !== null) {
      const updatedProjects = projects.map(project => {
        if (project.id === selectedProject) {
          const newTask: TodoItem = {
            id: project.todos.length + 1,
            task,
            completed: false,
          };
          return { ...project, todos: [...project.todos, newTask] };
        }
        return project;
      });
      setProjects(updatedProjects);
    }
  };

  return (
    <div className="flex">
      <ProjectSidebar onCreateProject={handleCreateProject} />
      {showModal && <NewProjectModal onClose={toggleModal} onCreateProject={handleCreateProject} />}
      <div className="ml-8">
        {projects.map(project => (
          <div key={project.id} onClick={() => setSelectedProject(project.id)}>
            <h2 className="text-2xl font-semibold cursor-pointer">{project.name}</h2>
            {selectedProject === project.id && (
              <TodoList
                todos={project.todos}
                onToggle={(id: number) => handleToggle(project.id, id)}
                onDelete={(id: number) => handleDelete(project.id, id)}
                onEdit={(id: number, newTask: string) => handleEdit(project.id, id, newTask)}
                onAdd={handleAddTask}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
