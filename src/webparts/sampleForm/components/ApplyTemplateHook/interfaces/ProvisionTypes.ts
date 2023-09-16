
/**
 * MOVE TO 
 */

import { IFields, } from "@pnp/sp/fields/types";
import { IViews, } from "@pnp/sp/views/types";

import { IMyFieldTypes, } from '@mikezimm/fps-library-v2/lib/components/molecules/Provisioning/interfaces/columnTypes';
import { IMyView, } from '@mikezimm/fps-library-v2/lib/components/molecules/Provisioning/interfaces/viewTypes';
import { IProvisionableFPSlates, IValidTemplate } from "./FPSTemplates";

 /***
 *    d888888b .88b  d88. d8888b.  .d88b.  d8888b. d888888b      db   db d88888b db      d8888b. d88888b d8888b. .d8888. 
 *      `88'   88'YbdP`88 88  `8D .8P  Y8. 88  `8D `~~88~~'      88   88 88'     88      88  `8D 88'     88  `8D 88'  YP 
 *       88    88  88  88 88oodD' 88    88 88oobY'    88         88ooo88 88ooooo 88      88oodD' 88ooooo 88oobY' `8bo.   
 *       88    88  88  88 88~~~   88    88 88`8b      88         88~~~88 88~~~~~ 88      88~~~   88~~~~~ 88`8b     `Y8b. 
 *      .88.   88  88  88 88      `8b  d8' 88 `88.    88         88   88 88.     88booo. 88      88.     88 `88. db   8D 
 *    Y888888P YP  YP  YP 88       `Y88P'  88   YD    YP         YP   YP Y88888P Y88888P 88      Y88888P 88   YD `8888Y' 
 *                                                                                                                       
 *                                                                                                                       
 */

 /***
 *    d888888b .88b  d88. d8888b.  .d88b.  d8888b. d888888b       .o88b.  .d88b.  .88b  d88. d8888b.  .d88b.  d8b   db d88888b d8b   db d888888b 
 *      `88'   88'YbdP`88 88  `8D .8P  Y8. 88  `8D `~~88~~'      d8P  Y8 .8P  Y8. 88'YbdP`88 88  `8D .8P  Y8. 888o  88 88'     888o  88 `~~88~~' 
 *       88    88  88  88 88oodD' 88    88 88oobY'    88         8P      88    88 88  88  88 88oodD' 88    88 88V8o 88 88ooooo 88V8o 88    88    
 *       88    88  88  88 88~~~   88    88 88`8b      88         8b      88    88 88  88  88 88~~~   88    88 88 V8o88 88~~~~~ 88 V8o88    88    
 *      .88.   88  88  88 88      `8b  d8' 88 `88.    88         Y8b  d8 `8b  d8' 88  88  88 88      `8b  d8' 88  V888 88.     88  V888    88    
 *    Y888888P YP  YP  YP 88       `Y88P'  88   YD    YP          `Y88P'  `Y88P'  YP  YP  YP 88       `Y88P'  VP   V8P Y88888P VP   V8P    YP    
 *                                                                                                                                               
 *                                                                                                                                               
 */

/***
 *    d88888b db    db d8888b.  .d88b.  d8888b. d888888b      d888888b d8b   db d888888b d88888b d8888b. d88888b  .d8b.   .o88b. d88888b .d8888. 
 *    88'     `8b  d8' 88  `8D .8P  Y8. 88  `8D `~~88~~'        `88'   888o  88 `~~88~~' 88'     88  `8D 88'     d8' `8b d8P  Y8 88'     88'  YP 
 *    88ooooo  `8bd8'  88oodD' 88    88 88oobY'    88            88    88V8o 88    88    88ooooo 88oobY' 88ooo   88ooo88 8P      88ooooo `8bo.   
 *    88~~~~~  .dPYb.  88~~~   88    88 88`8b      88            88    88 V8o88    88    88~~~~~ 88`8b   88~~~   88~~~88 8b      88~~~~~   `Y8b. 
 *    88.     .8P  Y8. 88      `8b  d8' 88 `88.    88           .88.   88  V888    88    88.     88 `88. 88      88   88 Y8b  d8 88.     db   8D 
 *    Y88888P YP    YP 88       `Y88P'  88   YD    YP         Y888888P VP   V8P    YP    Y88888P 88   YD YP      YP   YP  `Y88P' Y88888P `8888Y' 
 *                                                                                                                                               
 *                                                                                                                                               
 */
export const DefStatusField = 'Status';
export const DefEffStatusField = 'Effective Status';

export const availComponents : IDefinedComponent[] =  [ DefStatusField , DefEffStatusField, 'Year-Period' , 'Steps Done', 'Product' ]; 

export type IDefinedComponent = 'Pick component Type' | typeof DefStatusField | typeof DefEffStatusField | 'Year-Period' | 'Steps Done' | 'Product' | 'Inventory';

export type IListDefintionReports = 'Reports1' | 'Reports2';
export type IListDefintionHarmonie = 'Emails' | 'BUEmails' ;
export type IListDefintionCustReq = 'Program' | 'SORInfo'  ;
export type IListDefintionMfg = 'AMC' | 'AMG' | 'Cell' | 'Products' | 'AB' | 'SB' | 'SW' | 'IN' | 'TE' | 'DU' ;
export type IListDefintionLogistics = 'Warehouse' | 'WarehouseAll' | 'Inventory' | 'Shipping' | 'ShippingAll' | 'Logistics' | 'LogisticsFull' | 'LogisticsFullStatus' ;

export const MfgProductNames: IListDefintionMfg[] = [ 'AB', 'SB', 'SW', 'IN', 'TE' , 'DU' ];

export type IListDefintionTMT = 'Projects' | 'TrackMyTime';
export type IListDefintionErrors = 'ErrorChecks' | 'ErrorViews' | 'ErrorColumns';
export type IListDefintionTurnOver = 'AOA Turnover' | 'IBC Turnover' | 'TBD Turnover';
export type IListDefintionPivot = 'OurTiles' | 'PivotTiles';
export type IListDefintionPreConfig = 'Drilldown' | 'CarrotCharts' | 'GridCharts';
export type IListDefintionFinTasks = 'Finance Tasks' | 'OurTasks' | 'OurTasksLight';

export type IListDefintionLytics = 'Full' | 'List' | 'zText' | 'zRich' | 'zNumb' | 'Guids' | 'Memory' | 'Url' ;

// export type IValidTemplate = 100 | 101;

//Add here to make available in dropdown (but does not work unless they are in the definedLists array )
export const availLists : IDefinedLists[] =  ['No List Available', 'TrackMyTime','Harmon.ie','Customer Requirements', 'Tasks' ,  'Reports' ,
  'Turnover' , 'PivotTiles' , 'Manufacturing', 'Logistics', 'Analytics', 'PreConfig'];

//Currently Not beeing used
export const definedLists : IDefinedLists[] = ['TrackMyTime','Harmon.ie','Customer Requirements','Tasks', 'Reports', 
  'Turnover', 'Socialiis', 'PivotTiles', 'Manufacturing', 'Logistics', 'Analytics', 'PreConfig' ];

/**
 * NOTE:  'Pick list Type' ( availLists[0] ) is hard coded in numerous places.  If you change the text, be sure to change it everywhere.
 * First item in availLists array ( availLists[0] ) is default one so it should be the 'Pick list type' one.
 * 
 */
export type IDefinedLists = 'No List Available' | 'ErrorChecks' | 'TrackMyTime' | 'Harmon.ie' | 'Customer Requirements' | 'Tasks' |  'Reports' |  'Turnover' |  
  'Socialiis' | 'PivotTiles' | 'Drilldown' | 'PreConfig' | 'Manufacturing' | 'Analytics' |   'Logistics' | 'Components';

export type IDefinedChoice = 'Pick component Type' | IListDefintionErrors | IListDefintionTMT | IListDefintionHarmonie | IListDefintionCustReq | IListDefintionFinTasks |  IListDefintionReports |  IListDefintionTurnOver | IListDefintionPivot | IListDefintionPreConfig | IListDefintionLogistics | '';

export interface IDefinedListInfo {
  listDefinition: IDefinedChoice;
  list: IDefinedLists;
  templates: IProvisionableFPSlates[];
}

const Emails: IDefinedListInfo = {
  listDefinition: `Emails`,
  list: `Harmon.ie`,
  templates: [ 101 ],
}

const BUEmails: IDefinedListInfo = {
  listDefinition: `BUEmails`,
  list: `Harmon.ie`,
  templates: [ 101 ],
}

const ErrorTesting: IDefinedListInfo = {
  listDefinition: `ErrorChecks`,
  list: `ErrorChecks`,
  templates: [ 101, 100 ],
}


export const DefinedListChoices: IDefinedListInfo[] = [
  ErrorTesting
];

export const DefinedLibraryChoices: IDefinedListInfo[] = [
  Emails , BUEmails, ErrorTesting
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IAnyArray = any[];

export type IProvisionableBaseType = 0 | 1;
export type IExcludeBaseTemplate = number;

export interface IMakeThisList {

    title: string;
    name: string;
    webURL: string;
    listURL: string;
    desc: string;
    template: IValidTemplate;  // listURL, template
    enableContentTypes: boolean;
    additionalSettings: { 
        EnableVersioning: boolean;
        MajorVersionLimit: number;
        OnQuickLaunch: boolean;
     };
    createTheseFields: IMyFieldTypes[];
    createTheseViews: IMyView[];

    currentFields: IFields[];
    currentViews: IViews[];

    createTheseItems: IAnyArray;
    autoItemCreate: boolean;
    alternateItemCreateMessage?: string;
    confirmed: boolean; // Likely not needed... seems like this was used on PageProvisioning if anything... but can not see any use.
    // onCurrentSite: boolean;  //- Checked in EasyContents and this only seems to be used in defineTheMaster and no where else.
    webExists: boolean; // Likely can be removed if there is always a valid web url passed in from context or text box
    listExists: boolean; // Likely can be removed if this is always called after the list is created or already known from web part
    listExistedB4: boolean; // Likely can be removed if this is always called after the list is created or already known from web part
    existingTemplate: number; // This is actuall the BaseTemplate
    sameTemplate: boolean; // Used for determining provision button text and disabled... could be done differently though
    listDefinition: string;
    definedList: IDefinedLists;
    validUserIds?: number[];  // Used for creating sample items with user columns
    templateDesc: string;
    templateDetails: string;
    templateFields: JSX.Element;
    templateViews: JSX.Element;

}