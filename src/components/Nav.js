import React, { Component } from "react"
import { NavLink } from "react-router-dom"
import { css } from "emotion"
import { ThemeConsumer } from "../contexts/theme"
import { ms, vr } from "../fonts"
import { whitespace } from "../styles"

const styles = {
  container: css`
    display: flex;
    ${whitespace.padding}
    background: black;
    height: ${vr(3)}rem;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1;
  `,
  logo: css`
    font-size: ${ms(0.5)}rem;
    @media screen and (min-width: 40rem) {
      font-size: ${ms(1.5)}rem;
    }
    font-weight: 600;
    color: white;
    letter-spacing: -0.1rem;
    user-select: none;
  `,
  link: css`
    text-decoration: none;
    font-size: ${ms(0)}rem;
    cursor: pointer;
    @media screen and (min-width: 40rem) {
      font-size: ${ms(1)}rem;
    }
    color: white;
  `
}

export default class Nav extends Component {
  styles = {
    active: {
      color: "orange"
    }
  }
  render() {
    return (
      <header className={styles.container}>
        <NavLink exact to="/" className={styles.link}>
          <h1 className={styles.logo}>Hacker News</h1>
        </NavLink>
        {/* <nav>
          <NavLink
            className={styles.link}
            exact
            to="/"
            activeStyle={this.styles.active}>
            Top
          </NavLink>
          <span className={styles.link}>&nbsp;/&nbsp;</span>
          <NavLink
            className={styles.link}
            exact
            to="/new"
            activeStyle={this.styles.active}>
            New
          </NavLink>
        </nav> */}
        {/* <ThemeConsumer>
          {({ theme, toggleTheme }) => (
            <button onClick={toggleTheme}>{theme}</button>
          )}
        </ThemeConsumer> */}
      </header>
    )
  }
}
