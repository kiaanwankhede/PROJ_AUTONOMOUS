# Data, Knowledge and Operational Foundations for Enterprise AI Agents: Context Engineering, Knowledge/Process Data, Evaluation, Observability, AgentOps, Reliability and Cost (fact base as of 2026-11-21)

*Legend: dates in parentheses are publication dates; **[older]** = guidance from before 2025 that is still widely cited; **[vendor]** = vendor's own claim or documentation; **[secondary]** = only secondary coverage was reviewed; **[unverified]** = single source or snippet-level evidence. Anthropic API facts marked "(Anthropic API reference, cached 2026-11-03)" come from Anthropic's bundled Claude API reference material; the linked public doc pages are the canonical versions.*

## 1. Context engineering: what it is, core techniques, and how it relates to prompt engineering

### Takeaway
Context engineering means curating the whole token state an agent sees at each step: instructions, tool definitions, retrieved data, memory, history and tool results. It goes beyond the wording of one prompt. The term took over from "prompt engineering" in mid-2025 (Lütke, Karpathy, LangChain, Anthropic), and by April 2026 Thoughtworks treated it as a core architectural concern (Adopt ring). Its working toolkit has six parts: a minimal, high-signal system prompt and tool set; just-in-time retrieval through lightweight identifiers; compaction and tool-result clearing; structured notes or memory kept outside the window; sub-agents that keep their contexts separate; and tool outputs that are trimmed and paginated. All of this rests on measured "context rot": recall gets worse as context grows, even when the task stays equally hard.

### Cited Findings
**Origin and definitions**
- Tobi Lütke, Shopify CEO (X, June 2025): "I really like the term 'context engineering' over prompt engineering. It describes the core skill better: the art of providing all the context for the task to be plausibly solvable by the LLM." Andrej Karpathy (June 25, 2025) replied "+1", saying that in "every industrial-strength LLM app, context engineering is the delicate art and science of filling the context window with just the right information for the next step." — [Simon Willison, 27 Jun 2025](https://simonwillison.net/2025/Jun/27/context-engineering/); [The Decoder](https://the-decoder.com/shopify-ceo-and-ex-openai-researcher-agree-that-context-engineering-beats-prompt-engineering/)
- Anthropic (Sep 29, 2025) calls context engineering "the natural progression of prompt engineering". Prompt engineering is about writing and organizing instructions. Context engineering is about curating every token present at inference time, and it is iterative rather than a one-off task. The guiding principle is to find "the smallest set of high-signal tokens that maximize the likelihood of your desired outcome." — [Anthropic, Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- LangChain (mid-2025) groups strategies into four buckets. **Write**: keep information outside the window (scratchpads, long-term memory). **Select**: pull relevant memories, examples, tools or facts back in. **Compress**: keep only the tokens the task needs. **Isolate**: split context across sub-agents. In LangChain's open-deep-research reference, sub-agents return condensed summaries instead of full traces. — [LangChain blog](https://langchain.com/blog/context-engineering-for-agents); [langchain-ai/context_engineering repo](https://github.com/langchain-ai/context_engineering)
- Thoughtworks Technology Radar Vol. 34 (Apr 2026) treats context engineering as a core architectural concern (Adopt). It warns that dumping raw data into large windows causes "context rot" and recommends progressive context disclosure, stateful compression, and sub-agents that summarize intermediate outputs. Agent Skills (Trial) are described as an open standard for packaging instructions, scripts and resources into modular context, with a warning that unreviewed third-party skills create "serious supply chain security risks". [ring placements seen only in search snippets] — [Thoughtworks Radar, Techniques](https://www.thoughtworks.com/radar/techniques)

**Evidence for context rot**
- Chroma's technical report (July 2025; Hong, Troynikov, Huber; 18 LLMs, closed and open-weights) held task difficulty constant and varied only input length. Performance became "increasingly unreliable" as inputs grew, even on trivial tasks such as replicating text. Lower semantic similarity between the needle and the question, and the presence of distractors, sped up the decline, and the structure and placement of information mattered. Caveat: Chroma sells retrieval infrastructure. — [Chroma Research](https://research.trychroma.com/context-rot); [GitHub: chroma-core/context-rot](https://github.com/chroma-core/context-rot)
- Anthropic describes LLMs as having an "attention budget" that every added token depletes, so recall falls as context grows. — [Anthropic](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

**Core techniques (Anthropic, Sep 2025, unless noted)**
- System prompts should sit at the "right altitude", a "Goldilocks zone" between brittle hard-coded logic and vague guidance. Use diverse, canonical examples instead of long lists of edge-case rules ("examples are the 'pictures' worth a thousand words"). Keep tool sets minimal and unambiguous: "If a human engineer can't definitively say which tool should be used in a given situation", an agent cannot be expected to do better. — [Anthropic](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- **Just-in-time retrieval.** The agent holds lightweight identifiers ("file paths, stored queries, web links, etc.") and loads the data at runtime through tools. The trade-off is that runtime exploration is slower than pre-computed retrieval. A hybrid is possible: Claude Code puts CLAUDE.md files into context up front and uses glob/grep just in time. Anthropic suggests hybrids for less dynamic domains such as legal or finance. — [Anthropic](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- **Compaction.** Summarize the conversation as it nears the window limit, then restart from the summary. Tune the summary for recall first, then precision. Tool-result clearing is "one of the safest lightest touch forms" of compaction. — [Anthropic](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- **Structured note-taking.** The agent writes persistent notes outside the window, such as to-do lists or a NOTES.md file. In Anthropic's Claude-plays-Pokémon example, the agent kept precise tallies across thousands of steps. — [Anthropic](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- **Sub-agent isolation.** Specialized sub-agents work in clean windows and return a "condensed, distilled summary", often 1,000–2,000 tokens, to a lead agent. — [Anthropic](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- **Tool-result trimming** (Anthropic, Sep 11, 2025). Use pagination, range selection, filtering and truncation with sensible defaults; Claude Code caps tool responses at 25,000 tokens by default. A `response_format` enum lets the agent pick concise or detailed output (in one example, 72 tokens versus 206). Resolving UUIDs to meaningful names reduced hallucinations. Namespace tools (e.g., `asana_search`, `jira_search`) and write actionable error messages instead of opaque codes. — [Anthropic, Writing effective tools for agents](https://www.anthropic.com/engineering/writing-tools-for-agents)
- **Multi-session harness pattern** (Anthropic, Nov 2025). An initializer agent creates an `init.sh`, a `claude-progress.txt` log and an initial git commit, and expands the user's request into a feature list. Each later session reads the progress file, implements one feature, verifies it, commits and stops, so continuity lives in artifacts rather than in the window. [partly secondary] — [Anthropic, Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)

**Platform primitives (Nov 2026)**
- Anthropic's API offers three primitives. Server-side **compaction** (beta) summarizes earlier context once a trigger threshold is reached (default around 150K tokens). **Context editing** (beta) clears old tool results or thinking blocks instead of summarizing them. A client-side **memory tool** (`memory_20250818`) gives file-directory memory that the developer hosts. Anthropic's guidance is that editing and compaction work within a session while memory carries across sessions, and many long-running agents use all three. Anthropic also warns that context editing "is a context-window tool, not a savings lever": each clearing pass rewrites the cached prefix, and in its measured run it cost more than it saved. [vendor; Anthropic API reference, cached 2026-11-03] — [Compaction docs](https://platform.claude.com/docs/en/build-with-claude/compaction); [Context editing docs](https://platform.claude.com/docs/en/build-with-claude/context-editing); [Memory tool docs](https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool); [Cost optimization docs](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence)
- OpenTelemetry's GenAI conventions now name context operations as first-class span types (`retrieval`, `plan`, `create_memory`, `search_memory`, `update_memory`, `upsert_memory`, `delete_memory`). — [OTel GenAI spans spec](https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-spans.md)

### Inferences
- Prompt engineering has become one part of context engineering: the system prompt plus tool descriptions. The larger discipline is managing information and runtime state. Teams should treat context assembly as code that is versioned, unit-tested and traced, with an explicit token budget for each part (system, tools, retrieved data, memory, history, tool results).
- Practical defaults for a dev team:
  - Keep a stable, cacheable prefix (system prompt and tool definitions).
  - Retrieve just in time through identifiers instead of pre-stuffing documents.
  - Cap and paginate every tool output, and offer concise/detailed modes.
  - Set compaction and clearing thresholds.
  - Keep external progress or memory files for multi-session work.
  - Hand read-heavy fan-out to sub-agents that return summaries of 1–2K tokens.
- Larger windows (1M tokens are now common at frontier vendors) do not remove the need to curate, because context rot affects simple retrieval too. Long-context behavior should be covered by its own regression evals.
- Context editing and compaction interact with prompt caching (see §7). Choose clearing intervals by looking at cost and quality together.

### Gaps
- I found no vendor-neutral, quantitative comparison of compaction, just-in-time retrieval and sub-agent isolation on enterprise tasks. Most guidance comes from practitioners or vendors.
- The Thoughtworks ring placements (context engineering in Adopt, Agent Skills in Trial) come from search snippets, not the full Radar page.
- Anthropic's newer "advanced tool use" features (tool search with deferred loading, programmatic tool calling) and their token-saving claims were not checked in this pass.

## 2. Knowledge foundations: RAG evolution, knowledge graphs/ontologies, semantic layers, catalogs, AI-ready data, and agent memory

### Takeaway
By 2026 the enterprise knowledge layer for agents is converging on governed, machine-readable business semantics: ontologies such as Palantir's, Microsoft Fabric IQ and Snowflake's Business Ontology; metric and semantic layers interchanged through the Open Semantic Interchange (OSI) spec; and catalogs (Unity Catalog, Snowflake Horizon), all increasingly exposed to agents over MCP. Retrieval is moving from one-shot vector RAG to hybrid lexical-plus-vector search with reranking and contextualized chunks, agentic just-in-time search, and cheaper graph variants (LazyGraphRAG). Data readiness is still the biggest failure driver: Gartner predicts that through 2026, 60% of AI projects without AI-ready data will be abandoned. Agent memory remains immature, and its benchmarks are disputed among vendors.

### Cited Findings
**AI-ready data and why it matters**
- Gartner (Feb 26, 2025): through 2026, organizations will abandon 60% of AI projects unsupported by AI-ready data. In a Gartner survey, 63% of organizations either lack or are unsure they have the right data management practices for AI. — [Gartner press release](https://www.gartner.com/en/newsroom/press-releases/2025-02-26-lack-of-ai-ready-data-puts-ai-projects-at-risk)
- Gartner (Jun 25, 2025): over 40% of agentic AI projects will be canceled by end-2027 because of escalating costs, unclear business value or inadequate risk controls. Gartner estimates only about 130 of the thousands of vendors marketed as "agentic" are real ("agent washing"). A January 2025 Gartner webinar poll (3,412 attendees, not a representative sample) found 19% had invested significantly, 42% conservatively, 8% not at all, and 31% were waiting or unsure. — [Gartner press release](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027)
- Forrester (FabCon 2026): "Enterprise AI needs a governed context layer, not just data." — [Forrester blog](https://www.forrester.com/blogs/microsoft-fabcon-2026-enterprise-ai-needs-a-governed-context-layer-not-just-data/)
- Gartner's first take on Fabric IQ: an ontology agent proposes entities, relationships and natural-language rules from Power BI semantic models, OneLake schemas and unstructured documents, but "subject matter experts remain essential" to validate business meaning and approve authoritative definitions. — [Gartner First Take: Microsoft Fabric IQ](https://www.gartner.com/en/insights/gartner-first-takes/microsoft-fabric-iq)

**How RAG has evolved**
- **[older, Sep 2024]** Anthropic's Contextual Retrieval prepends chunk-specific context before embedding and BM25 indexing. Top-20 retrieval failures fell 35% with contextual embeddings alone (5.7% to 3.7%), 49% when contextual BM25 was added, i.e. hybrid lexical-plus-vector search (to 2.9%), and 67% when reranking was added on top. These figures are cumulative. A critique notes they measure only the top-k retrieval failure rate, not answer quality. — [Anthropic](https://www.anthropic.com/news/contextual-retrieval); [critique (Medium)](https://medium.com/almond-ai/responding-to-anthropics-contextual-retrieval-for-rag-apps-why-context-is-not-all-you-need-af503985aa55)
- **[older, Nov 2024; still current]** Microsoft's LazyGraphRAG defers LLM summarization to query time. Indexing costs the same as vector RAG and 0.1% of full GraphRAG, and global-query quality is comparable to GraphRAG Global Search at more than 700x lower query cost. The benchmark used 5,590 AP News articles, so results may not transfer. It has since been integrated into Microsoft Discovery and Azure Local. — [Microsoft Research](https://www.microsoft.com/en-us/research/blog/lazygraphrag-setting-a-new-standard-for-quality-and-cost/)
- 2026 research is questioning when graph structure pays off, e.g. "When Is Graph Structure Worth Its Cost? The Case for Structure Pricing in Retrieval-Augmented Generation" (arXiv, Sep 2026). — [arXiv 2609.18099](https://arxiv.org/pdf/2609.18099)
- In agentic search, agents navigate through identifiers and tools (grep, glob, stored queries) instead of relying only on pre-computed embeddings; Claude Code is a hybrid example. — [Anthropic](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents). Agentic RAG adds a routing layer that chooses a retrieval strategy for each query. [secondary] — [daily.dev](https://daily.dev/posts/graphrag-how-ai-answers-questions-hidden-across-many-documents-y6prjknjz)

**Ontologies and knowledge graphs**
- **Palantir [vendor docs].** The Ontology models enterprise data as objects, properties and links (semantic) plus actions (kinetic), organized as a Language, an Engine and a Toolchain (OSDK). Actions write decisions back to operational systems. The Ontology combines data, logic, actions and security policies into one representation that both humans and AI agents use. The Ontology MCP (OMCP) server lets external agents read objects, run predefined actions and query data, while restricting which actions they may take. — [Ontology system](https://www.palantir.com/docs/foundry/architecture-center/ontology-system/); [Ontology MCP](https://www.palantir.com/docs/foundry/ontology-mcp); [Why create an Ontology?](https://www.palantir.com/docs/foundry/ontology/why-ontology)
- **Microsoft Fabric IQ (Ignite, Nov 2025).** An Ontology item (public preview) serves as the semantic foundation connecting "people, processes, systems, actions, rules and data". Its consumers are Fabric Data Agents and Operational Agents, which monitor data and take action; custom agents use it through Foundry IQ. It belongs to an "IQ" family with Foundry IQ and Work IQ. — [Microsoft Fabric blog](https://blog.fabric.microsoft.com/en-US/blog/from-data-platform-to-intelligence-platform-introducing-microsoft-fabric-iq/); [VentureBeat](https://venturebeat.com/data/microsofts-fabric-iq-teaches-ai-agents-to-understand-business-operations-not); [Info-Tech/SoftwareReviews](https://www.softwarereviews.com/research/microsoft-adopts-ontology-based-iq-layer-for-agentic-ai)
- **Fabric IQ in 2026.** Fabric IQ now feeds Microsoft 365 Copilot by default, and outside agents can query it over MCP. Forrester considers "IQ sharing" (preview), which shares governed tables and files alongside agent instructions and RDF ontologies, the more significant announcement. **Conflict:** a Microsoft post lists public MCP endpoints for the Fabric IQ Ontology as "Coming Soon", so check current availability. — [The New Stack](https://thenewstack.io/microsoft-fabric-agent-context/); [Forrester](https://www.forrester.com/blogs/microsoft-fabcon-2026-enterprise-ai-needs-a-governed-context-layer-not-just-data/); [Microsoft Fabric community post](https://community.fabric.microsoft.com/t5/Fabric-Updates-Blog/What-s-next-for-Fabric-IQ-Ontology-The-operational-context-that/ba-p/5172145)
- **Snowflake (Nov 2026) [vendor].** Business Ontology links approved business concepts (e.g., "net revenue") to the semantic views that calculate them; the ontology governs meaning while view owners keep the calculation. Horizon Context is a governed context layer on top of Horizon Catalog. Snowflake Summit 2026 added semantic views exposed over MCP, so tools such as Claude and Cursor can query them, and Snowflake's CoCo agent searches semantic views before falling back to tables. Some features (Cortex Sense, metadata connectors) are in preview. — [Snowflake: Business Ontology](https://snowflake.com/en/blog/business-ontology-context); [Snowflake: Horizon Context](https://www.snowflake.com/en/blog/horizon-context-governed-context/)

**Semantic layers and interchange**
- **Open Semantic Interchange (OSI).** The v1 spec is public on GitHub under Apache 2.0. It is a vendor-neutral model of datasets, metrics, dimensions, relationships and contexts, and it can carry synonyms and natural-language instructions for AI use. dbt positions its Semantic Layer and MetricFlow as the place where metrics are defined and governed, with OSI as the format for moving them into Snowflake, Tableau and other tools. Snowflake calls the spec "a starting point" and says governance will move to a neutral foundation. Tableau says the outputs will be donated to the Apache Software Foundation, which I could not confirm. Members include dbt Labs, Snowflake, Salesforce, Google, Databricks, AtScale, Collibra and Informatica; Snowflake cites 54 participating vendors (Nov 2026). — [Snowflake: OSI specs finalized](https://www.snowflake.com/en/blog/open-semantic-interchanges-specs-finalized/); [dbt: OSI spec updates](https://www.getdbt.com/blog/the-osi-spec-updates); [Tableau](https://www.tableau.com/blog/ending-semantic-drift-unified-business-logic-foundation); [Snowflake Horizon Context](https://www.snowflake.com/en/blog/horizon-context-governed-context/)
- **Databricks Unity Catalog business semantics.** Metric views are central metric and KPI definitions governed by Unity Catalog and queryable from SQL, dashboards, Genie agents and external tools. Recent additions include window measures and composable metrics. — [Databricks docs: metric views](https://docs.databricks.com/aws/en/business-semantics/metric-views); [Unity Catalog business semantics](https://docs.databricks.com/aws/en/business-semantics). A third party describes a richer "Unity Catalog Metrics" layer announced at Data + AI Summit 2026. [unverified] — [Atlan](https://atlan.com/know/ai-agent/semantic-layer/unity-catalog-semantic-layer/)

**Agent memory systems**
- **[older, 2023] MemGPT** introduced OS-inspired "virtual context management", with memory tiers paged in and out of the context window. — [arXiv 2310.08560](https://arxiv.org/abs/2310.08560)
- **Mem0** (paper, Apr 28, 2025) reports a 26% relative improvement over OpenAI's memory on an LLM-as-a-Judge metric (LOCOMO), 91% lower p95 latency and more than 90% token-cost savings versus full context. The graph variant scores about 2% higher. [self-reported] — [arXiv 2504.19413](https://arxiv.org/abs/2504.19413)
- **Zep** (paper, Jan 20, 2025) is a memory layer built on Graphiti, "a temporally-aware knowledge graph engine". It reports 94.8% versus MemGPT's 93.4% on Deep Memory Retrieval, and on LongMemEval "accuracy improvements of up to 18.5%" with 90% lower latency than baselines. [self-reported] — [arXiv 2501.13956](https://arxiv.org/abs/2501.13956)
- **Benchmarks in 2026 are not comparable.** Mem0 self-reports about 92.5% on LoCoMo and 94.4% on LongMemEval at roughly 6,900 tokens per query (managed platform). Zep's 2026 claims (e.g., 94.7%) use different models and setups. Letta scores 74.0 on LoCoMo with gpt-4o-mini and filesystem storage. Vendors dispute LoCoMo methodology, and one independent blog test of Mem0's open-source edition scored 32.4% on LongMemEval. — [Mem0: State of AI Agent Memory 2026](https://mem0.ai/blog/state-of-ai-agent-memory-2026); [Atlan comparison](https://atlan.com/know/best-ai-agent-memory-frameworks-2026/); [independent test (DEV)](https://dev.to/everest_an/-i-benchmarked-ai-agent-memory-in-2026-and-the-numbers-tell-a-different-story-than-the-marketing-2ae4)
- **Managed memory services:**
  - AWS: Bedrock AgentCore became GA on Oct 13, 2025, with AgentCore Memory as a managed component. Later additions include episodic memory and cross-account memory access (Jun 2026). — [AWS GA](https://aws.amazon.com/about-aws/whats-new/2025/10/amazon-bedrock-agentcore-available); [AWS episodic memory](https://aws.amazon.com/blogs/machine-learning/build-agents-to-learn-from-experiences-using-amazon-bedrock-agentcore-episodic-memory/); [AWS cross-account](https://aws.amazon.com/about-aws/whats-new/2026/06/agentcore-memory-cross-account-access/)
  - Google: Vertex AI Agent Engine Memory Bank (public preview, July 2025) "dynamically generate[s] long-term memories based on users' conversations". Its GA status was unclear in my sources. — [Google Cloud blog](https://cloud.google.com/blog/products/ai-machine-learning/vertex-ai-memory-bank-in-public-preview); [Memory Bank docs](https://docs.cloud.google.com/agent-builder/agent-engine/memory-bank/overview)
  - Anthropic: a client-side memory tool, plus Managed Agents memory stores (beta). [vendor] — [Anthropic Managed Agents memory](https://platform.claude.com/docs/en/managed-agents/memory)
  - Apache Flink Agents 0.2.0 (Feb 2026) overhauled memory with three memory types. — [Apache Flink](https://flink.apache.org/2026/02/06/apache-flink-agents-0.2.0-release-announcement/)

### Inferences
- A practical reference architecture has four knowledge planes, each exposed to agents as governed MCP tools under the agent's identity and permissions:
  1. A semantic or metric layer (dbt/MetricFlow, Unity Catalog metric views, Snowflake semantic views, interchanged through OSI) for every number an agent quotes.
  2. An ontology or knowledge graph (Palantir, Fabric IQ, Snowflake Business Ontology) for entities, relationships and permissible actions.
  3. Hybrid document retrieval (BM25 plus embeddings, contextual chunking, reranking) for unstructured knowledge.
  4. Memory for user, session and episodic state.
- Low-cost default for documents: hybrid search plus reranking plus contextualized chunks. Use GraphRAG-style indexing only where global sensemaking across a corpus is needed; lazy, query-time graph construction keeps indexing cost close to vector RAG.
- Semantic layers are the main defense against text-to-SQL metric drift in analytics agents. Agents should query governed metrics rather than raw tables. Snowflake's CoCo already does this by checking semantic views before falling back to tables.
- Treat memory as a governed data product with provenance, retention and deletion rules (privacy), and with evals on your own traffic. Vendor LoCoMo and LongMemEval numbers are not comparable across setups.
- Given Gartner's 60% forecast, budget data-readiness work (definitions, quality, lineage, access policy) before agent build-out, and assess readiness per use case.

### Gaps
- **Data products / data mesh:** I gathered no 2025–2026 sources on how data products are packaged or contracted for agent consumption. This needs separate research.
- **Cube and AtScale:** product specifics were not researched; AtScale appears only as an OSI member.
- **Gartner's formal definition of AI-ready data** (its criteria and survey sample size) could not be verified, because the press release returned HTTP 403 and I relied on search excerpts.
- **Catalog agent features** in Unity Catalog and Snowflake Horizon (lineage for agents, agent identities, ABAC) were not examined in depth.
- **Memory benchmarks:** I found no independent, like-for-like benchmark of memory systems.

## 3. Process intelligence and real-time foundations: process mining, digital twin of an organization, event streaming

### Takeaway
Process-mining vendors have recast themselves as suppliers of "process context" to agents. They expose event-log-derived process models, KPIs and write-back actions through MCP (Celonis since Nov 2025) or through assistants and agents (SAP Signavio's Joule, GA Feb 2026). Gartner formalized the digital-twin-of-an-organization (DTO) category with its first Magic Quadrant (Jul 27, 2026), which vendors quote as describing DTO as a "sensory system and governance plane to support autonomous business operations". Kafka/Flink vendors have shipped event-driven agent runtimes that run on live streams and serve fresh context over MCP: Confluent Streaming Agents (GA Q2 2026) and Apache Flink Agents (0.2.0, Feb 2026).

### Cited Findings
**Process mining as agent context**
- **Celonis** (Celosphere, Nov 4, 2025) launched a Process Intelligence MCP server, billed as "the first MCP server built for process intelligence" [vendor], to give agents "dynamic operational context" for context-aware actions. It also announced a Databricks partnership that feeds Celonis intelligence into Agent Bricks. — [Celonis press release](https://www.celonis.com/news/press/celonis-unveils-platform-innovations-to-power-the-ai-driven-composable-enterprise); [Constellation Research](https://www.constellationr.com/insights/news/celonis-makes-case-process-context-agentic-ai-forges-databricks-partnership)
- Microsoft's connector documentation (preview) says the Celonis MCP server gives agents tools to "search for relevant information, get real-time process context, trigger actions in external systems, and write back decisions to Celonis". — [Microsoft Learn: Celonis MCP Server connector](https://learn.microsoft.com/en-us/connectors/celonismcpserver)
- At Celonis:Next 2026, Celonis expanded its Agent Toolkit over MCP so that external agents (e.g., Microsoft Copilot Studio, Amazon Bedrock) can pull in operational context. — [Celonis](https://www.celonis.com/news/article/finally-enterprise-ai-gets-the-context-it-needs-to-succeed-celonis-next-2026)
- **SAP Signavio:**
  - Joule with SAP Signavio became GA in Feb 2026. It is a "process companion" that gives access to Signavio process context across Joule-compatible SAP apps; for example, it can find who owns a process from diagram attributes or describe a process diagram in plain language. — [SAP News, Feb 2026](https://news.sap.com/2026/02/process-conversation-joule-sap-signavio-solutions-generally-available/)
  - Five Joule Agents entered beta in Nov 2025, covering onboarding, user experience, process content recommendations, dashboards and SIGNAL query interpretation, and business use-case translation. — [PEX Network](https://www.processexcellencenetwork.com/process-mining/news/sap-signavio-announces-beta-launch-of-5-new-joule-agents-to-boost-process-transformation)
  - A Process Consulting Agent applies process mining across SAP and non-SAP systems to find bottlenecks and recommend where agents could help. It is reported GA in May–June 2026. [secondary] — [Futurum](https://futurumgroup.com/insights/sap-links-ai-agents-to-business-processes-and-oversight/)
  - "SAP Company Memory" is in preview as a single source of rules, standards and process know-how for people and agents. Bi-directional agent-to-agent (A2A) support for Joule is slated for GA in Q4 2026. [forward-looking] — [SAP News, May 2026](https://news.sap.com/2026/05/future-enterprise-autonomous/); [Futurum](https://futurumgroup.com/insights/sap-links-ai-agents-to-business-processes-and-oversight/)
  - Analyst view: Signavio supplies process evidence and operating context, while other SAP products usually carry out the customer-facing action. — [Futurum](https://futurumgroup.com/insights/sap-links-ai-agents-to-business-processes-and-oversight/)

**Digital twin of an organization (DTO)**
- Gartner published its first Magic Quadrant for DTO Platforms on Jul 27, 2026, covering 18 vendors. Vendor pages quote Gartner describing a DTO as a "sensory system and governance plane to support autonomous business operations" and as a "dynamic software model that relies on operational and contextual data". ARIS, SAP and Celonis, among others, report Leader placements. Gartner published Critical Capabilities on Aug 5, 2026, with categories including AI capabilities and event processing. [vendor-relayed; the MQ text itself was not accessed] — [ARIS](https://aris.com/newsroom/aris-recognized-as-a-leader-in-first-gartner-magic-quadrant-for-digital-twin/); [SAP News](https://news.sap.com/?p=246579); [Celonis](https://www.celonis.com/insights/reports/gartner-magic-quadrant/digital-twin-organization); [Gartner Critical Capabilities abstract](https://www.gartner.com/en/documents/8230161)
- A trend summary says DTOs are evolving into control planes for observing, governing and optimizing AI agents as organizational actors. [secondary] — [BriefGlance](https://briefglance.com/articles/beyond-the-hype-digital-twins-emerge-as-ais-essential-governor)

**Event streaming as the real-time "nervous system"**
- Confluent Intelligence launched on Oct 29, 2025 on Kafka and Flink. At launch the Real-Time Context Engine was in Early Access and Streaming Agents were in Open Preview. — [Confluent press release via Nasdaq](https://www.nasdaq.com/press-release/confluent-launches-confluent-intelligence-solve-ai-context-gap-2025-10-29)
- Confluent's Q2 2026 update (May 19, 2026):
  - Streaming Agents are GA: "production-ready, event-driven agents running natively on Flink and Kafka" with a "four nines SLA".
  - Features include an "agent reflection pattern" (self-critique before emitting an event), an Agent Management Console (GA), testing with sample inputs, live-run monitoring and log inspection, and "everything is event-driven and replayable".
  - The Real-Time Context Engine is GA. It "continuously serves fresh context to any AI agent or application at low latency via MCP", with filters, ranges, compound queries, projections and ordering.
  - Other additions: multivariate anomaly detection (Open Preview) and `AI_DETECT_ANOMALIES` using TimesFM 2.5 (EA).
  — [Confluent blog](https://www.confluent.io/blog/2026-q2-confluent-intelligence-update/)
- Apache Flink Agents (FLIP-531; Alibaba Cloud, Ververica, Confluent, LinkedIn) treats agents as always-on, event-driven microservices that inherit Flink's fault tolerance and state management. Version 0.1.0 (preview) shipped Oct 15, 2025. Version 0.2.0 (Feb 6, 2026) added a memory overhaul and supports Flink 1.20–2.2. — [Flink Agents 0.1.0](https://flink.apache.org/2025/10/15/apache-flink-agents-0.1.0-release-announcement/); [Flink Agents 0.2.0](https://flink.apache.org/2026/02/06/apache-flink-agents-0.2.0-release-announcement/); [FLIP-531](https://cwiki.apache.org/confluence/display/FLINK/FLIP-531:+Initiate+Flink+Agents+as+a+new+Sub-Project); [Ververica](https://ververica.com/blog/alibaba-cloud-ververica-confluent-and-linkedin-join-forces-on-the-streaming-ai-agents-innovation-with-apache-flink)

### Inferences
- In 2026, process knowledge reaches agents in four main ways:
  1. Process-context tools over MCP (Celonis, Signavio/Joule) that return variants, KPIs, conformance deviations and owners.
  2. Ontology actions (Palantir, Fabric IQ) that encode which business state changes are allowed.
  3. Event streams that trigger agents and serve fresh state (Confluent, Flink Agents).
  4. SOPs and process models indexed for RAG.
  The first three are machine-checkable. The fourth is the most common and the weakest.
- Event-driven agents give replay (and with it reproducible tests and audit), backpressure and decoupling, and they shift agents from chat-triggered to signal-triggered operation. This is the practical meaning of the "nervous system" framing.
- The same process-mining machinery can observe agents: agent actions logged into the same object-centric event log as human work allow throughput, conformance and rework to be compared between the two. This is also how the DTO becomes an agent governance plane. arXiv already carries a 2026 paper titled "Agent Behavior Mining: Generative AI Agent Governance in Business Processes" ([arXiv 2606.20669](https://arxiv.org/pdf/2606.20669)); only the title was reviewed.
- For dev teams: emit agent decisions and tool calls as business events, with case and object IDs, onto the event backbone as well as into traces. Observability and process intelligence then share one source of truth.

### Gaps
- Microsoft's process-mining product (Power Automate Process Mining) and its 2025–2026 agent integrations were not researched.
- Kafka-core features relevant to agents (e.g., Kafka 4.x share groups/queues) were not verified in this session.
- I found no independent evidence that quantifies how much process context improves agent task success.
- The Gartner DTO quotes are relayed by vendors; the Gartner text itself was not accessed.

## 4. Evaluation of agents

### Takeaway
By 2026 practitioners broadly agree on how to evaluate agents (Anthropic, Jan 2026; Husain/Shankar). The core practices:
- Start from error analysis of real traces.
- Build small (20–50 task), outcome-graded suites in clean, isolated environments.
- Combine code, model and human graders, with LLM judges calibrated against humans.
- Report pass^k for consistency.
- Keep capability suites separate from regression suites.
- Layer offline evals with online monitoring.

Adoption lags: in LangChain's late-2025 survey, 52.4% ran offline evals and 37.3% ran online evals. Public agent benchmarks have documented validity flaws (mis-estimation of up to 100% relative) and usually ignore cost.

### Cited Findings
**Methodology (Anthropic, "Demystifying evals for AI agents", Jan 9, 2026)**
- **Vocabulary.** Task, trial, grader, transcript/trajectory, outcome, evaluation harness, agent harness and eval suite. Evaluating "an agent" means evaluating the harness and the model together. — [Anthropic](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)
- **Three grader types.** Code-based graders are fast, cheap, objective and reproducible, but brittle. Model-based graders are flexible and capture nuance, but they are non-deterministic and need calibration against humans. Human graders are the gold standard but slow and expensive. — [Anthropic](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)
- **Capability vs regression evals.** Capability evals should start at a low pass rate (a "hill to climb"). Regression evals should sit near 100%. Saturated capability tasks "graduate" into regression suites. "An eval at 100% tracks regressions but provides no signal for improvement." — [Anthropic](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)
- **Practices:**
  - Start with 20–50 tasks drawn from real failures.
  - Make tasks clear enough that two domain experts would agree on pass/fail, and give each a reference solution.
  - Balance "should act" and "should not act" cases.
  - Run every trial in an isolated, clean environment.
  - "Grade what the agent produced, not the path it took", and give partial credit where it fits.
  - Give LLM judges an "Unknown" option.
  - Read transcripts so failures "seem fair".
  - A persistent 0% across many trials often means the task is broken.
  — [Anthropic](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)
- **Layering ("Swiss cheese model").** Automated evals before launch and in CI/CD; production monitoring for drift; A/B tests; user feedback; manual transcript review; systematic human studies to calibrate graders. "No single evaluation layer catches every issue." — [Anthropic](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)
- **By agent type:**
  - Coding: SWE-bench Verified and Terminal-Bench, plus rubric grading of code quality.
  - Conversational: τ-Bench/τ2-Bench, with a second LLM simulating the user, state checks, turn limits and tone rubrics.
  - Research: BrowseComp, with groundedness, coverage and source-quality checks.
  - Computer use: WebArena and OSWorld, with backend and file-state checks.
  — [Anthropic](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)
- **Tool evals** (Anthropic, Sep 2025): build realistic tasks that need many tool calls and have verifiable outcomes, and avoid verifiers that are too strict. Track "the total number of tool calls, the total token consumption, and tool errors" plus runtime, and use held-out test sets to avoid overfitting. — [Anthropic](https://www.anthropic.com/engineering/writing-tools-for-agents)

**Error analysis (Hamel Husain & Shreya Shankar)**
- Error analysis is "the most important activity in evals". The workflow:
  1. Build a dataset of real traces.
  2. Open coding: free-form notes on each trace, adapted from qualitative research, without predefined checklists such as "hallucination" or "toxicity".
  3. Axial coding: group the notes into a failure taxonomy.
  4. Count and prioritize the categories.
  5. Build automated evaluators for the top failure modes.
  One domain expert acts as the quality "benevolent dictator". — [Hamel's evals FAQ](https://hamel.dev/blog/posts/evals-faq/); [FAQ: error analysis](https://hamel.dev/blog/posts/evals-faq/why-is-error-analysis-so-important-in-llm-evals-and-how-is-it-performed.html); [Pragmatic Engineer](https://newsletter.pragmaticengineer.com/p/evals); [Lenny's Newsletter](https://www.lennysnewsletter.com/p/building-eval-systems-that-improve)
- Husain reports that teams spent 60–80% of development time on error analysis and evaluation on past projects. — [Simon Willison on the evals FAQ](https://www.simonwillison.net/2025/Jul/3/faqs-about-ai-evals)
- LangChain frames agent evaluation at three granularities: run, trace and thread (multi-turn). — [LangChain: agent evals](https://www.langchain.com/resources/agent-evals)

**pass@k vs pass^k and simulated users**
- pass@k is the probability of at least one success in k trials; pass^k is the probability that all k succeed. At 75% per trial, pass^3 ≈ 42%. Use pass^k wherever consistency matters, such as customer-facing agents. — [Anthropic](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)
- τ-bench (Yao et al., Sierra; arXiv Jun 2024, ICLR 2025) introduced pass^k, with LLM-simulated users and database-state grading. GPT-4o function-calling agents succeeded on fewer than 50% of tasks, with pass^8 below 25% in retail. — [arXiv 2406.12045](https://arxiv.org/abs/2406.12045). Sierra later reported the best models crossing 80% pass^1 on retail but still struggling with consistency across runs, and noted that Anthropic model cards now report pass^k. — [Sierra blog](https://sierra.ai/blog/tau-bench-shaping-development-evaluation-agents)

**LLM-as-judge reliability and biases**
- **[older, 2023]** Strong judges such as GPT-4 reached more than 80% agreement with human preferences, "the same level of agreement between humans". The same work identified position, verbosity and self-enhancement biases and limited reasoning ability. — [Zheng et al., arXiv 2306.05685](https://arxiv.org/abs/2306.05685)
- Position bias is a consistent preference for an answer slot, measured by swapping order, and it varies by task and judge model. The authors argue that apparent verbosity and self-enhancement effects partly reflect real quality differences. — [Shi et al., arXiv 2406.07791](https://arxiv.org/abs/2406.07791)
- The CALM framework quantifies 12 bias types using perturbations. — [Ye et al., arXiv 2410.02736](https://arxiv.org/abs/2410.02736). On self-preference bias: [arXiv 2410.21819](https://arxiv.org/abs/2410.21819). Length-controlled win rates serve as a post-hoc correction for verbosity bias. — [Dubois et al., arXiv 2404.04475](https://arxiv.org/abs/2404.04475)
- An April 2026 preprint evaluates training-free mitigations (position swapping, multi-judge ensembles, calibrated rubrics), which earlier work had mostly studied in isolation. Its results on length bias were mixed. — [arXiv 2604.23178](https://arxiv.org/abs/2604.23178)

**Benchmark caveats**
- The Agentic Benchmark Checklist (ABC; Zhu, Kang et al., NeurIPS 2025) found that flaws in task setup or reward design can cause under- or over-estimation of up to 100% in relative terms:
  - In SWE-bench Verified, incorrect patches can pass the test suite.
  - In τ-bench, a trivial agent that returns empty responses scores 38% because impossible tasks count as successes, beating a GPT-4o agent.
  - 7 of 10 popular benchmarks had outcome-validity flaws.
  - Applying ABC cut CVE-Bench overestimation by 33%.
  — [arXiv 2507.02825](https://arxiv.org/abs/2507.02825)
- The Holistic Agent Leaderboard (HAL; Princeton, ICLR 2026) reports Pareto frontiers of accuracy against dollar and token cost, from 21,730 rollouts across 9 models and 9 benchmarks (about $40K). Findings:
  - Higher reasoning effort reduced accuracy in 21 of 36 runs.
  - Some web agents searched HuggingFace for a benchmark's answer key instead of solving the task.
  - The site notes agents "can be 100x more expensive while only being 1% better".
  - HAL has paused leaderboard updates to focus on reliability.
  — [arXiv 2510.11977](https://arxiv.org/abs/2510.11977); [HAL](https://hal.cs.princeton.edu/); [HAL about](https://hal.cs.princeton.edu/about). Its emphasis on cost-controlled evaluation follows "AI Agents That Matter" (Kapoor et al., 2024). — [arXiv 2407.01502](https://arxiv.org/abs/2407.01502)

**Adoption data (LangChain "State of Agent Engineering"; 1,340 responses, Nov 18–Dec 2, 2025)**
- 57.3% have agents in production. Quality is the top blocker (32%) and latency second (20%); among enterprises with 2,000+ employees, security is second (24.9%). Cost is "less frequently cited as a concern than in previous years". 89% have observability and 62% detailed tracing. 52.4% run offline evals and 37.3% online evals. 59.8% use human review and 53.3% LLM-as-judge. More than three-quarters use multiple models, and 57% do no fine-tuning. — [LangChain](https://www.langchain.com/state-of-agent-engineering)

**Tool landscape (Nov 2026)**
- Anthropic's appendix lists Harbor (containerized agent runs with a standard task format; hosts Terminal-Bench 2.0), Braintrust (offline evals, production observability, experiment tracking; `autoevals`), LangSmith (tracing, offline and online evals, datasets), Langfuse (self-hostable open-source alternative) and Arize Phoenix (open-source tracing and evals) with Arize AX (SaaS). — [Anthropic](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)
- Other widely used tools: Inspect (UK AI Security Institute's evaluation framework), DeepEval (open-source LLM evaluation framework), Ragas (RAG metrics such as faithfulness and context precision/recall), promptfoo (evals and red-teaming CLI) and W&B Weave (tracing and evals). [descriptions from project pages; not re-fetched this session] — [Inspect](https://inspect.aisi.org.uk/); [DeepEval](https://github.com/confident-ai/deepeval); [Ragas](https://docs.ragas.io/); [promptfoo](https://github.com/promptfoo/promptfoo); [W&B Weave](https://wandb.ai/site/weave)
- **Consolidation in 2026:**
  - ClickHouse acquired Langfuse (announced Jan 16, 2026); Langfuse "remains 100% open-source". — [ClickHouse](https://clickhouse.com/blog/clickhouse-acquires-langfuse-open-source-llm-observability)
  - OpenAI acquired promptfoo (reported Mar 9, 2026; the README says it stays MIT-licensed). [single source] — [Developers Digest](https://www.developersdigest.tech/blog/llm-observability-acquisitions-2026)
  - Mintlify acquired Helicone (Mar 3, 2026), and Splunk (Cisco) announced its intent to acquire Galileo (Apr 9, 2026). — [Developers Digest](https://www.developersdigest.tech/blog/llm-observability-acquisitions-2026)
  - Dynatrace acquired Arize for $915M (closed Oct 1, 2026). — [IT Brief](https://itbrief.co.uk/story/dynatrace-buys-arize-in-usd-915m-ai-observability-deal); [Constellation Research](https://constellationr.com/insights/news/dynatrace-acquires-arize-accelerates-ai-observability-efforts)

### Inferences
- A workable team loop:
  1. Run weekly error analysis on sampled production traces, led by a domain owner.
  2. Turn the resulting failure taxonomy into deterministic checks wherever possible, and into binary LLM judges with rationales elsewhere, validating each judge against human labels (agreement or TPR/TNR).
  3. Feed the outcome-graded tasks into a CI regression gate.
  4. Track capability suites separately.
  5. Report pass^k for user-facing flows, alongside cost and latency per completed task (the HAL lesson).
- Treat public benchmarks as a screening signal, not procurement evidence. Build internal benchmarks on your own environments and audit them with ABC-style outcome-validity and task-validity checks: can a trivial or "do nothing" agent pass? Can an incorrect solution pass?
- LLM-judge hygiene: swap positions for pairwise comparisons, control for length, avoid using the same model family as both judge and candidate, give judges an "Unknown" option, and recalibrate after every model change.
- Given the 2026 acquisitions, prefer tools that accept and export OpenTelemetry GenAI traces so the evaluation and observability backend can be swapped (see §5).

### Gaps
- I found no rigorous published evidence linking offline agent-eval scores to production business outcomes in enterprises.
- The promptfoo acquisition rests on one source.
- Dedicated red-teaming tools (e.g., Microsoft PyRIT, NVIDIA garak) and OWASP agentic-security guidance were not researched in this pass.
- I found no source on how faithfully LLM user simulators represent real users.

## 5. Observability and AgentOps

### Takeaway
OpenTelemetry's GenAI semantic conventions now model a full agent run as a span tree (`invoke_agent` → `chat`/`execute_tool`/`retrieval`/memory ops/`invoke_workflow`) and moved into a dedicated repository in June 2026. Nothing GenAI-specific is Stable as of Nov 2026, so teams must pin a convention version and expect renames. Tracing is widespread (89% have some observability) but online evaluation is not (37%). Operational controls such as kill switches, shadow-then-canary rollouts, circuit breakers and incident runbooks are codified mainly in practitioner writing rather than standards. Thoughtworks' Nov 2026 Radar puts agent sandboxing and threat modelling in Adopt.

### Cited Findings
**OpenTelemetry GenAI conventions: status and content**
- The spans spec is marked "Status: Development". Well-known `gen_ai.operation.name` values are `chat`, `create_agent`, `create_memory`, `create_memory_store`, `delete_memory`, `delete_memory_store`, `embeddings`, `execute_tool`, `fetch_response`, `generate_content`, `invoke_agent`, `invoke_runner`, `invoke_workflow`, `plan`, `realtime_inference`, `retrieval`, `search_memory`, `text_completion`, `update_memory`, `upsert_memory` and `user_speech`. Capturing message content is opt-in ("SHOULD NOT capture them by default") through `OTEL_INSTRUMENTATION_GENAI_CAPTURE_CONTENT`, with values `NO_CONTENT` (default), `SPAN_ONLY`, `EVENT_ONLY` and `SPAN_AND_EVENT`. Shared attributes come from main semantic conventions v1.45.0. — [OTel GenAI spans spec](https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-spans.md)
- Status as of July 2026 [secondary]:
  - No `gen_ai.*` item is Stable, and "Development status explicitly means names can still change."
  - GenAI conventions moved to `open-telemetry/semantic-conventions-genai` with v1.42.0 (Jun 12, 2026). Releases ran from v1.39.0 (Jan 12) to v1.43.0 (Jul 3).
  - v1.41.0 added streaming metrics and `invoke_workflow`, and split `invoke_agent` into client and internal spans. MCP conventions moved into the GenAI repo.
  - Renames: `gen_ai.system` → `gen_ai.provider.name`, `gen_ai.usage.prompt_tokens` → `gen_ai.usage.input_tokens`, `completion_tokens` → `output_tokens`. `gen_ai.prompt` and `gen_ai.completion` were removed. Transitions use dual emission via `OTEL_SEMCONV_STABILITY_OPT_IN`.
  - Support varies: Datadog supports the conventions natively; Langfuse ingests OTLP and maps `gen_ai.*`; Arize Phoenix's native schema is OpenInference, bridged by a translation layer; OpenLLMetry still emits deprecated attributes. Claude Code (beta), VS Code Copilot and OpenAI Codex emit OTel GenAI traces.
  — [DEV (Jul 2026)](https://dev.to/azena-ai/opentelemetrys-genai-semantic-conventions-are-not-stable-yet-heres-what-actually-shipped-in-2026-3mke)
- History: the GenAI SIG formed in April 2024 to cover LLM client tracing and later widened to model, vector DB and agent conventions. The 2025 OTel post said the initial agent convention was based on Google's AI agent white paper. — [OTel blog 2024](https://opentelemetry.io/blog/2024/otel-generative-ai/); [OTel blog 2025: AI agent observability](https://opentelemetry.io/blog/2025/ai-agent-observability/)
- `gen_ai.tool.call.id` links the model's tool request, the tool span and the next model call. `invoke_agent` is CLIENT for a remote agent service and INTERNAL for an in-process agent, matching the v1.41.0 client/internal split above. [secondary guides; the exact source of each claim among these guides was not pinned down] — [Morph: Agent tracing](https://www.morphllm.com/agent-tracing); [Hashspan: OTel GenAI conventions](https://hashspan.dev/blog/opentelemetry-genai-semantic-conventions); [DEV (Jul 2026)](https://dev.to/azena-ai/opentelemetrys-genai-semantic-conventions-are-not-stable-yet-heres-what-actually-shipped-in-2026-3mke)
- Azure AI Foundry provides multi-agent observability across Foundry, Microsoft Agent Framework, LangChain, LangGraph and the OpenAI Agents SDK. [vendor] — [Microsoft Tech Community](https://techcommunity.microsoft.com/blog/azure-ai-foundry-blog/-/4456039)

**Adoption**
- 89% have some observability and 62% detailed tracing, but only 37.3% run online evals, which are the main way to catch quality drift in production. — [LangChain State of Agent Engineering](https://www.langchain.com/state-of-agent-engineering)

**Release, rollback and incident patterns (practitioner sources, 2026; not standards)**
- **Kill switches.** Keep the switch in a config store so it can be flipped without a deployment, check it before every decision, and audit its use. Agents that "call tools, spend money, or touch private data" need one from their first production configuration. Operational metrics include kill-switch activations, mitigation time, canary deltas and audit completeness. — [Cohorte (DEV)](https://dev.to/cohorte-ai/your-ai-agent-needs-a-kill-switch-heres-how-to-build-one-5gg5); [DEV: kill switch](https://dev.to/pat9000/your-ai-agent-does-not-need-observability-it-needs-a-kill-switch-kk4); [AI Engineer: Agents need feature flags](https://www.ai.engineer/talks/zU4EagB311U-agents-need-feature-flags)
- **Shadow, then canary.** In shadow mode the new version handles real traffic but its actions are only logged; this tests action selection against what a person would do. A small canary (e.g., 5% of requests) then tests actions that actually execute. — [Rework deployment guide](https://resources.rework.com/vi/libraries/ai-agents/deploying-ai-agents-to-production); [DEV: shadow deployments for agents](https://dev.to/saurav_bhattacharya/shadow-deployments-for-ai-agents-canary-your-prompt-changes-before-they-burn-production-k66); [Level Up: blue-green and shadow](https://levelup.gitconnected.com/deploying-agents-with-confidence-blue-green-deployments-and-shadow-mode-testing-fbae4a2c8b23)
- **Incident response.** Phases are detection, containment (kill switches, feature flags, shadow routing), eradication, recovery and postmortem. Provide a global hard stop that revokes tool permissions and halts queued jobs, and per-agent circuit breakers so one runaway agent cannot drain shared token budgets. Log every production LLM call with full context before any incident happens. — [Digital Applied playbook](https://www.digitalapplied.com/blog/agentic-workflow-incident-response-playbook-2026); [Tian Pan: incident runbook](https://tianpan.co/blog/production-ai-incident-response-runbook)
- **Versioning and replay.** Langfuse combines observability, evals and prompt management in one platform. — [ClickHouse](https://clickhouse.com/blog/clickhouse-acquires-langfuse-open-source-llm-observability). Confluent Streaming Agents are "event-driven and replayable", with sample-input tests, live-run monitoring and an Agent Management Console. — [Confluent](https://www.confluent.io/blog/2026-q2-confluent-intelligence-update/)

**Thoughtworks guidance**
- Vol. 34 (Apr 2026) makes zero-trust architecture (identity-based access, least privilege, "never trust, always verify") a sensible default for building and operating agents, and structured LLM output a sensible default for programmatic consumers. It flags rework rate (a DORA-style metric) as an early warning sign. — [Thoughtworks Radar techniques](https://www.thoughtworks.com/radar/techniques)
- Vol. 35 (early Nov 2026) argues that as agents take on longer tasks, the hardest problems shift to securing their environment and access controls. The engineering harness needs "ongoing evaluation, security controls, access management, and maintenance". Eleven items are in Adopt, including agent sandboxing and threat modelling. It warns against "human in the loop theater", where approval becomes ritual rather than a real check. — [Thoughtworks press release](https://www.thoughtworks.com/about-us/news/2026/thoughtworks-technology-radar-highlights-stronger-controls); [IT Brief](https://itbrief.co.uk/story/thoughtworks-urges-tighter-controls-as-ai-agents-spread); [TechIntelPro](https://techintelpro.com/news/AI/Agentic-AI/thoughtworks-radar-ai-agents-scale-needs-stronger-controls)

### Inferences
- **Minimal AgentOps stack:**
  - OTel GenAI instrumentation with a pinned convention version and a dual-emission plan for renames.
  - Content capture off by default, enabled per environment with PII redaction.
  - Trace context propagated into tool backends and MCP servers.
  - Per-span token and cost attributes rolled up per task.
  - Online evaluators sampling traces.
  - Dashboards for task success, pass^k on canary traffic, escalation rate, tool-error rate, cost per completed task and p95 latency.
- **Release unit.** Treat model ID, prompt, tool schemas, retrieval/index config, guardrail config and memory policy as one versioned release. Promote through eval gates, shadow, canary and full rollout, with flag-based rollback and a kill switch tied to circuit breakers on spend, step count and error rate.
- **Spec churn.** Because the OTel GenAI conventions are still in Development, budget for telemetry migrations (as with the 2025–2026 renames) and avoid hard-coding attribute names into dashboards without an abstraction layer.

### Gaps
- I found no standards-body guidance (e.g., from NIST or ISO) specifically for agent incident response; the patterns above come from practitioners.
- The status of evaluation-result events in the OTel GenAI conventions was not verified.
- I found no empirical studies on how well quality-drift detection works for agents.

## 6. Reliability engineering: quantifying reliability, guardrails, idempotent and reversible tools, retries and checkpoints, sandboxes, human fallback

### Takeaway
Reliability is now measured separately from capability, through pass^k and multi-run consistency (τ-bench) and Princeton's four-dimension framework (consistency, robustness, predictability, safety), which finds capability has grown much faster than reliability. Long-horizon analyses show that per-step errors compound and even "self-condition", rising as earlier mistakes accumulate in context. The engineering response:
- Deterministic validators and schema-constrained outputs.
- Allow-listed, idempotent and compensatable tools.
- Durable execution with recorded side effects.
- Sandboxes and hard stopping conditions.
- Human escalation that is meaningful, not ceremonial.

### Cited Findings
- **[older, Dec 2024; still widely cited]** Anthropic: "The autonomous nature of agents means higher costs, and the potential for compounding errors. We recommend extensive testing in sandboxed environments, along with the appropriate guardrails." It also recommends stopping conditions (e.g., a maximum number of iterations) and starting with the simplest workable design, workflows before agents. — [Anthropic, Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)
- Sinha et al. (arXiv Sep 2025; ICLR 2026) note that with per-step success p, success over t steps falls off as p^t. Above a high per-step accuracy threshold, small step gains produce large horizon gains. Per-step error rates rise as a task progresses ("self-conditioning" on the model's own earlier errors). Model scale and test-time compute help. — [arXiv 2509.09677](https://arxiv.org/abs/2509.09677)
- METR (Mar 2025): the 50%-success time horizon for software tasks doubled roughly every 7 months from 2019 to 2024. — [arXiv 2503.14499](https://arxiv.org/abs/2503.14499). A 2026 survey treats independent per-step error compounding as a useful null model, not an empirically confirmed law. — [arXiv 2608.06663](https://arxiv.org/pdf/2608.06663)
- Rabanser, Kapoor, Kirgis, Liu, Utpala and Narayanan (Princeton; arXiv Feb 2026; ICML 2026) argue that average success rate misses what makes agents trustworthy, and borrow reliability practice from aviation and nuclear power. They define four dimensions (consistency, robustness, predictability, safety), propose 12 metrics, and test 15 models, finding capability "has grown much faster than reliability over the past two years". A dashboard is at hal.cs.princeton.edu/reliability. — [arXiv 2602.16666](https://arxiv.org/abs/2602.16666)
- τ-bench: GPT-4o-era agents fell below 25% pass^8 in retail despite about 61% single-trial success. — [arXiv 2406.12045](https://arxiv.org/abs/2406.12045)
- **Durable execution and idempotency [mostly vendor sources]:**
  - Temporal runs LLM calls, tool calls and external API calls as Activities and records their results in workflow history, so a resumed run skips completed calls instead of repeating them. Temporal also runs LangGraph graphs as durable workflows through a plugin.
  - LangGraph checkpoints persist state between nodes, and Diagrid's FAQ says checkpointing alone is "usually not enough" for production agents.
  - Idempotency remains the developer's job. The recommended order is idempotent tool contracts, receipts and reconciliation, explicit "unknown outcome" states, and compensation, followed by checkpointing and retries.
  — [Temporal + Pydantic AI](https://temporal.io/blog/build-durable-ai-agents-pydantic-ai-and-temporal); [Temporal LangGraph plugin](https://temporal.io/blog/temporal-langgraph-plugin-durable-execution); [Temporal AI docs](https://docs.temporal.io/ai); [Diagrid FAQ](https://www.diagrid.io/faq/durable-execution/how-can-langgraph-agents-preserve-state-across-failed-tool-calls); [HackerNoon](https://hackernoon.com/durable-agent-workflows-need-idempotency-before-they-need-checkpoints); [DBOS](https://dbos.dev/blog/durable-execution-crashproof-ai-agents)
- **Tool design for reliability** (Anthropic, Sep 2025): consolidate multi-step operations into single higher-level tools (e.g., `schedule_event` instead of list plus create); use unambiguous parameter names (`user_id`, not `user`) and strict input/output models; return actionable error messages. — [Anthropic](https://www.anthropic.com/engineering/writing-tools-for-agents)
- **Deterministic constraints.** Thoughtworks lists structured output from LLMs as a sensible default. — [Thoughtworks](https://www.thoughtworks.com/radar/techniques). Vendors now offer schema-constrained outputs and strict tool-input validation (e.g., Anthropic structured outputs and `strict: true` tools). [vendor] — [Anthropic structured outputs docs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs)
- **Action allow-listing.** Palantir's Ontology MCP restricts agents to predefined actions. — [Palantir OMCP](https://www.palantir.com/docs/foundry/ontology-mcp). Confluent Streaming Agents use a reflection (self-critique) step before emitting events, on a replayable event log. — [Confluent](https://www.confluent.io/blog/2026-q2-confluent-intelligence-update/)
- **Sandboxes and human oversight.** Thoughtworks Vol. 35 places agent sandboxing in Adopt and warns against "human in the loop theater". — [IT Brief](https://itbrief.co.uk/story/thoughtworks-urges-tighter-controls-as-ai-agents-spread). Diagrid notes that durable-execution choices do not remove the need to decide "when a human gets pulled in". — [Diagrid FAQ](https://www.diagrid.io/faq/durable-execution/how-can-langgraph-agents-preserve-state-across-failed-tool-calls)

### Inferences
- **Compounding arithmetic** (my calculation, assuming independent steps): 95% per-step success over 20 steps gives 0.95^20 ≈ 36% end-to-end; at 99% it is about 82%. pass^k at 90% per-trial success is 0.9^5 ≈ 59% for k=5. Long workflows therefore need verifiable checkpoints, with deterministic validators and state checks after each critical step, so errors are caught rather than compounded. Self-conditioning suggests clearing failed attempts from context, or restarting the sub-task in a fresh sub-agent, rather than letting errors pile up.
- **Reliability checklist for tools and agents:**
  - Idempotency keys on every write tool.
  - Propose, validate, commit (two-phase) for irreversible actions.
  - Compensating actions or undo paths.
  - Dry-run and read-only modes by default.
  - Hard budgets on steps, tokens, dollars and wall-clock time.
  - Durable execution with recorded side effects.
  - Sandboxed code execution with least-privilege credentials.
  - Escalation on low confidence or policy hits, with a reviewer SLA and enough evidence for a real decision, sampled and audited to avoid rubber-stamping.
- **Reporting.** Report reliability metrics (pass^k, variance across runs, calibration, and the severity of failures) next to accuracy in every eval and release review, as Princeton's framework suggests.

### Gaps
- I found no standard definitions of agent reliability SLOs or error budgets.
- I found no independent effectiveness data for guardrail frameworks (e.g., NeMo Guardrails, Guardrails AI); they were not researched.
- Reversibility and undo patterns beyond compensation and two-phase commit are thinly sourced.

## 7. Cost and performance: token economics, routing, caching, batching, latency, FinOps for AI, unit economics

### Takeaway
The price of a fixed level of capability is falling fast: Epoch estimates about 13x per year, slower for mature capability levels. Agentic workloads, however, consume far more tokens, and benchmark-running costs have stayed flat or risen, so total spend keeps growing. 98% of FinOps practitioners now manage AI spend (State of FinOps 2026), and the FinOps Foundation pushes unit metrics such as cost per query or workflow over raw token counts. The proven levers:
- Prompt caching: reads at about 10% of base input price (or less), writes at a premium.
- Batch processing: about 50% off.
- Effort tuning and model routing, measured per route on your own evals.
- Context hygiene.
- Semantic caching for high-repetition traffic only, because of false-positive risk.

All of these should be judged by cost per completed task, not cost per token.

### Cited Findings
**Price trends**
- Epoch AI's newer analysis finds the price for a given performance level fell about 47% per quarter (about 13x per year), averaged over five benchmarks across three years. Game puzzles fell 7–10x per year and math 16–19x per year. Newly state-of-the-art performance gets cheaper at 66% per quarter (75x per year), against 32% per quarter (4.7x per year) two years later. — [Epoch AI: The plunging price of thought](https://epoch.ai/publications/the-plunging-price-of-thought); [secondary summary](https://pasqualepillitteri.it/en/news/21044/epoch-ai-ai-prices-fall-47-percent-quarter)
- Epoch's earlier estimate (Mar 2025) was 9–900x per year across six benchmarks; for example, the price of GPT-4-level PhD-science performance fell 40x per year. — [Epoch AI: LLM inference price trends](https://epoch.ai/blog/llm-inference-price-trends); [Epoch data insight](https://epoch.ai/data-insights/ai-inference-price-trends)
- Counter-evidence: Gundlach et al. (MIT FutureTech, arXiv Nov 2025) find "the cost of running benchmarks ... has remained flat or increased". They estimate underlying algorithmic efficiency gains at about 3x per year once competition and hardware effects are removed. — [arXiv 2511.23455](https://arxiv.org/abs/2511.23455)
- Example of price spread within one vendor (Anthropic list prices, early Nov 2026), per million input/output tokens: $0.10/$0.50 for Haiku 5.5 (prompts up to 100K), $2/$10 for Sonnet 5.5, $4/$20 for Opus 5.5 and $8/$40 for Fable 5.2, an 80x spread on input. "Fast mode" gives up to 2.5x output speed at premium prices ($8/$40 on Opus 5.5, twice standard). [vendor; Anthropic API reference, cached 2026-11-03] — [Anthropic pricing](https://platform.claude.com/docs/en/about-claude/pricing); [Fast mode](https://platform.claude.com/docs/en/build-with-claude/fast-mode)

**Prompt caching and batching**
- **Anthropic prompt caching** [vendor; Anthropic API reference, cached 2026-11-03]:
  - The cache is a prefix match: any byte change invalidates everything after it, and render order is tools, then system, then messages.
  - Writes cost 1.25x base input for a 5-minute TTL or 2x for a 1-hour TTL. Reads cost about 0.1x base input (0.05x on Opus 5.5 and Sonnet 5.5; 0.025x on Fable 5.1/5.2). With the 5-minute TTL, two requests break even.
  - Cache reads do not count toward input-token rate limits on most models.
  - The minimum cacheable prefix is 512–4,096 tokens depending on the model.
  - Verify hits with `usage.cache_read_input_tokens`.
  — [Prompt caching docs](https://platform.claude.com/docs/en/build-with-claude/prompt-caching); [Pricing](https://platform.claude.com/docs/en/about-claude/pricing)
- **Anthropic Batch API:** 50% off every token, including cache reads and writes (the discounts stack). Batches are single-shot with no mid-batch tool loop, which suits evaluation runs, backfills and scheduled jobs. [vendor] — [Batch processing docs](https://platform.claude.com/docs/en/build-with-claude/batch-processing); [Cost optimization docs](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence)
- **OpenAI:** caching engages automatically for prompts over 1,024 tokens. The cached-input discount is model-specific, reported at 0.1x on the newest models to 0.25x on GPT-4.1. [secondary; verify on OpenAI's pricing page] — [Artificial Analysis: caching](https://artificialanalysis.ai/models/caching); [DEV](https://dev.to/rikuq/openai-prompt-caching-explained-automatic-free-to-enable-90-off-cached-input-tokens-7bn)
- **Google:** with implicit caching, customers pay "only 10% of standard input token cost" for cached tokens on Gemini 2.5 and later. Explicit caching discounts are 90% on 2.5 and later and 75% on 2.0. — [Google Developers Blog](https://developers.googleblog.com/zh-hans/gemini-2-5-models-now-support-implicit-caching); [Vertex AI context cache docs](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/context-cache/context-cache-overview)
- **Anthropic cost guidance** [vendor]: optimize "cost per completed task, not cost per token". Before building a multi-model cascade, measure the most capable model at lower effort, because caches are model-scoped and a cascade loses cache reuse. Context editing rewrites the cached prefix and in Anthropic's measured run cost more than it saved. — [Cost optimization docs](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence)

**Routing and cascades**
- **[older, Jun 2024] RouteLLM:** routers trained on preference data cut cost by more than 85% on MT Bench, 45% on MMLU and 35% on GSM8K versus sending everything to the strong model. A secondary summary gives 3.66x savings at 95% of GPT-4 quality on MT Bench. — [arXiv 2406.18665](https://arxiv.org/abs/2406.18665); [Berkeley Sky Lab: RouteLLM](https://sky.cs.berkeley.edu/project/routellm/)
- **[older, May 2023] FrugalGPT** (a sequential LLM cascade) claims up to 98% cost reduction while matching GPT-4. This is a best case; a later review of the same numbers finds up to 60% reduction with a 0.80% drop in reward-model score, possibly excluding the scorer's own cost. — [arXiv 2305.05176](https://arxiv.org/abs/2305.05176); [Stanford review of routing vs cascades](https://web.stanford.edu/~shuhuiq/blog/review-routing-cascades.html)
- Router decisions can be adversarially manipulated ("Rerouting LLM Routers", 2025). — [arXiv 2501.01818](https://arxiv.org/abs/2501.01818)
- HAL found higher reasoning effort reduced accuracy in 21 of 36 runs, so more compute does not always help. — [arXiv 2510.11977](https://arxiv.org/abs/2510.11977)

**Semantic caching**
- vCache (Feb 2025) shows that a global similarity threshold, as in GPTCache and similar caches, forces a trade-off between hit rate and errors. It learns a threshold for each cached embedding under a user-set error bound and reports up to 12.5x higher hit rates and up to 26x lower error rates (v4; v5 states up to 6x). — [arXiv 2502.03771](https://arxiv.org/abs/2502.03771)
- In a banking-FAQ study, a fixed 0.7 threshold gave false-positive rates up to 99% for some embedding models. Getting below 5% false positives required a multi-layer design. — [InfoQ](https://www.infoq.com/articles/reducing-false-positives-retrieval-augmented-generation)
- A practitioner synthesis puts the "honest range" for production semantic caching at 20–45% hit rate. A vendor case reports hit rate rising from 18% to 67%, 0.8% false positives and a 73% API-cost cut at a 0.92 threshold (unaudited). — [DEV](https://dev.to/gauravdagde/llm-semantic-caching-the-95-hit-rate-myth-and-what-production-data-actually-shows-8ga); [VentureBeat](https://venturebeat.com/orchestration/why-your-llm-bill-is-exploding-and-how-semantic-caching-can-cut-it-by-73)

**FinOps for AI**
- **State of FinOps 2026** (FinOps Foundation; 1,192 respondents; Feb 2026):
  - 98% manage AI spend. The prior-year baseline is reported inconsistently (63% in 2025 per one outlet, 31% "two years ago" per another).
  - Coverage of other areas: SaaS 90%, licensing 64%, data center 48%.
  - AI cost management is the most-wanted skill (58%).
  - The top challenge in applying FinOps to AI is visibility into AI costs, followed by allocating them to business units and determining AI ROI.
  — [Linux Foundation press release](https://www.linuxfoundation.org/press/state-of-finops-survey-ai-value-and-skills-top-priorities-as-finops-matures-across-technology-value-98-manage-ai-90-saas-64-licensing-48-data-center-1); [data.finops.org](https://data.finops.org/); [CFO Dive](https://www.cfodive.com/news/finops-teams-gain-clout-ai-costs-climb/812951/)
- **FinOps Foundation, "Token economics" (May 2026).** Token economics extends unit economics to "the variable cost of intelligence computation itself" and requires "metering of token quality alongside token quantity", because "an organization that tracks only volume will systematically misattribute cost". It recommends "unit cost metrics (cost per query, cost per user, cost per workflow)" and warns that token-only views leave out fixed and semi-fixed costs. — [FinOps Foundation](https://finops.org/insights/token-economics-the-atomic-unit-of-ai-value/)
- The Linux Foundation launched a Tokenomics Foundation at FinOps X 2026 (June 2026), working alongside the FinOps Foundation on enterprise AI cost practice. — [CIO Dive](https://www.ciodive.com/news/foundation-tackle-ai-token-cost-management/822839/)
- Microsoft's FinOps toolkit, based on the FOCUS spec, computes unit cost per token as BilledCost ÷ ConsumedQuantity. — [Microsoft Tech Community](https://techcommunity.microsoft.com/blog/finopsblog/managing-azure-openai-costs-with-the-finops-toolkit-and-focus-turning-tokens-int/4413886). Bain defines unit economics as a use case's fully loaded cost divided by its outcomes, tracked to see whether it falls as volume grows. — [Bain](https://www.bain.com/insights/finops-for-ai-from-managing-costs-to-maximizing-value/)
- Thoughtworks Vol. 35 notes that AI cost goes beyond model pricing to routing, batching and infrastructure. — [IT Brief](https://itbrief.co.uk/story/thoughtworks-urges-tighter-controls-as-ai-agents-spread). Gartner names escalating costs among the top reasons it expects more than 40% of agentic projects to be canceled by 2027. — [Gartner](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027). Latency is the second-largest blocker to production (20%). — [LangChain](https://www.langchain.com/state-of-agent-engineering)

### Inferences
- **Unit economics formula** (synthesis):
  - **Cost per completed task** = [model tokens, each type at its own rate (uncached input, cache writes, cache reads, output, reasoning), + tool/API fees + sandbox/compute + retrieval/vector/search + observability and online-eval overhead + human review minutes × loaded rate + P(error) × remediation cost] ÷ tasks verifiably completed.
  - Compare this with **human cost per task**: loaded hourly rate × handle time, adjusted for human error and rework.
  - Retries (pass@k-style) and escalations must be counted in the numerator. pass^k shows how often escalation will happen.
- **Worked example** (illustrative numbers I chose, not sourced): base rates of $3 per million input and $15 per million output, cache writes at 1.25x and reads at 0.1x. A task uses 1.0M input tokens over its turns (85% cache reads, 5% writes, 10% uncached) and 20K output tokens.
  - Token cost ≈ 0.85×$0.30 + 0.05×$3.75 + 0.10×$3.00 + 0.02×$15 ≈ $1.04, against $3.30 uncached, a saving of about 68%.
  - If 80% of tasks complete autonomously and 20% escalate to a 10-minute human fix at $60/h ($10), plus 10% spot-review at 2 minutes ($0.20 averaged), the cost is ≈ $1.04 + $2.00 + $0.20 = $3.24 per completed task.
  - A 15-minute human-only baseline costs $15.
  - The escalation rate, not the token price, dominates. This is why reliability work (§6) is also cost work.
- **Lever order:**
  1. Caching through stable-prefix design.
  2. Context hygiene: trim tool outputs and avoid re-sending large documents.
  3. Batch for anything no one is waiting on, including evals.
  4. Effort and model selection per route, measured on your own evals and judged per completed task.
  5. Routers or cascades only if step 4 is insufficient, accounting for lost cache reuse and router attack surface.
  6. Semantic caching only for FAQ-like, highly repetitive traffic, with entity checks and a labeled false-positive budget.
  7. Hard budgets, per-agent circuit breakers and showback/chargeback through FOCUS-style cost data.
- **Latency budgets:** split p95 into time to first token + generation time + Σ(tool latency) × steps. Parallelize independent tool calls, use smaller or lower-effort models on sub-steps, stream output, and rely on caching to cut time to first token. Fast or priority tiers trade money for speed.

### Gaps
- OpenAI and Google batch discounts were not verified in this session; only Anthropic's 50% comes from vendor documentation.
- I found no authoritative cross-industry benchmark of agent cost per completed task against human cost per task.
- The FinOps Foundation's formal "FinOps for AI" working-group documents (beyond the insights articles) and its "State of Tokenomics: September 2026" report were not accessed.
- I found no vendor-neutral, quantitative guidance on latency budgets for multi-step agents.
- Epoch's "13x/year" publication date was not confirmed, and cached-input discounts for OpenAI models rest on secondary sources.
