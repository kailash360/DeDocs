import React from 'react'
import { Grid } from '@mui/material'
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import '../../static/scss/User/DocumentHistory.scss'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

function DocumentHistoryItem(){
  return(
  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
    date="2011 - present"
    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
    icon={<FiberManualRecordIcon />}
  >
    <h3 className="vertical-timeline-element-title">Creative Director</h3>
    <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
    <p>
      Creative Direction, User Experience, Visual Design, Project Management, Team Leading
    </p>
  </VerticalTimelineElement>)
}

function DocumentHistory() {
  return (
    <Grid container className='document-history'>
      <Grid item sm={12}>
        <p className='heading'>Document History</p>
        <hr />
      </Grid>
      <Grid item sm={12}>
        <VerticalTimeline>
          <DocumentHistoryItem/>
        </VerticalTimeline>
      </Grid>
    </Grid>
  )
}

export default DocumentHistory