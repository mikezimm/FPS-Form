import { doesObjectExistInArray } from '@mikezimm/fps-library-v2/lib/logic/Arrays/searching/objectfind';
import { IMyListInfo } from '@mikezimm/fps-library-v2/lib/components/molecules/Provisioning/interfaces/listTypes';
import { IMyView } from '@mikezimm/fps-library-v2/lib/components/molecules/Provisioning/interfaces/viewTypes';
import { createProgressObject } from "../../addMyProgress";



export function updateViewExists(myList: IMyListInfo, v: IMyView, i: number, n: number, currentViews: any[]): IMyView {

  let foundView = false;
  //Assuming that if I'm creating a column, it's an object with .name value.
  const currentViewIndex = doesObjectExistInArray(currentViews, 'Title', v.Title);
  let actualViewSchema = '';
  if (doesObjectExistInArray(currentViews, 'Title', v.Title)) {
    foundView = true;
    const vIndex: any = currentViewIndex;
    actualViewSchema = currentViews[parseInt(vIndex, 10)].ListViewXml;

  } else {
    foundView = false;
    const err = `The ${myList.title} list does not have this view yet:  ${v.Title}`;
    // statusLog = notify(statusLog, v,  'Checked View', 'create', err, null);
    createProgressObject(true, false, 'E', i, n, 'darkgray', 'CalculatorSubtract', v.Title, 'Checked VIEWS', 'Checked', `Checking`, err);
    // statusLog = addMyProgress( statusLog, false, 'E', iV, nV , 'darkgray', 'CalculatorSubtract', v.Title, 'Checked VIEWS', 'Checked' , `Checking` , setProgress, `Add view ~ 198 ${err}` );
  }
  v.foundView = foundView;
  v.actualViewSchema = actualViewSchema;

  return v;

}
