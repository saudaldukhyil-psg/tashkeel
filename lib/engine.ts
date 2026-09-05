import {
  agents,
  asIs,
  toBe,
  policies,
  decisions,
  sources,
  findings,
  scenarios,
  packTitles,
  tr,
  bi,
  type Copy,
  type Lang,
  type Scenario,
} from './enterprise';
export interface Contract {
  text: string;
  baseline: number;
  target: number;
  owner: string;
  horizon: string;
  financial: string;
  autonomy: number;
}
export interface Audit {
  id: string;
  timestamp: string;
  agent: string;
  event: Copy;
  data: string[];
  tool: string;
  policy: string;
  decision: Copy;
  approver: string;
  risk: 'low' | 'medium' | 'high';
  blocked: boolean;
  result: Copy;
}
export interface Result {
  scenario: number;
  decision: Copy;
  explanation: Copy;
  policies: string[];
  systems: string[];
  human: Copy;
  outcome: Copy;
  blocked: boolean;
  agent: string;
  tool: string;
  passed: boolean;
  authority: string;
  level: number;
}
export function simulate(
  s: Scenario,
  authority: string,
  level: number,
): Result {
  const common = { scenario: s.id, passed: true, authority, level };
  if (s.stock > 0)
    return {
      ...common,
      decision: bi(
        'Block external procurement; create internal transfer request.',
        'حظر الشراء الخارجي وإنشاء طلب نقل داخلي.',
      ),
      explanation: bi(
        'Dammam holds 2 units of CR-204. An 8-hour internal transfer avoids an unnecessary purchase.',
        'يوجد في الدمام وحدتان من CR-204. يغني النقل الداخلي خلال 8 ساعات عن الشراء.',
      ),
      policies: ['POL-06', 'CTRL-STOCK-FIRST'],
      systems: ['Inventory System', 'ERP'],
      human: bi(
        'Warehouse custodian confirms dispatch.',
        'يؤكد أمين المستودع الإرسال.',
      ),
      outcome:
        level >= 3
          ? bi(
              'Transfer TR-2026-041 prepared; external order blocked.',
              'إعداد طلب النقل TR-2026-041 وحظر الطلب الخارجي.',
            )
          : bi(
              'Transfer recommended; human execution required at this autonomy level.',
              'التوصية بالنقل؛ يتطلب هذا المستوى التنفيذ البشري.',
            ),
      blocked: true,
      agent: 'inventory',
      tool: level >= 3 ? 'transfer.create' : 'transfer.recommend',
    };
  if (!s.approved)
    return {
      ...common,
      decision: bi(
        'Block supplier selection and launch compliance verification.',
        'حظر اختيار المورد وبدء التحقق من الامتثال.',
      ),
      explanation: bi(
        'Wadi Industrial has no active approval. A lower price does not waive supplier verification.',
        'لا يملك وادي الصناعية اعتماداً سارياً. السعر الأقل لا يعفي من التحقق.',
      ),
      policies: ['POL-03'],
      systems: ['Supplier Database', 'ERP'],
      human: bi(
        'Compliance Officer must approve onboarding.',
        'يجب أن يعتمد مسؤول الامتثال تأهيل المورد.',
      ),
      outcome: bi(
        'Compliance case CMP-2026-019 opened. No supplier selected.',
        'فتح حالة الامتثال CMP-2026-019 دون اختيار مورد.',
      ),
      blocked: true,
      agent: 'supplier',
      tool: 'compliance.open',
    };
  if (!s.budget)
    return {
      ...common,
      decision: bi(
        'Stop purchase-order creation and escalate to Finance.',
        'إيقاف إنشاء أمر الشراء والتصعيد إلى المالية.',
      ),
      explanation: bi(
        'Cost center JB-MNT-04 has no available budget. Potential 24-hour downtime exposure is SAR 360,000.',
        'لا تتوفر ميزانية في مركز JB-MNT-04. التعرض المحتمل لتوقف 24 ساعة هو 360,000 ريال.',
      ),
      policies: ['POL-06', 'POL-05'],
      systems: ['Finance System', 'Maintenance System'],
      human: bi(
        'Finance owner must confirm funding before retry.',
        'يؤكد مسؤول المالية التمويل قبل إعادة المحاولة.',
      ),
      outcome: bi(
        'PO blocked. Finance escalation FIN-2026-012 prepared.',
        'حظر أمر الشراء وإعداد تصعيد المالية FIN-2026-012.',
      ),
      blocked: true,
      agent: 'finance',
      tool: 'budget.check',
    };
  if (s.emergency)
    return {
      ...common,
      decision: bi(
        'Prepare emergency path; wait for an authorized declaration.',
        'إعداد المسار الطارئ وانتظار إعلان من شخص مخوّل.',
      ),
      explanation: bi(
        'A line outage warrants urgency, but the agent cannot declare an emergency. SAR 2.4M also requires CFO approval and three quotations.',
        'يستدعي توقف الخط الاستعجال، لكن الوكيل لا يعلن الطوارئ. تتطلب قيمة 2.4 مليون ريال أيضاً موافقة المدير المالي وثلاثة عروض.',
      ),
      policies: ['POL-04', 'POL-02', 'POL-01', 'POL-06'],
      systems: ['Maintenance System', 'Finance System', 'Procurement Platform'],
      human: authority
        ? bi(
            `${authority} must declare the emergency; CFO must approve spending.`,
            `${authority === 'Plant Manager' ? 'مدير المصنع' : authority === 'COO' ? 'الرئيس التنفيذي للعمليات' : 'رئيس الصيانة'} يعلن الطوارئ؛ ويعتمد المدير المالي الإنفاق.`,
          )
        : bi(
            'Authority unresolved: governance must assign the emergency owner first.',
            'الصلاحية غير محسومة: تحدد الحوكمة مسؤول الطوارئ أولاً.',
          ),
      outcome: bi(
        'Held for human approvals. No purchase order issued.',
        'معلق للموافقات البشرية؛ لم يصدر أمر شراء.',
      ),
      blocked: true,
      agent: 'human',
      tool: 'approval.request',
    };
  return {
    ...common,
    decision: bi(
      'Request three quotations and route standard approval.',
      'طلب ثلاثة عروض وتوجيه الاعتماد الاعتيادي.',
    ),
    explanation: bi(
      'The SAR 1.2M order exceeds the three-quotation threshold. Approved suppliers and available budget permit a standard approval request.',
      'يتجاوز الطلب بقيمة 1.2 مليون ريال حد العروض الثلاثة. يسمح اعتماد المورد وتوفر الميزانية بطلب الاعتماد الاعتيادي.',
    ),
    policies: ['POL-01', 'POL-03', 'POL-06'],
    systems: ['Procurement Platform', 'Finance System', 'Supplier Database'],
    human: bi(
      'Head of Procurement approves the SAR 1.2M award.',
      'يعتمد رئيس المشتريات الترسية بقيمة 1.2 مليون ريال.',
    ),
    outcome:
      level >= 3
        ? bi(
            'RFQ-2026-087 prepared for 3 suppliers; award awaits approval.',
            'إعداد RFQ-2026-087 لثلاثة موردين؛ الترسية بانتظار الاعتماد.',
          )
        : bi(
            'Quotation request recommended; human execution required.',
            'التوصية بطلب العروض؛ يتطلب الإجراء تنفيذاً بشرياً.',
          ),
    blocked: false,
    agent: 'procurement',
    tool: level >= 3 ? 'quotation.request' : 'quotation.recommend',
  };
}
export interface ObjectiveAnalysis {
  valid: boolean;
  checks: { label: Copy; present: boolean; value: string }[];
}
export interface AIProvider {
  name: string;
  analyzeObjective(c: Contract): Promise<ObjectiveAnalysis>;
  runException(s: Scenario, authority: string, level: number): Promise<Result>;
}
export function analyze(c: Contract): ObjectiveAnalysis {
  const measurable =
    /\d|[٠-٩]/.test(c.text) && c.baseline > c.target && c.target > 0;
  const checks = [
    {
      label: bi('Business outcome', 'النتيجة المستهدفة'),
      present: c.text.trim().length >= 25,
      value: c.text,
    },
    {
      label: bi('Baseline', 'خط الأساس'),
      present: c.baseline > 0,
      value: String(c.baseline),
    },
    {
      label: bi('Target', 'المستهدف'),
      present: measurable,
      value: String(c.target),
    },
    {
      label: bi('Time horizon', 'الأفق الزمني'),
      present: !!c.horizon.trim(),
      value: c.horizon,
    },
    {
      label: bi('Business owner', 'مسؤول الأعمال'),
      present: !!c.owner.trim(),
      value: c.owner,
    },
    {
      label: bi('Financial impact', 'الأثر المالي'),
      present: !!c.financial.trim(),
      value: c.financial,
    },
    {
      label: bi('Risk constraints', 'قيود المخاطر'),
      present: /polic|risk|سياس|توقف|مخاطر/i.test(c.text),
      value: c.text,
    },
    {
      label: bi('Success KPI', 'مؤشر النجاح'),
      present: measurable,
      value: `${c.baseline} → ${c.target}`,
    },
  ];
  return { valid: checks.every((x) => x.present), checks };
}
export const localProvider: AIProvider = {
  name: 'Deterministic local provider',
  analyzeObjective: async (c) => analyze(c),
  runException: async (s, a, l) => simulate(s, a, l),
};
export const makeAudit = (r: Result): Audit => ({
  id: `AUD-${Date.now()}-${r.scenario}`,
  timestamp: new Date().toISOString(),
  agent: r.agent,
  event: bi(
    `Exception scenario ${r.scenario}`,
    `سيناريو الاستثناء ${r.scenario}`,
  ),
  data: r.systems,
  tool: r.tool,
  policy: r.policies.join(', '),
  decision: r.decision,
  approver: '—',
  risk: r.blocked ? 'high' : 'medium',
  blocked: r.blocked,
  result: r.outcome,
});
export const initialAudit: Audit[] = [
  {
    id: 'AUD-SEED-001',
    timestamp: '2026-09-05T08:00:00.000Z',
    agent: 'policy',
    event: bi('Demo workspace initialized', 'تهيئة مساحة العرض'),
    data: ['DOC-01', 'DOC-02', 'DOC-03'],
    tool: 'policy.evaluate',
    policy: 'POL-04',
    decision: bi(
      'Emergency authority gap identified.',
      'تحديد فجوة صلاحية إعلان الطوارئ.',
    ),
    approver: '—',
    risk: 'high',
    blocked: true,
    result: bi('Awaiting governance confirmation.', 'بانتظار تأكيد الحوكمة.'),
  },
];
export interface Assumptions {
  hourly: number;
  incidents: number;
  teamHours: number;
  delay: number;
  implementation: number;
}
export function estimate(a: Assumptions) {
  const avoided = a.incidents * a.delay * 24 * 0.7;
  const hours = a.teamHours * 0.6;
  const annual = avoided * a.hourly + hours * 150;
  return {
    avoided,
    hours,
    annual,
    payback: annual > 0 ? (a.implementation / annual) * 12 : null,
  };
}
export function generatePack(
  c: Contract,
  authority: string,
  results: Result[],
  lang: Lang,
) {
  const s = (x: Copy) => tr(x, lang);
  const analysis = analyze(c);
  const objective = {
    problem_statement: c.text,
    baseline_days: c.baseline,
    target_days: c.target,
    business_owner: c.owner || 'UNASSIGNED',
    time_horizon: c.horizon || 'UNASSIGNED',
    financial_impact: c.financial || 'UNCONFIRMED',
    kpi: s(
      bi(
        'Median elapsed request-to-receipt time for critical parts',
        'وسيط الزمن من طلب القطع الحرجة إلى استلامها',
      ),
    ),
    autonomy_level: c.autonomy,
    approval_conditions: decisions
      .filter((x) => x.category === 2)
      .map((x) => s(x.label)),
    stop_conditions: policies
      .filter((x) => ['POL-03', 'POL-04', 'POL-06'].includes(x.id))
      .map((x) => s(x.rule)),
    data_sources: sources.map((x) => x.id),
    measurement_method: s(
      bi(
        'Reconcile ERP request timestamps with signed maintenance receipts; weekly median and P90, monthly owner review.',
        'مطابقة أوقات طلبات الموارد مع استلامات الصيانة المعتمدة؛ الوسيط والمئين 90 أسبوعياً، ومراجعة شهرية.',
      ),
    ),
  };
  const agentSpecs = agents.map((a) => ({
    ...a,
    name: s(a.name),
    purpose: s(a.purpose),
    allowed: s(a.allowed),
    prohibited: s(a.prohibited),
    escalation: s(a.escalation),
    approval: s(a.approval),
    metric: s(a.metric),
    route: s(a.route),
    systems: a.systems.map((i) => i),
  }));
  const risk_register = findings.map((f, i) => ({
    id: `R-${i + 1}`,
    risk: s(f),
    status: i === 2 && authority ? 'mitigation_confirmed' : 'open',
    owner: s(
      [sources[7], sources[4], sources[2], sources[0], sources[1], sources[3]][
        i
      ].owner,
    ),
    mitigation: s(
      [sources[7], sources[4], sources[2], sources[0], sources[1], sources[3]][
        i
      ].remediation,
    ),
  }));
  const sections: unknown[] = [
    { company: 'Namaa Industrial Group', problem: c.text, prototype: true },
    objective,
    asIs.map(s),
    toBe.map(s),
    agentSpecs,
    agents.map((a) => ({
      agent: a.id,
      tools: a.tools,
      permitted: s(a.allowed),
      prohibited: s(a.prohibited),
    })),
    sources.map((x) => ({
      id: x.id,
      name: s(x.name),
      score: x.score,
      sensitivity: s(x.sensitivity),
      remediation: s(x.remediation),
    })),
    {
      connectors: [
        'ERP read orders + scoped PO write',
        'Inventory read + transfer requests',
        'Finance read-only budget',
        'Supplier approval read-only',
        'Maintenance events read-only',
        'Human approvals signed event',
      ],
      controls: s(
        bi(
          'Sandbox credentials, least privilege, idempotency keys, 30-second timeout, retries only for safe reads, signed audit events.',
          'بيانات دخول تجريبية وأقل صلاحية ومفاتيح منع التكرار ومهلة 30 ثانية، مع إعادة القراءة الآمنة وتوقيع أحداث التدقيق.',
        ),
      ),
    },
    decisions.map((d) => ({
      decision: s(d.label),
      category: d.category,
      owner: s(d.owner),
      emergency_authority: authority || 'UNRESOLVED',
    })),
    policies.map((p) => ({
      id: p.id,
      rule: s(p.rule),
      source: p.source,
      expression: p.expression,
    })),
    scenarios.map((x) => ({
      id: x.id,
      input: x,
      expected: s(simulate(x, authority, c.autonomy).decision),
      result: results.find((r) => r.scenario === x.id)
        ? s(results.find((r) => r.scenario === x.id)!.outcome)
        : 'NOT_RUN',
    })),
    {
      criteria: [
        '5/5 exception tests pass',
        '100% critical policy controls pass',
        'All high risks signed off',
        'Outcome owner and horizon assigned',
        'No unapproved or unfunded PO',
        'ERP request/receipt lineage reconciled',
      ],
      current_status:
        analysis.valid && authority && results.length === 5
          ? 'SIMULATED_TESTS_COMPLETE; REAL_PILOT_APPROVAL_STILL_REQUIRED'
          : 'DRAFT_GATES_OPEN',
    },
    risk_register,
    {
      controls: [
        'No restricted data egress',
        'Human emergency declaration',
        'CFO material spending approval',
        'Versioned rules and audit events',
        'Kill switch on policy failure',
        'Weekly owner review',
      ],
      authority: authority || 'UNRESOLVED',
    },
    {
      baseline: c.baseline,
      target: c.target,
      simulated_future: 2.7,
      method: objective.measurement_method,
      frequency: 'weekly',
      owner: c.owner || 'UNASSIGNED',
    },
    [
      {
        phase: 1,
        weeks: '1–2',
        scope: 'Assign ownership and remediate criticality / authority gaps',
      },
      {
        phase: 2,
        weeks: '3–4',
        scope: 'Read-only connectors and shadow evaluation',
      },
      { phase: 3, weeks: '5–6', scope: 'Human-supervised pilot at one plant' },
      {
        phase: 4,
        weeks: '7–12',
        scope: 'Evaluate measured KPI and authorize phased rollout',
      },
    ],
  ];
  return {
    schema_version: '1.0',
    mode: 'fictional_local_prototype',
    generated_at: new Date().toISOString(),
    production_authorized: false,
    objective,
    agents: agentSpecs,
    tools: agents.flatMap((a) =>
      a.tools.map((tool) => ({ tool, agent: a.id })),
    ),
    permissions: sections[5],
    policies: sections[9],
    human_approvals: sections[8],
    exceptions: sections[10],
    acceptance_tests: sections[11],
    kpis: sections[14],
    risk_register,
    sections: packTitles.map((t, i) => ({ title: s(t), content: sections[i] })),
  };
}
export function download(
  name: string,
  content: string,
  mime = 'text/plain;charset=utf-8',
) {
  const a = document.createElement('a');
  a.href = `data:${mime};charset=utf-8,${encodeURIComponent(content)}`;
  a.download = name;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => a.remove(), 1000);
}

export function formatDocument(value: unknown, depth = 0): string {
  if (value === null || value === undefined) return '—';
  if (typeof value === 'string') return value;
  if (
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    typeof value === 'bigint'
  )
    return `${value}`;
  if (typeof value !== 'object') return '—';
  if (Array.isArray(value))
    return value
      .map((v, i) =>
        typeof v === 'object'
          ? `### ${i + 1}\n\n${formatDocument(v, depth + 1)}`
          : `- ${String(v)}`,
      )
      .join('\n\n');
  return Object.entries(value)
    .map(([key, v]) => {
      const label = key.replaceAll('_', ' ');
      return typeof v === 'object'
        ? `**${label}**\n\n${formatDocument(v, depth + 1)}`
        : `**${label}:** ${String(v)}`;
    })
    .join('\n\n');
}
