const initialState={
    cart:{}
}

export default function RootReducer(state=initialState,action){
    switch(action.type){
        case "ADD_CART":
            state.cart[action.payload[0]]=action.payload[1];
            return {cart:state.cart}
        
        case "REMOVE_CART":
            delete state.cart[action.payload[0]];
            return {cart:state.cart}
        
        default:
            return {cart:state.cart}
    }
}

