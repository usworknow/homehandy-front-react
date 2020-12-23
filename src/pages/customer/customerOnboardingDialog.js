import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DialogStepper from '../../components/dialogStepper';
import { handleAddProperty, handleUpdateServices } from '../../reducers/properties';
import OnboardingServices from '../onboarding/onboardingServices';
import CustomerPropertyForm from './customerPropertyForm';

function CustomerOnboardingDialog ({open, toggleDialog, properties, handleAddProperty, handleUpdateServices}) {  
    const [activeStepId, setActiveStepId] = React.useState(0)
    React.useEffect(() => {
        if (open)  { setActiveStepId(0) }
    }, [open]);
    
    const onServicesSubmit = (propertyId, services) => {
        handleUpdateServices(propertyId, services)
        toggleDialog(false)
    }
    const onPropertySubmit = property => {
        handleAddProperty(property)
        setActiveStepId(1)
    }
    const steps= [
        { id: 0, label: 'Property Information', component: <CustomerPropertyForm handleSubmit={onPropertySubmit} /> },
        { id: 1, label: 'Specify Services', component: <OnboardingServices role="customer" property={properties && properties[0]} handleSubmit={onServicesSubmit} /> },
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
        properties: state.properties.propertyList
    }
  }
const mapDispatch = (dispatch) => {
    return bindActionCreators({
        handleAddProperty,
        handleUpdateServices
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatch)(CustomerOnboardingDialog);
