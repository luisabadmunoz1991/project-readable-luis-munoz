import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { fetchPosts }from '../actions/postsAction'
import { selectCategory } from '../actions/selectorsAction'
import OnePost from './OnePost'
import SortSelector from './SortSelector'
import SortPosts from './SortPosts'

class ShowPosts extends Component {

  componentDidMount(){
    this.props.fetchPosts()
    const category = this.props.match.params.category
    this.props.selectCategory(category)
  }

  postsToShow = (posts, category, sortCategory) => {
    const sortedPosts = SortPosts(posts, sortCategory) 
    return (category !== undefined && posts !== undefined) 
    ?  sortedPosts.filter((post) => post.category === category)
    :  posts
  }

  render() {
    const { posts } = this.props.posts
    const category = this.props.match.params.category
    const { sortCategory } = this.props.sortCategory
    const showBody = false
    const showPosts = this.postsToShow(posts, category, sortCategory)

    return (
      <div>

        <SortSelector />
      
        { (posts !== undefined && showPosts.length !== 0)
          ? (<div className="post">
              <div className="post-list">
                  {showPosts.map((post)=>
                    <div key={post.id} >
                      <OnePost
                        post={post}
                        showBody={showBody}
                        onVoting={() => {this.voting()}}
                      />
                    </div>
                )}
              </div>
            </div>)
          : (<div className='detail-not-found'>
              sorry, no posts available <br />
              please add a discussion
            </div>) }
    
      </div>
    )
  }
}

const mapStateToProps = ({ posts, selectCategory, sortCategory }) => {
  return { posts, selectCategory, sortCategory }
}

export default connect(
  mapStateToProps,
  { fetchPosts, selectCategory }
)(ShowPosts)
