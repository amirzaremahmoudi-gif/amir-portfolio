export type RamzinexLocale = 'fa' | 'en'

export interface RamzinexChapter {
  id: string
  label: string
  title: string
  summary: string
  decision: string
  desktop: string
  mobile: string
  desktopAlt: string
  mobileAlt: string
}

const fa = {
  hero: {
    eyebrow: 'کیس‌استادی طراحی محصول · رمزینکس',
    title: 'بازطراحی معامله، تحلیل بازار\nو مجله رمزینکس',
    summary: 'بازطراحی چند بخش اصلی رمزینکس؛ از صفحه معامله و تحلیل بازار تا مجله و یک کمپین جذب کاربر.',
    note: 'این روایت براساس خروجی‌های موجود نوشته شده و با اضافه‌شدن داده‌های تأییدشده کامل‌تر می‌شود.',
    cover: '/images/case-studies/ramzinex/cover-market-ecosystem.png',
    coverAlt: 'نمای دسکتاپ و موبایل تجربه معامله رمزینکس در فضای بازار دارایی دیجیتال'
  },
  meta: [
    ['نقش', 'طراح UI/UX و محصول'],
    ['پلتفرم', 'وب واکنش‌گرا'],
    ['حوزه', 'فین‌تک · رمزارز'],
    ['محدوده', 'معامله، تحلیل، مجله و کمپین']
  ],
  outline: ['نمای کلی', 'چارچوب UX', 'شواهد طراحی', 'اکوسیستم محتوا', 'کمپین', 'واکنش‌گرایی', 'سیستم رابط', 'اعتبارسنجی'],
  overview: {
    kicker: 'نمای کلی',
    title: 'چهار بخش با یک ساختار مشترک',
    lead: 'صفحات معامله، تحلیل، مجله و کمپین هدف‌های متفاوتی دارند، اما از قواعد بصری و تعاملی مشترک استفاده می‌کنند.',
    scopes: [
      ['01', 'خرید و فروش', 'نمایش قیمت، ریسک، نمودار و دکمه خرید در یک صفحه.'],
      ['02', 'تحلیل بازار', 'قرار دادن نمودار، داده و تحلیل متنی و صوتی در یک مسیر قابل‌پیمایش.'],
      ['03', 'مجله رمزینکس', 'ساختن مسیر مشخص از پیدا کردن موضوع تا خواندن مقاله‌های مرتبط.'],
      ['04', 'کمپین جذب', 'توضیح ساده مراحل ثبت‌نام، دعوت دوستان و دریافت پاداش.']
    ]
  },
  logic: {
    kicker: 'چارچوب UX',
    title: 'اطلاعات مهم نزدیک به اقدام اصلی',
    lead: 'در هر صفحه ابتدا اطلاعات لازم برای تصمیم‌گیری دیده می‌شود؛ جزئیات و محتوای آموزشی بعد از آن می‌آیند.',
    note: 'این توضیح براساس خروجی‌های فعلی نوشته شده و بعد از بررسی مستندات تحقیق به‌روز می‌شود.',
    needs: [
      ['کاربر تازه‌وارد', 'فهم دارایی، ریسک و قدم بعدی بدون پیچیدگی اضافی.'],
      ['کاربر تصمیم‌گیر', 'دیدن قیمت، نمودار و اقدام در یک نمای قابل مقایسه.'],
      ['کاربر محتوامحور', 'حرکت روان میان خبر، تحلیل، آموزش و رسانه.']
    ],
    tensions: [
      ['تراکم در برابر وضوح', 'داده کافی، بدون شلوغ‌کردن صفحه.'],
      ['آموزش در برابر اقدام', 'توضیح نزدیک تصمیم، بدون دورکردن اقدام اصلی.'],
      ['یکپارچگی در برابر تنوع', 'یک زبان مشترک برای مسیرهای متفاوت.']
    ],
    steps: [
      ['کشف', 'موضوع، دارایی یا فرصت سریع قابل تشخیص است.'],
      ['ارزیابی', 'داده‌های لازم برای فهم وضعیت کنار هم قرار می‌گیرند.'],
      ['تصمیم', 'اقدام اصلی در همان زمینه و بدون گسست ارائه می‌شود.'],
      ['ادامه', 'آموزش، تحلیل مرتبط و پرسش‌های رایج مسیر را کامل می‌کنند.']
    ]
  },
  chapters: [
    {
      id: 'trade',
      label: 'خرید و فروش',
      title: 'اطلاعات لازم برای خرید در یک صفحه',
      summary: 'قیمت، تغییرات بازار، نمودار، مشخصات دارایی، ریسک و مسیر خرید در یک صفحه قرار گرفتند.',
      decision: 'در موبایل، نمودار و دکمه خرید قبل از جزئیات دیده می‌شوند و ستون‌های کناری به بخش‌های پشت‌سرهم تبدیل می‌شوند.',
      desktop: '/images/case-studies/ramzinex/desktop-trade.png',
      mobile: '/images/case-studies/ramzinex/mobile-trade.png',
      desktopAlt: 'طراحی دسکتاپ صفحه خرید و فروش و جزئیات بیت‌کوین رمزینکس',
      mobileAlt: 'طراحی موبایل صفحه خرید و فروش و جزئیات بیت‌کوین رمزینکس'
    },
    {
      id: 'analysis',
      label: 'تحلیل بازار',
      title: 'تحلیل کامل، با دسترسی سریع به اقدام',
      summary: 'نمودار تکنیکال، خلاصه شاخص‌ها، تحلیل نوشتاری، جدول داده، صوت و محتوای مرتبط در یک ساختار قابل پیمایش ترکیب شدند.',
      decision: 'در موبایل، توالی محتوا از مشاهده نمودار به قیمت و سپس تحلیل می‌رسد؛ عناصر جانبی نیز در همان زمینه و نزدیک به نقطه نیاز ظاهر می‌شوند.',
      desktop: '/images/case-studies/ramzinex/desktop-analysis.png',
      mobile: '/images/case-studies/ramzinex/mobile-analysis.png',
      desktopAlt: 'طراحی دسکتاپ صفحه تحلیل تکنیکال رمزینکس',
      mobileAlt: 'طراحی موبایل صفحه تحلیل تکنیکال رمزینکس'
    },
    {
      id: 'content',
      label: 'مجله',
      title: 'مسیر مشخص از پیدا کردن موضوع تا خواندن مقاله',
      summary: 'صفحه اصلی مجله، دسته‌بندی‌ها و صفحه مقاله از الگوهای مشترک استفاده می‌کنند تا ادامه مسیر برای کاربر روشن باشد.',
      decision: 'تنوع فرمت—مقاله، تحلیل، ویدئو و صوت—با سلسله‌مراتب مشترک نمایش داده می‌شود؛ در موبایل، کاروسل‌ها و کارت‌های افقی تراکم را کنترل می‌کنند.',
      desktop: '/images/case-studies/ramzinex/desktop-blog-home.png',
      mobile: '/images/case-studies/ramzinex/mobile-blog-home.png',
      desktopAlt: 'طراحی دسکتاپ صفحه اصلی مجله رمزینکس',
      mobileAlt: 'طراحی موبایل صفحه اصلی مجله رمزینکس'
    },
    {
      id: 'campaign',
      label: 'کمپین',
      title: 'تبدیل پیام تبلیغاتی به یک مسیر قابل‌فهم',
      summary: 'صفحه «اولین هدیه» مزایا، مراحل دریافت پاداش، درآمد دعوت و دکمه ثبت‌نام را به‌ترتیب توضیح می‌دهد.',
      decision: 'در موبایل، پیام و دکمه ثبت‌نام ابتدا دیده می‌شوند؛ سپس مراحل و پاداش‌ها می‌آیند.',
      desktop: '/images/case-studies/ramzinex/desktop-campaign.png',
      mobile: '/images/case-studies/ramzinex/mobile-campaign.png',
      desktopAlt: 'طراحی دسکتاپ کمپین ثبت‌نام و اولین هدیه رمزینکس',
      mobileAlt: 'طراحی موبایل کمپین ثبت‌نام و اولین هدیه رمزینکس'
    }
  ] satisfies RamzinexChapter[],
  contentSystem: {
    kicker: 'اکوسیستم محتوا',
    title: 'از پیدا کردن موضوع تا ادامه مطالعه',
    lead: 'صفحه اصلی برای پیدا کردن محتواست، صفحه دسته‌بندی مرور را سریع‌تر می‌کند و صفحه مقاله راه ادامه را نشان می‌دهد.',
    cards: [
      ['صفحه اصلی مجله', 'ترکیب محتوای شاخص، تحلیل، ویدئو، صوت و دسته‌بندی‌های مختلف.'],
      ['صفحه دسته‌بندی', 'مرتب‌سازی و مرور سریع با کارتی که اطلاعات لازم را بدون شلوغی منتقل می‌کند.'],
      ['جزئیات مقاله', 'خوانایی متن بلند همراه با رسانه، جدول، صوت، FAQ و پیشنهادهای مرتبط.']
    ]
  },
  responsive: {
    kicker: 'واکنش‌گرایی',
    title: 'موبایل فقط نسخه کوچک دسکتاپ نیست',
    lead: 'در موبایل، سایدبارها وارد جریان محتوا می‌شوند، کارت‌ها برای لمس مناسب‌اند و اقدام اصلی نزدیک اطلاعات مربوط به خودش می‌ماند.',
    rules: [
      ['ستون‌ها به توالی تبدیل می‌شوند', 'اهمیت محتوا، ترتیب نمایش در موبایل را تعیین می‌کند.'],
      ['تراکم کنترل می‌شود', 'کاروسل و کارت افقی از طول و شلوغی بی‌دلیل جلوگیری می‌کنند.'],
      ['اقدام نزدیک می‌ماند', 'خرید، ثبت‌نام یا ادامه مطالعه از زمینه خود جدا نمی‌شود.'],
      ['قالب‌ها منسجم می‌مانند', 'الگوهای مشترک در همه عرض‌ها هویت سیستم را حفظ می‌کنند.']
    ]
  },
  system: {
    kicker: 'سیستم رابط',
    title: 'رنگ و تایپوگرافی مشترک در همه بخش‌ها',
    lead: 'زرد برای اقدام‌ها و تأکید است؛ رنگ خنثی برای متن و پس‌زمینه. این ترکیب در همه بخش‌ها ثابت می‌ماند.',
    primaryLabel: 'رنگ اصلی · اقدام‌ها',
    secondaryLabel: 'رنگ دوم · پس‌زمینه',
    primaryColor: '#FFC117',
    secondaryColor: '#1C1F21',
    typographyLabel: 'Typography · Dana',
    typographyText: 'فونت دانا، متن‌های ریز تا تیترهای اصلی را یکپارچه و خوانا نگه می‌دارد.',
    typographyWeights: ['Regular', 'Medium', 'Bold', 'Black']
  },
  validation: {
    kicker: 'اعتبارسنجی و دسترس‌پذیری',
    title: 'چه چیزهایی هنوز باید آزموده شوند',
    lead: 'برای سنجش نتیجه، این چهار مورد باید با کاربران و داده‌های واقعی محصول بررسی شوند.',
    checks: [
      ['یافتن اقدام اصلی', 'زمان و موفقیت کاربران در پیدا کردن خرید، تحلیل یا ثبت‌نام.'],
      ['درک اطلاعات', 'درک قیمت، ریسک و تفاوت داده‌های اصلی پس از دیدن صفحه.'],
      ['پیمایش محتوای بلند', 'سرعت یافتن بخش موردنظر و ادامه مسیر بین محتوای مرتبط.'],
      ['دسترس‌پذیری', 'کنتراست، فوکوس، نام کنترل‌ها، اهداف لمسی، زوم و بازچینی متن.']
    ]
  },
  labels: {
    evidence: 'برخی صفحات رابط کاربری', desktop: 'دسکتاپ', mobile: 'موبایل', open: 'مشاهده تصویر کامل', close: 'بستن تصویر', select: 'انتخاب فصل', designDecision: 'تصمیم طراحی', extraScreens: 'قالب‌های مکمل مجله', currentDraft: 'نسخه قابل ویرایش'
  }
}

const en: typeof fa = {
  hero: {
    eyebrow: 'Product design case study · Ramzinex',
    title: 'Redesigning trading, market analysis\nand Ramzinex Magazine',
    summary: 'Redesigning key parts of Ramzinex, from trading and market analysis to the magazine and an acquisition campaign.',
    note: 'This story is based on the work currently available and will be updated when more verified results are added.',
    cover: '/images/case-studies/ramzinex/cover-market-ecosystem.png',
    coverAlt: 'Desktop and mobile views of the Ramzinex trading experience in a digital-asset market setting'
  },
  meta: [['Role', 'UI/UX & Product Designer'], ['Platform', 'Responsive web'], ['Industry', 'Fintech · Crypto'], ['Scope', 'Trading, analysis, editorial and campaign']],
  outline: ['Overview', 'UX framework', 'Design evidence', 'Content ecosystem', 'Campaign', 'Responsive system', 'Interface system', 'Validation'],
  overview: {
    kicker: 'Overview', title: 'Four areas with one shared structure',
    lead: 'Trading, analysis, editorial and campaign pages serve different goals but use the same visual and interaction rules.',
    scopes: [['01', 'Trading', 'Show price, risk, chart and purchase action on one page.'], ['02', 'Market analysis', 'Place charts, data, written analysis and audio in a journey that is easy to scan.'], ['03', 'Ramzinex Magazine', 'Create a clear path from finding a topic to reading related articles.'], ['04', 'Acquisition campaign', 'Explain registration, referrals and rewards in simple steps.']]
  },
  logic: {
    kicker: 'UX framework', title: 'Important information stays close to the main action',
    lead: 'Each page shows the information needed for a decision first, then adds detail and supporting content.',
    note: 'This explanation is based on the current design work and will be updated after the research documentation is reviewed.',
    needs: [['Newcomer', 'Understand the asset, risk and next step without extra complexity.'], ['Decision maker', 'See price, chart and action in one comparable view.'], ['Content-led user', 'Move smoothly across news, analysis, education and media.']],
    tensions: [['Density vs clarity', 'Enough data without a noisy interface.'], ['Education vs action', 'Helpful context without delaying the main action.'], ['Consistency vs variety', 'One shared language for different journeys.']],
    steps: [['Discover', 'The topic, asset or opportunity is quickly recognizable.'], ['Evaluate', 'The information needed to understand the situation is grouped together.'], ['Decide', 'The primary action appears in context and without interruption.'], ['Continue', 'Education, related analysis and FAQs complete the journey.']]
  },
  chapters: [
    { id: 'trade', label: 'Trading', title: 'Everything needed to buy on the asset page', summary: 'Price, market movement, chart, asset facts, risk and the buying path sit on one page.', decision: 'On mobile, the chart and purchase action appear before supporting details, while side columns become stacked sections.', desktop: '/images/case-studies/ramzinex/desktop-trade.png', mobile: '/images/case-studies/ramzinex/mobile-trade.png', desktopAlt: 'Desktop design for Ramzinex Bitcoin trading and asset detail page', mobileAlt: 'Mobile design for Ramzinex Bitcoin trading and asset detail page' },
    { id: 'analysis', label: 'Analysis', title: 'Deep analysis without losing the action path', summary: 'Technical charting, indicator summaries, written analysis, data tables, audio and related content are combined in one navigable structure.', decision: 'On mobile, the sequence moves from chart to price and analysis; supporting modules appear near the moment they become useful.', desktop: '/images/case-studies/ramzinex/desktop-analysis.png', mobile: '/images/case-studies/ramzinex/mobile-analysis.png', desktopAlt: 'Desktop design for Ramzinex technical analysis page', mobileAlt: 'Mobile design for Ramzinex technical analysis page' },
    { id: 'content', label: 'Magazine', title: 'A clear path from finding a topic to reading an article', summary: 'Magazine home, category pages and articles share patterns that make the next step easy to find.', decision: 'Articles, analysis, video and audio use the same hierarchy; on mobile, carousels and horizontal cards reduce page length.', desktop: '/images/case-studies/ramzinex/desktop-blog-home.png', mobile: '/images/case-studies/ramzinex/mobile-blog-home.png', desktopAlt: 'Desktop design for Ramzinex Magazine homepage', mobileAlt: 'Mobile design for Ramzinex Magazine homepage' },
    { id: 'campaign', label: 'Campaign', title: 'Turning a promotion into a clear journey', summary: 'The “first reward” page explains the benefits, reward steps, referral income and registration action in order.', decision: 'On mobile, the main message and action remain in the first view. Steps, rewards and evidence follow in the order users are likely to need them.', desktop: '/images/case-studies/ramzinex/desktop-campaign.png', mobile: '/images/case-studies/ramzinex/mobile-campaign.png', desktopAlt: 'Desktop design for Ramzinex registration and first reward campaign', mobileAlt: 'Mobile design for Ramzinex registration and first reward campaign' }
  ],
  contentSystem: {
    kicker: 'Content system', title: 'From finding a topic to continuing the read', lead: 'The homepage helps people discover content, category pages make browsing faster, and article pages point to the next relevant piece.',
    cards: [['Magazine home', 'Featured stories, analysis, video, audio and multiple content categories.'], ['Category page', 'Sorting and fast browsing through cards that carry the right amount of information.'], ['Article detail', 'Long-form readability with media, tables, audio, FAQs and relevant next reads.']]
  },
  responsive: {
    kicker: 'Responsive design', title: 'Mobile is not a smaller desktop', lead: 'On mobile, sidebars move into the content flow, cards become easier to tap and the main action stays close to the information it affects.',
    rules: [['Columns become sequence', 'Content importance defines the mobile reading order.'], ['Density is managed', 'Carousels and horizontal cards prevent unnecessary length and noise.'], ['Action stays close', 'Buying, registering or continuing never loses its context.'], ['Templates stay coherent', 'Shared patterns preserve the system identity at every width.']]
  },
  system: {
    kicker: 'Interface system', title: 'A shared language for data, content and conversion', lead: 'Yellow highlights actions and emphasis; the neutral color supports text and surfaces. The pair stays consistent across the product.',
    primaryLabel: 'Primary · Actions',
    secondaryLabel: 'Secondary · Surfaces',
    primaryColor: '#FFC117',
    secondaryColor: '#1C1F21',
    typographyLabel: 'Typography · Dana',
    typographyText: 'Dana keeps small data and primary headings readable and consistent.',
    typographyWeights: ['Regular', 'Medium', 'Bold', 'Black']
  },
  validation: {
    kicker: 'Validation & accessibility', title: 'What still needs to be tested', lead: 'These four areas should be checked with users and real product data to measure the outcome.',
    checks: [['Finding the primary action', 'Time and success rate for finding buy, analysis or registration actions.'], ['Understanding information', 'Understanding price, risk and key data after scanning the page.'], ['Navigating long content', 'Speed of finding a target section and continuing to related content.'], ['Accessibility', 'Contrast, focus, control names, touch targets, zoom and text reflow.']]
  },
  labels: { evidence: 'Design evidence', desktop: 'Desktop', mobile: 'Mobile', open: 'View full image', close: 'Close image', select: 'Select chapter', designDecision: 'Design decision', extraScreens: 'Supporting magazine templates', currentDraft: 'Editable first draft' }
}

export const ramzinexCaseStudy = { fa, en }
