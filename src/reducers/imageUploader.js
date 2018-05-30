
const imageUploader = (state = {isOpen: false}, action) => {
  switch (action.type) {
    case 'OPEN_IMAGE_UPLOADER':
      return Object.assign({}, state, {isOpen: true})

    case 'CLOSE_IMAGE_UPLOADER':
      return Object.assign({}, state, {isOpen: false})

    default:
      return state
  }
}

export default imageUploader
