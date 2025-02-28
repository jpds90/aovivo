document.addEventListener("DOMContentLoaded", async () => {
    const jogosDiv = document.getElementById("jogos");

    try {
        const response = await fetch("/jogos");
        const dados = await response.json();

        jogosDiv.innerHTML = "";

        dados.forEach(jogo => {
            const jogoDiv = document.createElement("div");
            jogoDiv.classList.add("jogo");
            jogoDiv.innerHTML = `
                <h3>${jogo.timehome} vs ${jogo.timeaway}</h3>
                <p>Placar: ${jogo.resultadohome} - ${jogo.resultadoaway}</p>
                <p>Data: ${new Date(jogo.created_at).toLocaleString()}</p>
                <p>Tempo: ${jogo.tempo}</p>
            `;
            jogosDiv.appendChild(jogoDiv);
        });
    } catch (error) {
        jogosDiv.innerHTML = "Erro ao carregar os jogos.";
    }
});
