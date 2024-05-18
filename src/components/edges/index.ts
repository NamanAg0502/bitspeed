import type { Edge, EdgeTypes } from 'reactflow';

export const initialEdges = [
  {
    id: 'start-to-user-input',
    source: 'start',
    target: 'user-input',
    animated: true,
  },
  {
    id: 'user-input-to-response-1',
    source: 'user-input',
    target: 'response-1',
    animated: true,
  },
  {
    id: 'user-input-to-response-2',
    source: 'user-input',
    target: 'response-2',
    animated: true,
  },
] satisfies Edge[];

export const edgeTypes = {} satisfies EdgeTypes;

export const edgeOptions = {
  animated: true,
  type: 'smoothstep', // Use a smooth curved edge for better aesthetics
};
