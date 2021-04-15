import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import website_logo from '../Assets/website_logo.jpeg'

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to log in")
    }
    setLoading(false)
  }

  return (
    <div className="login">
      <div className="banner">
        <img src={website_logo}/>
      </div>
      <h1 className="text-center mb-4">Log In</h1>
      <Card>
        <Card.Body className="card-body">
          {error && <Alert variant="danger">{error}</Alert>}
          <Form className="form" onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label className="label">Email</Form.Label>
              <br/>
              <Form.Control className="input" type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label className="label">Password</Form.Label>
              <br/>
              <Form.Control className="input" type="password" ref={passwordRef} required />
            </Form.Group>
            <br/>
            <Button disabled={loading} className="submit-btn" type="submit">
              Log In
            </Button>
          </Form>
          <br/>
          <div className="btn1">
            <p><Link to="/forgot-password">Forgot Password?</Link></p>
          </div>
        </Card.Body>
      </Card>
      <br/>
      <div className="btn1"><p><Link to="/signup">Create an account</Link></p></div>
    </div>
  )
}