import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"
import website_logo from '../Assets/website_logo.jpeg'
import { faGithub, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function ForgotPassword() {
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage("")
      setError("")
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage("Check your inbox for further instructions")
    } catch {
      setError("Failed to reset password")
    }
    setLoading(false)
  }

  return (
    <div className="login">
      <div className="banner">
        <img src={website_logo}/>
      </div>
      <h1>Password Reset</h1>
      <Card>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label className="label">Email</Form.Label>
              <br/>
              <Form.Control className="input" type="email" ref={emailRef} required />
            </Form.Group>
            <br/>
            <Button disabled={loading} className="submit-btn" type="submit">
              Reset Password
            </Button>
          </Form>
          <br/>
          <div className="btn1"><p><Link to="/login">Login with your account</Link></p></div>
        </Card.Body>
      </Card>
      <br/>
      <div className="btn1"><p><Link to="/signup">Create an account</Link></p></div>
      <footer className="footer">
        <center>
          <a href="https://github.com/Travmedia-il"><FontAwesomeIcon className="footer-fa-icon" icon={faGithub} color={"white"} /></a>
          <a href="https://www.instagram.com/rudovruben"><FontAwesomeIcon className="footer-fa-icon" icon={faInstagram} color={"white"} /></a>
          <a href="https://www.linkedin.com/in/ruben-rudov-106a22204/"><FontAwesomeIcon className="footer-fa-icon" icon={faLinkedin} color={"white"} /></a>
          <a href="https://twitter.com/RubenRudov"><FontAwesomeIcon className="footer-fa-icon" icon={faTwitter} color={"white"}/></a>
          <p>© Travmedia 2021</p>
        </center>
      </footer>
    </div>
  )
}