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
                <p>Posse de bola: ${jogo.posse_de_bola}%</p>
                <p>Chutes ao gol: ${jogo.remates_a_baliza}</p>
            `;
            jogosDiv.appendChild(jogoDiv);
        });
    } catch (error) {
        jogosDiv.innerHTML = "Erro ao carregar os jogos.";
    }
});
