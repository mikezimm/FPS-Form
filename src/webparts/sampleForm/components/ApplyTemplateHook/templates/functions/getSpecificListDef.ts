import { IDefinedListInfo, IMakeThisList } from "../../interfaces/ProvisionTypes";

import { IListInfo } from "@pnp/sp/lists/types";
import { defineTheListMaster } from "./defineTheListMaster";
import { HarmonieFields } from "../Harmonie/columnsHarmonie";
import { BUHarmonieViews } from "../Harmonie/viewsHarmonie";
import { getFieldNamesFromArray, getViewTitlesFromArray } from "./getFieldInfo";

export function getSpecificListDef( list: IListInfo, definedList: IDefinedListInfo , webURL: string, currentUser: number[], ) : IMakeThisList {

  let makeThisList:  IMakeThisList = null;
  makeThisList = defineTheListMaster( list, definedList, webURL, );

  switch ( definedList.list ) {
    case 'Harmon.ie':

      makeThisList.createTheseFields = HarmonieFields( definedList.listDefinition as 'Emails' );
      makeThisList.createTheseViews = BUHarmonieViews;
      makeThisList.createTheseItems = [];
      makeThisList.autoItemCreate = false;
      break;
    default:
      alert( 'DID NOT BUILD DEFINED LIST' );

  }

  makeThisList.templateDesc = `Adds ${definedList.listDefinition} related views (${makeThisList.createTheseViews.length}) and fields (${makeThisList.createTheseFields.length}) to your list.`;
  makeThisList.templateDetails = `Fields include:${ getFieldNamesFromArray(makeThisList.createTheseFields).join(', ') }\nViews include:${ getViewTitlesFromArray(makeThisList.createTheseViews).join(', ') }` ;

  return makeThisList;

}