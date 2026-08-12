"use client";

import {
  Fragment,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ESTENOSE_OPCOES,
  chaveChammas,
  chaveEstenose,
  chaveHcMedida,
  chaveHcOn,
  chaveIndiceEsplenico,
  chaveIr,
  chaveIp,
  chaveLagalla,
  chaveLesoes,
  chaveLocalizacao,
  chaveMedida,
  chaveTirads,
  chaveVel,
  chaveVascLesao,
  exames,
  getExame,
  ajustarExameAxilas,
  ajustarExameBolsaTesticular,
  ajustarExameCotovelo,
  ajustarExameDermatologico,
  ajustarExameJoelho,
  ajustarExameMao,
  ajustarExameMamas,
  ajustarExameMusculo,
  ajustarExameOmbro,
  ajustarExamePe,
  ajustarExamePelvicaTv,
  ajustarExamePunho,
  ajustarExameQuadril,
  ajustarExameRegiaoInguinal,
  ajustarExameTireoide,
  ajustarExameTornozelo,
  ajustarExameMmiiVenoso,
  ajustarExameMmiiArterial,
  idsSelecionados,
  lesaoVazia,
  opcaoEhCalculoVesical,
  opcaoEhReplecaoBexiga,
  opcaoMedidaHepatocoledoco,
  opcaoPermiteMultiplasLesoes,
  opcaoRequerDopplerNodulo,
  opcaoRequerEstenose,
  opcaoRequerIndiceEsplenico,
  opcaoRequerLocalizacao,
  opcaoRequerMedida,
  opcaoRequerTirads,
  opcaoRequerVascLesao,
  secaoPermiteMultiplo,
  tiradsPadraoOpcao,
  VASC_LESAO_OPCOES,
  type Exame,
  type LesaoItem,
  type Secao,
} from "@/data/exames";
import {
  chaveMaoDedoAchado,
  MSK_DOPPLER_KEYS,
  opcaoEhQuirodactilo,
  QUIRODACTILOS,
} from "@/data/mskExames";
import MedicoSolicitanteField from "@/components/MedicoSolicitanteField";
import PacienteNomeField from "@/components/PacienteNomeField";
import ConsultaLaudosModal from "@/components/ConsultaLaudosModal";
import {
  categoriasExame,
  categoriaDoExame,
  distribuirEmColunas,
  examesDaCategoria,
  examesDaCategoriaAlfabetico,
  type CategoriaExameId,
} from "@/data/categorias";
import {
  OBS_PADRAO_IDS,
  modalidadesCorrelacao,
  observacoesDoExame,
  observacoesPadraoIdsDoExame,
} from "@/data/observacoes";
import { tabelasDoExame, tabelasPadraoDoExame } from "@/data/tabelas";
import type { SessaoMedico } from "@/lib/auth";
import { MASTER_PASS, formatarDataBr } from "@/lib/auth";
import {
  aplicarGinecomastiaMasculino,
  GINECO_FASES,
  GINECO_LADOS,
  gerarImpressaoDiagnostica,
  ladoGinecomastiaInferido,
  opcaoEhNormal,
  temGinecomastiaMamaMasculino,
} from "@/lib/impressao";
import {
  exameComLado,
  exameEhMmiiComLado,
  exameEhMusculoEsqueletico,
  exameRequerLado,
  impressaoComLado,
  ladoOposto,
  nomeExameComLado,
  rotuloLado,
  type LadoArticulacao,
} from "@/lib/ladoMsk";
import {
  CHAVE_FORM_VENOSO,
  gravarFormVenoso,
  lerFormVenoso,
} from "@/lib/mmiiVenosoForm";
import MmiiVenosoPainel from "@/components/MmiiVenosoPainel";
import {
  laudoParaHtml,
  laudoTextoLimpo,
  montarLaudos,
  novoExameAnterior,
  selecoesPadrao,
  type DadosPaciente,
  type DimensoesMap,
  type ExameAnterior,
  type LesoesMap,
  type Medidas,
  type Selecoes,
  type Volumes,
} from "@/lib/montarLaudo";
import {
  salvarPacienteLaudo,
  type BlocoSalvo,
  type PacienteSalvo,
} from "@/lib/pacientesSalvos";
import {
  camposDimensoesNaSecao,
  dimensoesVazias,
  exameTemVolumeTotalTireoide,
  formatarNumeroBr,
  pesoProstataDeVolume,
  volumeDeDimensoes,
  volumeTotalTireoide,
} from "@/lib/volumes";

const pacienteVazio = (): DadosPaciente => ({
  nome: "",
  idade: "",
  data: new Date().toLocaleDateString("pt-BR"),
  solicitante: "",
  indicacao: "",
});

function aplicarPlaceholdersImpressao(
  exameId: string,
  impressao: string,
  volumes: Volumes,
  selecoes: Selecoes,
): string {
  let out = impressao;
  if (exameId === "partes-moles") {
    out = out
      .split("{{REGIAO}}")
      .join((volumes["pm-regiao"] ?? "").trim() || "[INSERIR REGIÃO]");
  }
  if (exameId === "mamas-masculino") {
    const lado =
      (volumes["gineco-lado"] ?? "").trim() ||
      ladoGinecomastiaInferido(selecoes) ||
      "bilateral/direita/esquerda";
    const fase =
      (volumes["gineco-fase"] ?? "").trim() ||
      "nodular / dendrítica / quiescente";
    out = aplicarGinecomastiaMasculino(out, lado, fase);
  }
  return out;
}

type BlocoUI = {
  key: string;
  exameId: string;
  /** Lateridade MSK (direito / esquerdo) */
  lado?: LadoArticulacao | null;
  /** false = usuário desmarcou “laudo normal” */
  laudoNormalAtivo?: boolean;
  selecoes: Selecoes;
  impressao: string;
  /** Se true, não sobrescreve a impressão ao mudar achados */
  impressaoManual: boolean;
  observacoesIds: string[];
  examesAnteriores: ExameAnterior[];
  medidas: Medidas;
  lesoes: LesoesMap;
  volumes: Volumes;
  dimensoes: DimensoesMap;
  tabelasIds: string[];
};

function novoBloco(
  exameId: string,
  lado?: LadoArticulacao | null,
): BlocoUI {
  const exameBase = getExame(exameId)!;
  const exame = exameAjustadoDoBloco(exameBase, {}, lado ?? null);
  const selecoes = selecoesPadrao(exame);
  let impressao = gerarImpressaoDiagnostica(exame, selecoes);
  if (lado && !(exameId in MSK_DOPPLER_KEYS) && !exameEhMmiiComLado(exameId)) {
    impressao = impressaoComLado(impressao, exame, lado);
  }
  return {
    key: `${exameId}-${lado ?? "x"}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    exameId,
    lado: lado ?? null,
    selecoes,
    impressao,
    impressaoManual: false,
    observacoesIds: [],
    examesAnteriores: [novoExameAnterior()],
    medidas: {},
    lesoes: {},
    volumes: {},
    dimensoes: {},
    tabelasIds: tabelasPadraoDoExame(exameId),
  };
}

function blocoParaSalvo(b: BlocoUI): BlocoSalvo {
  return {
    key: b.key,
    exameId: b.exameId,
    lado: b.lado ?? null,
    selecoes: b.selecoes,
    impressao: b.impressao,
    impressaoManual: b.impressaoManual,
    observacoesIds: b.observacoesIds,
    examesAnteriores: b.examesAnteriores,
    medidas: b.medidas,
    lesoes: b.lesoes,
    volumes: b.volumes,
    dimensoes: b.dimensoes,
    tabelasIds: b.tabelasIds,
  };
}

function normalizarExameIdSalvo(exameId: string): string {
  if (exameId === "tireoide-doppler") return "tireoide";
  if (exameId === "bolsa-testicular-doppler") return "bolsa-testicular";
  if (exameId === "mamas-doppler") return "mamas";
  if (exameId === "axilas-doppler") return "axilas";
  if (exameId === "pelvica-tv-doppler") return "pelvica-tv";
  return exameId;
}

function volumesDopplerDoSalvo(
  exameId: string,
  volumes: Volumes,
): Volumes {
  const out = { ...volumes };
  if (exameId === "tireoide-doppler") out["tireoide-doppler"] = "1";
  if (exameId === "bolsa-testicular-doppler") out["bolsa-doppler"] = "1";
  if (exameId === "mamas-doppler") out["mamas-doppler"] = "1";
  if (exameId === "axilas-doppler") out["axilas-doppler"] = "1";
  if (exameId === "pelvica-tv-doppler") out["pelvica-tv-doppler"] = "1";
  return out;
}

function exameAjustadoDoBloco(
  exameBase: Exame,
  volumes: Volumes,
  lado: LadoArticulacao | null = null,
): Exame {
  let exame = exameComLado(exameBase, lado);
  exame = ajustarExameDermatologico(exame, volumes["derm-doppler"] === "1");
  exame = ajustarExameTireoide(exame, volumes["tireoide-doppler"] === "1");
  exame = ajustarExameRegiaoInguinal(exame, volumes["inguinal-doppler"] === "1");
  exame = ajustarExameBolsaTesticular(exame, volumes["bolsa-doppler"] === "1");
  exame = ajustarExameMamas(exame, volumes["mamas-doppler"] === "1");
  exame = ajustarExameAxilas(exame, volumes["axilas-doppler"] === "1");
  exame = ajustarExamePelvicaTv(exame, volumes["pelvica-tv-doppler"] === "1");
  exame = ajustarExameOmbro(exame, volumes["ombro-doppler"] === "1", lado);
  exame = ajustarExameCotovelo(
    exame,
    volumes["cotovelo-doppler"] === "1",
    lado,
  );
  exame = ajustarExamePunho(exame, volumes["punho-doppler"] === "1", lado);
  exame = ajustarExameMao(exame, volumes["mao-doppler"] === "1", lado);
  exame = ajustarExameJoelho(
    exame,
    volumes["joelho-doppler"] === "1",
    lado,
  );
  exame = ajustarExameQuadril(exame, volumes["quadril-doppler"] === "1", lado);
  exame = ajustarExameTornozelo(
    exame,
    volumes["tornozelo-doppler"] === "1",
    lado,
  );
  exame = ajustarExamePe(exame, volumes["pe-doppler"] === "1", lado);
  exame = ajustarExameMusculo(exame, volumes["musculo-doppler"] === "1");
  exame = ajustarExameMmiiVenoso(exame, lado);
  exame = ajustarExameMmiiArterial(exame, lado);
  return exame;
}

function salvoParaBloco(b: BlocoSalvo): BlocoUI {
  const volumes = volumesDopplerDoSalvo(b.exameId, b.volumes);
  return {
    key: b.key,
    exameId: normalizarExameIdSalvo(b.exameId),
    lado: b.lado ?? null,
    selecoes: b.selecoes,
    impressao: b.impressao,
    impressaoManual: b.impressaoManual,
    observacoesIds: b.observacoesIds,
    examesAnteriores: b.examesAnteriores,
    medidas: b.medidas,
    lesoes: b.lesoes,
    volumes,
    dimensoes: b.dimensoes,
    tabelasIds: b.tabelasIds,
  };
}

/** Marca todas as seções no padrão/normal + observações padrão */
function aplicarLaudoNormalNoBloco(bloco: BlocoUI): BlocoUI {
  const exameBase = getExame(bloco.exameId);
  if (!exameBase) return bloco;
  const volumes: Volumes = {};
  if (bloco.exameId === "partes-moles") {
    volumes["pm-regiao"] = bloco.volumes["pm-regiao"] ?? "";
  }
  if (bloco.volumes["derm-doppler"] === "1") {
    volumes["derm-doppler"] = "1";
  }
  if (bloco.volumes["tireoide-doppler"] === "1") {
    volumes["tireoide-doppler"] = "1";
  }
  if (bloco.volumes["inguinal-doppler"] === "1") {
    volumes["inguinal-doppler"] = "1";
  }
  if (bloco.volumes["bolsa-doppler"] === "1") {
    volumes["bolsa-doppler"] = "1";
  }
  if (bloco.volumes["mamas-doppler"] === "1") {
    volumes["mamas-doppler"] = "1";
  }
  if (bloco.volumes["axilas-doppler"] === "1") {
    volumes["axilas-doppler"] = "1";
  }
  if (bloco.volumes["pelvica-tv-doppler"] === "1") {
    volumes["pelvica-tv-doppler"] = "1";
  }
  if (bloco.volumes["cotovelo-doppler"] === "1") {
    volumes["cotovelo-doppler"] = "1";
  }
  if (bloco.volumes["joelho-doppler"] === "1") {
    volumes["joelho-doppler"] = "1";
  }
  for (const key of Object.values(MSK_DOPPLER_KEYS)) {
    if (bloco.volumes[key] === "1") volumes[key] = "1";
  }
  if (bloco.exameId === "musculo") {
    volumes["musculo-regiao"] = bloco.volumes["musculo-regiao"] ?? "";
  }
  let exame = exameAjustadoDoBloco(exameBase, volumes, bloco.lado);
  const selecoes = selecoesPadrao(exame);
  if (volumes["tireoide-doppler"] === "1") {
    selecoes.doppler = "normal";
  }
  if (volumes["bolsa-doppler"] === "1") {
    if (!selecoes["plexo-direito"]) selecoes["plexo-direito"] = "normal";
    if (!selecoes["plexo-esquerdo"]) selecoes["plexo-esquerdo"] = "normal";
  }
  if (volumes["pelvica-tv-doppler"] === "1") {
    if (!selecoes.doppler) selecoes.doppler = "normal";
  }
  let impressao = gerarImpressaoDiagnostica(exame, selecoes);
  if (bloco.lado) impressao = impressaoComLado(impressao, exame, bloco.lado);
  return {
    ...bloco,
    laudoNormalAtivo: true,
    selecoes,
    impressao,
    impressaoManual: false,
    observacoesIds: observacoesPadraoIdsDoExame(bloco.exameId),
    examesAnteriores: [novoExameAnterior()],
    medidas: {},
    lesoes: {},
    volumes,
    dimensoes: {},
    tabelasIds: tabelasPadraoDoExame(bloco.exameId),
  };
}

function checkboxLaudoNormal(bloco: BlocoUI): boolean {
  if (bloco.laudoNormalAtivo === false) return false;
  return blocoEstaLaudoNormal(bloco);
}

function blocoEstaLaudoNormal(bloco: BlocoUI): boolean {
  const exame = getExame(bloco.exameId);
  if (!exame) return false;
  const padrao = selecoesPadrao(exame);
  for (const secao of exame.secoes) {
    const atual = JSON.stringify(bloco.selecoes[secao.id] ?? "");
    const esp = JSON.stringify(padrao[secao.id] ?? "");
    if (atual !== esp) return false;
  }
  const idsPadrao = observacoesPadraoIdsDoExame(bloco.exameId);
  const obsOk = idsPadrao.every((id) => bloco.observacoesIds.includes(id));
  return obsOk;
}

function limparMedidasOrfas(
  medidas: Medidas,
  secao: Secao,
  idsAtivos: string[],
): Medidas {
  const next = { ...medidas };
  delete next[secao.id];
  for (const op of secao.opcoes) {
    const ativo = idsAtivos.includes(op.id);
    const k = chaveMedida(secao.id, op.id);
    const kLoc = chaveLocalizacao(secao.id, op.id);
    const kEst = chaveEstenose(secao.id, op.id);
    const kHcOn = chaveHcOn(secao.id, op.id);
    const kHc = chaveHcMedida(secao.id, op.id);
    const kInd = chaveIndiceEsplenico(secao.id, op.id);
    const kTirads = chaveTirads(secao.id, op.id);
    const kChammas = chaveChammas(secao.id, op.id);
    const kLagalla = chaveLagalla(secao.id, op.id);
    const kIr = chaveIr(secao.id, op.id);
    const kIp = chaveIp(secao.id, op.id);
    const kVel = chaveVel(secao.id, op.id);
    const kVasc = chaveVascLesao(secao.id, op.id);

    if (!ativo || !opcaoRequerMedida(op)) delete next[k];
    if (!ativo || !opcaoRequerLocalizacao(op, secao)) delete next[kLoc];
    if (!ativo || !opcaoRequerEstenose(op)) delete next[kEst];
    if (!ativo || !opcaoMedidaHepatocoledoco(op, secao)) {
      delete next[kHcOn];
      delete next[kHc];
    }
    if (!ativo || !opcaoRequerIndiceEsplenico(op)) delete next[kInd];
    if (!ativo || !opcaoRequerVascLesao(op)) delete next[kVasc];
    if (!ativo || !opcaoRequerTirads(op)) {
      delete next[kTirads];
      delete next[kChammas];
      delete next[kLagalla];
      delete next[kIr];
      delete next[kIp];
      delete next[kVel];
    } else if (!ativo || !opcaoRequerDopplerNodulo(op)) {
      delete next[kChammas];
      delete next[kLagalla];
      delete next[kIr];
      delete next[kIp];
      delete next[kVel];
    }
  }
  return next;
}

function limparLesoesOrfas(
  lesoes: LesoesMap,
  secao: Secao,
  idsAtivos: string[],
): LesoesMap {
  const next = { ...lesoes };
  for (const op of secao.opcoes) {
    const k = chaveLesoes(secao.id, op.id);
    if (!idsAtivos.includes(op.id) || !opcaoPermiteMultiplasLesoes(op)) {
      delete next[k];
    }
  }
  return next;
}

function lesoesDaOpcao(
  bloco: BlocoUI,
  secao: Secao,
  opcaoId: string,
): LesaoItem[] {
  const k = chaveLesoes(secao.id, opcaoId);
  const atuais = bloco.lesoes[k];
  if (atuais && atuais.length > 0) return atuais;
  return [
    {
      medida: bloco.medidas[chaveMedida(secao.id, opcaoId)] ?? "",
      local: bloco.medidas[chaveLocalizacao(secao.id, opcaoId)] ?? "",
    },
  ];
}

type Props = {
  medico: SessaoMedico;
};

export type LaudoBuilderHandle = {
  carregarPacienteSalvo: (salvo: PacienteSalvo) => void;
  salvarLaudoAtual: () => PacienteSalvo | null;
};

const LaudoBuilder = forwardRef<LaudoBuilderHandle, Props>(function LaudoBuilder(
  { medico },
  ref,
) {
  const [blocos, setBlocos] = useState<BlocoUI[]>(() => [
    novoBloco(exames[0].id),
  ]);
  const [paciente, setPaciente] = useState<DadosPaciente>(pacienteVazio);
  const [idSalvoAtual, setIdSalvoAtual] = useState<string | undefined>();
  const [laudoAssinado, setLaudoAssinado] = useState(false);
  const [desbloquearAberto, setDesbloquearAberto] = useState(false);
  const [senhaMaster, setSenhaMaster] = useState("");
  const [erroMaster, setErroMaster] = useState("");
  const [copiado, setCopiado] = useState(false);
  const [salvoMsg, setSalvoMsg] = useState(false);
  const [assinadoMsg, setAssinadoMsg] = useState(false);
  const [textoManual, setTextoManual] = useState(false);
  const [htmlManual, setHtmlManual] = useState("");
  const [pickerAberto, setPickerAberto] = useState(false);
  const [consultaLaudosAberto, setConsultaLaudosAberto] = useState(false);
  const [categoriaAtiva, setCategoriaAtiva] = useState<CategoriaExameId>(
    () => categoriaDoExame(exames[0]?.id ?? "abdome-total"),
  );
  const [ladoPendente, setLadoPendente] = useState<{
    exameId: string;
    modo: "principal" | "acrescentar";
  } | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const examesTabsCols = useMemo(
    () => distribuirEmColunas(examesDaCategoriaAlfabetico(categoriaAtiva), 3),
    [categoriaAtiva],
  );

  const laudoGerado = useMemo(() => {
    const montados = blocos
      .map((b) => {
        const exameBase = getExame(b.exameId);
        if (!exameBase) return null;
        let exame = exameAjustadoDoBloco(exameBase, b.volumes, b.lado);
        return {
          exame,
          selecoes: b.selecoes,
          impressao: b.impressao,
          extras: {
            observacoesIds: b.observacoesIds,
            examesAnteriores: b.examesAnteriores,
            tabelasIds: b.tabelasIds,
          },
          medidas: b.medidas,
          lesoes: b.lesoes,
          volumes: b.volumes,
          dimensoes: b.dimensoes,
        };
      })
      .filter((x): x is NonNullable<typeof x> => x != null);
    return montarLaudos(montados, paciente);
  }, [blocos, paciente]);

  useEffect(() => {
    if (textoManual) return;
    const el = previewRef.current;
    if (!el) return;
    el.innerHTML = laudoParaHtml(laudoGerado, medico);
  }, [laudoGerado, textoManual, medico]);

  function resumoExamesAtual(): string {
    return blocos
      .map((b) => {
        const ex = getExame(b.exameId);
        if (!ex) return b.exameId;
        return nomeExameComLado(ex, b.lado);
      })
      .join(" + ");
  }

  function salvarLaudoAtual(opts?: { assinar?: boolean }): PacienteSalvo | null {
    if (laudoAssinado && !opts?.assinar) {
      window.alert(
        "Laudo assinado. Use a senha master para desbloquear antes de salvar alterações.",
      );
      return null;
    }
    if (!paciente.nome.trim()) {
      window.alert("Informe o nome do paciente antes de salvar.");
      return null;
    }
    const assinar = Boolean(opts?.assinar);
    const registro = salvarPacienteLaudo(medico.crm, {
      paciente,
      blocos: blocos.map(blocoParaSalvo),
      categoriaAtiva,
      resumoExames: resumoExamesAtual(),
      idExistente: idSalvoAtual,
      assinado: assinar || laudoAssinado,
    });
    setIdSalvoAtual(registro.id);
    if (assinar) {
      setLaudoAssinado(true);
      setAssinadoMsg(true);
      setTimeout(() => setAssinadoMsg(false), 2200);
    } else {
      setSalvoMsg(true);
      setTimeout(() => setSalvoMsg(false), 2000);
    }
    return registro;
  }

  function salvarEAssinar() {
    if (!medico.assinaturaJpg && medico.tipoAssinatura !== "certificado") {
      const ok = window.confirm(
        "Não há assinatura cadastrada no perfil. Deseja assinar e travar o laudo mesmo assim?",
      );
      if (!ok) return;
    }
    salvarLaudoAtual({ assinar: true });
  }

  function tentarDesbloquear() {
    if (senhaMaster !== MASTER_PASS) {
      setErroMaster("Senha master inválida.");
      return;
    }
    setLaudoAssinado(false);
    setDesbloquearAberto(false);
    setSenhaMaster("");
    setErroMaster("");
    if (idSalvoAtual) {
      salvarPacienteLaudo(medico.crm, {
        paciente,
        blocos: blocos.map(blocoParaSalvo),
        categoriaAtiva,
        resumoExames: resumoExamesAtual(),
        idExistente: idSalvoAtual,
        assinado: false,
      });
    }
  }

  function carregarPacienteSalvo(salvo: PacienteSalvo) {
    setPaciente({ ...salvo.paciente });
    setBlocos(salvo.blocos.map(salvoParaBloco));
    setCategoriaAtiva(
      (salvo.categoriaAtiva as CategoriaExameId) ||
        categoriaDoExame(salvo.blocos[0]?.exameId ?? "abdome-total"),
    );
    setIdSalvoAtual(salvo.id);
    setLaudoAssinado(Boolean(salvo.assinado));
    setTextoManual(false);
    setPickerAberto(false);
    setLadoPendente(null);
  }

  useImperativeHandle(ref, () => ({
    carregarPacienteSalvo,
    salvarLaudoAtual: () => salvarLaudoAtual(),
  }));

  function htmlDoLaudo(baseUrl: string) {
    if (textoManual && htmlManual.trim()) {
      // Reescreve src relativos das tabelas com origem absoluta ao copiar/imprimir
      if (!baseUrl) return htmlManual;
      return htmlManual.replace(
        /(src=")(\/tabelas\/[^"]+)(")/g,
        `$1${baseUrl.replace(/\/$/, "")}$2$3`,
      );
    }
    return laudoParaHtml(laudoGerado, medico, baseUrl);
  }

  function plainDoLaudo() {
    if (textoManual && htmlManual.trim()) {
      const tmp = document.createElement("div");
      tmp.innerHTML = htmlManual;
      return (tmp.innerText || tmp.textContent || "").trim();
    }
    return laudoTextoLimpo(laudoGerado, medico);
  }

  function onPreviewInput() {
    if (laudoAssinado) return;
    const html = previewRef.current?.innerHTML ?? "";
    setTextoManual(true);
    setHtmlManual(html);
  }

  function atualizarBloco(key: string, patch: Partial<BlocoUI>) {
    if (laudoAssinado) return;
    setBlocos((prev) =>
      prev.map((b) => (b.key === key ? { ...b, ...patch } : b)),
    );
    setTextoManual(false);
  }

  function escolherOpcao(key: string, secaoId: string, opcaoId: string) {
    setBlocos((prev) =>
      prev.map((b) => {
        if (b.key !== key) return b;
        const exameBase = getExame(b.exameId);
        if (!exameBase) return b;
        const exame = exameAjustadoDoBloco(exameBase, b.volumes, b.lado);
        const secao = exame.secoes.find((s) => s.id === secaoId);
        if (!secao) return b;
        const opcao = secao.opcoes.find((o) => o.id === opcaoId);
        if (!opcao) return b;

        let ids = idsSelecionados(b.selecoes[secaoId]);
        const multi = secaoPermiteMultiplo(secao);
        const ehNormal = opcaoEhNormal(opcao, secao);
        const ehBexiga = secaoId === "bexiga" || secaoId === "pelve";

        if (ehBexiga) {
          if (opcaoEhCalculoVesical(opcao)) {
            if (ids.includes(opcaoId)) {
              ids = ids.filter((id) => id !== opcaoId);
            } else {
              ids = [...ids, opcaoId];
            }
            if (ids.length === 0) {
              const padrao =
                typeof secao.padrao === "string"
                  ? secao.padrao
                  : secao.opcoes[0]?.id;
              ids = padrao ? [padrao] : [];
            }
          } else {
            const calculos = ids.filter((id) => {
              const o = secao.opcoes.find((x) => x.id === id);
              return o ? opcaoEhCalculoVesical(o) : false;
            });
            ids = [opcaoId, ...calculos];
          }
        } else if (!multi) {
          ids = [opcaoId];
        } else if (ehNormal) {
          ids = [opcaoId];
        } else if (ids.includes(opcaoId)) {
          ids = ids.filter((id) => id !== opcaoId);
          if (ids.length === 0) {
            const normal =
              secao.opcoes.find((o) => opcaoEhNormal(o, secao))?.id ??
              secao.opcoes[0]?.id;
            ids = normal ? [normal] : [];
          }
        } else {
          ids = [
            ...ids.filter((id) => {
              const o = secao.opcoes.find((x) => x.id === id);
              return o ? !opcaoEhNormal(o, secao) : false;
            }),
            opcaoId,
          ];
        }

        const selecoes = {
          ...b.selecoes,
          [secaoId]: multi || ehBexiga ? ids : ids[0] ?? "",
        };
        const medidas = (() => {
          let m = limparMedidasOrfas(b.medidas, secao, ids);
          for (const id of ids) {
            const op = secao.opcoes.find((o) => o.id === id);
            if (!op || !opcaoRequerTirads(op)) continue;
            const k = chaveTirads(secao.id, id);
            if (!m[k]) {
              const padrao = tiradsPadraoOpcao(op);
              if (padrao) m = { ...m, [k]: padrao };
            }
          }
          for (const id of ids) {
            const op = secao.opcoes.find((o) => o.id === id);
            if (!op || !opcaoEhQuirodactilo(op)) continue;
            const k = chaveMaoDedoAchado(secao.id, id);
            if (!m[k]) {
              m = { ...m, [k]: "gatilho" };
            }
          }
          // limpa achados de dedos desmarcados
          for (const d of QUIRODACTILOS) {
            if (!ids.includes(d.id)) {
              delete m[chaveMaoDedoAchado(secao.id, d.id)];
            }
          }
          return m;
        })();
        let lesoes = limparLesoesOrfas(b.lesoes, secao, ids);
        // Garante 1 slot ao marcar nódulo/cisto
        for (const id of ids) {
          const op = secao.opcoes.find((o) => o.id === id);
          if (!op || !opcaoPermiteMultiplasLesoes(op)) continue;
          const k = chaveLesoes(secao.id, id);
          if (!lesoes[k] || lesoes[k].length === 0) {
            lesoes = { ...lesoes, [k]: [lesaoVazia()] };
          }
        }
        const impressaoRaw = b.impressaoManual
          ? b.impressao
          : (() => {
              let imp = gerarImpressaoDiagnostica(exame, selecoes, {
                medidas,
              });
              if (
                b.lado &&
                !(b.exameId in MSK_DOPPLER_KEYS) &&
                !exameEhMmiiComLado(b.exameId)
              ) {
                imp = impressaoComLado(imp, exame, b.lado);
              }
              return imp;
            })();

        let volumes = { ...b.volumes };
        if (exame.id === "mamas-masculino") {
          if (temGinecomastiaMamaMasculino(selecoes)) {
            const inferido = ladoGinecomastiaInferido(selecoes);
            if (inferido) volumes["gineco-lado"] = inferido;
            if (!volumes["gineco-fase"]) volumes["gineco-fase"] = "nodular";
          } else {
            delete volumes["gineco-lado"];
            delete volumes["gineco-fase"];
          }
        }

        const impressao = b.impressaoManual
          ? impressaoRaw
          : aplicarPlaceholdersImpressao(
              exame.id,
              impressaoRaw,
              volumes,
              selecoes,
            );

        return {
          ...b,
          selecoes,
          medidas,
          lesoes,
          volumes,
          impressao,
          laudoNormalAtivo: false,
        };
      }),
    );
    setTextoManual(false);
  }

  function atualizarMedida(
    key: string,
    secaoId: string,
    opcaoId: string,
    valor: string,
  ) {
    setBlocos((prev) =>
      prev.map((b) =>
        b.key === key
          ? {
              ...b,
              medidas: {
                ...b.medidas,
                [chaveMedida(secaoId, opcaoId)]: valor,
              },
            }
          : b,
      ),
    );
    setTextoManual(false);
  }

  function atualizarLocalizacao(
    key: string,
    secaoId: string,
    opcaoId: string,
    valor: string,
  ) {
    setBlocos((prev) =>
      prev.map((b) =>
        b.key === key
          ? {
              ...b,
              medidas: {
                ...b.medidas,
                [chaveLocalizacao(secaoId, opcaoId)]: valor,
              },
            }
          : b,
      ),
    );
    setTextoManual(false);
  }

  function atualizarEstenose(
    key: string,
    secaoId: string,
    opcaoId: string,
    valor: string,
  ) {
    setBlocos((prev) =>
      prev.map((b) => {
        if (b.key !== key) return b;
        const k = chaveEstenose(secaoId, opcaoId);
        const atual = b.medidas[k] ?? "";
        const medidas = { ...b.medidas };
        // Toggle: clicar de novo desmarca
        if (atual === valor) delete medidas[k];
        else medidas[k] = valor;
        return { ...b, medidas };
      }),
    );
    setTextoManual(false);
  }

  function atualizarLesao(
    key: string,
    secaoId: string,
    opcaoId: string,
    index: number,
    campo: keyof LesaoItem,
    valor: string,
  ) {
    setBlocos((prev) =>
      prev.map((b) => {
        if (b.key !== key) return b;
        const k = chaveLesoes(secaoId, opcaoId);
        const lista = [...(b.lesoes[k] ?? [lesaoVazia()])];
        while (lista.length <= index) lista.push(lesaoVazia());
        lista[index] = { ...lista[index], [campo]: valor };
        const medidas = { ...b.medidas };
        // Mantém 1ª lesão espelhada nas chaves antigas
        if (index === 0) {
          medidas[chaveMedida(secaoId, opcaoId)] = lista[0].medida;
          medidas[chaveLocalizacao(secaoId, opcaoId)] = lista[0].local;
        }
        return {
          ...b,
          lesoes: { ...b.lesoes, [k]: lista },
          medidas,
        };
      }),
    );
    setTextoManual(false);
  }

  function acrescentarLesao(key: string, secaoId: string, opcaoId: string) {
    setBlocos((prev) =>
      prev.map((b) => {
        if (b.key !== key) return b;
        const k = chaveLesoes(secaoId, opcaoId);
        const lista = b.lesoes[k] ?? [lesaoVazia()];
        return {
          ...b,
          lesoes: { ...b.lesoes, [k]: [...lista, lesaoVazia()] },
        };
      }),
    );
    setTextoManual(false);
  }

  function removerLesao(
    key: string,
    secaoId: string,
    opcaoId: string,
    index: number,
  ) {
    setBlocos((prev) =>
      prev.map((b) => {
        if (b.key !== key) return b;
        const k = chaveLesoes(secaoId, opcaoId);
        const lista = [...(b.lesoes[k] ?? [lesaoVazia()])];
        if (lista.length <= 1) return b;
        lista.splice(index, 1);
        return { ...b, lesoes: { ...b.lesoes, [k]: lista } };
      }),
    );
    setTextoManual(false);
  }

  function atualizarVolume(key: string, campo: string, valor: string) {
    setBlocos((prev) =>
      prev.map((b) =>
        b.key === key
          ? { ...b, volumes: { ...b.volumes, [campo]: valor } }
          : b,
      ),
    );
    setTextoManual(false);
  }

  function atualizarDimensao(
    key: string,
    campoKey: string,
    eixo: "a" | "b" | "c",
    valor: string,
  ) {
    setBlocos((prev) =>
      prev.map((b) => {
        if (b.key !== key) return b;
        const atual = b.dimensoes[campoKey] ?? dimensoesVazias();
        return {
          ...b,
          dimensoes: {
            ...b.dimensoes,
            [campoKey]: { ...atual, [eixo]: valor },
          },
        };
      }),
    );
    setTextoManual(false);
  }

  function toggleObs(key: string, id: string) {
    setBlocos((prev) =>
      prev.map((b) => {
        if (b.key !== key) return b;
        const on = b.observacoesIds.includes(id);
        return {
          ...b,
          observacoesIds: on
            ? b.observacoesIds.filter((x) => x !== id)
            : [...b.observacoesIds, id],
        };
      }),
    );
    setTextoManual(false);
  }

  function marcarTodasObs(key: string, listaIds: string[], marcar: boolean) {
    atualizarBloco(key, { observacoesIds: marcar ? listaIds : [] });
  }

  function marcarPadraoObs(key: string) {
    const bloco = blocos.find((b) => b.key === key);
    const ids = bloco
      ? observacoesPadraoIdsDoExame(bloco.exameId)
      : [...OBS_PADRAO_IDS];
    atualizarBloco(key, { observacoesIds: ids });
  }

  function limparObsMarcadas(key: string) {
    atualizarBloco(key, { observacoesIds: [] });
  }

  function toggleTabela(key: string, tabelaId: string) {
    setBlocos((prev) =>
      prev.map((b) => {
        if (b.key !== key) return b;
        const on = b.tabelasIds.includes(tabelaId);
        return {
          ...b,
          tabelasIds: on
            ? b.tabelasIds.filter((x) => x !== tabelaId)
            : [...b.tabelasIds, tabelaId],
        };
      }),
    );
    setTextoManual(false);
  }

  function marcarTodasTabelas(key: string, ids: string[], marcar: boolean) {
    atualizarBloco(key, { tabelasIds: marcar ? ids : [] });
  }

  function atualizarAnterior(
    key: string,
    antId: string,
    patch: Partial<ExameAnterior>,
  ) {
    setBlocos((prev) =>
      prev.map((b) => {
        if (b.key !== key) return b;
        const examesAnteriores = b.examesAnteriores.map((e) =>
          e.id === antId ? { ...e, ...patch } : e,
        );
        const temDataOuModalidade = examesAnteriores.some(
          (e) => e.modalidade.trim() || e.data.trim(),
        );
        let observacoesIds = b.observacoesIds;
        // Ao informar exame/data anterior, substitui o item 1 (sem exames anteriores)
        if (temDataOuModalidade) {
          observacoesIds = observacoesIds.filter((id) => id !== "sem-anteriores");
        }
        return {
          ...b,
          examesAnteriores,
          observacoesIds,
        };
      }),
    );
    setTextoManual(false);
  }

  function adicionarExame(exameId: string, lado?: LadoArticulacao | null) {
    if (laudoAssinado) return;
    if (exameRequerLado(exameId) && !lado) {
      setLadoPendente({ exameId, modo: "acrescentar" });
      setPickerAberto(false);
      return;
    }
    setBlocos((prev) => [...prev, novoBloco(exameId, lado)]);
    setPickerAberto(false);
    setTextoManual(false);
  }

  function removerBloco(key: string) {
    if (laudoAssinado) return;
    setBlocos((prev) => (prev.length <= 1 ? prev : prev.filter((b) => b.key !== key)));
    setTextoManual(false);
  }

  const examePrincipalId = blocos[0]?.exameId ?? exames[0].id;

  function trocarExamePrincipal(exameId: string) {
    if (laudoAssinado) {
      window.alert(
        "Laudo assinado. Desbloqueie com a senha master para trocar o exame.",
      );
      return;
    }
    if (exameRequerLado(exameId)) {
      setLadoPendente({ exameId, modo: "principal" });
      setCategoriaAtiva(categoriaDoExame(exameId));
      setPickerAberto(false);
      return;
    }
    setBlocos([novoBloco(exameId)]);
    setCategoriaAtiva(categoriaDoExame(exameId));
    setIdSalvoAtual(undefined);
    setLaudoAssinado(false);
    setTextoManual(false);
    setPickerAberto(false);
  }

  function confirmarLadoMsk(escolha: LadoArticulacao | "ambos") {
    if (!ladoPendente || laudoAssinado) return;
    const { exameId, modo } = ladoPendente;
    setLadoPendente(null);
    setCategoriaAtiva(categoriaDoExame(exameId));
    setTextoManual(false);
    setPickerAberto(false);

    if (escolha === "ambos") {
      const novos = [novoBloco(exameId, "direito"), novoBloco(exameId, "esquerdo")];
      if (modo === "principal") {
        setBlocos(novos);
        setIdSalvoAtual(undefined);
        setLaudoAssinado(false);
      } else {
        setBlocos((prev) => [...prev, ...novos]);
      }
      return;
    }

    if (modo === "principal") {
      setBlocos([novoBloco(exameId, escolha)]);
      setIdSalvoAtual(undefined);
      setLaudoAssinado(false);
    } else {
      setBlocos((prev) => [...prev, novoBloco(exameId, escolha)]);
    }
  }

  function adicionarLadoOposto(bloco: BlocoUI) {
    if (laudoAssinado) return;
    if (!bloco.lado || !exameRequerLado(bloco.exameId)) return;
    const outro = ladoOposto(bloco.lado);
    const jaTem = blocos.some(
      (b) => b.exameId === bloco.exameId && b.lado === outro,
    );
    if (jaTem) return;
    setBlocos((prev) => [...prev, novoBloco(bloco.exameId, outro)]);
    setTextoManual(false);
  }

  function trocarCategoria(categoriaId: CategoriaExameId) {
    setCategoriaAtiva(categoriaId);
    // Em músculo esquelético só troca a aba — o lado abre ao clicar no exame
    if (categoriaId === "musculo-esqueletico") return;

    const lista = examesDaCategoria(categoriaId);
    const atualNaCat = lista.some((e) => e.id === examePrincipalId);
    if (!atualNaCat && lista[0]) {
      setBlocos([novoBloco(lista[0].id)]);
      setIdSalvoAtual(undefined);
      setLaudoAssinado(false);
      setTextoManual(false);
    }
  }

  async function copiar() {
    const baseUrl =
      typeof window !== "undefined" ? window.location.origin : "";
    const html = htmlDoLaudo(baseUrl);
    const plain = plainDoLaudo();
    try {
      const item = new ClipboardItem({
        "text/plain": new Blob([plain], { type: "text/plain" }),
        "text/html": new Blob([html], { type: "text/html" }),
      });
      await navigator.clipboard.write([item]);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      try {
        await navigator.clipboard.writeText(plain);
      } catch {
        const ta = document.createElement("textarea");
        ta.value = plain;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    }
  }

  function imprimir() {
    const w = window.open("", "_blank");
    if (!w) return;
    const baseUrl = window.location.origin;
    w.document.write(`<!DOCTYPE html><html><head><title>Laudo</title>
      <style>
        body{font-family:Arial,Helvetica,sans-serif;max-width:720px;margin:40px auto;padding:0 24px;line-height:1.35;color:#222;font-size:11px}
        strong{font-weight:700}
        .laudo-titulo{text-align:center;font-size:16px;font-weight:700;margin:0 0 12px}
        .laudo-p{margin:0 0 2px;text-align:justify}
        .laudo-tabelas{margin:14px 0 6px;display:flex;flex-direction:column;gap:10px;align-items:center}
        .laudo-tabela{margin:0;width:100%;max-width:420px}
        .laudo-tabela img{width:100%;max-width:420px;height:auto;display:block;margin:0 auto}
        .laudo-mapa-mmii{margin:12px 0;text-align:center}
        .laudo-mapa-mmii img{max-width:280px;height:auto;border:1px solid #ccc}
        .laudo-rodape-v2{margin-top:28px;font-family:Georgia,"Times New Roman",Times,serif;color:#4a4a4a}
        .laudo-rodape-cols{display:flex;justify-content:space-between;align-items:flex-end;gap:32px;padding:0 4px}
        .laudo-rodape-esq{flex:0 1 280px;text-align:center;min-width:0}
        .laudo-rodape-dir{flex:1;text-align:right;padding-bottom:14px}
        .laudo-assinatura-img{max-width:180px;max-height:52px;object-fit:contain;display:block;margin:0 auto 2px;filter:grayscale(1);opacity:0.75}
        .laudo-assinatura-espaco{height:40px}
        .laudo-linha-assinatura{border-top:1px solid #6a6a6a;margin:0 auto 5px;width:95%}
        .laudo-nome{font-weight:700;font-size:8.5px;line-height:1.15;color:#3f3f3f;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}
        .laudo-crm{font-size:10px;margin-top:1px;font-weight:600;color:#4a4a4a}
        .laudo-local{font-style:italic;font-size:10px;letter-spacing:0.03em;color:#6b6b6b;text-transform:uppercase;font-weight:500}
        .laudo-disclaimer{margin:34px auto 0;max-width:38em;text-align:center;font-size:0.62rem;color:#6a6a6a;font-style:italic;line-height:1.35}
        @media print{body{margin:0}}
      </style></head><body>${htmlDoLaudo(baseUrl)}</body></html>`);
    w.document.close();
    w.focus();
    w.print();
  }

  function limparPaciente() {
    if (laudoAssinado) return;
    setPaciente(pacienteVazio());
    setIdSalvoAtual(undefined);
    setLaudoAssinado(false);
    setTextoManual(false);
  }

  function resetExame() {
    if (laudoAssinado) return;
    setBlocos((prev) =>
      prev.map((b) => {
        const exame = getExame(b.exameId)!;
        const selecoes = selecoesPadrao(exame);
        let impressao = gerarImpressaoDiagnostica(exame, selecoes);
        if (b.lado) impressao = impressaoComLado(impressao, exame, b.lado);
        return {
          ...b,
          selecoes,
          impressao,
          impressaoManual: false,
          laudoNormalAtivo: undefined,
          observacoesIds: [],
          examesAnteriores: [novoExameAnterior()],
          medidas: {},
          lesoes: {},
          volumes: {},
          dimensoes: {},
          tabelasIds: [],
        };
      }),
    );
    setTextoManual(false);
  }

  const exameLadoPendente = ladoPendente
    ? getExame(ladoPendente.exameId)
    : null;

  return (
    <div className="builder">
      <ConsultaLaudosModal
        aberto={consultaLaudosAberto}
        onFechar={() => setConsultaLaudosAberto(false)}
      />
      {ladoPendente && exameLadoPendente ? (
        <div
          className="modal-backdrop"
          role="presentation"
          onClick={() => setLadoPendente(null)}
        >
          <div
            className="modal-card lado-msk-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lado-msk-titulo"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-head">
              <h2 id="lado-msk-titulo">
                {exameLadoPendente.nome} — lado do exame
              </h2>
              <button
                type="button"
                className="btn ghost small"
                onClick={() => setLadoPendente(null)}
              >
                Cancelar
              </button>
            </div>
            <p className="hint">
              {exameEhMmiiComLado(exameLadoPendente.id)
                ? "Escolha o membro inferior solicitado ou ambos no mesmo documento."
                : "Laudos músculo-esqueléticos são por articulação. Escolha o lado solicitado ou ambos no mesmo documento."}
            </p>
            <div className="lado-msk-acoes">
              <button
                type="button"
                className="btn primary"
                onClick={() => confirmarLadoMsk("direito")}
              >
                {exameLadoPendente.nome} direito
              </button>
              <button
                type="button"
                className="btn primary"
                onClick={() => confirmarLadoMsk("esquerdo")}
              >
                {exameLadoPendente.nome} esquerdo
              </button>
              <button
                type="button"
                className="btn secondary"
                onClick={() => confirmarLadoMsk("ambos")}
              >
                Ambos os lados
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <header className="topbar">
        <div className="brand">
          <div>
            <p className="brand-name">BeraMed Laudos</p>
            <p className="brand-sub">Montador de laudos de ultrassom</p>
          </div>
        </div>
        <div className="top-actions">
          <button
            type="button"
            className="btn ghost"
            onClick={() => setConsultaLaudosAberto(true)}
          >
            Laudário
          </button>
          <button
            type="button"
            className="btn ghost"
            onClick={resetExame}
            disabled={laudoAssinado}
          >
            Restaurar padrões
          </button>
          <button
            type="button"
            className="btn ghost"
            onClick={limparPaciente}
            disabled={laudoAssinado}
          >
            Limpar paciente
          </button>
          {laudoAssinado ? (
            <button
              type="button"
              className="btn ghost"
              onClick={() => {
                setDesbloquearAberto(true);
                setSenhaMaster("");
                setErroMaster("");
              }}
            >
              Desbloquear
            </button>
          ) : null}
        </div>
      </header>

      {laudoAssinado ? (
        <div className="laudo-assinado-banner" role="status">
          Laudo assinado e travado. Edição somente com senha master.
        </div>
      ) : null}

      {desbloquearAberto ? (
        <div
          className="modal-backdrop"
          role="presentation"
          onClick={() => setDesbloquearAberto(false)}
        >
          <div
            className="modal-card lado-msk-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="desbloquear-titulo"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-head">
              <h2 id="desbloquear-titulo">Desbloquear laudo</h2>
              <button
                type="button"
                className="btn ghost small"
                onClick={() => setDesbloquearAberto(false)}
              >
                Cancelar
              </button>
            </div>
            <p className="hint">Informe a senha master para editar este laudo.</p>
            <label className="field">
              <span>Senha master</span>
              <input
                type="password"
                value={senhaMaster}
                onChange={(e) => {
                  setSenhaMaster(e.target.value);
                  setErroMaster("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") tentarDesbloquear();
                }}
                autoFocus
              />
            </label>
            {erroMaster ? (
              <p className="medico-solicitante-erro">{erroMaster}</p>
            ) : null}
            <div className="lado-msk-acoes">
              <button
                type="button"
                className="btn primary"
                onClick={tentarDesbloquear}
              >
                Desbloquear edição
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <div className="exam-nav">
        <div
          className="categoria-tabs"
          role="tablist"
          aria-label="Área do laudo"
        >
          {categoriasExame.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={categoriaAtiva === cat.id}
              className={`categoria-tab ${categoriaAtiva === cat.id ? "active" : ""}`}
              onClick={() => trocarCategoria(cat.id)}
            >
              {cat.nome}
            </button>
          ))}
        </div>
        <div
          className="exam-tabs exam-tabs-cols"
          role="tablist"
          aria-label="Tipo de exame"
        >
          {examesTabsCols.map((coluna, colIdx) => (
            <div key={colIdx} className="exam-tab-col">
              {coluna.map((e) => (
                <button
                  key={e.id}
                  type="button"
                  role="tab"
                  aria-selected={examePrincipalId === e.id}
                  className={`exam-tab ${examePrincipalId === e.id ? "active" : ""}`}
                  onClick={() => trocarExamePrincipal(e.id)}
                >
                  {e.nome}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className={`workspace ${laudoAssinado ? "laudo-travado" : ""}`}>
        <section
          className="panel options-panel"
          aria-disabled={laudoAssinado}
        >
          <h2 className="panel-title">Dados do paciente</h2>
          <div className="patient-grid">
            <PacienteNomeField
              crm={medico.crm}
              value={paciente.nome}
              disabled={laudoAssinado}
              onChangeNome={(nome) => {
                setPaciente((p) => ({ ...p, nome }));
                setTextoManual(false);
              }}
              onSelecionarPaciente={(dados) => {
                setPaciente(dados);
                setIdSalvoAtual(undefined);
                setLaudoAssinado(false);
                setTextoManual(false);
              }}
            />
            {(
              [
                ["idade", "Idade"],
                ["data", "Data"],
                ["indicacao", "Indicação"],
              ] as const
            ).map(([key, label]) => (
              <label key={key} className="field">
                <span>{label}</span>
                <input
                  value={paciente[key]}
                  disabled={laudoAssinado}
                  onChange={(ev) => {
                    setPaciente((p) => ({ ...p, [key]: ev.target.value }));
                    setTextoManual(false);
                  }}
                  placeholder={label}
                />
              </label>
            ))}
            <MedicoSolicitanteField
              value={paciente.solicitante}
              onChange={(valor) => {
                setPaciente((p) => ({ ...p, solicitante: valor }));
                setTextoManual(false);
              }}
            />
          </div>

          {blocos.map((bloco, idx) => {
            const exameBase = getExame(bloco.exameId)!;
            const comDopplerDerm = bloco.volumes["derm-doppler"] === "1";
            const comDopplerTireoide =
              bloco.volumes["tireoide-doppler"] === "1";
            const comDopplerInguinal =
              bloco.volumes["inguinal-doppler"] === "1";
            const comDopplerBolsa = bloco.volumes["bolsa-doppler"] === "1";
            const comDopplerMamas = bloco.volumes["mamas-doppler"] === "1";
            const comDopplerAxilas = bloco.volumes["axilas-doppler"] === "1";
            const comDopplerPelvicaTv =
              bloco.volumes["pelvica-tv-doppler"] === "1";
            const mskDopplerKey = MSK_DOPPLER_KEYS[bloco.exameId];
            const comDopplerMsk = mskDopplerKey
              ? bloco.volumes[mskDopplerKey] === "1"
              : false;
            let exame = exameAjustadoDoBloco(
              exameBase,
              bloco.volumes,
              bloco.lado,
            );
            const ehComLado = exameRequerLado(bloco.exameId);
            const ladoFaltante =
              ehComLado && bloco.lado
                ? ladoOposto(bloco.lado)
                : null;
            const jaTemLadoOposto =
              ladoFaltante != null &&
              blocos.some(
                (b) =>
                  b.exameId === bloco.exameId && b.lado === ladoFaltante,
              );
            const listaObs = observacoesDoExame(bloco.exameId);
            const todasObsMarcadas =
              listaObs.length > 0 &&
              listaObs.every((o) => bloco.observacoesIds.includes(o.id));
            const obsSemAnteriores = listaObs.find(
              (o) => o.id === "sem-anteriores",
            );
            const obsRestantes = listaObs.filter(
              (o) => o.id !== "sem-anteriores",
            );

            return (
              <div key={bloco.key} className="bloco-exame">
                <div className="achados-head">
                  <h2 className="panel-title spaced">
                    Achados — {exame.nome}
                    {comDopplerDerm ||
                    comDopplerTireoide ||
                    comDopplerMsk
                      ? " com Doppler"
                      : ""}
                    {idx > 0 ? (
                      <span className="bloco-num"> ({idx + 1})</span>
                    ) : null}
                  </h2>
                  <div className="achados-head-actions">
                    <label className="laudo-normal-check" title="Laudo normal">
                      <input
                        type="checkbox"
                        checked={checkboxLaudoNormal(bloco)}
                        disabled={laudoAssinado}
                        onChange={(ev) => {
                          if (ev.target.checked) {
                            atualizarBloco(
                              bloco.key,
                              aplicarLaudoNormalNoBloco(bloco),
                            );
                          } else {
                            atualizarBloco(bloco.key, {
                              laudoNormalAtivo: false,
                            });
                          }
                        }}
                      />
                      <span>laudo normal</span>
                    </label>
                    {ehComLado && ladoFaltante && !jaTemLadoOposto ? (
                      <button
                        type="button"
                        className="btn secondary small"
                        onClick={() => adicionarLadoOposto(bloco)}
                        title={`Acrescentar ${exameBase.nome} ${rotuloLado(ladoFaltante)} neste laudo`}
                      >
                        + {exameBase.nome} {rotuloLado(ladoFaltante)}
                      </button>
                    ) : null}
                    {idx === 0 ? (
                      <div className="achados-plus-wrap">
                        <button
                          type="button"
                          className="btn-plus achados-plus"
                          title="Acrescentar outro laudo"
                          aria-label="Acrescentar outro laudo"
                          aria-expanded={pickerAberto}
                          onClick={() => setPickerAberto((v) => !v)}
                        >
                          +
                        </button>
                        {pickerAberto ? (
                          <div className="exame-picker" role="listbox">
                            <p className="exame-picker-title">
                              Acrescentar laudo abaixo
                            </p>
                            {categoriasExame.map((cat) => (
                              <div key={cat.id} className="exame-picker-grupo">
                                <p className="exame-picker-grupo-title">
                                  {cat.nome}
                                </p>
                                <div className="exame-picker-cols">
                                  {distribuirEmColunas(
                                    examesDaCategoriaAlfabetico(cat.id),
                                    2,
                                  ).map((coluna, cIdx) => (
                                    <div
                                      key={cIdx}
                                      className="exame-picker-col"
                                    >
                                      {coluna.map((e) => (
                                        <button
                                          key={e.id}
                                          type="button"
                                          className="exame-picker-item"
                                          onClick={() => adicionarExame(e.id)}
                                        >
                                          {e.nome}
                                        </button>
                                      ))}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="btn ghost small"
                        onClick={() => removerBloco(bloco.key)}
                      >
                        Remover
                      </button>
                    )}
                  </div>
                </div>

                {ehComLado && !bloco.lado ? (
                  <div className="lado-msk-inline">
                    <span>Lado:</span>
                    <button
                      type="button"
                      className="btn secondary small"
                      onClick={() => {
                        const exameAtual = exameAjustadoDoBloco(
                          exameBase,
                          bloco.volumes,
                          "direito",
                        );
                        atualizarBloco(bloco.key, {
                          lado: "direito",
                          impressao: bloco.impressaoManual
                            ? bloco.impressao
                            : gerarImpressaoDiagnostica(
                                exameAtual,
                                bloco.selecoes,
                              ),
                        });
                      }}
                    >
                      Direito
                    </button>
                    <button
                      type="button"
                      className="btn secondary small"
                      onClick={() => {
                        const exameAtual = exameAjustadoDoBloco(
                          exameBase,
                          bloco.volumes,
                          "esquerdo",
                        );
                        atualizarBloco(bloco.key, {
                          lado: "esquerdo",
                          impressao: bloco.impressaoManual
                            ? bloco.impressao
                            : gerarImpressaoDiagnostica(
                                exameAtual,
                                bloco.selecoes,
                              ),
                        });
                      }}
                    >
                      Esquerdo
                    </button>
                  </div>
                ) : null}

                {bloco.exameId === "dermatologico" ? (
                  <label className="laudo-normal-check derm-doppler-check">
                    <input
                      type="checkbox"
                      checked={comDopplerDerm}
                      disabled={laudoAssinado}
                      onChange={(ev) => {
                        const on = ev.target.checked;
                        setBlocos((prev) =>
                          prev.map((b) => {
                            if (b.key !== bloco.key) return b;
                            const volumes = { ...b.volumes };
                            const selecoes = { ...b.selecoes };
                            if (on) {
                              volumes["derm-doppler"] = "1";
                              if (!selecoes.vascularizacao) {
                                selecoes.vascularizacao = "normal";
                              }
                            } else {
                              delete volumes["derm-doppler"];
                              delete selecoes.vascularizacao;
                            }
                            const exameAtual = ajustarExameDermatologico(
                              getExame(b.exameId)!,
                              on,
                            );
                            let impressao = b.impressao;
                            if (!b.impressaoManual) {
                              impressao = gerarImpressaoDiagnostica(
                                exameAtual,
                                selecoes,
                              );
                            }
                            return { ...b, volumes, selecoes, impressao };
                          }),
                        );
                        setTextoManual(false);
                      }}
                    />
                    <span>Com Doppler colorido</span>
                  </label>
                ) : null}

                {bloco.exameId === "tireoide" ||
                bloco.exameId === "tireoide-doppler" ? (
                  <label className="laudo-normal-check derm-doppler-check">
                    <input
                      type="checkbox"
                      checked={comDopplerTireoide}
                      disabled={laudoAssinado}
                      onChange={(ev) => {
                        const on = ev.target.checked;
                        setBlocos((prev) =>
                          prev.map((b) => {
                            if (b.key !== bloco.key) return b;
                            const volumes = { ...b.volumes };
                            const selecoes = { ...b.selecoes };
                            if (on) {
                              volumes["tireoide-doppler"] = "1";
                              if (!selecoes.doppler) {
                                selecoes.doppler = "normal";
                              }
                            } else {
                              delete volumes["tireoide-doppler"];
                              delete selecoes.doppler;
                            }
                            const exameAtual = ajustarExameTireoide(
                              getExame(b.exameId)!,
                              on,
                            );
                            let impressao = b.impressao;
                            if (!b.impressaoManual) {
                              impressao = gerarImpressaoDiagnostica(
                                exameAtual,
                                selecoes,
                              );
                            }
                            return {
                              ...b,
                              exameId: "tireoide",
                              volumes,
                              selecoes,
                              impressao,
                            };
                          }),
                        );
                        setTextoManual(false);
                      }}
                    />
                    <span>Com Doppler colorido</span>
                  </label>
                ) : null}

                {bloco.exameId === "regiao-inguinal" ? (
                  <label className="laudo-normal-check derm-doppler-check">
                    <input
                      type="checkbox"
                      checked={comDopplerInguinal}
                      disabled={laudoAssinado}
                      onChange={(ev) => {
                        const on = ev.target.checked;
                        setBlocos((prev) =>
                          prev.map((b) => {
                            if (b.key !== bloco.key) return b;
                            const volumes = { ...b.volumes };
                            const selecoes = { ...b.selecoes };
                            if (on) {
                              volumes["inguinal-doppler"] = "1";
                            } else {
                              delete volumes["inguinal-doppler"];
                              for (const sid of [
                                "inguinal-direita",
                                "inguinal-esquerda",
                              ] as const) {
                                const ids = idsSelecionados(
                                  selecoes[sid],
                                ).filter(
                                  (id) =>
                                    id !== "varicosidades" &&
                                    id !== "aneurisma-pseudoaneurisma",
                                );
                                selecoes[sid] =
                                  ids.length > 0 ? ids : ["normal"];
                              }
                            }
                            const exameAtual = ajustarExameRegiaoInguinal(
                              getExame(b.exameId)!,
                              on,
                            );
                            let impressao = b.impressao;
                            if (!b.impressaoManual) {
                              impressao = gerarImpressaoDiagnostica(
                                exameAtual,
                                selecoes,
                              );
                            }
                            return { ...b, volumes, selecoes, impressao };
                          }),
                        );
                        setTextoManual(false);
                      }}
                    />
                    <span>Com Doppler colorido</span>
                  </label>
                ) : null}

                {bloco.exameId === "bolsa-testicular" ||
                bloco.exameId === "bolsa-testicular-doppler" ? (
                  <label className="laudo-normal-check derm-doppler-check">
                    <input
                      type="checkbox"
                      checked={comDopplerBolsa}
                      disabled={laudoAssinado}
                      onChange={(ev) => {
                        const on = ev.target.checked;
                        setBlocos((prev) =>
                          prev.map((b) => {
                            if (b.key !== bloco.key) return b;
                            const volumes = { ...b.volumes };
                            const selecoes = { ...b.selecoes };
                            if (on) {
                              volumes["bolsa-doppler"] = "1";
                              if (!selecoes["plexo-direito"]) {
                                selecoes["plexo-direito"] = "normal";
                              }
                              if (!selecoes["plexo-esquerdo"]) {
                                selecoes["plexo-esquerdo"] = "normal";
                              }
                            } else {
                              delete volumes["bolsa-doppler"];
                              delete selecoes["plexo-direito"];
                              delete selecoes["plexo-esquerdo"];
                              for (const sid of [
                                "testiculo-direito",
                                "testiculo-esquerdo",
                              ] as const) {
                                const ids = idsSelecionados(
                                  selecoes[sid],
                                ).filter(
                                  (id) =>
                                    id !== "orquite" &&
                                    id !== "torcao-testicular",
                                );
                                selecoes[sid] =
                                  ids.length > 0 ? ids : ["homogeneo"];
                              }
                              for (const sid of [
                                "epididimo-direito",
                                "epididimo-esquerdo",
                              ] as const) {
                                const ids = idsSelecionados(
                                  selecoes[sid],
                                ).filter((id) => id !== "epididimite");
                                selecoes[sid] =
                                  ids.length > 0 ? ids : ["normal"];
                              }
                            }
                            const exameAtual = ajustarExameBolsaTesticular(
                              getExame(b.exameId)!,
                              on,
                            );
                            let impressao = b.impressao;
                            if (!b.impressaoManual) {
                              impressao = gerarImpressaoDiagnostica(
                                exameAtual,
                                selecoes,
                              );
                            }
                            return {
                              ...b,
                              exameId: "bolsa-testicular",
                              volumes,
                              selecoes,
                              impressao,
                            };
                          }),
                        );
                        setTextoManual(false);
                      }}
                    />
                    <span>Com Doppler colorido</span>
                  </label>
                ) : null}

                {bloco.exameId === "mamas" ||
                bloco.exameId === "mamas-doppler" ? (
                  <label className="laudo-normal-check derm-doppler-check">
                    <input
                      type="checkbox"
                      checked={comDopplerMamas}
                      disabled={laudoAssinado}
                      onChange={(ev) => {
                        const on = ev.target.checked;
                        setBlocos((prev) =>
                          prev.map((b) => {
                            if (b.key !== bloco.key) return b;
                            const volumes = { ...b.volumes };
                            if (on) volumes["mamas-doppler"] = "1";
                            else delete volumes["mamas-doppler"];
                            const exameAtual = ajustarExameMamas(
                              getExame("mamas")!,
                              on,
                            );
                            let impressao = b.impressao;
                            if (!b.impressaoManual) {
                              impressao = gerarImpressaoDiagnostica(
                                exameAtual,
                                b.selecoes,
                              );
                            }
                            return {
                              ...b,
                              exameId: "mamas",
                              volumes,
                              impressao,
                            };
                          }),
                        );
                        setTextoManual(false);
                      }}
                    />
                    <span>Com Doppler colorido</span>
                  </label>
                ) : null}

                {bloco.exameId === "axilas" ||
                bloco.exameId === "axilas-doppler" ? (
                  <label className="laudo-normal-check derm-doppler-check">
                    <input
                      type="checkbox"
                      checked={comDopplerAxilas}
                      disabled={laudoAssinado}
                      onChange={(ev) => {
                        const on = ev.target.checked;
                        setBlocos((prev) =>
                          prev.map((b) => {
                            if (b.key !== bloco.key) return b;
                            const volumes = { ...b.volumes };
                            const selecoes = { ...b.selecoes };
                            if (on) {
                              volumes["axilas-doppler"] = "1";
                            } else {
                              delete volumes["axilas-doppler"];
                              for (const sid of [
                                "axila-direita",
                                "axila-esquerda",
                              ] as const) {
                                const ids = idsSelecionados(
                                  selecoes[sid],
                                ).filter(
                                  (id) => id !== "trombose-veia-axilar",
                                );
                                selecoes[sid] =
                                  ids.length > 0 ? ids : ["normal"];
                              }
                            }
                            const exameAtual = ajustarExameAxilas(
                              getExame("axilas")!,
                              on,
                            );
                            let impressao = b.impressao;
                            if (!b.impressaoManual) {
                              impressao = gerarImpressaoDiagnostica(
                                exameAtual,
                                selecoes,
                              );
                            }
                            return {
                              ...b,
                              exameId: "axilas",
                              volumes,
                              selecoes,
                              impressao,
                            };
                          }),
                        );
                        setTextoManual(false);
                      }}
                    />
                    <span>Com Doppler colorido</span>
                  </label>
                ) : null}

                {bloco.exameId === "pelvica-tv" ||
                bloco.exameId === "pelvica-tv-doppler" ? (
                  <label className="laudo-normal-check derm-doppler-check">
                    <input
                      type="checkbox"
                      checked={comDopplerPelvicaTv}
                      disabled={laudoAssinado}
                      onChange={(ev) => {
                        const on = ev.target.checked;
                        setBlocos((prev) =>
                          prev.map((b) => {
                            if (b.key !== bloco.key) return b;
                            const volumes = { ...b.volumes };
                            const selecoes = { ...b.selecoes };
                            if (on) {
                              volumes["pelvica-tv-doppler"] = "1";
                              for (const sid of [
                                "doppler-utero",
                                "doppler-colo",
                                "doppler-endometrio",
                                "doppler-ovario-d",
                                "doppler-ovario-e",
                              ] as const) {
                                if (!selecoes[sid]) selecoes[sid] = "normal";
                              }
                            } else {
                              delete volumes["pelvica-tv-doppler"];
                              delete selecoes.doppler;
                              for (const sid of [
                                "doppler-utero",
                                "doppler-colo",
                                "doppler-endometrio",
                                "doppler-ovario-d",
                                "doppler-ovario-e",
                              ] as const) {
                                delete selecoes[sid];
                              }
                              for (const sid of [
                                "utero",
                                "endometrio",
                                "ovarios",
                              ] as const) {
                                const ids = idsSelecionados(
                                  selecoes[sid],
                                ).filter(
                                  (id) =>
                                    !id.startsWith("aumento-vascularizacao"),
                                );
                                const padrao =
                                  sid === "endometrio"
                                    ? "endometrio-normal"
                                    : "normal";
                                selecoes[sid] =
                                  ids.length > 0 ? ids : [padrao];
                              }
                              const medidas = { ...b.medidas };
                              for (const k of Object.keys(medidas)) {
                                if (k.endsWith("::vasc-lesao")) {
                                  delete medidas[k];
                                }
                              }
                              const exameAtual = ajustarExamePelvicaTv(
                                getExame("pelvica-tv")!,
                                false,
                              );
                              let impressao = b.impressao;
                              if (!b.impressaoManual) {
                                impressao = gerarImpressaoDiagnostica(
                                  exameAtual,
                                  selecoes,
                                );
                              }
                              return {
                                ...b,
                                exameId: "pelvica-tv",
                                volumes,
                                selecoes,
                                medidas,
                                impressao,
                              };
                            }
                            const exameAtual = ajustarExamePelvicaTv(
                              getExame("pelvica-tv")!,
                              on,
                            );
                            let impressao = b.impressao;
                            if (!b.impressaoManual) {
                              impressao = gerarImpressaoDiagnostica(
                                exameAtual,
                                selecoes,
                              );
                            }
                            return {
                              ...b,
                              exameId: "pelvica-tv",
                              volumes,
                              selecoes,
                              impressao,
                            };
                          }),
                        );
                        setTextoManual(false);
                      }}
                    />
                    <span>Com Doppler colorido</span>
                  </label>
                ) : null}

                {mskDopplerKey ? (
                  <label className="laudo-normal-check derm-doppler-check">
                    <input
                      type="checkbox"
                      checked={comDopplerMsk}
                      disabled={laudoAssinado}
                      onChange={(ev) => {
                        const on = ev.target.checked;
                        const volKey = mskDopplerKey;
                        setBlocos((prev) =>
                          prev.map((b) => {
                            if (b.key !== bloco.key) return b;
                            const volumes = { ...b.volumes };
                            if (on) volumes[volKey] = "1";
                            else delete volumes[volKey];
                            let medidas = { ...b.medidas };
                            if (!on && b.exameId === "mao") {
                              for (const d of QUIRODACTILOS) {
                                const k = chaveMaoDedoAchado(
                                  "quirodactilos",
                                  d.id,
                                );
                                if (medidas[k] === "fluxo") {
                                  medidas[k] = "gatilho";
                                }
                              }
                            }
                            const exameAtual = exameAjustadoDoBloco(
                              getExame(b.exameId)!,
                              volumes,
                              b.lado,
                            );
                            let impressao = b.impressao;
                            if (!b.impressaoManual) {
                              impressao = gerarImpressaoDiagnostica(
                                exameAtual,
                                b.selecoes,
                                { medidas },
                              );
                            }
                            return {
                              ...b,
                              volumes,
                              medidas,
                              impressao,
                            };
                          }),
                        );
                        setTextoManual(false);
                      }}
                    />
                    <span>Com Doppler colorido</span>
                  </label>
                ) : null}

                {bloco.exameId === "musculo" ? (
                  <label className="field medida-field" style={{ maxWidth: 480 }}>
                    <span>Músculo / região avaliada</span>
                    <input
                      value={bloco.volumes["musculo-regiao"] ?? ""}
                      onChange={(ev) => {
                        const valor = ev.target.value;
                        setBlocos((prev) =>
                          prev.map((b) =>
                            b.key === bloco.key
                              ? {
                                  ...b,
                                  volumes: {
                                    ...b.volumes,
                                    "musculo-regiao": valor,
                                  },
                                }
                              : b,
                          ),
                        );
                        setTextoManual(false);
                      }}
                      disabled={laudoAssinado}
                      placeholder="Ex.: Gastrocnêmio medial direito"
                    />
                  </label>
                ) : null}

                {bloco.exameId === "partes-moles" ? (
                  <label className="field medida-field" style={{ maxWidth: 480 }}>
                    <span>Região estudada</span>
                    <input
                      value={bloco.volumes["pm-regiao"] ?? ""}
                      onChange={(ev) => {
                        const valor = ev.target.value;
                        setBlocos((prev) =>
                          prev.map((b) => {
                            if (b.key !== bloco.key) return b;
                            const exameAtual = getExame(b.exameId);
                            const volumes = {
                              ...b.volumes,
                              "pm-regiao": valor,
                            };
                            let impressao = b.impressao;
                            if (!b.impressaoManual && exameAtual) {
                              impressao = gerarImpressaoDiagnostica(
                                exameAtual,
                                b.selecoes,
                              ).split("{{REGIAO}}").join(
                                valor.trim() || "[INSERIR REGIÃO]",
                              );
                            } else {
                              impressao = b.impressao
                                .split("{{REGIAO}}")
                                .join(valor.trim() || "[INSERIR REGIÃO]");
                            }
                            return { ...b, volumes, impressao };
                          }),
                        );
                        setTextoManual(false);
                      }}
                      placeholder="Ex.: coxa direita, fossa poplítea, região cervical…"
                    />
                  </label>
                ) : null}

                {bloco.exameId === "mmii-venoso" ? (
                  <MmiiVenosoPainel
                    valor={lerFormVenoso(bloco.volumes)}
                    disabled={laudoAssinado}
                    onChange={(form) => {
                      setBlocos((prev) =>
                        prev.map((b) =>
                          b.key === bloco.key
                            ? {
                                ...b,
                                volumes: {
                                  ...b.volumes,
                                  [CHAVE_FORM_VENOSO]: gravarFormVenoso(form),
                                },
                              }
                            : b,
                        ),
                      );
                      setTextoManual(false);
                    }}
                  />
                ) : null}

                <div className="sections">
                  {exame.secoes.map((secao) => {
                    const idsAtivos = idsSelecionados(bloco.selecoes[secao.id]);
                    const opcoesComMedida = secao.opcoes.filter(
                      (op) =>
                        idsAtivos.includes(op.id) && opcaoRequerMedida(op),
                    );
                    const opcoesComEstenose = secao.opcoes.filter(
                      (op) =>
                        idsAtivos.includes(op.id) && opcaoRequerEstenose(op),
                    );
                    const camposDim = camposDimensoesNaSecao(
                      bloco.exameId,
                      secao.id,
                    );
                    const totalTireoide =
                      secao.id === "volume" &&
                      exameTemVolumeTotalTireoide(bloco.exameId)
                        ? volumeTotalTireoide(bloco.dimensoes, bloco.volumes)
                        : null;
                    const opcaoId =
                      idsAtivos.length === 1 ? idsAtivos[0] : idsAtivos[0] ?? "";

                    return (
                      <div key={secao.id} className="section-block">
                        <h3>{secao.titulo}</h3>
                        {camposDim.map((campo) => {
                          const d =
                            bloco.dimensoes[campo.key] ?? dimensoesVazias();
                          const volAuto = volumeDeDimensoes(d, campo.unidade);
                          const peso =
                            campo.key === "prostata" && volAuto != null
                              ? formatarNumeroBr(
                                  pesoProstataDeVolume(volAuto),
                                  1,
                                )
                              : null;
                          return (
                            <div
                              key={campo.key}
                              className="dimensoes-block dimensoes-logo-abaixo"
                            >
                              <span className="dimensoes-label">
                                Medidas — {campo.label} ({campo.unidade})
                              </span>
                              <div className="dimensoes-row">
                                {(["a", "b", "c"] as const).map((eixo, i) => (
                                  <Fragment key={eixo}>
                                    {i > 0 ? (
                                      <span className="dimensoes-sep">×</span>
                                    ) : null}
                                    <input
                                      className="dimensoes-input"
                                      value={d[eixo]}
                                      placeholder={
                                        i === 0
                                          ? "1,5"
                                          : i === 1
                                            ? "1,2"
                                            : "1,0"
                                      }
                                      inputMode="decimal"
                                      onChange={(ev) =>
                                        atualizarDimensao(
                                          bloco.key,
                                          campo.key,
                                          eixo,
                                          ev.target.value,
                                        )
                                      }
                                      aria-label={`${campo.label} medida ${i + 1}`}
                                    />
                                  </Fragment>
                                ))}
                              </div>
                              {volAuto != null ? (
                                <p className="volume-auto-hint">
                                  Volume:{" "}
                                  <strong>
                                    {formatarNumeroBr(volAuto, 2)} cm³
                                  </strong>
                                  {peso ? (
                                    <>
                                      {" "}
                                      · Peso (×1,05): <strong>{peso} g</strong>
                                    </>
                                  ) : null}
                                </p>
                              ) : null}
                            </div>
                          );
                        })}
                        {secaoPermiteMultiplo(secao) ? (
                          <p className="hint secao-multi-hint">
                            Pode marcar mais de um achado no mesmo órgão.
                          </p>
                        ) : null}
                        <div className="chips">
                          {secao.opcoes.map((op) => {
                            const ativo = idsAtivos.includes(op.id);
                            return (
                              <button
                                key={op.id}
                                type="button"
                                className={`chip ${ativo ? "on" : ""}`}
                                onClick={() =>
                                  escolherOpcao(bloco.key, secao.id, op.id)
                                }
                              >
                                {op.label}
                              </button>
                            );
                          })}
                        </div>
                        {secao.id === "quirodactilos"
                          ? secao.opcoes
                              .filter(
                                (op) =>
                                  idsAtivos.includes(op.id) &&
                                  opcaoEhQuirodactilo(op),
                              )
                              .map((op) => {
                                const meta = QUIRODACTILOS.find(
                                  (d) => d.id === op.id,
                                );
                                const k = chaveMaoDedoAchado(secao.id, op.id);
                                const valor =
                                  bloco.medidas[k] === "fluxo"
                                    ? "fluxo"
                                    : "gatilho";
                                return (
                                  <div
                                    key={`mao-dedo-${op.id}`}
                                    className="tirads-box"
                                  >
                                    <p className="lesao-item-title">
                                      {meta
                                        ? `${meta.nro} quirodáctilo (${meta.nome})`
                                        : op.label}
                                    </p>
                                    <div className="gineco-params-row">
                                      <label className="laudo-normal-check">
                                        <input
                                          type="radio"
                                          name={`${bloco.key}-${k}`}
                                          checked={valor === "gatilho"}
                                          disabled={laudoAssinado}
                                          onChange={() => {
                                            setTextoManual(false);
                                            setBlocos((prev) =>
                                              prev.map((b) => {
                                                if (b.key !== bloco.key)
                                                  return b;
                                                const medidas = {
                                                  ...b.medidas,
                                                  [k]: "gatilho",
                                                };
                                                const exameAtual =
                                                  exameAjustadoDoBloco(
                                                    getExame(b.exameId)!,
                                                    b.volumes,
                                                    b.lado,
                                                  );
                                                let impressao = b.impressao;
                                                if (!b.impressaoManual) {
                                                  impressao =
                                                    gerarImpressaoDiagnostica(
                                                      exameAtual,
                                                      b.selecoes,
                                                      { medidas },
                                                    );
                                                }
                                                return {
                                                  ...b,
                                                  medidas,
                                                  impressao,
                                                };
                                              }),
                                            );
                                          }}
                                        />
                                        <span>Dedo em gatilho</span>
                                      </label>
                                      {comDopplerMsk ? (
                                        <label className="laudo-normal-check">
                                          <input
                                            type="radio"
                                            name={`${bloco.key}-${k}`}
                                            checked={valor === "fluxo"}
                                            disabled={laudoAssinado}
                                            onChange={() => {
                                              setTextoManual(false);
                                              setBlocos((prev) =>
                                                prev.map((b) => {
                                                  if (b.key !== bloco.key)
                                                    return b;
                                                  const medidas = {
                                                    ...b.medidas,
                                                    [k]: "fluxo",
                                                  };
                                                  const exameAtual =
                                                    exameAjustadoDoBloco(
                                                      getExame(b.exameId)!,
                                                      b.volumes,
                                                      b.lado,
                                                    );
                                                  let impressao = b.impressao;
                                                  if (!b.impressaoManual) {
                                                    impressao =
                                                      gerarImpressaoDiagnostica(
                                                        exameAtual,
                                                        b.selecoes,
                                                        { medidas },
                                                      );
                                                  }
                                                  return {
                                                    ...b,
                                                    medidas,
                                                    impressao,
                                                  };
                                                }),
                                              );
                                            }}
                                          />
                                          <span>
                                            Aumento de fluxo ao Doppler
                                            (polias)
                                          </span>
                                        </label>
                                      ) : null}
                                    </div>
                                  </div>
                                );
                              })
                          : null}
                        {opcoesComMedida.map((op) => {
                          const multi = opcaoPermiteMultiplasLesoes(op);
                          const precisaLocal = opcaoRequerLocalizacao(op, secao);
                          const showDopplerMedida =
                            comDopplerTireoide &&
                            opcaoRequerDopplerNodulo(op);
                          const items = multi
                            ? lesoesDaOpcao(bloco, secao, op.id)
                            : [
                                {
                                  medida:
                                    bloco.medidas[
                                      chaveMedida(secao.id, op.id)
                                    ] ??
                                    bloco.medidas[secao.id] ??
                                    "",
                                  local:
                                    bloco.medidas[
                                      chaveLocalizacao(secao.id, op.id)
                                    ] ?? "",
                                },
                              ];
                          return (
                            <div key={op.id} className="medida-grupo">
                              {items.map((item, idx) => (
                                <div
                                  key={`${op.id}-${idx}`}
                                  className="lesao-item"
                                >
                                  <div className="lesao-item-head">
                                    <span className="lesao-item-title">
                                      {multi
                                        ? `${op.label} ${idx + 1}`
                                        : `Tamanho — ${op.label}`}
                                    </span>
                                    <div className="lesao-item-actions">
                                      {multi ? (
                                        <button
                                          type="button"
                                          className="btn-plus lesao-plus"
                                          title={`Acrescentar ${op.label.toLowerCase()}`}
                                          aria-label={`Acrescentar ${op.label.toLowerCase()}`}
                                          onClick={() =>
                                            acrescentarLesao(
                                              bloco.key,
                                              secao.id,
                                              op.id,
                                            )
                                          }
                                        >
                                          +
                                        </button>
                                      ) : null}
                                      {multi && items.length > 1 ? (
                                        <button
                                          type="button"
                                          className="btn ghost small"
                                          onClick={() =>
                                            removerLesao(
                                              bloco.key,
                                              secao.id,
                                              op.id,
                                              idx,
                                            )
                                          }
                                        >
                                          Remover
                                        </button>
                                      ) : null}
                                    </div>
                                  </div>
                                  <label className="field medida-field">
                                    <span>
                                      {/neuropatia-mediano|tunel-do-carpo/i.test(
                                        op.id,
                                      )
                                        ? "Área do nervo mediano"
                                        : /talalgia/i.test(op.id)
                                          ? "Espessura do coxim"
                                          : /eim|emi/i.test(op.id)
                                            ? "Espessura EIM"
                                            : /estenose|vsp|kinking|coiling|hipoplasia/i.test(
                                                  op.id,
                                                )
                                              ? "Medida (VSP / diâmetro)"
                                              : /placa/i.test(op.id)
                                                ? "Medida da placa"
                                                : "Medida"}
                                    </span>
                                    <input
                                      value={item.medida}
                                      onChange={(ev) => {
                                        if (multi) {
                                          atualizarLesao(
                                            bloco.key,
                                            secao.id,
                                            op.id,
                                            idx,
                                            "medida",
                                            ev.target.value,
                                          );
                                        } else {
                                          atualizarMedida(
                                            bloco.key,
                                            secao.id,
                                            op.id,
                                            ev.target.value,
                                          );
                                        }
                                      }}
                                      placeholder={
                                        /neuropatia-mediano|tunel-do-carpo/i.test(
                                          op.id,
                                        )
                                          ? "Ex.: 14 (normal < 12 mm²)"
                                          : /talalgia/i.test(op.id)
                                            ? "Ex.: 1,8 cm (normal < 1,5 cm)"
                                            : "Ex.: 1,2 cm ou 1,0 x 0,8 x 0,6 cm"
                                      }
                                      inputMode="decimal"
                                    />
                                  </label>
                                  {precisaLocal ? (
                                    <label className="field medida-field">
                                      <span>Localização</span>
                                      <input
                                        value={item.local}
                                        onChange={(ev) => {
                                          if (multi) {
                                            atualizarLesao(
                                              bloco.key,
                                              secao.id,
                                              op.id,
                                              idx,
                                              "local",
                                              ev.target.value,
                                            );
                                          } else {
                                            atualizarLocalizacao(
                                              bloco.key,
                                              secao.id,
                                              op.id,
                                              ev.target.value,
                                            );
                                          }
                                        }}
                                        placeholder={
                                          /^mama-/.test(secao.id)
                                            ? "Ex.: QSE às 2 h"
                                            : "Ex.: segmento VI do lobo direito"
                                        }
                                      />
                                    </label>
                                  ) : null}
                                </div>
                              ))}
                              {showDopplerMedida ? (
                                <div className="doppler-nodulo-row">
                                  <label className="field medida-field">
                                    <span>IR</span>
                                    <input
                                      value={
                                        bloco.medidas[
                                          chaveIr(secao.id, op.id)
                                        ] ?? ""
                                      }
                                      placeholder="0,__"
                                      disabled={laudoAssinado}
                                      onChange={(ev) => {
                                        const valor = ev.target.value;
                                        setTextoManual(false);
                                        setBlocos((prev) =>
                                          prev.map((b) =>
                                            b.key === bloco.key
                                              ? {
                                                  ...b,
                                                  medidas: {
                                                    ...b.medidas,
                                                    [chaveIr(secao.id, op.id)]:
                                                      valor,
                                                  },
                                                }
                                              : b,
                                          ),
                                        );
                                      }}
                                    />
                                  </label>
                                  <label className="field medida-field">
                                    <span>IP</span>
                                    <input
                                      value={
                                        bloco.medidas[
                                          chaveIp(secao.id, op.id)
                                        ] ?? ""
                                      }
                                      placeholder="0,__"
                                      disabled={laudoAssinado}
                                      onChange={(ev) => {
                                        const valor = ev.target.value;
                                        setTextoManual(false);
                                        setBlocos((prev) =>
                                          prev.map((b) =>
                                            b.key === bloco.key
                                              ? {
                                                  ...b,
                                                  medidas: {
                                                    ...b.medidas,
                                                    [chaveIp(secao.id, op.id)]:
                                                      valor,
                                                  },
                                                }
                                              : b,
                                          ),
                                        );
                                      }}
                                    />
                                  </label>
                                  <label className="field medida-field">
                                    <span>Velocidade (cm/s)</span>
                                    <input
                                      value={
                                        bloco.medidas[
                                          chaveVel(secao.id, op.id)
                                        ] ?? ""
                                      }
                                      placeholder="____"
                                      disabled={laudoAssinado}
                                      onChange={(ev) => {
                                        const valor = ev.target.value;
                                        setTextoManual(false);
                                        setBlocos((prev) =>
                                          prev.map((b) =>
                                            b.key === bloco.key
                                              ? {
                                                  ...b,
                                                  medidas: {
                                                    ...b.medidas,
                                                    [chaveVel(secao.id, op.id)]:
                                                      valor,
                                                  },
                                                }
                                              : b,
                                          ),
                                        );
                                      }}
                                    />
                                  </label>
                                </div>
                              ) : null}
                            </div>
                          );
                        })}
                        {secao.opcoes
                          .filter(
                            (op) =>
                              idsAtivos.includes(op.id) &&
                              opcaoRequerTirads(op),
                          )
                          .map((op) => {
                            const tiradsKey = chaveTirads(secao.id, op.id);
                            const showDoppler =
                              comDopplerTireoide &&
                              opcaoRequerDopplerNodulo(op);
                            return (
                              <div key={`tirads-${op.id}`} className="tirads-box">
                                <p className="lesao-item-title">
                                  Classificação — {op.label}
                                </p>
                                <div className="gineco-params-row">
                                  {showDoppler ? (
                                    <>
                                      <label className="field medida-field">
                                        <span>Lagalla</span>
                                        <select
                                          className="correlacao-select"
                                          value={
                                            bloco.medidas[
                                              chaveLagalla(secao.id, op.id)
                                            ] ?? ""
                                          }
                                          disabled={laudoAssinado}
                                          onChange={(ev) => {
                                            const valor = ev.target.value;
                                            setTextoManual(false);
                                            setBlocos((prev) =>
                                              prev.map((b) =>
                                                b.key === bloco.key
                                                  ? {
                                                      ...b,
                                                      medidas: {
                                                        ...b.medidas,
                                                        [chaveLagalla(
                                                          secao.id,
                                                          op.id,
                                                        )]: valor,
                                                      },
                                                    }
                                                  : b,
                                              ),
                                            );
                                          }}
                                        >
                                          <option value="">Selecionar…</option>
                                          {["I", "II", "III"].map((g) => (
                                            <option key={g} value={g}>
                                              {g}
                                            </option>
                                          ))}
                                        </select>
                                      </label>
                                      <label className="field medida-field">
                                        <span>Chammas</span>
                                        <select
                                          className="correlacao-select"
                                          value={
                                            bloco.medidas[
                                              chaveChammas(secao.id, op.id)
                                            ] ?? ""
                                          }
                                          disabled={laudoAssinado}
                                          onChange={(ev) => {
                                            const valor = ev.target.value;
                                            setTextoManual(false);
                                            setBlocos((prev) =>
                                              prev.map((b) =>
                                                b.key === bloco.key
                                                  ? {
                                                      ...b,
                                                      medidas: {
                                                        ...b.medidas,
                                                        [chaveChammas(
                                                          secao.id,
                                                          op.id,
                                                        )]: valor,
                                                      },
                                                    }
                                                  : b,
                                              ),
                                            );
                                          }}
                                        >
                                          <option value="">Selecionar…</option>
                                          {["I", "II", "III", "IV", "V"].map(
                                            (g) => (
                                              <option key={g} value={g}>
                                                {g}
                                              </option>
                                            ),
                                          )}
                                        </select>
                                      </label>
                                    </>
                                  ) : null}
                                  <label className="field medida-field">
                                    <span>TIRADS *</span>
                                    <select
                                      className="correlacao-select"
                                      value={
                                        bloco.medidas[tiradsKey] ||
                                        tiradsPadraoOpcao(op)
                                      }
                                      disabled={laudoAssinado}
                                      onChange={(ev) => {
                                        const valor = ev.target.value;
                                        setTextoManual(false);
                                        setBlocos((prev) =>
                                          prev.map((b) =>
                                            b.key === bloco.key
                                              ? {
                                                  ...b,
                                                  medidas: {
                                                    ...b.medidas,
                                                    [tiradsKey]: valor,
                                                  },
                                                }
                                              : b,
                                          ),
                                        );
                                      }}
                                    >
                                      <option value="">Selecionar…</option>
                                      {[
                                        "TIRADS 1",
                                        "TIRADS 2",
                                        "TIRADS 3",
                                        "TIRADS 4",
                                        "TIRADS 5",
                                      ].map((t) => (
                                        <option key={t} value={t}>
                                          {t}
                                        </option>
                                      ))}
                                    </select>
                                  </label>
                                </div>
                              </div>
                            );
                          })}
                        {comDopplerPelvicaTv
                          ? secao.opcoes
                              .filter(
                                (op) =>
                                  idsAtivos.includes(op.id) &&
                                  opcaoRequerVascLesao(op),
                              )
                              .map((op) => {
                                const vascKey = chaveVascLesao(
                                  secao.id,
                                  op.id,
                                );
                                return (
                                  <div
                                    key={`vasc-lesao-${op.id}`}
                                    className="tirads-box"
                                  >
                                    <p className="lesao-item-title">
                                      Vascularização da lesão — {op.label}
                                    </p>
                                    <label className="field medida-field">
                                      <span>Padrão ao Doppler</span>
                                      <select
                                        className="correlacao-select"
                                        value={bloco.medidas[vascKey] ?? ""}
                                        disabled={laudoAssinado}
                                        onChange={(ev) => {
                                          const valor = ev.target.value;
                                          setTextoManual(false);
                                          setBlocos((prev) =>
                                            prev.map((b) =>
                                              b.key === bloco.key
                                                ? {
                                                    ...b,
                                                    medidas: {
                                                      ...b.medidas,
                                                      [vascKey]: valor,
                                                    },
                                                  }
                                                : b,
                                            ),
                                          );
                                        }}
                                      >
                                        <option value="">Selecionar…</option>
                                        {VASC_LESAO_OPCOES.map((v) => (
                                          <option key={v} value={v}>
                                            {v.charAt(0).toUpperCase() +
                                              v.slice(1)}
                                          </option>
                                        ))}
                                      </select>
                                    </label>
                                  </div>
                                );
                              })
                          : null}
                        {secao.opcoes
                          .filter(
                            (op) =>
                              idsAtivos.includes(op.id) &&
                              opcaoMedidaHepatocoledoco(op, secao),
                          )

                          .map((op) => {
                            const on =
                              bloco.medidas[chaveHcOn(secao.id, op.id)] ===
                              "1";
                            return (
                              <div key={`hc-${op.id}`} className="hc-box">
                                <label className="bexiga-check">
                                  <input
                                    type="checkbox"
                                    checked={on}
                                    onChange={(ev) => {
                                      setTextoManual(false);
                                      setBlocos((prev) =>
                                        prev.map((b) =>
                                          b.key === bloco.key
                                            ? {
                                                ...b,
                                                medidas: {
                                                  ...b.medidas,
                                                  [chaveHcOn(secao.id, op.id)]:
                                                    ev.target.checked
                                                      ? "1"
                                                      : "",
                                                },
                                              }
                                            : b,
                                        ),
                                      );
                                    }}
                                  />
                                  Incluir medida do hepatocolédoco
                                </label>
                                {on ? (
                                  <label className="field medida-field">
                                    <span>Calibre do hepatocolédoco</span>
                                    <input
                                      value={
                                        bloco.medidas[
                                          chaveHcMedida(secao.id, op.id)
                                        ] ?? ""
                                      }
                                      onChange={(ev) => {
                                        setTextoManual(false);
                                        setBlocos((prev) =>
                                          prev.map((b) =>
                                            b.key === bloco.key
                                              ? {
                                                  ...b,
                                                  medidas: {
                                                    ...b.medidas,
                                                    [chaveHcMedida(
                                                      secao.id,
                                                      op.id,
                                                    )]: ev.target.value,
                                                  },
                                                }
                                              : b,
                                          ),
                                        );
                                      }}
                                      placeholder="Ex.: 0,6 cm"
                                      inputMode="decimal"
                                    />
                                  </label>
                                ) : null}
                              </div>
                            );
                          })}
                        {secao.opcoes
                          .filter(
                            (op) =>
                              idsAtivos.includes(op.id) &&
                              opcaoRequerIndiceEsplenico(op),
                          )
                          .map((op) => (
                            <label
                              key={`ind-${op.id}`}
                              className="field medida-field"
                            >
                              <span>
                                Índice esplênico (normal até 60)
                              </span>
                              <input
                                value={
                                  bloco.medidas[
                                    chaveIndiceEsplenico(secao.id, op.id)
                                  ] ?? ""
                                }
                                onChange={(ev) => {
                                  setTextoManual(false);
                                  setBlocos((prev) =>
                                    prev.map((b) =>
                                      b.key === bloco.key
                                        ? {
                                            ...b,
                                            medidas: {
                                              ...b.medidas,
                                              [chaveIndiceEsplenico(
                                                secao.id,
                                                op.id,
                                              )]: ev.target.value,
                                            },
                                          }
                                        : b,
                                    ),
                                  );
                                }}
                                placeholder="Ex.: 45"
                                inputMode="decimal"
                              />
                            </label>
                          ))}
                        {opcoesComEstenose.map((op) => {
                          const pctAtual =
                            bloco.medidas[chaveEstenose(secao.id, op.id)] ?? "";
                          return (
                            <div key={`est-${op.id}`} className="estenose-box">
                              <span className="estenose-label">
                                Estreitamento (opcional) — {op.label}
                              </span>
                              <div className="chips estenose-chips">
                                {ESTENOSE_OPCOES.map((pct) => (
                                  <button
                                    key={pct}
                                    type="button"
                                    className={`chip ${pctAtual === pct ? "on" : ""}`}
                                    onClick={() =>
                                      atualizarEstenose(
                                        bloco.key,
                                        secao.id,
                                        op.id,
                                        pct,
                                      )
                                    }
                                  >
                                    {pct}%
                                  </button>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                        {bloco.exameId === "prostata" &&
                        secao.id === "bexiga" &&
                        opcaoId !== "vazia" ? (
                          <div className="bexiga-vols">
                            <label className="field medida-field">
                              <span>Volume pré-miccional (cm³)</span>
                              <input
                                value={bloco.volumes["bexiga-pre"] ?? ""}
                                onChange={(ev) =>
                                  atualizarVolume(
                                    bloco.key,
                                    "bexiga-pre",
                                    ev.target.value,
                                  )
                                }
                                placeholder="Ex.: 320"
                                inputMode="decimal"
                              />
                            </label>
                            <div className="bexiga-pos-row">
                              <label className="bexiga-check">
                                <input
                                  type="checkbox"
                                  checked={
                                    bloco.volumes["bexiga-pos-on"] === "1"
                                  }
                                  onChange={(ev) =>
                                    atualizarVolume(
                                      bloco.key,
                                      "bexiga-pos-on",
                                      ev.target.checked ? "1" : "",
                                    )
                                  }
                                />
                                Incluir volume pós-miccional
                              </label>
                              {bloco.volumes["bexiga-pos-on"] === "1" ? (
                                <label className="field medida-field">
                                  <span>Volume pós-miccional (cm³)</span>
                                  <input
                                    value={bloco.volumes["bexiga-pos"] ?? ""}
                                    onChange={(ev) =>
                                      atualizarVolume(
                                        bloco.key,
                                        "bexiga-pos",
                                        ev.target.value,
                                      )
                                    }
                                    placeholder="Ex.: 40"
                                    inputMode="decimal"
                                  />
                                </label>
                              ) : null}
                            </div>
                          </div>
                        ) : null}
                        {totalTireoide != null ? (
                          <p className="volume-auto-hint">
                            Volume total (Direito + Esquerdo + istmo):{" "}
                            <strong>
                              {formatarNumeroBr(totalTireoide, 2)} cm³
                            </strong>
                          </p>
                        ) : secao.id === "volume" &&
                          exameTemVolumeTotalTireoide(bloco.exameId) ? (
                          <p className="hint">
                            Preencha as medidas dos lobos (e istmo, se houver)
                            — o total é calculado automaticamente.
                          </p>
                        ) : null}
                      </div>
                    );
                  })}
                </div>

                {bloco.exameId === "mamas-masculino" &&
                temGinecomastiaMamaMasculino(bloco.selecoes) ? (
                  <div className="gineco-params">
                    <p className="hint">
                      Conclusão de ginecomastia — escolha lateralidade e fase:
                    </p>
                    <div className="gineco-params-row">
                      <label className="field medida-field">
                        <span>Lateralidade</span>
                        <select
                          className="correlacao-select"
                          value={
                            bloco.volumes["gineco-lado"] ||
                            ladoGinecomastiaInferido(bloco.selecoes)
                          }
                          disabled={laudoAssinado}
                          onChange={(ev) => {
                            const lado = ev.target.value;
                            setBlocos((prev) =>
                              prev.map((b) => {
                                if (b.key !== bloco.key) return b;
                                const volumes: Volumes = {
                                  ...b.volumes,
                                  "gineco-lado": lado,
                                };
                                let impressao = b.impressao;
                                if (!b.impressaoManual) {
                                  const exameAtual = getExame(b.exameId);
                                  if (exameAtual) {
                                    impressao = aplicarPlaceholdersImpressao(
                                      b.exameId,
                                      gerarImpressaoDiagnostica(
                                        exameAtual,
                                        b.selecoes,
                                      ),
                                      volumes,
                                      b.selecoes,
                                    );
                                  }
                                } else {
                                  impressao = aplicarGinecomastiaMasculino(
                                    b.impressao.includes("{{GINECO_LADO}}")
                                      ? b.impressao
                                      : "Achados ultrassonográficos compatíveis com ginecomastia ({{GINECO_LADO}}), caracterizada pelo espessamento e hiperplasia do tecido fibroglandular retroareolar (fase {{GINECO_FASE}}).",
                                    lado,
                                    volumes["gineco-fase"] ?? "nodular",
                                  );
                                }
                                return {
                                  ...b,
                                  volumes,
                                  impressao,
                                  impressaoManual: false,
                                };
                              }),
                            );
                            setTextoManual(false);
                          }}
                        >
                          {GINECO_LADOS.map((l) => (
                            <option key={l} value={l}>
                              {l}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label className="field medida-field">
                        <span>Fase</span>
                        <select
                          className="correlacao-select"
                          value={bloco.volumes["gineco-fase"] || "nodular"}
                          disabled={laudoAssinado}
                          onChange={(ev) => {
                            const fase = ev.target.value;
                            setBlocos((prev) =>
                              prev.map((b) => {
                                if (b.key !== bloco.key) return b;
                                const volumes: Volumes = {
                                  ...b.volumes,
                                  "gineco-fase": fase,
                                };
                                let impressao = b.impressao;
                                if (!b.impressaoManual) {
                                  const exameAtual = getExame(b.exameId);
                                  if (exameAtual) {
                                    impressao = aplicarPlaceholdersImpressao(
                                      b.exameId,
                                      gerarImpressaoDiagnostica(
                                        exameAtual,
                                        b.selecoes,
                                      ),
                                      volumes,
                                      b.selecoes,
                                    );
                                  }
                                }
                                return {
                                  ...b,
                                  volumes,
                                  impressao,
                                  impressaoManual: false,
                                };
                              }),
                            );
                            setTextoManual(false);
                          }}
                        >
                          {GINECO_FASES.map((f) => (
                            <option key={f} value={f}>
                              {f}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                  </div>
                ) : null}

                <label className="field impressao-field">
                  <span>Impressão diagnóstica / conclusão</span>
                  <textarea
                    rows={4}
                    value={bloco.impressao}
                    onChange={(ev) =>
                      atualizarBloco(bloco.key, {
                        impressao: ev.target.value,
                        impressaoManual: true,
                      })
                    }
                  />
                  {bloco.impressaoManual ? (
                    <button
                      type="button"
                      className="btn ghost small"
                      style={{ marginTop: 6 }}
                      onClick={() => {
                        const exameAtual = getExame(bloco.exameId);
                        if (!exameAtual) return;
                        let impressao = gerarImpressaoDiagnostica(
                          exameAtual,
                          bloco.selecoes,
                        );
                        if (bloco.lado) {
                          impressao = impressaoComLado(
                            impressao,
                            exameAtual,
                            bloco.lado,
                          );
                        }
                        impressao = aplicarPlaceholdersImpressao(
                          bloco.exameId,
                          impressao,
                          bloco.volumes,
                          bloco.selecoes,
                        );
                        atualizarBloco(bloco.key, {
                          impressao,
                          impressaoManual: false,
                        });
                      }}
                    >
                      Recalcular impressão
                    </button>
                  ) : null}
                </label>

                <div className="obs-block">
                  <div className="obs-head">
                    <h2 className="panel-title">Observações</h2>
                    <div className="obs-head-actions">
                      <button
                        type="button"
                        className="btn ghost small"
                        onClick={() => marcarPadraoObs(bloco.key)}
                      >
                        Padrão
                      </button>
                      <button
                        type="button"
                        className="btn ghost small"
                        onClick={() =>
                          marcarTodasObs(
                            bloco.key,
                            listaObs.map((o) => o.id),
                            !todasObsMarcadas,
                          )
                        }
                      >
                        {todasObsMarcadas ? "Desmarcar todas" : "Marcar todas"}
                      </button>
                      <button
                        type="button"
                        className="btn ghost small btn-limpar-obs"
                        title="Limpar marcados"
                        aria-label="Limpar marcados"
                        disabled={bloco.observacoesIds.length === 0}
                        onClick={() => limparObsMarcadas(bloco.key)}
                      >
                        <span aria-hidden="true">⌫</span> Limpar
                      </button>
                    </div>
                  </div>
                  <div className="obs-list">
                    {obsSemAnteriores ? (
                      <label
                        className={`obs-item ${bloco.observacoesIds.includes(obsSemAnteriores.id) ? "on" : ""}`}
                      >
                        <input
                          type="checkbox"
                          checked={bloco.observacoesIds.includes(
                            obsSemAnteriores.id,
                          )}
                          onChange={() =>
                            toggleObs(bloco.key, obsSemAnteriores.id)
                          }
                        />
                        <span>
                          <span className="obs-num">1. </span>
                          {obsSemAnteriores.texto}
                        </span>
                      </label>
                    ) : null}

                    <div className="obs-item correlacao-item">
                      <div className="correlacao-label">
                        Exame correlacionado com
                      </div>
                      <div className="correlacao-rows">
                        {bloco.examesAnteriores.map((ant, antIdx) => (
                          <div key={ant.id} className="correlacao-row">
                            <select
                              className="correlacao-select"
                              value={ant.modalidade}
                              onChange={(ev) =>
                                atualizarAnterior(bloco.key, ant.id, {
                                  modalidade: ev.target.value,
                                })
                              }
                              aria-label={`Modalidade do exame correlacionado ${antIdx + 1}`}
                            >
                              <option value="">Selecionar exame…</option>
                              {modalidadesCorrelacao.map((mod) => (
                                <option key={mod} value={mod}>
                                  {mod}
                                </option>
                              ))}
                            </select>
                            <span className="correlacao-de">de</span>
                            <input
                              className="correlacao-data"
                              value={ant.data}
                              onChange={(ev) =>
                                atualizarAnterior(bloco.key, ant.id, {
                                  data: formatarDataBr(ev.target.value),
                                })
                              }
                              placeholder="__/__/____"
                              inputMode="numeric"
                              aria-label={`Data do exame correlacionado ${antIdx + 1}`}
                            />
                            {antIdx === bloco.examesAnteriores.length - 1 ? (
                              <button
                                type="button"
                                className="btn-plus"
                                title="Adicionar exame e data"
                                aria-label="Adicionar exame e data"
                                onClick={() =>
                                  atualizarBloco(bloco.key, {
                                    examesAnteriores: [
                                      ...bloco.examesAnteriores,
                                      novoExameAnterior(),
                                    ],
                                  })
                                }
                              >
                                +
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="btn ghost small"
                                onClick={() =>
                                  atualizarBloco(bloco.key, {
                                    examesAnteriores:
                                      bloco.examesAnteriores.filter(
                                        (e) => e.id !== ant.id,
                                      ),
                                  })
                                }
                              >
                                Remover
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {obsRestantes.map((obs, obsIdx) => {
                      const num = obsIdx + 2;
                      const on = bloco.observacoesIds.includes(obs.id);
                      return (
                        <label
                          key={obs.id}
                          className={`obs-item ${on ? "on" : ""}`}
                        >
                          <input
                            type="checkbox"
                            checked={on}
                            onChange={() => toggleObs(bloco.key, obs.id)}
                          />
                          <span>
                            <span className="obs-num">{num}. </span>
                            {obs.texto}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {(() => {
                  const tabelasDisp = tabelasDoExame(bloco.exameId, {
                    comDoppler: bloco.volumes["tireoide-doppler"] === "1",
                  });
                  if (tabelasDisp.length === 0) return null;
                  const ids = tabelasDisp.map((t) => t.id);
                  const todasTabelas =
                    ids.length > 0 &&
                    ids.every((id) => bloco.tabelasIds.includes(id));
                  return (
                    <div className="tabelas-block">
                      <div className="obs-head">
                        <h2 className="panel-title">Anexar tabelas</h2>
                        {ids.length > 1 ? (
                          <button
                            type="button"
                            className="btn ghost small"
                            onClick={() =>
                              marcarTodasTabelas(
                                bloco.key,
                                ids,
                                !todasTabelas,
                              )
                            }
                          >
                            {todasTabelas
                              ? "Desmarcar todas"
                              : "Anexar todas"}
                          </button>
                        ) : null}
                      </div>
                      <p className="hint">
                        As tabelas selecionadas entram no laudo logo após as
                        observações.
                      </p>
                      <div className="obs-list">
                        {tabelasDisp.map((tab) => {
                          const on = bloco.tabelasIds.includes(tab.id);
                          return (
                            <label
                              key={tab.id}
                              className={`obs-item ${on ? "on" : ""}`}
                            >
                              <input
                                type="checkbox"
                                checked={on}
                                onChange={() =>
                                  toggleTabela(bloco.key, tab.id)
                                }
                              />
                              <span>{tab.label}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}
              </div>
            );
          })}
        </section>

        <section className="panel preview-panel">
          <div className="preview-head">
            <h2 className="panel-title">Laudo pronto</h2>
            {textoManual ? (
              <button
                type="button"
                className="btn ghost small"
                onClick={() => setTextoManual(false)}
              >
                Restaurar texto automático
              </button>
            ) : null}
          </div>

          <div
            ref={previewRef}
            className="preview-text preview-html preview-editavel"
            contentEditable={!laudoAssinado}
            suppressContentEditableWarning
            spellCheck
            onInput={onPreviewInput}
            role="textbox"
            aria-multiline="true"
            aria-label="Laudo formatado editável"
          />

          <div className="laudo-acoes-fim">
            <button
              type="button"
              className="btn secondary"
              onClick={() => salvarLaudoAtual()}
              disabled={laudoAssinado}
            >
              {salvoMsg ? "Salvo!" : "Salvar laudo"}
            </button>
            <button
              type="button"
              className="btn primary"
              onClick={salvarEAssinar}
              disabled={laudoAssinado}
            >
              {assinadoMsg ? "Assinado!" : "Assinar laudo"}
            </button>
            <button
              type="button"
              className="btn primary"
              onClick={salvarEAssinar}
              disabled={laudoAssinado}
            >
              {assinadoMsg ? "Assinado!" : "Salvar e assinar"}
            </button>
            <button type="button" className="btn secondary" onClick={copiar}>
              {copiado ? "Copiado!" : "Copiar laudo"}
            </button>
            <button type="button" className="btn secondary" onClick={imprimir}>
              Imprimir
            </button>
          </div>
        </section>
      </div>
    </div>
  );
});

export default LaudoBuilder;
