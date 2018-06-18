
const threadCreator = (state = {isOpen: false, media: []}, action) => {
  switch (action.type) {
    case 'OPEN_THREAD_CREATOR':
      return Object.assign({}, state, {
        isOpen: true,
        media: action.payload.media,
        defaultValue: action.payload.defaultValue
      })

    case 'CLOSE_THREAD_CREATOR':
      return Object.assign({}, state, {isOpen: false, media: []})

    default:
      return state
  }
}

export default threadCreator
