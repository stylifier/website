
const basket = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TO_BASKET':
      return [
        ... state,
        action.payload
      ]

    case 'REMOVE_FROM_BASKET':
      return state.filter(o => o.id !== action.payload.id)

    case 'INIT_BASKET':
      return [... action.payload]

    default:
      return state
  }
}

export default basket
