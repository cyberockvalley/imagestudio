import React from 'react'
import Home from './components/Home'
import UserHome from './components/user/UserHome'
import AdminHome from './components/admin/AdminHome'

const ComponentsRoutes = (props) => (
  <div className="App">
    <Route exact path="/|" 
      render={(propz) => <Home {...propz} user={props.initialData.user} />}
    />
    <Route path="/user/home" 
      render={(propz) => <UserHome {...propz} user={props.initialData.user} />}
    />
    <Route path="/admin/home" 
      render={(propz) => <AdminHome {...propz} user={props.initialData.user} third_party_login_links={props.initialData.third_party_login_links} />}
    />
  </div>
)

export default ComponentsRoutes