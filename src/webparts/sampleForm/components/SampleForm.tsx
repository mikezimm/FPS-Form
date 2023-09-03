import * as React from 'react';
import { WebPartContext } from "@microsoft/sp-webpart-base";

import styles from './SampleForm.module.scss';

import { LabelExportJSON } from '../storedSecrets/AS303 Labels v3 - JSON Formatted';

import ListProvisionHook from './Provision/ListProvisionHook'
import RequestsHook from './Requests/RequestsHook'

export interface ISampleFormProps {
  context: WebPartContext;
}
export interface ISampleFormState {

}
export default class SampleForm extends React.Component<ISampleFormProps, ISampleFormState> {

  public constructor(props:ISampleFormProps){
    super(props);
    this.state = {
    };
  }

  public async componentDidMount(): Promise<void> {
    //
  }

  public render(): React.ReactElement<ISampleFormProps> {
    return (
      <div>
        <ListProvisionHook 
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          context={ this.props.context as any }
          labelItems={ LabelExportJSON }
        />
        <RequestsHook 
          context={ this.props.context }
          expandedState={ true }
        />
      </div>

    );
  }
}
