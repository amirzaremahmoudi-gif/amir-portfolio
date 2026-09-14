const en = {
  reconstructed: 'Reconstructed for case-study documentation',
  hero: {
    title: 'Toranj Capital Website Redesign',
    summary: 'Restructuring the website so people can find the right investment product or financial service faster',
    meta: [['Role', 'Product Designer'], ['Timeline', '5 months'], ['Team', 'Product Designer, Product Manager, Front-end Developer, Back-end Developer'], ['Status', 'Awaiting launch']]
  },
  outline: ['Context / challenge', 'My role', 'Before / After', 'Experience architecture', 'Homepage as service discovery', 'Investment product architecture', 'Portfolio management', 'Institutional financial services', 'Risk Assessment redesign', 'Reconstructed wireframes', 'Key UX decisions', 'Final UI', 'Responsive design', 'Light / Dark system', 'Design system', 'Accessibility', 'Retrospective', 'What I would improve today', 'Outcomes', 'Learnings'],
  sections: {
    overview: ['Four financial needs, one website', 'I brought investing, portfolio management, business services and risk assessment into one website structure.', 'The redesign is waiting to launch, so this case study focuses on the work delivered rather than unverified product or business results.'],
    context: ['A broad set of services was hard to scan', 'Toranj Capital serves retail investors, portfolio-management clients, issuers and companies looking for financing.', 'The previous website did not make these different services easy to find. The redesign gave each audience a clearer starting point and updated the visual system.'],
    role: ['From site structure to working prototype', 'My responsibilities:', 'Information architecture', 'User flows', 'UX design', 'UI design', 'Design system', 'Responsive design', 'Prototyping', 'Risk Assessment UX redesign', 'Risk Assessment logic redesign'],
    challenge: ['Give each audience a clear path', 'A retail investor, an issuer and a company seeking finance come to the website with very different goals.', 'I needed to give each group a clear route without making the website feel like a collection of unrelated services.'],
    beforeAfter: ['What changed in the redesign', 'This comparison shows visible changes in the page structure. It does not claim measured improvements in usability or business performance.'],
    architecture: ['Organized around what people need', 'The homepage starts with two broad choices: invest money or use a financial service.'],
    home: ['Show the full offer earlier', 'The homepage introduces five service groups and names the audience for each one. Visitors no longer need to know a product name before they can start.', 'This is a design rationale, not a tested result.'],
    product: ['Put the facts needed for a decision first', 'Risk, performance and key product facts appear before educational and supporting content.'],
    portfolio: ['Start with the client’s goal', 'Clients choose their goal first, review a suggested portfolio type, complete risk assessment and then request a consultation.'],
    institutional: ['Reuse the structure, keep the services distinct', 'Financing and market-making pages share navigation and content patterns, while keeping their own methods, evidence and request forms.'],
    risk: ['A step-by-step risk assessment', 'The assessment guides people from the required information to a relevant recommendation in five focused steps.', ''],
    wireframes: ['Define the structure before the visual design', 'I rebuilt these low-fidelity screens to document the page structure. They are not the original project wireframes.'],
    decisions: ['Key UX decisions'],
    finalUi: ['Key screens from the final design', 'The case study shows the screens that best explain the main journeys instead of listing every page.'],
    responsive: ['Keep the same priorities on desktop and mobile', 'On mobile, important content moves up, side columns become stacked sections and the main action stays easy to reach.', 'The tablet homepage is still limited to about 412px and leaves too much empty space. This remains an open issue.'],
    theme: ['Light and Dark within one system', 'Light and Dark modes use the same shared tokens, while each product keeps its own accent colour.', ''],
    system: ['One interface system across the website', 'Typography, colours and common components stay consistent, while each product keeps its own accent colour.', ''],
    accessibility: ['What was checked, and what still needs testing'],
    retrospective: ['The structure is ready; validation is not finished', 'The redesign now gives retail investing, portfolio management, business services and risk assessment a clear place in the website.', 'The available evidence shows the design work and system consistency. Usability, accessibility and business impact still need to be tested after launch.'],
    improve: ['What I would improve today'],
    outcomes: ['Waiting to launch', 'There are no verified product or business metrics yet.', 'The delivered work includes the website structure, page templates, responsive layouts, shared components and the redesigned risk assessment.'],
    learnings: ['What I learned from the project']
  },
  comparisons: [
    ['Homepage', 'Promotional banner and story-style shortcuts precede much of the institutional and service content.', 'The hero establishes proposition and trust, followed by audience-labelled service discovery.', 'before-2026-09-09-home-desktop.png', '01-home-desktop.png'],
    ['Investment product', 'Substantial product content exists, while promotional layers and large imagery compete with decision data.', 'Risk, underlying assets, key metrics, and actions appear first; education and supporting detail follow.', 'before-2026-09-09-product-sarv-desktop.png', '02-product.png'],
    ['Risk Assessment', 'An authentic older entry state is confirmed; the complete question and result flow has not yet been archived.', 'A focused five-step journey with revised UX structure and assessment logic.', 'before-2026-09-09-risk-entry-desktop.png', '06-risk.png']
  ],
  labels: { previous: 'Previous website', after: 'Redesign', study: 'In this study', strengths: 'Existing strengths', needs: 'Remaining validation needs', tablet: 'Tablet retrospective', noWcag: 'No WCAG compliance claim is made.', additionalFlows: 'Additional reconstructed flows: issuer market making and venture capital.', heroMedia: 'Awaiting-launch homepage', heroRecommendation: 'Use the approved homepage as the opening editorial visual', selectedUi: 'Selected UI screens', tabletRecommendation: 'Show the unused margins and width constraint honestly', light: 'Light mode', dark: 'Dark mode', lightRecommendation: 'Matched homepage crop and theme control', darkRecommendation: 'Matched homepage crop and financial hierarchy' },
  architecture: [
    ['Home', 'Proposition and trust', 'Services by audience', 'Investment guidance', 'Fund discovery', 'Company context', 'News / contact'],
    ['Investment products', 'Fund discovery and comparison', 'Product template', 'Key facts and actions', 'Risk and underlying assets', 'Performance', 'Education', 'Allocation and suitability', 'Comparison and calculator', 'Documents and FAQs', 'Purchase / consultation'],
    ['Financial services', 'Bespoke portfolio management', 'Market making', 'Corporate financing', 'Venture capital'],
    ['Risk Assessment', 'Assessment questions', 'Scoring logic', 'Recommendation'],
    ['Company', 'About and method', 'Team', 'Credentials', 'Careers'],
    ['News and education', 'Editorial content'], ['Notices', 'Regulatory notices'], ['Contact', 'Contact access']
  ],
  productLayers: ['Key facts & actions', 'Risk & underlying assets', 'Performance & education', 'Allocation & suitability', 'Comparison & calculator', 'Documents, FAQs & purchase'],
  portfolioFlow: ['Choose objective', 'Review portfolio archetype', 'Complete Risk Assessment', 'Request consultation'],
  institutionalTemplate: ['Proposition', 'Guided pathfinder', 'Relevant method', 'Proof & process', 'FAQ', 'Request form'],
  riskModel: ['Inputs', 'Assessment dimensions', 'Risk profile', 'Recommendation'],
  riskEvidence: ['Focused header with return-to-site action', 'Five-step progress indicator', 'Investment-amount input', 'Choice-based questions', 'Behavioral loss and liquidity-stress scenarios', 'Forward and back navigation'],
  flows: [
    ['Retail investment', 'Home', 'Fund discovery', 'Compare / filter', 'Product', 'Evaluate risk & performance', 'Documents or education', 'Buy or consult'],
    ['Portfolio management', 'Home', 'Portfolio service', 'Choose objective', 'Review archetype', 'Risk Assessment', 'Consultation'],
    ['Corporate financing', 'Services', 'Financing', 'Guided pathfinder', 'Relevant method', 'Process & trust', 'Request form'],
    ['Risk Assessment', 'Entry', 'Investment amount', 'Context questions', 'Behavioral scenarios', 'Scoring', 'Recommendation']
  ],
  wireframes: [
    ['Homepage discovery', 'Proposition + trust', 'Audience-labelled services', 'Investment guidance', 'Fund discovery'],
    ['Product anatomy', 'Key facts + actions', 'Risk + performance', 'Allocation + fit', 'Documents + purchase'],
    ['Portfolio selector', 'Objective selector', 'Suggested archetype', 'Evidence + process', 'Assessment + consult'],
    ['Institutional template', 'Proposition', 'Pathfinder', 'Method + proof', 'Process + form'],
    ['Risk Assessment', 'Progress', 'Question / input', 'Context guidance', 'Back + next'],
    ['Responsive reflow', 'Desktop grid', 'Fluid tablet', 'Mobile stack', 'Persistent priority action']
  ],
  decisions: [
    ['Organize around intent', 'Investment products and financial services form the primary architecture.'], ['Differentiate by audience', 'Retail, portfolio, issuer, business, and startup paths do not share one generic funnel.'], ['Progressive product hierarchy', 'Decision-critical information leads; education and documentation follow.'], ['Goal-led portfolio selection', 'Objectives connect users to relevant portfolio archetypes.'], ['Guided financing pathfinder', 'Businesses move toward a relevant financing method before the lead form.'], ['Focused assessment shell', 'Sequential assessment content is separated from the broader marketing shell.'], ['Task-specific actions', 'Buy, consult, request, explore, and begin assessment match the user’s task.'], ['Layer trust evidence', 'Documents, licences, process explanations, external sources, and contact access support confidence.']
  ],
  finalAssets: [['01-home-desktop.png', 'Homepage · desktop', 'Proposition, trust, and service discovery'], ['02-product.png', 'Investment product · desktop', 'Metrics, risk, chart, and actions'], ['03-portfolio.png', 'Portfolio management', 'Goal selector and portfolio archetype'], ['04-financing.png', 'Institutional service', 'Financing proposition and pathfinder'], ['06-risk.png', 'Risk Assessment', 'Progress, input, and navigation']],
  tokens: [['Primary', '#5FC970', 'Actions and emphasis'], ['Secondary', '#5C93D4', 'Supporting information'], ['Dark background', '#1C1C1C', 'Primary dark surface'], ['Light text', '#E2E8F0', 'Text on dark surfaces']],
  accessibility: {
    strengths: ['One H1 on each of nine audited redesign routes', 'No missing alt text among counted images', ':focus-visible rules', 'prefers-reduced-motion support', 'No horizontal overflow in the audited phone homepage', 'Semantic theme and status tokens'],
    needs: ['Controls below the recommended 44×44px target', 'Unnamed controls on Home, Product, and Risk', 'Phone links with only 26px visible height', 'Broken assets on Home, Product, and Risk', 'Weak tablet reflow', 'Small Risk input and navigation targets', 'Form-error and recovery behavior not documented', 'Screen-reader, keyboard, contrast, zoom, reflow, and error-state testing']
  },
  improvements: ['Replace the phone-only tablet state with a fluid intermediate grid.', 'Reduce dependence on separate desktop and mobile homepage documents.', 'Formalize responsive rules for charts, tables, and financial metrics.', 'Confirm sticky-action behavior at small heights and zoomed layouts.', 'Test navigation, forms, and Risk Assessment across keyboard, touch, and orientation changes.', 'Resolve broken assets and control labelling before final captures.'],
  learnings: ['Organize a broad financial institution around audience intent, not internal structure.', 'Related services can share a system without sharing the same conversion model.', 'Progressive disclosure can preserve readability without hiding decision-critical facts.', 'Responsive design needs a deliberate intermediate state—not only desktop and phone.', 'Transparent evidence boundaries make an awaiting-launch case study more credible.']
}

const fa = {
  ...en,
  reconstructed: 'بازسازی‌شده برای مستندسازی کیس‌استادی',
  hero: { title: 'بازطراحی وب‌سایت ترنج کپیتال', summary: 'بازطراحی ساختار سایت تا کاربران سریع‌تر صندوق یا خدمت مالی مناسب را پیدا کنند', meta: [['نقش', 'طراح محصول'], ['مدت پروژه', '۵ ماه'], ['تیم', 'طراح محصول، مدیر محصول و دو توسعه‌دهنده'], ['وضعیت', 'در انتظار انتشار']] },
  outline: ['زمینه و چالش', 'نقش من', 'قبل و بعد', 'معماری تجربه', 'صفحه اصلی و کشف خدمات', 'معماری محصول سرمایه‌گذاری', 'سبدگردانی', 'خدمات مالی سازمانی', 'بازطراحی سنجش ریسک', 'وایرفریم‌های بازسازی‌شده', 'تصمیم‌های کلیدی UX', 'رابط نهایی', 'طراحی واکنش‌گرا', 'سیستم روشن و تیره', 'سیستم طراحی', 'دسترس‌پذیری', 'ارزیابی بازنگرانه', 'آنچه امروز بهبود می‌دادم', 'نتیجه', 'آموخته‌ها'],
  sections: {
    overview: ['چهار نیاز مالی در یک وب‌سایت', 'سرمایه‌گذاری، سبدگردانی، خدمات کسب‌وکار و سنجش ریسک را در یک ساختار مشخص کنار هم قرار دادم.', 'این نسخه هنوز منتشر نشده است؛ بنابراین این کیس‌استادی روی خروجی طراحی تمرکز دارد، نه نتایج تأییدنشده محصول یا کسب‌وکار.'],
    context: ['پیدا کردن خدمات در سایت قبلی آسان نبود', 'ترنج کپیتال به سرمایه‌گذاران خرد، مشتریان سبدگردانی، ناشران و شرکت‌های متقاضی تأمین مالی خدمات می‌دهد.', 'در سایت قبلی مسیر این گروه‌ها از هم روشن نبود. در بازطراحی، برای هر مخاطب یک نقطه شروع مشخص ساختم و ظاهر سایت را هم به‌روز کردم.'],
    role: ['از ساختار سایت تا پروتوتایپ', 'مسئولیت‌های من:', 'معماری اطلاعات', 'جریان‌های کاربر', 'طراحی تجربه کاربر', 'طراحی رابط کاربری', 'دیزاین سیستم', 'طراحی واکنش‌گرا', 'پروتوتایپ', 'بازطراحی تجربه سنجش ریسک', 'بازطراحی منطق سنجش ریسک'],
    challenge: ['برای هر مخاطب یک مسیر مشخص', 'سرمایه‌گذار خرد، ناشر و شرکتی که دنبال تأمین مالی است، با هدف‌های متفاوتی وارد سایت می‌شوند.', 'باید مسیر هر گروه را جدا می‌کردم، بدون اینکه سایت شبیه مجموعه‌ای از خدمات بی‌ارتباط شود.'],
    beforeAfter: ['چه چیزی در بازطراحی تغییر کرد', 'این مقایسه تغییرات قابل‌مشاهده در ساختار صفحات را نشان می‌دهد و ادعایی درباره بهبود اندازه‌گیری‌شده ندارد.'],
    architecture: ['ساختار براساس نیاز کاربر', 'صفحه اصلی با دو انتخاب شروع می‌شود: سرمایه‌گذاری یا استفاده از خدمات مالی.'],
    home: ['نمایش زودتر همه خدمات', 'پنج گروه خدمت در همان ابتدای صفحه و با نام مخاطب معرفی می‌شوند. در نتیجه کاربر برای شروع لازم نیست نام یک محصول را از قبل بداند.', 'این منطق طراحی است و هنوز با کاربر آزموده نشده است.'],
    product: ['اطلاعات مهم قبل از جزئیات', 'ریسک، عملکرد و مشخصات اصلی محصول قبل از آموزش و جزئیات تکمیلی نمایش داده می‌شوند.'],
    portfolio: ['شروع از هدف مشتری', 'کاربر ابتدا هدفش را انتخاب می‌کند، نوع سبد پیشنهادی را می‌بیند، سنجش ریسک را انجام می‌دهد و بعد برای مشاوره درخواست می‌دهد.'],
    institutional: ['ساختار مشترک، محتوای مخصوص هر خدمت', 'صفحات تأمین مالی و بازارگردانی ناوبری و الگوی محتوای مشترک دارند، اما روش کار، شواهد و فرم درخواست هرکدام جداست.'],
    risk: ['سنجش ریسک در پنج مرحله', 'کاربر قدم‌به‌قدم اطلاعات لازم را وارد می‌کند و در پایان پیشنهاد متناسب را می‌بیند.', ''],
    wireframes: ['اول ساختار، بعد ظاهر', 'این وایرفریم‌ها را برای توضیح ساختار صفحات بازسازی کردم و وایرفریم‌های اولیه پروژه نیستند.'], decisions: ['تصمیم‌های مهم طراحی'],
    finalUi: ['صفحه‌های اصلی طراحی نهایی', ''],
    responsive: ['حفظ اولویت‌ها در دسکتاپ و موبایل', 'در موبایل، محتوای مهم بالاتر می‌آید، ستون‌های کناری به بخش‌های پشت‌سرهم تبدیل می‌شوند و اقدام اصلی در دسترس می‌ماند.', 'نسخه تبلت هنوز به عرض حدود ۴۱۲ پیکسل محدود است و فضای خالی زیادی دارد. این مشکل هنوز باید اصلاح شود.'],
    theme: ['حالت روشن و تیره در یک سیستم', 'حالت روشن و تیره از توکن‌های مشترک استفاده می‌کنند و رنگ اختصاصی هر محصول روی همین پایه قرار می‌گیرد.', ''],
    system: ['یک سیستم رابط برای همه صفحات', 'تایپوگرافی، رنگ‌ها و اجزای مشترک در همه صفحات ثابت‌اند و هر محصول رنگ مخصوص خودش را دارد.', ''],
    accessibility: ['چه چیزهایی بررسی شد و چه چیزهایی باقی مانده'],
    retrospective: ['ساختار آماده است؛ آزمون هنوز کامل نیست', 'در ساختار جدید، سرمایه‌گذاری، سبدگردانی، خدمات کسب‌وکار و سنجش ریسک جای مشخصی دارند.', 'شواهد فعلی کیفیت طراحی و هماهنگی سیستم را نشان می‌دهند. کاربردپذیری، دسترس‌پذیری و اثر کسب‌وکار باید پس از انتشار سنجیده شوند.'],
    improve: ['اگر امروز دوباره طراحی می‌کردم'], outcomes: ['در انتظار انتشار', 'هنوز شاخص تأییدشده‌ای از محصول یا کسب‌وکار نداریم.', 'خروجی پروژه شامل ساختار سایت، قالب صفحات، نسخه‌های واکنش‌گرا، اجزای مشترک و سنجش ریسک بازطراحی‌شده است.'], learnings: ['چیزهایی که از پروژه یاد گرفتم']
  },
  comparisons: [
    ['صفحه اصلی', 'بنرهای تبلیغاتی و میان‌برها قبل از معرفی بخش زیادی از خدمات دیده می‌شدند.', 'نسخه جدید ابتدا کار ترنج کپیتال را توضیح می‌دهد و بعد خدمات را برای هر گروه از کاربران معرفی می‌کند.', 'before-2026-09-09-home-desktop.png', '01-home-desktop.png'],
    ['محصول سرمایه‌گذاری', 'اطلاعات محصول کامل بود، اما تصاویر بزرگ و تبلیغات توجه را از اعداد مهم می‌گرفتند.', 'ریسک، دارایی پایه، شاخص‌های اصلی و اقدام‌ها زودتر دیده می‌شوند.', 'before-2026-09-09-product-sarv-desktop.png', '02-product.png'],
    ['سنجش ریسک', 'ورودی معتبر نسخه پیشین تأیید شده، اما جریان کامل پرسش‌ها و نتیجه هنوز آرشیو نشده است.', 'مسیر متمرکز پنج‌مرحله‌ای با UX و منطق ارزیابی بازطراحی‌شده.', 'before-2026-09-09-risk-entry-desktop.png', '06-risk.png']
  ],
  labels: { previous: 'وب‌سایت پیشین', after: 'بازطراحی', study: 'در این مطالعه', strengths: 'نقاط قوت موجود', needs: 'نیازهای باقی‌مانده', tablet: 'بازنگری تبلت', noWcag: 'هیچ ادعایی درباره انطباق با WCAG مطرح نمی‌شود.', additionalFlows: 'جریان‌های بازسازی‌شده دیگر: بازارگردانی ناشر و سرمایه‌گذاری جسورانه.', heroMedia: 'صفحه اصلی در انتظار انتشار', heroRecommendation: 'نسخه تأییدشده صفحه اصلی به‌عنوان تصویر آغازین تحریریه‌ای استفاده شود', selectedUi: 'رابط کاربری', tabletRecommendation: 'فضای استفاده‌نشده و محدودیت عرض صادقانه نمایش داده شود', light: 'حالت روشن', dark: 'حالت تیره', lightRecommendation: 'برش همسان صفحه اصلی و کنترل تم', darkRecommendation: 'برش همسان صفحه اصلی و سلسله‌مراتب مالی' },
  architecture: [['خانه', 'گزاره ارزش و اعتماد', 'خدمات براساس مخاطب', 'راهنمای سرمایه‌گذاری', 'کشف صندوق', 'معرفی شرکت', 'خبر و تماس'], ['محصولات سرمایه‌گذاری', 'کشف و مقایسه صندوق', 'قالب صفحه محصول', 'اطلاعات اصلی و اقدام‌ها', 'ریسک و دارایی پایه', 'عملکرد', 'آموزش', 'ترکیب دارایی و تناسب', 'مقایسه و محاسبه‌گر', 'اسناد و پرسش‌ها', 'خرید یا مشاوره'], ['خدمات مالی', 'سبدگردانی اختصاصی', 'بازارگردانی', 'تأمین مالی شرکتی', 'سرمایه‌گذاری جسورانه'], ['سنجش ریسک', 'پرسش‌های ارزیابی', 'منطق امتیازدهی', 'پیشنهاد'], ['شرکت', 'درباره و روش کار', 'تیم', 'اعتبارها', 'فرصت‌های شغلی'], ['خبر و آموزش', 'محتوای تحریریه'], ['اطلاعیه‌ها', 'اطلاعیه‌های قانونی'], ['تماس', 'راه‌های تماس']],
  productLayers: ['اطلاعات اصلی و اقدام', 'ریسک و دارایی پایه', 'عملکرد و آموزش', 'ترکیب و تناسب', 'مقایسه و محاسبه‌گر', 'اسناد، پرسش‌ها و خرید'], portfolioFlow: ['انتخاب هدف', 'مرور تیپ پیشنهادی سبد', 'تکمیل سنجش ریسک', 'درخواست مشاوره'], institutionalTemplate: ['گزاره خدمت', 'مسیر‌یاب هدایت‌شده', 'روش مرتبط', 'شواهد و فرایند', 'پرسش‌ها', 'فرم درخواست'], riskModel: ['ورودی‌ها', 'ابعاد ارزیابی', 'پروفایل ریسک', 'پیشنهاد'], riskEvidence: ['هدر متمرکز و بازگشت به سایت', 'نشانگر پیشرفت پنج‌مرحله‌ای', 'ورودی مبلغ سرمایه‌گذاری', 'پرسش‌های انتخابی', 'سناریوی زیان رفتاری و فشار نقدشوندگی', 'ناوبری رفت و برگشت'],
  flows: [['سرمایه‌گذاری خرد', 'خانه', 'کشف صندوق', 'مقایسه یا فیلتر', 'محصول', 'ریسک و عملکرد', 'اسناد یا آموزش', 'خرید یا مشاوره'], ['سبدگردانی', 'خانه', 'خدمت سبدگردانی', 'انتخاب هدف', 'مرور تیپ سبد', 'سنجش ریسک', 'مشاوره'], ['تأمین مالی شرکتی', 'خدمات', 'تأمین مالی', 'مسیر‌یاب', 'روش مرتبط', 'فرایند و اعتماد', 'فرم درخواست'], ['سنجش ریسک', 'ورود', 'مبلغ سرمایه‌گذاری', 'پرسش‌های زمینه‌ای', 'سناریوهای رفتاری', 'امتیازدهی', 'پیشنهاد']],
  wireframes: [['کشف در صفحه اصلی', 'گزاره ارزش و اعتماد', 'خدمات با برچسب مخاطب', 'راهنمای سرمایه‌گذاری', 'کشف صندوق'], ['آناتومی محصول', 'اطلاعات اصلی و اقدام', 'ریسک و عملکرد', 'ترکیب و تناسب', 'اسناد و خرید'], ['انتخاب‌گر سبد', 'انتخاب هدف', 'تیپ پیشنهادی', 'شواهد و فرایند', 'سنجش و مشاوره'], ['قالب خدمات سازمانی', 'گزاره خدمت', 'مسیر‌یاب', 'روش و شواهد', 'فرایند و فرم'], ['سنجش ریسک', 'پیشرفت', 'پرسش یا ورودی', 'راهنمای زمینه‌ای', 'قبلی و بعدی'], ['بازچینی واکنش‌گرا', 'گرید دسکتاپ', 'تبلت سیال', 'چیدمان موبایل', 'حفظ اقدام اصلی']],
  decisions: [['ساختار براساس نیاز', 'سرمایه‌گذاری و خدمات مالی دو مسیر اصلی سایت هستند.'], ['مسیر جدا برای هر مخاطب', 'سرمایه‌گذار، متقاضی سبدگردانی، ناشر و کسب‌وکار از یک مسیر عمومی عبور نمی‌کنند.'], ['نمایش تدریجی اطلاعات', 'اول اطلاعات لازم برای تصمیم‌گیری دیده می‌شود؛ آموزش و اسناد در ادامه می‌آیند.'], ['پیشنهاد سبد براساس هدف', 'هدف کاربر او را به نوع سبد مرتبط هدایت می‌کند.'], ['راهنمای انتخاب روش تأمین مالی', 'کسب‌وکار پیش از دیدن فرم، روش‌های مناسب تأمین مالی را بررسی می‌کند.'], ['تمرکز در سنجش ریسک', 'پرسش‌های سنجش ریسک از محتوای تبلیغاتی سایت جدا شده‌اند.'], ['اقدام مشخص برای هر صفحه', 'هر صفحه اقدام متناسب خودش را دارد: خرید، مشاوره، درخواست یا شروع سنجش.'], ['اطلاعات لازم برای اعتماد', 'مجوزها، روش کار، اسناد و راه تماس کنار تصمیم کاربر قرار گرفته‌اند.']],
  finalAssets: [['01-home-desktop.png', 'صفحه اصلی · دسکتاپ', 'گزاره ارزش، اعتماد و کشف خدمات'], ['02-product.png', 'محصول سرمایه‌گذاری · دسکتاپ', 'شاخص‌ها، ریسک، نمودار و اقدام‌ها'], ['03-portfolio.png', 'سبدگردانی', 'انتخاب هدف و تیپ پیشنهادی'], ['04-financing.png', 'خدمت سازمانی', 'گزاره تأمین مالی و مسیر‌یاب'], ['06-risk.png', 'سنجش ریسک', 'پیشرفت، ورودی و ناوبری']],
  tokens: [['اصلی', '#5FC970', 'اقدام‌ها و تأکید'], ['ثانویه', '#5C93D4', 'اطلاعات مکمل'], ['پس‌زمینه تیره', '#1C1C1C', 'سطح اصلی تیره'], ['متن روشن', '#E2E8F0', 'متن روی زمینه تیره']],
  accessibility: { strengths: ['یک H1 در هرکدام از ۹ مسیر بررسی‌شده', 'نبود alt خالی در تصاویر شمارش‌شده', 'قواعد :focus-visible', 'پشتیبانی prefers-reduced-motion', 'نبود سرریز افقی در صفحه اصلی موبایل بررسی‌شده', 'ساختار معنایی توکن‌های تم و وضعیت'], needs: ['کنترل‌های کوچک‌تر از اندازه پیشنهادی ۴۴×۴۴ پیکسل', 'کنترل‌های بدون نام در خانه، محصول و سنجش ریسک', 'لینک‌های موبایل با ارتفاع ۲۶ پیکسل', 'دارایی‌های خراب در خانه، محصول و سنجش ریسک', 'بازچینی ضعیف تبلت', 'ورودی و ناوبری کوچک سنجش ریسک', 'مستندنشدن خطا و بازیابی فرم', 'نیاز به تست Screen Reader، صفحه‌کلید، کنتراست، زوم، reflow و خطا'] },
  improvements: ['برای تبلت یک گرید میانی طراحی می‌کردم تا صفحه شبیه نسخه باریک موبایل نباشد.', 'وابستگی به فایل‌های جداگانه دسکتاپ و موبایل صفحه اصلی را کمتر می‌کردم.', 'برای نمودارها، جدول‌ها و اعداد مالی قواعد واکنش‌گرای دقیق‌تری می‌نوشتم.', 'رفتار دکمه ثابت را در ارتفاع کم و حالت بزرگ‌نمایی بررسی می‌کردم.', 'ناوبری، فرم‌ها و سنجش ریسک را با صفحه‌کلید، لمس و تغییر جهت دستگاه آزمایش می‌کردم.', 'قبل از ثبت تصاویر نهایی، فایل‌های خراب و کنترل‌های بدون نام را اصلاح می‌کردم.'],
  learnings: ['ساختار یک شرکت مالی باید براساس نیاز مخاطب باشد، نه چارت داخلی شرکت.', 'خدمات مرتبط می‌توانند اجزای مشترک داشته باشند، اما لازم نیست همه به یک فرم ختم شوند.', 'نمایش مرحله‌ای اطلاعات، صفحه را خلوت‌تر می‌کند بدون اینکه داده‌های مهم پنهان شوند.', 'طراحی واکنش‌گرا فقط نسخه دسکتاپ و موبایل نیست؛ تبلت هم به تصمیم جداگانه نیاز دارد.', 'وقتی پروژه هنوز منتشر نشده، جدا کردن واقعیت‌ها از فرض‌ها روایت را قابل‌اعتمادتر می‌کند.']
}

export const toranjCapitalRedesignContent = { en, fa }
