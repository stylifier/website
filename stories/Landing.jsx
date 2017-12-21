import React, {Component} from 'react';

class Landing extends Component {
  constructor(props) {
    super(props)
  }

  refreshStats() {
  }

  componentWillUnmount() {
  }

  renderFirstSection() {
    return (
      <div id="home-sec" className="container" style={{width: '100%', height: '100%', padding: 0, backgroundColor: 'black',color:'white', overflow: 'hidden'}}>
        <div className="row clr-white" >
          <div className="col-lg-3 col-md-4 col-sm-4 col-xs-2">
            <div style={{
              background: 'url(assets/img/left-shade.png) right repeat-x, url(assets/img/left-1.jpeg) left',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'auto 100%',
              height: '100%',
              overflow: 'hidden'
            }}>
              <img src="assets/img/left-1.jpeg" className="img-responsive main-img"  height="auto" style={{maxHeight:'600px', maxWidth:'400px', height:'100%', opacity: 0.0}}/>
            </div>
        </div>
        <div className="col-lg-6 col-md-4 col-sm-4 col-xs-8" style={{color:'white', marginTop: '5%'}}>
          <div className="col-lg-3 col-md-0 col-sm-0 col-xs-0"/>
          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
            <p data-scroll-reveal="enter from the bottom after 0.7s" style={{fontSize: '1.4em', textAlign: 'center'}}>
                Always had the desire to have your personal styler?
            </p>
            <br/>
            <p data-scroll-reveal="enter from the bottom after 1.3s" style={{fontSize: '1.4em', textAlign: 'center'}}>
                Ever struggled finding the right style for the right occasion?
            </p>
            <br/>
            <p data-scroll-reveal="enter from the bottom after 0s">
                <a role="button" href="/login" style={{fontSize: '1.7em', textAlign: 'center'}} className="btn btn-default btn-transparent btn-lg">Join Sylifier Now!</a>
            </p>
            <br/>
            <p data-scroll-reveal="enter from the bottom after 2s" style={{fontSize: '1.2em', textAlign: 'center'}}>
                Join as a styler if you believe other people appriciate your advises.
            </p>
          </div>
          <div className="col-lg-3 col-md-0 col-sm-0 col-xs-0"/>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-4 col-xs-2">
          <div style={{
            background: 'url(assets/img/right-shade.png) left repeat-x, url(assets/img/right-1.jpeg) right',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'auto 100%',
            height: '100%',
            overflow: 'hidden'
          }}>
            <img src="assets/img/left-1.jpeg" className="img-responsive main-img"  height="auto" style={{overflow: 'hidden', maxHeight:'600px', maxWidth:'400px', height:'100%', opacity: 0.0}}/>
          </div>
        </div>
      </div>
    </div>
    )
  }

  render() {
   const firstSection = this.renderFirstSection()
    return (
      <div>
        {firstSection}
      </div>
    )
  }
}

Landing.propTypes = {
}

export default Landing



// <div id="specifications" className="carousel slide" data-ride="carousel">
//   <div className="carousel-inner">
//       <div className="item active">
//
//       </div>
//       <div className="item">
//
//       </div>
//       <div className="item">
//
//       </div>
//   </div>
//   <ol className="carousel-indicators">
//       <li data-target="#specifications" data-slide-to="0" className="active"></li>
//       <li data-target="#specifications" data-slide-to="1" className=""></li>
//       <li data-target="#specifications" data-slide-to="2" className=""></li>
//   </ol>
// </div>
