
const user = (state = JSON.parse(localStorage.getItem('user_info')) || {}) => {
  return state
}

export default user
