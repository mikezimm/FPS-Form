
import { IMinSourceFetchProps } from '@mikezimm/fps-library-v2/lib/pnpjs/SourceItems/IMinSourceFetchProps';
import { ISourceProps } from '@mikezimm/fps-library-v2/lib/pnpjs/SourceItems/Interface';
import { ISourceSearch } from '@mikezimm/fps-library-v2/lib/components/molecules/SearchPage/Interfaces/ISourceSearch';
import { IWebpartBannerProps } from '@mikezimm/fps-library-v2/lib/banner/mainReact/IWebpartBannerProps';
import { CommonSuppressKeys, IItemIsAKeys } from '@mikezimm/fps-library-v2/lib/components/molecules/AnyContent/IsA/IFPSItemIsA';
import { IStateSource } from '@mikezimm/fps-library-v2/lib/pnpjs/Common/IStateSource';
import { getSourceItems } from '@mikezimm/fps-library-v2/lib/pnpjs/SourceItems/getSourceItems';
import { getExpandColumns } from '@mikezimm/fps-library-v2/lib/pnpjs/Lists/getVX/getExpandV2';
import { createErrorFPSTileItem } from '@mikezimm/fps-library-v2/lib/components/molecules/FPSTiles/functions/Any/createErrorFPSTileItem';
import { addSearchMeta1 } from '@mikezimm/fps-library-v2/lib/components/molecules/SearchPage/functions/addSearchMeta1';
import { filterObjArrayByUniqueKey } from '@mikezimm/fps-library-v2/lib/logic/Arrays/searching/filterObjArrayByUniqueKey';

import { FPSLabelRequestCols, RequestList, RequestWeb } from "./requestLabel";
import { addMineSiteMeta } from './addMineSiteMeta';
import { ICorpLabelsSource } from '../../../storedSecrets/AS303 Labels v3 - JSON Formatted';
import { IAnySourceItemAny } from '@mikezimm/fps-library-v2/lib/components/molecules/AnyContent/IAnyContent';

export const LabelRequestSource: ISourceProps = {
  fpsContentType: [ 'item' ],
  key: 'any',
  defType: 'item',
  webRelativeLink: `/lists/${RequestList}`,
  searchSource: 'any',
  searchSourceDesc: 'any',
  defSearchButtons: [ 'Mine', 'ThisSite' ],
  webUrl: RequestWeb,
  listTitle: RequestList,
  fetchCount: null,
  columns: FPSLabelRequestCols,
  selectThese: FPSLabelRequestCols,
  searchProps: FPSLabelRequestCols,
  expandThese: getExpandColumns( FPSLabelRequestCols, ),
  restFilter: ``,
  orderBy: {
    prop: 'Id',
    order: 'dec',
    asc: false,
  },
}

export async function fetchMinimalLabelRequests( bannerProps: IWebpartBannerProps, search: ISourceSearch, surpressKeys: IItemIsAKeys[] = CommonSuppressKeys): Promise<IStateSource[]> {


  const [ users, sites ] = await Promise.all([
    await fetchLabelRequests( bannerProps, { ...LabelRequestSource, ...{ restFilter: `Author/Title eq '${bannerProps.FPSUser.Title}'`}, } as ISourceProps, search, surpressKeys ),
    await fetchLabelRequests( bannerProps, { ...LabelRequestSource, ...{ restFilter: `SiteUrl eq '${bannerProps.context.pageContext.site.serverRelativeUrl}'`}} as ISourceProps, search, surpressKeys ),
  ]);

  const results = JSON.parse(JSON.stringify( users ));

  if (results.status !== 'Success') {
    results.itemsY = [ createErrorFPSTileItem( results, null ) ];

  } else {
    results.items = filterObjArrayByUniqueKey( [ ...users.items, ...sites.items ], 'Id'  );

    // Get unique values
    results.meta1 = [ ...users.meta1, ...sites.meta1 ].filter((v,i,a)=>a.indexOf(v)===i);

    results.itemsY = results.items;

  }

  return [ users, sites, results ];

}


export async function fetchLabelRequests( bannerProps: IWebpartBannerProps, sourceProps: ISourceProps, search: ISourceSearch, surpressKeys: IItemIsAKeys[] = CommonSuppressKeys): Promise<IStateSource> {

  let results: IStateSource = await getSourceItems(sourceProps, false, true ) as IStateSource;

  if (results.status !== 'Success') {
    results.itemsY = [ createErrorFPSTileItem( results, null ) ];

  } else {

    results.items = addSearchMeta1(results.items, sourceProps, search);
    results = addMineSiteMeta( ['Author/Title'], ['SiteUrl'] ,results,  );
    results.items.map( ( item :  IAnySourceItemAny ) => {
      if ( results.meta1.indexOf( item.Status ) < 0 ) results.meta1.push( item.Status );
    });

    // const Labels: string[] = [];
    // results.items.map( ( item :  IAnySourceItemAny ) => {
    //   if ( Labels.indexOf( item.Label ) < 0 ) results.meta1.push( item.Label );
    // });

    // results.meta1.push( ...Labels );

  }

  return results;

}