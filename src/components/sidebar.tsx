import React, { useCallback, useState, useEffect, memo } from 'react';
import { Node } from 'reactflow';
import useFlowStore from '../hooks/store';
import { SidebarProps } from '../lib/types';
import { Info, PlusCircle } from 'lucide-react';

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
      <div className="bg-neutral-200 w-full h-full text-black p-4">
        <h3 className="font-semibold mb-4 text-xl bg-white text-center p-2 rounded-lg">
          Chat Builder
        </h3>
        <div className="w-full flex flex-col items-start space-y-2">
          <button
            onClick={handleAddChatNode}
            className="bg-green-500 text-white rounded-md px-2 py-1 w-full flex items-center h-20 justify-center"
          >
            <PlusCircle className="w-5 h-5 mr-2" /> <span>Chat Node</span>
          </button>
          <button
            onClick={handleAddInputNode}
            className="bg-blue-500 text-white rounded-md px-2 py-1 w-full flex items-center h-20 justify-center"
          >
            <PlusCircle className="w-5 h-5 mr-2" /> <span>Input Node</span>
          </button>
          <button
            onClick={handleAddResponseNode}
            className="bg-yellow-500 text-white rounded-md px-2 py-1 w-full flex items-center h-20 justify-center"
          >
            <PlusCircle className="w-5 h-5 mr-2" /> <span>Response Node</span>
          </button>
        </div>
        <div className="mt-5 bg-white p-2 rounded-lg flex flex-col space-y-2">
          <h2 className="flex items-center text-sm text-red-500">
            <Info className="w-3 h-3 mr-1" /> Instructions
          </h2>
          <ul className="text-xs list-decimal ml-4 flex flex-col items-start space-y-1">
            <li>Click on a node to edit its label.</li>
            <li>
              Click the buttons above to add different types of nodes to the
              canvas.
            </li>
            <li>Drag and drop nodes to move them around the canvas.</li>
            <li>
              Connect nodes by dragging from one node's handle to another node's
              handle.
            </li>
            <li>Delete a node by selecting it and pressing the delete key.</li>
          </ul>
        </div>
      </div>
    );
  }

  // Render the sidebar for editing the selected node
  return (
    <div className="bg-neutral-200 w-full h-full text-black p-4">
      <h3 className="font-semibold mb-4 text-xl bg-white text-center p-2 rounded-lg">
        Chat Builder
      </h3>
      <div className="w-full flex flex-col items-start space-y-2">
        <label className="font-semibold">Message</label>
        <input
          type="text"
          value={label}
          onChange={handleLabelChange}
          onKeyDown={handleInputKeyDown}
          aria-label="Node Label"
          className="rounded-md w-full text-black text-sm p-2 outline-none border border-black"
        />
        <button
          onClick={handleSave}
          className="bg-black text-white rounded-md p-2 px-4 text-sm"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
});

export default Sidebar;
