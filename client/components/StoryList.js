import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Link } from 'react-router'

import query from '../queries/fetchStories'

class StoryList extends Component{

    onStoryDelete(id) {
        this.props.mutate({
            variables : {id}
        }).then(() => this.props.data.refetch())
    }

    render() {
        if(this.props.data.loading){
            return(
                <div>Loading ...</div>
            )
        }
        return(
            <div>
                <ul className="collection">
                    {this.props.data.songs.map((story) => (
                        <li key={story.id} className="collection-item">
                            <Link to={`/story/${story.id}`}>{story.title}</Link>
                            <i className="material-icons" onClick={()=>this.onStoryDelete(story.id)}>
                                delete
                            </i>
                        </li>
                    ))}
                </ul>
                <Link to="/story/new" className="btn-floating btn-large light-blue right">
                    <i className="material-icons">add</i>
                </Link>
            </div>
        )
    }
}

const mutation = gql`
    mutation deleteStory($id: ID) {
        deleteSong(id: $id) {
            id
        }
    }
`

export default graphql(mutation)(
    graphql(query)(StoryList)
)