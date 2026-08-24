(() => {
  "use strict";

  const form = document.querySelector("#application-form");
  const steps = Array.from(document.querySelectorAll("[data-step]"));
  const stepName = document.querySelector("#step-name");
  const stepNumber = document.querySelector("#step-number");
  const progressBar = document.querySelector("#progress-bar");
  const nextButton = document.querySelector("#next-button");
  const backButton = document.querySelector("#back-button");
  const submitButton = document.querySelector("#submit-button");
  const errorMessage = document.querySelector("#error-message");
  const formContent = document.querySelector("#form-content");
  const successState = document.querySelector("#success-state");
  const successTitle = document.querySelector("#success-title");
  const labels = ["Seu momento", "O que já tentou", "Próximo passo"];
  let currentStep = 0;

  function showError(message) {
    errorMessage.textContent = message;
    errorMessage.hidden = !message;
  }

  function showStep(index) {
    currentStep = index;
    steps.forEach((step, position) => {
      step.hidden = position !== index;
      step.classList.toggle("active", position === index);
    });
    stepName.textContent = labels[index];
    stepNumber.textContent = String(index + 1);
    progressBar.style.width = `${((index + 1) / steps.length) * 100}%`;
    backButton.hidden = index === 0;
    nextButton.hidden = index === steps.length - 1;
    submitButton.hidden = index !== steps.length - 1;
    showError("");
    document.querySelector(".form-card").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function validateStep(index) {
    const fields = Array.from(steps[index].querySelectorAll("input, textarea"));
    for (const field of fields) {
      if (!field.checkValidity()) {
        field.reportValidity();
        return false;
      }
    }
    return true;
  }

  function buildPayload() {
    const data = new FormData(form);
    return {
      name: String(data.get("name") || "").trim(),
      story: String(data.get("story") || "").trim(),
      tried: data.getAll("tried").map(String),
      gap: String(data.get("gap") || "").trim(),
      whyNow: String(data.get("whyNow") || "").trim(),
      email: String(data.get("email") || "").trim(),
      whatsapp: String(data.get("whatsapp") || "").trim(),
      availability: String(data.get("availability") || ""),
      investment: String(data.get("investment") || ""),
      consent: data.get("consent") === "on",
      turnstileToken: String(
  data.get("cf-turnstile-response") || ""
),
submittedAt: new Date().toISOString(),
      source: "aplicacao.seheilen.com"
    };
  }

  nextButton.addEventListener("click", () => {
    if (validateStep(currentStep)) showStep(currentStep + 1);
  });

  backButton.addEventListener("click", () => showStep(currentStep - 1));

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    showError("");

    if (!validateStep(currentStep)) return;
    if (form.elements.website.value) return;

    const endpoint = form.dataset.endpoint.trim();
    if (!endpoint) {
      showError("O recebimento das respostas ainda não foi conectado. Configure o banco de dados antes de publicar o formulário.");
      return;
    }

const payload = buildPayload();

if (!payload.turnstileToken) {
  showError("Confirme a verificação de segurança antes de enviar.");
  return;
}
    
    submitButton.disabled = true;
    submitButton.firstChild.textContent = "Enviando... ";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)      });

      if (!response.ok) throw new Error("Falha no envio");

      const firstName = form.elements.name.value.trim().split(/\s+/)[0];
      successTitle.textContent = firstName ? `Obrigada, ${firstName}.` : "Obrigada.";
      formContent.hidden = true;
      successState.hidden = false;
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      showError("Não consegui enviar sua aplicação. Aguarde um instante e tente novamente.");
      submitButton.disabled = false;
      submitButton.firstChild.textContent = "Enviar aplicação ";
      if (window.turnstile) {
  window.turnstile.reset();
}
    }
  });

  showStep(0);
})();
