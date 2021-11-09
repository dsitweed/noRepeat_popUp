import React from "react";
import myData from './data.json';
export default function Test(props) {
  return (
      <div>
        <p>hello world;</p>
        {
          doGetJson()
        }
      </div>
  );
}

function doGetJson(){
  console.log(myData);
}


