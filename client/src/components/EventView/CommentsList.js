import React, { useEffect, useState } from 'react';
import {
  CircularProgress,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';

import commentServices from '../../services/comments';

function CommentsList({ token, eventId, didUpdate, username }) {
  const [comments, setComments] = useState([]);
  const [didDelete, setDidDelete] = useState(false);

  useEffect(() => {
    if (token) {
      commentServices
        .getComments(token, eventId)
        .then(comments => setComments(comments))
        .catch(err => console.log(err));
    }
  }, [token, eventId, didUpdate, didDelete]);

  const onCommentDelete = commentId => {
    commentServices
      .deleteComment(token, commentId)
      .then(_ => setDidDelete(!didDelete))
      .catch(err => console.log(err));
  };

  if (!comments.length) {
    return <CircularProgress />;
  }

  return (
    <div>
      {comments.map(({ comment, user, id }) => (
        <ListItem style={{ maxWidth: 300 }} key={id}>
          <ListItemAvatar>
            <Avatar>{user.name.substring(0, 1)}</Avatar>
          </ListItemAvatar>
          <ListItemText primary={user.name} secondary={comment} />
          {username === user.username && (
            <IconButton onClick={() => onCommentDelete(id)}>
              <Delete />
            </IconButton>
          )}
        </ListItem>
      ))}
    </div>
  );
}

export default CommentsList;
