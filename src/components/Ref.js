import React , { Component } from 'react';

const Ref = React.forwardRef((props, ref) => {
  console.log(props,ref);
  return(<div>
    <input ref={ref}></input>
  </div>);
});

export default Ref;