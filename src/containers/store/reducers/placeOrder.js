import * as actionTypes from '../actions/actionTypes';

const initialState = {
    inventory: [],
    orderH: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INVENTORY:
            return {
                ...state,
                inventory: action.data
            };
        case actionTypes.ADD_ORDERS:
            return {
                ...state,
                orderH: action.medicines
            }
        default: return state;
    }
};

export default reducer;