import React, { useState } from 'react';

interface NewProjectModalProps {
  onClose: () => void;
  onCreateProject: (name: string) => void;
}

const NewProjectModal: React.FC<NewProjectModalProps> = ({ onClose, onCreateProject }) => {
  const [projectName, setProjectName] = useState('');

  const handleCreateProject = () => {
    onCreateProject(projectName);
    setProjectName('');
    onClose();
  };

  return (
    <div>
      <h2>Create New Project</h2>
      <input
        type="text"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />
      <button onClick={handleCreateProject}>Create</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default NewProjectModal;
