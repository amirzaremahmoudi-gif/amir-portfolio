export type EvidenceStatus = 'FACT' | 'RECONSTRUCTED' | 'TODO'

export interface EvidenceClaim {
  status: EvidenceStatus
  claim: string
}

export interface MediaRequirement {
  asset: string
  ratio: string
  recommendation: string
  section: string
  caption?: string
}

const en = {
  locale: 'en',
  hero: {
    eyebrow: 'Featured case study · Fintech / Insurtech',
    title: 'Toranj App (Insurance)',
    summary: 'A mobile-first Persian product experience that brings investment-linked insurance, gold and fixed-income plans, payments, and portfolio management into one guided system.',
    meta: [
      ['Role', 'Product Designer'], ['Timeline', '2 months'],
      ['Platform', 'Mobile-first web app'], ['Industry', 'Fintech']
    ]
  },
  labels: { fact: 'Verified product scope', reconstructed: 'Reconstructed from the final product', todo: 'Pending verification' },
  outline: ['Context', 'Challenge', 'Architecture', 'Primary journey', 'Supporting flows', 'Wireframes', 'UX rationale', 'Final UI', 'Interaction', 'Interface system', 'Edge states', 'Review'],
  context: {
    kicker: '01 · Product context', title: 'One clear journey across products',
    lead: 'Toranj brings insurance, gold, and fixed-income investing into one connected product experience.',
    body: 'Discovery, purchase, payment, and portfolio management flow through one continuous mobile journey.',
    complexity: [
      ['Investment', 'Two products in one portfolio.'],
      ['Insurance', 'Policy details stay connected.'],
      ['Compliance', 'Information appears only when needed.'],
      ['Money movement', 'Clear payment and redemption states.']
    ]
  },
  challenge: {
    kicker: '02 · The design challenge', title: 'Stage financial complexity',
    lead: 'Guide a financial decision without exposing every dependency at once.',
    body: 'The experience had to establish trust, reveal compliance requirements progressively, distinguish Rose and Afran, preserve financial-data hierarchy, and work within a compact Persian RTL interface. Multiple states—before purchase, during payment, after activation, and through redemption—needed to remain legible as one coherent system.',
    principles: ['Progressive disclosure', 'Visible system status', 'Product differentiation', 'Mobile task focus']
  },
  architecture: {
    kicker: '03 · Experience architecture', title: 'A product map built around the policy lifecycle', caption: 'Reconstructed from final product structure',
    groups: [
      { title: 'Entry', items: ['Authentication', 'OTP', 'Onboarding'] },
      { title: 'Discover', items: ['Home', 'Plan discovery', 'Rose / Afran'] },
      { title: 'Acquire', items: ['Amount', 'Identity & postal', 'Review', 'Payment'] },
      { title: 'Manage', items: ['Portfolio', 'Policy details', 'Deposit', 'Redemption'] },
      { title: 'Account', items: ['Profile', 'Bank accounts', 'Transactions', 'Support'] }
    ]
  },
  primaryFlow: {
    kicker: '04 · Primary user journey', title: 'From discovery to an active policy', caption: 'Reconstructed from final product states',
    steps: [
      { kind: 'user', label: 'Discover a plan', detail: 'Home presents Rose Toranj and Afran.' },
      { kind: 'decision', label: 'Compare & choose', detail: 'Select gold-based or fixed-income.' },
      { kind: 'user', label: 'Enter amount', detail: 'Provide the intended investment amount.' },
      { kind: 'decision', label: 'Requirements complete?', detail: 'Identity and postal information may be required.' },
      { kind: 'user', label: 'Review & confirm', detail: 'Check product, amount, and required information.' },
      { kind: 'system', label: 'Pending payment', detail: 'The purchase waits for payment completion.' },
      { kind: 'external', label: 'Payment handoff', detail: 'Continue through the external payment step.' },
      { kind: 'success', label: 'Active policy', detail: 'The product returns with an active policy state.' }
    ]
  },
  supporting: {
    kicker: '05 · Supporting flows', title: 'The journeys that make the core lifecycle work',
    flows: [
      { title: 'Authentication + onboarding', steps: ['Mobile number', 'OTP', 'Onboarding progression', 'Home'] },
      { title: 'Deposit', steps: ['Portfolio', 'Select deposit', 'Enter amount', 'Payment', 'Updated state'] },
      { title: 'Redemption', steps: ['Policy', 'Request redemption', 'Confirm details', 'Pending', 'Completion'] },
      { title: 'Portfolio monitoring', steps: ['Portfolio', 'Balance visibility', 'Policy details', 'Transactions / actions'] }
    ]
  },
  wireframes: {
    kicker: '06 · Reconstructed wireframes', title: 'Structure before surface', caption: 'Wireframes reconstructed for case-study documentation',
    intro: 'These are genuine low-fidelity structural studies of hierarchy, content regions, actions, forms, decisions, and feedback. They are not grayscale copies of the final interface.',
    screens: [
      { n: '01', title: 'Login / OTP', eyebrow: 'Entry', blocks: ['Brand & trust context', 'Mobile number field', 'Primary CTA', 'OTP feedback'] },
      { n: '02', title: 'Home / plan discovery', eyebrow: 'Discover', blocks: ['Balance summary', 'Rose / Afran choice', 'Plan information', 'Persistent navigation'] },
      { n: '03', title: 'Purchase / amount', eyebrow: 'Acquire', blocks: ['Selected product', 'Amount input', 'Contextual guidance', 'Sticky continue action'] },
      { n: '04', title: 'Identity / compliance', eyebrow: 'Required info', blocks: ['Progress indicator', 'Identity fields', 'Postal requirement', 'Validation feedback'] },
      { n: '05', title: 'Portfolio dashboard', eyebrow: 'Manage', blocks: ['Balance visibility', 'Policy cards', 'Primary actions', 'Recent transactions'] },
      { n: '06', title: 'Redemption', eyebrow: 'Money out', blocks: ['Available amount', 'Redemption input', 'Bank-account dependency', 'Review / pending state'] }
    ]
  },
  decisions: {
    kicker: '07 · UX decisions', title: 'Retrospective design rationale',
    intro: 'The rationale below is inferred from visible interface patterns and flow structure; it is not presented as contemporaneous project documentation.',
    items: [
      ['Reveal obligations at the moment of need', 'Identity, postal, and banking requirements sit inside staged flows, reducing the amount a person must process at once.'],
      ['Differentiate products without fragmenting the experience', 'Rose and Afran retain distinct product identities while sharing navigation, purchase logic, feedback, and portfolio patterns.'],
      ['Protect the hierarchy of money', 'Balances, amounts, policy status, and primary actions receive priority over supporting explanation in compact mobile layouts.'],
      ['Make redemption deliberate', 'A staged request, bank-account dependency, confirmation, and pending state reduce ambiguity in a consequential money-out task.'],
      ['Keep contextual work close', 'Drawers support focused tasks and additional information without forcing unnecessary navigation away from the current context.'],
      ['Design feedback as part of the flow', 'Validation, loading, warning, error, success, and pending states explain what the system needs and what happens next.']
    ]
  },
  finalUi: {
    kicker: '08 · Final UI', title: 'A visual record, ready for the real product',
    intro: 'The final interface story will be image-led. Every slot below is intentionally empty until authentic product assets are supplied.'
  },
  interaction: {
    kicker: '09 · Interaction design', title: 'Depth lives between the screens',
    intro: 'The product’s implemented state model supports more than a linear happy path. These interaction areas are prepared for short recordings once source media is available.',
    items: ['OTP and onboarding progression', 'Plan carousel and product selection', 'Form validation and Persian calendar', 'Contextual drawers and sticky actions', 'Transaction filtering and balance visibility', 'Purchase, deposit, and two-stage redemption states', 'Loading, error, success, and pending feedback']
  },
  system: {
    kicker: '10 · Interface system', title: 'Reusable product patterns',
    intro: 'The final interface demonstrates a reusable system of patterns. This framing does not imply that a formal design-system process was part of the original project.',
    items: [
      ['Type & numerals', 'Persian reading rhythm, dense financial labels, and prominent values.'], ['Spacing', 'A compact mobile scale with clear separation between task stages.'],
      ['Surfaces & radii', 'Layered sections, cards, and drawers organize contextual depth.'], ['Controls', 'Inputs, selection, filters, sticky actions, and feedback patterns.'],
      ['Product themes', 'Rose and Afran accents distinguish products within one system.'], ['RTL behavior', 'Direction-aware navigation, metadata, money, dates, and icon movement.']
    ]
  },
  states: {
    kicker: '11 · Edge states', title: 'Trust beyond the happy path',
    intro: 'State coverage matters because money, identity, and external payment steps can be delayed, incomplete, or interrupted. A mature experience makes system status and recovery paths visible without relying on user testing claims.',
    items: ['Loading', 'Skeleton', 'Empty', 'Validation error', 'Network error', 'Warning', 'Success', 'Pending payment']
  },
  review: {
    kicker: '12 · Retrospective UX review', title: 'A concise evaluation of the final experience', caption: 'Retrospective analysis',
    columns: [
      { title: 'Strengths', items: ['End-to-end flow completeness', 'Progressive disclosure', 'State depth', 'Product differentiation', 'Financial hierarchy'] },
      { title: 'Opportunities', items: ['Reduce dense financial information', 'Increase secondary-copy readability', 'Unify accent behavior', 'Rationalize card and surface variation'] },
      { title: 'Risks', items: ['Compliance dependencies can interrupt momentum', 'External payment can fragment perceived continuity', 'Dense RTL values require careful device testing'] }
    ]
  },
  evidence: {
    title: 'Evidence ledger', summary: 'The page keeps factual confidence traceable without turning the reading experience into a wall of labels.',
    claims: <EvidenceClaim[]>[
      { status: 'FACT', claim: 'Product scope, routes, products, workflows, and state coverage supplied in the approved brief.' },
      { status: 'RECONSTRUCTED', claim: 'Design challenge, architecture, journeys, wireframes, and retrospective rationale inferred from final product structure.' },
      { status: 'TODO', claim: 'Role, timeline, team, responsibilities, research, validation, outcomes, and final media remain pending confirmation.' }
    ]
  },
  media: <MediaRequirement[]>[
    { asset: 'Hero composition', ratio: '16:9', recommendation: 'A unified view of the home, purchase, and portfolio journey that makes the product structure clear at a glance.', section: 'Hero', caption: 'The multi-device layout highlights information hierarchy and key decision points without unnecessary visual detail.' },
    { asset: 'Onboarding sequence', ratio: '3:2', recommendation: 'Three authentic screens: mobile entry, OTP, and onboarding progress.', section: 'Final UI' },
    { asset: 'Home + discovery', ratio: '4:3', recommendation: 'Home beside the Rose / Afran discovery or comparison state.', section: 'Final UI' },
    { asset: 'Purchase sequence', ratio: '16:10', recommendation: 'Amount, identity/compliance, confirmation, and payment-pending states.', section: 'Final UI' },
    { asset: 'Portfolio + policy', ratio: '3:2', recommendation: 'Portfolio overview paired with a detailed active-policy view.', section: 'Final UI' },
    { asset: 'Deposit + redemption', ratio: '16:10', recommendation: 'Two device sequences showing money-in and staged money-out.', section: 'Final UI' },
    { asset: 'Profile + banking', ratio: '4:3', recommendation: 'Profile, bank-account management, and transaction-history screens.', section: 'Final UI' },
    { asset: 'System states', ratio: '3:2', recommendation: 'A labeled grid of loading, empty, validation, network error, warning, success, and pending payment.', section: 'Edge states' },
    { asset: 'Interaction recording', ratio: '9:16', recommendation: 'Short capture of plan selection through amount entry and validation.', section: 'Interaction', caption: '8–12 seconds, no cursor, natural mobile pacing.' },
    { asset: 'Redemption recording', ratio: '9:16', recommendation: 'Short capture of the two-stage redemption and pending feedback.', section: 'Interaction', caption: '8–12 seconds, include bank-account dependency if present.' }
  ]
}

const fa = {
  ...en,
  locale: 'fa',
  hero: {
    eyebrow: 'مطالعه موردی منتخب · فین‌تک / اینشورتک', title: 'اپ ترنج (بیمه)',
    summary: 'تجربه‌ای فارسی و موبایل‌محور که بیمه متصل به سرمایه‌گذاری، طرح‌های طلا و درآمد ثابت، پرداخت و مدیریت سبد را در یک مسیر هدایت‌شده کنار هم قرار می‌دهد.',
    meta: [['نقش', 'پروداکت دیزاینر'], ['زمان‌بندی', '۲ ماه'], ['پلتفرم', 'وب‌اپلیکیشن موبایل‌محور'], ['صنعت', 'فین‌تک']]
  },
  labels: { fact: 'دامنه محصول تأییدشده', reconstructed: 'بازسازی‌شده از محصول نهایی', todo: 'در انتظار تأیید' },
  outline: ['زمینه', 'چالش', 'معماری', 'مسیر اصلی', 'مسیرهای پشتیبان', 'وایرفریم‌ها', 'منطق تجربه', 'رابط نهایی', 'تعامل', 'الگوهای رابط', 'حالت‌ها', 'ارزیابی'],
  context: {
    kicker: '۰۱ · زمینه محصول', title: 'یک مسیر روشن برای محصولات مختلف',
    lead: 'اپ ترنج، بیمه و دو مسیر سرمایه‌گذاری طلا و درآمد ثابت را در یک تجربه واحد جمع می‌کند.',
    body: 'کشف طرح، خرید، پرداخت و مدیریت سبد در یک جریان موبایلی پیوسته انجام می‌شود.',
    complexity: [['سرمایه‌گذاری', 'دو محصول در یک سبد.'], ['بیمه', 'بیمه‌نامه در امتداد سرمایه‌گذاری.'], ['الزامات', 'اطلاعات فقط هنگام نیاز.'], ['گردش پول', 'پرداخت و بازخرید با وضعیت روشن.']]
  },
  challenge: {
    kicker: '۰۲ · چالش طراحی', title: 'پیچیدگی مالی را مرحله‌بندی کنیم',
    lead: 'تصمیم مالی روشن، بدون نمایش هم‌زمان همه پیچیدگی‌ها.',
    body: 'تجربه باید اعتماد بسازد، الزامات را تدریجی آشکار کند، رز و افران را از هم متمایز نگه دارد، سلسله‌مراتب داده‌های مالی را حفظ کند و در فضای محدود رابط فارسی و راست‌به‌چپ کار کند. حالت‌های پیش از خرید، پرداخت، فعال‌شدن و بازخرید نیز باید مانند اجزای یک سیستم واحد فهمیده شوند.',
    principles: ['افشای تدریجی', 'وضعیت روشن سیستم', 'تمایز محصول', 'تمرکز بر کار موبایلی']
  },
  architecture: {
    kicker: '۰۳ · معماری تجربه', title: 'نقشه محصول بر پایه چرخه عمر بیمه‌نامه', caption: 'بازسازی‌شده از ساختار محصول نهایی',
    groups: [{ title: 'ورود', items: ['ورود', 'رمز یک‌بارمصرف', 'آشنایی اولیه'] }, { title: 'کشف', items: ['خانه', 'کشف طرح', 'رز / افران'] }, { title: 'خرید', items: ['مبلغ', 'هویت و آدرس', 'مرور', 'پرداخت'] }, { title: 'مدیریت', items: ['سبد', 'جزئیات بیمه‌نامه', 'واریز', 'بازخرید'] }, { title: 'حساب', items: ['پروفایل', 'حساب‌های بانکی', 'تراکنش‌ها', 'پشتیبانی'] }]
  },
  primaryFlow: {
    kicker: '۰۴ · مسیر اصلی کاربر', title: 'از کشف طرح تا بیمه‌نامه فعال', caption: 'بازسازی‌شده از حالت‌های محصول نهایی',
    steps: [{ kind: 'user', label: 'کشف طرح', detail: 'خانه، رز ترنج و افران را معرفی می‌کند.' }, { kind: 'decision', label: 'مقایسه و انتخاب', detail: 'انتخاب میان طلا و درآمد ثابت.' }, { kind: 'user', label: 'ورود مبلغ', detail: 'مبلغ موردنظر برای سرمایه‌گذاری وارد می‌شود.' }, { kind: 'decision', label: 'اطلاعات کامل است؟', detail: 'ممکن است اطلاعات هویتی و پستی لازم باشد.' }, { kind: 'user', label: 'مرور و تأیید', detail: 'محصول، مبلغ و اطلاعات الزامی بررسی می‌شوند.' }, { kind: 'system', label: 'در انتظار پرداخت', detail: 'خرید تا تکمیل پرداخت در وضعیت انتظار می‌ماند.' }, { kind: 'external', label: 'انتقال به پرداخت', detail: 'ادامه مسیر در مرحله بیرونی پرداخت.' }, { kind: 'success', label: 'بیمه‌نامه فعال', detail: 'محصول با وضعیت بیمه‌نامه فعال بازمی‌گردد.' }]
  },
  supporting: {
    kicker: '۰۵ · مسیرهای پشتیبان', title: 'مسیرهایی که چرخه اصلی را کامل می‌کنند',
    flows: [{ title: 'ورود و شروع', steps: ['شماره همراه', 'رمز یک‌بارمصرف', 'مراحل آشنایی', 'خانه'] }, { title: 'واریز', steps: ['سبد', 'انتخاب واریز', 'ورود مبلغ', 'پرداخت', 'به‌روزرسانی'] }, { title: 'بازخرید', steps: ['بیمه‌نامه', 'درخواست بازخرید', 'تأیید جزئیات', 'در انتظار', 'تکمیل'] }, { title: 'پایش سبد', steps: ['سبد', 'نمایش موجودی', 'جزئیات بیمه‌نامه', 'تراکنش‌ها / عملیات'] }]
  },
  wireframes: {
    kicker: '۰۶ · وایرفریم‌های بازسازی‌شده', title: 'ساختار، پیش از پرداخت بصری', caption: 'وایرفریم‌ها برای مستندسازی مطالعه موردی بازسازی شده‌اند',
    intro: 'این‌ها وایرفریم‌های کم‌جزئیات واقعی برای نمایش سلسله‌مراتب، نواحی محتوا، عملیات، فرم‌ها، تصمیم‌ها و بازخورد هستند؛ نه نسخه خاکستری رابط نهایی.',
    screens: [{ n: '۰۱', title: 'ورود / رمز یک‌بارمصرف', eyebrow: 'ورود', blocks: ['برند و زمینه اعتماد', 'ورودی شماره همراه', 'عملیات اصلی', 'بازخورد رمز'] }, { n: '۰۲', title: 'خانه / کشف طرح', eyebrow: 'کشف', blocks: ['خلاصه موجودی', 'انتخاب رز / افران', 'اطلاعات طرح', 'ناوبری پایدار'] }, { n: '۰۳', title: 'خرید / مبلغ', eyebrow: 'خرید', blocks: ['محصول منتخب', 'ورودی مبلغ', 'راهنمای زمینه‌ای', 'عملیات چسبان ادامه'] }, { n: '۰۴', title: 'هویت / الزامات', eyebrow: 'اطلاعات الزامی', blocks: ['نشانگر پیشرفت', 'فیلدهای هویتی', 'الزام آدرس', 'بازخورد اعتبارسنجی'] }, { n: '۰۵', title: 'داشبورد سبد', eyebrow: 'مدیریت', blocks: ['نمایش موجودی', 'کارت‌های بیمه‌نامه', 'عملیات اصلی', 'تراکنش‌های اخیر'] }, { n: '۰۶', title: 'بازخرید', eyebrow: 'خروج پول', blocks: ['مبلغ قابل‌برداشت', 'ورودی بازخرید', 'وابستگی حساب بانکی', 'مرور / حالت انتظار'] }]
  },
  decisions: {
    kicker: '۰۷ · تصمیم‌های تجربه کاربر', title: 'منطق طراحی از نگاه امروز',
    intro: 'منطق زیر از الگوهای قابل‌مشاهده رابط و ساختار مسیرها استنباط شده و به‌عنوان مستند هم‌زمان با پروژه ارائه نمی‌شود.',
    items: [['نمایش الزام‌ها در زمان نیاز', 'الزامات هویتی، پستی و بانکی در مسیرهای مرحله‌ای قرار گرفته‌اند تا بار ذهنی هم‌زمان کاهش پیدا کند.'], ['تمایز محصول بدون تکه‌تکه‌کردن تجربه', 'رز و افران هویت جدا دارند، اما از منطق مشترک ناوبری، خرید، بازخورد و سبد استفاده می‌کنند.'], ['حفاظت از سلسله‌مراتب مالی', 'موجودی، مبلغ، وضعیت بیمه‌نامه و عملیات اصلی در صفحه کوچک نسبت به توضیحات فرعی اولویت دارند.'], ['بازخرید سنجیده و مرحله‌ای', 'درخواست مرحله‌ای، وابستگی حساب بانکی، تأیید و وضعیت انتظار، ابهام خروج پول را کم می‌کنند.'], ['حفظ کار در همان زمینه', 'دراورها کارهای محدود و اطلاعات بیشتر را بدون خروج غیرضروری از صفحه فعلی در دسترس می‌گذارند.'], ['بازخورد به‌عنوان بخشی از مسیر', 'اعتبارسنجی، بارگذاری، هشدار، خطا، موفقیت و انتظار مشخص می‌کنند سیستم چه می‌خواهد و قدم بعدی چیست.']]
  },
  finalUi: { kicker: '۰۸ · رابط نهایی', title: 'روایت تصویری، آماده برای محصول واقعی', intro: 'روایت رابط نهایی تصویرمحور خواهد بود. تا زمان دریافت دارایی‌های واقعی محصول، هر جایگاه عمداً خالی می‌ماند.' },
  interaction: { kicker: '۰۹ · طراحی تعامل', title: 'عمق تجربه میان صفحه‌ها شکل می‌گیرد', intro: 'مدل حالت پیاده‌شده محصول فراتر از یک مسیر خوش‌بینانه خطی است. برای هر تعامل زیر، پس از دریافت رسانه منبع، جای ویدئوی کوتاه آماده شده است.', items: ['رمز یک‌بارمصرف و پیشرفت شروع', 'کاروسل طرح‌ها و انتخاب محصول', 'اعتبارسنجی فرم و تقویم فارسی', 'دراورهای زمینه‌ای و عملیات چسبان', 'فیلتر تراکنش و نمایش موجودی', 'حالت‌های خرید، واریز و بازخرید دومرحله‌ای', 'بازخورد بارگذاری، خطا، موفقیت و انتظار'] },
  system: { kicker: '۱۰ · سیستم رابط', title: 'الگوهای قابل‌استفاده مجدد', intro: 'رابط نهایی مجموعه‌ای از الگوهای تکرارشونده را نشان می‌دهد. این عنوان به‌معنای ادعای وجود فرایند رسمی دیزاین سیستم در پروژه اصلی نیست.', items: [['تایپ و اعداد', 'ریتم خواندن فارسی، برچسب‌های مالی فشرده و مقادیر برجسته.'], ['فاصله‌گذاری', 'مقیاسی فشرده برای موبایل با جداسازی روشن مراحل کار.'], ['سطوح و شعاع‌ها', 'بخش‌ها، کارت‌ها و دراورها برای سازمان‌دهی عمق زمینه‌ای.'], ['کنترل‌ها', 'ورودی، انتخاب، فیلتر، عملیات چسبان و الگوهای بازخورد.'], ['تم محصول', 'رنگ‌مایه‌های رز و افران برای تمایز درون یک سیستم واحد.'], ['رفتار راست‌به‌چپ', 'ناوبری، فراداده، پول، تاریخ و حرکت آیکن‌ها بر اساس جهت.']] },
  states: { kicker: '۱۱ · حالت‌های مرزی', title: 'اعتماد، بیرون از مسیر ایده‌آل', intro: 'پوشش حالت‌ها مهم است، چون پول، هویت و پرداخت بیرونی می‌توانند با تأخیر، نقص یا وقفه روبه‌رو شوند. تجربه بالغ، وضعیت سیستم و راه بازیابی را روشن می‌کند؛ بدون آنکه ادعای آزمون کاربر داشته باشیم.', items: ['بارگذاری', 'اسکلت', 'خالی', 'خطای اعتبارسنجی', 'خطای شبکه', 'هشدار', 'موفقیت', 'در انتظار پرداخت'] },
  review: { kicker: '۱۲ · ارزیابی گذشته‌نگر تجربه', title: 'جمع‌بندی کوتاه تجربه نهایی', caption: 'تحلیل گذشته‌نگر', columns: [{ title: 'نقاط قوت', items: ['کامل‌بودن مسیرهای سرتاسری', 'افشای تدریجی', 'عمق حالت‌ها', 'تمایز محصول', 'سلسله‌مراتب مالی'] }, { title: 'فرصت‌ها', items: ['کاهش تراکم اطلاعات مالی', 'خواناترکردن متن‌های ثانویه', 'یکپارچگی رنگ‌مایه‌ها', 'سامان‌دهی تنوع کارت و سطح'] }, { title: 'ریسک‌ها', items: ['الزامات می‌توانند شتاب مسیر را قطع کنند', 'پرداخت بیرونی پیوستگی تجربه را می‌شکند', 'مقادیر فشرده راست‌به‌چپ به آزمون دستگاه نیاز دارند'] }] },
  evidence: { title: 'دفتر شواهد', summary: 'اطمینان هر ادعا در ساختار صفحه قابل‌ردیابی است، بدون آنکه تجربه مطالعه با برچسب‌های پی‌درپی شلوغ شود.', claims: <EvidenceClaim[]>[{ status: 'FACT', claim: 'دامنه محصول، مسیرها، محصولات، گردش‌کارها و حالت‌های درج‌شده در بریف تأییدشده.' }, { status: 'RECONSTRUCTED', claim: 'چالش طراحی، معماری، مسیرها، وایرفریم‌ها و منطق گذشته‌نگر بر پایه ساختار محصول نهایی.' }, { status: 'TODO', claim: 'نقش، زمان‌بندی، تیم، مسئولیت‌ها، تحقیق، اعتبارسنجی، نتایج و رسانه نهایی در انتظار تأیید هستند.' }] },
  media: <MediaRequirement[]>[
    { asset: 'ترکیب اصلی', ratio: '16:9', recommendation: 'نمایی یکپارچه از مسیر خانه، خرید و سبد که ساختار محصول و ارتباط مراحل را در یک نگاه نشان می‌دهد.', section: 'هدر', caption: 'چیدمان چنددستگاهی، سلسله‌مراتب اطلاعات و نقاط کلیدی تصمیم‌گیری را بدون جزئیات اضافی برجسته می‌کند.' },
    { asset: 'توالی شروع', ratio: '3:2', recommendation: 'سه صفحه واقعی: ورود شماره، رمز یک‌بارمصرف و پیشرفت شروع.', section: 'رابط نهایی' },
    { asset: 'خانه و کشف', ratio: '4:3', recommendation: 'خانه در کنار حالت کشف یا مقایسه رز و افران.', section: 'رابط نهایی' },
    { asset: 'توالی خرید', ratio: '16:10', recommendation: 'مبلغ، هویت و الزامات، تأیید و حالت انتظار پرداخت.', section: 'رابط نهایی' },
    { asset: 'سبد و بیمه‌نامه', ratio: '3:2', recommendation: 'نمای کلی سبد در کنار جزئیات بیمه‌نامه فعال.', section: 'رابط نهایی' },
    { asset: 'واریز و بازخرید', ratio: '16:10', recommendation: 'دو توالی دستگاه برای ورود و خروج پول.', section: 'رابط نهایی' },
    { asset: 'پروفایل و بانک', ratio: '4:3', recommendation: 'پروفایل، مدیریت حساب بانکی و تاریخچه تراکنش.', section: 'رابط نهایی' },
    { asset: 'حالت‌های سیستم', ratio: '3:2', recommendation: 'شبکه‌ای برچسب‌دار از بارگذاری، خالی، خطا، هشدار، موفقیت و انتظار پرداخت.', section: 'حالت‌های مرزی' },
    { asset: 'ویدئوی تعامل', ratio: '9:16', recommendation: 'ضبط کوتاه انتخاب طرح تا ورود مبلغ و اعتبارسنجی.', section: 'تعامل', caption: '۸ تا ۱۲ ثانیه، بدون نشانگر، با ریتم طبیعی موبایل.' },
    { asset: 'ویدئوی بازخرید', ratio: '9:16', recommendation: 'ضبط کوتاه بازخرید دومرحله‌ای و بازخورد انتظار.', section: 'تعامل', caption: '۸ تا ۱۲ ثانیه، در صورت وجود وابستگی حساب بانکی نمایش داده شود.' }
  ]
}

export const toranjSarmadContent = { en, fa }
