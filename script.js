document.addEventListener("DOMContentLoaded", () => {
  initializeClientConfig();
  initializeRevealAnimations();
  initializePortraitInteraction();
  initializeForm();
});

// =========================
// CONFIGURAÇÃO DO CLIENTE
// =========================

function initializeClientConfig() {
  if (typeof clientConfig === "undefined") return;

  // =========================
  // IDENTIDADE
  // =========================

  const clientName = clientConfig.companyName || "Nome da empresa";

  setText("#client-name", clientName);
  setText("#founder-name", clientName);
  setText("#footer-name", clientName);
  setText("#client-initials", clientConfig.initials);

  // =========================
  // SEO
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
  // CORES
  // =========================

  initializeColors();

  // =========================
  // FOTO
  // =========================

  const portrait = document.querySelector(".portrait-photo-layer");

  if (portrait && clientConfig.photo) {
    portrait.style.backgroundImage = `url("${clientConfig.photo}")`;
  }

  // =========================
  // INSTAGRAM
  // =========================

  initializeSocialLinks();

  // =========================
  // HERO
  // =========================

  setText("#hero-title", clientConfig.heroTitle);
  setText("#hero-highlight", clientConfig.heroHighlight);
  setText("#hero-thesis", clientConfig.heroThesis);
  setText("#hero-support", clientConfig.heroSupport);

  setText("#hero-button", clientConfig.heroButton);
  setText("#header-button", clientConfig.heroButton);

  // =========================
  // PROVAS
  // =========================

  setText("#portrait-proof-number", clientConfig.proofNumber);

  setText("#portrait-proof-text", clientConfig.proofText);

  setText("#proof-number", clientConfig.proofNumber);
  setText("#proof-text", clientConfig.proofText);

  setText("#proof-two-title", clientConfig.proofTwoTitle);

  setText("#proof-two-text", clientConfig.proofTwoText);

  setText("#proof-three-title", clientConfig.proofThreeTitle);

  setText("#proof-three-text", clientConfig.proofThreeText);

  // =========================
  // PROBLEMA
  // =========================

  setText("#problem-title", clientConfig.problemTitle);

  setText("#problem-question", clientConfig.problemQuestion);

  // =========================
  // DIAGNÓSTICO
  // =========================

  setText("#diagnosis-title", clientConfig.diagnosisTitle);

  setText("#diagnosis-text", clientConfig.diagnosisText);

  setText("#diagnosis-protect", clientConfig.diagnosisProtect);

  // =========================
  // PROCESSO
  // =========================

  setText("#process-title", clientConfig.processTitle);

  setText("#process-highlight", clientConfig.processHighlight);

  // =========================
  // SOBRE
  // =========================

  setText("#founder-title", clientConfig.founderTitle);

  setText("#founder-text", clientConfig.founderText);

  setText("#founder-text-two", clientConfig.founderTextTwo);

  setText("#founder-quote", clientConfig.founderQuote);

  setText("#founder-text-three", clientConfig.founderTextThree);

  // =========================
  // OBJEÇÃO
  // =========================

  setText("#objection-quote", clientConfig.objectionQuote);

  setText("#objection-title", clientConfig.objectionTitle);

  setText("#objection-text", clientConfig.objectionText);

  setText("#objection-button", clientConfig.objectionButton);

  // =========================
  // FORMULÁRIO
  // =========================

  setText("#form-title", clientConfig.formTitle);

  setText("#form-description", clientConfig.formDescription);

  setText("#form-button", clientConfig.formButton);

  const formNote = document.querySelector("#form-note");

  if (formNote) {
    if (clientConfig.formNote) {
      formNote.textContent = clientConfig.formNote;
    }

    if (clientConfig.companyName) {
      formNote.textContent = `Ao continuar, suas respostas serão abertas em uma conversa com o WhatsApp oficial de ${clientConfig.companyName}.`;
    }
  }

  // =========================
  // RODAPÉ
  // =========================

  setText("#footer-description", clientConfig.footerDescription);
}

// =========================
// LINKS SOCIAIS
// =========================

function initializeSocialLinks() {
  if (typeof clientConfig === "undefined") return;

  const instagramLinks = document.querySelectorAll(
    "#instagram-link, [data-social='instagram']",
  );

  instagramLinks.forEach((link) => {
    if (!clientConfig.instagram) return;

    link.href = clientConfig.instagram;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
}

// =========================
// CORES CONFIGURÁVEIS
// =========================

function initializeColors() {
  if (typeof clientConfig === "undefined" || !clientConfig.colors) {
    return;
  }

  const root = document.documentElement;
  const colors = clientConfig.colors;

  if (colors.paper) {
    root.style.setProperty("--paper", colors.paper);
  }

  if (colors.ink) {
    root.style.setProperty("--ink", colors.ink);
  }

  if (colors.navy) {
    root.style.setProperty("--navy", colors.navy);
  }

  if (colors.blue) {
    root.style.setProperty("--blue", colors.blue);
  }

  if (colors.white) {
    root.style.setProperty("--white", colors.white);
  }

  // Compatibilidade com a configuração atual
  if (colors.primary) {
    root.style.setProperty("--color-primary", colors.primary);
  }

  if (colors.background) {
    root.style.setProperty("--color-background", colors.background);
  }

  if (colors.text) {
    root.style.setProperty("--color-text", colors.text);
  }

  if (colors.muted) {
    root.style.setProperty("--color-muted", colors.muted);
  }
}

// =========================
// FUNÇÃO AUXILIAR
// =========================

function setText(selector, value) {
  if (!value) return;

  const element = document.querySelector(selector);

  if (element) {
    element.textContent = value;
  }
}

// =========================
// ANIMAÇÕES
// =========================

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

// =========================
// INTERAÇÃO DA FOTO
// =========================

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

// =========================
// FORMULÁRIO
// =========================

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
