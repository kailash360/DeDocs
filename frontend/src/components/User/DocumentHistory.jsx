import React from 'react'
import { Grid } from '@mui/material'
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import '../../static/scss/User/DocumentHistory.scss'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Constants from '../../Constants'
import ConvertDate from '../../utils/ConvertDate'

function DocumentHistoryItem({event}){
  return(
  <VerticalTimelineElement
    className="vertical-timeline-element--work document-history-item"
    contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
    date={ConvertDate(event.returnValues.timestamp)}
    dateClassName='date'
    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
    icon={<FiberManualRecordIcon />}
  >
    <h3 className="vertical-timeline-element-title">{Constants.EVENTS[event.event].name}</h3>
    <Grid container>
      <Grid item sm={12}>
        <strong>Transaction Hash</strong>
        <p className='hash'>{event.transactionHash}</p>
      </Grid>  
      <Grid item sm={12}>
        <strong>Message</strong>
        <p className='message'>{event.returnValues.message || Constants.EVENTS[event.event].defaultMessage}</p>
      </Grid>
    </Grid>
  </VerticalTimelineElement>)
}

function DocumentHistory({history}) {
  return (
    <Grid container className='document-history'>
      <Grid item sm={12}>
        <p className='heading'>Document History</p>
        <hr />
      </Grid>
      <Grid item sm={12}>   
        <VerticalTimeline
          lineColor='black'
        >
        {history && history.map(event => 
            <DocumentHistoryItem event={event} />
        )}
        </VerticalTimeline>
      </Grid>
    </Grid>
  )
}

export default DocumentHistory