//  >>>> ADD import additional controls/components

import { IMyView, } from '@mikezimm/npmfunctions/dist/Lists/viewTypes';
import { Geq,  } from '@mikezimm/npmfunctions/dist/Lists/viewTypes';

import { spliceCopyArray } from '@mikezimm/npmfunctions/dist/Services/Arrays/manipulation';

//Standard Queries
import { queryValueToday } from '@mikezimm/npmfunctions/dist/Lists/viewTypes';

import { createRecentUpdatesView } from '../../../../../services/listServices/viewsGeneric';

/**
 * For Importing columns, it's best to create one view file per list and only import the columns from that list :
 */

//Imported but not used so that intellisense can prevent duplicate named columns.
import { ootbID, ootbTitle, ootbEditor, ootbModified, } from '@mikezimm/npmfunctions/dist/Lists/columnsOOTB';

//Harmonie columns
import {
EmailCategoriesHarm , ProductsALV , ProgramsALV , YearsALV , EmailDateHarm ,
EmailSubjectHarm , EmailFromHarm , EmailReceivedHarm , EmailCcHarm , BccHarm ,
ConversationIndexHarm , ConversationTopicHarm , EmailReferencesHarm , ImportanceHarm , InReplyToHarm ,
MessageIDHarm , OriginalSubjectHarm , ReplyToHarm , EmailToHarm , MailPreviewDataHarm ,
HasAttachmentsHarm , EmailFromNameHarm , EmailFromTxtHarm , EmailMoHarm , EmailYrHarm , EmailYrMoHarm
, FromCompanyHarm

} from './columnsHarmonie';
//let checks = StepChecks(0,5);  // Email

export const stdViewFields = [ootbID, EmailCategoriesHarm, EmailFromNameHarm, EmailDateHarm, EmailSubjectHarm, ootbTitle, ];

export const stdEmailViewFields = ['Edit', ootbID, EmailCategoriesHarm, EmailFromNameHarm, EmailDateHarm, EmailSubjectHarm, ootbTitle, ];
export const  EmailRecentUpdatesFields = spliceCopyArray ( stdEmailViewFields, null, null, 2, [ootbModified, ootbEditor ] );

export const EmailAllItemsView : IMyView = {
    Title: 'All Documents', //'All Items',  --- All Documents is default view for a library
    iFields: 	stdEmailViewFields,
    wheres: 	[ 	{field: ootbModified, clause:'And', 	oper: Geq, 	val: queryValueToday(-730) }, //Recently defined as last 2 years max (for indexing)
            ],
    orders: [ {field: ootbModified, asc: false} ],
};

const EmailByYearViewFields = ['Edit', ootbID, EmailCategoriesHarm, EmailFromNameHarm, EmailDateHarm, EmailSubjectHarm, ootbTitle, ];

export const EmailsByYearView : IMyView = {
    Title: 'Emails by Year',
    iFields: 	EmailByYearViewFields,
    orders: [ {field: EmailDateHarm, asc: false} ],
    groups: { collapse: true, limit: 30,
		fields: [
			{field: EmailYrHarm, asc: false},
		],
	},
};


const allFields = [ootbTitle, EmailCategoriesHarm , ProductsALV , ProgramsALV , YearsALV , EmailDateHarm ,
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
    EmailAllItemsView, createRecentUpdatesView( EmailRecentUpdatesFields),
    EmailsByYearMoView,
    EmailsByYearView,
    EmailsByCompanyView,
    AllFieldsView,

] ;

export const BUHarmonieViews : IMyView[] = [
    EmailAllItemsView, createRecentUpdatesView( EmailRecentUpdatesFields),
    EmailsByYearMoView,
    EmailsByYearView,
    EmailsByProdView,
    EmailsByProgramView,
    EmailsByCompanyView,
    AllFieldsView,

] ;



