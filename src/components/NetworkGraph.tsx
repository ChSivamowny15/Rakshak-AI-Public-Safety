import { useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  type Node,
  type Edge,
  Position,
  Handle,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Phone, Building2, Smartphone, AtSign, Hexagon } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface GraphNode {
  id: string;
  label: string;
  type: 'phone' | 'bank' | 'upi' | 'device' | 'cluster';
  risk: 'high' | 'med' | 'low';
}

const typeMeta: Record<GraphNode['type'], { icon: LucideIcon; color: string; ring: string }> = {
  phone: { icon: Phone, color: '#22d3ee', ring: 'border-cyan-400/40' },
  bank: { icon: Building2, color: '#3b82f6', ring: 'border-blue-400/40' },
  upi: { icon: AtSign, color: '#a855f7', ring: 'border-violet-400/40' },
  device: { icon: Smartphone, color: '#f59e0b', ring: 'border-amber-400/40' },
  cluster: { icon: Hexagon, color: '#f43f5e', ring: 'border-rose-400/40' },
};

const riskGlow: Record<GraphNode['risk'], string> = {
  high: 'shadow-[0_0_18px_rgba(244,63,94,0.35)]',
  med: 'shadow-[0_0_14px_rgba(245,158,11,0.25)]',
  low: 'shadow-[0_0_12px_rgba(34,211,238,0.2)]',
};

function FraudNode({ data }: { data: { label: string; type: GraphNode['type']; risk: GraphNode['risk'] } }) {
  const meta = typeMeta[data.type];
  const Icon = meta.icon;
  return (
    <div
      className={`flex items-center gap-2 rounded-xl border ${meta.ring} ${riskGlow[data.risk]} bg-ink-850/90 px-3 py-2 backdrop-blur-md`}
    >
      <Handle type="target" position={Position.Left} className="!h-2 !w-2 !border-0 !bg-white/30" />
      <div className="grid h-7 w-7 place-items-center rounded-lg" style={{ background: `${meta.color}22`, color: meta.color }}>
        <Icon size={15} />
      </div>
      <span className="whitespace-nowrap font-mono text-xs text-slate-200">{data.label}</span>
      <Handle type="source" position={Position.Right} className="!h-2 !w-2 !border-0 !bg-white/30" />
    </div>
  );
}

const nodeTypes = { fraud: FraudNode };

export function NetworkGraph({
  nodes,
  edges,
  height = 460,
}: {
  nodes: GraphNode[];
  edges: { id: string; source: string; target: string }[];
  height?: number;
}) {
  const layout: Record<string, { x: number; y: number }> = useMemo(() => {
    const positions: Record<string, { x: number; y: number }> = {};
    const cols = [
      { x: 40, types: ['phone'] },
      { x: 240, types: ['upi', 'device'] },
      { x: 440, types: ['bank', 'cluster'] },
    ];
    const buckets: Record<string, GraphNode[]> = { phone: [], upi: [], device: [], bank: [], cluster: [] };
    nodes.forEach((n) => buckets[n.type].push(n));
    cols.forEach((c) => {
      const items = c.types.flatMap((t) => buckets[t] || []);
      items.forEach((n, i) => {
        positions[n.id] = { x: c.x, y: 40 + i * 90 };
      });
    });
    return positions;
  }, [nodes]);

  const rfNodes: Node[] = nodes.map((n) => ({
    id: n.id,
    type: 'fraud',
    position: layout[n.id] || { x: 0, y: 0 },
    data: { label: n.label, type: n.type, risk: n.risk },
  }));

  const rfEdges: Edge[] = edges.map((e) => ({
    ...e,
    animated: true,
    style: { stroke: '#3b82f6', strokeWidth: 1.5, strokeOpacity: 0.5 },
  }));

  return (
    <div style={{ height }} className="w-full overflow-hidden rounded-2xl">
      <ReactFlow
        nodes={rfNodes}
        edges={rfEdges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        nodesDraggable
        panOnDrag
        zoomOnScroll={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="rgba(34,211,238,0.08)" gap={28} />
        <Controls showInteractive={false} className="!border-white/10 !bg-white/5" />
      </ReactFlow>
    </div>
  );
}
