export const saveUserData = (data) => {
    return {
        type: 'save-user-data',
        payload: data
    }
}

export const deleteUserData = (data) => {
    return {
        type: 'delete-user-data',
        payload: null
    }
}
