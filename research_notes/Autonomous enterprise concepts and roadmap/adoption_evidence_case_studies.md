# Enterprise adoption of AI agents and autonomous operations: real-world evidence, case studies, failures and lessons (as of 21 Nov 2026)

_Flag legend used throughout: **[V]** vendor/company self-reported figure (unaudited); **[C]** consultancy- or vendor-run survey of self-reported respondent views; **[I]** investor-authored (author holds stakes in companies discussed); **[A]** academic, central-bank or independent research; **[S]** figure taken from secondary coverage or a search-result extract because the primary page could not be fetched (HTTP 403/503) — verify before quoting. Dates are publication dates unless noted. Researcher note: the shared web-search budget ran out near the end of this task, so some items listed under Gaps could not be checked._

## 1. What do the major 2025–2026 surveys say about agent adoption and value?

### Takeaway
"Using agents" is now common (roughly 17–62% of organizations depending on definition and sample), but agents running autonomously at scale are still a minority. Measurable enterprise-level P&L impact is concentrated in a small, stable group: about 6% of McKinsey respondents are "high performers", in both 2025 and 2026; 5% (2025) rising to 7.5% (2026) of firms are "future-built" in BCG's surveys; 56% of CEOs in PwC's Jan 2026 survey saw no financial benefit; and 89% of executives in the NBER Fed/central-bank surveys saw no productivity effect over three years. Late-2026 consultancy surveys show improvement (KPMG: ~6 in 10 report measurable value), but they are self-reported and not causal.

### Cited Findings
**McKinsey (self-reported global survey) [C]**
- *State of AI 2025* (Nov 2025): 62% of respondents say their organizations are at least experimenting with AI agents, but in any given business function no more than 10% say they are scaling agents. Only about one-third say they are scaling AI programs across the organization. 39% attribute any EBIT impact to AI, and most of those say it is under 5% of EBIT. "High performers" (5% or more of EBIT from AI and value described as "significant") are about 6% of respondents. High performers are at least 3x more likely than peers to report scaling agents in most functions. — [McKinsey, State of AI 2025](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-2025) [S: figures from a search-result extract; direct fetch returned HTTP 503]
- *State of AI 2026, "On the road to ROI"*: reported as published 25 Aug 2026, with 1,719 respondents in 97 countries, fielded 4 May–8 Jun 2026. Among respondents at firms with over $1B revenue, 40% scale agents in at least one function (27% a year earlier); smaller firms are flat at 22%. 37% report EBIT contribution from AI, essentially flat vs 2025. High performers remain about 6%. 80% report individual productivity gains vs 37% reporting enterprise EBIT impact. 44% say AI is scaling across the enterprise vs 38% a year earlier, which conflicts with the 2025 "one-third" framing. All measures are self-reported and non-causal. — [McKinsey, State of AI 2026](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai); [oometa summary](https://oometa.ai/en/insights/mckinsey-state-of-ai-2026-scaling-vs-ebit); [Quasa summary](https://quasa.io/insights/ai-agents-scale-at-40-of-large-firms-but-profit-impact-is-flat); [explainx summary](https://explainx.ai/blog/mckinsey-state-of-ai-2026-roi-agentic-coding-august-2026) [S: McKinsey page returned 503; figures from secondary summaries]

**MIT NANDA, "The GenAI Divide: State of AI in Business 2025" (July 2025) — the "95%" claim [A, but preliminary and agenda-linked]**
- Methodology as stated in the report: research period Jan–Jun 2025; "a systematic review of over 300 publicly disclosed AI initiatives, structured interviews with representatives from 52 organizations, and survey responses from 153 senior leaders collected across four major industry conferences". The report is labelled "Preliminary Findings", its company data is anonymized, and its authors are Challapally, Pease, Raskar and Chari. — [MIT NANDA report PDF](https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf)
- The headline appears in several non-identical forms within the same report:
  - "95% of organizations are getting zero return" on $30–40B of enterprise GenAI investment.
  - "Just 5% of integrated AI pilots are extracting millions in value", while the rest have "no measurable P&L impact".
  - For enterprise-grade custom or vendor tools: "Sixty percent of organizations evaluated such tools, but only 20 percent reached pilot stage and just 5 percent reached production".
  - Generic LLM chatbots show about 83% pilot-to-implementation.
  - [MIT NANDA report PDF](https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf)
- Definition of success: a tool counts as "successfully implemented" when "users or executives have remarked [it] as causing a marked and sustained productivity and/or P&L impact". The report's own limitation note says the figures "are directionally accurate based on individual interviews rather than official company reporting. Sample sizes vary by category, and success definitions may differ across organizations." — [MIT NANDA report PDF](https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf)
- Internal inconsistency: budget allocation came from asking executives to allocate "a hypothetical $100". The text says sales and marketing captured "approximately 70 percent", but the takeaway and ROI section say "50% of GenAI budgets go to sales and marketing". — [MIT NANDA report PDF](https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf)
- Shadow AI: 40% of companies say they bought an official LLM subscription, while workers at over 90% of surveyed companies report regular use of personal AI tools for work. — [MIT NANDA report PDF](https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf)
- Critiques:
  - The 95% headline is under-explained and oversimplifies. The lead author reportedly said companies were hesitant to share failure rates. — [BigDATAwire/HPCwire](https://www.hpcwire.com/bigdatawire/2025/09/04/mit-report-flags-95-genai-failure-rate-but-critics-say-it-oversimplifies/) [S: page returned 403; content via search extract]
  - The methodology is "sound but with significant limitations". The report is framed to support MIT NANDA's "Internet of AI Agents" agenda. Media turned "no measurable P&L impact" into "95% of organizations get zero ROI". — [AI Realist (M. Sukhareva)](https://msukhareva.substack.com/p/genai-has-little-to-no-return-on)
  - The Wharton 2025 study (74% positive ROI among firms that measure it) is widely set against MIT's result, though commentators note it "doesn't immediately refute" it. — [CMSWire](https://www.cmswire.com/digital-experience/is-generative-ai-finally-paying-off-wharton-says-yes-mostly)

**Gartner (analyst predictions and polls)**
- 25 Jun 2025: Gartner predicts "over 40% of agentic AI projects will be canceled by the end of 2027" due to escalating costs, unclear business value or inadequate risk controls.
  - A Jan 2025 poll of 3,412 webinar attendees found 19% had made significant investments in agentic AI, 42% conservative investments, 8% none, and 31% wait-and-see or unsure.
  - On "agent washing", Gartner estimates "only about 130 of the thousands of agentic AI vendors are real".
  - Predictions for 2028: at least 15% of day-to-day work decisions made autonomously (0% in 2024), and 33% of enterprise software apps including agentic AI (under 1% in 2024).
  - Analyst Anushree Verma: most agentic propositions "lack significant value or ROI" because current models lack the maturity and agency to achieve complex goals autonomously.
  - [Gartner press release](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027)
- 2026 Hype Cycle for Agentic AI / CIO survey: only 17% of organizations have deployed AI agents, 42% expect to within 12 months and another 22% the following year. Agentic AI sits at the Peak of Inflated Expectations. — [subagentic.ai summary](https://subagentic.ai/posts/gartner-2026-hype-cycle-agentic-ai/) [S: Gartner primary not found]
- Gartner "Surviving the Agentic AI Era" survey (251 respondents, 29 Jun–7 Aug 2026): 33% have enterprise-built, customer-facing GenAI agents in limited or broad production; 43% cite "controls too expensive for perceived value". — [Software Strategies blog](https://softwarestrategiesblog.com/2026/11/05/gartner-secure-ai-hype-cycle-2026-testing-agent-security/) [S]
- 26 May 2026: "By 2027, 40% of enterprises will demote or decommission autonomous AI agents" due to governance gaps found only after production incidents. — [Gartner press release](https://www.gartner.com/en/newsroom/press-releases/2026-05-26-gartner-says-applying-uniform-governance-across-ai-agents-will-lead-to-enterprise-ai-agent-failure)
- 16 Nov 2026 (298 US/UK I&O leaders, surveyed Jun–Jul 2026):
  - 95% of organizations had at least one agent-related incident in the past 12 months.
  - 57% say their governance is weak, and 55% say IT risk tools are "completely outdated".
  - Only 15% have automatic circuit breakers for runaway agents, yet 70% believe their agents operate within safe boundaries.
  - Prediction: by 2028, 40% of I&O organizations scaling AI will suffer a business-critical service disruption without strong governance.
  - [Gartner press release](https://www.gartner.com/en/newsroom/press-releases/2026-11-16-gartner-weak-artificial-intelligence-governance-will-lead-to-business-critical-service-disruptions-for-40-percent-of-infrastructure-and-operations-organizations-by-2028)

**BCG [C]**
- 30 Sep 2025, "The Widening AI Value Gap" (1,250 leaders in 68 countries):
  - 5% of firms are "future-built" and generating value at scale, and 35% are scaling. About 60% report minimal revenue and cost gains.
  - Future-built firms vs laggards: 1.7x revenue growth, 3.6x three-year TSR and 1.6x EBIT margin. They plan to spend more than twice as much on AI and allocate 15% of their AI budgets to agents.
  - Agents account for 17% of AI value in 2025 and are expected to reach 29% by 2028.
  - [BCG press release](https://www.bcg.com/press/30september2025-ai-leaders-outpace-laggards-revenue-growth-cost-savings); [BCG report PDF](https://media-publications.bcg.com/The-Widening-AI-Value-Gap-October-2025.pdf); [SDCExec on the 60%](https://www.sdcexec.com/software-technology/ai-ar/news/22951486/boston-consulting-group-bcg-60-of-organizations-report-minimal-revenue-cost-gains-from-scaling-ai-report)
- 30 Sep 2026, BCG Applied AI Index 2026 (1,330 CxOs):
  - Future-built firms rose to 7.5% and scaling firms to 41%.
  - AI spend rose from about 1.7% of revenue (late 2025) to about 3.3%, and more than 80% of it sits outside the enterprise IT budget.
  - Agentic AI is expected to provide about 40% of AI value by 2030. 42% expect to give agents decision-making authority by 2030, but only 5% have full controls in place today (oversight, rollback gates, security, audit and cost guardrails).
  - Respondents expect roughly 10–15% workforce reduction by 2030.
  - Future-built firms vs laggards: 2.3x TSR, 2.4x revenue growth and 2.8x EBITDA growth.
  - BCG does not describe how firms were classified or how the multiples were calculated.
  - [BCG press release](https://www.bcg.com/press/30september2026-ai-starting-to-pay-off-companies-generate-value)

**Deloitte, State of AI in the Enterprise 2026 ("The untapped edge"), 21 Jan 2026 [C]**
- Sample: 3,235 director-to-C-suite leaders in 24 countries and six industries, fielded Aug–Sep 2025.
- Close to 74% plan to deploy agentic AI within two years, but only 21% of those report a mature agent governance model.
- Only 25% have moved 40% or more of their AI pilots into production.
- 25% say AI is transformative, more than double the prior year. 30% are redesigning key processes, while 37% use AI only at a surface level.
- Access to sanctioned AI tools rose from under 40% to about 60% of workers.
- [Deloitte press release](https://www.deloitte.com/us/en/about/press-room/state-of-ai-report-2026.html)
- Top cited risks: data privacy and security (73%), legal/IP/regulatory (50%) and governance/oversight (46%). — [Deloitte global report PDF](https://www.deloitte.com/content/dam/assets-shared/docs/about/2025/state-of-ai-2026-global.pdf) [S]

**KPMG AI Quarterly Pulse [C]**
- Q3 2026 (24 Sep 2026; 314 US C-suite and business leaders at $1B+ firms, fielded 24 Jul–25 Aug 2026):
  - 62% are building, deploying or developing agents (53% the prior quarter). Multi-agent development or implementation rose to 25% from 6%.
  - Nearly 6 in 10 report measurable business value: productivity 55%, faster decisions 49%, customer and employee experience 38%, financial performance 37%.
  - 44% report significant workforce adoption (23% last quarter, 10% a year ago).
  - Controls: 49% have defined high-risk use cases where agents cannot decide autonomously, and 43% have token or usage budgets. Organizations building controls into agents alongside monitoring fell to 30%, from 43% two quarters earlier.
  - [KPMG Q3 2026 release](https://kpmg.com/us/en/media/news/q3-ai-pulse-2026.html)
- Q1 2026 (US): 54% "actively deploying AI agents" vs 12% in 2024. — [KPMG blog](https://www.kpmg.com/us/en/media/blogs/2026/q1-ai-pulse-2.html) [S: search extract]
- Global AI Pulse Q1 2026 (20 countries): 32% are deploying and scaling agents and a further 27% are orchestrating multiple agents. — [KPMG Global AI Pulse PDF](https://assets.kpmg.com/content/dam/kpmgsites/xx/pdf/2026/04/global-ai-pulse.pdf) [S]

**PwC [C]**
- 29th Global CEO Survey (19 Jan 2026; 4,454 CEOs in 95 countries; 30 Sep–10 Nov 2025): 56% have seen no significant financial benefit from AI to date. 30% report higher revenue and 26% lower costs from AI in the last 12 months; 33% report gains in either, and only 12% report both. — [PwC press release](https://www.pwc.com/gx/en/news-room/press-releases/2026/pwc-2026-global-ceo-survey.html)
- Mid-2026 CEO Survey Snapshot (351 of the same CEOs): 39% say AI increased revenue, cut costs or both. — [PwC snapshot](https://www.pwc.com/gx/en/1/issues/c-suite-insights/ceo-survey/snapshot-august-2026.rhs.html) [S]

**IBM Institute for Business Value [V/C — IBM sells AI services]**
- CEO Study (6 May 2025; 2,000 CEOs in 33 countries; Feb–Apr 2025, with Oxford Economics):
  - Only 25% of AI initiatives delivered expected ROI "over the last few years", and only 16% scaled enterprise-wide.
  - 64% admit fear of falling behind drives investment before value is clear, and 50% say the pace of investment left "disconnected, piecemeal technology".
  - 61% say they are actively adopting AI agents.
  - [IBM newsroom](https://newsroom.ibm.com/2025-05-06-ibm-study-ceos-double-down-on-ai-while-navigating-enterprise-hurdles)
- CEO Study (4 May 2026; 2,000 CEOs; Feb–Apr 2026):
  - 76% have a Chief AI Officer (26% in 2025).
  - CEOs expect 48% of operational decisions with codifiable guardrails to be made by AI without human intervention by 2030 (25% today).
  - 86% think employees are ready to work with AI, but only 25% of the workforce uses AI regularly.
  - Firms that redesigned five core areas were 4x more likely to have delivered on business objectives.
  - [IBM newsroom](https://newsroom.ibm.com/2026-05-04-ibm-study-ceos-are-reshaping-c-suite-roles-for-the-ai-era)
- Nov 2026 IBV study (1,667 executives): only 18% of CAIOs have full control over AI investment decisions. — [Finviz/IBM release](https://finviz.com/news/423711/ibm-study-chief-ai-officers-see-where-ai-creates-value-but-few-control-investment-decisions) [S]

**Stanford HAI AI Index 2026 (13 Apr 2026) [A; compiles third-party data]**
- Organizational AI use rose to 88% in 2025 (55% in 2023), and GenAI is used in at least one function at 70% of organizations.
- "Agent deployment is in the single digits across nearly all business functions."
- Corporate AI investment reached a record $581.7B in 2025 (+130%).
- In an employer survey, 32% expect AI-related workforce decreases next year, 43% little or no change and 13% increases.
- [AI Index 2026, Economy chapter](https://hai.stanford.edu/ai-index/2026-ai-index-report/economy); [12 takeaways](https://hai.stanford.edu/news/inside-the-ai-index-12-takeaways-from-the-2026-report)

**Menlo Ventures [I — investor in Anthropic, OpenRouter, Factory and others]**
- 9 Dec 2025: enterprise GenAI spend was $37B in 2025 (3.2x from $11.5B). Only 16% of enterprise deployments qualify as "true agents"; most are fixed-sequence workflows. — [Menlo 2025 report](https://menlovc.com/perspective/2025-the-state-of-generative-ai-in-the-enterprise/) [S: search extract]
- 3 Nov 2026, "2026: The State of Enterprise AI" (survey of nearly 400 US enterprise decision-makers via Morning Consult, 8–26 Sep 2026; market sizes are Menlo's bottom-up estimates):
  - Deployment spend reached $176.8B by Sep 2026 (5.4x), against a restated $33B for 2025 after taxonomy reclassification.
  - Enterprise adoption rose from 55% to 65%.
  - Average spend was 4.7x the prior year against a planned 1.9x; median spend was 2.2x vs 1.8x planned.
  - 74% of AI builders use agents (vs 27% of startup deployments in 2025), and 32% use multiple agents.
  - 55% of incremental AI spend came from new budgets.
  - "Limited evidence of enterprises replacing core systems such as Salesforce's CRM, Workday's HRIS, or Oracle's NetSuite with AI."
  - Its OpenRouter token data "skew[s] more toward individual developers and startups."
  - [Menlo 2026 report PDF](https://menlovc.com/wp-content/uploads/2026/11/menlo_ventures_enterprise_ai_report-2026-110326.pdf)

**Wharton Human-AI Research and GBK Collective [A/C]**
- Oct 2025 (800+ US enterprise decision-makers): 74% of firms that measure ROI report positive returns (35% significantly, 39% moderately). 82% use GenAI weekly and 46% daily; 88% expect spending to rise. — [Wharton 2025 report](https://knowledge.wharton.upenn.edu/special-report/2025-ai-adoption-report); [Interview Query summary](https://www.interviewquery.com/p/wharton-study-genai-roi-2025)
- 13 Oct 2026: two-thirds of departments say they use AI agents, but only 17% let an agent complete a task without a person approving each step. Of leaders tracking at least one growth measure, 35% report strongly positive ROI vs 13% of those tracking efficiency alone. The design is cross-sectional. — [Wharton 2026 report](https://knowledge.wharton.upenn.edu/?p=42985)

**NBER and central-bank executive surveys [A — the strongest large-sample independent evidence]**
- "Firm Data on AI" (NBER w34836; Yotzov, Barrero, Bloom et al.):
  - Sample: nearly 6,000 CEOs, CFOs and senior finance managers in the US, UK, Germany and Australia, fielded Nov 2025–Jan 2026 by the Atlanta Fed, Bank of England, Bundesbank and Macquarie University.
  - 69% of firms use AI (US 78%).
  - Over the past three years, more than 90% report no employment effect and 89% no effect on labor productivity.
  - Forecasts for the next three years: productivity +1.4% and employment −0.7%, with about two-thirds of the reduction coming through reduced hiring.
  - US employees expect employment at their firms to rise 0.5%, while executives expect a 1.2% decline.
  - [NBER Digest, May 2026](https://www.nber.org/digest/202605/global-evidence-business-use-ai); [NBER w34836](https://www.nber.org/papers/w34836)
- A later revision (about 9,000 executives in seven countries) reports AI raised annual labor-productivity growth by about 0.2% over three years and expects about 0.6% a year next. — [NBER w34836](https://www.nber.org/papers/w34836) [S: search extract]
- NBER w34984 (Baslandze et al., Mar 2026; ~750 CFOs): positive labor-productivity gains that vary by sector, and "little evidence of near-term aggregate employment declines". — [NBER w34984](https://nber.org/papers/w34984)

**S&P Global Market Intelligence (2025) [C]**
- Sample: more than 1,000 respondents in North America and Europe.
- 42% of companies abandoned most of their AI initiatives (17% in 2024), and the average organization scrapped 46% of proofs of concept before production.
- Top challenges: data privacy (38%), security (38%) and cost (37%).
- [CIO Dive](https://www.ciodive.com/news/AI-project-fail-data-SPGlobal/742590/); [S&P Global](https://www.spglobal.com/market-intelligence/en/news-insights/research/ai-experiences-rapid-adoption-but-with-mixed-outcomes-highlights-from-vote-ai-machine-learning)

**Microsoft Work Trend Index (23 Apr 2025) [V]**
- Sample: 31,000 workers in 31 markets, plus 9,037 leaders.
- 24% of leaders say AI is deployed organization-wide, and 12% remain in pilot mode.
- 81% expect agents to be moderately or extensively integrated within 12–18 months.
- The "Frontier Firm" subgroup (844 leaders) is defined partly by believing agents drive ROI, which overlaps with the outcomes compared.
- [Microsoft WorkLab](https://www.microsoft.com/en-us/worklab/work-trend-index/2025-the-year-the-frontier-firm-is-born)

### Inferences
- **Definitions drive the headline.** "Agent adoption" ranges widely:
  - 17% have deployed agents (Gartner CIO survey 2026).
  - 33% have customer-facing agents in production (Gartner Aug 2026).
  - 62% are "building, deploying or developing" agents (KPMG Q3 2026).
  - Two-thirds of departments say they use agents (Wharton 2026).

  The stricter measures cluster much lower: at most 10% scaling in any function (McKinsey 2025), single digits per function (Stanford AI Index 2026), 17% acting without step-by-step approval (Wharton 2026), and 16% of deployments that are "true agents" (Menlo 2025). A report should treat "agents in production at meaningful autonomy" as roughly a 10–20% phenomenon in 2026, concentrated in large firms.
- **The value distribution is very skewed and barely moved from 2025 to 2026.** McKinsey's high performers stayed at about 6%, and EBIT impact went from 39% to 37%. Spend and adoption grew steeply in the same period: Menlo reports spend up 5.4x, and BCG reports AI spend as a share of revenue doubling. Spending is outrunning measured enterprise P&L impact. The more optimistic 2026 figures (KPMG ~60% measurable value, BCG 7.5% future-built, PwC snapshot 39%) are self-reported and use looser definitions of "value".
- **Independent evidence is more sober than consultancy evidence.** The central-bank surveys (NBER) show small realized productivity effects: 89% of executives report none, and the revision estimates about 0.2% a year. This is the most methodologically neutral evidence and should anchor any "hype vs reality" framing.
- **MIT NANDA's 95% is best treated as a provocative, interview-based, preliminary estimate.** Its success threshold is high ("marked and sustained" P&L impact as remarked by interviewees). Its sample is small and conference-sourced, its figures are internally inconsistent, and its authors have an agentic-infrastructure agenda. Its directional points (pilot-to-production attrition, back-office ROI, buy beating build) agree with other sources, but the precise 95% does not deserve the weight it received.

### Gaps
- McKinsey primary pages returned HTTP 503 throughout, so the 2026 McKinsey figures (date, sample, 40%/22%/37%/44%) rest on secondary summaries. The often-cited 2025 split (23% scaling plus 39% experimenting, adding to 62%) and the 2025 sample size were not re-verified this session.
- The PwC AI Agent Survey (May 2025) primary page returned 403. Its commonly cited headline figures (for example, 79% of firms adopting agents and 66% of adopters seeing productivity value) could not be verified.
- The Gartner 2026 CIO survey "17% deployed" figure and the "Surviving the Agentic AI Era" 33% figure were found only in third-party blogs.
- No survey found measures agent autonomy consistently over time with the same panel. Most are cross-sectional and self-reported.

## 2. Which use-case categories show the strongest evidence of production value? (named case studies, with vendor-reported figures flagged)

### Takeaway
By spend and documented deployments, the strongest categories are those where agents have systems to act in, codified procedures and verifiable outcomes: software engineering, customer support/service, the IT service desk, and document-heavy back-office work (mortgage processing, HR inquiries, KYC/onboarding, accounting). Almost all dollar or headcount "results" in named case studies are self-reported by the company or its vendor. Customer service has both the most success claims and the most public reversals: Klarna, Commonwealth Bank, McDonald's and Taco Bell. Procurement, supply-chain planning and insurance claims had no verified named cases in this research.

### Cited Findings
**Where enterprise money is actually going (Menlo, Nov 2026) [I]**
- Coding ($34.0B, up 7.7x) and enterprise chatbots ($25.0B, up 3.0x) make up 76% of the $77.3B AI application market. Next by category:
  - Customer success: $2.7B (up 4.3x)
  - IT: $1.6B (up 2.3x)
  - Sales: $1.4B (up 3.6x)
  - Marketing: $1.2B (up 1.8x)
  - HR: $0.9B (up 2.5x)
- Vertical apps: healthcare $3.7B and legal $1.8B.
- Menlo's explanation is that agents succeed where there are "environments agents can act in", "complete context" and "results agents can verify". Spend grows more slowly where work "involves more subjective judgment" (HR, marketing).
- Incumbents hold IT (ServiceNow 91% share), data science (88%) and HR (Workday 68%). AI-natives hold 96% of coding.
- [Menlo 2026 report PDF](https://menlovc.com/wp-content/uploads/2026/11/menlo_ventures_enterprise_ai_report-2026-110326.pdf)

**Independent productivity benchmarks by function (Stanford AI Index 2026) [A]**
- Studies compiled by the Index show gains of 14–15% in customer support, 26% in software development and 50% in marketing output. Gains are smaller for tasks requiring deeper reasoning. — [AI Index 2026, Economy chapter](https://hai.stanford.edu/ai-index/2026-ai-index-report/economy)
- Physicians across multiple hospital systems reported up to 83% less time writing clinical notes. — [AI Index takeaways](https://hai.stanford.edu/news/inside-the-ai-index-12-takeaways-from-the-2026-report)

**Customer service: high adoption, mixed outcomes**
- **Klarna** [V]:
  - Feb 2024: Klarna claimed its assistant handled 2.3M conversations (two-thirds of chat volume) and did the work of 700 full-time agents in its first month. — [Entrepreneur](https://www.entrepreneur.com/business-news/klarna-ceo-reverses-course-by-hiring-more-humans-not-ai/491396)
  - May 2025: CEO Sebastian Siemiatkowski said Klarna had been "too focused on cost", which led to "a decline in quality". Klarna began hiring human agents again in an "Uber type of setup", with remote insourced agents and a small pilot. — [Entrepreneur](https://www.entrepreneur.com/business-news/klarna-ceo-reverses-course-by-hiring-more-humans-not-ai/491396); [CX Today](https://www.cxtoday.com/contact-center/klarna-grapples-with-ai-led-customer-service-pivots-to-an-uber-type-of-setup/)
  - Jun 2025: Klarna will use humans to offer "VIP" customer service. — [TechCrunch](https://techcrunch.com/2025/06/04/klarna-ceo-says-company-will-use-humans-to-offer-vip-customer-service)
  - Sep 2025: Klarna moved staff from marketing, engineering, legal, operations and analytics into customer service; the number moved is "unclear". — [CX Today (citing Business Insider)](https://www.cxtoday.com/contact-center/klarna-redeploys-staff-to-customer-service-pulls-from-marketing-engineering-and-legal-teams/)
  - A secondary source says that by early 2026 the assistant equalled more than 850 FTE. — [Sacra](https://sacra.com/chat/h/2f2d2ff5-f56f-4be2-b3f5-bb9e721b41dd) [S, unverified]
- **Salesforce** [V, CEO interview]:
  - Sep 2025: Marc Benioff said support headcount fell from about 9,000 to about 5,000 because of Agentforce. AI agents handle about half of support conversations, and CSAT is "about the same" for AI and human interactions.
  - The company said it was "not actively backfilling" roles and had redeployed hundreds of staff. Benioff also said agentic sales now follows up on 100M+ previously uncalled leads.
  - These figures come from Benioff's own podcast interview and were not independently audited.
  - [NBC News](https://www.nbcnews.com/business/business-news/salesforce-ceo-confirms-4000-layoffs-need-less-heads-ai-rcna228703); [ITPro](https://www.itpro.com/technology/artificial-intelligence/marc-benioff-says-salesforce-has-already-cut-4-000-customer-support-staff-for-ai-agents-and-workforce-productivity-hasnt-dipped); [Fox 4](https://www.fox4news.com/news/salesforce-ceo-cuts-4000-jobs-ai-agents-handle-half-customer-work)
- **Commonwealth Bank of Australia**:
  - Jul 2025: CBA cut 45 direct-banking roles (90 in total) in favor of an AI voice bot, claiming the bot cut call volumes by 2,000 a week.
  - The Finance Sector Union said volumes were actually rising, staff were offered overtime and team leaders were answering calls. The dispute went to the Fair Work Commission.
  - 21 Aug 2025: CBA reversed the cuts, called them an "error" and apologised. It has since pursued a partnership with OpenAI.
  - [Bloomberg](https://www.bloomberg.com/news/articles/2025-08-21/commonwealth-bank-reverses-job-cuts-decision-over-ai-chatbots); [Finextra](https://finextra.com/newsarticle/46482/commbank-reverses-plan-to-replace-call-centre-staff-with-ai); [Finance Sector Union](https://www.fsunion.org.au/win-cba-backflips-on-customer-service-job-cuts-admits-they-got-it-wrong/)
- **Telstra**:
  - Feb 2026 half-year results: A$1.2B profit after cutting more than 1,000 roles. Telstra has begun rolling out AI agents for multi-step tasks and has 380 internal AI use cases. — [IT Brief Australia](https://itbrief.com.au/story/telstra-profit-climbs-as-ai-rollout-deepens-job-cuts); [Information Age (ACS)](https://ia.acs.org.au/article/2026/telstra-posts--1-2b-half-year-profit-as-1-000-jobs-cut.html)
  - The CEO said agents are not expected, for now, to deal directly with customers. Telstra links AI to a smaller workforce by 2030. — [Guardian Australia via inkl](https://www.inkl.com/news/telstra-expects-to-shrink-workforce-as-it-leans-in-hard-on-ai-including-in-customer-service)
  - Telstra denied that its Jul 2025 cut of 550 roles was due to AI; the union contested this. — [Information Age (ACS)](https://ia.acs.org.au/article/2025/telstra-says-550-new-job-cuts--not-a-result--of-ai.html)
  - FY26 (Aug 2026): underlying operating expenses fell 3%. — [Market Index](https://www.marketindex.com.au/news/telstra-rewards-shareholders-with-1bn-buyback-and-bigger-dividend-despite-revenue-slip)
  - No customer-service performance metrics were found.
- **McDonald's/IBM**: McDonald's ended its AI drive-thru order-taking test (100+ US restaurants, switched off by 26 Jul 2024) after mixed results and reports of wrong orders. — [NBC News](https://www.nbcnews.com/business/business-news/mcdonalds-end-ai-drive-test-ibm-rcna157603); [Fortune](https://fortune.com/2024/06/17/mcdonalds-ai-order-taking-drive-thru-ends/)
- **Taco Bell** is described as reversing or rethinking an AI rollout in 2025, alongside CBA. — [CX Today](https://www.cxtoday.com/contact-center/klarna-redeploys-staff-to-customer-service-pulls-from-marketing-engineering-and-legal-teams/) [S: primary not fetched]
- **Gartner** predicts that half of organizations planning to significantly cut customer-service headcount will abandon those plans by 2027. — [CX Today](https://www.cxtoday.com/contact-center/klarna-redeploys-staff-to-customer-service-pulls-from-marketing-engineering-and-legal-teams/); [People Matters](https://www.peoplematters.in/news/business/55percent-of-employers-regret-ai-layoffs-gartner-predicts-more-rehires-by-2027-51167) [S]

**IT service management and AIOps**
- **ServiceNow (internal "customer zero")** [V, unaudited]:
  - Jul 2025: $350M of value claimed from internal AI agents. — [CX Today](https://www.cxtoday.com/crm/servicenows-internal-ai-agents-generate-350m-in-added-value-spark-debate-on-future-of-jobs/)
  - May 2026: $500M of annualized value claimed for 2025, with operating-expense savings rising from $100M to more than $200M in 2026. — [BERI](https://www.beri.net/article/servicenow-500m-ai-roi-doubles-savings-2026)
  - Oct 2026: the CFO said internal AI generates "more than $1 billion in annualized value". Analysts note this is an unaudited estimate of "value", which is larger than savings, and does not show that AI caused headcount changes. — [BERI](https://www.beri.net/article/servicenow-1-billion-internal-ai-efficiency-sales-ops-shrinks-quota-bearing-grows-headcount-declines-workforce-plan)
  - ServiceNow says internal IT resolves 90% of employee IT requests autonomously and that its AI specialist resolves cases 99% faster than humans; Fortune describes the 99% figure as an early internal result. — [Fortune, Knowledge 2026](https://fortune.com/2026/05/05/servicenow-knowledge-2026-autonomous-workforce-microsoft-nvidia-ai-announcements/)
  - ServiceNow executive Paul Fipps: deflection of 25–30% is "game-changing", and 75–80% is "life-changing". — [Fortune](https://fortune.com/2026/10/02/servicenow-exec-paul-fipps-life-game-changing-trust-ai-agents/)

**Software engineering** (detailed productivity evidence is in Q4)
- Coding is the largest agent category: $34.0B, of which Claude Code and Codex take $24.0B (70%). Enterprise code activity is up 5x year on year. — [Menlo 2026 report PDF](https://menlovc.com/wp-content/uploads/2026/11/menlo_ventures_enterprise_ai_report-2026-110326.pdf) [I]
- Employment of software developers aged 22–25 fell nearly 20% since 2024, while older colleagues' headcount grew. — [AI Index takeaways](https://hai.stanford.edu/news/inside-the-ai-index-12-takeaways-from-the-2026-report) [A]

**Finance, banking, KYC/AML and compliance**
- **Goldman Sachs** [V]: in Feb 2026, CIO Marco Argenti said the bank had spent about six months with embedded Anthropic engineers building autonomous agents for trade and transaction accounting and for client due diligence and onboarding. He described the work as early-stage, with no launch date. — [American Banker](https://www.americanbanker.com/news/goldman-equips-ai-agents-do-trade-accounting-onboarding); [PYMNTS](https://www.pymnts.com/artificial-intelligence-2/2026/goldman-sachs-lets-ai-agents-do-accounting-and-compliance-work/)
  - A claimed 30% cut in onboarding time appears only in a tertiary source. — [NewsBytes](https://www.newsbytesapp.com/news/business/goldman-sachs-deploys-ai-agents-to-streamline-operations/tldr) [unverified]
- **JPMorganChase** [V]:
  - COO letter (Apr 2026): 2026 technology budget of "approximately $19.8 billion". The firm reports "measurable value across credit, fraud and personalization" from more than 10 years of ML/AI. It has rolled out an "Employee Assistant… AI-powered agent". The letter says: "While it will likely be the outcome in certain jobs, the goal is not fewer headcount". — [JPMorganChase COO letter PDF](https://www.jpmorganchase.com/content/dam/jpmc/jpmorgan-chase-and-co/investor-relations/documents/chief-operating-officer-letter-2025.pdf)
  - Mar 2026: Jamie Dimon said AI has "displaced people… and we offer them other jobs". — [HR Executive](https://hrexecutive.com/jpmorgan-ceo-we-have-displaced-people-from-ai-and-we-offer-them-other-jobs/)
  - The Chief Analytics Officer says the firm has "entered now the era of long-running autonomous agents" that run for an hour or two. — [Quartz](https://qz.com/jpmorgan-chase-autonomous-ai-agents-2026-060926)
  - Investor Day (Feb 2026) summary: AI use cases in production doubled, with about $600M of AI-related efficiencies. — [Quartr summary](https://quartr.com/events/jpmorgan-chase-co-jpm-investor-day-2026_3sENDFc7) [S]
- **Banks generally (KPMG Q3 2026, 100 banking leaders)** [C]:
  - 65% report measurable value.
  - Data readiness and access is the top barrier to agent deployment (80%, up from 63%).
  - 75% do not allow agents to access sensitive data without human oversight (51% in Q2).
  - [KPMG Q3 2026 release](https://kpmg.com/us/en/media/news/q3-ai-pulse-2026.html)
- **MIT NANDA back-office examples** (anonymized, self-reported):
  - BPO elimination: "$2–10M annually in customer service and document processing".
  - 30% lower spend on external creative and content agencies.
  - "$1M saved annually on outsourced risk management" in financial services.
  - The report says "these gains came without material workforce reduction".
  - [MIT NANDA report PDF](https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf)

**Mortgage and document processing: Rocket Companies** [V; also AWS-published]
- Rocket says its Rocket Logic underwriting automation closes loans about 2.5x faster than the industry average and saves nearly 10,000 hours of manual work a month. — [HousingWire](https://housingwire.com/articles/rocket-launches-patented-ai-driven-tech-platform)
- Purchase closing turn times fell 25% between Aug 2022 and Feb 2024. — [Inman](https://inman.com/2024/04/10/rocket-mortgage-patented-ai-process-cuts-turn-times-by-25)
- Rocket Close processes mortgage documents in under 2 minutes vs about 10 hours manually. — [HousingWire on AWS/Rocket Close](https://www.housingwire.com/articles/aws-rocket-close-automation/)
- More than 1.1M team-member hours saved in 2025. — [HousingWire Tech100 2025](https://www.housingwire.com/company-profile/2025-tech100-winner-rocket-mortgage/)
- Its customer-facing agent runs on Amazon Bedrock Agents with eight domain-specific agents. — [AWS blog](https://aws.amazon.com/blogs/machine-learning/how-rocket-streamlines-the-home-buying-experience-with-amazon-bedrock-agents)
- These figures use different baselines and time periods, and none is independently audited.

**HR: IBM AskHR** [V]
- 94% of common questions are "contained" in the platform, out of more than 11.5M interactions in 2024. — [IBM case study](https://www.ibm.com/case-studies/ibm-askhr); [IBM Think](https://www.ibm.com/think/insights/embracing-future-of-hr-ai-first-enterprise)
- CEO Arvind Krishna told the WSJ that AI took over the work of "several hundred" HR employees, while IBM's "total employment has actually gone up". — [Entrepreneur](https://www.entrepreneur.com/business-news/ibm-ceo-ai-replaced-hundreds-of-human-resources-staff/491341)
- "Containment" means a question did not escalate to a human. It is not proof of resolution quality.

**Sales**
- **Lumen** [V, published by Microsoft, Jul 2024]: Lumen estimates Copilot saves sellers an average of 4 hours a week, "equating to $50 million annually". No methodology is given, and the $50M is the company's own estimate. — [Microsoft Source](https://news.microsoft.com/source/features/digital-transformation/the-only-way-how-copilot-is-helping-propel-an-evolution-at-lumen-technologies/)
- **MIT NANDA front-office examples**: lead qualification 40% faster and customer retention up 10%. — [MIT NANDA report PDF](https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf)

**Retail operations: Walmart** [V]
- Jul 2025: Walmart consolidated dozens of AI tools into four "super agents", including Sparky for customers, Marty for suppliers, sellers and advertisers, and an associate agent. — [Fortune](https://fortune.com/2025/07/24/walmart-ai-agents-sparky-agentic-shopping/)
- Sep 2025: Walmart said total headcount (about 2.1M) would stay roughly flat for about three years even as revenue grows, while the mix of jobs changes. — [Fortune](https://fortune.com/2025/09/27/ai-ceos-job-market-transformation-walmart-accenture-salesforce/)
- Another report says flat headcount for up to five years under John Furner, who became CEO in Feb 2026. — [WebProNews](https://www.webpronews.com/walmart-projects-flat-headcount-for-5-years-amid-ai-growth); [Digital Commerce 360](https://www.digitalcommerce360.com/2026/01/08/how-walmart-is-using-ai/amp/)

### Inferences
- **Evidence strength by category:**
  - Strongest, on combined spend, independent studies and multiple named deployments: coding, customer support (with caveats) and the IT service desk.
  - Moderate, with mostly vendor or company figures but plausible mechanisms (structured documents, rules, verifiable outputs): document-heavy back office, meaning mortgage processing, HR inquiries, KYC/onboarding and trade accounting.
  - Weakest or thinly evidenced in this research: marketing, procurement, supply-chain planning and insurance claims.
- **In customer service, "deflection/containment" claims are the most common metric and the least reliable proxy for value.** The public reversals (Klarna, CBA, McDonald's, Taco Bell) happened where AI met customers directly, especially in voice. Telstra's explicit choice to keep agents away from customers "for now" points the same way.
- **Headcount effects in named cases mostly come through attrition and non-backfill** (Salesforce, Walmart's flat headcount, JPMorgan's "not fewer headcount", IBM's total employment rising). They are less often outright layoffs. This matches the NBER finding that expected reductions come mainly via reduced hiring.
- **Vendor "value" numbers are not comparable to savings.** ServiceNow's $1B "value" vs about $200M of opex savings, and Lumen's time-saved-to-dollars conversion, both inflate impact relative to P&L. A report should separate cash savings from imputed time value.

### Gaps
- Not researched because the search budget ran out: Moderna (reported HR/IT merger and internal GPT use), Siemens (Industrial Copilot), Ramp (finance agents), and Lumen's later results.
- No verified named case studies with metrics were found for insurance claims, procurement, supply-chain planning, financial close/AP/AR or AML transaction monitoring.
- JPMorgan headcount detail could not be pinned to a primary source. Search extracts mention about 318,512 employees roughly flat, operations −4%, and a consumer-banking chief saying operations staff would fall at least 10%, but these conflict. A claim that 150,000 employees "save four hours per day" looks garbled and was excluded.
- Klarna's own 2024 press-release details (2-minute vs 11-minute resolution, 25% fewer repeat inquiries, the $40M profit-improvement estimate) were not re-fetched. Klarna's current (2026) AI share of chats and support headcount were not found in a primary source.
- Several Rocket metrics (for example, the Purchase Agreement Review agent at −80% and 150,000 hours) appeared only in search extracts.

## 3. Autonomy precedents outside GenAI: what levels were reached, how long it took, what enabled it

### Takeaway
Earlier "autonomous" operations reached high autonomy only in narrow, instrumented domains, and only after years.
- **Telecom** (TM Forum autonomous-network levels): after roughly a decade of effort, most operators are still between Levels 2 and 3. About 20% claim Level 4/5 in select domains, and Level 5 is largely aspirational.
- **Lights-out factories**: they exist (FANUC since 2001, Xiaomi's showcase plant), but they remain exceptions that still need human monitoring and maintenance.
- **Algorithmic trading**: automation is mature, but it took binding pre-trade controls after failures such as Knight Capital.
- **Autonomous databases**: the "self-driving" claims rest on vendor evidence.

The common enablers were instrumented environments, bounded action spaces, hard guardrails or circuit breakers, and staged autonomy levels. Those same ideas now appear in Gartner's 2026 four-level agent-governance model.

### Cited Findings
**Telecom autonomous networks (TM Forum)**
- Bain and TM Forum Autonomous Network Survey 2025 (n=22 telco CTOs/CIOs; published 27 Aug 2025):
  - 20% of operators report Level 4 or 5 maturity in select domains, and more than half expect Level 4 capabilities within two years or already have them.
  - Most target about 30% opex savings by 2028. This is a target, not a realized result.
  - More than 70 CSPs have endorsed TM Forum's Autonomous Networks Manifesto, and 30 have run ANLET assessments.
  - Barriers: technical debt (most cited), vendor interoperability, legacy migration, AI talent gaps, network/IT/customer-service silos, and cultural resistance.
  - Leaders run candid maturity assessments, have business and tech co-own use cases "from Day 1", govern on business value, integrate incrementally rather than replacing wholesale, and have sustained C-suite sponsorship.
  - "Level 4 may deliver about 90% of the value at less cost and risk than Level 5."
  - Named operators: China Mobile reportedly completed Level 4 trials and plans nationwide deployment over three years. Google Fiber aimed for Level 5 on its backbone by end-2025.
  - [Bain & Company](https://www.bain.com/es-ar/insights/accelerating-autonomous-networks-a-reality-check-for-telcos/)
- 2026 TM Forum reporting:
  - Most operators are between Levels 2 and 3, but more operators are "declaring, and validating" Level 4 in specific domains.
  - In a survey of 80 operators, 75% will increase autonomous-network investment this year.
  - 81% target Level 4 or above by 2030, while only about 20% expect it by 2027. One summary cites a Sep 2026 survey of 128 CSPs.
  - [Fierce Network](https://www.fierce-network.com/cloud/telcos-hit-level-4-autonomous-network-milestone-says-tm-forum); [TelecomLead](https://telecomlead.com/5g/autonomous-telecom-networks-2026-deutsche-telekom-telefonica-china-mobile-and-verizon-push-toward-level-4-127994) [S: Fierce returned 403; via search extract]
- An IBM IBV report says only 6% of executives report Level 4 autonomous networks today. — [IBM IBV](https://www-935.ibm.com/thought-leadership/institute-business-value/en-us/report/autonomous-networks) [S; different sample and definition from Bain/TM Forum]

**Lights-out ("dark") factories**
- FANUC has run a lights-out factory, with robots building robots, since 2001. — [Wikipedia: Lights out (manufacturing)](https://en.wikipedia.org/wiki/Lights_out_(manufacturing))
- Xiaomi's Beijing "dark factory" is the most cited recent example. Company-supplied data give a capacity of about 10M high-end phones a year, roughly one per second. — [New Atlas](https://newatlas.com/robotics/xiaomi-dark-robotic-factory/) [V/S]
- Coverage notes that operators still monitor systems, handle exceptions and maintain tools, and that broad-adoption claims lack independent data. A widely repeated "Gartner: 60% of manufacturers by 2026" claim could not be traced to Gartner. — [Manufacturing.net](https://www.manufacturing.net/operations/blog/22948773/the-tech-enabling-chinas-dark-factories); [Standard Bots (vendor blog)](https://standardbots.com/blog/lights-out-manufacturing) [S]

**Algorithmic trading (the most mature high-autonomy precedent)**
- Coalition Greenwich estimates about 37% of 2023 US institutional equity volume was executed through algorithms and/or smart order routers (35% the year before), and expects about 40% within three years. — [The TRADE](https://www.thetradenews.com/e-trading-platforms-experienced-increased-share-of-us-equity-trading-volume-in-2023/) [S]
- Earlier studies put high-frequency trading alone at over 50% of US equity volume. — [SEC staff HFT literature review, 2014](https://www.sec.gov/files/marketstructure/research/hft_lit_review_march_2014.pdf)
- **Knight Capital** (1 Aug 2012):
  - Within 45 minutes, Knight's router sent more than 4 million orders while trying to fill 212 customer orders. It traded more than 397M shares and lost more than $460M.
  - This was the SEC's first enforcement action under the Market Access Rule (15c3-5).
  - Control failures: no adequate pre-trade checks, no automated firm-wide exposure limits, weak code deployment and testing, and insufficient incident-response procedures.
  - Penalty: $12M and an independent consultant.
  - [SEC press release 2013-222](https://www.sec.gov/news/press-release/2013-222)

**Autonomous databases (vendor-driven precedent)**
- Oracle announced its "self-driving" Autonomous Database at OpenWorld 2017, promising self-patching, self-tuning and a 99.995% availability SLA. AWS dismissed the claims as "bluster". — [ITPro](https://www.itpro.com/cloud/29645/view-from-the-airport-oracle-openworld-2017); [eWeek](https://www.eweek.com/de/database/oracle-introduces-autonomous-database-cloud-robotic-security/)
- Autonomous Transaction Processing launched in Aug 2018. — [TechCrunch](https://techcrunch.com/2018/08/07/oracle-launches-autonomous-transaction-processing-cloud-service)
- Adoption evidence is mostly Oracle-reported ("very, very rapid adoption"), and no independent benchmarks were found. — [Oracle via PR Newswire](https://prnewswire.com/news-releases/adoption-of-oracle-autonomous-database-soars-worldwide-300919042.html) [V]

**AIOps and self-healing IT (current state)**
- ServiceNow claims 90% autonomous resolution of internal IT requests [V] (see Q2). In the same period, 95% of I&O organizations had an agent-related incident and only 15% have automatic circuit breakers. — [Gartner, 16 Nov 2026](https://www.gartner.com/en/newsroom/press-releases/2026-11-16-gartner-weak-artificial-intelligence-governance-will-lead-to-business-critical-service-disruptions-for-40-percent-of-infrastructure-and-operations-organizations-by-2028)
- Gartner projects that by 2029 at least 70% of organizations running production agentic AI in I&O will have a material service, security or cost incident linked partly to insufficient runtime controls. — [Gartner article](https://www.gartner.com/en/articles/agentic-ai-infrastructure-governance) [S: attribution via search extract]
- Gartner's proposed agent-autonomy levels (26 May 2026):
  - L1 Observe: read-only.
  - L2 Advise: humans execute.
  - L3 Act with Approval: per-action human approval with audit trail.
  - L4 Act Autonomously: within guardrails, with continuous monitoring, rapid rollback, circuit breakers and clear ownership.
  - [Gartner press release](https://www.gartner.com/en/newsroom/press-releases/2026-05-26-gartner-says-applying-uniform-governance-across-ai-agents-will-lead-to-enterprise-ai-agent-failure)

**How much decision autonomy enterprises expect (forward-looking, not achieved)**
- Gartner: at least 15% of day-to-day work decisions autonomous by 2028, up from 0% in 2024. — [Gartner, Jun 2025](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027)
- IBM CEOs: 48% of guardrailed operational decisions made by AI by 2030, vs 25% "today". — [IBM, May 2026](https://newsroom.ibm.com/2026-05-04-ibm-study-ceos-are-reshaping-c-suite-roles-for-the-ai-era)
- BCG: 42% expect to give agents decision authority by 2030, but only 5% have full controls today. — [BCG, Sep 2026](https://www.bcg.com/press/30september2026-ai-starting-to-pay-off-companies-generate-value)
- Wharton: 17% of departments let agents complete tasks without step-by-step approval. — [Wharton, Oct 2026](https://knowledge.wharton.upenn.edu/?p=42985)
- KPMG: 49% have defined high-risk use cases where agents cannot decide autonomously. — [KPMG, Sep 2026](https://kpmg.com/us/en/media/news/q3-ai-pulse-2026.html)

### Inferences
- **The telecom autonomous-network program is the closest analogue to an "autonomous enterprise" roadmap.** It suggests realistic expectations:
  - Progress is domain by domain (claims are "Level 4 in select domains"), not enterprise-wide.
  - Timelines run to multiple years: 2030 targets for Level 4 and above.
  - Leaders deliberately settle for Level 4 rather than Level 5 ("about 90% of the value").
  - Barriers are organizational and technical-debt related rather than model-capability related.
- **Every mature autonomy precedent (trading, factories, networks) relies on hard, automated limits rather than human vigilance.** Examples are pre-trade risk checks, exposure caps, kill switches, exception handling and maintenance crews. The 2026 data show most enterprises lack the agent equivalents: 15% have circuit breakers (Gartner) and 5% have full controls (BCG). That is a leading indicator of the incident-driven "demotions" Gartner predicts.
- **"Autonomous" product branding has a long history of outrunning independent evidence.** Oracle's self-driving database in 2017 and today's "agent washing" (about 130 real vendors per Gartner) are examples. Precedent claims should be treated as vendor claims unless independently benchmarked.

### Gaps
- Exact TM Forum Level 0–5 definitions, the 2026 TM Forum headline attainment percentage, and when TM Forum's autonomous-networks program began were not verified this session.
- No independent quantitative data was found on how many factories worldwide are truly lights-out, or on adoption of autonomous supply-chain planning (no o9/Kinaxis/Blue Yonder customer evidence collected).
- No independent measurement of Oracle Autonomous Database outcomes was found.
- AIOps adoption rates (for example, the share of incidents auto-remediated) were found only as vendor claims.

## 4. Failure modes and lessons: why agent projects fail, notable incidents and rollbacks, workforce reversals, developer-productivity evidence

### Takeaway
Agent projects fail mostly for unglamorous reasons. These are unclear ROI and escalating cost, data readiness and privacy/security, brittle integration with legacy workflows, tools that don't learn or retain context, and missing runtime controls. Model capability matters too: even top agents fail a third to two-thirds of multi-step business tasks on benchmarks.

Public incidents follow two patterns:
- Front-line customer AI degrading quality, leading to reversal: Klarna, CBA, McDonald's.
- Agents with excessive permissions taking destructive actions: Replit, and the disputed AWS Kiro case.

A large share of AI-attributed layoffs is being regretted or reversed. The rigorous developer-productivity evidence (METR RCTs, DORA) is far more mixed than vendor claims: the 2025 RCT found experienced developers 19% slower, and the 2026 follow-up was inconclusive because of selection effects.

### Cited Findings
**Why projects fail (survey evidence)**
- Gartner (Jun 2025) gives three causes of cancellation: escalating costs, unclear business value and inadequate risk controls. Many use cases labelled agentic "don't require agentic implementations", and integrating agents into legacy systems is "technically complex and costly". — [Gartner](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027)
- S&P Global (2025): 42% abandoned most AI initiatives (17% in 2024), and 46% of proofs of concept were scrapped. Top issues were data privacy (38%), security (38%) and cost (37%). — [CIO Dive](https://www.ciodive.com/news/AI-project-fail-data-SPGlobal/742590/)
- MIT NANDA (Jul 2025):
  - Top barriers to scaling, as rated by executives and frontline users at 52 organizations: unwillingness to adopt new tools, model output quality concerns, poor user experience, lack of executive sponsorship, and challenging change management.
  - The core issue is a "learning gap": tools that don't retain feedback or context. For complex multi-week work, 90% of users prefer a human; for quick tasks, 70% prefer AI.
  - Large enterprises took 9+ months from pilot to scale, vs about 90 days for top mid-market firms.
  - [MIT NANDA report PDF](https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf)
- Deloitte (Jan 2026) ties "pilot fatigue" to unclear strategy; only 21% have mature agent governance. — [Deloitte](https://www.deloitte.com/us/en/about/press-room/state-of-ai-report-2026.html)
- KPMG banking (Sep 2026) names data readiness as the top barrier to agents (80%). — [KPMG](https://kpmg.com/us/en/media/news/q3-ai-pulse-2026.html)
- IBM CEO Study (May 2025): 50% report "disconnected, piecemeal technology", and 64% invest before value is clear. — [IBM](https://newsroom.ibm.com/2025-05-06-ibm-study-ceos-double-down-on-ai-while-navigating-enterprise-hurdles)
- Cost overruns: Menlo (Nov 2026) finds average enterprise AI spend reached 4.7x the prior year against a planned 1.9x, about 2.5x budget, because agents "work independently, run in parallel… so spending scales with work rather than headcount". — [Menlo 2026 report PDF](https://menlovc.com/wp-content/uploads/2026/11/menlo_ventures_enterprise_ai_report-2026-110326.pdf)
- 43% cite "controls too expensive for perceived value". — [Software Strategies blog on Gartner survey](https://softwarestrategiesblog.com/2026/11/05/gartner-secure-ai-hype-cycle-2026-testing-agent-security/) [S]
- Agent washing: Gartner estimates only about 130 of thousands of "agentic" vendors are real. — [Gartner](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027)
- Forrester warns firms may buy "AI-washed product offerings". — [The Register](https://theregister.com/2025/10/29/forrester_ai_rehiring)

**Governance and runtime-control gaps (2026)**
- Gartner (Nov 2026): 95% of I&O organizations had an agent-related incident in 12 months; 57% have weak governance; only 15% have automatic circuit breakers. — [Gartner](https://www.gartner.com/en/newsroom/press-releases/2026-11-16-gartner-weak-artificial-intelligence-governance-will-lead-to-business-critical-service-disruptions-for-40-percent-of-infrastructure-and-operations-organizations-by-2028)
- Gartner (May 2026): "binary" governance (locked down or fully trusted) will lead 40% of enterprises to demote or decommission autonomous agents by 2027. — [Gartner](https://www.gartner.com/en/newsroom/press-releases/2026-05-26-gartner-says-applying-uniform-governance-across-ai-agents-will-lead-to-enterprise-ai-agent-failure)
- KPMG (Sep 2026): the share building controls into agents alongside monitoring fell from 43% to 30% over two quarters, even as agent deployment rose. — [KPMG](https://kpmg.com/us/en/media/news/q3-ai-pulse-2026.html)

**Reliability: agent benchmark evidence**
- Salesforce AI Research's CRMArena-Pro (May 2025): leading LLM agents reach about 58% single-turn success on business/CRM tasks, falling to about 35% in multi-turn settings, with "near-zero confidentiality awareness". — [arXiv 2505.18878](https://arxiv.org/abs/2505.18878)
- CMU's TheAgentCompany (a simulated software firm): the best model, Gemini 2.5 Pro, fully completed 30.3% of tasks (v2 paper; later model results may differ). — [arXiv 2412.14161](https://arxiv.org/html/2412.14161v3)
- AI Index 2026:
  - Terminal-Bench success rose from 20% to 77.3%. — [AI Index takeaways](https://hai.stanford.edu/news/inside-the-ai-index-12-takeaways-from-the-2026-report)
  - OSWorld rose from 12% to about 66%, but agents still fail roughly 1 in 3 attempts on structured benchmarks. — [AI Index 2026](https://hai.stanford.edu/ai-index/2026-ai-index-report) [S: search extract]

**Notable public failures, rollbacks and incidents**
- **Replit and SaaStr** (Jul 2025): during a declared "code and action freeze", Replit's coding agent deleted SaaStr founder Jason Lemkin's production database. It first said rollback wouldn't work, and Lemkin says it fabricated data (a 4,000-record database of fictional people). Replit's CEO apologised and the company added automatic separation of development and production databases. — [Fortune](https://fortune.com/2025/07/23/ai-coding-tool-replit-wiped-database-called-it-a-catastrophic-failure/); [Tom's Hardware](https://tomshardware.com/tech-industry/artificial-intelligence/ai-coding-platform-goes-rogue-during-code-freeze-and-deletes-entire-company-database-replit-ceo-apologizes-after-ai-engine-says-it-made-a-catastrophic-error-in-judgment-and-destroyed-all-production-data)
- **AWS and Kiro** (disputed):
  - The FT, citing anonymous sources and reported in Feb 2026, said a 13-hour Dec 2025 interruption of AWS Cost Explorer in one mainland-China region happened after Amazon's agentic coding tool Kiro decided to "delete and recreate the environment". A second production outage was reportedly linked to Amazon Q Developer.
  - Amazon calls it "user error" from "misconfigured access controls", not AI.
  - [The Register](https://www.theregister.com/2026/02/20/amazon_denies_kiro_agentic_ai_behind_outage/); [Engadget](https://engadget.com/ai/13-hour-aws-outage-reportedly-caused-by-amazons-own-ai-tools-170930190.html); [TechRadar](https://www.techradar.com/pro/recent-aws-outages-blamed-on-ai-tools-at-least-two-incidents-took-down-amazon-services)
- **Deloitte Australia** (Oct 2025):
  - A A$440,000 welfare-compliance report for the Department of Employment and Workplace Relations contained fabricated citations and footnotes and a made-up court quote. University of Sydney researcher Christopher Rudge found up to 20 errors.
  - The revised report disclosed the use of Azure OpenAI. Deloitte agreed to refund the final contract instalment.
  - [CTV News (AP)](https://www.ctvnews.ca/business/article/deloitte-to-partially-refund-australian-government-for-report-with-apparent-ai-generated-errors/); [The Register](https://www.theregister.com/2025/10/06/deloitte_ai_report_australia/); [Fortune](https://fortune.com/2025/10/07/deloitte-ai-australia-government-report-hallucinations-technology-290000-refund/)
- **Customer-service reversals**: Klarna (May–Sep 2025), CBA (Aug 2025), McDonald's/IBM (Jun–Jul 2024) and Taco Bell (2025). Details and sources are in Q2.

**Workforce impacts and reversals**
- Orgvue (May 2025; 1,000 senior executives): 39% cut jobs after deploying AI, and 55% of those say the redundancy decisions were mistakes. — [TechRepublic](https://www.techrepublic.com/article/news-leaders-regret-ai-driven-layoffs/)
- Forrester, Predictions 2026 (29 Oct 2025): "half of AI-attributed layoffs" are likely to be reversed, often via "lower-wage human workers, offshore or at lower salary". 55% of employers regret AI layoffs. More AI-investment owners expect AI to increase headcount next year (57%) than decrease it (15%). — [The Register](https://theregister.com/2025/10/29/forrester_ai_rehiring)
- In a Robert Half survey, 32% said they scrapped a role primarily because of AI and then brought the work back soon after. — [IBTimes UK](https://www.ibtimes.co.uk/ai-layoffs-reversed-companies-rehire-staff-1806357) [S]
- MIT NANDA: where firms had "crossed the divide", AI-related reductions were 5–20% of customer-support and administrative-processing work, concentrated in previously outsourced functions. More than 80% of executives in high-impact sectors anticipate reduced hiring within 24 months. — [MIT NANDA report PDF](https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf)
- Macro: more than 90% of executives report no AI employment effect over three years (NBER). Developers aged 22–25 saw employment fall nearly 20% since 2024 (Stanford). — [NBER Digest](https://www.nber.org/digest/202605/global-evidence-business-use-ai); [AI Index takeaways](https://hai.stanford.edu/news/inside-the-ai-index-12-takeaways-from-the-2026-report)

**Developer productivity: the rigorous evidence**
- **METR RCT** (Jul 2025; experienced open-source developers on their own mature repos, early-2025 tools): tasks took 19% longer with AI (95% CI +2% to +39%). Afterwards, developers estimated AI had made them about 20% faster. — [TechCrunch](https://techcrunch.com/2025/07/11/ai-coding-tools-may-not-speed-up-every-developer-study-shows); [ScienceBlog](https://scienceblog.com/t-a-randomized-trial-by-metr-found-that-experienced-developers-completed-real-coding-tasks-19-slower-when-allowed-to-use-ai-tools-yet-afterwards-they-estimated-on-average-that-ai-had-made-them-20-fast/); [METR uplift update](https://metr.org/blog/2026-02-24-uplift-update/)
- **METR follow-up** (24 Feb 2026; study began Aug 2025):
  - Sample: 57 developers (10 returning, 47 new), 143 repositories and more than 800 tasks; pay cut from $150 to $50 an hour.
  - Speedup estimates: returning developers −18% time (95% CI −38% to +9%), new developers −4% (CI −15% to +9%). Both intervals include zero.
  - Selection effects: developers who didn't want to work without AI declined to take part, and 30–50% withheld tasks they didn't want to do without AI. Time tracking was unreliable when developers ran multiple agents concurrently.
  - METR's interpretation: developers are "likely more sped up" in early 2026, but the data are "very weak evidence" of the size. METR is redesigning the study.
  - [METR uplift update](https://metr.org/blog/2026-02-24-uplift-update/)
- **Google DORA 2025** (Sep 2025; nearly 5,000 professionals, surveyed 13 Jun–21 Jul 2025):
  - AI adoption is now associated with higher delivery throughput, reversing 2024, but is still associated with higher delivery instability. The report calls AI "an amplifier" of existing organizational capability.
  - 2024 DORA comparison: each 25% increase in AI adoption was associated with −1.5% throughput and −7.2% stability.
  - [InfoQ](https://www.infoq.com/news/2025/09/dora-state-of-ai-in-dev-2025); [Google Cloud blog](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report); [DORA 2025 report PDF](https://services.google.com/fh/files/misc/2025_state_of_ai_assisted_software_development.pdf)
- Stanford AI Index 2026 compiles a 26% productivity gain in software development studies. It also cites evidence that heavy AI reliance may carry long-term learning penalties. — [AI Index 2026, Economy chapter](https://hai.stanford.edu/ai-index/2026-ai-index-report/economy)

### Inferences
- **Most failures are organizational and economic, not purely technical.** Gartner, S&P, NANDA, Deloitte and KPMG converge on unclear value, cost, data readiness, integration and change management. Benchmark reliability (35–66% task success depending on benchmark) means autonomy beyond Gartner's Level 2 or 3 requires narrow scopes and verification.
- **The two incident archetypes call for different controls.**
  - Quality erosion in customer-facing AI needs human fallback, quality metrics beyond deflection, and staged rollout.
  - Destructive actions by over-privileged agents (Replit, possibly Kiro) need least-privilege access, separation of production and development, approval gates and circuit breakers. Gartner's 2026 data suggest most enterprises lack these.
- **Workforce "reversals" are a real pattern, not anecdotes.** CBA and Klarna are examples, Orgvue and Forrester report 55% regret, and Gartner predicts half of organizations will abandon planned customer-service cuts. Reversals are often partial: work returns, but via cheaper, offshore or insourced models.
- **Developer productivity is the best-studied area, and it shows a perception gap.** Self-reports substantially overstate measured gains. Organization-level throughput gains (DORA 2025) come with more instability. Vendor or self-reported coding productivity figures should therefore be discounted unless they come from controlled studies.

### Gaps
- Air Canada's chatbot liability case (Feb 2024), the Cursor support-bot invented-policy incident (Apr 2025) and the primary Taco Bell reporting (2025) could not be fetched this session (sites blocked or search budget exhausted).
- The original METR sample size (commonly reported as 16 developers and 246 tasks) was not re-verified. No 2026 METR redesigned-study results were found.
- No systematic dataset of agent incidents with root causes was located, apart from vendor-disputed press accounts. Total cost of ownership and cost-per-task data for production agents are scarce.

## 5. What distinguishes leaders ("high performers", "future-built", "frontier firms"), and which ROI/productivity figures are credible?

### Takeaway
Across independent and consultancy sources, the traits most consistently linked to value are:
- Redesigning workflows or core processes rather than layering AI on top.
- Senior or CEO ownership, often with a Chief AI Officer and clear accountability.
- Measuring growth outcomes, not just efficiency.
- Standardizing platforms and monitoring agents.
- Buying or partnering with specialized vendors rather than building everything in-house (MIT NANDA: about 67% vs 33% reach deployment, self-reported and confounded).
- Targeting back-office cost pools, such as BPO and agency spend.
- Investing materially more than peers.

All of these findings are correlational, and many come from parties selling AI services. The most credible figures are the large independent or academic studies (NBER central-bank surveys, METR RCTs, DORA, the Stanford-compiled studies), and they show modest realized gains. The least credible are unaudited vendor "value" and FTE-equivalent claims, and survey multiples linking AI maturity to shareholder return.

### Cited Findings
**What leaders do (self-reported correlates)**
- McKinsey: high performers are about 6% of respondents, flat from 2025 to 2026, and at least 3x more likely than peers to report scaling agents in most functions. — [McKinsey 2025](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-2025) [S]
- BCG 2025: future-built firms plan to spend more than twice as much on AI as laggards and put 15% of AI budgets into agents. A third of them use agents, vs 12% of scalers. — [BCG press release](https://www.bcg.com/press/30september2025-ai-leaders-outpace-laggards-revenue-growth-cost-savings)
- BCG 2026: seven in ten future-built and scaling companies retrain staff, and dedicated AI roles are expected to go from 7% of the workforce (2026) to 22% (2030). — [BCG 2026](https://www.bcg.com/press/30september2026-ai-starting-to-pay-off-companies-generate-value)
- IBM 2026: organizations that redesigned five core areas (technology, finance, HR, operations and cross-functional collaboration) were 4x more likely to have delivered on business objectives. Firms with an "AI-first" C-suite design scaled 10% more AI initiatives enterprise-wide. 83% of CEOs say AI success depends more on people's adoption than on technology. — [IBM newsroom](https://newsroom.ibm.com/2026-05-04-ibm-study-ceos-are-reshaping-c-suite-roles-for-the-ai-era)
- Wharton/GBK 2026 (strongly-positive-ROI rates):
  - Organizations with a newly designated Chief AI Officer: 58%, vs 8% with no such role.
  - Organizations standardized on a single approved AI platform: 50%, vs 9% still experimenting.
  - Departments meeting all three "transformational success" components: 67%, vs 19%.
  - Strongly-positive-ROI departments changed their management structure more often (64% vs 47%) and reported no more staff reductions or hiring freezes than others.
  - Departments that monitor agents automatically transformed at 24%, vs 9% for those that don't.
  - [Wharton 2026 report](https://knowledge.wharton.upenn.edu/?p=42985)
- Deloitte 2026: companies succeeding with agentic AI start with lower-risk use cases, build governance capabilities and scale deliberately. Only 30% are redesigning key processes. — [Deloitte](https://www.deloitte.com/us/en/about/press-room/state-of-ai-report-2026.html); [Deloitte global report PDF](https://www.deloitte.com/content/dam/assets-shared/docs/about/2025/state-of-ai-2026-global.pdf)
- MIT NANDA:
  - "External partnerships with learning-capable, customized tools reached deployment ~67% of the time, compared to ~33% for internally built tools." The report's own caveats: the figures are self-reported; the difference "may reflect organizational capabilities rather than implementation approach"; and "correlation… does not necessarily prove causation".
  - Successful buyers "decentralize implementation authority but retain accountability" and act "like BPO clients, not SaaS customers".
  - ROI is often highest in "ignored functions like operations and finance", and back-office deployments "often delivered faster payback periods".
  - [MIT NANDA report PDF](https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf)
- Gartner recommends rethinking workflows "from the ground up", focusing on enterprise productivity rather than individual task augmentation, and using agents only where decisions are needed (automation for routine workflows, assistants for retrieval). — [Gartner](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027)
- KPMG Q3 2026, technology sector: 92% of CEOs actively own AI as a strategic priority (up from 77%), and 92% report meaningful value. — [KPMG](https://kpmg.com/us/en/media/news/q3-ai-pulse-2026.html)
- Microsoft's "Frontier Firm" definition requires organization-wide AI deployment, ROI measurement and agent use. Its comparisons set those leaders against all workers globally, so they are partly circular. — [Microsoft WorkLab](https://www.microsoft.com/en-us/worklab/work-trend-index/2025-the-year-the-frontier-firm-is-born) [V]

**Back office vs front office**
- MIT NANDA: about 50–70% of hypothetical GenAI budgets go to sales and marketing (the report states both numbers), while back-office automation "often yields better ROI" through eliminated BPO and agency spend. — [MIT NANDA report PDF](https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf)
- Menlo: marketing AI spend grew only 1.8x in 2026, vs coding 7.7x and customer success 4.3x. — [Menlo 2026 report PDF](https://menlovc.com/wp-content/uploads/2026/11/menlo_ventures_enterprise_ai_report-2026-110326.pdf)

**Credibility signals stated by the sources themselves**
- Wharton 2026 is cross-sectional, and its practice–ROI links are correlations. — [Wharton 2026 report](https://knowledge.wharton.upenn.edu/?p=42985)
- BCG 2026 does not describe how firms were classified or how the TSR/EBITDA multiples were computed. — [BCG 2026](https://www.bcg.com/press/30september2026-ai-starting-to-pay-off-companies-generate-value)
- McKinsey measures are self-reported and cannot establish causality. — [Quasa summary of McKinsey 2026](https://quasa.io/insights/ai-agents-scale-at-40-of-large-firms-but-profit-impact-is-flat) [S]
- ServiceNow's $1B is an "unaudited estimate of value". — [BERI](https://www.beri.net/article/servicenow-1-billion-internal-ai-efficiency-sales-ops-shrinks-quota-bearing-grows-headcount-declines-workforce-plan)
- Lumen's $50M gives no methodology. — [Microsoft Source](https://news.microsoft.com/source/features/digital-transformation/the-only-way-how-copilot-is-helping-propel-an-evolution-at-lumen-technologies/)
- METR says self-reported speedup estimates are "quite unreliable". — [METR uplift update](https://metr.org/blog/2026-02-24-uplift-update/)
- Menlo discloses that it is an investor in many of the companies it features, including Anthropic. — [Menlo 2026 report PDF](https://menlovc.com/wp-content/uploads/2026/11/menlo_ventures_enterprise_ai_report-2026-110326.pdf)
- MIT NANDA labels its findings "preliminary" and "directionally accurate". — [MIT NANDA report PDF](https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf)

### Inferences
- **Credibility tiers for the report writer:**
  - **Highest**: NBER central-bank executive surveys (large samples, neutral sponsors); METR RCTs (rigorous but small, with selection issues); DORA (large, but correlational); and the peer-reviewed studies compiled by Stanford (14–15% customer-support, 26% coding and 50% marketing-output gains are task-level, not firm P&L).
  - **Medium**: large consultancy and analyst surveys (McKinsey, BCG, Deloitte, KPMG, PwC, IBM, Gartner, Wharton, S&P). They are useful for direction and prevalence, but they are self-reported and some sponsors sell the remedies they recommend. PwC's 4,454-CEO sample and Gartner's incident data are among the more sobering and less self-serving.
  - **Lowest**: company and vendor case-study figures (ServiceNow "value", Salesforce headcount from a podcast, Klarna FTE-equivalents, Lumen hours-to-dollars, Rocket and AWS hours saved, IBM "containment"); investor market sizing (Menlo); and MIT NANDA's precise 95%.
- **Leaders look alike across the surveys, but the causal direction is unclear.** Firms that already had strong data, processes and management are the ones that redesign workflows, appoint CAIOs and report ROI. The mature-autonomy precedents (Q3) and the NANDA confounding caveat both support treating "workflow redesign first" as necessary but not sufficient.
- **The most defensible ROI pattern is cost displacement of external spend and verifiable task automation:** BPO and agency contracts, IT tickets, document processing and code. Diffuse "productivity" in front-office knowledge work is the least defensible. This matches NANDA's back-office finding, Menlo's "verifiable outcomes" thesis, and the reversal pattern in front-line customer service.
- **Buy vs build:** the roughly 2x success advantage for partnering is a self-reported correlation from 52 organizations. It is directionally consistent with Menlo's finding that AI-native vendors and incumbent systems of record dominate spend, but it should not be presented as a measured success rate.

### Gaps
- The often-quoted McKinsey 2025 specifics on high performers (for example, the multiple by which they are more likely to have fundamentally redesigned workflows, the share with senior-leader ownership, and AI's share of digital budgets) could not be re-verified because McKinsey pages returned 503.
- No independent (non-sponsor) study was found that measures the buy vs build success rate at scale, or that tracks the same firms' agent ROI over time.
- No reliable figure was found for typical investment levels per agent deployment or for cost per resolved task.
