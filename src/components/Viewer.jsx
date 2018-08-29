import React, {Component} from 'react'
import StackGrid from 'react-stack-grid'
import {isMobile} from 'react-device-detect'

class Viewer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: this.props.baseItems ? [...this.props.baseItems] : [],
      loadedItemCounts: 0,
      loading: true,
      noMoreFetch: false
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
    if (windowBottom >= docHeight - 100 && !this.state.loading && !this.state.noMoreFetch) {
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
    if(!this.props.fetcher)
      return setTimeout(() => this.setState({loading: false}), 500)

    this.props.fetcher()
    .then((items) => {
      if(items.length === 0) {
        this.setState({noMoreFetch: true, loading: false})
        return
      }
      const currentItemIds = this.state.items.map(i => i.id).filter(t => !!t)
      if(currentItemIds.length > 0) {
        items = items.filter((item) => currentItemIds.indexOf(item.id) === -1)
      }

      this.setState({items: [...this.state.items, ...items]})
      setTimeout(() => this.setState({loading: false}), 500)
    })
    .catch(() => setTimeout(() => this.setState({loading: false})), 2000)
  }

  renderItems() {
    let gridWidth = this.props.smallRowCount ? 100 / this.props.smallRowCount + '%' : '100%'

    if(window.innerWidth > 1200 && !isMobile) {
      gridWidth = this.props.largeRowCount ? 100 / this.props.largeRowCount + '%' : '33.33%'
    } else if(window.innerWidth > 768 && !isMobile) {
      gridWidth = this.props.mediomRowCount ? 100 / this.props.mediomRowCount + '%' : '50%'
    }

    const ItemView = this.props.ItemView
    const items = this.props.dommy ? this.props.baseItems : this.state.items

    return (
      <div style={{height: items.length > 0 ? 'inherit' : '0'}}>
        <StackGrid
          columnWidth={gridWidth}
          style={this.props.styleOverwrite || {margin: 5, marginTop: 30}}
          component={this.props.component}
          gutterWidth={this.props.gutter}
          gutterHeight={this.props.gutter}>

          {
            (items &&
            items.map((f, i) => (
              <ItemView {...this.props.ItemViewProps}
                onChanged={nv => {
                  const tItems = [...items]
                  const ov = items.filter(tt => tt.id === nv.id)[0]
                  tItems[tItems.indexOf(ov)] = nv
                  this.setState({items: tItems})
                }}
                onLoaded={() => {
                  this.setState({loadedItemCounts: this.state.loadedItemCounts + 1})
                  if(this.props.onLoaded && this.state.loadedItemCounts + 1 === items.length) {
                    this.forceUpdate()
                    setTimeout(() => {
                      this.props.onLoaded()
                    }, 500)
                  }
                }}
                key={i}
                base={f}/>
              )
            ))
          }
        </StackGrid>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderItems()}
        <div style={{textAlign: 'center'}}>
          {(this.state.loading && !this.props.dommy) ? (<i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw" style={{marginBottom: 60, marginTop: 20}}></i>) : ''}
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
  styleOverwrite: React.PropTypes.object,
  component: React.PropTypes.string,
  onLoaded: React.PropTypes.func,
  dommy: React.PropTypes.bool,
  gutter: React.PropTypes.number
}


export default Viewer
