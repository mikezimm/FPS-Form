
import { IMinSourceFetchProps } from '@mikezimm/fps-library-v2/lib/pnpjs/SourceItems/IMinSourceFetchProps';
import { ISourceProps } from '@mikezimm/fps-library-v2/lib/pnpjs/SourceItems/Interface';
import { ISourceSearch } from '@mikezimm/fps-library-v2/lib/components/molecules/SearchPage/Interfaces/ISourceSearch';
import { IWebpartBannerProps } from '@mikezimm/fps-library-v2/lib/banner/mainReact/IWebpartBannerProps';
import { CommonSuppressKeys, IItemIsAKeys } from '@mikezimm/fps-library-v2/lib/components/molecules/AnyContent/IsA/IFPSItemIsA';
import { IStateSource } from '@mikezimm/fps-library-v2/lib/pnpjs/Common/IStateSource';
import { getSourceItems } from '@mikezimm/fps-library-v2/lib/pnpjs/SourceItems/getSourceItems';
import { createErrorFPSTileItem } from '@mikezimm/fps-library-v2/lib/components/molecules/FPSTiles/functions/Any/createErrorFPSTileItem';
import { addSearchMetaAllV2 } from '@mikezimm/fps-library-v2/lib/components/molecules/SearchPage/functions/addSearchAllV2';

import { FPSLabelRequestCols, RequestList, RequestWeb } from './createLibraryPnpjs';

export const LabelRequestSource: IMinSourceFetchProps = {
  webUrl: RequestWeb,
  listTitle: RequestList,
  fetchCount: null,
  selectThese: FPSLabelRequestCols,
  expandThese: [],
  restFilter: ``,
  orderBy: {
    prop: 'Id',
    order: 'dec',
    asc: false,
  },
}

export async function getLabelRequests( bannerProps: IWebpartBannerProps, sourceProps: ISourceProps, search: ISourceSearch, surpressKeys: IItemIsAKeys[] = CommonSuppressKeys): Promise<IStateSource> {

  let results: IStateSource = await getSourceItems(sourceProps, false, true ) as IStateSource;

  if (results.status !== 'Success') {
    results.itemsY = [ createErrorFPSTileItem( results, null ) ];

  } else {
    // results.itemsY = addSearchMetaAllV2(results.items, sourceProps, search, MAXSearchTypes, .2);


    // results = buildFPSAnyTileItems( results, bannerProps, webPartFPSItem, ) as IStateSource;
    // results = addFPSViewHighlightElements( results, surpressKeys ) as IStateSource;

  }

  return results;

}