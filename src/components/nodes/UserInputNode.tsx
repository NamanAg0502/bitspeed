import React from 'react';
import { NodeProps, Handle, Position } from 'reactflow';
import { UserInputNodeData } from '../../lib/types';

const UserInputNode: React.FC<NodeProps<UserInputNodeData>> = ({ data }) => {
  return (
    <div className="bg-blue-200 rounded-lg shadow-md p-4">
      <div className="font-semibold">{data.label}</div>
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  );
};

export default UserInputNode;
