import html from '../core.js'
//import { connect } from '../store.js'


//const connector = connect()

function todoItem({todo, index, editIndex}) {
    return html`
        <li class="${todo.completed && 'completed'} ${index===editIndex && 'editing'}">
            <div class="view">
                <input 
                    class="toggle" 
                    type="checkbox" 
                    ${todo.completed && 'checked'} 
                    onchange="dispatch('toggle', ${index})"
                />
                <label ondblclick="dispatch('startEdit',  ${index})">${todo.title}</label>
                <button 
                    class="destroy" 
                    onclick="dispatch('delete', ${index})")>
                </button>
            </div>
            <input 
                class="edit" 
                value="${todo.title}"
                onkeyup="event.keyCode === 13 && dispatch('endEdit', this.value.trim())"
                onblur="dispatch('endEdit', this.value.trim())"
            />
        </li>
    `
}
export default todoItem