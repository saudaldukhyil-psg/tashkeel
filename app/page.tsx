'use client';
import { useState, useEffect, useRef } from 'react';
import {
  ArrowUpRight,
  Layers3,
  Play,
  ShieldCheck,
  Activity,
  ArrowRight,
  LayoutDashboard,
  Target,
  Files,
  GitBranch,
  Database,
  Scale,
  Network,
  UserCheck,
  FlaskConical,
  Package,
  ChartNoAxesCombined,
  History,
  RotateCcw,
  Globe,
  Check,
  AlertTriangle,
  FileText,
  ChevronRight,
  Lock,
  Download,
  LoaderCircle,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Toaster, toast } from 'sonner';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
} from 'recharts';
import {
  Pick,
  GridTable,
  Meter,
  Tag,
  Flow,
  DetailFields,
} from '@/components/studio';
import {
  bi,
  tr,
  nav,
  objectiveText,
  disclaimer,
  sources,
  systems,
  findings,
  policies,
  agents,
  asIs,
  toBe,
  decisions,
  categories,
  scenarios,
  packTitles,
  type Lang,
  type Copy,
} from '@/lib/enterprise';
import {
  localProvider,
  analyze,
  makeAudit,
  initialAudit,
  estimate,
  generatePack,
  type Contract,
  type Result,
  type Audit,
  type Assumptions,
  type ObjectiveAnalysis,
  formatDocument,
} from '@/lib/engine';
const icons = [
  LayoutDashboard,
  Target,
  Files,
  GitBranch,
  Database,
  Scale,
  Network,
  UserCheck,
  FlaskConical,
  Package,
  ChartNoAxesCombined,
  History,
];
const initialContract: Contract = {
  text: objectiveText[0],
  baseline: 9,
  target: 3,
  owner: '',
  horizon: '',
  financial: '',
  autonomy: 3,
};
const steps = [
  {
    page: 1,
    title: bi('Define the business outcome', 'تحديد نتيجة الأعمال'),
    hint: bi(
      'Review the objective. Add the missing owner, time horizon and financial impact, then create the Outcome Contract.',
      'راجع الهدف وأكمل المسؤول والأفق الزمني والأثر المالي، ثم أنشئ عقد النتائج.',
    ),
  },
  {
    page: 2,
    title: bi('Discover enterprise constraints', 'استكشاف قيود المؤسسة'),
    hint: bi(
      'Open a source to show its evidence and readiness gaps. All eight documents are preloaded.',
      'افتح مصدراً لعرض أدلته وفجوات الجاهزية. المستندات الثمانية محملة مسبقاً.',
    ),
  },
  {
    page: 5,
    title: bi('Reveal policy and data gaps', 'كشف فجوات السياسات والبيانات'),
    hint: bi(
      'Show the emergency authority conflict. A human must explicitly confirm the recommended role.',
      'اعرض تعارض صلاحية الطوارئ. يجب أن يؤكد الإنسان الدور الموصى به صراحةً.',
    ),
  },
  {
    page: 6,
    title: bi('Generate the agent operating model', 'توليد نموذج تشغيل الوكلاء'),
    hint: bi(
      'Explore an agent, its permissions and model route. Open the target operating model tab.',
      'استكشف وكيلاً وصلاحياته ومسار نموذجه، ثم افتح تبويب نموذج التشغيل المستهدف.',
    ),
  },
  {
    page: 8,
    title: bi('Test the exceptions', 'اختبار الاستثناءات'),
    hint: bi(
      'Run all five scenarios. A passed test can correctly block an unsafe action.',
      'شغّل السيناريوهات الخمسة. قد يعني نجاح الاختبار حظر إجراء غير آمن بشكل صحيح.',
    ),
  },
  {
    page: 9,
    title: bi('Generate the deployment pack', 'توليد حزمة النشر'),
    hint: bi(
      'Generate the sixteen-section package and export the executive, technical or governance view.',
      'ولّد الحزمة ذات الأقسام الستة عشر وصدّر الملخص التنفيذي أو المواصفات أو الحوكمة.',
    ),
  },
  {
    page: 10,
    title: bi(
      'Show measurable simulated value',
      'عرض قيمة المحاكاة القابلة للقياس',
    ),
    hint: bi(
      'Adjust downtime assumptions to show value and payback. These are scenario estimates, not realized savings.',
      'عدّل افتراضات التوقف لعرض القيمة والاسترداد. هذه تقديرات سيناريو وليست وفورات متحققة.',
    ),
  },
];
function Navigation({
  page,
  go,
  lang,
}: {
  page: number;
  go: (p: number) => void;
  lang: Lang;
}) {
  const { setOpenMobile } = useSidebar();
  return (
    <SidebarMenu>
      {nav.map((x, i) => {
        const Icon = icons[i];
        return (
          <SidebarMenuItem key={i}>
            <SidebarMenuButton
              className={'nav ' + (page === i ? 'active' : '')}
              isActive={page === i}
              onClick={() => {
                go(i);
                setOpenMobile(false);
              }}
            >
              <Icon size={16} />
              <span>{tr(x, lang)}</span>
              {i === 8 && <span className="navcount">5</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
export default function Page() {
  const [lang, setLang] = useState<Lang>('en');
  const [exportAsset, setExportAsset] = useState<{
    name: string;
    content: string;
    mime: string;
  } | null>(null);
  const prepareDownload = (
    name: string,
    content: string,
    mime = 'text/plain',
  ) => {
    setDrawer(null);
    setExportAsset({ name, content, mime });
  };
  const [page, setPage] = useState(0);
  const [contract, setContract] = useState<Contract>(initialContract);
  const [analysis, setAnalysis] = useState<ObjectiveAnalysis | null>(null);
  const [contractMade, setContractMade] = useState(false);
  const [authority, setAuthority] = useState('');
  const [proposed, setProposed] = useState('Plant Manager');
  const [results, setResults] = useState<Result[]>([]);
  const [audit, setAudit] = useState<Audit[]>(initialAudit);
  const [busy, setBusy] = useState('');
  const [progress, setProgress] = useState(-1);
  const [demo, setDemo] = useState<number | null>(null);
  const [drawer, setDrawer] = useState<{
    type: 'agent' | 'source';
    id: string;
  } | null>(null);
  const [pack, setPack] = useState<ReturnType<typeof generatePack> | null>(
    null,
  );
  const [filter, setFilter] = useState({
    agent: 'all',
    risk: 'all',
    policy: 'all',
    human: 'all',
    blocked: 'all',
    date: '',
  });
  const [assumptions, setAssumptions] = useState<Assumptions>({
    hourly: 15000,
    incidents: 18,
    teamHours: 1200,
    delay: 1,
    implementation: 750000,
  });
  const runId = useRef(0);
  const lock = useRef(false);
  const t = (en: string, ar: string) => (lang === 'ar' ? ar : en);
  const s = (x: Copy) => tr(x, lang);
  const value = estimate(assumptions);
  const fmt = (n: number) =>
    new Intl.NumberFormat(lang === 'ar' ? 'ar-SA' : 'en-US', {
      maximumFractionDigits: 0,
    }).format(n);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const go = (p: number) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };
  const changeContract = (patch: Partial<Contract>) => {
    setPack(null);
    setContract((c) => ({ ...c, ...patch }));
    setAnalysis(null);
    setContractMade(false);
  };
  const record = (
    agent: string,
    event: Copy,
    decision: Copy,
    policy = 'POL-04',
    approver = '—',
  ) =>
    setAudit((a) => [
      {
        id: `AUD-${Date.now()}`,
        timestamp: new Date().toISOString(),
        agent,
        event,
        data: ['Local prototype workspace'],
        tool: 'studio.configure',
        policy,
        decision,
        approver,
        risk: 'medium',
        blocked: false,
        result: bi('Saved in this demo session.', 'تم الحفظ في جلسة العرض.'),
      },
      ...a,
    ]);
  async function analyzeEnterprise() {
    if (lock.current) return;
    lock.current = true;
    const token = ++runId.current;
    setBusy('discovery');
    for (let i = 0; i < 7; i++) {
      if (token !== runId.current) return;
      setProgress(i);
      await new Promise((r) => setTimeout(r, 300));
    }
    if (token !== runId.current) return;
    record(
      'policy',
      bi('Enterprise analysis requested', 'طلب تحليل المؤسسة'),
      bi(
        '8 sources analyzed; 6 enterprise constraints found.',
        'تحليل 8 مصادر وتحديد 6 قيود مؤسسية.',
      ),
    );
    setBusy('');
    lock.current = false;
    go(2);
    toast.success(t('Enterprise discovery complete', 'اكتمل استكشاف المؤسسة'));
  }
  async function runTests(ids: number[]) {
    if (lock.current) return;
    lock.current = true;
    setPack(null);
    const token = ++runId.current;
    setBusy('tests');
    try {
      for (const id of ids) {
        if (token !== runId.current) return;
        setProgress(id - 1);
        await new Promise((r) => setTimeout(r, 550));
        if (token !== runId.current) return;
        const result = await localProvider.runException(
          scenarios[id - 1],
          authority,
          contract.autonomy,
        );
        setResults((r) =>
          [...r.filter((x) => x.scenario !== id), result].sort(
            (a, b) => a.scenario - b.scenario,
          ),
        );
        setAudit((a) => [makeAudit(result), ...a]);
      }
      toast.success(
        t('Exception tests completed', 'اكتملت اختبارات الاستثناءات'),
      );
    } catch {
      toast.error(
        t('Simulation failed. Please retry.', 'تعذرت المحاكاة. أعد المحاولة.'),
      );
    } finally {
      if (token === runId.current) {
        setBusy('');
        lock.current = false;
        setProgress(-1);
      }
    }
  }
  async function checkObjective() {
    setBusy('objective');
    try {
      const a = await localProvider.analyzeObjective(contract);
      setAnalysis(a);
      if (a.valid) {
        setContractMade(true);
        record(
          'outcome',
          bi('Outcome Contract generated', 'إنشاء عقد النتائج'),
          bi('Measurable objective confirmed.', 'تأكيد هدف قابل للقياس.'),
          'CONTRACT',
        );
        toast.success(t('Outcome Contract generated', 'تم إنشاء عقد النتائج'));
      } else
        toast.error(
          t(
            'Complete the highlighted outcome fields',
            'أكمل حقول النتائج المحددة',
          ),
        );
    } finally {
      setBusy('');
    }
  }
  function reset() {
    runId.current++;
    lock.current = false;
    setBusy('');
    setProgress(-1);
    setContract({
      ...initialContract,
      text: objectiveText[lang === 'ar' ? 1 : 0],
    });
    setAnalysis(null);
    setContractMade(false);
    setAuthority('');
    setProposed('Plant Manager');
    setResults([]);
    setAudit(initialAudit);
    setPack(null);
    setDemo(null);
    setDrawer(null);
    setExportAsset(null);
    setFilter({
      agent: 'all',
      risk: 'all',
      policy: 'all',
      human: 'all',
      blocked: 'all',
      date: '',
    });
    setAssumptions({
      hourly: 15000,
      incidents: 18,
      teamHours: 1200,
      delay: 1,
      implementation: 750000,
    });
    go(0);
    toast.success(
      t('Demo reset to its starting state', 'أُعيد العرض إلى حالته الأولية'),
    );
  }
  const actionsRef = useRef({ runTests, go });
  useEffect(() => {
    actionsRef.current = { runTests, go };
  });
  useEffect(() => {
    const ctx = (
      document as unknown as {
        modelContext?: {
          registerTool: (tool: unknown, options: unknown) => Promise<void>;
        };
      }
    ).modelContext;
    if (!ctx) return;
    const controller = new AbortController();
    Promise.resolve(
      ctx.registerTool(
        {
          name: 'run_exception_tests',
          description:
            'Run all five local TASHKEEL exception tests and show the exception lab. No external actions.',
          inputSchema: {
            type: 'object',
            properties: {},
            additionalProperties: false,
          },
          annotations: { readOnlyHint: false, untrustedContentHint: false },
          execute: async (input: unknown) => {
            if (
              !input ||
              typeof input !== 'object' ||
              Object.keys(input).length
            )
              throw Error('Expected an empty object');
            if (lock.current) throw Error('A simulation is already running');
            actionsRef.current.go(8);
            await actionsRef.current.runTests([1, 2, 3, 4, 5]);
            return { completed: true, count: 5 };
          },
        },
        { signal: controller.signal },
      ),
    ).catch(() => {});
    return () => controller.abort();
  }, []);
  const source =
    drawer?.type === 'source' ? sources.find((x) => x.id === drawer.id) : null;
  const agent =
    drawer?.type === 'agent' ? agents.find((x) => x.id === drawer.id) : null;
  function exportPack(kind: 'executive' | 'technical' | 'governance' | 'json') {
    if (!pack) return;
    try {
      if (kind === 'json')
        prepareDownload(
          'TASHKEEL-agent-specification.json',
          JSON.stringify(pack, null, 2),
          'application/json',
        );
      else {
        const indices =
          kind === 'executive'
            ? [0, 1, 2, 3, 12, 14, 15]
            : kind === 'technical'
              ? [1, 4, 5, 6, 7, 10, 11, 14]
              : [1, 8, 9, 10, 11, 12, 13];
        const body = indices
          .map(
            (i) =>
              `## ${pack.sections[i].title}\n\n${formatDocument(pack.sections[i].content)}`,
          )
          .join('\n\n');
        prepareDownload(
          `TASHKEEL-${kind}-${lang}.md`,
          `# TASHKEEL — ${kind}\n\n${s(disclaimer)}\n\n${t('Fictional Namaa Industrial Group. Draft deployment specification; production approval is not granted.', 'مجموعة نماء الصناعية الافتراضية. مواصفات نشر أولية؛ لا تمنح موافقة إنتاجية.')}\n\n${body}`,
        );
      }
      record(
        'outcome',
        bi(`Export: ${kind}`, `تصدير: ${kind}`),
        bi(
          'Local deployment document prepared for export.',
          'تجهيز مستند النشر للتصدير محلياً.',
        ),
        'EXPORT',
      );
      toast.success(t('Export ready to download', 'التصدير جاهز للتنزيل'));
    } catch {
      toast.error(
        t(
          'Export could not be created. Try again.',
          'تعذر إنشاء التصدير. أعد المحاولة.',
        ),
      );
    }
  }
  const renderDashboard = () => (
    <>
      <section className="hero">
        <div>
          <span className="badge">
            {t(
              'OUTCOME CONTRACT · NAMAA INDUSTRIAL GROUP',
              'عقد النتائج · مجموعة نماء الصناعية',
            )}
          </span>
          <h2>
            {t('One business outcome.', 'نتيجة أعمال واحدة.')}
            <br />
            <em>
              {t(
                'An entire enterprise, aligned.',
                'ومؤسسة كاملة تعمل لتحقيقها.',
              )}
            </em>
          </h2>
          <p>{contract.text}</p>
          <button
            className="primary"
            disabled={!!busy}
            onClick={analyzeEnterprise}
          >
            {busy === 'discovery' ? (
              <LoaderCircle className="spin" size={16} />
            ) : null}
            {t('Analyze Enterprise Reality', 'تحليل واقع المؤسسة')}
            <ArrowRight size={16} />
          </button>
        </div>
        <div className="herofigure">
          <span>{t('PROCUREMENT CYCLE', 'دورة المشتريات')}</span>
          <div>
            {contract.baseline}
            <ArrowRight />
            {contract.target}
            <small>{t('DAYS', 'أيام')}</small>
          </div>
          <p>
            ↓{' '}
            {contract.baseline > 0
              ? Math.round((1 - contract.target / contract.baseline) * 100)
              : 0}
            % {t('target reduction', 'خفض مستهدف')}
          </p>
          <small>
            {t(
              'Governed by design. Measured by outcomes.',
              'محكوم بالضوابط. مقاس بالنتائج.',
            )}
          </small>
        </div>
      </section>
      <div className="stats">
        {[
          [
            `${contract.baseline} ${t('days', 'أيام')}`,
            t('Current cycle time', 'مدة الدورة الحالية'),
          ],
          ['SAR 6.48M', t('Annual downtime exposure', 'التعرض السنوي للتوقف')],
          ['11', t('Human touchpoints', 'التدخلات البشرية')],
          ['81%', t('Deployment readiness', 'جاهزية النشر')],
        ].map(([v, l]) => (
          <section className="card" key={l}>
            <p>
              {l}
              <ArrowUpRight size={15} />
            </p>
            <h2>{v}</h2>
            <small>
              {t('Simulated prototype estimate', 'تقدير محاكاة للنموذج الأولي')}
            </small>
          </section>
        ))}
      </div>
      <section className="card">
        <p className="eyebrow">
          {t('THE COMPILATION PIPELINE', 'مسار تشكيل المنظومة')}
        </p>
        <h3>
          {t(
            'Enterprise reality → deployable intelligence',
            'واقع المؤسسة ← ذكاء قابل للنشر',
          )}
        </h3>
        <div className="pipeline">
          {[
            bi('Objective', 'الهدف'),
            bi('Process', 'العملية'),
            bi('Policies', 'السياسات'),
            bi('Data', 'البيانات'),
            bi('Agents', 'الوكلاء'),
            bi('Testing', 'الاختبار'),
            bi('Deployment', 'النشر'),
          ].map((x, i) => (
            <div
              className={busy === 'discovery' && progress === i ? 'pulse' : ''}
              key={i}
            >
              <span>
                {progress >= i && busy === 'discovery' ? (
                  <Check size={14} />
                ) : (
                  i + 1
                )}
              </span>
              {s(x)}
            </div>
          ))}
        </div>
      </section>
      <div className="twocol">
        <section className="card">
          <h3>
            <Activity size={18} />
            {t('Enterprise readiness', 'جاهزية المؤسسة')}
          </h3>
          <Meter label={t('Data readiness', 'جاهزية البيانات')} value={72} />
          <Meter label={t('Policy readiness', 'جاهزية السياسات')} value={86} />
          <Meter
            label={t('Automation potential', 'إمكانات الأتمتة')}
            value={62}
          />
          <small className="spaced">
            {t(
              'Readiness is a scenario score, not a release authorization.',
              'الجاهزية درجة للسيناريو ولا تمثل تصريحاً بالإطلاق.',
            )}
          </small>
        </section>
        <section className="card">
          <div className="row">
            <h3>
              <ShieldCheck size={18} />
              {t('Decisions that need you', 'قرارات تحتاج تدخلك')}
            </h3>
            <Tag tone="amber">
              {authority ? 5 : 6} {t('open', 'مفتوحة')}
            </Tag>
          </div>
          <button className="finding findingbutton" onClick={() => go(5)}>
            <div>
              <span className="amber">
                {t('AUTHORITY GAP', 'فجوة الصلاحيات')}
              </span>
              <h4>
                {authority
                  ? t('Emergency owner confirmed', 'تم تأكيد مسؤول الطوارئ')
                  : t(
                      'Who can declare an emergency?',
                      'من يملك صلاحية إعلان الطوارئ؟',
                    )}
              </h4>
              <p>
                {t(
                  'Maintenance procedure and approval matrix are not aligned.',
                  'إجراء الصيانة ومصفوفة الاعتماد غير متوافقين.',
                )}
              </p>
            </div>
            <ChevronRight size={18} />
          </button>
          <button className="finding findingbutton" onClick={() => go(4)}>
            <div>
              <span className="amber">
                {t('DATA QUALITY', 'جودة البيانات')}
              </span>
              <h4>
                {t(
                  '18% of parts lack asset criticality codes',
                  '18% من القطع تفتقر إلى رموز أهمية الأصل',
                )}
              </h4>
            </div>
            <ChevronRight size={18} />
          </button>
        </section>
      </div>
    </>
  );
  const renderObjective = () => (
    <div className="twocol">
      <section className="card">
        <p className="eyebrow">
          {t('01 / DEFINE SUCCESS', '01 / تحديد النجاح')}
        </p>
        <h3>
          {t(
            'What should the enterprise achieve?',
            'ما النتيجة التي ينبغي أن تحققها المؤسسة؟',
          )}
        </h3>
        <label className="field">
          {t(
            'Business objective · Arabic or English',
            'هدف الأعمال · العربية أو الإنجليزية',
          )}
          <Textarea
            dir="auto"
            value={contract.text}
            onChange={(e) => changeContract({ text: e.target.value })}
            rows={5}
          />
        </label>
        <div className="fields">
          {(
            [
              {
                key: 'baseline',
                label: bi('Baseline (days)', 'خط الأساس (أيام)'),
                type: 'number',
              },
              {
                key: 'target',
                label: bi('Target (days)', 'المستهدف (أيام)'),
                type: 'number',
              },
              {
                key: 'owner',
                label: bi('Business owner', 'مسؤول الأعمال'),
                type: 'text',
              },
              {
                key: 'horizon',
                label: bi('Time horizon', 'الأفق الزمني'),
                type: 'text',
              },
              {
                key: 'financial',
                label: bi('Financial impact', 'الأثر المالي'),
                type: 'text',
              },
            ] as const
          ).map((f) => (
            <label className="field" key={f.key}>
              {s(f.label)}
              <Input
                type={f.type}
                min={f.type === 'number' ? 0.1 : undefined}
                value={contract[f.key]}
                placeholder={t('Not yet defined', 'لم يُحدّد بعد')}
                onChange={(e) =>
                  changeContract({
                    [f.key]:
                      f.type === 'number'
                        ? Number(e.target.value)
                        : e.target.value,
                  })
                }
              />
            </label>
          ))}
        </div>
        <button
          onClick={() => {
            changeContract({
              owner: t(
                'COO — Namaa Industrial Group',
                'الرئيس التنفيذي للعمليات — مجموعة نماء الصناعية',
              ),
              horizon: t('90-day pilot', 'تجربة لمدة 90 يوماً'),
              financial: t(
                'SAR 6.48M annual downtime exposure (scenario)',
                'تعرض سنوي للتوقف بقيمة 6.48 مليون ريال (سيناريو)',
              ),
            });
            toast.success(
              t(
                'Fictional owner and planning assumptions added',
                'أُضيف المسؤول الافتراضي وافتراضات التخطيط',
              ),
            );
          }}
        >
          {t('Use demo planning assumptions', 'استخدام افتراضات العرض')}
        </button>
        <button className="primary" onClick={checkObjective} disabled={!!busy}>
          {t('Analyze & Create Outcome Contract', 'تحليل وإنشاء عقد النتائج')}
          <ArrowRight size={15} />
        </button>
      </section>
      <section className="card">
        <h3>
          {contractMade
            ? t(
                'Outcome Contract · ready for review',
                'عقد النتائج · جاهز للمراجعة',
              )
            : t('Objective completeness', 'اكتمال الهدف')}
        </h3>
        {(analysis ?? analyze(contract)).checks.map((x, i) => (
          <div className="checkrow" key={i}>
            {x.present ? (
              <CheckCircle2 size={16} className="mint" />
            ) : (
              <AlertTriangle size={16} className="amber" />
            )}
            <span>{s(x.label)}</span>
            <Tag tone={x.present ? 'green' : 'amber'}>
              {x.present
                ? t('Defined', 'محدد')
                : t('Missing / review', 'ناقص / للمراجعة')}
            </Tag>
          </div>
        ))}
        {contractMade && (
          <DetailFields
            rows={[
              [
                t('Success KPI', 'مؤشر النجاح'),
                t(
                  'Median request-to-receipt time ≤ target days',
                  'وسيط مدة الطلب حتى الاستلام لا يتجاوز المستهدف',
                ),
              ],
              [
                t('Data sources', 'مصادر البيانات'),
                'ERP · Maintenance · Inventory',
              ],
              [t('Agent autonomy', 'استقلالية الوكيل'), `L${contract.autonomy}`],
              [
                t('Human approvals', 'الموافقات البشرية'),
                t(
                  'Emergency declaration, supplier onboarding and material spending',
                  'إعلان الطوارئ وتأهيل المورد والإنفاق الجوهري',
                ),
              ],
              [
                t('Stop conditions', 'شروط الإيقاف'),
                t(
                  'No budget, no approval, unknown authority, or restricted data egress',
                  'غياب الميزانية أو الموافقة أو وضوح الصلاحية أو خروج بيانات مقيدة',
                ),
              ],
              [
                t('Measurement method', 'طريقة القياس'),
                t(
                  'Weekly median and P90 from ERP request and signed receipt timestamps.',
                  'الوسيط والمئين 90 أسبوعياً من وقت الطلب والاستلام المعتمد.',
                ),
              ],
            ]}
          />
        )}
      </section>
    </div>
  );
  const renderDiscovery = () => (
    <>
      <div className="sectionintro">
        <div>
          <Tag>{t('8 SOURCES PRELOADED', '8 مصادر محملة مسبقاً')}</Tag>
          <p>
            {t(
              'A working picture of the enterprise, assembled from the knowledge it already has.',
              'صورة عملية للمؤسسة مبنية على المعرفة المتاحة لديها.',
            )}
          </p>
        </div>
        <button disabled={!!busy} onClick={analyzeEnterprise}>
          <RotateCcw size={14} />
          {t('Re-analyze sources', 'إعادة تحليل المصادر')}
        </button>
      </div>
      <div className="sourcegrid">
        {sources.map((x) => (
          <button
            key={x.id}
            className="sourcecard"
            onClick={() => setDrawer({ type: 'source', id: x.id })}
          >
            <div className="row">
              <FileText size={21} />
              <Tag
                tone={
                  ['Incomplete', 'Conflicting', 'Missing owner'].includes(
                    x.status[0],
                  )
                    ? 'amber'
                    : 'green'
                }
              >
                {s(x.status)}
              </Tag>
            </div>
            <h3>{s(x.name)}</h3>
            <small>
              {x.id} · {x.type} {t('pages / records', 'صفحة / سجل')}
            </small>
            <div className="sourcebottom">
              <span>{s(x.owner)}</span>
              <ArrowUpRight size={15} />
            </div>
          </button>
        ))}
      </div>
      <section className="card">
        <h3>{t('Connected system landscape', 'خريطة الأنظمة المتصلة')}</h3>
        <small>
          {t(
            'Simulated connectors only. No external systems are contacted.',
            'روابط محاكاة فقط. لا يتم الاتصال بأي أنظمة خارجية.',
          )}
        </small>
        <div className="systemgrid">
          {systems.map((x, i) => (
            <div key={i}>
              <Database size={17} />
              <span>{s(x)}</span>
              <Tag tone={i > 4 ? 'amber' : 'green'}>
                {i > 4 ? t('Incomplete', 'غير مكتمل') : t('Ready', 'جاهز')}
              </Tag>
            </div>
          ))}
        </div>
      </section>
      <section className="card">
        <h3>{t('What the evidence reveals', 'ما تكشفه الأدلة')}</h3>
        {findings.map((x, i) => (
          <div className="checkrow" key={i}>
            <span className="number">{String(i + 1).padStart(2, '0')}</span>
            <span>{s(x)}</span>
            <Tag tone="amber">{t('Review', 'مراجعة')}</Tag>
          </div>
        ))}
      </section>
    </>
  );
  const process = (future = false) => (
    <>
      <div className="stats">
        {(future
          ? [
              [t('Human touchpoints', 'التدخلات البشرية'), '11 → 3'],
              [t('Waiting points', 'نقاط الانتظار'), '7 → 2'],
              [t('Cycle time', 'مدة الدورة'), '9 → 2.7'],
              [
                t('Policy validation', 'التحقق من السياسات'),
                t('Automated', 'آلي'),
              ],
            ]
          : [
              [t('Human touchpoints', 'التدخلات البشرية'), '11'],
              [t('Waiting points', 'نقاط الانتظار'), '7'],
              [t('Disconnected systems', 'الأنظمة المنفصلة'), '4'],
              [t('Repeated data entries', 'تكرار إدخال البيانات'), '3'],
            ]
        ).map(([k, v]) => (
          <div className="card" key={k}>
            <p>{k}</p>
            <h2>{v}</h2>
          </div>
        ))}
      </div>
      <section className="card">
        <div className="row">
          <h3>
            {future
              ? t(
                  'Agent-native target operating model',
                  'نموذج التشغيل المستهدف المعتمد على الوكلاء',
                )
              : t('As-Is Process Map', 'خريطة العملية الحالية')}
          </h3>
          <Tag tone="amber">
            {future
              ? t('Human judgment retained', 'القرار البشري محفوظ')
              : t('2 unclear decision rights', 'صلاحيتا قرار غير واضحتين')}
          </Tag>
        </div>
        <Flow mode={future ? 'tobe' : 'asis'} lang={lang} />
        <small>
          {t(
            'Use the graph controls to zoom. Amber nodes mark human gates or manual delays.',
            'استخدم أدوات الرسم للتكبير. تشير العقد الكهرمانية إلى بوابات بشرية أو تأخيرات يدوية.',
          )}
        </small>
      </section>
      <section className="card">
        <GridTable
          heads={[
            t('Stage', 'المرحلة'),
            t('Control / bottleneck', 'الضابط / الاختناق'),
            t('Owner', 'المسؤول'),
          ]}
          rows={(future ? toBe : asIs).map((x, i) => [
            `${i + 1}. ${s(x)}`,
            future
              ? [
                  t(
                    'Classification and missing-data escalation',
                    'التصنيف وتصعيد البيانات المفقودة',
                  ),
                  t(
                    'Search before external procurement',
                    'البحث قبل الشراء الخارجي',
                  ),
                  t('Approved supplier gate', 'بوابة اعتماد المورد'),
                  t('No budget → stop', 'لا ميزانية ← إيقاف'),
                  t(
                    'Versioned policy validation',
                    'التحقق من السياسة المعتمدة',
                  ),
                  t(
                    'Material and exceptional decisions only',
                    'القرارات الجوهرية والاستثنائية فقط',
                  ),
                  t(
                    'Idempotent PO creation after all approvals',
                    'إنشاء أمر غير مكرر بعد جميع الموافقات',
                  ),
                  t(
                    'Single accountable outcome contract',
                    'عقد نتائج بمسؤول واحد',
                  ),
                ][i]
              : [
                  t(
                    'Failure risk · missing criticality',
                    'خطر العطل · غياب تصنيف الأهمية',
                  ),
                  t(
                    'Manual handoff · wait 0.5d',
                    'تسليم يدوي · انتظار 0.5 يوم',
                  ),
                  t(
                    'No end-to-end owner · wait 1d',
                    'لا مسؤول عن الدورة · انتظار يوم',
                  ),
                  t(
                    'Duplicate entry · wait 0.5d',
                    'إدخال مكرر · انتظار 0.5 يوم',
                  ),
                  t('Supplier wait · 2d', 'انتظار المورد · يومان'),
                  t('Policy check · wait 1d', 'تحقق السياسة · انتظار يوم'),
                  t(
                    'Unclear authority · wait 1.5d',
                    'صلاحية غير واضحة · انتظار 1.5 يوم',
                  ),
                  t('Duplicate entry · 0.5d', 'إدخال مكرر · 0.5 يوم'),
                  t('Delivery wait · 1.5d', 'انتظار التسليم · 1.5 يوم'),
                  t('Manual receipt · 0.5d', 'استلام يدوي · 0.5 يوم'),
                ][i],
            future
              ? s(agents[[0, 1, 2, 4, 5, 6, 2, 7][i]].name)
              : t(
                  [
                    'Maintenance',
                    'Technician',
                    'Maintenance',
                    'Procurement',
                    'Procurement',
                    'Finance',
                    'Governance',
                    'Procurement',
                    'Supplier',
                    'Maintenance',
                  ][i],
                  [
                    'الصيانة',
                    'الفني',
                    'الصيانة',
                    'المشتريات',
                    'المشتريات',
                    'المالية',
                    'الحوكمة',
                    'المشتريات',
                    'المورد',
                    'الصيانة',
                  ][i],
                ),
          ])}
        />
      </section>
      <p className="notice">{s(disclaimer)}</p>
    </>
  );
  const renderData = () => (
    <>
      <div className="twocol">
        <section className="card">
          <p className="eyebrow">{t('DATA READINESS', 'جاهزية البيانات')}</p>
          <h2>
            72<span className="unit">/100</span>
          </h2>
          <p>
            {t(
              'An equal-weight composite of eight source scores, rounded to the nearest percent.',
              'مؤشر مركب بأوزان متساوية للمصادر الثمانية، مقرب لأقرب نسبة مئوية.',
            )}
          </p>
          <Meter
            label={t('Composite readiness', 'الجاهزية المركبة')}
            value={72}
          />
        </section>
        <section className="card">
          <h3>{t('Remediation priorities', 'أولويات المعالجة')}</h3>
          <p>
            {t(
              'Classify missing critical assets, assign emergency authority, and govern the supplier lead-time feed before a supervised pilot.',
              'تصنيف الأصول الحرجة المفقودة وتحديد صلاحية الطوارئ وحوكمة بيانات مدد التوريد قبل التجربة المشرفة.',
            )}
          </p>
          <div className="chips">
            {[
              bi('Public', 'عام'),
              bi('Internal', 'داخلي'),
              bi('Confidential', 'سري'),
              bi('Restricted', 'مقيد'),
            ].map((x) => (
              <Tag key={x[0]} tone={x[0] === 'Restricted' ? 'red' : 'green'}>
                {s(x)}
              </Tag>
            ))}
          </div>
          <small>
            {t(
              'No public source in this dataset. Restricted financial records route internally.',
              'لا يوجد مصدر عام في هذه البيانات. تعالج السجلات المالية المقيدة داخلياً.',
            )}
          </small>
        </section>
      </div>
      <section className="card">
        <GridTable
          heads={[
            t('Source', 'المصدر'),
            ...[
              'Availability',
              'Completeness',
              'Accuracy',
              'Ownership',
              'Freshness',
              'Integration',
            ].map((x, i) =>
              t(
                x,
                ['التوفر', 'الاكتمال', 'الدقة', 'الملكية', 'الحداثة', 'الربط'][
                  i
                ],
              ),
            ),
            t('Sensitivity', 'الحساسية'),
          ]}
          rows={sources.map((x) => [
            <button
              key="source"
              className="textbutton"
              onClick={() => setDrawer({ type: 'source', id: x.id })}
            >
              {s(x.name)}
            </button>,
            ...x.scores.map((v, i) => (
              <span key={i} className={v < 70 ? 'amber' : 'mint'}>
                {v}%
              </span>
            )),
            s(x.sensitivity),
          ])}
        />
      </section>
      <section className="card">
        <h3>
          {t(
            'Data lineage · source to agent',
            'تتبع البيانات · من المصدر إلى الوكيل',
          )}
        </h3>
        <Flow
          mode="lineage"
          lang={lang}
          onAgent={(id) =>
            agents.some((a) => a.id === id)
              ? setDrawer({ type: 'agent', id })
              : setDrawer({ type: 'source', id })
          }
        />
      </section>
      <section className="card">
        <GridTable
          heads={[
            t('Source', 'المصدر'),
            t('Remediation action', 'إجراء المعالجة'),
            t('Accountable owner', 'المسؤول'),
          ]}
          rows={sources.map((x) => [s(x.name), s(x.remediation), s(x.owner)])}
        />
      </section>
    </>
  );
  const renderPolicy = () => (
    <>
      <section className={'card authority ' + (authority ? 'resolved' : '')}>
        <div className="row">
          <h3>
            <AlertTriangle size={18} />
            {t(
              'An ambiguity that requires human judgment',
              'غموض يتطلب قراراً بشرياً',
            )}
          </h3>
          <Tag tone={authority ? 'green' : 'amber'}>
            {authority
              ? t('Confirmed in demo', 'مؤكد في العرض')
              : t('Unresolved', 'غير محسوم')}
          </Tag>
        </div>
        <p>
          {t(
            'The Emergency Maintenance Procedure permits urgent procurement, but does not identify who is authorized to declare an emergency.',
            'يسمح إجراء الصيانة الطارئة بالشراء العاجل، لكنه لا يحدد الشخص المخوّل بإعلان حالة الطوارئ.',
          )}
        </p>
        <small>DOC-03 §2.1 ↔ DOC-02 §3</small>
        <div className="actionrow">
          <Pick
            label={t('Emergency declaration authority', 'صلاحية إعلان الطوارئ')}
            value={proposed}
            options={['Plant Manager', 'Head of Maintenance', 'COO'].map(
              (x, i) => ({
                value: x,
                label: t(
                  x + (i === 0 ? ' · Recommended' : ''),
                  [
                    'مدير المصنع · موصى به',
                    'رئيس الصيانة',
                    'الرئيس التنفيذي للعمليات',
                  ][i],
                ),
              }),
            )}
            onChange={setProposed}
          />
          <button
            className="primary"
            disabled={authority === proposed || !!busy}
            onClick={() => {
              setPack(null);
              setAuthority(proposed);
              setResults([]);
              record(
                'policy',
                bi('Human governance confirmation', 'تأكيد حوكمة بشري'),
                bi(
                  `Emergency authority assigned to ${proposed}; this is not an emergency declaration.`,
                  `إسناد صلاحية الطوارئ إلى ${proposed}؛ لا يعد ذلك إعلان طوارئ.`,
                ),
                'POL-04',
                t('Demo presenter', 'مقدم العرض'),
              );
              toast.success(
                t(
                  'Authority confirmed; exception tests must be rerun',
                  'تأكدت الصلاحية؛ يلزم إعادة اختبارات الاستثناءات',
                ),
              );
            }}
          >
            <UserCheck size={15} />
            {t('Confirm Authority as Human', 'تأكيد الصلاحية بصفتي البشرية')}
          </button>
        </div>
        {authority && (
          <p className="mint">
            {t(
              `Confirmed role: ${authority}. Every emergency still requires a separate human declaration.`,
              `الدور المؤكد: ${t(authority, authority === 'Plant Manager' ? 'مدير المصنع' : authority === 'COO' ? 'الرئيس التنفيذي للعمليات' : 'رئيس الصيانة')}. كل طارئ يتطلب إعلاناً بشرياً مستقلاً.`,
            )}
          </p>
        )}
      </section>
      <div className="rulegrid">
        {policies.map((p) => (
          <section className="card" key={p.id}>
            <div className="row">
              <Tag>{p.id}</Tag>
              <small>{p.source}</small>
            </div>
            <h4>{s(p.rule)}</h4>
            <pre dir="ltr">{p.expression}</pre>
            <small>
              {t(
                'Deterministic enforcement · fictional policy source',
                'تطبيق حتمي · مصدر سياسة افتراضي',
              )}
            </small>
          </section>
        ))}
      </div>
      <p className="notice">
        <Lock size={15} />
        {t(
          'Emergency urgency does not waive quotations, budget checks or CFO authority.',
          'لا يلغي الاستعجال عروض الأسعار أو التحقق من الميزانية أو صلاحية المدير المالي.',
        )}
      </p>
    </>
  );
  const renderAgents = () => (
    <Tabs defaultValue="blueprint">
      <TabsList>
        <TabsTrigger value="blueprint">
          {t('Agent Blueprint', 'مخطط الوكلاء')}
        </TabsTrigger>
        <TabsTrigger value="target">
          {t('Target Operating Model', 'نموذج التشغيل المستهدف')}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="blueprint">
        <section className="card">
          <div className="row">
            <h3>
              {t(
                'Eight specialists. One coordinated outcome.',
                'ثمانية وكلاء متخصصين. نتيجة موحدة.',
              )}
            </h3>
            <Tag>
              {t('LEVEL', 'المستوى')} {contract.autonomy}
            </Tag>
          </div>
          <Flow
            mode="agents"
            lang={lang}
            onAgent={(id) => setDrawer({ type: 'agent', id })}
          />
        </section>
        <div className="sourcegrid">
          {agents.map((a, i) => (
            <button
              key={a.id}
              className="sourcecard agentcard"
              onClick={() => setDrawer({ type: 'agent', id: a.id })}
            >
              <div className="row">
                <span className="agentnumber">
                  A{String(i + 1).padStart(2, '0')}
                </span>
                <ArrowUpRight size={16} />
              </div>
              <h3>{s(a.name)}</h3>
              <p>{s(a.purpose)}</p>
              <div className="sourcebottom">
                <span>
                  {a.tools.length} {t('scoped tools', 'أدوات محددة الصلاحية')}
                </span>
                <Lock size={13} />
              </div>
            </button>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="target">{process(true)}</TabsContent>
    </Tabs>
  );
  const renderRights = () => (
    <>
      <section className="card">
        <div className="row">
          <h3>
            {t('Autonomy is a design decision.', 'الاستقلالية قرار تصميم.')}
          </h3>
          <Tag>LEVEL {contract.autonomy}</Tag>
        </div>
        <p>
          {t(
            'Agents execute routine tasks while humans retain material, exceptional, and high-risk decisions.',
            'ينفذ الوكلاء المهام الاعتيادية، ويحتفظ البشر بالقرارات الجوهرية والاستثنائية وعالية المخاطر.',
          )}
        </p>
        <div className="sliderwrap">
          <Slider
            value={[contract.autonomy]}
            min={0}
            max={5}
            step={1}
            aria-label={t('Autonomy level', 'مستوى الاستقلالية')}
            onValueChange={(v) => {
              changeContract({ autonomy: Array.isArray(v) ? v[0] : v });
              setResults([]);
            }}
          />
          <div className="sliderlabels">
            {[0, 1, 2, 3, 4, 5].map((x) => (
              <span key={x}>L{x}</span>
            ))}
          </div>
        </div>
        <Tag tone="amber">
          {t(
            [
              'Manual execution',
              'Read-only assistance',
              'Recommendations only',
              'Bounded routine execution',
              'Expanded orchestration · same human gates',
              'Maximum local orchestration · same human gates',
            ][contract.autonomy],
            [
              'تنفيذ يدوي',
              'مساعدة للقراءة فقط',
              'توصيات فقط',
              'تنفيذ اعتيادي ضمن حدود',
              'تنسيق موسع · البوابات البشرية محفوظة',
              'أقصى تنسيق محلي · البوابات البشرية محفوظة',
            ][contract.autonomy],
          )}
        </Tag>
        <small className="spaced">
          {t(
            'Levels 4–5 never override mandatory approvals or prohibited actions. Changing level clears stale test results.',
            'لا يتجاوز المستويان 4 و5 الموافقات الإلزامية أو المحظورات. يمسح تغيير المستوى نتائج الاختبار القديمة.',
          )}
        </small>
      </section>
      <section className="card">
        <GridTable
          heads={[
            t('Decision', 'القرار'),
            t('Decision right', 'صلاحية القرار'),
            t('Accountable owner', 'المسؤول'),
          ]}
          rows={decisions.map((d) => [
            s(d.label),
            <Tag
              key="category"
              tone={
                d.category === 3 ? 'red' : d.category === 2 ? 'amber' : 'green'
              }
            >
              {s(
                categories[
                  d.category === 0 && contract.autonomy < 3 ? 1 : d.category
                ],
              )}
            </Tag>,
            s(d.owner),
          ])}
        />
      </section>
    </>
  );
  const renderLab = () => (
    <>
      <div className="sectionintro">
        <div>
          <Tag>
            {results.filter((r) => r.passed).length} / 5{' '}
            {t('TESTS PASSED', 'اختبارات ناجحة')}
          </Tag>
          <p>
            {t(
              'Validate the guardrails before the agent takes its first real action.',
              'تحقق من الضوابط قبل أن ينفذ الوكيل أول إجراء فعلي.',
            )}
          </p>
        </div>
        <button
          className="primary"
          disabled={!!busy}
          onClick={() => runTests([1, 2, 3, 4, 5])}
        >
          {busy === 'tests' ? (
            <LoaderCircle className="spin" size={16} />
          ) : (
            <Play size={16} />
          )}{' '}
          {t('Run All Tests', 'تشغيل جميع الاختبارات')}
        </button>
      </div>
      {scenarios.map((x) => {
        const r = results.find((a) => a.scenario === x.id);
        return (
          <section
            className={
              'card scenario ' +
              (busy === 'tests' && progress === x.id - 1 ? 'running' : '')
            }
            key={x.id}
          >
            <div className="row">
              <div className="scenariohead">
                <span className="number">0{x.id}</span>
                <div>
                  <h3>{s(x.title)}</h3>
                  <p>{s(x.description)}</p>
                </div>
              </div>
              <div className="actionrow">
                {r && <Tag>{t('Passed', 'ناجح')}</Tag>}
                <button disabled={!!busy} onClick={() => runTests([x.id])}>
                  <Play size={13} />
                  {t('Run', 'تشغيل')}
                </button>
              </div>
            </div>
            {r && (
              <>
                <div className="resultbanner">
                  <ShieldCheck size={18} />
                  {s(r.decision)}
                </div>
                <div className="resultgrid">
                  <DetailFields
                    rows={[
                      [
                        t('Decision explanation', 'تفسير القرار'),
                        s(r.explanation),
                      ],
                      [
                        t('Policies applied', 'السياسات المطبقة'),
                        r.policies.join(' · '),
                      ],
                      [
                        t('Systems queried', 'الأنظمة المستعلم عنها'),
                        r.systems
                          .map((x) =>
                            t(x, systems.find((z) => z[0] === x)?.[1] ?? x),
                          )
                          .join(' · '),
                      ],
                    ]}
                  />
                  <DetailFields
                    rows={[
                      [t('Human intervention', 'التدخل البشري'), s(r.human)],
                      [t('Final outcome', 'النتيجة النهائية'), s(r.outcome)],
                      [
                        t('Audit record', 'سجل التدقيق'),
                        <button
                          key="audit"
                          className="textbutton"
                          onClick={() => {
                            setFilter({
                              agent: r.agent,
                              risk: 'all',
                              policy: 'all',
                              human: 'all',
                              blocked: 'all',
                              date: '',
                            });
                            go(11);
                          }}
                        >
                          {t('View recorded decision', 'عرض القرار المسجل')}
                          <ArrowUpRight size={13} />
                        </button>,
                      ],
                    ]}
                  />
                </div>
              </>
            )}
          </section>
        );
      })}
      <p className="notice">
        {t(
          'A passed test verifies the expected control response. A blocked action is often the correct outcome. No real order is created.',
          'يثبت نجاح الاختبار استجابة الضابط المتوقعة. غالباً يكون الحظر النتيجة الصحيحة. لا يتم إنشاء طلب فعلي.',
        )}
      </p>
    </>
  );
  const renderPack = () => (
    <>
      <section className="hero compact">
        <div>
          <span className="badge">
            {t('ENTERPRISE REALITY, COMPILED', 'واقع المؤسسة، منظماً للنشر')}
          </span>
          <h2>{t('Your deployment starts here.', 'يبدأ النشر من هنا.')}</h2>
          <p>
            {t(
              'A traceable implementation brief for engineering, business owners and governance.',
              'مرجع تنفيذ قابل للتتبع للهندسة ومسؤولي الأعمال والحوكمة.',
            )}
          </p>
          <button
            className="primary"
            disabled={!!busy}
            onClick={() => {
              setPack(generatePack(contract, authority, results, lang));
              record(
                'outcome',
                bi('Deployment Pack generated', 'توليد حزمة النشر'),
                bi(
                  '16 structured sections prepared; production authorization remains separate.',
                  'إعداد 16 قسماً منظماً؛ تفويض الإنتاج مستقل.',
                ),
                'PACK',
              );
              toast.success(
                t(
                  'Agent Deployment Pack generated',
                  'تم توليد حزمة نشر الوكلاء',
                ),
              );
            }}
          >
            <Package size={16} />
            {t('Generate Agent Deployment Pack', 'توليد حزمة نشر الوكلاء')}
          </button>
        </div>
        <div className="packfigure">
          16<small>{t('CONNECTED SECTIONS', 'قسماً مترابطاً')}</small>
        </div>
      </section>
      <div className="notice">
        <AlertTriangle size={16} />
        {t(
          'Draft for implementation review. Readiness 81% is simulated; open data risks and real integration validation still block production release.',
          'مسودة لمراجعة التنفيذ. جاهزية 81% محاكاة؛ مخاطر البيانات المفتوحة والتحقق الفعلي من الربط تمنع الإطلاق الإنتاجي.',
        )}
      </div>
      <section className="card">
        <div className="gategrid">
          {[
            [analyze(contract).valid, t('Outcome defined', 'النتيجة محددة')],
            [
              !!authority,
              t('Emergency authority confirmed', 'صلاحية الطوارئ مؤكدة'),
            ],
            [
              results.length === 5,
              t('Five exception tests run', 'تشغيل الاختبارات الخمسة'),
            ],
          ].map(([ok, label], i) => (
            <div key={i}>
              {ok ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}{' '}
              {label}
            </div>
          ))}
        </div>
      </section>
      {pack ? (
        <>
          <div className="exportgrid">
            {(['executive', 'technical', 'governance', 'json'] as const).map(
              (x, i) => (
                <button key={x} onClick={() => exportPack(x)}>
                  <Download size={17} />
                  {t(
                    [
                      'Executive Summary',
                      'Technical Specification',
                      'Governance Pack',
                      'JSON Agent Specification',
                    ][i],
                    [
                      'الملخص التنفيذي',
                      'المواصفات التقنية',
                      'حزمة الحوكمة',
                      'مواصفات الوكلاء JSON',
                    ][i],
                  )}
                  <small>{x === 'json' ? '.JSON' : '.MD'}</small>
                </button>
              ),
            )}
          </div>
          <section className="card">
            {pack.sections.map((x, i) => (
              <details className="packsection" key={i}>
                <summary>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  {x.title}
                  <Check size={14} />
                </summary>
                <pre dir="auto">{JSON.stringify(x.content, null, 2)}</pre>
              </details>
            ))}
          </section>
        </>
      ) : (
        <section className="card">
          <div className="packlist">
            {packTitles.map((x, i) => (
              <div key={i}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                {s(x)}
              </div>
            ))}
          </div>
          <small>
            {t(
              'Generate the pack to inspect and download the current specification.',
              'ولّد الحزمة لمعاينة المواصفات الحالية وتنزيلها.',
            )}
          </small>
        </section>
      )}
    </>
  );
  const renderOutcome = () => (
    <>
      <div className="notice">{s(disclaimer)}</div>
      <div className="twocol">
        <section className="card">
          <h3>{t('A smaller operating footprint', 'تدخلات تشغيلية أقل')}</h3>
          <div style={{ height: 270 }} dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  {
                    name: t('Cycle days', 'أيام الدورة'),
                    before: 9,
                    after: 2.7,
                  },
                  { name: t('Touchpoints', 'التدخلات'), before: 11, after: 3 },
                  { name: t('Waiting points', 'الانتظار'), before: 7, after: 2 },
                ]}
              >
                <CartesianGrid vertical={false} stroke="#263541" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: '#9cacbc', fontSize: 11 }}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fill: '#8a9baa', fontSize: 10 }}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: '#17212c',
                    border: '1px solid #3a4b58',
                  }}
                />
                <Bar
                  name={t('Before', 'قبل')}
                  dataKey="before"
                  fill="#425665"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  name={t('Simulated after', 'بعد المحاكاة')}
                  dataKey="after"
                  fill="#a2d5bf"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="chips">
            <Tag>{t('Mint: simulated future', 'الأخضر: المستقبل المحاكى')}</Tag>
            <Tag tone="neutral">
              {t('Slate: current baseline', 'الرمادي: خط الأساس الحالي')}
            </Tag>
          </div>
        </section>
        <section className="card">
          <h3>
            {t('Decisions, deliberately distributed', 'توزيع مدروس للقرارات')}
          </h3>
          <div className="donut">
            <div style={{ height: 200, width: 220 }} dir="ltr">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={[
                      { value: 62, fill: '#a2d5bf' },
                      { value: 18, fill: '#c9ad86' },
                      { value: 20, fill: '#526a83' },
                    ]}
                    innerRadius={62}
                    outerRadius={86}
                    dataKey="value"
                    stroke="#121a24"
                    strokeWidth={5}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div>
              {[
                [62, t('Autonomous routine', 'قرارات اعتيادية مستقلة')],
                [18, t('Human judgment', 'قرار بشري')],
                [20, t('Policy-blocked', 'محظورة بالسياسة')],
              ].map(([v, n]) => (
                <p key={n}>
                  <b>{v}%</b> {n}
                </p>
              ))}
            </div>
          </div>
          <Meter
            label={t('Policy test coverage', 'تغطية اختبارات السياسات')}
            value={94}
          />
          <small>
            {t(
              '94% is a modeled full-suite estimate, separate from the five demo cases.',
              '94% تقدير للحزمة الكاملة، مستقل عن حالات العرض الخمس.',
            )}
          </small>
        </section>
      </div>
      <div className="stats">
        {[
          [t('Simulated cycle', 'الدورة المحاكاة'), '2.7 ' + t('days', 'يوم')],
          [t('Data readiness', 'جاهزية البيانات'), '72%'],
          [t('Deployment readiness', 'جاهزية النشر'), '81%'],
          [t('Demo tests', 'اختبارات العرض'), `${results.length}/5`],
        ].map(([n, v]) => (
          <section className="card" key={n}>
            <p>{n}</p>
            <h2>{v}</h2>
          </section>
        ))}
      </div>
      <section className="card">
        <h3>
          {t(
            'What could this outcome be worth?',
            'ما القيمة المحتملة لهذه النتيجة؟',
          )}
        </h3>
        <p>
          {t(
            'Edit the assumptions. Value updates instantly. All currency amounts are SAR.',
            'عدّل الافتراضات لتتحدث القيمة فوراً. جميع المبالغ بالريال السعودي.',
          )}
        </p>
        <div className="calcgrid">
          {(
            [
              {
                key: 'hourly',
                label: bi(
                  'Hourly production downtime cost',
                  'تكلفة توقف الإنتاج بالساعة',
                ),
              },
              {
                key: 'incidents',
                label: bi('Annual critical incidents', 'الحوادث الحرجة سنوياً'),
              },
              {
                key: 'teamHours',
                label: bi(
                  'Annual procurement team hours',
                  'ساعات فريق المشتريات سنوياً',
                ),
              },
              {
                key: 'delay',
                label: bi(
                  'Average downtime delay (days)',
                  'متوسط تأخر التوقف (أيام)',
                ),
              },
              {
                key: 'implementation',
                label: bi('Implementation cost', 'تكلفة التنفيذ'),
              },
            ] as const
          ).map((f) => (
            <label className="field" key={f.key}>
              {s(f.label)}
              <Input
                type="number"
                min="0"
                step={f.key === 'delay' ? 0.1 : 1}
                value={assumptions[f.key]}
                onChange={(e) =>
                  setAssumptions((a) => ({
                    ...a,
                    [f.key]: Math.max(
                      0,
                      Math.min(1e10, Number(e.target.value) || 0),
                    ),
                  }))
                }
              />
            </label>
          ))}
        </div>
        <div className="valuegrid">
          {[
            [
              fmt(value.avoided) + ' ' + t('hours', 'ساعة'),
              t(
                'Estimated downtime avoided / year',
                'التوقف المتجنب التقديري سنوياً',
              ),
            ],
            [
              fmt(value.hours) + ' ' + t('hours', 'ساعة'),
              t('Employee hours saved / year', 'ساعات العمل الموفرة سنوياً'),
            ],
            [
              'SAR ' + fmt(value.annual),
              t('Estimated annual value', 'القيمة السنوية التقديرية'),
            ],
            [
              value.payback === null
                ? '—'
                : value.payback.toFixed(1) + ' ' + t('months', 'شهر'),
              t('Simple payback period', 'مدة الاسترداد البسيط'),
            ],
          ].map(([v, l]) => (
            <div key={l}>
              <small>{l}</small>
              <h2>{v}</h2>
            </div>
          ))}
        </div>
        <p className="formula">
          {t(
            'Downtime avoided = incidents × delay × 24 × 70%. Labor saved = team hours × 60%, valued at SAR 150/hour. Annual value = avoided downtime × hourly cost + labor savings. Payback = implementation cost ÷ annual value × 12. No recurring costs or discounting included.',
            'التوقف المتجنب = الحوادث × التأخر × 24 × 70%. ساعات العمل الموفرة = ساعات الفريق × 60%، بسعر 150 ريالاً للساعة. القيمة السنوية = التوقف المتجنب × تكلفة الساعة + وفورات العمل. الاسترداد = تكلفة التنفيذ ÷ القيمة السنوية × 12. لا تشمل التكاليف المتكررة أو الخصم المالي.',
          )}
        </p>
      </section>
    </>
  );
  const filtered = audit.filter(
    (a) =>
      (filter.agent === 'all' || a.agent === filter.agent) &&
      (filter.risk === 'all' || a.risk === filter.risk) &&
      (filter.policy === 'all' || a.policy.includes(filter.policy)) &&
      (filter.human === 'all' ||
        (filter.human === 'yes' ? a.approver !== '—' : a.approver === '—')) &&
      (filter.blocked === 'all' || String(a.blocked) === filter.blocked) &&
      (!filter.date || a.timestamp.slice(0, 10) === filter.date),
  );
  const renderAudit = () => (
    <>
      <section className="card">
        <h3>{t('Every decision has a receipt.', 'لكل قرار أثر موثق.')}</h3>
        <div className="filters">
          <Pick
            label={t('Agent', 'الوكيل')}
            value={filter.agent}
            options={[
              { value: 'all', label: t('All agents', 'جميع الوكلاء') },
              ...agents.map((a) => ({ value: a.id, label: s(a.name) })),
            ]}
            onChange={(v) => setFilter((f) => ({ ...f, agent: v }))}
          />
          <Pick
            label={t('Risk level', 'مستوى المخاطر')}
            value={filter.risk}
            options={['all', 'low', 'medium', 'high'].map((v, i) => ({
              value: v,
              label: t(
                ['All risks', 'Low', 'Medium', 'High'][i],
                ['جميع المخاطر', 'منخفض', 'متوسط', 'مرتفع'][i],
              ),
            }))}
            onChange={(v) => setFilter((f) => ({ ...f, risk: v }))}
          />
          <Pick
            label={t('Policy', 'السياسة')}
            value={filter.policy}
            options={[
              { value: 'all', label: t('All policies', 'جميع السياسات') },
              ...policies.map((p) => ({ value: p.id, label: p.id })),
            ]}
            onChange={(v) => setFilter((f) => ({ ...f, policy: v }))}
          />
          <Pick
            label={t('Human approval', 'الموافقة البشرية')}
            value={filter.human}
            options={['all', 'yes', 'no'].map((v, i) => ({
              value: v,
              label: t(
                ['Any', 'Recorded role', 'No recorded role'][i],
                ['الكل', 'دور مسجل', 'دون دور مسجل'][i],
              ),
            }))}
            onChange={(v) => setFilter((f) => ({ ...f, human: v }))}
          />
          <Pick
            label={t('Blocked action', 'إجراء محظور')}
            value={filter.blocked}
            options={['all', 'true', 'false'].map((v, i) => ({
              value: v,
              label: t(
                ['Any', 'Blocked', 'Not blocked'][i],
                ['الكل', 'محظور', 'غير محظور'][i],
              ),
            }))}
            onChange={(v) => setFilter((f) => ({ ...f, blocked: v }))}
          />
          <label className="field">
            {t('Date (UTC)', 'التاريخ (UTC)')}
            <Input
              type="date"
              value={filter.date}
              onChange={(e) =>
                setFilter((f) => ({ ...f, date: e.target.value }))
              }
            />
          </label>
          <button
            onClick={() =>
              setFilter({
                agent: 'all',
                risk: 'all',
                policy: 'all',
                human: 'all',
                blocked: 'all',
                date: '',
              })
            }
          >
            {t('Clear filters', 'مسح المرشحات')}
          </button>
        </div>
        <small>
          {filtered.length}{' '}
          {t(
            'records · current demo session only',
            'سجلاً · جلسة العرض الحالية فقط',
          )}
        </small>
      </section>
      <section className="card">
        {filtered.length ? (
          <GridTable
            heads={[
              t('Timestamp / agent', 'الوقت / الوكيل'),
              t('Initiating event / data', 'الحدث / البيانات'),
              t('Tool / policy', 'الأداة / السياسة'),
              t('Decision / result', 'القرار / النتيجة'),
              t('Approver / risk', 'المعتمد / المخاطر'),
            ]}
            rows={filtered.map((a) => [
              <>
                <small dir="ltr">
                  {a.timestamp.replace('T', ' ').slice(0, 19)} UTC
                </small>
                <h4>
                  {s(
                    agents.find((x) => x.id === a.agent)?.name ??
                      bi(a.agent, a.agent),
                  )}
                </h4>
                <small>{a.id}</small>
              </>,
              <>
                {s(a.event)}
                <small>{a.data.join(' · ')}</small>
              </>,
              <>
                <code>{a.tool}</code>
                <small>{a.policy}</small>
              </>,
              <>
                {s(a.decision)}
                <small>{s(a.result)}</small>
                {a.blocked && <Tag tone="red">{t('Blocked', 'محظور')}</Tag>}
              </>,
              <>
                {a.approver}
                <small>
                  {t(
                    a.risk,
                    { low: 'منخفض', medium: 'متوسط', high: 'مرتفع' }[a.risk],
                  )}
                </small>
              </>,
            ])}
          />
        ) : (
          <div className="empty">
            <History />
            <h3>
              {t(
                'No records match these filters',
                'لا توجد سجلات تطابق المرشحات',
              )}
            </h3>
            <p>
              {t(
                'Clear a filter or run an exception scenario.',
                'امسح مرشحاً أو شغّل سيناريو استثناء.',
              )}
            </p>
          </div>
        )}
      </section>
    </>
  );
  return (
    <SidebarProvider className="shell dark" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <Sidebar side={lang === 'ar' ? 'right' : 'left'}>
        <SidebarHeader>
          <div className="brand">
            <Layers3 />
            TASHKEEL<span>تشكيل</span>
          </div>
          <div className="workspace">
            N
            <span>
              {t('Namaa Industrial Group', 'مجموعة نماء الصناعية')}
              <small>{t('ENTERPRISE WORKSPACE', 'مساحة المؤسسة')}</small>
            </span>
          </div>
          <p className="eyebrow">{t('WORKSPACE', 'مساحة العمل')}</p>
        </SidebarHeader>
        <SidebarContent>
          <Navigation page={page} go={go} lang={lang} />
        </SidebarContent>
        <SidebarFooter>
          <div className="sidefoot">
            <ShieldCheck size={16} />
            {t('Secure local simulation', 'محاكاة محلية آمنة')}
            <small>
              {t(
                'Fictional enterprise · No live integrations',
                'مؤسسة افتراضية · لا ربط فعلي',
              )}
            </small>
          </div>
        </SidebarFooter>
      </Sidebar>
      <main>
        <header>
          <div className="breadcrumb">
            <SidebarTrigger />
            <span>
              {t('Workspace', 'مساحة العمل')} <b>/ {s(nav[page])}</b>
            </span>
          </div>
          <div className="headeractions">
            <button
              aria-label={t('Switch to Arabic', 'Switch to English')}
              onClick={() => {
                const next = lang === 'en' ? 'ar' : 'en';
                setPack(null);
                setLang(next);
                if (
                  contract.text === objectiveText[0] ||
                  contract.text === objectiveText[1]
                )
                  setContract((c) => ({
                    ...c,
                    text: objectiveText[next === 'ar' ? 1 : 0],
                  }));
              }}
            >
              <Globe size={14} />
              {lang === 'en' ? 'العربية' : 'English'}
            </button>
            <button
              onClick={reset}
              aria-label={t('Reset Demo', 'إعادة ضبط العرض')}
            >
              <RotateCcw size={14} />
              <span className="hide-mobile">
                {t('Reset Demo', 'إعادة ضبط العرض')}
              </span>
            </button>
            <button
              className={demo !== null ? 'demoactive' : ''}
              onClick={() => {
                setDemo(0);
                go(1);
              }}
            >
              <Play size={14} />
              {t('Executive Demo Mode', 'وضع العرض التنفيذي')}
            </button>
          </div>
        </header>
        <div className="content">
          {demo !== null && (
            <div className="demobar">
              <div>
                <span className="eyebrow">
                  {t('FIVE-MINUTE EXECUTIVE DEMO', 'عرض تنفيذي في خمس دقائق')} ·{' '}
                  {demo + 1}/7
                </span>
                <h4>{s(steps[demo].title)}</h4>
                <p>{s(steps[demo].hint)}</p>
              </div>
              <div className="actionrow">
                <button
                  disabled={demo === 0}
                  onClick={() => {
                    const n = demo - 1;
                    setDemo(n);
                    go(steps[n].page);
                  }}
                  aria-label={t('Previous Demo Step', 'الخطوة السابقة')}
                >
                  <ArrowLeft size={14} />
                </button>
                <button
                  className="primary"
                  disabled={!!busy}
                  onClick={() => {
                    if (demo === 6) {
                      setDemo(null);
                      toast.success(
                        t('Executive demo complete', 'اكتمل العرض التنفيذي'),
                      );
                      return;
                    }
                    const n = demo + 1;
                    setDemo(n);
                    go(steps[n].page);
                  }}
                >
                  {demo === 6
                    ? t('Finish Demo', 'إنهاء العرض')
                    : t('Next Demo Step', 'الخطوة التالية')}
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}
          <div className="pagehead">
            <div>
              <p className="eyebrow">
                {t('ENTERPRISE INTELLIGENCE', 'ذكاء المؤسسة')} /{' '}
                {String(page + 1).padStart(2, '0')}
              </p>
              <h1>{s(nav[page])}</h1>
              <p>
                {page === 0
                  ? t(
                      'From enterprise complexity to coordinated intelligence.',
                      'من تعقيد المؤسسة إلى ذكاء منسق.',
                    )
                  : t(
                      'Compile enterprise reality into production-ready AI agents.',
                      'حوّل واقع المؤسسة إلى مواصفات وكلاء ذكاء اصطناعي جاهزة للتنفيذ.',
                    )}
              </p>
            </div>
            <span className="badge">
              ● {t('Prototype environment', 'بيئة نموذج أولي')}
            </span>
          </div>
          {[
            renderDashboard,
            renderObjective,
            renderDiscovery,
            () => process(false),
            renderData,
            renderPolicy,
            renderAgents,
            renderRights,
            renderLab,
            renderPack,
            renderOutcome,
            renderAudit,
          ][page]()}
          <footer>
            {t(
              'TASHKEEL turns enterprise knowledge into deployable agent systems.',
              'تشكيل يحوّل معرفة المؤسسة إلى أنظمة وكلاء قابلة للنشر.',
            )}
            <span>
              {s(disclaimer)}
              <br />
              {t(
                'Independent concept · Not affiliated with HUMAIN',
                'مفهوم مستقل · غير تابع لهيوماين',
              )}
            </span>
          </footer>
        </div>
      </main>
      <Sheet open={!!drawer} onOpenChange={(v) => !v && setDrawer(null)}>
        <SheetContent
          side={lang === 'ar' ? 'left' : 'right'}
          className="detaildrawer"
          dir={lang === 'ar' ? 'rtl' : 'ltr'}
        >
          <SheetHeader>
            <p className="eyebrow">
              {agent
                ? t('AGENT SPECIFICATION', 'مواصفات الوكيل')
                : t('SOURCE EVIDENCE', 'أدلة المصدر')}
            </p>
            <SheetTitle>
              {agent ? s(agent.name) : source ? s(source.name) : ''}
            </SheetTitle>
            <SheetDescription>
              {agent ? s(agent.purpose) : source ? s(source.detail) : ''}
            </SheetDescription>
          </SheetHeader>
          {agent && (
            <DetailFields
              rows={[
                [
                  t('Inputs', 'المدخلات'),
                  agent.inputs
                    .map((id) => s(sources.find((x) => x.id === id)!.name))
                    .join(' · '),
                ],
                [
                  t('Systems accessed', 'الأنظمة المتاحة'),
                  agent.systems.map((i) => s(systems[i])).join(' · '),
                ],
                [t('Tools', 'الأدوات'), agent.tools.join(' · ')],
                [t('Permitted actions', 'الإجراءات المسموحة'), s(agent.allowed)],
                [
                  t('Prohibited actions', 'الإجراءات المحظورة'),
                  s(agent.prohibited),
                ],
                [
                  t('Escalation conditions', 'شروط التصعيد'),
                  s(agent.escalation),
                ],
                [
                  t('Human approval requirements', 'متطلبات الاعتماد البشري'),
                  s(agent.approval),
                ],
                [t('Success metrics', 'مقاييس النجاح'), s(agent.metric)],
                [
                  t('Model-routing policy', 'سياسة توجيه النموذج'),
                  s(agent.route),
                ],
              ]}
            />
          )}
          {source && (
            <>
              <DetailFields
                rows={[
                  [
                    t('Source reference', 'مرجع المصدر'),
                    source.id + ' · ' + source.type,
                  ],
                  [
                    t('Version / freshness', 'الإصدار / الحداثة'),
                    s(source.freshness),
                  ],
                  [t('Accountable owner', 'المسؤول'), s(source.owner)],
                  [t('Classification', 'التصنيف'), s(source.sensitivity)],
                  [t('Finding', 'الملاحظة'), s(source.detail)],
                  [
                    t('Required remediation', 'المعالجة المطلوبة'),
                    s(source.remediation),
                  ],
                  [
                    t('Connected system', 'النظام المتصل'),
                    s(systems[source.system]),
                  ],
                ]}
              />
              <Meter
                label={t('Source readiness', 'جاهزية المصدر')}
                value={source.score}
              />
              <button
                onClick={() =>
                  prepareDownload(
                    source.id + '.txt',
                    `${s(source.name)}\n${source.id}\n${s(source.detail)}\n${s(source.remediation)}\n${t('Fictional source excerpt for demonstration.', 'مقتطف مصدر افتراضي لأغراض العرض.')}`,
                  )
                }
              >
                <Download size={15} />
                {t(
                  'Download fictional source excerpt',
                  'تنزيل مقتطف المصدر الافتراضي',
                )}
              </button>
            </>
          )}
        </SheetContent>
      </Sheet>
      <Sheet
        open={!!exportAsset}
        onOpenChange={(v) => !v && setExportAsset(null)}
      >
        <SheetContent
          className="detaildrawer"
          side={lang === 'ar' ? 'left' : 'right'}
          dir={lang === 'ar' ? 'rtl' : 'ltr'}
        >
          <SheetHeader>
            <SheetTitle>{t('Export ready', 'التصدير جاهز')}</SheetTitle>
            <SheetDescription>{exportAsset?.name}</SheetDescription>
          </SheetHeader>
          {exportAsset && (
            <>
              <div className="actionrow">
                <a
                  className="primary downloadlink"
                  href={`data:${exportAsset.mime};charset=utf-8,${encodeURIComponent(exportAsset.content)}`}
                  download={exportAsset.name}
                >
                  {t('Download file', 'تنزيل الملف')}
                  <Download size={15} />
                </a>
                <button
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(exportAsset.content);
                      toast.success(t('Copied to clipboard', 'تم النسخ'));
                    } catch {
                      toast.error(
                        t(
                          'Select and copy the preview text below',
                          'حدد نص المعاينة أدناه وانسخه',
                        ),
                      );
                    }
                  }}
                >
                  {t('Copy contents', 'نسخ المحتوى')}
                </button>
              </div>
              <Textarea
                aria-label={t('Export preview', 'معاينة التصدير')}
                readOnly
                value={exportAsset.content}
                rows={24}
                dir="auto"
                className="exportpreview"
              />
              <small>
                {t(
                  'If your browser does not save the file, use Copy contents.',
                  'إذا لم يحفظ متصفحك الملف، استخدم نسخ المحتوى.',
                )}
              </small>
            </>
          )}
        </SheetContent>
      </Sheet>
      <Toaster
        theme="dark"
        position={lang === 'ar' ? 'bottom-left' : 'bottom-right'}
        richColors
      />
    </SidebarProvider>
  );
}
