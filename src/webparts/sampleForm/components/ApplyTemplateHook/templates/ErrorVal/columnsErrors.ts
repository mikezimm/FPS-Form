
import { DateTimeFieldFormatType, } from "@pnp/sp/fields/types";

import { IMyFieldTypes, ITextField , IMultiLineTextField , IBooleanField , ICalculatedField , IDateTimeField , IChoiceField , IXMLField } from '@mikezimm/fps-library-v2/lib/components/molecules/Provisioning/interfaces/columnTypes';

import { cBool, cCalcT, cChoice, cDate, cMText, cText, cMChoice,  } from '@mikezimm/fps-library-v2/lib/components/molecules/Provisioning/interfaces/columnTypes';
import { getXYearsAsStrings } from "@mikezimm/fps-library-v2/lib/logic/time/yearsArray";
import { IListDefintionErrors } from "../../interfaces/ProvisionTypes";


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

const thisColumnGroup = 'Error Testing';

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

export const ColumnDoesNotExist : ITextField = {
    fieldType: cText,
    name: 'ColumnDoesNotExist',
    maxLength: 255,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: 'Column  should not be on the list',
    }
};

export const InvalidCalcFormula : ICalculatedField = {
  fieldType: cCalcT,
  name: 'BadFormula',
  formula: '=IF(XXXX="","",TEXT((YYYY),"yyyy"))',
  onCreateProps: {
      Group: thisColumnGroup,
      Description: 'Refers to column Title that should not exist:  XXXX and YYYY',
  },
};

// You are trying to Index a MultiChoice column  cMChoice:  Will create column just not index it.
const theseChoices = ["A","B","C",];
export const MChoiceIndexed : IChoiceField = {
    fieldType: cMChoice,
    name: 'InvalidMChoiceIndex',
    choices: theseChoices,
    onCreateProps: {
        Group: thisColumnGroup,
        Description: 'Should cause error because you can not create a Multi-Choice Indexed column. Builds UNIndexed',
        DefaultValue: theseChoices[theseChoices.length-1],
        Indexed: true,
    },
};

export const InvalidXMLNoDisplayName : IXMLField = {
  fieldType: cText,
  name: 'InvalidXMLNoDisplayName',
  xml: `<Field
    DisplayNameX="InvalidXMLNoDisplayName"
    Type="Text"
    Required="FALSE"
    ID="{5698ca57-c864-479d-86e4-360a989796f5}"
    SourceID="{8f5d5da0-0185-4b74-bcf5-dac0ccc9d57f}"
    StaticName="InvalidXMLNoDisplayName"
    Name="InvalidXMLNoDisplayName"
    ColName="nvarchar16"
    RowOrdinal="0"
    Group="${thisColumnGroup}"
    Description="Customer Requirements library"
    Version="1" />`,
  onCreateProps: {
      Group: thisColumnGroup,
      Description: 'Invalid XML:  DisplayNameX is not a valid property of <Field, Type="TTT" is not a valid type, MaxLength="999" is to long',
  }
};

// Creates error:  "One ore more field types are not installed property.  Go to list settings page to delete these fields"
export const InvalidXMLType : IXMLField = {
  fieldType: cText,
  name: 'InvalidXMLType',
  xml: `<Field
    DisplayName="InvalidXMLType"
    Type="TTT"
    Required="FALSE"
    ColName="nvarchar16"
    RowOrdinal="0"
    Group="${thisColumnGroup}"
    Description="Type=TTT"
    Version="1" />`,
  onCreateProps: {
      Group: thisColumnGroup,
      Description: 'Invalid XML:  Type="TTT" is not a valid type,',
  }
};

// NOTE:  It seems like you can actually create a text field longer than 255 this way but it will not let you update it in the UI later without fixing it.
export const InvalidXMLTextToLong : IXMLField = {
  fieldType: cText,
  name: 'InvalidXMLTextToLong',
  xml: `<Field
    DisplayName="InvalidXMLTextToLong"
    Type="Text"
    Required="FALSE"
    ColName="nvarchar16"
    RowOrdinal="0"
    MaxLength="999"
    Group="${thisColumnGroup}"
    Description="MaxLength=999"
    Version="1" />`,
  onCreateProps: {
      Group: thisColumnGroup,
      Description: 'Invalid XML:  MaxLength="999" is to long',
  }
};

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
export function ErrorFields( listName: IListDefintionErrors ): IMyFieldTypes[] {

  /**
   * Known types of errors based on testing:
   * another field has the same ID=
   */
    const theseFields: IMyFieldTypes[] = [];
    theseFields.push( InvalidCalcFormula );  //BOTH
    theseFields.push( MChoiceIndexed );  //BOTH
    theseFields.push( InvalidXMLNoDisplayName );  //BOTH
    theseFields.push( InvalidXMLTextToLong );  //BOTH
    theseFields.push( InvalidXMLType );  //BOTH
    return theseFields;

}


