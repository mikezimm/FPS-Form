
import { DateTimeFieldFormatType, } from "@pnp/sp/fields/types";

import { IMyFieldTypes, ITextField , IMultiLineTextField , IBooleanField , ICalculatedField , IDateTimeField , IChoiceField , } from '@mikezimm/fps-library-v2/lib/components/molecules/Provisioning/interfaces/columnTypes';

import { cBool, cCalcT, cChoice, cDate, cMText, cText, } from '@mikezimm/fps-library-v2/lib/components/molecules/Provisioning/interfaces/columnTypes';
import { getXYearsAsStrings } from "@mikezimm/fps-library-v2/lib/logic/time/yearsArray";


/***
 *     .d8b.  d8888b. d8888b.       d888b  d8888b.  .d88b.  db    db d8888b.      d8b   db  .d8b.  .88b  d88. d88888b
 *    d8' `8b 88  `8D 88  `8D      88' Y8b 88  `8D .8P  Y8. 88    88 88  `8D      888o  88 d8' `8b 88'YbdP`88 88'
 *    88ooo88 88   88 88   88      88      88oobY' 88    88 88    88 88oodD'      88V8o 88 88ooo88 88  88  88 88ooooo
 *    88~~~88 88   88 88   88      88  ooo 88`8b   88    88 88    88 88~~~        88 V8o88 88~~~88 88  88  88 88~~~~~
 *    88   88 88  .8D 88  .8D      88. ~8~ 88 `88. `8b  d8' 88b  d88 88           88  V888 88   88 88  88  88 88.
 *    YP   YP Y8888D' Y8888D'       Y888P  88   YD  `Y88P'  ~Y8888P' 88           VP   V8P YP   YP YP  YP  YP Y88888P
 *
 *
 */

const thisColumnGroup = 'Harmon.ie Emails';

/***
 *    d8888b. d88888b  .d8b.  db            .o88b.  .d88b.  db      db    db .88b  d88. d8b   db .d8888.
 *    88  `8D 88'     d8' `8b 88           d8P  Y8 .8P  Y8. 88      88    88 88'YbdP`88 888o  88 88'  YP
 *    88oobY' 88ooooo 88ooo88 88           8P      88    88 88      88    88 88  88  88 88V8o 88 `8bo.
 *    88`8b   88~~~~~ 88~~~88 88           8b      88    88 88      88    88 88  88  88 88 V8o88   `Y8b.
 *    88 `88. 88.     88   88 88booo.      Y8b  d8 `8b  d8' 88booo. 88b  d88 88  88  88 88  V888 db   8D
 *    88   YD Y88888P YP   YP Y88888P       `Y88P'  `Y88P'  Y88888P ~Y8888P' YP  YP  YP VP   V8P `8888Y'
 *
 *
 */


export const BccHarm : IMultiLineTextField = {
    fieldType: cMText,
    name: 'Bcc',
    //title: string,
    numberOfLines: 6,
    richText: false,
    restrictedMode: false,
    appendOnly: false,
    allowHyperlink: false,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: 'Mapped according to Harmon.ie',
//        Hidden: true,
    }
};

export const ConversationIndexHarm : ITextField = {
    fieldType: cText,
    name: 'ConversationIndex', // 'Conversation%5Fx002d%5FIndex'
    maxLength: 255,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: 'Mapped according to Harmon.ie',
    }
};

export const ConversationTopicHarm	 : ITextField = {
    fieldType: cText,
    name: 'ConversationTopic', // 'Conversation_x002d_Topic'
    maxLength: 255,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: 'Mapped according to Harmon.ie',
    }
};

const theseChoices = ["Customer","Quality","Launch","DV","PV","Other"];
export const EmailCategoriesHarm : IChoiceField = {
    fieldType: cChoice,
    name: 'EmailCategories',
    choices: theseChoices,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: 'Mapped according to Harmon.ie',
        DefaultValue: theseChoices[theseChoices.length-1],
        Indexed: true,
    },
//    onCreateChanges: {
//        Title: 'Status',
//    }
};

export const EmailCcHarm : IMultiLineTextField = {
    fieldType: cMText,
    name: 'EmailCc',
    //title: string,
    numberOfLines: 6,
    richText: false,
    restrictedMode: false,
    appendOnly: false,
    allowHyperlink: false,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: 'Mapped according to Harmon.ie',
//        Hidden: true,
    }
};

export const EmailDateHarm : IDateTimeField = {
    fieldType: cDate,
    name: 'EmailDate',
    displayFormat:  DateTimeFieldFormatType.DateTime,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: 'Mapped according to Harmon.ie',
        Indexed: false,
        Required: false,
    },
};

export const EmailFromHarm : ITextField = {
    fieldType: cText,
    name: 'EmailFrom',
    maxLength: 255,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: 'Mapped according to Harmon.ie',
    }
};

export const EmailReceivedHarm : ITextField = {
    fieldType: cText,
    name: 'EmailReceived',
    maxLength: 255,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: 'Mapped according to Harmon.ie',
    }
};

export const EmailReferencesHarm : ITextField = {
    fieldType: cText,
    name: 'EmailReferences',
    maxLength: 255,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: 'Mapped according to Harmon.ie',
    }
};

export const EmailSubjectHarm : ITextField = {
    fieldType: cText,
    name: 'EmailSubject',
    maxLength: 255,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: 'Mapped according to Harmon.ie',
    }
};

export const ImportanceHarm : ITextField = {
    fieldType: cText,
    name: 'Importance',
    maxLength: 255,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: 'Mapped according to Harmon.ie',
    }
};

export const InReplyToHarm : ITextField = {
    fieldType: cText,
    name: 'InReplyTo', //In%5Fx002d%5FReply%5Fx002d%5FTo
    maxLength: 255,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: 'Mapped according to Harmon.ie',
    }
};

export const MessageIDHarm : ITextField = {
    fieldType: cText,
    name: 'MessageID', // Message_x002d_ID
    maxLength: 255,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: 'Mapped according to Harmon.ie',
    }
};

export const OriginalSubjectHarm : ITextField = {
    fieldType: cText,
    name: 'OriginalSubject',
    maxLength: 255,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: 'Mapped according to Harmon.ie',
    }
};

// Removedd because it was getting re-provisioned every time.
// export const ReplyToHarm : ITextField = {
//     fieldType: cText,
//     name: 'Reply-To',
//     maxLength: 255,
//     onCreateProps: {
//         Group: thisColumnGroup,
//         Description: 'Mapped according to Harmon.ie',
//     }
// };

export const EmailToHarm : IMultiLineTextField = {
    fieldType: cMText,
    name: 'EmailTo',
    //title: string,
    numberOfLines: 6,
    richText: false,
    restrictedMode: false,
    appendOnly: false,
    allowHyperlink: false,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: 'Mapped according to Harmon.ie',
//        Hidden: true,
    }
};

export const MailPreviewDataHarm : IMultiLineTextField = {
    fieldType: cMText,
    name: 'MailPreviewData',
    //title: string,
    numberOfLines: 6,
    richText: false,
    restrictedMode: false,
    appendOnly: false,
    allowHyperlink: false,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: 'Mapped according to Harmon.ie',
//        Hidden: true,
    }
};

export const HasAttachmentsHarm : IBooleanField = {
    fieldType: cBool,
    name: 'HasAttachments',
    onCreateProps: {
        Group: thisColumnGroup,
        Description: 'Mapped according to Harmon.ie',
    }
};

export const EmailFromNameHarm : ICalculatedField = {
    fieldType: cCalcT,
    name: 'EmailFromName',
    formula: '=IF(ISNUMBER(FIND(" <",EmailFrom)),LEFT(EmailFrom,FIND(" <",EmailFrom)),"-")',
    onCreateProps: {
        Group: thisColumnGroup,
        Description: 'Mapped according to Harmon.ie',
    },
};

export const EmailFromTxtHarm : ICalculatedField = {
    fieldType: cCalcT,
    name: 'EmailFromTxt',
    formula: '=IF(ISNUMBER(FIND("<",EmailFrom)),RIGHT(EmailFrom,1+LEN(EmailFrom)-FIND("<",EmailFrom)),"-")',
    onCreateProps: {
        Group: thisColumnGroup,
        Description: 'Mapped according to Harmon.ie',
    },
};

export const EmailMoHarm : ICalculatedField = {
    fieldType: cCalcT,
    name: 'EmailMo',
    formula: '=IF(EmailDate="","",TEXT((EmailDate),"mm"))',
    onCreateProps: {
        Group: thisColumnGroup,
        Description: 'Mapped according to Harmon.ie',
    },
};

export const EmailYrHarm : ICalculatedField = {
    fieldType: cCalcT,
    name: 'EmailYr',
    formula: '=IF(EmailDate="","",TEXT((EmailDate),"yyyy"))',
    onCreateProps: {
        Group: thisColumnGroup,
        Description: 'Mapped according to Harmon.ie',
    },
};

export const EmailYrMoHarm : ICalculatedField = {
    fieldType: cCalcT,
    name: 'EmailYrMo',
    formula: '=IF(EmailDate="","",TEXT(EmailDate,"yyyy")&"-"&TEXT(EmailDate,"mm"))',
    onCreateProps: {
        Group: thisColumnGroup,
        Description: 'Mapped according to Harmon.ie',
    },
};

const thesePRODChoices = ["AB","SB","SW","Other"];
export const ProductsALV : IChoiceField = {
    fieldType: cChoice,
    name: 'Products',
    choices: thesePRODChoices,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: 'Generic Products',
        DefaultValue: theseChoices[theseChoices.length-1],
        Indexed: true,
    },
//    onCreateChanges: {
//        Title: 'Status',
//    }
};

const thesePROGChoices = ["GM","VW","Ford","Honda","FCA","Other"];
export const ProgramsALV : IChoiceField = {
    fieldType: cChoice,
    name: 'Programs',
    choices: thesePROGChoices,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: 'Generic Programs',
        DefaultValue: theseChoices[theseChoices.length-1],
        Indexed: true,
    },
//    onCreateChanges: {
//        Title: 'Status',
//    }
};


const theseYEARChoices = getXYearsAsStrings( 10, -1, 'next' );

export const YearsALV : IChoiceField = {
    fieldType: cChoice,
    name: 'Years',
    choices: theseYEARChoices,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: 'Mapped according to Harmon.ie',
        DefaultValue: theseChoices[theseChoices.length-1],
        Indexed: true,
    },
//    onCreateChanges: {
//        Title: 'Status',
//    }
};


export const FromCompanyHarm : ICalculatedField = {
    fieldType: cCalcT,
    name: 'FromCompany',
    formula: '=IF(ISNUMBER(FIND("@autoliv",EmailFrom)),"ALV",IF(ISNUMBER(FIND("@gm",EmailFrom)),"GM","Other"))',
    onCreateProps: {
        Group: thisColumnGroup,
        Description: 'Determine Email domain from address. Update formula to define your own companies',
    },
};


/***
 *    d88888b db    db d8888b.  .d88b.  d8888b. d888888b
 *    88'     `8b  d8' 88  `8D .8P  Y8. 88  `8D `~~88~~'
 *    88ooooo  `8bd8'  88oodD' 88    88 88oobY'    88
 *    88~~~~~  .dPYb.  88~~~   88    88 88`8b      88
 *    88.     .8P  Y8. 88      `8b  d8' 88 `88.    88
 *    Y88888P YP    YP 88       `Y88P'  88   YD    YP
 *
 *
 */
/***
 *     .o88b.  .d88b.  db      db    db .88b  d88. d8b   db       .d8b.  d8888b. d8888b.  .d8b.  db    db .d8888.
 *    d8P  Y8 .8P  Y8. 88      88    88 88'YbdP`88 888o  88      d8' `8b 88  `8D 88  `8D d8' `8b `8b  d8' 88'  YP
 *    8P      88    88 88      88    88 88  88  88 88V8o 88      88ooo88 88oobY' 88oobY' 88ooo88  `8bd8'  `8bo.
 *    8b      88    88 88      88    88 88  88  88 88 V8o88      88~~~88 88`8b   88`8b   88~~~88    88      `Y8b.
 *    Y8b  d8 `8b  d8' 88booo. 88b  d88 88  88  88 88  V888      88   88 88 `88. 88 `88. 88   88    88    db   8D
 *     `Y88P'  `Y88P'  Y88888P ~Y8888P' YP  YP  YP VP   V8P      YP   YP 88   YD 88   YD YP   YP    YP    `8888Y'
 *
 * 
 */

/**
 * FIND THE Official list of mappable columns here:  https://harmon.ie/kb/map-email-headers-sharepoint-metadata
 * @param listName 
 * @returns 
 */
export function HarmonieFields( listName: 'Emails' | 'BUEmails' ): IMyFieldTypes[] {

    const theseFields: IMyFieldTypes[] = [];
    theseFields.push(EmailCategoriesHarm);  //BOTH

    if (listName === 'BUEmails' ) { theseFields.push(ProductsALV); }  //BOTH
    if (listName === 'BUEmails' ) { theseFields.push(ProgramsALV); }  //BOTH
    if (listName === 'BUEmails' ) { theseFields.push(YearsALV); }  //BOTH

    theseFields.push(EmailDateHarm);  //BOTH
    theseFields.push(EmailSubjectHarm);  //BOTH
    theseFields.push(EmailFromHarm);  //BOTH
    theseFields.push(EmailReceivedHarm);  //BOTH
    theseFields.push(EmailCcHarm);  //BOTH
    theseFields.push(BccHarm);  //BOTH
    theseFields.push(ConversationIndexHarm);  //BOTH
    theseFields.push(ConversationTopicHarm);  //BOTH
    theseFields.push(EmailReferencesHarm);  //BOTH
    theseFields.push(ImportanceHarm);  //BOTH
    theseFields.push(InReplyToHarm);  //BOTH
    theseFields.push(MessageIDHarm);  //BOTH
    theseFields.push(OriginalSubjectHarm);  //BOTH
    // theseFields.push(ReplyToHarm);  //BOTH
    theseFields.push(EmailToHarm);  //BOTH
    theseFields.push(MailPreviewDataHarm);  //BOTH
    theseFields.push(HasAttachmentsHarm);  //BOTH
    theseFields.push(EmailFromNameHarm);  //BOTH
    theseFields.push(EmailFromTxtHarm);  //BOTH
    theseFields.push(EmailMoHarm);  //BOTH
    theseFields.push(EmailYrHarm);  //BOTH
    theseFields.push(EmailYrMoHarm);  //BOTH
    theseFields.push(FromCompanyHarm);  //BOTH

    return theseFields;

}


