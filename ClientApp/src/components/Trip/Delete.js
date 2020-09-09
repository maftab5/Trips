import React, {Component} from 'react';
import axios from 'axios';

export class Delete extends Component 
{
    constructor(props){
        super(props);

        this.state = {
            name:"",
            description : "",
            dateStarted:null,
            dateCompleted :null
        }
    }

    componentDidMount(){
        const {id} = this.props.match.params;
        const {history} = this.props;
        axios.get('api/Trips/SingleTrip/' +id)
           .then(trip => {
               const  response = trip.data;
               this.setState({
                   name: response.name,
                   description: response.description,
                   dateStarted: response.dateStarted,
                   dateCompleted: response.dateCompleted
               })
           })
    }
    onCancel = (e)=>{
        const {history} = this.props;
        history.push('/trips');

    }

    onConfirmation = (e) =>{
        const {id} = this.props.match.params;
        const {history} = this.props;

        axios.delete('api/Trips/deleteTrip/' + id)
            .then(result =>{
                history.push('/trips');
            })
    }


    render(){
        return(
            <div>
                <h2>Delete trip confimation</h2>
                <div className="card">
                    <div className="card-body">
                    <h2 className="card-title">
                        {this.state.name}
                    </h2>
                    <p className="card-text">
                        {this.state.description}
                    </p>
                    <button onClick={this.onCancel} className="btn btn-default">Cancel</button>
                    <button onClick={this.onConfirmation} className="btn btn-success">Confirm</button>
                    </div>
                    
                </div>
            </div>
        )
    }
}
