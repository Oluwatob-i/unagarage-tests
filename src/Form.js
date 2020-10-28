import React, { Component } from 'react'
import { gql, useMutation } from '@apollo/client'

import CreateMutation from './CreateMutation'

class Form extends Component {
    constructor(props) {
        super(props)    
        this.handleSubmit = this.handleSubmit.bind(this)
        let form = this.props.form
        const model = Object.keys(form)[0]
        const fieldsWithType = form[model]
        const fields = []
        const types = []
        
        // get the fields and types for each field 
        fieldsWithType.map(fieldWithType => {
            if (fieldWithType) {
                let fieldandType = fieldWithType.split(':')
                if (fieldandType.length !== 2) throw new Error('You have to specify field type')
                fields.push(fieldandType[0])
                types.push(fieldandType[1])
            }
        })

        // get the required types needed for the query 
        const required = fields.map((val, index)=>
            {
                // check if this is the last item in the array 
                if (index == (fields.length - 1)) {
                   return `$${val}: ${types[index]}`
                } else {
                    return `$${val}: ${types[index]}, `
                }
            }
           
        )  
       
       // convert required to a string that will be used to store the variables of the mutation
       let required_variables = ''
       for (let i of required) required_variables += i
      
        // variables to be passed to the mutation from required 
       let pass_variables = fields.map((val, index) => { 
            // check if this is the last item in the array 
           if (index === (fields.length -1)) {
                return  `${val}: $${val}`     
           } else {
               return  `${val}: $${val}, `
           }
        })
       let _pass_variables = ''
       for (let i of pass_variables) _pass_variables += i
       let fieldsWithNewLine = ''
       for ( let i of fields ) fieldsWithNewLine += `${i}\n`

        //the mutation 
        const _mutation = `
            mutation POST_MUTATION(${required_variables}) {
                ${model}(${_pass_variables}) {
                    ${fieldsWithNewLine}
                }
            }
        `
       
        this.state = {
            model, 
            _mutation, 
            ...fields,
        }
       
    }

    handleSubmit(e) {
        e.preventDefault()
        let {model, _mutation, ready, fieldValues, ...fields} = this.state
        const form = e.target
        fieldValues = {}
        console.log(fields)
        for (let i of Object.values(fields)) {
           Object.assign(fieldValues, {[i]: form[i].value})
        }
        _mutation = gql`
            ${_mutation}
        `
        if (fieldValues.length === 0) return

        this.setState({
            ready: true,
            fieldValues,
            _mutation
        })
    }
    render() {
        const { model, _mutation,ready, fieldValues,  ...fields } = this.state
        const _fields =  []
        for (let i of Object.values(fields)) _fields.push(i)
       

        return (
            
            <form className='create-instance-form' onSubmit={(e)=> this.handleSubmit(e)} >
                <h2>{model}</h2>
                {_fields.map(field=> 
                    field?<input key={field} name={field} placeholder={field}/>  : '' 
                )}
                <button type='submit'>Submit</button>
                {
                    this.state.ready ? <CreateMutation variables={fieldValues} mutation={_mutation}/>: ''
                }
            </form>   
        
                         
        )
    }

}


export default Form