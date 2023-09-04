
import { IMyFieldTypes, } from '@mikezimm/fps-library-v2/lib/components/molecules/Provisioning/interfaces/columnTypes';
import { IMyView,Geq, } from '@mikezimm/fps-library-v2/lib/components/molecules/Provisioning/interfaces/viewTypes';
import { queryValueToday } from '@mikezimm/fps-library-v2/lib/components/molecules/Provisioning/interfaces/viewTypes';

/**
 * For Importing columns, it's best to create one view file per list and only import the columns from that list :
 */

import { ootbID, ootbVersion, ootbTitle, ootbModified, } from '@mikezimm/fps-library-v2/lib/components/molecules/Provisioning/constants/columnsOOTB';

import { AllRecentUpdatesViewColumns } from '@mikezimm/fps-library-v2/lib/components/molecules/Provisioning/constants/columnsOOTB';

// This was moved to '@mikezimm/fps-library-v2/lib/components/molecules/Provisioning/interfaces/columnTypes';
export type IMyFieldDefStringOrDef = string | IMyFieldTypes;

export function createRecentUpdatesView( viewFields: IMyFieldDefStringOrDef[], prevXDays: number = -730 ): IMyView {
  const result : IMyView = {
    Title: 'Recent Updates',
    iFields: [ ootbID , ootbTitle, ...AllRecentUpdatesViewColumns, ...viewFields, ootbVersion ],
    TabularView: true,
    RowLimit: 30,
    wheres: 	[ 	{field: ootbModified, clause:'And', 	oper: Geq, 	val: queryValueToday( prevXDays ) },
                ],
    orders: [ {field: ootbModified, asc: false} ],
  };
  return result;
}


