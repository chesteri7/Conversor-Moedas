// Cotação de Moedas do dia.
const USD = 6.09
const EUR = 6.38
const GBP = 7.65

// obtendo os elementos do formulário.
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const currency = document.getElementById("currency")
const footer = document.querySelector("main footer")
const description  = document.getElementById("description")
const result = document.getElementById("result")


// Manipulando o Input amount para receber somente numeros.
amount.addEventListener("input", () => {
    const hasCharactersRegex = /\D+/g
    amount.value = amount.value.replace(hasCharactersRegex, "")
} )

// capturando o evento de submit do formulario
form.onsubmit = (event) => {
    event.preventDefault()
    switch (currency.value){
        case "USD":
            convertCurrency(amount.value, USD, "US$")
            break
        case "EUR":
            convertCurrency(amount.value, EUR, "€")
            break
        case "GBP":
            convertCurrency(amount.value, GBP, "£")
            break

    }
}

// função para converter a moeda.
function convertCurrency(amount, price, symbol){
    try {
    // Exibindo a cotação da moeda selecionada.
        description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`

    // Calcula o total.
        let total = amount * price

    //  Verifica se o resultado não é um numero.
        if (isNaN(total)){
            return alert("Por favor digite o valor corretamente para converter")
        }

    //  Formata o valor total.    
        total = formatCurrencyBRL(total).replace("R$","")
    // Exibe o resultado total.
        result.textContent = `${total} Reais`

    // Aplica a clasee que exibe o footer para mostrar o resultado.
        footer.classList.add("show-result")
    } catch (error) {
        // Remove a classe do footer removendo ele da tela.
        footer.classList.remove("show-result")
        console.log(error)
        alert("Não foi possível converter. Tente Novamente mais tarde.")
    }

}

// Formata a moeda em Real Brasileiro.
function formatCurrencyBRL (value){
// Converte para numero para utilizar o toLocaleString. Para formatar no padrão BRL (R$ 00.00).
    return Number(value).toLocaleString("pt-BR",{
        style: "currency",
        currency: "BRL",
    })
} 