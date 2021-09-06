import { Button } from '@material-ui/core';
import React, { Fragment, useCallback, useState } from 'react';

export default function AddBook() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen])

  return (
    <Fragment>
      <Button onClick={handleOpenModal}>Add Book</Button>
    </Fragment>
  )
}
