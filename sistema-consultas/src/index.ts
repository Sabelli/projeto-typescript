import type { Especialidade } from "./types/especialidade";
import type { Paciente } from "./types/paciente";
import type { StatusConsulta } from "./types/statusConsulta";
import type { Medico } from "./interfaces/medico";
import type { Consulta } from "./interfaces/consulta";

const cardiologia: Especialidade = {
  id: 1,
  nome: "Cardiologia",
};
const pediatria: Especialidade = {
  id: 2,
  nome: "Pediatria",
};
const urologia: Especialidade = {
  id: 3,
  nome: "Urologia",
};
const medico1: Medico = {
  id: 1,
  nome: "Dr. Roberto Silva",
  crm: "CRM12345",
  especialidade: cardiologia,
  ativo: true,
};
const medico2: Medico = {
  id: 2,
  nome: "Dr. Cláudio Castro",
  crm: "CRM12235",
  especialidade: pediatria,
  ativo: true,
};
const medico3: Medico = {
  id: 3,
  nome: "Dr. Robson",
  crm: "CRM44235",
  especialidade: urologia,
  ativo: true,
};
const paciente1: Paciente = {
  id: 1,
  nome: "Carlos Andrade",
  cpf: "123.456.789-00",
  email: "carlos@email.com",
};
const paciente2: Paciente = {
  id: 2,
  nome: "Pedro Almeida",
  cpf: "133.466.777-01",
  email: "pedro@email.com",
};
const paciente3: Paciente = {
  id: 3,
  nome: "Júlio Rosa",
  cpf: "223.467.889-11",
  email: "julio@email.com",
};

function criarConsulta(
  id: number,
  medico: Medico,
  paciente: Paciente,
  data: Date,
  valor: number
): Consulta {
  return {
    id,
    medico,
    paciente,
    data,
    valor,
    status: "agendada",
  };
}

function confirmarConsulta(consulta: Consulta): Consulta {
  return {
    ...consulta,
    status: "confirmada",
  };
}

function realizarConsulta(consulta: Consulta): Consulta {
  return {
    ...consulta,
    status: "realizada",
  };
}

function cancelarConsulta(consulta: Consulta): Consulta | null {
  if (consulta.status === "realizada") {
    return null;
  }
  return {
    ...consulta,
    status: "cancelada",
  };
}

function exibirConsulta(consulta: Consulta): string {
  const valorFormatado = consulta.valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return `
Consulta #${consulta.id}
Médico: ${consulta.medico.nome}
Paciente: ${consulta.paciente.nome}
Especialidade: ${consulta.medico.especialidade.nome}
Data: ${consulta.data.toLocaleDateString("pt-BR")}
Valor: ${valorFormatado}
Status: ${consulta.status}
`;
}

const consulta1 = criarConsulta(
  1,
  medico1,
  paciente1,
  new Date(),
  350
);
const consulta2 = criarConsulta(
  2,
  medico2,
  paciente2,
  new Date("2026-05-30"),
  1044,
);
const consulta3 = criarConsulta(
  3,
  medico3,
  paciente3,
  new Date("2026-10-06"),
  588
);
const consulta4 = criarConsulta(
  4,
  medico3,
  paciente1,
  new Date("2026-02-25"),
  430
);
const consulta5 = criarConsulta(
  5,
  medico3,
  paciente2,
  new Date("2026-02-25"),
  666
);
const consultaConfirmada = confirmarConsulta(consulta1);
console.log("=== CONSULTA CONFIRMADA ===");
console.log(exibirConsulta(consultaConfirmada));

function listarConsultasPorStatus(
  consultas: Consulta[],
  status: StatusConsulta
): Consulta[] {
    return consultas.filter(consulta => consulta.status === status);
}

const consultas: Consulta[] = [consulta1, consulta2, consulta3, consulta4, consulta5];

console.log("=== LISTANDO CONSULTAS AGENDADAS ===")
console.log(listarConsultasPorStatus(consultas, "agendada"));

function listarConsultasFuturas(
  consultas: Consulta[]
): Consulta[] {
    return consultas.filter(consulta => consulta.data > new Date());
}

console.log("=== LISTANDO CONSULTAS FUTURAS ===")
console.log(listarConsultasFuturas(consultas));

function calcularFaturamento(
  consultas: Consulta[]
): number {
    const realizadas = consultas.filter(consulta => consulta.status === "realizada");
    const total = realizadas.reduce((acc, consulta) => acc + consulta.valor, 0);
    return total;
}

console.log("=== FATURAMENTO ===")
console.log(calcularFaturamento(consultas))