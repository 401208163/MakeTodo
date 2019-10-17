import { Component } from '@angular/core';

const todos = [
  {
    id: 1,
    title: 'eat',
    done: true
  },
  {
    id: 2,
    title: 'sleep',
    done: false
  },
  {
    id: 3,
    title: 'watch',
    done: true
  }
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  get toggleAll() {
    return this.todos.every(t => t.done !== false);
  }

  set toggleAll(val) {
    this.todos.forEach(t => t.done = val);
  }

  get remianingCount() {
    return this.todos.filter(t => t.done).length;
  }

  get filterTodos() {
    if (this.visibility === 'all') {
      return this.todos;
    } else if (this.visibility === 'active') {
      return this.todos.filter(t => !t.done);
    } else if (this.visibility === 'completed') {
      return this.todos.filter(t => t.done);
    }
  }

  // tslint:disable-next-line: member-ordering
  public todos: {
    id: number,
    title: string,
    done: boolean
  }[] = todos;

  // tslint:disable-next-line: member-ordering
  public currentEditing: {
    id: number,
    title: string,
    done: boolean
  } = null;

  public visibility = 'all';

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit(): void {
    this.hashchangeHandler();
    window.onhashchange = this.hashchangeHandler.bind(this);
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngDoCheck(): void {
    window.localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  addTodo(e) {
    this.todos.push({
      id: todos.length ? 1 : todos.length + 1,
      title: e.target.value,
      done: false
    });

    e.target.value = '';
  }

  reMove(i) {
    this.todos.splice(i, 1);
  }

  saveEdit(todo, e) {
    todo.title = e.target.value;
    this.currentEditing = null;
  }

  cancelEdit(todo, e) {
    if (e.keyCode === 27) {
      e.target.value = todo.title;
      this.currentEditing = null;
    }
  }

  clearAllDone() {
    this.todos = this.todos.filter(t => !t.done);
  }

  hashchangeHandler() {
    const hash = window.location.hash.substr(1);
    switch (hash) {
      case '/':
        this.visibility = 'all';
        break;
      case '/active':
        this.visibility = 'active';
        break;
      case '/completed':
        this.visibility = 'completed';
        break;
    }
  }
  }
