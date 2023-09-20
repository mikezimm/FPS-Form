import { IFixerUpperHookRead } from './IFixerUpperHookRead';
import { IFPSItem } from '@mikezimm/fps-library-v2/lib/components/molecules/AnyContent/IAnyContent';

export interface IVerifiedSummary {
  find: string;
  hrefs: IFixerUpperHookRead[];
  hrefsIds: number[];
  hrefsCounts: number[];
  srcs: IFixerUpperHookRead[];
  srcsIds: number[];
  srcsCounts: number[];
  all: IFixerUpperHookRead[];
  allIds: number[];
  allCounts: number[];
  types: IVerifiedType[];
  iCount: number;
  linkCount: number;
  FPSItem: IFPSItem ;
}

export type IVerifiedType = 'srcs' | 'hrefs';
