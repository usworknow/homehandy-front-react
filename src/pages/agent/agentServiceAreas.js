import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AutoFillSelect from '../../components/autoFillSelect';
import ChipList from '../../components/chipList';
import HomeHandyButton from '../../components/hhButton';

function AgentServiceAreas ({serviceAreaList, company, handleSubmit}) {
  const [ areas, setAreas ]  = React.useState([])
  React.useEffect(() => {
    if (company && company.id && company.service_areas) {
      setAreas(company.service_areas)
    }
  }, [company]);
  const onFormSubmit = (event) => {
    event.preventDefault()
    handleSubmit(company.id, areas.map(x => Number(x.id)))
  }
  const handleAutoSelectChange = name => value => {
    setAreas(oldValues => [...oldValues, value])
  }
  const handleDelete = (areaToDelete) => {
    setAreas((oldValues) => oldValues.filter(area => area.id !== areaToDelete.id));
  };
  return (
    <form onSubmit={onFormSubmit}>
      <div style={{width: '100%', textAlign: 'left'}}>
        <Typography gutterBottom variant="h6">Service Areas</Typography>
        <Typography gutterBottom variant="body2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam bibendum imperdiet mi, at dapibus arcu laoreet eu. Pellentesque sed turpis sit amet mi posuere bibendum at sit amet nunc. In vehicula vitae est sit amet pharetra.
        </Typography>
      </div>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={7}>
          <AutoFillSelect 
            name='areas'
            options={serviceAreaList.filter(x => !areas.map(a => a.id).includes(x.id))}
            textFieldProps={{
              label: 'Select Service Area',
            }}
            selectedValue={''}
            handleAutoSelectChange={handleAutoSelectChange} />
        </Grid>
        <Grid item xs={12} style={{minHeight: 200}}>
          <ChipList style={{paddingLeft: 0, justifyContent: 'flex-start'}} chipData={areas.map((a, i) => ({id: a.id || i, value: a.id, label: a.label}))} handleDelete={handleDelete} />
        </Grid>
      </Grid>
      <HomeHandyButton fullWidth type="submit" style={{margin: '16px 0'}}>
          Next
      </HomeHandyButton>
    </form>
  )
}

const mapStateToProps = (state) => {
  return { 
    serviceAreaList: state.service_areas.service_areas
  }
}
const mapDispatch = (dispatch) => {
    return bindActionCreators({
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatch)(AgentServiceAreas)
