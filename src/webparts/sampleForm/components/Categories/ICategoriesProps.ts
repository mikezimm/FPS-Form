
import { IWebpartBannerProps } from '../../fpsReferences';

export type IDefSourceType = 'lists...' | '' | '' | '' | '' | '*';

export interface ICategoriesProps {
  bannerProps: IWebpartBannerProps;
  expandedState: boolean;
  testSite?: string;
}

/**
 * Extends IFPSCorePinMeReactComponentState with all basics required for FPS Banner
 */
export interface ICategoriesState {
  testString: string;
  testTitle: string;
  testDescription: string;

  searchText: string;
  topSearch: number[];
  topIdx?: number;
  topMeta?: string;
  topSearchLabels?: string[];

}