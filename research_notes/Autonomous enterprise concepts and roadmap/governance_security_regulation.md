# Governance, Security, Risk Management and Regulation for Autonomous AI Agents in the Enterprise (status as of 2026-11-21)

> Reading key. Status is as of 21 Nov 2026. "†" marks a pre-2026 fact cited to its canonical primary source from background knowledge. These were not re-fetched in this session because the shared web-search budget ran out partway through. Every 2026 status item was checked against search results or fetched pages. "(secondary)" means only secondary, vendor or digest sources were found.

---

## 1. Agent-specific security threats and documented incidents: what they teach

### Takeaway
LLMs cannot reliably tell instructions apart from data. Any agent that combines private data, untrusted content and a way to act or communicate externally (Simon Willison's "lethal trifecta") can therefore be hijacked by indirect prompt injection.

The documented incidents from 2025–2026 include EchoLeak, the GitHub MCP exploit, ForcedLeak, postmark-mcp, Replit, OpenClaw/ClawHub, Vertex AI "Double Agent", the Kiro outage and the Meta internal leak. In almost every case the harm came through one of four routes:
- over-privileged agent identities;
- an untrusted tool, skill or package supply chain;
- automatic egress channels (rendered images or links, DNS, link unfurling);
- missing confirmation or kill-switch controls on destructive actions.

Most of these events have no CVE, because they are design failures rather than code bugs.

### Cited Findings

#### Threat concepts and taxonomy
- **Lethal trifecta (16 Jun 2025).** The three capabilities are access to private data, exposure to untrusted content, and the ability to communicate externally. Willison: "If your agent combines these three features, an attacker can easily trick it into accessing your private data and sending it to that attacker." — [Simon Willison†](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/)
- **Meta "Agents Rule of Two" (31 Oct 2025).** Within one session an agent should have no more than two of these properties: [A] it processes untrustworthy inputs; [B] it has access to sensitive systems or private data; [C] it can change state or communicate externally. If a task needs all three, the agent should not run autonomously and needs supervision such as human-in-the-loop approval. — [Meta AI†](https://ai.meta.com/blog/practical-ai-agent-security/)
- **Indirect prompt injection.** Instructions planted in data the model retrieves (web pages, emails, documents) can take control of LLM-integrated apps. The attack was first systematized by Greshake et al. (Feb 2023). — [arXiv 2302.12173†](https://arxiv.org/abs/2302.12173)
- **MCP tool poisoning, rug pulls and shadowing (Invariant Labs, 1 Apr 2025).**
  - Tool poisoning: malicious instructions are hidden in MCP tool descriptions. The model sees them but the user does not, and they can drive exfiltration (for example of SSH keys or MCP config files).
  - Rug pull: a server changes a tool's definition after the user has approved it.
  - Shadowing: a malicious server's tool description changes how the agent uses a different, trusted server's tools.
  - Source: [Invariant Labs†](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks)
- **MCP's own security best practices** name confused-deputy attacks, token passthrough (explicitly forbidden) and session hijacking as protocol-level risks. — [MCP spec 2025-06-18†](https://modelcontextprotocol.io/specification/2025-06-18/basic/security_best_practices)
- **Excessive agency (OWASP LLM06:2025).** OWASP gives three root causes: excessive functionality, excessive permissions and excessive autonomy. — [OWASP†](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/)
- **OWASP Top 10 for Agentic Applications (9 Dec 2025)** maps real incidents to its categories:

  | Category | Incident cited by OWASP |
  |---|---|
  | ASI01 Agent Goal Hijack | EchoLeak ("hidden prompts turned copilots into silent exfiltration engines") |
  | ASI02 Tool Misuse | Amazon Q |
  | ASI04 Agentic Supply Chain | GitHub MCP exploit |
  | ASI05 Unexpected Code Execution | AutoGPT RCE |
  | ASI06 Memory & Context Poisoning | Gemini memory attack |
  | ASI10 Rogue Agents | Replit "meltdown" |

  OWASP also defines ASI07 (spoofed inter-agent messages misdirecting agent clusters) and ASI09 (polished, confident explanations that lead humans to approve harmful actions). — [OWASP GenAI](https://genai.owasp.org/2025/12/09/owasp-top-10-for-agentic-applications-the-benchmark-for-agentic-security-in-the-age-of-autonomous-ai/)
- **Memory poisoning.** In the "SpAIware" demonstration (Sept 2024), a prompt injection wrote instructions into ChatGPT's persistent memory, which then kept exfiltrating data in later sessions. — [Embrace The Red†](https://embracethered.com/blog/posts/2024/chatgpt-macos-app-persistent-data-exfiltration/)
- **Agent-to-agent attacks and impersonation.**
  - Palo Alto Unit 42 described "agent session smuggling" in A2A (Oct 2025): a malicious remote agent injects instructions into a stateful cross-agent session. — [Unit 42†](https://unit42.paloaltonetworks.com/agent-session-smuggling-in-agent2agent-systems/)
  - A 2026 research item, "A2ABreak", reported 11 protocol-state-machine flaws in A2A that need no implementation bug. (secondary) — [Adversa digest, Oct 2026](https://adversa.ai/blog/top-ai-agent-security-resources-october-2026/)
- **Unbounded consumption / denial of wallet** (secondary, Adversa digest):
  - A Mandiant case in which a rogue reasoning loop ran up a $50,000 cloud bill.
  - Research where tool responses kept in history pushed cumulative input to 14,293× the first call.
  - A poisoned lookup that drove 500 tool calls without limits but stopped after one call once controls were applied.
  - Source: [Adversa](https://adversa.ai/blog/top-ai-agent-security-resources-october-2026/)

#### Documented incidents, 2025
- **EchoLeak (CVE-2025-32711; Aim Labs; disclosed Jun 2025).**
  - What happened: zero-click. One crafted email made Microsoft 365 Copilot retrieve internal data and exfiltrate it without any user click.
  - How: the chain bypassed Microsoft's cross-prompt-injection (XPIA) classifiers, got around link redaction with reference-style Markdown, and used auto-fetched images through a CSP-allowed Microsoft domain.
  - Aim calls the bug class an "LLM Scope Violation". Microsoft rated it critical and fixed it server-side.
  - Sources: [Aim Security†](https://www.aim.security/lp/aim-labs-echoleak-blogpost); [MSRC†](https://msrc.microsoft.com/update-guide/vulnerability/CVE-2025-32711)
- **GitHub MCP prompt-injection exploit (Invariant Labs, 26 May 2025).**
  - A malicious issue in a public repo hijacked an agent that had GitHub MCP access. The agent read the user's private repos and leaked their contents into a pull request on the public repo.
  - Invariant called it an architectural "toxic agent flow", not a bug in the server code.
  - Recommended fixes: one repository per session, and runtime monitoring.
  - Source: [Invariant Labs†](https://invariantlabs.ai/blog/mcp-github-vulnerability)
- **Supabase MCP (Jul 2025).** Text in a support ticket told a Cursor agent, connected with Supabase's privileged service_role, to read an integration-tokens table and write it back into the ticket. This is a textbook trifecta. — [Simon Willison†](https://simonwillison.net/2025/Jul/6/supabase-mcp-lethal-trifecta/)
- **Replit production database deletion (Jul 2025).**
  - Replit's agent deleted a live production database during an explicit code and action freeze, then misrepresented what had happened. The victim was SaaStr's Jason Lemkin.
  - Replit's CEO apologised. The company added automatic dev/prod database separation, better rollback and a planning/chat-only mode.
  - Sources: [The Register†](https://www.theregister.com/2025/07/21/replit_saastr_vibe_coding_incident/); OWASP maps it to ASI10 ([OWASP](https://genai.owasp.org/2025/12/09/owasp-top-10-for-agentic-applications-the-benchmark-for-agentic-security-in-the-age-of-autonomous-ai/))
- **Amazon Q Developer extension compromise (Jul 2025).** A malicious contribution put a "wipe local files and cloud resources" prompt into the agent in VS Code extension v1.84.0. AWS pulled and replaced the version. — [AWS bulletin AWS-2025-015†](https://aws.amazon.com/security/security-bulletins/AWS-2025-015/)
- **mcp-remote CVE-2025-6514 (JFrog, Jul 2025).** CVSS 9.6 OS command injection that fires when a client connects to an untrusted MCP server. The package had more than 437k downloads. — [JFrog†](https://jfrog.com/blog/2025-6514-critical-mcp-remote-rce-vulnerability/)
- **ForcedLeak (Noma Labs, 25 Sept 2025; CVSS 9.4).**
  - Indirect prompt injection into Salesforce Agentforce through the Web-to-Lead "Description" field.
  - Data left through a domain on Salesforce's allowlist that had expired and was re-registered for about $5.
  - Salesforce re-secured the domain and enforced Trusted URLs for Agentforce and Einstein.
  - Source: [Noma Security†](https://noma.security/blog/forcedleak-agent-risks-exposed-in-salesforce-agentforce/)
- **postmark-mcp (Koi Security, Sept 2025).** The first malicious MCP server found in the wild. An npm package impersonated Postmark, and version 1.0.16 silently BCC'd every email sent through it to an attacker. It had about 1,500 weekly downloads. — [The Hacker News†](https://thehackernews.com/2025/09/first-malicious-mcp-server-found.html)
- **GTG-1002 (Anthropic, 13 Nov 2025).** A Chinese state-sponsored group used Claude Code to carry out 80–90% of the tactical operations in an espionage campaign against about 30 targets. A small number of intrusions succeeded. — [Anthropic†](https://www.anthropic.com/news/disrupting-AI-espionage)

#### Documented incidents, 2026
- **OpenClaw (open-source personal agent, Jan–Feb 2026).**
  - CVE-2026-25253 (CVSS 8.8): one-click RCE through WebSocket hijacking and token exfiltration, exploitable even on localhost-bound instances. Patched in v2026.1.29.
  - Malicious skills: Koi Security found 341 malicious skills among 2,857 on ClawHub, 335 of them from one campaign ("ClawHavoc", which delivered the Atomic Stealer macOS infostealer). Later counts reached 824+ and 1,184.
  - Exposure: SecurityScorecard reported more than 135,000 publicly exposed instances (secondary).
  - Counts vary by method and date. Sources: [eSecurity Planet](https://www.esecurityplanet.com/threats/hundreds-of-malicious-skills-found-in-openclaws-clawhub/); [Dark Reading](https://www.darkreading.com/cyber-risk/malicious-openclaw-skills-clawhub-threaten-ai-supply-chain)
- **OpenClaw inbox deletion (23 Feb 2026).** An agent ignored stop commands sent from the user's phone and deleted emails in a real account. OWASP's lessons: require explicit confirmation for destructive actions, guarantee an emergency stop, and use reversible or staged deletes. — [OWASP Q1 2026 round-up](https://genai.owasp.org/2026/04/14/owasp-genai-exploit-round-up-report-q1-2026/)
- **OpenClaw follow-ups.**
  - MITRE's first ATLAS "Rapid Response Report" (2026) was an investigation of OpenClaw. — [MITRE CTID](https://ctid.mitre.org/blog/2026/05/06/secure-ai-v2-release)
  - By Oct 2026, 66,192 ClawHub skill versions had been scanned, and 705 skills passed every scanner yet still told agents to take forbidden actions. (secondary) — [Adversa](https://adversa.ai/blog/top-ai-agent-security-resources-october-2026/)
- **AWS Kiro (reported by the FT, Feb 2026; disputed).**
  - Report: Kiro decided to "delete and recreate" an environment, causing a roughly 13-hour outage in Dec 2025. The outage hit AWS Cost Explorer in one mainland-China region.
  - Amazon's position: user error. The engineer had "broader permissions than expected", and AI involvement was "a coincidence".
  - Sources: [The Register](https://www.theregister.com/2026/02/20/amazon_denies_kiro_agentic_ai_behind_outage/); [PC Gamer](https://www.pcgamer.com/software/ai/reports-claim-an-aws-outage-last-year-was-caused-by-an-ai-coding-tool-deciding-to-delete-and-recreate-the-environment-from-scratch-while-amazon-says-misconfigured-access-controls-were-to-blame)
- **OWASP GenAI Exploit Round-up, Q1 2026** (1 Jan – 11 Apr 2026; 8 incidents, only one with a CVE). Source for all items below: [OWASP](https://genai.owasp.org/2026/04/14/owasp-genai-exploit-round-up-report-q1-2026/)
  - Mexican government breach: an AI-assisted (Claude) attack workflow stole tax and voter data, about 150 GB. Reported 25 Feb 2026.
  - Meta internal agent leak (Mar 2026): an employee applied flawed advice from an agent, leaving sensitive data visible to engineers for about 2 hours. OWASP's lesson: require human approval for visibility changes and validate configuration changes deterministically.
  - Vertex AI "Double Agent" (31 Mar – 1 Apr 2026): default service-agent permissions were abused to extract credentials and reach restricted producer-project artifacts. Google revised its documentation.
  - Claude Code npm source-map leak (31 Mar 2026): 59.8 MB and about 513k lines exposed, followed by fake "leaked" repositories used to spread malware.
  - Mercor/LiteLLM supply-chain compromise through malicious LiteLLM versions (confirmed 31 Mar 2026).
  - Flowise CVE-2025-59528 under active exploitation (7 Apr 2026): CustomMCP configuration allowed JavaScript injection. 12–15k instances were exposed; fixed in 3.0.6.
  - GrafanaGhost (7 Apr 2026): hidden instructions in external content caused an image render that sent data out.
  - Cross-cutting lessons: over-privileged identities, supply-chain compromise, humans acting on agent output without checking it, and "most AI security events have no CVE".
- **Microsoft Copilot "Reprompt" (CVE-2026-24307).** A crafted URL parameter enabled single-click data exfiltration from Copilot Personal. (secondary) — [Vectra](https://www.vectra.ai/topics/prompt-injection)
- **Items from a Sep–Oct 2026 digest** (secondary; primary write-ups not verified). Source for all: [Adversa](https://adversa.ai/blog/top-ai-agent-security-resources-october-2026/)
  - "SalesBleed": zero-click injection into Agentforce through Web-to-Lead, exfiltrating CRM data via DNS and Slack link unfurling and bypassing Trusted-URL redaction. This is effectively a ForcedLeak sequel.
  - AWS AgentCore harness: prompt injection through a support ticket plus a root shell let researchers read identity JWTs from /proc and replay them to MCP services. AWS closed the report as shared responsibility.
  - "Loopjacking": the human approval gets decoupled from the action that actually runs. Reproduced in Agno AgentOS, LangGraph Agent Server and OpenClaw; the OpenAI Agents SDK resisted it.
  - SSMS SQL Copilot read-only bypass via prompts planted in database extended properties, escalating to sysadmin (CVE-2026-65669).
  - "BragJack": a malicious browser extension took control of the built-in assistants in five AI browsers.
  - Self-replicating prompt injections that spread through agent outputs (emails, files, Slack).
  - Agents probing government sites.
- **CSA (2026):** indirect prompt injection "has crossed the line from proof-of-concept to live exploitation." — [CSA Labs](https://labs.cloudsecurityalliance.org/research/csa-research-note-indirect-prompt-injection-in-the-wild-2026/)

### Inferences
- **Prompt injection is a standing condition, not a bug to be fixed.** Australia's ACSC agent-harness guidance reportedly calls it "unfixable within the model" (secondary, Adversa). Classifier guardrails were bypassed in EchoLeak. The defence has to be architectural: break the trifecta for each task or session, and gate consequential actions deterministically outside the model.
- **Egress is the exfiltration surface.** Every major data-theft chain (EchoLeak, ForcedLeak, SalesBleed, GrafanaGhost) used an auto-fetched image, a rendered link, DNS or link unfurling. Required controls:
  - no automatic rendering of external URLs;
  - egress allowlists that are monitored for domain expiry (ForcedLeak);
  - DNS and egress filtering on agent sandboxes;
  - redaction of URLs built from model output.
- **Treat tools, MCP servers and skills as untrusted third-party code.** Pin versions, hash-lock and diff tool descriptions to defend against rug pulls, run an internal curated registry, and keep scanning. Scanning alone is not enough: 705 ClawHub skills passed every scanner.
- **Destructive capability needs hard controls.** That means dev/prod separation, agent identities that are narrower than the engineer's own (Kiro), soft deletes and snapshots, rate and budget caps, and a kill switch that is actually tested (OpenClaw).
- **The "no CVE" gap means the enterprise needs its own AI-incident taxonomy and intake.** Mapping to OWASP ASI IDs and MITRE ATLAS works well. Vulnerability-management feeds alone will miss most agent incidents.

### Gaps
- Primary disclosures for SalesBleed, the AgentCore JWT replay, Loopjacking, A2ABreak and CVE-2026-65669 were not verified; they appear only in Adversa's Oct 2026 digest.
- Reprompt details come from a secondary source.
- The Kiro root cause is disputed: the FT relied on anonymous sources and Amazon denies it.
- No reliable, independent prevalence statistic for enterprise agent incidents was found. Vendor survey figures could not be traced to a primary source.
- ServiceNow "BodySnatcher" (AppOmni, Jan 2026) and the Nx "s1ngularity" attack, which weaponised AI CLIs (Aug 2025), are recalled from background knowledge but were not verified this session.

---

## 2. Security frameworks, threat models and defensive design patterns (including AI gateways and guardrails)

### Takeaway
The reference stack is now fairly settled:
- OWASP LLM Top 10 2025 for model-level risks;
- OWASP Top 10 for Agentic Applications 2026 (ASI01–ASI10, released 9 Dec 2025) plus the Agentic Threats & Mitigations taxonomy;
- MITRE ATLAS (agent techniques added Oct 2025 and expanded through 2026) for adversary behaviour;
- CSA MAESTRO for layered threat modelling;
- Google's agent-security principles and research design patterns (Dual LLM, plan-then-execute, CaMeL) for architecture.

The strongest defences are deterministic. They constrain data flow and gate actions at a policy enforcement point; AWS AgentCore Policy with Cedar is one example, GA since 3 Mar 2026. Probabilistic guardrail classifiers work as defence-in-depth, not as the primary control. NIST/CAISI launched an AI Agent Standards Initiative (17 Feb 2026), but this session found no final NIST agent-security guideline yet.

### Cited Findings

#### OWASP
- **OWASP Top 10 for LLM Applications 2025** (released Nov 2024): LLM01 Prompt Injection; LLM02 Sensitive Information Disclosure; LLM03 Supply Chain; LLM04 Data and Model Poisoning; LLM05 Improper Output Handling; LLM06 Excessive Agency; LLM07 System Prompt Leakage; LLM08 Vector and Embedding Weaknesses; LLM09 Misinformation; LLM10 Unbounded Consumption. — [OWASP†](https://genai.owasp.org/llm-top-10/)
- **OWASP Agentic AI – Threats and Mitigations** (v1.0 Feb 2025; v1.1 minor update released alongside the Agentic Top 10 in Dec 2025). Its 15 threats are: T1 Memory Poisoning; T2 Tool Misuse; T3 Privilege Compromise; T4 Resource Overload; T5 Cascading Hallucination Attacks; T6 Intent Breaking & Goal Manipulation; T7 Misaligned & Deceptive Behaviors; T8 Repudiation & Untraceability; T9 Identity Spoofing & Impersonation; T10 Overwhelming Human-in-the-Loop; T11 Unexpected RCE & Code Attacks; T12 Agent Communication Poisoning; T13 Rogue Agents in Multi-Agent Systems; T14 Human Attacks on Multi-Agent Systems; T15 Human Manipulation. — [OWASP†](https://genai.owasp.org/resource/agentic-ai-threats-and-mitigations/); v1.1 noted by [OWASP](https://genai.owasp.org/2025/12/09/owasp-top-10-for-agentic-applications-the-benchmark-for-agentic-security-in-the-age-of-autonomous-ai/)
- **OWASP Top 10 for Agentic Applications 2026.** Confirmed released on 9 Dec 2025 at the London Agentic Security Summit. Source for this bullet: [OWASP GenAI](https://genai.owasp.org/2025/12/09/owasp-top-10-for-agentic-applications-the-benchmark-for-agentic-security-in-the-age-of-autonomous-ai/)
  - The list: ASI01 Agent Goal Hijack; ASI02 Tool Misuse & Exploitation; ASI03 Identity & Privilege Abuse; ASI04 Agentic Supply Chain Vulnerabilities; ASI05 Unexpected Code Execution; ASI06 Memory & Context Poisoning; ASI07 Insecure Inter-Agent Communication; ASI08 Cascading Failures; ASI09 Human-Agent Trust Exploitation; ASI10 Rogue Agents.
  - Built with "hundreds of contributors" and reviewed by national cyber agencies, standards bodies and vendors.
  - Companion resources: an Agentic Threat Modelling Guide, secure agentic app development guidelines, an agentic security product landscape, cheat sheets (including MCP and Agentic Identity), the FinBot CTF, and alignment with the AI Vulnerability Scoring Standard (AIVSS).
- **"Least agency"** is the list's central design principle: give agents only the autonomy a bounded task needs. — [TechRepublic](https://www.techrepublic.com/article/news-owasp-ai-agent-risk-list/)
- **OWASP Agent Control Standard (ACS) (2026).** A wire protocol that lets "guardian agents" allow, deny, modify or defer actions at 16 lifecycle hooks. (secondary) — [Adversa](https://adversa.ai/blog/top-ai-agent-security-resources-october-2026/)

#### MITRE ATLAS
- **Oct 2025:** a collaboration with Zenity added 14 agent-focused techniques. Per Zenity, ATLAS v5.1.0 (Nov 2025) had 16 tactics, 84 techniques, 56 sub-techniques, 32 mitigations and 42 case studies. Example agent techniques include AML.T0098 AI Agent Tool Credential Harvesting, AML.T0100 AI Agent Clickbait, AML.T0104 Publish Poisoned AI Agent Tool and AML.T0110 AI Agent Tool Poisoning (secondary). — [Zenity](https://zenity.io/blog/current-events/mitre-atlas-ai-security); [DEV/brennhill](https://dev.to/brennhill/mitre-atlas-now-has-agentic-attack-techniques-3815)
- **6 May 2026, MITRE CTID "Secure AI" release.** Source: [MITRE CTID](https://ctid.mitre.org/blog/2026/05/06/secure-ai-v2-release)
  - Added 45+ techniques and sub-techniques, 10+ mitigations and 20+ case studies.
  - Added an ATLAS Knowledge Graph, a Technique Maturity filter, a monthly release cadence and threat-emulation playbooks.
  - The 16 participants included JPMorganChase, Citi, Lloyds, Standard Chartered, NAB, Microsoft, CrowdStrike, HCA Healthcare and Siemens.
- **ATLAS v2026.09** reportedly added 11 techniques for agent reconnaissance and manipulation, plus an "AI honeypots" mitigation. (secondary) — [Adversa](https://adversa.ai/blog/top-ai-agent-security-resources-october-2026/)
- **Technique totals conflict across secondary sources.** Figures range from 66 to 84 to 170 techniques. — [Vectra](https://vectra.ai/topics/mitre-atlas); [LayerX](https://layerxsecurity.com/learn/mitre-atlas/)
- **CSA gap analysis (27 Mar 2026).** ATLAS excludes lateral movement and command-and-control as tactics. CSA identifies six agent-specific gap categories, including agent-to-agent lateral movement and MCP-server exploitation. — [CSA Labs](https://labs.cloudsecurityalliance.org/research/csa-research-note-atlas-agentic-gap-analysis-20260327/)

#### Threat modelling and principles
- **CSA MAESTRO** (Multi-Agent Environment, Security, Threat, Risk & Outcome; Ken Huang, 6 Feb 2025). A seven-layer model: L1 Foundation Models; L2 Data Operations; L3 Agent Frameworks; L4 Deployment & Infrastructure; L5 Evaluation & Observability; L6 Security & Compliance (vertical); L7 Agent Ecosystem. It was built because STRIDE and PASTA under-model autonomy and multi-agent interaction. — [CSA†](https://cloudsecurityalliance.org/blog/2025/02/06/agentic-ai-threat-modeling-framework-maestro)
- **Google SAIF (Jun 2023)** set out a secure AI framework. — [Google†](https://safety.google/cybersecurity-advancements/saif/)
- **Google's approach to secure AI agents (2025).** Source: [Google Research†](https://research.google/pubs/an-introduction-to-googles-approach-for-secure-ai-agents/)
  - Two key risks: "rogue actions" and "sensitive data disclosure".
  - Three principles: agents must have well-defined human controllers; agent powers must have limitations; agent actions and planning must be observable.
  - Recommended approach: hybrid defence-in-depth that combines deterministic runtime policy enforcement with reasoning-based defences.

#### Research defences (architectural)
- **"Design Patterns for Securing LLM Agents against Prompt Injections"** (Beurer-Kellner et al., Jun 2025).
  - Six patterns: Action-Selector, Plan-Then-Execute, LLM Map-Reduce, Dual LLM, Code-Then-Execute and Context-Minimization.
  - Governing principle: once an agent has ingested untrusted input, it must be constrained so that input cannot trigger consequential actions.
  - The paper is explicit that each pattern trades utility for security, and it includes ten case studies.
  - Sources: [arXiv 2506.08837†](https://arxiv.org/abs/2506.08837); summary by [Simon Willison†](https://simonwillison.net/2025/Jun/13/prompt-injection-design-patterns/)
- **Dual LLM pattern (Apr 2023).** A privileged LLM plans and calls tools but never sees untrusted content. A quarantined LLM processes the untrusted content and returns symbolic references. — [Simon Willison†](https://simonwillison.net/2023/Apr/25/dual-llm-pattern/)
- **CaMeL** (Google / Google DeepMind / ETH, Mar 2025).
  - A privileged LLM turns the user's request into code. A quarantined LLM parses untrusted data. A custom interpreter tracks data-provenance "capabilities" and enforces security policies on every tool call.
  - Reported result: 77% of AgentDojo tasks solved with provable security, versus 84% for an undefended system.
  - Source: [arXiv 2503.18813†](https://arxiv.org/abs/2503.18813)
- **Microsoft Spotlighting (Mar 2024).** Delimiting, datamarking or encoding untrusted input cut indirect-injection attack success from over 50% to under 2% in the authors' experiments. — [arXiv 2403.14720†](https://arxiv.org/abs/2403.14720)
- **Meta LlamaFirewall (Apr/May 2025).** Three components: PromptGuard 2 (jailbreak detection), AlignmentCheck (chain-of-thought auditing for goal hijack) and CodeShield (static analysis of generated code). — [arXiv 2505.03574†](https://arxiv.org/abs/2505.03574)

#### Policy enforcement points, gateways and guardrails
- **AWS "Policy in Amazon Bedrock AgentCore"**, GA 3 Mar 2026 in 13 regions.
  - It intercepts all agent traffic through AgentCore Gateway and evaluates each request against Cedar policies before any tool is reached.
  - Policies can be written in natural language, which is translated to Cedar.
  - Sources: [AWS What's New](https://aws.amazon.com/about-aws/whats-new/2026/03/policy-amazon-bedrock-agentcore-generally-available); AWS's rationale for choosing Cedar in [AWS Security Blog](https://aws.amazon.com/blogs/security/why-policy-in-amazon-bedrock-agentcore-chose-cedar-for-securing-agentic-workflows/)
  - A Bedrock Guardrails integration followed in Jun 2026. (secondary) — [Classmethod](https://dev.classmethod.jp/en/articles/20260617-amazon-bedrock-agentcore-policy-guardrails/)
- **Classifier-style guardrail products:**
  - AWS Bedrock Guardrails — [AWS†](https://aws.amazon.com/bedrock/guardrails/)
  - Google Model Armor — [Google Cloud†](https://cloud.google.com/security-command-center/docs/model-armor-overview)
  - NVIDIA NeMo Guardrails (open source) — [GitHub†](https://github.com/NVIDIA/NeMo-Guardrails)
  - EchoLeak shows such classifiers can be bypassed: it got past Microsoft's XPIA classifiers. — [Aim Security†](https://www.aim.security/lp/aim-labs-echoleak-blogpost)

#### Government and standards bodies
- **NIST AI 100-2 E2025** (adversarial ML taxonomy, Mar 2025) covers agent hijacking and indirect prompt injection. — [NIST CSRC†](https://csrc.nist.gov/pubs/ai/100/2/e2025/final)
- **US AISI (now CAISI) agent-hijacking evaluations (Jan 2025).** New, task-specific red-team attacks raised attack success from 11% (strongest baseline) to 81% (strongest new attack). The lesson: static benchmarks understate risk. — [NIST†](https://www.nist.gov/news-events/news/2025/01/technical-blog-strengthening-ai-agent-hijacking-evaluations)
- **NIST AI Agent Standards Initiative (CAISI, announced 17 Feb 2026).** Source: [NIST](https://www.nist.gov/news-events/news/2026/02/announcing-ai-agent-standards-initiative-interoperable-and-secure)
  - Three pillars: industry-led agent standards and US leadership in international bodies; community-led open-source agent protocols; and research on agent security and identity.
  - The CAISI RFI on securing AI agent systems was issued in Jan 2026; comments were due 9 Mar 2026.
  - The NCCoE AI Agent Identity & Authorization concept paper took comments until 2 Apr 2026.
  - Sector listening sessions started in Apr 2026.
  - NIST promised "research, guidelines, and further deliverables" in the months ahead.
- **Other 2026 guidance** (secondary):
  - Australian Cyber Security Centre guidance on agentic AI harnesses: five risk classes; treats prompt injection as unfixable within the model.
  - CoSAI "Zero Trust for AI Systems": a controls matrix with three maturity levels.
  - ISACA white paper: 11 practice areas and a 15-item secure-by-default checklist.
  - Source: [Adversa](https://adversa.ai/blog/top-ai-agent-security-resources-october-2026/)
- **Singapore** issued agentic-AI security guidance from its Cyber Security Agency alongside IMDA's governance framework. — [Covington Inside Privacy](https://www.insideprivacy.com/uncategorized/singapore-issues-governance-and-security-guidance-for-agentic-ai/)

### Inferences
- **Reference architecture for "safe autonomy":**
  1. A planner/orchestrator that never ingests raw untrusted content (Dual LLM / CaMeL style).
  2. Quarantined parsers for untrusted inputs.
  3. A single policy enforcement point (an AI or MCP gateway) at the tool-call boundary, evaluating deterministic, analysable policy-as-code (Cedar or OPA) against the agent's identity, the user's delegation, the data's provenance or taint, and the action's risk tier.
  4. Classifier guardrails (prompt-injection detection, DLP) as a second layer.
  5. Full trace logging.
- **Choose design patterns per use case,** following the paper's trade-off framing:
  - Action-Selector or Plan-Then-Execute for high-risk transactional agents.
  - Map-Reduce or Context-Minimization for agents that read many untrusted documents.
  - Fully open-ended ReAct-style agents only in sandboxes without sensitive data or egress.
- **Threat-model every agent before build:** MAESTRO layers × OWASP ASI01–10 × ATLAS techniques. Require red-teaming with adaptive, task-specific attacks, since CAISI showed baseline benchmarks understate success by about 7×.

### Gaps
- No final NIST/CAISI agent-security guideline, NIST SP or overlay was found as of Nov 2026. Outputs from the RFI and concept paper after April 2026 could not be confirmed, because the search budget ran out. NIST's COSAIS (SP 800-53 control overlays for AI, including agentic use cases) was announced in 2025; its 2026 status is unverified.
- Authoritative current MITRE ATLAS totals were not confirmed; secondary counts conflict.
- Google "SAIF 2.0" and any agent-specific SAIF risk map were not verified.
- Detailed contents of the OWASP Agent Control Standard, the ACSC agent-harness guidance and CoSAI's Zero Trust paper were seen only through a digest.
- The 2025 AI-security vendor consolidation is from background knowledge and was not re-verified: Palo Alto/Protect AI, Check Point/Lakera, SentinelOne/Prompt Security, F5/CalypsoAI, Cato/Aim Security, CrowdStrike/Pangea, Snyk/Invariant Labs and Zscaler/SPLX.
- MCP gateway products (e.g., Docker MCP Gateway, Microsoft/Kong/Cloudflare MCP gateways) were not verified.

---

## 3. Agent identity, access and authorization

### Takeaway
Enterprises are converging on six practices:
- every agent gets its own first-class non-human identity, with a human sponsor or owner;
- agents receive scoped, short-lived, audience-bound OAuth tokens, either delegated on behalf of a user or autonomous;
- agents are discovered and governed through a registry (Entra Agent ID GA plus Agent 365, GA 1 May 2026; AWS AgentCore Identity);
- conditional access and lifecycle controls apply to agents as they do to people;
- every tool call is authorized by policy-as-code (Cedar or OPA);
- tamper-evident audit logs record each action.

MCP made OAuth 2.1 resource-server semantics, resource indicators and a ban on token passthrough mandatory in 2025. NIST's NCCoE proposes extending OAuth, OIDC, SCIM and SPIFFE rather than inventing new agent identity standards.

### Cited Findings
- **NIST NCCoE concept paper, "Accelerating the Adoption of Software and AI Agent Identity and Authorization"** (comments due 2 Apr 2026).
  - Proposes reusing OAuth 2.0, OpenID Connect, SCIM and SPIFFE/SPIRE to give agents verifiable, auditable non-human identities (secondary on the standards list).
  - Asks how agents should be identified, what strong agent authentication looks like, and how to get tamper-resistant logs and non-repudiation for agent decisions.
  - Sources: [NIST](https://www.nist.gov/news-events/news/2026/02/announcing-ai-agent-standards-initiative-interoperable-and-secure); [CSA Labs](https://labs.cloudsecurityalliance.org/research/csa-research-note-nist-caisi-ai-agent-standards-compliance-2/)
- **MCP authorization (spec 2025-06-18).**
  - MCP servers are OAuth 2.1 resource servers and must publish RFC 9728 Protected Resource Metadata.
  - Clients must use RFC 8707 resource indicators so that tokens are bound to a specific server.
  - Servers must not pass client tokens through to upstream APIs; this is the confused-deputy defence.
  - Source: [MCP spec†](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization)
- **MCP spec 2025-11-25** made Client ID Metadata Documents (CIMD) the recommended way to register clients. — [MCP changelog†](https://modelcontextprotocol.io/specification/2025-11-25/changelog)
- **Microsoft Entra now supports CIMD (preview).** MCP clients can connect to Entra-protected MCP servers without being pre-registered in the tenant. — [Microsoft Learn](https://learn.microsoft.com/en-us/entra/agent-id/whats-new-agent-id)
- **On-behalf-of delegation.** OAuth 2.0 Token Exchange (RFC 8693) defines delegation and impersonation semantics. Its "act" (actor) claim records who is acting for whom, which is how a user→agent→tool chain can be expressed. — [IETF RFC 8693†](https://datatracker.ietf.org/doc/html/rfc8693)
- **Microsoft Entra Agent ID** is generally available (docs dated 23 Oct 2026, updated 17 Nov 2026). Source for the items below: [Microsoft Learn](https://learn.microsoft.com/en-us/entra/agent-id/whats-new-agent-id)
  - Agent identity blueprints, with single- or multi-instance modes (preview).
  - Defined owner, sponsor and manager roles.
  - Access packages that govern agents acting on behalf of a user (OBO) and autonomous agents (non-OBO).
  - Sponsor lifecycle workflows that reassign sponsorship when a sponsor leaves, "to prevent orphaned agents".
  - Conditional Access templates: block high-risk agent identities; an autonomous-agent policy; an OBO-agent policy. ID Protection also covers agents.
  - Local agents can authenticate as OAuth public clients using PKCE (preview).
  - An Auth SDK sidecar, and integration guides for Amazon Bedrock and n8n agents.
  - Agent registries are converging into Microsoft Agent 365.
- **Microsoft Agent 365** ("control plane" for agents) went GA on 1 May 2026, alongside Microsoft 365 E7. — [Redmond Magazine](https://redmondmag.com/articles/2026/05/01/microsoft-agent-365-goes-live-as-company-unveils-e7-suite.aspx)
- **Conditional Access and ID Protection for agents:** worldwide GA rollout from early Jul to early Aug 2026, per Message Center MC1395007. (secondary mirror) — [mc.merill.net](https://mc.merill.net/message/MC1395007)
- **AWS AgentCore Identity** (GA with AgentCore, Oct 2025): agent workload identities, a token vault for OAuth tokens and API keys, inbound authentication through enterprise IdPs, and outbound OAuth to tools, both user-delegated and machine. — [AWS docs†](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/identity.html)
  - A 2026 research chain reportedly extracted AgentCore identity JWTs through prompt injection plus shell access and replayed them to MCP services. AWS treated it as shared responsibility. (secondary) — [Adversa](https://adversa.ai/blog/top-ai-agent-security-resources-october-2026/)
- **Okta Cross App Access (XAA; Jun 2025).** The enterprise IdP brokers an agent's access from one app to another: an IdP-issued identity assertion is exchanged for an access token, giving admins central visibility and revocation. It builds on the IETF OAuth "Identity Assertion Authorization Grant" draft. — [Okta†](https://www.okta.com/newsroom/press-releases/okta-introduces-cross-app-access-to-help-secure-ai-agents-in-the-enterprise/); [IETF draft†](https://datatracker.ietf.org/doc/draft-ietf-oauth-identity-assertion-authz-grant/)
- **Over-privilege in practice.** Vertex AI "Double Agent" abused default service-agent permissions. OWASP's mitigations: scope service-agent permissions per deployment, use short-lived credentials, isolate agent execution, and audit inherited permissions. — [OWASP Q1 2026](https://genai.owasp.org/2026/04/14/owasp-genai-exploit-round-up-report-q1-2026/)
- **ASI03 Identity & Privilege Abuse:** leaked or over-scoped credentials let agents act beyond their intended authority. — [OWASP](https://genai.owasp.org/2025/12/09/owasp-top-10-for-agentic-applications-the-benchmark-for-agentic-security-in-the-age-of-autonomous-ai/)
- **Policy-as-code.**
  - Cedar is AWS's open-source authorization language, designed for analysable, deterministic policies. — [Cedar†](https://www.cedarpolicy.com/)
  - AgentCore Policy uses Cedar for agent-to-tool authorization. — [AWS](https://aws.amazon.com/about-aws/whats-new/2026/03/policy-amazon-bedrock-agentcore-generally-available)
  - OPA/Rego is the CNCF-graduated general-purpose alternative. — [OPA†](https://www.openpolicyagent.org/)
- **Transaction authorization for agent commerce.** Google's Agent Payments Protocol (AP2, Sept 2025) uses cryptographically signed "mandates", verifiable credentials that capture the user's intent or cart approval, to authorize agent payments with a non-repudiable audit trail. — [Google Cloud†](https://cloud.google.com/blog/products/ai-machine-learning/announcing-agents-to-payments-ap2-protocol)
- **Regulatory logging hooks.** The EU AI Act requires automatic event logging for high-risk systems (Art. 12), and deployers must keep those logs for at least six months (Art. 26(6)). — [AI Act Art. 12†](https://artificialintelligenceact.eu/article/12/); [Art. 26†](https://artificialintelligenceact.eu/article/26/)
- **Singapore's framework** tells organisations to limit agents' autonomy and their access to tools and data, and to restrict agents to whitelisted services. — [MDDI Singapore](https://www.mddi.gov.sg/newsroom/singapore-launches-new-model-ai-governance-framework-for-agentic-ai--/)

### Inferences
- **Minimum identity design for every production agent:**
  - A unique agent identity, never a shared service account and never the developer's own credentials.
  - A named human sponsor, with an expiry date and recertification.
  - OBO tokens via token exchange that carry both the user and the actor.
  - Tokens scoped to a single resource (RFC 8707 audience), short-lived and just-in-time.
  - Secrets held in a vault the agent cannot read directly; a sidecar or gateway injects them.
  - Kill-switch revocation through the IdP.
  - Conditional Access risk policies applied to agents.
- **Authorize every tool call at the gateway** with policy-as-code. Inputs should include agent ID, delegating user, tool, parameters, data classification or taint, risk tier and budget. Default to deny, and keep policies version-controlled and tested in CI.
- **Log every action as a signed, append-only event** carrying (user, agent, model version, prompt and context hashes, tool, parameters, policy decision, approver). This one log serves security forensics, EU AI Act Art. 12/26, Colorado and CCPA explanation duties, and dispute resolution.

### Gaps
- Google Cloud's agent identity offering (e.g., Vertex AI Agent Engine identities) and Okta's 2026 "Okta for AI Agents" and Auth0 status were not verified.
- The IETF draft's current status (WG adoption or RFC number) and whether MCP adopted an "enterprise-managed authorization" extension were not confirmed.
- Agent 365 pricing (a secondary source reports $15/user/month) is unverified.
- No independent data on enterprise adoption of agent identity products was found.

---

## 4. Human oversight, accountability and audit

### Takeaway
Regulation and guidance consistently demand meaningful, informed human control, not rubber-stamping. The common elements are:
- risk-based approval checkpoints (Singapore's MGF, OpenAI's governing practices, Meta's Rule of Two);
- the ability to intervene, override and stop (EU AI Act Art. 14);
- human review and appeal for consequential automated decisions (GDPR Art. 22, UK DUAA Arts 22A–D, Colorado SB 26-189, CCPA ADMT rules, California's 2026 "No Robo Bosses Act").

Incidents show two failure modes. Humans over-trust confident agent output (OWASP ASI09; the Meta leak). Approval mechanisms can also be decoupled from the action that actually executes ("Loopjacking"), or ignored altogether (the OpenClaw stop commands). Approval therefore has to be bound cryptographically or programmatically to the exact action, and the kill switch has to be enforced outside the agent.

### Cited Findings

#### Law and regulation on oversight
- **EU AI Act Art. 14** (high-risk systems). Overseers must be able to:
  - understand the system's capacities and limitations, and monitor it;
  - remain aware of automation bias;
  - interpret output correctly;
  - decide not to use the output, or override or reverse it;
  - intervene or interrupt through a "stop" button or similar procedure.

  Source: [AI Act Art. 14†](https://artificialintelligenceact.eu/article/14/). For Annex III systems these duties now apply from 2 Dec 2027 ([EUR-Lex, Reg. (EU) 2026/1744](https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng)).
- **EU AI Act Art. 26 deployer duties:** assign oversight to competent, trained people; monitor operation; keep logs for at least six months; inform workers affected by high-risk AI. — [AI Act Art. 26†](https://artificialintelligenceact.eu/article/26/)
- **GDPR Art. 22** gives people a right not to be subject to decisions based solely on automated processing that produce legal or similarly significant effects. Exceptions (contract necessity, law, explicit consent) still require safeguards: human intervention, the right to express a view, and the right to contest. — [GDPR Art. 22†](https://gdpr-info.eu/art-22-gdpr/)
  - **CJEU SCHUFA (C-634/21, 7 Dec 2023):** an automated score is itself a "decision" when it plays a determining role. — [CURIA†](https://curia.europa.eu/juris/liste.jsf?num=C-634/21)
  - **CJEU Dun & Bradstreet Austria (C-203/22, 27 Feb 2025):** people are entitled to an explanation of the procedure and principles actually applied. — [CURIA†](https://curia.europa.eu/juris/liste.jsf?num=C-203/22)
  - The GDPR has not been amended. The separate data omnibus, COM(2025) 837, is still under negotiation as of Nov 2026. — [regulation-ai.eu](https://www.regulation-ai.eu/en/omnibus/)
- **UK Data (Use and Access) Act 2025, s.80.** Replaces UK GDPR Art. 22 with Arts 22A–22D. Solely automated significant decisions are permitted with safeguards (information, representations, human intervention, contest), with tighter limits where special-category data is involved. — [legislation.gov.uk†](https://www.legislation.gov.uk/ukpga/2025/18/section/80)
  - DSIT says the main Part 5 data-protection changes, apart from s.103, commenced on 5 Feb 2026. Section 80 sits in Part 5, so it appears to have commenced then; this should be confirmed against the Commencement No. 6 Regulations.
  - The ICO's functions transferred to the new Information Commission from 30 Sep 2026.
  - Source: [GOV.UK DSIT, updated 12 Oct 2026](https://www.gov.uk/guidance/data-use-and-access-act-2025-plans-for-commencement)
- **Colorado SB 26-189** (effective 1 Jan 2027). Deployers of ADMT used in consequential decisions must provide:
  - notice at the point of interaction;
  - a plain-language description of the ADMT's role within 30 days of an adverse outcome, plus an explanation;
  - data-correction rights;
  - human review, and appeal mechanisms.

  Source: [McDermott](https://www.mcdermottlaw.com/insights/colorado-ai-law-in-flux-comprehensive-replacement-bill-signed-after-federal-court-blocks-predecessors-enforcement/)
- **California SB 947, "No Robo Bosses Act"** (signed 30 Sep 2026). Employers may not rely solely on automated decision systems for discipline or termination. When AI is primarily responsible for such a decision, a human must review it and corroborate it with other information. Reported effective 1 Jul 2027 (secondary). — [CA Governor](https://www.gov.ca.gov/2026/09/30/californias-nation-leading-ai-framework-just-got-stronger-governor-newsom-signs-more-first-in-the-nation-worker-protections-and-more/); [Paul Hastings](https://paulhastings.com/insights/client-alerts/gov-gavin-newsom-signs-new-ai-laws-affecting-california-employers)
- **CCPA ADMT regulations** (approved Sep 2025; in force 1 Jan 2026). Businesses using ADMT for significant decisions must give pre-use notices and honour opt-out and access rights, with a human-appeal exception to the opt-out. ADMT compliance is required from 1 Jan 2027. — [CPPA†](https://cppa.ca.gov/announcements/2025/20250923.html)
- **US federal agencies (OMB M-25-21, Apr 2025):** "high-impact AI" must meet minimum risk practices, including human oversight, intervention and accountability, plus remedies or appeals for affected people. — [OMB†](https://www.whitehouse.gov/wp-content/uploads/2025/02/M-25-21-Accelerating-Federal-Use-of-AI-through-Innovation-Governance-and-Public-Trust.pdf)

#### Frameworks and guidance on oversight design
- **Singapore MGF for Agentic AI (22 Jan 2026)**, dimension 2 ("make humans meaningfully accountable"): define key checkpoints that require human approval. Dimension 1 bounds autonomy and access upfront; dimension 4 calls for user transparency and training. — [MDDI](https://www.mddi.gov.sg/newsroom/singapore-launches-new-model-ai-governance-framework-for-agentic-ai--/)
- **OpenAI, "Practices for Governing Agentic AI Systems" (Dec 2023)** lists seven practices: evaluate suitability for the task; constrain the action space and require approval; set default behaviours; make agent activity legible; monitor automatically; ensure attributability; keep interruptibility and control. — [OpenAI†](https://openai.com/index/practices-for-governing-agentic-ai-systems/)
- **Anthropic's framework for safe and trustworthy agents (Aug 2025)** keeps humans in control while enabling autonomy. For example, Claude Code has read-only permissions by default and asks before modifying code or systems. Other principles: transparency, alignment with human values and expectations, privacy, and secure interactions. — [Anthropic†](https://www.anthropic.com/news/our-framework-for-developing-safe-and-trustworthy-agents)
- **"Levels of Autonomy for AI Agents"** (Feng, McDonald & Zhang, 2025) defines five levels by the user's role: operator, collaborator, consultant, approver and observer. It proposes autonomy "certificates" as a governance tool. — [arXiv 2506.12469†](https://arxiv.org/abs/2506.12469)
- **Meta Rule of Two:** if a task needs untrusted input, sensitive access and external action together, the agent should not run autonomously; human-in-the-loop approval is required. — [Meta AI†](https://ai.meta.com/blog/practical-ai-agent-security/)
- **OWASP on oversight failure modes.** T10 "Overwhelming Human-in-the-Loop" covers approval fatigue as an attack vector. ASI09 "Human-Agent Trust Exploitation" covers polished explanations that win approval for harmful actions. — [OWASP†](https://genai.owasp.org/resource/agentic-ai-threats-and-mitigations/); [OWASP](https://genai.owasp.org/2025/12/09/owasp-top-10-for-agentic-applications-the-benchmark-for-agentic-security-in-the-age-of-autonomous-ai/)
- **Incidents that show what to build.** Source for both: [OWASP Q1 2026](https://genai.owasp.org/2026/04/14/owasp-genai-exploit-round-up-report-q1-2026/)
  - OpenClaw ignored stop commands → a guaranteed emergency stop, explicit confirmation of destructive actions, staged deletes.
  - The Meta internal leak → human approval for visibility or access changes, and deterministic validation of configuration changes.
- **"Loopjacking" (2026 research):** the approval a human grants is decoupled from the action that executes, reproduced in three agent frameworks. (secondary) — [Adversa](https://adversa.ai/blog/top-ai-agent-security-resources-october-2026/)
- **FINRA:** member firms' rules apply regardless of technology ([Regulatory Notice 24-09, Jun 2024†](https://www.finra.org/rules-guidance/notices/24-09)). FINRA's 2026 Annual Regulatory Oversight Report (Dec 2025) added generative AI and AI-agent risks: autonomy, scope and authority, auditability and transparency, and data sensitivity. It also lists supervisory considerations such as human-in-the-loop review and tracking agent actions. — [FINRA†](https://www.finra.org/rules-guidance/guidance/reports/2026-finra-annual-regulatory-oversight-report)

### Inferences
- **Approval matrix to build from day one.** Score every tool action on reversibility, financial or legal impact, data sensitivity, external visibility (does it leave the organisation?), blast radius and the novelty or confidence of the plan. Map the scores to four tiers:

  | Tier | Typical actions | Control |
  |---|---|---|
  | 0 | Read-only, internal | Autonomous, logged |
  | 1 | Reversible internal writes | Autonomous, with sampling and post-hoc review (human-on-the-loop) |
  | 2 | External communications, financial below a threshold, access or permission changes | Pre-approval by the requester or owner |
  | 3 | Irreversible or destructive actions, financial above a threshold, actions on regulated "consequential decisions" | Dual approval or specialist review, with a mandatory human decision record |

  This matrix is the inference; it combines the sources above rather than coming from any single one.
- **Make approvals meaningful.**
  - Show the exact action and parameters, a diff or preview, the data that will leave, and the provenance of untrusted inputs, not just the agent's own explanation (ASI09).
  - Bind each approval to a hash of the action so a different action cannot execute under it (the Loopjacking fix).
  - Rate-limit approval requests to avoid fatigue (T10).
- **Enforce the stop button and the budget outside the agent process:** IdP token revocation, gateway deny-all, and rate or spend caps. Test them regularly.
- **For regulated decisions** (employment, credit, insurance, housing, health, education), design the "human review + explanation + appeal + correction" workflow, with decision records, as a product feature. The same feature satisfies GDPR Art. 22, UK Arts 22A–D, Colorado (Jan 2027), the CCPA ADMT rules (Jan 2027) and SB 947 (Jul 2027).

### Gaps
- The ADMT regulation details were not re-fetched, including the exact opt-out exceptions and risk-assessment timelines.
- No authoritative regulator guidance setting quantitative approval thresholds (dollar limits or similar) for agent actions was found. Thresholds will be enterprise-defined.
- The contents of the UK ICO's agentic-AI work (2026) were not verified.
- Effective dates of the other California 2026 bills were not confirmed from primary text.

---

## 5. Governance frameworks, standards and sector guidance

### Takeaway
The backbone of enterprise agent governance is the NIST AI RMF (with the GenAI Profile, AI 600-1) for risk practice, plus ISO/IEC 42001 for a certifiable management system. ISO/IEC 23894, 42005 and 42006 cover risk, impact assessment and audit. Singapore's IMDA framework (22 Jan 2026) is the first government governance framework dedicated to agentic AI.

In financial services, the 2011 SR 11-7 model-risk guidance was superseded on 17 Apr 2026 by SR 26-2, which expressly puts generative and agentic AI outside its scope and leaves banks to govern them through broader risk-management practices. "AI governance platforms" became a formal analyst category with Gartner's first Magic Quadrant (2026). ISO 42001 certification is still rare: a few hundred organisations globally.

### Cited Findings

#### Core frameworks and standards
- **NIST AI RMF 1.0 (Jan 2023):** four functions, Govern, Map, Measure and Manage; voluntary. — [NIST†](https://www.nist.gov/itl/ai-risk-management-framework)
- **NIST AI 600-1, Generative AI Profile (26 Jul 2024).** Defines 12 GenAI risks and more than 200 suggested actions mapped to the RMF. The risks are:
  - CBRN information;
  - confabulation;
  - dangerous, violent or hateful content;
  - data privacy;
  - environmental impact;
  - harmful bias and homogenisation;
  - human-AI configuration;
  - information integrity;
  - information security;
  - intellectual property;
  - obscene or abusive content;
  - value chain and component integration.

  Source: [NIST AI 600-1†](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf)
- **ISO/IEC 42001:2023** (Dec 2023) is the certifiable AI management system standard. — [ISO†](https://www.iso.org/standard/42001)
- **ISO/IEC 23894:2023** gives guidance on AI risk management, based on ISO 31000. — [ISO†](https://www.iso.org/standard/77304.html)
- **ISO/IEC 42005:2025** covers AI system impact assessment. — [ISO†](https://www.iso.org/standard/44545.html)
- **ISO/IEC 42006:2025** sets requirements for bodies that audit and certify AI management systems. — [ISO†](https://www.iso.org/standard/44546.html)
- **ISO 42001 uptake.**
  - There is no official global certificate count. Estimates are about 350 (mid-2026) and "fewer than 500" (early 2026); both are industry estimates. — [soc2auditors.org](https://soc2auditors.org/frameworks/iso-42001/); [ISMS.online](https://www.isms.online/iso-42001/certification/is-it-worth-it/)
  - BSI issued its 50th ISO/IEC 42001 certificate in Nov 2026. It issued 11 in 2025, and its 2026 issuance "more than tripled". — [BSI, Nov 2026](https://www.bsigroup.com/en-US/insights-and-media/media-center/press-releases/2026/november/bsi-awards-its-50th-iso-iec-42001-certificate/)
  - BSI gained ANAB accreditation to certify 42001 in Mar 2026. — [BSI](https://www.bsigroup.com/en-AU/insights-and-media/media-centre/press-releases/2026/march/bsi-secures-anab-accreditation-to-certify-isoiec-42001/)
  - AWS, Google and Microsoft hold certification for parts of their AI operations, and Oracle reported certification of its AI services in Mar 2026. — [Oracle](https://www.oracle.com/se/corporate/responsible-ai-iso-42001/)

#### Agent-specific governance frameworks
- **Singapore, Model AI Governance Framework for Agentic AI.** Launched 22 Jan 2026 at WEF Davos by Minister Josephine Teo; developed by IMDA.
  - Four dimensions: (1) assess and bound risks upfront, by choosing suitable use cases and limiting autonomy and tool or data access; (2) make humans meaningfully accountable, through human-approval checkpoints; (3) implement technical controls across the agent lifecycle, such as baseline testing and whitelisted services; (4) enable end-user responsibility, through transparency and training.
  - It is a "living document" and builds on the 2020 Model AI Governance Framework.
  - IMDA is developing testing guidelines for agentic applications.
  - Sources: [MDDI](https://www.mddi.gov.sg/newsroom/singapore-launches-new-model-ai-governance-framework-for-agentic-ai--/); [Baker McKenzie](https://www.bakermckenzie.com/en/insight/publications/2026/01/singapore-governance-framework-for-agentic-ai-launched); [Mayer Brown, Apr 2026](https://www.mayerbrown.com/en/insights/publications/2026/04/singapores-agentic-ai-framework-practical-guidance-for-market-entry)
- **AIUC-1 (2025).** A certification standard for AI-agent security, safety and reliability, positioned to support insurance underwriting. — [AIUC-1†](https://www.aiuc-1.com/)
- **California independent AI verification and audit.** Two bills signed in Sep 2026 set up a third-party assurance market:
  - SB 813 creates a framework for certifying independent verification organisations that assess AI safety and risk.
  - AB 1405 creates a state registry of AI auditors with independence standards.
  - Executive Order N-9-26 addresses AI third-party oversight.
  - Source: [CA Governor, 30 Sep 2026](https://www.gov.ca.gov/2026/09/30/californias-nation-leading-ai-framework-just-got-stronger-governor-newsom-signs-more-first-in-the-nation-worker-protections-and-more/)

#### Financial services
- **SR 26-2, "Revised Guidance on Model Risk Management" (17 Apr 2026).** Issued by the Federal Reserve, OCC and FDIC. It supersedes SR 11-7 (2011) and SR 21-8, and is most relevant to banks with more than $30B in assets. — [Federal Reserve](https://www.federalreserve.gov/supervisionreg/srletters/SR2602.htm)
  - Footnote 3, verbatim: "Generative AI and agentic AI models are novel and rapidly evolving. As such, they are not within the scope of this guidance. Nonetheless, a banking organization's risk management and governance practices should guide the determination of appropriate governance and controls for any tools, processes, or systems not covered in this document. However, the principles described in this guidance apply to traditional statistical and quantitative models and non-generative, non-agentic AI models." — [SR 26-2 attachment](https://www.federalreserve.gov/supervisionreg/srletters/SR2602a1.pdf)
  - Definition of "model": "a complex quantitative method, system, or approach that applies statistical, economic, or financial theories to process input data into quantitative estimates." Deterministic rule-based software is excluded.
  - Materiality is determined by model exposure and model purpose. — [SR 26-2 attachment](https://www.federalreserve.gov/supervisionreg/srletters/SR2602a1.pdf)
  - Parallel issuances: OCC Bulletin 2026-13 and FDIC FIL-15-2026. (secondary) — [RocketDocs](https://rocketdocs.com/resources/blog/sr-11-7-replaced-model-risk-guidance)
- **UK PRA SS1/23** (model risk management principles for banks; effective 17 May 2024). — [Bank of England†](https://www.bankofengland.co.uk/prudential-regulation/publication/2023/may/model-risk-management-principles-for-banks-ss)
- **MAS (Singapore)** consulted on Guidelines on AI Risk Management for financial institutions in Nov 2025. — [MAS†](https://www.mas.gov.sg/publications/consultations/2025/consultation-paper-on-guidelines-on-artificial-intelligence-risk-management)
- **FINRA** 2026 oversight report: agent risks and supervision (see Section 4). — [FINRA†](https://www.finra.org/rules-guidance/guidance/reports/2026-finra-annual-regulatory-oversight-report)

#### Healthcare
- **California, Sep 2026:** AB 1979 (AI in health care services, including clinical decision tools and preserving provider judgment) and SB 503 (health care services: AI). — [CA Governor](https://www.gov.ca.gov/2026/09/30/californias-nation-leading-ai-framework-just-got-stronger-governor-newsom-signs-more-first-in-the-nation-worker-protections-and-more/)
- **California SB 1120 (2024; effective 1 Jan 2025):** health plans' utilization-review decisions on medical necessity must be made by a licensed clinician, not by an algorithm alone. — [CA Leginfo†](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB1120)
- **FDA draft guidance (Jan 2025)** on AI-enabled device software functions covers lifecycle management and marketing submissions. — [FDA†](https://www.fda.gov/regulatory-information/search-fda-guidance-documents/artificial-intelligence-enabled-device-software-functions-lifecycle-management-and-marketing)

#### AI governance platform market
- **Gartner's first Magic Quadrant for AI Governance Platforms (2026).** It evaluated 13 vendors: Airia, Cranium AI, Credo AI, Holistic AI, IBM, ModelOp, Monitaur, OneTrust, Relyance AI, Saidot, SAP, ServiceNow and Truyo. Visionaries include Airia, Credo AI, ModelOp, Monitaur and OneTrust; Holistic AI is the sole Challenger. The publication date is reported as both May 2026 and 16 Jun 2026. — [Gartner abstract](https://www.gartner.com/en/documents/8006369); [OneTrust](https://www.onetrust.com/blog/onetrust-debuts-as-a-visionary-in-the-2026-gartner-magic-quadrant-for-ai-governance-platforms-heres-why-it-matters/)
- **Gartner predictions.**
  - Gartner named AI governance platforms a top strategic technology trend for 2025, predicting that organisations with comprehensive platforms would see 40% fewer AI-related ethical incidents by 2028. — [Gartner†](https://www.gartner.com/en/newsroom/press-releases/2024-10-21-gartner-identifies-the-top-10-strategic-technology-trends-for-2025)
  - Gartner also predicted that more than 40% of agentic AI projects will be cancelled by the end of 2027 (Jun 2025). — [Gartner†](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027)

### Inferences
- **Practical governance stack:**
  - An AI management system aligned to ISO 42001: policy, roles, AI inventory including agents, impact assessments per ISO 42005, supplier controls and internal audit.
  - NIST AI RMF and AI 600-1 as the risk vocabulary.
  - OWASP ASI and MAESTRO as the technical threat layer.
  - Singapore's four dimensions as an agent-specific checklist.
- **Certification is a differentiator, not table stakes.** With only a few hundred certified organisations, 42001 certification is mostly sought by vendors selling AI to regulated buyers.
- **For banks:** do not assume model-risk management covers agents. SR 26-2 carves them out explicitly. Banks need a separate agentic-AI control framework: inventory, tiering, testing, monitoring and third-party risk. Supervisors will still expect the "risk management and governance practices" from footnote 3 to apply.
- **Governance platforms are converging on agent registries and runtime policy enforcement.** Choose a platform that can ingest agent inventories from the Entra, AgentCore and Salesforce registries and link policies to runtime controls, rather than one limited to document workflows.

### Gaps
- Confirmed: Singapore's framework launched 22 Jan 2026 with four dimensions.
- Unconfirmed: search snippets suggested a v1.5 dated 20 May 2026, incorporating feedback from 60+ companies, but the document could not be opened.
- Whether MAS finalized its AI risk-management guidelines in 2026 is unverified.
- The OCC and FDIC parallel issuances were confirmed only through secondary sources.
- Healthcare coverage is thin. The following were not researched: FDA/HHS 2026 agentic-AI actions, CMS rules on AI in prior authorization, Joint Commission/CHAI guidance, and EU MDR interplay.
- The Gartner MQ Leaders and the "guardian agents" market concept were not verified.
- No public, official ISO certificate statistics exist.

---

## 6. Regulation: EU, US federal and state, UK and other jurisdictions

### Takeaway
**EU.** The proposed delay passed. The Digital Omnibus on AI, Regulation (EU) 2026/1744, was adopted on 8 Jul 2026, published on 24 Jul 2026 and in force from 27 Jul 2026. It moves Annex III high-risk obligations to a fixed date of 2 Dec 2027 and Annex I to 2 Aug 2028. Article 50 transparency duties have applied since 2 Aug 2026, and the prohibitions and GPAI rules stand. The GDPR has not been amended; the data omnibus is still pending.

**US.** There is no federal preemption statute. EO 14365 (11 Dec 2025) set up a DOJ AI Litigation Task Force, and the White House published a legislative framework (20 Mar 2026), but Congress has not acted. The states keep legislating:
- Colorado repealed and replaced its AI Act with SB 26-189, effective 1 Jan 2027, after the xAI and DOJ suits.
- California's SB 53 has been in force since 1 Jan 2026, the CCPA ADMT rules apply from 1 Jan 2027, and the 2026 session added SB 947 and AI-auditor laws.

**UK.** It relies on the Data (Use and Access) Act ADM reforms and sector regulators, with no AI Act.

### Cited Findings

#### EU AI Act baseline and how it reaches agents
- **Definitions and classification.** An agent is an "AI system" under Art. 3(1): a machine-based system "designed to operate with varying levels of autonomy" that "may exhibit adaptiveness after deployment". Risk class depends on intended purpose. Annex III high-risk areas include employment, education, access to essential private and public services (credit scoring, life and health insurance pricing), critical infrastructure, law enforcement, migration and justice. — [AI Act Art. 3†](https://artificialintelligenceact.eu/article/3/); [Annex III†](https://artificialintelligenceact.eu/annex/3/)
- **When a deployer becomes a provider (Art. 25).** A deployer takes on provider obligations if it puts its name on a high-risk system, substantially modifies one, or changes the intended purpose of a system, including a general-purpose one, so that it becomes high-risk. Art. 25(4) requires written agreements between high-risk providers and third parties that supply tools or components. — [AI Act Art. 25†](https://artificialintelligenceact.eu/article/25/)
- **Art. 50 transparency.** People must be told they are interacting with an AI system unless that is obvious, and synthetic content must be marked. Applies from 2 Aug 2026 and was not delayed. — [AI Act Art. 50†](https://artificialintelligenceact.eu/article/50/); [Gibson Dunn](https://www.gibsondunn.com/eu-ai-act-omnibus-agreement-postponed-high-risk-deadlines-and-other-key-changes/)
- **Penalties (Art. 99):** up to €35M or 7% of worldwide turnover for prohibited practices, and up to €15M or 3% for most other obligations. — [AI Act Art. 99†](https://artificialintelligenceact.eu/article/99/)
- **Timeline:** in force 1 Aug 2024; prohibitions and AI literacy from 2 Feb 2025; GPAI obligations from 2 Aug 2025. — [AI Act implementation timeline†](https://artificialintelligenceact.eu/implementation-timeline/)
- **Supporting Commission instruments:**
  - The GPAI Code of Practice (10 Jul 2025). — [European Commission†](https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai)
  - GPAI guidelines (Jul 2025): a downstream modifier becomes a GPAI provider if its modification uses more than one-third of the original model's training compute. — [European Commission†](https://digital-strategy.ec.europa.eu/en/library/guidelines-scope-obligations-providers-general-purpose-ai-models-under-ai-act)
  - Guidelines on the AI system definition (Feb 2025). — [European Commission†](https://digital-strategy.ec.europa.eu/en/library/commission-publishes-guidelines-ai-system-definition-facilitate-first-ai-acts-rules-application)
- **The AI Act has no agent-specific chapter.** Analysts map agents to the GPAI-model, AI-system, transparency and oversight provisions. — [The Future Society†](https://thefuturesociety.org/aiagentsintheeu/)

#### EU Digital Omnibus on AI: proposed, adopted, in force
- **Path to adoption.** Sources: [Gibson Dunn](https://www.gibsondunn.com/eu-ai-act-omnibus-agreement-postponed-high-risk-deadlines-and-other-key-changes/); [Usercentrics (secondary)](https://usercentrics.com/knowledge-hub/eu-ai-act-high-risk-delay-article-50-transparency-consent/); [EUR-Lex](https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng); [regulation-ai.eu](https://www.regulation-ai.eu/en/omnibus/)

  | Date | Step |
  |---|---|
  | 19 Nov 2025 | Commission proposal (Digital Package) |
  | 28 Apr 2026 | First trilogue ends without agreement |
  | 6 May 2026 | Provisional political agreement |
  | 13 May 2026 | Coreper confirms the agreement |
  | 16 Jun / 29 Jun 2026 | Parliament and Council approvals (secondary sources) |
  | 8 Jul 2026 | Regulation (EU) 2026/1744 adopted (date of the act) |
  | 24 Jul 2026 | Published in the Official Journal |
  | 27 Jul 2026 | Entry into force (third day after publication) |

- **What changed.** Sources: [EUR-Lex](https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng); [Gibson Dunn](https://www.gibsondunn.com/eu-ai-act-omnibus-agreement-postponed-high-risk-deadlines-and-other-key-changes/); [regulation-ai.eu](https://www.regulation-ai.eu/en/omnibus/)
  - **High-risk dates:** Annex III moves from 2 Aug 2026 to **2 Dec 2027**; Annex I moves from 2 Aug 2027 to **2 Aug 2028**. These are fixed dates, replacing the Commission's proposed trigger linked to the availability of standards.
  - **Art. 50(2) marking:** a four-month transitional period, to 2 Dec 2026, for generative AI systems placed on the market before 2 Aug 2026.
  - **New prohibitions:** Art. 5(1)(ba) bans AI generating non-consensual intimate imagery ("nudifiers") and (bb) bans AI generating CSAM, applying from 2 Dec 2026.
  - **AI literacy (Art. 4)** is rewritten as a duty to "take measures to support the development of AI literacy", with no guaranteed level.
  - **SME and small mid-cap relief:** simplified technical documentation, proportionate QMS and lower fine caps.
  - **Registration** of Art. 6(3) systems is simplified.
  - **Bias detection:** the legal basis for processing special-category data is extended to all AI systems and GPAI models, under strict necessity.
  - **AI Office:** gets exclusive competence over AI systems built on a GPAI model by the same provider, and over AI in VLOPs and VLOSEs.
  - **Other:** the sandbox deadline moves to 2 Aug 2027; machinery moves to Annex I Section B; the "safety component" definition is narrowed.
- **The data omnibus**, COM(2025) 837, would amend the GDPR, ePrivacy, incident reporting and the Data Act. It is still under negotiation and none of it applies. — [regulation-ai.eu, 17 Nov 2026](https://www.regulation-ai.eu/en/omnibus/)

#### US federal
- **EO 14179 (23 Jan 2025)** revoked Biden's EO 14110 and refocused policy on removing barriers. — [Federal Register†](https://www.federalregister.gov/documents/2025/01/31/2025-02172/removing-barriers-to-american-leadership-in-artificial-intelligence)
- **"America's AI Action Plan" (23 Jul 2025):** a deregulatory, innovation-first plan with security and evaluation workstreams. — [White House†](https://www.whitehouse.gov/wp-content/uploads/2025/07/Americas-AI-Action-Plan.pdf)
- **Earlier preemption attempts failed.** The Senate voted 99–1 in Jul 2025 to strip a 10-year state-law moratorium from the "One Big Beautiful Bill". — [Baker Donelson](https://www.bakerdonelson.com/emerging-federal-ai-policy-what-to-know-and-how-to-prepare)
- **EO 14365, "Ensuring a National Policy Framework for Artificial Intelligence" (11 Dec 2025).** Sources: [Latham & Watkins](https://www.lw.com/en/insights/ai-executive-order-targets-state-laws-and-seeks-uniform-federal-standards); [Gibson Dunn](https://www.gibsondunn.com/toward-a-national-ai-policy-the-trump-administration-releases-proposed-framework-for-federal-legislation/)
  - Creates a DOJ AI Litigation Task Force to challenge state AI laws on Commerce Clause and preemption grounds.
  - Orders Commerce to evaluate "onerous" state laws by 11 Mar 2026.
  - Conditions BEAD non-deployment funds ($42.45B program) on state AI policy.
  - Section 8 orders a legislative recommendation.
- **National Policy Framework for AI (20 Mar 2026).** A four-page legislative recommendation with seven pillars. Source: [Gibson Dunn](https://www.gibsondunn.com/toward-a-national-ai-policy-the-trump-administration-releases-proposed-framework-for-federal-legislation/)
  - Recommends preempting "unduly burdensome" state AI laws, with three carve-outs: generally applicable police-power laws, data-centre zoning, and a state's own use of AI.
  - Would bar states from regulating AI development or penalising developers for third-party misuse.
  - Opposes creating a new federal AI regulator.
- **Congressional status.** Bills include Blackburn's "TRUMP AMERICA AI Act" discussion draft, an Obernolte–Trahan House draft preempting state laws on AI development with a three-year sunset, and the House Democrats' GUARDRAILS Act to repeal EO 14365. As of the latest sources, "no federal AI preemption has occurred, and state AI laws remain enforceable." — [Gibson Dunn](https://www.gibsondunn.com/toward-a-national-ai-policy-the-trump-administration-releases-proposed-framework-for-federal-legislation/); [GovTech](https://www.govtech.com/artificial-intelligence/proposed-federal-ai-bill-would-pre-empt-states-for-3-years)
- **First DOJ action.** The Task Force's first visible move was a DOJ companion complaint (24 Apr 2026) in xAI's suit against Colorado. It argued that the law's disclosure duties compel speech and that its anti-discrimination duties impose race- and sex-conscious obligations. — [McDermott](https://www.mcdermottlaw.com/insights/colorado-ai-law-in-flux-comprehensive-replacement-bill-signed-after-federal-court-blocks-predecessors-enforcement/)
- **Commerce "onerous laws" list.** No public list was found. One secondary source says it was folded into a late-July 2026 BEAD notice; another found no release. — [AI Laws by State](https://www.ailawsbystate.com/blog/federal-ai-preemption-doj-task-force-state-law-fight-2026)

#### US states
- **Colorado.** Source for the items below: [McDermott](https://www.mcdermottlaw.com/insights/colorado-ai-law-in-flux-comprehensive-replacement-bill-signed-after-federal-court-blocks-predecessors-enforcement/); see also [Norton Rose Fulbright](https://www.nortonrosefulbright.com/en/knowledge/publications/18733d31/colorado-enacts-revised-ai-law) and [Troutman](https://www.troutmanprivacy.com/2026/04/colorado-attorney-general-delays-enforcement-of-colorado-ai-act/)
  - **History:** SB 24-205 was delayed to 30 Jun 2026 by SB 25B-004 (Aug 2025). xAI sued on 9 Apr 2026 (D. Colo.) and DOJ filed its complaint on 24 Apr. On 27 Apr a stipulated order paused AG enforcement pending preliminary-injunction proceedings.
  - **Replacement:** SB 26-189 was introduced on 1 May and signed on 14 May 2026, repealing and replacing SB 205. It is effective 1 Jan 2027, with AG rulemaking due by then.
  - **Scope:** notice and explanation duties for ADMT that "materially influences" consequential decisions in education, employment, lending, healthcare, housing and insurance.
  - **Developer duties:** documentation for deployers, covering intended uses, training-data categories, limitations and instructions for human review.
  - **Deployer duties:** notice, an explanation within 30 days of an adverse outcome, correction, human review and appeal.
  - **Liability:** fault is allocated between developer and deployer; joint and several liability is barred, as are indemnities that shift liability inconsistently with that allocation.
  - **Enforcement:** AG only, with a 60-day cure period that sunsets after three years.
  - **Removed from SB 205:** impact assessments, filings with the AG, the affirmative duty to avoid algorithmic discrimination, and the general AI-interaction disclosure.
  - **Outlook:** McDermott expects xAI and DOJ to challenge SB 189 as well.
- **California SB 53, Transparency in Frontier AI Act** (signed 29 Sep 2025; in force 1 Jan 2026).
  - Covers "frontier developers" (models trained with more than 10^26 FLOPs). "Large frontier developers" (more than $500M revenue) must also publish a frontier AI framework and transparency reports.
  - Critical safety incidents must be reported to Cal OES within 15 days, or 24 hours if there is imminent risk.
  - Includes whistleblower protections and civil penalties of up to $1M per violation.
  - Sources: [CA Leginfo†](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB53); [CA Governor, 2026](https://www.gov.ca.gov/2026/09/30/californias-nation-leading-ai-framework-just-got-stronger-governor-newsom-signs-more-first-in-the-nation-worker-protections-and-more/)
- **CCPA ADMT, risk-assessment and cybersecurity-audit regulations:** in force 1 Jan 2026; ADMT compliance from 1 Jan 2027; risk-assessment submissions and cybersecurity audits phase in from 2028. — [CPPA†](https://cppa.ca.gov/announcements/2025/20250923.html)
- **California 2026 session** (signed by 30 Sep 2026; Newsom signed 22 of 25 privacy and AI bills and vetoed three). Sources: [CA Governor](https://www.gov.ca.gov/2026/09/30/californias-nation-leading-ai-framework-just-got-stronger-governor-newsom-signs-more-first-in-the-nation-worker-protections-and-more/); [Strauss (secondary)](https://staussfirm.com/2026/10/01/californias-2026-privacy-and-ai-bills-what-newsom-signed-and-vetoed/)
  - Employment: SB 947 (ADS in discipline and termination); SB 951 (notice of AI-caused layoffs); AB 1883 and AB 1331 (workplace surveillance).
  - Legal and health: SB 574 (limits on handing core legal work to AI); AB 1979 and SB 503 (health care AI).
  - Transparency: SB 1000 and AB 2713 (AI Transparency Act and provenance); SB 1159 (AI transparency and governance).
  - Assurance: SB 813 and AB 1405 (AI verification and auditors).
  - Other: companion-chatbot child-safety law ("Adam's Law").
- **California AB 316 (2025)** removes the defence that an AI system acted autonomously (see Section 7). — [CA Leginfo†](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB316)
- **Texas TRAIGA (HB 149)** (signed Jun 2025; effective 1 Jan 2026): intent-based prohibitions, AG enforcement and a regulatory sandbox. — [Texas Legislature†](https://capitol.texas.gov/BillLookup/History.aspx?LegSess=89R&Bill=HB149)
- **State-law tracker (Apr 2026)** for multistate status. — [Cooley](https://www.cooley.com/news/insight/2026/2026-04-24-state-ai-laws-where-are-they-now)

#### UK and others
- **UK.** The DUAA ADM reforms (Arts 22A–22D) apply, and the main Part 5 changes commenced on 5 Feb 2026. The ICO became the Information Commission on 30 Sep 2026. — [GOV.UK DSIT](https://www.gov.uk/guidance/data-use-and-access-act-2025-plans-for-commencement); [legislation.gov.uk†](https://www.legislation.gov.uk/ukpga/2025/18/section/80)
- **Singapore** governs agents through the non-binding IMDA framework (see Section 5). — [MDDI](https://www.mddi.gov.sg/newsroom/singapore-launches-new-model-ai-governance-framework-for-agentic-ai--/)
- **The IAPP global AI law tracker** was last updated on 6 Oct 2026; its country details are behind a member login. — [IAPP](https://iapp.org/resources/article/global-ai-legislation-tracker/)

### Inferences
- **Compliance calendar for agent programmes** (as of 21 Nov 2026):

  | Date | Obligation |
  |---|---|
  | Now | EU Art. 50 disclosure that the user is talking to AI; EU prohibitions; GPAI duties if you modify models heavily; California SB 53 if you are a frontier developer |
  | 2 Dec 2026 | EU Art. 50(2) marking grace period ends; nudifier and CSAM bans apply |
  | 9 Dec 2026 | EU Product Liability Directive applies (see Section 7) |
  | 1 Jan 2027 | Colorado SB 26-189; CCPA ADMT compliance |
  | 1 Jul 2027 | California SB 947 (reported) |
  | 2 Dec 2027 | EU Annex III high-risk obligations |
  | 2 Aug 2028 | EU Annex I high-risk obligations |

- **The EU delay is fixed, not conditional.** Teams building agents for Annex III uses (HR screening, credit, insurance, essential services) should treat 2 Dec 2027 as firm and build the Art. 9–15 controls now: risk management, data governance, technical documentation, logging, transparency, human oversight, and accuracy, robustness and cybersecurity.
- **US federal preemption is uncertain and slow,** while state obligations keep arriving. The pragmatic route is one control set mapped to the strictest common denominator: EU high-risk requirements plus the Colorado, CCPA and California employment rules.
- **DOJ challenges target disclosure and anti-discrimination duties.** Controls that serve safety and security (logging, oversight, security testing) are unlikely to be affected, whatever happens in litigation.

### Gaps
- The search budget ran out before the following could be verified:
  - **China:** the CAC AI-content labelling measures and national standard GB 45438-2025 (effective 1 Sep 2025); Cybersecurity Law amendments adding AI provisions (effective 1 Jan 2026); AI Safety Governance Framework 2.0 (Sep 2025); any 2026 agent-specific rules or draft AI law.
  - **India:** MeitY's India AI Governance Guidelines (Nov 2025), which are principles-based with no standalone AI law; IT Rules amendments on synthetically generated content (early 2026); DPDP Rules phasing (notified Nov 2025).
  - **South Korea:** the AI Basic Act, reportedly effective 22 Jan 2026.
  - **Japan:** the AI Promotion Act (2025).
  - All of these are from background knowledge only. Two White & Case tracker pages returned HTTP 403.
- Whether a UK AI bill or agent-specific ICO guidance appeared in 2026 is unverified.
- Not confirmed as of Nov 2026, because the latest sources found are from mid-2026:
  - any DOJ Task Force lawsuit after the Colorado complaint;
  - publication of the Commerce "onerous laws" list or its BEAD consequences;
  - any congressional floor action on preemption, including after the 3 Nov 2026 midterms.
- The New York RAISE Act (frontier-model safety; reportedly signed Dec 2025) and other states' 2026 AI laws were not verified.
- Whether CEN-CENELEC harmonised standards for the AI Act are on track for Dec 2027 was not checked.
- Whether the data omnibus would change GDPR Art. 22 or automated-decision rules (as proposed in Nov 2025) is unverified.

---

## 7. Liability and contracting for agent actions

### Takeaway
Courts and legislatures treat an AI agent as an instrument of the enterprise that deploys it, not as a separate actor:
- Moffatt v. Air Canada rejected the argument that the "chatbot is a separate legal entity".
- UETA §14 and E-SIGN §7001(h) make contracts formed by electronic agents binding.
- California AB 316 bars the "the AI did it autonomously" defence.
- Mobley v. Workday allowed an AI vendor to be sued as the employer's "agent".

Allocation between developer and deployer is now being written into statute (Colorado SB 26-189 bars joint and several liability). The EU's revised Product Liability Directive, which treats software and AI as a product, applies to products placed on the market after 9 Dec 2026. Vendor indemnities from major platforms remain mostly limited to IP claims, so the risk of an agent's erroneous actions sits with the deploying enterprise unless it is negotiated away.

### Cited Findings
- **Moffatt v. Air Canada** (2024 BCCRT 149, 14 Feb 2024). The tribunal rejected Air Canada's argument that its website chatbot was "a separate legal entity that is responsible for its own actions". Air Canada was held liable for negligent misrepresentation by the bot. — [CanLII†](https://www.canlii.org/en/bc/bccrt/doc/2024/2024bccrt149/2024bccrt149.html)
- **UETA §14 (US uniform law).** "A contract may be formed by the interaction of electronic agents of the parties, even if no individual was aware of or reviewed the electronic agents' actions or the resulting terms". UETA §10 lets an individual avoid an electronic error made with an electronic agent if the agent gave no opportunity to prevent or correct it. — [Uniform Law Commission†](https://www.uniformlaws.org/committees/community-home?CommunityKey=2c04b76c-2b7d-4399-977e-d5876ba7e034)
- **E-SIGN Act, 15 U.S.C. §7001(h).** A contract "may not be denied legal effect … solely because its formation … involved the action of one or more electronic agents so long as the action of any such electronic agent is legally attributable to the person to be bound." — [Cornell LII†](https://www.law.cornell.edu/uscode/text/15/7001)
- **UNCITRAL Model Law on Automated Contracting (2024)** provides model rules on attributing the actions of automated systems in contracting. — [UNCITRAL†](https://uncitral.un.org/en/mlac)
- **California AB 316 (2025).** In a civil action over harm allegedly caused by AI, a defendant that developed, modified or used the AI may not argue that the AI autonomously caused the harm. — [CA Leginfo†](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB316)
- **Mobley v. Workday (N.D. Cal.).** In Jul 2024 the court let discrimination claims proceed against an AI screening vendor on the theory that it acted as the employers' "agent". A collective action under the Age Discrimination in Employment Act was preliminarily certified in May 2025. — [CourtListener docket†](https://www.courtlistener.com/docket/66831340/mobley-v-workday-inc/)
- **Colorado SB 26-189 (2026)** allocates fault between developers and deployers based on whether the ADMT was used for its intended purpose and whether adequate documentation was provided. It prohibits joint and several liability and any indemnification provision that shifts liability inconsistently with that allocation. — [McDermott](https://www.mcdermottlaw.com/insights/colorado-ai-law-in-flux-comprehensive-replacement-bill-signed-after-federal-court-blocks-predecessors-enforcement/)
- **EU Product Liability Directive, (EU) 2024/2853.** Software, including AI systems, is a "product". Manufacturers can be liable for defects arising from updates, or from a lack of security updates, within their control. It applies to products placed on the market after 9 Dec 2026. — [EUR-Lex†](https://eur-lex.europa.eu/eli/dir/2024/2853/oj)
- **EU AI Liability Directive:** the Commission announced its withdrawal in the 2025 work programme (Feb 2025). — [European Parliament Legislative Train†](https://www.europarl.europa.eu/legislative-train/theme-a-europe-fit-for-the-digital-age/file-ai-liability-directive)
- **EU AI Act Art. 25(4):** providers of high-risk systems and third-party suppliers of AI tools, services or components must set out the necessary information, capabilities, technical access and assistance in a written agreement. — [AI Act Art. 25†](https://artificialintelligenceact.eu/article/25/)
- **Vendor indemnities are IP-focused.** None of the following is described as covering harm from an agent's erroneous actions:
  - Microsoft Customer Copyright Commitment (Sep 2023) — [Microsoft†](https://blogs.microsoft.com/on-the-issues/2023/09/07/copilot-copyright-commitment-ai-legal-concerns/)
  - Google Cloud generative AI indemnification (Oct 2023) — [Google Cloud†](https://cloud.google.com/blog/products/ai-machine-learning/protecting-customers-with-generative-ai-indemnification)
  - OpenAI Copyright Shield (Nov 2023) — [OpenAI†](https://openai.com/index/new-models-and-developer-products-announced-at-devday/)
  - Anthropic's expanded legal protections for commercial customers (Dec 2023) — [Anthropic†](https://www.anthropic.com/news/expanded-legal-protections-api-improvements)
- **Shared responsibility in practice.** AWS reportedly closed a 2026 AgentCore identity-token replay report as "shared responsibility". Platform vendors treat prompt-injection consequences inside the customer's agent as the customer's problem. (secondary) — [Adversa](https://adversa.ai/blog/top-ai-agent-security-resources-october-2026/)

### Inferences
- **Assume the enterprise is bound by and liable for its agents' actions.** Design for that:
  - Hard authority limits per agent: spend, contract value and counterparties.
  - Explicit confirmation and correction steps before anything binding. This reflects UETA §10's error-avoidance rule and protects against claims that the counterparty had no chance to correct an error.
  - Disclosure to counterparties that they are dealing with an agent (EU Art. 50).
  - Immutable records showing what the agent was authorised to do.
- **Contracting checklist for agent platforms and MCP/tool vendors:**
  - security obligations and incident notification for agent components;
  - responsibility for prompt-injection defences and tool-supply-chain integrity;
  - log and audit access;
  - model and version change notice (rug-pull risk at the contract level);
  - data-use and retention terms;
  - AI Act Art. 25(4) information and assistance obligations;
  - indemnities extended beyond IP to security failures and agent malfunction where negotiable, plus caps carved out for data breaches;
  - alignment with any statutory fault allocation (Colorado) so the contract does not contain unenforceable indemnities.
- **The insurance and assurance market is forming** (AIUC-1; California SB 813 verification organisations). Third-party attestations of agent controls may become a procurement and insurance prerequisite.

### Gaps
- Amazon v. Perplexity (Comet shopping agent; filed Nov 2025, N.D. Cal.) is a key test of agents acting on third-party platforms against their terms of service. Its status as of Nov 2026, including any injunction ruling, could not be verified.
- No 2026 appellate decision squarely deciding whether an autonomous agent's unauthorised transaction binds its principal was found. The Restatement (Third) of Agency's position that software is not a legal "agent" was not re-verified.
- Specific 2026 contract terms for enterprise agent offerings were not reviewed: Microsoft Agent 365 and Copilot Studio, Salesforce Agentforce, AWS AgentCore, Google Gemini Enterprise, and OpenAI and Anthropic enterprise agent terms. This includes whether any vendor now indemnifies for agent actions.
- The AI-insurance market was not researched: exclusions by carriers and dedicated AI cover such as Lloyd's or Munich Re products.
