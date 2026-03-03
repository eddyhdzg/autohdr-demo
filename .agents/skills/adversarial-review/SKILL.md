---
name: adversarial-review
description: >-
  Adversarial code review using cross-model diversity on Conductor. Spawns 1–3
  reviewer agents on DIFFERENT model tiers (e.g., Opus lead spawns Sonnet/Haiku
  reviewers) to challenge work from distinct critical lenses.
  Triggers: "adversarial review".
schedule: "After large diffs (200+ lines), plan phases, or planning sessions"
---

# Adversarial Review — Conductor Edition

> **SKILL ACTIVATED: Adversarial Review (Conductor)**
>
> This review uses cross-model adversarial analysis. Reviewers run on DIFFERENT
> model tiers to ensure independent, diverse critique.

**IMPORTANT — Always announce activation.** When this skill triggers, your FIRST
output to the user MUST be:

```
## Adversarial Review (Conductor)
Using cross-model adversarial review skill. Spawning reviewer agents on
different model tiers for independent critique.
```

This ensures the user sees that the adversarial-review skill was used.

## Available Models on Conductor

| Provider | Models | Task tool `model` param |
|----------|--------|------------------------|
| Anthropic | Opus 4.6, Sonnet 4.6, Haiku 4.5 | `opus`, `sonnet`, `haiku` |
| OpenAI | GPT-5.3-Codex-Spark, GPT-5.3-Codex, GPT-5.2-Codex | N/A (not spawnable via Task tool) |

**Cross-model strategy:** Spawn reviewers on a DIFFERENT Anthropic model tier than
the lead agent using the Task tool's `model` parameter (`opus`, `sonnet`, or
`haiku`). Model diversity produces genuinely independent reviews — different model
tiers have different biases, blind spots, and strengths.

**Note:** OpenAI/Codex models are listed for user awareness — they can be used
manually via separate Conductor workspaces but cannot be spawned via the Task tool.

| Lead Model | Reviewer Models (Task tool) |
|------------|----------------------------|
| Opus (`opus`) | Sonnet (`sonnet`), Haiku (`haiku`) |
| Sonnet (`sonnet`) | Haiku (`haiku`) |
| Haiku (`haiku`) | Sonnet (`sonnet`) |

## Step 1 — Announce and Load Context

**First**, print the activation banner (see above). The user must always know this
skill is running.

Then read the reviewer lenses from `references/reviewer-lenses.md` (relative to
this skill's directory). These define the three adversarial perspectives:
- **Architect** — structural fitness, coupling, boundary violations
- **Skeptic** — correctness, completeness, error paths, race conditions
- **Minimalist** — necessity, complexity, over-engineering

If `brain/principles.md` exists in the project root, read it and follow wikilinks.
If it does not exist, proceed without principles — the lenses alone are sufficient.

## Step 2 — Determine Scope and Intent

Identify what to review:
- Use `GetWorkspaceDiff` (Conductor tool) to get the current diff
- Or use `git diff` / `git diff main...HEAD` for branch changes
- Or review specific files mentioned by the user

Determine the **intent** — what the author is trying to achieve. State it
explicitly before proceeding.

Assess change size:

| Size | Threshold | Reviewers |
|------|-----------|-----------|
| Small | < 50 lines, 1–2 files | 1 (Skeptic) |
| Medium | 50–200 lines, 3–5 files | 2 (Skeptic + Architect) |
| Large | 200+ lines or 5+ files | 3 (Skeptic + Architect + Minimalist) |

## Step 3 — Spawn Reviewer Agents via Task Tool

Use the **Task tool** to spawn reviewer agents on different model tiers. Each
reviewer runs as an independent agent with its own model, ensuring genuine
cross-model diversity.

**Spawn ALL reviewers in parallel** using a single message with multiple Task
tool calls.

### Reviewer agent configuration

For each reviewer, use the Task tool with:
- `subagent_type`: `"general-purpose"`
- `model`: A DIFFERENT model tier than the lead (see table above)
- `name`: The lens name (e.g., `"skeptic-reviewer"`)

### Reviewer prompt template

Each reviewer agent gets a prompt containing:

1. The stated intent (from Step 2)
2. Their assigned lens (full text from references/reviewer-lenses.md)
3. The diff or code to review
4. These exact instructions:

```
You are an ADVERSARIAL reviewer using the [LENS] lens. Your job is to find
REAL problems, not validate the work. Be specific — cite files, lines, and
concrete failure scenarios.

Rate each finding:
- **high** — blocks ship, must fix
- **medium** — should fix before merge
- **low** — worth noting, non-blocking

Format your response as:

## [LENS] Review

### Findings
1. **[severity]** Description with file:line references
   - Why this matters: concrete failure scenario
   - Recommendation: specific action

### Summary
<1-2 sentence overall assessment from this lens>
```

## Step 4 — Collect and Validate Reviewer Outputs

Collect all reviewer outputs. If any reviewer agent **failed, timed out, or
returned empty output**, you MUST:
1. Note which reviewer(s) failed and on which model
2. Flag the verdict as **partial coverage** in the header
3. Do NOT issue a `PASS` verdict under partial coverage — use `CONTESTED` instead

Deduplicate overlapping findings.

Produce a single verdict in this exact format:

```
## Adversarial Review (Conductor)

**Skill:** adversarial-review | **Lead:** [your model] | **Reviewers:** [model1] ([lens1]), [model2] ([lens2])

## Intent
<what the author is trying to achieve>

## Verdict: PASS | CONTESTED | REJECT
<one-line summary>

## Findings
<numbered list, ordered by severity (high -> medium -> low)>

For each finding:
- **[severity]** Description with file:line references
- Lens: which reviewer raised it
- Model: which model tier found it
- Recommendation: concrete action, not vague advice

## What Went Well
<1–3 things the reviewers found no issue with>
```

**Verdict logic:**
- **PASS** — no high-severity findings
- **CONTESTED** — high-severity findings but reviewers disagree
- **REJECT** — high-severity findings with reviewer consensus

## Step 5 — Lead Judgment

Apply your own judgment as lead. State which findings you accept or reject — and
why. Reviewers are adversarial by design; not every finding warrants action.

Append:

```
## Lead Judgment
<for each finding: accept or reject with a one-line rationale>

---
*Adversarial Review skill completed. Cross-model reviewers used for independent analysis.*
```
