

import { IMyListInfo, IServiceLog, notify } from '@mikezimm/fps-library-v2/lib/components/molecules/Provisioning/interfaces/listTypes';

import { getHelpfullErrorV2 } from '@mikezimm/fps-library-v2/lib/logic/Errors/friendly';
import { BaseErrorTrace } from '@mikezimm/fps-library-v2/lib/PackageConst';  //, [ BaseErrorTrace , 'Failed', 'try switchType ~ 324', helpfulErrorEnd ].join('|')   let helpfulErrorEnd = [ listTitle, f.name, i, n ].join('|');

import { compareArrays, ICompareResult } from '@mikezimm/fps-library-v2/lib/logic/Arrays/searching/objectkeys';
import { stringifyKeyValue } from '@mikezimm/fps-library-v2/lib/logic/Arrays/searching/objectkeys';


import "@pnp/sp/webs";
import "@pnp/sp/lists";
import { IWeb,} from '@pnp/sp/webs';

import { IItems, } from "@pnp/sp/items/types";

import { IMyProgress } from "@mikezimm/fps-library-v2/lib/common/interfaces/fps/IMyInterfaces";
import { addMyProgress } from "./addMyProgress";
import { IMakeThisList } from '../interfaces/ProvisionTypes';

export type IAnyArray = any[];

// export interface IAddItemsToListProps {
//   listTitle: string;
//   listItems: IItems;
//   ItemsToAdd: any[];
//   setProgress: any;
//   alertMe: boolean;
//   consoleLog: boolean;
//   alwaysCreateNew: boolean;
// }

export async function addTheseItemsToList( thisWeb: IWeb, listItems: IItems, makeThisList: IMakeThisList, setProgress : (progress : IMyProgress[]) => void, alertMe: boolean, consoleLog: boolean, alwaysCreateNew = true ): Promise<IMyProgress[]>{

    const listTitle = makeThisList.title;
    const ItemsToAdd = makeThisList.createTheseItems;
    let statusLog : IMyProgress[] = [];

    // setProgress(false, "I", 0, 0 , '', 'TimePicker', listTitle, 'Adding ITEMS to list: ' + listTitle, 'Checking for ITEMS', 'Add items ~ 38' );
    statusLog = addMyProgress( statusLog, false, 'Item', 0, 0 , '', 'TimePicker', listTitle, 'Adding ITEMS', 'Checking for ITEMS', 'Started' , setProgress, `Add items ~ 38`, );
    let createThisBatch : IAnyArray = [];
    //https://www.sitepoint.com/community/t/for-loop-through-array-and-group-every-x-number-of-items/97966
    const totalItems = ItemsToAdd.length;
    const chunk: number = 10;
    let result3: any[] = [];

    const helpfulErrorEnd = [ listTitle, '', '', null, null ].join('|');

    if ( totalItems <= 50 ) {

        try {
            result3 = await addTheseItemsToListNoBatch( makeThisList, listItems, setProgress, true, true);
        } catch (e) {
            const errOutput = getHelpfullErrorV2(e, alertMe, consoleLog, [ BaseErrorTrace , 'Failed', 'Add items <= 50 ~ 55', helpfulErrorEnd ].join('|') );
            const err = errOutput.friendly;
            // statusLog = notify(statusLog, 'Created Item', err, null, null, null, null);
            // setProgress(false, "E", 'i', totalItems , 'darkred', 'ErrorBadge', ItemsToAdd + ' Missing column', 'Items: ' + listTitle, 'Adding Item ' + 'i' + ' of ' + totalItems + ' item', 'Add item ~ 109\n' + err);
            statusLog = addMyProgress( statusLog, false, 'E', 0, totalItems , 'darkred', 'ErrorBadge', listTitle, 'Created Items', ItemsToAdd + ' Missing column', 'Error' , setProgress, `Add item ~ 109\n${err}`, );
        }

    } else {
        for (let i: number=0; i < totalItems; i += chunk) {
            createThisBatch = ItemsToAdd.slice(i, i+chunk);
            try {
                result3 = await addTheseItemsToListInBatch(thisWeb, listTitle, listItems, createThisBatch, setProgress, true, true);
            } catch (e) {
                const errOutput = getHelpfullErrorV2(e, alertMe, consoleLog, [ BaseErrorTrace , 'Failed', 'Add items > 50 ~ 55', helpfulErrorEnd ].join('|') );
                const err = errOutput.friendly;
                // statusLog = notify(statusLog, 'Created Item', err, null, null, null, null);
                // setProgress(false, "E", 'i', totalItems , 'darkred', 'ErrorBadge', ItemsToAdd + ' Missing column', 'Items: ' + listTitle, 'Adding Item ' + 'i' + ' of ' + totalItems + ' item', 'Add item ~ 109\n' + err);
                statusLog = addMyProgress( statusLog, false, 'E', i, totalItems , 'darkred', 'ErrorBadge', listTitle, 'Created Items', ItemsToAdd + ' Missing column', 'Error' , setProgress, `Add item ~ 109\n${err}`, );
            }
        }
    }

    return result3;

}



export async function addTheseItemsToListNoBatch( makeThisList: IMakeThisList, listItems: IItems, setProgress : (progress : IMyProgress[]) => void, alertMe: boolean, consoleLog: boolean, alwaysCreateNew = true ): Promise<IMyProgress[]>{

    let statusLog : IMyProgress[] = [];
    const ItemsToAdd = makeThisList.createTheseItems;
    const listTitle = makeThisList.title;

    console.log('Starting addTheseItemsToList', ItemsToAdd );

    
      /**
    * @param progressHidden 
    * @param current : current index of progress
    * @param ofThese : total count of items in progress
    * @param color : color of label like red, yellow, green, null
    * @param icon : Fabric Icon name if desired
    * @param logLabel : short label of item used for displaying in list
    * @param label : longer label used in Progress Indicator and hover card
    * @param description 
   */

    // Removing this because it is optional... in the use case for sample items, will always use default content type anyway.
    // const list = thisWeb.lists.getByTitle(listTitle);
    // const entityTypeFullName = await list.getListItemEntityTypeFullName();

    let i = 0;

    //let createThisBatch : IAnyArray = [];
    //https://www.sitepoint.com/community/t/for-loop-through-array-and-group-every-x-number-of-items/97966
    const totalItems = ItemsToAdd.length;

    for (const item of ItemsToAdd) {
    //, Category1: { results: ['Training']}
        const thisItem = stringifyKeyValue(item, 0, '===');
        i ++;

        if ( !item.Title ) { item.Title = '--Unknown error--'; }
        const helpfulErrorEnd = [ listTitle, item.Title, i, totalItems ].join('|');

        try {
            delete item.compareArrays;
            await listItems.add( item , ).then( ( b: any ) => {
                // statusLog = notify(statusLog, 'Created Item', 'No-batch', null, null, null, thisItem );
                // setProgress(false, "I", i, totalItems , 'darkgreen', 'CheckMark',  item.Title, 'Items: ' + listTitle, 'Item ' + i + ' of ' + totalItems + ' item', 'Add item ~ 95');
                statusLog = addMyProgress( statusLog, false, 'Item', i, totalItems , 'darkgreen', 'CheckMark', item.Title, 'Created Items', 'Created Item', 'Created' , setProgress, `Add item ~ 95`, );
            });

        } catch (e) {
            const errOutput = getHelpfullErrorV2(e, alertMe, consoleLog, [ BaseErrorTrace , 'Failed', 'Add items ~ 125', helpfulErrorEnd ].join('|') );

            let missingColumn = false;
            let userFieldMissingID = false;

            if ( errOutput.friendly.indexOf('missing a column') > -1 ) { missingColumn = true; }
            if ( errOutput.friendly.indexOf('does not exist on list') > -1 ) { missingColumn = true; }
            if ( errOutput.friendly.indexOf('does not exist on type') > -1 ) { missingColumn = true; }

            if ( errOutput.friendly.indexOf("A 'PrimitiveValue' node with non-null value was found when trying to read the value of a navigation property") > -1 ) { userFieldMissingID = true; }

            if ( missingColumn ) {
                const err = `The ${listTitle} list does not have a column yet:  ${thisItem}`;
                // statusLog = notify(statusLog, 'Error creating Item', err, null, null, null, null);
                // setProgress(false, "E", i, totalItems , 'darkred', 'ErrorBadge', item.Title + ' Missing column', 'Items: ' + listTitle, 'Adding Item ' + i + ' of ' + totalItems + ' item', 'Add item ~ 132\n' + err);
                console.log('Issue trying to create this item (missing column):', item );
                statusLog = addMyProgress( statusLog, false, 'Item', i, totalItems , 'darkred', 'ErrorBadge', item.Title, 'Create', 'Create Item', 'Missing column' , setProgress, `Add item ~ 132\n${err}`, );

            } else if ( userFieldMissingID ) {
                const err = `Your Item object may have mis-identied a User column.  BE SURE user column is followed by Id such as:  EditorId`;
                // statusLog = notify(statusLog, 'Error creating Item', err, null, null, null, null);
                // setProgress(false, "E", i, totalItems , 'darkred', 'ErrorBadge', item.Title + ' Wrong column key', 'Items: ' + listTitle, 'Adding Item ' + i + ' of ' + totalItems + ' item', 'Add item ~ 137\n' + err);
                console.log('Issue trying to create this item: (User field without Id)', item );
                statusLog = addMyProgress( statusLog, false, 'Item', i, totalItems , 'darkred', 'ErrorBadge', item.Title, 'Create', 'Create Item', 'Wrong column key' , setProgress, `Add item ~ 137\n${err}`, );

            } else {
                const err = errOutput.friendly;
                // statusLog = notify(statusLog, 'Problem processing item', err, null, null, null, null);
                // setProgress(false, "E", i, totalItems , 'darkred', 'ErrorBadge', item.Title, 'Items: ' + listTitle, 'Adding Item ' + i + ' of ' + totalItems + '  item', 'Add item ~ 142 + \n' + err);
                console.log('Issue trying to create this item:', item );
                statusLog = addMyProgress( statusLog, false, 'Item', i, totalItems , 'darkred', 'ErrorBadge', item.Title, 'Create', 'Create Item', 'Unknown Error' , setProgress, `Add item ~ 142\n${err}`, );
            }
        }

    }

    return statusLog;
}






/**
 * 
 * @param myList 
 * @param ensuredList 
 * @param ItemsToAdd - array of items to add to the list
 * @param alertMe 
 * @param consoleLog 
 * @param alwaysCreateNew - currently no functionality to use this but long term intent would be to check if item exists first, then only add if it does not exist.
 */

export async function addTheseItemsToListInBatch( thisWeb: IWeb, listTitle: string, listItems: IItems, ItemsToAdd: any[], setProgress : (progress : IMyProgress[]) => void, alertMe: boolean, consoleLog: boolean, alwaysCreateNew = true ): Promise<IMyProgress[]>{

    let statusLog : IMyProgress[] = [];
    console.log('Starting addTheseItemsToList', ItemsToAdd);

    
      /**
    * @param progressHidden 
    * @param current : current index of progress
    * @param ofThese : total count of items in progress
    * @param color : color of label like red, yellow, green, null
    * @param icon : Fabric Icon name if desired
    * @param logLabel : short label of item used for displaying in list
    * @param label : longer label used in Progress Indicator and hover card
    * @param description 
   */

    // Removing this because it is optional... in the use case for sample items, will always use default content type anyway.
    // const list = thisWeb.lists.getByTitle(listTitle);
    // const entityTypeFullName = await list.getListItemEntityTypeFullName();

    const batch = thisWeb.createBatch();

    let i = 0;
    const totalItems = ItemsToAdd.length;

    for (const item of ItemsToAdd) {
    //, Category1: { results: ['Training']}
        const thisItem = stringifyKeyValue(item, 0, '===');
        i ++;
        //let checkValue = thisItem;
        // Removed try/catch per https://github.com/pnp/pnpjs/issues/1275#issuecomment-658578589
        await listItems.inBatch(batch).add( item , ).then(b => {
            // statusLog = notify(statusLog, 'Created Item', 'Batched', null, null, null, thisItem );
            console.log('b', b, item);
            // setProgress(false, "I", i, n , '', '', 'Item batch', 'Batching Items: ' + listTitle, 'Batching Item ' + i + ' of ' + n + ' item', 'Add item ~ 73');
            statusLog = addMyProgress( statusLog, false, 'Item', i, totalItems , '', '', item.Title, 'Batch Create', 'Item batch', 'Batching Items' , setProgress, `Add item ~ 73`, );
        });
    }

    try {
        await batch.execute();

        // Have a way to check which items did not get added.

    } catch (e) {
        //ONLY SEEMS TO CATCH FIRST ERROR IN BATCH.
        //OTHER BATCH ITEMS GET PROCESSED BUT ONLY FLAGS FIRST ONE.
        //CONFIRMED LATER ITEMS IN ARRAY AFTER ERROR STILL GET PROCESSED, JUST NOT ERRORED OUT
        const helpfulErrorEnd = [ listTitle, '', '', 1, totalItems ].join('|');
        const errOutput = getHelpfullErrorV2(e, alertMe, consoleLog, [ BaseErrorTrace , 'Failed', 'Add batch items ~ 224', helpfulErrorEnd ].join('|') );
        if (errOutput.friendly.indexOf('missing a column') > -1) {
            const err = `The ${listTitle} list does not have XYZ or TBD yet:  ${'thisItem'}`;
            // statusLog = notify(statusLog, 'Created Item', err, null, null, null, null);
            // setProgress(false, "E", i, n , '', '', 'Missing column', 'Batching Items: ' + listTitle, 'Batching Item ' + i + ' of ' + n + ' item', 'Add item ~ 90+ \n' + err);
            statusLog = addMyProgress( statusLog, false, 'Item', i, totalItems , 'darkred', 'ErrorBadge', ``, 'Batch Create', `Batching item ${i}`, 'Missing column' , setProgress, `Add item ~ 90\n${err}`, );
        } else {
            const err = errOutput.friendly;
            // statusLog = notify(statusLog, 'Problem processing Batch', err, null, null, null, null);
            // setProgress(false, "E", i, n , '', '', 'Missing column', 'Batching Items: ' + listTitle, 'Batching Item ' + i + ' of ' + n + '  item', 'Add item ~ 94+ \n' + err);
            statusLog = addMyProgress( statusLog, false, 'Item', i, totalItems , 'darkred', 'ErrorBadge', ``, 'Batch Create', `Batching item ${i}`, 'Problem processing Batch' , setProgress, `Add item ~ 94\n${err}`, );
        }
    }

    const result : ICompareResult = compareArrays(statusLog, ItemsToAdd, 'ReturnNOTFound', 'checkValue','===', 'Both');

    return statusLog;
}

