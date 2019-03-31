import React, {Component} from 'react';
import ColorPalletItem from '../components/ColorPalletItem.jsx'
import Viewer from '../components/Viewer.jsx'
import Footer from '../components/Footer.jsx'
import API from '../API'

class Colors extends Component {
  constructor(props) {
    super(props)
    this.state = {
      colorPallets: []
    }
    this.api = new API()
  }

  refreshStats() {
  }

  componentDidMount() {
    this.api.fetchAllColorPallets()
    .then(recoms => this.setState({colorPallets: recoms.filter(t => t.popularity >= 1)}))
  }

  componentWillUnmount() {
  }

  render() {
    const { colorPallets, isShowLowRating } = this.state
    return (
      <div>
        <div id="home-sec" className="container" style={{marginTop: 70, marginBottom: 50, maxWidth: 1000}}>
          <div className="row clr-white">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <Viewer
                largeRowCount={4}
                mediomRowCount={4}
                smallRowCount={2}
                gutter={30}
                ItemView={ColorPalletItem}
                dommy={true}
                ItemViewProps={{
                  likeClicked: (cp) =>
                    this.api.bookmarkColorPallet(cp.id)
                    .then(() =>
                      this.setState({
                        colorPallets: colorPallets
                          .map(t => t.id === cp.id ? Object.assign(cp, {popularity:  Math.round( (cp.popularity + .1) * 10 ) / 10}) : t)
                        })),
                  unlikeClicked: (cp) => this.api.deleteBookmarkedColorPallet(cp.id)
                    .then(() =>
                      this.setState({
                        colorPallets: colorPallets
                          .map(t => t.id === cp.id ? Object.assign(cp, {popularity:  Math.round( (cp.popularity - .1) * 10 ) / 10}) : t)
                        })),
                  showAdminMenu: true
                }}
                baseItems={[...colorPallets.filter(t => isShowLowRating ? t : (t.popularity >= 1 && t))]}/>
            </div>
          </div>
        </div>
        <Footer whiteBackground={true}/>
      </div>
    )
  }
}

export default Colors
