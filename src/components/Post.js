import React, { Component, Fragment } from "react"
import { number } from "prop-types"
import Loading from "./Loading"
import { css } from "emotion"
import { Link } from "react-router-dom"
import smartquotes from "smartquotes"
import { fetchItem } from "../utils/api"
import { ms, vr } from "../fonts"
import { hyphenate } from "hyphen/en"
import { ColorProvider } from "../contexts/colors"
import { textStyles } from "../styles"

const styles = {
  container: css`
    padding: 0 10% 0 2%;
    display: flex;
    align-items: center;
    position: relative;
  `,
  heading: css`
    ${textStyles.largeTitle};
    ${textStyles.link};
    padding: ${vr(1.5)}rem 0;
    margin-left: 1rem;
    text-decoration: none;
    color: black;
  `,
  meta: css`
    margin-top: ${vr(0.5)}rem;
  `,
  score: css`
    padding: ${vr(1)}rem 0;
    font-size: ${ms(3)}rem;
    @media screen and (min-width: 40rem) {
      font-size: ${ms(4)}rem;
    }
    align-self: center;
    writing-mode: vertical-lr;
    transform: rotate(180deg);
  `,
  comments: css`
    height: 100%;
    width: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    transform: rotate(180deg);
    writing-mode: vertical-lr;
    opacity: 0.25;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
  `
}

export default class Post extends Component {
  state = {
    post: null,
    loading: true,
    color: `hsl(${this.props.index * 14.4}, 60%, 80%)`
  }
  static propTypes = {
    id: number.isRequired
  }
  componentDidMount() {
    const { id } = this.props
    fetchItem(id)
      .then(post => {
        this.setState({ post, loading: false })
        return post
      })
      .then(({ title }) => hyphenate(title))
      .then(title => {
        this.setState(({ post }) => {
          post.title = title
          return post
        })
      })
  }
  render() {
    const { post, loading, color } = this.state
    const { index } = this.props
    return (
      <Fragment>
        {loading && (
          <li className={styles.container} style={{ background: color }}></li>
        )}
        {post && (
          <li className={styles.container} style={{ background: color }}>
            <span
              className={styles.score}
              style={{ color: `hsl(${index * 14.4}, 90%, 50%)` }}>
              {post.score}{" "}
            </span>
            <a className={styles.heading} href={post.url} target="_blank">
              {smartquotes(post.title)}
            </a>
            <Link
              to={{
                pathname: `/stories/${post.id}`,
                index
              }}>
              <span className={styles.comments}>{post.descendants}</span>
            </Link>
          </li>
        )}
      </Fragment>
    )
  }
}
