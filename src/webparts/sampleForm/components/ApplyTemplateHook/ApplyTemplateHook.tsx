import * as React from 'react';
import { useState, useEffect } from 'react';

import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';

import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';

import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IListInfo } from '@mikezimm/fps-library-v2/lib/components/molecules/Provisioning/interfaces/listTypes';

import styles from './ApplyTemplateHoook.module.scss';
import stylesTop from '../SampleForm.module.scss';

import { FPSLogListFunction } from '../FPSLogList/FPSLogListFunction';

import { makeid } from '@mikezimm/fps-library-v2/lib/logic/Strings/guids';
import Accordion from '@mikezimm/fps-library-v2/lib/components/molecules/Accordion/Accordion';

import { ISourceProps, StandardMetaViewProps } from '@mikezimm/fps-library-v2/lib/pnpjs/SourceItems/Interface';
import { getExpandColumns } from '@mikezimm/fps-library-v2/lib/pnpjs/Lists/getVX/getExpandV2';

import { IStateSource } from '@mikezimm/fps-library-v2/lib/pnpjs/Common/IStateSource';

import { DefinedLibraryChoices, DefinedListChoices, IDefinedListInfo, IMakeThisList, } from './interfaces/ProvisionTypes';
import { getSpecificListDef } from './templates/functions/getSpecificListDef';
import { provisionTheList } from './functions/provisionWebPartList';

import { IMyProgress, } from '@mikezimm/fps-library-v2/lib/common/interfaces/fps/IMyInterfaces';
import { ApplyTemplate_Rail_SaveTitle, } from '@mikezimm/fps-library-v2/lib/pnpjs/Logging/permissionsSave';
import { saveAssist } from './functions/saveAssist';
import { saveProvisioning } from './functions/saveProvisioning';

require ('./ApplyTemplate.css');

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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  webUrl?: string; // Optional if not using current context
  expandedState: boolean | 'Nudge';  //Is this particular page expanded
  propsRefreshId?: string; // optional in case needed
  targetList: Partial<IListInfo>;
  listExists: boolean;
  updateSelectedTemplate:( selectedTemplate: IDefinedListInfo ) => void;
  selectedTemplate?: IDefinedListInfo;
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
  const { context, expandedState, targetList, propsRefreshId, listExists } = props;
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ applied, setApplied ] = useState<boolean>( false );
  // const [ refreshId, setRefreshId ] = useState<string>( makeid( 5 ) );
  // const [ showPanel, setShowPanel ] = useState<boolean>( false );
  // const [ panelItem, setPanelItem ] = useState<IAnySourceItem>( null );

  // Added for example when fetching items
  // const [ stateSource, setStateSource ] = useState< IStateSource > ( JSON.parse(JSON.stringify( EmptyState )));
  // const [ fetchPerformance, setFetchPerformance ] = useState<IPerformanceOp>( null );
  // const [ procPerformance, setProcPerformance ] = useState<IPerformanceOp[]>( [] );

  const [ choices, setChoices ] = useState<IDefinedListInfo[]>( !targetList ? [] : targetList.BaseTemplate === 101 ? DefinedLibraryChoices : DefinedListChoices );
  const [ listChoice, setListChoice ] = useState<IDefinedListInfo>( props.selectedTemplate ? props.selectedTemplate : null );
  const [ makeList, setMakeList ] = useState<IMakeThisList>( null );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ webUrl, setWebUrl ] = useState<string>( props.webUrl ? props.webUrl : pageContext.web.serverRelativeUrl );

  const [ errorsX, setErrorsX ] = useState<IMyProgress[]>( [] );
  const [ fieldsX, setFieldsX ] = useState<IMyProgress[]>( [] );
  const [ viewsX, setViewsX ] = useState<IMyProgress[]>( [] );
  const [ itemsX, setItemsX ] = useState<IMyProgress[]>( [] );
  const [ total, setTotal ] = useState<number>( 0 );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ currentX, setCurrentX ] = useState<number>( 0 );
  const [ id, setId ] = useState<string>( makeid(5) );

  const [ showDetails, setShowDetails ] = useState<boolean>( true );
  const [ status, setStatus ] = useState<string>( 'Waiting' );
  const [ progressX, setProgressX ] = useState<IMyProgress>( null );


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


  // const setProgress = async ( progressHidden: boolean, list: 'E' | 'Field' | 'View' | 'Item', current: number , ofThese: number, color: string, icon: string, logLabel: string, label: string, description: string, ref: string = null ): Promise<void> => {
  const setProgressNow = async ( progress: IMyProgress[] ): Promise<void> => {

    if ( !progress || progress.length === 0 ) return;
    console.log( 'setProgressNow Id: ', id );
    // Found from:  https://codesandbox.io/s/402pn5l989?file=/src/index.js:288-366
    await Promise.resolve().then(() => {

        setTotal( total + 1 );
        setCurrentX( progress[0].current );
        setProgressX( progress[0] );
        setId( progress[0].id );

        if ( progress[0].array === 'E') {
          console.log( 'setProgress progress, errorsX,:', progress, errorsX, );
          setErrorsX( [ progress[0], ...errorsX ] );

        } else if ( progress[0].array === 'Field' ) {
          console.log( 'setProgress progress, fieldsX,:', progress, fieldsX, );
          setFieldsX( [ progress[0], ...fieldsX ] );
          // setFields( fields.length === 0 ? [ progressX ] : [ progressX ].concat( fields ) );

        } else if ( progress[0].array === 'View' ) {
          console.log( 'setProgress progress, viewsX,:', progress, viewsX, );
          setViewsX( [ progress[0], ...viewsX ] );

        } else if ( progress[0].array === 'Item' ) {
          console.log( 'setProgress progress, itemsX,:', progress, itemsX, );
          setItemsX( [ progress[0], ...itemsX ] );
        }

      });

      console.log( 'setProgressNow Id: ', `${id} -  ${progress[0].id}` );
  }

  const markComplete = ( listCreated: IMyProgress[][] ) : void => {
    // alert( 'Finished!' );
    setStatus( 'Finished' );

    const history = {
      count: listCreated[1].length + listCreated[2].length + listCreated[3].length,
      errors: listCreated[0],
      fields: listCreated[1],
      views: listCreated[2],
      items: listCreated[3],
    };

    let progressLast = null;
    if ( listCreated[3].length > 0 ) {
      progressLast = listCreated[3][ 0 ];
    } else if ( listCreated[2].length > 0 ) {
      progressLast = listCreated[2][ 0 ];
    } else if ( listCreated[1].length > 0 ) {
      progressLast = listCreated[1][ 0 ];
    }

    saveAssist(
      makeList.webURL,
      `Applied Template: v2.0.0.2 ${makeList.definedList} - ${makeList.listDefinition} to List: ${makeList.title}`,
      makeList.listURL,
      ['2. Provisioning'],
      history,
    );

    saveProvisioning(
      context as any,
      `${ApplyTemplate_Rail_SaveTitle} - v2.0.0.2`,  // analyticsListRailsApply: string,
      `${ApplyTemplate_Rail_SaveTitle} - v2.0.0.2`,  // Title: string, 
      'Complete',
      `${ApplyTemplate_Rail_SaveTitle} - v2.0.0.2`,  // panelVersionNumber: string, 
      makeList,
      targetList,
      'AddTemplate',
      progressLast,
      history, // Add entire history

    )
//     import { saveAnalytics, ApplyTemplate_Rail_SaveTitle, ProvisionListsSaveTitle} from '@mikezimm/npmfunctions/dist/Services/Analytics/normal';

// import { saveThisLogItem } from  '@mikezimm/npmfunctions/dist/Services/Logging/ErrorHandler';
// import { getWebUrlFromLink, getUrlVars,  } from '@mikezimm/npmfunctions/dist/Services/Logging/LogFunctions';
// import { getCurrentPageLink, makeListLink, makeSiteLink, } from '@mikezimm/npmfunctions/dist/Services/Logging/LogFunctions';

// let theSite: any = this.props.theSite;
// let ServerRelativeUrl = this.props.currentPage;
// let pickedWeb = this.props.pickedWeb.ServerRelativeUrl + '|' + this.props.pickedWeb.guid + '|' + theSite.Url + '|' + theSite.Id ;

// let idx = this.state.listNo;
// let mapThisList: IMakeThisList = this.state.lists[ idx ];

// saveAnalytics( this.props.analyticsWeb, strings.analyticsListRailsApply , //analyticsWeb, analyticsList,
//     ServerRelativeUrl, ServerRelativeUrl,//serverRelativeUrl, webTitle,
//     `${ApplyTemplate_Rail_SaveTitle} - v2.0.0.2`, pickedWeb, this.props.theList.listURL, //saveTitle, TargetSite, TargetList
//     this.props.theList.Title, null , 'Complete', //itemInfo1, itemInfo2, result, 
//     mapThisList, this.props.railFunction, this.state.progress, this.state.history ); //richText, Setting, richText2, richText3

// saveAssist( //strings.requestListSite, strings.requestListList , //analyticsWeb, analyticsList,
//     ServerRelativeUrl, ServerRelativeUrl,//serverRelativeUrl, webTitle,
//     `Applied Template: v2.0.0.2 ${mapThisList.definedList} - ${mapThisList.listDefinition} to List: ${mapThisList.title}` , this.props.pickedWeb, this.props.theList.listURL, //saveTitle, TargetSite, TargetList
//     '', ['2. Provisioning'], '', //itemInfo1 ( Not used yet ), itemInfo2 ( Scope array ), result ( Not used yet ), 
//     JSON.stringify(this.state.history), this.props.railFunction, null, null ); //richText, Setting, richText2, richText3

  }

  const resetState = async (): Promise<void> => {
    // Found from:  https://codesandbox.io/s/402pn5l989?file=/src/index.js:288-366
    await Promise.resolve().then(() => {
      setTotal( 0 );
      setCurrentX( 0 );
      setProgressX( null );
      setStatus( 'Starting' );
      setShowDetails( false );
      setErrorsX( [] );
      setFieldsX( [] );
      setViewsX( [] );
      setItemsX( [] );
    });
  }

  const applyThisTemplate = async (): Promise<void> => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const test = total + 0;
    // Found from:  https://codesandbox.io/s/402pn5l989?file=/src/index.js:288-366
    // await Promise.resolve().then(() => {
    //   setTotal( 0 );
    //   setCurrentX( 0 );
    //   setProgressX( null );
    //   setStatus( 'Starting' );
    //   setShowDetails( false );
    //   setErrorsX( [] );
    //   setFieldsX( [] );
    //   setViewsX( [] );
    //   setItemsX( [] );
    // });

    await resetState();

    console.log('can pause here');
    // if ( test !== 0 ) return; // Testing for hitting apply twice to see what happens

    const listCreated: IMyProgress[][] = await provisionTheList( {
      makeThisList: makeList,
      setProgress: setProgressNow,
      markComplete: markComplete,
      readOnly: false,
      requireAll: false,
      doFields: true,
      doItems: true,
      doViews: true,

    } );
    // Both versions seem to be different instances
    // const listCreated: IServiceLog[] = await provisionTheList( makeList, false, setProgress.bind( this ), markComplete.bind( this ) , true, true, false );

    console.log( `listCreated`, listCreated );

    // Found from:  https://codesandbox.io/s/402pn5l989?file=/src/index.js:288-366
    await Promise.resolve().then(() => {
      setErrorsX( listCreated[0] );
      setFieldsX( listCreated[1] );
      setViewsX( listCreated[2] );
      setItemsX( listCreated[3] );
      setStatus( 'Finished' );
    });

    // const results: IStateSource = await getSourceItems(ApplyTemplateHookSourceProps, false, true ) as IStateSource;

    // if (results.status !== 'Success') {
    //   results.items = [ createErrorFPSTileItem( results, null ) ];

    // } else {
    //   const search: ISourceSearch = null;
    //   results.items = addSearchMeta1(results.items, ApplyTemplateHookSourceProps, search);
    // }

    // setApplied( results.loaded );
    // setStateSource( results );
    // setProcPerformance( null ); // Add here if you want to also monitor some process performance
    // setFetchPerformance( results.unifiedPerformanceOps.fetch );
  };


  // useEffect(() => {

  //   if ( expandedState === true && applied === false ) {
  //     // eslint-disable-next-line no-void
  //     void applyThisTemplate();

  //     return () => {
  //       // this now gets called when the component unmounts
  //     };
  //   }

  // }, [ expandedState, applied ] );

  useEffect(() => {
    if ( expandedState === true && targetList ) {
      setChoices( targetList.BaseTemplate === 101 ? DefinedLibraryChoices : DefinedListChoices );
      setListChoice( props.selectedTemplate ? props.selectedTemplate : null );
      // eslint-disale-next-line no-void
      // const newMakeList =  getSpecificListDef( props.targetList as IListInfo, null, webUrl, [] );
      // console.log( 'ApplylTemplate: newMakeList', newMakeList )
      // setMakeList( newMakeList )
    }

  }, [ propsRefreshId ] );


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

  // async (): Promise<void> =>
  const templateChange = async ( index?: number): Promise<void> => {
    const key: IDefinedListInfo =  choices[ index ];
    setMakeList( getSpecificListDef( props.targetList as IListInfo, key, webUrl, [], listExists ) )
    setListChoice( choices[ index ] );
    props.updateSelectedTemplate( choices[ index ] );
    await resetState();
  }


  /***
   *    d88888b db      d88888b .88b  d88. d88888b d8b   db d888888b .d8888. 
   *    88'     88      88'     88'YbdP`88 88'     888o  88 `~~88~~' 88'  YP 
   *    88ooooo 88      88ooooo 88  88  88 88ooooo 88V8o 88    88    `8bo.   
   *    88~~~~~ 88      88~~~~~ 88  88  88 88~~~~~ 88 V8o88    88      `Y8b. 
   *    88.     88booo. 88.     88  88  88 88.     88  V888    88    db   8D 
   *    Y88888P Y88888P Y88888P YP  YP  YP Y88888P VP   V8P    YP    `8888Y' 
   *                                                                         
   *       async (): Promise<void>                                                                  
   */ 

  const TemplateDropdown: JSX.Element = 
    <div className='apply-template-dropdown'>
      <Dropdown 
          placeholder={ `Select the template you want to apply` }
          options={ choices.map( choice => { return { key: choice.listDefinition, text: choice.listDefinition }}) }
          onChange={ async ( event, option, index ) => { await templateChange( index ) }}
          dropdownWidth={ 250 }
          disabled={ !targetList }
          selectedKey={ listChoice?.listDefinition }

        />
    </div>;

  const AccordionContent: JSX.Element = <div className={ 'yourClassName' }style={{ cursor: 'default', padding: '5px 3em 15px 2em' }}>
    {/* { sourceButtonRow( null ) } */}
    {/* { makeList?.templateFields } */}
    {/* { makeList?.templateViews } */}
    { makeList && makeList.createTheseFields ? <div>
      <div className='items-title'>Fields to be added</div>
      <div className={ 'template-items' }>
        { makeList.createTheseFields.length === 0 ? 
        <div>No fields defined for this template</div>:
        makeList.createTheseFields.map( field => { return <div key={ field.Title }
        title={ field.TypeDisplayName } >{ typeof field  === 'object' ? decodeURI( field.name ) : field }</div> })}
      </div>
    </div> : undefined }

    { makeList && makeList.createTheseViews ? <div>
      <div className='items-title'>Views to be added</div>
      <div className={ 'template-items' }>
        { makeList.createTheseViews.length === 0 ? 
        <div>No views defined for this template</div>:
        makeList.createTheseViews.map( view => { return <div key={ view.Title }
        title={view.iFields.map( field=> { return typeof field  === 'object' ? decodeURI( field.name ) : field }  ).join(', ') } >{ typeof view  === 'object' ? view.Title : view }</div> })}
      </div>
    </div> : undefined }
  </div>;

  const accordionHeight: number = -100;

  const TemplateDetails: JSX.Element = <Accordion 
    title = { makeList?.templateDesc }
    defaultIcon = 'Help'
    showAccordion = { showDetails }
    content = { AccordionContent }
    refreshId={ makeid(5) }
    contentStylesVis = {{ height: `${accordionHeight}px` }}
    componentStyles={{ paddingBottom: '1em' }}
  />;

  const CurrentProgress = progressX === null ? <div style={{ display: 'inline-flex'}} >No Progress was found</div> : <ProgressIndicator
      label={progressX.label}
      description={progressX.description}
      percentComplete={progressX.percentComplete}
      progressHidden={progressX.progressHidden}/>;

  const ProgressPane: JSX.Element = <div style={{ padding: '5px 3em 15px 2em'}}>
    { CurrentProgress }
    <div className='applyTemplateLogs' style={{ height: total === 0 ? '0px' : null, overflow: total === 0 ? 'hidden' : 'visible' }}>

      { FPSLogListFunction( { title: 'Error', items: errorsX, showWhenEmpty: true, descending: true, titles: null }) }
      { makeList?.createTheseFields.length > 0 ? FPSLogListFunction( { title: 'Column', items: fieldsX, showWhenEmpty: true, descending: true, titles: null }) : null }
      { makeList?.createTheseViews.length > 0 ? FPSLogListFunction( { title: 'View', items: viewsX, showWhenEmpty: true, descending: true, titles: null }) : null }
      { makeList?.createTheseItems.length > 0 ? FPSLogListFunction( { title: 'Item', items: itemsX, showWhenEmpty: true, descending: true, titles: null }) : null }
      {/* <FPSLogListHook
        title={ 'Error'}           items={ errorsX }   showWhenEmpty={ true }
        descending={false}          titles={null}            />

      <FPSLogListHook
        title={ 'Column'}           items={ fieldsX }  showWhenEmpty={ true }
        descending={false}          titles={null}            />

      <FPSLogListHook
        title={ 'View'}           items={ viewsX }     showWhenEmpty={ true }
        descending={false}          titles={null}            />

      <FPSLogListHook
        title={ 'Item'}           items={ itemsX }     showWhenEmpty={ false }
        descending={false}          titles={null}            /> */}
    </div>
  </div>;


  const ProgressElement: JSX.Element = <Accordion 
    title = { `Provisioning Progress - Click for more details` }
    defaultIcon = 'Help'
    showAccordion = { errorsX.length > 0 ? true : false }
    content = { ProgressPane }
    refreshId={ makeid(5) }
    contentStylesVis = {{ height: `auto` }}
    contentStylesHidden = {{ height: `80px` }}
    componentStyles={{ paddingBottom: '1em' }}
  />;

  const ButtonRow: JSX.Element = <div className='apply-template-dropdown' style={{ display: 'flex', justifyContent: 'space-between' }}>
      <button className={ applied !== true && listChoice ? styles.enabled : null }
        disabled={ applied === false && listChoice ? false : true }
        // onClick={ applyThisTemplate.bind( this ) }
        onClick={ () => applyThisTemplate() }
        >
        Apply Template
      </button>
      <button className={ applied !== true ? styles.enabled : null }
        disabled={ applied === true ? true : false }
        onClick={ () => { alert( 'Ok, we will be here if you need a template :)') }}
        >
        Skip
      </button>
  </div>

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

  // console.log( 'ApplylTemplate: propsRefreshId', propsRefreshId );
  // console.log( 'ApplylTemplate: refreshId', refreshId );
  // console.log( 'ApplylTemplate: webUrl', webUrl );
  // console.log( 'ApplylTemplate: expandedState', expandedState );
  // console.log( 'ApplylTemplate: targetList', targetList );
  // console.log( 'ApplylTemplate: makeList', makeList );
  // console.log( 'ApplylTemplate: webUrl', webUrl );

  const ComponentTitle = targetList && targetList.Title ? `Selected Library: ${ targetList.Title }` : undefined;
  const TitleElement: JSX.Element = !ComponentTitle ? undefined : <div  className={ stylesTop.tabHeadingElement } style={{  }}>{ ComponentTitle }</div>;

  const FinalElement: JSX.Element = expandedState === 'Nudge' ? 
  <div className='apply-template-page'><div className={ stylesTop.tabHeadingElement } style={{  }}>First, Create a new Library.  Then you can use this page.....</div></div> :
    expandedState !== true ? null
    : <div className = { [ 'apply-template-page' ].join( ' ' ) } style={{ minHeight: '450px', background: 'lightgreen', }}>
    { TitleElement}
    <div style={{ fontWeight: 600, fontSize: 'larger', marginBottom: '1.5em' }}>Want to kick-start your library with a Template?</div>
    { TemplateDropdown }
    { ButtonRow }
    { listChoice ? TemplateDetails : undefined }
    { ProgressElement }

  </div>;

  return ( FinalElement );

}

export default ApplyTemplateHook;