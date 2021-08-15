const taskReducer = (state, action) => {
    let list = JSON.parse(localStorage.getItem('tasks'));
    // eslint-disable-next-line default-case
    switch (action.type) {
        case "INSERT_TASK":
            list.push(action.payload)
            localStorage.setItem('tasks', JSON.stringify(list))
            return { list, currentIndex: -1 }

        case "UPDATE_TASK":
            list[state.currentIndex] = action.payload
            localStorage.setItem('tasks', JSON.stringify(list))
            return { list, currentIndex: -1 }

        case "DELETE_TASK":
            list.splice(action.payload, 1)
            localStorage.setItem('tasks', JSON.stringify(list))
            return { list, currentIndex: -1 }

        case "UPDATE_INDEX":
            return { list, currentIndex: action.payload }
        default:
            return state
    }
}
export default taskReducer;