import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import CenteredComponent from "../utils/CenteredComponent";

const Profile = () => {
  const { currentUser, signout } = useAuth();
  const logoutHandler = async () => {
    try {
      await signout();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <CenteredComponent>
      <Card>
        <Card.Body className="text-center">
          <h2>Welcome</h2>
          {currentUser && (
            <>
              <div>
                <strong>Email:</strong> {currentUser.email}
              </div>
              <Button className="w-100" onClick={logoutHandler}>
                Logout
              </Button>
            </>
          )}
          {!currentUser && <Link to="/signin">Sign In</Link>}
          <Link to='/'>Home</Link>          
        </Card.Body>
      </Card>
    </CenteredComponent>
  );
};

export default Profile;
