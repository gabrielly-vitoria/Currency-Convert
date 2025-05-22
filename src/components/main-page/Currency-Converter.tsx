// Definindo que vai ser visivel no navegador 
'use client'

// Imports

// Hooks 
// Importando o useEffect e o useState da biblioteca do React
import { useEffect, useState } from 'react'

// Styles
// Importando os styles do Currency-Converter.module.scss
import styles from './Currency-Converter.module.scss'

// Importando o Axios 
import axios from 'axios'

// Exportando de forma padrão a função CurrencyConverter
export default function CurrencyConverter() {
  
  const [amount, setAmount] = useState('') // amount é o valor que o usuário vai digitar (ex: 5 ou 10,50)
  // setAmount é a função que atualiza esse valor

  const [fromCurrency, setFromCurrency] = useState('USD') // fromCurrency é a moeda que o usuário quer converter, 
  // From = de (ex: dólar), começa com USD

  const [toCurrency, setToCurrency] = useState('BRL') // toCurrency é a moeda que o usuário quer converter, 
  // To = para (ex: real). começa com BRL

  // exchangeRate guarda a taxa de câmbio (ex: 1 dólar = 5.42 reais)
  // | null quer dizer que pode ser um número ou nulo (quando ainda não carregou)
  const [exchangeRate, setExchangeRate] = useState<number | null>(null) // Armazena e atualiza a taxa de câmbio

  // convertedValue guarda o resultado final da conversão
  const [convertedValue, setConvertedValue] = useState<number | null>(null) // e atualiza e armazena o valor ocnvertido 

  // Essa função busca a taxa de câmbio atual usando uma API chamada AwesomeAPI 
  // async functions são uteis nesse tipo de situação porque elas permitem que o código continue rodando mesmo que ela não
  // tenha sido chamada ainda 
  async function fetchExchangeRate() {
    // A URL da API vai ser mudada dependendo das moedas escolhidas
    const url = `https://economia.awesomeapi.com.br/json/last/${fromCurrency}-${toCurrency}`

    // try vai tentar executar o que está dentro desse ecopo
    try {
      // Aqui a gente faz a requisição usando axios para a URL
     const response = await axios.get(url)
     // depois armazenamos as informações dentro da variavel data 
     const data = response.data

      // É a chave que a API usa para identificar a combinação de moedas
      // Ex: se for de USD para BRL, a chave vai ser "USDBRL"
      const key = `${fromCurrency}${toCurrency}`


      // Pegando o valor da cotação atual da moeda
      const rate = parseFloat(data[key].bid)

      // E salva o valor da cotação atual da moeda na variável setExchangerRate
      setExchangeRate(rate)

      // e retorna esse valor para que chamou a função 
      return rate

      // Se der erro no try, vai ser mostrado no console 'Erro ao buscar taxa de câmbio' 
    } catch (error) {
      console.error('Erro ao buscar taxa de câmbio:', error)
      return null
    }
  }

  // Função que vai calcular o valor convertido quando o usuário clicar no botão Convert
// Essa função é async porque vamos usar "await" nela (para esperar a resposta da API)
async function handleConvert() {
  // Aqui a gente transforma o valor digitado em número real
  // Exemplo: se a pessoa digitar "50,25", a gente troca a vírgula por ponto ("50.25")
  // Isso porque o JavaScript entende ponto como separador de centavos, não vírgula
  const parsedAmount = parseFloat(amount.replace(',', '.'))

  // Aqui a gente verifica se esse número é válido (ou seja, se não é NaN)
  // isNaN significa "isso aqui não é um número?"
  // Colocar "!" na frente inverte: "se NÃO for NaN" (então, se for um número de verdade)
  if (!isNaN(parsedAmount)) {
    // Aqui a gente chama uma função que pega a taxa de câmbio atual entre as moedas escolhidas
    // A gente usa "await" porque essa função é assíncrona, então ela pode demorar um pouco
    const rate = await fetchExchangeRate()

    // Se a gente conseguiu pegar a taxa (ou seja, se a API respondeu direitinho)
    if (rate) {
      // Aqui a gente faz a conversão: valor digitado * taxa de câmbio
      const result = parsedAmount * rate

      // Depois a gente guarda esse resultado no estado "convertedValue"
      // Isso vai fazer a tela atualizar com o valor convertido
      setConvertedValue(result)
    }
  }
}

// Esse useEffect roda toda vez que o usuário muda:
// - a moeda de origem (fromCurrency)
// - a moeda de destino (toCurrency)
// - ou o valor digitado (amount)
// Quando qualquer um desses muda, ele zera o resultado convertido (setConvertedValue(null))
// Isso evita que a pessoa veja um resultado antigo que não combina mais com o que ela digitou ou escolheu
useEffect(() => {
  setConvertedValue(null)
}, [fromCurrency, toCurrency, amount])

// Aqui começa o que vai aparecer na tela
return (
  <div className={styles.Container}>
    <div>
      {/* Campo onde o usuário digita o valor que quer converter */}
      <div>
        <label htmlFor="amount">Value</label>
      </div>
      <div>
        <input
          type="text" // Tipo do input é texto porque o usuário pode digitar vírgula
          id="amount" // ID do input
          placeholder="0,00" // Texto que aparece dentro do campo antes de digitar
          className={styles.Input} // Classe de estilo para personalizar com scss
          value={amount} // O valor atual do input vem da variável "amount"
          // Quando o usuário digita algo, a variável é atualizada com o novo valor
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      {/* Seletor das moedas: de qual moeda para qual moeda vai ser feita a conversão */}
      <div>
        <div>
          {/* Seletor da moeda de origem */}
          <label>
              From
          </label>
          <select
            value={fromCurrency} // Valor atual vem da variável "fromCurrency"
            onChange={(e) => setFromCurrency(e.target.value)} // Quando mudar, atualiza a váriavel
          >
            <option value="USD">Dólar</option>
            <option value="EUR">Euro</option>
            <option value="JPY">Iene</option>
            <option value="BRL">Real</option>
          </select>

          {/* Seletor da moeda de destino */}
          <label>
              To
          </label>
          <select
            value={toCurrency} // Valor atual vem da variável "toCurrency"
            onChange={(e) => setToCurrency(e.target.value)} // Quando o valor mudar, atualiza a variável
          >
            <option value="USD">Dólar</option>
            <option value="EUR">Euro</option>
            <option value="JPY">Iene</option>
            <option value="BRL">Real</option>
          </select>
        </div>
      </div>

      {/* Botão que quando for clicado chama a função de conversão */}
      <button className={styles.DivButton} onClick={handleConvert}>
          Convert
      </button>

      {/* Aqui aparece o resultado só se tiver valor convertido e a taxa de câmbio carregada */}
      {/*Se o valor contido dentro das Variáveis convertedValue e exchangeRate não for igual a null então será exutado oque
      estiver dentro do escopo*/}
      {convertedValue !== null && exchangeRate !== null && (
        <div className={styles.Resultado}>
          <p>
            {/* Esse "1 {dromCurency}" vai mostrar a moeda de origem, por exemplo se você escolheu "USD", vai aparecer 1 USD  */}
            {/* Já .toFixed(2) arredonda o número para ter 2 casas decimais. Exemplo: se a taxa for 5.123456, 
            com toFixed(2) vai virar 5.12*/}
            {/*E o {toCurrency} mostra a moeda de destino. Se você escolheu "BRL", aparece BRL*/}
            1 {fromCurrency} = {exchangeRate.toFixed(2)} {toCurrency}
          </p>
          <h2>
            {/* convertedValue É o número que deu na conta: o valor digitado multiplicado pela taxa. */}
            {/*.t{convertedValue.toLocaleString('pt-BR', 'pt-BR' quer dizer que vamos usar o formato do Brasil 
            Ex: usa vírgula no lugar do ponto, e coloca o R$ na frente*/}
            {convertedValue.toLocaleString('pt-BR', {
              style: 'currency',
              currency: toCurrency,
            })}
        {/*style: 'currency'
          Isso diz que queremos formatar o número como dinheiro

        currency: toCurrency,
          Aqui ele coloca o símbolo da moeda de destino automaticamente
          Se for USD, coloca US$; se for BRL, coloca R$; se for EUR, coloca € etc.*/}
          </h2>
        </div>
      )}
    </div>
  </div>
 )
}