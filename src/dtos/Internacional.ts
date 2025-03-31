export type Pagamento = {
  id: number;
  dataInicial: string;  // ou Date se for convertido para objeto Date
  dataFinal: string;    // ou Date se for convertido para objeto Date
  dataProcessamento: string;  // ou Date se for convertido para objeto Date
  status: "PROCESSADO" | "PENDENTE" | "CANCELADO"; // Enum de possíveis status
  totalLiquido: number;
};
