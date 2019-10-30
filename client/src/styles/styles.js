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
    alignItems: 'flex-start',
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

export const useFloatingActionButtonStyles = makeStyles(theme => ({
  root: {
    display: 'inline-block'
  },
  fab: {
    margin: '0',
    top: 'auto',
    right: '16px',
    bottom: '16px',
    left: 'auto',
    position: 'fixed'
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

export const useCreateLocationDialogStyles = makeStyles(theme => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
}));
