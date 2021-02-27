import React, { Component } from "react";

class Counter extends Component {
	// state = {
	// 	value: this.props.counter.value,
	// 	// imageUrl: "https://picsum.photos/200",
	// 	// tags: [],
	// };

	styles = {
		fontSize: 50,
		fontWeight: "bold",
	};

	renderTags() {
		if (this.state.tags.length === 0) return <p>There are no Tags !</p>;

		return (
			<ul>
				{this.state.tags.map((tag) => (
					<li key={tag}>{tag}</li>
				))}
			</ul>
		);
	}

	// constructor() {
	// 	super();
	// 	console.log("Constructor", this);
	// 	this.handleIncrement = this.handleIncrement.bind(this);
	// }

	// handleIncrement = (product) => {
	// 	console.log(product);
	// 	// this.state.count++;
	// 	this.setState({ value: this.state.value + 1 });
	// };

	// handleDecrement = (product) => {
	// 	console.log(product);
	// 	this.setState({ value: this.state.value - 1 });
	// };

	render() {
		// console.log("Props Value is : ", this.props.value, "Id is ", this.props.id);

		return (
			<div>
				{this.props.children}
				{/* <img src={this.state.imageUrl} alt=" " /> */}
				<span style={this.styles} className={this.getBadgeClasses()}>
					{this.formatCount()}
				</span>

				<button
					onClick={() => this.props.onIncrement(this.props.counter)}
					// style={{ fontSize: 20 }}
					className="btn btn-secondary btn-sm"
				>
					Increment
				</button>

				<button
					className="btn btn-danger btn-sm m-2"
					onClick={() => this.props.onDelete(this.props.counter.id)}
				>
					Delete
				</button>
				{/* {this.state.tags.length === 0 && "Please Create a New Tags"}
				{this.renderTags()} */}
			</div>
		);
	}

	getBadgeClasses() {
		let classes = "badge m-2 badge-";
		classes += this.props.counter.value === 0 ? "warning" : "primary";
		return classes;
	}

	formatCount() {
		const { value } = this.props.counter;
		const x = "Zero";
		return value === 0 ? x : value;
	}
}

export default Counter;
