import React from 'react';
import { Redirect } from 'react-router-dom';
import AuthContext from '../../contexts/auth';
import NotificationService from '../../services/notifications';

export default class Notifications extends React.Component {
    static contextType = AuthContext;

    state = {
        notifs:[]
    }

    componentDidMount () {
        NotificationService.getNotifs(this.context.dbUid)
        .then(notifs => this.setState({ notifs }))
    }

    render () {
        return (
            <AuthContext.Consumer>
        {
          ({user}) => {
            if (user) {
              return <>
              <h1>{this.context.dbUid}</h1>
            </>
            } else {
              return <Redirect  to='/'/>
            }
          }
        }
      </AuthContext.Consumer>
        );
    }
}