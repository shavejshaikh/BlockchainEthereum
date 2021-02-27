import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import Web3 from "web3";
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from "./config";

class App extends Component {
	state = {};

	componentWillMount() {
		console.log("Componenet Mount");
		this.loadBlockchainData();
	}

	async loadBlockchainData() {
		const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
		const network = await web3.eth.net.getNetworkType();
		console.log("Network is :", network);
		// Fetch Account
		const account = await web3.eth.getAccounts();
		this.setState({ account: account[0] });
		const todolist = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS);
		console.log(account[0]);
		console.log("todolist", todolist);

		const taskCount = await todolist.methods.taskCount().call();
		this.setState({ taskCount });

		for (var i = 1; i <= taskCount; i++) {
			const task = await todolist.methods.tasks(i).call();
			this.setState({ tasks: [...this.state.tasks, task] });
		}

		console.log("tasks :", this.state.tasks);
	}

	constructor(props) {
		super(props);
		this.state = { account: "", taskCount: 0, tasks: [] };
		// this.handleChnage = this.handleChnage.bind(this);
		// this.handleSubmit = this.handleSubmit.bind(this);
	}
	render() {
		return (
			<div>
				<nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
					<a
						className="navbar-brand col-sm-3 col-md-2 mr-0"
						href=""
						target="_blank"
					>
						Todo List
					</a>
					<ul className="navbar-nav px-3">
						<li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
							<small>
								<a className="nav-link" href="#">
									<span id="account"></span>
								</a>
							</small>
						</li>
					</ul>
					<a style={{ color: "white" }}>Account is: {this.state.account}</a>
				</nav>

				<div className="container-fluid">
					<div className="row">
						<main
							role="main"
							className="col-lg-12 d-flex justify-content-center"
						>
							<div id="loader" className="text-center">
								<p className="text-center">Loading...</p>
							</div>
							<div id="content">
								<form>
									<input
										id="newTask"
										type="text"
										className="form-control"
										placeholder="Add task..."
										required
									/>
									<input type="submit" hidden="" />
								</form>
								<ul id="taskList" className="list-unstyled">
									<div className="taskTemplate" className="checkbox">
										<label>
											<input type="checkbox" />
											<span className="content">Task content goes here...</span>
										</label>
									</div>
								</ul>
								<ul id="completedTaskList" className="list-unstyled"></ul>
							</div>
						</main>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
