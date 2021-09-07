import React, { useCallback } from 'react';
import { Button } from '@material-ui/core';
import JsonServerBase from 'services/JsonServerBase';

interface DeleteButtonProps {
  service: JsonServerBase
  id: number
  onSuccess: (value: any) => any
}

export default function DeleteButton({service, id, onSuccess}: DeleteButtonProps) {

  const handleClick = useCallback(() => {
    service.deleteEntity(id)
      .then(onSuccess);
  }, [service, onSuccess, id]);

  return (
    <Button onClick={handleClick}>Delete</Button>
  )
}
