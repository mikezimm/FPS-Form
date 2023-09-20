import { IAnySourceItem } from '@mikezimm/fps-library-v2/lib/components/molecules/AnyContent/IAnyContent';
import { ISimpleLink } from '@mikezimm/fps-library-v2/lib/logic/Links/Interfaces';
import { IReplacementObject } from "./updateListData";


export interface IFixerUpperHookRead extends IAnySourceItem {
  ID: number;
  Title: string;
  Question: string;
  Answer: string;
  Category: string;
  Link_x002f_URL: ISimpleLink;
  Role: string;
  Deliverable_x0020_type: string;
  Modified: string;
  Editor: any;
  ReplaceOWizard: IReplaceOWizard;
}

export interface IReplaceOWizard {
  changes: IReplaceOWizardHistory[];
  hrefs: string[];
  srcs: string[];
}

export interface IReplaceOWizardHistory {
  count: number;
  replace: IReplacementObject;
}

