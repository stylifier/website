import React, {Component} from 'react'
import Footer from '../components/Footer.jsx'
// import LandingTopSection from '../components/LandingTopSection.jsx'

class Landing extends Component {
  constructor(props) {
    super(props)
  }

  refreshStats() {
  }

  componentWillUnmount() {
  }

  render() {
    const pointerStyle = {
      fontFamily: '\'Julius Sans One\', sans-serif',
      textAlign: 'center',
      color: '#71d5de',
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'inline-block',
      fontSize: '2em',
      width: '2em',
      height: '2em',
      paddingTop: '0.5em',
      backgroundColor: '#314156' ,
      border: '1px solid #71d5de',
      borderRadius: 100
    }

    const pointerHeaderStyle = {
      fontFamily: '\'Julius Sans One\', sans-serif',
      textAlign: 'center',
      color: '#71d5de',
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'inline-block',
      fontSize: '1.5em'
    }

    const pointerBodyStyle = {
      textAlign: 'center',
      color: '#f6f6f6',
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'inline-block',
      marginTop: 20,
      fontSize: '1.3em'
    }

    return (
      <div style={{overflow: 'hidden'}}>
        <div id="home-sec" className="container" style={{maxWidth: '900px',padding: 0,marginLeft: 'auto', marginRight: 'auto'}}>
          <div className="row clr-white" >
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <img
                src="assets/img/screen_iphone_1.jpg"
                style={{
                  height: 500,

                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto'
                }}
              />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12" style={{padding: 40}}>

              <h1 style={{fontFamily: '\'Julius Sans One\', sans-serif', paddingTop: '20%', textAlign: 'center', color: '#3b4e68'}}>
                Discover the Stylist within You
              </h1>
              <div style={{width: '100%'}}>
                <a href="https://itunes.apple.com/us/app/stylifier/id1412217511?mt=8" style={{
                  marginTop: '25%',
                  marginBottom: '10%',
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto'
                }}>
                  <img
                    src="assets/img/app-store.jpg"
                    style={{
                      width: 220,
                      display: 'block',
                      marginLeft: 'auto',
                      marginRight: 'auto'
                    }}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div style={{width: '100%', backgroundColor: '#3b4e68', marginTop: 30}}>
          <div id="home-sec" className="container" style={{maxWidth: '900px',padding: 0,marginLeft: 'auto', marginRight: 'auto', textAlign: 'center'}}>
            <div className="row clr-white" >
              <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12" style={{padding: 40}}>
                <h2 style={pointerStyle}>1</h2><br/>
                <h2 style={pointerHeaderStyle}>Select Your Desired Colour</h2><br/>
                <p style={pointerBodyStyle}>
                  It can be your skin colour from a photo, a picture of a shirt you already own, or in fact anything at all.
                </p>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12" style={{padding: 40}}>
                <h2 style={pointerStyle}>2</h2><br/>
                <h2 style={pointerHeaderStyle}>Find the Right Colour Combination</h2>
                <p style={pointerBodyStyle}>
                  Find the best colour combinations from thousands of colour pallets available. We only offer you combinations that go with your chosen colour.
                </p>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12" style={{padding: 40}}>
                <h2 style={pointerStyle}>3</h2><br/>
                <h2 style={pointerHeaderStyle}>Create an Outfit</h2>
                <p style={pointerBodyStyle}>
                  Put together an outfit from nearly unlimited options. Upload photos to your profile and see what your friends and other users think.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div style={{width: '100%', backgroundColor: '#f6f6f6', marginTop: 50, marginBottom: 50}}>
          <div id="home-sec" className="container" style={{maxWidth: '900px',padding: 0,marginLeft: 'auto', marginRight: 'auto', textAlign: 'center'}}>
            <div className="row clr-white" >
              <div className="col-lg-5 col-md-5 col-sm-5 col-xs-12" style={{padding: 40, zIndex: 10}}>
                <h2 style={{textAlign: 'left', color: '#3b4e68', marginBottom: 40}}>
                  Always have a stylist in your pocket!
                </h2>
                <p style={{textAlign: 'left', color: '#3b4e68', fontSize: '1.3em'}}>
                  Stylifier makes it easy for everyone to dress with style. For buying new clothes or colour matching in your existing wardrobe, you’re just one snap away from the perfect outfit.
                </p>
                <p style={{textAlign: 'left', color: '#3b4e68', fontSize: '1.3em'}}>
                  You can interact with other users and help the community grow.
                </p>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12" style={{marginLeft: -120}}>
                <img
                  src="assets/img/screen_iphone_complete.jpg"
                  style={{
                    height: 500,

                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                  }}
                />
              </div>
            </div>
          </div>
        </div>


        <Footer whiteBackground={false}/>
      </div>
    )
  }
}


// <div id="myCarousel" className="carousel slide" data-ride="carousel" style={{height: 'calc(100% - 100px)', maxHeight: '1342px'}}>
//   <ol className="carousel-indicators">
//     <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
//     <li data-target="#myCarousel" data-slide-to="1"></li>
//     <li data-target="#myCarousel" data-slide-to="3"></li>
//     <li data-target="#myCarousel" data-slide-to="4"></li>
//   </ol>
//   <div className="carousel-inner">
//     <div className="item active" style={{height: '100%', maxHeight: '1342px'}}>
//       <LandingTopSection message="FIND YOUR OWN PERSONAL STYLIST" image="assets/img/landing-1-1.jpeg"/>
//     </div>
//     <div className="item" style={{height: '100%', maxHeight: '1342px'}}>
//       <LandingTopSection message="BECOME A PROFESSIONAL STYLIST" image="assets/img/landing-1-2.jpeg"/>
//     </div>
//     <div className="item" style={{height: '100%', maxHeight: '1342px'}}>
//       <LandingTopSection message="ASK FASHION ADVICE FROM YOUR FAVORITE BRANDS" image="assets/img/landing-1-4.jpeg"/>
//     </div>
//     <div className="item" style={{height: '100%', maxHeight: '1342px'}}>
//       <LandingTopSection message="MAKE A DIFFERENCE FOR YOURSELF AND OTHERS" image="assets/img/landing-1-3.jpeg"/>
//     </div>
//   </div>
// </div>

Landing.propTypes = {
}

export default Landing
