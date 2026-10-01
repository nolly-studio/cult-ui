<a href="https://www.cult-ui.com">
  <img src="apps/www/public/og.png" alt="Cult UI: Shadcn, expanded. Free, open-source animated components for shadcn/ui." width="100%">
</a>

# Cult UI

**150+ animated components, all free.** Including 58 just added. Open source, built to drop into any shadcn/ui project.

[Browse components](https://www.cult-ui.com/docs/components/dynamic-island) · [Docs](https://www.cult-ui.com/docs) · [Installation](https://www.cult-ui.com/docs/installation) · [Changelog](https://www.cult-ui.com/docs/changelog)

## Install

Every component is a shadcn/ui registry item. The CLI copies the source into your project, so you own the code.

```bash
npx shadcn@latest add https://www.cult-ui.com/r/shift-card.json
```

Or register the namespace once in `components.json` and install by name:

```json
{
  "registries": {
    "@cult-ui": "https://www.cult-ui.com/r/{name}.json"
  }
}
```

```bash
npx shadcn@latest add @cult-ui/shift-card
```

Components use Tailwind CSS v4 and shadcn theme tokens, and most animate with [Motion](https://motion.dev). Each docs page lists its dependencies.

## Just added

**58 new components.** Illustrations, device mockups, cards and more, with the same docs and one-line install as the rest of Cult UI.

<table>
  <tr>
    <td width="33%">
      <a href="https://www.cult-ui.com/docs/components/globe">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/nolly-studio/cult-ui/main/apps/www/public/cult-pro-component-images/globe-demo-dark.png">
          <img src="https://raw.githubusercontent.com/nolly-studio/cult-ui/main/apps/www/public/cult-pro-component-images/globe-demo-light.png" alt="Globe component preview">
        </picture>
      </a>
      <br><a href="https://www.cult-ui.com/docs/components/globe">Globe</a>
    </td>
    <td width="33%">
      <a href="https://www.cult-ui.com/docs/components/kanban-board">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/nolly-studio/cult-ui/main/apps/www/public/cult-pro-component-images/kanban-board-demo-dark.png">
          <img src="https://raw.githubusercontent.com/nolly-studio/cult-ui/main/apps/www/public/cult-pro-component-images/kanban-board-demo-light.png" alt="Kanban board component preview">
        </picture>
      </a>
      <br><a href="https://www.cult-ui.com/docs/components/kanban-board">Kanban board</a>
    </td>
    <td width="33%">
      <a href="https://www.cult-ui.com/docs/components/fluted-glass">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/nolly-studio/cult-ui/main/apps/www/public/cult-pro-component-images/fluted-glass-demo-dark.png">
          <img src="https://raw.githubusercontent.com/nolly-studio/cult-ui/main/apps/www/public/cult-pro-component-images/fluted-glass-demo-light.png" alt="Fluted glass component preview">
        </picture>
      </a>
      <br><a href="https://www.cult-ui.com/docs/components/fluted-glass">Fluted glass</a>
    </td>
  </tr>
  <tr>
    <td width="33%">
      <a href="https://www.cult-ui.com/docs/components/mac-screen">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/nolly-studio/cult-ui/main/apps/www/public/cult-pro-component-images/mac-screen-demo-dark.png">
          <img src="https://raw.githubusercontent.com/nolly-studio/cult-ui/main/apps/www/public/cult-pro-component-images/mac-screen-demo-light.png" alt="Mac screen component preview">
        </picture>
      </a>
      <br><a href="https://www.cult-ui.com/docs/components/mac-screen">Mac screen</a>
    </td>
    <td width="33%">
      <a href="https://www.cult-ui.com/docs/components/analytics-chart">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/nolly-studio/cult-ui/main/apps/www/public/cult-pro-component-images/analytics-chart-demo-dark.png">
          <img src="https://raw.githubusercontent.com/nolly-studio/cult-ui/main/apps/www/public/cult-pro-component-images/analytics-chart-demo-light.png" alt="Analytics chart component preview">
        </picture>
      </a>
      <br><a href="https://www.cult-ui.com/docs/components/analytics-chart">Analytics chart</a>
    </td>
    <td width="33%">
      <a href="https://www.cult-ui.com/docs/components/folded-card">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/nolly-studio/cult-ui/main/apps/www/public/cult-pro-component-images/folded-card-demo-dark.png">
          <img src="https://raw.githubusercontent.com/nolly-studio/cult-ui/main/apps/www/public/cult-pro-component-images/folded-card-demo-light.png" alt="Folded card component preview">
        </picture>
      </a>
      <br><a href="https://www.cult-ui.com/docs/components/folded-card">Folded card</a>
    </td>
  </tr>
</table>

[Browse all components →](https://www.cult-ui.com/docs/components/dynamic-island)

## Built with Cult UI

**The components are free. The full-stack AI apps built from them are [AI SDK Agents](https://aisdkagents.com/?utm_source=cult-ui&utm_medium=github&utm_content=readme-section-link).** Agent patterns on the Vercel AI SDK with live previews. Install with shadcn, download a Next.js app, or open in v0.

<table>
  <tr>
    <td width="33%" valign="top">
      <a href="https://aisdkagents.com/patterns/example-agent-competitor?utm_source=cult-ui&utm_medium=github&utm_content=readme-pattern-card">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/nolly-studio/cult-ui/main/apps/www/public/migrate/blocks/example-agent-competitor-dark.png">
          <img src="https://raw.githubusercontent.com/nolly-studio/cult-ui/main/apps/www/public/migrate/blocks/example-agent-competitor-light.png" alt="Competitor research agent preview">
        </picture>
      </a>
      <br><a href="https://aisdkagents.com/patterns/example-agent-competitor?utm_source=cult-ui&utm_medium=github&utm_content=readme-pattern-card"><b>Competitor research agent</b></a>
      <br><sub>Paste a competitor URL, get positioning, pricing and a sales battle card.</sub>
    </td>
    <td width="33%" valign="top">
      <a href="https://aisdkagents.com/patterns/example-agent-data-analysis?utm_source=cult-ui&utm_medium=github&utm_content=readme-pattern-card">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/nolly-studio/cult-ui/main/apps/www/public/migrate/blocks/example-agent-data-analysis-dark.png">
          <img src="https://raw.githubusercontent.com/nolly-studio/cult-ui/main/apps/www/public/migrate/blocks/example-agent-data-analysis-light.png" alt="Data analysis agent preview">
        </picture>
      </a>
      <br><a href="https://aisdkagents.com/patterns/example-agent-data-analysis?utm_source=cult-ui&utm_medium=github&utm_content=readme-pattern-card"><b>Data analysis agent</b></a>
      <br><sub>Upload CSV or JSON, get charts, outliers and insights with confidence scores.</sub>
    </td>
    <td width="33%" valign="top">
      <a href="https://aisdkagents.com/patterns/example-agent-a11y-audit?utm_source=cult-ui&utm_medium=github&utm_content=readme-pattern-card">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/nolly-studio/cult-ui/main/apps/www/public/migrate/blocks/example-agent-a11y-audit-dark.png">
          <img src="https://raw.githubusercontent.com/nolly-studio/cult-ui/main/apps/www/public/migrate/blocks/example-agent-a11y-audit-light.png" alt="Accessibility audit agent preview">
        </picture>
      </a>
      <br><a href="https://aisdkagents.com/patterns/example-agent-a11y-audit?utm_source=cult-ui&utm_medium=github&utm_content=readme-pattern-card"><b>Accessibility audit agent</b></a>
      <br><sub>A WCAG 2.1 audit of any site, with a prioritized fix plan.</sub>
    </td>
  </tr>
  <tr>
    <td width="33%" valign="top">
      <a href="https://aisdkagents.com/patterns/ai-artifact-table?utm_source=cult-ui&utm_medium=github&utm_content=readme-pattern-card">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/nolly-studio/cult-ui/main/apps/www/public/migrate/blocks/ai-artifact-table-dark.png">
          <img src="https://raw.githubusercontent.com/nolly-studio/cult-ui/main/apps/www/public/migrate/blocks/ai-artifact-table-light.png" alt="Table editor artifact preview">
        </picture>
      </a>
      <br><a href="https://aisdkagents.com/patterns/ai-artifact-table?utm_source=cult-ui&utm_medium=github&utm_content=readme-pattern-card"><b>Table editor artifact</b></a>
      <br><sub>A spreadsheet you edit by chatting with it.</sub>
    </td>
    <td width="33%" valign="top">
      <a href="https://aisdkagents.com/patterns/example-agent-branding?utm_source=cult-ui&utm_medium=github&utm_content=readme-pattern-card">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/nolly-studio/cult-ui/main/apps/www/public/migrate/blocks/example-agent-branding-dark.png">
          <img src="https://raw.githubusercontent.com/nolly-studio/cult-ui/main/apps/www/public/migrate/blocks/example-agent-branding-light.png" alt="Branding agent preview">
        </picture>
      </a>
      <br><a href="https://aisdkagents.com/patterns/example-agent-branding?utm_source=cult-ui&utm_medium=github&utm_content=readme-pattern-card"><b>Branding agent</b></a>
      <br><sub>Extract any site's design system: tokens, palette and brand personality.</sub>
    </td>
    <td width="33%" valign="top">
      <a href="https://aisdkagents.com/patterns/ai-artifact-chart?utm_source=cult-ui&utm_medium=github&utm_content=readme-pattern-card">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/nolly-studio/cult-ui/main/apps/www/public/migrate/blocks/ai-artifact-chart-dark.png">
          <img src="https://raw.githubusercontent.com/nolly-studio/cult-ui/main/apps/www/public/migrate/blocks/ai-artifact-chart-light.png" alt="Chart generation artifact preview">
        </picture>
      </a>
      <br><a href="https://aisdkagents.com/patterns/ai-artifact-chart?utm_source=cult-ui&utm_medium=github&utm_content=readme-pattern-card"><b>Chart generation artifact</b></a>
      <br><sub>Burn rate charts and financial analysis from a conversation.</sub>
    </td>
  </tr>
</table>

[Browse 100+ patterns →](https://aisdkagents.com/directory?utm_source=cult-ui&utm_medium=github&utm_content=readme-directory)

## For AI agents

The docs are written to be read by coding agents as well as people.

- [`llms.txt`](https://www.cult-ui.com/llms.txt) indexes every page, and [`llms-full.txt`](https://www.cult-ui.com/llms-full.txt) has the full docs in one file.
- Add `.md` to any docs URL for clean markdown, for example [`/docs/components/dock.md`](https://www.cult-ui.com/docs/components/dock.md).
- The [shadcn MCP server](https://www.cult-ui.com/docs/mcp-server) lets Cursor, Claude Code and VS Code search and install Cult UI components from a prompt.

## Cult UI stays free

**MIT licensed and maintained full time.** AI SDK Agents is what pays for it. If you ship AI features, it is the best way to keep this library going. Or [star it on GitHub](https://github.com/nolly-studio/cult-ui).

More from the studio:

- [AI SDK Agents](https://aisdkagents.com/?utm_source=cult-ui&utm_medium=github&utm_content=readme-studio) – 100+ Vercel AI SDK agent patterns with live previews and full-stack templates.
- [Newcopy](https://www.newcopy.ai) – An AI cofounder that knows your brand. Marketing copy that converts.
- [Best Models](https://www.bestmodels.dev/) – Independent ranking of the best models on Vercel AI Gateway, updated daily.
- [Eve Directory](https://www.evedirectory.com/) – The open registry for Eve agents. Inspect every file before you install.

Need a team? [Nolly Studio](https://www.nolly.studio/) is an AI-native product studio: agent systems and design-engineered UI, shipped in weeks.

## Contributing

Read the [contributing guide](CONTRIBUTING.md) to get the repo running locally and add a component.

## License

[MIT](LICENSE.md) © Nolly Studio. Made by [@nolansym](https://x.com/nolansym).
