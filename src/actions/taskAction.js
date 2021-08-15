export const insertTask = data =>{
    return {
        type:'INSERT_TASK',
        payload: data
    }
}
export const updateTask = data =>{
    return {
        type:'UPDATE_TASK',
        payload: data
    }
}
export const deleteTask = index =>{
    return {
        type:'DELETE_TASK',
        payload: index
    }
}
export const updateIndex = index =>{
    return {
        type:'UPDATE_INDEX',
        payload: index
    }
}