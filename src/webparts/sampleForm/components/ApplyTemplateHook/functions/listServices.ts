

import { IMyListInfo, IServiceLog, notify } from '@mikezimm/fps-library-v2/lib/components/molecules/Provisioning/interfaces/listTypes';

import { getHelpfullErrorV2 } from '@mikezimm/fps-library-v2/lib/logic/Errors/friendly';
import { BaseErrorTrace } from '@mikezimm/fps-library-v2/lib/PackageConst';  //, [ BaseErrorTrace , 'Failed', 'try switchType ~ 324', helpfulErrorEnd ].join('|')   let helpfulErrorEnd = [ myList.title, f.name, i, n ].join('|');

import { compareArrays, ICompareResult } from '@mikezimm/fps-library-v2/lib/logic/Arrays/searching/objectkeys';
import { stringifyKeyValue } from '@mikezimm/fps-library-v2/lib/logic/Arrays/searching/objectkeys';


import "@pnp/sp/webs";
import "@pnp/sp/lists";
import { IWeb,} from '@pnp/sp/webs';

export type IAnyArray = any[];

export interface IListLog extends IServiceLog {
    list?: string;
}


export async function addTheseItemsToList( myList: IMyListInfo, thisWeb: IWeb, ItemsToAdd: any[], setProgress: any, alertMe: boolean, consoleLog: boolean, alwaysCreateNew = true ): Promise<IListLog[]>{
    let statusLog : IListLog[] = [];

    setProgress(false, "I", 0, 0 , '', 'TimePicker', myList.title, 'Adding ITEMS to list: ' + myList.title, 'Checking for ITEMS', 'Add items ~ 38' );
    let createThisBatch : IAnyArray = [];
    //https://www.sitepoint.com/community/t/for-loop-through-array-and-group-every-x-number-of-items/97966
    const totalItems = ItemsToAdd.length;
    const chunk: number = 10;
    let result3: any[] = [];

    const helpfulErrorEnd = [ myList.title, '', '', null, null ].join('|');

    if ( totalItems <= 50 ) {

        try {
            result3 = await addTheseItemsToListNoBatch(myList, thisWeb, ItemsToAdd, setProgress, true, true);
        } catch (e) {
            const errOutput = getHelpfullErrorV2(e, alertMe, consoleLog, [ BaseErrorTrace , 'Failed', 'Add items <= 50 ~ 55', helpfulErrorEnd ].join('|') );
            const err = errOutput.friendly;
            statusLog = notify(statusLog, 'Created Item', err, null, null, null, null);
            setProgress(false, "E", 'i', totalItems , 'darkred', 'ErrorBadge', ItemsToAdd + ' Missing column', 'Items: ' + myList.title, 'Adding Item ' + 'i' + ' of ' + totalItems + ' item', 'Add item ~ 109\n' + err);
        }

    } else {
        for (let i: number=0; i < totalItems; i += chunk) {
            createThisBatch = ItemsToAdd.slice(i, i+chunk);
            try {
                result3 = await addTheseItemsToListInBatch(myList, thisWeb, createThisBatch, setProgress, true, true);
            } catch (e) {
                const errOutput = getHelpfullErrorV2(e, alertMe, consoleLog, [ BaseErrorTrace , 'Failed', 'Add items > 50 ~ 55', helpfulErrorEnd ].join('|') );
                const err = errOutput.friendly;
                statusLog = notify(statusLog, 'Created Item', err, null, null, null, null);
                setProgress(false, "E", 'i', totalItems , 'darkred', 'ErrorBadge', ItemsToAdd + ' Missing column', 'Items: ' + myList.title, 'Adding Item ' + 'i' + ' of ' + totalItems + ' item', 'Add item ~ 109\n' + err);
            }
            
            
        }
    }

    return result3;

}



export async function addTheseItemsToListNoBatch( myList: IMyListInfo, thisWeb: IWeb, ItemsToAdd: any[], setProgress: any, alertMe: boolean, consoleLog: boolean, alwaysCreateNew = true ): Promise<IListLog[]>{

    let statusLog : IListLog[] = [];
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

    const list = thisWeb.lists.getByTitle(myList.title);
    const entityTypeFullName = await list.getListItemEntityTypeFullName();

    let i = 0;

    //let createThisBatch : IAnyArray = [];
    //https://www.sitepoint.com/community/t/for-loop-through-array-and-group-every-x-number-of-items/97966
    const totalItems = ItemsToAdd.length;

    for (let item of ItemsToAdd) {
    //, Category1: { results: ['Training']}
        const thisItem = stringifyKeyValue(item, 0, '===');
        i ++;

        if ( !item.Title ) { item.Title = '--Unknown error--'; }
        const helpfulErrorEnd = [ myList.title, item.Title, i, totalItems ].join('|');

        try {
            delete item.compareArrays;
            await list.items.add( item , entityTypeFullName).then( ( b: any ) => {
                statusLog = notify(statusLog, 'Created Item', 'No-batch', null, null, null, thisItem );
                setProgress(false, "I", i, totalItems , 'darkgreen', 'CheckMark',  item.Title, 'Items: ' + myList.title, 'Item ' + i + ' of ' + totalItems + ' item', 'Add item ~ 95');
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
                const err = `The ${myList.title} list does not have a column yet:  ${thisItem}`;
                statusLog = notify(statusLog, 'Error creating Item', err, null, null, null, null);
                console.log('Issue trying to create this item (missing column):', item );
                setProgress(false, "E", i, totalItems , 'darkred', 'ErrorBadge', item.Title + ' Missing column', 'Items: ' + myList.title, 'Adding Item ' + i + ' of ' + totalItems + ' item', 'Add item ~ 132\n' + err);

            } else if ( userFieldMissingID ) {
                const err = `Your Item object may have mis-identied a User column.  BE SURE user column is followed by Id such as:  EditorId`;
                statusLog = notify(statusLog, 'Error creating Item', err, null, null, null, null);
                console.log('Issue trying to create this item: (User field without Id)', item );
                setProgress(false, "E", i, totalItems , 'darkred', 'ErrorBadge', item.Title + ' Wrong column key', 'Items: ' + myList.title, 'Adding Item ' + i + ' of ' + totalItems + ' item', 'Add item ~ 137\n' + err);

            } else {
                const err = errOutput.friendly;
                statusLog = notify(statusLog, 'Problem processing item', err, null, null, null, null);
                console.log('Issue trying to create this item:', item );
                setProgress(false, "E", i, totalItems , 'darkred', 'ErrorBadge', item.Title, 'Items: ' + myList.title, 'Adding Item ' + i + ' of ' + totalItems + '  item', 'Add item ~ 142 + \n' + err);
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

export async function addTheseItemsToListInBatch( myList: IMyListInfo, thisWeb: IWeb, ItemsToAdd: any[], setProgress: any, alertMe: boolean, consoleLog: boolean, alwaysCreateNew = true ): Promise<IListLog[]>{

    let statusLog : IListLog[] = [];
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

    let list = thisWeb.lists.getByTitle(myList.title);
    const entityTypeFullName = await list.getListItemEntityTypeFullName();

    let batch = thisWeb.createBatch();

    let i = 0;
    let n = ItemsToAdd.length;

    for (let item of ItemsToAdd) {
    //, Category1: { results: ['Training']}
        let thisItem = stringifyKeyValue(item, 0, '===');
        i ++;
        //let checkValue = thisItem;
        // Removed try/catch per https://github.com/pnp/pnpjs/issues/1275#issuecomment-658578589
        await list.items.inBatch(batch).add( item , entityTypeFullName).then(b => {
            statusLog = notify(statusLog, 'Created Item', 'Batched', null, null, null, thisItem );
            console.log('b', b, item);
            setProgress(false, "I", i, n , '', '', 'Item batch', 'Batching Items: ' + myList.title, 'Batching Item ' + i + ' of ' + n + ' item', 'Add item ~ 73');
        });
    }

    try {
        await batch.execute();

        // Have a way to check which items did not get added.

    } catch (e) {
        //ONLY SEEMS TO CATCH FIRST ERROR IN BATCH.
        //OTHER BATCH ITEMS GET PROCESSED BUT ONLY FLAGS FIRST ONE.
        //CONFIRMED LATER ITEMS IN ARRAY AFTER ERROR STILL GET PROCESSED, JUST NOT ERRORED OUT
        let helpfulErrorEnd = [ myList.title, '', '', 1, n ].join('|');
        let errOutput = getHelpfullErrorV2(e, alertMe, consoleLog, [ BaseErrorTrace , 'Failed', 'Add batch items ~ 224', helpfulErrorEnd ].join('|') );
        if (errOutput.friendly.indexOf('missing a column') > -1) {
            let err = `The ${myList.title} list does not have XYZ or TBD yet:  ${'thisItem'}`;
            statusLog = notify(statusLog, 'Created Item', err, null, null, null, null);
            setProgress(false, "E", i, n , '', '', 'Missing column', 'Batching Items: ' + myList.title, 'Batching Item ' + i + ' of ' + n + ' item', 'Add item ~ 90+ \n' + err);
        } else {
            let err = errOutput.friendly;
            statusLog = notify(statusLog, 'Problem processing Batch', err, null, null, null, null);
            setProgress(false, "E", i, n , '', '', 'Missing column', 'Batching Items: ' + myList.title, 'Batching Item ' + i + ' of ' + n + '  item', 'Add item ~ 94+ \n' + err);
        }
    }

    let result : ICompareResult = compareArrays(statusLog, ItemsToAdd, 'ReturnNOTFound', 'checkValue','===', 'Both');

    return statusLog;
}

