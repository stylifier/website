
export default {
  openThreadCreator: (media, defaultValue) => ({
    type: 'OPEN_THREAD_CREATOR',
    payload: {media, defaultValue}
  }),
  closeThreadCreator: () => ({
    type: 'CLOSE_THREAD_CREATOR'
  }),
  addToBasket: (product) => ({
    type: 'ADD_TO_BASKET',
    payload: product
  }),
  removeFromBasket: (product) => ({
    type: 'REMOVE_FROM_BASKET',
    payload: product,
    callApi: true
  }),
  initBasket: () => ({
    type: 'INIT_BASKET',
    callApi: true
  }),
  openImageUploader: () => ({
    type: 'OPEN_IMAGE_UPLOADER'
  }),
  closeImageUploader: () => ({
    type: 'CLOSE_IMAGE_UPLOADER'
  }),
  openImageDetails: (base) => ({
    type: 'OPEN_IMAGE_DETAILS',
    payload: base
  }),
  closeImageDetails: () => ({
    type: 'CLOSE_IMAGE_DETAILS'
  })
}
