const transactionUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')



const localStorageTransaction = JSON.parse(localStorage
    .getItem('transactions'))
let transaction = localStorage
.getItem('transactions') !== null ? localStorageTransaction : []

const removeTransaction = ID => {
    transaction = transaction.filter(transaction => 
        transaction.id !== ID)
        updateLocalStorage()
    init()
}

const addTransactionsIntoDom = ({ amount, name, id })=>{
const operator = amount < 0 ? '-' : '+'
const CSSClass = amount < 0 ? 'minus' : 'plus'
const amountWithoutOperator = Math.abs(transaction.amount)
const li = document.createElement('li')

   li.classList.add(CSSClass)
   li.innerHTML = `
   ${name} 
   <span>${operator} R$ ${amountWithoutOperator}</span>
   <button class="delete-btn" onClick="removeTransaction(${id})">x</button>
   `
   
  transaction.append(li)
   
}

const getExpenses = transactionsAmounts =>  Math.abs(transactionsAmounts
    .filter(value => value <0)
    .reduce((acumulator, value) => accumulator + value, 0))
    .toFixed(2)
   
const getIncome = transactionsAmounts => transactionsAmounts
.filter(value => value > 0)
.reduce((acumulator,value) => acumulator + value, 0)
.toFixed(2)
const getTotal = transactionsAmounts => transactionsAmounts
.reduce((acumulator, transaction) => accumulator + transaction, 0)
.toFixed(2)

const updateBalancevalues = () =>{
    const transactionsAmounts = transaction.map(({ amount })=> amount)
    const total = getTotal (transactionsAmounts)
    const income = getIncome(transactionsAmounts)
    const expense = getExpenses (transactionsAmounts)

    const updateBalancevalues = () => {
        const transactionAmount = transactions.map(({ amount })=> amount)
        const total = getTotal(transactionsAmounts)
        const income = getIncome(transactionsAmounts)
        const expense = getExpenses(transactionsAmounts)
    }
    
    balanceDisplay.textContent = ` R$ ${total}`
    incomeDisplay.textContent = ` R$ ${income}`
    expenseDisplay.textContent = ` R$ ${expense}`
}

const init = () => {
    transactionsUl.innerHTML = ''
    transactions.forEach(addTransactionsIntoDom)
    updateBalancevalues()
}

init ()

const updateLocalStorage = () => {
    localStorage.setItem('transaction', JSON.stringify(transactions))
}

const generateID = () => Math.round(Math.random()*1000)


const addToTransactionsArray = (transactionName, transactionAmount ) =>{
    transaction.push({
        id: generateID(), 
       name: 'transactionName', 
       amount: Number(transactionAmount)
       } )
    
}

const cleanInputs = () =>{
    inputTransactionName.value = ''
    inputTransactionAmount.value = ''

}

const handleFormSumit = event =>{
    event.preventDefault()

    const transactionName = inputTransactionName.value.trim()
    const transactionAmount = inputTransactionAmount.value.trim()
    const issomeInputEmpty = transactionName ===''|| transactionAmount ===''
    if (issomeInputEmpty ) {
        alert('Por favor, preencha tanto o nome quanto o valor da transação ')
        return
    }

    addToTransactionsArray(transactionName, transactionAmount)
    init()
    updateLocalStorage()
     cleanInputs()
   
}
form.addEventListener('submit', handleFormSumit)

/*let transaction = [
    {id: 1, name:'bolo de brigadeiro', amount: -20},
    {id: 2, name:'Salário', amount: 300},
    {id: 3, name:'torta de frango', amount: -10},
    {id: 4, name:'Violão', amount: 150}
]*/