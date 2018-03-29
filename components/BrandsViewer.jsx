import React, {Component} from 'react'
import BrandImage from './BrandImage.jsx'
import Viewer from './Viewer.jsx'
import API from '../src/API'
import Promise from 'bluebird'

class BrandsViewer extends Component {
  constructor(props) {
    super(props)
    this.api = new API()
    this.infinitUpdate = true
    this.state = {
      hasData: false
    }
  }

  fetchBrands() {
    if(this.pagination === '')
      return Promise.resolve([])

    return this.api.fetchBrands(this.props.phrase, this.pagination)
    .then((res) => {
      if(!this.props.scrollToUpdate)
        this.infinitUpdate = false
      this.pagination = res.pagination
      if(res.data.length > 0 && !this.state.hasData) {
        this.setState({hasData: true})
      }
      return res.data
    })
  }

  render() {
    return (
      <div>
        {this.state.hasData && <h3 style={{marginLeft:50}}>Brands with phrase "{this.props.phrase}"</h3>}
        <Viewer
          largeRowCount={8}
          mediomRowCount={5}
          smallRowCount={3.5}
          fetcher={() => this.infinitUpdate ? this.fetchBrands() : Promise.resolve([])}
          ItemView={BrandImage}
          ItemViewProps={{showUser: true, showLike:true}}
        />
        <div style={{paddingRight: 50, marginBottom: 50}}>
        {this.state.hasData && <a href={`/search?brand=${this.props.phrase}`} style={{width: '100%', display: 'inline-block', textAlign: 'right'}}>see more results</a>}
        </div>
      </div>
    )
  }
}

BrandsViewer.propTypes = {
  phrase: React.PropTypes.string,
  scrollToUpdate: React.PropTypes.bool
}

export default BrandsViewer
