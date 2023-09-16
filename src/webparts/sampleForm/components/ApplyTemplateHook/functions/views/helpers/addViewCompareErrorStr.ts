import { IMyView } from '@mikezimm/fps-library-v2/lib/components/molecules/Provisioning/interfaces/viewTypes';
import { getXMLObjectFromString } from '@mikezimm/fps-library-v2/lib/components/atoms/XML/xmlStrings';
import { IMyProgress } from "@mikezimm/fps-library-v2/lib/common/interfaces/fps/IMyInterfaces";
import { addMyProgress } from "../../addMyProgress";

export function addViewCompareErrorStr(v: IMyView, i: number, n: number, statusLog: IMyProgress[], setProgress: (progress: IMyProgress[]) => void): [IMyView, IMyProgress[]] {

  const { viewWhereXML, viewGroupByXML, viewOrderByXML, viewFieldsSchemaString } = v;
  let errMess = '';
  const actualWhere = getXMLObjectFromString(v.actualViewSchema, 'Where', false, true);
  const actualGroupBy = getXMLObjectFromString(v.actualViewSchema, 'GroupBy', false, false);
  const actualOrderBy = getXMLObjectFromString(v.actualViewSchema, 'OrderBy', false, true);
  const actualFields = getXMLObjectFromString(v.actualViewSchema, 'ViewFields', false, true);

  // if ( foundView === true && ( readOnly === true || listExistedB4 === true ) ) {  //Only compare if in read only because if not, it will just over-write, exception is first list which should be the default one.
  if (viewWhereXML !== actualWhere) {
    errMess += '\n\nCurrent Where:\n' + actualWhere + '\n\nExpected Where:\n' + viewWhereXML;
  }

  if (viewGroupByXML !== actualGroupBy) {
    errMess += '\n\nCurrent GroupBy:\n' + actualGroupBy + '\n\nExpected GroupBy:\n' + viewGroupByXML;
  }

  if (viewOrderByXML !== actualOrderBy) {
    errMess += '\n\nCurrent OrderBy:\n' + actualOrderBy + '\n\nExpected OrderBy:\n' + viewOrderByXML;
  }

  if (viewFieldsSchemaString !== actualFields) {
    errMess += '\n\nCurrent Fields:\n' + actualFields + '\n\nExpected Fields:\n' + viewFieldsSchemaString;
  }

  if (errMess === '') {
    // setProgress(false, "V", iV, nV , 'darkgreen', 'CheckMark', v.Title, 'Checked Fields: ' + myList.title, 'View ' + iV + ' of ' + nV + ' : ' + v.Title, 'Compare View ~ 429' );
    statusLog = addMyProgress(statusLog, false, 'View', i, n, 'darkgreen', 'CheckMark', v.Title, `Checked Fields`, 'Checking', `Finished`, setProgress, `Add view ~ 429 `);
  } else {
    // setProgress(false, "E", iV, nV , 'darkorange', 'Warning12', v.Title, 'Unexpected Fields: ' + myList.title, 'View ' + iV + ' of ' + nV + ' : ' + v.Title, 'Compare View ~ 431' + errMess);
    statusLog = addMyProgress(statusLog, false, 'E', i, n, 'darkorange', 'Warning12', v.Title, `Unexpected Fields`, 'Checking', `Error`, setProgress, `Add view ~ 431 ${errMess}`);
  }

  // }
  v.errMess = errMess;
  return [v, statusLog];

}
