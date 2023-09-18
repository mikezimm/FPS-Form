

// import { IHelpfullOutput, IHelpfullInput } from '../../logic/Errors/friendly';
// import { getUrlVarsAsStrings, getCurrentPageLink, getWebUrlFromLink, makeListLink } from '../../logic/Links/UrlFunctions';
// import { saveThisLogItem } from '@mikezimm/fps-pnp2/lib/services/sp/logging/saveThisLogItem';
// import { ISourceProps } from '../SourceItems/Interface';
// import { prepSourceColumns } from '../SourceItems/prepSourceColumns';
// import { RequestListList, RequestListSite } from './Interfaces/constants';
// import { createSeriesSort } from '../SourceItems/createOrderBy';
// import { IPickedWebBasic } from '../../common/interfaces/fps/Picked/IPickedWebBasic';

import { getCurrentPageLink, getWebUrlFromLink, makeListLink } from '@mikezimm/fps-library-v2/lib/logic/Links/UrlFunctions';
import { saveThisLogItem } from '@mikezimm/fps-pnp2/lib/services/sp/logging/saveThisLogItem';
import { ISourceProps } from '@mikezimm/fps-library-v2/lib/pnpjs/SourceItems/Interface';
import { prepSourceColumns } from '@mikezimm/fps-library-v2/lib/pnpjs/SourceItems/prepSourceColumns';
import { RequestListList, RequestListSite } from '@mikezimm/fps-library-v2/lib/pnpjs/Logging/Interfaces/constants';
import { createSeriesSort } from '@mikezimm/fps-library-v2/lib/pnpjs/SourceItems/createOrderBy';
import { IPickedWebBasic } from '@mikezimm/fps-library-v2/lib/common/interfaces/fps/Picked/IPickedWebBasic';



/**
 * This function is for automatically creating a item in our Teams' request list in SharePoint.
 * Initially it's fired upon completing rail functions to auto-document support incidents.
 * 
 * So it's only going to execute in certain tenanats.
 * If you see this and want to re-purpose it, update the function to suit your needs and adjust the window.location.origin check
 * 
 * Best practice is just to update your site and list Url in strings:
 *  Or just create the site:  SharePointAssist
 *  And create the list:  Assists
 *  And add the columns listed below in the save item
    "requestListSite": "/sites/SharePointAssist",
    "requestListList": "Assists",
 * 
*/

// export function saveAssist ( analyticsWeb: string, analyticsList: string, SiteLink: string, webTitle: string, saveTitle: string, TargetSite: IPickedWebBasic, TargetList: string, itemInfo1: string, itemInfo2: string[], result: string, RichTextJSON1: any, Setting: string, RichTextJSON2: any, RichTextJSON3: any ) {

// saveAssist( ServerRelativeUrl, `Applied Template: v2.0.0.2 ${mapThisList.definedList} - ${mapThisList.listDefinition} to List: ${mapThisList.title}` , this.props.theList.listURL, ['2. Provisioning'], JSON.stringify(this.state.history) )
export function saveAssist ( SiteLink: string, saveTitle: string, TargetList: string, itemInfo2: string[], RichTextJSON1: any, ): void {

  if ( window.location.origin.indexOf( 'utoliv.sharepoint.com') < 0 && window.location.origin.indexOf( 'clickster.sharepoint')  < 0 ) { return ; }

  if (!SiteLink) { return ; }
  if (!saveTitle) { return ; }

  SiteLink = getWebUrlFromLink( SiteLink, 'abs' );

  const location = makeListLink( TargetList, SiteLink );

  // let startTime = makeSmallTimeObject( null );
  // let localTimeString = startTime.theTime;
  const localTimeString = new Date();
  // let StatusComments = RichTextJSON1 ? typeof RichTextJSON1 === 'string' ? RichTextJSON1 : JSON.stringify(RichTextJSON1).replace('\"','') : null;
  const StatusComments = RichTextJSON1 ? typeof RichTextJSON1 === 'string' ? RichTextJSON1 : JSON.stringify(RichTextJSON1).replace('"','') : null;
  const ScopeArray: string[] = itemInfo2;
  const saveItem: any ={
      Title: saveTitle,
      Scope:  { results: ScopeArray },  //Need to add scope back in as multi-select choice.
      Status: '4. Completed', //Choice
      Complexity: '0 Automation', //Choice
      StatusComments: StatusComments, //Mulit-Line Text (plain text)
      StartDate: localTimeString, //Date-Time
      EndDate: localTimeString, //Date-Time
      TargetCompleteDate: localTimeString, //Date-Time
      Location: location, //Link
  };

  saveThisLogItem( RequestListSite + '', RequestListList + '', saveItem );

}

const assist = 'assist';
export const AssistSourceProps: ISourceProps = prepSourceColumns( {
  key: assist,
  defType: assist,
  webUrl: `${window.location.origin}${RequestListSite}`,// /${analyticsListX}
  webRelativeLink: `/lists/${RequestListList}`,
  searchSource: assist,
  searchSourceDesc: assist,
  listTitle: `${RequestListList}`,
  columns: [ '*', ],
  searchProps: [ 'ID', 'Author/Title','Author/Office', 'SiteTitle', 'language', 'CodeVersion' ],
  selectThese: ['*', 'Author/Title','Author/Office', 'performance' ],
  isModern: true,
  defSearchButtons: [],
  orderBy: createSeriesSort( 'Id', false ),
  fetchCount: 5000,
  performanceSettings: { label: 'assists', updateMiliseconds: true, includeMsStr: true, op: 'fetch' },
  fpsContentType: [ 'item' ],
}, null );
