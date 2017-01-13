import React from 'react';
import * as Redux from 'react-redux';

import * as actions from 'actions';

export class Login extends React.Component {
	constructor (props) {
		super(props);
		this.onLogin = this.onLogin.bind(this);//se puede hacer de dos maneras, reescribiendo el constructor como aqui o bien haciendo el bind directamente en button, como en addTodo.jsx
	}
	onLogin () {
		var {dispatch} = this.props;

		dispatch(actions.startLogin());
	}
	render () {//es lo mismo que render: function() {} en es6
		return (
			<div>
				<h1 className="page-title">Shopping List App</h1>
				<div className="row">
					<div className="columns small-centered small-10 medium-6 large-4">
						<div className="callout callout-auth">
							<h3>Login</h3>
							<p>Login with GitHub account below</p>
							<button className="button" onClick={this.onLogin}>Login with GitHub</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

export default Redux.connect()(Login);