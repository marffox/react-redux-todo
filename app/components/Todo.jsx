var React = require('react');
var moment = require('moment');

var Todo = React.createClass({
	render: function() {
		var {id, text, completed, createdAt, completedAt} = this.props;
		// var completed = this.props.completed;
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
			<div onClick={() => {
				this.props.onToggle(id);
			}}>
				<input type="checkbox" checked={completed}/>
				<p>{text}</p>
				<p>{renderDate()}</p>
			</div>
		);
	}
});

module.exports = Todo;