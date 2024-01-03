document.addEventListener("DOMContentLoaded", function () {
    const temperatureConvertForm = document.getElementById("temperature-convert-form");
    const initialTemperatureField = document.getElementById("initial-temperature-field");

    temperatureConvertForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let initialTemperature = initialTemperatureField.value.trim();
        const resultField = document.getElementById("result");

        initialTemperatureField.classList.remove("invalid");
        resultField.classList.remove("error-message");

        if (initialTemperature.length === 0) {
            initialTemperatureField.classList.add("invalid");
            resultField.classList.add("error-message");
            resultField.textContent = "Ошибка! Необходимо указать число.";
            return;
        }

        initialTemperature = Number(initialTemperature);

        if (isNaN(initialTemperature)) {
            initialTemperatureField.classList.add("invalid");
            resultField.classList.add("error-message");
            resultField.textContent = "Ошибка! Необходимо указать число.";
            return;
        }

        if (initialTemperature < -273.15) {
            initialTemperatureField.classList.add("invalid");
            resultField.classList.add("error-message");
            resultField.textContent = "Ошибка! Температура должна быть больше или равна абсолютного нуля: -273.15";
            return;
        }

        let resultingScale;
        const radioButtons = document.querySelectorAll(".radio-button");

        radioButtons.forEach(function (e) {
            if (e.checked ) {
                resultingScale = e.value;
            }
        });

        if (resultingScale === "Kelvin") {
            resultField.textContent = (initialTemperature + 273.15).toString();
            return;
        }

        if (resultingScale === "Fahrenheit") {
            resultField.textContent = (initialTemperature * 1.8 + 32).toString();
            return;
        }

        initialTemperatureField.value = "";
    });
});