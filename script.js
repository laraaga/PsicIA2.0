window.onload = function () {
  const nome = localStorage.getItem("nomeUsuario");
  const div = document.getElementById("boas-vindas");

  if (nome && nome !== "anonimo") {
    div.innerText = `Olá, ${nome}! Seja bem-vindo(a) 🧠✨`;
  } else {
    div.innerText = `Olá! Você está no modo anônimo 🌙`;
  }
};

async function enviarMensagem() {
  const input = document.getElementById("userInput");
  const texto = input.value.trim();
  const chat = document.getElementById("chatBox");

  if (!texto) return;

  const userMsg = document.createElement("div");
  userMsg.className = "message user";
  userMsg.textContent = texto;
  chat.appendChild(userMsg);

  const typingMsg = document.createElement("div");
  typingMsg.className = "digitando";
  typingMsg.innerHTML = '💬 PsicIA está digitando <div class="typing-dots"><span></span><span></span><span></span></div>';
  chat.appendChild(typingMsg);

  chat.scrollTop = chat.scrollHeight;

  const chave = "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"; 

  let resposta = "Desculpe, não entendi.";

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${chave}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",  
        messages: [
          { role: "system", content: "Você é uma IA empática chamada PsicIA. Responda de maneira clara, objetiva e com texto de maximo 255 caracteres, como um amigo que oferece ajuda rápida e prática." },
          { role: "user", content: texto }
        ]
      })
    });

    const data = await response.json();
    console.log(data); 
    resposta = data.choices?.[0]?.message?.content || "Desculpe, não consegui entender.";

  } catch (err) {
    console.error(err);
    resposta = "Erro ao se comunicar com a IA 😢";
  }

  setTimeout(() => {
    typingMsg.remove();

    const botMsg = document.createElement("div");
    botMsg.className = "message bot";
    chat.appendChild(botMsg);

    let i = 0;
    function digitar() {
      if (i < resposta.length) {
        botMsg.textContent += resposta.charAt(i);
        i++;
        setTimeout(digitar, 60);
      }
    }

    digitar();
    chat.scrollTop = chat.scrollHeight;
  }, 1000);

  input.value = "";
}

function abrirRespiracao() {
  window.open("respiracao.html", "_blank");
}




function acharPsicologos() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        
        const url = `https://www.google.com/maps/search/psicólogos/@${lat},${lon},14z`;
        window.open(url, '_blank');
      },
      (err) => {
        alert('Não foi possível obter sua localização. Por favor, permita o acesso à localização.');
      }
    );
  } else {
    alert('Geolocalização não suportada pelo seu navegador.');
  }
}







  
