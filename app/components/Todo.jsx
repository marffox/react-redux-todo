import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

import * as actions from 'actions';

export class Todo extends React.Component {
	render () {
		var {id, text, completed, createdAt, completedAt, dispatch} = this.props;
		//var completed = this.props.completed;
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
			<div className={todoClassName} onClick={() => {
				dispatch(actions.startToggleTodo(id, !completed));
			}}>
				<div>
					<input type="checkbox" checked={completed}/>
				</div>
				<div>
					<p>{text}</p>
					<p className="todo__subtext">{renderDate()}</p>
				</div>
			</div>
		);
	}
};
// var somevar = require(); ---> somevar is the default
export default connect()(Todo);//conectamos Todo component con el store
//aqui no necesitamos llamar al state porque todo lo que necesitamos es el todo, que lo cogemos de todoList