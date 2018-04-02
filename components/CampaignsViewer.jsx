import React, {Component, PropTypes} from 'react'
import CampaignItem from './CampaignItem.jsx'
import Viewer from './Viewer.jsx'
import API from '../src/API'

class FeedViewer extends Component {
  constructor(props) {
    super(props)
    this.api = new API()
    this.state = {
      campaigns: []
    }
    this.fetchCampaigns()
  }

  fetchCampaigns() {
    return this.props.showSelfCampaigns ?
      this.api.fetchSelfCampaigns()
        .then((res) => this.setState({campaigns: res})) :
      this.api.fetchCampaigns()
        .then((res) => this.setState({campaigns: res}))
  }

  render() {
    return (
      <Viewer
        largeRowCount={3.1}
        mediomRowCount={2.1}
        smallRowCount={1}
        ItemView={CampaignItem}
        dommy={true}
        baseItems={[...this.state.campaigns]}
        ItemViewProps={{showApproval: this.props.showApproval}}/>
    )
  }
}

FeedViewer.propTypes = {
  showSelfCampaigns: PropTypes.boolean,
  showApproval: PropTypes.boolean
}

export default FeedViewer
