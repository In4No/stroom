import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Link } from 'react-router'
import fetchStory from '../queries/fetchStory'
import CharacterCreate from './CharacterCreate'
import CharacterList from './CharacterList'

class StoryDetail extends Component {
    render() {
        if(this.props.data.loading){
            return <div></div>
        }
        const story = this.props.data.song
        return(
            <div>
                <Link to="/">Back</Link>
                <h3>{story.title}</h3>
                <CharacterList characters={story.lyrics}/>
                <CharacterCreate id={this.props.params.id}/> 
            </div>
        )
    }
}


export default graphql(fetchStory,{
    options: (props) => {
        return{
            variables: {id: props.params.id}
        }
    }
})(StoryDetail)