import React, {useState, useRef, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

import Form from './Form'

function App() {
  const [forms, createForm] = useState([])

  return (
    <div className="App">
      <header className="App-header">
      <h2>Unagarage Tests</h2>
      <div style={{display: 'flex', alignItems: 'center',}}>
        <form className='createInstance' onSubmit={(e)=> handleSubmit(e, createForm, forms)}>
          <input  style={{marginRight: '10px'}} name='model' placeholder='Enter mutation name'/>
          <input  name='fields' placeholder='example: id:String!;name:String!;'/>
         <div style={{width: '100%'}}><button type='submit' style={{width: 'auto', height: 48, background: '#FFF', border: 'none'}}>Create Mutation Form</button></div>
        </form>
      </div>
        <div className='forms-list'>

          {
            forms.map((form)=> {
              return <Form form={form}/>
            })
          }
        </div>
      </header>
    </div>
  );
}

function handleSubmit(e, createForm, forms) {
  e.preventDefault()
  const form = e.target
  let model = form.model.value
  let fields = form.fields.value
  fields = fields.split(';')
  
  if (model && fields) {
    createForm(
      [
        ...forms,
        {[model]: fields},
      ]
    )
  }

}

export default App;
