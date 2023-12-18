(function () {
    const countries = [{
        countryName: "Белоруссия",
        cities: [
            {
                cityName: "Минск",
                population: 1938280,
            },
            {
                cityName: "Гомель",
                population: 516976,
            },
            {
                cityName: "Могилёв",
                population: 374655,
            }
        ],
    },
        {
            countryName: "Великобритания",
            cities: [
                {
                    cityName: "Лондон",
                    population: 8787892,
                },
                {
                    cityName: "Бирмингем",
                    population: 1141816,
                },
                {
                    cityName: "Лидс",
                    population: 781700,
                },
                {
                    cityName: "Глазго",
                    population: 621020,
                }
            ],
        },
        {
            countryName: "Германия",
            cities: [
                {
                    cityName: "Берлин",
                    population: 3520031,
                },
                {
                    cityName: "Гамбург",
                    population: 1787408,
                },
                {
                    cityName: "Мюнхен",
                    population: 1450381,
                }
            ],
        },
        {
            countryName: "Россия",
            cities: [
                {
                    cityName: "Москва",
                    population: 13104000,
                },
                {
                    cityName: "Санкт-Петербург",
                    population: 5600000,
                },
                {
                    cityName: "Новосибирск",
                    population: 1635000,
                },
                {
                    cityName: "Екатеринбург",
                    population: 1539000,
                }
            ],
        },
        {
            countryName: "Франция",
            cities: [
                {
                    cityName: "Париж",
                    population: 2229621,
                },
                {
                    cityName: "Марсель",
                    population: 855393,
                },
                {
                    cityName: "Лион",
                    population: 500715,
                },
                {
                    cityName: "Тулуза",
                    population: 458298,
                }
            ],
        }
    ];

    const getMostCitiesCountryName = function (countries) {
        let maxCitiesCount = 0;

        countries.forEach(function (country) {
            const citiesCount = (country.cities).length;

            if (citiesCount > maxCitiesCount) {
                maxCitiesCount = citiesCount;
            }
        })

        const countriesWithMaxCitiesCount = (countries.filter(function (country) {
            return (country.cities).length === maxCitiesCount;
        }));

        return countriesWithMaxCitiesCount.map(function (country) {
            return country.countryName;
        });
    }

    console.log("Страна/страны с максимальным количеством городов: " + getMostCitiesCountryName(countries).join(", "));

    console.log("Объект с информацией по всем странам вида: ключ – название страны, значение – суммарная численность по стране:");
    console.log(countries.map(function (country) {
        const totalPopulation = country.cities.reduce(function (totalPopulation, city) {
            return totalPopulation + city.population;
        }, 0);

        return {
            name: country.countryName,
            population: totalPopulation,
        };
    }))
})()