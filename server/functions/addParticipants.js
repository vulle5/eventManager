// This function adds participants to event and updates them if needed
module.exports = function addParticipants(body, oldEvent, userId) {
  const yesRemoved = oldEvent.yes.filter(
    id => id.toString() !== userId.toString()
  );
  const maybeRemoved = oldEvent.maybe.filter(
    id => id.toString() !== userId.toString()
  );
  const noRemoved = oldEvent.no.filter(
    id => id.toString() !== userId.toString()
  );

  if (body.yes)
    return {
      yes: yesRemoved.concat(body.yes),
      maybe: maybeRemoved,
      no: noRemoved
    };
  if (body.maybe)
    return {
      yes: yesRemoved,
      maybe: maybeRemoved.concat(body.maybe),
      no: noRemoved
    };
  if (body.no)
    return {
      yes: yesRemoved,
      maybe: maybeRemoved,
      no: noRemoved.concat(body.no)
    };
  return null;
};
