import "./styles.css"
import "./fonts"
import React, { Component, Fragment } from "react"
import { render } from "react-dom"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Nav from "./components/Nav"
import Feed from "./components/Feed"
import Story from "./components/Story"
import Footer from "./components/Footer"
import { vr } from "./fonts"

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Nav />
          <main
            style={{
              background: "#303030",
              minHeight: "87vh"
            }}>
            <Switch>
              <Route exact path="/" component={() => <Feed type="top" />} />
              <Route exact path="/stories/:id" component={Story} />
              <Route render={() => <h1>404</h1>} />
            </Switch>
          </main>
          <Footer />
        </Fragment>
      </Router>
    )
  }
}

render(<App />, document.getElementById("app"))
