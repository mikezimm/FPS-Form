
/***
 *    d888888b .88b  d88. d8888b.  .d88b.  d8888b. d888888b       .d88b.  d88888b d88888b d888888b  .o88b. d888888b  .d8b.  db      
 *      `88'   88'YbdP`88 88  `8D .8P  Y8. 88  `8D `~~88~~'      .8P  Y8. 88'     88'       `88'   d8P  Y8   `88'   d8' `8b 88      
 *       88    88  88  88 88oodD' 88    88 88oobY'    88         88    88 88ooo   88ooo      88    8P         88    88ooo88 88      
 *       88    88  88  88 88~~~   88    88 88`8b      88         88    88 88~~~   88~~~      88    8b         88    88~~~88 88      
 *      .88.   88  88  88 88      `8b  d8' 88 `88.    88         `8b  d8' 88      88        .88.   Y8b  d8   .88.   88   88 88booo. 
 *    Y888888P YP  YP  YP 88       `Y88P'  88   YD    YP          `Y88P'  YP      YP      Y888888P  `Y88P' Y888888P YP   YP Y88888P 
 *                                                                                                                                  
 *                                                                                                                                  
 */
import { IWeb, Web } from "@pnp/sp/webs/types";
import { IField, } from "@pnp/sp/fields/types";
import { IViews, } from "@pnp/sp/views/types";
import { IListEnsureResult, IList } from "@pnp/sp/lists/types";

/***
 *    d888888b .88b  d88. d8888b.  .d88b.  d8888b. d888888b      d8b   db d8888b. .88b  d88.      d88888b db    db d8b   db  .o88b. d888888b d888888b  .d88b.  d8b   db .d8888. 
 *      `88'   88'YbdP`88 88  `8D .8P  Y8. 88  `8D `~~88~~'      888o  88 88  `8D 88'YbdP`88      88'     88    88 888o  88 d8P  Y8 `~~88~~'   `88'   .8P  Y8. 888o  88 88'  YP 
 *       88    88  88  88 88oodD' 88    88 88oobY'    88         88V8o 88 88oodD' 88  88  88      88ooo   88    88 88V8o 88 8P         88       88    88    88 88V8o 88 `8bo.   
 *       88    88  88  88 88~~~   88    88 88`8b      88         88 V8o88 88~~~   88  88  88      88~~~   88    88 88 V8o88 8b         88       88    88    88 88 V8o88   `Y8b. 
 *      .88.   88  88  88 88      `8b  d8' 88 `88.    88         88  V888 88      88  88  88      88      88b  d88 88  V888 Y8b  d8    88      .88.   `8b  d8' 88  V888 db   8D 
 *    Y888888P YP  YP  YP 88       `Y88P'  88   YD    YP         VP   V8P 88      YP  YP  YP      YP      ~Y8888P' VP   V8P  `Y88P'    YP    Y888888P  `Y88P'  VP   V8P `8888Y' 
 *                                                                                                                                                                              
 *                                                                                                                                                                              
 */

// import { IServiceLog, } from '@mikezimm/fps-library-v2/lib/components/molecules/Provisioning/interfaces/listTypes';

import { getFullUrlFromSlashSitesUrl } from '@mikezimm/fps-library-v2/lib/logic/Strings/urlServices';

/***
 *    d888888b .88b  d88. d8888b.  .d88b.  d8888b. d888888b      .d8888. d88888b d8888b. db    db d888888b  .o88b. d88888b .d8888. 
 *      `88'   88'YbdP`88 88  `8D .8P  Y8. 88  `8D `~~88~~'      88'  YP 88'     88  `8D 88    88   `88'   d8P  Y8 88'     88'  YP 
 *       88    88  88  88 88oodD' 88    88 88oobY'    88         `8bo.   88ooooo 88oobY' Y8    8P    88    8P      88ooooo `8bo.   
 *       88    88  88  88 88~~~   88    88 88`8b      88           `Y8b. 88~~~~~ 88`8b   `8b  d8'    88    8b      88~~~~~   `Y8b. 
 *      .88.   88  88  88 88      `8b  d8' 88 `88.    88         db   8D 88.     88 `88.  `8bd8'    .88.   Y8b  d8 88.     db   8D 
 *    Y888888P YP  YP  YP 88       `Y88P'  88   YD    YP         `8888Y' Y88888P 88   YD    YP    Y888888P  `Y88P' Y88888P `8888Y' 
 *                                                                                                                                 
 *                                                                                                                                 
 */

import { addTheseItemsToList, addTheseItemsToListInBatch } from './listServices';

import { addTheseFields } from './fields/columnServices'; //Import view arrays for Time list

import { addTheseViews } from './views/viewServices'; //Import view arrays for Time list

import { IAnyArray } from  './listServices';

import { IMakeThisList } from "@mikezimm/fps-library-v2/lib/components/molecules/Provisioning/interfaces/IMakeThisList";
import { IMyProgress } from "@mikezimm/fps-library-v2/lib/common/interfaces/fps/IMyInterfaces";


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

export interface IProvisionListFunction {

  setProgress : (progress : IMyProgress[]) => void;
  markComplete : ( history: IMyProgress[][] ) => void;
  makeThisList:  IMakeThisList;
  readOnly: boolean;
  doFields: boolean;
  doViews: boolean;
  doItems: boolean;
  requireAll: boolean;

}

// export async function provisionTheList( makeThisList:  IMakeThisList, readOnly: boolean, setProgress: any, markComplete: any, doFields: boolean, doViews: boolean, doItems: boolean, requireAll: boolean = true ): Promise<IServiceLog[]>{
export async function provisionTheList( props: IProvisionListFunction ): Promise<IMyProgress[][]>{

  const { makeThisList, readOnly, doFields, doViews, doItems, requireAll, markComplete, setProgress } = props;

    const statusLog : IMyProgress[] = [];
    const alertMe = false;
    const consoleLog = false;

    let fieldsResults: IMyProgress[] = [];
    let viewsResults: IMyProgress[] = [];
    let itemsResults: IMyProgress[] = [];

    let createItems: boolean = false;
    let hasFields: boolean = false;
    let hasViews: boolean = false;
    let errMess= '';


    if ( makeThisList.createTheseFields === null || makeThisList.createTheseFields === undefined  ) {
        hasFields = false; errMess += 'List defintion does not have any FIELDS (createTheseFields) defined.' ; }
    else if (  makeThisList.createTheseFields.length > 0 ) {
        hasFields = true; } else { errMess += 'List defintion does not have any FIELDS defined.' ; }

    if ( makeThisList.createTheseViews === null || makeThisList.createTheseViews === undefined  ) {
        hasViews = false;  errMess += 'List defintion does not have any VIEWS (createTheseViews) defined.' ; }
    else if ( makeThisList.createTheseViews.length > 0  ) {
        hasViews = true; } else {  errMess += 'List defintion does not have any VIEWS defined.' ; }


    if ( ( hasViews === false && doViews === true ) || ( hasFields === false && doFields === true ) ) {

        if ( requireAll === true ) {
            alert( errMess );
            return [ statusLog ];
        } else { console.log( 'provisionTheList', errMess) ; }

    }

    if ( readOnly === false  ) {
        //if ( makeThisList.autoItemCreate === true ) {
            createItems = true;
        /*
        } else {
            //let confirmItems = confirm("We created your list, do you want us to create some sample Time entries so you can see how it looks?")
            if (confirm("Do you want us to: \n\nCreate some sample list items \n\nso you can see how it looks?")) {
                //You pressed Ok, add items
                createItems = true;
            }
        */
        //}
    }

    if ( !makeThisList.createTheseItems == null || makeThisList.createTheseItems == undefined ) { createItems = false; }
    if ( createItems === true && makeThisList.createTheseItems.length === 0 ) { createItems = false; } 

    const fieldsToGet = makeThisList.createTheseFields.map ( thisField => {
        return thisField.name;
    });

    // const fieldFilter = "StaticName eq '" + fieldsToGet.join("' or StaticName eq '") + "'";


    console.log('makeThisList.listExists1:', makeThisList.listExists);

    const thisWeb: IWeb = Web( getFullUrlFromSlashSitesUrl( makeThisList.webURL ) );

    console.log('makeThisList.listExists2:', makeThisList.listExists.toString() );

    let ensuredList: IListEnsureResult = null;
    let actualList: IList = null;
    let listFields = null;
    let listViews = null;
    let currentFields: IField[]  = [];
    let currentViews: IViews[] = null;

    if ( readOnly === false ) {
        //2021-06-02:  No idea why I would be checking for template === 100... but it causes uncaught promise when calling from AddTemplate Rail.
        console.log('makeThisList.template', makeThisList.template.toString() );
        console.log('makeThisList.listExists3:', makeThisList.listExists.toString() );

        if ( makeThisList.listExists !== true ) {
            ensuredList = await thisWeb.lists.ensure(makeThisList.title, makeThisList.desc, makeThisList.template, true, makeThisList.additionalSettings );
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            actualList = ensuredList.list as any;
            listFields = actualList.fields;   //Get the fields object from the list
            listViews = actualList.views;     //Get the views object from the list
        } else {
            if ( makeThisList.listExists === true ) {
                actualList = thisWeb.lists.getByTitle(makeThisList.title);
                listFields = actualList.fields;   //Get the fields object from the list
                listViews = actualList.views;     //Get the views object from the list
            } else {
                ensuredList = await thisWeb.lists.add(makeThisList.title, makeThisList.desc, makeThisList.template, true, { OnQuickLaunch: true }) as IListEnsureResult;
                listFields = ensuredList.list.fields;   //Get the fields object from the list
                listViews = ensuredList.list.views;     //Get the views object from the list
            }

        }

        currentFields = await listFields.select('StaticName,Title,Hidden,Formula,DefaultValue,Required,TypeAsString,Indexed,OutputType,DateFormat').get() ;
        console.log('theseFields', currentFields ) ;

        currentViews = await listViews.get();

        console.log('currentFields:', readOnly, currentFields );
        console.log('currentViews:', readOnly, currentViews );

    } else {
        actualList = thisWeb.lists.getByTitle(makeThisList.title);
        listFields = actualList.fields;
        listViews = actualList.views;

        console.log('actualList:', readOnly, actualList );

        // Moved this block of code from above the if then because it is not neccessary in first if loop.
        const arrFieldFilter = [''];
        let fieldFilterIndex = 0;
        let fieldFilterLength = 0;
    
        /*    */
        fieldsToGet.map( ( f, idx ) => {
    
            fieldFilterLength = arrFieldFilter.length === 0 ? 0 : arrFieldFilter[ fieldFilterIndex ].length;
    
            if ( fieldFilterLength > 1000 ) {
    
                //Remove extra "or StaticName eq" from end before moving on to next one
                // let lastStatNameIdx = arrFieldFilter[ fieldFilterIndex ].lastIndexOf('\' or StaticName eq \'');
                //arrFieldFilter[ fieldFilterIndex ] = arrFieldFilter[ fieldFilterIndex ].substring(0,lastStatNameIdx + 1);
    
                fieldFilterIndex ++ ;
                fieldFilterLength = 0 ;
                arrFieldFilter.push('') ;
    
            }
    
            //let suffix =  fieldsToGet[ idx + 1 ] ? "' or StaticName eq '" : '';
            const suffix =  "' or StaticName eq '";
            arrFieldFilter[ fieldFilterIndex ] += f + suffix;
    
        });
    
        arrFieldFilter.map( (f, idx) => {
            arrFieldFilter[idx]= "StaticName eq '" + arrFieldFilter[idx] ;
            //Remove extra "or StaticName eq" from end before moving on to next one
            const lastStatNameIdx = arrFieldFilter[idx].lastIndexOf(`' or StaticName eq '`) ;
            arrFieldFilter[idx] = arrFieldFilter[idx].substring(0,lastStatNameIdx) + `'` ;
        });
    
        console.log('arrFieldFilter:', arrFieldFilter);


        for (let i2=0; i2 < arrFieldFilter.length; i2 ++ ) {


          /**
           * THINGS TO DO AFTER 9/7/2023 Updating:
           * 
           * Add currentFields and currentViews to makeList
           * Return object back in array of results to component
           * Show current / updated fields somehow in the panel
           * 
           * Check the notify function and make sure all is captured in the IMyProgress
           * 
           * Double check what the 'notify' function really does vs the status log.
           *  Seems like statuslog is kind of like IMyProgress[]
           *  and notify might be just for console?
           * 
           *  Maybe add a flag to the IMyProgress to indicate if it's for Status or Notify
           * 
           * Review what IServiceLog is and compare to Notify and IMyProgress
           * 
           */


            // 2023-09-08:  Had to revise this line to make sure it is getting listFields... in other code it was doing this on ensuredList, not the fields.
            // It seemed to work there but I likely just had not actually used it or maybe worked around the error later.
            const theseFields: IField[] = await listFields.select('StaticName,Title,Hidden,Formula,DefaultValue,Required,TypeAsString,Indexed,OutputType,DateFormat').filter( arrFieldFilter[i2] ).get() ;
            console.log('currentFields:', currentFields );
            console.log('theseFields:', theseFields );

            theseFields.map( f=>{ currentFields.push( f ) ; });
        }

        currentViews = await listViews.get();
    }

    console.log(makeThisList.title + ' list fields and views', currentFields, currentViews);

    if ( doFields === true ) {
        //2022-09-25:  Change makeThisList to as any to pass on as IMyListInfo
        fieldsResults = await addTheseFields( makeThisList.title, ['create','changesFinal'], readOnly, listFields, currentFields, makeThisList.createTheseFields, setProgress, alertMe, consoleLog );
    } else { console.log('Skipping doFields') ; }

    if ( doViews === true ) {
        //2022-09-25:  Change makeThisList to as any to pass on as IMyListInfo
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        viewsResults = await addTheseViews( makeThisList.listExistedB4 , readOnly, makeThisList as any, listViews, currentViews, makeThisList.createTheseViews, setProgress, alertMe, consoleLog);
    } else { console.log('Skipping doViews') ; }

    if ( doItems === true && createItems === true && readOnly === false ) {

        //setProgress(false, "I", 0, 0 , '', 'TimePicker', makeThisList.title, 'Adding ITEMS to list: ' + makeThisList.title, 'Checking for ITEMS', 'Add items ~ 112' );
        let createThisBatch : IAnyArray = [];
        //https://www.sitepoint.com/community/t/for-loop-through-array-and-group-every-x-number-of-items/97966

        const totalItems = makeThisList.createTheseItems.length;
        const chunk = 3;

        if ( totalItems <= 50 ) {
            //2022-09-25:  Change makeThisList to as any to pass on as IMyListInfo
            itemsResults = await addTheseItemsToList( thisWeb, actualList.items, makeThisList, setProgress, true, true);

        } else {
            for (let i=0; i < totalItems; i += chunk) {
                createThisBatch = makeThisList.createTheseItems.slice(i, i+chunk);
                //2022-09-25:  Change makeThisList to as any to pass on as IMyListInfo
                itemsResults = await addTheseItemsToListInBatch( thisWeb, makeThisList.title, actualList.items, createThisBatch, setProgress, true, true);
            }
        }

    }
    
    if ( readOnly === true  ) {
        alert( 'Your list has been checked... scroll down to see the results :)' );

    } else if ( doItems === true && createItems === true && makeThisList.alternateItemCreateMessage ) {
        alert( makeThisList.alternateItemCreateMessage );

    } else {
        alert(`Your  list is all ready to go!`);
    }

    const errorResults : IMyProgress[] = [];
    fieldsResults.map( ( item ) => { if ( item.array === 'E' ) errorResults.push( item ) } );
    fieldsResults = fieldsResults.filter( ( item ) =>  item.array !== 'E' );

    viewsResults.map( ( item ) => { if ( item.array === 'E' ) errorResults.push( item ) } );
    viewsResults = viewsResults.filter( ( item ) =>  item.array !== 'E' );

    itemsResults.map( ( item ) => { if ( item.array === 'E' ) errorResults.push( item ) } );
    itemsResults = itemsResults.filter( ( item ) =>  item.array !== 'E' );

    markComplete( [ errorResults , fieldsResults, viewsResults, itemsResults ] );

    return [ errorResults, fieldsResults, viewsResults, itemsResults ];

}


