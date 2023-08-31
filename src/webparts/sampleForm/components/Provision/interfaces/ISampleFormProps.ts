import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IStateSource } from "@mikezimm/fps-library-v2/lib/pnpjs/Common/IStateSource";

export interface ISampleFormProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;

  context: WebPartContext;

}

export interface ISampleFormState {

  users: IStateSource;
  sites: IStateSource;
  requests: IStateSource;
  allRequests: IStateSource;
  created: IStateSource[];

  libraryTitle: string;
  libraryUrl: string;
  libraryLabel: string;
  libraryDescription: string;
  libraryFullDescription: string;
  enableCreate: boolean;

}