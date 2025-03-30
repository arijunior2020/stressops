import { useState } from "react";
import { StressForm } from "../components/StressForm";
import { StressHistory } from "../components/StressHistory";
import { StressRecord } from "../types/stress";

export default function Home() {
  const [lastResult, setLastResult] = useState<StressRecord | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  return (
    <div className="container">
      <h1>
        <span role="img" aria-label="fire">
          🔥
        </span>{" "}
        StressOps DevOps Deploys
      </h1>
      <p className="small">
        <h2>
          Avalie o nível de estresse da sua equipe com base nos dados de
          operação.
        </h2>
      </p>

      <StressForm onResult={setLastResult} />

      {lastResult && (
        <div className="last-result">
          <h2>🧾 Último Resultado</h2>
          <p>
            <strong>
              {new Date(lastResult.timestamp).toLocaleString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </strong>{" "}
            — {lastResult.nivel} {lastResult.emoji}
          </p>
          <p>{lastResult.mensagem}</p>
          <p>
            <small>
              Deploys: {lastResult.deploys}, Erros: {lastResult.erros}, Tempo:{" "}
              {lastResult.tempoResposta}, Score: {lastResult.score.toFixed(2)}
            </small>
          </p>
        </div>
      )}

      <button onClick={() => setShowHistory(!showHistory)}>
        {showHistory ? "🔽 Ocultar Histórico" : "📊 Ver Histórico"}
      </button>

      {showHistory && <StressHistory />}
    </div>
  );
}
