import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
import "./App.css";
import ipfs from "./ipfs";

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			ipfsHash: "",
			// storageValue: 0,
			web3: null,
			buffer: null,
			account: null,
			contract: null,
		};
		this.captureFile = this.captureFile.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount = async () => {
		try {
			// Get network provider and web3 instance.
			const web3 = await getWeb3();

			// Use web3 to get the user's accounts.
			const accounts = await web3.eth.getAccounts();
			console.log(accounts);

			// Get the contract instance.
			const networkId = await web3.eth.net.getId();
			console.log("Networjk ID", networkId);

			const deployedNetwork = SimpleStorageContract.networks[networkId];
			console.log("Deployed Network", deployedNetwork);

			const instance = new web3.eth.Contract(
				SimpleStorageContract.abi,
				deployedNetwork && deployedNetwork.address
			);

			console.log("Instance is :", instance);

			// Set web3, accounts, and contract to the state, and then proceed with an
			// example of interacting with the contract's methods.
			this.setState({ web3, accounts, contract: instance }, this.runExample);
		} catch (error) {
			// Catch any errors for any of the above operations.
			alert(
				`Failed to load web3, accounts, or contract. Check console for details.`
			);
			console.error(error);
		}
	};

	runExample = async () => {
		const { accounts, contract } = this.state;
		console.log("Contract is :", this.state.contract);
		console.log("Account is :", this.state.accounts[0]);
		const v = await contract.methods.get().call();
		console.log(v);
		// console.log("Account is :", this.accounts);
		// console.log("Contract is :", this.simpleStorage);
	};

	onSubmit(event) {
		event.preventDefault();
		console.log("On Submit");
		ipfs.files.add(this.state.buffer, (error, result) => {
			if (error) {
				console.log("Error hai ", error);
				return;
			}
			this.state.contract
				.set(result[0].hash, {
					from: this.state.account,
				})
				.then((result) => {
					console.log("Result kya hai???", result);
					//Get the value from Contract to proved i.e it is working.
					return this.setStatecontract.get.call(this.account);
				});
			this.setState({ ipfsHash: result[0].hash });
			console.log("IPFS HASH IS ", this.state.ipfsHash);
		});
	}

	captureFile(event) {
		console.log("Capture the file.......");
		event.preventDefault();
		const file = event.target.files[0]; //Change file information
		console.log(file);
		const reader = new window.FileReader();
		reader.readAsArrayBuffer(file);
		reader.onloadend = (result) => {
			this.setState({ buffer: Buffer(reader.result) });
			console.log("buffer ", this.state.buffer);
		};
	}
	render() {
		if (!this.state.web3) {
			return <div>Loading Web3, accounts, and contract...</div>;
		}
		return (
			<div className="App">
				<nav className="navbar pure-menu pure-menu-horizontal">
					<a href="#" className="pure-menu-heading pure-menu-link">
						IPFS FILE STORAGE
					</a>
				</nav>

				<main className="container">
					<div className="pure-g">
						<div className="pure-u-1-1">
							<h1>Your Images</h1>
							<p>This Images is stored on IPFS & The Ethereum Blockchain</p>
							<img
								src={`https://ipfs.io/ipfs/${this.state.ipfsHash}`}
								alt=""
								// style={{ width: 20, height: 20 }}
							/>

							<h2>Upload Images</h2>
							<form action="" onSubmit={this.onSubmit}>
								<input type="file" onChange={this.captureFile} />
								<input type="submit" />
							</form>
							{/* <p>
								If your contracts compiled and migrated successfully, below will
								show a stored value of 5 (by default).
							</p>
							//{" "}
							<p>
								// Try changing the value stored on <strong>line 40</strong> of
								App.js. //{" "}
							</p> */}
							<div>The stored value is: {this.state.storageValue}</div>
						</div>
					</div>
				</main>
			</div>
		);
	}
}

export default App;
