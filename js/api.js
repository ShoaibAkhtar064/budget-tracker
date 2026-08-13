const currencySelect = document.getElementById("currency");
const exchangeRate = document.getElementById("exchange-rate");

// Load available currencies from the API
async function loadCurrencies() {

    try {
         // Fetch currency list from Frankfurter API
        const response = await fetch(
            "https://api.frankfurter.dev/v2/currencies"
        );

        if (!response.ok) {
            throw new Error("Unable to load currencies");
        }

        const currencies = await response.json();

        console.log("Currencies:", currencies);

        // Clear existing currency options
        currencySelect.innerHTML = "";

        // Add currencies to the dropdown
        currencies.forEach(function (currency) {

            if (currency.iso_code !== "USD") {

                const option = document.createElement("option");

                option.value = currency.iso_code;

                option.textContent =
                    `${currency.iso_code} - ${currency.name}`;

                currencySelect.appendChild(option);
            }

        });

        currencySelect.value = "PKR";

        // Get the exchange rate for the default currency
        getExchangeRate();

    } catch (error) {

        console.error("Error loading currencies:", error);

        exchangeRate.textContent =
            "Unable to load currencies.";

    }

}

// Get the current exchange rate for the selected currency
async function getExchangeRate() {

    console.log("Fetching exchange rate...");

    const selectedCurrency = currencySelect.value;

    try {
       // Fetch exchange rate from USD to selected currency
        const response = await fetch(
            `https://api.frankfurter.dev/v2/rate/USD/${selectedCurrency}`
        );

        if (!response.ok) {
            throw new Error("Unable to fetch exchange rate");
        }

        const data = await response.json();

        console.log(data);

        exchangeRate.textContent =
            `1 USD = ${data.rate} ${selectedCurrency}`;

    } catch (error) {

        console.error("Error fetching exchange rate:", error);

        exchangeRate.textContent =
            "Unable to load exchange rate.";

    }

}

// Set up currency dropdown and load currencies
if (currencySelect && exchangeRate) {
    currencySelect.addEventListener("change", getExchangeRate);

    loadCurrencies();
}