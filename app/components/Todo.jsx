var React = require('react');

var Todo = React.createClass({
	render: function() {
		var {id, text, completed} = this.props;
		// var completed = this.props.completed;
		return (
			<div onClick={() => {
				this.props.onToggle(id);
			}}>
				<input type="checkbox" checked={completed}/>
				{text}
			</div>
		);
	}	
});

module.exports = Todo;