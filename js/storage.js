function saveTransactions() {

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

}

function loadTransactions() {

    const storedTransactions = localStorage.getItem("transactions");

    if (storedTransactions) {

        transactions = JSON.parse(storedTransactions);

    }

}