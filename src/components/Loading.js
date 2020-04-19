import React, { Component } from "react"
import { string, number } from "prop-types"
import { css } from "emotion"
import { ms, vr } from "../fonts"

const style = {
  container: css`
    display: flex;
    color: white;
    text-align: left;
    margin-left: 50vw;
    align-items: center;
    min-height: 95vh;
    width: 100%;
    font-size: ${ms(3)}rem;
  `
}

export default class Loading extends Component {
  state = {
    content: "..."
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(({ content }) => ({
        content: content === "..." ? "." : content + "."
      }))
    }, 500)
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }
  render() {
    return <div className={style.container}>{this.state.content}</div>
  }
}
