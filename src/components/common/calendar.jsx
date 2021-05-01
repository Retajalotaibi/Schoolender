import * as React from "react";
import Paper from "@material-ui/core/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Appointments,
  AllDayPanel,
} from "@devexpress/dx-react-scheduler-material-ui";

const currentDate = "2021-05-01";

export default class Calendar extends React.Component {
  state = {
    appointments: [],
  };
  handleLoading = () => {
    let appointmentss;
    if (this.props.appointments) {
      appointmentss = this.props.courses.map((appointment, index) =>
        handleDate(appointment, index)
      );
    }
    console.log(appointmentss);
  };
  render() {
    return (
      <Paper>
        <Scheduler data={this.state.appointments} height={660}>
          <ViewState defaultCurrentDate={currentDate} />
          <WeekView startDayHour={9} endDayHour={19} />
          <Appointments />
          <AllDayPanel />
        </Scheduler>
      </Paper>
    );
  }
}
function handleDate(appointment, index) {
  const dateStarts = appointment.starts.split("-");
  const dateEnds = appointment.ends.split("-");
  return {
    title: appointment.name,
    startDate: new Date(dateStarts[0], dateStarts[1], dateStarts[2], 9, 15),
    endDate: new Date(dateEnds[0], dateEnds[1], dateEnds[2], 10, 15),
    id: index,
    location: "classroom 1",
  };
}
