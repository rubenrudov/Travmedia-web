import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import website_logo from '../Assets/website_logo.jpeg'

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to create an account")
    }

    setLoading(false)
  }

  return (
    <div className="login">
      <div className="banner">
        <img src={website_logo}/>
      </div>
      <h1 className="text-center mb-4">Sign Up</h1>
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
            <Form.Group id="password-confirm">
              <Form.Label className="label">Password Confirmation</Form.Label>
              <br/>
              <Form.Control className="input" type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <br/>
            <Button disabled={loading} className="submit-btn" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <br/>
      <div className="btn1"><p><Link to="/login">Login with your account</Link></p></div>
    </div>
  )
}