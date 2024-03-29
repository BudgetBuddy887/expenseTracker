import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container, Modal, Tab, FormLabel } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
import Form from 'react-bootstrap/Form';
import Auth from '../utils/auth';

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <>
    <Navbar collapseOnSelect expand="lg" sticky="top" bg='dark' variant='dark' className='navbar' >
      <Container>
        <Navbar.Brand href="/">Expense Tracker 💸</Navbar.Brand>
         <Navbar.Toggle aria-controls="responsive-navbar-nav"/> 
        <Navbar.Collapse id="responsive-navbar-nav" className='justify-content-end'>
            <Nav className='me-auto'>
              {Auth.loggedIn() ? (
                <>
                <Nav.Item>
                  <Nav.Link href='/Budget'>Budget</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href='/expenses'>Expense</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="disabled" disabled>
                    Welcome {localStorage.getItem('username')}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item >
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                </Nav.Item>
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
              )}
            </Nav >
          </Navbar.Collapse>
        </Container>
      </Navbar>
                   
      
      {/* set modal data up */}
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
      
    </>
  );
};

export default AppNavbar;
