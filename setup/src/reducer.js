
// State is the current state, action is the change that we want to implement on the current state.
const reducer = (state, action) => {

    if(action.type === 'CLEAR_CART') {
        return {
            ...state,
            cart: []
        }
    }

    if(action.type === 'REMOVE_ITEM') {
        const cartItem = state.cart.filter((item) => item.id != action.payload);
        return {
            ...state,
            cart: cartItem,
        }
    }

    if(action.type === 'INCREASE') {
        const newCartItem = state.cart.map((cartItem) => {
            if(cartItem.id === action.payload) {
                return {
                    ...cartItem,
                    amount: cartItem.amount + 1
                }
            }

            return cartItem;
        })

        return {
            ...state,
            cart: newCartItem
        }
    }

    if(action.type === 'DECREASE') {
        const newCartItem = state.cart.map((cartItem) => {
            if(cartItem.id === action.payload) {
                if(cartItem.amount == 0) {
                    return {
                        ...cartItem,
                        amount: cartItem.amount
                    }
                } else {
                    return {
                        ...cartItem, 
                        amount: cartItem.amount - 1
                    }
                }
            }

            return cartItem;
        })

        return {
            ...state,
            cart: newCartItem
        }
    }

    if(action.type === 'GET_TOTAL') {

        // const data = state.cart.reduce((cartTotal, cartItem) => {
        //     const { price, amount } = cartItem;
        //     cartTotal.amount += amount;
        
        //     return cartTotal;
        // }, {
        //     total: 0,
        //     amount: 0
        // });

        // return {
        //     ...state, 
        //     total: data.total,
        //     amount: data.amount
        // }

        let { total, amount } = state.cart.reduce((cartTotal, cartItem) => {
            const {price, amount} = cartItem;
            const itemTotal = price * amount;

            cartTotal.total = itemTotal + cartTotal.total;
            cartTotal.amount += amount;

            return cartTotal;
        }, {
            total: 0,
            amount: 0
        })

        total = parseFloat(total.toFixed(2));
        return {
            ...state, total, amount
            // total: total,
            // amount: amount
        }
    }

    if(action.type === "LOADING") {
        return {
            ...state,
            loading: true
        }
    }

    if(action.type === 'DISPLAY') {
        return {
            ...state,
            loading: false,
            cart: action.payload
        }
    }

    return state;
}

export default reducer;