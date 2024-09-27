// Função de cálculo:

// Valor Investido * Taxa do CDI = X
// X * Rendimento do CDB * Tempo do investimento

// Função que realiza o cálculo das taxas do CDI e do CDB
function calculateRate(cdiRate, cdbRate) {
  return cdiRate * cdbRate;
}

// Essa função converte a Porcentagem para Decimais, por exemplo, uma taxa de 10% se torna 0,10
function calculateCDB(investment, CDIRate, CDBRate, years) {
  const FinalCDIRate = CDIRate / 100;
  const FinalCDBRate = CDBRate / 100;

  // Chama a função calculateRate com as taxas convertidas, esta função multiplica as duas taxas para obter a taxa final do rendimento
  const finalRate = calculateRate(FinalCDIRate, FinalCDBRate);

  // Array values criado para armazenar os valores do investimento ao longo dos anos, utiliza um loop que intera de 0 até years(valor informado pelo usuário.
  // Para cada ano i, calcula o valor do investimento após i anos usando a fórmula do valor futuro: investment * Math.pow(1 + finalRate, i)
  let values = [];
  for (let i = 0; i <= years; i++) {
    //Calcula o crescimento do investimento com base na taxa composta do rendimento
    const value = investment * Math.pow(1 + finalRate, i);

    // Converto o valor para duas casas decimais e adiciona o valor calculado para "values"
    values.push(value.toFixed(2));
  }
  // Retorna o array, que contém todos os valores do investimento para cada ano, do ano 0 até 'years'.
  return values;
}

// Resumo da função calculateRate:
// A função calculateCDB calcula os valores de um investimento em CDB ao longo de um período de tempo especificado, levando em consideração as taxas CDI e de rendimento do CDB. Ela faz isso convertendo as taxas para decimais, calculando a taxa de rendimento final, e então aplicando essa taxa de forma composta para calcular os valores do investimento para cada ano. Finalmente, retorna um array com esses valores formatados.

let cdbChart;

window.addEventListener("load", (event) => {
  const ctx = document.getElementById("cdbChart").getContext("2d");
  cdbChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          label: "Valor do Investimento",
          data: [],
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
});

function updateChart() {

  // Declaração das variáveis
  const valorInvestido = parseFloat(document.getElementById("inputsValorInvestido").value);
  const CDIRate = parseFloat(document.getElementById("inputsTaxaCDI").value);
  const CDBRate = parseFloat(document.getElementById("inputsRendimentoCDB").value);
  const years = parseInt(document.getElementById("inputsTempoInvestimento").value);

  // Validação das variáveis
  if (
    isNaN(valorInvestido) ||
    isNaN(CDIRate) ||
    isNaN(CDBRate) ||
    isNaN(years)
  ) {
    alert("Por favor, insira valores válidos.");
    console.log(valorInvestido, typeof valorInvestido);
    console.log(CDIRate, typeof CDIRate);
    console.log(CDBRate, typeof CDBRate);
    console.log(years, typeof years);
    return;
  }

  // Chamando a função que calculou os valores inseridos pelo usuário, e faz a simulação para apresentar no gráfico
  const values = calculateCDB(valorInvestido, CDIRate, CDBRate, years);
  const labels = Array.from({ length: years + 1 }, (_, i) => i.toString());

  //  Cria um array de strings que representam os anos, começando de "0" até o valor de years, e indica qual período do gráfico o usuário tem o valor X
  cdbChart.data.labels = labels;
  cdbChart.data.datasets[0].data = values;
  cdbChart.update();
}



function openTab(valorTempo, elmnt, color) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }
  document.getElementById(valorTempo).style.display = "block";
  elmnt.style.backgroundColor = color;
}
// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();



let valorFinal;
let valorInicial;
let tempo;
function calculateTime(CDIRate, CDBRate, valorInicial, valorFinal, tempo) {
  taxa = (CDIRate * CDBRate) / 100;
  valorFinal = valorInicial * (1 + taxa) ** tempo;
  return;
}

function handleAbaValor(element){
  openTab('valor', element, 'green')

  const tempo = document.getElementById("inputsTempo")
  const valor = document.getElementById("inputs")
  tempo.style.display='none';
  valor.style.display='flex';

  // Adicionar display:flex no formulário de valor e gráfico de valor
  // Adicionar display:none no formulário de tempo

}
function handleAbaTempo(element){
  openTab('tempo', element, 'green')

  const tempo = document.getElementById("inputsTempo")
  const valor = document.getElementById("inputs")
  tempo.style.display='flex';
  valor.style.display='none';

  // Adicionar display:none no formulário de valor e gráfico de valor
  // Adicionar display:flex no formulário de tempo
}


/**
 * Calcula o tempo necessário para que um valor inicial alcance um valor final
 * 
 * @param {number} valorInicial - O valor inicial.
 * @param {number} valorFinal - O valor final desejado.
 * @param {number} CDIRate - A taxa de juros (base do logaritmo).
 * @param {number} rendimentoCDB
 * @returns {number} - O tempo necessário.
 */






function calcularTempo() {

  const CDIRate = parseFloat (document.getElementById("taxaCDI").value)/100;
  const valorInicialTempo = parseFloat (document.getElementById("valorInvestido").value);
  const rendimentoCDB = parseFloat (document.getElementById("rendimentoCDB").value)/100;
  const valorFinalTempo = parseFloat (document.getElementById("valorInvestimento").value);

  
  
  if (valorInicialTempo <= 0 
    || typeof valorInicialTempo != 'number' 
    || valorFinalTempo <= 0  
    || typeof valorFinalTempo != 'number' 
    || rendimentoCDB <= 0 
    || typeof rendimentoCDB != 'number'  
    || CDIRate <= 0) {

    alert("Todos os parâmetros devem ser maiores que zero.");
    return; 
  }
  console.log(valorInicialTempo);
  console.log(valorFinalTempo);
  console.log(rendimentoCDB);
  console.log(CDIRate);
  
  // Calcula o logaritmo na base da taxa de juros
  
  const Tempo = Math.log(valorFinalTempo / valorInicialTempo) / Math.log(1 + CDIRate);
  console.log(`Tempo: ${Tempo}`)

  const tempoCalculado = document.getElementById('tempoCalculado');
  tempoCalculado.innerHTML = `Tempo: ${parseInt (Tempo,10)} anos`;
  modal.style.display = "block";
}







// Janela que abre informando o tempo resultado:

var modal = document.getElementById("windowCalculate");

var btn = document.getElementById("openModalBtn");

var span = document.getElementsByClassName("close")[0];

var modalMessage = document.getElementById("modalMessage");

btn.onclick = function() {
  calcularTempo()
 
}

// Quando o usuário clicar no <span> (x), fecha o modal
span.onclick = function() {
  modal.style.display = "none";
}

// Quando o usuário clicar fora do modal, fecha o modal
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


