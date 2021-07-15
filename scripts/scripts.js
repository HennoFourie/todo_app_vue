var STORAGE_KEY = "todos-vuejs";
var todoStorage = {
  fetch: function() {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    // todos.forEach(function(todo, index) {
    //   todo.id = index;
    // });
    // todoStorage.uid = todos.length;
    return todos;
  },
  save: function(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }
};

// app Vue instance
new Vue({
  el: '#app',
  // app initial state
  data: {
      todos: todoStorage.fetch(),
      newItem: '',
      // todos: [
      //     {
      //         id: 1,
      //         name: 'Example 1',
      //         date: '2021-03-01',
      //         priority: true,
      //         completed: false,
      //     },
      //     {
      //         id: 2,
      //         name: 'Example 2',
      //         date: '2021-04-15',
      //         priority: false,
      //         completed: true,
      //     },
      // ],
  },
  // watch todos change for localStorage persistence
  watch: {
    todos: {
      handler: function(todos) {
        todoStorage.save(todos);
      },
      deep: true
    }
  },
  // computed properties
  computed: {
      reversedTodos() {
          return this.todos.slice(0).reverse();
      },
  },
  // methods that implement data logic.
  methods: {
      addItem: function () {
          this.todos.push({
              id: this.todos.length + 1,
              name: this.newItem,
              date: this.newDate,
              priority: false,
              // Category: ['Not Started','In Progress','Waiting on someone else'],
              completed: false,
          });
          this.newItem = '';
          this.newDate = '';
      },
      toggleCompleted: function (item) {
          item.completed = !item.completed;
      },
      // changePriority: function (item) {
      //     item.priority = !item.priority;
      // },
      removeItem: function (item) {
          this.todos = this.todos.filter((newItem) => newItem.name !== item.name);
      },
      updateTask: function (e, item){
          e.preventDefault();
          this.item.name = e.target.innerText;
          e.target.blur();
      },
      updateDate: function (e, item){
          e.preventDefault();
          this.item.date = e.target.innerText;
          e.target.blur();
      },
      clearAll (){
        this.todos = [];
      }
  },
});