import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

class CharacterList extends Component {

    onLike(id, likes) {
        this.props.mutate({
            variables: { id },
            optimisticResponse:{
                __typename: 'Mutation',
                likeLyric: {
                    id,
                    __typename: 'LyricType',
                    likes: likes + 1
                }
            }
        })
    }

    render(){
        return(
            <div>
                <h6>Character List</h6>
                <ul className="collection">
                    {this.props.characters.map((content) => (
                        <li key={content.id} className="collection-item">
                            {content.content}
                            <div className="vote-box">
                                <i className="material-icons" onClick={()=>this.onLike(content.id, content.likes)}>
                                    thumb_up
                                </i>
                                {content.likes}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

const mutation = gql`
    mutation likeCharacter($id : ID){
        likeLyric(id: $id){
        id
        likes
        }
    }
`

export default graphql(mutation)(CharacterList)