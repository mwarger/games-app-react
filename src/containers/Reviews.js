// @flow
import React from 'react'
import Amplify, { graphqlOperation, Auth } from 'aws-amplify'
import { Connect } from 'aws-amplify-react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import NewReview from './NewReview'

import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const ListReviews = gql`
  query ListReviews($gameId: ID!) {
    reviews: queryReviewsByGameId(gameId: $gameId) {
      items {
        id
        author
        rating
        gameId
      }
    }
  }
`

type ReviewArgs = {
  userId: string,
  gameId: string
}

export default ({ userId, gameId }: ReviewArgs) => {
  if (!userId || !gameId) return null

  return (
    <Query query={ListReviews} variables={{ userId, gameId }}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading...</div>

        if (error) return <div>Something bad happened!</div>

        if (!data || !data.queryReviewsByGameId) return null
        const { queryReviewsByGameId } = data
        return queryReviewsByGameId && queryReviewsByGameId.items.length ? (
          <ListGroup>
            <h4>Reviews</h4>
            {queryReviewsByGameId.items.map(item => (
              <ListGroupItem key={item.id}>
                {item.author || 'Anonymous'} - {item.rating}
              </ListGroupItem>
            ))}
          </ListGroup>
        ) : (
          <p>No reviews to show!</p>
        )
      }}
    </Query>
  )
}
