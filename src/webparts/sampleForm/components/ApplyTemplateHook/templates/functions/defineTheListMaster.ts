import { IMakeThisList, IDefinedListInfo } from '../../interfaces/ProvisionTypes';
import { IListInfo } from "@pnp/sp/lists/types";

export function defineTheListMaster( list: Partial<IListInfo>, definedList: IDefinedListInfo, webURL: string, ): IMakeThisList {

  // const pageURL = window.location.pathname.toLowerCase();
  //Sometimes the webURL is undefined  (when props are empty)
  // if (webURL) {
  //   const webLastIndexOf = webURL.lastIndexOf('/');
  //   if (webURL.length > 0 && webLastIndexOf !== webURL.length - 1) { webURL += '/'; }
  // }
  // if (pageURL.length > 0 && pageURL.lastIndexOf('/') !== pageURL.length - 1) { pageURL += '/'; }

  // let isListOnThisWeb = false;

  // if (webURL === '') {
  //   isListOnThisWeb = true;

  // } else if (webURL === undefined) {
  //   isListOnThisWeb = true;

  // } else if (pageURL === webURL) {
  //   isListOnThisWeb = true;
  // }

  // webURL = webURL.replace('_layouts/15/', ''); //Remove all the workbench urls

  // if (webURL.lastIndexOf('/') !== webURL.length - 1) { webURL += '/'; }

  const makeThisList: IMakeThisList = {
    definedList: definedList.list,
    title: list.Title,
    name: list.EntityTypeName,
    webURL: webURL,
    desc: list.Description,
    template: list.BaseTemplate as 100,
    enableContentTypes: true,
    additionalSettings: {
      EnableVersioning: true,
      MajorVersionLimit: 50,
      OnQuickLaunch: true,
    },
    createTheseFields: null,
    createTheseViews: null,

    currentFields: [],
    currentViews: [],

    createTheseItems: null,
    autoItemCreate: false,
    listURL: `${webURL}/${list.BaseTemplate === 100 ? 'lists/' : ''}${list.EntityTypeName}`,
    confirmed: false, // Likely not needed... seems like this was used on PageProvisioning if anything... but can not see any use.
    // onCurrentSite: isListOnThisWeb, - Checked in EasyContents and this only seems to be used in defineTheMaster and no where else.
    webExists: true, // Likely can be removed if there is always a valid web url passed in from context or text box
    listExists: false, // Likely can be removed if this is always called after the list is created or already known from web part
    listExistedB4: false, // Likely can be removed if this is always called after the list is created or already known from web part
    existingTemplate: null, // This is actuall the BaseTemplate
    sameTemplate: false, // Used for determining provision button text and disabled... could be done differently though
    listDefinition: definedList.listDefinition,

    templateDesc: null,
    templateDetails: null,
    templateFields: null,
    templateViews: null,
  };

  //let listResult = await provisionTheList( makeThisList, setProgress );
  return makeThisList;

}
