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
        tag_id: 0,
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
        const displayPostImgInput = <div className='createPostFlex'>
            <label className='createPostInputTitle'>Post Image</label>
            <input className='createPostInput createPostInputFile' type='file' name='content_url' onChange={this.handleFileInput} />
        </div>
        const displayTitleInput = <div className='createPostFlex'>
            <label className='createPostInputTitle'>Title</label>
            <input className='createPostInput createPostInputFile' type='text' name='title' onChange={this.handleChange} />
        </div>
        const displaySummary = <div className='createPostFlex'>
            <form>
                <textarea className='createPostInput createPostInputSummary' placeholder='Write what you want to say...' onChange={this.handleChange} name='summary' ></textarea>
            </form>
        </div>
        const displayCaption = <div className='createPostFlex'>
            <form>
                <textarea className='createPostInput' placeholder='Sum this post in six words...' onChange={this.handleChange} name='caption' ></textarea>
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
        const tagButtons = this.state.tags.map((e, i) => {
            return (
                <>
                    <div key={i} className='createPostTagButton' style={{padding:'20px', border:'1px solid black'}} onClick={() => this.handleTag(e.id)}>
                        <p>{e.topic_name}</p>
                    </div>
                </>
            )
        });
  
        const displayForm = <>
            <div style={{position:'relative'}}>
                <div className='createPostBox'>
                    {displayPostImgInput}
                    {displayTitleInput}
                    <div style={{width:'100%'}}>
                        <label className='createPostInputTitle'>Choose a Tag</label>
                        <div className='createPostDropdown'>
                            {tagButtons}
                        </div>
                    </div>
                    {displaySummary}
                    {displayCaption}
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