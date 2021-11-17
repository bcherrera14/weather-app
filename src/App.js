import React from 'react';
import './App.css';
import axios from 'axios';
import { Form, Col, Button, Row } from 'react-bootstrap';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			location: 'Santa Barbara',
			temperature: null
		};
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	getWeatherData() {
		const baseURL = `https://api.openweathermap.org/data/2.5/weather?q=${this.state
			.location}&appid=b5bbc1c8b1451890f01d16cbf82acee5&units=imperial`;
		axios
			.get(baseURL)
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
				this.setState({
					location: 'Location Not Found',
					temperature: null
				});
			});
	}

	componentDidMount() {
		this.getWeatherData();
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.location !== this.state.location) {
			this.getWeatherData();
		}
	}

	onFormSubmit(event) {
		event.preventDefault();
		const searchTerm = event.target.searchTerm.value;
		this.setState({
			location: searchTerm
		});
		console.log(searchTerm);
	}

	render() {
		return (
			<div className="container d-flex flex-column align-items-center">
				<Form onSubmit={this.onFormSubmit}>
					<Form.Group as={Row} className="d- flex align-items-center justify-content-center">
						<Col sm={3} className="my-3">
							<Form.Label htmlFor="inlineFormInputName" visuallyHidden>
								Locaion
							</Form.Label>
							<Form.Control id="searchTerm" placeholder="Location" />
						</Col>
						<Col xs="auto" className="my-1">
							<Button type="submit">Submit</Button>
						</Col>
					</Form.Group>
				</Form>

				<div className="d-flex flex-column justify-content-center align-items-center mt-5 mb-auto">
					<h1>{this.state.temperature}</h1>

					<h4>{this.state.location}</h4>
				</div>
			</div>
		);
	}
}

export default App;
