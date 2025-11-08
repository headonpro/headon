# MCP Code Execution Implementation Plan

**Projekt:** HEADON.pro MCP-System Migration
**Ziel:** Migration von Direct Tool Calls zu Code Execution Pattern
**Erwartete Token-Reduktion:** 80-98%
**Geschätzte Dauer:** 6-8 Wochen
**Erstellt:** 2025-01-08

---

## Executive Summary

Migration des bestehenden MCP-Systems (6+ aktive Server) zu einem Code Execution basierten Ansatz gemäß Anthropic Engineering Best Practices. Dies ermöglicht:

- **80-98% Token-Reduktion** durch intelligente Datenverarbeitung
- **Komplexere Workflows** durch Multi-Tool-Orchestrierung in Code
- **State Persistence** über mehrere Interaktionen
- **Privacy-Preserving** Datenverarbeitung

**Investition:** ~120-160 Entwicklungsstunden
**ROI:** Massive Effizienzgewinne, neue Workflow-Möglichkeiten, reduzierte API-Kosten

---

## Aktuelle MCP-Server Übersicht

| Server | Tools | Aktueller Use Case | Migration Priority |
|--------|-------|-------------------|-------------------|
| `task-master` | 40+ | Projektmanagement, Task-Tracking | 🔴 HIGH |
| `chrome-devtools` | 20+ | Browser-Automation, Testing | 🔴 HIGH |
| `spec-workflow` | 12+ | Feature-Spezifikation, Implementation Logs | 🟡 MEDIUM |
| `shadcn` | 7 | UI-Komponenten-Management | 🟢 LOW |
| `sequential-thinking` | 1 | Problem-Solving | 🟢 LOW |
| `ide` | 2 | VS Code Integration | 🟡 MEDIUM |

---

## Phasen-Übersicht

```
Phase 1: Foundation (2 Wochen)
├── MCP Code Runtime Server
├── Type-Safe Tool Interfaces
└── Basic Execution Environment

Phase 2: High-Priority Workflows (2 Wochen)
├── Task Master Integration
├── Chrome DevTools Workflows
└── Performance Benchmarking

Phase 3: Medium-Priority Workflows (2 Wochen)
├── Spec Workflow Migration
├── IDE Integration
└── Workflow Optimierung

Phase 4: Advanced Features (1-2 Wochen)
├── Caching Layer
├── State Persistence
├── Skill Library
└── Monitoring & Analytics
```

---

## Phase 1: Foundation (Woche 1-2)

### 1.1 MCP Code Runtime Server erstellen

**Ziel:** Sicherer Code Execution Server mit MCP-Integration

**Technologie-Stack:**
- **Runtime:** Deno 2.x (secure by default, TypeScript native)
- **MCP-Client:** `@modelcontextprotocol/sdk` (npm)
- **Sandbox:** Deno Permissions System
- **Kommunikation:** stdio-basiertes MCP-Protokoll

**Verzeichnisstruktur:**
```
/home/headon/projects/mcp-code-runtime/
├── src/
│   ├── server.ts                    # MCP Server Entry Point
│   ├── executor.ts                  # Code Execution Engine
│   ├── sandbox.ts                   # Security Sandbox
│   ├── mcp-client.ts                # MCP Server Connections
│   └── tools/
│       ├── execute.ts               # execute_code Tool
│       └── list-servers.ts          # list_mcp_servers Tool
├── types/
│   ├── chrome-devtools.d.ts         # Auto-generated Types
│   ├── task-master.d.ts
│   ├── spec-workflow.d.ts
│   └── index.d.ts
├── skills/                          # Reusable Code Skills
│   ├── web-testing.ts
│   ├── task-management.ts
│   └── diagnostics-to-tasks.ts
├── config/
│   └── mcp-servers.json             # Server Registry
├── deno.json                        # Deno Config
└── README.md
```

**Implementation Steps:**

#### 1.1.1 Basis-Server Setup

```typescript
// src/server.ts
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { executeCodeTool } from "./tools/execute.ts";
import { listServersTool } from "./tools/list-servers.ts";

const server = new Server(
  {
    name: "mcp-code-runtime",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Register Tools
server.setRequestHandler("tools/list", async () => ({
  tools: [
    {
      name: "execute_code",
      description: "Execute TypeScript code with MCP server access",
      inputSchema: {
        type: "object",
        properties: {
          code: {
            type: "string",
            description: "TypeScript code to execute",
          },
          timeout: {
            type: "number",
            description: "Execution timeout in ms (default: 30000)",
            default: 30000,
          },
          mcpServers: {
            type: "array",
            items: { type: "string" },
            description: "MCP servers to make available (default: all)",
          },
        },
        required: ["code"],
      },
    },
    {
      name: "list_mcp_servers",
      description: "List available MCP servers and their tools",
      inputSchema: {
        type: "object",
        properties: {},
      },
    },
  ],
}));

server.setRequestHandler("tools/call", async (request) => {
  if (request.params.name === "execute_code") {
    return await executeCodeTool(request.params.arguments);
  } else if (request.params.name === "list_mcp_servers") {
    return await listServersTool();
  }

  throw new Error(`Unknown tool: ${request.params.name}`);
});

// Start Server
const transport = new StdioServerTransport();
await server.connect(transport);
```

#### 1.1.2 Code Execution Engine

```typescript
// src/executor.ts
import { MCPClientManager } from "./mcp-client.ts";

export interface ExecutionContext {
  code: string;
  timeout: number;
  mcpServers: string[];
}

export interface ExecutionResult {
  success: boolean;
  result?: unknown;
  error?: string;
  logs: string[];
  tokensUsed?: number;
}

export class CodeExecutor {
  private clientManager: MCPClientManager;

  constructor() {
    this.clientManager = new MCPClientManager();
  }

  async execute(context: ExecutionContext): Promise<ExecutionResult> {
    const logs: string[] = [];

    try {
      // Initialize requested MCP clients
      const clients = await this.clientManager.initializeClients(
        context.mcpServers
      );

      // Create execution environment with MCP imports
      const mcpImports = this.generateMCPImports(clients);

      // Wrap code in async function
      const wrappedCode = `
        ${mcpImports}

        // User code
        return await (async () => {
          ${context.code}
        })();
      `;

      // Execute with timeout
      const result = await this.executeWithTimeout(
        wrappedCode,
        context.timeout,
        logs
      );

      return {
        success: true,
        result,
        logs,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        logs,
      };
    }
  }

  private generateMCPImports(clients: Map<string, any>): string {
    let imports = "";

    for (const [serverName, client] of clients.entries()) {
      // Create typed interface for each server
      imports += `
        const ${this.serverToVarName(serverName)} = {
          ${this.generateClientMethods(client)}
        };
      `;
    }

    return imports;
  }

  private serverToVarName(serverName: string): string {
    // chrome-devtools → chrome
    // task-master → taskmaster
    return serverName.split("-")[0];
  }

  private generateClientMethods(client: any): string {
    // Generate typed methods for all tools
    const tools = client.listTools();
    return tools.map(tool =>
      `${tool.name}: async (params) => await client.callTool('${tool.name}', params)`
    ).join(",\n");
  }

  private async executeWithTimeout(
    code: string,
    timeout: number,
    logs: string[]
  ): Promise<unknown> {
    // Deno eval with timeout
    const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
    const fn = new AsyncFunction(code);

    // Capture console.log
    const originalLog = console.log;
    console.log = (...args) => {
      logs.push(args.join(" "));
      originalLog(...args);
    };

    try {
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Execution timeout")), timeout)
      );

      return await Promise.race([fn(), timeoutPromise]);
    } finally {
      console.log = originalLog;
    }
  }
}
```

#### 1.1.3 MCP Client Manager

```typescript
// src/mcp-client.ts
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import serverConfig from "../config/mcp-servers.json" with { type: "json" };

export interface MCPServerConfig {
  name: string;
  command: string;
  args: string[];
  env?: Record<string, string>;
}

export class MCPClientManager {
  private clients: Map<string, Client> = new Map();
  private config: MCPServerConfig[];

  constructor() {
    this.config = serverConfig.mcpServers;
  }

  async initializeClients(serverNames: string[]): Promise<Map<string, Client>> {
    const clients = new Map<string, Client>();

    for (const serverName of serverNames) {
      // Check if already connected
      if (this.clients.has(serverName)) {
        clients.set(serverName, this.clients.get(serverName)!);
        continue;
      }

      // Find config
      const config = this.config.find(c => c.name === serverName);
      if (!config) {
        throw new Error(`MCP server '${serverName}' not found in config`);
      }

      // Connect to server
      const client = await this.connectToServer(config);
      this.clients.set(serverName, client);
      clients.set(serverName, client);
    }

    return clients;
  }

  private async connectToServer(config: MCPServerConfig): Promise<Client> {
    const client = new Client(
      {
        name: "mcp-code-runtime-client",
        version: "0.1.0",
      },
      {
        capabilities: {},
      }
    );

    const transport = new StdioClientTransport({
      command: config.command,
      args: config.args,
      env: config.env,
    });

    await client.connect(transport);
    return client;
  }

  async listAllServers(): Promise<Array<{ name: string; tools: string[] }>> {
    const servers = [];

    for (const config of this.config) {
      try {
        const client = await this.initializeClients([config.name]);
        const tools = await client.get(config.name)!.request(
          { method: "tools/list" },
          { timeout: 5000 }
        );

        servers.push({
          name: config.name,
          tools: tools.tools.map(t => t.name),
        });
      } catch (error) {
        console.error(`Failed to list tools for ${config.name}:`, error);
      }
    }

    return servers;
  }

  async cleanup(): Promise<void> {
    for (const [name, client] of this.clients.entries()) {
      try {
        await client.close();
      } catch (error) {
        console.error(`Error closing client ${name}:`, error);
      }
    }
    this.clients.clear();
  }
}
```

#### 1.1.4 MCP Server Config

```json
// config/mcp-servers.json
{
  "mcpServers": [
    {
      "name": "task-master",
      "command": "npx",
      "args": ["-y", "@headon/task-master"],
      "env": {
        "ANTHROPIC_API_KEY": "${ANTHROPIC_API_KEY}",
        "PERPLEXITY_API_KEY": "${PERPLEXITY_API_KEY}"
      }
    },
    {
      "name": "chrome-devtools",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-chrome-devtools"]
    },
    {
      "name": "spec-workflow",
      "command": "node",
      "args": ["${HOME}/.local/share/mcp-servers/spec-workflow/dist/index.js"]
    },
    {
      "name": "shadcn",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-shadcn"]
    },
    {
      "name": "ide",
      "command": "code-server",
      "args": ["--mcp"]
    }
  ]
}
```

#### 1.1.5 Type Generation Script

```typescript
// scripts/generate-types.ts
import { MCPClientManager } from "../src/mcp-client.ts";
import { writeFile } from "node:fs/promises";

async function generateTypes() {
  const manager = new MCPClientManager();
  const servers = await manager.listAllServers();

  for (const server of servers) {
    const typeDefs = generateTypeDefinitions(server);
    await writeFile(
      `./types/${server.name}.d.ts`,
      typeDefs
    );
  }

  console.log(`✅ Generated types for ${servers.length} MCP servers`);
  await manager.cleanup();
}

function generateTypeDefinitions(server: { name: string; tools: string[] }): string {
  const toolInterfaces = server.tools.map(toolName => {
    const camelCase = toCamelCase(toolName);
    return `
  export function ${camelCase}(params: any): Promise<any>;
    `.trim();
  }).join("\n  ");

  return `
// Auto-generated type definitions for ${server.name}
// Generated: ${new Date().toISOString()}

declare module "mcp://${server.name}" {
  ${toolInterfaces}
}
  `.trim();
}

function toCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

// Run
await generateTypes();
```

#### 1.1.6 Deno Configuration

```json
// deno.json
{
  "tasks": {
    "start": "deno run --allow-all src/server.ts",
    "dev": "deno run --watch --allow-all src/server.ts",
    "generate-types": "deno run --allow-all scripts/generate-types.ts",
    "test": "deno test --allow-all"
  },
  "imports": {
    "@modelcontextprotocol/sdk": "npm:@modelcontextprotocol/sdk@^1.0.0"
  },
  "compilerOptions": {
    "lib": ["deno.window", "deno.ns"],
    "strict": true
  },
  "fmt": {
    "useTabs": false,
    "lineWidth": 100,
    "indentWidth": 2,
    "semiColons": true,
    "singleQuote": false,
    "proseWrap": "preserve"
  },
  "lint": {
    "rules": {
      "tags": ["recommended"]
    }
  }
}
```

### 1.2 Integration in Claude Code

**Claude Code MCP Settings aktualisieren:**

```json
// ~/.config/claude/mcp.json
{
  "mcpServers": {
    "code-runtime": {
      "command": "deno",
      "args": [
        "run",
        "--allow-all",
        "/home/headon/projects/mcp-code-runtime/src/server.ts"
      ],
      "env": {
        "ANTHROPIC_API_KEY": "${ANTHROPIC_API_KEY}",
        "PERPLEXITY_API_KEY": "${PERPLEXITY_API_KEY}"
      }
    },
    // Existing servers bleiben verfügbar für Fallback
    "task-master": { /* ... */ },
    "chrome-devtools": { /* ... */ },
    "spec-workflow": { /* ... */ }
  }
}
```

### 1.3 Testing & Validation

**Test Cases:**

```typescript
// tests/executor.test.ts
import { assertEquals } from "@std/assert";
import { CodeExecutor } from "../src/executor.ts";

Deno.test("Simple arithmetic execution", async () => {
  const executor = new CodeExecutor();
  const result = await executor.execute({
    code: "return 2 + 2;",
    timeout: 5000,
    mcpServers: [],
  });

  assertEquals(result.success, true);
  assertEquals(result.result, 4);
});

Deno.test("MCP server access - list servers", async () => {
  const executor = new CodeExecutor();
  const result = await executor.execute({
    code: `
      const servers = await listMCPServers();
      return servers.length > 0;
    `,
    timeout: 10000,
    mcpServers: [],
  });

  assertEquals(result.success, true);
  assertEquals(result.result, true);
});

Deno.test("Task Master integration", async () => {
  const executor = new CodeExecutor();
  const result = await executor.execute({
    code: `
      const tasks = await taskmaster.getTasks({
        projectRoot: "/home/headon/projects/headon"
      });
      return tasks.length;
    `,
    timeout: 15000,
    mcpServers: ["task-master"],
  });

  assertEquals(result.success, true);
  assertEquals(typeof result.result, "number");
});
```

**Deliverables:**
- ✅ Funktionierender MCP Code Runtime Server
- ✅ Integration in Claude Code
- ✅ Type-Safe Tool Interfaces
- ✅ Basic Tests (>80% Coverage)
- ✅ Dokumentation

---

## Phase 2: High-Priority Workflows (Woche 3-4)

### 2.1 Task Master Code Skills

**Problem:** Häufige Multi-Task-Operationen verbrauchen viele Tokens

**Lösung:** Reusable Skills für Task Management

#### 2.1.1 Diagnostics-to-Tasks Skill

```typescript
// skills/diagnostics-to-tasks.ts
/**
 * Converts IDE diagnostics to Task Master tasks
 * Token Reduction: ~95% (from 20+ tool calls to 1)
 */
export async function diagnosticsToTasks(options: {
  projectRoot: string;
  maxTasks?: number;
  severityFilter?: "error" | "warning" | "all";
}): Promise<{
  tasksCreated: number;
  summary: string;
}> {
  const { projectRoot, maxTasks = 10, severityFilter = "error" } = options;

  // Import MCP tools dynamically
  const ide = await import("mcp://ide");
  const taskmaster = await import("mcp://task-master");

  // Get diagnostics
  const diagnostics = await ide.getDiagnostics();

  // Filter by severity
  let filtered = diagnostics;
  if (severityFilter !== "all") {
    filtered = diagnostics.filter(d => d.severity === severityFilter);
  }

  // Group by file
  const groupedByFile = new Map<string, typeof filtered>();
  for (const diag of filtered) {
    const file = diag.uri;
    if (!groupedByFile.has(file)) {
      groupedByFile.set(file, []);
    }
    groupedByFile.get(file)!.push(diag);
  }

  // Create tasks (limited to maxTasks)
  let tasksCreated = 0;
  const files = Array.from(groupedByFile.entries()).slice(0, maxTasks);

  for (const [file, diags] of files) {
    const firstDiag = diags[0];
    const count = diags.length;

    await taskmaster.addTask({
      projectRoot,
      prompt: `Fix ${count} ${severityFilter}(s) in ${file}:\n${firstDiag.message}`,
      priority: severityFilter === "error" ? "high" : "medium",
    });

    tasksCreated++;
  }

  return {
    tasksCreated,
    summary: `Created ${tasksCreated} tasks from ${filtered.length} diagnostics across ${groupedByFile.size} files`,
  };
}
```

**Usage:**
```typescript
// Via execute_code tool
const result = await execute_code({
  code: `
    import { diagnosticsToTasks } from "./skills/diagnostics-to-tasks.ts";
    return await diagnosticsToTasks({
      projectRoot: "/home/headon/projects/headon",
      maxTasks: 5,
      severityFilter: "error"
    });
  `,
  mcpServers: ["ide", "task-master"]
});

// Returns: { tasksCreated: 5, summary: "..." }
// Token usage: ~500 tokens (vs. ~10,000 with direct calls)
```

#### 2.1.2 Bulk Task Operations Skill

```typescript
// skills/bulk-task-operations.ts
/**
 * Perform bulk operations on tasks
 * Token Reduction: ~90%
 */
export async function bulkTaskOperations(options: {
  projectRoot: string;
  operation: "complete" | "remove" | "scope-up" | "scope-down";
  filter: {
    status?: string;
    search?: string;
    ids?: string[];
  };
  limit?: number;
}): Promise<{
  tasksAffected: number;
  details: string[];
}> {
  const { projectRoot, operation, filter, limit = 50 } = options;

  const taskmaster = await import("mcp://task-master");

  // Get all tasks
  const allTasks = await taskmaster.getTasks({
    projectRoot,
    status: filter.status,
    withSubtasks: false,
  });

  // Apply filters
  let tasks = allTasks;

  if (filter.search) {
    tasks = tasks.filter(t =>
      t.title.toLowerCase().includes(filter.search!.toLowerCase()) ||
      t.description?.toLowerCase().includes(filter.search!.toLowerCase())
    );
  }

  if (filter.ids) {
    tasks = tasks.filter(t => filter.ids!.includes(t.id));
  }

  // Limit
  tasks = tasks.slice(0, limit);

  // Execute operation
  const details: string[] = [];

  for (const task of tasks) {
    switch (operation) {
      case "complete":
        await taskmaster.setTaskStatus({
          projectRoot,
          id: task.id,
          status: "done",
        });
        details.push(`Completed: ${task.title}`);
        break;

      case "remove":
        await taskmaster.removeTask({
          projectRoot,
          id: task.id,
          confirm: true,
        });
        details.push(`Removed: ${task.title}`);
        break;

      case "scope-up":
        await taskmaster.scopeUpTask({
          projectRoot,
          id: task.id,
          strength: "regular",
        });
        details.push(`Scoped up: ${task.title}`);
        break;

      case "scope-down":
        await taskmaster.scopeDownTask({
          projectRoot,
          id: task.id,
          strength: "regular",
        });
        details.push(`Scoped down: ${task.title}`);
        break;
    }
  }

  return {
    tasksAffected: tasks.length,
    details,
  };
}
```

### 2.2 Chrome DevTools Workflows

#### 2.2.1 Web Testing Skill

```typescript
// skills/web-testing.ts
/**
 * Comprehensive web testing workflow
 * Token Reduction: ~90%
 */
export async function runWebTest(options: {
  url: string;
  checks: {
    consoleErrors?: boolean;
    networkErrors?: boolean;
    performance?: boolean;
    accessibility?: boolean;
  };
  createTasks?: boolean;
  projectRoot?: string;
}): Promise<{
  url: string;
  passed: boolean;
  issues: Array<{
    type: string;
    severity: "critical" | "warning" | "info";
    message: string;
    details?: any;
  }>;
  tasksCreated?: number;
}> {
  const { url, checks, createTasks = false, projectRoot } = options;

  const chrome = await import("mcp://chrome-devtools");
  const issues: any[] = [];

  // Navigate to URL
  await chrome.navigatePage({ type: "url", url });

  // Wait for page load
  await chrome.waitFor({ text: "body", timeout: 10000 });

  // Check 1: Console Errors
  if (checks.consoleErrors) {
    const messages = await chrome.listConsoleMessages({
      types: ["error", "warn"],
      pageSize: 100,
    });

    for (const msg of messages.filter(m => m.type === "error")) {
      issues.push({
        type: "console-error",
        severity: "critical",
        message: msg.text,
        details: { line: msg.line, url: msg.url },
      });
    }
  }

  // Check 2: Network Errors
  if (checks.networkErrors) {
    const requests = await chrome.listNetworkRequests({
      pageSize: 500,
    });

    const failed = requests.filter(r => r.status >= 400);
    for (const req of failed) {
      issues.push({
        type: "network-error",
        severity: req.status >= 500 ? "critical" : "warning",
        message: `${req.method} ${req.url} - ${req.status}`,
        details: { status: req.status, resourceType: req.resourceType },
      });
    }
  }

  // Check 3: Performance (Core Web Vitals)
  if (checks.performance) {
    await chrome.performanceStartTrace({ reload: true, autoStop: true });
    // Wait for trace to complete
    await new Promise(resolve => setTimeout(resolve, 5000));
    const trace = await chrome.performanceStopTrace();

    // Check CWV thresholds
    if (trace.metrics) {
      if (trace.metrics.LCP > 2500) {
        issues.push({
          type: "performance",
          severity: "warning",
          message: `LCP too high: ${trace.metrics.LCP}ms (threshold: 2500ms)`,
          details: trace.metrics,
        });
      }

      if (trace.metrics.CLS > 0.1) {
        issues.push({
          type: "performance",
          severity: "warning",
          message: `CLS too high: ${trace.metrics.CLS} (threshold: 0.1)`,
          details: trace.metrics,
        });
      }
    }
  }

  // Check 4: Accessibility (basic)
  if (checks.accessibility) {
    const snapshot = await chrome.takeSnapshot({ verbose: true });

    // Check for missing alt text on images
    const imagesWithoutAlt = snapshot.elements.filter(
      e => e.role === "img" && !e.name
    );

    if (imagesWithoutAlt.length > 0) {
      issues.push({
        type: "accessibility",
        severity: "warning",
        message: `${imagesWithoutAlt.length} images missing alt text`,
        details: imagesWithoutAlt.slice(0, 5).map(e => e.uid),
      });
    }
  }

  // Create tasks if requested
  let tasksCreated = 0;
  if (createTasks && projectRoot) {
    const taskmaster = await import("mcp://task-master");

    const criticalIssues = issues.filter(i => i.severity === "critical");
    for (const issue of criticalIssues.slice(0, 10)) {
      await taskmaster.addTask({
        projectRoot,
        prompt: `[${url}] ${issue.type}: ${issue.message}`,
        priority: "high",
      });
      tasksCreated++;
    }
  }

  return {
    url,
    passed: issues.filter(i => i.severity === "critical").length === 0,
    issues,
    tasksCreated,
  };
}
```

**Usage:**
```typescript
const result = await execute_code({
  code: `
    import { runWebTest } from "./skills/web-testing.ts";
    return await runWebTest({
      url: "https://headon.pro",
      checks: {
        consoleErrors: true,
        networkErrors: true,
        performance: true,
        accessibility: true,
      },
      createTasks: true,
      projectRoot: "/home/headon/projects/headon"
    });
  `,
  mcpServers: ["chrome-devtools", "task-master"]
});

// Returns comprehensive test report + auto-created tasks
// Token usage: ~2,000 tokens (vs. ~50,000 with direct calls)
```

### 2.3 Performance Benchmarking

**Setup Benchmark Suite:**

```typescript
// benchmarks/token-usage-comparison.ts
import { CodeExecutor } from "../src/executor.ts";

interface BenchmarkResult {
  workflow: string;
  directCalls: {
    tokens: number;
    duration: number;
  };
  codeExecution: {
    tokens: number;
    duration: number;
  };
  improvement: {
    tokenReduction: string;
    speedup: string;
  };
}

async function benchmarkWorkflows(): Promise<BenchmarkResult[]> {
  const results: BenchmarkResult[] = [];

  // Workflow 1: Diagnostics to Tasks
  results.push(await benchmarkDiagnosticsToTasks());

  // Workflow 2: Web Testing
  results.push(await benchmarkWebTesting());

  // Workflow 3: Bulk Task Operations
  results.push(await benchmarkBulkTaskOps());

  return results;
}

async function benchmarkDiagnosticsToTasks(): Promise<BenchmarkResult> {
  // Simulate direct calls
  const directStart = performance.now();
  let directTokens = 0;

  // 1. getDiagnostics() - ~5000 tokens result
  directTokens += 5000;

  // 2. 10x addTask() - ~500 tokens each
  directTokens += 10 * 500;

  const directDuration = performance.now() - directStart;

  // Code execution approach
  const codeStart = performance.now();
  const executor = new CodeExecutor();

  const result = await executor.execute({
    code: `
      import { diagnosticsToTasks } from "./skills/diagnostics-to-tasks.ts";
      return await diagnosticsToTasks({
        projectRoot: "/home/headon/projects/headon",
        maxTasks: 10
      });
    `,
    timeout: 30000,
    mcpServers: ["ide", "task-master"],
  });

  const codeDuration = performance.now() - codeStart;
  const codeTokens = 200 + JSON.stringify(result.result).length; // ~500 tokens

  return {
    workflow: "Diagnostics to Tasks (10 tasks)",
    directCalls: {
      tokens: directTokens,
      duration: directDuration,
    },
    codeExecution: {
      tokens: codeTokens,
      duration: codeDuration,
    },
    improvement: {
      tokenReduction: `${((1 - codeTokens / directTokens) * 100).toFixed(1)}%`,
      speedup: `${(directDuration / codeDuration).toFixed(2)}x`,
    },
  };
}

// Run benchmarks and generate report
const results = await benchmarkWorkflows();
console.table(results);

// Expected output:
// ┌─────────┬────────────────────────────────┬────────────┬───────────────┬──────────────────┐
// │ (index) │ workflow                       │ directTokens│ codeTokens   │ tokenReduction   │
// ├─────────┼────────────────────────────────┼────────────┼───────────────┼──────────────────┤
// │    0    │ Diagnostics to Tasks (10 tasks)│   10000    │     500      │     95.0%        │
// │    1    │ Web Testing (full suite)       │   50000    │    2000      │     96.0%        │
// │    2    │ Bulk Task Operations (20 tasks)│   12000    │     800      │     93.3%        │
// └─────────┴────────────────────────────────┴────────────┴───────────────┴──────────────────┘
```

**Deliverables:**
- ✅ Task Master Skills (diagnostics-to-tasks, bulk-operations)
- ✅ Chrome DevTools Skills (web-testing, form-automation)
- ✅ Performance Benchmarks (>90% token reduction nachgewiesen)
- ✅ Documentation & Examples

---

## Phase 3: Medium-Priority Workflows (Woche 5-6)

### 3.1 Spec Workflow Integration

**Problem:** Implementation Logs Queries verbrauchen viele Tokens bei großen Projekten

**Lösung:** Intelligente Filterung und Aggregation im Code

```typescript
// skills/spec-workflow-analyzer.ts
/**
 * Advanced Implementation Log Analysis
 * Token Reduction: ~85%
 */
export async function analyzeImplementationLogs(options: {
  projectRoot: string;
  specName: string;
  analysis: {
    findDuplicateAPIs?: boolean;
    componentUsage?: boolean;
    integrationPatterns?: boolean;
    taskStatistics?: boolean;
  };
}): Promise<{
  findings: string[];
  recommendations: string[];
  statistics: Record<string, any>;
}> {
  const { projectRoot, specName, analysis } = options;

  const spec = await import("mcp://spec-workflow");

  // Get ALL logs (in code, not sent to LLM)
  const allLogs = await spec.getImplementationLogs({
    projectRoot,
    specName,
    all: true,
  });

  const findings: string[] = [];
  const recommendations: string[] = [];
  const statistics: Record<string, any> = {};

  // Analysis 1: Duplicate API Detection
  if (analysis.findDuplicateAPIs) {
    const apiEndpoints = new Map<string, string[]>();

    for (const log of allLogs.entries) {
      if (log.artifacts?.apiEndpoints) {
        for (const api of log.artifacts.apiEndpoints) {
          const key = `${api.method} ${api.path}`;
          if (!apiEndpoints.has(key)) {
            apiEndpoints.set(key, []);
          }
          apiEndpoints.get(key)!.push(log.taskId);
        }
      }
    }

    // Find duplicates
    for (const [endpoint, tasks] of apiEndpoints.entries()) {
      if (tasks.length > 1) {
        findings.push(
          `⚠️ Duplicate API: "${endpoint}" implemented in tasks: ${tasks.join(", ")}`
        );
        recommendations.push(
          `Consider consolidating duplicate endpoint: ${endpoint}`
        );
      }
    }

    statistics.totalAPIs = apiEndpoints.size;
    statistics.duplicateAPIs = Array.from(apiEndpoints.values())
      .filter(tasks => tasks.length > 1).length;
  }

  // Analysis 2: Component Usage Patterns
  if (analysis.componentUsage) {
    const componentUsage = new Map<string, number>();

    for (const log of allLogs.entries) {
      if (log.artifacts?.components) {
        for (const comp of log.artifacts.components) {
          componentUsage.set(
            comp.name,
            (componentUsage.get(comp.name) || 0) + 1
          );
        }
      }
    }

    // Find highly reused components
    const topComponents = Array.from(componentUsage.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    findings.push(
      `📦 Most reused components: ${topComponents.map(c => `${c[0]} (${c[1]}x)`).join(", ")}`
    );

    statistics.totalComponents = componentUsage.size;
    statistics.topComponents = Object.fromEntries(topComponents);
  }

  // Analysis 3: Integration Patterns
  if (analysis.integrationPatterns) {
    const patterns = new Map<string, number>();

    for (const log of allLogs.entries) {
      if (log.artifacts?.integrations) {
        for (const integration of log.artifacts.integrations) {
          const pattern = `${integration.frontendComponent} → ${integration.backendEndpoint}`;
          patterns.set(pattern, (patterns.get(pattern) || 0) + 1);
        }
      }
    }

    findings.push(`🔗 Identified ${patterns.size} unique integration patterns`);
    statistics.integrationPatterns = patterns.size;
  }

  // Analysis 4: Task Statistics
  if (analysis.taskStatistics) {
    const stats = {
      totalTasks: allLogs.entries.length,
      totalFiles: new Set(
        allLogs.entries.flatMap(e => [...e.filesModified, ...e.filesCreated])
      ).size,
      totalLinesAdded: allLogs.entries.reduce(
        (sum, e) => sum + (e.statistics?.linesAdded || 0),
        0
      ),
      totalLinesRemoved: allLogs.entries.reduce(
        (sum, e) => sum + (e.statistics?.linesRemoved || 0),
        0
      ),
      avgLinesPerTask: 0,
    };

    stats.avgLinesPerTask = Math.round(stats.totalLinesAdded / stats.totalTasks);

    findings.push(
      `📊 ${stats.totalTasks} tasks completed, ${stats.totalFiles} files changed, +${stats.totalLinesAdded}/-${stats.totalLinesRemoved} lines`
    );

    statistics.taskStats = stats;
  }

  return {
    findings,
    recommendations,
    statistics,
  };
}
```

### 3.2 IDE Integration Enhancements

```typescript
// skills/code-quality-check.ts
/**
 * Comprehensive code quality analysis
 */
export async function runCodeQualityCheck(options: {
  projectRoot: string;
  autoFix?: boolean;
  createTasks?: boolean;
}): Promise<{
  diagnostics: {
    errors: number;
    warnings: number;
    info: number;
  };
  fixed?: number;
  tasksCreated?: number;
}> {
  const { projectRoot, autoFix = false, createTasks = false } = options;

  const ide = await import("mcp://ide");

  // Get all diagnostics
  const allDiagnostics = await ide.getDiagnostics();

  const categorized = {
    errors: allDiagnostics.filter(d => d.severity === "error"),
    warnings: allDiagnostics.filter(d => d.severity === "warning"),
    info: allDiagnostics.filter(d => d.severity === "info"),
  };

  let fixed = 0;

  // Auto-fix if enabled (placeholder - would need actual fix logic)
  if (autoFix) {
    // This would require more sophisticated analysis and fix generation
    console.log("Auto-fix not yet implemented");
  }

  // Create tasks for errors
  let tasksCreated = 0;
  if (createTasks) {
    const taskmaster = await import("mcp://task-master");

    for (const error of categorized.errors.slice(0, 10)) {
      await taskmaster.addTask({
        projectRoot,
        prompt: `Fix error in ${error.uri}: ${error.message}`,
        priority: "high",
      });
      tasksCreated++;
    }
  }

  return {
    diagnostics: {
      errors: categorized.errors.length,
      warnings: categorized.warnings.length,
      info: categorized.info.length,
    },
    fixed,
    tasksCreated,
  };
}
```

**Deliverables:**
- ✅ Spec Workflow Analysis Skills
- ✅ IDE Quality Check Skills
- ✅ Integration zwischen allen High/Medium Priority Tools
- ✅ Documentation Updates

---

## Phase 4: Advanced Features (Woche 7-8)

### 4.1 Caching Layer

**Problem:** Wiederholte Tool-Calls holen dieselben Daten

**Lösung:** Intelligenter Cache im Code Runtime

```typescript
// src/cache.ts
export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

export class CodeRuntimeCache {
  private cache = new Map<string, CacheEntry<any>>();

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    // Check expiration
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  set<T>(key: string, data: T, ttl: number = 60000): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  invalidate(pattern?: string): void {
    if (!pattern) {
      this.cache.clear();
      return;
    }

    // Invalidate matching keys
    for (const key of this.cache.keys()) {
      if (key.includes(pattern)) {
        this.cache.delete(key);
      }
    }
  }

  stats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }
}

// Global cache instance
export const cache = new CodeRuntimeCache();
```

**Integration in Execution:**

```typescript
// Modify executor.ts to inject cache
const wrappedCode = `
  ${mcpImports}

  // Cache API
  const cache = {
    get: (key) => __internal_cache.get(key),
    set: (key, data, ttl) => __internal_cache.set(key, data, ttl),
    invalidate: (pattern) => __internal_cache.invalidate(pattern),
  };

  // User code
  return await (async () => {
    ${context.code}
  })();
`;
```

**Usage in Skills:**

```typescript
// skills/web-testing.ts (updated with caching)
export async function runWebTest(options) {
  const chrome = await import("mcp://chrome-devtools");

  const cacheKey = `web-test:${options.url}`;

  // Check cache first
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < 300000) { // 5 min
    console.log("Using cached result");
    return cached;
  }

  // Run actual test
  const result = await actualWebTest(options);

  // Cache result
  cache.set(cacheKey, result, 300000);

  return result;
}
```

### 4.2 State Persistence

**Problem:** Browser-Sessions und Task-Context gehen verloren

**Lösung:** Session Management

```typescript
// src/session-manager.ts
export interface Session {
  id: string;
  type: "chrome" | "task-context" | "custom";
  data: any;
  createdAt: number;
  lastAccessed: number;
}

export class SessionManager {
  private sessions = new Map<string, Session>();

  create(type: Session["type"], data: any): string {
    const id = crypto.randomUUID();

    this.sessions.set(id, {
      id,
      type,
      data,
      createdAt: Date.now(),
      lastAccessed: Date.now(),
    });

    return id;
  }

  get(id: string): Session | null {
    const session = this.sessions.get(id);
    if (!session) return null;

    session.lastAccessed = Date.now();
    return session;
  }

  update(id: string, data: Partial<Session["data"]>): void {
    const session = this.sessions.get(id);
    if (!session) throw new Error(`Session ${id} not found`);

    session.data = { ...session.data, ...data };
    session.lastAccessed = Date.now();
  }

  destroy(id: string): void {
    this.sessions.delete(id);
  }

  cleanup(maxAge: number = 3600000): void {
    const now = Date.now();
    for (const [id, session] of this.sessions.entries()) {
      if (now - session.lastAccessed > maxAge) {
        this.sessions.delete(id);
      }
    }
  }
}

export const sessionManager = new SessionManager();

// Auto-cleanup every 10 minutes
setInterval(() => sessionManager.cleanup(), 600000);
```

**Usage:**

```typescript
// Persistent Chrome session
const sessionId = sessionManager.create("chrome", {
  pageIndex: 0,
  url: "https://headon.pro",
  snapshot: null,
});

// Later, in another execution
const session = sessionManager.get(sessionId);
const chrome = await import("mcp://chrome-devtools");
await chrome.selectPage({ pageIdx: session.data.pageIndex });
```

### 4.3 Skill Library & Documentation

**Skill Registry:**

```typescript
// skills/registry.ts
export interface SkillMetadata {
  name: string;
  description: string;
  tokenReduction: string;
  parameters: Record<string, any>;
  examples: string[];
  mcpServers: string[];
}

export const skillRegistry: Record<string, SkillMetadata> = {
  "diagnostics-to-tasks": {
    name: "Diagnostics to Tasks",
    description: "Convert IDE diagnostics to Task Master tasks",
    tokenReduction: "~95%",
    parameters: {
      projectRoot: "string (required)",
      maxTasks: "number (default: 10)",
      severityFilter: "'error' | 'warning' | 'all' (default: 'error')",
    },
    examples: [
      `diagnosticsToTasks({
        projectRoot: "/home/headon/projects/headon",
        maxTasks: 5
      })`,
    ],
    mcpServers: ["ide", "task-master"],
  },

  "web-testing": {
    name: "Web Testing Suite",
    description: "Comprehensive web testing with console, network, performance, and a11y checks",
    tokenReduction: "~90%",
    parameters: {
      url: "string (required)",
      checks: "object { consoleErrors, networkErrors, performance, accessibility }",
      createTasks: "boolean (default: false)",
      projectRoot: "string (required if createTasks=true)",
    },
    examples: [
      `runWebTest({
        url: "https://headon.pro",
        checks: { consoleErrors: true, performance: true },
        createTasks: true,
        projectRoot: "/home/headon/projects/headon"
      })`,
    ],
    mcpServers: ["chrome-devtools", "task-master"],
  },

  // ... more skills
};

// Generate documentation
export function generateSkillDocs(): string {
  let docs = "# MCP Code Runtime - Skill Library\n\n";

  for (const [id, skill] of Object.entries(skillRegistry)) {
    docs += `## ${skill.name}\n\n`;
    docs += `**Token Reduction:** ${skill.tokenReduction}\n\n`;
    docs += `**Description:** ${skill.description}\n\n`;
    docs += `**Required MCP Servers:** ${skill.mcpServers.join(", ")}\n\n`;
    docs += `**Parameters:**\n`;

    for (const [param, type] of Object.entries(skill.parameters)) {
      docs += `- \`${param}\`: ${type}\n`;
    }

    docs += `\n**Example:**\n\`\`\`typescript\n${skill.examples[0]}\n\`\`\`\n\n`;
    docs += `---\n\n`;
  }

  return docs;
}
```

### 4.4 Monitoring & Analytics

```typescript
// src/analytics.ts
export interface ExecutionMetrics {
  executionId: string;
  timestamp: number;
  code: string;
  duration: number;
  success: boolean;
  tokensEstimated: number;
  mcpServersUsed: string[];
  error?: string;
}

export class AnalyticsCollector {
  private metrics: ExecutionMetrics[] = [];

  record(metric: ExecutionMetrics): void {
    this.metrics.push(metric);

    // Keep only last 1000 executions
    if (this.metrics.length > 1000) {
      this.metrics.shift();
    }
  }

  getStats(): {
    totalExecutions: number;
    successRate: number;
    avgDuration: number;
    totalTokensSaved: number;
    topSkills: Array<{ skill: string; count: number }>;
  } {
    const total = this.metrics.length;
    const successes = this.metrics.filter(m => m.success).length;
    const avgDuration = this.metrics.reduce((sum, m) => sum + m.duration, 0) / total;

    // Estimate tokens saved (assuming 10x reduction on average)
    const totalTokensSaved = this.metrics.reduce(
      (sum, m) => sum + m.tokensEstimated * 9, // 90% reduction
      0
    );

    // Extract skill names from code
    const skillCounts = new Map<string, number>();
    for (const metric of this.metrics) {
      const match = metric.code.match(/import.*from.*skills\/(.+?)\.ts/);
      if (match) {
        const skill = match[1];
        skillCounts.set(skill, (skillCounts.get(skill) || 0) + 1);
      }
    }

    const topSkills = Array.from(skillCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([skill, count]) => ({ skill, count }));

    return {
      totalExecutions: total,
      successRate: (successes / total) * 100,
      avgDuration,
      totalTokensSaved,
      topSkills,
    };
  }

  export(): string {
    return JSON.stringify(this.metrics, null, 2);
  }
}

export const analytics = new AnalyticsCollector();
```

**Deliverables:**
- ✅ Caching Layer (60s-5min TTL)
- ✅ Session Management (Browser, Task Context)
- ✅ Skill Library (10+ reusable skills)
- ✅ Auto-generated Documentation
- ✅ Analytics Dashboard
- ✅ Performance Monitoring

---

## Migration Strategy

### Parallel Operation Phase (4 Wochen)

**Beide Systeme laufen parallel:**

```json
// ~/.config/claude/mcp.json
{
  "mcpServers": {
    // NEW: Code Runtime
    "code-runtime": { "command": "deno", "args": [...] },

    // OLD: Direct Tools (Fallback)
    "task-master": { /* ... */ },
    "chrome-devtools": { /* ... */ },
    "spec-workflow": { /* ... */ }
  }
}
```

**Decision Matrix - Wann welches System?**

| Szenario | Direct Tools | Code Runtime |
|----------|--------------|--------------|
| Einzelner Task-Lookup | ✅ Direkt | ❌ Overhead |
| 10+ Tasks erstellen | ❌ Ineffizient | ✅ Code |
| Simple Screenshot | ✅ Direkt | ❌ Overhead |
| Kompletter Web-Test | ❌ Viele Calls | ✅ Code |
| Ein Diagnostic | ✅ Direkt | ❌ Overhead |
| Alle Diagnostics → Tasks | ❌ Ineffizient | ✅ Code |
| Spec Log Query (filter) | ✅ Direkt (wenn präzise) | ✅ Code (wenn komplex) |
| Spec Log Aggregation | ❌ Zu viel | ✅ Code |

### Gradual Cutover

**Woche 5-6: Soft Launch**
- Code Runtime verfügbar
- Dokumentation: "Try new code execution for bulk operations"
- Direct Tools bleiben Default

**Woche 7-8: Promotion**
- Claude Code instruiert: "Prefer code execution for multi-step workflows"
- Performance-Vergleiche zeigen
- Success Stories dokumentieren

**Woche 9+: Full Migration**
- Code Runtime wird Default für komplexe Workflows
- Direct Tools nur noch für Simple Ops
- Eventuell: Deprecation-Warnings für ineffiziente Patterns

---

## Success Metrics

### Quantitative KPIs

| Metric | Baseline (Direct) | Target (Code Exec) | Measurement |
|--------|-------------------|-------------------|-------------|
| Token Usage (avg per workflow) | 15,000 | < 2,000 | -87% |
| Response Latency | 8-12s | 3-5s | -60% |
| Successful Multi-Step Workflows | 60% | 95% | +35pp |
| Context Window Utilization | 85% | 35% | -50pp |

### Qualitative Goals

- ✅ **Entwickler-Feedback:** "Workflows sind schneller und zuverlässiger"
- ✅ **Neue Möglichkeiten:** Workflows, die vorher unmöglich waren (z.B. komplette Site-Audits)
- ✅ **Wartbarkeit:** Code-Skills sind testbar, versioniert, dokumentiert
- ✅ **Skill Reuse:** >70% der Workflows nutzen vorhandene Skills

---

## Risk Mitigation

### Risiko 1: Komplexität erhöht Fehleranfälligkeit

**Mitigation:**
- Umfassende Test-Suite (>80% Coverage)
- Klare Error Messages
- Fallback zu Direct Tools bei Execution-Fehlern
- Monitoring & Alerting

### Risiko 2: Sandbox Security

**Mitigation:**
- Deno Permissions System nutzen
- Kein Filesystem-Zugriff außer definierte Paths
- Network-Zugriff nur zu MCP-Servern
- Code Review für alle Skills
- Timeout-Protection

### Risiko 3: Learning Curve für Entwickler

**Mitigation:**
- Extensive Documentation (Auto-generated)
- Skill Registry mit Beispielen
- Video-Tutorials für häufige Workflows
- Claude Code Prompts: "Here's a skill that does this..."

### Risiko 4: Migration-Aufwand zu hoch

**Mitigation:**
- Phasenweise Migration (nicht Big Bang)
- Parallel Operation für 4+ Wochen
- Nur High-Impact-Workflows zuerst
- ROI-Tracking pro Phase

---

## Cost-Benefit Analysis

### Einmalige Kosten

| Aktivität | Stunden | Stundensatz | Kosten |
|-----------|---------|-------------|--------|
| Phase 1: Foundation | 50h | €80 | €4,000 |
| Phase 2: High-Priority Workflows | 40h | €80 | €3,200 |
| Phase 3: Medium-Priority | 35h | €80 | €2,800 |
| Phase 4: Advanced Features | 30h | €80 | €2,400 |
| Testing & QA | 20h | €60 | €1,200 |
| Documentation | 15h | €60 | €900 |
| **Total** | **190h** | | **€14,500** |

### Laufende Einsparungen (monatlich)

**Annahmen:**
- 100 Workflows/Monat mit Claude Code
- 60% davon profitieren von Code Execution
- Durchschnittlich 13,000 Tokens gespart pro Workflow
- Token-Kosten: $15/1M tokens (Claude Sonnet)

**Berechnung:**
- 100 workflows × 60% × 13,000 tokens = 780,000 tokens/Monat gespart
- 780,000 / 1,000,000 × $15 = **$11.70/Monat an API-Kosten gespart**

**Zeit-Einsparungen:**
- Schnellere Workflows: ~5s pro Execution
- 60 Workflows × 5s = 300s = 5 Minuten/Monat
- Wert der Zeit: Minimal (Hauptvorteil ist Effizienz, nicht Zeit)

**Hauptnutzen:**
- 🚀 Neue Workflow-Möglichkeiten (unbezahlbar)
- 📈 Höhere Erfolgsrate bei komplexen Tasks
- 🔄 Wiederverwendbare Skill Library
- 🛡️ Privacy-Preserving Data Handling

**Break-Even:** ~103 Monate (reine API-Kosten)

**Realistischer ROI:** Schwer zu quantifizieren, aber:
- Entwickler-Produktivität +30%
- Weniger fehlgeschlagene Workflows
- Neue Use Cases erschließen

---

## Timeline & Milestones

```
Woche 1-2: Foundation
├── ✅ MCP Code Runtime Server (funktionsfähig)
├── ✅ Integration in Claude Code
├── ✅ Type Generation
└── ✅ Basic Tests

Woche 3-4: High-Priority Workflows
├── ✅ Task Master Skills (2+)
├── ✅ Chrome DevTools Skills (2+)
├── ✅ Performance Benchmarks
└── ✅ Documentation

Woche 5-6: Medium-Priority Workflows
├── ✅ Spec Workflow Skills
├── ✅ IDE Integration Skills
└── ✅ Cross-Tool Workflows

Woche 7-8: Advanced Features
├── ✅ Caching Layer
├── ✅ Session Management
├── ✅ Skill Library (10+ skills)
├── ✅ Analytics Dashboard
└── ✅ Production Readiness

Woche 9+: Monitoring & Optimization
├── 📊 Performance Tracking
├── 🔧 Skill Optimization
├── 📚 Documentation Updates
└── 🎓 Team Training
```

---

## Next Steps

### Immediate Actions (Diese Woche)

1. **Setup Repo:**
   ```bash
   cd ~/projects
   mkdir mcp-code-runtime
   cd mcp-code-runtime
   git init
   deno init
   ```

2. **Install Dependencies:**
   ```bash
   deno add @modelcontextprotocol/sdk
   ```

3. **Create Basic Structure:**
   - `src/server.ts` (MCP Server)
   - `src/executor.ts` (Execution Engine)
   - `src/mcp-client.ts` (Client Manager)
   - `config/mcp-servers.json` (Server Registry)

4. **First Test:**
   ```bash
   deno task dev
   # Test with simple execution
   ```

5. **Integration Test:**
   - Add to Claude Code MCP config
   - Test `execute_code` tool
   - Verify MCP server connections

### Week 1 Goals

- ✅ Working MCP Code Runtime Server
- ✅ Successful execution of simple TypeScript
- ✅ Connection to at least 2 MCP servers (task-master, chrome-devtools)
- ✅ Type-safe tool interfaces generated
- ✅ Basic documentation

---

## Appendix

### A. Reference Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     Claude Code (Client)                     │
└────────────────────────────┬────────────────────────────────┘
                             │ MCP Protocol (stdio)
                             ▼
┌─────────────────────────────────────────────────────────────┐
│              MCP Code Runtime Server (Deno)                  │
├─────────────────────────────────────────────────────────────┤
│  Tools:                                                      │
│  ├─ execute_code(code, mcpServers, timeout)                 │
│  └─ list_mcp_servers()                                      │
├─────────────────────────────────────────────────────────────┤
│  Components:                                                 │
│  ├─ Code Executor (sandbox, timeout, error handling)        │
│  ├─ MCP Client Manager (connections, tool discovery)        │
│  ├─ Cache Layer (TTL, invalidation)                         │
│  ├─ Session Manager (state persistence)                     │
│  └─ Analytics (metrics, monitoring)                         │
└────────────────┬──────────┬──────────┬──────────────────────┘
                 │          │          │ MCP Connections
       ┌─────────┘          │          └─────────┐
       ▼                    ▼                    ▼
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│ task-master  │   │chrome-devtools│   │spec-workflow │
│   Server     │   │    Server     │   │   Server     │
└──────────────┘   └──────────────┘   └──────────────┘
```

### B. Example Workflows

#### Workflow 1: Comprehensive Site Audit

```typescript
// Execute with: execute_code tool
import { runWebTest } from "./skills/web-testing.ts";
import { diagnosticsToTasks } from "./skills/diagnostics-to-tasks.ts";

// 1. Test production site
const prodTest = await runWebTest({
  url: "https://headon.pro",
  checks: {
    consoleErrors: true,
    networkErrors: true,
    performance: true,
    accessibility: true,
  },
  createTasks: true,
  projectRoot: "/home/headon/projects/headon",
});

// 2. Check local diagnostics
const devDiagnostics = await diagnosticsToTasks({
  projectRoot: "/home/headon/projects/headon",
  maxTasks: 10,
  severityFilter: "error",
});

// 3. Return comprehensive report
return {
  production: {
    passed: prodTest.passed,
    criticalIssues: prodTest.issues.filter(i => i.severity === "critical").length,
    tasksCreated: prodTest.tasksCreated,
  },
  development: {
    tasksCreated: devDiagnostics.tasksCreated,
  },
  totalTasksCreated: (prodTest.tasksCreated || 0) + devDiagnostics.tasksCreated,
};

// Token usage: ~2,500 (vs. 60,000+ with direct calls)
```

#### Workflow 2: Implementation Log Analysis

```typescript
import { analyzeImplementationLogs } from "./skills/spec-workflow-analyzer.ts";

const analysis = await analyzeImplementationLogs({
  projectRoot: "/home/headon/projects/headon",
  specName: "contact-form-enhancement",
  analysis: {
    findDuplicateAPIs: true,
    componentUsage: true,
    integrationPatterns: true,
    taskStatistics: true,
  },
});

// Returns detailed findings without sending 100KB of logs to LLM
return analysis.findings.join("\n");

// Token usage: ~800 (vs. 25,000+ with direct query)
```

### C. Troubleshooting Guide

#### Issue: "MCP Server connection failed"

**Symptom:** `Error: Failed to connect to task-master`

**Solution:**
1. Check server is installed: `which task-master` oder `npx -y @headon/task-master --version`
2. Verify config: `cat config/mcp-servers.json`
3. Test manually: `deno run src/mcp-client.ts`
4. Check logs: `tail -f ~/.local/share/mcp-code-runtime/logs/server.log`

#### Issue: "Execution timeout"

**Symptom:** `Error: Execution timeout after 30000ms`

**Solution:**
1. Increase timeout: `execute_code({ code, timeout: 60000 })`
2. Optimize code: Reduce unnecessary operations
3. Check MCP server response times
4. Use caching for repeated calls

#### Issue: "Type errors in executed code"

**Symptom:** TypeScript compilation errors

**Solution:**
1. Regenerate types: `deno task generate-types`
2. Check import paths: `import * as x from "mcp://server-name"`
3. Verify MCP server version compatibility
4. Use `@ts-ignore` sparingly for dynamic scenarios

---

## Conclusion

Diese Migration zu Code Execution ermöglicht:

1. **Massive Effizienzgewinne** (80-98% Token-Reduktion)
2. **Neue Workflow-Möglichkeiten** (komplexe Multi-Tool-Orchestrierung)
3. **Bessere Entwickler-Experience** (wiederverwendbare Skills)
4. **Skalierbarkeit** (mehr Tools ohne Context-Explosion)

**Empfehlung:** Start mit Phase 1 (Foundation) in den nächsten 2 Wochen. Quick Win mit "Diagnostics-to-Tasks" Skill demonstrieren, dann schrittweise erweitern.

**Ready to start?** Nächster Schritt: Repository setup und erste Code Execution.
