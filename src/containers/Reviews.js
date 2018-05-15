import React from 'react';
import Amplify, { graphqlOperation, Auth } from 'aws-amplify';
import { Connect } from 'aws-amplify-react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const ListReviews = `query ListReviews($gameId: ID!) {
  queryReviewsByGameId(gameId: $gameId){
    items {
      id
      author
      rating
      gameId
    }
  }
}`;

export default ({ userId, gameId }) => {
  if (!userId || !gameId) return null;

  return (
    <Connect query={graphqlOperation(ListReviews, { gameId })}>
      {({ data: { queryReviewsByGameId } }) => {
        if (queryReviewsByGameId && queryReviewsByGameId.items.length > 0) {
          return (
            <ListGroup>
              <h4>Reviews</h4>
              {queryReviewsByGameId.items.map(item => (
                <ListGroupItem>
                  {item.author} - {item.rating}
                </ListGroupItem>
              ))}
            </ListGroup>
          );
        }
      }}
    </Connect>
  );
};
