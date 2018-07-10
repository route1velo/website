import * as React from 'react';
import client from '../lib/ContentfulClient';
import { Entry } from 'contentful';
import { Alert, Collapse } from 'reactstrap';

interface SiteAlertProps {}

interface Alert {
  alertMessage: string;
  name: string;
  showAlert: boolean;
  showAlertUntil: string;
  color: string;
}
interface SiteAlertState {
  alert: Entry<Alert>;
  isOpen: boolean;
}

class SiteAlert extends React.Component<SiteAlertProps, SiteAlertState> {

  state = {
    alert: {} as Entry<Alert>,
    isOpen: false,
  };

  async componentDidMount() {
    const response = await client.getEntry('50KGCulAGIY8SYmeC2YesQ');
    this.setState({ alert: response as Entry<Alert> }),
    setTimeout(
      () => this.setState({ isOpen: true }),
      500
    );
  }

  render() {
    const { fields } = this.state.alert;
    if (!fields || !fields.showAlert || new Date(fields.showAlertUntil) < new Date()) {
      return null;
    }

    return (
      <Collapse isOpen={this.state.isOpen}>
        <Alert color={fields.color}>
          {this.state.alert.fields.alertMessage}
        </Alert>
      </Collapse>
    );
  }
}

export default SiteAlert;