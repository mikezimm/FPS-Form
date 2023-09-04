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
import {
  EmailCategoriesHarm , ProductsALV , ProgramsALV , YearsALV , EmailDateHarm ,
  EmailSubjectHarm , EmailFromHarm , EmailReceivedHarm , EmailCcHarm , BccHarm ,
  ConversationIndexHarm , ConversationTopicHarm , EmailReferencesHarm , ImportanceHarm , InReplyToHarm ,
  MessageIDHarm , OriginalSubjectHarm , ReplyToHarm , EmailToHarm , MailPreviewDataHarm ,
  HasAttachmentsHarm , EmailFromNameHarm , EmailFromTxtHarm , EmailMoHarm , EmailYrHarm , EmailYrMoHarm
  , FromCompanyHarm
} from './columnsHarmonie';

// export const stdViewFields = [ootbID, EmailCategoriesHarm, EmailFromNameHarm, EmailDateHarm, EmailSubjectHarm, ootbLinkFilename, ];

export const stdEmailViewFields = [ EmailCategoriesHarm, EmailFromNameHarm, EmailDateHarm, EmailSubjectHarm, ootbLinkFilename, ];

export const EmailAllItemsView : IMyView = {
    Title: 'All Documents', //'All Items',  --- All Documents is default view for a library
    iFields: 	[ ootbID, ...stdEmailViewFields ],
    wheres: 	[ 	{field: ootbModified, clause:'And', 	oper: Geq, 	val: queryValueToday(-730) }, //Recently defined as last 2 years max (for indexing)
            ],
    orders: [ {field: ootbModified, asc: false} ],
};

const EmailByYearViewFields = [ EmailCategoriesHarm, EmailFromNameHarm, EmailDateHarm, EmailSubjectHarm, ootbLinkFilename, ];

export const EmailsByYearView : IMyView = {
    Title: 'Emails by Year',
    iFields: 	[ ootbID, ...EmailByYearViewFields ],
    orders: [ {field: EmailDateHarm, asc: false} ],
    groups: { collapse: true, limit: 30,
		fields: [
			{field: EmailYrHarm, asc: false},
		],
	},
};


const allFields = [ ootbLinkFilename, EmailCategoriesHarm , ProductsALV , ProgramsALV , YearsALV , EmailDateHarm ,
    EmailSubjectHarm , EmailFromHarm , EmailReceivedHarm , EmailCcHarm , BccHarm ,
    ConversationIndexHarm , ConversationTopicHarm , EmailReferencesHarm , ImportanceHarm , InReplyToHarm ,
    MessageIDHarm , OriginalSubjectHarm , ReplyToHarm , EmailToHarm , MailPreviewDataHarm ,
    HasAttachmentsHarm , EmailFromNameHarm , EmailFromTxtHarm , EmailMoHarm , EmailYrHarm , EmailYrMoHarm
    , FromCompanyHarm];

export const AllFieldsView : IMyView = {
    Title: 'zTest - All Fields',
    iFields: 	allFields,
    orders: [ {field: EmailDateHarm, asc: false} ],
    groups: { collapse: true, limit: 30,
		fields: [
			{field: EmailFromHarm, asc: false},
		],
	},
};

export const EmailsByYearMoView : IMyView = {
    Title: 'Emails by Year Month',
    iFields: 	EmailByYearViewFields,
    orders: [ {field: EmailDateHarm, asc: false} ],
    groups: { collapse: true, limit: 30,
		fields: [
			{field: EmailYrMoHarm, asc: false},
		],
	},
};

export const EmailsByProdView : IMyView = {
    Title: 'Emails By Product',
    iFields: 	EmailByYearViewFields,
    orders: [ {field: EmailDateHarm, asc: false} ],
    groups: { collapse: true, limit: 30,
		fields: [
			{field: ProductsALV, asc: false},
		],
	},
};

export const EmailsByCompanyView : IMyView = {
    Title: 'Emails By Company',
    iFields: 	EmailByYearViewFields,
    orders: [ {field: EmailDateHarm, asc: false} ],
    groups: { collapse: true, limit: 30,
		fields: [
			{field: FromCompanyHarm, asc: false},
		],
	},
};

export const EmailsByProgramView : IMyView = {
    Title: 'Emails By Program',
    iFields: 	EmailByYearViewFields,
    orders: [ {field: EmailDateHarm, asc: false} ],
    groups: { collapse: true, limit: 30,
		fields: [
			{field: ProgramsALV, asc: false},
		],
	},
};

export const HarmonieViews : IMyView[] = [
    EmailAllItemsView, 
    createRecentUpdatesView( stdEmailViewFields, ),
    EmailsByYearMoView,
    EmailsByYearView,
    EmailsByCompanyView,
    AllFieldsView,
] ;

export const BUHarmonieViews : IMyView[] = [
    EmailAllItemsView, 
    createRecentUpdatesView( stdEmailViewFields),
    EmailsByYearMoView,
    EmailsByYearView,
    EmailsByProdView,
    EmailsByProgramView,
    EmailsByCompanyView,
    AllFieldsView,
] ;



