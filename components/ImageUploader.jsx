import React, {Component} from 'react'
import Gallery from 'react-fine-uploader'
import 'react-fine-uploader/gallery/gallery.css'
import FineUploaderTraditional from 'fine-uploader-wrappers'
import API from '../src/API'

class ImageUploader extends Component {
  constructor(props) {
    super(props)

    this.api = new API()
    this.state = {images: []}

    this.uploader = new FineUploaderTraditional({
      options: {
        deleteFile: {
          enabled: false
        },
        request: {
          endpoint: this.api.baseAddress + '/media',
          customHeaders: {
            Authorization: 'Bearer '+ this.api.userToken,
            'x-is-public': this.props.isPublic ? 'true' : 'false'
          }
        },
        scaling: {
          sendOriginal: false,
          sizes: [
            {name: 'large', maxSize: 2000}
          ]
        },
        retry: {
          enableAuto: true
        }
      }
    })

    this.uploader.on('submit', () => {
      this.forceUpdate()
      this.props.onSubmit && this.props.onSubmit(this.state.images)
    })

    this.uploader.on('complete', (id, name, response) => {
      this.setState({images: [...this.state.images, response]})
    })

    this.uploader.on('onAllComplete', () => {
      this.props.onComplete && this.props.onComplete(this.state.images)
    })
  }

  componentDidMount() {
  }

  render() {
    return (<Gallery style={{maxHeight: '20'}} uploader={ this.uploader } />)
  }
}

ImageUploader.propTypes = {
  isPublic: React.PropTypes.bool,
  onComplete: React.PropTypes.func,
  onSubmit: React.PropTypes.func
}

export default ImageUploader
