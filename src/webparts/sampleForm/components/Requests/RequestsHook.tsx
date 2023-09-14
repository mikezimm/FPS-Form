import * as React from 'react';
import { useState, useEffect } from 'react';

import { WebPartContext } from "@microsoft/sp-webpart-base";
import { PanelType } from 'office-ui-fabric-react/lib/Panel';
import { CustomPanel } from '@mikezimm/fps-library-v2/lib/components/molecules/SourceList/Custom/CustomPanel';

import Accordion from '@mikezimm/fps-library-v2/lib/components/molecules/Accordion/Accordion';
import SourcePages from '@mikezimm/fps-library-v2/lib/components/molecules/SourcePage/SourcePages';

import styles from '../SampleForm.module.scss';
import { IStateSource } from '@mikezimm/fps-library-v2/lib/pnpjs/Common/IStateSource';

import { IPerformanceOp } from '@mikezimm/fps-library-v2/lib/components/molecules/Performance/IPerformance';

import { makeid } from '@mikezimm/fps-library-v2/lib/logic/Strings/guids';
import { LabelRequestSource, fetchLabelRequests, fetchMinimalLabelRequests } from './functions/fetchLabelRequests';
import { ISourceProps } from '@mikezimm/fps-library-v2/lib/pnpjs/SourceItems/Interface';
import { IAnySourceItem } from '@mikezimm/fps-library-v2/lib/components/molecules/AnyContent/IAnyContent';
import { createRequestsRow, requestRowHeaders } from './Row';

/***
 *     .o88b.  .d88b.  d8b   db .d8888. d888888b  .d8b.  d8b   db d888888b .d8888. 
 *    d8P  Y8 .8P  Y8. 888o  88 88'  YP `~~88~~' d8' `8b 888o  88 `~~88~~' 88'  YP 
 *    8P      88    88 88V8o 88 `8bo.      88    88ooo88 88V8o 88    88    `8bo.   
 *    8b      88    88 88 V8o88   `Y8b.    88    88~~~88 88 V8o88    88      `Y8b. 
 *    Y8b  d8 `8b  d8' 88  V888 db   8D    88    88   88 88  V888    88    db   8D 
 *     `Y88P'  `Y88P'  VP   V8P `8888Y'    YP    YP   YP VP   V8P    YP    `8888Y' 
 *                                                                                 
 *                                                                                 
 */

const constId: string = makeid(5);
const EmptyState: IStateSource = { fpsContentType: [ 'item' ], items: [], index: [], loaded: false, refreshId: constId, status: 'Unknown', e: null, };
export type IPanelOption = 'performance' | 'item';  // Define what kinds of variants of the panel you want

export type ITopButtons = 'Mine' | 'OtherPeople' | 'ThisSite' | 'OtherSites';
export const TopButtons: ITopButtons[] = [ 'Mine', 'OtherPeople', 'ThisSite', 'OtherSites' ];

/***
 *    db   db  .d88b.   .d88b.  db   dD      d8888b. d8888b.  .d88b.  d8888b. .d8888. 
 *    88   88 .8P  Y8. .8P  Y8. 88 ,8P'      88  `8D 88  `8D .8P  Y8. 88  `8D 88'  YP 
 *    88ooo88 88    88 88    88 88,8P        88oodD' 88oobY' 88    88 88oodD' `8bo.   
 *    88~~~88 88    88 88    88 88`8b        88~~~   88`8b   88    88 88~~~     `Y8b. 
 *    88   88 `8b  d8' `8b  d8' 88 `88.      88      88 `88. `8b  d8' 88      db   8D 
 *    YP   YP  `Y88P'   `Y88P'  YP   YD      88      88   YD  `Y88P'  88      `8888Y' 
 *                                                                                    
 *                                                                                    
 */

export interface ILabelRequestProps {
  context: WebPartContext;
  expandedState: boolean;  //Is this particular page expanded
}



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

  /***
   *    db    db .d8888. d88888b      .d8888. d888888b  .d8b.  d888888b d88888b 
   *    88    88 88'  YP 88'          88'  YP `~~88~~' d8' `8b `~~88~~' 88'     
   *    88    88 `8bo.   88ooooo      `8bo.      88    88ooo88    88    88ooooo 
   *    88    88   `Y8b. 88~~~~~        `Y8b.    88    88~~~88    88    88~~~~~ 
   *    88b  d88 db   8D 88.          db   8D    88    88   88    88    88.     
   *    ~Y8888P' `8888Y' Y88888P      `8888Y'    YP    YP   YP    YP    Y88888P 
   *                                                                            
   *                                                                            
   */

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
   *    db    db .d8888. d88888b      d88888b d88888b d88888b d88888b  .o88b. d888888b 
   *    88    88 88'  YP 88'          88'     88'     88'     88'     d8P  Y8 `~~88~~' 
   *    88    88 `8bo.   88ooooo      88ooooo 88ooo   88ooo   88ooooo 8P         88    
   *    88    88   `Y8b. 88~~~~~      88~~~~~ 88~~~   88~~~   88~~~~~ 8b         88    
   *    88b  d88 db   8D 88.          88.     88      88      88.     Y8b  d8    88    
   *    ~Y8888P' `8888Y' Y88888P      Y88888P YP      YP      Y88888P  `Y88P'    YP    
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
  const setNewPanelItem = ( command: string, Id: number, type: IPanelOption, item: IAnySourceItem ): void => {

    if ( command === 'Filter' ) {
      //
    } else {
      setPanelItem( item );
      setShowPanel( true );
    }

  }



  /***
   *    .d8888.  .d88b.  db    db d8888b.  .o88b. d88888b d8888b.  .d8b.   d888b  d88888b .d8888. 
   *    88'  YP .8P  Y8. 88    88 88  `8D d8P  Y8 88'     88  `8D d8' `8b 88' Y8b 88'     88'  YP 
   *    `8bo.   88    88 88    88 88oobY' 8P      88ooooo 88oodD' 88ooo88 88      88ooooo `8bo.   
   *      `Y8b. 88    88 88    88 88`8b   8b      88~~~~~ 88~~~   88~~~88 88  ooo 88~~~~~   `Y8b. 
   *    db   8D `8b  d8' 88b  d88 88 `88. Y8b  d8 88.     88      88   88 88. ~8~ 88.     db   8D 
   *    `8888Y'  `Y88P'  ~Y8888P' 88   YD  `Y88P' Y88888P 88      YP   YP  Y888P  Y88888P `8888Y' 
   *                                                                                              
   *                                                                                              
   */
  const itemsElement = <SourcePages
    // source={ SourceInfo }
    primarySource={ LabelRequestSource }
    itemsPerPage={ 20 }
    pageWidth={ 1000 }
    topButtons={ requests.meta1 ? requests.meta1 : [] }
    stateSource={ requests }
    startQty={ 20 }
    showItemType={ false }
    debugMode={ null }

    tableHeaderElements={ requestRowHeaders }
    tableClassName= { 'ezAnalyticsTable' } // styles.itemTable
    tableHeaderClassName= { [  ].join( ' ' )  } // stylesRow.genericItem
    selectedClass={ styles.isSelected }

    renderRow={ createRequestsRow }

    deepProps={ null } //deepProps

    onParentCall={ setNewPanelItem } // onParentCallFunction
    headingElement={ <div className={ styles.tabHeadingElement } style={{  }} 
      title={ `All requests to apply a label: Including those 1.  In this site collection or 2. Requested by you` }>
        Relavent Label Provision requests</div> }
    ageSlider={ true }
    searchAgeOp={ 'show >' }
    searchAgeProp={ 'createdAge' }
  />;

  
  /***
   *    d8888b.  .d8b.  d8b   db d88888b db      
   *    88  `8D d8' `8b 888o  88 88'     88      
   *    88oodD' 88ooo88 88V8o 88 88ooooo 88      
   *    88~~~   88~~~88 88 V8o88 88~~~~~ 88      
   *    88      88   88 88  V888 88.     88booo. 
   *    88      YP   YP VP   V8P Y88888P Y88888P 
   *                                             
   *                                             
   */
  
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

  /***
   *    d88888b d888888b d8b   db  .d8b.  db           d88888b db      d88888b .88b  d88. d88888b d8b   db d888888b 
   *    88'       `88'   888o  88 d8' `8b 88           88'     88      88'     88'YbdP`88 88'     888o  88 `~~88~~' 
   *    88ooo      88    88V8o 88 88ooo88 88           88ooooo 88      88ooooo 88  88  88 88ooooo 88V8o 88    88    
   *    88~~~      88    88 V8o88 88~~~88 88           88~~~~~ 88      88~~~~~ 88  88  88 88~~~~~ 88 V8o88    88    
   *    88        .88.   88  V888 88   88 88booo.      88.     88booo. 88.     88  88  88 88.     88  V888    88    
   *    YP      Y888888P VP   V8P YP   YP Y88888P      Y88888P Y88888P Y88888P YP  YP  YP Y88888P VP   V8P    YP    
   *                                                                                                                
   *                                                                                                                
   */

  const FinalElement: JSX.Element = expandedState === false ? null : <div className = { [].join( ' ' ) } style={{ minHeight: '450px', background: 'lightsteelblue', padding: '1em 2em' }}>
  { itemsElement }
  { panelContent }
</div>;

  return ( FinalElement );

}

export default RequestsHook;