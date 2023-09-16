//  >>>> ADD import additional controls/components

import { IMyView, } from '@mikezimm/fps-library-v2/lib/components/molecules/Provisioning/interfaces/viewTypes';
import { Geq,  } from '@mikezimm/fps-library-v2/lib/components/molecules/Provisioning/interfaces/viewTypes';

//Standard Queries
import { queryValueToday } from '@mikezimm/fps-library-v2/lib/components/molecules/Provisioning/interfaces/viewTypes';

import { createRecentUpdatesView } from '../GENERIC/recentUpdates';

/**
 * For Importing columns, it's best to create one view file per list and only import the columns from that list :
 */

//Imported but not used so that intellisense can prevent duplicate named columns.
import { ootbID, ootbLinkFilename, ootbModified, } from '@mikezimm/fps-library-v2/lib/components/molecules/Provisioning/constants/columnsOOTB';

//Harmonie columns
import { ColumnDoesNotExist } from './columnsErrors';

// export const stdViewFields = [ootbID, EmailCategoriesHarm, EmailFromNameHarm, EmailDateHarm, EmailSubjectHarm, ootbLinkFilename, ];

export const Error1View : IMyView = {
    Title: 'Missing Fields View',
    iFields: 	[ ColumnDoesNotExist ],
  };

export const Error2View : IMyView = {
    Title: 'Missing Order Fields View',
    iFields: 	[ ootbID, ootbLinkFilename, ootbModified, ],
    orders: [ {field: ColumnDoesNotExist, asc: false} ],
  };

export const Error3View : IMyView = {
    Title: 'Missing Group Fields View',
    iFields: 	[ ootbID, ootbLinkFilename, ootbModified, ],
    // orders: [ {field: ColumnDoesNotExist, asc: false} ],
    groups: { 
      collapse: true, limit: 30,
      fields: [
        {field: ColumnDoesNotExist, asc: false},
      ],
    },
  };

export const AllErrorViews : IMyView[] = [
  Error1View,
  Error2View,
  Error3View,
] ;



