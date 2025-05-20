'use client'

import styles from './Currency-Converter.module.scss'

export default function CurrencyConverter() {
  return (
    <div>
      <h1>Convert</h1>

      <div>
        <input type="number" placeholder="Valor" />
      </div>

      <div>
        <select>
          <option value="USD">Dólar</option>
          <option value="EUR">Euro</option>
          <option value="JPY">Iene</option>
          <option value="BRL">Real</option>
        </select>
      </div>

      <div>
        <input type="number" placeholder="Valor" />
      </div>
      <div>
        <select>
          <option value="EUR">Euro</option>
          <option value="USD">Dólar</option>
          <option value="JPY">Iene</option>
          <option value="BRL">Real</option>
        </select>
      </div>
    </div>
  )
}
