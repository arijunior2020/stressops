import { useState } from "react";
import { calcularStress } from "../api/stress";
import { StressInput, StressResult } from "../types/stress";

export const StressForm = ({
  onResult,
}: {
  onResult: (r: StressResult) => void;
}) => {
  const [formData, setFormData] = useState<StressInput>({
    deploys: 0,
    erros: 0,
    tempoResposta: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await calcularStress(formData);
    onResult(result);
    setFormData({ deploys: 0, erros: 0, tempoResposta: 0 });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <h3>Quantidade de Deploys 🚀</h3>
        <input
          name="deploys"
          type="number"
          value={formData.deploys}
          onChange={handleChange}
          placeholder="Ex: 10"
          required
        />
      </label>

      <label>
        <h3>Quantidade de Erros ❌</h3>
        <input
          name="erros"
          type="number"
          value={formData.erros}
          onChange={handleChange}
          placeholder="Ex: 5"
          required
        />
      </label>

      <label>
        <h3>Tempo de Resposta (segundos) ⏱️</h3>
        <input
          name="tempoResposta"
          type="number"
          value={formData.tempoResposta}
          onChange={handleChange}
          placeholder="Ex: 300"
          required
        />
      </label>

      <button type="submit">📈 Calcular</button>
    </form>
  );
};
