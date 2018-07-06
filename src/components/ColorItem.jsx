import React, {Component, PropTypes} from 'react'

class ColorItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  resize(){
    this.render()
  }

  render() {
    return (
      <button
        onClick={(e) => {
          e.preventDefault()
          this.props.onClick && this.props.onClick(this.props.base)
        }}
        style={{
          width: '99%',
          margin: 0,
          height: 70,
          color: 'white',
          backgroundColor: '#' + this.props.base,
          boxShadow: '0px 1px 5px 1px gray',
          borderRadius: 4
        }}>
      </button>
    )
  }
}

ColorItem.propTypes = {
  base: PropTypes.string,
  onClick: PropTypes.func
}

export default ColorItem
