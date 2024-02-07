Vue.createApp({})
    .component("PeopleList", {
        data() {
            return {
                people: [
                    {
                        name: "Алексей",
                        age: 15
                    },
                    {
                        name: "Сергей",
                        age: 25
                    },
                    {
                        name: "Олег",
                        age: 30
                    },
                    {
                        name: "Анастасия",
                        age: 27
                    },
                    {
                        name: "Алексей",
                        age: 22
                    },
                    {
                        name: "Леонид",
                        age: 56
                    },
                    {
                        name: "Татьяна",
                        age: 19
                    },
                    {
                        name: "Алексей",
                        age: 20
                    },
                    {
                        name: "Екатерина",
                        age: 31
                    },
                    {
                        name: "Олег",
                        age: 26
                    }
                ],
                averageAge: Object,
                uniqNames: [],
                twentyToThirtyAgePeople: [],
                uniqNamesCount: {},
                isVisible: false
            }
        },

        methods: {
            getAverageAge() {
                this.averageAge = _.chain(this.people)
                    .reduce((summaryAge, p) => summaryAge + p.age, 0)
                    .value() / this.people.length;
            },

            getTwentyToThirtyAgePeople() {
                this.twentyToThirtyAgePeople = _.chain(this.people)
                    .filter(p => p.age >= 20 && p.age <= 30)
                    .sortBy("age")
                    .value();
            },

            getUniqNames() {
                this.uniqNames = _.chain(this.people)
                    .filter(p => p.age >= 20 && p.age <= 30)
                    .pluck("name")
                    .uniq()
                    .sortBy("name")
                    .value();
            },

            getUniqNamesCount() {
                this.uniqNamesCount = _.chain(this.people)
                    .countBy("name")
                    .value();
            },

            getResults() {
                this.getAverageAge();
                this.getUniqNames();
                this.getTwentyToThirtyAgePeople();
                this.getUniqNamesCount();
                this.isVisible = true
            }
        },

        template: `
          <div>
            <h2>Список людей</h2>

            <ul class="list-unstyled">
              <li v-for="p in people" class="row">
                <div class="col-2">{{ p.name }}</div>
                <div class="col-auto">{{ p.age }}</div>
              </li>
            </ul>
          </div>

          <button @click="getResults" class="add-button btn btn-success m-2">Получить результат</button>

          <div v-if="isVisible" class="m-3">
            <div class="mb-2">Средний возраст всех людей: {{ this.averageAge }}</div>

            <div>Список людей с возрастом от 20 до 30 включительно, отсортированый по возрастанию возраста:
            </div>
            <ul class="list">
              <li v-for="p in twentyToThirtyAgePeople" class="row">
                <div class="col-2">{{ p.name }}</div>
                <div class="col-auto">{{ p.age }}</div>
              </li>
            </ul>

            <div>Список уникальных имен людей с возрастом от 20 до 30 включительно, отсортированый по убыванию:
            </div>
            <ul class="list-unstyled">
              <li v-for="name in uniqNames"> {{ name }}</li>
            </ul>

            <div>Объект, в котором ключи - имена людей, а значения – количество людей с этим именем:</div>
            <div v-if="isVisible">{{ this.uniqNamesCount }}</div>
          </div>`
    })
    .mount("#app");