import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DialogStepper from '../../components/dialogStepper';
import AgentBankDetails from './agentBankDetails';
import AgentExtendedReview from './agentExtendedReview';
import AgentVerification from './agentVerification';

function AgentExtendedOnboarding ({open, toggleDialog}) {  
    const [activeStepId, setActiveStepId] = React.useState(0)
    React.useEffect(() => {
        if (open)  { setActiveStepId(0) }
    }, [open]);
    const steps= [
        { id: 0, label: 'Agent Verification', component: <AgentVerification handleSubmit={() => setActiveStepId(1)} /> },
        { id: 1, label: 'Bank Account', component: <AgentBankDetails handleSubmit={() => setActiveStepId(2)} /> },
        { id: 2, label: 'Review & Save', component: <AgentExtendedReview handleSubmit={() => toggleDialog(false)} /> },
    ]
    return (
        <DialogStepper
            steps={steps}
            stepId={activeStepId}
            setStepId={setActiveStepId}
            open={open}
            toggleDialog={toggleDialog} />
    );
}

const mapStateToProps = (state) => {
    return {
        userDetail: state.users.userDetail
    }
  }
const mapDispatch = (dispatch) => {
    return bindActionCreators({
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatch)(AgentExtendedOnboarding);
