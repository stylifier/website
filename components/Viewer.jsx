import React, {Component} from 'react'
import StackGrid from 'react-stack-grid'
import {isMobile} from 'react-device-detect'

class Viewer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: this.props.baseItems || [],
      loading: true
    }
    this.count = 0
    this.oldestFetchDate = (new Date()).toISOString()
    this.resized = this.resized.bind(this);
    this.handleScroll = this.handleScroll.bind(this);

    this.fetcher()
  }

  resized() {
    this.forceUpdate()
  }

  handleScroll() {
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight && !this.state.loading) {
      this.setState({loading: true})
      this.fetcher()
    }
  }


  refreshStats() {
  }

  componentDidMount() {
    window.addEventListener('resize', this.resized)
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resized)
    window.removeEventListener('scroll', this.handleScroll);
  }

  fetcher() {
    this.props.fetcher()
    .then((items) => {
      this.state.items.push(...items)
      this.setState({
        items: this.state.items,
        loading: false
      })
    })
    .catch(() => this.setState({loading: false}))
  }

  renderItems() {
    let gridWidth = this.props.smallRowCount ? 100 / this.props.smallRowCount + '%' : '100%'

    if(window.innerWidth > 1200 && !isMobile) {
      gridWidth = this.props.largeRowCount ? 100 / this.props.largeRowCount + '%' : '33.33%'
    } else if(window.innerWidth > 768 && !isMobile) {
      gridWidth = this.props.mediomRowCount ? 100 / this.props.mediomRowCount + '%' : '50%'
    }

    const ItemView = this.props.ItemView

    return (
      <StackGrid columnWidth={gridWidth} style={this.props.styleOverwrite || {
        margin: 5, marginTop: 30
      }}>
        {(this.state.items && this.state.items.map((f, i) => (<ItemView {...this.props.ItemViewProps} onLoaded={() => this.resized()} key={i} base={f}/>)))}
      </StackGrid>
    )
  }

  render() {
    return (
      <div>
        {this.renderItems()}
        <div style={{textAlign: 'center'}}>
          {this.state.loading ? (<i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw" style={{marginBottom: 60, marginTop: 20}}></i>) : ''}
        </div>
      </div>
    )
  }
}

Viewer.propTypes = {
  fetcher: React.PropTypes.func,
  ItemView: React.PropTypes.func,
  ItemViewProps: React.PropTypes.object,
  baseItems: React.PropTypes.array,
  largeRowCount: React.PropTypes.number,
  mediomRowCount: React.PropTypes.number,
  smallRowCount: React.PropTypes.number,
  styleOverwrite: React.PropTypes.object
}


export default Viewer
