import React, { Component } from 'react';
import axios from 'axios';

export class Update extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: '',
            dateStarted: null,
            dateCompleted: null
        }
    }
    componentDidMount() {
        var {id} = this.props.match.params;
        // console.log(id);
        axios.get(`api/Trips/SingleTrip/${id}`)
            .then(trip => {
                const response = trip.data;
                console.log(trip);
                this.setState({
                    name: response.name,
                    description: response.description,
                    dateStarted: new Date(response.dateStarted).toISOString().slice(0, 10),
                    dateCompleted: response.dateCompleted ? new Date(response.dateCompleted).toISOString().slice(0, 10) : null


                })
            })
    }
    onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({
            [name]: value
        })
    }
    onUpdateCancel = (e) =>{
        const {history} =this.props;
        history.push('/trips');
    }
    onSubmit = (e) => {
        e.preventDefault();
        const { history } = this.props;
        const {id} =  this.props.match.params;



        let tripObject = {
            
            name: this.state.name,
            description: this.state.description,
            dateStarted: new Date(this.state.dateStarted).toISOString(),
            dateCompleted: this.state.dateCompleted ? new Date(this.state.dateCompleted).toISOString() : null
        }
        axios.put('api/Trips/UpdateTrip/'+ id, tripObject)
            .then(result => {
                history.push('/trips');

            })
    }

    render() {
        return (
            <div className="trip-form" >
                <h3>Add new trip</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Trip name:  </label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={this.state.name || ""}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Trip description: </label>
                        <textarea
                            type="text"
                            className="form-control"
                            name="description"
                            value={this.state.description || ""}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="row">
                        <div className="col col-md-6 col-sm-6 col-xs-12">
                            <div className="form-group">
                                <label>Date of start:  </label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="dateStarted"
                                    value={this.state.dateStarted || ""}
                                    onChange={this.onChange}
                                />
                            </div>
                        </div>
                        <div className="col col-md-6 col-sm-6 col-xs-12">
                            <div className="form-group">
                                <label>Date of completion:  </label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="dateCompleted"
                                    value={this.state.dateCompleted || ""}
                                    onChange={this.onChange}
                                />
                            </div>
                        </div>
                    </div>


                    <div className="form-group">
                        <button onClick={this.onUpdateCancel} className="btn btn-default">Cancel</button>
                        <button type="submit" className="btn btn-success">Update</button>
                    </div>
                </form>
            </div>
        )
    }
}