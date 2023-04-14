import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  onSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onLogin = async () => {
    const userDetails = {username: 'rahul', password: 'rahul@2021'}
    const url = 'https://apis.ccbp.in/login'
    const options = {method: 'POST', body: JSON.stringify(userDetails)}
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccess(data.jwt_token)
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <h1>Please Login</h1>
        <button type="button" onClick={this.onLogin}>
          Login with Sample Creds
        </button>
      </div>
    )
  }
}
export default Login
