import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import ImageUploader from '../components/ImageUploader.jsx'
import Viewer from './Viewer.jsx'
import API from '../API'
import SimpleImage from './SimpleImage.jsx'
import ColorPalletItem from './ColorPalletItem.jsx'

class ColorPalletSuggestionModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userInfo: JSON.parse(localStorage.getItem('user_info')) || {},
      showUplaoder: true,
      images: []
    }
    this.api = new API()
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  render() {
    return (
      <div>
        {this.state.showUplaoder &&
          <ImageUploader
            isPublic={false}
            onComplete={(imgs) => {
              this.setState({showUplaoder: false, images: [...imgs]})
            }}
          />}
        {this.state.images.length > 0 && <Viewer
          largeRowCount={1}
          mediomRowCount={1}
          smallRowCount={1}
          ItemViewProps={{
            showColorPallet: true,
            onColorClick:(t) => this.api.fetchColorPalletRecommendation(t)
            .then(recoms => this.setState({colorPalletRecommendation: recoms}))
          }}
          ItemView={SimpleImage}
          dommy={true}
          baseItems={[...this.state.images]}/>}
        {this.state.colorPalletRecommendation &&
          <Viewer
            largeRowCount={4}
            mediomRowCount={4}
            smallRowCount={2}
            gutter={30}
            ItemView={ColorPalletItem}
            dommy={true}
            baseItems={[...this.state.colorPalletRecommendation]}/>}
    </div>)
  }
}

ColorPalletSuggestionModal.propTypes = {
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired
  }).isRequired
}

export default withRouter(ColorPalletSuggestionModal)
