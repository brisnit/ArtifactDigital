// Three ways into Artifact, named the way a business owner would describe their
// own situation. Everything else on the site — the five service pages, the case
// studies, the capability depth — hangs off one of these.
//
// Ranges are typical engagement sizes, not quotes. They exist to qualify, not
// to look cheap: see /pricing.

export interface Door {
  id: string;
  /** Path — each door is a real landing page. */
  href: string;
  num: string;
  /** How a client would say it. */
  label: string;
  /** Nav and card sub-label. */
  summary: string;
  priceRange: string;
  priceNote: string;
  heroLines: { text: string; italic?: boolean }[];
  lede: string;
  /** The situations that send someone through this door. */
  recognize: string[];
  /** What the engagement actually involves. Not a capability list. */
  includes: { title: string; body: string }[];
  /** Case study ids that prove this door, in order. */
  proof: string[];
  cta: { label: string; href: string };
  metaTitle: string;
  metaDescription: string;
}

export const DOORS: readonly Door[] = [
  {
    id: 'fix',
    href: '/fix-my-digital-business',
    num: '01',
    label: 'Fix my digital business',
    summary: 'Your website or customer experience is holding the business back.',
    priceRange: '$7.5K–$25K+',
    priceNote: 'Typical range for a redesign or experience rebuild.',
    heroLines: [{ text: 'Your business grew.' }, { text: 'Your digital experience didn’t.', italic: true }],
    lede:
      'The site, the storefront or the customer experience made sense a few years ago. It doesn’t represent the company you are now, and it’s costing you work you should be winning. We find what’s getting in the way, redesign it and build what needs to change.',
    recognize: [
      'The site looks nothing like the quality of the work you do',
      'People can’t find you in search — or in what AI assistants recommend',
      'Your best customers call because the website can’t answer them',
      'It works on a laptop and falls apart on a phone',
      'Content is scattered across pages nobody maintains',
      'Traffic arrives and almost nobody gets in touch',
    ],
    includes: [
      { title: 'Find what’s actually wrong', body: 'We go through the experience the way your customers do, with analytics, search visibility and accessibility alongside it. You get a clear read before anyone designs anything.' },
      { title: 'Redesign the experience', body: 'Structure first — what goes where, what gets cut, what someone needs to see in the first ten seconds — then the design itself, on real screens you can react to.' },
      { title: 'Build it properly', body: 'Fast, accessible, responsive, and on a platform your team can actually run. Commerce, integrations and content modelling where the business needs them.' },
      { title: 'Make it findable', body: 'The technical groundwork for search and AI assistants, structured data, and content shaped around the questions buyers actually ask.' },
      { title: 'Keep it moving', body: 'Hosting, analytics and a regular cycle of improvements, if you want us to stay on after launch.' },
    ],
    proof: ['case-ithink', 'case-phoenix-rising', 'case-left-coast-printing-pros'],
    cta: { label: 'Show Us What’s Broken', href: '/contact?intent=fix' },
    metaTitle: 'Fix My Digital Business · Website & Experience Rebuilds · Artifact Digital',
    metaDescription:
      'Your business grew and your digital experience didn’t. Artifact Digital finds what’s getting in the way, redesigns the experience and builds what needs to change. Typical engagements $7.5K–$25K+.',
  },
  {
    id: 'build',
    href: '/build-my-product',
    num: '02',
    label: 'Build my product',
    summary: 'You need software built — an app, a portal, a tool, a product.',
    priceRange: '$15K–$75K+',
    priceNote: 'Typical range from first working version to production software.',
    heroLines: [{ text: 'You know what needs to exist.' }, { text: 'We help make it real.', italic: true }],
    lede:
      'A web app, a customer portal, an internal tool, a configurator, a product you intend to sell. From the first working version to production software, with strategy, UX, visual design and engineering in one senior team — the people you meet are the ones who build it.',
    recognize: [
      'A spreadsheet quietly became a system the business depends on',
      'Your team copies the same information between four tools',
      'Customers ask for something your software simply can’t do',
      'You’re paying for several subscriptions that still don’t fit',
      'You have a product idea and nobody internally can build it',
      'Leadership wants something done with AI and nobody knows where it helps',
    ],
    includes: [
      { title: 'Decide what’s worth building', body: 'What has to be true for this to work, what the first version must include, and what can wait. Sometimes the honest answer is that an existing tool already does it.' },
      { title: 'Design it where changing it is cheap', body: 'Real screens and flows early, compared against alternatives, in front of the people who will use it — before any of it is expensive to change.' },
      { title: 'Build production software', body: 'Data model, integrations, permissions, payments and automated tests. Not a prototype with a demo label on it.' },
      { title: 'Put AI where it earns its place', body: 'Inside the workflow, doing real work — summarizing, drafting, flagging, sorting — rather than a chatbot bolted onto a corner of the screen.' },
      { title: 'Hand it over cleanly', body: 'Your code, your accounts, documentation that means something, and a roadmap for what comes after the first release.' },
    ],
    proof: ['case-tiny-crm', 'case-left-coast-printing-pros', 'case-benchbot', 'case-dropq'],
    cta: { label: 'Tell Us What You Want to Build', href: '/contact?intent=build' },
    metaTitle: 'Build My Product · Web Apps, Portals & Custom Software · Artifact Digital',
    metaDescription:
      'Web apps, customer portals, internal tools and AI-enabled products, from first working version to production software. Typical engagements $15K–$75K+ with Artifact Digital.',
  },
  {
    id: 'workshop',
    href: '/opportunity-workshop',
    num: '03',
    label: 'Figure out what we should build',
    summary: 'You know something has to change. You don’t yet know what.',
    priceRange: '$2.5K–$7.5K',
    priceNote: 'A fixed-scope workshop, usually two to four weeks.',
    heroLines: [{ text: 'Don’t start by building.' }, { text: 'Start by finding the right thing to build.', italic: true }],
    lede:
      'The Opportunity Workshop is a short, fixed-price engagement: we study how your business actually works, find where the friction and the opportunities are, and give you a practical plan for what should happen next — including what isn’t worth doing.',
    recognize: [
      '“We need to do something with AI”',
      '“We think we need a new website”',
      '“We have too many spreadsheets”',
      '“Our process is a mess”',
      '“We might need an app”',
      '“There has to be a better way to do this”',
    ],
    includes: [
      { title: 'Understand the business', body: 'How the work actually flows: the approvals, the handoffs, the systems, and the parts that only work because someone remembers to do them.' },
      { title: 'Find the friction', body: 'Where time is going, where customers drop out, where staff are doing by hand what software should be doing, and what it’s costing you.' },
      { title: 'Look at what you already have', body: 'The tools you pay for, what they do well, and where a small change would beat a new build. Buying less is a legitimate outcome.' },
      { title: 'Identify where AI and automation help', body: 'Concretely, in your workflow — and, just as usefully, where it would be an expensive distraction.' },
      { title: 'Prioritize and plan', body: 'The opportunities ranked by value and effort, a recommendation on what to do first, and realistic investment ranges for each.' },
      { title: 'Prototype the strongest idea', body: 'Where it helps, something you can click through, so the decision is made against a real thing rather than a document.' },
    ],
    proof: ['case-tiny-crm', 'case-left-coast-printing-pros'],
    cta: { label: 'Find the Opportunity', href: '/contact?intent=workshop' },
    metaTitle: 'Opportunity Workshop · Digital Strategy Sprint · Artifact Digital',
    metaDescription:
      'A short, fixed-price workshop: we study how your business works, find the biggest digital and AI opportunities, and give you a practical plan for what to build next. $2.5K–$7.5K.',
  },
];

export const doorById = (id: string) => {
  const d = DOORS.find((x) => x.id === id);
  if (!d) throw new Error(`Unknown door: ${id}`);
  return d;
};
