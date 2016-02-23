Table = React.createClass({
	render() {
		return (
			<table className={"table table-responsive table-hover "+this.props.tableClass}>
				<thead>
					<tr>
						{this.props.cols && this.props.cols.map(function(col, pos) {
							return <th key={col} className={"col-title-"+(pos+1)}>{col}</th>
						})}
					</tr>
				</thead>
				<tbody>
					{this.props.children}
				</tbody>
			</table>)
	}
});