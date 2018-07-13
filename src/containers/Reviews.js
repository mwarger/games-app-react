import React from 'react'
import Amplify, { graphqlOperation, Auth } from 'aws-amplify'
import { Connect } from 'aws-amplify-react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import NewReview from './NewReview'

const ListReviews = `query ListReviews($gameId: ID!) {
  queryReviewsByGameId(gameId: $gameId){
    items {
      id
      author
      rating
      gameId
    }
  }
}`

export default ({ userId, gameId }) => {
  console.log('userId', userId)
  console.log('gameId', gameId)
  if (!userId || !gameId) return null

  return (
    <React.Fragment>
      <Connect query={graphqlOperation(ListReviews, { gameId })}>
        {({ data }) => {
          // console.log('data', data)
          if (!data || !data.queryReviewsByGameId) return null

          const { queryReviewsByGameId } = data

          if (queryReviewsByGameId && queryReviewsByGameId.items.length > 0) {
            return (
              <ListGroup>
                <h4>Reviews</h4>
                {queryReviewsByGameId.items.map(item => (
                  <ListGroupItem key={item.id}>
                    {item.author || 'Anonymous'} - {item.rating}
                  </ListGroupItem>
                ))}
              </ListGroup>
            )
          }
        }}
      </Connect>
    </React.Fragment>
  )
}
