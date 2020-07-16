import React from 'react';
import Rotas from './rotas'
import 'toastr/build/toastr.min';
import AuthProvider from './AuthProvider';

import 'bootswatch/dist/flatly/bootstrap.css';
import '../custom.css'
import 'toastr/build/toastr.css';

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import Navbar from '../components/navbar'

class App extends React.Component {

  render(){
    return(
      <AuthProvider>
        <Navbar />
        <div className="container">
          <Rotas />
        </div>
      </AuthProvider>
    );
  }
  
}

export default App;
