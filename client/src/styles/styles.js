import { makeStyles } from '@material-ui/core/styles';

export const useHeaderBarStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export const useEventListStyles = makeStyles(theme => ({
  title: { fontWeight: 'bold', margin: '16px 0px' },
  eventWrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  }
}));

export const useEventItemStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
    marginBottom: 16,
    marginRight: 16
  }
}));
