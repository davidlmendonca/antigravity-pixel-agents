import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

import type { AgentEvent, HookProvider } from '../../../../../core/src/provider.js';
import {
  BASH_COMMAND_DISPLAY_MAX_LENGTH,
  TASK_DESCRIPTION_DISPLAY_MAX_LENGTH,
} from '../../../constants.js';

export function formatToolStatus(toolName: string, input?: unknown): string {
  const inp = (input ?? {}) as Record<string, unknown>;
  const base = (p: unknown) => (typeof p === 'string' ? path.basename(p) : '');

  switch (toolName) {
    case 'view_file':
      return `Reading ${base(inp.AbsolutePath || inp.TargetFile)}`;
    case 'replace_file_content':
    case 'multi_replace_file_content':
      return `Editing ${base(inp.TargetFile)}`;
    case 'write_to_file':
      return `Creating ${base(inp.TargetFile)}`;
    case 'run_command': {
      const cmd = (inp.CommandLine as string) || '';
      return `Running: ${cmd.length > BASH_COMMAND_DISPLAY_MAX_LENGTH ? cmd.slice(0, BASH_COMMAND_DISPLAY_MAX_LENGTH) + '\u2026' : cmd}`;
    }
    case 'grep_search':
      return 'Searching code';
    case 'list_dir':
      return 'Listing files';
    case 'search_web':
    case 'read_url_content':
      return 'Searching web';
    case 'browser_subagent':
      return 'Browsing web';
    case 'invoke_subagent': {
      const desc = typeof inp.Task === 'string' ? inp.Task : '';
      return desc
        ? `Subtask: ${desc.length > TASK_DESCRIPTION_DISPLAY_MAX_LENGTH ? desc.slice(0, TASK_DESCRIPTION_DISPLAY_MAX_LENGTH) + '\u2026' : desc}`
        : 'Running subtask';
    }
    case 'ask_question':
      return 'Waiting for your answer';
    case 'manage_task':
      return 'Managing background tasks';
    case 'schedule':
      return 'Scheduling task';
    default:
      return `Using ${toolName}`;
  }
}

function getSessionDirs(_workspacePath: string): string[] {
  const brainDir = path.join(os.homedir(), '.gemini', 'antigravity-ide', 'brain');
  if (!fs.existsSync(brainDir)) {
    return [brainDir];
  }

  try {
    const entries = fs.readdirSync(brainDir, { withFileTypes: true });
    const sessionDirs: string[] = [];

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const logsDir = path.join(brainDir, entry.name, '.system_generated', 'logs');
        if (fs.existsSync(logsDir)) {
          sessionDirs.push(logsDir);
        }
      }
    }

    if (sessionDirs.length > 0) {
      // Sort by mtime descending (newest first)
      sessionDirs.sort((a, b) => {
        const statA = fs.statSync(a);
        const statB = fs.statSync(b);
        return statB.mtimeMs - statA.mtimeMs;
      });
      return sessionDirs;
    }
  } catch (err) {
    console.error('[Antigravity Provider] Error scanning session dirs:', err);
  }

  return [brainDir];
}

function buildLaunchCommand(
  sessionId: string,
): { command: string; args: string[] } {
  return { command: 'echo', args: ['"Conectado ao Antigravity Agent - Sessão:', sessionId + '"'] };
}

export const antigravityProvider: HookProvider & {
  getSessionDirs: (workspacePath: string) => string[];
  buildLaunchCommand: (sessionId: string) => { command: string; args: string[] };
  readTools: ReadonlySet<string>;
} = {
  kind: 'hook',
  id: 'antigravity',
  displayName: 'Antigravity (DeepMind)',
  protocolVersion: 1,

  getSessionDirs,
  buildLaunchCommand,

  normalizeHookEvent(raw: Record<string, unknown>): {
    sessionId: string;
    event: AgentEvent;
  } | null {
    const sessionId = (raw.sessionId as string) || 'default-session';
    const type = raw.type as string;

    if (type === 'PLANNER_RESPONSE' && Array.isArray(raw.tool_calls)) {
      const toolCalls = raw.tool_calls as Array<{ name: string; args?: unknown }>;
      if (toolCalls.length > 0) {
        const first = toolCalls[0];
        return {
          sessionId,
          event: {
            kind: 'toolStart',
            toolId: `${raw.step_index || Date.now()}`,
            toolName: first.name,
            input: first.args,
          },
        };
      }
    }

    if (type === 'USER_INPUT') {
      return {
        sessionId,
        event: {
          kind: 'turnEnd',
          awaitingInput: false,
        },
      };
    }

    return null;
  },

  async installHooks(): Promise<void> {
    // Antigravity logs directly to JSONL, no hooks script installation needed
  },

  async uninstallHooks(): Promise<void> {
    // No-op
  },

  async areHooksInstalled(): Promise<boolean> {
    return true;
  },

  formatToolStatus,

  permissionExemptTools: new Set([
    'view_file',
    'grep_search',
    'list_dir',
    'search_web',
    'read_url_content',
  ]),

  subagentToolNames: new Set(['browser_subagent', 'invoke_subagent']),

  readingTools: new Set([
    'view_file',
    'grep_search',
    'list_dir',
    'search_web',
    'read_url_content',
  ]),

  readTools: new Set([
    'view_file',
    'grep_search',
    'list_dir',
    'search_web',
    'read_url_content',
  ]),
};
