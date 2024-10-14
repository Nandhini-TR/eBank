import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {errorMsg: '', userId: '', pin: '', showSubmitError: false}

  componentDidMount() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      const {history} = this.props
      history.replace('/')
    }
  }

  onChangeUserInput = event => {
    this.setState({userId: event.target.value})
  }

  onChangePin = event => {
    this.setState({pin: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onClickLogin = async event => {
    event.preventDefault()

    const {userId, pin} = this.state

    const userDetails = {user_id: userId, pin}

    const apiUrl = 'https://apis.ccbp.in/ebank/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {userId, pin, showSubmitError, errorMsg} = this.state
    return (
      <div className="login-container">
        <div className="login-image-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="website-login-image"
          />
        </div>
        <div className="login-page-container">
          <h1 className="login-heading">Welcome Back!</h1>
          <form className="form-container" onSubmit={this.onClickLogin}>
            <label htmlFor="userId" className="label-text">
              User ID
            </label>
            <input
              type="text"
              id="userId"
              value={userId}
              placeholder="Enter User ID"
              className="input-box"
              onChange={this.onChangeUserInput}
            />

            <label htmlFor="pin" className="label-text">
              PIN
            </label>
            <input
              type="password"
              id="pin"
              value={pin}
              placeholder="Enter PIN"
              className="input-box"
              onChange={this.onChangePin}
            />
            <button type="submit" className="login-button">
              Login
            </button>
            {showSubmitError && <p className="error-msg">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
