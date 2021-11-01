const initialState={
    cart:{},
    user:{}
}

export default function RootReducer(state=initialState,action){
    switch(action.type){
        case "ADD_USER":
            state.user[action.payload[0]]=action.payload[1];
            return {user:state.user,cart:state.cart}
        case "ADD_CART":
            state.cart[action.payload[0]]=action.payload[1];
            return {user:state.user,cart:state.cart}
        
        case "REMOVE_CART":
            delete state.cart[action.payload[0]];
            return {user:state.user,cart:state.cart}
        
        default:
            return state
    }
}

