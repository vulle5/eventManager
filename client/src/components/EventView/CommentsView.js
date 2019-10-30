import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import { get } from 'lodash';

import CommentsList from './CommentsList';
import AddComment from './AddComment';

import commentServices from '../../services/comments';

function CommentsView({ token, event, username }) {
  const [comment, setComment] = useState('');
  const [didUpdate, setDidUpdate] = useState(false);

  const onCommentSubmit = e => {
    e.preventDefault();

    commentServices
      .createComment(token, { comment, eventId: event.id })
      .then(_ => {
        setDidUpdate(!didUpdate);
        setComment('');
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <Typography variant="h5">Kommentit</Typography>
      <AddComment
        onSubmit={onCommentSubmit}
        comment={comment}
        setComment={setComment}
      />
      <CommentsList
        eventId={event.id}
        didUpdate={didUpdate}
        token={token}
        username={username}
      />
    </>
  );
}

const mapStateToProps = state => {
  return {
    token: get(state, 'user.token', null),
    username: get(state, 'user.username', null)
  };
};

export default connect(mapStateToProps)(CommentsView);
