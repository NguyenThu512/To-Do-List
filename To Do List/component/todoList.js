import html from '../core.js'
import { connect } from '../store.js'

import todoItem from './todoItem.js'

function todoList({todos, filter, filters, editIndex}) {
    console.log(todos)
    return html`
        <section class="main">
            <input 
                id="toggle-all" 
                class="toggle-all" 
                type="checkbox"
                onchange="dispatch('toggleAll', this.checked)"
                ${todos.every(filters.completed) && 'checked'}
            />
            <label for="toggle-all">Mark all as complete</label>
            <ul class="todo-list">
                ${todos
                    .filter(filters[filter])
                    .map((todo, index) => 
                        todoItem({todo, index, editIndex})
                    )}
            </ul>
        </section>
    `
}
export default connect()(todoList)