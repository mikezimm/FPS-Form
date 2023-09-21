
// export type IValidTemplate = 100 | 101;

// // IProvisionableFPSlates must match exactly with the BaseTemplate property of IFPSListTemplate
// export type  IProvisionableFPSlates = 100 | 101 | 119 | 850;

// export type IFPSBaseTypeText = 'List' | 'Library';

// export interface IFPSListTemplate {
//   Base: 0 | 1;
//   BaseTemplate: number;
//   BaseText: IFPSBaseTypeText;
//   Title: string;
//   AKA: string; // Also known as this
//   Description: string;
//   Modern: boolean;
// }

// export const FPSListTemplate: IFPSListTemplate = {
//   Base: 0,
//   BaseText: 'List',
//   BaseTemplate: 100,
//   Title: 'Modern List',
//   AKA: 'Custom List',
//   Description: 'Default List',
//   Modern: true,
// };

// export const FPSLibTemplate: IFPSListTemplate = {
//   Base: 1,
//   BaseText: 'Library',
//   BaseTemplate: 101,
//   Title: 'Modern Documents',
//   AKA: 'Shared Documents',
//   Description: 'Default Documents Library',
//   Modern: true,
// };

// export const FPSSitePagesTemplate: IFPSListTemplate = {
//   Base: 1,
//   BaseText: 'Library',
//   BaseTemplate: 119,
//   Title: 'Site Pages',
//   AKA: 'Site Pages',
//   Description: 'Modern Site Pages library',
//   Modern: true,
// };

// export const FPSPageLibTemplate: IFPSListTemplate = {
//   Base: 1,
//   BaseText: 'Library',
//   BaseTemplate: 850,
//   Title: 'Pages',
//   AKA: 'Pages',
//   Description: 'Classic Pages library',
//   Modern: false,
// };

// export const FPSAssetLibTemplate: IFPSListTemplate = {
//   Base: 1,
//   BaseText: 'Library',
//   BaseTemplate: 851,
//   Title: 'Asset Library',
//   AKA: 'Asset Library',
//   Description: 'Asset Library provisionable via Powershell',
//   Modern: false,
// };

// export const FPSCommonTemplates: IFPSListTemplate[] = [
//   FPSListTemplate,
//   FPSLibTemplate,
//   FPSSitePagesTemplate,
//   FPSPageLibTemplate,
//   FPSAssetLibTemplate,
// ];

// export const FPSProvisionableTemplates: IFPSListTemplate[] = [
//   FPSListTemplate,
//   FPSLibTemplate,
//   FPSSitePagesTemplate,
//   // FPSPageLibTemplate,
//   // FPSAssetLibTemplate,
// ];

// export const FPSProvisionalbeBaseTemplates = FPSProvisionableTemplates.map( ( template ) => { return template.BaseTemplate } );

// export const FPSUnCommonFPSlates: IFPSListTemplate[] = [
 
// ];

// /**
//  * These are other templates that I have not decided to build up since they have limited use.
//  */
// export const FPSModernEvents = 106;
// export const FPSClassicSurvey = 102;
// export const FPSClassicLinks = 103;
// export const FPSClassicAnnouncements = 104;
// export const FPSClassicContacts = 105;
// export const FPSClassicTasks = 107;
// export const FPSClassicDiscussion = 108;
// export const FPSClassicPictureLib = 109;
// export const FPSClassicWorkflowHistory = 140;
// export const FPSClassicGanttTasks = 150;
// export const FPSClassicIssueTracking = 1100;