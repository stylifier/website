
const imageDetails = (state = {isOpen: false, base: {}}, action) => {
  switch (action.type) {
    case 'OPEN_IMAGE_DETAILS':
      return Object.assign({}, state, {isOpen: true, base: action.payload})

    case 'CLOSE_IMAGE_DETAILS':
      return Object.assign({}, state, {isOpen: false})

    default:
      return state
  }
}

export default imageDetails
