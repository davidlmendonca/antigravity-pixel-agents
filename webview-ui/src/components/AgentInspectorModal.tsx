import React from 'react';

import { Modal } from './ui/Modal.js';

export interface AgentInspectorData {
  id: number;
  name: string;
  teamName?: string;
  status?: string;
  activeToolName?: string;
  isWaiting?: boolean;
  permissionSent?: boolean;
  isExternal?: boolean;
  folderName?: string;
}

interface AgentInspectorModalProps {
  agent: AgentInspectorData | null;
  onClose: () => void;
}

export const AgentInspectorModal: React.FC<AgentInspectorModalProps> = ({ agent, onClose }) => {
  if (!agent) return null;

  const isLaryStyle = agent.name.includes('Lary') || agent.teamName === 'Capture xCRM';
  const isAntigravity = agent.name.includes('Antigravity') || agent.name.includes('Agent');

  return (
    <Modal isOpen={Boolean(agent)} onClose={onClose} title={`🤖 Inspecionar Agente - ${agent.name}`}>
      <div className="space-y-4 text-sm text-gray-200 p-2">
        {/* Header Badge */}
        <div className="flex items-center justify-between bg-gray-800/80 p-3 rounded-lg border border-gray-700">
          <div>
            <h3 className="font-bold text-lg text-amber-400 flex items-center gap-2">
              {isLaryStyle ? '👩‍💼' : isAntigravity ? '⚡' : '🤖'} {agent.name}
            </h3>
            <p className="text-xs text-gray-400">
              Equipe: <span className="text-gray-300 font-medium">{agent.teamName || 'Google Antigravity'}</span>
            </p>
          </div>
          <span
            className={`px-2.5 py-1 text-xs rounded-full font-semibold ${
              agent.isWaiting
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
            }`}
          >
            {agent.isWaiting ? '⚠️ Aguardando Aprovação' : '🟢 Ativo'}
          </span>
        </div>

        {/* Status Box */}
        <div className="bg-gray-900/90 p-3.5 rounded-lg border border-gray-800 space-y-2">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Atividade em Tempo Real
          </div>
          <div className="text-base font-medium text-white break-words">
            {agent.status || 'Aguardando próxima tarefa ou comando...'}
          </div>

          {agent.activeToolName && (
            <div className="mt-2 pt-2 border-t border-gray-800 flex items-center justify-between text-xs">
              <span className="text-gray-400">Ferramenta em uso:</span>
              <code className="bg-gray-800 px-2 py-0.5 rounded text-amber-300 font-mono">
                {agent.activeToolName}
              </code>
            </div>
          )}
        </div>

        {/* Waiting Approval Alert */}
        {agent.isWaiting && (
          <div className="bg-amber-950/60 border border-amber-500/40 p-3 rounded-lg text-amber-200 text-xs leading-relaxed space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-amber-300">
              <span>⚠️ Confirmação Necessária</span>
            </div>
            <div>
              Este agente está aguardando sua autorização no <strong>Chat do Antigravity</strong> para executar o comando ou alterar o arquivo.
            </div>
          </div>
        )}

        {/* Info Tip */}
        <div className="text-xs text-gray-400 bg-gray-800/40 p-2.5 rounded border border-gray-700/50">
          💡 <strong>Dica de Controle:</strong> As tarefas e comandos são gerenciados diretamente pelo Chat do Antigravity. Os bonequinhos em Pixel Art refletem visualmente todas as ações e ferramentas em execução.
        </div>

        {/* Close Button */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors"
          >
            Fechar Inspector
          </button>
        </div>
      </div>
    </Modal>
  );
};
