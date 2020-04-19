import React, { Component, Fragment } from "react"
import Loading from "./Loading"
import { fetchItem, fetchFeed } from "../utils/api"
import { css } from "emotion"
import HTMLParser from "react-html-parser"
import { vr, ms } from "../fonts"
import moment from "moment"
import { smartquotes } from "smartquotes"
import marked from "marked"
import { hyphenate } from "hyphen/en"
import Text from "../utils/text"
import { textStyles } from "../styles"

const styles = {
  container: css`
    margin-top: ${vr(3)}rem;
    padding: ${vr(3)}rem 5% ${vr(6)}rem;
    background: black;
  `,
  heading: css`
    ${textStyles.largeTitle};
    ${textStyles.link};
    margin: ${vr(0.5)}rem 0;
    font-weight: 800;
    color: black;
  `,
  score: css`
    display: flex;
    border-top: 0.2rem solid black;
    justify-content: space-between;
    margin-top: ${vr(0.5)}rem;
    .score {
      font-size: ${ms(0)}rem;
      margin-right: ${vr(0.5)}rem;
    }
    .score-number {
      font-size: ${ms(3)}rem;
      display: block;
      font-weight: 800;
    }
  `,
  comment: css`
    ${textStyles.comment}
    margin-top: ${vr(1)}rem;
    padding-left:${vr(0.5)}rem;
    overflow-x: hidden;
  `,
  aside: css`
    padding: ${vr(0.5)}rem ${vr(1)}rem ${vr(2)}rem 0;
    @media screen and (min-width: 40rem) {
      margin: 0 5%;
      margin-top: -3rem;
    }
    margin: 0 2.5%;
    margin-top: -3rem;
  `,
  author: css`
    ${textStyles.caption};
    font-weight: 600;
    margin-bottom: -${vr(1)}rem;
  `,
  button: css`
    appearance: none;
    outline: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    color: black;
    position: relative;
    top: -0.1rem;
    font-weight: 600;
    margin-left: 0.5rem;
    letter-spacing: 0.05rem;
  `,
  tray: css`
    display: flex;
    position: relative;
    align-items: baseline;
    opacity: 0.75;
    ${textStyles.caption};
    font-style: italic;
    margin-top: ${vr(0.25)}rem;
    max-width: 50ch;
  `
}

class Comment extends React.Component {
  state = {
    comment: null,
    open: true
  }
  componentDidMount() {
    fetchItem(this.props.id).then(comment => this.setState({ comment }))
  }
  render() {
    const { level } = this.props
    const { comment, open } = this.state
    return (
      <Fragment>
        {comment && !comment.deleted && (
          <div
            className={css`
              ${level > 1 &&
              css`
                margin-top: ${vr(1)}rem;
                border-left: 1px dashed rgba(255, 255, 255, 0.25);
              `}
              ${styles.comment}
            `}>
            <span className={styles.author}>{comment.by}</span>
            {comment.text &&
              HTMLParser(marked(comment.text, { smartypants: true }))}
            <div className={styles.tray}>
              <span className={styles.timestamp}>
                {moment(comment.time * 1000).fromNow()}
              </span>
              {comment.kids && (
                <button
                  title={open ? "Hide comments" : "Show comments"}
                  className={styles.button}
                  onClick={() => this.setState({ open: open ? false : true })}>
                  [&nbsp;{open ? `−` : `+${comment.kids.length}`}
                  &nbsp;]
                </button>
              )}
            </div>
            {comment.kids && (
              <div style={{ display: open ? "block" : "none" }}>
                {comment.kids.map(id => (
                  <Comment
                    className={styles.innerComment}
                    level={level + 1}
                    key={id}
                    id={id}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </Fragment>
    )
  }
}

export default class Story extends Component {
  state = {
    story: null,
    loading: true,
    comments: null,
    index: this.props.location.index
  }

  componentDidMount() {
    if (!this.props.location.color) {
      fetchFeed("top").then(data => {
        let index = data.indexOf(Number(this.props.match.params.id))
        if (index > 25 || index < 0) index = 0
        this.setState({ index })
      })
    }
    fetchItem(this.props.match.params.id).then(story => {
      this.setState({
        story,
        loading: false
      })
      return story
    })
  }

  render() {
    const { story, loading, index } = this.state
    return (
      <Fragment>
        {loading && <Loading text="Fetching the story" />}
        {story && (
          <Fragment>
            <article
              className={styles.container}
              style={{ background: `hsl(${index * 14.4}, 60%, 80%)` }}>
              <div>
                Story by
                <span style={{ color: `hsl(${index * 7.2}, 90%, 40%)` }}>
                  {" "}
                  {story.by}{" "}
                </span>
                submitted {moment(story.time * 1000).fromNow()}
              </div>

              <a className={textStyles.link} href={story.url} target="_blank">
                <h2 className={styles.heading}>{story.title}</h2>
              </a>
              <div className={styles.score}>
                <span className="score">score</span>
                <span className="score-number">{story.score}</span>
              </div>
              {story.text && (
                <div className={textStyles.body}>{HTMLParser(story.text)}</div>
              )}
            </article>
            {story.kids && (
              <aside
                className={styles.aside}
                style={{
                  borderTop: `.5rem solid hsl(${index * 28.8}, 100%, 80%)`,
                  background: `hsl(${index * 28.8}, 30%, 80%)`
                }}>
                {story.kids.map(id => (
                  <Comment level={1} key={id} id={id} />
                ))}
              </aside>
            )}
          </Fragment>
        )}
      </Fragment>
    )
  }
}
