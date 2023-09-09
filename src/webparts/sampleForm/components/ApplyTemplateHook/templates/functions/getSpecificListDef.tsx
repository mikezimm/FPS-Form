
import * as React from 'react';
import { IDefinedListInfo, IMakeThisList } from "../../interfaces/ProvisionTypes";

import { IListInfo } from "@pnp/sp/lists/types";
import { defineTheListMaster } from "./defineTheListMaster";
import { HarmonieFields } from "../Harmonie/columnsHarmonie";
import { BUHarmonieViews } from "../Harmonie/viewsHarmonie";
import { getFieldNamesFromArray, getViewTitlesFromArray } from "./getFieldInfo";


const noWrap = `fps-gen-text-ellipse`;

export function getSpecificListDef( list: IListInfo, definedList: IDefinedListInfo , webURL: string, currentUser: number[], listExists: boolean ) : IMakeThisList {

  if ( !definedList ) {
    console.log( 'getSpecificListDef:  list: IListInfo IS NOT DEFINED')
  }
  let makeThisList:  IMakeThisList = null;
  makeThisList = defineTheListMaster( list, definedList, webURL, );
  makeThisList.listExists = listExists ? listExists : false;

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

  makeThisList.templateDesc = `Adds ${definedList.list} > ${definedList.listDefinition} related views (${makeThisList.createTheseViews.length}) and fields (${makeThisList.createTheseFields.length}) to your list.`;
  makeThisList.templateDetails = `Fields include:${ getFieldNamesFromArray(makeThisList.createTheseFields).join(', ') }\nViews include:${ getViewTitlesFromArray(makeThisList.createTheseViews).join(', ') }` ;

  makeThisList.templateFields = <div>
    <div className='items-title'>Fields to be added</div>
    <div className={ 'template-items' }>
      { makeThisList.createTheseFields.map( field => { return <div key={ field.Title }
      title={ field.TypeDisplayName } >{ typeof field  === 'object' ? decodeURI( field.name ) : field }</div> })}
    </div>
  </div>

  makeThisList.templateViews = <div>
    <div className='items-title'>Views to be added</div>
    <div className={ 'template-items' }>
      { makeThisList.createTheseViews.map( view => { return <div key={ view.Title }
      title={view.iFields.map( field=> { return typeof field  === 'object' ? decodeURI( field.name ) : field }  ).join(', ') } >{ typeof view  === 'object' ? view.Title : view }</div> })}
    </div>
  </div>

  return makeThisList;

}