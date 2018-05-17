import './style/style.css'
import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'

import App from './components/App'
import StoryList from './components/StoryList'
import StoryCreate from './components/StoryCreate'
import StoryDetail from './components/StoryDetail'

const client = new ApolloClient({
  dataIdFromObject: o => o.id
})

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={StoryList} />
          <Route path="story/new" component={StoryCreate}></Route>
          <Route path="story/:id" component={StoryDetail}></Route>
        </Route>
      </Router>
    </ApolloProvider>
  )
}

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
)
