(function () {
    const numbersArray = [3, 1, 2, 6, 5, 10, 9, 7, 5, 12];
    console.log("Массив 1: " + numbersArray.join(", "));

    function sortDescending(array) {
        return array.sort((element1, element2) => element2 - element1);
    }

    console.log("Массив чисел после сортировки: " + sortDescending(numbersArray).join(", "));

    function getSubarrayFromFirstFiveNumber(array) {
        return array.slice(0, 5);
    }

    console.log("Подмассив из первых 5 элементов массива чисел: " + getSubarrayFromFirstFiveNumber(numbersArray).join(", "));

    function getSubarrayFromLastFiveNumber(array) {
        return array.slice(-5);
    }

    console.log("Подмассив из последних 5 элементов массива чисел: " + getSubarrayFromLastFiveNumber(numbersArray).join(", "));

    function getEvenNumbersSum(array) {
        return array.reduce((sum, number) => {
            if (number % 2 === 0) {
                sum += number;
            }

            return sum;
        }, 0);
    }

    console.log("Сумма четных элементов массива 1: " + getEvenNumbersSum(numbersArray));

    const oneUpToOneHundredNumbersArray = [];

    for (let i = 1; i <= 100; i++) {
        oneUpToOneHundredNumbersArray.push(i);
    }

    console.log("Массив 2: " + oneUpToOneHundredNumbersArray.join(", "));

    function getEvenNumbersSquaresArray(array) {
        return array.filter(number => number % 2 === 0).map(number => Math.pow(number, 2));
    }

    console.log("Список квадратов четных чисел из массива 2: " + getEvenNumbersSquaresArray(oneUpToOneHundredNumbersArray).join(", "));
})();