import React, { Component, Fragment } from 'react'
import { Query } from "react-apollo";
import { Link } from 'react-router-dom';

import POSTS_QUERY from './Posts.graphql';

export default class Posts extends Component {
  render() {
    return (
      <div>
        <Link className="button" to={'/post/new'}>New Post</Link>
        <ul className="posts-listing">
          <Query query={POSTS_QUERY}>
            {({ data, loading, fetchMore}) => {
              if (loading) return 'Loading...';
              const { posts } = data;
              return (
                <Fragment>
                  {posts.map(post =>
                      <li key={post.id}>
                        <Link to={`/post/${post.id}`}>
                          {post.title}
                        </Link>
                      </li>
                  )}
                  <li><button onClick={() => fetchMore({
                    variables: { skip: posts.length },
                    updateQuery: (prev, { fetchMoreResult }) => {
                      if (!fetchMoreResult) return prev;
                      return Object.assign({}, prev, {
                        posts: [...prev.posts, ...fetchMoreResult.posts]
                      })
                    }
                  })}>Load More</button></li>
                </Fragment>
              )
            }}
          </Query>
        </ul>
      </div>
    )
  }
}
