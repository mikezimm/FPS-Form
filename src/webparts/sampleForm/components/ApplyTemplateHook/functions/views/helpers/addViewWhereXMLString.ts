import { IMyView } from '@mikezimm/fps-library-v2/lib/components/molecules/Provisioning/interfaces/viewTypes';
import { IMyProgress } from "@mikezimm/fps-library-v2/lib/common/interfaces/fps/IMyInterfaces";
import { addMyProgress } from "../../addMyProgress";
import { buildFieldWhereTag } from './buildFieldWhereTag';


export function addViewWhereXMLString(v: IMyView, i: number, n: number, statusLog: IMyProgress[], setProgress: (progress: IMyProgress[]) => void): [IMyView, IMyProgress[]] {

  let viewWhereXML = '';
  if (v.wheres != null && v.wheres.length > 0) {

    //Get array of where items
    const viewWhereArray = v.wheres.map(thisWhere => {
      return buildFieldWhereTag(thisWhere);

    });
    //console.log('viewWhereArray', viewWhereArray);
    //Go through each item and add the <Or> or <And> Tags around them
    let hasPreviousAnd = false;
    let previousAnd = '';

    // for (let i in viewWhereArray ) {
    // 2023-09-15:  Changed ( where, i ) to ( thisFieldWhere, i ) because it should be cleaner.
    viewWhereArray.map((thisFieldWhere, i) => {

      const thisClause = i === 0 ? '' : v.wheres[i].clause;
      // const thisFieldWhere = viewWhereArray[i];
      if (viewWhereArray.length === 0) {
        //You need to have something in here for it to work.
        const err = `Field was skipped because there wasn't a valid 'Where' : ' ${v.wheres[i].field}`;
        alert(err);
        // alert('Field was skipped because there wasn\'t a valid \'Where\' : ' + v.wheres[i].field );
        // setProgress(false, "E", iV, nV , 'darkred', 'ErrorBadge', v.Title, 'Invalid Where: ' + myList.title, 'View ' + iV + ' of ' + nV + ' : ' + v.Title, 'Add view ~ 347' );
        statusLog = addMyProgress(statusLog, false, 'E', i, n, 'darkred', 'ErrorBadge', v.Title, `Invalid Where`, 'Checking', `Error`, setProgress, `Add view ~ 347 ${err}`);

      } else if (viewWhereArray.length === 1) {
        viewWhereXML = thisFieldWhere;

      } else if (hasPreviousAnd === true && thisClause === 'Or') {
        //In UI, you can't have an OR after an AND... , it works but will not work editing the view through UI then.
        const err = `Can't do 'Or' clause because for ${thisFieldWhere} because there was already an 'And' clause here:  ${previousAnd}`;
        alert(err);
        // alert('Can\'t do \'Or\' clause because for ' + thisFieldWhere + ' because there was already an \'And\' clause here:  ' + previousAnd);
        // setProgress(false, "E", iV, nV , 'darkred', 'ErrorBadge', v.Title, 'Can\'t do Or after And: ' + myList.title, 'View ' + iV + ' of ' + nV + ' : ' + v.Title, 'Add view ~ 355' );
        statusLog = addMyProgress(statusLog, false, 'E', i, n, 'darkred', 'ErrorBadge', v.Title, `Can't do Or after And`, 'Checking', `Error`, setProgress, `Add view ~ 355 ${err}`);
      } else {
        //console.log( 'thisClause, thisFieldWhere', thisClause, thisFieldWhere );
        // '<' + thisOper.q + '>'
        if (thisClause != '' && thisFieldWhere != '') { //Valid clause found... wrap entire string in it
          if (viewWhereXML != '') {
            viewWhereXML = viewWhereXML + thisFieldWhere; //Add new field to previous string;
            viewWhereXML = '<' + thisClause + '>' + viewWhereXML + '</' + thisClause + '>';

          } else {
            const err = `Can't wrap this in clause because there is not any existing field to compare to ${thisFieldWhere}`;
            alert(err);
            // alert('Can\'t wrap this in clause because there is not any existing field to compare to ' + thisFieldWhere );
            // setProgress(false, "E", iV, nV , 'darkred', 'ErrorBadge', v.Title, 'Can\'t Compare field: ' + myList.title, 'View ' + iV + ' of ' + nV + ' : ' + v.Title, 'Add view ~ 368' );
            statusLog = addMyProgress(statusLog, false, 'E', i, n, 'darkred', 'ErrorBadge', v.Title, `Can't Compare field`, 'Checking', `Error`, setProgress, `Add view ~ 368 ${err}`);
            viewWhereXML = viewWhereXML + thisFieldWhere; //Add new field to previous string;
          }

          //2021-06-11:  added where viewWhereArray.length === 3 for more complex views where there were 2 or's before the and
        } else if (i === 0 && thisFieldWhere != '' && (viewWhereArray.length === 2 || viewWhereArray.length === 3)) {
          //Had to add this while testing TMTView:  VerifyNoStoryOrChapterView
          viewWhereXML = thisFieldWhere;

        }
      }

      if (thisClause === 'And') { hasPreviousAnd = true; previousAnd = thisFieldWhere; }
    });
  }

  v.viewWhereXML = viewWhereXML;
  return [v, statusLog];

}
