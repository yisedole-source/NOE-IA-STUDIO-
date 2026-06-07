const apiKey = "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"

async function envoyer() {
  let texte = document.getElementById("message").value;

  if (texte == "") return;

  let chat = document.getElementById("chat");

  // Affiche le message de l'utilisateur
  chat.innerHTML += "<p><b>Vous :</b> " + texte + "</p>";
  document.getElementById("message").value = "";

  // Affiche "en train d'écrire..."
  chat.innerHTML += "<p id='typing'><b>NOE IA :</b> ...</p>";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + apiKey
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Tu es NOE, un assistant IA utile et sympathique." },
          { role: "user", content: texte }
        ]
      })
    });

    const data = await response.json();
    const reponse = data.choices[0].message.content;

    // Remplace "..." par la vraie réponse
    document.getElementById("typing").innerHTML = "<b>NOE IA :</b> " + reponse;

  } catch (error) {
    document.getElementById("typing").innerHTML = "<b>NOE IA :</b> Erreur de connexion.";
  }
}
