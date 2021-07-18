var STORAGE_KEY = "todos-vuejs";
var todoStorage = {
  fetch: function () {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    // todos.forEach(function(todo, index) {
    //   todo.id = index;
    // });
    // todoStorage.uid = todos.length;
    return todos;
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }
};

// priority Vue instance
Vue.component('priority-select', {
  data: function () {
    return {
      noPriority: { type: Boolean, default: true },
      isHigh: { type: Boolean, default: false },
      priorityOptions: [
        {
          'priority': 'None',
          'class': 'no-priority'
        },
        {
          'priority': 'High',
          'class': 'high-priority'
        }
      ]
    }
  },

  props: {
    'value': {
      type: String,
      required: true,
      validator: function (value) {
        return ['none', 'high'].indexOf(value.toLowerCase()) !== -1;
      }
    }
  },

  template: `<select
  :class="[
      {'no-priority': noPriority},  
      {'high-priority': isHigh}
  ]" 
  :value="value" 
  @input="$emit('input', $event.target.value)" 
  tabindex="0">
      <option 
          v-for="option in priorityOptions" 
          :class="option.class">
      {{option.priority}}
      </option>
  </select>`,

  watch: {
    value: function () {
      this.setTextColor();
    }
  },

  created: function () {
    this.setTextColor();
  },

  methods: {
    setTextColor() {
      this.noPriority = this.value == "None" ? true : false;
      this.isHigh = this.value == "High" ? true : false;
    },
  }
});

// category Vue instance
Vue.component('category-select', {
  data: function () {
    return {
      noCategrory: { type: Boolean, default: true },
      isNotStart: { type: Boolean, default: false },
      isInProgress: { type: Boolean, default: false },
      isWaiting: { type: Boolean, default: false },
      priorityOptions: [
        {
          'priority': 'None',
          // 'class': 'no-priority'
        },
        {
          'priority': 'Not Started',
          // 'class': 'low-priority'
        },
        {
          'priority': 'In Progress',
          // 'class': 'med-priority',
        },
        {
          'priority': 'Waiting',
          // 'class': 'high-priority'
        }
      ]
    }
  },

  props: {
    'value': {
      type: String,
      required: true,
      validator: function (value) {
        return ['none', 'notStarted', 'inProgress', 'waiting'].indexOf(value.toLowerCase()) !== -1;
      }
    }
  },

  template: `<select 
  :value="value" 
  @input="$emit('input', $event.target.value)" 
  tabindex="0">
      <option v-for="option in priorityOptions">
      {{option.priority}}
      </option>
  </select>`,

  // watch: {
  //     value: function () {
  //         this.setTextColor();
  //     }
  // },

  // created: function () {
  //     this.setTextColor();
  // },

  // methods: {
  //     setTextColor() {
  //         this.noPriority = this.value == "None" ? true : false;
  //         this.isLow = this.value == "Low" ? true : false;
  //         this.isMed = this.value == "Medium" ? true : false;
  //         this.isHigh = this.value == "High" ? true : false;
  //     },
  // }
});

// app Vue instance
new Vue({
  el: '#app',
  // app initial state
  data: {
    todos: todoStorage.fetch(),
    newItem: '',
    newDate: null,
  },
  // watch todos change for localStorage persistence
  watch: {
    todos: {
      handler: function (todos) {
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
        priority: 'None',
        category: 'None',
        completed: false,
      });
      this.newItem = '';
      this.newDate = null;
    },
    toggleCompleted: function (item) {
      item.completed = !item.completed;
    },
    removeItem: function (item) {
      this.todos = this.todos.filter((newItem) => newItem.name !== item.name);
    },
    editTodo: function (item) {
      this.editedTodo = item;
      this.editedTodoName = item.name;
    },
    updateTodo: function (item) {
      if (!this.editedTodo) {
        return;
      } else if (!item.text) {
        this.removeItem(item);
      }

      this.editedTodo = null;
      item.text = this.editedTodoName.trim();
    },
    // updateDate: function (e, item){
    //     e.preventDefault();
    //     this.item.date = e.target.innerText;
    //     e.target.blur();
    // },
    sortDate() {
      this.todos.sort((a, b) => (a.date < b.date) ? 1 : -1)
    },
    sortAlpha() {
      this.todos.sort((a, b) => (a.name < b.name) ? 1 : -1)
    },
    sortPriority() {
      this.todos.sort((a, b) => (a.priority < b.priority) ? 1 : -1)
    },
    clearAll() {
      this.todos = [];
    },
  },
});