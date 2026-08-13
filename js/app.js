// Store all transactions
let transactions = [];

const form = document.getElementById("transaction-form");

const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const typeInput = document.getElementById("type");
const dateInput = document.getElementById("date");

const transactionList = document.getElementById("transaction-list");

// Filter elements
const categoryFilter = document.getElementById("category-filter");
const typeFilter = document.getElementById("type-filter");
const dateFilter = document.getElementById("date-filter");
const clearFilters = document.getElementById("clear-filters");

const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expenses = document.getElementById("expenses");


// Populate category filter with available categories
function populateCategoryFilter() {

    if (!categoryFilter) {
        return;
    }

    const categories = [];

    transactions.forEach(function (transaction) {

        if (!categories.includes(transaction.category)) {
            categories.push(transaction.category);
        }

    });

    categoryFilter.innerHTML = "";

    const allOption = document.createElement("option");

    allOption.value = "all";
    allOption.textContent = "All Categories";

    categoryFilter.appendChild(allOption);


    categories.forEach(function (category) {

        const option = document.createElement("option");

        option.value = category;
        option.textContent = category;

        categoryFilter.appendChild(option);

    });

}


// Display transactions in the table
function displayTransactions(filteredTransactions = transactions) {

    if (!transactionList) {
        return;
    }

    transactionList.innerHTML = "";

    filteredTransactions.forEach(function (transaction) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${transaction.description}</td>
            <td>${transaction.category}</td>
            <td>$${transaction.amount.toFixed(2)}</td>
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

// Filter transactions by category, type, and date
function filterTransactions() {

    const selectedCategory = categoryFilter.value;
    const selectedType = typeFilter.value;
    const selectedDate = dateFilter.value;

    const filteredTransactions = transactions.filter(function (transaction) {

        const categoryMatches =
            selectedCategory === "all" ||
            transaction.category === selectedCategory;

        const typeMatches =
            selectedType === "all" ||
            transaction.type === selectedType;

        const dateMatches =
            selectedDate === "" ||
            transaction.date === selectedDate;

        return categoryMatches && typeMatches && dateMatches;

    });

    displayTransactions(filteredTransactions);

}

// Listen for filter changes
if (categoryFilter) {
    categoryFilter.addEventListener("change", filterTransactions);
}

if (typeFilter) {
    typeFilter.addEventListener("change", filterTransactions);
}

if (dateFilter) {
    dateFilter.addEventListener("change", filterTransactions);
}

if (clearFilters) {

    clearFilters.addEventListener("click", function () {

        categoryFilter.value = "all";

        typeFilter.value = "all";

        dateFilter.value = "";

        displayTransactions();

    });

}

// Delete a transaction
function deleteTransaction(id) {

    transactions = transactions.filter(function (transaction) {
        return transaction.id !== id;
    });

    saveTransactions();

    populateCategoryFilter();

    displayTransactions();

    updateSummary();

    renderExpenseChart();

    renderIncomeExpenseChart();

}

// Calculate total income
function calculateIncome() {

    let totalIncome = 0;

    transactions.forEach(function (transaction) {

        if (transaction.type === "income") {

            totalIncome += transaction.amount;

        }

    });

    return totalIncome;

}

// Calculate total expenses
function calculateExpense() {

    let totalExpense = 0;

    transactions.forEach(function (transaction) {

        if (transaction.type === "expense") {

            totalExpense += transaction.amount;

        }

    });

    return totalExpense;

}

// Calculate current balance
function calculateBalance() {

    return calculateIncome() - calculateExpense();

}

// Update financial summary cards
function updateSummary() {

    if (balance) {
        balance.textContent = `$${calculateBalance().toFixed(2)}`;
    }

    if (income) {
        income.textContent = `$${calculateIncome().toFixed(2)}`;
    }

    if (expenses) {
        expenses.textContent = `$${calculateExpense().toFixed(2)}`;
    }

}

// Handle transaction form submission
if (form)
{
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

// Validate transaction amount
if (Number(amountInput.value) <= 0) {

    alert("Amount must be greater than zero.");

    return;
}

// Create a new transaction object
 const transaction = {
        id: Date.now(),
        description: descriptionInput.value,
        amount: Number(amountInput.value),
        category: categoryInput.value,
        type: typeInput.value,
        date: dateInput.value
    };

  

    transactions.push(transaction);
  
    saveTransactions();

    populateCategoryFilter();

    displayTransactions();

    updateSummary();

    renderExpenseChart();

    renderIncomeExpenseChart();

    form.reset();

});

}

// Load saved transactions when the page starts
loadTransactions();

populateCategoryFilter();

displayTransactions();

updateSummary();

renderExpenseChart();

renderIncomeExpenseChart();