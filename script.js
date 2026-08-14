document.addEventListener("DOMContentLoaded", () => {
  initializeClientConfig();
  initializeRevealAnimations();
  initializePortraitInteraction();
  initializeForm();
});

function initializeClientConfig() {
  if (typeof clientConfig === "undefined") return;

  // =========================
  // IDENTIDADE
  // =========================

  const clientName = clientConfig.companyName || "Nome da empresa";

  const clientNameElement = document.querySelector("#client-name");
  const founderNameElement = document.querySelector("#founder-name");
  const footerNameElement = document.querySelector("#footer-name");
  const initialsElement = document.querySelector("#client-initials");

  if (clientNameElement) {
    clientNameElement.textContent = clientName;
  }

  if (founderNameElement) {
    founderNameElement.textContent = clientName;
  }

  if (footerNameElement) {
    footerNameElement.textContent = clientName;
  }

  if (initialsElement) {
    initialsElement.textContent = clientConfig.initials || "";
  }

  // =========================
  // TÍTULO E DESCRIÇÃO
  // =========================

  if (clientConfig.pageTitle) {
    document.title = clientConfig.pageTitle;
  }

  if (clientConfig.pageDescription) {
    const description = document.querySelector('meta[name="description"]');

    if (description) {
      description.setAttribute("content", clientConfig.pageDescription);
    }
  }

  // =========================
  // FOTO
  // =========================

  const portrait = document.querySelector(".portrait-photo-layer");

  if (portrait && clientConfig.photo) {
    portrait.style.backgroundImage = `url("${clientConfig.photo}")`;
  }

  // =========================
  // HERO
  // =========================

  const heroThesis = document.querySelector(".hero-thesis");
  const heroSupport = document.querySelector(".hero-support");
  const heroButton = document.querySelector(".hero-actions .primary-action");

  if (heroThesis && clientConfig.heroThesis) {
    heroThesis.textContent = clientConfig.heroThesis;
  }

  if (heroSupport && clientConfig.heroSupport) {
    heroSupport.textContent = clientConfig.heroSupport;
  }

  if (heroButton && clientConfig.heroButton) {
    heroButton.textContent = clientConfig.heroButton;
  }

  // =========================
  // PROVAS
  // =========================

  const proofArticles = document.querySelectorAll(".proof-grid article");

  if (proofArticles.length >= 3) {
    const firstTitle = proofArticles[0].querySelector("strong");
    const firstText = proofArticles[0].querySelector("p");

    const secondTitle = proofArticles[1].querySelector("strong");
    const secondText = proofArticles[1].querySelector("p");

    const thirdTitle = proofArticles[2].querySelector("strong");
    const thirdText = proofArticles[2].querySelector("p");

    if (firstTitle) {
      firstTitle.textContent = clientConfig.proofNumber || "80+";
    }

    if (firstText) {
      firstText.textContent = clientConfig.proofText || "";
    }

    if (secondTitle) {
      secondTitle.textContent = clientConfig.proofTwoTitle || "";
    }

    if (secondText) {
      secondText.textContent = clientConfig.proofTwoText || "";
    }

    if (thirdTitle) {
      thirdTitle.textContent = clientConfig.proofThreeTitle || "";
    }

    if (thirdText) {
      thirdText.textContent = clientConfig.proofThreeText || "";
    }
  }

  // =========================
  // PROBLEMA
  // =========================

  const problemTitle = document.querySelector(".problem-grid h2");

  const problemQuestion = document.querySelector(".problem-question p");

  if (problemTitle && clientConfig.problemTitle) {
    problemTitle.textContent = clientConfig.problemTitle;
  }

  if (problemQuestion && clientConfig.problemQuestion) {
    problemQuestion.textContent = clientConfig.problemQuestion;
  }

  // =========================
  // DIAGNÓSTICO
  // =========================

  const diagnosisTitle = document.querySelector(".diagnosis-copy h2");

  const diagnosisText = document.querySelector(".diagnosis-copy > p");

  const diagnosisProtect = document.querySelector(".protect-line");

  if (diagnosisTitle && clientConfig.diagnosisTitle) {
    diagnosisTitle.textContent = clientConfig.diagnosisTitle;
  }

  if (diagnosisText && clientConfig.diagnosisText) {
    diagnosisText.textContent = clientConfig.diagnosisText;
  }

  if (diagnosisProtect && clientConfig.diagnosisProtect) {
    diagnosisProtect.textContent = clientConfig.diagnosisProtect;
  }

  // =========================
  // PROCESSO
  // =========================

  const processTitle = document.querySelector(".process-heading h2");

  if (processTitle && clientConfig.processTitle) {
    processTitle.firstChild.textContent = `${clientConfig.processTitle} `;
  }

  const processHighlight = document.querySelector(".process-heading h2 span");

  if (processHighlight && clientConfig.processHighlight) {
    processHighlight.textContent = clientConfig.processHighlight;
  }

  // =========================
  // SOBRE
  // =========================

  const founderTitle = document.querySelector(".founder-statement h2");

  const founderCopy = document.querySelectorAll(".founder-copy p");

  const founderQuote = document.querySelector(".founder-copy blockquote");

  if (founderTitle && clientConfig.founderTitle) {
    founderTitle.textContent = clientConfig.founderTitle;
  }

  if (founderCopy.length >= 3) {
    if (founderCopy[0] && clientConfig.founderText) {
      founderCopy[0].textContent = clientConfig.founderText;
    }

    if (founderCopy[1] && clientConfig.founderTextTwo) {
      founderCopy[1].textContent = clientConfig.founderTextTwo;
    }

    if (founderCopy[2] && clientConfig.founderTextThree) {
      founderCopy[2].textContent = clientConfig.founderTextThree;
    }
  }

  if (founderQuote && clientConfig.founderQuote) {
    founderQuote.textContent = clientConfig.founderQuote;
  }

  // =========================
  // OBJEÇÃO
  // =========================

  const objectionQuote = document.querySelector(".objection-quote");

  const objectionTitle = document.querySelector(".objection-answer h2");

  const objectionText = document.querySelector(".objection-answer p");

  const objectionButton = document.querySelector(
    ".objection-answer .text-action",
  );

  if (objectionQuote && clientConfig.objectionQuote) {
    objectionQuote.textContent = clientConfig.objectionQuote;
  }

  if (objectionTitle && clientConfig.objectionTitle) {
    objectionTitle.textContent = clientConfig.objectionTitle;
  }

  if (objectionText && clientConfig.objectionText) {
    objectionText.textContent = clientConfig.objectionText;
  }

  if (objectionButton && clientConfig.objectionButton) {
    objectionButton.textContent = clientConfig.objectionButton;
  }

  // =========================
  // FORMULÁRIO
  // =========================

  const formTitle = document.querySelector(".form-intro h2");

  const formDescription = document.querySelector(".form-intro p");

  const formButton = document.querySelector(".form-action");

  const formNote = document.querySelector("#form-note");

  if (formTitle && clientConfig.formTitle) {
    formTitle.textContent = clientConfig.formTitle;
  }

  if (formDescription && clientConfig.formDescription) {
    formDescription.textContent = clientConfig.formDescription;
  }

  if (formButton && clientConfig.formButton) {
    formButton.textContent = clientConfig.formButton;
  }

  if (formNote && clientConfig.companyName) {
    formNote.textContent = `Ao continuar, suas respostas serão abertas em uma conversa com o WhatsApp oficial de ${clientConfig.companyName}.`;
  }

  // =========================
  // FOOTER
  // =========================

  const footerDescription = document.querySelector("#footer-description");

  if (footerDescription && clientConfig.footerDescription) {
    footerDescription.textContent = clientConfig.footerDescription;
  }
}

function initializeRevealAnimations() {
  const elements = document.querySelectorAll("[data-reveal]");

  if (
    !("IntersectionObserver" in window) ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    elements.forEach((element) => {
      element.classList.add("is-visible");
    });

    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");

        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.14,
    },
  );

  elements.forEach((element) => {
    observer.observe(element);
  });
}

function initializePortraitInteraction() {
  const portrait = document.querySelector(".portrait-stage");

  if (!portrait) return;

  portrait.addEventListener("pointermove", (event) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const bounds = portrait.getBoundingClientRect();

    const x = (event.clientX - bounds.left) / bounds.width - 0.5;

    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    portrait.style.setProperty("--shift-x", `${x * 12}px`);

    portrait.style.setProperty("--shift-y", `${y * 10}px`);
  });

  portrait.addEventListener("pointerleave", () => {
    portrait.style.setProperty("--shift-x", "0px");

    portrait.style.setProperty("--shift-y", "0px");
  });
}

function initializeForm() {
  const form = document.querySelector(".diagnosis-form");

  const status = document.querySelector(".form-status");

  if (!form || !status) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = new FormData(form);

    const name = String(data.get("name") || "").trim();

    const company = String(data.get("company") || "").trim();

    const phone = String(data.get("phone") || "").trim();

    const challenge = String(data.get("challenge") || "").trim();

    if (!name || !company || !phone || !challenge) {
      status.textContent = "Preencha todos os campos para continuar.";

      return;
    }

    const button = form.querySelector('button[type="submit"]');

    if (button) {
      button.disabled = true;
      button.textContent = "Enviando...";
    }

    status.textContent = "";

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          company,
          phone,
          challenge,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erro ao enviar formulário.");
      }

      status.textContent =
        "Tudo certo. Recebemos suas informações e entraremos em contato.";

      form.reset();
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);

      status.textContent =
        "Não foi possível enviar agora. Tente novamente em alguns instantes.";
    } finally {
      if (button) {
        button.disabled = false;

        button.textContent =
          clientConfig?.formButton || "Analisar minha operação";
      }
    }
  });
}
