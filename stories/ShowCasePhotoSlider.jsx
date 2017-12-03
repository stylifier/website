import React, {Component, PropTypes} from 'react';

class ShowCasePhotoSlider extends Component {
  constructor(props) {
    super(props)
  }

  refreshStats() {
  }

  componentWillUnmount() {
  }

  render() {
    return(
      <div>
        {this.props.photos}
      </div>
    )
  }
}

ShowCasePhotoSlider.propTypes = {
  photos: PropTypes.array
}

export default ShowCasePhotoSlider
