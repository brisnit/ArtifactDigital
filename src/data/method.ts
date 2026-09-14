// One process, used everywhere the site describes how Artifact works. The
// site previously ran four different models; everything now reads from here.

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
    body: 'How the work actually flows — the approvals, handoffs, data and friction — before deciding what software should exist.',
    leverage:
      'AI lets us take in far more of your documentation, data and research than discovery usually allows, so senior people spend their time on the conversations and judgment calls that need them.',
  },
  {
    title: 'Prototype',
    body: 'Working software in front of real users in weeks, not months, while being wrong is still cheap.',
    leverage:
      'Prototyping used to cost enough that teams picked one direction early. Now we can build and compare several working approaches, and let real users show which one holds up.',
  },
  {
    title: 'Build',
    body: 'Production software on architecture that can grow, designed and engineered by the same team.',
    leverage:
      "AI takes on a large share of the code, tests and documentation. The senior team's attention goes to architecture, experience quality and the edge cases that decide whether software gets used.",
  },
  {
    title: 'Learn',
    body: 'Real usage tells us what to change. We measure it instead of guessing.',
    leverage:
      'We can study far more usage, feedback and behavior than a traditional project budgets for, and turn what we find into changes while they still matter.',
  },
  {
    title: 'Evolve',
    body: 'Your software grows with the business. It is infrastructure, not a one-time project.',
    leverage:
      'When change costs less to make, software can keep pace with the business instead of freezing at launch.',
  },
];

// How each model adds capability. Written as a difference in structure, not
// a verdict on agencies — the team comes from that model.
export const MODEL_COMPARISON: readonly (readonly [string, string, string])[] = [
  ['Capability grows by', 'Adding people and specialist roles', 'Experienced people, multiplied by AI'],
  ['Before committing', 'A few directions, chosen early', 'Many directions, explored and tested'],
  ['Ideas are proven with', 'Documents and static designs', 'Working prototypes'],
  ['The work moves through', 'Specialist teams and handoffs', 'One senior team, strategy to code'],
  ['Effort goes to', 'The work, and coordinating it', 'Thinking, building and iteration'],
];
