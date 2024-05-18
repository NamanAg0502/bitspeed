import React from 'react';
import { NodeProps, Handle, Position } from 'reactflow';
import { ChatNodeData } from '../../lib/types';

const ChatNode: React.FC<NodeProps<ChatNodeData>> = ({ data }) => {
  return (
    <div className="bg-green-200 rounded-lg shadow-md p-4">
      <div className="font-semibold">{data.label}</div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default ChatNode;
