document.addEventListener("DOMContentLoaded", () => {
  initializeRevealAnimations();
  initializePortraitInteraction();
  initializeForm();
});

function initializeRevealAnimations() {
  const elements = document.querySelectorAll("[data-reveal]");

  if (
    !("IntersectionObserver" in window) ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    elements.forEach((element) => element.classList.add("is-visible"));
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
    { threshold: 0.14 },
  );

  elements.forEach((element) => observer.observe(element));
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
        button.textContent = "Analisar minha operação";
      }
    }
  });
}
