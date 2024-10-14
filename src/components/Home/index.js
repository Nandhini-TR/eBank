import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import './index.css'

const Home = props => {
  const jwtToken = Cookies.get('jwt_token')

  if (jwtToken === undefined) {
    return <Redirect to="/ebank/login" />
  }

  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  return (
    <div className="Home-bg-container">
      <nav className="nav-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
            alt="website logo"
            className="website-logo"
          />
        </Link>

        <button type="button" className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </nav>
      <div className="home-card-container">
        <h1 className="main-heading">Your Flexibility, Our Excellence</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
          className="digital-card"
        />
      </div>
    </div>
  )
}

export default Home
