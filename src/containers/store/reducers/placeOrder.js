import * as actionTypes from '../actions/actionTypes';

const initialState = {
    inventory:[],
    orderH:[]
};

// const addtoInventory = ( state, action ) => {
//     state.inventory=action.data
// };
// const updateInventory = ( state, action ) => {
//     state.inventory[action.index]=action.data;
// };

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_INVENTORY: 
        return{
            ...state,
            inventory:action.data
        };
        case actionTypes.ADD_ORDERS:
            return{
                ...state,
                orderH:action.medicines
            }
        default: return state;
    }
};

export default reducer;