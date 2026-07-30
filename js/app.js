let transactions = [];

const form = document.getElementById("transaction-form");

const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const typeInput = document.getElementById("type");
const dateInput = document.getElementById("date");

const transactionList = document.getElementById("transaction-list");

const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expenses = document.getElementById("expenses");


function displayTransactions() {

    transactionList.innerHTML = "";

    transactions.forEach(function (transaction) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${transaction.description}</td>
            <td>${transaction.category}</td>
            <td>$${transaction.amount}</td>
            <td>${transaction.type}</td>
            <td>${transaction.date}</td>
           <td>
                 <button onclick="deleteTransaction(${transaction.id})">
                        Delete
                 </button>
</td>
        `;

        transactionList.appendChild(row);

    });

}

function deleteTransaction(id) {

    transactions = transactions.filter(function (transaction) {
        return transaction.id !== id;
    });

    saveTransactions();

    displayTransactions();

    updateSummary();

    renderExpenseChart();

}


function calculateIncome() {

    let totalIncome = 0;

    transactions.forEach(function (transaction) {

        if (transaction.type === "income") {

            totalIncome += transaction.amount;

        }

    });

    return totalIncome;

}

function calculateExpense() {

    let totalExpense = 0;

    transactions.forEach(function (transaction) {

        if (transaction.type === "expense") {

            totalExpense += transaction.amount;

        }

    });

    return totalExpense;

}


function calculateBalance() {

    return calculateIncome() - calculateExpense();

}


function updateSummary() {

    balance.textContent =
        `$${calculateBalance().toFixed(2)}`;

    income.textContent =
        `$${calculateIncome().toFixed(2)}`;

    expenses.textContent =
        `$${calculateExpense().toFixed(2)}`;

}


form.addEventListener("submit", function (event) {

    event.preventDefault();

    if (

    descriptionInput.value === "" ||

    amountInput.value === "" ||

    categoryInput.value === "" ||

    typeInput.value === "" ||

    dateInput.value === ""

) {

    alert("Please fill in all fields.");

    return;

}

if (Number(amountInput.value) <= 0) {

    alert("Amount must be greater than zero.");

    return;
}

 const transaction = {
        id: Date.now(),
        description: descriptionInput.value,
        amount: Number(amountInput.value),
        category: categoryInput.value,
        type: typeInput.value,
        date: dateInput.value
    };

    console.log(transaction);

    transactions.push(transaction);
  
    saveTransactions();

    displayTransactions();

    updateSummary();

    renderExpenseChart();

    form.reset();

});


loadTransactions();

displayTransactions();

updateSummary();

renderExpenseChart();