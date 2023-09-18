

// import { saveAnalytics, ApplyTemplate_Rail_SaveTitle, ProvisionListsSaveTitle} from '@mikezimm/npmfunctions/dist/Services/Analytics/normal';

// import { saveThisLogItem } from  '@mikezimm/npmfunctions/dist/Services/Logging/ErrorHandler';
// import { getWebUrlFromLink, getUrlVars,  } from '@mikezimm/npmfunctions/dist/Services/Logging/LogFunctions';
// import { getCurrentPageLink, makeListLink, makeSiteLink, } from '@mikezimm/npmfunctions/dist/Services/Logging/LogFunctions';

// let theSite: any = this.props.theSite;
// let ServerRelativeUrl = this.props.currentPage;
// let pickedWeb = this.props.pickedWeb.ServerRelativeUrl + '|' + this.props.pickedWeb.guid + '|' + theSite.Url + '|' + theSite.Id ;

// let idx = this.state.listNo;
// let mapThisList: IMakeThisList = this.state.lists[ idx ];

// saveAnalytics( this.props.analyticsWeb, strings.analyticsListRailsApply , //analyticsWeb, analyticsList,
//     ServerRelativeUrl, ServerRelativeUrl,//serverRelativeUrl, webTitle,
//     `${ApplyTemplate_Rail_SaveTitle} - v2.0.0.2`, pickedWeb, this.props.theList.listURL, //saveTitle, TargetSite, TargetList
//     this.props.theList.Title, null , 'Complete', //itemInfo1, itemInfo2, result, 
//     mapThisList, this.props.railFunction, this.state.progress, this.state.history ); //richText, Setting, richText2, richText3

// saveAssist( //strings.requestListSite, strings.requestListList , //analyticsWeb, analyticsList,
//     ServerRelativeUrl, ServerRelativeUrl,//serverRelativeUrl, webTitle,
//     `Applied Template: v2.0.0.2 ${mapThisList.definedList} - ${mapThisList.listDefinition} to List: ${mapThisList.title}` , this.props.pickedWeb, this.props.theList.listURL, //saveTitle, TargetSite, TargetList
//     '', ['2. Provisioning'], '', //itemInfo1 ( Not used yet ), itemInfo2 ( Scope array ), result ( Not used yet ), 
//     JSON.stringify(this.state.history), this.props.railFunction, null, null ); //richText, Setting, richText2, richText3


    
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

//   if ( window.location.origin.indexOf( 'utoliv.sharepoint.com') < 0 && window.location.origin.indexOf( 'clickster.sharepoint')  < 0 ) { return ; }

//   if (!analyticsList) { return ; }
//   if (!analyticsWeb) { return ; }

//   SiteLink = getWebUrlFromLink( SiteLink, 'abs' );

//   const location = makeListLink( TargetList, webTitle );

//   // let startTime = makeSmallTimeObject( null );
//   // let localTimeString = startTime.theTime;
//   const localTimeString = new Date();
//   // let StatusComments = RichTextJSON1 ? typeof RichTextJSON1 === 'string' ? RichTextJSON1 : JSON.stringify(RichTextJSON1).replace('\"','') : null;
//   const StatusComments = RichTextJSON1 ? typeof RichTextJSON1 === 'string' ? RichTextJSON1 : JSON.stringify(RichTextJSON1).replace('"','') : null;
//   const ScopeArray: string[] = itemInfo2;
//   const saveItem: any ={
//       Title: saveTitle,
//       Scope:  { results: ScopeArray },  //Need to add scope back in as multi-select choice.
//       Status: '4. Completed', //Choice
//       Complexity: '0 Automation', //Choice
//       StatusComments: StatusComments, //Mulit-Line Text (plain text)
//       StartDate: localTimeString, //Date-Time
//       EndDate: localTimeString, //Date-Time
//       TargetCompleteDate: localTimeString, //Date-Time
//       Location: location, //Link
//   };

//   saveThisLogItem( analyticsWeb + '', analyticsList + '', saveItem );

// }