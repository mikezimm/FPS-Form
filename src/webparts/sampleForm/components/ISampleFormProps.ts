import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ISampleFormProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;

  context: WebPartContext;

}

export interface ISampleFormState {

  libraryTitle: string;
  libraryUrl: string;
  libraryLabel: string;
  libraryDescription: string;
  libraryFullDescription: string;
  enableCreate: boolean;

}