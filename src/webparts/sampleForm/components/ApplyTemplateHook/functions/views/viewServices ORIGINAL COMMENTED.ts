

// import { IMyListInfo, IServiceLog, } from '@mikezimm/fps-library-v2/lib/components/molecules/Provisioning/interfaces/listTypes';
// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { IViewOrder, IViewGroupBy,  } from '@mikezimm/fps-library-v2/lib/components/molecules/Provisioning/interfaces/viewTypes';
// import { IViews, } from "@pnp/sp/views/types";

// import { getHelpfullErrorV2 } from '@mikezimm/fps-library-v2/lib/logic/Errors/friendly';
// import { BaseErrorTrace } from '@mikezimm/fps-library-v2/lib/PackageConst';  //, [ BaseErrorTrace , 'Failed', 'try switchType ~ 324', helpfulErrorEnd ].join('|')   let helpfulErrorEnd = [ myList.title, f.name, i, n ].join('|');

// import { IMyView , } from '@mikezimm/fps-library-v2/lib/components/molecules/Provisioning/interfaces/viewTypes';

// import { getXMLObjectFromString } from '@mikezimm/fps-library-v2/lib/components/atoms/XML/xmlStrings';

// import "@pnp/sp/webs";
// import "@pnp/sp/lists";
// import "@pnp/sp/fields";
// import "@pnp/sp/views";
// import "@pnp/sp/fields/list";


// import { IMyProgress } from "@mikezimm/fps-library-v2/lib/common/interfaces/fps/IMyInterfaces";
// import { addMyProgress, createProgressObject } from "../addMyProgress";
// import { addViewCompareErrorStr } from './addViewCompareErrorStr';
// import { addViewWhereXMLString } from './addViewWhereXMLString';
// import { addViewOrderByXMLString } from './addViewOrderByXMLString';
// import { addViewGroupXMLString } from './addViewGroupXMLString';
// import { addViewFieldSchemaString } from './addViewFieldSchemaString';
// import { updateViewExists } from './updateViewExists';

// /***
//  *    d88888b db    db d8b   db  .o88b. d888888b d888888b  .d88b.  d8b   db 
//  *    88'     88    88 888o  88 d8P  Y8 `~~88~~'   `88'   .8P  Y8. 888o  88 
//  *    88ooo   88    88 88V8o 88 8P         88       88    88    88 88V8o 88 
//  *    88~~~   88    88 88 V8o88 8b         88       88    88    88 88 V8o88 
//  *    88      88b  d88 88  V888 Y8b  d8    88      .88.   `8b  d8' 88  V888 
//  *    YP      ~Y8888P' VP   V8P  `Y88P'    YP    Y888888P  `Y88P'  VP   V8P 
//  *                                                                          
//  *                                                                          
//  */

// //private async ensureTrackTimeList(myListName: string, myListDesc: string, ProjectOrTime: string): Promise<boolean> {

// export async function addTheseViews( listExistedB4 : boolean, readOnly: boolean, myList: IMyListInfo, listViews: IViews, currentViews: any[], viewsToAdd: IMyView[], setProgress : (progress : IMyProgress[]) => void, alertMe: boolean, consoleLog: boolean, skipTry = false): Promise<IMyProgress[]>{

//     let statusLog : IMyProgress[] = [];
//     const listTitle= myList.title;
//     /**
//      * listViews just gets the current list's view fetch handler which is used to actually add views to the list.
//      * currentViews should show the actual views on the list prior to getting to this point. 
//      * 
//      * 2023-09-08:  I think this is now redundat after fixing some of the interface issues in the provisioning function
//      */

//     // let listViews = null;

//     // if (readOnly === false ) {
//     //     if ( ensuredList.list === undefined ) {
//     //         listViews = ensuredList.views;
//     //     } else {
//     //         listViews = ensuredList.list.views;
//     //     }
//     // } else { 
//     //     listViews = ensuredList.views;
//     // }

//     /**
//     * @param progressHidden 
//     * @param current : current index of progress
//     * @param ofThese : total count of items in progress
//     * @param color : color of label like red, yellow, green, null
//     * @param icon : Fabric Icon name if desired
//     * @param logLabel : short label of item used for displaying in list
//     * @param label : longer label used in Progress Indicator and hover card
//     * @param description 
//    */

//     // setProgress(false, "V", 0, 0 , '', 'TimePicker', myList.title, 'Adding VIEWS to list: ' + myList.title, 'Checking for VIEWS', 'Add view ~ 194'  );
//     statusLog = addMyProgress( statusLog, false, 'View', 0, 0 , '', 'TimePicker', listTitle, 'Adding VIEWS to list', 'Add' , `Starting` , setProgress, `Add view ~ 194` );

//     //let returnArray: [] = [];

//     let iV = 0;
//     const nV = viewsToAdd.length;

//     for (let v of viewsToAdd) {
//         iV++;
//         const helpfulErrorEnd = [ myList.title, v.Title,iV, nV ].join('|');
//         // setProgress(false, "V", iV, nV , 'darkgray', 'CalculatorSubtract', v.Title, 'Adding views to list: ' + myList.title, 'View ' + iV + ' of ' + nV + ' : ' + v.Title, 'Add view ~ 198' );
//         statusLog = addMyProgress( statusLog, false, 'View', iV, nV , 'darkgray', 'CalculatorSubtract', v.Title, 'Adding VIEWS to list', 'Add' , `Starting` , setProgress, `Add view ~ 198` );
//         /**
//          * Build view settings schema
//          */

//         v = updateViewExists( myList, v, iV, nV, currentViews );
//         // let foundView = false;
//         // //Assuming that if I'm creating a column, it's an object with .name value.
//         // const checkView = v.Title ;
//         // const currentViewIndex = doesObjectExistInArray(currentViews, 'Title', checkView );
//         // let actualViewSchema = '';
//         // if ( doesObjectExistInArray(currentViews, 'Title', checkView ) ) {
//         //     foundView = true;
//         //     const vIndex : any = currentViewIndex;
//         //     actualViewSchema = currentViews[parseInt(vIndex,10)].ListViewXml;

//         // } else {
//         //     foundView = false;
//         //     const err = `The ${myList.title} list does not have this view yet:  ${checkView}`;
//         //     // statusLog = notify(statusLog, v,  'Checked View', 'create', err, null);
//         //     createProgressObject( true, false, 'E', iV, nV , 'darkgray', 'CalculatorSubtract', v.Title, 'Checked VIEWS', 'Checked' , `Checking`, err, );
//         //     // statusLog = addMyProgress( statusLog, false, 'E', iV, nV , 'darkgray', 'CalculatorSubtract', v.Title, 'Checked VIEWS', 'Checked' , `Checking` , setProgress, `Add view ~ 198 ${err}` );
//         // }


//     /***
//      *    db    db d888888b d88888b db   d8b   db      d88888b d888888b d88888b db      d8888b. .d8888. 
//      *    88    88   `88'   88'     88   I8I   88      88'       `88'   88'     88      88  `8D 88'  YP 
//      *    Y8    8P    88    88ooooo 88   I8I   88      88ooo      88    88ooooo 88      88   88 `8bo.   
//      *    `8b  d8'    88    88~~~~~ Y8   I8I   88      88~~~      88    88~~~~~ 88      88   88   `Y8b. 
//      *     `8bd8'    .88.   88.     `8b d8'8b d8'      88        .88.   88.     88booo. 88  .8D db   8D 
//      *       YP    Y888888P Y88888P  `8b8' `8d8'       YP      Y888888P Y88888P Y88888P Y8888D' `8888Y' 
//      *                                                                                                  
//      *                                                                                                  
//      */

//     v = addViewFieldSchemaString( v );
//     //console.log('addTheseViews', viewFieldsSchema, viewFieldsSchemaString);


// /***
//  *     d888b  d8888b.  .d88b.  db    db d8888b.      d8888b. db    db 
//  *    88' Y8b 88  `8D .8P  Y8. 88    88 88  `8D      88  `8D `8b  d8' 
//  *    88      88oobY' 88    88 88    88 88oodD'      88oooY'  `8bd8'  
//  *    88  ooo 88`8b   88    88 88    88 88~~~        88~~~b.    88    
//  *    88. ~8~ 88 `88. `8b  d8' 88b  d88 88           88   8D    88    
//  *     Y888P  88   YD  `Y88P'  ~Y8888P' 88           Y8888P'    YP    
//  *                                                                    
//  *                                                                    
//  */
//         /**
//          * Build view Query schema:  <GroupBy Stuff="Here"><OrderBy></OrderBy><Where></Where>
//          */

//         [ v, statusLog ] = addViewGroupXMLString( v, iV, nV, statusLog, setProgress );
//         // if (v.groups != null) {
//         //     if ( v.groups.fields.length > 2) {
//         //         const err = 'You are trying to GroupBy more than 2 fields!: ' + v.groups.fields.length;
//         //         alert( err );
//         //         // setProgress(false, "E", iV, nV , 'darkred', 'ErrorBadge', v.Title, 'GroupBy error: ' + myList.title, 'View ' + iV + ' of ' + nV + ' : ' + v.Title, 'Add view ~ 264' );
//         //         statusLog = addMyProgress( statusLog, false, 'E', iV, nV , 'darkred', 'ErrorBadge', v.Title, `> 2 GroupBy Fields`, 'Checking' , `Error` , setProgress, `Add view ~ 198 ${err}` );

//         //     } else if (v.groups.fields != null && v.groups.fields.length > 0 ) {
//         //         if (v.groups.collapse === true ) { viewGroupByXML += ' Collapse="TRUE"'; }
//         //         if (v.groups.collapse === false ) { viewGroupByXML += ' Collapse="FALSE"'; }
//         //         if (v.groups.limit != null ) { viewGroupByXML += ' GroupLimit="' + v.groups.limit + '"'; }

//         //         viewGroupByXML = '<GroupBy' + viewGroupByXML + '>';

//         //         viewGroupByXML += v.groups.fields.map( thisField => {
//         //             return buildFieldOrderTag(thisField);
//         //         }).join('');

//         //         viewGroupByXML += '</GroupBy>';
//         //         //console.log('<OrderBy><FieldRef Name="Modified" Ascending="False" /></OrderBy>');
//         //         //console.log('viewGroupByXML', viewGroupByXML);
//         //     }
//         // }


//     /***
//      *     .d88b.  d8888b. d8888b. d88888b d8888b.      d8888b. db    db 
//      *    .8P  Y8. 88  `8D 88  `8D 88'     88  `8D      88  `8D `8b  d8' 
//      *    88    88 88oobY' 88   88 88ooooo 88oobY'      88oooY'  `8bd8'  
//      *    88    88 88`8b   88   88 88~~~~~ 88`8b        88~~~b.    88    
//      *    `8b  d8' 88 `88. 88  .8D 88.     88 `88.      88   8D    88    
//      *     `Y88P'  88   YD Y8888D' Y88888P 88   YD      Y8888P'    YP    
//      *                                                                   
//      *                                                                   
//      */

//     // eslint-disable-next-line prefer-const
//     [ v, statusLog ] = addViewOrderByXMLString( v, iV, nV, statusLog, setProgress );

//         // let viewOrderByXML = '';
//         // if (v.orders != null) {
//         //     if ( v.orders.length > 2 ) {
//         //         const err = 'You are trying to OrderBy more than 2 fields!: ' + v.groups.fields.length;
//         //         alert( err );
//         //         // alert('You are trying to OrderBy more than 2 fields!: ' + v.groups.fields.length);
//         //         // setProgress(false, "E", iV, nV , 'darkred', 'ErrorBadge', v.Title, '2 Order Fields: ' + myList.title, 'View ' + iV + ' of ' + nV + ' : ' + v.Title, 'Add view ~ 299' );

//         //         statusLog = addMyProgress( statusLog, false, 'E', iV, nV , 'darkred', 'ErrorBadge', v.Title, `> 2 Order Fields`, 'Checking' , `Error` , setProgress, `Add view ~ 299 ${err}` );
//         //     } else if ( v.orders.length === 0 ) {
//         //         const err = 'You have view.orders object with no fields to order by!';
//         //         alert( err );

//         //         // alert('You have view.orders object with no fields to order by!');
//         //         // setProgress(false, "E", iV, nV , 'darkred', 'ErrorBadge', v.Title, 'No Order Fields: ' + myList.title, 'View ' + iV + ' of ' + nV + ' : ' + v.Title, 'Add view ~ 303' );

//         //         statusLog = addMyProgress( statusLog, false, 'E', iV, nV , 'darkred', 'ErrorBadge', v.Title, `No Order Fields`, 'Checking' , `Error` , setProgress, `Add view ~ 303 ${err}` );

//         //     } else {

//         //         viewOrderByXML += v.orders.map( thisField => {
//         //             return buildFieldOrderTag(thisField);
//         //         }).join('');
//         //     }

//         // }


// /***
//  *    db   d8b   db db   db d88888b d8888b. d88888b 
//  *    88   I8I   88 88   88 88'     88  `8D 88'     
//  *    88   I8I   88 88ooo88 88ooooo 88oobY' 88ooooo 
//  *    Y8   I8I   88 88~~~88 88~~~~~ 88`8b   88~~~~~ 
//  *    `8b d8'8b d8' 88   88 88.     88 `88. 88.     
//  *     `8b8' `8d8'  YP   YP Y88888P 88   YD Y88888P 
//  *                                                  
//  *                                                  
//  */

//         [ v, statusLog ] = addViewWhereXMLString( v, iV, nV, statusLog, setProgress );
//         // if ( v.wheres != null && v.wheres.length > 0 ) {

//         //     //Get array of where items
//         //     const viewWhereArray = v.wheres.map( thisWhere => {
//         //         return buildFieldWhereTag(thisWhere);

//         //     });
//         //     //console.log('viewWhereArray', viewWhereArray);

//         //     //Go through each item and add the <Or> or <And> Tags around them
//         //     let hasPreviousAnd = false;
//         //     let previousAnd = '';

//         //     // for (let i in viewWhereArray ) {

//         //     viewWhereArray.map ( ( where, i ) => {

//         //       const thisClause = i === 0 ? '' : v.wheres[i].clause;
//         //       const thisFieldWhere = viewWhereArray[i];

//         //       if ( viewWhereArray.length === 0 ) {
//         //           //You need to have something in here for it to work.
//         //           const err = `Field was skipped because there wasn't a valid 'Where' : ' ${v.wheres[i].field}`;
//         //           alert( err );
//         //           // alert('Field was skipped because there wasn\'t a valid \'Where\' : ' + v.wheres[i].field );
//         //           // setProgress(false, "E", iV, nV , 'darkred', 'ErrorBadge', v.Title, 'Invalid Where: ' + myList.title, 'View ' + iV + ' of ' + nV + ' : ' + v.Title, 'Add view ~ 347' );
//         //           statusLog = addMyProgress( statusLog, false, 'E', iV, nV , 'darkred', 'ErrorBadge', v.Title, `Invalid Where`, 'Checking' , `Error` , setProgress, `Add view ~ 347 ${err}` );

//         //       } else if ( viewWhereArray.length === 1 ) {
//         //           viewWhereXML = thisFieldWhere;

//         //       } else if ( hasPreviousAnd === true && thisClause === 'Or' ) {
//         //           //In UI, you can't have an OR after an AND... , it works but will not work editing the view through UI then.
//         //           const err = `Can't do 'Or' clause because for ${ thisFieldWhere } because there was already an 'And' clause here:  ${previousAnd}`;
//         //           alert( err );
//         //           // alert('Can\'t do \'Or\' clause because for ' + thisFieldWhere + ' because there was already an \'And\' clause here:  ' + previousAnd);
//         //           // setProgress(false, "E", iV, nV , 'darkred', 'ErrorBadge', v.Title, 'Can\'t do Or after And: ' + myList.title, 'View ' + iV + ' of ' + nV + ' : ' + v.Title, 'Add view ~ 355' );
//         //           statusLog = addMyProgress( statusLog, false, 'E', iV, nV , 'darkred', 'ErrorBadge', v.Title, `Can't do Or after And`, 'Checking' , `Error` , setProgress, `Add view ~ 355 ${err}` );
//         //       } else {
//         //           //console.log( 'thisClause, thisFieldWhere', thisClause, thisFieldWhere );
//         //           // '<' + thisOper.q + '>'

//         //           if ( thisClause != '' && thisFieldWhere != '' ){ //Valid clause found... wrap entire string in it
//         //               if ( viewWhereXML != ''){
//         //                   viewWhereXML = viewWhereXML + thisFieldWhere;  //Add new field to previous string;
//         //                   viewWhereXML = '<' + thisClause + '>' + viewWhereXML + '</' + thisClause + '>';
                          
//         //               } else {
//         //                   const err = `Can't wrap this in clause because there is not any existing field to compare to ${thisFieldWhere}`;
//         //                   alert( err );
//         //                   // alert('Can\'t wrap this in clause because there is not any existing field to compare to ' + thisFieldWhere );
//         //                   // setProgress(false, "E", iV, nV , 'darkred', 'ErrorBadge', v.Title, 'Can\'t Compare field: ' + myList.title, 'View ' + iV + ' of ' + nV + ' : ' + v.Title, 'Add view ~ 368' );
//         //                   statusLog = addMyProgress( statusLog, false, 'E', iV, nV , 'darkred', 'ErrorBadge', v.Title, `Can't Compare field`, 'Checking' , `Error` , setProgress, `Add view ~ 368 ${err}` );
//         //                   viewWhereXML = viewWhereXML + thisFieldWhere;  //Add new field to previous string;
//         //               }

//         //               //2021-06-11:  added where viewWhereArray.length === 3 for more complex views where there were 2 or's before the and
//         //           } else if ( i === 0 && thisFieldWhere != '' && ( viewWhereArray.length === 2 || viewWhereArray.length === 3) ) {
//         //               //Had to add this while testing TMTView:  VerifyNoStoryOrChapterView
//         //               viewWhereXML = thisFieldWhere;

//         //           }
//         //       }

//         //       if ( thisClause === 'And') { hasPreviousAnd = true ; previousAnd = thisFieldWhere; }
//         //     })

              

//         //     // }
//         // }


// /***
//  *          .o88b.  .d88b.  .88b  d88. d8888b.  .d8b.  d8888b. d88888b 
//  *         d8P  Y8 .8P  Y8. 88'YbdP`88 88  `8D d8' `8b 88  `8D 88'     
//  *         8P      88    88 88  88  88 88oodD' 88ooo88 88oobY' 88ooooo 
//  *         8b      88    88 88  88  88 88~~~   88~~~88 88`8b   88~~~~~ 
//  *         Y8b  d8 `8b  d8' 88  88  88 88      88   88 88 `88. 88.     
//  *          `Y88P'  `Y88P'  YP  YP  YP 88      YP   YP 88   YD Y88888P 
//  *                                                                     
//  *                                                                     
//  */

//         // const actualWhere = getXMLObjectFromString( actualViewSchema, 'Where', false, true) ;
//         // const actualGroupBy = getXMLObjectFromString( actualViewSchema, 'GroupBy', false, false) ;
//         // const actualOrderBy = getXMLObjectFromString( actualViewSchema, 'OrderBy', false, true) ;
//         // const actualFields = getXMLObjectFromString( actualViewSchema, 'ViewFields',false, true) ;

//         if ( v.foundView === true && ( readOnly === true || listExistedB4 === true ) ) {  //Only compare if in read only because if not, it will just over-write, exception is first list which should be the default one.
//           [ v, statusLog ] = addViewCompareErrorStr( v, iV, nV, statusLog, setProgress );

//             // if ( viewWhereXML !== actualWhere) {
//             //     errMess += '\n\nCurrent Where:\n' + actualWhere + '\n\nExpected Where:\n' + viewWhereXML;
//             //  }

//             // if ( viewGroupByXML !== actualGroupBy) {
//             //     errMess += '\n\nCurrent GroupBy:\n' + actualGroupBy + '\n\nExpected GroupBy:\n' + viewGroupByXML;
//             // }
    
//             // if ( viewOrderByXML !== actualOrderBy) {
//             //     errMess += '\n\nCurrent OrderBy:\n' + actualOrderBy + '\n\nExpected OrderBy:\n' + viewOrderByXML;
//             // } 

//             // if ( viewFieldsSchemaString !== actualFields) {
//             //     errMess += '\n\nCurrent Fields:\n' + actualFields + '\n\nExpected Fields:\n' + viewFieldsSchemaString;
//             // }

//             // if ( errMess === '' ) {
//             //     // setProgress(false, "V", iV, nV , 'darkgreen', 'CheckMark', v.Title, 'Checked Fields: ' + myList.title, 'View ' + iV + ' of ' + nV + ' : ' + v.Title, 'Compare View ~ 429' );
//             //     statusLog = addMyProgress( statusLog, false, 'View', iV, nV , 'darkgreen', 'CheckMark', v.Title, `Checked Fields`, 'Checking' , `Finished` , setProgress, `Add view ~ 429 ` );
//             // } else {
//             //     // setProgress(false, "E", iV, nV , 'darkorange', 'Warning12', v.Title, 'Unexpected Fields: ' + myList.title, 'View ' + iV + ' of ' + nV + ' : ' + v.Title, 'Compare View ~ 431' + errMess);
//             //     statusLog = addMyProgress( statusLog, false, 'E', iV, nV , 'darkorange', 'Warning12', v.Title, `Unexpected Fields`, 'Checking' , `Error` , setProgress, `Add view ~ 431 ${errMess}` );
//             // }

//         }


// /***
//  *    .d8888.  .o88b. db   db d88888b .88b  d88.  .d8b.                                      
//  *    88'  YP d8P  Y8 88   88 88'     88'YbdP`88 d8' `8b        db          db          db   
//  *    `8bo.   8P      88ooo88 88ooooo 88  88  88 88ooo88        88          88          88   
//  *      `Y8b. 8b      88~~~88 88~~~~~ 88  88  88 88~~~88      C8888D      C8888D      C8888D 
//  *    db   8D Y8b  d8 88   88 88.     88  88  88 88   88        88          88          88   
//  *    `8888Y'  `Y88P' YP   YP Y88888P YP  YP  YP YP   YP        VP          VP          VP   
//  *                                                                                           
//  *                                                                                           
//  */

//         /**
//          * Combine all schema elements together
//          */

//         let viewQueryXML = '';
//         if (v.viewWhereXML != '') { viewQueryXML += '<Where>' + v.viewWhereXML + '</Where>';}
//         if (v.viewGroupByXML != '') { viewQueryXML += '' + v.viewGroupByXML + '';} //Tags included in initial build because of special props.
//         if (v.viewOrderByXML != '') { viewQueryXML += '<OrderBy>' + v.viewOrderByXML + '</OrderBy>';}


//     /***
//      *     .o88b. d8888b. d88888b  .d8b.  d888888b d88888b      db    db d888888b d88888b db   d8b   db 
//      *    d8P  Y8 88  `8D 88'     d8' `8b `~~88~~' 88'          88    88   `88'   88'     88   I8I   88 
//      *    8P      88oobY' 88ooooo 88ooo88    88    88ooooo      Y8    8P    88    88ooooo 88   I8I   88 
//      *    8b      88`8b   88~~~~~ 88~~~88    88    88~~~~~      `8b  d8'    88    88~~~~~ Y8   I8I   88 
//      *    Y8b  d8 88 `88. 88.     88   88    88    88.           `8bd8'    .88.   88.     `8b d8'8b d8' 
//      *     `Y88P' 88   YD Y88888P YP   YP    YP    Y88888P         YP    Y888888P Y88888P  `8b8' `8d8'  
//      *                                                                                                  
//      *                                                                                                  
//      */
//     let errMess = v.errMess;

//         if ( v.foundView === false ) {

//             /**
//              * Available options:  https://github.com/koltyakov/sp-metadata/blob/baf1162394caba1222947f223ed78c76b4a72255/docs/SP/EntityTypes/View.md
//              */

//             if ( readOnly === false ) {

//                 try {
//                     //console.log('BEFORE CREATE VIEW:  viewQueryXML', viewQueryXML);
//                     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//                     const createViewProps: any = { 
//                         RowLimit: v.RowLimit == null ? 30 : v.RowLimit,
//                         TabularView: v.TabularView !== false ? true : false,
//                     };
    
//                     if ( viewQueryXML != '' ) { createViewProps.ViewQuery = viewQueryXML; }
    
//                     //createViewProps["ViewQuery"] = "<OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy>";
//                     const result = await listViews.add(v.Title, false, createViewProps );
    
//                     // statusLog = notify(statusLog, v, 'Creating View', 'Create', null, null);
//                     createProgressObject( true, false, 'View', iV, nV , 'darkgreen', 'CheckMark', v.Title, `Creating View`, 'Create' , `Success`, `Add view ~ 529 `, );
//                     // statusLog = addMyProgress( statusLog, false, 'View', iV, nV , 'darkgreen', 'CheckMark', v.Title, `Creating View`, 'Create' , `Success` , setProgress, `Add view ~ 529 ` );

//                     let viewXML = result.data.ListViewXml;
    
//                     const ViewFieldsXML = getXMLObjectFromString(viewXML,'ViewFields',false, true);
//                     //console.log('ViewFieldsXML', ViewFieldsXML);
//                     viewXML = viewXML.replace(ViewFieldsXML,v.viewFieldsSchemaString);
    
//                     await result.view.setViewXml(viewXML);
//                     // setProgress(false, "V", iV, nV , 'darkgreen', 'CheckMark', v.Title, 'Updated Schema: ' + myList.title, 'View ' + iV + ' of ' + nV + ' : ' + v.Title, 'Updated View ~ 498' );
//                     statusLog = addMyProgress( statusLog, false, 'View', iV, nV , 'darkgreen', 'CheckMark', v.Title, `setViewXml`, 'Checking' , `Finished` , setProgress, `Add view ~ 498 ` );

//                 } catch (e) {
//                     // if any of the fields does not exist, raise an exception in the console log
//                     const errOutput = getHelpfullErrorV2(e, true, true, [ BaseErrorTrace , 'Failed', 'get Views ~ 513', helpfulErrorEnd ].join('|'));
//                     if (errOutput.friendly.indexOf('missing a column') > -1) {
//                         const err = `The ${myList.title} list does not have this column yet:  ${v.Title}`;
//                         // alert( err ); // This alert was not in original code
//                         // statusLog = notify(statusLog,  v, 'Creating View', 'Create',err, null);
//                         // setProgress(false, "E", iV, nV , 'darkread', 'Warning12', v.Title, 'Field does not exist: ' + myList.title, 'View ' + iV + ' of ' + nV + ' : ' + v.Title, 'Add view ~ 453' );
//                         statusLog = addMyProgress( statusLog, false, 'E', iV, nV , 'darkread', 'Warning12', v.Title, `Field does not exist`, 'Checking' , `Error` , setProgress, `Add view ~ 453 ${err}` );
//                     } else {
//                         const err = `The ${myList.title} list had this error so the webpart may not work correctly unless fixed:  `;
//                         // alert( err ); // This alert was not in original code
//                         // statusLog = notify(statusLog, v, 'Creating View', 'Create', err, null);
//                         // setProgress(false, "E", iV, nV , 'darkread', 'Warning12', v.Title, 'Unknown error: ' + myList.title, 'View ' + iV + ' of ' + nV + ' : ' + v.Title, 'Add view ~ 457' );
//                         statusLog = addMyProgress( statusLog, false, 'E', iV, nV , 'darkread', 'Warning12', v.Title, `Unknown error`, 'Creating View' , `Error` , setProgress, `Add view ~ 457 ${err}` );
//                     }
//                 }
    
//                 /**
//                  * Add response, comments, alerts
//                  */
//             }
//         } else {
//             //List existed before.... do update?

//             let updateList = false;
//             if ( readOnly === false && listExistedB4 === true && errMess !== '' ) { updateList = true; }
//             else if ( listExistedB4 === false && errMess !== '' && iV === 1 ) { updateList = true; }  //This should be default view... update it if needed         
//             else if ( listExistedB4 === false && errMess === '' && iV === 1 ) { updateList = true; }  //This should be default view... but it did find some 'errors' which are really just checks.         

//             if ( updateList ) {

//                 try {
//                     // Get old schema = actualViewSchema
//                     let newViewXML = v.actualViewSchema;
//                     const actualViewFieldsXML = getXMLObjectFromString(v.actualViewSchema,'ViewFields',false, true);
//                     const actualQueryXML = getXMLObjectFromString(v.actualViewSchema,'Query',false, true);


//                     /**
//                      * 2021-06-14:
//                      * This section of if/then was added to address: https://github.com/mikezimm/generic-solution/issues/101
//                      * Issue was that if there was an empty query <Query /> it was replacing the text before that string due to bug.
//                      * Now it should get the correct actualQueryXML and then handle it depending on what is required.
//                      */
//                     if ( actualQueryXML === "" && newViewXML.indexOf('<Query />' ) > -1 && viewQueryXML.length > 0 ) {
//                         //Current = empty and has a value to replace
//                         newViewXML = newViewXML.replace('<Query />', viewQueryXML);

//                     } else if ( actualQueryXML === "" && newViewXML.indexOf('<Query />' ) > -1 && viewQueryXML.length === 0 ) {
//                         //Current = empty and new xml is also empty so do not make a change

//                     } else if ( viewQueryXML.length === 0 && actualQueryXML.length > 0 ) {
//                         //Current = has value and new xml is empty so we need to replace with single tag
//                         newViewXML = newViewXML.replace(actualQueryXML, '').replace('<Query></Query>','<Query />');

//                     } else {
//                         //There is an old Query paramter and a new Query paramter to replace it with
//                         newViewXML = newViewXML.replace(actualQueryXML, viewQueryXML);

//                     }

//                     newViewXML = newViewXML.replace(actualViewFieldsXML,v.viewFieldsSchemaString);

//                     //Update view schema
//                     await listViews.getByTitle(v.Title).setViewXml(newViewXML);
//                     // setProgress(false, "V", iV, nV , 'darkgreen', 'CheckMark', v.Title, 'Updated View: ' + myList.title, 'View ' + iV + ' of ' + nV + ' : ' + v.Title, 'Update view ~ 533' + errMess );
//                     statusLog = addMyProgress( statusLog, false, 'View', iV, nV , 'darkgreen', 'CheckMark', v.Title, ``, 'Updated View' , `Finished` , setProgress, `Update view ~ 533 ${errMess}` );

//                 } catch (e) {
//                   const errOutput = getHelpfullErrorV2(e, true, true, [ BaseErrorTrace , 'Failed', 'get List Views2 ~ 575', helpfulErrorEnd ].join('|'));
//                     if (errOutput.friendly.indexOf('missing a column') > -1) {
//                         const err = `The ${myList.title} list does not have this column yet:  ${v.Title}`;
//                         // statusLog = notify(statusLog,  v, 'Updating View', 'Create',err, null);
//                         // setProgress(false, "E", iV, nV , 'darkread', 'Warning12', v.Title, 'Field does not exist: ' + myList.title, 'View ' + iV + ' of ' + nV + ' : ' + v.Title, 'Update view ~ 539' );
//                         statusLog = addMyProgress( statusLog, false, 'E', iV, nV , 'darkread', 'Warning12', v.Title, `Updated View`, 'setViewXml' , `Field does not exist` , setProgress, `Update view ~ 539 ${err}` );
//                     } else {
//                         const err = `The ${myList.title} list had this error so the webpart may not work correctly unless fixed:  `;
//                         // statusLog = notify(statusLog, v, 'Updating View', 'Create', err, null);
//                         // setProgress(false, "E", iV, nV , 'darkread', 'Warning12', v.Title, 'Unknown error: ' + myList.title, 'View ' + iV + ' of ' + nV + ' : ' + v.Title, 'Update view ~ 543' );
//                         statusLog = addMyProgress( statusLog, false, 'E', iV, nV , 'darkread', 'Warning12', v.Title, `Updated View`, 'setViewXml' , `Error` , setProgress, `Update view ~ 543 ${err}` );
//                     }
//                 }

//             }

//         } //END:  Found === false

//     }  //END: for (let f of fieldsToAdd) {
//     //alert('Added views to list:' );
//     //console.log('addTheseViews', statusLog);
//     return(statusLog);

// }