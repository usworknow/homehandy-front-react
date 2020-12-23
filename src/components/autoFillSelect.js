/* eslint-disable react/prop-types, react/jsx-handler-names */

import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CancelIcon from '@material-ui/icons/Cancel';
import classNames from 'classnames';
import React from 'react';
import Select from 'react-select';
import HomeHandyTextField from './hhTextField';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  input: {
    display: 'flex',
    cursor: 'default',
    borderColor: '#eee',
    padding: '4px 16px',
    minHeight: 32
  },
  error: {
    border: 'solid 2px red'
  },
  valueContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    overflowY: 'hidden',
    overflowX: 'auto',
    padding: theme.spacing(0, 0.25),
    cursor: 'text',
    [theme.breakpoints.down('xs')]: {
    },
  },
  chip: {
    backgroundColor: '#FFF',
    margin: theme.spacing(0, 1),
  },
  // chipFocused: {
  //   backgroundColor: emphasize(
  //     theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
  //     0.08,
  //   ),
  // },
  noOptionsMessage: {
    padding: theme.spacing(1, 2),
  },
  singleValue: {
    fontSize: 14,
    fontFamily: theme.typography.fontFamily,
    display: 'flex',
    '&.disabled': {
      color: 'rgba(0, 0, 0, 0.38)'
    }
  },
  placeholder: {
    // position: 'absolute',
    // left: 20,
    fontSize: 14,
    fontFamily: theme.typography.fontFamily
  },
  paper: {
    position: 'absolute',
    marginTop: 0,
    marginBottom: '30px',
    left: 0,
    zIndex: 9999,
    right: 0,
  },
  divider: {
    height: theme.spacing(2)
  },
}))

function NoOptionsMessage(props) {
  if (props.selectProps.noOptionsCTA && props.selectProps.noOptions && props.selectProps.inputValue.indexOf('@') > 0) {
    return <div style={{textDecoration: 'underline', cursor: 'pointer', padding: '8px 16px'}} onClick={() => props.selectProps.noOptionsCTA(props.selectProps.inputValue)}>
      {props.selectProps.noOptions}
    </div>
  }
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.selectProps.noOptions || props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {

  return (
    <HomeHandyTextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: classNames(
            props.selectProps.classes.input,
            {[props.selectProps.classes.error]: props.selectProps.TextFieldProps.haserror === 'true'}
          ),
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      InputLabelProps={{
        shrink: props.menuIsOpen || props.hasValue || props.isFocused,
      }}
      {...props.selectProps.TextFieldProps}
    />
  );
}

function Option(props) {
  const label = props.data.label || ''
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontSize: '12px',
        minHeight: 36,
        display: 'flex',
        fontWeight: 'normal !important',
      }}
      {...props.innerProps}
    >
      {label}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  const label = props.data.label || ''
  return (
    <Typography
      component='span'
      className={classNames(
        props.selectProps.classes.singleValue,
        {'disabled': props.isDisabled}
        )}
      {...props.innerProps}>
      {label}
    </Typography>
  );
}

function ValueContainer(props) {  
  return <div className={props.selectProps.classes.valueContainer} style={props.isMulti ? {flexWrap: 'wrap'} : {}}>{props.children}</div>;
}

function MultiValue(props) {  
  return (
    <Chip
      key={props.index}
      tabIndex={-1}
      // avatar={props.data && props.data.value && <UserAvatar profileImage={props.data.logo} width={24} styles={{marginLeft: 8}} />}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon style={{width: 16, height: 16}} {...props.removeProps} />}
    />
  );
}

function Menu(props) {
  return (
    <Paper id="paper-menu" square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};
const AutofillSelect = (props) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
        <Select
          classes={classes}
          name={props.name || ''}
          TextFieldProps={props.textFieldProps || {}}
          options={props.options}
          components={components}
          menuPortalTarget={props.menuPortalTarget || ''}
          value={props.selectedValue}
          isClearable={true}
          isSearchable={true}
          isDisabled={props.disabled}
          onFocus={props.handleAutoSelectTextChange ? props.handleAutoSelectTextChange() : null}
          onInputChange={props.handleAutoSelectTextChange ? props.handleAutoSelectTextChange() : null}
          onChange={props.handleAutoSelectChange ? props.handleAutoSelectChange(props.name) : null}
          placeholder={props.placeholder || ''}
          noOptions={props.noOptions || ''}
          noOptionsCTA={props.noOptionsCTA}
          isMulti={props.isMulti}
        />
    </div>
  );
}

export default AutofillSelect
