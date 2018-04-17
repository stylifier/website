import React, {Component} from 'react';
import ProductsViewer from '../components/ProductsViewer.jsx'
import Footer from '../components/Footer.jsx'
import ImageUploader from '../components/ImageUploader.jsx'
import API from '../src/API'

class Products extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      code: '',
      price: '',
      showComposeForm: false,
      viewerKey: Math.random() * 1000
    }

    this.api = new API()
  }

  refreshStats() {
  }

  componentWillUnmount() {
  }

  createProduct(e) {
    e.preventDefault()

    if(!this.state.media || this.state.media.length <= 0)
      return

    this.api.createProduct(
      this.state.media[0],
      this.state.name,
      this.state.code,
      parseFloat(this.state.price)
    )
    .then(() => this.setState({showComposeForm: false, viewerKey: Math.random() * 1000}))
  }

  renderComposeForm() {
    return (
      <form onSubmit={(e) => this.createProduct(e)}>
        <lable>Add a Product:</lable>
        <ImageUploader
          isPublic={false}
          single={true}
          onSubmit={() => this.setState({uploaderLoading: true})}
          onComplete={(media) => this.setState({uploaderLoading: false, media: media})}/>
        <input type="text" value={this.state.name} onChange={e => this.setState({name: e.target.value})} className="form-control" placeholder="Name"/>
        <input type="text" value={this.state.code} onChange={e => this.setState({code: e.target.value})} className="form-control" placeholder="Code"/>
        <input type="number" value={this.state.price} onChange={e => this.setState({price: e.target.value})} className="form-control" placeholder="Price in Euros"/>
        <button style={{float: 'right'}} type="submit" className="btn btn-default" onClick={(e) => this.createProduct(e)}>Create</button>
      </form>
    )
  }

  renderComposeArea() {
    return (
      <div style={{marginTop: 30}} id="home-sec" className="container">
        <div className="row clr-white" >
          <div className="col-lg-4 col-md-4 col-sm-3 col-xs-12" />
          <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
            {this.state.showComposeForm ?
              this.renderComposeForm() :
              (<a style={{width: '100%'}} className='btn btn-primary'
                onClick={(e) => {
                  e.preventDefault()
                  this.setState({showComposeForm: true})
                }}>
                Add a new Product
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
              <ProductsViewer showApproval={true} showSelfProducts={true} key={this.state.viewerKey}/>
            </div>
          </div>
        </div>
        <Footer whiteBackground={true}/>
      </div>
    )
  }
}

export default Products
