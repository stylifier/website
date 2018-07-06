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
      <div
        style={{
          width: '100%',
          margin: 0,
          height: 200,
          boxShadow: '0px 1px 5px 1px gray',
          borderRadius: 4
        }}>
        {this.props.base.code.match(/.{1,6}/g).map((c, i) => {
          return (
            <div
              key={i}
              style={{
                width: '100%',
                margin: 0,
                height: 50,
                color: 'white',
                backgroundColor: '#' + c
              }}>
            </div>
          )
        })}
      </div>
    )
  }
}

ColorItem.propTypes = {
  base: PropTypes.object
}

export default ColorItem
