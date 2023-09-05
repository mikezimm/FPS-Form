
import { IMyFieldTypes, ITextField , IMultiLineTextField , IBooleanField , ICalculatedField , IDateTimeField , IChoiceField , } from '@mikezimm/fps-library-v2/lib/components/molecules/Provisioning/interfaces/columnTypes';

import { cBool, cCalcT, cChoice, cDate, cMText, cText, } from '@mikezimm/fps-library-v2/lib/components/molecules/Provisioning/interfaces/columnTypes';

/***
 *    d88888b db    db  .d8b.  .88b  d88. d8888b. db      d88888b       .o88b.  .d88b.  db      db    db .88b  d88. d8b   db .d8888.
 *    88'     `8b  d8' d8' `8b 88'YbdP`88 88  `8D 88      88'          d8P  Y8 .8P  Y8. 88      88    88 88'YbdP`88 888o  88 88'  YP
 *    88ooooo  `8bd8'  88ooo88 88  88  88 88oodD' 88      88ooooo      8P      88    88 88      88    88 88  88  88 88V8o 88 `8bo.
 *    88~~~~~  .dPYb.  88~~~88 88  88  88 88~~~   88      88~~~~~      8b      88    88 88      88    88 88  88  88 88 V8o88   `Y8b.
 *    88.     .8P  Y8. 88   88 88  88  88 88      88booo. 88.          Y8b  d8 `8b  d8' 88booo. 88b  d88 88  88  88 88  V888 db   8D
 *    Y88888P YP    YP YP   YP YP  YP  YP 88      Y88888P Y88888P       `Y88P'  `Y88P'  Y88888P ~Y8888P' YP  YP  YP VP   V8P `8888Y'
 *
 *
 */
const ExampleColumnGroup: string = 'Example Column Group';
export const example : ITextField = {
  fieldType: cText,
  name: 'xyz',
  title: 'xyz Title visible',
  maxLength: 255,
  onCreateProps: {
      Group: ExampleColumnGroup,
      Description: 'To be used by webpart to email this address for every entry.  Not yet used.',
  },
  onCreateChanges: {
      //Hidden: true,
      Title: 'xyz Title Updated on Create',
  },
  showNew: true,
  showEdit: true,
  showDisplay: false,
  changes1: { Title: 'xyz Title changes1' },  //Properties you want changed any time in your code
  changes2: { Title: 'xyz Title changes2' },  //Properties you want changed any time in your code
  changes3: { Title: 'xyz Title changes3' },  //Properties you want changed any time in your code
  changesFinal: { Title: 'xyz Title changesFinal' },  //Properties you want changed at the very end... like hiding fields once formula columns are created and views are also created (can't add to view if it's hidden)

  //showDisplay: false,
};