import { IMyView } from '@mikezimm/fps-library-v2/lib/components/molecules/Provisioning/interfaces/viewTypes';
import { IMyProgress } from "@mikezimm/fps-library-v2/lib/common/interfaces/fps/IMyInterfaces";
import { addMyProgress } from "../../addMyProgress";
import { buildFieldOrderTag } from './buildFieldOrderTag';


export function addViewGroupXMLString(v: IMyView, i: number, n: number, statusLog: IMyProgress[], setProgress: (progress: IMyProgress[]) => void): [IMyView, IMyProgress[]] {

  let viewGroupByXML = '';
  if (v.groups != null) {
    if (v.groups.fields.length > 2) {
      const err = 'You are trying to GroupBy more than 2 fields!: ' + v.groups.fields.length;
      alert(err);
      // setProgress(false, "E", iV, nV , 'darkred', 'ErrorBadge', v.Title, 'GroupBy error: ' + myList.title, 'View ' + iV + ' of ' + nV + ' : ' + v.Title, 'Add view ~ 264' );
      statusLog = addMyProgress(statusLog, false, 'E', i, n, 'darkred', 'ErrorBadge', v.Title, `> 2 GroupBy Fields`, 'Checking', `Error`, setProgress, `Add view ~ 198 ${err}`);

    } else if (v.groups.fields != null && v.groups.fields.length > 0) {
      if (v.groups.collapse === true) { viewGroupByXML += ' Collapse="TRUE"'; }
      if (v.groups.collapse === false) { viewGroupByXML += ' Collapse="FALSE"'; }
      if (v.groups.limit != null) { viewGroupByXML += ' GroupLimit="' + v.groups.limit + '"'; }

      viewGroupByXML = '<GroupBy' + viewGroupByXML + '>';

      viewGroupByXML += v.groups.fields.map(thisField => {
        return buildFieldOrderTag(thisField);
      }).join('');

      viewGroupByXML += '</GroupBy>';
      //console.log('<OrderBy><FieldRef Name="Modified" Ascending="False" /></OrderBy>');
      //console.log('viewGroupByXML', viewGroupByXML);
    }
  }

  v.viewGroupByXML = viewGroupByXML;
  return [v, statusLog];
}
