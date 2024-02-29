import React, { useState } from 'react';
import Modal from './Modal';

interface ProjectSidebarProps {
  onCreateProject: (name: string) => void;
}

const ProjectSidebar: React.FC<ProjectSidebarProps> = ({ onCreateProject }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [projectName, setProjectName] = useState('');

  const handleCreateProject = () => {
    onCreateProject(projectName);
    setProjectName('');
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>New Project</button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Create New Project</h2>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="border border-gray-400 rounded px-3 py-1 mb-2"
            placeholder="Enter project name"
          />
          <div className="flex justify-end">
            <button
              onClick={handleCreateProject}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2"
            >
              Create
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

export default ProjectSidebar;
