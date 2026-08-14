export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Método não permitido",
    });
  }

  try {
    const { name, company, phone, challenge } = req.body;

    if (!name || !company || !phone || !challenge) {
      return res.status(400).json({
        error: "Preencha todos os campos.",
      });
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "ForBase <atendimento@forbase.com.br>",
        to: ["atendimento@forbase.com.br"],
        subject: `Novo lead — ${company}`,
        html: `
          <h2>Novo lead da ForBase</h2>

          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>Empresa:</strong> ${company}</p>
          <p><strong>WhatsApp:</strong> ${phone}</p>
          <p><strong>Principal desafio:</strong> ${challenge}</p>
        `,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Erro Resend:", data);

      return res.status(response.status).json(data);
    }

    return res.status(200).json({
      success: true,
      message: "E-mail enviado com sucesso.",
    });
  } catch (error) {
    console.error("Erro interno:", error);

    return res.status(500).json({
      error: "Erro interno ao enviar o e-mail.",
    });
  }
}
