// Recupera o elemento formulário através da sua ID
const form = document.querySelector("#formulario");

// Adiciona um event listener de submit ao formulário
form.addEventListener("submit", function (e) {
  // Previne o comportamento padrão de submit do formulário
  e.preventDefault();

  // Recupera os elementos de input de peso e altura
  const inputPeso = e.target.querySelector("#peso");
  const inputAltura = e.target.querySelector("#altura");

  // Converte o valor dos inputs para números
  const peso = Number(inputPeso.value);
  const altura = Number(inputAltura.value);

  // Verifica se o valor de peso é inválido
  if (!peso) {
    // Chama a função setResultado com uma mensagem de erro e indicando que é inválido
    setResultado("Peso inválido, digite apenas números", false);
    // Adiciona a classe "error" ao input de peso
    inputPeso.classList.add("error");
    // Sai da função
    return;
  }

  // Verifica se o valor de altura é inválido
  if (!altura) {
    // Chama a função setResultado com uma mensagem de erro e indicando que é inválido
    setResultado("Altura inválida, digite apenas números.", false);
    // Adiciona a classe "error" ao input de altura
    inputAltura.classList.add("error");
    // Sai da função
    return;
  }

  // Calcula o IMC usando a função getImc
  const imc = getImc(peso, altura);
  // Obtém o nível de IMC usando a função getNivelImc
  const nivelImc = getNivelImc(imc);

  // Constrói a mensagem de resultado
  const msg = `Seu IMC é ${imc} (${nivelImc}).`;

  // Chama a função setResultado com a mensagem e indicando que é válido
  setResultado(msg, true);
  // Remove a classe "error" dos inputs de peso e altura
  inputPeso.classList.remove("error");
  inputAltura.classList.remove("error");
});
// Função que retorna o nível de IMC baseado no valor de IMC fornecido
function getNivelImc(imc) {
  // Array que armazena as descrições dos níveis de IMC
  const nivel = [
    "Abaixo do peso",
    "Peso normal",
    "Sobrepeso",
    "Obesidade grau 1",
    "Obesidade grau 2",
    "Obesidade grau 3",
  ];

  // Verifica em qual faixa o IMC está e retorna o nível correspondente
  if (imc >= 39.9) return nivel[5];
  if (imc >= 34.9) return nivel[4];
  if (imc >= 29.9) return nivel[3];
  if (imc >= 24.9) return nivel[2];
  if (imc >= 18.5) return nivel[1];
  if (imc < 18.5) return nivel[0];
}

// Função que calcula o IMC a partir do peso e da altura
function getImc(peso, altura) {
  // Calcula o IMC
  const imc = peso / altura ** 2;

  // Retorna o IMC com duas casas decimais
  return imc.toFixed(2);
}

// Função que exibe o resultado no elemento HTML com ID "resultado"
function setResultado(msg, isValid) {
  // Seleciona o elemento HTML com ID "resultado"
  const resultado = document.querySelector("#resultado");
  resultado.innerHTML = "";

  // Cria um elemento "p"
  const p = document.createElement("p");

  // Se o parâmetro "isValid" for verdadeiro, adiciona a classe "paragrafo-resultado" ao elemento "p"
  if (isValid) {
    p.classList.add("paragrafo-resultado");
  }
  // Senão, adiciona a classe "bad" ao elemento "p"
  else {
    p.classList.add("bad");
  }

  // Define o conteúdo HTML do elemento "p" com o valor do parâmetro "msg"
  p.innerHTML = msg;

  // Adiciona o elemento "p" ao elemento "resultado"
  resultado.appendChild(p);
}
