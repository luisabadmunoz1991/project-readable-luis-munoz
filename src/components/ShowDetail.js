import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { fetchPosts, openPostDetail } from '../actions/postsAction'
import { fetchComments, addComment, countComments } from '../actions/commentsAction'
import { setVote } from '../actions/votingAction'
import OnePost from './OnePost'
import serializeForm from "form-serialize"
import uuid from "uuid"

class ShowDetail extends Component {

  componentDidMount () {
    const postId = this.props.match.params.id
    this.props.fetchComments(postId)
    this.props.fetchPosts()
      .then(() => {
        const { posts } = this.props.posts
        const post = posts.filter((post) => post.id === postId)
        this.props.openPostDetail(post.shift())
      })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { comments } = this.props.comments
    const count = comments.length + 1
    const parentId = this.props.match.params.id
    const newComment = serializeForm(event.target, {hash: true})
    const id = uuid()
    Object.assign(newComment, {id: id}, {parentId: parentId})
    this.props.addComment(newComment)
    this.props.countComments(count, parentId)  //counting comments
    this.props.setVote(id, 'upVote', 'comments', 0)  //set voteScore to 1
    this.addForm.reset()
  }

  render () {
    const { openPost } = this.props.openPost
    const { comments } = this.props.comments
    const showBody = true

    return (
      <div>
        { openPost !== undefined
          ? (<div className='post'>
                <div className='post-list'>
                    <OnePost
                        post={openPost}
                        showBody={showBody}
                        history={this.props.history}
                      />
                </div>
              </div>)
          : (<div className='detail-not-found'>
              sorry, the post was deleted <br />
              (404 not found)
            </div>) }

        { comments !== undefined && openPost !== undefined && (
        <div className='comment'>
          <div className='post-list'>
            {comments.map((comment) =>
              <div key={comment.id} >
                <OnePost
                  post={comment}
                  showBody={showBody}
                  />
              </div>
            )}
          </div>
        </div>)}

        <div>
          { openPost !== undefined && (
          <container className='Add-post'>
            <form onSubmit={this.handleSubmit}
                  className='add-form'
                  ref={(addForm) => this.addForm = addForm} >
              <div className='add-details'>
                <div>
                  <input type='text' name='author' placeholder='Your name' required />
                  <textarea type='text' className='add-text-area' name='body'
                    placeholder='Message' required />
                </div>
                <button className='add-discussion'>Add</button>
              </div>
            </form>
          </container>)}
        </div>
      </div>

    )
  }
}

const mapStateToProps = ({ posts, openPost, comments }) => {
  return { posts, openPost, comments }
}

export default connect(
  mapStateToProps,
  { fetchPosts, openPostDetail, fetchComments, addComment, 
    countComments, setVote }
)(ShowDetail)
