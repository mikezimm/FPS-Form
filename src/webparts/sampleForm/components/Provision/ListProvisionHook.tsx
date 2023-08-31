import * as React from 'react';
import { useState, useEffect } from 'react';

import { WebPartContext } from "@microsoft/sp-webpart-base";

// import ReactJson from 'react-json-view';

// require('@mikezimm/fps-styles/dist/easypages.css');

// import { ILoadPerformance, IPerformanceOp, } from '../../../../../components/molecules/Performance/IPerformance';
// import { createPerformanceRows, createPerformanceTableVisitor, } from '../../../../../components/molecules/Performance/tables';

// import { CustomPanel } from '../../../../../components/molecules/SourceList/Custom/CustomPanel';

// import { IStateSourceA, IZFetchedAnalytics, } from "../interfaces/IStateSourceA";
// import { getAnalyticsSummary } from "../functions/fetchAnalytics";
// import { createAnalyticsSourceProps } from "../interfaces/createAnalyticsSourceProps";

// import { EasyPagesAnalTab,  } from '../../interfaces/epTypes';

// import { ISourceProps } from '../../../../../pnpjs/SourceItems/Interface';
// import { IEasyPagesSourceProps } from "../../interfaces/IEasyPagesPageProps";
// import { ISourceButtonRowProps, sourceButtonRow } from '../../../../../components/molecules/SourcePage/sourceButtonRow';
// import Accordion from '../../../../../components/molecules/Accordion/Accordion';
// import SourcePages from '../../../../../components/molecules/SourcePage/SourcePages';
// import { ezAnalyticsItemHeaders1, ezAnalyticsItemHeaders2, createItemsRow } from './Row';
// import { IAnalyticsSummary, IOjbectKeySummaryItem, easyAnalyticsSummary, } from '../functions/summarizeArrayByKey';
// import { createBarsRow, ezAnalyticsBarHeaders } from './RowBar';
// // import { makeid } from '../../fpsReferences';
// import { check4This } from "@mikezimm/fps-pnp2/lib/services/sp/CheckSearch";
// import { makeid } from '../../../../../logic/Strings/guids';
// import { PanelType } from 'office-ui-fabric-react/lib/Panel';
// import { getDeepestSplits } from '../../../../../logic/Arrays/getDeepKeys';
// import { checkDeepProperty } from '../../../../../logic/Objects/deep';

export interface IListProvisionHookProps {
  context: WebPartContext;

}

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

const ListProvisionHook: React.FC<IListProvisionHookProps> = ( props ) => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { context, } = props;

  // libraryTitle: string;
  // libraryUrl: string;
  // libraryLabel: string;
  // libraryDescription: string;
  // libraryFullDescription: string;
  // enableCreate: boolean;

  const [ libTitle, setLibTitle ] = useState< string >( );
  const [ libUrl, setLibUrl ] = useState< string >( );
  const [ libLabel, setLibLabel ] = useState< string >( );
  const [ libDescription, setLibDescription ] = useState< string >( );
  const [ libFullDescription, setLibFullDescription ] = useState< string >( );
  const [ enableCreate, setenableCreate ] = useState< boolean >( false );

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
        const itemsResults: IStateSourceA = await getAnalyticsSummary( sourceProps, wpFilterProps );

        const EzSummary: IAnalyticsSummary = easyAnalyticsSummary( itemsResults.items,  wpFilterProps, );

        setFetched( itemsResults.loaded );
        setStateSource( itemsResults );
        setFetchPerformance( itemsResults.unifiedPerformanceOps.fetch );
        setProcPerformance( EzSummary );
      };

      // eslint-disable-next-line no-void
      void getItems(); // run it, run it

      return () => {
        // this now gets called when the component unmounts
      };
    }

  }, [ expandedState, fetched ] );

  const panelJSON = panelItem && panelItem.performanceObj ? panelItem.performanceObj : undefined;

  // https://github.com/mikezimm/fps-library-v2/issues/78
  const FPSProps = panelItem && panelItem.FPSProps ? JSON.parse(panelItem.FPSProps) : undefined;
  const FPSPropsJSON = !FPSProps || showPanel !== true ? undefined : <ReactJson src={ FPSProps } name={ 'FPSProps' } collapsed={ 1 } displayDataTypes={ true } displayObjectSize={ true } enableClipboard={ true } style={{ padding: '10px 0px' }}/>

  const panelContent : JSX.Element = showPanel !== true ? undefined : CustomPanel({
    source: null,
    primarySource: sourceProps,

    customElement1: createPerformanceTableVisitor( panelJSON, [] ) ,

    item: panelItem,
    onClosePanel: () => { setShowPanel( false ) },
    customElement1B: FPSPropsJSON,

    showItemPanel: showPanel,
    search: null,

    searchText: '',

    refreshId: stateSource.refreshId,
    showCanvasContent1: false,
    showProperties: true,

    reactPanelType: PanelType.medium,

    showHeading: true,

  });

  const onParentCall = (command: 'GoToItems', Id: number, type: string, item: IOjbectKeySummaryItem ) : void => { // onParentCall( 'GoToItems', -1, '', item )

    if ( item.keyZ === 'createdAge' || ( item.primaryKey && item.primaryKey.indexOf('<< EMPTY') === 0 ) ||  command !== 'GoToItems' ) {
      console.log( 'Invalid onParentCall' );
      return
    }
    console.log( 'Prefiltering items: onParentCall', item );
    setButton1( item.primaryKey );
    setTab( 0 );
  }

  const setNewPanelItem = ( command: string, Id: number, type: IPanelOption, item: IZFetchedAnalytics ): void => {
    setPanelItem( item );
    setShowPanel( true );
  }

  const setTabClick = ( Id: number ) : void => { // onParentCall( 'GoToItems', -1, '', item )
    setButton1( '' );
    setTab( Id );
  }

  const setOptionClick = ( Id: number ) : void => { // onParentCall( 'GoToItems', -1, '', item )
    const newAnalyticsListX = `${analyticsListX}${ analyticsOptionsX[ Id ] }`;
    setSourceProps( createAnalyticsSourceProps( `${newAnalyticsListX}`, analyticsWebX ));
    setOption( Id );
    setFetched( false );
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

  //https://github.com/mikezimm/Pnpjs-v2-Upgrade-sample/issues/56
  const classNames: string[] = [ 'source-page', 'ezAnalyticsSourcePage', 'bannerPillShapeSideMargin' ];
  if ( expandedState !== true ) classNames.push ( 'hide-source-page' );

  const OptionRowProps: ISourceButtonRowProps = option === null ? undefined : {
    title: '',
    heading: <div>Analytics Type</div>,
    rowCSS: { paddingTop: '0px' },
    Labels: analyticsOptionsX ? analyticsOptionsX : [] ,
    onClick: stateSource.loaded !== true ? undefined : setOptionClick.bind( this ),
    selected: option,
    infoEle: ``,
    selectedClass: props.easyAnalyticsProps.class1,
  }

  const ButtonRowProps: ISourceButtonRowProps = {
    title: '',
    heading: <div>Summarize By</div>,
    rowCSS: { paddingTop: '0px' },
    Labels: xFilters ,
    onClick: stateSource.loaded !== true ? undefined : setTabClick.bind( this ),
    selected: tab,
    infoEle: ``,
    selectedClass: props.easyAnalyticsProps.class1,
  }

  // This should hide the procPerformance if it is less than 10ms
  const valProcPerformance = !procPerformance ? procPerformance : checkDeepProperty( procPerformance, [ 'unifiedPerformanceOps', 'process', 'ms' ], 'Actual' );
  const showProcPerformance = valProcPerformance && valProcPerformance > 10 ? true : false;

  const MainContent: JSX.Element = <div className={ 'eZAnalyticsInfo' }style={{ cursor: 'default', padding: '5px 0px 5px 0px' }}>
    { sourceButtonRow( OptionRowProps ) }
    { sourceButtonRow( ButtonRowProps ) }
    { !fetchPerformance ? undefined : <div>{ createPerformanceRows( { ops: { fetch: fetchPerformance } } as ILoadPerformance, [ 'fetch' ] ) }</div> }
    { !showProcPerformance  ? undefined : <div>{ createPerformanceRows( { ops: { process0: procPerformance.unifiedPerformanceOps.process } } as ILoadPerformance, [ 'process0' ], 10 ) }</div> }
  </div>;

  const accordionHeight: number = option === null ? 100 : 120;

  const InfoElement: JSX.Element = <Accordion 
    title = { `More information about this tab`}
    defaultIcon = 'Help'
    showAccordion = { true }
    content = { MainContent }
    refreshId={ makeid(5) }
    contentStylesVis = { { height: `${accordionHeight}px` } }
  />;

  const ezAnalyticsItemHeaders : string[] = [ ...ezAnalyticsItemHeaders1, ...hLeft, ...ezAnalyticsItemHeaders2, ...hRight ];

  const useTopButtons: string[] = tab === 0 ? [ button1, ...TopButtons.filter((str) => str !== button1 ), ...stateSource.meta2.filter((str) => str !== button1 ) ] : [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const summaryKey = tab < AnalyticsTabs.length ? xFilters[ tab ] : `x${ ( tab - AnalyticsTabs.length ) }`;
  const useThisState: IStateSourceA = tab === 0 ? stateSource : { ...stateSource, ...{ items: procPerformance[ summaryKey as 'Sites' ].summaries } , refreshId: makeid( 5 ) } as any;
  const useHeaders: string[] = tab === 0 ? ezAnalyticsItemHeaders : ezAnalyticsBarHeaders;
  const useSgeSlider: boolean = tab === 0 ? true : false;
  const renderRowsAsThese = tab === 0 ? createItemsRow : createBarsRow;
  const onParentCallFunction = tab === 0 ? setNewPanelItem.bind(this) : onParentCall.bind(this);

  if ( check4This(`sourceResults=true`) === true ) console.log('sourceResults analyticsHookState:', xFilters[ tab ], tab, useThisState );

  const itemsElement = <SourcePages
    // source={ SourceInfo }
    primarySource={ sourceProps }
    itemsPerPage={ 20 }
    pageWidth={ 1000 }
    topButtons={ useTopButtons }
    stateSource={ useThisState }
    startQty={ 20 }
    showItemType={ false }
    debugMode={ null }

    tableHeaderElements={ useHeaders }
    tableClassName= { 'ezAnalyticsTable' } // styles.itemTable
    tableHeaderClassName= { [  ].join( ' ' )  } // stylesRow.genericItem
    selectedClass={ props.easyAnalyticsProps.class1 }

    renderRow={ renderRowsAsThese }
    optionalColumns1={ wpTDLeft }
    optionalColumns2={ wpTDRight }

    deepProps={ null } //this.state.deepProps

    onParentCall={ onParentCallFunction }
    headingElement={ InfoElement }
    ageSlider={ useSgeSlider }
    searchAgeOp={ 'show >' }
    searchAgeProp={ 'createdAge' }
  />;

  const EasyAnalyticsElement: JSX.Element = <div className = { classNames.join( ' ' ) } style={ styles }>
    { itemsElement }
    { panelContent }
  </div>;

  return ( EasyAnalyticsElement );

}

export default ListProvisionHook;