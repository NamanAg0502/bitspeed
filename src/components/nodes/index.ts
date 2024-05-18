import type { Node, NodeTypes } from 'reactflow';
import ChatNode from './ChatNode';
import ResponseNode from './ResponseNode';
import UserInputNode from './UserInputNode';

// Define initial nodes for the chat builder
export const initialNodes = [
  {
    id: 'start',
    type: 'chat-node',
    position: { x: 0, y: 0 },
    data: { label: 'Start' },
  },
  {
    id: 'user-input',
    type: 'user-input-node',
    position: { x: 200, y: 100 },
    data: { label: 'User Input' },
  },
  {
    id: 'response-1',
    type: 'response-node',
    position: { x: 400, y: 200 },
    data: { label: 'Response 1' },
  },
  {
    id: 'response-2',
    type: 'response-node',
    position: { x: 400, y: 300 },
    data: { label: 'Response 2' },
  },
] satisfies Node[];

// Define node types for the chat builder
export const nodeTypes = {
  'chat-node': ChatNode,
  'user-input-node': UserInputNode,
  'response-node': ResponseNode,
} satisfies NodeTypes;
