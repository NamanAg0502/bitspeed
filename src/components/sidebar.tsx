import React, { useCallback, useState, useEffect, memo } from 'react';
import { Node } from 'reactflow';
import useFlowStore from '../hooks/store';
import { SidebarProps } from '../lib/types';

/**
 * Sidebar Component
 * This component displays a sidebar for adding and editing nodes in the flow diagram.
 * It includes input fields for editing node labels and buttons for adding different types of nodes.
 */
const Sidebar: React.FC<SidebarProps> = memo(({ onAddNode }) => {
  const { nodes, selectedNodeId, updateNodeLabel, unselectNode } =
    useFlowStore();

  // Retrieve the selected node from the store
  const selectedNode = nodes.find((node: Node) => node.id === selectedNodeId);

  // State for the label of the selected node
  const [label, setLabel] = useState('');

  // Effect to update the label state when the selected node changes
  useEffect(() => {
    if (selectedNode) {
      setLabel(selectedNode.data.label);
    } else {
      setLabel('');
    }
  }, [selectedNode]);

  // Handler for changing the label input
  const handleLabelChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setLabel(e.target.value);
    },
    []
  );

  // Handler for saving changes to the node label
  const handleSave = useCallback(() => {
    if (selectedNodeId) {
      updateNodeLabel(selectedNodeId, label.trim());
      unselectNode();
    }
  }, [selectedNodeId, label, updateNodeLabel, unselectNode]);

  // Handler for handling keyboard input in the label input field
  const handleInputKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleSave();
      }
    },
    [handleSave]
  );

  // Handler for adding a chat node
  const handleAddChatNode = () => {
    onAddNode('chat-node');
  };

  // Handler for adding an input node
  const handleAddInputNode = () => {
    onAddNode('user-input-node');
  };

  // Handler for adding a response node
  const handleAddResponseNode = () => {
    onAddNode('response-node');
  };

  // Render the sidebar for adding or editing nodes
  if (!selectedNode) {
    return (
      <div className="bg-neutral-100 w-full h-full text-black p-4">
        <h3 className="font-semibold mb-4 text-xl">Add Node</h3>
        <div className="w-full flex flex-col items-start space-y-2">
          <button
            onClick={handleAddChatNode}
            className="bg-green-500 text-white rounded-md px-2 py-1 w-full"
          >
            Add Chat Node
          </button>
          <button
            onClick={handleAddInputNode}
            className="bg-blue-500 text-white rounded-md px-2 py-1 w-full"
          >
            Add Input Node
          </button>
          <button
            onClick={handleAddResponseNode}
            className="bg-yellow-500 text-white rounded-md px-2 py-1 w-full"
          >
            Add Response Node
          </button>
        </div>
      </div>
    );
  }

  // Render the sidebar for editing the selected node
  return (
    <div className="bg-neutral-100 w-full h-full text-black p-4">
      <h3 className="font-semibold mb-4 text-xl">Edit Node</h3>
      <div className="w-full flex flex-col items-start space-y-2">
        <input
          type="text"
          value={label}
          onChange={handleLabelChange}
          onKeyDown={handleInputKeyDown}
          aria-label="Node Label"
          className="rounded-md w-full text-black font-light py-1 outline-none px-2 border border-black"
        />
        <button
          onClick={handleSave}
          className="bg-black text-white rounded-md px-2 py-1"
        >
          Save
        </button>
      </div>
    </div>
  );
});

export default Sidebar;
