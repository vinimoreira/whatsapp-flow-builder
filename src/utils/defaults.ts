export const DEFAULTS: Record<string, any> = {
  start: { title: "Start" },
  message: { title: "Message", text: "Olá! 👋" },
  question: {
    title: "Question",
    prompt: "Deseja continuar?",
    options: [
      { id: "yes", label: "Sim" },
      { id: "no", label: "Não" },
    ],
  },
  condition: { title: "Condition", expression: "ctx.ok === true" },
  delay: { title: "Delay", ms: 1000 },
  api: { title: "API", url: "https://api.example.com", method: "GET" },
  end: { title: "End" },
};

