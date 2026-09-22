// One process, used everywhere the site describes how Artifact works. Five
// plain stages, in the order they actually happen. No proprietary methodology,
// no invented vocabulary — the simplicity is the point.

export interface MethodStage {
  title: string;
  body: string;
  /** What working with AI changes at this stage. Shown where the page explains
   *  why the model works, not just what the stages are. */
  leverage: string;
}

export const METHOD: readonly MethodStage[] = [
  {
    title: 'Understand',
    body: 'What the business needs, who it serves, and what the site or app actually has to do. Before anything gets designed.',
    leverage:
      'AI lets us take in far more of your material — research, analytics, content, competitors — than a discovery phase usually allows, so our time goes to the judgment calls that need a person.',
  },
  {
    title: 'Design',
    body: 'Structure first, then the look: what goes where, how it works, and how it feels to use. You see real screens early.',
    leverage:
      'We can explore and compare more directions than a small team could before, then put the strongest in front of you while changing course is still cheap.',
  },
  {
    title: 'Build',
    body: 'Designers and engineers on the same team, so what gets built is what was designed — fast, accessible and maintainable.',
    leverage:
      'AI takes on a large share of the code, tests and documentation. Our attention goes to architecture, experience quality and the edge cases that decide whether people keep using it.',
  },
  {
    title: 'Launch',
    body: 'Testing, performance, accessibility, analytics, search and the unglamorous checks that make a launch boring in the best way.',
    leverage:
      'Far more of the pre-launch checklist can be automated and repeated, so quality checks stop competing with the deadline.',
  },
  {
    title: 'Grow',
    body: "Real usage tells us what to change next: search visibility, conversion, new features, and the things you couldn't know before people arrived.",
    leverage:
      'We can study more usage and feedback than a traditional retainer budgets for, and turn what we find into changes while they still matter.',
  },
];

// How each model adds capability. Written as a difference in structure, not
// a verdict on agencies — the team comes from that model.
export const MODEL_COMPARISON: readonly (readonly [string, string, string])[] = [
  ['Capability grows by', 'Adding people and specialist roles', 'Experienced people, multiplied by AI'],
  ['Before committing', 'A few directions, chosen early', 'Many directions, explored and tested'],
  ['Ideas are proven with', 'Documents and static designs', 'Real screens and working software'],
  ['The work moves through', 'Specialist teams and handoffs', 'One senior team, strategy to code'],
  ['Who you actually get', 'Senior people in the pitch, juniors on the work', 'The people you meet do the work'],
];
