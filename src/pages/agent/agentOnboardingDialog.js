import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DialogStepper from '../../components/dialogStepper';
import { handleAddCompany, handleAddPackage, handleUpdateCompany, handleUpdatePackage, handleUpdateServiceAreas, handleUpdateServices } from '../../reducers/companies';
import { handleSwitchRole } from '../../reducers/users';
import OnboardingServices from '../onboarding/onboardingServices';
import AgentBenefits from './agentBenefits';
import AgentCompanyInfo from './agentCompanyInfo';
import AgentReview from './agentReview';
import AgentServiceAreas from './agentServiceAreas';
import AgentServicePackageForm from './agentServicePackageForm';

function AgentOnboardingDialog ({open, toggleDialog, userDetail, companies, handleAddCompany, handleUpdateCompany, handleAddPackage, handleUpdatePackage, handleUpdateServiceAreas, handleUpdateServices, handleSwitchRole}) {  
    const [activeStepId, setActiveStepId] = React.useState(0)
    const [activeServicePackage, setActiveServicePackage] = React.useState({})
    React.useEffect(() => {
        if (userDetail && companies && companies.length > 0) {
            if (!companies[0].service_areas) {
                setActiveStepId(2)
            } else if (!companies[0].services) {
                setActiveStepId(3)
            } else if (!companies[0].service_packages) {
                setActiveStepId(4)
            } else {
                const lastPackage = companies[0].service_packages[companies[0].service_packages.length - 1];
                setActiveServicePackage(lastPackage)
                setActiveStepId(5)
            }
        }
    }, [userDetail, companies])
    const onSaveCompany = (company) => {
        if (!company.id) {
            handleAddCompany(company)
        } else {
            handleUpdateCompany(company)
        }
    }
    const onSaveAreas = (companyId, areas) => {
        handleUpdateServiceAreas(companyId, areas)
    }
    const onSaveServices = (companyId, services) => {
        handleUpdateServices(companyId, services)
    }
    const onSavePackage = (companyId, servicePackage) => {
        if (servicePackage.id) {
            handleUpdatePackage(companyId, servicePackage)
        } else {
            handleAddPackage(companyId, servicePackage)
        }
    }
    const onAdditionalPackage = () => {
        setActiveServicePackage({})
        setActiveStepId(4)
    }
    const onEditPackage = () => {
        const lastPackage = companies[0].service_packages[companies[0].service_packages.length - 1];
        setActiveServicePackage(lastPackage)
        setActiveStepId(4)
    }
    const steps= [
        { id: 0, label: 'Agent Benefits', component: <AgentBenefits handleSubmit={() => setActiveStepId(1)} /> },
        { id: 1, label: 'Company Information', component: <AgentCompanyInfo company={companies && companies[0]} handleSubmit={onSaveCompany} /> },
        { id: 2, label: 'Service Areas', component: <AgentServiceAreas company={companies && companies[0]} handleSubmit={onSaveAreas} /> },
        { id: 3, label: 'Services Offered', component: <OnboardingServices role="agent" company={companies && companies[0]} handleSubmit={onSaveServices} /> },
        { id: 4, label: 'Create Service Packages', component: <AgentServicePackageForm company={companies && companies[0]} servicePackage={activeServicePackage} handleSkip={() => setActiveStepId(5)} handleSubmit={onSavePackage} /> },
        { id: 5, label: 'Review & Save', component: <AgentReview company={companies && companies[0]} editPackage={onEditPackage} addPackage={onAdditionalPackage} handleSubmit={() => { handleSwitchRole(); toggleDialog(false) } } /> },
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
        userDetail: state.users.userDetail,
        companies: state.companies.companyList,
    }
  }
const mapDispatch = (dispatch) => {
    return bindActionCreators({
        handleSwitchRole,
        handleAddCompany,
        handleUpdateCompany,
        handleUpdateServiceAreas,
        handleUpdateServices,
        handleAddPackage,
        handleUpdatePackage,
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatch)(AgentOnboardingDialog);
