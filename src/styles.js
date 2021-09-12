import {
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Toolbar,
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import {
  AddCircle,
  AddPhotoAlternate,
  ArrowBackIos,
  ArrowForwardIos,
} from '@material-ui/icons';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';

// General

export const VerticalLayoutWrapper = styled('div')({
  backgroundColor: 'white',
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  fontSize: 'calc(10px + 2vmin)',
  color: 'gray',
});

export const PaddedButton = styled(Button)({
  margin: '1rem',
});

export const PaddedToggleButton = styled(ToggleButton)({
  padding: '0.25rem 0.5rem',
});

// MapList

export const MapButton = styled(Button)({
  padding: '0.5rem 2rem',
  margin: '0.5rem',
});

export const MapListContainer = styled(VerticalLayoutWrapper)({
  alignItems: 'center',
});

// MapViewer

export const EvenToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
});

export const MapNameField = styled(TextField)({
  margin: '0.5rem',
});

export const HiddenFileInput = styled('input')({
  display: 'none',
});

export const AddImageIcon = styled(AddPhotoAlternate)({
  marginRight: '0.5rem',
});

export const PageToolbar = styled(Toolbar)({
  backgroundColor: '#e0e0e0',
  minHeight: 'auto',
});

export const PageList = styled(ToggleButtonGroup)({
  display: 'flex',
  margin: '8px 0',
  overflow: 'auto',
});

export const ViewerHint = styled(Toolbar)({
  justifyContent: 'center',
});

export const LeftPageArrow = styled(ArrowBackIos)({
  position: 'absolute',
  top: '50%',
  left: '0.5rem',
  cursor: 'pointer',
});

export const RightPageArrow = styled(ArrowForwardIos)({
  position: 'absolute',
  top: '50%',
  right: '0.5rem',
  cursor: 'pointer',
});

// MapPage

export const MapPageContent = styled('div')({
  flex: '1 1 auto',
  position: 'relative',
  minHeight: 0,
  width: 'calc(100% - 4rem)',
  alignSelf: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const PinCardWrapper = styled('div')({
  flex: '0 0 auto',
  minHeight: 0,
});

// MapImage

export const StyledPin = styled(AddCircle)({
  position: 'absolute',
  cursor: 'pointer',
  transition: 'transform 0.2s',
  WebkitTapHighlightColor: 'rgba(255, 255, 255, 0)',
  padding: '0.5rem',
});

export const MapImg = styled('img')({
  maxWidth: '100%',
  maxHeight: '100%',
});

// PinCard

export const PinCardField = styled(TextField)({
  width: '100%',
});

export const DescriptionCard = styled(Card)({
  transition: 'opacity 0.2s',
});

export const PinCardHeader = styled(CardHeader)({
  paddingBottom: 0,
  textAlign: 'left',
});

export const PinCardContent = styled(CardContent)({
  paddingTop: 0,
  textAlign: 'left',
  overflow: 'auto',
  height: '5rem',
});

export const DescriptionHeader = styled('h5')({
  textTransform: 'uppercase',
  opacity: 0.5,
  margin: 0,
  fontSize: '1.4rem',
});

export const DescriptionBody = styled('p')({
  margin: 0,
  fontSize: '1.2rem',
  fontFamily: 'Arial',
});
