import ReactFlow, {
  addEdge,
  Background,
  Connection,
  ConnectionMode,
  Controls,
  Node,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import * as Toolbar from '@radix-ui/react-toolbar';
import { zinc } from 'tailwindcss/colors';
import 'reactflow/dist/style.css';

import { Square } from './components/nodes/Square';
import { useCallback } from 'react';
import DefaultEdge from './components/edges/DefaultEdge';

const NODE_TYPES = {
  square: Square,
};

const EDGE_TYPES = {
  default: DefaultEdge,
};

const INITIAL_NODES = [
  {
    id: crypto.randomUUID(),
    type: 'square',
    position: {
      x: 200,
      y: 400,
    },
    data: {},
  },
  {
    id: crypto.randomUUID(),
    type: 'square',
    position: {
      x: 1000,
      y: 400,
    },
    data: {
      label: 'Hello',
    },
  },
] satisfies Node[];

function App() {
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES);

  const onConnect = useCallback((connection: Connection) => {
    return setEdges((prevEdges) => addEdge(connection, prevEdges));
  }, []);

  return (
    <div className="w-screen h-screen">
      <ReactFlow
        nodeTypes={NODE_TYPES}
        edgeTypes={EDGE_TYPES}
        nodes={nodes}
        connectionMode={ConnectionMode.Loose}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        defaultEdgeOptions={{
          type: 'default',
        }}
      >
        <Background gap={12} size={2} color={zinc[200]} />
        <Controls />
      </ReactFlow>

      <Toolbar.Root className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg border border-zinc-300 px-8 h-20 w-96 overflow-hidden">
        <Toolbar.Button>

        </Toolbar.Button>
      </Toolbar.Root>
    </div>
  );
}

export default App;
