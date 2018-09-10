// @flow
import React from 'react'
import { Link } from 'react-router-dom'

/**
 * NotFound
 */

const NotFound = () => (
	<React.Fragment>
		<h2>Sorry, this page does not exist!</h2>
		<Link to="/">Go to the homepage</Link>
	</React.Fragment>
)

export default NotFound
