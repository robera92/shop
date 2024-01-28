
const UserReducer = (state, action) =>{

    switch(action.type){
        case "save-user-data":
            return {
                ...state,
                isLoggedIn: true,
                user_data: action.payload
            }
            case "delete-user-data":
            return {
                user_data: null,
                isLoggedIn: false
            }
        default:
            return state;
    }
}

export default UserReducer;