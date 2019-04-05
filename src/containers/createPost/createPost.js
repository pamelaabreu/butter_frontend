import React from 'react';
import firebase from '../../firebase';
import axios from 'axios';
import AuthContext from '../../contexts/auth';
import { Redirect } from 'react-router-dom';
import './createPost.css';

export default class CreatePost extends React.Component {

    state = {
        content_url:{},
        title:'',
        tags:[],
        tag_id: -1,
        summary:'',
        caption: '',
        error: ''
    }

    handleFileInput = e => this.setState({ [e.target.name]: e.target.files[0] })

    handleChange = e => this.setState({ [e.target.name]: e.target.value.trim() })

    handleTag = e => this.setState({ tag_id: e })

    componentDidMount () {
        axios.get(`http://localhost:3000/tag/all`)
        .then(res => this.setState({ tags: res.data }))
        .catch(err => this.setState({ tags: [] }))
    }

    render () {
        const displayPostImgInput = <div className='createPostInputBox' style={{border: 0, padding:'0'}}>
            <label className='createPostInputTitle' style={{padding:'0'}}>Upload Image</label>
            <input className='createPostInput createPostInputFile' type='file' name='content_url' onChange={this.handleFileInput} />
        </div>
        const displayTitleInput = <div className='createPostInputBox'>
            <form>
                <textarea className='createPostInput' name='title' placeholder='Title' onChange={this.handleChange}></textarea>
            </form>
        </div>
        const displaySummary = <div className='createPostInputBox'>
            <form>
                <textarea className='createPostInput createPostInputSummary' name='summary' placeholder='Write what you want to say...' onChange={this.handleChange}></textarea>
            </form>
        </div>
        const displayCaption = <div className='createPostInputBox'>
            <form>
                <textarea className='createPostInput' name='caption' placeholder='Sum this post in six words...' onChange={this.handleChange}></textarea>
            </form>
        </div>
        const tagImg = this.state.tags.map((e, i) => {
            return (
                <div className='dropdown-content' key={i} style={{backgroundImage:`url(${e.image_url})`, display:'block', height:'100px', width:'100px', zIndex:'9999'}}>
                    {/* <img src={e.image_url} alt={e.topic_name}/> */}
                    {/* <p className='dropdown-style'>{e.image_url}</p> */}
                </div>
            );
        });
        const tagButtons = this.state.tags.map((e, i, a) => {
            return (
                <>
                    <div key={i} className='createPostTagButton' onClick={() => this.handleTag(e.id)}>
                       {(this.state.tag_id === i+1) ?    
                            <p style={{color: 'firebrick'}}>{`{${e.topic_name}}`}</p>
                                : 
                            <p>{`{${e.topic_name}}`}</p>
                        }
                    </div>
                </>
            )
        });
  
        const displayForm = <>
            <div style={{position:'relative'}}>
                <div className='createPostBox'>
                    {displayPostImgInput}
                    {displayTitleInput}
                    {displaySummary}
                    {displayCaption}
                    <div className='createPostFlex createPostInputBox'>
                        <label className='createPostInputTitle'>Choose a Tag</label>
                        <div className='createPostDropdown'>
                            {tagButtons}
                        </div>
                    </div>
                    <button type="submit" className='createPostSubmit' onClick={this.handleSubmit}>Sign Up</button>
                </div>
            </div>
        </>

        return(
            <AuthContext.Consumer>
                {
                    ({user}) => {
                        if(user){
                            return displayForm;
                        } else {
                            return <Redirect to='/' />
                        }
                    }
                }
            </AuthContext.Consumer>
        );   
    }
}