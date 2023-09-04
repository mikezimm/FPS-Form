import { IMyFieldTypes, } from '@mikezimm/fps-library-v2/lib/components/molecules/Provisioning/interfaces/columnTypes';
import { IMyView, } from '@mikezimm/fps-library-v2/lib/components/molecules/Provisioning/interfaces/viewTypes';

export function getFieldNamesFromArray ( arr: IMyFieldTypes[] ): string[] {
  const result: string[] = arr.map( field => {
    return typeof field  === 'object' ? field.name : field
  });
  return result;
}

export function getViewTitlesFromArray ( arr: IMyView[] ): string[] {
  const result: string[] = arr.map( view => {
    return typeof view  === 'object' ? view.Title : 'Unknown View';
  });
  return result;
}
