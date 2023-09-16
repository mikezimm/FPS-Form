

import { IMyListInfo, } from '@mikezimm/fps-library-v2/lib/components/molecules/Provisioning/interfaces/listTypes';
import { IViews, } from "@pnp/sp/views/types";

import { getHelpfullErrorV2 } from '@mikezimm/fps-library-v2/lib/logic/Errors/friendly';
import { BaseErrorTrace } from '@mikezimm/fps-library-v2/lib/PackageConst';  //, [ BaseErrorTrace , 'Failed', 'try switchType ~ 324', helpfulErrorEnd ].join('|')   let helpfulErrorEnd = [ myList.title, f.name, i, n ].join('|');

import { IMyView , } from '@mikezimm/fps-library-v2/lib/components/molecules/Provisioning/interfaces/viewTypes';

import { getXMLObjectFromString } from '@mikezimm/fps-library-v2/lib/components/atoms/XML/xmlStrings';

import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/fields";
import "@pnp/sp/views";
import "@pnp/sp/fields/list";


import { IMyProgress } from "@mikezimm/fps-library-v2/lib/common/interfaces/fps/IMyInterfaces";
import { addMyProgress, createProgressObject } from "../addMyProgress";
import { addViewCompareErrorStr } from './helpers/addViewCompareErrorStr';
import { addViewWhereXMLString } from './helpers/addViewWhereXMLString';
import { addViewOrderByXMLString } from './helpers/addViewOrderByXMLString';
import { addViewGroupXMLString } from './helpers/addViewGroupXMLString';
import { addViewFieldSchemaString } from './helpers/addViewFieldSchemaString';
import { updateViewExists } from './helpers/updateViewExists';

/***
 *    d88888b db    db d8b   db  .o88b. d888888b d888888b  .d88b.  d8b   db 
 *    88'     88    88 888o  88 d8P  Y8 `~~88~~'   `88'   .8P  Y8. 888o  88 
 *    88ooo   88    88 88V8o 88 8P         88       88    88    88 88V8o 88 
 *    88~~~   88    88 88 V8o88 8b         88       88    88    88 88 V8o88 
 *    88      88b  d88 88  V888 Y8b  d8    88      .88.   `8b  d8' 88  V888 
 *    YP      ~Y8888P' VP   V8P  `Y88P'    YP    Y888888P  `Y88P'  VP   V8P 
 *                                                                          
 *                                                                          
 */

//private async ensureTrackTimeList(myListName: string, myListDesc: string, ProjectOrTime: string): Promise<boolean> {

export async function addTheseViews( listExistedB4 : boolean, readOnly: boolean, myList: IMyListInfo, listViews: IViews, currentViews: any[], viewsToAdd: IMyView[], setProgress : (progress : IMyProgress[]) => void, alertMe: boolean, consoleLog: boolean, skipTry = false): Promise<IMyProgress[]>{

    let statusLog : IMyProgress[] = [];
    const listTitle= myList.title;
    /**
     * listViews just gets the current list's view fetch handler which is used to actually add views to the list.
     * currentViews should show the actual views on the list prior to getting to this point. 
     * 
     * 2023-09-08:  I think this is now redundat after fixing some of the interface issues in the provisioning function
     */

    // let listViews = null;

    // if (readOnly === false ) {
    //     if ( ensuredList.list === undefined ) {
    //         listViews = ensuredList.views;
    //     } else {
    //         listViews = ensuredList.list.views;
    //     }
    // } else { 
    //     listViews = ensuredList.views;
    // }

    // setProgress(false, "V", 0, 0 , '', 'TimePicker', myList.title, 'Adding VIEWS to list: ' + myList.title, 'Checking for VIEWS', 'Add view ~ 194'  );
    statusLog = addMyProgress( statusLog, false, 'View', 0, 0 , '', 'TimePicker', listTitle, 'Adding VIEWS to list', 'Add' , `Starting` , setProgress, `Add view ~ 194` );

    //let returnArray: [] = [];

    let iV = 0;
    const nV = viewsToAdd.length;

    for (let v of viewsToAdd) {
        iV++;
        const helpfulErrorEnd = [ myList.title, v.Title,iV, nV ].join('|');
        // setProgress(false, "V", iV, nV , 'darkgray', 'CalculatorSubtract', v.Title, 'Adding views to list: ' + myList.title, 'View ' + iV + ' of ' + nV + ' : ' + v.Title, 'Add view ~ 198' );
        statusLog = addMyProgress( statusLog, false, 'View', iV, nV , 'darkgray', 'CalculatorSubtract', v.Title, 'Adding VIEWS to list', 'Add' , `Starting` , setProgress, `Add view ~ 198` );

        v = updateViewExists( myList, v, iV, nV, currentViews );
        v = addViewFieldSchemaString( v );
        [ v, statusLog ] = addViewGroupXMLString( v, iV, nV, statusLog, setProgress );
        [ v, statusLog ] = addViewOrderByXMLString( v, iV, nV, statusLog, setProgress );
        [ v, statusLog ] = addViewWhereXMLString( v, iV, nV, statusLog, setProgress );
 
        if ( v.foundView === true && ( readOnly === true || listExistedB4 === true ) ) {  //Only compare if in read only because if not, it will just over-write, exception is first list which should be the default one.
          [ v, statusLog ] = addViewCompareErrorStr( v, iV, nV, statusLog, setProgress );
        }


/***
 *    .d8888.  .o88b. db   db d88888b .88b  d88.  .d8b.                                      
 *    88'  YP d8P  Y8 88   88 88'     88'YbdP`88 d8' `8b        db          db          db   
 *    `8bo.   8P      88ooo88 88ooooo 88  88  88 88ooo88        88          88          88   
 *      `Y8b. 8b      88~~~88 88~~~~~ 88  88  88 88~~~88      C8888D      C8888D      C8888D 
 *    db   8D Y8b  d8 88   88 88.     88  88  88 88   88        88          88          88   
 *    `8888Y'  `Y88P' YP   YP Y88888P YP  YP  YP YP   YP        VP          VP          VP   
 *                                                                                           
 *                                                                                           
 */

        /**
         * Combine all schema elements together
         */

        let viewQueryXML = '';
        if (v.viewWhereXML != '') { viewQueryXML += '<Where>' + v.viewWhereXML + '</Where>';}
        if (v.viewGroupByXML != '') { viewQueryXML += '' + v.viewGroupByXML + '';} //Tags included in initial build because of special props.
        if (v.viewOrderByXML != '') { viewQueryXML += '<OrderBy>' + v.viewOrderByXML + '</OrderBy>';}


    /***
     *     .o88b. d8888b. d88888b  .d8b.  d888888b d88888b      db    db d888888b d88888b db   d8b   db 
     *    d8P  Y8 88  `8D 88'     d8' `8b `~~88~~' 88'          88    88   `88'   88'     88   I8I   88 
     *    8P      88oobY' 88ooooo 88ooo88    88    88ooooo      Y8    8P    88    88ooooo 88   I8I   88 
     *    8b      88`8b   88~~~~~ 88~~~88    88    88~~~~~      `8b  d8'    88    88~~~~~ Y8   I8I   88 
     *    Y8b  d8 88 `88. 88.     88   88    88    88.           `8bd8'    .88.   88.     `8b d8'8b d8' 
     *     `Y88P' 88   YD Y88888P YP   YP    YP    Y88888P         YP    Y888888P Y88888P  `8b8' `8d8'  
     *                                                                                                  
     *                                                                                                  
     */
    const errMess = v.errMess;

        if ( v.foundView === false ) {

            /**
             * Available options:  https://github.com/koltyakov/sp-metadata/blob/baf1162394caba1222947f223ed78c76b4a72255/docs/SP/EntityTypes/View.md
             */

            if ( readOnly === false ) {

                try {
                    //console.log('BEFORE CREATE VIEW:  viewQueryXML', viewQueryXML);
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const createViewProps: any = { 
                        RowLimit: v.RowLimit == null ? 30 : v.RowLimit,
                        TabularView: v.TabularView !== false ? true : false,
                    };
    
                    if ( viewQueryXML != '' ) { createViewProps.ViewQuery = viewQueryXML; }
    
                    //createViewProps["ViewQuery"] = "<OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy>";
                    const result = await listViews.add(v.Title, false, createViewProps );
    
                    // statusLog = notify(statusLog, v, 'Creating View', 'Create', null, null);
                    createProgressObject( true, false, 'View', iV, nV , 'darkgreen', 'CheckMark', v.Title, `Creating View`, 'Create' , `Success`, `Add view ~ 529 `, );
                    // statusLog = addMyProgress( statusLog, false, 'View', iV, nV , 'darkgreen', 'CheckMark', v.Title, `Creating View`, 'Create' , `Success` , setProgress, `Add view ~ 529 ` );

                    let viewXML = result.data.ListViewXml;
    
                    const ViewFieldsXML = getXMLObjectFromString(viewXML,'ViewFields',false, true);
                    //console.log('ViewFieldsXML', ViewFieldsXML);
                    viewXML = viewXML.replace(ViewFieldsXML,v.viewFieldsSchemaString);
    
                    await result.view.setViewXml(viewXML);
                    // setProgress(false, "V", iV, nV , 'darkgreen', 'CheckMark', v.Title, 'Updated Schema: ' + myList.title, 'View ' + iV + ' of ' + nV + ' : ' + v.Title, 'Updated View ~ 498' );
                    statusLog = addMyProgress( statusLog, false, 'View', iV, nV , 'darkgreen', 'CheckMark', v.Title, `setViewXml`, 'Checking' , `Finished` , setProgress, `Add view ~ 498 ` );

                } catch (e) {
                    // if any of the fields does not exist, raise an exception in the console log
                    const errOutput = getHelpfullErrorV2(e, true, true, [ BaseErrorTrace , 'Failed', 'get Views ~ 513', helpfulErrorEnd ].join('|'));
                    if (errOutput.friendly.indexOf('missing a column') > -1) {
                        const err = `The ${myList.title} list does not have this column yet:  ${v.Title}`;
                        // alert( err ); // This alert was not in original code
                        // statusLog = notify(statusLog,  v, 'Creating View', 'Create',err, null);
                        // setProgress(false, "E", iV, nV , 'darkread', 'Warning12', v.Title, 'Field does not exist: ' + myList.title, 'View ' + iV + ' of ' + nV + ' : ' + v.Title, 'Add view ~ 453' );
                        statusLog = addMyProgress( statusLog, false, 'E', iV, nV , 'darkread', 'Warning12', v.Title, `Field does not exist`, 'Checking' , `Error` , setProgress, `Add view ~ 453 ${err}` );
                    } else {
                        const err = `The ${myList.title} list had this error so the webpart may not work correctly unless fixed:  `;
                        // alert( err ); // This alert was not in original code
                        // statusLog = notify(statusLog, v, 'Creating View', 'Create', err, null);
                        // setProgress(false, "E", iV, nV , 'darkread', 'Warning12', v.Title, 'Unknown error: ' + myList.title, 'View ' + iV + ' of ' + nV + ' : ' + v.Title, 'Add view ~ 457' );
                        statusLog = addMyProgress( statusLog, false, 'E', iV, nV , 'darkread', 'Warning12', v.Title, `Unknown error`, 'Creating View' , `Error` , setProgress, `Add view ~ 457 ${err}` );
                    }
                }
            }
        } else {
            //List existed before.... do update?

            let updateList = false;
            if ( readOnly === false && listExistedB4 === true && errMess !== '' ) { updateList = true; }
            else if ( listExistedB4 === false && errMess !== '' && iV === 1 ) { updateList = true; }  //This should be default view... update it if needed         
            else if ( listExistedB4 === false && errMess === '' && iV === 1 ) { updateList = true; }  //This should be default view... but it did find some 'errors' which are really just checks.         

            if ( updateList ) {

                try {
                    // Get old schema = actualViewSchema
                    let newViewXML = v.actualViewSchema;
                    const actualViewFieldsXML = getXMLObjectFromString(v.actualViewSchema,'ViewFields',false, true);
                    const actualQueryXML = getXMLObjectFromString(v.actualViewSchema,'Query',false, true);


                    /**
                     * 2021-06-14:
                     * This section of if/then was added to address: https://github.com/mikezimm/generic-solution/issues/101
                     * Issue was that if there was an empty query <Query /> it was replacing the text before that string due to bug.
                     * Now it should get the correct actualQueryXML and then handle it depending on what is required.
                     */
                    if ( actualQueryXML === "" && newViewXML.indexOf('<Query />' ) > -1 && viewQueryXML.length > 0 ) {
                        //Current = empty and has a value to replace
                        newViewXML = newViewXML.replace('<Query />', viewQueryXML);

                    } else if ( actualQueryXML === "" && newViewXML.indexOf('<Query />' ) > -1 && viewQueryXML.length === 0 ) {
                        //Current = empty and new xml is also empty so do not make a change

                    } else if ( viewQueryXML.length === 0 && actualQueryXML.length > 0 ) {
                        //Current = has value and new xml is empty so we need to replace with single tag
                        newViewXML = newViewXML.replace(actualQueryXML, '').replace('<Query></Query>','<Query />');

                    } else {
                        //There is an old Query paramter and a new Query paramter to replace it with
                        newViewXML = newViewXML.replace(actualQueryXML, viewQueryXML);

                    }

                    newViewXML = newViewXML.replace(actualViewFieldsXML,v.viewFieldsSchemaString);

                    //Update view schema
                    await listViews.getByTitle(v.Title).setViewXml(newViewXML);
                    // setProgress(false, "V", iV, nV , 'darkgreen', 'CheckMark', v.Title, 'Updated View: ' + myList.title, 'View ' + iV + ' of ' + nV + ' : ' + v.Title, 'Update view ~ 533' + errMess );
                    statusLog = addMyProgress( statusLog, false, 'View', iV, nV , 'darkgreen', 'CheckMark', v.Title, ``, 'Updated View' , `Finished` , setProgress, `Update view ~ 533 ${errMess}` );

                } catch (e) {
                  const errOutput = getHelpfullErrorV2(e, true, true, [ BaseErrorTrace , 'Failed', 'get List Views2 ~ 575', helpfulErrorEnd ].join('|'));
                    if (errOutput.friendly.indexOf('missing a column') > -1) {
                        const err = `The ${myList.title} list does not have this column yet:  ${v.Title}`;
                        // statusLog = notify(statusLog,  v, 'Updating View', 'Create',err, null);
                        // setProgress(false, "E", iV, nV , 'darkread', 'Warning12', v.Title, 'Field does not exist: ' + myList.title, 'View ' + iV + ' of ' + nV + ' : ' + v.Title, 'Update view ~ 539' );
                        statusLog = addMyProgress( statusLog, false, 'E', iV, nV , 'darkread', 'Warning12', v.Title, `Updated View`, 'setViewXml' , `Field does not exist` , setProgress, `Update view ~ 539 ${err}` );
                    } else {
                        const err = `The ${myList.title} list had this error so the webpart may not work correctly unless fixed:  `;
                        // statusLog = notify(statusLog, v, 'Updating View', 'Create', err, null);
                        // setProgress(false, "E", iV, nV , 'darkread', 'Warning12', v.Title, 'Unknown error: ' + myList.title, 'View ' + iV + ' of ' + nV + ' : ' + v.Title, 'Update view ~ 543' );
                        statusLog = addMyProgress( statusLog, false, 'E', iV, nV , 'darkread', 'Warning12', v.Title, `Updated View`, 'setViewXml' , `Error` , setProgress, `Update view ~ 543 ${err}` );
                    }
                }

            }

        } //END:  Found === false

    }  //END: for (let f of fieldsToAdd) {

    return(statusLog);

}