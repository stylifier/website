import React, {Component} from 'react'
import API from '../src/API'
import ucfirst from 'ucfirst'

class AddressManager extends Component {
  constructor(props) {
    super(props)
    this.api = new API()
    this.state = {
      addresses: [],
      showAddAddress: false,
      showAddressStreet: '',
      showAddressPostalCode: '',
      showAddressCountry: '',
      showAddressNote: '',
      showAddressCity: '',
      selectedId: undefined
    }

    this.updateAddresses()
  }

  updateAddresses() {
    return this.api.getUserAddresses()
    .then(addresses => this.setState({
      addresses,
      selectedId: addresses[0] ? addresses[0].id : undefined
    }))
  }

  createAddress(e) {
    e.preventDefault();

    const {
      showAddressStreet,
      showAddressPostalCode,
      showAddressCountry,
      showAddressNote,
      showAddressCity
    } = this.state

    return this.api.createAddress({
      street: showAddressStreet,
      postalCode: parseInt(showAddressPostalCode),
      country: showAddressCountry,
      note: showAddressNote,
      city: showAddressCity
    })
    .then(() => this.updateAddresses())
    .then(() => this.setState({
      showAddAddress: false,
      showAddressStreet: '',
      showAddressPostalCode: '',
      showAddressCountry: '',
      showAddressNote: '',
      showAddressCity: ''
    }))
  }

  getSelectedAddress() {
    return this.state.selectedId ?
      this.state.addresses.filter(t => t.id === this.state.selectedId)[0] :
      undefined
  }

  render() {
    const {
      addresses,
      showAddAddress
    } = this.state

    return (
      <div>
        {addresses.map((a, i) => (
          <div key={i} className="form-check">
            <input className="form-check-input" name="group100" type="radio" checked={this.state.selectedId.toString() === a.id.toString()} id={'radio10' + i} value={a.id} onChange={(e) => {
              this.setState({
                selectedId: e.target.value
              })
            }}/>
            <label style={{marginLeft: 5}} className="form-check-label" htmlFor={'radio10' + i}>
              {ucfirst(a.street)},&nbsp;
              {ucfirst(a.postalCode)}&nbsp;
              {ucfirst(a.city)},&nbsp;{ucfirst(a.country)}
              <a onClick={(e) => {
                e.preventDefault();
                this.api.deleteAddress(a.id)
                .then(() => this.updateAddresses())
              }}> delete </a>
            </label>
          </div>
        ))}
        {showAddAddress ?
          (<form onSubmit={(e) => this.createAddress(e)}>
            <lable>Add a New Address:</lable>
            <input type="text" value={this.state.showAddressStreet} onChange={e => this.setState({showAddressStreet: e.target.value})} className="form-control" placeholder="No. and Street"/>
            <input type="text" value={this.state.showAddressPostalCode} onChange={e => this.setState({showAddressPostalCode: e.target.value})} className="form-control" placeholder="Postal Code"/>
            <input type="text" value={this.state.showAddressCity} onChange={e => this.setState({showAddressCity: e.target.value})} className="form-control" placeholder="City"/>
            <input type="text" value={this.state.showAddressCountry} onChange={e => this.setState({showAddressCountry: e.target.value})} className="form-control" placeholder="Country"/>
            <input type="text" value={this.state.showAddressNote} onChange={e => this.setState({showAddressNote: e.target.value})} className="form-control" placeholder="Extra Notes"/>
            <button
              style={{float: 'right'}}
              type="submit"
              className="btn btn-default"
              onClick={(e) => this.createAddress(e)}>
                Create Address
            </button>
          </form>) :
          (<button type="button" className="btn btn-primary" onClick={() => this.setState({showAddAddress: true})}> Add Address</button>)}
      </div>
    )
  }
}

AddressManager.propTypes = {
  phrase: React.PropTypes.string
}

export default AddressManager
