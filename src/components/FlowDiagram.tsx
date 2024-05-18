'use client';

import React, { useCallback, useMemo } from 'react';
import ReactFlow, {
  Background,
  Connection,
  Controls,
  MiniMap,
  Edge,
  NodeMouseHandler,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { nodeTypes } from './nodes';
import { edgeOptions } from './edges';
import useFlowStore from '../hooks/store';
import { createNewNode } from '../lib/utils';
import Sidebar from './sidebar';

/**
 * FlowDiagram Component
 * This component renders an interactive flow diagram using the ReactFlow library.
 * It allows users to add, connect, and select nodes within the diagram.
 */
const FlowDiagram: React.FC = () => {
  // Extracting state and actions from the custom hook useFlowStore
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    selectNode,
    unselectNode,
  } = useFlowStore();

  /**
   * Handles the creation of a new connection between nodes.
   * Uses useCallback to memoize the function and avoid unnecessary re-renders.
   *
   * @param {Edge | Connection} params - Connection parameters.
   */
  const handleConnect = useCallback(
    (params: Edge | Connection) => {
      onConnect(params);
    },
    [onConnect]
  );

  /**
   * Handles the event when a node is clicked.
   * Prevents the default event and selects the node by its ID.
   *
   * @param {React.MouseEvent} event - Mouse event.
   * @param {Node} node - The node that was clicked.
   */
  const handleNodeClick: NodeMouseHandler = useCallback(
    (event, node) => {
      event.preventDefault();
      selectNode(node.id);
    },
    [selectNode]
  );

  /**
   * Adds a new node of a specified type to the diagram.
   * Uses useCallback to memoize the function and avoid unnecessary re-renders.
   *
   * @param {string} nodeType - The type of the node to add.
   */
  const handleAddNode = useCallback(
    (nodeType: string) => {
      const newNode = createNewNode(nodes, nodeType);
      addNode(newNode);
    },
    [nodes, addNode]
  );

  /**
   * Handles the event when the canvas is clicked.
   * Unselects any selected node.
   */
  const handleCanvasClick = useCallback(() => {
    unselectNode();
  }, [unselectNode]);

  const validateFlow = useCallback(() => {
    // Check if all nodes are connected
    const isConnected = nodes.every((node) => {
      switch (node.type) {
        case 'chat-node':
          // Chat nodes should have at least one outgoing edge
          return edges.some((edge) => edge.source === node.id);
        case 'response-node':
          // Response nodes should have at least one incoming edge
          return edges.some((edge) => edge.target === node.id);
        case 'user-input-node':
          // User input nodes should have at least one incoming and one outgoing edge
          return (
            edges.some((edge) => edge.target === node.id) &&
            edges.some((edge) => edge.source === node.id)
          );
        default:
          return false;
      }
    });
    return isConnected;
  }, [nodes, edges]);

  const handleSaveFlow = useCallback(() => {
    if (validateFlow()) {
      alert('Flow saved successfully!');
    } else {
      alert('Cannot save flow. All nodes must be connected.');
    }
  }, [validateFlow]);

  // Memoizes the ReactFlow instance to avoid re-rendering when dependencies haven't changed
  const reactFlowInstance = useMemo(
    () => (
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={handleConnect}
        nodeTypes={nodeTypes}
        onPaneClick={handleCanvasClick}
        onNodeClick={handleNodeClick}
        defaultEdgeOptions={edgeOptions}
        fitView
        zoomOnScroll
        zoomOnPinch
      >
        <Controls />
        <MiniMap />
        <Background gap={12} size={1} />
      </ReactFlow>
    ),
    [
      nodes,
      edges,
      onNodesChange,
      onEdgesChange,
      handleConnect,
      handleCanvasClick,
      handleNodeClick,
    ]
  );

  return (
    <div className="h-full w-full flex">
      <div className="w-4/5">{reactFlowInstance}</div>
      <div className="flex flex-col w-1/5">
        <div className="w-full flex-1">
          <Sidebar onAddNode={handleAddNode} />
        </div>
        <button
          onClick={handleSaveFlow}
          className="bg-green-500 text-white rounded-md px-4 py-2 my-4 mx-auto block w-4/5"
        >
          Save Flow
        </button>
      </div>
    </div>
  );
};

export default FlowDiagram;
