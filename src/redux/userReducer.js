import * as types from './actionTypes'

const initalState = {
    users:[],
    user:{},
    loading:false
}


const userReducer = (state =initalState , action) => {
    switch(action.type){
        case types.GET_USERS:
            return{
                ...state,
                users: action.payload,
                loading:false,
            }
        default: return state
    }
}

export default userReducer;