
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
export async function makeListPnpjs(siteUrl: string, template: number, libraryUrl: string, properties: Partial<IListInfo> ): Promise<IItemErrorObj> {

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

  try {

    const thisWeb: IWeb = Web( siteUrl );
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


