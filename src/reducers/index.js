import { combineReducers } from 'redux'
import basket from './basket'
import imageUploader from './imageUploader'
import imageDetails from './imageDetails'
import threadCreator from './threadCreator'
import user from './user'

const todoApp = combineReducers({
  basket,
  imageUploader,
  imageDetails,
  threadCreator,
  user
})

export default todoApp
