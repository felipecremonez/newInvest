

// Função de cálculo:

// Valor Investido * Taxa do CDI = X
// X * Rendimento do CDB * Tempo do investimento



// Função que realiza o cálculo das taxas do CDI e do CDB
function calculateRate(cdiRate, cdbRate){

    return cdiRate * cdbRate 
}

// Essa função converte a Porcentagem para Decimais, por exemplo, uma taxa de 10% se torna 0,10
function calculateCDB(investment,CDIRate, CDBRate, years) {
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







let cdbChart

window.addEventListener("load", (event) => {
    const ctx = document.getElementById('cdbChart').getContext('2d');
        cdbChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Valor do Investimento',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    }); 
});


function updateChart() {

    // Declaração das variáveis
    const valor = parseFloat(document.getElementById('valor').value);
    const CDIRate = parseFloat(document.getElementById('taxaCDI').value);
    const CDBRate = parseFloat(document.getElementById('rendimentoCDB').value);
    const years = parseInt(document.getElementById('tempoInvestimento').value);
    // const cdbChart = document.getElementById('cdbChart');

    // Validação das variáveis
    if (isNaN(valor) || isNaN(CDIRate) || isNaN(CDBRate) || isNaN(years)) {
        alert('Por favor, insira valores válidos.');
        return;
    }

    // Chamando a função que calculou os valores inseridos pelo usuário, e faz a simulação para apresentar no gráfico
    const values = calculateCDB(valor, CDIRate, CDBRate, years);
    const labels = Array.from({length: years + 1}, (_, i) => i.toString());

    //  Cria um array de strings que representam os anos, começando de "0" até o valor de years, e indica qual período do gráfico o usuário tem o valor X
    cdbChart.data.labels = labels;
    cdbChart.data.datasets[0].data = values;
    cdbChart.update();
}



function openTab(cityName,elmnt,color) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }
  document.getElementById(cityName).style.display = "block";
  elmnt.style.backgroundColor = color;

}
// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();
