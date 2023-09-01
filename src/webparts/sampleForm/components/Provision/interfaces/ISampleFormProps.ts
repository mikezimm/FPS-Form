import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IStateSource } from "@mikezimm/fps-library-v2/lib/pnpjs/Common/IStateSource";

export interface ISampleFormState {

  users: IStateSource;
  sites: IStateSource;
  requests: IStateSource;
  allRequests: IStateSource;

}