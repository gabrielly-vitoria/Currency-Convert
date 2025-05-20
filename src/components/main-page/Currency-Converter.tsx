'use client'

import styles from './Currency-Converter.module.scss'
import '../main-page/Currency-Converter.module.scss'

//<span>
//       Convert    </span>


export default function CurrencyConverter() {
  return (
      
    <div className={styles.Container}>
      <div>
        {/* Input do valor */}
        <div>
          <label htmlFor="amount">
              Valor
          </label>
        </div>
        <div>
          <input type="number" id="amount" placeholder="0,00" className={styles.Input}/>
        </div>

        {/* Seletores de moeda */}
        <div>
          <div>

            <label>
                De
            </label>

            <select defaultValue="USD">
              <option value="USD">Dólar</option>
              <option value="EUR">Euro</option>
              <option value="JPY">Iene</option>
              <option value="BRL">Real</option>
              {/* Pode adicionar mais moedas */}
            </select>

            <label>
                Para
            </label>

            <select defaultValue="BRL">
              <option value="USD">Dólar</option>
              <option value="EUR">Euro</option>
              <option value="JPY">Iene</option>
              <option value="BRL">Real</option>
            </select>
          </div>

        </div>
        <button className={styles.DivButton}>
          Converter
        </button>
      </div>
    </div>
  )
}
