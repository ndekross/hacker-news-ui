import React, { Component, Fragment } from "react"
import Loading from "./Loading"
import Post from "./Post"
import { css } from "emotion"
import { vr, ms } from "../fonts"
import { IndexProvider } from "../contexts/theme"
import { fetchFeed } from "../utils/api"

export default class Feed extends Component {
  state = {
    posts: [],
    loading: true
  }
  componentDidMount() {
    fetchFeed(this.props.type).then(data => {
      this.setState({
        posts: data.filter((id, index) => index < 25),
        loading: false
      })
    })
  }
  render() {
    const { posts, loading } = this.state
    return (
      <IndexProvider value={this.state.posts}>
        <Fragment>
          {loading && <Loading />}
          <ol
            className={css`
              margin-top: ${vr(3)}rem;
            `}>
            {posts.map((post, index) => (
              <Post key={post} id={post} index={index} />
            ))}
          </ol>
        </Fragment>
      </IndexProvider>
    )
  }
}
