Vue.createApp({})
    .component("PeopleList", {
        data() {
            return {
                people: [
                    {
                        id: 1,
                        name: "Алексей",
                        age: 15
                    },
                    {
                        id: 2,
                        name: "Сергей",
                        age: 25
                    },
                    {
                        id: 3,
                        name: "Алексей",
                        age: 22
                    },
                    {
                        id: 4,
                        name: "Олег",
                        age: 30
                    },
                    {
                        id: 5,
                        name: "Анастасия",
                        age: 27
                    },
                    {
                        id: 6,
                        name: "Леонид",
                        age: 56
                    },
                    {
                        id: 7,
                        name: "Татьяна",
                        age: 19
                    },
                    {
                        id: 8,
                        name: "Алексей",
                        age: 20
                    },
                    {
                        id: 9,
                        name: "Екатерина",
                        age: 31
                    },
                    {
                        id: 10,
                        name: "Олег",
                        age: 26
                    }
                ],
                isVisible: false
            };
        },

        computed: {
            averageAge: function () {
                return _.sumBy(this.people, "age") / _.size(this.people);
            },

            twentyToThirtyAgePeople: function () {
                return _.chain(this.people)
                    .filter(p => p.age >= 20 && p.age <= 30)
                    .sortBy("age")
                    .value();
            },

            uniqueNames: function () {
                return _.chain(this.people)
                    .filter(p => p.age >= 20 && p.age <= 30)
                    .orderBy("name", "desc")
                    .map("name")
                    .uniq()
                    .value();
            },

            uniqueNamesCounts() {
                return _.chain(this.people)
                    .countBy("name")
                    .value();
            },
        },

        template: `
          <div>
            <h2>Список людей</h2>

            <ul class="list-unstyled">
              <li v-for="p in people" class="row">
                <div class="col-3">{{ p.name }}</div>
                <div class="col-auto">{{ p.age }}</div>
              </li>
            </ul>
          </div>

          <button @click="isVisible=true" class="add-button btn btn-success m-2">Получить результат</button>

          <div v-if="isVisible" class="mb-5">
            <div>
              <div class="mb-2">Средний возраст всех людей: {{ averageAge }}</div>

              <div>
                Список людей с возрастом от 20 до 30 включительно, отсортированный по возрастанию возраста:
              </div>
              <ul class="list-unstyled">
                <li v-for="p in twentyToThirtyAgePeople"
                    :key="p.id"
                    class="row">
                  <div class="col-3">{{ p.name }}</div>
                  <div class="col-auto">{{ p.age }}</div>
                </li>
              </ul>

              <div>
                Список уникальных имен людей с возрастом от 20 до 30 включительно, отсортированный по убыванию:
              </div>
              <ul class="list-unstyled">
                <li v-for="p in uniqueNames" :key="p">{{ p }}</li>
              </ul>

              <div>
                Объект, в котором ключи - имена людей, а значения – количество людей с этим именем:
              </div>
              <div>{{ uniqueNamesCounts }}</div>
            </div>
          </div>
        `
    }).mount("#app");