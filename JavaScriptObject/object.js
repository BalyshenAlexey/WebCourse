(function () {
    const countries = [
        {
            name: "Белоруссия",
            cities: [
                {
                    name: "Минск",
                    population: 1938280
                },
                {
                    name: "Гомель",
                    population: 516976
                },
                {
                    name: "Могилёв",
                    population: 374655
                }
            ]
        },
        {
            name: "Великобритания",
            cities: [
                {
                    name: "Лондон",
                    population: 8787892
                },
                {
                    name: "Бирмингем",
                    population: 1141816
                },
                {
                    name: "Лидс",
                    population: 781700
                },
                {
                    name: "Глазго",
                    population: 621020
                }
            ]
        },
        {
            name: "Германия",
            cities: [
                {
                    name: "Берлин",
                    population: 3520031
                },
                {
                    name: "Гамбург",
                    population: 1787408
                },
                {
                    name: "Мюнхен",
                    population: 1450381
                }
            ]
        },
        {
            name: "Россия",
            cities: [
                {
                    name: "Москва",
                    population: 13104000
                },
                {
                    name: "Санкт-Петербург",
                    population: 5600000
                },
                {
                    name: "Новосибирск",
                    population: 1635000
                },
                {
                    name: "Екатеринбург",
                    population: 1539000
                }
            ]
        },
        {
            name: "Франция",
            cities: [
                {
                    name: "Париж",
                    population: 2229621
                },
                {
                    name: "Марсель",
                    population: 855393
                },
                {
                    name: "Лион",
                    population: 500715
                },
                {
                    name: "Тулуза",
                    population: 458298
                }
            ]
        }
    ];

    function getMostCitiesCountryName(countries) {
        let maxCitiesCount = countries.reduce((maxCitiesCount, country) => {
            const citiesCount = country.cities.length;

            if (citiesCount > maxCitiesCount) {
                maxCitiesCount = citiesCount;
            }

            return maxCitiesCount;
        }, 0);

        return countries.filter(country => country.cities.length === maxCitiesCount);
    }

    console.log("Страна/страны с максимальным количеством городов:");
    console.log(getMostCitiesCountryName(countries));

    function getObjectWithCountryNameAndTotalPopulation(countries) {
        const objectWithCountryNameAndTotalPopulation = {};

        countries.forEach(country => {
            objectWithCountryNameAndTotalPopulation[country.name] = country.cities.reduce((totalPopulation, city) => totalPopulation + city.population, 0);
        });

        return objectWithCountryNameAndTotalPopulation;
    }

    console.log("Объект с информацией по всем странам вида: ключ – название страны, значение – суммарная численность по стране:");
    console.log(getObjectWithCountryNameAndTotalPopulation(countries));
})();