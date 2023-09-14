
// import { check4This } from "@mikezimm/fps-pnp2/lib/services/sp/CheckSearch";
// import { IFPSResultStatus } from "@mikezimm/fps-pnp2/lib/services/sp/IFPSResultStatus";
// import { IFpsErrorObject } from "../../../pnpjs/Common/IFpsErrorObject";
// import { IFPSSearchAPIResultsData } from "./IFPSSearchAPIResultsData";

import { check4This } from "@mikezimm/fps-pnp2/lib/services/sp/CheckSearch";
import { IFPSResultStatus } from "@mikezimm/fps-pnp2/lib/services/sp/IFPSResultStatus";
import { IFpsErrorObject } from "@mikezimm/fps-library-v2/lib/pnpjs/Common/IFpsErrorObject";
import { IFPSSearchAPIResultsData } from "@mikezimm/fps-library-v2/lib/components/molecules/SpHttp/IFPSSearchAPIResultsData";

export interface IJSPostReturn extends IFpsErrorObject {
  status: IFPSResultStatus;
  ok: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  e: any;
  rawPostResults?: IFPSSearchAPIResultsData;
  postAPI: string;
}

export function createEmptyPostReturn( postAPI: string ): IJSPostReturn {
  const emptyObject: IJSPostReturn = {
    items: [],
    ok: null,
    e: null,
    status: 'Unknown',
    postAPI: postAPI,
  }
 return emptyObject;
}

/**
 * Pass in any SharePoint rest api url and it should return a result or a standard error return object
 * @param postAPI 
 * @returns 
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function doSpJsPost(postAPI: string, body: any, requestDigest: any ): Promise<IJSPostReturn> {

  const results: IJSPostReturn = createEmptyPostReturn( postAPI );

  try {
    const response = await fetch(postAPI, {
      method: 'POST',
      headers: {
        Accept: "application/json;odata=nometadata",
        'Content-Type': 'application/json;odata=verbose',
        'X-RequestDigest': requestDigest,
      },
      body: JSON.stringify( body ),
    });

    // check if the response is OK
    if (response.ok) {
      const data = await response.json();

      results.rawPostResults = data;
      console.log( 'Raw Post Results: ', data );

      // const deepPropValue = usesSearch === true ? checkDeepProperty( data, [ 'PrimaryQueryResult', 'RelevantResults', 'Table', 'Rows'], 'Actual' ) : undefined;
      // // added logic to solve this:  https://github.com/mikezimm/pivottiles7/issues/292
      // if ( deepPropValue !== undefined && deepPropValue !== null ) {
      //   results.items = data.PrimaryQueryResult.RelevantResults.Table.Rows;
      // } else {
      //   if ( usesSearch === true && data.ElapsedTime && !data.PrimaryQueryResult ) {
      //     // Seems like query did not fail, so do nothing because array of items is already [].
      //     // This is what happened when using fetchMySubsites and not having any subsites to return.
      //   } else {
      //     results.items = data.value ? data.value : data;
      //   }
      // }
      results.ok = true;
      results.statusText = response.statusText;
      results.statusNo = response.status;
      results.status = 'Success';
      if ( check4This( 'fpsShowPostResults=true' ) === true ) console.log( `fps-library-v2 Success: doSpJsPost ~ 34 results`, results );

    } else {
      // throw an error with the status code and message
      // throw new Error(`${response.status}: ${response.statusText}`);
      results.ok = response.ok;
      results.statusText = response.statusText;
      results.statusNo = response.status;
      results.status = 'Error';
      if ( check4This( 'fpsShowPostResults=true' ) === true ) console.log( `fps-library-v2 Api Error: doSpJsPost ~ 42 results`, results );

    }

    return results;

  } catch (e) {

    if ( check4This( 'fpsShowPostResults=true' ) === true ) console.log( `fps-library-v2 Logic Error: doSpJsPost ~ 50 postAPI`, postAPI );
    results.ok = false;
    results.statusText = `Error TryCatch`;
    results.statusNo = 667;
    results.status = 'Error';

    return results;
  }

}

