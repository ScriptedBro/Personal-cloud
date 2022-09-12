import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import CenteredComponent from "../utils/CenteredComponent";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const emailRef = useRef();
  const passRef = useRef();
  const confPassRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (
      "" === emailRef.current.value ||
      "" === passRef.current.value ||
      "" === confPassRef.current.value
    ) {
      setError("Please enter all details");
      setLoading(false);
      return;
    }

    if (passRef.current.value !== confPassRef.current.value) {
      setError("Password does not match");
      setLoading(false);
      return;
    }

    try {
      await signup(emailRef.current.value, passRef.current.value);
      navigate("/");
    } catch (err) {
      setError("Unable to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CenteredComponent>
      <Card>
        <Card.Body>
          <h2 className="text-center">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passRef} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" ref={confPassRef} />
            </Form.Group>
            <Button disabled={loading} type="submit" className="mt-2 w-100">
              Sign Up
            </Button>
          </Form>
          <div>
            Already have account? <Link to="/signin">Sign In</Link>
          </div>
        </Card.Body>
      </Card>
    </CenteredComponent>
  );
};

export default Signup;
