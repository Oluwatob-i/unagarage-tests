import React from 'react'
import  { useMutation } from '@apollo/client'

function CreateMutation({variables, mutation}) {
    
    let [_createMutation, { data } ] = useMutation(mutation)
    
    try {
        _createMutation({variables})
    }
    catch(e) {
        console.warn(e)
        return <div><h2>ERROR: Add the appropriate variables for each field</h2></div>
    }
    
    if (data) {
        const key = Object.keys(data)[0]
        const values= Object.entries(data[key])
        return (
            <div>
                <h2>MUTATION SUCCESSFUL</h2>
                {values.map((val, index) => {
                    const data = `${val[0]} => ${val[1]}`
                   return <p key={val}>{data}</p>
                })}
            </div>
        )

    }
    return <div>loading....</div>
}

export default CreateMutation