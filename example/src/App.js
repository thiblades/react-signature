import React, { Component } from 'react'

import ExampleComponent from 'react-signature'

export default class App extends Component {
  render () {
    return (
      <div>
        <ExampleComponent 
        width={400}
        height={300}
        onSignatureReady={(signature, date) => {
          fetch(signature)
            .then(res => res.blob())
            .then((blob) => {
              console.log(date);
  
              // const file = new File([blob], "signature.png");
              const data = window.URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = data;
              link.download = 'signature.png';
              link.click();
              setTimeout(() => window.URL.revokeObjectURL(data), 100);
            });
        }} 
      />
      </div>
    )
  }
}
