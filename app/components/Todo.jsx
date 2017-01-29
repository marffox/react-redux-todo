import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

import * as actions from 'actions';

export class Todo extends React.Component {
	handleToggle () {
		var {dispatch, id, completed} = this.props;
		dispatch(actions.startToggleTodo(id, !completed));
	}
	handleDelete () {
		var {dispatch, id} = this.props;
		dispatch(actions.startDeleteTodo(id));
  	}
	render () {
		var {text, completed, createdAt, completedAt} = this.props;
		var todoClassName = completed ? 'todo todo-completed' : 'todo';
		var renderDate = () => {
			var message = 'Created ';
			var timeStamp = createdAt;

			if (completed) {
				message = 'Completed ';
				timeStamp = completedAt;
			}

			return message + moment.unix(timeStamp).format('MMMM Do YYYY @ h:mm a');
		};
		return (
			<div className={todoClassName}>
				<div className="todo__item" onClick={this.handleToggle.bind(this)}>
					<input type="checkbox" checked={completed}/>
				</div>
				<div className="todo__item" onClick={this.handleToggle.bind(this)}>
					<p>{text}</p>
					<p className="todo-subtext">{renderDate()}</p>
				</div>
				<div className="todo__item todo__item-button-action">
					<button className="alert button tiny float-right" onClick={this.handleDelete.bind(this)}>Delete</button>
				</div>
			</div>
		);
	}
};

export default connect()(Todo);