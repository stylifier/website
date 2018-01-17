import React, {Component} from 'react'
import ScrollArea from 'react-scrollbar'

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
    this.initializing = false

    // this.scrollArea.scrollBottom()
    // setTimeout(() => this.scrollArea.scrollBottom(), 100)
    setTimeout(() => this.scrollArea.scrollBottom(), 100)
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
      items = items.filter((item) => currentItemIds.indexOf(item.id) === -1)
      this.loaded = false
      this.setState({items: [...items, ...this.state.items]})
      setTimeout(() => this.setState({loading: false}), 200)
    })
    .catch(() => {
      this.setState({loading: false})
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
    console.log(this.loadedItemCounts, this.state.items.length);
    this.loadedItemCounts += 1

    if(!this.loaded && this.loadedItemCounts === this.state.items.length) {
      this.loaded = true

      console.log(this.stayOnBotton);

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
      <div style={{height: '100%'}}>
        <ScrollArea
            ref={s => s ? this.scrollArea = s.scrollArea : ''}
            className="area"
            contentClassName="content"
            horizontal={false}
            onScroll={(value) => this.handleScroll(value)}
            style={{height: '100%'}}
            >
          {this.renderItems()}
        </ScrollArea>
        {this.state.loading && (<div style={{textAlign: 'center', width: '100%', height: '100%', color: 'white', textShadow: '0px 0px 10px #000000'}} className='overlay'>
          <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw" style={{marginBottom: 60, marginTop: 20}}></i>
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
  prepend: React.PropTypes.bool
}


export default Viewer
