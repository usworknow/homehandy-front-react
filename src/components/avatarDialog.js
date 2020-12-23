import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleUpdateLogo } from '../reducers/companies';
import { handleUpdateProfileImage } from '../reducers/users';
import AvatarEditor from './avatorEditor';

function AvatarDialog ({open, toggleDialog, userDetail, companies, handleUpdateLogo, handleUpdateProfileImage}) {
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
    const handlePhotoSelected = (file) => {
        if (userDetail.default_profile === 'customer') {
            handleUpdateProfileImage(userDetail.id, file)
        } else {
            handleUpdateLogo(file)
        }
            
        toggleDialog(false)
    }

    const getImage = () => {
        if (!userDetail) { return null }
        if (userDetail && userDetail.default_profile === 'agent' && companies && companies.length > 0) {
          return companies[0].logo
        }
        return userDetail.profile_image
      }
    return (
        <Dialog
            open={open}
            onClose={() => toggleDialog(false)}
            fullScreen={fullScreen}
            maxWidth="sm"
        >
            <DialogTitle>Edit Image</DialogTitle>
            <DialogContent style={{minWidth: 300}}>
                <AvatarEditor
                    profileImage={getImage()}
                    handlePhotoSelected={handlePhotoSelected} />
            </DialogContent>
        </Dialog>
    );
}

const mapStateToProps = (state) => {
    return {
        userDetail: state.users.userDetail,
        companies: state.companies.logo,
    }
  }
const mapDispatch = (dispatch) => {
    return bindActionCreators({
        handleUpdateProfileImage,
        handleUpdateLogo
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatch)(AvatarDialog);
