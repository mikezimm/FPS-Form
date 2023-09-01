import * as React from 'react';
import { WebPartContext } from "@microsoft/sp-webpart-base";

import styles from './SampleForm.module.scss';
import { ISampleFormState } from './Provision/interfaces/ISampleFormProps';

import { IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { LabelExportJSON } from '../storedSecrets/AS303 Labels v3 - JSON Formatted';
import { makeid } from '@mikezimm/fps-library-v2/lib/logic/Strings/guids';
import { LabelRequestSource, fetchLabelRequests, fetchMinimalLabelRequests } from './Requests/functions/fetchLabelRequests';
import { ISourceProps } from '@mikezimm/fps-library-v2/lib/pnpjs/SourceItems/Interface';

import ListProvisionHook from './Provision/ListProvisionHook'
import RequestsHook from './Requests/RequestsHook'

export interface ISampleFormProps {
  context: WebPartContext;
}

export default class SampleForm extends React.Component<ISampleFormProps, ISampleFormState> {

  private LabelOptions: IDropdownOption[] = LabelExportJSON.map( ( item ) => {
    return {
      key: item.RecordCode,
      text: `${item.RecordCode}: ${item.RecordTitle}`,
      title: item.RecordTitle,
    }
  });

  private DefaultLabel = this.LabelOptions[2].key;

  public constructor(props:ISampleFormProps){
    super(props);

    const constId: string = makeid(5);

    this.state = {

        users : { fpsContentType: [ 'item' ], items: [], index: [], loaded: false, refreshId: constId, status: 'Unknown', e: null, },
        sites : { fpsContentType: [ 'item' ], items: [], index: [], loaded: false, refreshId: constId, status: 'Unknown', e: null },
        requests : { fpsContentType: [ 'item' ], items: [], index: [], loaded: false, refreshId: constId, status: 'Unknown', e: null },
        allRequests : { fpsContentType: [ 'item' ], items: [], index: [], loaded: false, refreshId: constId, status: 'Unknown', e: null },
    };
  }

  public async componentDidMount(): Promise<void> {

    const MockBannerProps = {
      FPSUser: { Title: this.props.context.pageContext.user.displayName },
      context: { pageContext: { site: {  serverRelativeUrl: this.props.context.pageContext.site.serverRelativeUrl }}}
    }
    const [ users, sites, requests ] = await fetchMinimalLabelRequests( MockBannerProps as any, null, [] );
    const all = await fetchLabelRequests( MockBannerProps as any, LabelRequestSource as ISourceProps , null );

    console.log( 'Found these Requests: users', users );
    console.log( 'Found these Requests: sites', sites );
    console.log( 'Found these Requests: requests', requests );
    console.log( 'Found these Requests: all', all );

    this.setState( { users: users, sites: sites, requests: requests, allRequests: all });

  }

  public render(): React.ReactElement<ISampleFormProps> {
    return (
      <div>
        <ListProvisionHook 
          context={ this.props.context }
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
