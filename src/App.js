import React, { Component, useDebugValue } from "react";
//Mini project sau nay
import 'bootstrap/dist/css/bootstrap.min.css';
import Random from './components/Random';
import Test from './components/Test'
import './random.css';

class App extends Component {

  render() {
    return (
     <div>
       <Random></Random>
     </div>
    );
  }
}

export default App;
