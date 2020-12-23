import { Button, Grid, Hidden, IconButton, TextField, Typography } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import AddIcon from '@material-ui/icons/AddCircleOutline'
import CloseIcon from '@material-ui/icons/CloseOutlined'
import cls from 'classnames'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AutoFillSelect from '../../components/autoFillSelect'
import HomeHandyContentContainer from '../../components/hhContentContainer'
import UserAvatar from '../../components/userAvatar'
// import { handleSearchProfiles } from '../../reducers/profiles'
import { parser } from '../../utils/parser'

const useStyles = makeStyles(theme => ({
  gridItem: {
    position: 'relative',
    padding: '0px 8px',
  },
  rightSide: {
    borderLeft: 'solid 1px #ccc',
    height: '100%',
    [theme.breakpoints.down('xs')]: {
      borderLeft: 0
    },
  },
  avatarBox: {
    marginBottom: 0,
    marginRight: 16,
    display: 'block',
    alignSelf: 'start',
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    },
  },
  inputBox: {
    width: '100%',
    alignSelf: 'center',
    padding: '8px 20px 0',
    backgroundColor: theme.palette.primary.light,
    border: 'solid 1px #ccc',
    // borderColor: theme.palette.primary.main,
    borderRadius: 32
  },
  channelBox: {
    display: 'flex',
    cursor: 'pointer',
    padding: '12px 8px',
    borderBottom: 'solid 1px #ccc',
    '& .showOnHover': {
      display: 'none',
      [theme.breakpoints.down('xs')]: {
        display: 'block'
      }
    },
    '&:hover': {
      backgroundColor: theme.palette.secondary.tint2,
      '& .showOnHover': {
        display: 'block'
      }
    },
    '&.selected': {
      borderLeft: `solid 2px ${theme.palette.primary.main}`,
      backgroundColor: 'rgb(236, 242, 251)',
    },
    '&.pending': {
      borderRight: `solid 4px ${theme.palette.secondary.main}`,
    }
  },
  channelItem: {
    width: '100%',
    padding: '0 4px',
    alignSelf: 'center',
  },
  chatItem: {
    width: '100%',
    alignSelf: 'center',    
    flexGrow: 1,
  },
  actionButtons: {
    marginTop: 12,
    paddingLeft: 0,
    display: 'flex',
    justifyContent: 'flex-end'
  },
  messagesContainer: {
    height: 'calc(100vh - 200px)', 
    minHeight: 300, 
    display: 'flex', 
    flexDirection: 'column',
    [theme.breakpoints.down('xs')]: {
      height: 'auto'
    }
  },
  messagesBox: {
    minHeight: 16, 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'flex-start', 
    justifyContent: 'flex-start', 
    overflowY: 'auto',
  },
  // grow: {
  //   flexGrow: 1
  // }
}))

const MessagingHeader = ({title, icon, handleClick}) => {
  return (
    <div style={{borderBottom: 'solid 1px #ccc', padding: '24px 0', margin: '0', }}>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Typography variant="h6" style={{textAlign: 'center'}}>{title}</Typography>
        {icon && <div style={{position: 'absolute', right: 0}}>
          <IconButton onClick={handleClick}>{icon}</IconButton>
        </div>}
      </div>
    </div>
  )
}
const MessagingContainer = ({
    userDetail,
    // channels,
    // channelDetail,
    messageIndicator,
    // initialChatMessage,
    // selectedMembers,
    // selectedChannel,
    // createNewChannel,
    // getMessageChannels,
    // hideMessageChannels,
    // getChannelDetail,
    // sendNewMessage,
    // setSelectedMembers,
    // handleSearchProfiles,
    // setSelectedChannel
  }) => {
  
  const classes = useStyles();
  
  const [ message, setMessage ] = React.useState()
  const [ messageMembers, setMessageMembers ] = React.useState([])
  const [ showChats, setShowChats ] = React.useState(false)
  
  // Temp for local use
  const [ selectedChannel, setSelectedChannel ] = React.useState()
  const [ channelDetail, setChannelDetail ] = React.useState()

  
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'))

  // React.useEffect(() => {
  //   handleSearchProfiles()
  // }, [handleSearchProfiles]);
  // const messagesEnd = React.useRef(null)
  // const scrollDown = () => { messagesEnd.current.scrollIntoView({ behavior: 'smooth' }) }

  // React.useEffect(() => {
  //   if (channelDetail) {
  //     console.log('CHannel detail', channelDetail)
  //     scrollDown()
  //   }
  // }, [messagesEnd, channelDetail, messageIndicator]);

  // React.useEffect(() => {
  //   return () => {
  //     setSelectedChannel()
  //   }
  // }, [setSelectedChannel]);
  // React.useEffect(() => {
  //   if (userDetail && userDetail.email && selectedMembers.length > 0) {
  //     setMessageMembers(selectedMembers)
  //     if (initialChatMessage) {
  //       setMessage(initialChatMessage)
  //     }
  //     let foundChannel
  //     for (let channel of channels) {
  //       const channelMembers = channel.channel_members.map(m => m.member_email).filter(x => x !== userDetail.email)
  //       if (selectedMembers.length === channelMembers.length && selectedMembers.map(x => x.value).sort().every((item, idx) => { return item === channelMembers.sort()[idx] })) {
  //         foundChannel = channel
  //         break
  //       }
  //     }
  //     setSelectedChannel()
  //     setSelectedMembers([])
  //     if (foundChannel) {
  //       getChannelDetail(userDetail.email, foundChannel)
  //     }
  //   }
  // }, [selectedMembers, setSelectedMembers, setSelectedChannel, initialChatMessage, userDetail, channels, getChannelDetail]);
  // React.useEffect(() => {
  //   shave('.message-text', 40)
  //   // shave('.message-members', 40)
  // });
  // React.useEffect(() => {
  //   if (selectedChannel && selectedChannel.id && !selectedChannel.channel_owner) {
  //     const channelList = channels.filter(x => x.id === selectedChannel.id)
  //     if (channelList && channelList.length > 0) {        
  //       setSelectedChannel(userDetail.email, channelList[0])
  //     }
  //   }
  // }, [selectedChannel, channels, setSelectedChannel, userDetail, getChannelDetail]);

  const handleChannelClick = (channel) => {
    // console.log('Channel click', channel)
    setSelectedChannel(channel)
    setChannelDetail({...channel, messages: [{ message: channel.last_message.message, sender_first_name: channel.members[0].first_name, sender_last_name: channel.members[0].last_name, issued_at: channel.last_message.issued_at, sender_profile_image: null}]})
    //   setSelectedChannel(userDetail.email, channel)
    setMessage('')
    if (fullScreen) { setShowChats(true) }
  } 
  const formatMembers = (data) => {
    console.log('Format', data)
    if (!data || data.length === 0) { return [] }
    return data.filter(x => x.email && x.email !== userDetail.email).map(option => ({
      value: option.id,
      label: option.display_name,
      logo: option.profile_image || ''
    }))
  }
  const formatForAutoSelect = (data) => {
    if (!data || data.length === 0 ) { return [] }
    return data.map((item) => ({
      value: item.value || item,
      label: item.label || item,
      logo: item.logo
    }));
  }
  // const handleTextChange = name => value => {
  //   if (typeof value !== string)
  //   console.log('TEXT CHANGE', name, value)
  //   // handleSearchProfiles(value)
  // }
  const handleAutoSelectChange = name => list => {
    setMessageMembers(list)
    if (list && list.length > 0) {
      // const channel = matchChannel(channels, list)
      // if (channel) {
      //   getChannelDetail(userDetail.email, channel)
      //   return
      // }
      // getChannelDetail()
    } else {
      resetMessagePage()
    }
  }
  // const matchChannel = (channelList, newList) => {
  //   for (let channel of channelList) {
  //     const channelMembers = channel.channel_members.map(m => m.member_email).filter(x => x !== userDetail.email)
  //     if (newList.length === channelMembers.length && 
  //       newList.map(x => x.value).sort().every((item, idx) => { return item === channelMembers.sort()[idx] })) {
  //       return channel
  //     }
  //   }
  //   return null
  // }
  const submitMessage = () => {
    if (!message || message.trim() === '') { return }
    // console.log('Message', message)
  //   if (!channelDetail || !channelDetail.messages || channelDetail.messages.length === 0) {
  //     if (!messageMembers || messageMembers.length === 0) { return }
  //     createNewChannel(userDetail.email, messageMembers.map(x => x.value), message)
  //   } else {
  //     sendNewMessage(channelDetail.id, message)
  //     if (!selectedChannel) {
  //       const channelList = channels.filter(x => x.id === channelDetail.id)
  //       if (channelList.length > 0) { handleChannelClick(channelList[0]) }
  //     }
  //   }
    setMessage('')
  }
  const resetMessagePage = () => {
    setMessageMembers([])
    setMessage('')
    setShowChats(false)
    setSelectedChannel()
    setChannelDetail()
    // getMessageChannels(userDetail.email)
    // getChannelDetail()
  }
  const channels = [
    {id: 1, last_message: { message: 'Lorem Ipsum', issued_at: new Date() }, members: [{ email: 'foo@fake.com', first_name: 'John', last_name: 'Doe'}] },
    {id: 2, last_message: { message: 'Lorem Ipsum. Something else here.', issued_at: new Date() }, members: [{ email: 'foo@fake.com', first_name: 'Steve', last_name: 'Doe'}] },
    {id: 3, last_message: { message: 'Hey, Lorem Ipsum', issued_at: new Date() }, members: [{ email: 'foo@fake.com', first_name: 'Jane', last_name: 'Doe'}] },
    {id: 4, last_message: { message: 'Good Morning', issued_at: new Date() }, members: [{ email: 'foo@fake.com', first_name: 'Jack', last_name: 'Doe'}, { email: 'foo@fake.com', first_name: 'Jill', last_name: 'Doe'}] },
    {id: 5, last_message: { message: 'Good Night', issued_at: new Date() }, members: [{ email: 'foo@fake.com', first_name: 'Jack', last_name: 'Doe'}, { email: 'foo@fake.com', first_name: 'Mary', last_name: 'Doe'}, { email: 'foo@fake.com', first_name: 'Steve', last_name: 'Doe'}] }
  ]
  const getChannelName = (channel) => {
    // console.log('Channel Name', channel)
    if (!channel || !channel.members) { return 'Message' }
    const participants = channel.members.filter(user => user.email !== userDetail.email)
    if (!participants || participants.length === 0) { return 'Message' }
    const images = participants.map((x, idx) => {
      return <div key={idx} style={{marginLeft: (idx > 0 ? '-16px' : 0), zIndex: (idx + 1)}} >
        <UserAvatar profile={x} width={36} />
        </div>
    })
    const names = participants.map(x => {
      return x.first_name ? x.first_name + ' ' + x.last_name : '@' + x.username
    })
    return (<div style={{display: 'flex', flexWrap: 'wrap', marginBottom: 8}}>
        <div style={{display: 'flex', alignItems: 'center', marginRight: 8}}>{images}</div>
        <div style={{display: 'flex', alignItems: 'center', fontSize: 15, color: theme.palette.primary.dark}}>{names.join(', ')}</div>
      </div>
    )
  }
  const handleDeleteChannel = (item) => {
    // console.log('Channel delete', item)
  //   if (window.confirm('Would you like to remove this conversation?')) {
  //     hideMessageChannels(userDetail.email, item)
  //     if (selectedChannel && selectedChannel.id === item.id) {  resetMessagePage() }
  //   }
  }

  return (
    <HomeHandyContentContainer style={{backgroundColor: theme.palette.grayscale.tint2}}>
    <Grid container style={{height: '100%', backgroundColor: '#fff', boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'}}>
      <Grid hidden={fullScreen && showChats} item xs={12} sm={4} md={3} style={{position: 'relative', height: '100%', overflow: 'auto'}}>
        <div className={classes.messagesContainer}>
          <MessagingHeader title="Messages" icon={<AddIcon />} handleClick={() => {resetMessagePage(); setShowChats(true)}} />
          {channels.map((item, idx) => {
            return (
              <div key={idx} onClick={(evt) => {if (evt.target.id !== 'close') { handleChannelClick(item)}}} className={cls(classes.channelBox, {'pending': messageIndicator && messageIndicator.includes(item.id)}, {'selected': selectedChannel && selectedChannel.id === item.id})}>
                <div className={classes.channelItem}>
                  <div className='message-members' style={{fontWeight: 500}}>{getChannelName(item)}</div>
                  <div className='message-text'>{item.last_message ? item.last_message.message : ''}</div>
                </div>
                <div style={{fontSize: 10, display: 'flex', flexDirection: 'column', justifyContent: 'space-around', textAlign: 'center'}}>
                  {item.last_message ? parser.shortDate(item.last_message.issued_at, 'MM/dd') : ''}
                  <IconButton style={{padding: 4}} onClick={(evt) => {evt.stopPropagation(); handleDeleteChannel(item)}}><CloseIcon style={{height: 18, width: 18}} id="close" /></IconButton>
                </div>
              </div>
            )
          })}
        </div>
      </Grid>
      <Grid item hidden={fullScreen && !showChats} xs={12} sm={8} md={9} className={cls(classes.gridItem, classes.rightSide)}>
        <div className={classes.messagesContainer}>
          <div style={{borderBottom: 'solid 1px #ccc', padding: '9px 0', margin: '0', display: 'flex', minheight: 72, justifyContent: 'center', alignItems: 'center'}}>
            {!selectedChannel ?
                <AutoFillSelect
                  name='messageMembers'
                  textFieldProps={{
                    id: 'province',
                    label: 'Select members to chat',
                  }}
                  isMulti
                  options={formatMembers([])}
                  selectedValue={formatForAutoSelect(messageMembers)}
                  // handleAutoSelectTextChange={handleTextChange}
                  handleAutoSelectChange={handleAutoSelectChange} />
              : <Typography variant='h6'>{getChannelName(selectedChannel)}</Typography>
            }
          </div>
          <div className={classes.messagesBox}>
            {channelDetail && channelDetail.messages && channelDetail.messages.map((message, idx) => {
              return (<div key={idx} style={{display: 'flex', padding: '16px 4px', width: '100%', borderBottom: 'solid 1px #ccc',}}>
                <div className={classes.avatarBox}>
                  <UserAvatar profile={message} />
                </div>
                <div className={classes.chatItem}>
                  <div style={{fontWeight: 'bold'}}>{message.sender_first_name + ' ' + message.sender_last_name}</div>
                  <div style={{whiteSpace: 'pre-wrap'}}>{message.message}</div>
                </div>
                <div style={{fontSize: 10, whiteSpace: 'nowrap'}}>
                  {parser.dateDistance(message.issued_at)}
                </div>
              </div>)
            })}
            {/* <div style={{float: 'left', clear: 'both'}} ref={messagesEnd}></div> */}
          </div>
          {(selectedChannel || messageMembers.length > 0) ? <div style={{padding: '8px 0', marginTop: 16}}>
            <div style={{display: 'flex'}}>
              <div className={classes.avatarBox}>
                <UserAvatar />
              </div>
                <TextField
                  id="message"
                  name="message"
                  label="Message"
                  fullWidth
                  margin="none"
                  variant="outlined"
                  // value={tripDescription}
                  // onChange={(event) => setTripDescription(event.target.value)}
                  className={classes.multiLineTextBox }
                  multiline
                  rows="3"
                  placeholder=""
                  InputLabelProps={{ shrink: true }}
                />
            </div>
            <div className={classes.actionButtons}>
              <Button onClick={() => submitMessage()} color="primary" variant="contained" style={{marginRight: 8}}>Send</Button>
              <Button onClick={() => resetMessagePage()} variant="outlined">Close</Button>
            </div>
          </div> : <Hidden smUp>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
              <Button onClick={() => resetMessagePage()} variant="contained">Close</Button>
            </div>
          </Hidden>
          }
        </div>
      </Grid>
    </Grid>
  </HomeHandyContentContainer>
  )
}
const mapStateToProps = (state) => {
  return {
    userDetail: state.users.userDetail
    // channels: state.notifications.channels,
    // channelDetail: state.notifications.channelDetail,
    // selectedMembers: state.notifications.selectedMembers,
    // selectedChannel: state.notifications.selectedChannel,
    // messageIndicator: state.notifications.messageIndicator,
    // initialChatMessage: state.notifications.initialChatMessage,
  }
}
const mapDispatch = (dispatch) => {
  return bindActionCreators({
    // createNewChannel: handleCreateNewChannel,
    // getMessageChannels: handleGetMessageChannels,
    // hideMessageChannels: handleHideMessageChannels,
    // getChannelDetail: handleGetChannelDetail,
    // setSelectedMembers: handleSetSelectedMembers,
    // setSelectedChannel: handleSetSelectedChannel,
    // sendNewMessage: handleSendNewMessage,
    // handleSearchProfiles,
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatch)(MessagingContainer)
