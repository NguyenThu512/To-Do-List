import storage from "./util/storage.js"

const init = {
    todos: storage.get(),
    filter: 'all',
    filters: {
        all: () => true,
        active: todo => !todo.completed,
        completed: todo => todo.completed
    },
    editIndex: null
}

const actions = {
    add({todos}, title) {
        if(title){
            todos.push({
                title,
                completed: false
            })
            storage.set(todos);
        }
    },

    toggle({todos}, index){
        const todo = todos[index];
        todo.completed = !todo.completed;
        storage.set(todos);
    },

    toggleAll({todos}, completed){
        todos.forEach(todo => todo.completed = completed);
        storage.set(todos);
    },

    delete({todos}, index){
        todos.splice(index,1);
        storage.set(todos);
    },

    switchFilter(state, type){
        state.filter = type;
    },

    clearCompleted(state) {
        console.log('hi');
        state.todos = state.todos.filter(state.filters.active);
        storage.set(state.todos);
    },
    
    startEdit(state, index) {
        state.editIndex = index;
    },

    endEdit(state, title){
        if(state.editIndex!==null){
            if(title){
                state.todos[state.editIndex].title = title
            } else {
                state.todos.splice(state.editIndex,1);
            }
            storage.set(state.todos);
            state.editIndex = null;
        }

    }
}

export default function reducer(state = init, action, args){
    actions[action] && actions[action](state, ...args)
    return state;
}