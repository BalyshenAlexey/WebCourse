(function () {
    const numbersArray = [3, 1, 2, 6, 5, 10, 9, 7, 5, 12];
    console.log("Массив 1: " + numbersArray.join(", "));

    function sortDescending(numbersArray) {
        return numbersArray.sort((number1, number2) => number2 - number1);
    }

    console.log("Массив чисел после сортировки: " + sortDescending(numbersArray).join(", "));

    function getFirstElements(array, elementsCount) {
        return array.slice(0, elementsCount);
    }

    console.log("Подмассив из первых 5 элементов массива чисел: " + getFirstElements(numbersArray, 5).join(", "));

    function getLastElements(array, elementsCount) {
        return array.slice(-elementsCount);
    }

    console.log("Подмассив из последних 5 элементов массива чисел: " + getLastElements(numbersArray, 5).join(", "));

    function getEvenNumbersSum(numbersArray) {
        return numbersArray.reduce((sum, number) => {
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

    function getEvenNumbersSquaresArray(numbersArray) {
        return numbersArray.filter(number => number % 2 === 0)
                            .map(number => Math.pow(number, 2));
    }

    console.log("Список квадратов четных чисел из массива 2: " + getEvenNumbersSquaresArray(oneUpToOneHundredNumbersArray).join(", "));
})();