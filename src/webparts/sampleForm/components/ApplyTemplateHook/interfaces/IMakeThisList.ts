// import { IFields } from "@pnp/sp/fields/types";
// import { IViews } from "@pnp/sp/views/types";
// import { IMyFieldTypes } from '@mikezimm/fps-library-v2/lib/components/molecules/Provisioning/interfaces/columnTypes';
// import { IMyView } from '@mikezimm/fps-library-v2/lib/components/molecules/Provisioning/interfaces/viewTypes';
// import { IValidTemplate } from "./FPSTemplates";
// import { IDefinedLists } from "./IDefinedLists";

// export type IAnyArray = any[];

// export interface IMakeThisList {

//   title: string;
//   name: string;
//   webURL: string;
//   listURL: string;
//   desc: string;
//   template: IValidTemplate; // listURL, template
//   enableContentTypes: boolean;
//   additionalSettings: {
//     EnableVersioning: boolean;
//     MajorVersionLimit: number;
//     OnQuickLaunch: boolean;
//   };
//   createTheseFields: IMyFieldTypes[];
//   createTheseViews: IMyView[];

//   currentFields: IFields[];
//   currentViews: IViews[];

//   createTheseItems: IAnyArray;
//   autoItemCreate: boolean;
//   alternateItemCreateMessage?: string;
//   confirmed: boolean; // Likely not needed... seems like this was used on PageProvisioning if anything... but can not see any use.

//   // onCurrentSite: boolean;  //- Checked in EasyContents and this only seems to be used in defineTheMaster and no where else.
//   webExists: boolean; // Likely can be removed if there is always a valid web url passed in from context or text box
//   listExists: boolean; // Likely can be removed if this is always called after the list is created or already known from web part
//   listExistedB4: boolean; // Likely can be removed if this is always called after the list is created or already known from web part
//   existingTemplate: number; // This is actuall the BaseTemplate
//   sameTemplate: boolean; // Used for determining provision button text and disabled... could be done differently though
//   listDefinition: string;
//   definedList: IDefinedLists;
//   validUserIds?: number[]; // Used for creating sample items with user columns
//   templateDesc: string;
//   templateDetails: string;
//   templateFields: JSX.Element;
//   templateViews: JSX.Element;

// }// eslint-disable-next-line @typescript-eslint/no-explicit-any



