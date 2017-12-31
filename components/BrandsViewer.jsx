import React, {Component} from 'react'
import BrandImage from './BrandImage.jsx'
import Viewer from './Viewer.jsx'
import API from '../src/API'
import Promise from 'bluebird'

class BrandsViewer extends Component {
  constructor(props) {
    super(props)
    this.api = new API()
    this.state = {brands: []}
    this.oldestFetchDate = (new Date()).toISOString()
    this.fetchBrands()
  }

  fetchBrands() {
    return this.api.fetchBrands(this.props.phrase, this.oldestFetchDate)
    .then((brands) => {
      this.oldestFetchDate = brands
      .map((i) => i.createdAt)
      .sort((a, b) => a < b).pop()

      this.state.brands.push(...brands)
      this.setState({brands: this.state.brands})
    })
  }

  render() {
    return (
      <div>
        {this.state.brands.length > 0 && <h3 style={{marginLeft:50}}>results for brands with phrase "{this.props.phrase}"</h3>}
        <Viewer
          largeRowCount={8}
          mediomRowCount={5}
          smallRowCount={3.5}
          fetcher={() => this.props.scrollToUpdate ? this.fetchBrands() : Promise.resolve([])}
          baseItems={this.state.brands}
          ItemView={BrandImage}
          ItemViewProps={{showUser: true, showLike:true}}
        />
        <div style={{paddingRight: 50, marginBottom: 50}}>
        {this.state.brands.length > 0 && <a href={`/search?brand=${this.props.phrase}`} style={{width: '100%', display: 'inline-block', textAlign: 'right'}}>see more results</a>}
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
