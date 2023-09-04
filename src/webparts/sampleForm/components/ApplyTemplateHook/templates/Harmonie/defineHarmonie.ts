

// import { IListInfo } from "@pnp/sp/lists/types";
// import { IMakeThisList, IDefinedListInfo, } from '../../interfaces/ProvisionTypes';

// import { HarmonieFields } from './columnsHarmonie'; //Import column arrays (one file because both lists use many of same columns)

// import { HarmonieViews, BUHarmonieViews } from './viewsHarmonie';  //Import view arrays for Project list

// // definedList: 'PreConfig',


// import { defineTheListMaster } from '../functions/defineTheListMaster';
// import { getFieldNamesFromArray, getViewTitlesFromArray } from '../functions/getFieldInfo';


// //export async function provisionTheListLoader( template: IValidTemplate , listName : string, listDefinition: 'ParentListTitle' | 'ChildListTitle' , webURL: string, setProgress: any ): Promise<IServiceLog[]>{
// export function defineTheList ( list: IListInfo, definedList: IDefinedListInfo , webURL: string, currentUser: number[], ): IMakeThisList {

//     //import { defineTheListMaster } from '../component/provisionWebPartList';
//     const makeThisList:  IMakeThisList = defineTheListMaster( list, definedList, webURL, );
//     makeThisList.createTheseFields = HarmonieFields( definedList.listDefinition as 'Emails' );
//     makeThisList.createTheseViews = BUHarmonieViews;
//     makeThisList.createTheseItems = [];
//     makeThisList.autoItemCreate = false;

// //     if ( definedList.listDefinition === 'Emails' ) {
//         // makeThisList.createTheseFields = HarmonieFields( definedList.listDefinition );
// //         makeThisList.createTheseViews = HarmonieViews;
// //         makeThisList.createTheseItems = [];
// //         makeThisList.autoItemCreate = true;
// //        makeThisList.alternateItemCreateMessage = 'Oh by the way\n\nWe created some default Projects to get you started :)';


// //     } else if ( definedList.listDefinition === 'BUEmails' ) {
//         // makeThisList.createTheseFields = HarmonieFields( definedList.listDefinition );
// //         makeThisList.createTheseViews = BUHarmonieViews;
// //         makeThisList.createTheseItems = [];
// //         makeThisList.autoItemCreate = false;
// //        makeThisList.alternateItemCreateMessage = 'Ok you are all set!\n\nDon\'t forget to delete the sample Time entries when you are done testing :)';
// //     }

//     //let listResult = await provisionTheList( makeThisList, setProgress );
//     if ( makeThisList.templateDesc === null ) { 
//         makeThisList.templateDesc = `Adds ${definedList.listDefinition} related views (${makeThisList.createTheseViews.length}) and fields (${makeThisList.createTheseFields.length}) to your list.`;}

//     makeThisList.templateDetails = `Fields include:${ getFieldNamesFromArray(makeThisList.createTheseFields).join(', ') }\nViews include:${ getViewTitlesFromArray(makeThisList.createTheseViews).join(', ') }` ;

//     return makeThisList;

// }

