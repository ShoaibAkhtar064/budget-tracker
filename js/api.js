console.log("API File Loaded");

const currencySelect = document.getElementById("currency");
const exchangeRate = document.getElementById("exchange-rate");


async function loadCurrencies() {

    try {

        const response = await fetch(
            "https://api.frankfurter.dev/v2/currencies"
        );

        if (!response.ok) {
            throw new Error("Unable to load currencies");
        }

        const currencies = await response.json();

        console.log("Currencies:", currencies);

        currencySelect.innerHTML = "";

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

        getExchangeRate();

    } catch (error) {

        console.error("Error loading currencies:", error);

        exchangeRate.textContent =
            "Unable to load currencies.";

    }

}


async function getExchangeRate() {

    console.log("Fetching exchange rate...");

    const selectedCurrency = currencySelect.value;

    try {

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


currencySelect.addEventListener("change", getExchangeRate);

loadCurrencies();