import React from 'react';
import { connect } from 'react-redux';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthService from '../AuthService';
import './style.css';

class AppBar extends React.Component {
	constructor() {
		super();
		this.Auth = new AuthService();
	}

	authNav = () => {
		if (this.Auth.loggedIn()) {
			return (
				<div>
					<Navbar collapseOnSelect className='nav-container' expand='lg'>
						<Navbar.Brand>
							Crystal Madness
						</Navbar.Brand>
						<Navbar.Toggle aria-controls='responsive-navbar-nav' />
						<Navbar.Collapse id='responsive-navbar-nav'>
							<div className='mr-auto navbar-nav'>
								<Nav.Item>
									<Nav.Link eventKey='1' className='navLinks' as={Link} to='/'>
										Home
									</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link
										eventKey='3'
										className='navLinks'
										as={Link}
										to='/score'>
										Score Board
									</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link
										eventKey='4'
										className='navLinks'
										as={Link}
										to='/instructions'>
										How to play
									</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link
										eventKey='5'
										className='navLinks'
										as={Link}
										to='/game'>
										New Game
									</Nav.Link>
								</Nav.Item>
							</div>
							{/* this is not using the Link component to logout or user and then refresh the application to the start */}
							<div>
								<Navbar.Text>
									Welcome: {' '}
									<Link as={Link} to='/score'>
										{this.props.name}
									</Link>
								</Navbar.Text>
								<Navbar.Text>
									<a
										className='nav-link'
										href='/'
										onClick={() => this.Auth.logout()}>
										Logout
									</a>
								</Navbar.Text>
							</div>
						</Navbar.Collapse>
					</Navbar>
				</div>
			);
		} else {
			return (
				<div>
					<Navbar className='nav-container' expand='lg'>
						<Navbar.Brand>Crystal Madness</Navbar.Brand>
						<Navbar.Toggle aria-controls='basic-navbar-nav' />
						<Navbar.Collapse id='basic-navbar-nav'>
							<div className='mr-auto navbar-nav'>
								<Nav.Item>
									<Nav.Link className='navLinks' as={Link} to='/'>
										Home
									</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link className='navLinks' as={Link} to='/instructions'>
										How to play
									</Nav.Link>
								</Nav.Item>
							</div>
							<Navbar.Text>
								<Nav.Link as={Link} to='/login'>
									Log In
								</Nav.Link>
							</Navbar.Text>
						</Navbar.Collapse>
					</Navbar>
				</div>
			);
		}
	};
	render() {
		return <div>{this.authNav()}</div>;
	}
}

const mapStateToProps = state => ({
	name: state.name,
});

export default connect(mapStateToProps)(AppBar);
