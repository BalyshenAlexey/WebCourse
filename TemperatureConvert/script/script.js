document.addEventListener("DOMContentLoaded", function () {
    const temperatureConvertForm = document.getElementById("temperature-convert-form");
    const celsiusTemperatureField = document.getElementById("celsius-temperature-field");
    const resultField = document.getElementById("result");
    const radioButtons = document.querySelectorAll(".radio-button");

    temperatureConvertForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const celsiusTemperatureInString = celsiusTemperatureField.value.trim();

        celsiusTemperatureField.value = "";

        celsiusTemperatureField.classList.remove("invalid");
        resultField.classList.remove("error-message");

        if (celsiusTemperatureInString.length === 0) {
            celsiusTemperatureField.classList.add("invalid");
            resultField.classList.add("error-message");

            resultField.textContent = "Ошибка! Необходимо указать число.";

            return;
        }

        const celsiusTemperature = Number(celsiusTemperatureInString);

        if (isNaN(celsiusTemperature)) {
            celsiusTemperatureField.classList.add("invalid");
            resultField.classList.add("error-message");

            resultField.textContent = "Ошибка! Необходимо указать число.";

            return;
        }

        if (celsiusTemperature < -273.15) {
            celsiusTemperatureField.classList.add("invalid");
            resultField.classList.add("error-message");

            resultField.textContent = "Ошибка! Температура должна быть больше или равна абсолютного нуля: -273.15";

            return;
        }

        let resultScale;

        radioButtons.forEach(function (e) {
            if (e.checked) {
                resultScale = e.value;
            }
        });

        if (resultScale === "Kelvin") {
            resultField.textContent = (celsiusTemperature + 273.15).toFixed(4).toString();

            return;
        }

        if (resultScale === "Fahrenheit") {
            resultField.textContent = (celsiusTemperature * 1.8 + 32).toFixed(4).toString();
        }
    });
});