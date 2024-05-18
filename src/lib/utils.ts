import { Node } from 'reactflow';
import { NodeData } from './types';

/**
 * Creates a new node for the flow diagram.
 *
 * @param {Node<NodeData>[]} nodes - Array of existing nodes.
 * @param {string} nodeTypes - Type of the new node.
 * @returns {Node<NodeData>} - Newly created node.
 */
export const createNewNode = (
  nodes: Node<NodeData>[],
  nodeTypes: string
): Node<NodeData> => {
  const id = `${nodes.length + 1}`;
  const newNode: Node<NodeData> = {
    id,
    data: { label: 'New Node' },
    position: { x: 300, y: 50 },
    type: nodeTypes,
  };

  return newNode;
};
