console.log("Chart.js Loaded");

let expenseChart;
let incomeExpenseChart;

function renderExpenseChart() {

const ctx = document

    .getElementById("expenseChart")
    .getContext("2d");

    const expenseData = {};
    transactions.forEach(function (transaction) {

    if (transaction.type === "expense") {
        if (expenseData[transaction.category]) {
            expenseData[transaction.category] += transaction.amount;
        } else {
            expenseData[transaction.category] = transaction.amount
        }
    }
});

    if (expenseChart) {
        expenseChart.destroy();
}

expenseChart = new Chart(ctx, {
    type: "pie",
    data: {
        labels: Object.keys(expenseData),
        datasets: [
            {
                label: "Expenses",
                data: Object.values(expenseData),
                borderWidth: 1
            }
        ]
    }
});

}


