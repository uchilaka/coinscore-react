import { combineReducers, createStore } from "redux";

// define app helper functions
export const mapStateToProps = (state) => {
    return state;
}

export const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    }
}

// define actions
const USER_SELECT_ICO = 'USER_SELECT_ICO';
//const USER_UNSELECT_ICO = 'USER_UNSELECT_ICO';

// define action creators
export const userHasSelectedIco = (ICO) => {
    return {
        type: USER_SELECT_ICO,
        icoItem: ICO
    }
}

// define reducers 
const sessionDataReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_SELECT_ICO:
            return Object.assign({}, state, { selectedIcoItem: action.icoItem, lastAction: action.type });

        default:
            return state;
    }
}

// combine reducers
export const appReducers = combineReducers({
    sessData: sessionDataReducer
});

// create (app) store
export const appStore = createStore(appReducers);

