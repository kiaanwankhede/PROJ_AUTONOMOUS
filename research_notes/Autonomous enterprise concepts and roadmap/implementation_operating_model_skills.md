# Implementing the Autonomous / Agentic Enterprise in Practice: Roadmaps, Use-Case Prioritization, Operating Models, Roles & Skills, Learning, and Change Management (state of practice as of 21 Nov 2026)

*Verification legend used on every finding:* **[F]** = page fetched and read in this session (primary text checked). **[S]** = taken from a search-result excerpt of the cited page; the page itself could not be opened (McKinsey returned HTTP 503 and Gartner HTTP 403 to automated fetches) — verify wording before quoting. **[K]** = from the researcher's prior knowledge; URL believed correct but not re-fetched this session (site blocked, or the shared web-search budget ran out mid-research) — verify before quoting. Dates in brackets are publication/update dates. Several planned checks could not be run because the session's web-search budget was exhausted; these are listed under Gaps.

---

## Key Question 1: What implementation frameworks and roadmaps have been published for agentic AI, and what phases, stage gates and timelines do they recommend?

### Takeaway
By late 2026 the playbooks agree on one basic sequence. (1) Settle ownership, the operating model and a scored use-case portfolio with baselines and stop criteria. (2) Build a governed platform foundation: identity, an agent registry, a model/LLM gateway with token budgets, observability, and evals inside CI/CD. (3) Run a small number of workflow-redesign pilots, starting with the simplest design that works (usually a single agent). (4) Scale through reuse, operational standards and gradually higher autonomy. Few sources publish explicit timelines. The concrete ones are AWS's 8-week platform build, MIT NANDA's "90 days pilot→production for top performers vs. ≥9 months for enterprises", and Anthropic's 12-week deployment residency. The main change in 2026 is that governance, stop criteria and operating-model redesign have moved to the front of the roadmap. The reason is that adoption is outrunning governance: Gartner finds 71% expect to deploy agentic AI within 12 months but only 21% have agentic governance capabilities.

### Cited Findings

#### Adoption baseline (sets roadmap ambition; note definitions differ widely)
- [Nov 9 2026] A Gartner Q2-2026 survey of >2,000 CIOs and tech executives found that 71% of organizations expect to deploy agentic AI within 12 months, but only 21% have agentic AI governance capabilities in place. Gartner says aligning AI value, risk and safety is now the top CIO challenge. [S] — [Gartner press release](https://www.gartner.com/en/newsroom/press-releases/2026-11-09-gartner-says-aligning-artificial-intelligence-value-risk-and-safety-is-now-the-top-challenge-for-chief-information-officers)
- [Oct 19 2026] Only 13% of CIOs say their enterprise has realized significant or transformational value from AI (n=2,002 CIOs/tech execs, May–July 2026). Only 31% have guidelines for when a pilot should *not* move to production, and 17% have guidelines for abandoning low-value AI already in production. [S] — [Gartner press release](https://www.gartner.com/en/newsroom/press-releases/2026-10-19-gartner-survey-finds-only-13-percent-of-cios-say-their-enterprise-has-realized-significant-or-transformational-value-from-ai)
- [2026] Gartner's 2026 Hype Cycle for Agentic AI cites its CIO survey: only 17% of organizations have deployed AI agents, and >60% expect to within two years. Most deployments remain narrowly scoped, and "fully autonomous agents are not ready for the majority of enterprise use cases." [S] — [Gartner, 2026 Hype Cycle for Agentic AI](https://www.gartner.com/en/articles/hype-cycle-for-agentic-ai)
- [Jun 25 2025] Gartner predicted that more than 40% of agentic AI projects will be canceled by end-2027 because of escalating costs, unclear business value or inadequate risk controls. It warned of "agent washing" and estimated only about 130 of the thousands of "agentic" vendors are real. It also said many use cases positioned as agentic don't need agentic implementations. [S] — [Gartner (via search excerpts)](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027); Deloitte restates the prediction [F] — [Deloitte Tech Trends 2026](https://www.deloitte.com/us/en/insights/topics/technology-management/tech-trends/2026/agentic-ai-strategy.html)
- Gartner forecasts quoted by Deloitte: by 2028, 15% of day-to-day work decisions will be made autonomously by agentic AI (up from none in 2024), and 33% of enterprise software applications will include agentic AI (vs. <1% at the time). [F] — [Deloitte Tech Trends 2026](https://www.deloitte.com/us/en/insights/topics/technology-management/tech-trends/2026/agentic-ai-strategy.html)
- [Dec 10 2025] Deloitte's 2025 Emerging Technology Trends survey: 30% of organizations are exploring agentic options, 38% piloting, 14% ready to deploy, and 11% using agents in production. 42% are still developing their agentic strategy roadmap and 35% have no formal strategy. [F] — [Deloitte Tech Trends 2026, "The agentic reality check"](https://www.deloitte.com/us/en/insights/topics/technology-management/tech-trends/2026/agentic-ai-strategy.html)
- [2026] McKinsey State of AI 2026, per McKinsey page excerpts and secondary write-ups (reported publication 25 Aug 2026, n=1,719, 97 countries):
  - Organizations with more than $1B revenue scaling agents rose from 27% to 40% year over year; smaller organizations were flat at 22%.
  - 44% report AI scaling across the enterprise (vs 38%).
  - EBIT impact is essentially unchanged at 37%, and about 6% qualify as AI high performers.
  - No more than 10% of organizations report scaling agents in any single function.
  - [S] — [McKinsey, The State of AI](https://www.mckinsey.com.br/en/capabilities/quantumblack/our-insights/the-state-of-ai); [Civic secondary summary](https://www.civic.com/field-notes/big-companies-scaled-agents)
- [Nov 2025] McKinsey State of AI 2025 (n=1,993, 105 countries): 23% of organizations were scaling an agentic AI system somewhere [S]. About 62% were at least experimenting with agents [K]. — [McKinsey, The State of AI (2025 edition at same URL)](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai)
- [Jun 2026 page; survey fielded 18 Nov–2 Dec 2025] The LangChain "State of Agent Engineering" survey (n=1,340) found 57.3% have agents in production, up from 51%, and 30.4% are developing with plans to deploy. Among organizations with 10,000+ employees, 67% have agents in production. The sample is skewed: 63% are in tech and 49% work at companies with fewer than 100 people. [F] — [LangChain](https://www.langchain.com/state-of-agent-engineering)
- [May 5 2026] Active agents in the Microsoft 365 ecosystem grew 15x year over year (18x in large enterprises). [F] — [Microsoft 2026 Work Trend Index](https://www.microsoft.com/en-us/worklab/work-trend-index/agents-human-agency-and-the-opportunity-for-every-organization)
- [Jun 3 2026] In BCG's AI at Work 2026 survey, 30% of respondents say their organization has integrated agents into workflows (vs 13% a year earlier), and 50% report agent experiments or pilots. [F] — [BCG, AI at Work 2026](https://www.bcg.com/publications/2026/ai-at-work-why-strategy-matters-more-than-tools)
- [Jul 2025] MIT NANDA (Project NANDA, "The GenAI Divide: State of AI in Business 2025"; research Jan–Jun 2025; >300 public initiatives reviewed, 52 organizations interviewed, 153 senior leaders surveyed):
  - "95% of organizations are getting zero return" on $30–40B of GenAI investment.
  - For enterprise-grade tools, 60% of organizations evaluated, 20% reached pilot and 5% reached production.
  - The authors caution that the figures are "directionally accurate based on individual interviews."
  - [F] — [MIT NANDA report PDF](https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf)
- *Conflict note:* Reported agent penetration ranges from 11% in production (Deloitte), to 17% deployed (Gartner CIO survey), 23% scaling in 2025 and 40% scaling among >$1B companies in 2026 (McKinsey), and 57% in production (LangChain developer survey). The differences reflect sampling (CIOs vs developers vs employees) and definitions (deployed vs scaling vs any agent in production). They are not contradictory facts.

#### Consultancy frameworks
- [Sep 2025] McKinsey, "The agentic organization":
  - The agentic organization rests on five pillars: business model; operating model; governance; workforce, people and culture; and technology and data.
  - "A human team of two to five people can already supervise an agent factory of 50 to 100 specialized agents running an end-to-end process" (e.g., customer onboarding, closing the books). One example is a global bank whose agent factory runs KYC with ten agent squads.
  - Governance must become "real time, data driven, and embedded," with humans holding final accountability. McKinsey recommends a governance framework across the agent life cycle "from discovery through decommissioning."
  - [S] — [McKinsey](https://www.mckinsey.com/capabilities/people-and-organization/our-insights/the-agentic-organization-contours-of-the-next-paradigm-for-the-ai-era)
- [Oct 2026] McKinsey, "AI is changing work; now it has to change the organization":
  - The redesign test is whether the organization can make decisions, move information and coordinate work with fewer layers and handoffs.
  - It describes an "agentic mission factory" that starts with the mission, not the tools.
  - It cites a 2026 survey: 80% say AI improved individual productivity, but only 37% report positive EBIT impact.
  - [S] — [McKinsey](https://www.mckinsey.com/capabilities/people-and-organization/our-insights/ai-is-changing-work-now-it-has-to-change-the-organization)
- [Aug 2026] McKinsey, "Escaping the pilot trap: Building HR for the agentic era" recommends defining the human–agent operating model for the function first, then working backward to implementation. [S] — [McKinsey](https://www.mckinsey.com/capabilities/people-and-organization/our-insights/escaping-the-pilot-trap-building-hr-for-the-agentic-era)
- [Jun 2025] McKinsey, "Seizing the agentic AI advantage":
  - It describes a "gen AI paradox": nearly 8 in 10 companies use gen AI, but about as many report no significant bottom-line impact.
  - Horizontal copilots and chatbots scaled, but their gains were diffuse. The large majority (about 90%) of function-specific "vertical" use cases stayed stuck in pilot.
  - It proposes an "agentic AI mesh": a composable, distributed, vendor-agnostic architecture for governing many agents, with principles of composability, distributed intelligence, layered decoupling, vendor neutrality and governed autonomy.
  - [K — page returned 503] — [McKinsey](https://www.mckinsey.com/capabilities/quantumblack/our-insights/seizing-the-agentic-ai-advantage)
- [Sep 2025] McKinsey, "One year of agentic AI: Six lessons from the people doing the work":
  1. It's not about the agent, it's about the workflow.
  2. Agents aren't always the answer.
  3. Stop "AI slop": invest in evaluations and build user trust.
  4. Make it easy to track and verify every step.
  5. The best use case is the reuse case.
  6. Humans remain essential, but their roles and numbers will change.
  - [K — page returned 503] — [McKinsey](https://www.mckinsey.com/capabilities/quantumblack/our-insights/one-year-of-agentic-ai-six-lessons-from-the-people-doing-the-work)
- BCG's 10-20-70 rule: "10% of a company's efforts should be focused on algorithms, 20% on technology and data, and the remaining 70% … on people and processes." [S] — [BCG Leader's Guide](https://bcg.com/featured-insights/the-leaders-guide-to-transforming-with-ai). BCG reiterated the rule on 26 Jan 2026 and cited its 2026 AI Radar: at least 50% of CEOs believe their jobs are at risk if their AI efforts fail. [F] — [BCG, "What's Driving AI Value"](https://www.bcg.com/news/26january2026-what-is-driving-ai-value)
- [Oct 2024] BCG, "Where's the value in AI?": 74% of companies struggle to achieve and scale value; only 26% have the capabilities to move beyond proofs of concept. Leaders pursue about half as many opportunities and expect about 2.1x the ROI, and about 62% of value comes from core business processes. [K] — [BCG](https://www.bcg.com/publications/2024/wheres-value-in-ai). The 62% figure is reproduced in OpenAI's use-case guide ("62% of AI's value lies in core business functions"). [F] — [OpenAI](https://cdn.openai.com/business-guides-and-resources/identifying-and-scaling-ai-use-cases.pdf)
- [Sep 2025] BCG "Widening AI Value Gap": agentic AI accounted for 17% of total AI value in 2025 and is projected to reach about 29% by 2028 [S]. Only about 5% of companies are "future-built" and achieving value at scale, while about 60% report minimal gains [K]. — [AI News summary of BCG](https://www.artificialintelligence-news.com/news/value-gap-ai-investments-widening-dangerously-fast/)
- [Jun 3 2026] BCG's five CEO imperatives:
  1. Make strategic clarity the top priority and own it personally.
  2. Measure value, not adoption.
  3. Redesign work end-to-end rather than adding more tools ("redesign a few core processes across teams").
  4. Put people at the heart of the redesign.
  5. Govern AI as a moving target with "light, standing governance".
  - [F] — [BCG AI at Work 2026](https://www.bcg.com/publications/2026/ai-at-work-why-strategy-matters-more-than-tools)
- [Dec 10 2025] Deloitte Tech Trends 2026, "The agentic reality check: Preparing for a silicon-based workforce":
  - Autonomy spectrum: augmentation → automation within human-defined processes → "true autonomy" (future).
  - Five strategic questions: which agents and what they do; their cost profiles relative to humans; which processes get automated and at what efficiency; the optimal human–digital mix over four years; and whether agents take over entire operational areas beyond five years.
  - Dell runs about a dozen agentic proofs of concept across about 20 digitized processes, with an architectural review board approving AI investments and business leaders signing off on material ROI.
  - Toyota replaced a process that involved 50–100 mainframe screens.
  - [F] — [Deloitte](https://www.deloitte.com/us/en/insights/topics/technology-management/tech-trends/2026/agentic-ai-strategy.html)
- [Jan 7 2025] Accenture Technology Vision 2025 ("AI: A Declaration of Autonomy"): 77% of executives say agents will reinvent how they build digital systems, and 78% say ecosystems must be built for agents as much as for humans within 3–5 years. Recommendations include monitoring agents' data access, direction and output quality; grounding agents in code and functions so decisions are explainable; setting guardrails; and preparing the digital core. [F] — [Accenture](https://www.accenture.com/us-en/insights/technology/technology-trends-2025)

#### Cloud-vendor adoption frameworks
- [Updated 9–15 Nov 2026] Microsoft Cloud Adoption Framework (CAF), AI agents:
  - The framework now has **three phases**: (1) Organizational readiness, ending in "a defined operating model and an investment strategy"; (2) Architecture and governance, ending in "defined architectural standards and governance policies"; and (3) Operational standards, ending in "consistent requirements for developing and operating AI agents safely and efficiently at scale."
  - Decision tree: no agent if code or non-generative AI suffices; RAG if the task is static Q&A or content generation; prebuilt SaaS agents if they meet requirements; build otherwise (Copilot Studio for low-code, Foundry for pro-code, IaaS).
  - "Start with multiple-agent systems if the use case crosses security and compliance boundaries, has multiple teams involved, or you know there's going to be future growth… all other use cases should start with a single agent test."
  - [F] — [Microsoft CAF AI agents overview](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/)
  - *Evolution:* the 2025 version of the same guidance was organized as Plan → Govern & secure → Build → Operate/Manage. [S] — [Microsoft Learn (search excerpt)](https://learn.microsoft.com/azure/cloud-adoption-framework/ai-agents/)
- Microsoft CAF ROI gate, four elements:
  1. A business baseline measured before the agent enters the process (e.g., average handling time).
  2. Total cost, including integration, governance and monitoring.
  3. Net business value: "productivity gains don't automatically translate into financial savings."
  4. A further-investment decision: expand, improve or retire.
  - "Many organizations run dozens of pilots and scale none of them. Pilots without stop criteria rarely end." [F] — [Microsoft CAF Organizational readiness](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/organizational-readiness)
- Microsoft CAF operational stage gates:
  - "Every production agent should have defined acceptance thresholds," and business owners approve the criteria.
  - Changes that can materially affect behavior (model replacements, instruction updates, expanded permissions) trigger re-evaluation in proportion to their impact.
  - Defined retirement triggers: loss of business ownership, unacceptable risk, or insufficient value.
  - Experimental agents should have "restrictive consumption limits."
  - [F] — [Microsoft CAF Operational standards](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/operational-standards)
- AWS Prescriptive Guidance, enterprise multi-account architecture for running agentic AI in production. This is a phased platform roadmap for a greenfield deployment ("reduce Phase 1 to days" if a landing zone already exists):
  - **Phase 1, Foundation (weeks 1–2):** organizational units, SCPs, security account, CloudTrail.
  - **Phase 2, Shared infrastructure (weeks 2–4):** tooling account, ECR, cross-account IAM and PrivateLink, observability account, and a Generative AI Gateway "with initial LLM provider integrations and token budget controls."
  - **Phase 3, Workload environments (weeks 4–6):** dev runtime with MCP server integrations, CI/CD with "build and dev evaluation stages," end-to-end telemetry validation.
  - **Phase 4, Production readiness (weeks 6–8):** staging and production accounts, CI/CD "manual approval gates," production security controls, alerting runbooks. The data lake is deferred "until workload data volumes justify" it.
  - [F, guide undated in fetched text] — [AWS implementation roadmap](https://docs.aws.amazon.com/prescriptive-guidance/latest/agent-ops-maturity-roadmap-for-enterprise-ai/implementation-roadmap.md); objectives include "a CI/CD pipeline that enforces automated evaluation and manual approval gates before production promotion" and "platform-level cost controls that prevent token budget overruns" [F] — [AWS guide intro](https://docs.aws.amazon.com/prescriptive-guidance/latest/agent-ops-maturity-roadmap-for-enterprise-ai/introduction.html)
- AWS "Operationalizing agentic AI on AWS" (intro dated Aug 2025 [S]):
  - Focus area 1, "Clarify agent intent and scope," sets the job-to-be-done as making sure "each agent solves a real problem with clear boundaries, not just a cool demo."
  - It offers an agent maturity model: Observer → Assistant → Autonomous (within boundaries) → Orchestrator (multi-agent) → Innovator.
  - It advises starting with "focused pilot projects that solve visible pain points."
  - [F] — [AWS Focus area 1](https://docs.aws.amazon.com/prescriptive-guidance/latest/strategy-operationalizing-agentic-ai/focus-areas-agent-intent-scope.html); [AWS intro](https://docs.aws.amazon.com/prescriptive-guidance/latest/strategy-operationalizing-agentic-ai/introduction.html)
- Google: the 5-Day AI Agents Intensive with Kaggle (Nov 2025) released whitepapers including "Prototype to Production" (Kartakis et al., Nov 2025).
  - Google says production agents need session management, persistent memory, tool integration with proper authentication and permissions, and real-time logging.
  - Evaluation should cover tool selection, reasoning quality, error recovery, and whether the agent asked clarifying questions when it should have. [S] — [Google Cloud blog](https://cloud.google.com/blog/products/ai-machine-learning/a-devs-guide-to-production-ready-ai-agents)
  - Earlier Google papers: "Agents" (Sept 2024; model / tools / orchestration layer) and "Agents Companion" (Feb 2025; introduced "AgentOps" and trajectory evaluation). [K] — [Kaggle whitepaper](https://www.kaggle.com/whitepaper-agents); [Agents Companion](https://www.kaggle.com/whitepaper-agent-companion)

#### AI-lab guides
- [2025] OpenAI, "A practical guide to building agents":
  - Build an agent only for workflows involving (1) complex decision-making, (2) difficult-to-maintain rules, or (3) heavy reliance on unstructured data. "Before committing to building an agent, validate that your use case can meet these criteria clearly. Otherwise, a deterministic solution may suffice."
  - Model selection: "Set up evals to establish a performance baseline"; meet accuracy with the best models; then optimize cost and latency with smaller models. Prototype "with the most capable model for every task to establish a performance baseline."
  - "Customers typically achieve greater success with an incremental approach": start with a single agent and move to multi-agent (manager or decentralized/handoff) "only when needed."
  - "Start small, validate with real users, and grow capabilities over time."
  - [F] — [OpenAI PDF](https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf)
- [2025] OpenAI, "Identifying and scaling AI use cases": the Estée Lauder GPT Lab offers a repeatable five-step process. A cross-discipline team of business user, SME and tech lead works through:
  1. Design: a two-page brief on purpose, scope and audience.
  2. Prepare: the SME gathers data.
  3. Build and Test: for accuracy and consistency.
  4. Launch: with a user guide.
  5. Pivot and Scale: through feedback loops.
  - [F] — [OpenAI PDF](https://cdn.openai.com/business-guides-and-resources/identifying-and-scaling-ai-use-cases.pdf)
- [Jan 2025] OpenAI, "AI in the Enterprise", seven lessons: start with evals; embed AI in products; start now and invest early; customize and fine-tune; get AI into experts' hands; unblock developers; set bold automation goals. [K] — [OpenAI PDF](https://cdn.openai.com/business-guides-and-resources/ai-in-the-enterprise.pdf)
- [Dec 19 2024; page since annotated] Anthropic, "Building effective agents":
  - "Workflows are systems where LLMs and tools are orchestrated through predefined code paths," whereas agents direct their own processes and tool use.
  - Start with the simplest solution; often a single optimized LLM call with retrieval is enough.
  - Workflow patterns: prompt chaining, routing, parallelization, orchestrator-workers, evaluator-optimizer.
  - Three principles: simplicity, transparency of planning, and a carefully designed agent-computer interface (ACI).
  - The page now notes that much of the tooling it describes has changed, and it names the Claude Agent SDK and Strands Agents SDK as framework examples (evolution). [F] — [Anthropic](https://www.anthropic.com/engineering/building-effective-agents)
- [Oct 2 2026] Anthropic's Claude Frontier Academy ($100M; target of 10,000 "Frontier Deployed Engineers" by end-2027) provides a de facto per-use-case delivery template:
  - A multi-day simulated enterprise deployment "from the right use case through security review to handover," ending in a graded practical.
  - A **12-week residency** leading a real use case inside the participant's own organization.
  - A final assessment, with the first badges expected in early 2027.
  - [F] — [Anthropic](https://www.anthropic.com/news/claude-frontier-academy)

#### Explicit timelines and stage gates found
- MIT NANDA: mid-market "top performers reported average timelines of 90 days from pilot to full implementation. Enterprises, by comparison, took nine months or longer." [F] — [MIT NANDA](https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf)
- OpenAI: "Re-evaluate this scoring each quarter as the high-effort use cases you have today might become low-effort as AI capabilities advance." [F] — [OpenAI](https://cdn.openai.com/business-guides-and-resources/identifying-and-scaling-ai-use-cases.pdf)
- Anthropic: capability evals start at a low pass rate. Regression evals should sit near 100%, and high-pass capability evals "graduate" into regression suites. This works as a natural promotion gate. [F] — [Anthropic, Demystifying evals](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)

### Inferences
- **Synthesized phased roadmap.** These durations are the researcher's inference from the sources above, not a single published standard:
  - **Phase 0, Mobilize (weeks 0–6).**
    - Appoint an executive sponsor and adopt business ownership of outcomes (Microsoft CAF).
    - Set up use-case intake and scoring (Microsoft CAF / OpenAI), with baselines and *stop criteria* defined up front (CAF, Gartner).
    - Create a risk-tiering scheme based on autonomy and the reversibility of actions.
  - **Phase 1, Platform foundation (weeks 2–8, in parallel).**
    - Follow the AWS four-step pattern: landing zone, shared tooling, model gateway with token budgets, observability, an eval stage in CI/CD, manual approval gates.
    - Add agent identity and a registry entry for each agent (Microsoft CAF).
  - **Phase 2, Pilots (about 90 days each; 2–3 in parallel).**
    - Redesign the workflow first, start with a single agent, and require human approval for irreversible actions.
    - Exit gates: business-owner-approved acceptance thresholds; pass^k consistency targets for customer-facing agents; security and red-team review for consequential actions; cost per successful task within budget; and measured value against the baseline.
  - **Phase 3, Scale and reuse (months 6–12).**
    - Graduate capability evals into regression suites and add online evals and monitoring.
    - Raise autonomy tier by tier.
    - Bring in showback/chargeback, registry-based lifecycle management, and reusable tools/MCP servers ("the best use case is the reuse case").
  - **Phase 4, Agentic operating model (months 12–24+).**
    - Move to end-to-end process redesign and "agent factories" (McKinsey).
    - Set human–agent ratios per process (Microsoft 2025) and redesign organizational layers (McKinsey 2026).
- **Common stage gates across sources:**
  - a measured business baseline;
  - eval acceptance thresholds approved by the business owner, plus consistency (pass^k);
  - permission and least-privilege review, with human-in-the-loop for high-risk actions;
  - cost per successful task;
  - an accountable owner and registry entry;
  - defined suspension and recovery authority;
  - explicit kill criteria.
- **How the advice has evolved:**
  - 2024 to early 2025 was pattern-level guidance (Anthropic, Google).
  - Mid-2025 brought enterprise playbooks and cautions (OpenAI guides, McKinsey mesh and lessons, Gartner's 40% cancellation forecast, MIT's 95% figure).
  - Late 2025 to 2026 shifted to operating-model, governance and standards framing: Microsoft CAF re-cut into readiness / governance / operational standards (Nov 2026), Deloitte's "silicon-based workforce", McKinsey's agentic organization and "fewer layers", agents treated as managed identities, and vendor certification and FDE programs.

### Gaps
- The McKinsey (HTTP 503) and Gartner (HTTP 403) originals could not be opened. The mesh design principles, the six lessons and the 2026 State of AI figures need confirming against the originals.
- Accenture's agent-specific implementation playbooks (beyond Tech Vision 2025) were not retrieved. Neither were the Google Cloud agent-adoption guidance documents (e.g., Google Cloud's 2026 agent-trends or ROI reports) or the full text of the Google whitepapers.
- No source gives validated, cross-industry durations for an end-to-end "autonomous enterprise" transformation. Published timelines are platform-specific (AWS) or anecdotal (MIT NANDA interviews).
- The researcher did not check the EU AI Act timeline as of Nov 2026, in particular whether high-risk obligations originally due Aug 2026 were deferred by the late-2025 "Digital Omnibus" proposal. This matters for roadmaps in regulated industries.

---

## Key Question 2: How should enterprises select and prioritize agentic use cases (criteria, workflow-vs-agent heuristics, first pilots, process redesign, build vs. buy vs. partner)?

### Takeaway
The sources agree on four points:
- Score candidates on business impact, user desirability and technical feasibility. Feasibility should weight **reversibility and contained blast radius** heavily.
- Use an agent only where reasoning over variable inputs is actually needed. Rules-based automation or RAG is cheaper and safer elsewhere ("least agency").
- Redesign the end-to-end workflow before automating it. Simply layering agents onto existing processes produces "workslop".
- Buy or partner (with deep customization) for commodity and back-office workflows, and build where the workflow is a differentiator.

MIT NANDA's widely cited build/buy claim is real but needs a caveat. In its 52-organization interview sample, external partnerships reached deployment about 67% of the time, against about 33% for internal builds. The data is self-reported, and the authors state that the difference may reflect organizational capability rather than causation.

### Cited Findings

#### "Agent or not?" heuristics
- OpenAI says to prioritize "workflows that have previously resisted automation." Its three criteria are complex decision-making (e.g., refund approval), difficult-to-maintain rules (e.g., vendor security reviews), and heavy reliance on unstructured data (e.g., home-insurance claims). [F] — [OpenAI practical guide](https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf)
- Microsoft CAF:
  - **Traditional automation** for structured, predictable tasks (e.g., invoice routing by vendor code).
  - **RAG** for answers from organizational knowledge where no actions are taken (e.g., an HR policy assistant).
  - **Agents** for tasks where AI "must reason about information and decide or coordinate actions dynamically."
  - "Not every business problem requires an AI agent."
  - [F] — [Microsoft CAF](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/)
- Anthropic: agents "trade latency and cost for better task performance." Workflows suit well-defined tasks, and agents suit open-ended problems that need flexibility at scale. [F] — [Anthropic](https://www.anthropic.com/engineering/building-effective-agents)
- 12-Factor Agents (HumanLayer): many production "agents" are "mostly deterministic code, with LLM steps sprinkled in at just the right points." Factor 10 is "Small, Focused Agents." [F] — [GitHub](https://github.com/humanlayer/12-factor-agents)
- OWASP introduces "Least-Agency": "avoid unnecessary autonomy; deploying agentic behavior where it is not needed expands the attack surface without adding value." [F] — [OWASP Top 10 for Agentic Applications (Dec 2025)](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/)
- Anthropic on multi-agent economics: agents use about 4x the tokens of chat, and multi-agent systems about 15x. Multi-agent is therefore viable only for high-value tasks. It is a good fit for heavily parallelizable work, information exceeding one context window, and many complex tools. It is a poor fit where agents must share context or have many dependencies, which covers "most coding tasks." [F] — [Anthropic, multi-agent research system (Jun 13 2025)](https://www.anthropic.com/engineering/multi-agent-research-system)
- Anthropic on good early domains: coding agents work well because "code solutions are verifiable through automated tests," and customer support works because success is measurable through resolutions. [F] — [Anthropic](https://www.anthropic.com/engineering/building-effective-agents)

#### Prioritization criteria and scoring
- Microsoft CAF scores candidates on three dimensions:
  - **Business impact:** executive strategy alignment with a sponsor; quantified business value (e.g., cost per transaction, resolution time); change-management timeframe.
  - **User desirability:** clear personas; a value proposition that removes a daily pain point; low change resistance ("Weak candidates threaten established roles or habits").
  - **Technical feasibility:** implementation and operation risks, where "the consequences of an incorrect action are reversible or contained" and weak candidates have actions "difficult to undo, such as payments or customer commitments"; mature safeguards; technology fit, since fixed steps are better handled by workflow automation.
  - [F] — [Microsoft CAF Organizational readiness](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/organizational-readiness)
- OpenAI's Impact/Effort framework:
  - **High ROI focus:** quick wins, "often the best place to start building momentum."
  - **Self-service:** personal assistants that often spread across teams.
  - **High-value/high-effort:** transformational (e.g., Moderna's Dose GPT, Klarna's assistant); "Many teams start with quick wins… and use them as inspiration."
  - **Deprioritize:** high effort, low impact.
  - It also identifies three opportunity areas: repetitive low-value tasks, skill bottlenecks, and navigating ambiguity.
  - It lists six use-case "primitives": content creation, research, coding, data analysis, ideation/strategy, and automations.
  - "Top-down support is a key hallmark of successful AI deployments."
  - [F] — [OpenAI](https://cdn.openai.com/business-guides-and-resources/identifying-and-scaling-ai-use-cases.pdf)
- AWS scoping questions: "What specific outcome is the agent responsible for? Who is it acting on behalf of? Who benefits? Where does the agent's autonomy begin and end? What happens when it fails?" It advises: "give it a job title" (e.g., a returns handler or compliance monitor) and start with "focused pilot projects that solve visible pain points." [F] — [AWS](https://docs.aws.amazon.com/prescriptive-guidance/latest/strategy-operationalizing-agentic-ai/focus-areas-agent-intent-scope.html)
- OpenAI's triggers for human oversight: "Actions that are sensitive, irreversible, or have high stakes should trigger human oversight until confidence in the agent's reliability grows," e.g., canceling orders, authorizing large refunds, making payments. Agents should also escalate after exceeding failure thresholds such as retry limits. [F] — [OpenAI](https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf)
- What teams actually build first, per LangChain's survey of primary use cases: customer service 26.5%, research and data analysis 24.4%, internal workflow automation about 18%. In 10,000+ employee organizations, internal productivity leads at 26.8%. [F] — [LangChain](https://www.langchain.com/state-of-agent-engineering)
- Microsoft 2025: "Set your human-agent ratio" by identifying which processes suit full automation and which suit human–AI collaboration. [F] — [Microsoft 2025 Work Trend Index](https://www.microsoft.com/en-us/worklab/work-trend-index/2025-the-year-the-frontier-firm-is-born)
- Stanford's "Future of Work with AI Agents" (WORKBank; Jun 2025; about 1,500 workers, 844 tasks, 104 occupations) found workers mostly want agents to automate low-value, repetitive tasks. It proposes a five-level "Human Agency Scale" (H1–H5), useful for deciding how much autonomy each task gets. [K] — [arXiv 2506.06576](https://arxiv.org/abs/2506.06576)

#### Redesign before automating
- Deloitte warns that layering agents onto existing human-designed workflows "adds work and can create 'workslop'." Its recommended path, as synthesized from the article:
  1. Map end-to-end value streams.
  2. Choose a cross-functional end-to-end process, not a point pain.
  3. Confirm the process is documented and measurable.
  4. Clean and index data for agent discovery.
  5. Prefer multiple specialized, orchestrated agents over monoliths.
  6. Decide what to bridge and what to modernize in legacy systems.
  7. Set autonomy levels and oversight triggers per agent.
  8. Require ROI sign-off and FinOps.
  - It also cites a data-readiness challenge: searchability (48%) and reusability (47%) of data.
  - [F] — [Deloitte](https://www.deloitte.com/us/en/insights/topics/technology-management/tech-trends/2026/agentic-ai-strategy.html)
- BCG reports that the share of organizations using AI to reshape workflows or invent new business models rose from 22% (2025) to 42%. It says the larger gain is "collective" (redesigned team and task flows), not individual productivity. [F] — [BCG AI at Work 2026](https://www.bcg.com/publications/2026/ai-at-work-why-strategy-matters-more-than-tools)
- Microsoft 2026 found documented, repeatable workflows are more common at Frontier firms: at team level 26% vs 19%, function level 29% vs 17%, and organization level 25% vs 14%. [F] — [Microsoft 2026 Work Trend Index](https://www.microsoft.com/en-us/worklab/work-trend-index/agents-human-agency-and-the-opportunity-for-every-organization)
- McKinsey lesson 1, "It's not about the agent; it's about the workflow," and lesson 2, "Agents aren't always the answer." [K] — [McKinsey](https://www.mckinsey.com/capabilities/quantumblack/our-insights/one-year-of-agentic-ai-six-lessons-from-the-people-doing-the-work)

#### Where the ROI is
- MIT NANDA:
  - About 50% of GenAI budgets go to sales and marketing, "but back-office automation often yields better ROI."
  - Documented back-office wins include BPO elimination worth "$2–10M annually in customer service and document processing," a 30% reduction in agency spend, and $1M a year saved on outsourced risk checks in financial services.
  - Front-office wins include 40% faster lead qualification and a 10% retention improvement.
  - These gains "came without material workforce reduction."
  - [F] — [MIT NANDA](https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf)

#### Build vs. buy vs. partner
- MIT NANDA:
  - "External partnerships with learning-capable, customized tools reached deployment ~67% of the time, compared to ~33% for internally built tools," with deployment shares of 66% for strategic partnerships (buy) and 33% for internal builds.
  - Pilots built through partnerships were "2x as likely to reach full deployment," and "employee usage rates were nearly double for externally built tools."
  - Caveats in the report itself: the figures "reflect self-reported outcomes"; they come from a 52-organization sample; and the differences "may reflect organizational capabilities rather than implementation approach alone… does not necessarily prove causation."
  - Successful buyers "treated AI startups less like software vendors and more like business service providers." They demanded deep customization, benchmarked on operational outcomes, partnered through early failures, and "sourced AI initiatives from frontline managers, not central labs."
  - [F] — [MIT NANDA](https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf); restated by Deloitte [F] — [Deloitte](https://www.deloitte.com/us/en/insights/topics/technology-management/tech-trends/2026/agentic-ai-strategy.html)
- *Possible confusion:* a separate build→buy shift statistic (e.g., 47/53 → 24/76) comes from Menlo Ventures' enterprise AI report, not from MIT NANDA. [S] — [search summary referencing smartdev.com](https://smartdev.com/?p=40709). The numbers were not verified.
- Microsoft CAF's sourcing ladder:
  1. Start with prebuilt agents when they meet requirements.
  2. Then low-code (Copilot Studio).
  3. Then pro-code (Foundry).
  4. Then IaaS.
  - "Partner expertise" accelerates delivery, but the organization "should retain business accountability and develop enough internal capability to govern externally delivered solutions." [F] — [Microsoft CAF](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/organizational-readiness)

### Inferences
- **Suggested scoring rubric** (weights are a proposal):
  - Business impact, 30%: quantified value, sponsor, alignment.
  - Feasibility and risk, 30%: reversibility, blast radius, existing safeguards, data readiness and searchability, integration/API availability.
  - Desirability, 20%: daily pain point, change resistance.
  - "Agent fit", 20%: variable inputs, judgment, unstructured data, plus whether outcomes are verifiable for evals.
  - Gate rule: if agent fit is low, route the idea to rules-based automation or RAG.
- **Profile for the first 2–3 pilots:**
  1. A high-volume, back-office document or case-processing workflow with reversible actions and a measurable baseline. Back-office is where MIT finds ROI.
  2. A read-only knowledge or research agent, which is low risk and builds trust and eval muscle.
  3. An engineering or IT-ops agent with verifiable outputs (tests, runbooks).
  - Defer customer-facing agents that issue payments, refunds or commitments until eval consistency (pass^k) and human-approval patterns are proven.
- **Build vs. buy heuristic:**
  - Buy or partner for horizontal and commodity workflows, demanding customization, outcome-based SLAs and learning/memory capability.
  - Build (or co-develop) where proprietary process knowledge is the moat ("owned intelligence" in Microsoft's 2026 framing).
  - Always keep in-house ownership of evals, data access, identity/permissions and the registry, so that vendor agents can be governed. MIT's success-rate gap probably reflects capability differences as well as the buy decision itself.
- Re-score the backlog quarterly (OpenAI). Rising model capability moves items between quadrants.

### Gaps
- There are no published, empirically validated thresholds for transaction volume, error tolerance or autonomy level per use-case type. The criteria are qualitative across all sources.
- No independent replication of MIT NANDA's 67%/33% figure was found. Menlo Ventures' build/buy numbers were not verified.
- Industry-specific prioritization matrices (banking, insurance, healthcare, public sector) were not retrieved beyond examples such as Mapfre's claims handling with a human in the loop for sensitive communications [F] ([Deloitte](https://www.deloitte.com/us/en/insights/topics/technology-management/tech-trends/2026/agentic-ai-strategy.html)).

---

## Key Question 3: What operating models are enterprises using (CoE vs. federated, platform/AgentOps teams, product management, agent registries / "agent HR", human supervisory roles, funding/chargeback, KPIs)?

### Takeaway
The converging model is **federated with a strong central hub**:
- Business functions own each agent's outcomes and residual risk.
- Central functions own platforms, mandatory guardrails, an agent inventory/registry, identity, and enablement (a CoE).
- Cross-functional AgentOps or product teams build and run agents under shared operational standards.

Agents are increasingly managed like a workforce, with identities, owners, onboarding, performance reviews and retirement. Funding is typically central for shared platforms and business-unit funded for specific agents, with showback or chargeback. KPIs are shifting from adoption counts to the following:
- value against a baseline;
- task success and consistency (pass^k);
- cost per successful task;
- escalation and incident rates;
- decision quality.

### Cited Findings

#### Ownership and structure
- Microsoft CAF: "Agents fail more often from unclear ownership than from technical problems." Its role model:
  - **Business ownership:** "The business function that relies on an agent owns its outcomes. It also accepts the agent's residual risk."
  - **Risk and compliance:** sets criteria and reviews higher-risk use cases.
  - **SaaS platform management:** tenant settings and builder policies; manages "shared platform capabilities rather than assume ownership of every agent."
  - **Azure platform management.**
  - **Workload development teams:** build and run agents as managed solutions under the operational standards.
  - **Individual builders:** "an employee-created agent that becomes business-critical requires formal ownership and operational accountability."
  - **AI enablement:** an existing function or a dedicated AI CoE, with dedicated teams justified "when adoption spans multiple business units."
  - [F] — [Microsoft CAF Organizational readiness](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/organizational-readiness)
- MIT NANDA: "companies succeed when they decentralize implementation authority but retain accountability." Successful organizations "allowed budget holders and domain managers to surface problems, vet tools, and lead rollouts," paired with "executive accountability." [F] — [MIT NANDA](https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf)
- Deloitte takes a more centralized stance: "Stop individual teams from designing their own AI solutions. Route investments through a central review board" (e.g., Dell's architectural review board), with financial sign-off required before production. [F] — [Deloitte](https://www.deloitte.com/us/en/insights/topics/technology-management/tech-trends/2026/agentic-ai-strategy.html). *This tension with MIT's "decentralize" finding is reconciled by hub-and-spoke models: decentralized sourcing and building, centralized standards and investment gates.*
- AWS: "Businesses must establish AgentOps teams that include AI/ML practitioners and domain specialists, such distributed systems architects, software engineers, product owners, compliance leads, and platform architects. These teams jointly own the entire lifecycle of an agent." "Just as DevOps unifies development and operations, AgentOps connects intelligence with governance and execution." It also recommends CoEs, cross-functional governance committees, and "arbiter agents" acting as trust brokers for policy-aware delegation. [F] — [AWS](https://docs.aws.amazon.com/prescriptive-guidance/latest/strategy-operationalizing-agentic-ai/preparing-business.html)
- McKinsey:
  - Structures will pivot to "small, outcome-focused agentic teams" with flat decision structures [S].
  - Human oversight is framed as "in the loop, or above the loop" [S].
  - It names a role of "agent orchestrators" who design and supervise agent workflows [S].
  - Sources: [McKinsey agentic organization](https://www.mckinsey.com/capabilities/people-and-organization/our-insights/the-agentic-organization-contours-of-the-next-paradigm-for-the-ai-era); [McKinsey podcast](https://www.mckinsey.com/capabilities/people-and-organization/our-insights/ai-is-everywhere-the-agentic-organization-isnt-yet); [McKinsey blog, six shifts](https://www.mckinsey.com/capabilities/people-and-organization/our-insights/the-organization-blog/six-shifts-to-build-the-agentic-organization-of-the-future)
- Gartner predicts that by 2028, 45% of CIOs will lead AI agent systems outside IT. [S — page attribution from search summary] — [Gartner, AI Agent Layer](https://www.gartner.com/en/articles/ai-agent-layer)
- [Apr 23 2025] Microsoft Work Trend Index 2025:
  - Three phases: (1) human with assistant; (2) human–agent teams where agents act as "digital colleagues"; (3) human-led, agent-operated, where "agent-run workflows" are directed by humans.
  - An "agent boss" is someone who "builds, delegates to, and manages agents."
  - The "human-agent ratio" is a metric for how many agents a task needs and how many humans should guide them.
  - Leaders expect within five years that teams will build multi-agent systems (42%), train agents (41%), redesign processes with AI (38%) and manage agents (36%).
  - Recommendations: "Hire your first digital employees… onboard, assign ownership to, and measure these agents."
  - [F] — [Microsoft 2025 Work Trend Index](https://www.microsoft.com/en-us/worklab/work-trend-index/2025-the-year-the-frontier-firm-is-born)
- [May 5 2026] Microsoft Work Trend Index 2026 sets out a four-role coordination model:
  - Employees redesign work around intent and review.
  - Leaders redesign processes around outcomes and agent autonomy.
  - IT treats "agents as managed entities with identities, permissions, and lifecycle management."
  - Security embeds monitoring, policy enforcement and auditability into the platform.
  - "Evaluation infrastructure" must answer: who reviews agent performance, who can update agent workflows, and how local wins get scaled.
  - New concepts: "Learning System," "Owned Intelligence," and four collaboration modes (delegation, collaboration, asking, exploration).
  - *Evolution:* the 2026 page no longer uses the "agent boss" framing from 2025.
  - [F] — [Microsoft 2026 Work Trend Index](https://www.microsoft.com/en-us/worklab/work-trend-index/agents-human-agency-and-the-opportunity-for-every-organization)
  - *Conflict:* some secondary write-ups describe the 2026 modes as "Director" and "Orchestrator" (humans designing systems of agents). Those labels do not appear on Microsoft's own report page, which uses delegation / collaboration / asking / exploration. [S] — [Mervin Praison summary](https://mer.vin/2026/06/microsoft-2026-work-trend-index-how-frontier-firms-orchestrate-human-agent-teams/). Treat them as unverified.

#### Agent registry and "agent HR" lifecycle
- Microsoft CAF:
  - "Every agent should be discoverable through an approved inventory process… Each inventory entry should identify the agent's accountable owner and risk classification." The Microsoft Agent 365 Agent Registry covers Microsoft agents and supported third-party agents; governance teams add inventory data from other platforms.
  - Lifecycle policies cover visibility, access, distribution and retirement.
  - Agent identity follows least privilege with periodic review (Entra Agent ID). For example, a ticket-summarizing agent "needs read access to the ticketing system, not write access."
  - Governance is risk-based: "Autonomy level and impact of incorrect action factors determine an agent's risk."
  - "Centralized visibility doesn't require central approval of every agent."
  - [F] — [Microsoft CAF Architecture & governance](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/architecture-governance)
- Microsoft CAF on retirement: it "should disable agent execution and revoke associated permissions," and stored information follows retention rules. Owners confirm completion. [F] — [Microsoft CAF Operational standards](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/operational-standards)
- Deloitte's "HR for agents":
  - **Onboarding:** train the agent on enterprise data and train the human supervisor in parallel.
  - **Performance management:** prove "what agents did, why, and under whose authority" using digital identity, cryptographic receipts and immutable logs, possibly with monitoring agents.
  - **Lifecycle management:** updates, redeployment, retirement. Some organizations name agents to track productivity.
  - **Zero-trust** ephemeral authentication.
  - "Human performance standards should not be applied to agents without adjustment."
  - Example: Moderna merged technology and HR under a chief people and digital technology officer.
  - [F] — [Deloitte](https://www.deloitte.com/us/en/insights/topics/technology-management/tech-trends/2026/agentic-ai-strategy.html)
- BCG: half of employees say their companies lack clear governance for managing teams of people and AI. [F] — [BCG AI at Work 2026](https://www.bcg.com/publications/2026/ai-at-work-why-strategy-matters-more-than-tools)

#### Product management for agents
- OpenAI / Estée Lauder: cross-discipline teams of business user, SME and technical lead. The business user writes a two-page brief on purpose, scope and audience; the team ships a user guide and iterates through feedback loops. [F] — [OpenAI](https://cdn.openai.com/business-guides-and-resources/identifying-and-scaling-ai-use-cases.pdf)
- Anthropic on eval ownership: "dedicated eval infrastructure owners," with domain experts and product teams contributing tasks, and "eval-driven development." [F] — [Anthropic](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)
- Hamel Husain and Shreya Shankar: a single domain expert acting as a "benevolent dictator" is the most effective way to make quality decisions for most teams. Internal platforms should "standardize these processes while letting each team develop its own metrics." [F] — [Hamel.dev, AI Evals FAQ (updated Sep 2026)](https://hamel.dev/blog/posts/evals-faq/)

#### Funding and chargeback
- Microsoft CAF:
  - "A combined approach funds shared platforms centrally and business-specific agents locally. Most organizations use this combination."
  - Each business unit has an accountable budget owner. "Showback is appropriate when business units need visibility without direct cost recovery. Chargeback is appropriate when consumption costs need to affect individual business-unit budgets."
  - Spending thresholds scale with criticality, and experimental agents get restrictive limits.
  - [F] — [Microsoft CAF Organizational readiness](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/organizational-readiness); [Operational standards](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/operational-standards)
- AWS recommends a central Generative AI Gateway with token budget controls and "platform-level token budget enforcement, preventing unexpected spend from autonomous agent behavior." [F] — [AWS](https://docs.aws.amazon.com/prescriptive-guidance/latest/agent-ops-maturity-roadmap-for-enterprise-ai/introduction.html)
- Deloitte's FinOps for agents: resource tagging, real-time monitoring, autoscaling and rightsizing, and governance over token-based pricing. [F] — [Deloitte](https://www.deloitte.com/us/en/insights/topics/technology-management/tech-trends/2026/agentic-ai-strategy.html)

#### KPI frameworks
- Microsoft CAF:
  - "Cost per successful task provides a useful measure when outcomes are comparable."
  - "Sustained cost increases or declining task success rates should trigger additional review."
  - A business baseline (e.g., average handling time) comes first.
  - Separate "measurable financial benefits from productivity improvements that don't directly affect financial results."
  - Incident severity should "reflect the consequences of agent actions, not just service availability," with defined suspension and recovery authority.
  - [F] — [Microsoft CAF](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/operational-standards)
- AWS's "decision-first" KPIs: decision quality, time-to-action and cognitive offload ("Did it reduce effort or just shift it?"). It also cites decision latency, resolution accuracy and cost savings. [F] — [AWS](https://docs.aws.amazon.com/prescriptive-guidance/latest/strategy-operationalizing-agentic-ai/preparing-business.html)
- Anthropic on reliability metrics: pass@k (at least one success in k tries) versus pass^k (all k succeed). At 75% per-trial success, pass^3 ≈ 42%. "Use pass^k when consistency is essential, such as customer-facing agents." [F] — [Anthropic](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)
- BCG says to "measure value, not adoption" and to reinvest saved time deliberately. 66% of frontline employees get limited or no guidance on using the time AI saves them. [F] — [BCG](https://www.bcg.com/publications/2026/ai-at-work-why-strategy-matters-more-than-tools)
- LangChain on observability maturity: 89% have some observability and 62% detailed tracing. Among organizations with agents in production, 94% have observability and 71.5% full tracing. Offline evals are used by 52.4% and online evals by 37.3% (44.8% among production organizations). [F] — [LangChain](https://www.langchain.com/state-of-agent-engineering)

### Inferences
- **Recommended structure (hub and spoke):**
  - (a) An **Agent Platform team** owning the gateway, runtime, MCP/tool catalog, identity integration, observability, eval harness and CI/CD.
  - (b) An **AI CoE / Enablement** function owning standards, training, community of practice and the intake/scoring process.
  - (c) **Agent product pods** inside business units: product owner, AI/agent engineers, SME, eval engineer, with a forward-deployed engineer at the start.
  - (d) **Risk, Security and Compliance** owning risk tiering, red-teaming and incident authority.
  - (e) An **architecture/investment review board** for production gates (Deloitte/Dell).
  - This reconciles MIT's "decentralize authority, retain accountability" with Deloitte's "central review board."
- **Registry minimum fields** (synthesized from Microsoft CAF and Deloitte): accountable business owner; technical owner; risk tier and autonomy level; permitted tools and data; identity; model and version; eval acceptance thresholds and last results; budget; human-escalation path; incident and suspension contacts; retirement criteria.
- **KPI tree for an agent scorecard:**
  - **Value:** cost per case vs baseline, cycle time, revenue/retention.
  - **Quality:** task success rate, pass^k, error/defect rate, incident count by severity.
  - **Autonomy:** straight-through-processing rate, human-touch rate, escalation rate *and* escalation precision.
  - **Efficiency:** cost per successful task, tokens per task, latency.
  - **Experience and adoption:** CSAT, override/rejection rate, active users.
  - **Risk:** policy violations, injection detections, permission drift.
  - *The sources support most of these metrics individually. No single published standard bundles them.*
- The human-agent ratio (Microsoft 2025) and McKinsey's "2–5 humans for 50–100 agents" are planning heuristics, not benchmarks. Treat them as targets to measure, not assumptions.

### Gaps
- The researcher could not verify registry and lifecycle offerings outside Microsoft: AWS Bedrock AgentCore, Google Gemini Enterprise agent management, Salesforce Agentforce, ServiceNow AI Control Tower and Workday's Agent System of Record.
- No benchmark values were found for STP or escalation rates, or for typical human-agent ratios by function.
- No survey data was found on how prevalent chargeback vs showback is for agents.
- Product-management-for-agents practices (roadmapping, pricing, discovery) are thinly documented outside the eval-ownership guidance.

---

## Key Question 4: Which team roles and skills are needed to build agentic systems, and what learning resources and certifications exist in 2025–2026?

### Takeaway
The core build team combines:
- AI/agent engineers who integrate models, tools and context;
- an evaluation and quality capability, which practitioners say consumes most development time;
- platform/AgentOps engineers;
- data and knowledge engineers;
- AI security;
- an AI product owner;
- a domain SME empowered to make quality calls;
- forward-deployed engineers (FDEs) to land early use cases.

The skills that matter are context engineering, tool/ACI design, MCP and A2A, error analysis and evals, observability, agent security (least agency, identity) and FinOps. The certification market matured sharply in 2026:
- AWS's GenAI Developer Professional (AIP-C01);
- Microsoft's AI-103 (replacing AI-102) and the AB-100 expert credential;
- Google's Professional Agentic Architect, which includes hands-on labs;
- Anthropic's four Claude certifications (partner-network only) and its Frontier Academy FDE residency.

Vendor-neutral learning comes from DeepLearning.AI, Hugging Face, LangChain Academy and practitioner texts.

### Cited Findings

#### Roles and demand signals
- Microsoft 2025: 78% of leaders are considering hiring for AI-specific roles (95% at Frontier Firms). 32% plan to hire AI agent specialists, 35% are considering AI trainers and 28% are considering AI workforce managers. Emerging roles listed: AI trainers, AI data specialists, AI security specialists, AI agent specialists, AI ROI analysts, AI business process consultants, Chief AI Officer, AI workforce managers. [F] — [Microsoft 2025 Work Trend Index](https://www.microsoft.com/en-us/worklab/work-trend-index/2025-the-year-the-frontier-firm-is-born)
- Microsoft 2026: employers created at least 1.3M AI-related job opportunities in two years (LinkedIn data). The most important human skills are "quality control of AI output" (50%) and critical thinking (46%), and 86% treat AI output as a starting point. [F] — [Microsoft 2026 Work Trend Index](https://www.microsoft.com/en-us/worklab/work-trend-index/agents-human-agency-and-the-opportunity-for-every-organization)
- Deloitte's roles: **agent supervisors**, humans who "enter workflows at designed handoff points to handle exceptions and critical decisions"; compliance and governance staff; and growth and innovation staff. [F] — [Deloitte](https://www.deloitte.com/us/en/insights/topics/technology-management/tech-trends/2026/agentic-ai-strategy.html)
- Forward-deployed engineers (FDEs):
  - Indeed counts rose from 643 to 8,137 between Apr 2025 and Apr 2026.
  - Plank counted 1,143 open FDE roles at 462 companies as of 13 Nov 2026.
  - Bloomberry's review of 1,000 postings found a median salary of $173,816.
  - AWS reportedly committed $1B to a dedicated forward-deployed engineering organization (Jun 2026), and Microsoft launched a forward-deployed business (Jul 2026, per Plank).
  - These are secondary trackers with different baselines. [S] — [Plank, State of FDE 2026](https://joinplank.com/state-of-fde); [Vishleshan analysis](https://vishleshan.ai/blogs/fde-job-postings-growth-enterprise-ai-buyers); [Perspective AI](https://getperspective.ai/blog/2026-fde-hiring-trends-what-1000-job-posts-reveal)
- Anthropic's FDE profile: "hands-on software engineers with solid fundamentals, a track record of building with LLMs, experience helping others adopt AI." Prior agent-building experience is not required, and each participant arrives with a named project to lead. [F] — [Anthropic, Claude Frontier Academy](https://www.anthropic.com/news/claude-frontier-academy)
- AWS role mix:
  - AgentOps teams: AI/ML practitioners, domain specialists, distributed-systems architects, software engineers, product owners, compliance leads, platform architects.
  - Platform guide audiences: cloud architects, platform engineers building internal AI agent platforms, security and compliance teams, DevOps/MLOps engineers.
  - [F] — [AWS preparing business](https://docs.aws.amazon.com/prescriptive-guidance/latest/strategy-operationalizing-agentic-ai/preparing-business.html); [AWS guide intro](https://docs.aws.amazon.com/prescriptive-guidance/latest/agent-ops-maturity-roadmap-for-enterprise-ai/introduction.html)
- The AWS AIP-C01 GenAI developer profile excludes "model development and training," "advanced ML techniques," and "data engineering and feature engineering." This confirms the GenAI/agent developer role is integration-centric. [F] — [AWS AIP-C01 exam guide](https://docs.aws.amazon.com/aws-certification/latest/ai-professional-01/ai-professional-01.html)
- Microsoft AI-103 role: an Azure AI engineer "who builds, manages, and deploys agents and AI solutions" and collaborates with business stakeholders, solution architects, data scientists, DevOps engineers and cloud security engineers. [F] — [Microsoft Learn](https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-apps-and-agents-developer-associate/)
- Hamel Husain and Shreya Shankar on the evaluation workload: "60-80% of our development time on error analysis and evaluation." Outsourcing error analysis is "usually a big mistake." [F] — [Hamel.dev](https://hamel.dev/blog/posts/evals-faq/)
- Cognition calls context engineering "the #1 job of engineers building AI agents." [F] — [Cognition, "Don't Build Multi-Agents" (Jun 12 2025)](https://cognition.com/blog/dont-build-multi-agents)
- The "AI engineer" role was originally framed by swyx in "The Rise of the AI Engineer" (Jun 2023). [K] — [Latent Space](https://www.latent.space/p/ai-engineer)

#### Technical skills the sources emphasize
- **Context engineering** (Anthropic, Sep 29 2025):
  - Context is a finite "attention budget," and "context rot" sets in as it grows.
  - Write system prompts at the "right altitude."
  - Keep tool sets minimal and unambiguous.
  - Use canonical examples, not "laundry lists" of rules.
  - Use just-in-time retrieval.
  - For long horizons, use compaction, structured note-taking (e.g., NOTES.md) and sub-agents with clean context.
  - Goal: "the smallest set of high-signal tokens."
  - [F] — [Anthropic](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- **Tool/ACI design** (Anthropic, Sep 11 2025):
  - "More tools don't always lead to better outcomes." Consolidate multi-step operations into one tool (e.g., `search_logs`).
  - Namespace tools (e.g., `asana_search`).
  - Return "only high signal information" and offer a `response_format` option.
  - Paginate and truncate, and write actionable error messages.
  - Describe tools as you would for a new hire.
  - Improve them through an evaluation loop over real tasks with held-out test sets.
  - [F] — [Anthropic](https://www.anthropic.com/engineering/writing-tools-for-agents)
  - "Poka-yoke your tools": requiring absolute file paths eliminated a class of errors. [F] — [Anthropic](https://www.anthropic.com/engineering/building-effective-agents)
- **Evals** (Anthropic, Jan 9 2026):
  - Vocabulary: task, trial, grader, transcript, outcome, harness, suite.
  - Code-based, model-based and human graders.
  - Capability vs regression evals; pass@k vs pass^k.
  - "20-50 simple tasks drawn from real failures is a great start."
  - "Grade what the agent produced rather than the exact path."
  - Read transcripts.
  - Isolated trials from a clean environment.
  - [F] — [Anthropic](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)
- **Protocols:** MCP and A2A appear in Microsoft CAF interoperability standards, which warn that "requiring these protocols for every agent can introduce unnecessary constraints". [F] — [Microsoft CAF](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/operational-standards). AWS calls MCP and A2A "foundational". [F] — [AWS](https://docs.aws.amazon.com/prescriptive-guidance/latest/strategy-operationalizing-agentic-ai/preparing-business.html). Deloitte compares MCP, A2A and ACP and frames them as a "microservices approach to AI". [F] — [Deloitte](https://www.deloitte.com/us/en/insights/topics/technology-management/tech-trends/2026/agentic-ai-strategy.html)
- **Security:** OWASP Top 10 for Agentic Applications (Dec 9 2025):
  - ASI01 Agent Goal Hijack
  - ASI02 Tool Misuse and Exploitation
  - ASI03 Identity and Privilege Abuse
  - ASI04 Agentic Supply Chain Vulnerabilities
  - ASI05 Unexpected Code Execution (RCE)
  - ASI06 Memory & Context Poisoning
  - ASI07 Insecure Inter-Agent Communication
  - ASI08 Cascading Failures
  - ASI09 Human-Agent Trust Exploitation
  - ASI10 Rogue Agents
  - It sets out the principles of "Least-Agency" and non-negotiable observability. [F] — [OWASP](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/)

#### Learning resources (status Nov 2026)
- **DeepLearning.AI, "Agentic AI"** (Andrew Ng; intermediate; 9h55m; 31 videos, 7 code examples, 8 graded assignments; updated 30 Oct 2026):
  - Modules: introduction to agentic workflows; reflection; tool use; practical tips (evals, error analysis); patterns for highly autonomous agents (planning, multi-agent).
  - Certificate requires Pro ($25/month annual or $30/month monthly).
  - [F] — [DeepLearning.AI](https://www.deeplearning.ai/courses/agentic-ai)
- **DeepLearning.AI short courses** include "MCP: Build Rich-Context AI Apps with Anthropic," "Evaluating AI Agents" (Arize), "Evaluating and Improving Agentic Applications," "Agent Memory: Building Memory-Aware Agents," "Long-Term Agentic Memory With LangGraph," and "LLMs as Operating Systems: Agent Memory." [S] — [DeepLearning.AI catalog](https://www.deeplearning.ai/courses)
- **Hugging Face Agents Course:** free, with separate units on smolagents, LlamaIndex and LangGraph, and a certificate. The certificate thresholds conflict across official pages (30% vs 80% quiz score). Hugging Face also runs a separate **MCP Course**. [S] — [Hugging Face Agents Course](https://huggingface.co/learn/agents-course); [MCP Course](https://huggingface.co/learn/mcp-course) [K]
- **LangChain Academy:**
  - LangChain Essentials (`create_agent`)
  - Deep Agents, for long-running agents on LangChain's open-source agent harness
  - Building Ambient Agents with LangGraph
  - Introduction to LangSmith (observability and evaluation)
  - Deep Research with LangGraph (multi-agent plus LangSmith evaluation)
  - [S] — [LangChain Academy](https://academy.langchain.com/)
- **Anthropic Academy:** free self-paced courses. Third-party counts of 13–27 courses conflict; several third parties give a 2 Mar 2026 launch with 13 courses at the time. Completion earns a certificate of completion, which is not a certification. [S] — [Claude Academy FAQ](https://academy.claude.com/help/faq); [Anthropic Skilljar](https://anthropic.skilljar.com/) [K]
- **Microsoft:** AI Skills Navigator with free practice assessments [F] ([Microsoft CAF](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/organizational-readiness)), and the open "AI Agents for Beginners" curriculum [K] ([GitHub](https://github.com/microsoft/ai-agents-for-beginners)).
- **Google:** the 5-Day AI Agents Intensive with Kaggle (Nov 2025) and its whitepapers [S] ([Google Cloud blog](https://cloud.google.com/blog/products/ai-machine-learning/a-devs-guide-to-production-ready-ai-agents)), plus a free Professional Agentic Architect learning path on Google Skills [F] ([skills.google path 4525](https://www.skills.google/paths/4525)).
- **Practitioner canon:**
  - Hamel Husain and Shreya Shankar, "AI Evals: Everything You Need to Know" (FAQ, updated Sep 2026) [F] — [Hamel.dev](https://hamel.dev/blog/posts/evals-faq/)
  - HumanLayer, 12-Factor Agents [F] — [GitHub](https://github.com/humanlayer/12-factor-agents)
  - Chip Huyen, *AI Engineering: Building Applications with Foundation Models* (O'Reilly, 2025) [K] — [O'Reilly](https://www.oreilly.com/library/view/ai-engineering/9781098166298/); her "Agents" essay (Jan 2025) [K] — [huyenchip.com](https://huyenchip.com/2025/01/07/agents.html)
  - Eugene Yan on LLM patterns and task-specific evals [K] — [eugeneyan.com/llm-patterns](https://eugeneyan.com/writing/llm-patterns/); [eugeneyan.com/evals](https://eugeneyan.com/writing/evals/)
  - Anthropic Engineering posts (above) [F]
  - OpenAI guides (above) [F]

#### Certifications (status Nov 2026)
- **AWS Certified Generative AI Developer – Professional (AIP-C01).**
  - Target candidate: 2+ years building production applications plus 1 year of hands-on GenAI.
  - Format: 65 scored and 10 unscored questions; passing score 750 out of 1,000.
  - Domains: FM integration, data management and compliance 31%; implementation and integration 26%; AI safety, security and governance 20%; operational efficiency and optimization 12%; testing, validation and troubleshooting 11%.
  - Explicit task statement: "Implement agentic AI solutions."
  - The official page lists 180 minutes; a third-party listing says 205 minutes [S].
  - [F] — [AWS exam guide](https://docs.aws.amazon.com/aws-certification/latest/ai-professional-01/ai-professional-01.html)
  - Entry level: AWS Certified AI Practitioner [K] — [AWS](https://aws.amazon.com/certification/certified-ai-practitioner/)
- **Microsoft Certified: Azure AI Apps and Agents Developer Associate (AI-103).**
  - Assesses: plan and manage an Azure AI solution; implement generative AI and agentic solutions; computer vision; text analysis; information extraction.
  - 120 minutes, proctored, through Pearson VUE.
  - Page updated 5 Nov 2026 [F]. A Microsoft Q&A moderator states that AI-102 (Azure AI Engineer Associate) was retired and that AI-103 is now required. [S]
  - Third-party weightings: generative AI and agentic 30–35%; plan/manage 25–30%. [S]
  - [F] — [Microsoft Learn](https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-apps-and-agents-developer-associate/); [Microsoft Q&A](https://learn.microsoft.com/en-us/answers/questions/6018370/request-for-clarification-on-ai-102-renewal-and-ai)
- **Microsoft Certified: Agentic AI Business Solutions Architect Expert (AB-100).**
  - Requires AB-100 plus one qualifying associate certification. Qualifying associates include AI-103, AB-620 (AI Agent Builder Associate), AB-410 (Intelligent Applications Builder), AI-300 (Machine Learning Operations Engineer Associate), PL-400 and several Dynamics 365 credentials.
  - Competencies include multi-agent orchestration, A2A and MCP, securing against prompt manipulation, monitoring agent telemetry, and ROI analysis.
  - Responsibilities include "defining the roadmap for agentic-first business processes."
  - Certification updated 16 Nov 2026.
  - [F] — [Microsoft Learn](https://learn.microsoft.com/en-us/credentials/certifications/agentic-ai-business-solutions-architect/)
  - A "Multi-Agent AI Solutions Expert" (AI-500, requiring AI-103) is referenced in Microsoft Q&A and third-party guides; details were not verified. [S] — [Microsoft Q&A](https://learn.microsoft.com/en-us/answers/questions/6044733/microsoft-certified-multi-agent-ai-solutions-exper)
- **Google Cloud Professional Agentic Architect.**
  - Assesses: build agents with low-code tools; use coding agents for development; develop custom agents; evaluate and deploy agentic workflows; secure and govern agentic workflows.
  - Format: a proctored exam (2 hours; 50–60 multiple-choice questions; $200; Pearson) followed by separate hands-on labs in Google Skills.
  - Valid 1 year; no prerequisites.
  - Recommended experience: 3+ years on cloud solutions, including 1+ year building agentic solutions on Google Cloud.
  - [F] — [Google Cloud](https://cloud.google.com/learn/certification/agentic-architect/)
  - A search-indexed version of the certification page mentioned a discounted beta and a GA launch in mid-November 2026. The live page fetched on 21 Nov 2026 carried no launch timing. [S]
  - The exam guide reportedly weights custom agent development at about one-third and securing/governing agentic workflows at about 15%. [S] — [Google exam guide PDF](https://services.google.com/fh/files/misc/professional%5Fagentic%5Farchitect%5Fexam%5Fguide%5Fenglish.pdf)
  - Google's announcement describes a proctored multiple-choice exam plus Google Skills labs that assess hands-on practice. [S] — [Google blog](https://blog.google/innovation-and-ai/infrastructure-and-cloud/google-cloud/professional-agentic-architect)
- **Google Generative AI Leader** (non-technical; $99; 90 minutes; launched 14 May 2025). [S] — [Google Cloud blog](https://cloud.google.com/blog/topics/training-certifications/new-google-cloud-certification-in-generative-ai/)
- **Anthropic Claude Certification Program** (announced 23 Jul 2026).
  - Four certifications: "Claude Certified Associate: Foundations," "Claude Certified Developer: Foundations" (API, tool use, agent development), "Claude Certified Architect: Foundations," and "Claude Certified Architect: Professional" (integration architecture, governance, evaluation).
  - Exams are proctored through Pearson, with Credly badges.
  - **Only Claude Partner Network members** can sit them; membership is free.
  - More than 36,000 consultants at over 1,300 organizations certified since March 2026; more than 400,000 people completed Partner Academy training in 2026.
  - Committed targets: Accenture 50,000, PwC 30,000, Deloitte 15,000, KPMG 15,000.
  - [F] — [Claude](https://claude.com/resources/articles/four-role-based-claude-certifications)
  - *Conflicting later figure:* a search excerpt of a later Anthropic post reports more than 175,000 Claude certifications across about 46,000 firms. The attribution is uncertain; it is likely the Services Track / Partner Hub announcement. Anthropic is also committing an initial $100M to the Partner Network for 2026. [S] — [Anthropic, Services Track & Partner Hub](https://www.anthropic.com/news/services-track-partner-hub); [Anthropic, Claude Partner Network](https://www.anthropic.com/news/claude-partner-network)
- **Anthropic Claude Frontier Academy** (2 Oct 2026; nomination-only; cohorts in SF, NY and London).
  - Multi-day program, then a graded practical earning the "Claude Resident Engineer" badge.
  - A 12-week residency leading a real use case, then the "Claude Frontier Deployed Engineer" badge (first expected early 2027).
  - [F] — [Anthropic](https://www.anthropic.com/news/claude-frontier-academy)
- Google's Professional ML Engineer exam was reportedly updated in June 2026 for the "Gemini Enterprise Agent Platform," and Google Cloud exams moved to Pearson VUE. [S, secondary] — [DirectCertify](https://www.directcertify.com/blog/google-cloud-certification-changes-2026-pearson-vue-and-ai-exam-overhaul/)

### Inferences
- **Skills matrix** (rows = roles; columns = skills; proficiency levels 1 aware, 2 practitioner, 3 lead):
  - **AI/Agent Engineer:** context engineering 3, tool/MCP design 3, evals 2, observability 2, security 2, FinOps 1.
  - **Eval/Quality Engineer:** evals 3 (error analysis, LLM-judge validation via true-positive/true-negative rates, harnesses), domain collaboration 3, statistics 2.
  - **Agent Platform / AgentOps Engineer:** gateway/runtime/CI-CD 3, observability 3, identity 2, FinOps 2.
  - **Data and Knowledge Engineer:** retrieval and indexing 3 (Recall@k/MRR), data governance 2, memory design 2.
  - **AI Security Engineer:** OWASP ASI01–10 3, agent identity and least privilege 3, red-teaming 3.
  - **AI Product Manager:** use-case scoring 3, baseline and KPI design 3, eval criteria ownership 2, change management 2.
  - **Domain SME / "benevolent dictator":** quality labeling 3, failure taxonomy 2.
  - **Forward-deployed engineer:** a full-stack mix of the above at level 2–3, plus stakeholder skills.
- **Curriculum tiers:**
  - **Tier 0, Everyone:** AI fluency, quality control of AI output, critical thinking (Microsoft 2026). Microsoft CAF warns that uniform training for all employees wastes budget, so keep this tier short.
  - **Tier 1, Builders (low-code):** vendor builder tracks, e.g., AB-620.
  - **Tier 2, Engineers (6–8 weeks part-time):**
    - DeepLearning.AI Agentic AI
    - Hugging Face Agents and MCP courses
    - Anthropic's building-effective-agents, context-engineering and tools posts
    - OpenAI's practical guide
    - 12-Factor Agents
  - **Tier 3, Specialists:**
    - Evals: Anthropic evals post, Hamel/Shreya FAQ, DeepLearning.AI eval courses.
    - Platform/AgentOps: AWS or Microsoft CAF guides, LangSmith/observability.
    - Security: OWASP agentic Top 10, identity guidance.
    - Then one cloud certification matching the run platform: AIP-C01, AI-103 → AB-100, or Google Professional Agentic Architect.
  - **Tier 4, Learn-by-shipping:** a 12-week internal "residency" modeled on Frontier Academy, in which each engineer leads one real use case through security review to handover.
- **Certification caveats:**
  - Anthropic's certifications are gated to the partner network, so in-house enterprise staff may not be eligible unless their employer joins.
  - Google's agentic credential is valid for only one year, which implies a recurring cost.
  - Vendor certifications validate platform knowledge, not eval or judgment skill. Pair them with internal practical assessments.

### Gaps
- No independent evidence links any agent certification to job performance.
- The Anthropic Academy course catalog and count, AI-500 details, the exact AI-102 retirement date, Google beta/GA dates and exam-domain weights (the exam-guide PDF was not opened), and Google Gen AI Leader validity (third parties conflict) were not verified.
- Other credentials were not checked: NVIDIA agentic AI certification, Databricks GenAI Engineer, IBM/Coursera and Vanderbilt agentic specializations, and Salesforce Agentforce Specialist.
- The researcher did not retrieve rigorous data on team ratios, such as evaluators per engineer or SMEs per pod.

---

## Key Question 5: What does the evidence say about change management and workforce (upskilling, adoption barriers, trust, communication, job redesign)?

### Takeaway
The binding constraint is organizational, not technical:
- Microsoft finds organizational factors (culture, manager support, talent practices) are associated with roughly twice the reported AI impact of individual effort.
- BCG finds that strategic clarity beats tool access.
- Adoption is high but training lags: BCG reports 74% frontline regular use but only 36% feel adequately upskilled.
- Most employees are not rewarded for reinventing work (13% say they are).
- Trust is fragile: 46% of people globally are willing to trust AI, and 56% report AI-caused mistakes.

What works, according to these sources:
- leaders who own strategic clarity;
- managers who visibly model AI use and create psychological safety;
- role-based (not uniform) training plus hands-on practice;
- deliberately redesigning work and reinvesting saved time;
- channeling "shadow AI" power users into sanctioned champions;
- transparent communication that positions agents as teammates, with clear override paths.

### Cited Findings
- **BCG AI at Work 2026** (4th edition, 3 Jun 2026; close to 12,000 employees, managers and leaders in more than a dozen markets):
  - Adoption and time savings:
    - 74% of frontline employees use AI "every day or a few times a week" (up 23 points).
    - 42% of regular frontline users save 8 hours a week.
    - 66% get limited or no guidance on using saved time, and more than half don't reinvest it in strategic work.
  - Skills and leadership signals:
    - 72% say skill expectations have shifted, but only 36% feel adequately upskilled.
    - Only about a third find leadership's AI communications clear.
    - Only 28% see a strong link between what leaders say and what the organization does.
  - Changes to work:
    - 67% say AI took over simpler tasks.
    - 60% say the bar for "good enough" is higher.
    - Half or more spend more time reviewing AI output or directing AI.
  - Wellbeing: more than two-thirds of regular users report higher job satisfaction, but 41% report increased mental strain (48% of leaders).
  - Agents: 61% believe agents could do at least half their job within three years.
  - Strategy vs tools: "Employees with clear strategic direction but limited tool access outperform those with strong tool access but no direction."
  - [F] — [BCG](https://www.bcg.com/publications/2026/ai-at-work-why-strategy-matters-more-than-tools)
- **Microsoft Work Trend Index 2026** (20,000 AI-using knowledge workers in 10 markets; Edelman, Feb–Apr 2026; associational, not causal):
  - Organizational factors account for roughly twice the reported AI impact of individual effort (67% vs 32%).
  - The "Transformation Paradox":
    - Only 26% say leadership is clearly aligned on AI.
    - 65% fear falling behind, yet 45% say it is safer to focus on current goals.
    - Only 13% are rewarded for reinventing work with AI even if results fall short.
  - In a separate Microsoft study of 1,800 workers, when managers modeled AI use, reported AI value rose 17 points, critical thinking about AI 22 points, and trust in agentic AI 30 points. Psychological safety was associated with up to 20 points higher readiness and 1.4x more high-frequency agentic use.
  - Frontier teams are more likely to share learnings and mistakes (61% vs 36%) and to discuss quality standards (54% vs 29%).
  - Frontier Professionals deliberately do some work without AI to keep skills sharp (43% vs 30%).
  - [F] — [Microsoft 2026 Work Trend Index](https://www.microsoft.com/en-us/worklab/work-trend-index/agents-human-agency-and-the-opportunity-for-every-organization)
- **Microsoft Work Trend Index 2025** (31,000 workers in 31 markets; Feb–Mar 2025):
  - 67% of leaders are familiar with agents vs 40% of employees.
  - 47% of leaders prioritize upskilling and 33% are considering headcount reductions.
  - Frontier Firm workers are less afraid AI will take their jobs (21% vs 43%).
  - 83% say AI will let employees take on more complex work earlier in their careers.
  - [F] — [Microsoft 2025 Work Trend Index](https://www.microsoft.com/en-us/worklab/work-trend-index/2025-the-year-the-frontier-firm-is-born)
- **KPMG / University of Melbourne, "Trust, attitudes and use of AI" (2025;** more than 48,000 people in 47 countries; fieldwork Nov 2024–Jan 2025):
  - 66% use AI regularly, but only 46% are willing to trust AI systems.
  - 56% are making mistakes in their work due to AI, and 66% rely on AI output without evaluating its accuracy.
  - 70% believe regulation is needed.
  - Recommended leadership actions: transformational leadership, enhancing trust, boosting AI literacy, strengthening governance.
  - [F] — [KPMG](https://kpmg.com/xx/en/our-insights/ai-and-technology/trust-attitudes-and-use-of-ai.html)
- **MIT NANDA:**
  - Shadow AI: "only 40% of companies say they purchased an official LLM subscription," while workers from "over 90%" of companies use personal AI tools regularly.
  - Many strong deployments "began with power users… These 'prosumers'… became early champions."
  - For mission-critical work, "90% of users prefer humans," because tools lack memory and adaptability.
  - Selective workforce impact appears in customer support, software engineering and administrative functions.
  - [F] — [MIT NANDA](https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf)
- **Accenture Tech Vision 2025:**
  - 75% say automation benefits can only be fully captured by building trust with employees.
  - 68% need to upskill or reskill employees in gen AI within 3 years.
  - 95% expect tasks to shift toward innovation.
  - Recommendations: involve employees in planning, address automation concerns, redefine career paths, provide AI training, and consider an "AI Bounty Program."
  - [F] — [Accenture](https://www.accenture.com/us-en/insights/technology/technology-trends-2025)
- **AWS change guidance:**
  - "Position agents as teammates, not replacements."
  - "Communicate transparently about agent capabilities and limitations."
  - "Establish clear handoff protocols."
  - Role-based training for engineers, PMs, domain leads and compliance officers.
  - CoEs, and mentorship pairing AI specialists with domain experts.
  - Retrospectives, and cross-functional governance committees.
  - [F] — [AWS](https://docs.aws.amazon.com/prescriptive-guidance/latest/strategy-operationalizing-agentic-ai/preparing-business.html)
- **Microsoft CAF:**
  - "Uniform training for every employee spends budget on skills that many people won't use."
  - Use hackathons, workshops for practicing human oversight, and a community of practice.
  - Change resistance is a prioritization criterion: weak candidates "threaten established roles or habits."
  - [F] — [Microsoft CAF](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/organizational-readiness)
- **Deloitte:** Mapfre published an AI manifesto and keeps a human in the loop for sensitive customer communication, describing itself as "hybrid by design." Moderna combined HR and technology under one leader to plan work for both people and agents. [F] — [Deloitte](https://www.deloitte.com/us/en/insights/topics/technology-management/tech-trends/2026/agentic-ai-strategy.html)
- **McKinsey (Oct 2026):** 80% say AI improved their individual productivity, but only 37% report positive EBIT impact. This individual-vs-enterprise gap motivates redesigning the organization. [S] — [McKinsey](https://www.mckinsey.com/capabilities/people-and-organization/our-insights/ai-is-changing-work-now-it-has-to-change-the-organization)
- **McKinsey "Superagency in the workplace" (Jan 2025):** employees were about 3x more likely to be using gen AI for a large share of their work than leaders assumed, and leaders, not employees, were the main barrier to scaling. [K] — [McKinsey](https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/superagency-in-the-workplace-empowering-people-to-unlock-ais-full-potential-at-work)
- **Gartner (Apr 2026):** 80% of CEOs say AI will force operational capability overhauls. [S, title only] — [Gartner](https://www.gartner.com/en/newsroom/press-releases/2026-04-23-gartner-survey-reveals-80-percent-of-ceos-say-artificial-intelligence-will-force-operational-capability-overhauls)
- **BCG / Forbes (Jan 2026):** at least 50% of CEOs believe their job is at risk if AI efforts fail, which signals top-down pressure that can drive "pilot theater." [F] — [BCG](https://www.bcg.com/news/26january2026-what-is-driving-ai-value)

### Inferences
- **Change playbook for a GenAI development lead:**
  1. Secure an executive narrative of strategic clarity that names which work will change and why (BCG).
  2. Enable managers first: they should model AI use, set quality standards and create psychological safety (Microsoft 2026).
  3. Co-design pilots with frontline staff and recruit "prosumer" champions from shadow-AI users (MIT).
  4. Give role-based training with hands-on practice and supervised human-oversight drills (Microsoft CAF, AWS).
  5. Plan explicitly how saved time is reinvested, and measure value rather than usage (BCG).
  6. Communicate transparently about agent limits and escalation and override paths, and position agents as teammates (AWS).
  7. Change incentives so people are rewarded for redesign attempts (Microsoft 2026: only 13% are).
  8. Protect skills through deliberate practice without AI, and treat quality control of AI output as a core competency (Microsoft 2026).
- **Expect a new "supervision workload."** Half or more of employees already spend more time reviewing and directing AI (BCG), so job redesign must budget time for review and exception handling. That work is the agent supervisor role (Deloitte).
- **Plan for wellbeing risk.** 41–48% report increased mental strain (BCG), so change plans need workload and strain monitoring, not only adoption metrics.

### Gaps
- Most evidence is self-reported survey data; Microsoft explicitly says its findings are associations. Few controlled studies of change interventions were found.
- Prosci and other change-management-methodology research specific to AI agents was not retrieved.
- Labor-relations requirements (works councils, EU worker-consultation duties, union agreements) were not covered.
- Detailed, named job-redesign case studies with before/after headcount and role data were not found.
- KPMG figures often cited elsewhere (e.g., share hiding AI use, share trained) were not on the fetched page and are unverified.

---

## Key Question 6: What practitioner guidance exists for getting agents into production, and which anti-patterns should be avoided?

### Takeaway
Practitioners converge on "software engineering first, autonomy second":
- Own your prompts, context and control flow.
- Keep agents small and focused, and start with a single agent.
- Design tools as carefully as UIs.
- Make evals the core loop: error analysis on real traces, binary judgments, validated LLM judges, regression suites in CI, and pass^k for consistency.
- Instrument everything.
- Apply least agency and least privilege, with human-in-the-loop for irreversible actions.

Quality, not cost, is now the main production blocker (32% in LangChain's survey). The most cited anti-patterns are:
- starting from technology rather than a scoped job;
- using agents where workflows suffice;
- premature multi-agent designs;
- opaque framework abstractions;
- generic metrics and dashboards;
- pilots without kill criteria;
- over-permissioned agents.

### Cited Findings
- **12-Factor Agents (HumanLayer, Dex Horthy; 2025):**
  - The factors:
    1. Natural Language to Tool Calls
    2. Own your prompts
    3. Own your context window
    4. Tools are just structured outputs
    5. Unify execution state and business state
    6. Launch/Pause/Resume with simple APIs
    7. Contact humans with tool calls
    8. Own your control flow
    9. Compact Errors into Context Window
    10. Small, Focused Agents
    11. Trigger from anywhere, meet users where they are
    12. Make your agent a stateless reducer
    13. (Bonus) Pre-fetch all the context you might need
  - Thesis: frameworks get teams to a "70-80% quality bar" quickly, but that is "not good enough for most customer-facing features." Getting past it often means reverse-engineering the framework or starting over. Recommendation: add small, modular agent concepts into existing products.
  - [F] — [GitHub](https://github.com/humanlayer/12-factor-agents)
- **Anthropic on frameworks:** frameworks "can hide prompts and responses, making debugging harder… We suggest that developers start by using LLM APIs directly." [F] — [Anthropic](https://www.anthropic.com/engineering/building-effective-agents)
- **Anthropic multi-agent research system (Jun 13 2025), production lessons:**
  - The multi-agent system beat single-agent Opus 4 "by 90.2%" on an internal research eval, and token usage explained 80% of performance variance on BrowseComp.
  - The team "started with a set of about 20 queries" for evals and used an LLM judge with pass/fail scoring that aligned with humans.
  - Human testing caught agents preferring SEO content farms over authoritative sources.
  - "Agents are stateful and errors compound," so they added checkpoints, resume and retry logic.
  - They used full production tracing.
  - "Rainbow deployments" shift traffic gradually because long-running agents are mid-task during updates.
  - [F] — [Anthropic](https://www.anthropic.com/engineering/multi-agent-research-system)
- **Cognition, "Don't Build Multi-Agents" (Walden Yan, Jun 12 2025):**
  - Principles: "Share context, and share full agent traces, not just individual messages," and "Actions carry implicit decisions, and conflicting decisions carry bad results."
  - Default to a single-threaded linear agent, adding history compression for long tasks.
  - "Running multiple agents in collaboration only results in fragile systems."
  - Note the tension with Anthropic's multi-agent research results. The reconciliation is task-dependent: parallelizable research suits multi-agent, while tightly coupled coding does not.
  - [F] — [Cognition](https://cognition.com/blog/dont-build-multi-agents)
- **OpenAI on guardrails and human oversight:**
  - Treat guardrails as "a layered defense mechanism"; combine LLM-based guardrails, rules-based ones (regex) and moderation.
  - Add guardrails "based on real-world edge cases and failures you encounter."
  - Human intervention triggers: exceeding failure thresholds, and high-risk actions.
  - [F] — [OpenAI](https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf)
- **Hamel Husain and Shreya Shankar (AI Evals FAQ, updated 18–21 Sep 2026):**
  - Error analysis is "the most important activity in evals."
  - "We recommend reviewing at least 100 traces."
  - Use binary pass/fail rather than 1–5 Likert scales.
  - "Generic evaluations waste time and create false confidence."
  - Validate LLM judges on held-out data for true-positive and true-negative rates, with one judge per failure type.
  - Don't do eval-driven development by default; "write evaluators for errors you discover, not errors you imagine."
  - For agents, first judge end-to-end goal success as a black box, then run step-level diagnostics and "transition failure matrices."
  - Guardrails must be fast, deterministic and low in false positives: "almost never use a slow or non-deterministic LLM-as-Judge as a synchronous guardrail."
  - CI evals should "favor assertions or other deterministic checks."
  - Production monitoring samples traces asynchronously and feeds new failure patterns back into CI.
  - Report to stakeholders in narrative form, not dashboards.
  - [F] — [Hamel.dev](https://hamel.dev/blog/posts/evals-faq/)
- **Anthropic evals (Jan 9 2026):**
  - Opus 4.5 initially scored 42% on CORE-Bench, then about 95% after grading bugs were fixed and a less constrained scaffold was used. Harness and grader quality can dominate results.
  - Layer evals with production monitoring, A/B tests, user feedback, transcript review and human studies (a "Swiss Cheese Model").
  - [F] — [Anthropic](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)
- **LangChain State of Agent Engineering:**
  - "Quality is the production killer": quality is the primary blocker for 32%, and latency for 20%.
  - Security ranks second (24.9%) at enterprises with 2,000+ employees.
  - Cost is cited less than in prior years.
  - "Observability is table stakes."
  - Human review is used by 59.8% and LLM-as-judge by 53.3%.
  - [F] — [LangChain](https://www.langchain.com/state-of-agent-engineering)
- **Microsoft CAF operational guidance:**
  - "Agent monitoring must also detect wrong answers and unintended actions from agents that appear healthy."
  - Telemetry depth scales with risk.
  - Define which failures count as incidents and "who can stop an agent."
  - Runtime safeguards: a mandatory baseline, scenario-specific hardening for exposure to untrusted content, and documented exceptions with compensating controls.
  - [F] — [Microsoft CAF](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/operational-standards)
- **AWS:** an evaluation stage inside CI/CD plus "manual approval gates" before production, and gateway-level token budgets. [F] — [AWS](https://docs.aws.amazon.com/prescriptive-guidance/latest/agent-ops-maturity-roadmap-for-enterprise-ai/implementation-roadmap.md)
- **OWASP Agentic Top 10 (Dec 2025):** ten risk categories, ASI01 Goal Hijack through ASI10 Rogue Agents, built on "Least-Agency." [F] — [OWASP](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/)
- **Security heuristics:**
  - Simon Willison's "lethal trifecta" (Jun 2025): private-data access, exposure to untrusted content, and external communication together create exfiltration risk. [K] — [simonwillison.net](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/)
  - Meta's "Agents Rule of Two" (Oct 2025): within a session, an agent should satisfy no more than two of (A) processing untrusted input, (B) accessing sensitive data or systems, and (C) changing state or communicating externally, without human approval. [K] — [Meta AI blog](https://ai.meta.com/blog/practical-ai-agent-security/)
- **Legal accountability precedent:** in *Moffatt v. Air Canada* (2024 BCCRT 149, Feb 2024), the tribunal rejected Air Canada's argument that its chatbot was a separate legal entity. The company is responsible for information its chatbot gives. [K — page returned 403] — [CanLII](https://www.canlii.org/en/bc/bccrt/doc/2024/2024bccrt149/2024bccrt149.html)
- **MIT NANDA "learning gap":** most systems "do not retain feedback, adapt to context, or improve over time." Successful buyers demand systems that learn and integrate with workflows. [F] — [MIT NANDA](https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf)

#### Anti-patterns, each with source
1. Starting from model capabilities and retrofitting a use case, which produces "technically impressive but operationally useless" agents — [AWS](https://docs.aws.amazon.com/prescriptive-guidance/latest/strategy-operationalizing-agentic-ai/focus-areas-agent-intent-scope.html) [F]
2. Using agents where deterministic workflows or RAG suffice — [OpenAI](https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf); [Microsoft CAF](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/); [OWASP](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/) [F]
3. Layering agents onto un-redesigned processes ("workslop") — [Deloitte](https://www.deloitte.com/us/en/insights/topics/technology-management/tech-trends/2026/agentic-ai-strategy.html) [F]
4. Premature multi-agent architectures (context loss, about 15x tokens) — [Cognition](https://cognition.com/blog/dont-build-multi-agents); [Anthropic](https://www.anthropic.com/engineering/multi-agent-research-system); [Microsoft CAF](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/) [F]
5. Opaque framework abstractions and not owning prompts or control flow — [Anthropic](https://www.anthropic.com/engineering/building-effective-agents); [12-Factor](https://github.com/humanlayer/12-factor-agents) [F]
6. Tool sprawl, ambiguous tools, and verbose or opaque tool outputs — [Anthropic](https://www.anthropic.com/engineering/writing-tools-for-agents) [F]
7. Context stuffing, which causes "context rot" — [Anthropic](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) [F]
8. Generic off-the-shelf metrics, Likert scores, dashboards in place of narrative, outsourced error analysis, and unvalidated LLM judges — [Hamel.dev](https://hamel.dev/blog/posts/evals-faq/) [F]
9. Grading the exact tool-call path instead of outcomes; not reading transcripts; using pass@k where consistency matters — [Anthropic](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) [F]
10. Pilots without stop criteria — [Microsoft CAF](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/organizational-readiness) [F]; only 31% of CIOs have no-go guidelines — [Gartner](https://www.gartner.com/en/newsroom/press-releases/2026-10-19-gartner-survey-finds-only-13-percent-of-cios-say-their-enterprise-has-realized-significant-or-transformational-value-from-ai) [S]
11. Granting platform-maximum permissions rather than task-minimum ones — [Microsoft CAF](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/architecture-governance) [F]; OWASP ASI03 [F]
12. Measuring adoption instead of value — [BCG](https://www.bcg.com/publications/2026/ai-at-work-why-strategy-matters-more-than-tools) [F]
13. Treating a "healthy" (up) agent as a correct agent, i.e., monitoring only availability — [Microsoft CAF](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/operational-standards) [F]

### Inferences
- **Production-readiness checklist** (synthesized):
  - a scoped job with an owner and registry entry;
  - a baseline and KPIs;
  - an eval suite of at least 20–50 real-failure tasks, with regression gates in CI;
  - validated judges;
  - pass^k targets for customer-facing flows;
  - full tracing;
  - least-privilege identity with a check against the lethal trifecta / Rule of Two;
  - human approval for irreversible actions;
  - token budgets and cost-per-success tracking;
  - incident classification with a kill switch and named recovery authority;
  - gradual (rainbow/canary) rollout;
  - a feedback loop from production traces into the eval set;
  - retirement criteria.
- **Regulated industries.** Map the checklist to the organization's existing control framework rather than creating a parallel one, as Microsoft CAF repeatedly advises: "extend existing" governance, incident, release and data policies. Add sovereignty and data-residency checks (Microsoft CAF), environment isolation and audit trails (AWS), and immutable logs or cryptographic receipts for consequential actions (Deloitte). NIST AI RMF and its GenAI profile (NIST AI 600-1), and ISO/IEC 42001, are the usual anchoring frameworks [K] — [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework); [ISO/IEC 42001](https://www.iso.org/standard/81230.html).

### Gaps
- Public, detailed agent post-mortems remain scarce. Several widely reported incidents were **not verified in this session** and should be checked before use:
  - Replit's coding agent deleting a production database during a code freeze (Jul 2025, SaaStr);
  - Cursor's support bot inventing a login policy (Apr 2025);
  - Klarna's 2025 rebalancing back toward human customer-service staff.
- No aggregate 2026 incident statistics were retrieved from incident databases or regulators.
- The full Google "Prototype to Production" whitepaper and Anthropic's later engineering posts (e.g., on long-running agent harnesses, code execution with MCP, Agent Skills) were not reviewed.
