import * as React from 'react';
import { useState, useEffect } from 'react';

import { WebPartContext } from "@microsoft/sp-webpart-base";
import { PanelType } from 'office-ui-fabric-react/lib/Panel';
import { CustomPanel } from '@mikezimm/fps-library-v2/lib/components/molecules/SourceList/Custom/CustomPanel';

import Accordion from '@mikezimm/fps-library-v2/lib/components/molecules/Accordion/Accordion';
import SourcePages from '@mikezimm/fps-library-v2/lib/components/molecules/SourcePage/SourcePages';

import styles from '../SampleForm.module.scss';
import { doesNotStartNumber, toCamelCase } from '../Provision/functions/strings';
import { IDropdownOption } from 'office-ui-fabric-react';
import { IStateSource } from '@mikezimm/fps-library-v2/lib/pnpjs/Common/IStateSource';
import { createLibraryPnpjs } from '../Provision/functions/createLibraryPnpjs';
import { requstLibraryLabel } from './functions/requestLabel';
import { ICorpLabelsSource } from '../../storedSecrets/AS303 Labels v3 - JSON Formatted';
import { ILoadPerformance, IPerformanceOp } from '@mikezimm/fps-library-v2/lib/components/molecules/Performance/IPerformance';
import { createPerformanceRows } from '@mikezimm/fps-library-v2/lib/components/molecules/Performance/tables';
import { makeid } from '@mikezimm/fps-library-v2/lib/logic/Strings/guids';
import { LabelRequestSource, fetchLabelRequests, fetchMinimalLabelRequests } from './functions/fetchLabelRequests';
import { ISourceProps } from '@mikezimm/fps-library-v2/lib/pnpjs/SourceItems/Interface';
import { IAnySourceItem } from '@mikezimm/fps-library-v2/lib/components/molecules/AnyContent/IAnyContent';
import { createRequestsRow } from './Row';

const constId: string = makeid(5);
const EmptyState: IStateSource = { fpsContentType: [ 'item' ], items: [], index: [], loaded: false, refreshId: constId, status: 'Unknown', e: null, };

export interface ILabelRequestProps {
  context: WebPartContext;
  expandedState: boolean;  //Is this particular page expanded
}

export type IPanelOption = 'performance' | 'item';  // Define what kinds of variants of the panel you want

export type ITopButtons = 'Mine' | 'OtherPeeps' | 'ThisSite' | 'OtherSites';
export const TopButtons: ITopButtons[] = [ 'Mine', 'OtherPeeps', 'ThisSite', 'OtherSites' ];

/***
 *    .d8888. d888888b  .d8b.  d8888b. d888888b      db   db  .d88b.   .d88b.  db   dD 
 *    88'  YP `~~88~~' d8' `8b 88  `8D `~~88~~'      88   88 .8P  Y8. .8P  Y8. 88 ,8P' 
 *    `8bo.      88    88ooo88 88oobY'    88         88ooo88 88    88 88    88 88,8P   
 *      `Y8b.    88    88~~~88 88`8b      88         88~~~88 88    88 88    88 88`8b   
 *    db   8D    88    88   88 88 `88.    88         88   88 `8b  d8' `8b  d8' 88 `88. 
 *    `8888Y'    YP    YP   YP 88   YD    YP         YP   YP  `Y88P'   `Y88P'  YP   YD 
 *                                                                                     
 *                                                                                     
 */

const RequestsHook: React.FC<ILabelRequestProps> = ( props ) => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { context, expandedState } = props;

  const [ refreshId, setRefreshId ] = useState<string>( makeid( 5 ) );
  const [ procPerformance, setProcPerformance ] = useState<IPerformanceOp[]>( [] );

  const [ users, setUsers ] = useState< IStateSource > ( JSON.parse(JSON.stringify( EmptyState )));
  const [ sites, setSites ] = useState< IStateSource > ( JSON.parse(JSON.stringify( EmptyState )));
  const [ requests, setRequests ] = useState< IStateSource > ( JSON.parse(JSON.stringify( EmptyState )));
  const [ allRequests, setAllRequests ] = useState< IStateSource > ( JSON.parse(JSON.stringify( EmptyState )));

  const [ showPanel, setShowPanel ] = useState<boolean>( false );
  const [ panelItem, setPanelItem ] = useState<IAnySourceItem>( null );

  /**
   * State related to fetching the source props
   */
  const [ fetched, setFetched ] = useState<boolean>( false );

/***
   *     .o88b. db    db d8888b. d8888b. d88888b d8b   db d888888b      .d8888. d888888b d888888b d88888b 
   *    d8P  Y8 88    88 88  `8D 88  `8D 88'     888o  88 `~~88~~'      88'  YP   `88'   `~~88~~' 88'     
   *    8P      88    88 88oobY' 88oobY' 88ooooo 88V8o 88    88         `8bo.      88       88    88ooooo 
   *    8b      88    88 88`8b   88`8b   88~~~~~ 88 V8o88    88           `Y8b.    88       88    88~~~~~ 
   *    Y8b  d8 88b  d88 88 `88. 88 `88. 88.     88  V888    88         db   8D   .88.      88    88.     
   *     `Y88P' ~Y8888P' 88   YD 88   YD Y88888P VP   V8P    YP         `8888Y' Y888888P    YP    Y88888P 
   *                                                                                                      
   *                                                                                                      
   */

  useEffect(() => {
    //  https://ultimatecourses.com/blog/using-async-await-inside-react-use-effect-hook

    if ( expandedState === true && fetched === false ) {
      const getItems = async (): Promise<void> => {
        const MockBannerProps = {
          FPSUser: { Title: context.pageContext.user.displayName },
          context: { pageContext: { site: {  serverRelativeUrl: context.pageContext.site.serverRelativeUrl }}}
        }
        const [ users, sites, requests ] = await fetchMinimalLabelRequests( MockBannerProps as any, null, [] );
        const all = await fetchLabelRequests( MockBannerProps as any, LabelRequestSource as ISourceProps , null );

        console.log( 'Found these Requests: users', users );
        console.log( 'Found these Requests: sites', sites );
        console.log( 'Found these Requests: requests', requests );
        console.log( 'Found these Requests: all', all );

        setUsers( users );
        setSites( sites );
        setRequests( requests );
        setAllRequests( all );
      };

      // eslint-disable-next-line no-void
      void getItems(); // run it, run it

      return () => {
        // this now gets called when the component unmounts
      };
    }

  }, [ expandedState, fetched ] );

  const panelContent : JSX.Element = showPanel !== true ? undefined : CustomPanel({
    source: null,
    primarySource: LabelRequestSource,

    // customElement1: createPerformanceTableVisitor( panelJSON, [] ) ,

    item: panelItem,
    onClosePanel: () => { setShowPanel( false ) },
    // customElement1B: FPSPropsJSON,

    showItemPanel: showPanel,
    search: null,

    searchText: '',

    refreshId: refreshId,
    showCanvasContent1: false,
    showProperties: true,

    reactPanelType: PanelType.medium,

    showHeading: true,

  });

  const setNewPanelItem = ( command: string, Id: number, type: IPanelOption, item: IAnySourceItem ): void => {
    setPanelItem( item );
    setShowPanel( true );
  }
  
  /***
   *     .d88b.  d8b   db       .o88b. db      d888888b  .o88b. db   dD .d8888. 
   *    .8P  Y8. 888o  88      d8P  Y8 88        `88'   d8P  Y8 88 ,8P' 88'  YP 
   *    88    88 88V8o 88      8P      88         88    8P      88,8P   `8bo.   
   *    88    88 88 V8o88      8b      88         88    8b      88`8b     `Y8b. 
   *    `8b  d8' 88  V888      Y8b  d8 88booo.   .88.   Y8b  d8 88 `88. db   8D 
   *     `Y88P'  VP   V8P       `Y88P' Y88888P Y888888P  `Y88P' YP   YD `8888Y' 
   *                                                                            
   *                                                                            
   */
  /***
 *    d88888b db      d88888b .88b  d88. d88888b d8b   db d888888b 
 *    88'     88      88'     88'YbdP`88 88'     888o  88 `~~88~~' 
 *    88ooooo 88      88ooooo 88  88  88 88ooooo 88V8o 88    88    
 *    88~~~~~ 88      88~~~~~ 88  88  88 88~~~~~ 88 V8o88    88    
 *    88.     88booo. 88.     88  88  88 88.     88  V888    88    
 *    Y88888P Y88888P Y88888P YP  YP  YP Y88888P VP   V8P    YP    
 *                                                                 
 *                                                                 
 */


  // This should hide the procPerformance if it is less than 10ms
  // const valProcPerformance = !procPerformance ? procPerformance : checkDeepProperty( procPerformance, [ 'unifiedPerformanceOps', 'process', 'ms' ], 'Actual' );
  // const showProcPerformance = valProcPerformance && valProcPerformance > 10 ? true : false;

  // const MainContent: JSX.Element = <div className={ 'eZAnalyticsInfo' }style={{ cursor: 'default', padding: '5px 0px 5px 0px' }}>
  //   { !showProcPerformance  ? undefined : <div>{ createPerformanceRows( { ops: { process0: procPerformance.unifiedPerformanceOps.process } } as ILoadPerformance, [ 'process0' ], 10 ) }</div> }
  // </div>;

  // const accordionHeight: number = option === null ? 100 : 120;

  // const InfoElement: JSX.Element = <Accordion 
  //   title = { `More information about this tab`}
  //   defaultIcon = 'Help'
  //   showAccordion = { true }
  //   content = { MainContent }
  //   refreshId={ makeid(5) }
  //   contentStylesVis = { { height: `${accordionHeight}px` } }
  // />;

  // if ( check4This(`sourceResults=true`) === true ) console.log('sourceResults analyticsHookState:', xFilters[ tab ], tab, useThisState );

  const itemsElement = <SourcePages
    // source={ SourceInfo }
    primarySource={ LabelRequestSource }
    itemsPerPage={ 20 }
    pageWidth={ 1000 }
    topButtons={ TopButtons }
    stateSource={ requests }
    startQty={ 20 }
    showItemType={ false }
    debugMode={ null }

    tableHeaderElements={ LabelRequestSource.columns }
    tableClassName= { 'ezAnalyticsTable' } // styles.itemTable
    tableHeaderClassName= { [  ].join( ' ' )  } // stylesRow.genericItem
    selectedClass={ `` }

    renderRow={ createRequestsRow }

    deepProps={ null } //deepProps

    onParentCall={ setNewPanelItem } // onParentCallFunction
    headingElement={ <div>headingElement</div> }
    ageSlider={ true }
    searchAgeOp={ 'show >' }
    searchAgeProp={ 'createdAge' }
  />;

  const FinalElement: JSX.Element = <div className = { [].join( ' ' ) } style={{ }}>
  { itemsElement }
  { panelContent }
</div>;

  return ( FinalElement );

}

export default RequestsHook;