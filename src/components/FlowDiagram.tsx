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
      {/* Main diagram area taking up 4/5 of the width */}
      <div className="w-4/5">{reactFlowInstance}</div>
      {/* Sidebar area taking up 1/5 of the width */}
      <div className="w-1/5">
        <Sidebar onAddNode={handleAddNode} />
      </div>
    </div>
  );
};

export default FlowDiagram;
