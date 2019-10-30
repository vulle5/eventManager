import React from 'react';
import { Input, Button } from '@material-ui/core';

function AddComment({ onSubmit, comment, setComment }) {
  return (
    <div style={{ margin: '16px 0px' }}>
      <form onSubmit={event => onSubmit(event)}>
        <Input
          placeholder="Lisää kommentti"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          fullWidth
          style={{ marginBottom: 16 }}
        />
        <Button type="submit">Kommentoi</Button>
      </form>
    </div>
  );
}

export default AddComment;
