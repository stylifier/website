import React, {Component} from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

class Viewer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: this.props.baseItems ? [...this.props.baseItems] : [],
      loading: true,
      fetchOnEnd: true
    }
    this.loadedItemCounts = 0
    this.count = 0
    this.resized = this.resized.bind(this);
    this.stayOnBotton = true
    this.initializing = true
  }

  resized() {
    this.forceUpdate()
  }

  keepAtBottom() {
    console.log(this.scrollArea)
    this.initializing = false
    setTimeout(() => this.scrollArea.scrollToBottom(), 100)
  }

  handleScroll(value) {
    if(value.topPosition + value.containerHeight == value.realHeight) {
      this.stayOnBotton = true
    } else if(!this.initializing && value.topPosition && value.containerHeight && value.realHeight){
      this.stayOnBotton = false
    }

    if ((value.topPosition == 0) && this.state.loading === false && this.state.fetchOnEnd) {
      this.setState({loading: true})
      this.fetcher()

    }
  }

  refreshStats() {
  }

  componentDidMount() {
    this.fetcher()
    window.addEventListener('resize', this.resized)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resized)
  }

  fetcher() {
    if(typeof this.props.fetcher !== 'function') {
      setTimeout(() => this.setState({loading: false}), 500)
      return
    }
    this.props.fetcher()
    .then((items) => {
      const currentItemIds = this.state.items.map(i => i.id)
      items.map((item) => ({status: item.status,index: currentItemIds.indexOf(item.id)}))
      .filter(t => t.index !== -1 && this.state.items[t.index].status !== t.status)
      .map(t => {
        this.state.items[t.index].status = t.status
        this.forceUpdate()
      })

      items = items.filter((item) => currentItemIds.indexOf(item.id) === -1)
      this.loaded = false
      this.setState({items: [...items, ...this.state.items]})
      setTimeout(() => this.setState({loading: false}), 200)
    })
    .catch(() => {
      setTimeout(() => this.setState({loading: false})), 2000
    })
  }

  fetcherOnTop() {
    if(typeof this.props.fetcher !== 'function') {
      setTimeout(() => this.setState({loading: false}), 500)
      return
    }
    this.props.fetcherOnTop()
    .then((items) => {
      const currentItemIds = this.state.items.map(i => i.id)
      items = items.filter((item) => currentItemIds.indexOf(item.id) === -1)
      this.loaded = false
      this.setState({items: [...this.state.items, ...items]})
      setTimeout(() => this.setState({loading: false}), 200)
    })
    .catch(() => {
      this.setState({loading: false})
    })
  }

  itemLoaded() {
    this.loadedItemCounts += 1

    if(!this.loaded && this.loadedItemCounts === this.state.items.length) {
      this.loaded = true

      if(this.stayOnBotton)
        this.keepAtBottom()

      this.props.onLoaded && this.props.onLoaded()
    }
  }

  renderItems() {
    const ItemView = this.props.ItemView

    return (
      <div style={{height: this.state.items.length > 0 ? 'inherit' : '0'}}>
        <div style={this.props.styleOverwrite || {margin: 5, marginTop: 30}}>
          {
            (this.state.items &&
              this.state.items.map((f, i) => (
                <ItemView {...this.props.ItemViewProps}
                  onLoaded={() => this.itemLoaded() }
                  key={i}
                  base={f}/>
                )
              ))
          }
        </div>
      </div>
    )
  }

  render() {
    return (
      <div style={{height: '100%', width: '100%', overlay: 'hidden',top: 0, right: 0}}>
        <Scrollbars
            ref={s => this.scrollArea = s}
            onScroll={(value) => this.handleScroll(value)}
            style={{height: '100%', width: '100%'}}
            >
          {this.renderItems()}
        </Scrollbars>
        {!this.props.hideLoading && this.state.loading && (<div style={{textAlign: 'center', width: '100%', height: '100%', color: 'white', textShadow: '0px 0px 10px #000000'}} className='overlay'>
          <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw" style={{marginBottom: 60, marginTop: 80}}></i>
        </div>)}
      </div>
    )
  }
}

Viewer.propTypes = {
  fetcher: React.PropTypes.func,
  fetcherOnTop: React.PropTypes.func,
  ItemView: React.PropTypes.func,
  ItemViewProps: React.PropTypes.object,
  baseItems: React.PropTypes.array,
  largeRowCount: React.PropTypes.number,
  mediomRowCount: React.PropTypes.number,
  smallRowCount: React.PropTypes.number,
  styleOverwrite: React.PropTypes.object,
  component: React.PropTypes.string,
  onLoaded: React.PropTypes.func,
  gutter: React.PropTypes.number,
  height: React.PropTypes.string,
  hideLoading: React.PropTypes.bool,
  prepend: React.PropTypes.bool
}


export default Viewer
