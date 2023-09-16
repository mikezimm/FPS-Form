import { IMyView } from '@mikezimm/fps-library-v2/lib/components/molecules/Provisioning/interfaces/viewTypes';
import { IMyProgress } from "@mikezimm/fps-library-v2/lib/common/interfaces/fps/IMyInterfaces";
import { addMyProgress } from "../../addMyProgress";
import { buildFieldOrderTag } from './buildFieldOrderTag';


export function addViewOrderByXMLString(v: IMyView, i: number, n: number, statusLog: IMyProgress[], setProgress: (progress: IMyProgress[]) => void): [IMyView, IMyProgress[]] {

  let viewOrderByXML = '';
  if (v.orders != null) {
    if (v.orders.length > 2) {
      const err = 'You are trying to OrderBy more than 2 fields!: ' + v.groups.fields.length;
      alert(err);
      // alert('You are trying to OrderBy more than 2 fields!: ' + v.groups.fields.length);
      // setProgress(false, "E", iV, nV , 'darkred', 'ErrorBadge', v.Title, '2 Order Fields: ' + myList.title, 'View ' + iV + ' of ' + nV + ' : ' + v.Title, 'Add view ~ 299' );
      statusLog = addMyProgress(statusLog, false, 'E', i, n, 'darkred', 'ErrorBadge', v.Title, `> 2 Order Fields`, 'Checking', `Error`, setProgress, `Add view ~ 299 ${err}`);
    } else if (v.orders.length === 0) {
      const err = 'You have view.orders object with no fields to order by!';
      alert(err);

      // alert('You have view.orders object with no fields to order by!');
      // setProgress(false, "E", iV, nV , 'darkred', 'ErrorBadge', v.Title, 'No Order Fields: ' + myList.title, 'View ' + iV + ' of ' + nV + ' : ' + v.Title, 'Add view ~ 303' );
      statusLog = addMyProgress(statusLog, false, 'E', i, n, 'darkred', 'ErrorBadge', v.Title, `No Order Fields`, 'Checking', `Error`, setProgress, `Add view ~ 303 ${err}`);

    } else {

      viewOrderByXML += v.orders.map(thisField => {
        return buildFieldOrderTag(thisField);
      }).join('');
    }

  }

  v.viewOrderByXML = viewOrderByXML;
  return [v, statusLog];
}
