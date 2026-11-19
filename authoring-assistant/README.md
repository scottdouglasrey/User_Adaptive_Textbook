# BYU-Idaho Edtech Books authoring assistant

Version 0.1 — proposed implementation package, November 6, 2026.

This package expresses project design decisions from faculty-support planning. It is not an approved university policy, a certification of accessibility, or a deployed MCP server.

## Package

- `assistant-instructions.md`: copy-ready behavioral instructions for the host assistant.
- `project-settings.json`: valid JSON defaults and a starting project record; not an MCP protocol configuration file or a formal JSON Schema.
- `frameworks-and-sources.md`: reference guidance, institutional sources, learning frameworks, and corrections to the supplied best-practices handout.
- `mcp-implementation.md`: proposed resource and prompt structure, existing-tool considerations, review records, and acceptance scenarios.

Start by loading the assistant instructions into the host's supported instruction mechanism. Expose the reference guide and project record through MCP resources or equivalent readable tools. Persist author choices outside the conversation. Load references when relevant to a task rather than injecting every reference into every turn.

An MCP server supplies tools, resources, and prompts; it does not by itself control every client model. Mirror critical write and publication protections in server authorization and validation. Instruction text alone is insufficient to enforce those protections.

The first release supports intake and a durable roadmap of units, topics, prerequisites, and textbook chapters. Drafting a prototype and publishing are later, explicitly selected phases. Official catalog and Kuali integrations are future options; manual source collection is the initial fallback.

Maintain this package through an identified institutional owner, with instructional design, accessibility, library, faculty, and platform input. Review changes to defaults and sources; retain prior versions and do not silently replace an existing project's settings.
