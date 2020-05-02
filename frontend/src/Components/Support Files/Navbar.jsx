import React, { Component, Fragment } from 'react';

import { Link, withRouter } from 'react-router-dom'
import { Button } from "./Button"

import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { getSearches } from '../../Actions/SearchActions'
import { logout } from '../../Actions/authActions';


class Navbar extends Component {

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    redirectToHome = () => {
        const { history } = this.props;
        if (history) history.push('/');
    }


    render() {
        const { isAuthenticated, user } = this.props;

        const navStyle = {
            color: 'white'
        }

        const authLinks = (
            <Fragment>
                {console.log('what', user)}
                <span className=''>
                    <strong>{user ? `Welcome ${user.payload.username}` : 'Nothin'}</strong>
                </span>
                <p>Post Icon</p>
                <ul className='nav-links'>
                    <Link style={navStyle} to='/explore'><strong><li>Explore</li></strong></Link>
                    <Link style={navStyle} to='/travel'><strong><li>Travel</li></strong></Link>
                    <Link style={navStyle} to='/trending'><strong><li>Trending</li></strong></Link>
                    <Link style={navStyle} to='/userprofile'><strong><li>User Profile</li></strong></Link>
                </ul>
                <div className='btn-holder'>
                    <Button onClick={() => {
                        this.props.logout();
                        this.redirectToHome();
                    }}
                        type="button"
                        buttonStyle="btn--login--solid"
                        buttonSize="btn--medium">Logout</Button>
                </div>
            </Fragment>
        );

        const vistorLinks = (
            <Fragment>
                <ul className='nav-links'>
                    <Link style={navStyle} to='/explore'><strong><li>Explore</li></strong></Link>
                    <Link style={navStyle} to='/login'><strong><li>Login</li></strong></Link>
                    <Link style={navStyle} to='/registration'><strong><li>Signup</li></strong></Link>
                </ul>
            </Fragment>
        );

        return (
            <nav>
                <h3>C2C</h3>
                <div className="search-container">
                    <div className="searchbox">
                        <input type="text" className="searchbox__input" placeholder="Search..." onChange={event => this.props.getSearch(event.target.value)} />
                        <svg className="searchbox__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56.966 56.966">
                            <path className="iconColor" d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17s-17-7.626-17-17S14.61,6,23.984,6z" />
                        </svg>
                    </div>
                </div>
                {isAuthenticated ? authLinks : vistorLinks}
            </nav>
        );
    }
}

Navbar.propTypes = {
    getSearches: PropTypes.func.isRequired,
    search: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    search: state.search
})
export default withRouter(connect(
    mapStateToProps,
    { getSearches, logout }
)(Navbar));