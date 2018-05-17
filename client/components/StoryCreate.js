import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Link, hashHistory } from 'react-router'

import query from '../queries/fetchStories'

class StoryCreate extends Component {
    constructor(props) {
        super(props)
        this.state={
            title: ''
        }
    }

    onSubmit(event) {
        event.preventDefault()
        this.props.mutate({
            variables : { title: this.state.title },
            refetchQueries : [{ query }]
        }).then(()=> hashHistory.push('/'))
        .catch(()=> { alert("Something is'nt right! :(") })
    }

    render() {
        return(
            <div>
                <Link to="/">Back</Link>
                <h3>Create a story</h3>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <label>Story Title:</label>
                    <input onChange={event => this.setState({title : event.target.value})} value={this.state.title}/>
                </form>
            </div>
        )
    }
}

const mutation = gql`
    mutation AddStory($title : String) {
        addSong(title : $title){
            id
            title
        }
    }
`

export default graphql(mutation)(StoryCreate)