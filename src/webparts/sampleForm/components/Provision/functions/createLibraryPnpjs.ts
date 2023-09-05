import { IListInfo } from "@pnp/sp/lists/types";
import { check4This } from '@mikezimm/fps-pnp2/lib/services/sp/CheckSearch';
import { IPerformanceSettings } from "@mikezimm/fps-library-v2/lib/components/molecules/Performance/IPerformanceSettings";
import { startPerformOpV2, updatePerformanceEndV2 } from "@mikezimm/fps-library-v2/lib/components/molecules/Performance/functions";
import { IFpsItemsReturn, checkItemsResults } from "@mikezimm/fps-library-v2/lib/pnpjs/Common/CheckItemsResults";
import { makeListPnpjs } from "./makeListPnpjs";

/**
 * This will go in fps-library-v2
 * @param siteUrl
 * @param libraryTitle
 * @param libraryUrl
 * @param libraryDescription
 * @returns
 */

export async function createLibraryPnpjs(siteUrl: string, libraryTitle: string, libraryUrl: string, libraryDescription: string): Promise<IFpsItemsReturn> {

  const performanceSettings: IPerformanceSettings = { label: 'createLib', updateMiliseconds: true, includeMsStr: true, op: 'create0' };
  const createOp = performanceSettings ? startPerformOpV2(performanceSettings) : null;

  const listProperties: Partial<IListInfo> = {};
  if (libraryTitle) listProperties.Title = libraryTitle;
  if (libraryDescription) listProperties.Description = libraryDescription;

  const initialResult = await makeListPnpjs(siteUrl, 101, libraryTitle, libraryUrl, listProperties);

  const result: IFpsItemsReturn = checkItemsResults(initialResult as IFpsItemsReturn, `fps-library-v2: createLibraryPnpjs ~ 24`, false, true);
  result.fpsContentType = ['list'];

  result.unifiedPerformanceOps.create = performanceSettings ?
    updatePerformanceEndV2({ op: createOp, updateMiliseconds: performanceSettings.updateMiliseconds, count: 1 }) : null;

  result.createOp = result.unifiedPerformanceOps.create;

  if (check4This(`fpsShowFetchResults=true`) === true) { console.log(`fps-library-v2 COMPLETE: createLibraryPnpjs ~ 30`, result); }

  return result;

}
