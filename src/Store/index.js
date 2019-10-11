import { createStore, applyMiddleware } from 'redux'
import Reducer from "./Reducer/Reducer"
import thunk from 'redux-thunk'


export default createStore(Reducer, applyMiddleware(thunk))



