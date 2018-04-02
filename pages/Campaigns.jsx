import React, {Component} from 'react';
import CampaignsViewer from '../components/CampaignsViewer.jsx'
import Footer from '../components/Footer.jsx'
import ImageUploader from '../components/ImageUploader.jsx'
import API from '../src/API'

class Campaigns extends Component {
  constructor(props) {
    super(props)
    this.state = {
      description: '',
      city: '',
      showComposeForm: false,
      viewerKey: Math.random() * 1000
    }

    this.api = new API()
  }

  refreshStats() {
  }

  componentWillUnmount() {
  }

  createCampaign(e) {
    e.preventDefault()

    if(!this.state.media || this.state.media.length <= 0)
      return

    this.api.createCampaign(
      this.state.media[0],
      {name: this.state.city},
      this.state.description
    )
    .then(() => this.setState({showComposeForm: false, viewerKey: Math.random() * 1000}))
  }

  renderComposeForm() {
    return (
      <form onSubmit={(e) => this.createCampaign(e)}>
        <lable>Create a campaign:</lable>
        <ImageUploader
          isPublic={false}
          single={true}
          onSubmit={() => this.setState({uploaderLoading: true})}
          onComplete={(media) => this.setState({uploaderLoading: false, media: media})}/>
        <input type="text" value={this.state.description} onChange={e => this.setState({description: e.target.value})} className="form-control" placeholder="Description"/>
        <input type="text" value={this.state.city} onChange={e => this.setState({city: e.target.value})} className="form-control" placeholder="City"/>
        <button style={{float: 'right'}} type="submit" className="btn btn-default" onClick={(e) => this.createCampaign(e)}>Create</button>
      </form>
    )
  }

  renderComposeArea() {
    return (
      <div style={{marginTop: 30}} id="home-sec" className="container">
        <div className="row clr-white" >
          <div className="col-lg-4 col-md-4 col-sm-3 col-xs-12" >
            {this.state.showComposeForm && (<div> Please follow these sugesstions to make sure your campaign will be approved quick:
            <ul>
              <li>
                Suggested aspect ratio for banner photo is 16:9
              </li>
            </ul></div>)}
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
            {this.state.showComposeForm ?
              this.renderComposeForm() :
              (<a style={{width: '100%'}} className='btn btn-primary'
                onClick={(e) => {
                  e.preventDefault()
                  this.setState({showComposeForm: true})
                }}>
                Create a new Campaign
              </a>)}
          </div>
          <div className="col-lg-4 col-md-4 col-sm-3 col-xs-12" />
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        <div id="home-sec" className="container">
          <div className="row clr-white" >
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              {this.renderComposeArea()}
              <CampaignsViewer showApproval={true} showSelfCampaigns={true} key={this.state.viewerKey}/>
            </div>
          </div>
        </div>
        <Footer whiteBackground={true}/>
      </div>
    )
  }
}

export default Campaigns
