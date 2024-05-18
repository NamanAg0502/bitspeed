import { create } from 'zustand';
import {
  Node,
  Edge,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Connection,
  EdgeChange,
  NodeChange,
} from 'reactflow';
import { initialNodes } from '../components/nodes'; // Ensure this is the correct path
import { initialEdges } from '../components/edges'; // Ensure this is the correct path

interface FlowState {
  nodes: Node[];
  edges: Edge[];
  selectedNodeId: string | null;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (params: Edge | Connection) => void;
  addNode: (newNode: Node) => void;
  selectNode: (nodeId: string | null) => void;
  unselectNode: () => void;
  updateNodeLabel: (nodeId: string, label: string) => void;
}

const useFlowStore = create<FlowState>((set) => ({
  nodes: initialNodes,
  edges: initialEdges,
  selectedNodeId: null,
  onNodesChange: (changes) =>
    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes),
    })),
  onEdgesChange: (changes) =>
    set((state) => ({
      edges: applyEdgeChanges(changes, state.edges),
    })),
  onConnect: (params) =>
    set((state) => ({
      edges: addEdge(params, state.edges),
    })),
  addNode: (newNode) =>
    set((state) => ({
      nodes: [...state.nodes, newNode],
    })),
  selectNode: (nodeId) =>
    set(() => ({
      selectedNodeId: nodeId,
    })),
  unselectNode: () =>
    set(() => ({
      selectedNodeId: null,
    })),
  updateNodeLabel: (nodeId, label) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, label } } : node
      ),
    })),
}));

export default useFlowStore;
