import React from 'react';
import './App.css';
import axios from 'axios';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			location: 'Santa Barbara',
			temperature: 65
		};
	}

	componentDidMount() {
		axios
			.get(
				`https://api.openweathermap.org/data/2.5/weather?q=${this.state
					.location}&appid=b5bbc1c8b1451890f01d16cbf82acee5&units=imperial`
			)
			.then((response) => {
				this.setState({
					location: response.data.name,
					temperature: response.data.main.temp.toFixed()
				});
				// console.log(response.data.main.temp.toFixed());
				// console.log(response.data.name);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		return (
			<div className="container d-flex flex-column align-items-center">
				<div className="input-group input-group-sm mt-5 mb-5">
					<div className="input-group-prepend">
						<span className="input-group-text" id="inputGroup-sizing-sm">
							Location
						</span>
					</div>
					<input
						type="text"
						className="form-control"
						aria-label="Small"
						aria-describedby="inputGroup-sizing-sm"
					/>
				</div>
				<div className="d-flex flex-column justify-content-center align-items-center mt-5 mb-auto">
					<h1>{this.state.temperature}</h1>

					<h4>{this.state.location}</h4>
				</div>
			</div>
		);
	}
}

export default App;
