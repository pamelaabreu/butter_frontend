import React from 'react';
import { Redirect } from 'react-router-dom';

/*   SERVICES   */
import ImageService from '../../services/imgUpload';
import CreatePostService from '../../services/createPost';
import TagService from '../../services/tag';

/*   CONTEXT   */
import AuthContext from '../../contexts/auth';

/*   CSS   */
import './createPost.css';

class CreatePost extends React.Component {
    static contextType = AuthContext;

    state = {
        content_url:null,
        title:null,
        tags:[],
        tag_id: null,
        summary:null,
        caption: null,
        error: ''
    }

    handleFileInput = e => this.setState({ [e.target.name]: e.target.files[0], error:'' })

    handleChange = e => this.setState({ [e.target.name]: e.target.value.trim() })

    handleTag = e => this.setState({ tag_id: e })

    handleSubmit = e => {
        e.preventDefault();

        const {content_url, title, tag_id, summary, caption} = this.state;
        
        if(content_url){
            ImageService.imageUpload(content_url, this.context.firebaseUid)
            .then(url => CreatePostService.creatPost(this.context.dbUid, tag_id, url, title, summary, caption))
            .then(res => res.data.data)
            .then(data => this.props.history.push(`/viewPost/${data}`))
            .catch(err => {
                this.setState({error: 'Trouble uploading post. Try Again!'})
            })
            
        } else this.setState({error: 'Please upload an image to post.'})
    }

    componentDidMount () {
        TagService.getAllTags().then(tags => this.setState({ tags }))
        .catch(err => this.setState({ tags: [] }))
    }

    render () {
        const displayRequiredError = this.state.error === '' ? null : <p className='createPostInputTitle' role="alert">{this.state.error}</p>
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
                    {displayRequiredError}
                    <button type="submit" className='createPostSubmit' onClick={this.handleSubmit}>Post</button>
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

export default CreatePost;