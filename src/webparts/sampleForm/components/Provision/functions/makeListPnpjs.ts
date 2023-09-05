
import "@pnp/sp/webs";
import "@pnp/sp/lists";

import { IWeb, Web,  } from "@pnp/sp/webs";
import { IListInfo } from "@pnp/sp/lists/types";
import { IListAddResult } from "@pnp/sp/lists";

import { IItemErrorObj } from '@mikezimm/fps-pnp2/lib/services/sp/fetch/items/Interface';
import { check4This } from '@mikezimm/fps-pnp2/lib/services/sp/CheckSearch';

/**
 * This will go in fps-pnp2
 * @param siteUrl 
 * @param template 
 * @param libraryUrl 
 * @param properties 
 * @returns 
 */
export async function makeListPnpjs(siteUrl: string, template: number, libraryTitle: string, libraryUrl: string, properties: Partial<IListInfo> ): Promise<IItemErrorObj> {

  const existsError = `A list or document library with the specified title already exists: `;
  const result: IItemErrorObj = {
    status: 'Unknown',
    item: null,
    e: null,
  };

  if (!siteUrl) {
    result.status = 'NoWeb';
    result.e = 'NoWeb';
    return result;

  } else if ( !libraryUrl ) {
    result.status = 'NoList';
    result.e = 'NoList';
    return result;
  }

  const thisWeb: IWeb = Web( siteUrl );

  let libExisted: any = false;
  try {
    const lists : IListInfo[]= await thisWeb.lists.select( 'Id,Title,EntityTypeName').get();
    if ( !lists || lists.length === 0 ) return;
    console.log( `makeListPnpjs - Checking for dup lists:`, lists );
    lists.map( ( list: IListInfo ) => {
      if ( list.EntityTypeName.toLocaleLowerCase() === libraryUrl.replace('/', '' ).toLocaleLowerCase() ) {
        libExisted = true;
        result.item = list;
        result.status = 'AlreadyExisted';
        result.e = { message: `${existsError}${libraryUrl}` };
      } else if ( list.Title.toLocaleLowerCase() === libraryTitle.toLocaleLowerCase() ) {
        libExisted = true;
        result.item = list;
        result.status = 'AlreadyExisted';
        result.e = { message: `${existsError}${libraryTitle}` };
      }
    } );

  } catch (e) {
    result.status = 'Error';
  }

  if ( libExisted === true ) return result;

  try {

    const intialList: IListAddResult = await thisWeb.lists.add( libraryUrl, ``, template, false, );
    await intialList.list.update( properties );
    const returnList = thisWeb.lists.getById( intialList.data.Id );
    result.item = await returnList.select("*")();
    result.status = 'Success';

    if ( check4This( 'fpsShowFetchResults=true' ) === true ) { console.log( `fps-Pnp2 Success: makeLibraryPnpjs ~ 38`, result ) }

  } catch (e) {

    if ( check4This( 'fpsShowFetchResults=true' ) === true ) { console.log( `fps-Pnp2 ERROR: makeLibraryPnpjs ~ 42`, e ) }
    result.status = 'Error';
    result.e = e;
  }

  return result;

}


