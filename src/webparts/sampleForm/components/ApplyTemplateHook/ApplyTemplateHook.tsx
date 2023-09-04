import * as React from 'react';
import { useState, useEffect } from 'react';

import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IListInfo } from "@pnp/sp/lists/types";

import styles from './ApplyTemplateHoook.module.scss';

import { PanelType } from 'office-ui-fabric-react/lib/Panel';

import { makeid } from '@mikezimm/fps-library-v2/lib/logic/Strings/guids';
import { sourceButtonRow } from '@mikezimm/fps-library-v2/lib/components/molecules/SourcePage/sourceButtonRow';
import Accordion from '@mikezimm/fps-library-v2/lib/components/molecules/Accordion/Accordion';
import SourcePages from '@mikezimm/fps-library-v2/lib/components/molecules/SourcePage/SourcePages';

import { ISourceProps, StandardMetaViewProps } from '@mikezimm/fps-library-v2/lib/pnpjs/SourceItems/Interface';
import { getExpandColumns } from '@mikezimm/fps-library-v2/lib/pnpjs/Lists/getVX/getExpandV2';
import { IAnySourceItem } from '@mikezimm/fps-library-v2/lib/components/molecules/AnyContent/IAnyContent';

import { ISourceSearch } from '@mikezimm/fps-library-v2/lib/components/molecules/SearchPage/Interfaces/ISourceSearch';
import { getSourceItems } from '@mikezimm/fps-library-v2/lib/pnpjs/SourceItems/getSourceItems';
import { createApplyTemplateRow, exampleRowHeaders } from './Row';
import { IStateSource } from '@mikezimm/fps-library-v2/lib/pnpjs/Common/IStateSource';
import { IPerformanceOp } from '@mikezimm/fps-library-v2/lib/components/molecules/Performance/IPerformance';
import { addSearchMeta1 } from '@mikezimm/fps-library-v2/lib/components/molecules/SearchPage/functions/addSearchMeta1';
import { createErrorFPSTileItem } from '@mikezimm/fps-library-v2/lib/components/molecules/FPSTiles/functions/Any/createErrorFPSTileItem';

import { CustomPanel } from '@mikezimm/fps-library-v2/lib/components/molecules/SourceList/Custom/CustomPanel';
import { DefinedLibraryChoices, DefinedListChoices, IDefinedChoice, IDefinedListInfo, IMakeThisList, NoTargetListChoice } from './interfaces/ProvisionTypes';

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

export type IPanelOption = 'performance' | 'item';  // Define what kinds of variants of the panel you want

export type ITopButtons = 'Mine' | 'OtherPeople' | 'ThisSite' | 'OtherSites';
export const TopButtons: ITopButtons[] = [ 'Mine', 'OtherPeople', 'ThisSite', 'OtherSites' ];

const constId: string = makeid(5);
const EmptyState: IStateSource = { fpsContentType: [ 'item' ], items: [], index: [], loaded: false, refreshId: constId, status: 'Unknown', e: null, };

const ApplyTemplateWeb: string = `ApplyTemplateWeb`;
const ApplyTemplateList: string = `ApplyTemplateList`;

export const ApplyTemplateCols: string[] = StandardMetaViewProps;

export const ApplyTemplateHookSourceProps: ISourceProps = {
  fpsContentType: [ 'item' ],
  key: 'any',
  defType: 'item',
  webRelativeLink: `/lists/${ApplyTemplateList}`,
  searchSource: 'any',
  searchSourceDesc: 'any',
  defSearchButtons: [ 'Mine', 'ThisSite' ],
  webUrl: ApplyTemplateWeb,
  listTitle: ApplyTemplateList,
  fetchCount: null,
  columns: ApplyTemplateCols,
  selectThese: ApplyTemplateCols,
  searchProps: ApplyTemplateCols,
  expandThese: getExpandColumns( ApplyTemplateCols, ),
  restFilter: ``,
  orderBy: {
    prop: 'Id',
    order: 'dec',
    asc: false,
  },
}

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

export interface IApplyTemplateHookProps {
  context: WebPartContext;
  expandedState: boolean;  //Is this particular page expanded
  refreshId?: string; // optional in case needed
  targetList: Partial<IListInfo>;
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

const ApplyTemplateHook: React.FC<IApplyTemplateHookProps> = ( props ) => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { context, expandedState, targetList } = props;
  const { pageContext } = context;


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

  /**
   * State related to fetching the source props
   */

  // const [ isCurrentSite, setIsCurrentSite ] = useState<boolean>( pageContext.web.serverRelativeUrl ) // NOT NEEDED until needing users for example items
  const [ applied, setApplied ] = useState<boolean>( false );
  const [ refreshId, setRefreshId ] = useState<string>( makeid( 5 ) );
  const [ showPanel, setShowPanel ] = useState<boolean>( false );
  const [ panelItem, setPanelItem ] = useState<IAnySourceItem>( null );

  // Added for example when fetching items
  const [ stateSource, setStateSource ] = useState< IStateSource > ( JSON.parse(JSON.stringify( EmptyState )));
  const [ fetchPerformance, setFetchPerformance ] = useState<IPerformanceOp>( null );
  const [ procPerformance, setProcPerformance ] = useState<IPerformanceOp[]>( [] );

  const [ choices, setChoices ] = useState<IDefinedListInfo[]>( !targetList ? [] : targetList.BaseTemplate === 101 ? DefinedLibraryChoices : DefinedListChoices );
  const [ listChoice, setListChoice ] = useState<IDefinedListInfo>( !targetList ? NoTargetListChoice : choices[0] );



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

  const applyThisTemplate = async (): Promise<void> => {

    const results: IStateSource = await getSourceItems(ApplyTemplateHookSourceProps, false, true ) as IStateSource;

    if (results.status !== 'Success') {
      results.items = [ createErrorFPSTileItem( results, null ) ];

    } else {
      const search: ISourceSearch = null;
      results.items = addSearchMeta1(results.items, ApplyTemplateHookSourceProps, search);
    }

    setApplied( results.loaded );
    setStateSource( results );
    setProcPerformance( null ); // Add here if you want to also monitor some process performance
    setFetchPerformance( results.unifiedPerformanceOps.fetch );
  };


  useEffect(() => {

    if ( expandedState === true && applied === false ) {
      // eslint-disable-next-line no-void
      void applyThisTemplate();

      return () => {
        // this now gets called when the component unmounts
      };
    }

  }, [ expandedState, applied ] );


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
      // This option could be used to pre-filter the entire items in order to pass in smaller list to SourcePages
      // See Easy Analytics example.
    } else {
      setPanelItem( item );
      setShowPanel( true );
    }
  }


  /***
   *    d88888b db      d88888b .88b  d88. d88888b d8b   db d888888b .d8888. 
   *    88'     88      88'     88'YbdP`88 88'     888o  88 `~~88~~' 88'  YP 
   *    88ooooo 88      88ooooo 88  88  88 88ooooo 88V8o 88    88    `8bo.   
   *    88~~~~~ 88      88~~~~~ 88  88  88 88~~~~~ 88 V8o88    88      `Y8b. 
   *    88.     88booo. 88.     88  88  88 88.     88  V888    88    db   8D 
   *    Y88888P Y88888P Y88888P YP  YP  YP Y88888P VP   V8P    YP    `8888Y' 
   *                                                                         
   *                                                                         
   */

  const AccordionContent: JSX.Element = <div className={ 'yourClassName' }style={{ cursor: 'default', padding: '5px 0px 5px 0px' }}>
    { sourceButtonRow( null ) }
    <div>Add any content here you want in AccordionContent</div>
  </div>;

  const accordionHeight: number = 120;

  const SourcePagesHeader: JSX.Element = <Accordion 
    title = { `More information about this tab`}
    defaultIcon = 'Help'
    showAccordion = { true }
    content = { AccordionContent }
    refreshId={ makeid(5) }
    contentStylesVis = { { height: `${accordionHeight}px` } }
  />;

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
    primarySource={ ApplyTemplateHookSourceProps }
    itemsPerPage={ 20 }
    pageWidth={ 1000 }
    topButtons={ stateSource.meta1 ? stateSource.meta1 : [] }
    stateSource={ stateSource }
    startQty={ 20 }
    showItemType={ false }
    debugMode={ null }

    tableHeaderElements={ exampleRowHeaders }
    tableClassName= { 'anyTableClass' }
    tableHeaderClassName= { [  ].join( ' ' )  }
    selectedClass={ styles.isSelected }

    renderRow={ createApplyTemplateRow }

    deepProps={ null }

    onParentCall={ setNewPanelItem }
    headingElement={ SourcePagesHeader }
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
    primarySource: ApplyTemplateHookSourceProps,
    item: panelItem,
    onClosePanel: () => { setShowPanel( false ) },

    showItemPanel: showPanel,
    search: null,
    searchText: '',
    refreshId: refreshId,
    showCanvasContent1: false,
    showProperties: true,
    reactPanelType: PanelType.medium,
    showHeading: true,
    // customElement1: createPerformanceTableVisitor( panelJSON, [] ) ,
    // customElement1B: FPSPropsJSON,

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

  const FinalElement: JSX.Element = <div className = { [].join( ' ' ) } style={{ minHeight: '450px' }}>
    { itemsElement }
    { panelContent }
  </div>;

  return ( FinalElement );

}

export default ApplyTemplateHook;