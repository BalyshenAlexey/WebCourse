(function () {
    const array1 = [3, 1, 2, 6, 5, 10, 9, 7, 5, 12];
    console.log("Массив 1: " + array1.join(", "));

    const arrayAfterSort =
        array1.sort(function (element1, element2) {
            return element2 - element1;
        });
    console.log("Массив 1 после сортировки: " + arrayAfterSort.join(", "));

    const subarray1 = array1.slice(0, 5);
    console.log("Подмассив из первых 5 элементов массива 1: " + subarray1.join(", "));

    const subarray2 = array1.slice(array1.length - 5);
    console.log("Подмассив из последних 5 элементов массива 1: " + subarray2.join(", "));

    const sum = array1.reduce(function (sum, element) {
        if (element % 2 === 0) {
            return sum + element;
        }

        return sum;
    }, 0);

    console.log("Сумма четных элементов массива 1: " + sum);

    const array2 = [];

    for (let i = 1; i <= 100; i++) {
        array2.push(i);
    }

    console.log("Массив 2: " + array2.join(", "));

    const array3 = array2.map(function (element) {
        if (element % 2 === 0) {
            return Math.pow(element, 2);
        }
    });

    array3.sort(function (element1, element2) {
        return element1 - element2;
    });

    array3.splice(50, 50);

    console.log("Cписок квадратов четных чисел из массива 2: " + array3.join(", "));
})()