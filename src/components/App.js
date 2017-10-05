import React, { Component } from 'react'
import './App.css'
import { Link, Route, withRouter, Switch } from 'react-router-dom'
import ShowPosts from './ShowPosts'
import AddPost from './AddPost'
import SidebarMenu from './SidebarMenu'
import EditPost from './EditPost'
import ShowDetail from './ShowDetail'

class App extends Component {

  render () {
    return (
      <div>
        <container className='App-header' >
          <Link to='/'
            className='home-link'
            alt='Logo Home'
            onClick={() => { this.props.selectCategory('none') }}
          />
        </container>

        <container className='Sidebar-show-posts' >
          <Switch>
            <Route exact path='/' component={SidebarMenu} />
            <Route path='/:category' component={SidebarMenu} />
          </Switch>
          <Switch>
            <Route exact path='/' component={ShowPosts} />
            <Route exact path='/add' component={AddPost} />
            <Route exact path='/add/:id' component={AddPost} />
            <Route exact path='/edit/:id' component={EditPost} />
            <Route exact path='/:category' component={ShowPosts} />
            <Route exact path='/:category/:id' component={ShowDetail} />
          </Switch>
        </container>
      </div>
    )
  }
}

export default withRouter(App)
