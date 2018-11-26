import React from 'react';
import { Route, HashRouter } from 'react-router-dom';
import Notifications from 'react-notify-toast';
import config from './config.json';
// app_modules
import Login from './app_modules/Login.jsx';
import Prospect from './app_modules/Prospect/Prospect.jsx';
import Compatible from './app_modules/Compatible/Compatible.jsx';
import Garment from './app_modules/Garment/Garment.jsx';
import Category from './app_modules/Category/Category.jsx';
import SubCategory from './app_modules/SubCategory/SubCategory.jsx';
import DesktopContainer from './app_modules/DesktopContainer.jsx';

const App =()=>(
    <HashRouter>
        <MainContainer></MainContainer>
    </HashRouter>
)

class MainContainer extends React.Component{

  constructor(props) {
    super(props);
    this.state = {menuVisible: true};
    localStorage.setItem('url', config.apiUrl );
  }

  renderMainContent(){
    if (localStorage.getItem('tokenSesion') === ''
        || localStorage.getItem('tokenSesion') === null){
      return(<Login/>);
    }else{
      return(
        <DesktopContainer>       
          <Route path="/login" component={Login}/>          
          <Route path="/prospects" component={Prospect}/>          
          <Route path="/compatibleGarments" component={Compatible}/>       
          <Route path="/garment" component={Garment}/>
          <Route path="/categories" component={Category}/>       
          <Route path="/subCategories" component={SubCategory}/>    
        </DesktopContainer>
      )
    }
  }

  render() {
    return(
      <div>
        <Notifications />
        {this.renderMainContent()}
      </div>
    )
  }
}


export default App;
