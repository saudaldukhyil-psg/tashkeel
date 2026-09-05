'use client';
import { useMemo, type ReactNode } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MarkerType,
  type Node,
  type Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import {
  agents,
  sources,
  asIs,
  toBe,
  tr,
  type Lang,
  type Copy,
} from '@/lib/enterprise';
export function Pick({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (s: string) => void;
}) {
  return (
    <label className="pick">
      <span>{label}</span>
      <Select value={value} onValueChange={(v) => v !== null && onChange(v)}>
        <SelectTrigger aria-label={label}>
          <SelectValue>
            {options.find((x) => x.value === value)?.label}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem value={o.value} key={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </label>
  );
}
export function GridTable({
  heads,
  rows,
}: {
  heads: string[];
  rows: ReactNode[][];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {heads.map((h, i) => (
            <TableHead key={i}>{h}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((r, i) => (
          <TableRow key={i}>
            {r.map((c, j) => (
              <TableCell key={j}>{c}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
export function Meter({ label, value }: { label: string; value: number }) {
  return (
    <div className="barrow">
      <p>
        {label}
        <b>{value}%</b>
      </p>
      <Progress value={value} aria-label={label} />
    </div>
  );
}
export function Tag({
  children,
  tone = 'green',
}: {
  children: ReactNode;
  tone?: string;
}) {
  return <span className={'tag ' + tone}>{children}</span>;
}
export function Flow({
  mode,
  lang,
  onAgent,
}: {
  mode: 'asis' | 'tobe' | 'agents' | 'lineage';
  lang: Lang;
  onAgent?: (id: string) => void;
}) {
  const { nodes, edges } = useMemo(() => {
    const n: Node[] = [];
    const e: Edge[] = [];
    const add = (
      id: string,
      label: string,
      x: number,
      y: number,
      kind = 'normal',
    ) =>
      n.push({
        id,
        position: { x, y },
        data: { label },
        style: {
          background: kind === 'human' ? '#342b23' : '#17252a',
          border: `1px solid ${kind === 'human' ? '#8c7150' : '#48665d'}`,
          color: '#d3e7e0',
          borderRadius: 9,
          width: 180,
          padding: 15,
          fontSize: 12,
        },
        sourcePosition: undefined,
      });
    const link = (a: string, b: string) =>
      e.push({
        id: a + '-' + b,
        source: a,
        target: b,
        type: 'smoothstep',
        animated: false,
        style: { stroke: '#658879' },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#658879' },
      });
    if (mode === 'agents') {
      agents.forEach((a, i) =>
        add(
          a.id,
          tr(a.name, lang),
          (i % 4) * 245,
          Math.floor(i / 4) * 190,
          a.id === 'human' ? 'human' : 'normal',
        ),
      );
      [
        ['triage', 'inventory'],
        ['inventory', 'procurement'],
        ['procurement', 'supplier'],
        ['supplier', 'finance'],
        ['finance', 'policy'],
        ['policy', 'human'],
        ['human', 'outcome'],
        ['policy', 'procurement'],
      ].forEach(([a, b]) => link(a, b));
    } else if (mode === 'lineage') {
      sources.forEach((s, i) => add(s.id, tr(s.name, lang), 0, i * 100));
      agents.forEach((a, i) => {
        add(a.id, tr(a.name, lang), 420, i * 100);
        a.inputs.forEach((x) => link(x, a.id));
      });
    } else {
      const items = mode === 'asis' ? asIs : toBe;
      items.forEach((s, i) => {
        const col = i % 5;
        const row = Math.floor(i / 5);
        add(
          String(i),
          `${String(i + 1).padStart(2, '0')}  ${tr(s, lang)}`,
          col * 235,
          row * 190,
          (mode === 'asis' ? [2, 4, 6].includes(i) : i === 5)
            ? 'human'
            : 'normal',
        );
        if (i) link(String(i - 1), String(i));
      });
    }
    return { nodes: n, edges: e };
  }, [mode, lang]);
  return (
    <div className={'flow ' + (mode === 'lineage' ? 'lineage' : '')} dir="ltr">
      <ReactFlow
        key={mode + lang}
        nodes={nodes}
        edges={edges}
        fitView
        fitViewOptions={{ padding: 0.16 }}
        minZoom={0.3}
        maxZoom={1.5}
        nodesDraggable={false}
        nodesConnectable={false}
        onNodeClick={(_, n) => onAgent?.(n.id)}
        colorMode="dark"
      >
        <Background color="#2b3c43" gap={24} />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}
export function DetailFields({ rows }: { rows: [string, ReactNode][] }) {
  return (
    <dl className="detailfields">
      {rows.map(([k, v]) => (
        <div key={k}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}
export const c = (en: string, ar: string): Copy => [en, ar];
