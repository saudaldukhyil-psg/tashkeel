export type Lang = 'en' | 'ar';
export type Copy = readonly [string, string];
export const bi = (en: string, ar: string): Copy => [en, ar];
export const tr = (c: Copy, l: Lang) => c[l === 'ar' ? 1 : 0];
export const objectiveText = bi(
  'Reduce critical spare-parts procurement time from 9 days to 3 days without violating procurement policies or risking factory downtime.',
  'خفض مدة تأمين قطع الغيار الحرجة من 9 أيام إلى 3 أيام، دون مخالفة سياسات المشتريات أو تعريض المصنع للتوقف.',
);
export const disclaimer = bi(
  'Simulated prototype estimates — not actual operational results.',
  'تقديرات محاكاة للنموذج الأولي — وليست نتائج تشغيلية فعلية.',
);
export const nav = [
  bi('Executive Command Center', 'مركز القيادة التنفيذي'),
  bi('Objective Intake', 'تحديد الهدف'),
  bi('Enterprise Discovery', 'استكشاف المؤسسة'),
  bi('Current Process', 'العملية الحالية'),
  bi('Data Readiness', 'جاهزية البيانات'),
  bi('Policy Intelligence', 'تحليل السياسات'),
  bi('Agent Blueprint', 'مخطط الوكلاء'),
  bi('Decision Rights', 'صلاحيات القرار'),
  bi('Exception Lab', 'مختبر الاستثناءات'),
  bi('Deployment Pack', 'حزمة النشر'),
  bi('Outcome Dashboard', 'لوحة النتائج'),
  bi('Audit Trail', 'سجل التدقيق'),
];
export const systems = [
  bi('ERP', 'نظام تخطيط الموارد'),
  bi('Procurement Platform', 'منصة المشتريات'),
  bi('Inventory System', 'نظام المخزون'),
  bi('Maintenance System', 'نظام الصيانة'),
  bi('Finance System', 'النظام المالي'),
  bi('Supplier Database', 'قاعدة الموردين'),
  bi('Excel Files', 'ملفات إكسل'),
  bi('Email', 'البريد الإلكتروني'),
];
export type Source = {
  id: string;
  name: Copy;
  type: string;
  owner: Copy;
  status: Copy;
  score: number;
  scores: number[];
  sensitivity: Copy;
  freshness: Copy;
  detail: Copy;
  remediation: Copy;
  system: number;
};
export const sources: Source[] = [
  {
    id: 'DOC-01',
    name: bi('Procurement Policy', 'سياسة المشتريات'),
    type: 'PDF · 24',
    owner: bi('Head of Procurement', 'رئيس المشتريات'),
    status: bi('Analyzed', 'تم التحليل'),
    score: 94,
    scores: [100, 96, 94, 100, 90, 84],
    sensitivity: bi('Internal', 'داخلي'),
    freshness: bi('2026-08-01 · v3.2', '2026-08-01 · الإصدار 3.2'),
    detail: bi(
      'Three quotations above SAR 1M; verified budget required before purchase-order issuance.',
      'ثلاثة عروض للمشتريات التي تتجاوز مليون ريال؛ يلزم تأكيد الميزانية قبل إصدار أمر الشراء.',
    ),
    remediation: bi(
      'Publish versioned rules to the policy registry.',
      'نشر قواعد ذات إصدارات معتمدة في سجل السياسات.',
    ),
    system: 1,
  },
  {
    id: 'DOC-02',
    name: bi('Delegation of Authority Matrix', 'مصفوفة تفويض الصلاحيات'),
    type: 'XLSX · 42',
    owner: bi('Corporate Governance', 'الحوكمة المؤسسية'),
    status: bi('Conflicting', 'متعارض'),
    score: 76,
    scores: [100, 80, 75, 95, 80, 26],
    sensitivity: bi('Confidential', 'سري'),
    freshness: bi('2026-07-15 · v2.1', '2026-07-15 · الإصدار 2.1'),
    detail: bi(
      'CFO approval above SAR 2M. Emergency declaration authority is not assigned.',
      'موافقة المدير المالي لما يتجاوز مليوني ريال. لم تُحدّد صلاحية إعلان الطوارئ.',
    ),
    remediation: bi(
      'Ratify the emergency authority and publish one consistent approval matrix.',
      'اعتماد مسؤول إعلان الطوارئ ونشر مصفوفة موحدة للموافقات.',
    ),
    system: 4,
  },
  {
    id: 'DOC-03',
    name: bi('Emergency Maintenance Procedure', 'إجراء الصيانة الطارئة'),
    type: 'PDF · 12',
    owner: bi('Head of Maintenance', 'رئيس الصيانة'),
    status: bi('Missing owner', 'مسؤول القرار غير محدد'),
    score: 60,
    scores: [100, 72, 80, 0, 78, 30],
    sensitivity: bi('Internal', 'داخلي'),
    freshness: bi('2026-06-20 · v1.4', '2026-06-20 · الإصدار 1.4'),
    detail: bi(
      'Urgent procurement is permitted; the person authorized to declare the emergency is unspecified.',
      'يسمح بالشراء العاجل، دون تحديد الشخص المخوّل بإعلان حالة الطوارئ.',
    ),
    remediation: bi(
      'Human governance confirmation required; recommended role: Plant Manager.',
      'يلزم تأكيد بشري للصلاحية؛ الدور الموصى به: مدير المصنع.',
    ),
    system: 3,
  },
  {
    id: 'DOC-04',
    name: bi('Approved Suppliers List', 'قائمة الموردين المعتمدين'),
    type: 'CSV · 156',
    owner: bi('Supplier Compliance', 'امتثال الموردين'),
    status: bi('Incomplete', 'غير مكتمل'),
    score: 68,
    scores: [100, 85, 66, 90, 42, 25],
    sensitivity: bi('Confidential', 'سري'),
    freshness: bi('2026-09-02 · 72h lag', '2026-09-02 · تأخر 72 ساعة'),
    detail: bi(
      '156 suppliers; 12 reviews overdue. Al-Riyada Parts is approved; Wadi Industrial is pending verification.',
      '156 مورداً؛ تأخرت 12 مراجعة. قطع الريادة معتمد، ووادي الصناعية بانتظار التحقق.',
    ),
    remediation: bi(
      'Synchronize supplier risk status with ERP and block stale approvals.',
      'مزامنة مخاطر الموردين مع نظام الموارد وحظر الاعتمادات المتقادمة.',
    ),
    system: 5,
  },
  {
    id: 'DOC-05',
    name: bi('Critical Assets Register', 'سجل الأصول الحرجة'),
    type: 'XLSX · 840',
    owner: bi('Asset Engineering', 'هندسة الأصول'),
    status: bi('Incomplete', 'غير مكتمل'),
    score: 66,
    scores: [100, 82, 80, 85, 30, 19],
    sensitivity: bi('Internal', 'داخلي'),
    freshness: bi('2026-08-10 · monthly', '2026-08-10 · شهري'),
    detail: bi(
      '18% of spare parts lack criticality codes. CR-204 pump serves the Jubail production line.',
      'تفتقر 18% من قطع الغيار إلى رموز الأهمية. تخدم المضخة CR-204 خط الإنتاج في الجبيل.',
    ),
    remediation: bi(
      'Asset Engineering to classify missing parts before autonomous triage.',
      'تستكمل هندسة الأصول تصنيف القطع قبل الفرز المستقل.',
    ),
    system: 3,
  },
  {
    id: 'DOC-06',
    name: bi('Historical Purchase Orders', 'أوامر الشراء التاريخية'),
    type: 'CSV · 2,460',
    owner: bi('Finance Operations', 'العمليات المالية'),
    status: bi('Analyzed', 'تم التحليل'),
    score: 78,
    scores: [100, 92, 88, 100, 78, 10],
    sensitivity: bi('Restricted', 'مقيد'),
    freshness: bi('2026-09-04 · daily', '2026-09-04 · يومي'),
    detail: bi(
      '2,460 orders; 9-day critical-parts baseline across the last 12 months. Restricted financial fields stay internal.',
      '2,460 أمر شراء؛ خط أساس قدره 9 أيام للقطع الحرجة خلال 12 شهراً. تبقى الحقول المالية المقيدة داخل المؤسسة.',
    ),
    remediation: bi(
      'Use an internal model route and a read-only, field-scoped connector.',
      'استخدام نموذج داخلي وربط للقراءة فقط محدود الحقول.',
    ),
    system: 0,
  },
  {
    id: 'DOC-07',
    name: bi('Inventory Snapshot', 'لقطة المخزون'),
    type: 'CSV · 12,840',
    owner: bi('Warehouse Operations', 'عمليات المستودعات'),
    status: bi('Ready', 'جاهز'),
    score: 90,
    scores: [100, 96, 94, 100, 100, 50],
    sensitivity: bi('Internal', 'داخلي'),
    freshness: bi('2026-09-05 · 08:00', '2026-09-05 · 08:00'),
    detail: bi(
      'CR-204: Jubail 0 units, Dammam 2 units, Riyadh 1 unit. Internal transfer estimate: 8 hours.',
      'CR-204: الجبيل صفر، الدمام وحدتان، الرياض وحدة. زمن النقل الداخلي التقديري: 8 ساعات.',
    ),
    remediation: bi(
      'Add reservation API and verify stock immediately before transfer.',
      'إضافة واجهة حجز والتحقق من المخزون مباشرة قبل النقل.',
    ),
    system: 2,
  },
  {
    id: 'DOC-08',
    name: bi('Supplier Lead-Time Sheet', 'جدول مدد توريد الموردين'),
    type: 'XLSX · 318',
    owner: bi('Procurement Analyst', 'محلل المشتريات'),
    status: bi('Incomplete', 'غير مكتمل'),
    score: 44,
    scores: [100, 62, 55, 65, 12, 0],
    sensitivity: bi('Internal', 'داخلي'),
    freshness: bi('2026-08-01 · manual', '2026-08-01 · يدوي'),
    detail: bi(
      'Lead times exist only in Excel. Al-Riyada: 3 days; Wadi: 2 days, but not approved.',
      'مدد التوريد متاحة في إكسل فقط. الريادة: 3 أيام؛ وادي: يومان، لكنه غير معتمد.',
    ),
    remediation: bi(
      'Assign a refresh SLA and replace spreadsheet handoffs with a governed feed.',
      'تحديد اتفاقية لتحديث البيانات واستبدال تبادل الجداول بتغذية محكومة.',
    ),
    system: 6,
  },
];
export const findings = [
  bi(
    'Supplier lead-time data exists only in Excel.',
    'مدد توريد الموردين موجودة في إكسل فقط.',
  ),
  bi(
    'Asset criticality codes are missing for 18% of spare parts.',
    'رموز أهمية الأصل مفقودة لـ18% من قطع الغيار.',
  ),
  bi(
    'Emergency procurement authority is unclear.',
    'صلاحية الشراء الطارئ غير واضحة.',
  ),
  bi(
    'Procurement and maintenance optimize for different outcomes.',
    'تعمل المشتريات والصيانة لتحقيق نتائج مختلفة.',
  ),
  bi(
    'No single owner is accountable for total cycle time.',
    'لا يوجد مسؤول واحد عن مدة الدورة الكاملة.',
  ),
  bi(
    'Supplier risk data is not synchronized with ERP.',
    'بيانات مخاطر الموردين غير متزامنة مع نظام الموارد.',
  ),
];
export const policies = [
  {
    id: 'POL-01',
    rule: bi(
      'Purchases above SAR 1,000,000 require three quotations.',
      'المشتريات التي تتجاوز 1,000,000 ريال تتطلب ثلاثة عروض.',
    ),
    source: 'DOC-01 §4.2',
    expression: 'amount_sar > 1000000 → quotation_count >= 3',
  },
  {
    id: 'POL-02',
    rule: bi(
      'Purchases above SAR 2,000,000 require CFO approval.',
      'المشتريات التي تتجاوز 2,000,000 ريال تتطلب موافقة المدير المالي.',
    ),
    source: 'DOC-02 §3',
    expression: 'amount_sar > 2000000 → approval.cfo == true',
  },
  {
    id: 'POL-03',
    rule: bi(
      'New suppliers require compliance verification.',
      'يتطلب المورد الجديد التحقق من الامتثال.',
    ),
    source: 'DOC-01 §6.1',
    expression:
      'supplier.approved == false → block_selection + compliance_review',
  },
  {
    id: 'POL-04',
    rule: bi(
      'Emergency purchases require an authorized human declaration.',
      'يتطلب الشراء الطارئ إعلاناً من شخص مخوّل.',
    ),
    source: 'DOC-03 §2.1',
    expression: 'emergency == true → authorized_human_declaration',
  },
  {
    id: 'POL-05',
    rule: bi(
      'Restricted financial data cannot be sent to external AI models.',
      'يُحظر إرسال البيانات المالية المقيدة إلى نماذج ذكاء اصطناعي خارجية.',
    ),
    source: 'DOC-01 Annex B',
    expression: 'sensitivity == restricted → model_route = internal_only',
  },
  {
    id: 'POL-06',
    rule: bi(
      'Purchase orders require confirmed budget availability.',
      'يتطلب أمر الشراء تأكيد توفر الميزانية.',
    ),
    source: 'DOC-01 §5.3',
    expression: 'budget.confirmed == false → block_purchase_order',
  },
];
export type AgentSpec = {
  id: string;
  name: Copy;
  purpose: Copy;
  inputs: string[];
  systems: number[];
  tools: string[];
  allowed: Copy;
  prohibited: Copy;
  escalation: Copy;
  approval: Copy;
  metric: Copy;
  route: Copy;
};
const route = bi(
  'Internal enterprise model; restricted data never leaves the trust boundary.',
  'نموذج مؤسسي داخلي؛ لا تغادر البيانات المقيدة حدود الثقة.',
);
export const agents: AgentSpec[] = [
  {
    id: 'triage',
    name: bi('Maintenance Triage Agent', 'وكيل فرز الصيانة'),
    purpose: bi(
      'Classify asset criticality and translate a failure into a validated parts requirement.',
      'تصنيف أهمية الأصل وتحويل العطل إلى طلب قطع متحقق منه.',
    ),
    inputs: ['DOC-03', 'DOC-05'],
    systems: [3],
    tools: ['maintenance.read', 'assets.classify'],
    allowed: bi(
      'Read work orders and recommend urgency.',
      'قراءة أوامر العمل والتوصية بدرجة الإلحاح.',
    ),
    prohibited: bi(
      'Declare emergencies or alter asset classifications without review.',
      'إعلان الطوارئ أو تعديل تصنيف الأصل دون مراجعة.',
    ),
    escalation: bi(
      'Missing criticality or active production-line outage.',
      'غياب تصنيف الأهمية أو توقف خط الإنتاج.',
    ),
    approval: bi(
      'Plant authority declares emergency; engineer confirms unknown specifications.',
      'تعلن الجهة المخولة الطوارئ؛ ويؤكد المهندس المواصفات غير المعروفة.',
    ),
    metric: bi(
      '100% of criticality gaps escalated.',
      'تصعيد جميع فجوات تصنيف الأهمية.',
    ),
    route,
  },
  {
    id: 'inventory',
    name: bi('Inventory Search Agent', 'وكيل البحث في المخزون'),
    purpose: bi(
      'Find available parts across all Saudi warehouses before external procurement.',
      'البحث عن القطع في مستودعات المملكة قبل الشراء الخارجي.',
    ),
    inputs: ['DOC-07', 'DOC-05'],
    systems: [2, 0],
    tools: ['inventory.search', 'transfer.create'],
    allowed: bi(
      'Search stock and prepare internal transfers.',
      'البحث في المخزون وإعداد النقل الداخلي.',
    ),
    prohibited: bi(
      'Change stock balances or bypass warehouse release controls.',
      'تعديل أرصدة المخزون أو تجاوز ضوابط الصرف.',
    ),
    escalation: bi(
      'Stock mismatch, stale inventory or conflicting reservations.',
      'اختلاف المخزون أو تقادم البيانات أو تعارض الحجوزات.',
    ),
    approval: bi(
      'Warehouse custodian confirms physical dispatch.',
      'يؤكد أمين المستودع الإرسال الفعلي.',
    ),
    metric: bi(
      'Search every warehouse before any external order.',
      'البحث في جميع المستودعات قبل أي طلب خارجي.',
    ),
    route,
  },
  {
    id: 'procurement',
    name: bi('Procurement Agent', 'وكيل المشتريات'),
    purpose: bi(
      'Coordinate quotations and prepare compliant purchase orders.',
      'تنسيق عروض الأسعار وإعداد أوامر شراء ملتزمة.',
    ),
    inputs: ['DOC-01', 'DOC-04', 'DOC-08'],
    systems: [1, 0],
    tools: ['quotation.request', 'po.prepare', 'po.create'],
    allowed: bi(
      'Request quotes; select approved suppliers below SAR 500k under Level 3 controls.',
      'طلب العروض واختيار مورد معتمد بأقل من 500 ألف ريال وفق المستوى 3.',
    ),
    prohibited: bi(
      'Override policy, approve spending, or create unfunded orders.',
      'تجاوز السياسات أو اعتماد الإنفاق أو إنشاء طلب غير ممول.',
    ),
    escalation: bi(
      'Supplier not approved, price above authority, or lead-time risk.',
      'مورد غير معتمد أو قيمة تتجاوز الصلاحية أو خطر تأخر التوريد.',
    ),
    approval: bi(
      'Procurement owner at SAR 500k and above; CFO above SAR 2M.',
      'مسؤول المشتريات من 500 ألف ريال؛ والمدير المالي فوق مليوني ريال.',
    ),
    metric: bi(
      'Compliant critical-parts cycle ≤ 3 days.',
      'دورة ملتزمة للقطع الحرجة لا تتجاوز 3 أيام.',
    ),
    route,
  },
  {
    id: 'supplier',
    name: bi('Supplier Risk Agent', 'وكيل مخاطر الموردين'),
    purpose: bi(
      'Validate supplier approval, review currency, and delivery risk.',
      'التحقق من اعتماد المورد وحداثة المراجعة ومخاطر التسليم.',
    ),
    inputs: ['DOC-04', 'DOC-08'],
    systems: [5],
    tools: ['supplier.read', 'compliance.open'],
    allowed: bi(
      'Read risk scores and open verification cases.',
      'قراءة درجات المخاطر وفتح حالات التحقق.',
    ),
    prohibited: bi(
      'Approve a new supplier or edit the approved list.',
      'اعتماد مورد جديد أو تعديل القائمة المعتمدة.',
    ),
    escalation: bi(
      'Expired compliance review or an unapproved supplier.',
      'انتهاء مراجعة الامتثال أو عدم اعتماد المورد.',
    ),
    approval: bi(
      'Compliance officer signs supplier onboarding.',
      'يعتمد مسؤول الامتثال تأهيل المورد.',
    ),
    metric: bi(
      'Zero unapproved supplier selections.',
      'صفر اختيارات لموردين غير معتمدين.',
    ),
    route,
  },
  {
    id: 'finance',
    name: bi('Finance Agent', 'وكيل المالية'),
    purpose: bi(
      'Confirm cost-center budget and estimate financial exposure.',
      'تأكيد ميزانية مركز التكلفة وتقدير التعرض المالي.',
    ),
    inputs: ['DOC-06', 'DOC-02'],
    systems: [4, 0],
    tools: ['budget.check', 'exposure.estimate'],
    allowed: bi(
      'Read scoped budget availability and prepare approval requests.',
      'قراءة توفر الميزانية ضمن النطاق وإعداد طلبات الاعتماد.',
    ),
    prohibited: bi(
      'Release payments, increase budgets, or export restricted data.',
      'صرف المدفوعات أو زيادة الميزانية أو تصدير بيانات مقيدة.',
    ),
    escalation: bi(
      'Insufficient budget or order above SAR 2M.',
      'عدم كفاية الميزانية أو تجاوز الطلب مليوني ريال.',
    ),
    approval: bi(
      'CFO for material spending; Finance owner for budget exception.',
      'المدير المالي للإنفاق الجوهري؛ ومسؤول المالية لاستثناء الميزانية.',
    ),
    metric: bi(
      '100% of purchase orders backed by confirmed budget.',
      'جميع أوامر الشراء مدعومة بميزانية مؤكدة.',
    ),
    route,
  },
  {
    id: 'policy',
    name: bi('Policy and Governance Agent', 'وكيل السياسات والحوكمة'),
    purpose: bi(
      'Apply versioned rules and enforce authority before execution.',
      'تطبيق القواعد المعتمدة والتحقق من الصلاحيات قبل التنفيذ.',
    ),
    inputs: ['DOC-01', 'DOC-02', 'DOC-03'],
    systems: [1, 4],
    tools: ['policy.evaluate', 'authority.check'],
    allowed: bi(
      'Validate and block noncompliant actions.',
      'التحقق وحظر الإجراءات غير الملتزمة.',
    ),
    prohibited: bi(
      'Rewrite policies or grant itself decision rights.',
      'إعادة كتابة السياسات أو منح نفسه صلاحيات.',
    ),
    escalation: bi(
      'Conflicting rule or undefined approval authority.',
      'تعارض قاعدة أو غياب جهة اعتماد محددة.',
    ),
    approval: bi(
      'Governance owner ratifies every policy change.',
      'يعتمد مسؤول الحوكمة كل تعديل للسياسات.',
    ),
    metric: bi(
      '100% critical controls pass before pilot.',
      'اجتياز جميع الضوابط الحرجة قبل التجربة.',
    ),
    route,
  },
  {
    id: 'human',
    name: bi('Human Approval Coordinator', 'منسق الموافقات البشرية'),
    purpose: bi(
      'Route decisions to named human owners and track response deadlines.',
      'توجيه القرارات للمسؤولين وتتبع مهل الاستجابة.',
    ),
    inputs: ['DOC-02', 'DOC-03'],
    systems: [7, 1],
    tools: ['approval.request', 'approval.track'],
    allowed: bi(
      'Prepare approval tasks and escalate overdue requests.',
      'إعداد مهام الاعتماد وتصعيد الطلبات المتأخرة.',
    ),
    prohibited: bi(
      'Impersonate approvers or record unreceived approvals.',
      'انتحال هوية المعتمد أو تسجيل موافقة لم تصدر.',
    ),
    escalation: bi(
      'No assigned approver or a breached four-hour SLA.',
      'غياب المعتمد أو تجاوز مهلة أربع ساعات.',
    ),
    approval: bi(
      'Human signs all material, exceptional and high-risk decisions.',
      'يوقع الإنسان القرارات الجوهرية والاستثنائية وعالية المخاطر.',
    ),
    metric: bi(
      'Every approval attributable to an authorized person.',
      'إسناد كل موافقة إلى شخص مخوّل.',
    ),
    route,
  },
  {
    id: 'outcome',
    name: bi('Outcome Measurement Agent', 'وكيل قياس النتائج'),
    purpose: bi(
      'Measure end-to-end delivery time and downtime avoided against the contract.',
      'قياس مدة التسليم الكاملة والتوقف المتجنب مقابل عقد النتائج.',
    ),
    inputs: ['DOC-06', 'DOC-07'],
    systems: [0, 3],
    tools: ['kpi.compute', 'outcome.report'],
    allowed: bi(
      'Aggregate event timestamps and report measured outcomes.',
      'تجميع الطوابع الزمنية والإبلاغ عن النتائج المقاسة.',
    ),
    prohibited: bi(
      'Present estimates as actual results or modify source events.',
      'عرض التقديرات كنتائج فعلية أو تعديل أحداث المصدر.',
    ),
    escalation: bi(
      'Missing receipt timestamp or sustained KPI deterioration.',
      'غياب وقت الاستلام أو تدهور المؤشر المستمر.',
    ),
    approval: bi(
      'Outcome owner signs the monthly performance review.',
      'يعتمد مسؤول النتائج المراجعة الشهرية للأداء.',
    ),
    metric: bi(
      'Reconciled request-to-receipt timestamps for all pilot orders.',
      'مطابقة أوقات الطلب والاستلام لجميع أوامر التجربة.',
    ),
    route,
  },
];
export const asIs = [
  bi('Maintenance identifies failure', 'تحدد الصيانة العطل'),
  bi('Technician checks stock manually', 'يتحقق الفني من المخزون يدوياً'),
  bi('Request emailed to procurement', 'إرسال الطلب بالبريد إلى المشتريات'),
  bi('Procurement validates specifications', 'تتحقق المشتريات من المواصفات'),
  bi('Supplier quotations requested', 'طلب عروض الموردين'),
  bi('Budget availability checked', 'التحقق من الميزانية'),
  bi('Approval authority identified', 'تحديد صاحب صلاحية الاعتماد'),
  bi('Purchase order created', 'إنشاء أمر الشراء'),
  bi('Supplier confirms delivery', 'يؤكد المورد التسليم'),
  bi('Maintenance receives the part', 'تستلم الصيانة القطعة'),
];
export const toBe = [
  bi('Triage classifies the requirement', 'الفرز يصنف المتطلب'),
  bi('Inventory searches all warehouses', 'البحث في جميع المستودعات'),
  bi('Procurement identifies approved suppliers', 'تحديد الموردين المعتمدين'),
  bi('Finance confirms the budget', 'المالية تؤكد الميزانية'),
  bi(
    'Policy validates compliance and authority',
    'التحقق من الالتزام والصلاحيات',
  ),
  bi('Human approves exceptions only', 'اعتماد بشري للاستثناءات فقط'),
  bi('Procurement creates the order', 'المشتريات تنشئ أمر الشراء'),
  bi('Outcome measures delivery and value', 'قياس التسليم والقيمة'),
];
export const decisions = [
  {
    label: bi('Check internal inventory', 'التحقق من المخزون الداخلي'),
    category: 0,
    owner: bi('Inventory Agent', 'وكيل المخزون'),
  },
  {
    label: bi('Request supplier quotations', 'طلب عروض الموردين'),
    category: 0,
    owner: bi('Procurement Agent', 'وكيل المشتريات'),
  },
  {
    label: bi(
      'Select approved supplier below SAR 500,000',
      'اختيار مورد معتمد بأقل من 500,000 ريال',
    ),
    category: 0,
    owner: bi('Procurement Agent', 'وكيل المشتريات'),
  },
  {
    label: bi(
      'Recommend a supplier for SAR 500,000–2,000,000',
      'التوصية بمورد لقيمة 500,000–2,000,000 ريال',
    ),
    category: 1,
    owner: bi('Head of Procurement', 'رئيس المشتريات'),
  },
  {
    label: bi('Declare emergency procurement', 'إعلان حالة الشراء الطارئ'),
    category: 2,
    owner: bi('Authorized emergency owner', 'مسؤول الطوارئ المخول'),
  },
  {
    label: bi(
      'Approve spending above SAR 2,000,000',
      'اعتماد إنفاق يتجاوز 2,000,000 ريال',
    ),
    category: 2,
    owner: bi('CFO', 'المدير المالي'),
  },
  {
    label: bi('Onboard a new supplier', 'تأهيل مورد جديد'),
    category: 2,
    owner: bi('Compliance Officer', 'مسؤول الامتثال'),
  },
  {
    label: bi('Override procurement policy', 'تجاوز سياسة المشتريات'),
    category: 3,
    owner: bi('No override permitted', 'لا يسمح بالتجاوز'),
  },
  {
    label: bi(
      'Send restricted data to an external model',
      'إرسال بيانات مقيدة إلى نموذج خارجي',
    ),
    category: 3,
    owner: bi('Internal model route only', 'نموذج داخلي فقط'),
  },
];
export const categories = [
  bi('Autonomous execution', 'تنفيذ مستقل'),
  bi('Recommend only', 'توصية فقط'),
  bi('Human approval required', 'موافقة بشرية مطلوبة'),
  bi('Action prohibited', 'إجراء محظور'),
];
export type Scenario = {
  id: number;
  title: Copy;
  description: Copy;
  stock: number;
  approved: boolean;
  budget: boolean;
  emergency: boolean;
  amount: number;
};
export const scenarios: Scenario[] = [
  {
    id: 1,
    title: bi('A part, closer than you think', 'القطعة أقرب مما تتوقع'),
    description: bi(
      'The required part is available at another warehouse.',
      'القطعة المطلوبة متوفرة في مستودع آخر.',
    ),
    stock: 2,
    approved: true,
    budget: true,
    emergency: false,
    amount: 180000,
  },
  {
    id: 2,
    title: bi('The routine procurement path', 'مسار الشراء الاعتيادي'),
    description: bi(
      'No internal stock. Routine purchase from approved suppliers.',
      'لا يوجد مخزون داخلي. شراء اعتيادي من موردين معتمدين.',
    ),
    stock: 0,
    approved: true,
    budget: true,
    emergency: false,
    amount: 1200000,
  },
  {
    id: 3,
    title: bi('Production cannot wait', 'الإنتاج لا يحتمل الانتظار'),
    description: bi(
      'A critical production line is down at the Jubail plant.',
      'توقف خط إنتاج حرج في مصنع الجبيل.',
    ),
    stock: 0,
    approved: true,
    budget: true,
    emergency: true,
    amount: 2400000,
  },
  {
    id: 4,
    title: bi('The cheapest is not the safest', 'الأرخص ليس بالضرورة الأنسب'),
    description: bi(
      'The lowest-priced supplier has not been approved.',
      'المورد الأقل سعراً غير معتمد.',
    ),
    stock: 0,
    approved: false,
    budget: true,
    emergency: false,
    amount: 280000,
  },
  {
    id: 5,
    title: bi('An unfunded purchase', 'طلب شراء دون تمويل'),
    description: bi(
      'The cost center has no available budget.',
      'لا تتوفر ميزانية في مركز التكلفة.',
    ),
    stock: 0,
    approved: true,
    budget: false,
    emergency: false,
    amount: 180000,
  },
];
export const packTitles = [
  bi('Executive problem definition', 'تعريف المشكلة التنفيذية'),
  bi('Outcome Contract', 'عقد النتائج'),
  bi('As-Is process', 'العملية الحالية'),
  bi('To-Be process', 'العملية المستهدفة'),
  bi('Agent specifications', 'مواصفات الوكلاء'),
  bi('Tool and system permissions', 'صلاحيات الأدوات والأنظمة'),
  bi('Data requirements', 'متطلبات البيانات'),
  bi('Integration requirements', 'متطلبات الربط'),
  bi('Human approval matrix', 'مصفوفة الموافقات البشرية'),
  bi('Policy rules', 'قواعد السياسات'),
  bi('Exception test cases', 'حالات اختبار الاستثناءات'),
  bi('Acceptance criteria', 'معايير القبول'),
  bi('Risk register', 'سجل المخاطر'),
  bi('Governance controls', 'ضوابط الحوكمة'),
  bi('KPI measurement plan', 'خطة قياس المؤشرات'),
  bi('Recommended implementation phases', 'مراحل التنفيذ الموصى بها'),
];
