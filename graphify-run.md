# Graphify - Run on Any Project

## Quick Start

To run graphify on the **current project**, use:

```
/graphify
```

## For a Different Project

Navigate to the project directory first, then run:

```bash
cd /path/to/your/project
/graphify
```

## What Graphify Does

- Analyzes code, docs, papers, and images
- Creates a knowledge graph (`graphify-out/`)
- Indexes project structure and relationships

## Example Workflow

```bash
# Navigate to your project
cd ~/Desktop/MyProject

# Run graphify
/graphify
```

## Requirements

- Claude Code must be running in the project directory
- Graphify skill must be available in your Claude Code configuration

## Output

After running, graphify creates:
- `graphify-out/graph.html` - Interactive knowledge graph
- Indexed relationships between code components
