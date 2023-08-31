
import "@pnp/sp/webs";
import "@pnp/sp/lists";

import { IWeb, Web,  } from "@pnp/sp/webs";
import { IListAddResult, IListInfo } from "@pnp/sp/lists";

import { saveThisLogItemAsync } from '@mikezimm/fps-pnp2/lib/services/sp/logging/saveThisLogItemAsync';

export async function createLibraryPnpjs(siteUrl: string, libraryTitle: string, libraryUrl: string, libraryDescription: string ): Promise<IListInfo> {

  const thisWeb: IWeb = Web( siteUrl );
  const result: IListAddResult = await thisWeb.lists.add( libraryUrl, ``, 101, false, );
  await result.list.update( { Title: libraryTitle, Description: libraryDescription });
  const returnList = thisWeb.lists.getById( result.data.Id );
  const finalList = await returnList.select("*")();
  return finalList;

}

export const RequestWeb = `${window.location.origin}/sites/SP_GlobalItsRecordsAndInformationGovernanceSystem`;
export const RequestList = `Label Provisioning Requests`;

export const FPSLabelRequestCols: string[] = [
  'Id', 'Title', 'Label', 'LibraryGuid', 'LibraryName', 'LibraryTitle', 'LibraryLink', 'SiteUrl', 'WebUrl', 'WorkflowComments', 'Status', 'CompleteTime',
];

export interface IFPSLabelRequest {
  Title: string;
  Label: string;
  LibraryGuid: string;
  LibraryName: string;
  LibraryTitle: string;
  LibraryLink: {
    Url: string;
    Description?: string;
  }
  SiteUrl: string;
  WebUrl: string;
  WorkflowComments?: string;
  Status?: string;
  CompleteTime?: any;
}

export interface IFPSLabelRequestRead extends IFPSLabelRequest {
  Status: string;
}


export async function requstLibraryLabel( list: IListInfo, label: string ): Promise<any> {


  const parentWeb: string[] = list.ParentWebUrl.split('/');
  const SiteUrl: string = parentWeb.slice(0, 3).join('/');
  const LabelRequest :IFPSLabelRequest = {
    Title: list.Title,
    Label: label,
    LibraryGuid: list.Id,
    LibraryName: list.EntityTypeName,
    LibraryTitle: list.Title,
    LibraryLink: {
      Url: `${window.location.origin}${list.ParentWebUrl}/${list.EntityTypeName}`,
      Description: `${list.ParentWebUrl.replace( '/sites/', '' )}/${list.EntityTypeName}`
   },
    SiteUrl: SiteUrl,
    WebUrl: list.ParentWebUrl,
  }

  console.log( 'LabelRequest', LabelRequest );

  const saveResult = await saveThisLogItemAsync( RequestWeb, RequestList, LabelRequest );
  return saveResult;

}