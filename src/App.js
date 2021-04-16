import React from "react"
import { Container } from "react-bootstrap"
import { AuthProvider } from "./contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Signup from "./Components/Signup"
import Dashboard from "./Components/Dashboard"
import Login from "./Components/Login"
import PrivateRoute from "./Components/PrivateRoute"
import ForgotPassword from "./Components/ForgotPassword"
import UpdateProfile from "./Components/UpdateProfile"
import About from "./Components/About"
import Planner from "./Components/Planner"
import '../src/App.css'
import { faGithub, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Flights from "./Components/Flights"

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center App"
      style={{ minHeight: "100vh" }}
    >
      <div>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <PrivateRoute exact path="/planner" component={Planner}/>
              <PrivateRoute exact path="/flights" component={Flights}/>
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route path="/about" component={About} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
      <footer className="footer">
        <center>
          <a href="https://github.com/Travmedia-il"><FontAwesomeIcon className="footer-fa-icon" icon={faGithub} color={"white"} /></a>
          <a href="https://www.instagram.com/rudovruben"><FontAwesomeIcon className="footer-fa-icon" icon={faInstagram} color={"white"} /></a>
          <a href="https://www.linkedin.com/in/ruben-rudov-106a22204/"><FontAwesomeIcon className="footer-fa-icon" icon={faLinkedin} color={"white"} /></a>
          <a href="https://twitter.com/RubenRudov"><FontAwesomeIcon className="footer-fa-icon" icon={faTwitter} color={"white"}/></a>
          <p>© Travmedia 2021</p>
        </center>
      </footer>
    </Container>
  )
}

export default App