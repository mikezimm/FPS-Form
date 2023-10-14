import * as React from 'react';
import { WebPartContext } from "@microsoft/sp-webpart-base";

import { Pivot, PivotItem, PivotLinkFormat, PivotLinkSize, } from 'office-ui-fabric-react/lib/Pivot';

import { LabelExportJSON } from '../storedSecrets/AS303 Labels v3 - JSON Formatted';

import ListProvisionHook from './Provision/ListProvisionHook'
import RequestsHook from './Requests/RequestsHook'
import ApplyTemplateHook from './ApplyTemplateHook/ApplyTemplateHook'
import { IStateSource } from '@mikezimm/fps-library-v2/lib/pnpjs/Common/IStateSource';
import { IDefinedListInfo } from './ApplyTemplateHook/interfaces/ProvisionTypes';
import { ProvisionInstructions } from './Instructions';
import FixerUpperHook from './FixerUpper/FixerUpperHook';
import HubCategories from './Categories/Categories';
import { EasySearch } from './Categories/customHubSearch';

export interface ISampleFormProps {
  context: WebPartContext;
}

export type IProvTab = 'Instructions' | 'Create Library' | 'Apply Template' | 'Label History' | 'HubCategories';

export const provTabs: IProvTab[] = [ 'HubCategories', 'Instructions', 'Create Library', 'Apply Template', 'Label History' ];

export interface ISampleFormState {
  provisionedLists: IStateSource[];
  siteLists: IStateSource[];
  provisionTab: IProvTab;
  selectedTemplate?: IDefinedListInfo;
}
export default class SampleForm extends React.Component<ISampleFormProps, ISampleFormState> {

  public constructor(props:ISampleFormProps){
    super(props);
    this.state = {
      provisionedLists: [],
      siteLists: [],
      provisionTab: provTabs[0],
      selectedTemplate: null,
    };
  }

  public async componentDidMount(): Promise<void> {
    //
  }

  public render(): React.ReactElement<ISampleFormProps> {

    const useLists: IStateSource[] = this.state.provisionedLists;

    const PivotElement: JSX.Element = <Pivot 
        linkFormat={PivotLinkFormat.links}
        linkSize={PivotLinkSize.normal}
        onLinkClick= { this.clickPivot.bind(this) }
        selectedKey= { this.state.provisionTab }
        // selectedKey={ null } <== makes it so nothing is ever shown as selected.
        headersOnly={true}>
      { provTabs.map( tab => {
        return <PivotItem headerText={ tab } key={ tab } />;
      }) }
    </Pivot>;

    const MockBannerProps = {
      FPSUser: { Title: this.props.context.pageContext.user.displayName },
      context: { pageContext: { site: {  serverRelativeUrl: this.props.context.pageContext.site.serverRelativeUrl }}}
    }

   const TemplateElement: JSX.Element = <div>
      <h2>React Component to: 1. Provision lists, 2. Request labels and 3. Apply template</h2>
      { PivotElement }
      {/* <MockApplyHook /> */}
      {/* { this.state.provisionTab === 'Instructions' ? ProvisionInstructions() : undefined }
      <ListProvisionHook 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        context={ this.props.context as any }
        labelItems={ LabelExportJSON }
        updateParentLists={ this.updateCreatedLibraries.bind( this ) }
        expandedState= { this.state.provisionTab === 'Create Library' ? true : false }
      />
      <ApplyTemplateHook 
        listExists= { true }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        context={ this.props.context as any }
        propsRefreshId={ useLists && useLists.length > 0 ? useLists[0].refreshId : '' }
        expandedState={ this.state.provisionTab === 'Apply Template' ? useLists && useLists[0] && useLists[0].status === 'Success' ? true : 'Nudge' : false }
        targetList={ useLists && useLists.length > 0 ? useLists[0].item : null }
        updateSelectedTemplate={ this.updateSelectedTemplate.bind( this ) }
        selectedTemplate={ this.state.selectedTemplate }
      />
      <RequestsHook 
        context={ this.props.context }
        expandedState={ this.state.provisionTab === 'Label History' ? true : false }
      /> */}
    </div>

    return (
      <div>
        <HubCategories 
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          bannerProps={ MockBannerProps as any }
          expandedState={ true }
          EasySearch={ EasySearch }
          text1={ { label: `Title`, value: `This is a GM DAB Quality Strategy`} }
          text2={ { label: `Description`, value: `located at Facility ÄEU and Quote Korea`} }
        />
      </div>

    );
  }

  private clickPivot( item: PivotItem ) : void {
    this.setState({ provisionTab: item.props.headerText as 'Create Library' } );
  }

  private updateCreatedLibraries( lists: IStateSource[], doThis: string, param: IProvTab ): void {
    let tab = this.state.provisionTab;
    if ( doThis === 'setTab' ) {
      tab = param;
    } else {
      alert( 'Unexpected doThis in updateCreatedLibraries ~ 73');
    }

    this.setState({ provisionedLists: lists, provisionTab: tab });
  }

  private updateSelectedTemplate( template: IDefinedListInfo ): void {

    this.setState({ selectedTemplate: template });
  }

}
