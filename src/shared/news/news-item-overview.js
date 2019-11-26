import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import store from './../../../store'
import _ from 'lodash'
import * as blogTypes from '../../../actions/blog-action-types'

class NewsItemOverview extends Component {

  constructor (props) {
    super(props)

    this.handleViewPost = this.handleViewPost.bind(this)

  }

  handleViewPost () {
    const newsItemTarget = this.props.blogPostHandle
    const newsItemSelected = _.find(this.props.blogPosts, {'handle': newsItemTarget})
    // console.log('Target Handle: ', newsItemTarget)
    // console.log('Target Blog Post Object: ', newsItemSelected)

    store.dispatch({
      type: blogTypes.SET_SELECTED_BLOG_POST,
      selectedBlogPost: newsItemSelected
    })
  }

  render() {
    if (this.props.blogPostDate !== 'loading') {
      var date = new Date(this.props.blogPostDate)
      var formattedDate = date.toLocaleDateString()
    }

    return (
      <div className="row news-item">
          <h2 className='col-md-12'><Link className='blog-post-link' onClick={this.handleViewPost} to={'news/' + this.props.blogPostHandle}>{this.props.blogPostTitle}</Link></h2>
          <p className='col-md-12'>Date Posted: {formattedDate}</p>
          <img src={this.props.image} className='img-responsive col-md-4' />
          <p className='col-md-8'>{this.props.blogPostSummary}</p>
          <Link className='blog-post-link col-md-8' onClick={this.handleViewPost} to={'news/' + this.props.blogPostHandle}>Read More <i className="fa fa-long-arrow-right"></i></Link>
      </div>
    )
  }
}


const mapStateToProps = (store) => {
  return {
    blogPosts: store.blogState.blogPosts
  }
}

export default connect(mapStateToProps)(NewsItemOverview)
