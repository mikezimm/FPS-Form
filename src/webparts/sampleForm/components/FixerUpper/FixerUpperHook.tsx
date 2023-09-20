import * as React from 'react';
import { useState, useEffect } from 'react';

import { WebPartContext } from "@microsoft/sp-webpart-base";

import styles from './FixerUpperHook.module.scss';

import { PanelType } from 'office-ui-fabric-react/lib/Panel';

import { makeid } from '@mikezimm/fps-library-v2/lib/logic/Strings/guids';
import { sourceButtonRow, ISourceButtonRowProps } from '@mikezimm/fps-library-v2/lib/components/molecules/SourcePage/sourceButtonRow';
import Accordion from '@mikezimm/fps-library-v2/lib/components/molecules/Accordion/Accordion';
import SourcePages from '@mikezimm/fps-library-v2/lib/components/molecules/SourcePage/SourcePages';

import { ISourceProps, StandardMetaViewProps } from '@mikezimm/fps-library-v2/lib/pnpjs/SourceItems/Interface';
import { IAnySourceItem } from '@mikezimm/fps-library-v2/lib/components/molecules/AnyContent/IAnyContent';

import { ISourceSearch } from '@mikezimm/fps-library-v2/lib/components/molecules/SearchPage/Interfaces/ISourceSearch';
import { getSourceItems } from '@mikezimm/fps-library-v2/lib/pnpjs/SourceItems/getSourceItems';
import { createFixerUpperRowFormat, createFixerUpperRowText, exampleRowHeaders } from './Row';
import { IFixerUpperHookRead } from './IFixerUpperHookRead';
import { IStateSource } from '@mikezimm/fps-library-v2/lib/pnpjs/Common/IStateSource';
import { IPerformanceOp } from '@mikezimm/fps-library-v2/lib/components/molecules/Performance/IPerformance';
import { addSearchMeta1 } from '@mikezimm/fps-library-v2/lib/components/molecules/SearchPage/functions/addSearchMeta1';
import { createErrorFPSTileItem } from '@mikezimm/fps-library-v2/lib/components/molecules/FPSTiles/functions/Any/createErrorFPSTileItem';

import { CustomPanel } from '@mikezimm/fps-library-v2/lib/components/molecules/SourceList/Custom/CustomPanel';
import { IReplacementObject, getFilteredItems, getFixerUpperSource, getLinkItems, summarizeItemLinks, updateItems, updateItemsAsync } from './updateListData';
import { createVerifiedRow, verifiedRowHeaders } from './RowVerified';

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

export type IFixerUpperMode = 'Test' | 'Real';  // Define what kinds of variants of the panel you want
export type IFixerUpperShowThese = 'Actual' | 'Simulated' | 'Verified';  // Define what kinds of variants of the panel you want

export type IFixerUpperRowType = 'List Items' | 'Links';
const RowButtons: IFixerUpperRowType[] = [ 'List Items' , 'Links' ];

export type IFixerUpperFormat = 'HTML' | 'RichText';
const FormatButtons: IFixerUpperFormat[] = [ 'HTML' , 'RichText' ];

export type IFixerUpperData =  'Actual data' | 'Simulate Changes';
const DataButtons: IFixerUpperData[] = [ 'Actual data', 'Simulate Changes' , ];

export type IFixerUpperActions =  'Really update 1st Item' | 'Really update ALL Items';
const ActionButtons: IFixerUpperActions[] = [ 'Really update 1st Item', 'Really update ALL Items' , ];

export type IPanelOption = 'performance' | 'item';  // Define what kinds of variants of the panel you want

export type ITopButtons = 'Mine' | 'OtherPeople' | 'ThisSite' | 'OtherSites';
export const TopButtons: ITopButtons[] = [ 'Mine', 'OtherPeople', 'ThisSite', 'OtherSites' ];

const constId: string = makeid(5);
const EmptyState: IStateSource = { fpsContentType: [ 'item' ], items: [], index: [], loaded: false, refreshId: constId, status: 'Unknown', e: null, meta1: [ 'listform' ] };


export const FixerUpperCols: string[] = StandardMetaViewProps;

export const FixerUpperHookSourceProps: ISourceProps = getFixerUpperSource();

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

export interface IFixerUpperHookProps {
  context: WebPartContext;
  expandedState: boolean;  //Is this particular page expanded
  refreshId?: string; // optional in case needed
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

const FixerUpperHook: React.FC<IFixerUpperHookProps> = ( props ) => {

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

  /**
   * State related to fetching the source props
   */
  const [ fetched, setFetched ] = useState<boolean>( false );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ refreshId, setRefreshId ] = useState<string>( makeid( 5 ) );
  const [ showPanel, setShowPanel ] = useState<boolean>( false );
  const [ panelItem, setPanelItem ] = useState<IAnySourceItem>( null );

  // Added for example when fetching items
  const [ stateSource, setStateSource ] = useState< IStateSource > ( JSON.parse(JSON.stringify( EmptyState )));
  const [ simulatedSource, setSimulatedSource ] = useState< IStateSource > ( JSON.parse(JSON.stringify( EmptyState )));
  // const [ verifiedSource, setVerifiedSource ] = useState< IStateSource > ( JSON.parse(JSON.stringify( EmptyState )));
  const [ linksSource, setLinksSource ] = useState< IStateSource > ( JSON.parse(JSON.stringify( EmptyState )));
  // const [ showThese, setShowThese ] = useState< IFixerUpperShowThese > ( 'Actual' );
  const [ row, setRow ] = useState< number > ( 0 );
  const [ format, setFormat ] = useState< number > ( 0 );
  const [ data, setData ] = useState< number > ( 0 );
  const [ action, setAction ] = useState< number > ( -1 );


  // const [ showContent, setShowContent ] = useState< IFixerUpperRowType > ( 'List Items' );

  const [ updatedItems, setUpdatedItems ] = useState< IFixerUpperHookRead[] > ( null );
  const [ verifiedItems, setLinkItems ] = useState< IFixerUpperHookRead[] > ( null );
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ fetchPerformance, setFetchPerformance ] = useState<IPerformanceOp>( null );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ procPerformance, setProcPerformance ] = useState<IPerformanceOp[]>( [] );



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

  const changeDataMode = ( dataText: IFixerUpperData ): void => {

    const simItems: IFixerUpperHookRead[] = updateItems( 
      stateSource.items as any[],
      DataButtons[ data ],
      5000
     );

     const sourceItemsForLinks = dataText === 'Actual data' ? stateSource.items as IFixerUpperHookRead[]: simItems;
     const linkItems: IFixerUpperHookRead[] = getLinkItems( sourceItemsForLinks, );
     const linkSummary = summarizeItemLinks( linkItems );
     console.log( 'linkSummary:', linkSummary );

    setSimulatedSource( { ...stateSource, ...{ items: simItems, refreshId: makeid(5) } } );
    setLinksSource( { ...stateSource, ...{ items: linkSummary as any[], refreshId: makeid(5) } } );
    setLinkItems( sourceItemsForLinks );

  }

  useEffect(() => {

    if ( expandedState === true && fetched === false ) {
      const getItems = async (): Promise<void> => {

        const results: IStateSource = await getSourceItems(FixerUpperHookSourceProps, false, true ) as IStateSource;

        if (results.status !== 'Success') {
          results.items = [ createErrorFPSTileItem( results, null ) ];

        } else {
          const search: ISourceSearch = null;
          results.items = addSearchMeta1(results.items, FixerUpperHookSourceProps, search);
        }
        const linkItems: IFixerUpperHookRead[] = getLinkItems( 
          results.items as IFixerUpperHookRead[]
        );

        const linkSummary = summarizeItemLinks( linkItems );
        setData( 0 );
        setRow( 0 );
        setFormat( 0 );
        setFetched( results.loaded );
        setStateSource( results );
        setLinkItems( linkItems );
        setLinksSource( { ...results, ...{ items: linkSummary , refreshId: makeid (5) }});
        setProcPerformance( null ); // Add here if you want to also monitor some process performance
        setFetchPerformance( results.unifiedPerformanceOps.fetch );
      };

      // eslint-disable-next-line no-void
      void getItems();

      return () => {
        // this now gets called when the component unmounts
      };
    }

  }, [ expandedState, fetched ] );

  useEffect(() => {

    if ( expandedState === true && fetched === true ) {
      // const getItems = async (): Promise<void> => {

      //   const results: IStateSource = await getSourceItems(FixerUpperHookSourceProps, false, true ) as IStateSource;

      //   if (results.status !== 'Success') {
      //     results.items = [ createErrorFPSTileItem( results, null ) ];

      //   } else {
      //     const search: ISourceSearch = null;
      //     results.items = addSearchMeta1(results.items, FixerUpperHookSourceProps, search);
      //   }

      //   setFetched( results.loaded );
      //   setStateSource( results );
      //   setProcPerformance( null ); // Add here if you want to also monitor some process performance
      //   setFetchPerformance( results.unifiedPerformanceOps.fetch );
      // };

      // eslint-disable-next-line no-void
      void changeDataMode( DataButtons[ data ] );

      return () => {
        // this now gets called when the component unmounts
      };
    }

  }, [ data ] );
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


  const toggleContent = ( ): void => {
    setRow( row === 1 ? 0 : 1 );
  }

  const toggleData = ( ): void => {
    setData( data === 1 ? 0 : 1 );
  }

  const reloadData = ( ): void => {
    // setShowThese( 'Actual' );
    setFetched( false );

  }

  const liveUpdate1Item = async ( count: number ): Promise<void> => {
    const newItems: IFixerUpperHookRead[] = await updateItemsAsync( 
      FixerUpperHookSourceProps,
      stateSource.items as any[],
      1
    );
    reloadData();

  }

  const doThisAction =  ( dataMode: IFixerUpperData, count: number ): void => {
    const newItems: IFixerUpperHookRead[] = updateItems( 
      stateSource.items as any[],
      dataMode,
      count
     );

     setSimulatedSource( { ...stateSource, ...{ items: newItems, refreshId: makeid(5) } } );
     setUpdatedItems( newItems );
    //  setShowThese( 'Simulated' );
  }

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

  const RowButtonProps: ISourceButtonRowProps = {
    title: '',
    heading: <div>Row type</div>,
    rowCSS: { paddingTop: '10px' },
    buttonCSS: { marginRight: '10px' },
    Labels: RowButtons ,
    onClick: stateSource.loaded !== true ? undefined : toggleContent.bind( this ),
    selected: row,
    infoEle: ``,
    selectedClass: styles.isSelected,
    disabled: stateSource.loaded !== true ? 'all' : [],

  }

  const FormatButtonsProps: ISourceButtonRowProps = {
    title: '',
    heading: <div>Render as</div>,
    rowCSS: { paddingTop: '10px' },
    buttonCSS: { marginRight: '10px' },
    Labels: FormatButtons ,
    onClick: stateSource.loaded !== true ? undefined : setFormat.bind( this ),
    selected: format,
    infoEle: ``,
    selectedClass: styles.isSelected,
    disabled: stateSource.loaded !== true || row === 1 ?  'all' : [],
  }

  const DataButtonsProps: ISourceButtonRowProps = {
    title: '',
    heading: <div>View Simulated or Actual items</div>,
    rowCSS: { paddingTop: '10px' },
    buttonCSS: { marginRight: '10px' },
    Labels: DataButtons ,
    onClick: stateSource.loaded !== true ? undefined : setData.bind( this ),
    selected: data,
    infoEle: ``,
    selectedClass: styles.isSelected,
    disabled: stateSource.loaded !== true ? 'all' : [],
  }

  const ActionButtonsProps: ISourceButtonRowProps = {
    title: '',
    heading: <div style={{ color: 'red' }}>Make Permanent Changes</div>,
    rowCSS: { paddingTop: '10px' },
    buttonCSS: { marginRight: '10px' },
    Labels: ActionButtons ,
    onClick: setAction.bind( this ),
    selected: action,
    infoEle: ``,
    selectedClass: styles.isSelected,
    disabled: stateSource.loaded !== true || data === 0 || row === 1 ? 'all' : [],
  }

  const AccordionContent: JSX.Element = <div className={ 'yourClassName' }style={{ cursor: 'default', padding: '5px 0px 5px 0px' }}>
    {/* { sourceButtonRow( null ) } */}
    <div>Items meeting FixerUpper Status:</div>
    <div>
      { getFilteredItems( stateSource, DataButtons[ data ] ).map( ( item ) => { return <span key={ item.Id }>{ item.Id }; </span> } ) }
    </div>
    <div>
      {/* <button onClick={ () => { doThisAction( 'Simulate Changes', 5000 ) }}>
        Simulate now
      </button>
      <button onClick={ () => { setData( 0 )}}>
        Show Actual
      </button>
      <button onClick={ () => { reloadData( ) }}>
        Reload new data
      </button>
      <button onClick={ () => { doThisAction( 'Actual data', 1 ) }}>
        Test First Item
      </button>
      <button onClick={ () => { setData( 1 ) }}>
        Verify simulated items
      </button>
      <button onClick={ () => { setData( 0 ) }}>
        Verify actual items
      </button> */}
      <button onClick={ () => { void liveUpdate1Item( 1 ) }}>
        Really Fix first item
      </button>
    </div>
    <div className={ styles.buttonCommands }>
      <div>
        { sourceButtonRow( DataButtonsProps ) }
        <div style={{ fontSize: 'smaller'}}>Simulated allows you to mock up your items with your changes on screen but not actually update the data.</div>
      </div>
      <div>
        { sourceButtonRow( RowButtonProps ) }
        <div style={{ fontSize: 'smaller'}}>HTML shows the html code which can help in certain cases.</div>
      </div>
      <div>
        { sourceButtonRow( FormatButtonsProps ) }
        <div style={{ fontSize: 'smaller'}}>HTML shows the html code which can help in certain cases.</div>
      </div>
      <div>
        { sourceButtonRow( ActionButtonsProps ) }
        <div style={{ fontSize: 'smaller'}}>{ `Make live Mass Update changes - NOT REVERSABLE` }</div>
      </div>
    </div>
  </div>;

  const youAreSeeing: JSX.Element = <div style={{ padding: '5px 0px 15px 0px' }}>
    <div style={{ fontSize: 'larger', fontWeight: '600' }}>You are currently seeing: </div>
    <span style={{ paddingRight: row === 1 ? null : '2em' }}>{ row === 1 ? '' : 
      data === 0 ? `Your actual list data ( ${ stateSource?.items?.length } items ).` : 
      `Simulated items based on your proposed changes ( ${ simulatedSource?.items?.length } items ).` }
    </span>
    <span style={{ paddingRight: '2em' }}>Each row represents 
      { row === 0 ? ` a single item in your list` : 
      ` a Url ( either from link or image ) that was found by searching 
      ${ data === 0 ? ` ALL Items in your list ( ${ stateSource?.items?.length } items ).`: 
      `ONLY IN Items impacted by your proposed changes ( ${ simulatedSource?.items?.length } items ). Links shown reflect proposed changes.`}` }
    </span>
    <span style={{ paddingRight: row === 1 ? null : '2em' }}>{ row === 1 ? '' :  format === 0 ? `Rich Text is shown as html code` : `Rich Text is rendered as Rich Text`  }</span>
  </div>

  const SourcePagesHeader: JSX.Element = <div>
      <Accordion 
        title = { `More information about this tab`}
        defaultIcon = 'Help'
        showAccordion = { true }
        content = { AccordionContent }
        refreshId={ makeid(5) }
        contentStylesVis = {{ height: `auto` }}
      />
      { youAreSeeing }
    </div>
;

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

  // let useSource: IStateSource = null; 
  // DataButtons[ data ] === 'Simulate Changes' ? simulatedSource : showThese === 'Verified' ? verifiedSource : stateSource;
  // if ( RowButtons[ row ] === 'Links' ) useSource = linksSource;
  
  let itemSource: IStateSource = JSON.parse(JSON.stringify( EmptyState ));
  let itemHeaders: string[] = [];
  let itemRender: any = null;

  if ( row === 0 ) { // These are for Items
    itemHeaders = exampleRowHeaders;
    itemSource = data === 0 ? stateSource : simulatedSource ;
    itemRender = format === 1 ? createFixerUpperRowFormat : createFixerUpperRowText;

  } else if ( row === 1 ) { // These are for Links
    itemHeaders = verifiedRowHeaders;
    itemSource = linksSource;
    itemRender = createVerifiedRow;

  }

  const itemsElement = <SourcePages
    // source={ SourceInfo }
    primarySource={ FixerUpperHookSourceProps }
    itemsPerPage={ 20 }
    pageWidth={ 1000 }
    topButtons={ stateSource.meta1 ? stateSource.meta1 : [] }
    stateSource={ itemSource }
    startQty={ 20 }
    showItemType={ false }
    debugMode={ null }

    tableHeaderElements={ itemHeaders }
    tableClassName= { 'anyTableClass' }
    tableHeaderClassName= { [  ].join( ' ' )  }
    selectedClass={ styles.isSelected }

    renderRow={ itemRender }

    deepProps={ null }

    onParentCall={ setNewPanelItem }
    headingElement={ SourcePagesHeader }
    ageSlider={ RowButtons[ row ] === 'List Items' ? true : false }
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
    primarySource: FixerUpperHookSourceProps,
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

export default FixerUpperHook;