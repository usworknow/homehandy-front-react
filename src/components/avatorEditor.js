import { IconButton } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import RotateIcon from '@material-ui/icons/RotateRight';
import React from 'react';
// import CameraIcon from '@material-ui/icons/CameraAlt'
import ReactAvatarEditor from 'react-avatar-editor';
import { parser } from '../utils/parser';
import HomeHandyButton from './hhButton';

const styles = theme => ({
  accountCircleHolder: {
    width: '100%',
    position: 'relative',
    textAlign: 'center',
    marginTop: '20px'
  },
  accountCircle: {
    color: '#ddd',
    fontSize: '300px',
    '&:hover': {
      color: theme.palette.primary.dark
    },
  },
  submit: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    minWidth: 125
  },
});


class AvatarEditor extends React.Component {

  constructor(props) {
    super(props)
    this.initialState = {
      src: null,
      preview: props.profileImage,
      scale: 1,
      rotate: 0,
      position: { x: 0.5, y: 0.5 }
    }
    this.state = this.initialState
    this.editor = null;
  }

  handlePositionChange = position => {
    this.setState({ position });
  };
  handleRotation = () => {
    let val = this.state.rotate
    val = parseFloat(val) + 90
    if (val > 359) { val = 0 }
    this.setState({ rotate: val })
  }
  setEditorRef = editor => {
    if (editor) this.editor = editor;
  };
  fileChange = e => {
    if (e.target.files.length > 0) {
      this.setState({ preview: null, src: e.target.files[0] });
    }
  };
  handleClear = e => {
    this.setState(this.initialState)
  }
  handleSave = e => {
    const img = this.editor.getImageScaledToCanvas();
    const dataURL = img.toDataURL();
    this.setState({ preview: dataURL })
    const file = parser.getExportFile(dataURL)
    // put file into form data
    const data = new FormData()
    data.append('profile_image', file, file.name)
    this.props.handlePhotoSelected(data)
  };
  // handleScale = e => {
  //   const scale = parseFloat(e.target.value);
  //   this.setState({ scale });
  // };
  handleScale = (evt, newValue) => {
    // const scale = parseFloat(e.target.value);
    this.setState({ scale: newValue });
  };
  render () {
    const { classes } = this.props
    return (
      <div className={classes.accountCircleHolder}>
            {!this.state.preview && this.state.src ? <React.Fragment>
                <div style={{width: '100%', margin: 'auto', textAlign: 'center'}}>
                <ReactAvatarEditor
                  ref={this.setEditorRef}
                  scale={parseFloat(this.state.scale)}
                  width={200}
                  height={200}
                  position={this.state.position}
                  onPositionChange={this.handlePositionChange}
                  borderRadius={26}
                  rotate={parseFloat(this.state.rotate)}
                  image={this.state.src}
                  // onLoadFailure={this.logCallback.bind(this, 'onLoadFailed')}
                  // onLoadSuccess={this.logCallback.bind(this, 'onLoadSuccess')}
                  // onImageReady={this.logCallback.bind(this, 'onImageReady')}
                />
                </div>
                <br />
                <div style={{width: '250px', display: 'flex', margin: 'auto', flexDirection: 'column'}}>
                  <div style={{textAlign: 'left', marginBottom: '12px'}}>
                    <label style={{display: 'inline', marginRight: '4px'}}>Zoom: </label>
                    <Slider
                      onChange={this.handleScale}
                      step={0.05}
                      min={1}
                      max={5}
                      style={{width: '70%', margin: 'auto', display: 'inline-block', verticalAlign: 'middle'}}
                      value={this.state.scale}
                    />
                  </div>
                  <div style={{textAlign: 'left'}}>
                  <label style={{display: 'inline', marginRight: '4px'}}>Rotate: </label>
                    <IconButton onClick={() => this.handleRotation()}><RotateIcon style={{color: '#2b4061', verticalAlign: 'middle'}} /></IconButton>
                  </div>
                </div>
                <br />
                <HomeHandyButton className={classes.submit} onClick={this.handleSave} style={{marginRight: 8}}>SAVE</HomeHandyButton>
                <HomeHandyButton className={classes.submit} style={{backgroundColor: '#000'}} onClick={this.handleClear}>CANCEL</HomeHandyButton>
              </React.Fragment>
            : <React.Fragment>
              <div>
                {this.state.preview
                ? <img style={{borderRadius: '26px'}} src={this.state.preview} alt='Profile' />
                : <IconButton component="label">
                    <AccountCircle className={classes.accountCircle} />
                    <input
                        type="file"
                        onChange={this.fileChange}
                        style={{ display: "none" }}
                        />
                  </IconButton>
                }
              </div>
              <div>
              <HomeHandyButton className={classes.submit} component='label'>
                {this.state.preview ? 'MODIFY' : 'UPLOAD'}
                <input
                  type="file"
                  onChange={this.fileChange}
                  style={{ display: "none" }}
                />
              </HomeHandyButton>
              </div>
            </React.Fragment>}
      </div>
    )
  }
}

export default withStyles(styles)(AvatarEditor);
