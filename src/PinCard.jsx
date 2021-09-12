import React from 'react';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import {
  DescriptionBody,
  DescriptionCard,
  DescriptionHeader,
  PinCardContent,
  PinCardField,
  PinCardHeader,
} from './styles';

/** A card for displaying/editing data about a specific pin. */
const PinCard = ({ pin, setPin, onClose, isEditor }) => {
  const { title, description } = pin || {};

  const cardTitle = isEditor ? (
    <PinCardField
      label="Item Title"
      value={title || ''}
      onChange={e => setPin({ ...pin, title: e.target.value })}
    />
  ) : (
    <DescriptionHeader>{title}</DescriptionHeader>
  );

  const cardContent = isEditor ? (
    <PinCardField
      label="Item Description"
      value={description || ''}
      onChange={e => setPin({ ...pin, description: e.target.value })}
      variant="outlined"
      multiline
      rows={3}
    />
  ) : (
    <DescriptionBody>{description}</DescriptionBody>
  );

  return (
    <DescriptionCard style={{ opacity: pin ? 1 : 0 }}>
      <PinCardHeader
        title={cardTitle}
        action={
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        }
      />
      <PinCardContent>{cardContent}</PinCardContent>
    </DescriptionCard>
  );
};

export default PinCard;
