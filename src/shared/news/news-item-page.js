import React, { Component } from 'react'
import store from './../../../store'
import { connect } from 'react-redux'
import axios from 'axios'
import * as blogPostAPI from './../../shared/OLD/api/blogPost-api'

class NewsItemPage extends Component {

  constructor(props) {
    super(props)

    this.postContent = null
    this.postContentImg = null

  }

  componentWillMount () {
    if (Array.isArray(this.props.selectedBlogPost)) {
      // console.log('launch')
      blogPostAPI.getBlogPostFromShopify()
    }
  }

  componentDidUpdate () {

        this.postContentImg = document.querySelectorAll('img')
        Array.prototype.forEach.call(this.postContentImg, element => {
          if (element.classList.contains("img-responsive")) {

          }
          else {
            element.classList.add('img-responsive')
          }
        });
  }

  render() {
    console.log(this.props.selectedBlogPost.image)
    var selectedDescription
    if (Array.isArray(this.props.selectedBlogPost)) {
    } else {
      selectedDescription = this.props.selectedBlogPost.body_html.replace(/<(?:.|\n)*?>/gm, '').split(" ").splice(0, 50).join(" ") + '...'
    }

    return (
      <div id="news-page">
        <h1 className='text-center'>{this.props.selectedBlogPost.title}</h1>
        {this.props.selectedBlogPost.image !== undefined ? <img src={this.props.selectedBlogPost.image.src} className='img-responsive col-md-4' />: null}
        <div id="blogContent" className="blog-post-content" dangerouslySetInnerHTML={{__html: this.props.selectedBlogPost.body_html}}>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    blogPosts: store.blogState.blogPosts,
    selectedBlogPost: store.blogState.selectedBlogPost
  }
}

export default connect(mapStateToProps)(NewsItemPage)
