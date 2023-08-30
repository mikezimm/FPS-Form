import { IJSPostReturn, doSpJsPost } from "./doSpJsPost";

import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";


export interface IFPSCreateLibraryPost {
  '__metadata': {
    'type': 'SP.List' // The type of the list.
  };
  BaseTemplate: number; // The base template for the list (101 for a document library).
  Title: string; // The title of the list.
  Description: string; // The description of the list.
  AllowContentTypes: boolean; // A boolean indicating whether content types are allowed in the list.
  ContentTypesEnabled: boolean; // A boolean indicating whether content types are enabled in the list.
  RootFolder: {
    '__metadata': {
      'type': 'SP.Folder' // The type of the folder.
    };
    ServerRelativeUrl: string; // The server-relative URL of the root folder.
  };
}

export interface IFPSRequestInit {
  method?: string; // The HTTP method to use for the request (e.g. GET, POST, PUT).
  headers?: Headers | string[][] | Record<string, string>; // The headers to include in the request.
  body?: IFPSCreateLibraryPost; // The body of the request.
  referrer?: string; // The referrer of the request.
  referrerPolicy?: ReferrerPolicy; // The referrer policy to use for the request.
  mode?: RequestMode; // The mode of the request (e.g. cors, no-cors, same-origin).
  credentials?: RequestCredentials; // The credentials to include in the request (e.g. omit, same-origin, include).
  cache?: RequestCache; // The cache mode to use for the request (e.g. default, no-store, reload).
  redirect?: RequestRedirect; // The redirect mode to use for the request (e.g. follow, error, manual).
  integrity?: string; // The integrity metadata to include in the request.
  keepalive?: boolean; // A boolean indicating whether or not to keep the connection alive.
  signal?: AbortSignal | null; // An optional signal object that can be used to abort the request.
}

export async function createFPSLibrary(siteUrl: string, libraryTitle: string, libraryUrl: string, requestDigest: any ): Promise<IJSPostReturn> {
  const endpointUrl = `${siteUrl}/_api/web/lists`;
  const body: IFPSCreateLibraryPost = {
    '__metadata': {
      'type': 'SP.List'
    },
    'BaseTemplate': 101,
    'Title': libraryTitle,
    'Description': '',
    'AllowContentTypes': true,
    'ContentTypesEnabled': true,
    'RootFolder': {
      '__metadata': {
        'type': 'SP.Folder'
      },
      'ServerRelativeUrl': libraryUrl
    }
  };

  const result: IJSPostReturn = await doSpJsPost( endpointUrl, body, requestDigest );

  return result;

}