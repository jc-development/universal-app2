import React, { Component } from 'react'
import { connect } from 'react-redux'
import NewsItemOverview from './news-item-overview'
import * as blogPostsAPI from './../../shared/OLD/api/blog-api'
import _ from 'lodash'
import store from './../../../store'

class News extends Component {

  constructor(props) {
    super(props)
    this.sideBarArray = []
    this.filteredBlogPostNodes = []
    this.state = {
        sideBar: false,
        filterTag: 'default'
    }

    this.handleTagFilter = this.handleTagFilter.bind(this)
  }

  componentWillMount () {
    blogPostsAPI.getBlogPostsFromShopify()
  }

  componentDidUpdate () {
    // check if we have tags for posts and setState for sideBar
    if (this.sideBarArray.length > 0 && this.state.sideBar === false)  {
    this.setState({sideBar: true})
    }
  }

  getBlogPosts() {
    // console.log('that.props.blogPosts: ', that.props.blogPosts);
    if (Array.isArray(this.props.blogPosts)) {

      // reset sideBarArray for conditional rendering (avoid duplication of tags)
      this.sideBarArray = []

      const blogPostNodes = this.props.blogPosts.map( (post, i) => {

        // find tags from blog posts and add to sideBarArray
        if (post.tags !== "" && post.tags !== undefined) {
            if (post.tags.indexOf(',') > -1) {
              const test = post.tags.split(',')
              test.map((tags, i) => {
                const clean = tags.replace(" ", "")
                this.sideBarArray.push(clean)

              })
            } else {
              this.sideBarArray.push(post.tags)
            }
        }

        return  <NewsItemOverview
              key={i}
              image={post.image.src}
              blogPostTitle={post.title}
              blogPostDate={post.published_at}
              blogPostSummary={post.body_html.replace(/<(?:.|\n)*?>/gm, '').split(" ").splice(0, 50).join(" ") + '...'}
              blogPostHandle={post.handle}
            />
      });
      return blogPostNodes;
    } else {
      return 'Loading news posts ...';
    }
  }

  createSideBar() {
    if (this.sideBarArray.length > 0) {
      const sideBarNodes = this.sideBarArray.map((item, i) => {
        return <li key={i} data-tag={item} className="sidebar-list-item" onClick={this.handleTagFilter}>{item}</li>
      })
      return sideBarNodes
    }
  }

  handleTagFilter (event) {
    var value = event.target.getAttribute('data-tag')
    this.setState({filterTag: value})
    switch (value) {

      case 'default':
        // Taken care of by conditional rendering
      break

      // Dynamic Case, needs to be last
      case value:

        const filteredBlogPosts = _.filter(this.props.blogPosts, function (post) {
          return _.includes(post.tags, value)
        })

        // console.log('filtered Post: ', filteredBlogPosts)

        this.filteredBlogPostNodes = filteredBlogPosts.map( (post, i) => {

          return  <NewsItemOverview
                key={i}
                image={post.image.src}
                blogPostTitle={post.title}
                blogPostDate={post.published_at}
                blogPostSummary={post.body_html.replace(/<(?:.|\n)*?>/gm, '').split(" ").splice(0, 50).join(" ") + '...'}
                blogPostHandle={post.handle}
              />
        });
      break
    }
   }

  render() {
    // console.log('hello: ', this.props.blogPosts)
    return (
      <div id="news">
        <h1 className='text-center'>Current News</h1>
        <div className="blog-post-content">


        <div className={this.state.sideBar ? "col-sm-9" : '' }>
          {this.state.filterTag === 'default' ? this.getBlogPosts() : this.filteredBlogPostNodes}
        </div>
        {this.state.sideBar ?
          <div className="col-sm-3">
            <h3 className="sidebar-title">Filter News</h3>
            <ul className="sidebar-list">
              <li data-tag="default" className="sidebar-list-item" onClick={this.handleTagFilter}> View All</li>
              {this.createSideBar()}
            </ul>
          </div>
          : ''
        }

        </div>
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    blogPosts: store.blogState.blogPosts
  }
}

export default connect(mapStateToProps)(News)
