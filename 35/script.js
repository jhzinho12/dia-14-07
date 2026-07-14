
const perguntas = [
  {
    pergunta: "Qual é a capital do Brasil?",
    opcoes: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador"],
    respostaCorreta: 2 // índice da opção correta
  },
  {
    pergunta: "Quem pintou a Mona Lisa?",
    opcoes: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
    respostaCorreta: 1
  },
  {
    pergunta: "Quanto é 7 x 8?",
    opcoes: ["54", "56", "64", "49"],
    respostaCorreta: 1
  },
  {
    pergunta: "Qual linguagem roda no navegador?",
    opcoes: ["Python", "Java", "C++", "JavaScript"],
    respostaCorreta: 3
  },
  {
    pergunta: "Qual e mais famoso?",
    opcoes: ["Pokemon","Dragol Ball","bleach","naruto"],
    respostaCorreta: 1
  }
];


let perguntaAtual = 0;
let pontuacao = 0;

const telaInicial = document.getElementById('tela-inicial');
const telaPergunta = document.getElementById('tela-pergunta');
const telaFinal = document.getElementById('tela-final');

const btnIniciar = document.getElementById('btn-iniciar');
const btnReiniciar = document.getElementById('btn-reiniciar');


btnIniciar.addEventListener('click', iniciarQuiz);
btnReiniciar.addEventListener('click', reiniciarQuiz);

function iniciarQuiz() {
  telaInicial.classList.add('escondido');
  telaPergunta.classList.remove('escondido');
  carregarPergunta();
}

function carregarPergunta() {
  const p = perguntas[perguntaAtual];

  document.getElementById('contador-pergunta').textContent = `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;
  document.getElementById('pontos').textContent = `Pontos: ${pontuacao}`;
  document.getElementById('pergunta-texto').textContent = p.pergunta;
  

  const divOpcoes = document.getElementById('opcoes');
  divOpcoes.innerHTML = '';
  
  p.opcoes.forEach((opcao, indice) => {
    const botao = document.createElement('button');
    botao.textContent = opcao;
    botao.classList.add('opcao');
    botao.addEventListener('click', () => verificarResposta(indice));
    divOpcoes.appendChild(botao);
  });
}

function verificarResposta(indiceEscolhido) {
  const p = perguntas[perguntaAtual];
  const botoes = document.querySelectorAll('.opcao');
  
  
  botoes.forEach(btn => btn.classList.add('desativada'));

  if (indiceEscolhido === p.respostaCorreta) {
    botoes[indiceEscolhido].classList.add('correta');
    pontuacao++;
  } else {
    botoes[indiceEscolhido].classList.add('incorreta');
    botoes[p.respostaCorreta].classList.add('correta'); 
  }
  

  setTimeout(() => {
    perguntaAtual++;
    
    if (perguntaAtual < perguntas.length) {
      carregarPergunta();
    } else {
      mostrarResultado();
    }
  }, 1000);
}

function mostrarResultado() {
  telaPergunta.classList.add('escondido');
  telaFinal.classList.remove('escondido');
  
  const porcentagem = (pontuacao / perguntas.length) * 100;
  
  document.getElementById('resultado-pontuacao').textContent = `Você acertou ${pontuacao} de ${perguntas.length} perguntas!`;
  

  let mensagem = '';
  if (porcentagem >= 80) mensagem = 'Incrível! Você é um gênio! 🏆';
  else if (porcentagem >= 60) mensagem = 'Muito bom! Continue assim! 👏';
  else if (porcentagem >= 40) mensagem = 'Nada mal! Dá pra melhorar. 📚';
  else mensagem = 'Que tal estudar mais um pouco? 💪';
  
  document.getElementById('mensagem-final').textContent = mensagem;
}

function reiniciarQuiz() {
  perguntaAtual = 0;
  pontuacao = 0;
  telaFinal.classList.add('escondido');
  telaInicial.classList.remove('escondido');
}