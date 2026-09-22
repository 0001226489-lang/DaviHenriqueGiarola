document.addEventListener('DOMContentLoaded', () => {
    // Seleciona o botão de enviar (ajuste o seletor se o seu botão tiver um ID ou classe específica)
    const btnEnviar = document.querySelector('button') || document.querySelector('input[type="submit"]');
    
    if (btnEnviar) {
        btnEnviar.addEventListener('click', (event) => {
            // Evita que a página recarregue caso o botão esteja dentro de um <form>
            event.preventDefault(); 
            
            // Coleta o nome do usuário (ajuste o seletor conforme o id ou classe do seu input de nome)
            const inputNome = document.querySelector('input[type="text"]');
            const nomeUsuario = inputNome ? inputNome.value.trim() : 'Não informado';
            
            if (!nomeUsuario || nomeUsuario === 'Não informado') {
                alert('Por favor, digite seu nome antes de enviar.');
                return;
            }

            // Inicia o conteúdo do arquivo de texto
            let conteudoTxt = `Formulário de Respostas\n`;
            conteudoTxt += `Usuário: ${nomeUsuario}\n`;
            conteudoTxt += `Data: ${new Date().toLocaleDateString('pt-BR')} ${new Date().toLocaleTimeString('pt-BR')}\n`;
            conteudoTxt += `=========================================\n\n`;

            // Mapeia as 5 perguntas baseadas nas seleções
            // O script assume que as opções de rádio de cada pergunta compartilham o mesmo atributo 'name' (ex: name="p1", name="p2", etc.)
            for (let i = 1; i <= 5; i++) {
                const opcaoSelecionada = document.querySelector(`input[name="q${i}"]:checked`);
                
                if (opcaoSelecionada) {
                    conteudoTxt += `Pergunta ${i}: Resposta selecionada -> alternativa (${opcaoSelecionada.value})\n`;
                } else {
                    conteudoTxt += `Pergunta ${i}: Não respondida\n`;
                }
            }

            conteudoTxt += `\n=========================================`;

            // Chama a função para disparar o download do arquivo .txt
            fazerDownloadTxt(conteudoTxt, `respostas_${nomeUsuario.replace(/\s+/g, '_').toLowerCase()}.txt`);
        });
    }
});

// Função auxiliar que cria o Blob e simula o clique de download
function fazerDownloadTxt(texto, nomeArquivo) {
    const blob = new Blob([texto], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    
    link.href = URL.createObjectURL(blob);
    link.download = nomeArquivo;
    
    // Adiciona o link ao documento, clica nele e o remove em seguida
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
}