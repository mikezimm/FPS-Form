

/***
 *    d88888b d8888b. .d8888.      d8888b. d8888b. d88888b .d8888. d88888b d888888b .d8888. 
 *    88'     88  `8D 88'  YP      88  `8D 88  `8D 88'     88'  YP 88'     `~~88~~' 88'  YP 
 *    88ooo   88oodD' `8bo.        88oodD' 88oobY' 88ooooo `8bo.   88ooooo    88    `8bo.   
 *    88~~~   88~~~     `Y8b.      88~~~   88`8b   88~~~~~   `Y8b. 88~~~~~    88      `Y8b. 
 *    88      88      db   8D      88      88 `88. 88.     db   8D 88.        88    db   8D 
 *    YP      88      `8888Y'      88      88   YD Y88888P `8888Y' Y88888P    YP    `8888Y' 
 *          
 *          
 */

//  import { saveAnalytics3, getMinPerformanceString } from '../Logging/saveAnalytics';
//  import { IZLoadAnalytics, IZSentAnalytics, } from '../Logging/Interfaces/analytics';
// import { ILoadPerformance } from '../../components/indexes/Performance';
// import { check4Gulp } from '@mikezimm/fps-pnp2/lib/services/sp/CheckGulping';
// import { IPerformanceOp } from '../../components/molecules/Performance/IPerformance';
// import { WebPartContextCopy_15_2 } from '../../common/interfaces/indexes';
// import { AnalyticsWeb } from './Interfaces/constants';

 import { saveAnalytics3, getMinPerformanceString } from '@mikezimm/fps-library-v2/lib/pnpjs/Logging/saveAnalytics';
 import { IZFullAnalytics, IZLoadAnalytics, IZSentAnalytics, } from '@mikezimm/fps-library-v2/lib/pnpjs/Logging/Interfaces/analytics';
import { ILoadPerformance } from '@mikezimm/fps-library-v2/lib/components/indexes/Performance';
import { check4Gulp } from '@mikezimm/fps-pnp2/lib/services/sp/CheckGulping';
import { IPerformanceOp } from '@mikezimm/fps-library-v2/lib/components/molecules/Performance/IPerformance';
import { WebPartContextCopy_15_2 } from '@mikezimm/fps-library-v2/lib/common/interfaces/indexes';
import { AnalyticsWeb } from '@mikezimm/fps-library-v2/lib/pnpjs/Logging/Interfaces/constants';
import { EasyContentsRailsApply } from '@mikezimm/fps-library-v2/lib/pnpjs/Logging/Interfaces/EasyContents';
import { getTheCurrentTime } from '@mikezimm/fps-library-v2/lib/pnpjs/Logging/permissionsSave';
import { IMakeThisList } from "@mikezimm/fps-library-v2/lib/components/molecules/Provisioning/interfaces/IMakeThisList";
import { IListInfo } from '@mikezimm/fps-library-v2/lib/components/molecules/Provisioning/interfaces/listTypes';

 /***
  *    db       .d88b.   .o88b.  .d8b.  db      
  *    88      .8P  Y8. d8P  Y8 d8' `8b 88      
  *    88      88    88 8P      88ooo88 88      
  *    88      88    88 8b      88~~~88 88      
  *    88booo. `8b  d8' Y8b  d8 88   88 88booo. 
  *    Y88888P  `Y88P'   `Y88P' YP   YP Y88888P 
  *                                             
  *                                             
  */

/***
 *     .d8b.  d8b   db  .d8b.  db      db    db d888888b d888888b  .o88b. .d8888. 
 *    d8' `8b 888o  88 d8' `8b 88      `8b  d8' `~~88~~'   `88'   d8P  Y8 88'  YP 
 *    88ooo88 88V8o 88 88ooo88 88       `8bd8'     88       88    8P      `8bo.   
 *    88~~~88 88 V8o88 88~~~88 88         88       88       88    8b        `Y8b. 
 *    88   88 88  V888 88   88 88booo.    88       88      .88.   Y8b  d8 db   8D 
 *    YP   YP VP   V8P YP   YP Y88888P    YP       YP    Y888888P  `Y88P' `8888Y' 
 *
 *
 */
// ( context, 'rail applied', LongTitle, mapThisList, railFunction, progress, history, performance? )

/**
 * 
 * @param context : WebPart Context
 * @param analyticsListRailsApply :  Which Provisioning was applied => `${ApplyTemplate_Rail_SaveTitle} - v2.0.0.2`
 * @param Title : `${ApplyTemplate_Rail_SaveTitle} - v2.0.0.2`
 * @param Result 
 * @param panelVersionNumber 
 * @param zzzRichText1Obj : mapThisList
 * @param Setting : this.props.railFunction
 * @param zzzRichText2Obj : this.state.progress
 * @param zzzRichText3Obj : this.state.history
 * @param performanceObj 
 * @returns 
 */

// export interface ISaveProvisioningCommonProps {
//   context: WebPartContextCopy_15_2;
//   analyticsListRailsApply: string;
//   title: string;
//   railFunction: any;

// }

export function saveProvisioning( 
    context: WebPartContextCopy_15_2 , 
    analyticsListRailsApply: string, 
    Title: string, 
    Result: string, 
    panelVersionNumber: string, 
    makeList: IMakeThisList, 
    targetList: Partial<IListInfo>,
    Setting: string, 
    progress: any, 
    history: any, 
    performanceObj: ILoadPerformance = null ) : boolean {

  const site = context.pageContext.site;
  const web = context.pageContext.web;

  const loadProperties: IZLoadAnalytics = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    SiteID: site.id['_guid'] as any,  //Current site collection ID for easy filtering in large list
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    WebID:  web.id['_guid'] as any,  //Current web ID for easy filtering in large list
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    SiteTitle:  web.serverRelativeUrl as any, //Web Title        TargetSite:  context.pageContext.web.serverRelativeUrl,  //Saved as link column.  Displayed as Relative Url
    TargetSite:  web.absoluteUrl as any, //Web Title        TargetSite:  context.pageContext.web.serverRelativeUrl,  //Saved as link column.  Displayed as Relative Url
    ListID:  `${targetList.Id}`,  //Current list ID for easy filtering in large list
    ListTitle:  `${makeList.title}`,
  };

  const performance : string = getMinPerformanceString( performanceObj );

  const startTime = getTheCurrentTime();

  const saveObject: IZSentAnalytics = {
    loadProperties: loadProperties,

    Title: Title,  //General Label used to identify what analytics you are saving:  such as Web Permissions or List Permissions.

    Result: Result,  //Success or Error

    CodeVersion: panelVersionNumber,

    zzzText1: startTime.now,
    zzzText2: startTime.theTime,
    zzzText5: site.id['_guid'] as any,
    // PageURL: undefined,
    // PageLink: undefined,
    // SiteID: undefined,
    // SiteTitle: undefined,
    // WebID: undefined,
    // ListID: undefined,
    // ListTitle: undefined,
    // memory: undefined,
    // browser: undefined,
    // JSHeapSize: undefined,
    // screen: undefined,
    // screenSize: undefined,
    // device: undefined,
    // FPSItem: undefined,

  };

  //This will get rid of all the escaped characters in the summary (since it's all numbers)
  // let zzzRichText3 = ''; //JSON.stringify( fetchInfo.summary ).replace('\\','');
  //This will get rid of the leading and trailing quotes which have to be removed to make it real json object
  // zzzRichText3 = zzzRichText3.slice(1, zzzRichText3.length - 1);

  if ( makeList ) saveObject.zzzRichText1 = JSON.stringify( makeList );
  if ( progress ) saveObject.zzzRichText2 = JSON.stringify( progress );
  if ( history ) saveObject.zzzRichText3 = JSON.stringify( history );
  if ( Setting ) saveObject.Setting = typeof Setting === 'string' ? Setting : JSON.stringify( Setting );
  if ( performance ) saveObject.performance = performance;

  saveObject.TargetList = {
    'Url': makeList.listURL,
    'Description': makeList.listURL,
  };  //Saved as link column.  Displayed as Relative Url

  saveObject.SiteLink = {
    'Url': site.absoluteUrl,
    'Description': site.absoluteUrl,
  }

  if ( check4Gulp() === true ) { console.log( 'saveViewAnalytics', AnalyticsWeb , `${ EasyContentsRailsApply }`) }
  if ( check4Gulp() === true ) { console.log( 'saveViewAnalytics', saveObject) }

  saveAnalytics3( AnalyticsWeb , `${ EasyContentsRailsApply }` , saveObject, true );

  const saved = true;
  console.log('saved view info');
  return saved;

}

