
import { IWebpartBannerProps } from '../../fpsReferences';
import { IEasyRegex } from './customHubSearch';

export type IDefSourceType = 'lists...' | '' | '' | '' | '' | '*';

export interface ICategoryInfo {
  label: string;
  value: string;
}

export interface ICategoriesProps {
  bannerProps: IWebpartBannerProps;
  expandedState: boolean;
  EasySearch: IEasyRegex;
  text1?: ICategoryInfo;
  text2?: ICategoryInfo;
}

/**
 * Extends IFPSCorePinMeReactComponentState with all basics required for FPS Banner
 */
export interface ICategoriesState {
  testString: string;
  text1?: string;
  text2?: string;

  searchText: string;
  topSearch: number[];
  topIdx?: number;
  topMeta?: string;
  topSearchLabels?: string[];

}