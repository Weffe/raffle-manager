import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

const appInitialState = {
    loggedin: logout
}

export const actionTypes = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT'
}

// REDUCERS
export const reducer = (state = appInitialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN:
            return { ...state, loggedin: true }
        case actionTypes.LOGOUT:
            return { ...state, loggedin: false }
        default:
            return state
    }
}

// ACTIONS
export const login = () => dispatch => {
    return dispatch({ type: actionTypes.LOGIN })
}

export const logout = () => dispatch => {
    return dispatch({ type: actionTypes.LOGOUT })
}

// store
export const initStore = (initialState = appInitialState) => {
    return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}