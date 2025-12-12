// Código para Google Apps Script (copiar para script.google.com)

// ID da planilha (substituir pelo seu)
const SHEET_ID = 'SUA_PLANILHA_ID_AQUI';
const SHEET_NAME = 'Respostas';

function doPost(e) {
  try {
    // Receber dados do formulário
    const dados = JSON.parse(e.postData.contents);
    
    // Abrir planilha
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    // Criar sheet se não existir
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      // Criar cabeçalho
      sheet.getRange(1, 1, 1, 10).setValues([[
        'Timestamp',
        'Nome',
        'Turma',
        'Código Sessão',
        'Início Sessão',
        'Fim Sessão',
        'Lições Completadas',
        'Respostas (JSON)',
        'Versão',
        'IP'
      ]]);
    }
    
    // Preparar dados para a linha
    const novaLinha = [
      new Date(),
      dados.nome,
      dados.turma,
      dados.codigoSessao,
      dados.inicioSessao,
      dados.fimSessao,
      dados.licoesCompletadas,
      JSON.stringify(dados.respostas),
      dados.versao,
      e.parameter && e.parameter.ip || 'N/A'
    ];
    
    // Adicionar nova linha
    sheet.appendRow(novaLinha);
    
    // Retornar sucesso
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Dados registrados com sucesso!',
        codigoSessao: dados.codigoSessao
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Retornar erro
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Erro: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Função para testar manualmente
function testarEnvio() {
  const dadosTeste = {
    nome: "Aluno Teste",
    turma: "1ºA",
    codigoSessao: "TEST123",
    inicioSessao: new Date().toISOString(),
    fimSessao: new Date().toISOString(),
    respostas: [
      { respostaSelecionada: "Opção A", indiceSelecionado: 0, indiceCorreto: 2 }
    ],
    licoesCompletadas: 4,
    versao: "1.0.0"
  };
  
  const resultado = doPost({
    postData: {
      contents: JSON.stringify(dadosTeste)
    }
  });
  
  Logger.log(resultado.getContent());
}

// Função para corrigir respostas (executar manualmente)
function corrigirRespostas() {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  const sheet = spreadsheet.getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  
  // Cabeçalhos
  const headers = data[0];
  
  // Gabarito (definir conforme suas questões)
  const GABARITO = {
    acidos: [2, 1, 2, 2, 2],
    bases: [1, 2, 1, 2, 1],
    sais: [2, 2, 2, 3, 2],
    oxidos: [2, 2, 2, 0, 1]
  };
  
  // Processar cada linha (começando da linha 2)
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const respostasJSON = row[7]; // Coluna H (8)
    
    if (respostasJSON) {
      try {
        const respostas = JSON.parse(respostasJSON);
        let pontuacao = 0;
        let totalQuestoes = 0;
        
        // Calcular pontuação (implementar lógica de cálculo)
        // ... sua lógica de correção aqui ...
        
        // Adicionar colunas de pontuação se não existirem
        if (headers.length < 12) {
          sheet.getRange(1, 11, 1, 2).setValues([['Pontuação', 'Percentual']]);
        }
        
        // Escrever resultados
        sheet.getRange(i + 1, 11).setValue(pontuacao);
        sheet.getRange(i + 1, 12).setValue((pontuacao / (totalQuestoes * 10) * 100) + '%');
        
      } catch (e) {
        Logger.log('Erro na linha ' + (i + 1) + ': ' + e);
      }
    }
  }
}
