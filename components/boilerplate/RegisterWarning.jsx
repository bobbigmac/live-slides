RegisterWarning = React.createClass({
	render() {
		if(!Meteor.userId() && this.props.show) {
			return <div className="text-right">
				<div className="alert-plain" role="alert">
					<i className="glyphicon glyphicon-exclamation-sign pull-right hidden" aria-hidden="true"></i>
				  <span>{this.props.message || this.props.children}</span>
				</div>
			</div>
		}
		return <span />;
	}
});