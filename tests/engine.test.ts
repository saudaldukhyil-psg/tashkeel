import assert from 'node:assert/strict';
import { simulate, analyze, estimate, generatePack } from '../lib/engine';
import { scenarios, objectiveText, sources, agents } from '../lib/enterprise';
const c = {
  text: objectiveText[0],
  baseline: 9,
  target: 3,
  owner: 'COO',
  horizon: '90 days',
  financial: 'SAR 6.48M exposure',
  autonomy: 3,
};
assert.equal(analyze(c).valid, true);
assert.equal(analyze({ ...c, owner: '' }).valid, false);
assert.equal(analyze({ ...c, target: 10 }).valid, false);
const results = scenarios.map((s) => simulate(s, 'Plant Manager', 3));
assert.match(results[0].tool, /transfer/);
assert.equal(results[0].blocked, true);
assert.equal(results[1].tool, 'quotation.request');
assert.ok(results[1].policies.includes('POL-01'));
assert.equal(results[2].tool, 'approval.request');
assert.equal(results[2].blocked, true);
assert.ok(results[2].policies.includes('POL-02'));
assert.equal(results[3].tool, 'compliance.open');
assert.equal(results[3].blocked, true);
assert.equal(results[4].tool, 'budget.check');
assert.equal(results[4].blocked, true);
for (const level of [0, 1, 2, 3, 4, 5]) {
  for (const id of [3, 4, 5])
    assert.equal(simulate(scenarios[id - 1], '', level).blocked, true);
}
assert.equal(simulate(scenarios[1], '', 1).tool, 'quotation.recommend');
assert.match(simulate(scenarios[2], '', 3).human[0], /unresolved/);
assert.equal(
  estimate({
    hourly: 0,
    incidents: 0,
    teamHours: 0,
    delay: 0,
    implementation: 100,
  }).payback,
  null,
);
const v = estimate({
  hourly: 15000,
  incidents: 18,
  teamHours: 1200,
  delay: 1,
  implementation: 750000,
});
assert.equal(v.annual, 4644000);
assert.equal(v.hours, 720);
const p = generatePack(c, 'Plant Manager', results, 'en');
assert.equal(p.sections.length, 16);
assert.equal(p.agents.length, 8);
assert.equal(p.production_authorized, false);
assert.equal(JSON.parse(JSON.stringify(p)).exceptions.length, 5);
assert.equal(
  Math.round(sources.reduce((n, s) => n + s.score, 0) / sources.length),
  72,
);
for (const a of agents)
  for (const id of a.inputs) assert.ok(sources.some((s) => s.id === id));
console.log(
  'PASS: objective gates, 5 scenarios, 6 autonomy levels, budget and supplier blocks, calculator, 16-section exports, source lineage.',
);
