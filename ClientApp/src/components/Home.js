import React, { Component } from 'react';

export class Home extends Component {
  displayName = Home.name

  render() {
    return (
      <div>
        <h1>Welcome to Trips Manager!</h1>
        <p>Use this manager to manager your trips, by :</p>
        <ul>
          <li>Add a new trip</li>
          <li>Update a trip</li>
          <li>Delete a trip</li>
          <li>Show all the trips</li>
        </ul>
       </div>
    );
  }
}
