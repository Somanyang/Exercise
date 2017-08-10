import React from 'react';
import ReactDOM from 'react-dom';
import HeadModule from './components/HeadModule';


ReactDOM.render(<HeadModule />, document.getElementById('root'));
if(module.hot){
	module.hot.accept();
}
