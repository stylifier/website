import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import ImageUploader from '../components/ImageUploader.jsx'

class ImageUploaderModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userInfo: JSON.parse(localStorage.getItem('user_info')) || {}
    }
  }

  componentDidMount() {
    $('#imageUploaderModal').modal('show')
    $('#imageUploaderModal').on('hidden.bs.modal', () => this.props.onClose())
  }

  componentDidUpdate() {
  }

  render() {
    return (
      <div
      id="imageUploaderModal"
      style={{position: 'fixed', top: 0, textAlign: 'center', left: 0, width: '100%', height: '100%', maxWidth: '95%'}}
      className="modal modal-dialog fade"
      role="dialog"
      aria-labelledby="imageUploaderModalLabel"
      aria-hidden="true">
        <div className="modal-content" style={{position: 'relative', margin: 'auto', width: 800,  maxWidth: '100%', height: 380, maxHeight: '100%'}}>
          <div className="modal-header" style={{textAlign: 'left'}}>
            <button
              className="btn btn-danger" style={{float: 'right'}}
              data-dismiss="modal">
              X
            </button>
            <h4 style={{float: 'left', maxWidth: '80%'}}>Select or drop images you would like to share:</h4>
          </div>
          <ImageUploader isPublic={true} onComplete={() => {
            this.props.history.push('/profile/' + this.state.userInfo.username)
            window.location.reload()
          }}/>
        </div>
    </div>)
  }
}

ImageUploaderModal.propTypes = {
  onClose: React.PropTypes.func,
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired
  }).isRequired
}

export default withRouter(ImageUploaderModal)
