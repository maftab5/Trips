import React, { Component,useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getAllTrips } from '../../actions/tripActions';

export class Trips extends Component{

    // const [trips,setTrips] = useState("");
    // const [loading, setLoading] = useState(true)

    constructor(props) {
        super(props);

        this.state = {
            trips: "",
            loading: true
        }
    }

    // useEffect((props,prevProps)=>{
    //     props.getAllTrips();

    //     populateTripData();

    //     // if (prevProps.trips.data != this.props.trips.data) {
    //     //     setTrips(this.props.trips.data);
    //     // }

    // })
    componentDidMount() {
        // this is before redux
        this.populateTripData();
        /* using redux */
       

        //  let ur = 'https://jsonplaceholder.typicode.com/todos'
        //  fetch(ur)
        //         .then((result) => {
        //             console.log("working");

        //                 let response = result.json();
        //                 console.log("this is data" +response);
        //                 this.setState({
        //                     trips: response,
        //                     loading:false
        //         })
        //         .then((json) => {
        //             console.log(json);
        //         })
        //     })

    }

    /*
    for redux
    */
    // componentDidUpdate(prevProps) {
    //     if (prevProps.trips.data != this.props.trips.data) {
    //         this.setState({ trips: this.props.trips.data });
    //     }
    // }

     onTripUpdate = (id) => {
        const { history } = this.props;
        history.push('/update/' + id)

    }
     onTripDelete = (id) => {
        const { history } = this.props;
        history.push('/delete/' + id)
    }

    /* 
    this is before redux to fetch data
    */
     populateTripData = () =>{

        const url = 'https://jsonplaceholder.typicode.com/todos';
        const durl = 'api/Trips/GetTrips';
        axios.get(durl)
            .then((response) => {

                this.setState({ trips: response.data, loading: false });
            })
            // .then((json) => {

            // })
            .catch((error) => console.log(error));

    }


    renderAllTripsTable = (trips) =>{
        return (
            <table className="table table-striped table-condensed">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Date Started</th>
                        <th>Date Completed</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        trips.map(trip => (
                            <tr key={trip.id}>
                                <td>{trip.name}</td>
                                <td>{trip.description}</td>
                                <td>{trip.dateStarted ?
                                    (new Date(trip.dateStarted).toISOString().slice(0, 10)) :
                                    ('-')}</td>
                                <td>{trip.dateCompleted ?
                                    new Date(trip.dateCompleted).toISOString().slice(0, 10) :
                                    ' - '}</td>
                                <td>
                                    <div className="form-group">
                                        <button className="btn btn-success" onClick={() => this.onTripUpdate(trip.id)}>Update</button>
                                        <button className="btn btn-danger" onClick={() => this.onTripDelete(trip.id)}>Delete</button>
                                    </div>
                                </td>

                            </tr>
                        ))
                    }

                </tbody>
            </table>
        )
    }

     render() {


        /* before redux */
        let content = this.state.loading ? (
            <p><em>Loading...</em></p>
        ) : (
                this.renderAllTripsTable(this.state.trips)
            )
/*reducers  */
        // let content = this.props.trips.loading ? (
        //     <p>
        //         <em>Loading ..</em>
        //     </p>
        // ) : (
        //         this.state.trips.length && this.renderAllTripsTable(this.state.trips)
        //     );

        return (
            <div>
                <h1>All Trips</h1>
                <p>Here you can see all the trips</p>
                {content}
            </div>
        )
    }

 }

const mapStateToProps = ({ trips }) => ({
    trips
});

export default connect(mapStateToProps, { getAllTrips })(Trips);