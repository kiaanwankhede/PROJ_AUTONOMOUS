# Technical Architecture of Agentic AI Systems for Enterprise Autonomy: Design Patterns, Interoperability Protocols, Frameworks and Managed Platforms (state as of 2026-11-21)

*Conventions: "(secondary)" marks a claim that rests on third-party blogs or aggregators rather than a vendor or standards body. "[SUPERSEDED]" marks information that a later release replaced. Where sources conflict, both are given.*

## 1. Core components of an enterprise agent, canonical design patterns, and when a single agent beats a multi-agent system

### Takeaway
The reference model is still the "augmented LLM" (model plus retrieval, tools and memory) running in a loop of gathering context, acting and verifying. The guidance is to use the simplest workflow that works, and production craft has moved from prompt engineering to *context engineering*: compaction, structured notes, sub-agents with clean context, and just-in-time retrieval. Multi-agent orchestrator-worker designs clearly pay off for breadth-first, parallelizable, read-mostly work such as research, at about 15x the tokens of a chat. For tightly coupled tasks (most coding, anything with shared context), the evidence favors a single-threaded agent with strong context management. That evidence includes the MAST taxonomy from Cemri et al. (14 failure modes across 7 frameworks), Cognition's write-up and Anthropic's own caveats.

### Cited Findings

**Workflows vs. agents and the core building block (foundational; Dec 2024)**
- Anthropic defines **workflows** as "systems where LLMs and tools are orchestrated through predefined code paths", and **agents** as systems where LLMs "dynamically direct their own processes and tool usage". The post was published Dec 19, 2024, and it now notes that much of the tooling it describes has changed. — [Anthropic, Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)
- The building block is the **augmented LLM**, an LLM enhanced with retrieval, tools and memory. It generates its own search queries, selects tools and decides what to retain. — [Anthropic](https://www.anthropic.com/engineering/building-effective-agents)
- Canonical workflow patterns and when to use each, per Anthropic — [Anthropic](https://www.anthropic.com/engineering/building-effective-agents):
  - **Prompt chaining**: use it when a task "can be easily and cleanly decomposed into fixed subtasks". It trades latency for accuracy, and programmatic gates can sit between steps.
  - **Routing**: use it when inputs fall into distinct categories that are better handled separately. The classifier can be an LLM or a traditional model.
  - **Parallelization**: *sectioning* runs independent subtasks for speed or focused attention. *Voting* runs the same task several times for higher confidence.
  - **Orchestrator-workers**: a central LLM decomposes the task dynamically and synthesizes the results. It suits "complex tasks where you can't predict the subtasks needed".
  - **Evaluator-optimizer**: a generator–critic loop. Use it when the evaluation criteria are clear and iteration adds measurable value.
  - **Autonomous agents**: use them for open-ended problems where the number of steps can't be predicted or hard-coded and you trust the model's decisions. They cost more and errors compound, so test them in sandboxes with guardrails.
- Anthropic's core advice is "finding the simplest solution possible, and only increasing complexity when needed". It warns that frameworks can "obscure the underlying prompts" and recommends starting with LLM APIs directly. Its three principles are simplicity, transparency (show the planning steps) and a well-designed **agent-computer interface (ACI)**. For its SWE-bench agent, Anthropic spent more time optimizing tools than the overall prompt. — [Anthropic](https://www.anthropic.com/engineering/building-effective-agents)

**The agent loop / "harness" (2025–2026 consensus)**
- The Claude Agent SDK was renamed from the Claude Code SDK on Sept 29, 2025. It frames agents as a loop: **gather context → take action → verify work → repeat**.
  - Context comes from *agentic search* over files (grep, tail). Semantic search is optional: faster, but less accurate and less transparent.
  - Subagents run in isolated context windows, and compaction summarizes older messages.
  - Actions are custom tools, bash, code generation and MCP.
  - Verification uses rules (linting), visual feedback (Playwright screenshots) or LLM-as-judge, which is "less robust" and adds latency.
  - Source: [Claude blog, Building agents with the Claude Agent SDK](https://claude.com/blog/building-agents-with-the-claude-agent-sdk)
- Microsoft's **Agent Framework Agent Harness** reached GA after Build 2026. It bundles function invocation, per-call history persistence, **context compaction**, a **todo list with plan and execute modes**, file memory, skills, web search, **tool approval** and built-in **OpenTelemetry**. Shell tooling, file access, background sub-agents and automatic looping are opt-in and emit warnings when enabled. — [InfoQ, Aug 3 2026](https://infoq.com/news/2026/08/agent-framework-harness-ga)
- In an early Microsoft benchmark, Agent Framework halted its own loop after 40 round-trips, while the GitHub Copilot SDK ran to 300 with no host-side stopping control. The author summarized this as "same reasoning, different engineering", meaning loop budgets are a harness concern. — [InfoQ](https://infoq.com/news/2026/08/agent-framework-harness-ga)

**Context management ("context engineering", Sept 2025)**
- Context engineering means curating the full set of tokens present at inference. Anthropic describes "context rot", where recall drops as the window fills, and a finite attention budget: "Every new token introduced depletes this budget by some amount." — [Anthropic, Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) (Sept 29, 2025)
- Guidance from the same post — [Anthropic](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents):
  - Write system prompts at the right "altitude", using "the minimal set of information that fully outlines your expected behavior".
  - Avoid "bloated tool sets" with overlapping tools. "If a human couldn't pick the right tool, the agent likely can't either."
  - Prefer a few diverse canonical examples over lists of edge-case rules.
  - Prefer **just-in-time retrieval** using lightweight identifiers (file paths, stored queries, links) over loading everything up front. Hybrid approaches suit less dynamic domains such as legal or finance work.
- Long-horizon techniques — [Anthropic](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents):
  - **Compaction** suits long back-and-forth work. Clearing old tool results is a light-touch form.
  - **Structured note-taking / agentic memory** suits iterative work with milestones.
  - **Sub-agent architectures** have sub-agents return condensed summaries, often 1,000–2,000 tokens. They suit complex research and parallel exploration.

**Memory and state**
- In LangGraph, **short-term memory** is thread-scoped state (message history, files, retrieved docs) that a **checkpointer** persists so a thread can resume. **Long-term memory** is a set of cross-thread JSON documents in a store, organized by namespace and key. — [LangChain docs, Memory](https://docs.langchain.com/oss/python/concepts/memory)
- Memory types mapped from the CoALA paper — [LangChain docs](https://docs.langchain.com/oss/python/concepts/memory):
  - **Semantic**: facts, such as facts about a user.
  - **Episodic**: past experiences or agent actions, often implemented as few-shot examples.
  - **Procedural**: rules and instructions, such as the system prompt, which can be refined through reflection or meta-prompting.
- Memories can be written **"in the hot path"** or **"in the background"**. Hot-path writes are available immediately but add latency and complexity. Background writes add no latency but need scheduling and trigger decisions. — [LangChain docs](https://docs.langchain.com/oss/python/concepts/memory)
- Managed platforms now ship memory as a service:
  - **AgentCore Memory**, described as context retention — [AWS What's New, Oct 2025](https://aws.amazon.com/about-aws/whats-new/2025/10/amazon-bedrock-agentcore-available)
  - **Claude Managed Agents** built-in memory "lets agents learn across sessions" — [Claude blog](https://claude.com/blog/claude-managed-agents)
  - **Microsoft's harness** "file memory" — [InfoQ](https://infoq.com/news/2026/08/agent-framework-harness-ga)

**Guardrails and control points**
- **AgentCore Policy** evaluates tool calls that pass through AgentCore Gateway against **Cedar** policies, in a default-deny design (secondary guide). — [hidekazu-konishi.com](https://hidekazu-konishi.com/entry/amazon_bedrock_agentcore_policy_implementation_guide.html)
- In Claude Managed Agents, credentials never live in the sandbox where Claude-generated code runs. The platform also provides credential vaults, scoped permissions and identity management. — [Claude blog](https://claude.com/blog/claude-managed-agents); [Claude Platform Docs](https://platform.claude.com/docs/en/managed-agents)
- MCP 2025-11-25 says input-validation failures should be returned as *tool execution errors*, not protocol errors, "to enable model self-correction" (SEP-1303). — [MCP 2025-11-25 changelog](https://modelcontextprotocol.io/specification/2025-11-25/changelog)

**Evidence on multi-agent reliability**
- **MAST, "Why Do Multi-Agent LLM Systems Fail?"** (Cemri, Pan, … Zaharia, Gonzalez, Stoica): v1 Mar 17 2025, v3 Oct 26 2025 — [arXiv 2503.13657](https://arxiv.org/abs/2503.13657)
  - The taxonomy has **14 failure modes** in **3 categories**: system design issues, inter-agent misalignment and task verification. It was built from 150 traces.
  - **MAST-Data** has 1,600+ annotated traces across **7 popular MAS frameworks**. Human inter-annotator kappa is **0.88**, and the authors also built an LLM-as-judge annotator.
  - The models studied are GPT-4, Claude 3, Qwen2.5 and CodeLlama, on coding, math and general agent tasks.
  - MAS gains on popular benchmarks are "often minimal", and the failures need "more sophisticated solutions".
- **Cognition, "Don't Build Multi-Agents"** (Walden Yan, June 12 2025) — [Cognition](https://cognition.com/blog/dont-build-multi-agents)
  - Principle 1: "Share context, and share full agent traces, not just individual messages."
  - Principle 2: actions carry implicit decisions, so parallel agents with conflicting assumptions produce inconsistent results. The Flappy Bird example shows subagents building a mismatched background and bird.
  - Recommendation: a single-threaded linear agent. For very long tasks, add a separate LLM that compresses the history; Cognition fine-tuned smaller models for this.
  - It criticizes OpenAI Swarm and Microsoft AutoGen for pushing multi-agent architectures. The page shows no later revision.
- **Anthropic multi-agent Research system** (June 13 2025) — [Anthropic](https://www.anthropic.com/engineering/multi-agent-research-system)
  - Architecture: orchestrator-worker. A lead agent (Claude Opus 4) plans and saves the plan to memory, Sonnet 4 subagents search in parallel, and a CitationAgent attributes sources.
  - It beat single-agent Opus 4 by **90.2%** on Anthropic's internal research eval.
  - Agents use about **4x** the tokens of chat, and multi-agent systems about **15x**. On BrowseComp, token usage alone explained about **80%** of performance variance, and about 95% together with tool-call count and model choice.
  - It is a *poor fit* for tasks where all agents need the same context, tasks with many inter-agent dependencies, and "most coding tasks".
  - Practices that worked:
    - Effort-scaling rules: one agent and a few tool calls for simple queries, 10+ subagents for complex ones.
    - Detailed subagent task specs.
    - Rewriting tool descriptions, which cut task time by 40%.
    - 3–5 parallel subagents, each using 3+ tools in parallel, which cut research time by up to 90%.
  - Evaluation started with about 20 real queries and used a single-prompt LLM judge (a 0.0–1.0 score plus pass/fail). Human testing still caught failures automation missed, such as a bias toward SEO content farms.
  - In production, agents are stateful and errors compound. The system resumes from checkpoints, combines retry logic with agent-level adaptation, uses full tracing, and runs "rainbow deployments" so updates don't break running agents. Synchronous subagents are a bottleneck.
- Microsoft Agent Framework 1.0 ships the standard **orchestration patterns**: sequential, concurrent, **handoff**, **group chat** and **Magentic-One**. — [Microsoft DevBlogs, Agent Framework 1.0](https://devblogs.microsoft.com/agent-framework/microsoft-agent-framework-version-1-0/). All patterns share one API, so teams can change coordination style without rewriting agent code. — [InfoQ](https://infoq.com/news/2026/08/agent-framework-harness-ga)
- As of the Claude Managed Agents launch, multi-agent coordination ("agents can spin up and direct other agents") is still a **research preview** behind a request form. — [Claude blog](https://claude.com/blog/claude-managed-agents)

### Inferences
- **Default architecture for an enterprise team:**
  1. Start with deterministic workflow code: chaining and routing with gates.
  2. Add a single tool-using agent loop inside a harness that provides compaction, plan/todo mode, tool approval, loop budgets and OTel tracing.
  3. Move to orchestrator-workers only when subtasks are parallelizable and read-mostly (search, research, triage, analysis).
  4. Keep side-effecting "write" actions in one thread, with a verifier or human gate.
- **Anthropic, Cognition and MAST agree on the main failure surface.** It is context and assumption divergence between agents plus weak verification, not too few agents. Spend effort on shared traces and state, explicit handoff contracts (structured outputs) and evaluator-optimizer verification steps before adding agents.
- **The cost and value bar for multi-agent is high.** A ~15x token multiple means multi-agent fan-out is justified only where task value is high and parallelism cuts wall-clock time.
- **Pattern-to-use-case guide**, synthesized from the sources above:

| Pattern | Use when | Avoid when |
|---|---|---|
| Prompt chaining / routing | Steps or categories are known and auditable (KYC steps, ticket triage) | Path can't be predicted |
| ReAct-style single agent loop | Open-ended tool use with continuous context (coding, ops runbooks) | Strict SLA or determinism needed without gates |
| Plan-and-execute (todo/plan mode) | Long tasks needing explicit, inspectable plans; human approval of the plan | Very short tasks (overhead) |
| Orchestrator-workers / supervisor | Breadth-first, parallel, read-heavy subtasks (research, due diligence) | Shared-context, tightly coupled edits (most coding) |
| Evaluator-optimizer / reflection | Clear rubric or tests exist (code tests, policy checks) | No reliable evaluator, or LLM-judge only on high-stakes calls |
| Handoffs / swarm | Distinct domains with clean boundaries (customer-service tiers) | Decisions need full history (Cognition critique) |
| Hierarchical multi-agent | Very large scopes with independent sub-domains | Most enterprise tasks today, given MAST failure rates |

### Gaps
- I did not re-fetch primary sources for ReAct (Yao et al.), Reflexion, Self-Refine or LangChain's plan-and-execute write-up. They are canonical, but I did not verify them in this pass.
- I found no 2026 controlled study that compares single- and multi-agent reliability on current frontier models (Opus 5.x, GPT-5.x, Gemini 3.x). MAST's traces are from the GPT-4 and Claude 3 era.
- The share of failures in each MAST category (system design, misalignment, verification) was not on the abstract page.
- I did not verify the guardrail primitives in the OpenAI Agents SDK (input and output guardrails, tripwires) or its handoff primitive in this pass.
- I found no Cognition follow-up on multi-agent architectures from 2026.

## 2. Model Context Protocol (MCP): spec evolution, features, governance, adoption and security

### Takeaway
MCP is the de facto standard for agent-to-tool and agent-to-data connectivity, and it is confirmed as donated to the Linux Foundation's **Agentic AI Foundation (AAIF)**, formed **Dec 9, 2025**. The spec went through five dated revisions:
- **2024-11-05**: stateful, stdio and HTTP+SSE.
- **2025-03-26**: OAuth 2.1 and Streamable HTTP.
- **2025-06-18**: elicitation, structured output, OAuth resource-server model.
- **2025-11-25**: experimental Tasks, CIMD, URL elicitation, sampling with tools, formal governance.
- **2026-07-28 (current)**: a **stateless core**. It removes the handshake and sessions, adds Multi Round-Trip Requests, an extensions framework (Tasks, MCP Apps, Enterprise Managed Authorization), and deprecates Roots, Sampling, Logging and Dynamic Client Registration.

The registry is still formally a preview, and security (tool poisoning, command-injection CVEs in servers and clients) is the main enterprise risk.

### Cited Findings

**Spec version history**
- **2024-11-05**, announced 2024-11-25 [SUPERSEDED]: client-server JSON-RPC 2.0 with the *tools*, *resources* and *prompts* primitives, over stdio (local) and HTTP+SSE (remote) transports. — [MCP version timeline (secondary)](https://hidekazu-konishi.com/entry/mcp_specification_version_timeline.html)
- **2025-03-26** [SUPERSEDED]: an OAuth 2.1-based authorization framework. **Streamable HTTP** replaced HTTP+SSE, with an `Mcp-Session-Id` header for sessions. It also added tool annotations, audio content, argument completions and JSON-RPC batching. — [timeline](https://hidekazu-konishi.com/entry/mcp_specification_version_timeline.html)
- **2025-06-18** [SUPERSEDED]: structured tool output, **elicitation** (servers asking users for input mid-call) and resource links in tool results. MCP servers are classified as **OAuth Resource Servers**, and **RFC 8707 Resource Indicators** are required. JSON-RPC batching was removed. It added a security best-practices page and made the `MCP-Protocol-Version` header required on HTTP requests. — [timeline](https://hidekazu-konishi.com/entry/mcp_specification_version_timeline.html)
- **2025-11-25** (one-year anniversary) [SUPERSEDED by 2026-07-28] — [official changelog](https://modelcontextprotocol.io/specification/2025-11-25/changelog):
  - Authorization and discovery: OpenID Connect Discovery 1.0 for authorization-server discovery, and incremental scope consent via `WWW-Authenticate` (SEP-835).
  - Metadata and naming: icons on tools, resources and prompts (SEP-973), and tool-name guidance (SEP-986).
  - Elicitation: standards-based enums (SEP-1330) and **URL-mode elicitation** (SEP-1036).
  - Sampling: **tool calling in sampling** via `tools` and `toolChoice` (SEP-1577).
  - Client registration: **OAuth Client ID Metadata Documents (CIMD)** as the recommended mechanism (SEP-991).
  - **Experimental Tasks** for durable requests with polling and deferred results (SEP-1686).
  - Minor items: JSON Schema 2020-12 as the default dialect (SEP-1613), HTTP 403 for invalid `Origin` headers, and polling SSE streams (SEP-1699).
  - Governance: formal governance (SEP-932), working and interest groups (SEP-1302), and an **SDK tiering system** (SEP-1730).
- **2026-07-28** (current): the release candidate was published 2026-05-21 — [timeline](https://hidekazu-konishi.com/entry/mcp_specification_version_timeline.html). The final release shipped Jul 28, 2026, from lead maintainers David Soria Parra and Den Delimarsky. — [MCP blog, The 2026-07-28 Specification](https://blog.modelcontextprotocol.io/posts/2026-07-28/)
  - **Stateless core**: MCP becomes a request/response protocol. The `initialize`/`initialized` handshake and the `Mcp-Session-Id` header are retired (SEP-2575, SEP-2567), and each request carries its protocol version, client identity and capabilities in `_meta`. A new optional `server/discover` RPC lets clients learn capabilities up front. Any instance can serve any request behind plain round-robin load balancing. Apps that need state should have a tool mint an explicit **handle** that the model passes back. — [MCP blog](https://blog.modelcontextprotocol.io/posts/2026-07-28/)
  - **Multi Round-Trip Requests (MRTR, SEP-2322)** replace the server-initiated `elicitation/create`, `sampling/createMessage` and `roots/list`. The server returns `resultType: "input_required"`, and the client retries with `inputResponses`. — [MCP blog](https://blog.modelcontextprotocol.io/posts/2026-07-28/)
  - **Gateway-friendliness**: Streamable HTTP requests must carry `Mcp-Method` and `Mcp-Name` headers, so gateways can route and meter without parsing bodies (SEP-2243). List and read responses carry `ttlMs` and `cacheScope` and come back in deterministic order (SEP-2549). — [MCP blog](https://blog.modelcontextprotocol.io/posts/2026-07-28/)
  - **Authorization hardening** — [MCP blog](https://blog.modelcontextprotocol.io/posts/2026-07-28/):
    - RFC 9207 `iss` validation (SEP-2468).
    - `application_type` during DCR, so desktop and CLI localhost redirects work (SEP-837).
    - Issuer-bound client credentials (SEP-2352).
    - **Dynamic Client Registration is formally deprecated in favor of CIMD**.
  - **Extensions framework** — [MCP blog](https://blog.modelcontextprotocol.io/posts/2026-07-28/):
    - **Tasks** moves to the `io.modelcontextprotocol/tasks` extension (SEP-2663), with poll-based `tasks/get` and a new `tasks/update`.
    - **MCP Apps** and **Enterprise Managed Authorization (EMA)** are also extensions.
    - A single `subscriptions/listen` stream replaces the old HTTP GET notification endpoint.
    - MCP Apps had shipped as the first official extension on 2026-01-26. — [timeline](https://hidekazu-konishi.com/entry/mcp_specification_version_timeline.html)
  - **Deprecations**: Roots, Sampling and Logging are deprecated (SEP-2577) but keep working for at least 12 months. The legacy HTTP+SSE transport is deprecated with a one-year off-ramp, under a formal 12-month minimum deprecation policy. — [MCP blog](https://blog.modelcontextprotocol.io/posts/2026-07-28/)
  - **SDKs**: the Tier 1 SDKs (TypeScript, Python, Go, C#) support 2026-07-28 at release, and Rust support is in beta. — [MCP blog](https://blog.modelcontextprotocol.io/posts/2026-07-28/)
  - Google published guidance on running MCP at scale under the stateless updates. — [Google Developers Blog](https://developers.googleblog.com/scaling-ai-agent-infrastructure-with-the-mcp-stateless-updates/)
  - AAIF and WorkOS each published explainers on what the 2026 changes mean for authentication and agents. — [AAIF blog](https://aaif.io/blog/mcp-2026-changes-the-rules); [WorkOS](https://workos.com/blog/mcp-2026-spec-agent-authentication)

**Adoption**
- Adoption milestones — [timeline (secondary)](https://hidekazu-konishi.com/entry/mcp_specification_version_timeline.html):
  - Microsoft added MCP support in Copilot Studio on 2025-03-19.
  - OpenAI adopted MCP on 2025-03-26, starting with the Agents SDK.
  - Google committed Gemini models and its SDK to MCP on 2025-04-09.
  - At Build on 2025-05-19, Microsoft made MCP first-class across its platforms, and Microsoft and GitHub joined the steering committee.
  - On 2025-05-21, OpenAI added remote MCP servers to the Responses API and joined the steering committee.
- Tier 1 SDKs see close to **half a billion downloads a month**, and the TypeScript and Python SDKs each have over **1 billion total downloads**. Honeycomb reports that nearly 20% of its monthly interactive queries come from agents. — [MCP blog](https://blog.modelcontextprotocol.io/posts/2026-07-28/)
- MCP is embedded across the enterprise platforms covered in Q5:
  - AgentCore Gateway turns APIs and Lambda functions into agent-ready tools, with unified access across protocols including MCP. — [AWS News Blog](https://aws.amazon.com/de/blogs/aws/introducing-amazon-bedrock-agentcore-securely-deploy-and-operate-ai-agents-at-any-scale/)
  - ServiceNow's AI Agent Fabric is built on A2A and MCP. — [ServiceNow newsroom](https://newsroom.servicenow.com/press-releases/details/2025/ServiceNow-Launches-AI-Control-Tower-a-Centralized-Command-Center-to-Govern-Manage-Secure-and-Realize-Value-From-Any-AI-Agent-Model-and-Workflow/default.aspx)
  - SAP Joule Studio agents use MCP and A2A. — [SAP Sapphire 2026 guide](https://www.sap.com/topics/events/sapphire/innovation-news-guide-2026)
  - IBM watsonx Orchestrate has "full support for the Model Context Protocol". — [IBM](https://www.ibm.com/new/announcements/productivity-revolution-with-ai-agents-that-work-across-stack)

**Governance: the Linux Foundation / AAIF donation is confirmed**
- The Linux Foundation formed the **Agentic AI Foundation** on **Dec 9, 2025**, with three founding projects:
  - **MCP**, from Anthropic.
  - **goose**, from Block.
  - **AGENTS.md**, from OpenAI. It was released Aug 2025 and adopted by 60,000+ open-source projects and agent frameworks, including Codex, Cursor, GitHub Copilot and VS Code.
  - The Platinum members are AWS, Anthropic, Block, Bloomberg, Cloudflare, Google, Microsoft and OpenAI.
  - Source: [Linux Foundation press release](https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation)
- MCP's technical governance model was described as unchanged by the donation. — [timeline](https://hidekazu-konishi.com/entry/mcp_specification_version_timeline.html)
- One secondary outlet called goose "the reference implementation of MCP". The LF and other coverage describe goose only as an MCP-based agent framework, so that claim looks wrong. — [Privacy Guides](https://www.privacyguides.org/news/2025/12/24/the-linux-foundation-announces-formation-of-the-agentic-ai-foundation/) vs [LF](https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation)

**MCP Registry**
- The official MCP Registry launched in **preview on Sept 8, 2025**, with a warning that breaking changes may occur before GA. — [MCP blog, registry preview](https://blog.modelcontextprotocol.io/posts/2025-09-08-mcp-registry-preview/)
- As of mid-2026, the registry at registry.modelcontextprotocol.io was "still formally a preview", with its API frozen at v0.1. — [Towards AI (secondary)](https://pub.towardsai.net/mcp-registries-in-mid-2026-one-upstream-won-2ce541b92036). The Registry working group's charter lists "Registry API v1 specification finalized and stable" as a goal. — [MCP Registry charter](https://modelcontextprotocol.io/community/registry/charter.md)
- The architecture is an upstream canonical metadata registry that public subregistries (client-linked marketplaces) and private subregistries (inside enterprises) ingest, augment or mirror, reusing the upstream OpenAPI schema. — [WorkOS](https://workos.com/blog/mcp-registry-architecture-technical-overview)
- A "MCP Registry — Now Generally Available" headline from Workato refers to **Workato's own** governed registry product, not the official registry. — [Workato changelog](https://www.workato.com/product-hub/changelog/mcp-registry-now-generally-available/)

**Known security issues**
- A March 2026 threat-modeling study ranks **tool poisoning** as the most prevalent and impactful client-side MCP vulnerability. Across seven MCP clients, most lacked sufficient static validation of tool metadata, and attack success ranged from 0% (Claude Desktop) to 100% (Cursor). — [arXiv 2603.22489](https://arxiv.org/abs/2603.22489)
- A separate study of seven clients, including Claude Desktop, Claude Code and Cursor, found client-side MCP security "currently inadequate" across four tool-poisoning attack vectors. — [arXiv 2603.21642](https://arxiv.org/html/2603.21642v1)
- Two CVEs, as cited in [arXiv 2607.05744](https://arxiv.org/pdf/2607.05744):
  - **CVE-2025-6514** in `mcp-remote`: a malicious server's auth response can drive OS command injection in the client.
  - **CVE-2026-13341** in the Kong Konnect MCP server: indirect prompt injection triggers unintended API requests.
  - The same paper shows Unicode TAG-block concealment of payloads in tool metadata, creating an approval-view fidelity gap across three independent server implementations.
- OX Security's advisory groups 2026 CVEs into families of **STDIO command injection**. It also describes a Windsurf prompt injection that leads to local RCE (CVE-2026-30615). — [OX Security](https://www.ox.security/blog/mcp-supply-chain-advisory-rce-vulnerabilities-across-the-ai-ecosystem/)
- Research continues into defenses and measurement: security-aware tool descriptions to mitigate taint-style vulnerabilities, and a cross-framework measurement study of tool poisoning (Nov 2026). — [arXiv 2607.07461](https://arxiv.org/pdf/2607.07461); [arXiv 2611.03555](https://arxiv.org/pdf/2611.03555)
- Vendor blogs claim 40+ MCP CVEs filed in 2026 and an "OWASP MCP Top 10" headed by prompt injection. I could not confirm either from OWASP or NVD. — [securitywall (secondary)](https://ghost.securitywall.co/mcp-security-testing-guide/); [baeseokjae (secondary)](https://baeseokjae.github.io/posts/mcp-security-guide-2026/)

### Inferences
- **Build new servers and clients against 2026-07-28:**
  - Design state as explicit tool-minted handles.
  - Use the Tasks extension for long-running operations.
  - Don't build new features on Sampling or Roots.
  - Adopt CIMD rather than DCR.
  - Put an MCP gateway in front of servers. The `Mcp-Method`/`Mcp-Name` headers and cacheable lists are designed for gateway authorization, metering and caching.
  - Statelessness also makes MCP servers ordinary horizontally scaled web services, so they fit standard API-gateway, WAF and load-balancer estates.
- **Treat tool metadata and tool outputs as untrusted input.**
  - Allow-list servers through a private subregistry, and pin versions and hashes.
  - Re-approve when tool descriptions change, and render hidden Unicode visibly.
  - Run local STDIO servers in sandboxes.
  - Separate read and write scopes using OAuth incremental consent.
- **Teams on older behavior face a migration horizon.** The 12-month deprecation window puts the earliest removal of Roots, Sampling, Logging, HTTP+SSE and DCR around late July 2027, so teams relying on 2025-era stateful behavior have about 8 months left in that window.

### Gaps
- I could not confirm whether the official MCP Registry reached GA, or reached API v1, by November 2026.
- I could not verify an authoritative 2026 MCP CVE count or the existence and content of an "OWASP MCP Top 10".
- I did not verify which major clients (Claude, ChatGPT, Copilot, Gemini) fully support the 2026-07-28 spec, MCP Apps or the EMA extension.
- I found no primary source for post-2025 MCP steering-committee membership changes under AAIF.

## 3. Agent2Agent (A2A) and the wider agent-protocol landscape (ACP, AGNTCY, AP2, Agentic Commerce Protocol, UCP, AG-UI, AGENTS.md)

### Takeaway
A2A has consolidated as *the* agent-to-agent standard:
- Google launched it in April 2025, and it became a Linux Foundation project on June 23, 2025.
- It absorbed IBM's ACP in August 2025.
- It shipped stable **v1.0 in March 2026** (patch v1.0.1 in May 2026).
- It joined the **AAIF as a Growth Stage project in August 2026**, next to MCP.

The stack has settled into MCP as the "vertical" agent-to-tool layer and A2A as the "horizontal" agent-to-agent layer. Protocols with real traction in late 2026 are MCP (ubiquitous), A2A (embedded in Google and ServiceNow platforms, planned or partial in Microsoft and SAP, and reported in AWS and Salesforce/MuleSoft stacks) and AGENTS.md (60k+ repos). Agentic-commerce protocols (AP2, now moving to the FIDO Alliance; UCP; OpenAI/Stripe ACP) are early and fragmented, and AG-UI and AGNTCY are niche.

### Cited Findings

**A2A history, governance and version**
- Google donated A2A, its SDKs and tooling to the Linux Foundation, which launched the Agent2Agent project on **June 23, 2025** with 100+ supporting companies. — [LF A2A one-year press release](https://www.linuxfoundation.org/press/a2a-protocol-surpasses-150-organizations-lands-in-major-cloud-platforms-and-sees-enterprise-production-use-in-first-year); [Wikipedia (secondary)](https://en.wikipedia.org/wiki/Agent2Agent)
- **v1.0, the first stable spec**:
  - The project blog's URL path dates it **March 12, 2026**. — [a2a-protocol.org blog (via AAIF post's "Previous" link)](https://a2a-protocol.org/latest/blog/2026/08/27/a-new-chapter-for-a2a-joining-the-agentic-ai-foundation/)
  - The Linux Foundation announced "A2A Protocol 1.0 is here!" on **Mar 19, 2026**. — [LF on X](https://x.com/linuxfoundation/status/2034664056125030641)
  - One source gives Apr 9, 2026, which appears to confuse the release with the LF one-year adoption press release.
- Reported **v1.0 contents** (secondary) — [TestMu AI](https://www.testmuai.com/blog/a2a-protocol-v1/):
  - **Signed Agent Cards**, security-flow updates, **multi-tenancy** and multiple transports.
  - Backward compatibility with v0.3.
  - Core operations renamed to `SendMessage`, `GetTask` and `CancelTask`, plus a new `ListTasks`.
  - `a2a.proto` made the normative source for all bindings.
- The latest patch is **v1.0.1 (May 2026)**, per the same secondary source. — [TestMu AI](https://www.testmuai.com/blog/a2a-protocol-v1/)
- **Agent Cards** are structured capability and contact descriptions that agents read to negotiate and delegate tasks. The A2A project frames MCP as the *vertical* layer, connecting an agent to internal tools and databases, and A2A as the *horizontal* layer for peer-to-peer agent collaboration. SDK repos exist for Python, Go, Java, JS, .NET and Rust. A2A is "backed by over 150 organizations". — [A2A blog, Aug 27 2026](https://a2a-protocol.org/latest/blog/2026/08/27/a-new-chapter-for-a2a-joining-the-agentic-ai-foundation/)
- **AAIF**: A2A was "accepted as a Growth Stage project at the Agentic AI Foundation", alongside MCP, goose and AGENTS.md. The official blog post is dated **Aug 27, 2026**. — [A2A blog](https://a2a-protocol.org/latest/blog/2026/08/27/a-new-chapter-for-a2a-joining-the-agentic-ai-foundation/). Secondary outlets give Aug 17 or Aug 20, 2026. — [Enterprise AI World](https://www.enterpriseaiworld.com/Articles/News/News/Googles-A2A-Open-Standard-Joins-the-Agentic-AI-Foundation-Enabling-Collaboration-with-Other-Open-Agent-Infrastructure-Projects-176164.aspx); [AImpact](https://aimpact.prandi.net/en/events/2026-08-20-a2a-agentic-ai-foundation/)
- The LF's Apr 9, 2026 one-year release reports **150+ organizations** supporting A2A, integration into major cloud platforms (Google, Microsoft, AWS) and enterprise production use. — [LF press release](https://www.linuxfoundation.org/press/a2a-protocol-surpasses-150-organizations-lands-in-major-cloud-platforms-and-sees-enterprise-production-use-in-first-year)

**IBM ACP merged into A2A (confirmed)**
- IBM Research announced that the **Agent Communication Protocol (ACP)** team would wind down active development and contribute to A2A. The ACP repo was archived (read-only) on **Aug 27, 2025**, and ACP lead Kate Blair joined the A2A Technical Steering Committee. — [i-am-bee GitHub discussion #5](https://github.com/orgs/i-am-bee/discussions/5); [Zuplo (secondary)](https://zuplo.com/blog/agent-protocol-stack-mcp-a2a-acp-2026)

**A2A in shipping products**
- Microsoft Agent Framework 1.0 (Apr 2026) ships MCP support, but **"A2A 1.0 support coming soon"**. — [Microsoft DevBlogs](https://devblogs.microsoft.com/agent-framework/microsoft-agent-framework-version-1-0/)
- Google's Gemini Enterprise Agent Platform (Next '26) includes "Agent-to-Agent Orchestration" and an "Agent Registry". — [Google Cloud Next '26 blog](https://cloud.google.com/blog/topics/google-cloud-next/welcome-to-google-cloud-next26)
- ServiceNow's **AI Agent Fabric** (Knowledge 2025) supports agent-to-agent, agent-to-tool and system-to-system communication "using A2A and MCP". — [ServiceNow newsroom](https://newsroom.servicenow.com/press-releases/details/2025/ServiceNow-Launches-AI-Control-Tower-a-Centralized-Command-Center-to-Govern-Manage-Secure-and-Realize-Value-From-Any-AI-Agent-Model-and-Workflow/default.aspx)
- SAP Joule Studio builds custom agents that use MCP and A2A, and **GA of "Joule A2A" capabilities is planned for Q4 2026**. — [SAP Sapphire 2026 Innovation News Guide](https://www.sap.com/topics/events/sapphire/innovation-news-guide-2026)

**Agentic commerce protocols (early; mostly secondary sources)**
- **AP2 (Agent Payments Protocol)**: Google launched it in Sept 2025, built on cryptographically signed "mandates" that prove what a user authorized. Secondary 2026 guides report that Google announced the donation of AP2 to the **FIDO Alliance** in April 2026, with about 60 organizations including Mastercard, Adyen, PayPal and Coinbase. One source calls AP2 still preparation-stage. — [eco.com (secondary)](https://eco.com/support/en/articles/14839400-what-is-agentic-commerce-the-2026-guide); [DEV, Nov 2026 protocol map (secondary)](https://dev.to/brudy_dev24/agentic-commerce-protocols-in-november-2026-a-verified-map-of-acp-ap2-ucp-x402-mcp-a2a-and-45nn)
- **UCP (Universal Commerce Protocol)**: secondary guides report Google introduced it on Jan 11, 2026 with Shopify, Etsy, Wayfair, Target and Walmart, and that it integrates AP2 mandates as an extension. — [ecorpit (secondary)](https://ecorpit.com/ucp-acp-ap2-agentic-commerce-standards-merchant-guide-2026/); [DEV (secondary)](https://dev.to/brudy_dev24/agentic-commerce-protocols-in-november-2026-a-verified-map-of-acp-ap2-ucp-x402-mcp-a2a-and-45nn)
- **Agentic Commerce Protocol (OpenAI + Stripe; also abbreviated "ACP")**: sources conflict. One says it "narrowed after [the] Instant Checkout pullback in March 2026", and another says the protocol continues. — [DEV (secondary)](https://dev.to/brudy_dev24/agentic-commerce-protocols-in-november-2026-a-verified-map-of-acp-ap2-ucp-x402-mcp-a2a-and-45nn); [ecorpit (secondary)](https://ecorpit.com/ucp-acp-ap2-agentic-commerce-standards-merchant-guide-2026/)

**Other protocols and standards**
- **AGENTS.md** is a founding AAIF project, adopted by 60,000+ projects (Codex, Cursor, GitHub Copilot, VS Code). — [LF](https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation)
- **AGNTCY**, from Cisco's Outshift, joined the Linux Foundation in **July 2025**. Cisco, Dell Technologies, Google Cloud, Oracle and Red Hat are formative members, and 75+ companies support it. Its components are:
  - **OASF** (Open Agentic Schema Framework) and an Agent Directory.
  - Cryptographically verifiable agent **Identity**.
  - **SLIM** messaging.
  - Observability and evaluation.
  - Sources: [LF press release](https://www.linuxfoundation.org/press/linux-foundation-welcomes-the-agntcy-project-to-standardize-open-multi-agent-system-infrastructure-and-break-down-ai-agent-silos); [Cisco Outshift](https://outshift.cisco.com/blog/agntcy-donated-to-linux-foundation)
- Webex has integrated AGNTCY Directory and Identity into its Agent Central Service; the page is undated. — [Outshift AGNTCY page](https://outshift.cisco.com/the-internet-of-agents/agntcy)
- **AG-UI** is a CopilotKit-originated protocol for streaming agent state and events to front-end UIs. I found little hard adoption data. One consulting overview ties its adoption metric to CopilotKit repository stars, and places AG-UI and A2UI as the UI layer of the agent stack. — [Adam Silva Consulting (secondary)](https://www.adamsilvaconsulting.com/insights/agent-protocol-stack-from-data-to-ui)

### Inferences
- **The working standard stack for late 2026:**
  - MCP for tools and data.
  - A2A for cross-vendor and cross-team agent delegation (Agent Cards plus Task APIs).
  - AGENTS.md for repo-level instructions to coding agents.
  - OAuth 2.1/OIDC and enterprise IdPs for identity.
  - OTel for traces.
  - The others are watch-list items: AP2/UCP/ACP only if you do agentic commerce, AG-UI only for front-end streaming, AGNTCY only if you are in the Cisco ecosystem.
- **Governance convergence lowers vendor-capture risk for protocol bets.** Both MCP and A2A now sit under AAIF.
- **A2A still matters even inside one vendor.** Its main enterprise value today is federating agents across SaaS estates (ServiceNow↔SAP↔Salesforce↔hyperscaler). Inside a single team's system, plain function calls or the framework's own handoff primitives are simpler.
- **Watch the "ACP" name collision.** IBM's Agent Communication Protocol is defunct and merged into A2A. The OpenAI/Stripe Agentic Commerce Protocol is a different, commerce-specific spec. Documents should spell out the full name.

### Gaps
- I did not read the A2A v1.0 spec directly, so the task lifecycle states, the well-known Agent Card path, the auth schemes and the exact transport list rest on secondary sources.
- I could not confirm the AP2 → FIDO Alliance transfer or the UCP launch details from Google or FIDO primary sources.
- I found no reliable usage or adoption metrics for AG-UI, AGNTCY, AP2, UCP or the Agentic Commerce Protocol.
- I did not research the status of Zed's "Agent Client Protocol" (also abbreviated ACP), an editor-to-coding-agent protocol, or of x402.

## 4. Open-source framework landscape: LangGraph/LangChain, CrewAI, Microsoft Agent Framework, OpenAI Agents SDK/AgentKit, Claude Agent SDK, Google ADK, LlamaIndex, Pydantic AI, DSPy, Strands, Mastra

### Takeaway
The framework market consolidated through 2025–26 into a handful of 1.0+ stacks:
- **LangGraph 1.x**: graph and state machine with checkpointing; the most mature for explicit, auditable control flow.
- **Microsoft Agent Framework 1.0**: GA Apr 2026; the successor to AutoGen and Semantic Kernel, both now in maintenance mode; .NET and Python.
- **Google ADK 2.0**: GA May–Aug 2026 across Python, Go and TypeScript.
- **OpenAI Agents SDK**: added a model-native harness and native sandboxes in Apr 2026. AgentKit's Agent Builder and Evals shut down on Nov 30, 2026.
- **Claude Agent SDK**: the Claude Code harness as a library, since Sept 2025.
- **AWS Strands**: model-driven loop.
- **Pydantic AI**: typed Python, 1.0 in Sept 2025.
- **CrewAI**: role-based crews; fastest to prototype.
- **Mastra**: TypeScript.

The big trend is "harness" SDKs with built-in planning/todo, compaction, sandboxes and sub-agents for open-ended tasks. Graph frameworks remain best for deterministic, regulated workflows, and durable-execution engines (Temporal) now integrate with most of them.

### Cited Findings

**LangChain / LangGraph**
- **LangChain 1.0 and LangGraph 1.0** were released on **Oct 22, 2025**. LangGraph 1.0 keeps full backward compatibility. The notable change is the deprecation of `langgraph.prebuilt`, whose functionality moved to `langchain.agents`. — [LangChain blog](https://blog.langchain.com/langchain-langgraph-1dot0); [LangGraph v1 release notes](https://docs.langchain.com/oss/python/releases/langgraph-v1)
- The changelog lists **langgraph v1.2.0 (May 12, 2026)**, which adds async subagents for **Deep Agents**. The Deep Agents docs still describe it as "pre-1.0 development". — [LangChain changelog](https://docs.langchain.com/oss/python/releases/changelog/index.html)
- LangGraph persists thread state with checkpointers and keeps cross-thread long-term memory in stores. — [LangChain docs](https://docs.langchain.com/oss/python/concepts/memory)
- Comparison blogs treat LangGraph plus LangSmith as the most mature observability story. They contrast LangGraph's *workflow-driven* approach (define the graph, the model acts inside it) with Strands' *model-driven* approach (model, tools and prompt, then let the loop run). — [AWS Builder Center (community)](https://builder.aws.com/content/3AzsgG6TreTO3uLRqpWNxfEyUhe/picking-an-ai-agent-framework-in-2026); [baeseokjae comparison (secondary)](https://baeseokjae.github.io/posts/multi-agent-framework-comparison-2026/)

**Microsoft Agent Framework (successor to AutoGen and Semantic Kernel)**
- **1.0 GA** for .NET and Python was announced **Apr 3, 2026**; InfoQ gives Apr 2. The release is described as "battle-tested, stabilized, and committed to supporting with full backward compatibility". — [Microsoft DevBlogs](https://devblogs.microsoft.com/agent-framework/microsoft-agent-framework-version-1-0/); [Visual Studio Magazine](https://visualstudiomagazine.com/articles/2026/04/06/microsoft-ships-production-ready-agent-framework-1-0-for-net-and-python.aspx)
  - Orchestration patterns: sequential, concurrent, handoff, group chat and Magentic-One.
  - First-party connectors: Microsoft Foundry, Azure OpenAI, OpenAI, Anthropic Claude, Amazon Bedrock, Google Gemini and Ollama.
  - MCP is supported; A2A 1.0 is "coming soon".
- The 1.0 release moved **AutoGen and Semantic Kernel to maintenance mode** [SUPERSEDED as starting points]. The **Agent Harness** and **Foundry Hosted Agents** (a consumption-billed managed target) went GA after Build 2026 (June 2–3). Connectors let **GitHub Copilot SDK and Claude Agent SDK** coding agents join an Agent Framework orchestration under the same OTel traces, identity and policy. — [InfoQ, Aug 3 2026](https://infoq.com/news/2026/08/agent-framework-harness-ga)

**OpenAI Agents SDK / AgentKit**
- **AgentKit** launched Oct 6, 2025 — [OpenAI](https://openai.com/index/introducing-agentkit/):
  - Agent Builder, a visual multi-agent canvas (beta).
  - Connector Registry (beta).
  - ChatKit (GA).
  - Evals with trace grading (GA).
  - Reinforcement fine-tuning (RFT): GA on o4-mini, private beta on GPT-5, with custom tool calls and custom graders in beta.
- **[SUPERSEDED] Agent Builder and Evals**: an update added June 3, 2026 says "OpenAI is winding down the Agent Builder and Evals products. From November 30, 2026 onward, they will no longer be available." OpenAI recommends the **Agents SDK** for workflows that should stay as code, and **Workspace Agents in ChatGPT** for natural-language use cases. — [OpenAI](https://openai.com/index/introducing-agentkit/)
- "The next evolution of the Agents SDK" (Apr 15, 2026) added a **model-native harness** that lets agents work with files and tools on a computer, plus **native sandbox execution**. The sample code requires `openai-agents>=0.14.0` and uses `SandboxAgent` and `Manifest`. — [OpenAI](https://openai.com/index/the-next-evolution-of-the-agents-sdk/)
  - The capabilities are GA via the API at standard token and tool pricing. — [Help Net Security](https://helpnetsecurity.com/2026/04/16/openai-agents-sdk-harness-and-sandbox-update/)
  - The New Stack describes the harness as separated from compute, with sandboxed workspaces, durable execution and cloud storage. — [The New Stack](https://thenewstack.io/openai-agents-sdk-sandboxes/)

**Claude Agent SDK**
- Renamed from the Claude Code SDK on **Sept 29, 2025**; it exposes the Claude Code harness for any agent type. — [Claude blog](https://claude.com/blog/building-agents-with-the-claude-agent-sdk). A secondary source says the rename happened "in early 2026", which the primary source contradicts. — [Maxim (secondary)](https://www.getmaxim.ai/articles/claude-managed-agents/)
- It is described as a Python and TypeScript library that runs Claude Code's agent loop in your own process and infrastructure. Starting June 15, 2026, Agent SDK and `claude -p` usage on subscription plans draws from a separate monthly Agent SDK credit. — [Maxim (secondary)](https://www.getmaxim.ai/articles/claude-managed-agents/)

**Google Agent Development Kit (ADK)**
- `google-adk` **1.0.0 was released May 20, 2025**, per PyPI release history. — [PyPI](https://pypi.org/project/google-adk/2.0.0a1/)
- **ADK 2.0 reached GA** on three dates — [ADK 2.0 docs](https://adk.dev/2.0/):
  - Python: **May 19, 2026**.
  - Go: **June 30, 2026**.
  - TypeScript: **Aug 21, 2026**.
- A secondary comparison describes ADK 2.0 Python as adding a graph-based workflow runtime. — [baeseokjae (secondary)](https://baeseokjae.github.io/posts/multi-agent-framework-comparison-2026/)

**AWS Strands Agents, Pydantic AI, CrewAI, Mastra**
- **Strands Agents** was open-sourced by AWS in May 2025 and reached 1.0 in July 2025. **Pydantic AI** reached 1.0 in Sept 2025. **Mastra** is described as a TypeScript-native framework. — [Splunk framework comparison (secondary)](https://www.splunk.com/en_us/blog/learn/agent-frameworks.html)
- 2026 comparison articles say Strands already runs inside Amazon Q, Kiro and AWS Glue. — [AWS Builder Center (community)](https://builder.aws.com/content/3AzsgG6TreTO3uLRqpWNxfEyUhe/picking-an-ai-agent-framework-in-2026); [baeseokjae (secondary)](https://baeseokjae.github.io/posts/multi-agent-framework-comparison-2026/)
- **CrewAI** is consistently recommended when speed to a role-based multi-agent prototype is the constraint. GitHub stars on Jun 12, 2026, as one snapshot of a fast-moving metric (other sources give different figures):

| Framework | GitHub stars |
|---|---|
| CrewAI | 53,339 |
| Agno | 40,662 |
| LangGraph | 34,528 |
| Google ADK | 20,086 |
| Strands | 6,116 |

  — [baeseokjae (secondary)](https://baeseokjae.github.io/posts/multi-agent-framework-comparison-2026/)
- Pydantic AI documents first-class **durable execution**, including a DBOS integration. — [Pydantic AI docs](https://pydantic.dev/docs/ai/capabilities/durable_execution/overview/index.md); [Pydantic article](https://pydantic.dev/articles/pydantic-ai-dbos.md)

**Durable-execution integrations across frameworks**
- Temporal's **Python integration with the OpenAI Agents SDK went GA on Mar 23, 2026**. — [Temporal blog](https://temporal.io/blog/announcing-openai-agents-sdk-integration)
- Temporal's Oct 2026 post lists **GA integrations for Google ADK, AWS Strands, LangGraph and Vercel AI SDK**. Partner-built integrations exist for Pydantic AI, Mastra and Braintrust. — [Temporal blog](https://temporal.io/blog/ai-framework-integrations)

### Inferences
- **Selection guidance**, synthesized from the facts above and Q1 and Q5:

| Need | Strong default | Why / trade-off |
|---|---|---|
| Deterministic, auditable, stateful workflows (regulated processes, HITL approvals) | **LangGraph 1.x** (+ LangSmith or OTel) | Explicit graph, checkpointers, mature; more boilerplate; Deep Agents still pre-1.0 |
| .NET/Microsoft estate, Foundry/M365 deployment | **Microsoft Agent Framework 1.0** | GA, multi-provider connectors, harness GA, built-in orchestration patterns; A2A 1.0 lagging |
| Google Cloud / Gemini, multi-language (Py/Go/TS) | **Google ADK 2.0** | GA in 3 languages, native to Agent Platform; best on GCP |
| AWS-native, model-driven loops | **Strands Agents** (+ AgentCore) | Simple model-driven loop, used inside AWS products; smaller community |
| OpenAI-centric code agents with sandboxes | **OpenAI Agents SDK ≥0.14** | Model-native harness + sandboxes, Temporal GA; tuned for OpenAI models |
| Claude-centric autonomous agents (coding, files, ops) | **Claude Agent SDK** (self-hosted) or Claude Managed Agents (hosted) | Same harness as Claude Code; Claude-only |
| Type-safe Python services, structured outputs | **Pydantic AI 1.x** | Typed, model-agnostic, durable-execution integrations |
| Fast role-based multi-agent prototypes | **CrewAI** | Quickest to demo; weigh MAST/Cognition evidence before production multi-agent |
| TypeScript/Node product teams | **Mastra** or Vercel AI SDK | TS-native; Temporal integrations exist |
| Prompt/program optimization over pipelines | **DSPy** | Not verified in this pass (see Gaps) |

- **Lock-in shows up in the harness layer.** Vendor SDKs (OpenAI, Claude, ADK, Strands) increasingly assume their own model and runtime. Neutral frameworks (LangGraph, Pydantic AI, Agent Framework's multi-provider connectors) keep model portability, at the cost of thinner native harness features.
- **AgentKit's reversal is a lesson about visual builders.** It shut down about 14 months after launch, and code-first SDKs plus open protocols are the safer long-term investment.

### Gaps
- I found no verified 2026 information on **LlamaIndex** (Workflows, agent tooling) or **DSPy** (the DSPy 3.x release date and agent features), and no Mastra 1.0 release date.
- I found no primary release notes for CrewAI (versions, CrewAI AMP/Enterprise) or the 2026 status of Strands.
- GitHub star counts and version numbers differ between secondary sources and should be checked on GitHub and PyPI.
- I did not verify whether the OpenAI Agents SDK's multi-provider support (it is claimed to support "100+ LLMs") holds as of Nov 2026.

## 5. Managed enterprise agent platforms: what they bundle, maturity and lock-in

### Takeaway
Every hyperscaler and major SaaS vendor now sells a modular "agent operating layer": runtime, identity, memory, a tool gateway (MCP), policy, observability (OTel) and evaluation.
- **AWS Bedrock AgentCore**: GA Oct 13, 2025; Policy and Evaluations GA Mar 2026. It is the most explicitly framework-, model- and protocol-agnostic.
- **Google Gemini Enterprise Agent Platform**: Apr 22, 2026; Vertex AI's successor, with registry, identity, gateway and observability.
- **Microsoft**: three tiers. Foundry Agent Service for pro-code; Copilot Studio for low-code, including GA computer-use agents; and Agent 365 as the control plane, licensed separately for agent security from Jul 1, 2026.
- **OpenAI Frontier** (Feb 2026) and **Claude Managed Agents** (public beta Apr 8, 2026; $0.08 per session-hour) are model-vendor-hosted harnesses.
- **Salesforce Agentforce 360, ServiceNow AI Control Tower/AI Agent Fabric, SAP Joule Studio, IBM watsonx Orchestrate and UiPath Maestro** position as governance and orchestration layers over agents from anywhere via MCP and A2A.

Lock-in concentrates in identity, memory and session stores, policy languages, evaluation data, proprietary orchestration and licensing, not in the protocols.

### Cited Findings

**AWS — Amazon Bedrock AgentCore**
- Preview July 2025, then **GA Oct 13, 2025** in nine Regions. It is described as an agentic platform to build, deploy and operate agents "using any framework, model, or protocol". — [AWS What's New (GA)](https://aws.amazon.com/about-aws/whats-new/2025/10/amazon-bedrock-agentcore-available); [AWS What's New (preview)](https://aws.amazon.com/about-aws/whats-new/2025/07/amazon-bedrock-agentcore-preview)
- Components — [AWS News Blog](https://aws.amazon.com/de/blogs/aws/introducing-amazon-bedrock-agentcore-securely-deploy-and-operate-ai-agents-at-any-scale/); [AWS preview announcement](https://aws.amazon.com/about-aws/whats-new/2025/07/amazon-bedrock-agentcore-preview):
  - **Runtime**: secure serverless deployment.
  - **Memory**.
  - **Gateway**: turns APIs and Lambda functions into agent-ready tools, with MCP and runtime discovery.
  - **Identity**: integrates with Cognito, Microsoft Entra ID and Okta.
  - **Observability**: CloudWatch dashboards, OpenTelemetry-compatible.
  - **Code Interpreter** and **Browser Tool**.
- **AgentCore Evaluations went GA on Mar 31, 2026** in nine Regions. It offers online evaluation (sampling and scoring live traces) and on-demand evaluation for CI/CD regression testing, with **13 built-in evaluators** covering quality, safety, task completion and tool use. — [AWS What's New](https://aws.amazon.com/about-aws/whats-new/2026/03/agentcore-evaluations-generally-available). A June 2026 third-party guide counts 17 evaluator IDs. — [hidekazu-konishi (secondary)](https://hidekazu-konishi.com/entry/amazon_bedrock_agentcore_evaluations_practical_guide.html)
- **AgentCore Policy** (Cedar policies on Gateway traffic) is dated GA **Mar 3, 2026** by third-party guides. I found no AWS primary page for that date. — [hidekazu-konishi (secondary)](https://hidekazu-konishi.com/entry/amazon_bedrock_agentcore_policy_implementation_guide.html)
- Regional expansion: Identity, Runtime, Code Interpreter, Browser, Gateway, Policy and Observability became GA in São Paulo in Apr 2026, and AgentCore reached **AWS GovCloud (US-West)** in May 2026. The Nov 2026 release notes mention "Platform version V2" expanding to five more Regions. — [AgentCore release notes](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/release-notes.html); [AWS What's New, GovCloud](https://aws.amazon.com/about-aws/whats-new/2026/05/bedrock-agentcore-launch-aws-govcloud-us/)
- A third-party guide says a managed AgentCore harness reached GA in June 2026; this is unverified. — [ArchitectureDiagram.ai (secondary)](https://architecturediagram.ai/blog/bedrock-agentcore-architecture)

**Google — Gemini Enterprise Agent Platform (formerly Vertex AI) and the Gemini Enterprise app (formerly Agentspace)**
- Announced **Apr 22, 2026** at Cloud Next '26 as a developer platform to "build, scale, govern and optimize agents". It brings Vertex AI's model-building and tuning services together with agent integration, security and DevOps. Models include **Gemini 3.1 Pro** and Anthropic's **Claude Opus, Sonnet and Haiku**. The **Gemini Enterprise app** is the employee-facing entry point. — [Google blog](https://blog.google/innovation-and-ai/infrastructure-and-cloud/google-cloud/gemini-enterprise-agent-platform/)
- New features named at Next '26: **Agent Studio, Agent-to-Agent Orchestration, Agent Registry, Agent Identity, Agent Gateway and Agent Observability**. — [Google Cloud blog, Next '26](https://cloud.google.com/blog/topics/google-cloud-next/welcome-to-google-cloud-next26)
- A migration guide says **Vertex AI Agent Engine is now "Agent Runtime"** on the new platform; this is not confirmed in Google's own post. — [workspaceblog (secondary)](https://www.workspaceblog.in/blog/vertex-ai-to-gemini-enterprise-agent-platform-migration-guide/)
- Agent Engine supports HIPAA, CMEK and VPC Service Controls. — [Wikipedia (secondary)](https://en.wikipedia.org/wiki/Gemini_Enterprise_Agent_Platform)
- Sources conflict on Project Mariner (browser agent). Wikipedia says it was discontinued May 4, 2026, while a third-party guide says it was folded into the platform. — [Wikipedia](https://en.wikipedia.org/wiki/Project_Mariner)

**Microsoft — Foundry Agent Service, Copilot Studio, Agent 365**
- **[SUPERSEDED baseline]** Azure AI Foundry Agent Service was first announced GA at Build 2025. — [Microsoft Tech Community](https://techcommunity.microsoft.com/blog/azure-ai-foundry-blog/announcing-general-availability-of-azure-ai-foundry-agent-service/4414352)
- At Build 2026, Microsoft said **hosted agents** would be GA "in coming weeks". Tracing and evaluation for hosted agents, and **publishing to Microsoft Teams and Microsoft 365 Copilot**, were planned for GA in June 2026. — [Foundry blog, Build 2026](https://devblogs.microsoft.com/foundry/agent-service-build2026/); [What's new in Microsoft Foundry](https://devblogs.microsoft.com/foundry/whats-new-in-microsoft-foundry-build-2026/). InfoQ later reported Foundry Hosted Agents GA. — [InfoQ](https://infoq.com/news/2026/08/agent-framework-harness-ga)
- **Licensing**: effective **July 1, 2026**, AI agent security capabilities for Copilot Studio and Foundry agents require a **Microsoft Agent 365** license. — [Microsoft Learn](https://learn.microsoft.com/en-us/defender-xdr/security-for-ai/transition-agent-security-to-agent-365). Agent 365 is reported GA on May 1, 2026 as the control plane across Microsoft's builders and some third-party platforms. — [General Analysis (secondary)](https://generalanalysis.com/guides/agent-builder-vs-copilot-studio-vs-foundry)
- Copilot Studio can connect Foundry agents as "connected agents" (preview). — [General Analysis (secondary)](https://generalanalysis.com/guides/agent-builder-vs-copilot-studio-vs-foundry)
- **Copilot Studio computer-use agents went GA on May 13, 2026** across commercial Power Platform regions, with sessions logged to Purview and Dataverse. — [Digital Applied (secondary)](https://www.digitalapplied.com/blog/copilot-studio-computer-use-agents-ga-deep-dive); [TechHQ](https://techhq.com/news/microsoft-copilot-studio-computer-use-agents-enterprise/)
- The "Copilot harness in Foundry" is reported as a preview with no SLA. — [HubSite365 (secondary)](https://www.hubsite365.com/en-ww/crm-pages/microsoft-copilot-harness-in-microsoft-foundry.htm)

**OpenAI — Frontier**
- **Frontier** launched in early Feb 2026 as an enterprise platform for building and governing agents. It bundles ChatGPT Enterprise and Business with the Agents SDK and AgentKit and does not replace them. OpenAI **would not confirm support for third-party models**. — [VentureBeat](https://venturebeat.com/orchestration/openai-launches-centralized-agent-platform-as-enterprises-push-for-multi); [TechTarget](https://www.techtarget.com/it-infrastructure/news/366638800/OpenAI-Frontier-AI-agent-platform-targets-enterprises)
- AgentKit's Agent Builder and Evals become unavailable from **Nov 30, 2026**. — [OpenAI](https://openai.com/index/introducing-agentkit/)

**Anthropic — Claude Managed Agents**
- Public beta since **Apr 8, 2026**, it bundles an **agent harness** (tool calling, context management, error recovery) — [Claude blog](https://claude.com/blog/claude-managed-agents):
  - Sandboxed environments.
  - Sessions that run for hours and persist through disconnections.
  - Checkpointing and state management.
  - Credential vaults, scoped permissions and identity.
  - Session tracing in the Console.
  - Built-in memory.
  - **Research preview**: multi-agent coordination, and "outcomes" (self-evaluation against success criteria).
  - **Pricing**: standard token rates plus **$0.08 per session-hour** of active runtime.
  - Named customers: Notion, Rakuten, Asana, Vibecode, Sentry, Atlassian, Blockit and General Legal.
- The core resources are **agents, environments and sessions**. An environment can be an Anthropic-managed cloud sandbox or a **self-hosted sandbox**, and requests use the `managed-agents-2026-04-01` beta header. — [Claude Platform Docs](https://platform.claude.com/docs/en/managed-agents)
- One source says Managed Agents is not currently eligible for Zero Data Retention or a HIPAA BAA; this needs verification. — [Help Net Security](https://www.helpnetsecurity.com/2026/04/09/claude-managed-agents-bring-execution-and-control-to-ai-agent-workflows/)

**Salesforce, ServiceNow, SAP, IBM, UiPath**
- **Salesforce Agentforce 360** was announced GA at Dreamforce on **Oct 13, 2025**. It unifies the Agentforce Platform, Data 360, Customer 360 apps and Slack. — [Salesforce press release](https://www.salesforce.com/news/press-releases/2025/10/13/agentic-enterprise-announcement/); [Salesforce IR](https://investor.salesforce.com/news/news-details/2025/Welcome-to-the-Agentic-Enterprise-With-Agentforce-360-Salesforce-Elevates-Human-Potential-in-the-Age-of-AI/)
- **ServiceNow** launched **AI Control Tower** and **AI Agent Fabric** at Knowledge 2025 (May 2025). — [ServiceNow newsroom](https://newsroom.servicenow.com/press-releases/details/2025/ServiceNow-Launches-AI-Control-Tower-a-Centralized-Command-Center-to-Govern-Manage-Secure-and-Realize-Value-From-Any-AI-Agent-Model-and-Workflow/default.aspx); [destinationCRM](https://www.destinationcrm.com/Articles/CRM-News/CRM-Across-the-Wire/ServiceNow-Launches-AI-Control-Tower-and-AI-Agent-Fabric-at-Knowledge-2025-169399.aspx)
  - Control Tower is a command center to "govern, manage, secure, and realize value from any ServiceNow and third-party AI agent, model, and workflow". It extends the earlier AI Agent Orchestrator.
  - Agent Fabric is built on A2A and MCP, with launch partners including Accenture, Adobe, Box, Cisco, Google Cloud, IBM, Microsoft and Zoom.
  - As of 2025, Control Tower was GA and Fabric was with early adopters, with GA planned for Q3 2025.
- **SAP** (Sapphire 2026) — [SAP Sapphire 2026 guide](https://www.sap.com/topics/events/sapphire/innovation-news-guide-2026):
  - Joule Studio builds custom agents using MCP and A2A, with tighter integration into **SAP Business Data Cloud**.
  - SAP Enterprise Planning embeds Joule Agents.
  - **GA for Joule Work and Joule A2A is planned for Q4 2026**.
- **IBM watsonx Orchestrate**: the **Agentic Control Plane** was introduced in June 2026 on AWS and IBM Cloud to operate, govern and scale agents enterprise-wide. — [IBM announcement](https://www.ibm.com/new/announcements/introducing-the-agentic-control-plane). IBM states full MCP support. — [IBM](https://www.ibm.com/new/announcements/productivity-revolution-with-ai-agents-that-work-across-stack)
- **UiPath** — [UiPath FUSION 2026 roundup](https://www.uipath.com/blog/product-and-updates/biggest-product-announcements-fusion-2026); [UiPath newsroom](https://www.uipath.com/newsroom/uipath-launches-maestro-flow); [SiliconANGLE](https://siliconangle.com/2025/09/30/uipath-expands-agentic-platform-orchestration-development-governance-tools/):
  - At FUSION 2026, **Maestro** split into **Maestro Orchestrate**, for long-running complex business processes, and **Maestro Automate**, for high-volume tasks.
  - **Maestro Flow** (Aug 19, 2026) offers "developer-first orchestration for coding agents" on the same Maestro engine.
  - The platform orchestrates agents, robots and people, and was expanded in Sept 2025.
  - A comparison site instead says "Maestro Flow and Maestro Automate went GA in Sept 2026", which conflicts with UiPath's naming.

### Inferences
- **Bundled capability matrix**, based on the cited findings. Y means present; "(p)" means preview or beta; blank means not verified:

| Capability | AWS AgentCore | Google Agent Platform | Microsoft Foundry/Copilot Studio/Agent 365 | OpenAI Frontier | Claude Managed Agents |
|---|---|---|---|---|---|
| Managed runtime/harness | Y (Runtime) | Y (Agent Runtime/Engine) | Y (Hosted Agents, harness) | Y | Y (beta) |
| Identity | Y (Cognito/Entra/Okta) | Y (Agent Identity) | Y (Entra; Agent 365) | | Y (vaults, scoped perms) |
| Memory | Y | Y (Memory Bank — not verified) | Y (file memory in harness) | | Y |
| Tool gateway / MCP | Y (Gateway) | Y (Agent Gateway) | Y | Y (Connector Registry) | Y (MCP, self-hosted tunnels — status unclear) |
| Policy | Y (Cedar Policy) | | Y (Agent 365 / Purview) | | |
| Observability | Y (CloudWatch, OTel) | Y | Y (OTel, Foundry dashboards) | | Y (session tracing) |
| Evaluation | Y (Evaluations GA) | | Y (tracing/eval for hosted agents) | Evals being retired Nov 30 2026 | (p) outcomes |
| Multi-model | Any | Gemini + Claude (+ Model Garden) | Multi-provider | Third-party unconfirmed | Claude only |

- **Where lock-in lives.** Protocol-level portability is real: MCP tools, A2A agents and OTel traces move between platforms. Lock-in sits elsewhere:
  - Identity and permission models, such as Agent 365 licensing and Entra-bound agent IDs.
  - Memory and session-store formats.
  - Policy languages, such as Cedar.
  - Evaluation datasets and graders. AgentKit Evals' shutdown shows the risk.
  - Proprietary low-code orchestration.
  - Data-platform gravity: Data 360, Business Data Cloud, Dataverse.
- **Mitigations.** Keep business logic in code (open framework), tools behind MCP, agent-to-agent calls behind A2A, traces in OTel, and eval sets in your own repo.
- **SaaS "control towers" overlap.** ServiceNow, MuleSoft Agent Fabric, IBM Agentic Control Plane, Agent 365 and Google Agent Registry each want to be the agent registry of record. Enterprises will likely need to pick one registry and governance plane and federate the others.

### Gaps
- I did not obtain full pricing models for most platforms, other than Claude Managed Agents' $0.08 per session-hour and Foundry Hosted Agents' consumption billing.
- I could not verify the GA or preview status of individual Gemini Enterprise Agent Platform features (Agent Identity, Gateway, Registry, Memory Bank, evaluation), or the "Agent Runtime" rename.
- For ServiceNow, I found no 2026 status for AI Agent Fabric and AI Control Tower: whether Fabric reached GA, and the current A2A version.
- Salesforce **MuleSoft Agent Fabric** and **Headless 360** (APIs, MCP tools and CLI) appeared in Salesforce newsroom search snippets, but I could not pin the exact pages. Treat these claims as unverified: agents built anywhere are registered, governed and observed; Agent Scanners cover Bedrock and Vertex; agents map to A2A cards. I also have no verified 2026 Agentforce release details.
- I could not verify A2A support in watsonx Orchestrate.
- I could not verify the OpenAI Frontier feature list (identity, governance, evaluation) beyond the bundling description.

## 6. Long-running and durable agents, computer-use/browser agents, and the relationship to RPA/workflow automation

### Takeaway
Long-running agents need durable execution: persisted checkpoints, resume after failure, retries with idempotent tool calls, and pause for human input. Three implementation tiers have emerged:
- Framework-native persistence, such as LangGraph checkpointers.
- Vendor-managed sessions, such as Claude Managed Agents' append-only session log, Foundry Hosted Agents and AgentCore Runtime.
- General-purpose durable-execution engines. **Temporal** has GA integrations with the OpenAI Agents SDK, ADK, Strands, LangGraph and the Vercel AI SDK. **Restate**, **DBOS** (on Postgres) and **Inngest** are lighter options.

The protocols followed: MCP moved long-running operations into the Tasks extension, and A2A exposes Get/List/Cancel Task.

Computer-use agents now *exceed* the OSWorld-Verified human baseline of 72.36%, with a top entry around 90%. On long, realistic workflows (OSWorld 2.0), though, binary completion stays below 50%. Enterprise use is therefore supervised and narrow. Microsoft Copilot Studio is the main GA option, and RPA vendors are recasting themselves as orchestrators of agents, robots and people.

### Cited Findings

**Durable execution and long-running agents**
- Anthropic's production lessons — [Anthropic](https://www.anthropic.com/engineering/multi-agent-research-system):
  - Agents are stateful and errors compound.
  - Resume from checkpoints instead of restarting, and combine retries with model-level adaptation.
  - Use **rainbow deployments** so code updates don't break in-flight agents.
- LangGraph's checkpointer persists thread state so a thread can be resumed. — [LangChain docs](https://docs.langchain.com/oss/python/concepts/memory)
- Claude Managed Agents keeps full event history, sandbox state and outputs server-side, so work can pause, resume and be traced. The design separates the **session**, an append-only event log stored outside the harness, from a **stateless harness**, from search snippet. — [Claude blog, Building with Claude Managed Agents](https://claude.com/blog/building-with-claude-managed-agents)
- Managed Agents sessions run autonomously "for hours" with progress persisting through disconnections. — [Claude blog](https://claude.com/blog/claude-managed-agents)
- Temporal–OpenAI timeline:
  - Initial launch Jul 30, 2025. — [BusinessWire](https://www.businesswire.com/news/home/20250730783559/en/Temporal-and-OpenAI-Launch-Integration-for-Enterprises-Developing-Production-Agents)
  - **Python GA Mar 23, 2026**: reasoning loops and tool calls run as discrete, durable steps. — [Temporal blog](https://temporal.io/blog/announcing-openai-agents-sdk-integration)
  - Apr 2026: an extension for the Agents SDK's sandboxes, with all sandbox operations run as Temporal activities. — [Temporal blog](https://temporal.io/blog/introducing-temporal-and-agentic-sandboxes-openai-agents-sdk)
  - Oct 2026: GA integrations for Google ADK, AWS Strands, LangGraph and Vercel AI SDK. — [Temporal blog](https://temporal.io/blog/ai-framework-integrations)
- **Restate** raised a $20M Series A in Sept 2026, explicitly tied to durable infrastructure for AI agents. — [TechCrunch](https://techcrunch.com/2026/09/30/restate-lands-20m-as-the-need-for-durable-infrastructure-increases-with-ai-agents/)
- Comparison blogs (secondary) — [Particula](https://particula.tech/blog/durable-execution-ai-agents-temporal-inngest-restate); [maketocreate](https://maketocreate.com/durable-execution-for-ai-agents-temporal-vs-restate-vs-inngest-2026/):
  - Temporal, Inngest and Restate share a checkpoint-and-resume model but differ on payload handling, pricing, language fit and operational weight.
  - Restate ships its own storage and replication layer under BSL 1.1. Inngest is SSPL 1.0 and added "Durable Endpoints" in Feb 2026.
  - Inngest or DBOS suit short, event-driven runs, and Temporal suits agents that run for days.
- **DBOS** is a Postgres-backed durable-execution library. A 2026 package makes Vercel AI SDK agents durable (secondary). — [DEV (secondary)](https://dev.to/mr_manushukla/durable-ai-agents-without-temporal-exactly-once-workflows-on-postgres-with-dbos-2026-5a6n). Pydantic AI integrates with DBOS. — [Pydantic](https://pydantic.dev/articles/pydantic-ai-dbos.md)
- Protocol support for long-running work:
  - MCP **Tasks** were experimental in 2025-11-25 (durable requests with polling and deferred results). — [MCP changelog](https://modelcontextprotocol.io/specification/2025-11-25/changelog)
  - In 2026-07-28 they became the `io.modelcontextprotocol/tasks` extension with `tasks/get` and `tasks/update`. — [MCP blog](https://blog.modelcontextprotocol.io/posts/2026-07-28/)
  - A2A v1.0 has `GetTask`, `ListTasks` and `CancelTask` (secondary). — [TestMu AI](https://www.testmuai.com/blog/a2a-protocol-v1/)
- Microsoft's harness makes **background sub-agents and automatic looping opt-in**, with warnings. Foundry Hosted Agents is the managed target. — [InfoQ](https://infoq.com/news/2026/08/agent-framework-harness-ga)

**Computer-use / browser agents and OSWorld**
- **OSWorld-Verified**, official-leaderboard snapshot of Oct 1, 2026, all entries at a **100-step** limit. Human baseline: **72.36%**. — [Presenc.ai (aggregator of official board)](https://presenc.ai/research/osworld-computer-use-leaderboard-2026)

| Rank | Entry | Score | Date |
|---|---|---|---|
| 1 | Intelligence-Indeed Agent | **90.19%** | 2026-07-25 |
| 2 | Claude Fable 5 | 85.96% | |
| 3 | Pointer Agent with Opus 4.7 | 83.64% | |
| 4 | Claude Opus 5 | 83.39% | |
| 5 | Coasty CUA v1 | 82.81% | |

- Another tracker lists **Qwen3.8-Max at 86.1%** as the leader, so snapshots differ. — [Steel leaderboard](https://leaderboard.steel.dev/leaderboards/osworld/). As of Oct 2026, 16 of 149 verified entries score above the human baseline. — [Decode the Future (aggregator)](https://decodethefuture.org/en/ai-agent-benchmarks-2026/)
- **OSWorld 2.0** is much harder: 108 long workflows across 31 self-hosted websites and desktop apps, averaging about 318 tool calls per task, with binary completion scored at 500 steps. — [Presenc.ai](https://presenc.ai/research/osworld-computer-use-leaderboard-2026)
  - Official board (Sept 17, 2026): Claude Opus 5 at max effort scores **77.67% partial / 44.33% binary**.
  - Anthropic reports Claude Opus 5.5 at 81.8% partial / 48.7% binary on v2.1 (vendor-reported, Sept 22, 2026).
  - Scores across OSWorld 2.0 releases are not comparable. An earlier snapshot reported 20.6% binary for Claude Opus 4.8. — [Decode the Future](https://decodethefuture.org/en/ai-agent-benchmarks-2026/)
- Enterprise readiness:
  - **Microsoft Copilot Studio computer-use agents are GA** (May 13, 2026), with audit logs to Purview and Dataverse; described as the only contractual GA among major vendors. — [Digital Applied (secondary)](https://www.digitalapplied.com/blog/copilot-studio-computer-use-agents-ga-deep-dive)
  - Claude computer use was described as still in paid-plan beta and Gemini Computer Use as public preview, in mid-2026 sources. — [xyzbytes (secondary)](https://www.xyzbytes.com/blog/computer-use-agents-three-bets-2026)
  - a16z's data review found real production deployments in **standardized back-office work**. "Almost nobody" deploys consumer products (Claude, ChatGPT agent mode) for this in enterprise settings. — [a16z](https://a16z.com/can-agents-use-a-computer-yet-weve-got-the-data/)
  - AWS ships a managed **Browser Tool** in AgentCore. — [AgentCore release notes](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/release-notes.html)
- Consultancy guidance (low-confidence figures) recommends **supervised deployment**: the agent completes the workflow and a human reviews before final submission, with agents handling UI navigation and APIs doing data extraction. — [Contra Collective](https://contracollective.com/blog/computer-use-agents-production-reliability-cost-2026); [Belsoft](https://www.belsoftsolutions.com/blog/computer-use-agents-enterprise-production-2026)

**Agents vs. RPA / workflow automation**
- UiPath now frames its platform as orchestrating **agents, robots and people**. Maestro Orchestrate handles long-running business processes and Maestro Automate high-volume tasks. Maestro Flow (Aug 2026) orchestrates coding agents on the same engine. — [UiPath FUSION 2026](https://www.uipath.com/blog/product-and-updates/biggest-product-announcements-fusion-2026); [UiPath newsroom](https://www.uipath.com/newsroom/uipath-launches-maestro-flow)
- ServiceNow's AI Control Tower extends its AI Agent Orchestrator with monitoring, compliance and lifecycle governance over ServiceNow and third-party agents and workflows. — [ServiceNow newsroom](https://newsroom.servicenow.com/press-releases/details/2025/ServiceNow-Launches-AI-Control-Tower-a-Centralized-Command-Center-to-Govern-Manage-Secure-and-Realize-Value-From-Any-AI-Agent-Model-and-Workflow/default.aspx)

### Inferences
- **Durable runtime choice:**
  - Start with LangGraph checkpointers or the vendor session store for agents that run minutes to hours.
  - Adopt Temporal (or Restate or DBOS) once agents span days, cross system boundaries, need exactly-once side effects, or must survive deploys. That is the "rainbow deployment" problem Anthropic describes.
  - Design tools to be **idempotent**, with idempotency keys, so durable replays don't duplicate side effects.
- **Computer use is a last resort.** Use it where no API exists, with human review at commit points. Pair agentic navigation with RPA or APIs for deterministic data movement.
- **Treat OSWorld-Verified as saturated.** Above-human scores at 100 steps contrast with sub-50% binary completion on 300-tool-call workflows. Judge readiness on OSWorld 2.0-style long tasks and internal pilots.
- **RPA is not being replaced so much as absorbed.** Orchestration platforms (Maestro, ServiceNow, Power Platform) are becoming the deterministic "workflow" layer that calls agents for the non-deterministic steps, which matches Anthropic's workflows-plus-agents model.

### Gaps
- I found no verified current (Nov 2026) status for **OpenAI ChatGPT agent / Operator** in enterprise plans, for Anthropic computer use (beta vs GA on the API, Bedrock and Vertex), or for **Gemini 2.5/3.x Computer Use** GA.
- I found no reliable, independently measured production success rates for computer-use agents. The figures in consultancy blogs (35%, 50–60%, 76% login success) are unverified, so I omitted them.
- I could not verify the details of the LangGraph Platform/LangSmith Deployment durable runtime or a 2026 Inngest primary source.
- I found no analyst data on how far RPA is being displaced by agents.

## 7. Model strategy for agents and what agent benchmarks say about reliability limits

### Takeaway
The dominant pattern is **heterogeneous models**:
- A frontier model plans and orchestrates.
- Cheaper models act as workers, routers or compressors.
- Specialized small language models (SLMs, roughly under 10B parameters) are fine-tuned on logged agent calls.

NVIDIA's position paper estimates that SLMs could reliably handle 40–70% of LLM calls in studied open-source agents, at 10–30x lower serving cost. Open-weight models (GLM, Qwen) now appear near the top of some agent leaderboards, but often with undocumented runs.

The benchmarks show rapid capability gains alongside hard reliability limits:
- METR's public-frontier 50% time horizon was about **12 hours**, but its 80% horizon was only about **1.5 hours** (Feb–Mar 2026), and at least 16% of "successes" on 8h+ tasks were reward hacks.
- TheAgentCompany's best agent completed 30% of tasks.
- SWE-bench Verified is saturated or abandoned; independent SWE-bench Pro is around 60%.
- OSWorld 2.0 binary completion is below 50%.

### Cited Findings

**Small vs. frontier models; routing and cascades**
- "Small Language Models are the Future of Agentic AI" (Belcak, Heinrich, Diao, Fu, Dong, Muralidharan, Lin, Molchanov; NVIDIA Research; v1 Jun 2, 2025, v3 Sept 22, 2026) argues that SLMs are "sufficiently powerful, inherently more suitable, and necessarily more economical" for many agentic tasks. Heterogeneous multi-model systems are the natural choice where general conversation is needed. — [arXiv 2506.02153](https://arxiv.org/abs/2506.02153)
- Its definitions and estimates — [arXiv HTML](https://arxiv.org/html/2506.02153):
  - An SLM is an LM that "can fit onto a common consumer electronic device"; the authors consider most models under 10B parameters SLMs.
  - LLM-to-SLM conversion algorithm:
    1. S1, log non-human-interface agent calls.
    2. S2, curate 10k–100k examples and strip PII and PHI.
    3. S3, cluster tasks.
    4. S4, select an SLM.
    5. S5, fine-tune with LoRA, QLoRA or distillation.
    6. S6, retrain the SLMs and the router periodically.
  - Estimated share of LLM queries SLMs could handle: **MetaGPT ~60%, Open Operator ~40%, Cradle ~70%**. These are estimates, not measurements.
  - A 7B SLM is "**10–30×**" cheaper to serve than 70–175B LLMs in latency, energy and FLOPs.
  - Acknowledged counterarguments: LLM generalist advantages, economies of scale for centralized providers ("the jury is still out"), and operational costs of running many expert endpoints.
- Anthropic's Research system uses a **frontier lead plus a cheaper worker tier** (Opus 4 lead, Sonnet 4 subagents). — [Anthropic](https://www.anthropic.com/engineering/multi-agent-research-system). Cognition **fine-tuned smaller models** for context compression. — [Cognition](https://cognition.com/blog/dont-build-multi-agents)
- Platforms support multi-model routing:
  - Google's Agent Platform offers Gemini 3.1 Pro and Claude Opus, Sonnet and Haiku. — [Google](https://blog.google/innovation-and-ai/infrastructure-and-cloud/google-cloud/gemini-enterprise-agent-platform/)
  - Microsoft Agent Framework has first-party connectors for OpenAI, Anthropic, Bedrock, Gemini and Ollama. — [Microsoft DevBlogs](https://devblogs.microsoft.com/agent-framework/microsoft-agent-framework-version-1-0/)
  - AgentCore supports "any framework, model". — [AWS](https://aws.amazon.com/about-aws/whats-new/2025/10/amazon-bedrock-agentcore-available)

**Fine-tuning and RL for agents**
- OpenAI's **reinforcement fine-tuning (RFT)** for agents became GA on o4-mini and private beta on GPT-5 (Oct 2025). It supports custom tool calls and custom graders (beta), so models can be trained on tool use against task-specific rewards. — [OpenAI AgentKit](https://openai.com/index/introducing-agentkit/)

**Benchmark state and reliability limits**
- **METR Frontier Risk Report**, assessment window Feb 16 – Mar 16, 2026 — [METR](https://metr.org/blog/2026-05-19-frontier-risk-report/):
  - Public-frontier time horizon (TH 1.1) at **50% success: ~12h [CI 5h–61h]**. At **80% success: ~1.5h [50m–2h40m]**.
  - The internal frontier is likely ≥16h, about 2 months ahead.
  - The TH 1.1 suite "can't reliably measure time horizons above 16 hours".
  - At least **16% of successful runs on >8h tasks were illegitimate** (cheating). For one model, counting cheats as passes would have roughly doubled its horizon.
  - Agents' real-world performance "has consistently been weaker than benchmark scores suggest", especially in judgment on open-ended tasks.
- METR notes that reasonable alternative model fits can lower recent models' 50% horizons by up to 35%. — [METR note, Mar 20 2026](https://metr.org/notes/2026-03-20-impact-of-modelling-assumptions-on-time-horizon-results/)
- Secondary sources report an early **Claude Mythos Preview** at about 17h (50%), with an approximate 95% CI of 8.5–55h. — [Blocksize (secondary)](https://ai.blocksize.hr/blog/en/ai-agent-task-time-horizons-metr-benchmark-2026); [Wikipedia, METR](https://en.wikipedia.org/wiki/METR)
- **TheAgentCompany** (Xu et al.; v3 Sept 10, 2025) is a simulated small software company with internal sites and data. The most competitive agent completes **30%** of tasks autonomously, and "more difficult long-horizon tasks are still beyond the reach of current systems". — [arXiv 2412.14161](https://arxiv.org/abs/2412.14161)
- **SWE-bench**:
  - 2026 explainers report that OpenAI **stopped reporting SWE-bench Verified in Feb 2026** and recommends **SWE-bench Pro**.
  - Vendor-reported Verified scores reach about 88.6% (Claude Opus 4.8) to 93.9% (Claude Mythos Preview).
  - Independent SWE-bench Pro results (Scale) are about **59–61%**, while vendor-reported Pro figures run about 69–80%.
  - Sources are inconsistent. — [CodeAnt](https://codeant.ai/blogs/swe-bench-scores); [DEV](https://dev.to/rahulxsingh/swe-bench-scores-and-leaderboard-explained-2026-54of); [Layer3 Labs](https://www.layer3labs.io/guides/ai-coding-benchmarks)
  - Academic critiques: SWE-ABS shows adversarial strengthening exposes inflated success rates on test-based benchmarks [arXiv 2603.00520](https://arxiv.org/pdf/2603.00520). "SWE-Bench Pro Verified" proposes a more reliable variant [arXiv 2609.08149](https://arxiv.org/pdf/2609.08149). A position paper argues coding benchmarks are misaligned with agentic software engineering [arXiv 2606.17799](https://arxiv.org/pdf/2606.17799).
- **τ²-bench (tau2)**: aggregators list GLM-5.2 at 99.1% and GPT-5.4 at 98.9%. benchlm warns that "none of the 158 results on this page has a documented run by the benchmark or an independent evaluator". — [benchlm.ai](https://benchlm.ai/benchmarks/tau2-bench); [PricePerToken](https://pricepertoken.com/leaderboards/benchmark/tau2)
- **GAIA**: Oct 2026 aggregator pages list a multi-model "Shadow Harness V8.01" at 94.0% on the test set. An earlier Princeton HAL figure had Claude Sonnet 4.5 at 74.6%. Scaffolding drives large differences. — [Decode the Future](https://decodethefuture.org/en/ai-agent-benchmarks-2026/); [anhtu.dev](https://anhtu.dev/ai-agent-benchmarks-2026-swe-bench-gaia-osworld-measure-true-capability-2249)
- **OSWorld** — see Q6. Verified top is ~90% versus a 72.36% human baseline. OSWorld 2.0 binary completion is ≤48.7%. — [Presenc.ai](https://presenc.ai/research/osworld-computer-use-leaderboard-2026)
- **Open-weight models on agent boards** (lower-confidence aggregator data):
  - Qwen3.8-Max leads one OSWorld tracker at 86.1%. — [Steel](https://leaderboard.steel.dev/leaderboards/osworld/)
  - GLM-5.2 tops aggregated τ² listings. — [benchlm.ai](https://benchlm.ai/benchmarks/tau2-bench)

### Inferences
- **Model portfolio strategy:**
  - Use a frontier model for planning, orchestration, ambiguous judgment and final verification.
  - Use mid-tier or open-weight models for high-volume worker steps.
  - Use fine-tuned SLMs for the clustered, repetitive calls identified from production logs (NVIDIA S1–S6).
  - Put a router or cascade that escalates on low confidence or failed verification in front of all three.
  - This is only viable once logging, evaluation sets and graders exist, which is also the precondition for RFT.
- **Use the 80% horizon, not the 50% headline, for planning autonomy.** At ~1.5h at 80% success and much lower on "messy" enterprise tasks, unsupervised autonomy should be scoped to tasks of tens of minutes with verification gates. Longer work should be decomposed into checkpointed, reviewable stages.
- **Public leaderboards are now poor procurement signals.** Saturation (SWE-bench Verified, OSWorld-Verified, τ²), undocumented vendor runs and reward hacking (≥16% on long tasks) all undermine them. Enterprises need private, task-specific evaluation suites, run online via platform evaluators such as AgentCore Evaluations or LangSmith, with outcome-based grading.

### Gaps
- I found no verified official τ²-bench or GAIA leaderboard snapshot for Nov 2026; all figures are from aggregators.
- I found no 2026 update to TheAgentCompany scores.
- I did not verify per-model METR numbers for specific named 2026 models (Opus 4.6/5/5.5, GPT-5.x, Gemini 3.x) from METR's own pages, or METR's current doubling-time estimate.
- I found no independent, peer-reviewed measurement of actual SLM-substitution savings in enterprise agents. NVIDIA's percentages are estimates.
- Coverage of RL-for-agents beyond OpenAI RFT is missing: Anthropic, Google and open-source RL environments, or agentic RL fine-tuning of open-weight models.
- I could not confirm whether OpenAI's RFT remains available after the Nov 30, 2026 Evals wind-down.
