const stages = [
  {
    key: "cuerpo",
    number: "01",
    title: "Volver al presente",
    copy: "Empezar por las sensaciones concretas antes de explicar o resolver.",
    prompt: "¿Qué está diciendo tu cuerpo que todavía no pusiste en palabras?",
  },
  {
    key: "emocion",
    number: "02",
    title: "Nombrar lo que está",
    copy: "Reconocer la emoción sin convertirla en un problema que haya que corregir.",
    prompt: "Si esta emoción tuviera un mensaje, ¿qué necesitaría que escuches?",
  },
  {
    key: "lenguaje",
    number: "03",
    title: "Observar lo que te decís",
    copy: "Distinguir hechos, interpretaciones y palabras que abren o cierran posibilidades.",
    prompt: "¿Qué frase repetida está sosteniendo el lugar en el que estás?",
  },
  {
    key: "accion",
    number: "04",
    title: "Elegir un movimiento posible",
    copy: "Traducir la claridad en una microacción concreta, propia y realizable.",
    prompt: "¿Qué paso pequeño podrías dar durante las próximas 24 horas?",
  },
];

const stageButtons = Array.from(document.querySelectorAll("[data-stage]"));
const stagePanel = document.querySelector("#stage-panel");
const stageNumber = document.querySelector("#stage-number");
const stageTitle = document.querySelector("#stage-title");
const stageCopy = document.querySelector("#stage-copy");
const stagePrompt = document.querySelector("#stage-prompt");

function selectStage(index) {
  const stage = stages[index];

  stageButtons.forEach((button, buttonIndex) => {
    const isActive = buttonIndex === index;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  stagePanel.className = `stage-panel tone-${stage.key}`;
  stageNumber.textContent = `${stage.number} / 04`;
  stageTitle.textContent = stage.title;
  stageCopy.textContent = stage.copy;
  stagePrompt.textContent = stage.prompt;
}

stageButtons.forEach((button, index) => {
  button.addEventListener("click", () => selectStage(index));
  button.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (index + direction + stageButtons.length) % stageButtons.length;
    selectStage(nextIndex);
    stageButtons[nextIndex].focus();
  });
});

const dmMessage = "Hola! Quiero obtener la Bitácora de Viaje";
const instagramCta = document.querySelector("#instagram-cta");
const instagramStatus = document.querySelector("#instagram-status");

instagramCta.href = `https://ig.me/m/iviactiva?text=${encodeURIComponent(dmMessage)}`;
instagramCta.addEventListener("click", () => {
  instagramStatus.textContent = "Mensaje copiado. Si Instagram no lo completa, pegalo en el chat.";
  if (navigator.clipboard) {
    navigator.clipboard.writeText(dmMessage).catch(() => undefined);
  }
});
