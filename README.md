# The Autonomous Enterprise

Research briefing and team plan for the Gen AI engineering team: what the "autonomous enterprise" really means as of November 2026, the concepts the team needs, and a phased 24-month implementation roadmap.

**Live site:** https://kiaanwankhede.github.io/PROJ_AUTONOMOUS/

## What's in this repository

| Path | Contents |
|---|---|
| `reports/Autonomous enterprise concepts and roadmap.md` | The full research report: about 14,650 words with 223 linked sources |
| `research_notes/Autonomous enterprise concepts and roadmap/` | Notes from the six research streams: definitions and market, agent architecture and protocols, data/evals/AgentOps, governance/security/regulation, adoption evidence, and implementation and team skills |
| `site/` | Page template (`template.html`) and build script (`build.mjs`) |
| `.github/workflows/publish-site.yml` | Publishes the site automatically |

## How the site stays up to date

Nothing needs to be run by hand. Whenever the report or the page template changes, the **Publish site** workflow rebuilds the page and publishes it to the `gh-pages` branch, and GitHub Pages serves it at the link above within a minute or two.
