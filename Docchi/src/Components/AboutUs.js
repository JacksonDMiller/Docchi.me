import React, { Component } from 'react'



// admin console for approving new questions must have correct user id to access it. 
class AboutUs extends Component {

    render() {


        return (

            <div className='container' >
                <p className='flow-text'>Docchi.me is a project I made to learn React and Redux. I hope you enjoy it.</p>
                <p className='flow-text'>Feel free to follow me on twitter and ask any questions.</p>
                <div className='socialButton'><a className='btn yuiBlue' href='https://twitter.com/Docchi_me'>@Docchi_me</a></div>
                <div className='socialButton'> <a className='btn yuiBlue' href='https://twitter.com/JacksonDMiller'>@JacksonDMiller</a></div>
            </div >




        )
    }
}




// get the datbase of questions. could be cleaned up to only read questions in the pending status
export default (AboutUs)