import { IMyFieldTypes } from '@mikezimm/fps-library-v2/lib/components/molecules/Provisioning/interfaces/columnTypes';
import { IMyFieldDefStringOrDef } from './recentUpdates';


export function replaceTitleWithThisColumn(currentFields: IMyFieldDefStringOrDef[], replacementField: IMyFieldTypes): IMyFieldDefStringOrDef[] {
  const result: IMyFieldDefStringOrDef[] = [];
  currentFields.map((field: IMyFieldTypes) => {
    if (field.name !== 'Title') { result.push(field); }
    else { result.push(replacementField); }
  });
  return result;
}
