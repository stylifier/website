import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import API from '../src/API'
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

class CloseThreadModal extends Component {
  constructor(props) {
    super(props)
    this.api = new API()

    this.state = {
      rank: 3,
      message: ''
    }
  }

  componentDidMount() {
    $('#rateThreadModal').modal('show')
    $('#rateThreadModal').on('hidden.bs.modal', () => this.props.onClose())
  }

  componentDidUpdate() {

  }

  render() {
    return (
      <div
      id="rateThreadModal"
      style={{position: 'fixed', zIndex: 999999,top: 0, textAlign: 'center', left: 0, width: '100%', height: '100%'}}
      className="modal modal-dialog fade"
      role="dialog"
      aria-labelledby="openingThreadModalLabel"
      aria-hidden="true">
        <div className="modal-content" style={{position: 'relative', margin: 'auto', width: 800, height: 500, maxHeight: '100%', maxWidth: '100%'}}>
          <div className="modal-header">
            <a type="button" className="close" data-dismiss="modal" aria-hidden="true">×</a>
          </div>
          <div className="modal-body">
          <h3>How was your experience?</h3>
          <Slider
            style={{margin: 'auto', width: '75%', marginBottom: '50'}}
            step={5}
            min={1}
            max={5}
            value={this.state.rank}
            marks={{1: 'bad', 2: 'below average', 3: 'good', 4: 'perfect', 5: 'supreme'}}
            onChange={v => this.setState({rank: v})}/>
          </div>
          <textarea
            value={this.state.message}
            onChange={e => this.setState({message: e.target.value})}
            style={{maxWidth: 'calc(100% - 40px)', resize: 'none', minHeight: '40%', margin: 20}}
            onKeyPress={(e) =>
              e.key === 'Enter' && this.messageSend(e)
            }
            id="btn-input"
            className="form-control input-sm"
            placeholder={'Write a briefe description about your experience with ' + this.props.base.to.username + ' here...'} />
          <div className="modal-footer">
            <button
              onClick={(e) => {
                e.preventDefault()
                this.api.closeThread(this.props.base.id,{rating: this.state.rank, review: this.state.message})
                .then(() => {
                  $('#rateThreadModal').modal('hide')
                  this.props.onClose()
                })
              }}
              className="btn btn-primary">

              Close Conversation
            </button>
          </div>
        </div>
    </div>)
  }
}

CloseThreadModal.propTypes = {
  base: React.PropTypes.object,
  onClose: React.PropTypes.func,
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired
  }).isRequired
}

export default withRouter(CloseThreadModal)
