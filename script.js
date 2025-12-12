// Configuração do projeto
const CONFIG = {
    WEB_APP_URL: 'SUA_URL_DO_GOOGLE_APPS_SCRIPT_AQUI', // Substituir depois
    VERSION: '1.0.0'
};

// Dados do aluno (armazenados localmente)
let aluno = {
    nome: '',
    turma: '',
    codigoSessao: '',
    inicioSessao: null
};

// Banco de dados de lições e questões
const BANCO_DE_QUESTOES = {
    acidos: {
        titulo: "Ácidos - Os Azedinhos",
        icone: "fa-lemon",
        texto: "Os ácidos são substâncias que liberam íons H⁺ em água. Eles têm sabor azedo (como o limão), conduzem corrente elétrica quando dissolvidos e reagem com metais liberando hidrogênio. No cotidiano, estão no vinagre, refrigerantes e até no suco gástrico do seu estômago!",
        questoes: [
            {
                pergunta: "Qual característica é TÍPICA dos ácidos?",
                opcoes: [
                    "Sabor adocicado",
                    "Toque escorregadio",
                    "Sabor azedo",
                    "Cor azul em tornassol"
                ],
                correta: 2 // Índice da resposta correta
            },
            {
                pergunta: "O que os ácidos liberam quando dissolvidos em água?",
                opcoes: [
                    "Íons OH⁻",
                    "Íons H⁺",
                    "Elétrons livres",
                    "Átomos de oxigênio"
                ],
                correta: 1
            },
            {
                pergunta: "Qual destes alimentos contém naturalmente ácidos?",
                opcoes: [
                    "Azeite de oliva",
                    "Arroz cozido",
                    "Limão",
                    "Pão francês"
                ],
                correta: 2
            },
            {
                pergunta: "Como os ácidos reagem com a fenolftaleína?",
                opcoes: [
                    "Ficam vermelhos",
                    "Ficam azuis",
                    "Não mudam de cor (incolor)",
                    "Ficam verdes"
                ],
                correta: 2
            },
            {
                pergunta: "Qual NÃO é uma propriedade geral dos ácidos?",
                opcoes: [
                    "Conduzem corrente elétrica em solução",
                    "Reagem com bases formando sal e água",
                    "Possuem sabor adstringente",
                    "Reagem com metais produzindo gás"
                ],
                correta: 2
            }
        ]
    },
    bases: {
        titulo: "Bases - Os Anti-Ácidos",
        icone: "fa-hand-holding-water",
        texto: "As bases (ou hidróxidos) são substâncias que liberam íons OH⁻ em água. Elas têm sabor adstringente (amarram a boca), toque escorregadio (como sabão) e conduzem corrente elétrica. São usadas em produtos de limpeza, antiácidos estomacais e na fabricação de sabões!",
        questoes: [
            {
                pergunta: "O que caracteriza uma base?",
                opcoes: [
                    "Libera íons H⁺ em água",
                    "Libera íons OH⁻ em água",
                    "Tem pH menor que 7",
                    "Sabor azedo característico"
                ],
                correta: 1
            },
            {
                pergunta: "Qual destes é um exemplo comum de base?",
                opcoes: [
                    "Vinagre",
                    "Suco de laranja",
                    "Leite de magnésia",
                    "Refrigerante"
                ],
                correta: 2
            },
            {
                pergunta: "Como as bases reagem com a fenolftaleína?",
                opcoes: [
                    "Ficam incolores",
                    "Ficam vermelhas",
                    "Ficam azuis",
                    "Ficam amarelas"
                ],
                correta: 1
            },
            {
                pergunta: "Qual é o toque característico das bases?",
                opcoes: [
                    "Áspero",
                    "Seco",
                    "Escorregadio",
                    "Quente"
                ],
                correta: 2
            },
            {
                pergunta: "O que acontece quando uma base reage com um ácido?",
                opcoes: [
                    "Forma outra base",
                    "Forma sal e água",
                    "Libera gás hidrogênio",
                    "Não reage"
                ],
                correta: 1
            }
        ]
    },
    sais: {
        titulo: "Sais - Mais que Tempero",
        icone: "fa-mortar-pestle",
        texto: "Os sais são formados na reação entre ácido e base (neutralização). Podem ser encontrados na natureza ou produzidos industrialmente. O sal de cozinha (NaCl) é o mais famoso, mas existem milhares! Alguns são coloridos, outros tóxicos, e muitos essenciais para nossa saúde.",
        questoes: [
            {
                pergunta: "Como são formados os sais?",
                opcoes: [
                    "Ácido + Ácido",
                    "Base + Base",
                    "Ácido + Base",
                    "Metal + Não-metal"
                ],
                correta: 2
            },
            {
                pergunta: "Qual destes é um sal?",
                opcoes: [
                    "Ácido sulfúrico",
                    "Hidróxido de sódio",
                    "Cloreto de sódio",
                    "Água"
                ],
                correta: 2
            },
            {
                pergunta: "O que caracteriza os sais em relação à condutividade?",
                opcoes: [
                    "Não conduzem em nenhum estado",
                    "Conduzem só quando fundidos",
                    "Conduzem em solução aquosa ou fundidos",
                    "São isolantes perfeitos"
                ],
                correta: 2
            },
            {
                pergunta: "Qual NÃO é uma propriedade geral dos sais?",
                opcoes: [
                    "Sólidos à temperatura ambiente",
                    "Altos pontos de fusão",
                    "Conduzem corrente quando dissolvidos",
                    "Sabor adocicado característico"
                ],
                correta: 3
            },
            {
                pergunta: "Para que serve o sal NaHCO₃ (bicarbonato de sódio)?",
                opcoes: [
                    "Temperar alimentos",
                    "Fabricação de vidro",
                    "Antiácido e fermento",
                    "Produção de explosivos"
                ],
                correta: 2
            }
        ]
    },
    oxidos: {
        titulo: "Óxidos - Oxigênio em Ação",
        icone: "fa-wind",
        texto: "Óxidos são compostos binários de oxigênio com outro elemento. Estão por toda parte: na ferrugem (óxido de ferro), na cal (óxido de cálcio) e até no gás carbônico da sua respiração! Podem ser ácidos, básicos, neutros ou anfóteros, cada um com propriedades únicas.",
        questoes: [
            {
                pergunta: "O que caracteriza um óxido?",
                opcoes: [
                    "Tem sempre oxigênio e hidrogênio",
                    "É formado por oxigênio e um metal",
                    "É um composto binário com oxigênio",
                    "Sempre reage com água"
                ],
                correta: 2
            },
            {
                pergunta: "Qual destes é um óxido ácido?",
                opcoes: [
                    "Óxido de cálcio (CaO)",
                    "Óxido de magnésio (MgO)",
                    "Dióxido de carbono (CO₂)",
                    "Óxido de sódio (Na₂O)"
                ],
                correta: 2
            },
            {
                pergunta: "O que é a ferrugem?",
                opcoes: [
                    "Óxido de cobre",
                    "Óxido de alumínio",
                    "Óxido de ferro",
                    "Óxido de prata"
                ],
                correta: 2
            },
            {
                pergunta: "Como o CO₂ reage com a água?",
                opcoes: [
                    "Forma um ácido",
                    "Forma uma base",
                    "Forma um sal",
                    "Não reage"
                ],
                correta: 0
            },
            {
                pergunta: "Qual óxido é usado na fabricação de cal?",
                opcoes: [
                    "CO₂",
                    "CaO",
                    "Al₂O₃",
                    "SO₂"
                ],
                correta: 1
            }
        ]
    }
};

// Estado da aplicação
let estado = {
    licaoAtual: 'acidos',
    questaoAtual: 0,
    respostas: [],
    licoesCompletadas: 0,
    questoesEmbaralhadas: [],
    ordemLicoes: ['acidos', 'bases', 'sais', 'oxidos']
};

// Elementos DOM
const telas = {
    identificacao: document.getElementById('tela-identificacao'),
    introducao: document.getElementById('tela-introducao'),
    questao: document.getElementById('tela-questao'),
    conclusao: document.getElementById('tela-conclusao')
};

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Gerar código de sessão único
    aluno.codigoSessao = gerarCodigoSessao();
    aluno.inicioSessao = new Date().toISOString();
    
    // Configurar eventos
    document.getElementById('btn-iniciar').addEventListener('click', iniciarAtividade);
    document.getElementById('btn-comecar-questoes').addEventListener('click', comecarQuestoes);
    document.getElementById('btn-proxima').addEventListener('click', proximaQuestao);
    document.getElementById('btn-novamente').addEventListener('click', reiniciarAtividade);
    
    // Carregar dados salvos (se existirem)
    carregarProgresso();
});

// Funções principais
function iniciarAtividade() {
    const nome = document.getElementById('nome').value.trim();
    const turma = document.getElementById('turma').value.trim();
    
    if (!nome || !turma) {
        alert('Por favor, preencha seu nome e turma!');
        return;
    }
    
    aluno.nome = nome;
    aluno.turma = turma;
    
    // Salvar dados localmente
    salvarProgresso();
    
    // Mostrar primeira lição
    mostrarLicao(estado.ordemLicoes[0]);
}

function mostrarLicao(licaoKey) {
    estado.licaoAtual = licaoKey;
    estado.questaoAtual = 0;
    estado.respostas = [];
    
    const licao = BANCO_DE_QUESTOES[licaoKey];
    
    // Atualizar interface
    document.getElementById('indicador-licao').textContent = 
        `Lições: ${estado.licoesCompletadas + 1}/4`;
    
    document.getElementById('icone-topico').innerHTML = 
        `<i class="fas ${licao.icone}"></i>`;
    
    document.getElementById('titulo-topico').textContent = licao.titulo;
    document.getElementById('texto-explicativo').textContent = licao.texto;
    
    // Embaralhar questões para esta lição
    estado.questoesEmbaralhadas = embaralharQuestoes([...licao.questoes]);
    
    // Atualizar barra de progresso
    const progresso = (estado.licoesCompletadas / 4) * 100;
    document.getElementById('progresso-bar').style.width = `${progresso}%`;
    
    // Mudar para tela de introdução
    mudarTela('introducao');
}

function comecarQuestoes() {
    mostrarQuestao(0);
    mudarTela('questao');
}

function mostrarQuestao(indice) {
    estado.questaoAtual = indice;
    const questao = estado.questoesEmbaralhadas[indice];
    
    if (!questao) return;
    
    // Atualizar contador
    document.getElementById('contador-questao').textContent = 
        `Questão ${indice + 1}/${estado.questoesEmbaralhadas.length}`;
    
    // Atualizar progresso da questão
    const progressoQuestao = ((indice) / estado.questoesEmbaralhadas.length) * 100;
    document.getElementById('progresso-questao').style.width = `${progressoQuestao}%`;
    
    // Atualizar texto da questão
    document.getElementById('texto-questao').textContent = questao.pergunta;
    
    // Criar opções
    const opcoesContainer = document.getElementById('opcoes-container');
    opcoesContainer.innerHTML = '';
    
    // Embaralhar opções
    const opcoesEmbaralhadas = embaralharArray([...questao.opcoes]);
    
    opcoesEmbaralhadas.forEach((opcao, index) => {
        const opcaoElement = document.createElement('div');
        opcaoElement.className = 'opcao';
        opcaoElement.innerHTML = `
            <span class="opcao-letra">${String.fromCharCode(65 + index)}</span>
            <span class="opcao-texto">${opcao}</span>
        `;
        
        opcaoElement.addEventListener('click', () => selecionarOpcao(opcaoElement, opcao));
        opcoesContainer.appendChild(opcaoElement);
    });
    
    // Desabilitar botão próxima
    document.getElementById('btn-proxima').disabled = true;
}

function selecionarOpcao(elemento, resposta) {
    // Remover seleção anterior
    document.querySelectorAll('.opcao').forEach(op => {
        op.classList.remove('selecionada');
    });
    
    // Marcar como selecionada
    elemento.classList.add('selecionada');
    
    // Armazenar resposta
    const questaoIndex = estado.questaoAtual;
    const questaoOriginal = estado.questoesEmbaralhadas[questaoIndex];
    const opcaoIndex = questaoOriginal.opcoes.indexOf(resposta);
    
    estado.respostas[questaoIndex] = {
        respostaSelecionada: resposta,
        indiceSelecionado: opcaoIndex,
        indiceCorreto: questaoOriginal.correta,
        timestamp: new Date().toISOString()
    };
    
    // Habilitar botão próxima
    document.getElementById('btn-proxima').disabled = false;
}

function proximaQuestao() {
    const totalQuestoes = estado.questoesEmbaralhadas.length;
    
    if (estado.questaoAtual < totalQuestoes - 1) {
        mostrarQuestao(estado.questaoAtual + 1);
    } else {
        // Lição concluída
        estado.licoesCompletadas++;
        salvarProgresso();
        
        if (estado.licoesCompletadas < estado.ordemLicoes.length) {
            // Próxima lição
            const proximaLicao = estado.ordemLicoes[estado.licoesCompletadas];
            mostrarLicao(proximaLicao);
        } else {
            // Todas lições concluídas
            concluirAtividade();
        }
    }
}

function concluirAtividade() {
    // Enviar dados para Google Sheets
    enviarParaGoogleSheets();
    
    // Limpar dados locais
    localStorage.removeItem('quimicaDuolingoProgresso');
    
    // Mostrar tela de conclusão
    mudarTela('conclusao');
}

function enviarParaGoogleSheets() {
    // Preparar dados para envio
    const dadosEnvio = {
        nome: aluno.nome,
        turma: aluno.turma,
        codigoSessao: aluno.codigoSessao,
        inicioSessao: aluno.inicioSessao,
        fimSessao: new Date().toISOString(),
        respostas: estado.respostas,
        licoesCompletadas: estado.licoesCompletadas,
        versao: CONFIG.VERSION
    };
    
    // Log para debug (remover em produção)
    console.log('Dados prontos para envio:', dadosEnvio);
    
    // Enviar via fetch (se configurado)
    if (CONFIG.WEB_APP_URL !== 'SUA_URL_DO_GOOGLE_APPS_SCRIPT_AQUI') {
        fetch(CONFIG.WEB_APP_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosEnvio)
        }).catch(error => {
            console.error('Erro ao enviar dados:', error);
        });
    }
}

// Funções auxiliares
function mudarTela(tela) {
    // Esconder todas as telas
    Object.values(telas).forEach(t => t.classList.remove('ativa'));
    
    // Mostrar tela solicitada
    telas[tela].classList.add('ativa');
}

function embaralharQuestoes(questoes) {
    return embaralharArray(questoes);
}

function embaralharArray(array) {
    const novoArray = [...array];
    for (let i = novoArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [novoArray[i], novoArray[j]] = [novoArray[j], novoArray[i]];
    }
    return novoArray;
}

function gerarCodigoSessao() {
    return Math.random().toString(36).substring(2, 8).toUpperCase() + 
           Date.now().toString(36).substring(4, 8).toUpperCase();
}

function salvarProgresso() {
    const progresso = {
        aluno: aluno,
        estado: estado,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem('quimicaDuolingoProgresso', JSON.stringify(progresso));
}

function carregarProgresso() {
    const salvo = localStorage.getItem('quimicaDuolingoProgresso');
    if (salvo) {
        const progresso = JSON.parse(salvo);
        // Preencher formulário se existir
        if (progresso.aluno.nome) {
            document.getElementById('nome').value = progresso.aluno.nome;
            document.getElementById('turma').value = progresso.aluno.turma;
        }
    }
}

function reiniciarAtividade() {
    // Limpar dados
    aluno = {
        nome: aluno.nome, // Manter nome
        turma: aluno.turma, // Manter turma
        codigoSessao: gerarCodigoSessao(),
        inicioSessao: new Date().toISOString()
    };
    
    estado = {
        licaoAtual: 'acidos',
        questaoAtual: 0,
        respostas: [],
        licoesCompletadas: 0,
        questoesEmbaralhadas: [],
        ordemLicoes: ['acidos', 'bases', 'sais', 'oxidos']
    };
    
    // Voltar para identificação
    mudarTela('identificacao');
    
    // Limpar formulário (exceto nome/turma)
    // Mantém preenchido para facilitar
}
