import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import AuthContext from '../../contexts/auth';
import NotificationService from '../../services/notifications';

export default class Notifications extends React.Component {
    static contextType = AuthContext;

    state = {
        notifs:[]
    }

    componentDidMount () {
        NotificationService.getNotifs(this.context.dbUid)
        .then(data => {
            const notifs = data.filter(e => {
                if(e.user_action_id !== this.context.dbUid){
                    return e;
                }
            })

            this.setState({ notifs })

        })
    }

    render () {
        const displayNotifs = this.state.notifs.map((e, i) => {
            if(e.notification_type.toLowerCase() === 'liked'){
                return <div key={i}>
                    <p><Link to={"/user/" + e.username}>{e.username}</Link> {e.notification_type} your photo.</p>
                    <Link to={"/viewPost/" + e.post_action_id} >
                        <div className='userProfileImg' style={{backgroundImage:"url(" + e.content_url + ")"}}></div>
                    </Link>
                </div>
            } else if (e.notification_type.toLowerCase() === 'commented'){
                return <div key={i}>
                <p><Link to={"/user/" + e.username}>{e.username}</Link> {e.notification_type} on your photo.</p>
                <Link to={"/viewPost/" + e.post_action_id} >
                        <div className='userProfileImg' style={{backgroundImage:"url(" + e.content_url + ")"}}></div>
                </Link>
            </div>
            } else if (e.notification_type.toLowerCase() === 'followed'){
                return <div key={i}> 
                <p><Link to={"/user/" + e.username}>{e.username}</Link> {e.notification_type} followwed you.</p>
            </div>
            }
        })
        
        return (
            <AuthContext.Consumer>
        {
          ({user}) => {
            if (user) {
              return <>
              {
                  this.state.notifs.length > 0 ? displayNotifs : <h1>No Notifications.</h1>
              }
              
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