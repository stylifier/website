import { combineReducers } from 'redux'
import basket from './basket'
import imageUploader from './imageUploader'

const todoApp = combineReducers({
  basket,
  imageUploader
})

export default todoApp
