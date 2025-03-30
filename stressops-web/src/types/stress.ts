export interface StressInput {
  deploys: number;
  erros: number;
  tempoResposta: number;
}

export interface StressResult extends StressInput {
  id: string;
  timestamp: string;
  score: number;
  nivel: string;
  emoji: string;
  mensagem: string;
}

export interface StressRecord {
  id: string;
  timestamp: string;
  deploys: number;
  erros: number;
  tempoResposta: number;
  score: number;
  nivel: string;
  emoji: string;
  mensagem: string;
}
