const Modal = {
  open() {
    document.querySelector('.modal-overlay').classList.add('active')
  },
  close() {
    document.querySelector('.modal-overlay').classList.remove('active')
  }
}

const transactions = [
  {
    description: 'Luz',
    amount: -50000,
    date: '23/01/2021',
  },
  {
    description: 'Freelance',
    amount: 150000,
    date: '23/01/2021',
  } 
]

const Transaction = {
  all: transactions,
  add(transaction) { //add transações
    Transaction.all.push(transaction)
    App.reload()
  },

  remove(index) { //remover transações
    Transaction.all.splice(index, 1)
    App.reload()
  },

  incomes() { //somar entradas
    let income = 0
    Transaction.all.forEach((transaction) => {
      if (transaction.amount > 0) {
        income = income + transaction.amount
      }
    })
    return income
  },
  expenses() { //somar saídas
    let expense = 0
    Transaction.all.forEach((transaction) => {
      if (transaction.amount < 0) {
        expense = expense + transaction.amount
      }
    })
    return expense
  },
  total() { //entradas - saídas
    return Transaction.incomes() + Transaction.expenses()
  }
}

const DOM = {
  transactionsContainer: document.querySelector('#data-table tbody'),

  addTransaction(transaction, index) {
    const tr = document.createElement('tr')
    tr.innerHTML = DOM.innerHTMLTransaction(transaction)

    DOM.transactionsContainer.appendChild(tr)

  },
  innerHTMLTransaction(transaction) {
    const CSSclass = transaction.amount > 0 ? "income" : "expense"

    const amount = Utils.formatCurrency(transaction.amount)

    const html = `    
      <td class="description"> ${transaction.description}</td>
      <td class="${CSSclass}"> ${amount}</td>
      <td class="date"> ${transaction.date}</td>
      <td>
        <img src="./assets/minus.svg">
      </td>
    `

    return html 
  },

  //att do balanço atual
  updateBalance() {
    document.getElementById('incomeDisplay').innerHTML = Utils.formatCurrency(Transaction.incomes())
    document.getElementById('expenseDisplay').innerHTML = Utils.formatCurrency(Transaction.expenses())
    document.getElementById('totalDisplay').innerHTML = Utils.formatCurrency(Transaction.total())
  },

  clearTransactions() {
    DOM.transactionsContainer.innerHTML = ""
  }
}

//formatar os cálculos (negativo, divisão por 100, etc)
const Utils = {
  formatCurrency(value) {
    const signal = Number(value) < 0 ? "-" : ""

    value = String(value).replace(/\D/g, "")
    value = Number(value) / 100

    value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })

    return signal + value
  }
}

const App = {
  init() {
    //retornar todos os itens sem precisar ficar repetindo cada um aqui
    Transaction.all.forEach((transaction) => {
    DOM.addTransaction(transaction)
  })

  DOM.updateBalance()
  },

  reload() {
    DOM.clearTransactions()
    App.init()
  },
}

App.init()
