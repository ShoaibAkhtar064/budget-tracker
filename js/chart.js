let expenseChart;
let incomeExpenseChart;

// Create Expense by Category Pie Chart
function renderExpenseChart() {

    const canvas = document.getElementById("expenseChart");

    if (!canvas) {
        return;
    }

    const ctx = canvas.getContext("2d");

    const expenseData = {};

 // Group expenses by category
    transactions.forEach(function (transaction) {

        if (transaction.type === "expense") {

            if (expenseData[transaction.category]) {

                expenseData[transaction.category] += transaction.amount;

            } else {

                expenseData[transaction.category] = transaction.amount;

            }

        }

    });


     // Destroy the previous chart before creating a new one
    if (expenseChart) {
        expenseChart.destroy();
    }

    expenseChart = new Chart(ctx, {

        type: "pie",

        data: {

            labels: Object.keys(expenseData),

            datasets: [{
                label: "Expenses",
                data: Object.values(expenseData),
                borderWidth: 1
            }]

        }

    });

}

// Create Income vs Expense Bar Chart
function renderIncomeExpenseChart() {

    const canvas = document.getElementById("incomeExpenseChart");

    if (!canvas) {
        return;
    }

    const ctx = canvas.getContext("2d");

    if (incomeExpenseChart) {
        incomeExpenseChart.destroy();
    }

    incomeExpenseChart = new Chart(ctx, {

        type: "bar",

        data: {

            labels: ["Income", "Expense"],

            datasets: [

                {
                    label: "Financial Summary",

                    data: [
                        calculateIncome(),
                        calculateExpense()
                    ],

                    borderWidth: 1
                }

            ]

        },

        options: {

            responsive: true,

            scales: {

                y: {
                    beginAtZero: true
                }

            }

        }

    });

}


