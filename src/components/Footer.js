import React, { Component } from "react"
import { css } from "emotion"
import { vr, ms } from "../fonts"
import { whitespace, textStyles } from "../styles"

const styles = {
  container: css`
    width: 100%;
    display: flex;
    background: black;
    justify-content: space-between;
    color: white;
    font-size: ${ms(-1)}rem;
    ${whitespace.padding}
  `
}

export default class Footer extends Component {
  render() {
    return (
      <footer className={styles.container}>
        <span>
          UI by{" "}
          <a className={textStyles.link} href="mailto:natanael@dekross.com">
            DEKROSS
          </a>{" "}
        </span>
        <span>
          Content from{" "}
          <a className={textStyles.link} href="https://news.ycombinator.com/">
            Hacker News
          </a>{" "}
          via{" "}
          <a
            className={textStyles.link}
            href="https://github.com/HackerNews/API">
            API
          </a>
        </span>
      </footer>
    )
  }
}
