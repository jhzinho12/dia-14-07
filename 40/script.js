
let filaNormal = [];
let filaPreferencial = [];
let contadorNormal = 1;
let contadorPreferencial = 1;
let ultimasChamadas = []; 
let chamadasPreferencialSeguidas = 0; 


const btnNormal = document.getElementById('btn-normal');
const btnPreferencial = document.getElementById('btn-preferencial');
const btnChamar = document.getElementById('btn-chamar');
const senhaDisplay = document.getElementById('senha-display');
const listaUltimas = document.getElementById('lista-ultimas');


btnNormal.addEventListener('click', () => gerarSenha('N'));
btnPreferencial.addEventListener('click', () => gerarSenha('P'));
btnChamar.addEventListener('click', chamarProximo);

function gerarSenha(tipo) {
  let senha;
  if (tipo === 'N') {
    senha = `N-${String(contadorNormal).padStart(2, '0')}`;
    filaNormal.push(senha);
    contadorNormal++;
  } else {
    senha = `P-${String(contadorPreferencial).padStart(2, '0')}`;
    filaPreferencial.push(senha);
    contadorPreferencial++;
  }
  atualizarContadores();
  alert(`Senha gerada: ${senha}`);
}

function chamarProximo() {
  let senhaChamada = null;
  

  if (filaPreferencial.length > 0 && chamadasPreferencialSeguidas < 2) {
    senhaChamada = filaPreferencial.shift();
    chamadasPreferencialSeguidas++;
  } else if (filaNormal.length > 0) {
    senhaChamada = filaNormal.shift();
    chamadasPreferencialSeguidas = 0; 
  } else if (filaPreferencial.length > 0) { 
    senhaChamada = filaPreferencial.shift();
    chamadasPreferencialSeguidas++;
  } else {
    alert("Não há senhas na fila!");
    return;
  }

 
  atualizarPainel(senhaChamada);
  atualizarContadores();
  falarSenha(senhaChamada);
}

function atualizarPainel(senha) {

  if (senhaDisplay.textContent !== '---') {
    ultimasChamadas.unshift(senhaDisplay.textContent);
  }
  
 
  if (ultimasChamadas.length > 3) {
    ultimasChamadas.pop();
  }
  

  senhaDisplay.textContent = senha;
  
  
  listaUltimas.innerHTML = '';
  for (let i = 0; i < 3; i++) {
    const li = document.createElement('li');
    li.textContent = ultimasChamadas[i] || '---';
    listaUltimas.appendChild(li);
  }
}

function atualizarContadores() {
  document.getElementById('qtd-normal').textContent = filaNormal.length;
  document.getElementById('qtd-preferencial').textContent = filaPreferencial.length;
}


function falarSenha(senha) {
  const texto = `Senha ${senha}, comparecer ao Guichê`;
  
  const fala = new SpeechSynthesisUtterance(texto);
  fala.lang = 'pt-BR'; 
  fala.rate = 0.9; 
  fala.pitch = 1; 
  
  speechSynthesis.speak(fala);
}