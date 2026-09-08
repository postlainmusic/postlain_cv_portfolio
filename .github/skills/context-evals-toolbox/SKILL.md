---
name: context-evals-toolbox
description: >-
  Token economics, context compression, memory indexing, and testing evaluations inspired by
  Aider (repo-map), Repomix (packed context), Mem0 (smart state memory), Graphify (knowledge graph), and Promptfoo (evals).
---

# Context Optimization & Evaluation Toolbox

## 1. Context Economics & Mapping (Aider & Repomix style)
- **Precise File Targeting:** Never read whole directories if a specific symbol or function is needed. Use slice ranges.
- **Repository Architecture Mapping:** Generate or maintain a compact map of dependencies, exports, and imports.
- **Repomix Packaging Pattern:** When packaging code context, filter tests, binaries, and build artifacts (`dist/`, `.next/`, `node_modules/`).

## 2. Long-term Knowledge & Dependency Graphs (Mem0 & Graphify style)
- **Decision State (Mem0):** Keep architecture records and invariant constraints logged so they persist across sessions.
- **Entity Relationship Graph (Graphify):** Map components -> stores -> API routes -> database tables to track downstream impacts before editing code.

## 3. Prompt Evaluation & Guardrails (Promptfoo style)
- **Automated Quality Checks:** Use promptfoo assertions (exact match, latency, semantic similarity, LLM-as-a-judge) for validating AI features or prompt templates.
