import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import CenteredComponent from "../utils/CenteredComponent";

const Signin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { signin } = useAuth();
  const navigate = useNavigate();

  const emailRef = useRef();
  const passRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if ("" === emailRef.current.value || "" === passRef.current.value) {
      setError("Please enter all details");
      setLoading(false);
      return;
    }

    try {
      await signin(emailRef.current.value, passRef.current.value);
      navigate("/");
    } catch (err) {
      setError("Unable to Sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CenteredComponent>
      <Card>
        <Card.Body>
          <h2 className="text-center">Sign In</h2>
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
            <Button type="submit" disabled={loading} className="mt-2 w-100">
              Sign In
            </Button>
          </Form>
          <div>
            Need an account? <Link to="/signup">Sign Up</Link>
          </div>
        </Card.Body>
      </Card>
    </CenteredComponent>
  );
};

export default Signin;
