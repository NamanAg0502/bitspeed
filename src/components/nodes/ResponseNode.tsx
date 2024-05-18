import React from 'react';
import { NodeProps, Handle, Position } from 'reactflow';
import { ResponseNodeData } from '../../lib/types';

const ResponseNode: React.FC<NodeProps<ResponseNodeData>> = ({ data }) => {
  return (
    <div className="bg-yellow-200 rounded-lg shadow-md p-4">
      <div className="font-semibold">{data.label}</div>
      <Handle type="target" position={Position.Left} />
    </div>
  );
};

export default ResponseNode;
