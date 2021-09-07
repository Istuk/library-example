import React from 'react';
import { IconButton, Modal, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

interface AppModalProps {
  title: string
  open: boolean
  onClose: any
  children?: any
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  title: {
    display: 'flex',
    alignContent: 'middle'
  },
  grow: {
    flexGrow: 1
  },
  content: {
    padding: '48px'
  }
}));

export default function AppModal(props: AppModalProps) {
  const {
    title,
    open,
    onClose,
    children
  } = props;

  const classes = useStyles();

  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <div className={classes.paper}>
        <div className={classes.title}>
          <Typography variant="h5">
            {title}
          </Typography>
          <div className={classes.grow} />
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className={classes.content}>
          {children}
        </div>
      </div>
    </Modal>
  )
}
