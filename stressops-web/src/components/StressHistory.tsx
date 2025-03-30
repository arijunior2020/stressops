import { useEffect, useState } from "react";
import { getStressList } from "../api/stress";
import { StressRecord } from "../types/stress";

export function StressHistory() {
  const [data, setData] = useState<StressRecord[]>([]);

  useEffect(() => {
    getStressList().then(setData);
  }, []);

  return (
    <div>
      <h2>📜 Histórico de Cálculos</h2>

      {data.map((item) => (
        <div className="history-item" key={item.id}>
          <strong>
            {new Date(item.timestamp).toLocaleString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </strong>{" "}
          —{" "}
          <span>
            {item.nivel} {item.emoji}
          </span>
          <p>{item.mensagem}</p>
          <p className="small">
            Deploys: {item.deploys}, Erros: {item.erros}, Tempo:{" "}
            {item.tempoResposta}, Score: {item.score.toFixed(2)}
          </p>
        </div>
      ))}
    </div>
  );
}
