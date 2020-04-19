import React, { Fragment } from "react"
import marked from "marked"
import { smartquotes } from "smartquotes"
import { hyphenate } from "hyphen/en"
import HTMLParser from "react-html-parser"

export default class Text extends React.Component {
  state = {
    text: this.props.children
  }
  componentDidMount() {
    const { text } = this.state
    const renderer = new marked.Renderer()
    renderer.text = text => {
      return text
    }
    // console.log(marked(text, { renderer }))
    console.log(marked(text, { renderer }))
  }
  render() {
    const { text } = this.state
    return <Fragment>{text}</Fragment>
  }
}
