import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

class CharacterCreate extends Component{

    constructor(props){
        super(props)
        this.state = {
            content : ''
        }
    }

    onSubmit(event) {
        event.preventDefault()
        this.props.mutate({
            variables  : {
                content : this.state.content,
                id : this.props.id
            }
        }).then(()=>this.setState({content : ''}))
    }

    render(){
        return(
            <form onSubmit={this.onSubmit.bind(this)}>
                <label>Add a character</label>
                <input  value={this.state.content} onChange={ event => this.setState({ content: event.target.value})}/>
            </form>
        )
    }
}

const mutation = gql`
    mutation addCharacterToStory($id: ID!, $content: String){
        addLyricToSong(songId : $id, content : $content){
            id
            title
            lyrics{
                id
                content
                likes
            }
        }
    }
`

export default graphql(mutation)(CharacterCreate)