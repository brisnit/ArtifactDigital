// One process, used everywhere the site describes how Artifact works. The
// site previously ran four different models; everything now reads from here.

export interface MethodStage {
  title: string;
  body: string;
}

export const METHOD: readonly MethodStage[] = [
  {
    title: 'Understand',
    body: 'How the work actually flows — the approvals, handoffs, data and friction — before deciding what software should exist.',
  },
  {
    title: 'Prototype',
    body: 'Working software in front of real users in weeks, not months, while being wrong is still cheap.',
  },
  {
    title: 'Build',
    body: 'Production software on architecture that can grow, designed and engineered by the same team.',
  },
  {
    title: 'Learn',
    body: 'Real usage tells us what to change. We measure it instead of guessing.',
  },
  {
    title: 'Evolve',
    body: 'Your software grows with the business. It is infrastructure, not a one-time project.',
  },
];
