import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/navbar";
import Counters from "./components/counters";

class App extends Component {
	state = {
		counters: [
			{
				id: 1,
				value: 4,
			},
			{
				id: 2,
				value: 0,
			},
			{
				id: 3,
				value: 0,
			},
			{
				id: 4,
				value: 0,
			},
		],
	};

	handleReset = () => {
		// console.log("Reset karo");
		const counters = this.state.counters.map((c) => {
			c.value = 0;
			return c;
		});
		this.setState({ counters });
	};

	handleDelete = (counterid) => {
		console.log("Event handler is :", counterid);
		const counters = this.state.counters.filter((c) => c.id != counterid);
		this.setState({ counters });
	};

	handleIncrement = (increments) => {
		// console.log(increments);
		const counters = [...this.state.counters];
		const index = counters.indexOf(increments);
		// console.log(index);
		counters[index] = { ...increments };
		counters[index].value++;
		this.setState({ counters });
	};

	render() {
		return (
			<React.Fragment>
				<NavBar
					totalCounters={this.state.counters.filter((c) => c.value > 0).length}
				/>
				;
				<main className="container">
					<Counters
						counters={this.state.counters}
						onReset={this.handleReset}
						onIncrement={this.handleIncrement}
						onDelete={this.handleDelete}
					/>
				</main>
			</React.Fragment>
		);
	}
}

export default App;
