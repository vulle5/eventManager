// This function saves participation to user or updates it if needed
module.exports = function saveParticipationToUser(body, user, eventId) {
  const participatingRemoved = user.participating.filter(
    id => id.toString() !== eventId.toString()
  );
  const maybeParticipatingRemoved = user.maybeParticipating.filter(
    id => id.toString() !== eventId.toString()
  );
  const notParticipatingRemoved = user.notParticipating.filter(
    id => id.toString() !== eventId.toString()
  );

  if (body.yes) {
    user.participating = participatingRemoved.concat(eventId);
    user.maybeParticipating = maybeParticipatingRemoved;
    user.notParticipating = notParticipatingRemoved;
  } else if (body.maybe) {
    user.participating = participatingRemoved;
    user.maybeParticipating = maybeParticipatingRemoved.concat(eventId);
    user.notParticipating = notParticipatingRemoved;
  } else if (body.no) {
    user.participating = participatingRemoved;
    user.maybeParticipating = maybeParticipatingRemoved;
    user.notParticipating = notParticipatingRemoved.concat(eventId);
  }
};
