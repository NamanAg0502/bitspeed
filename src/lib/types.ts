export interface NodeData {
  label: string;
}

export interface EdgeData {
  label?: string;
}

export interface SidebarProps {
  onAddNode: (nodeType: string) => void;
}

export interface UserInputNodeData {
  label: string;
}

export interface ResponseNodeData {
  label: string;
}

export interface ChatNodeData {
  label: string;
}
