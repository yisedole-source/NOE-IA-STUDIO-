const API_KEY = "sk-ant-api03-SC8KRYWO5umHUUrQj5wBtB3pm1XH2W_iwJTXAopTnIMr4sUMfqS41-k4f9-us2t7RdDQpJRIpoJoQn2vk1V9w-R0rNMgAA";

async function envoyerMessage() {
    let input = document.getElementById("question");
    let texte = input.value.trim();

    if (texte === "") return;

    let chat = document.getElementById("chat");

    let userMsg = document.createElement("div");
    userMsg.className = "message user";
    userMsg.textContent = texte;
    chat.appendChild(userMsg);

    input.value = "";
    chat.scrollTop = chat.scrollHeight;

    let typing = document.createElement("div");
    typing.className = "message ia";
    typing.textContent = "NOE IA est en train d'écrire...";
    chat.appendChild(typing);

    try {
            const response = await fetch("https://corsproxy.io/?https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": API_KEY,
                "anthropic-version": "2023-06-01"
            },
            body: JSON.stringify({
                model: "claude-haiku-4-5-20251001",
                max_tokens: 1024,
                system: "Tu es NOE IA, un assistant intelligent créé par Noé Houndenou. Tu réponds toujours en français, de manière amicale et utile.",
                messages: [{ role: "user", content: texte }]
            })
        });

        const data = await response.json();
        typing.textContent = data.content[0].text;

    } catch (error) {
        typing.textContent = "❌ Erreur de connexion.";
        console.error(error);
    }

    chat.scrollTop = chat.scrollHeight;
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("question").addEventListener("keypress", function(e) {
        if (e.key === "Enter") envoyerMessage();
    });
});
