import { IViewField } from '@mikezimm/fps-library-v2/lib/components/molecules/Provisioning/interfaces/viewTypes';
import { IMakeThisList } from '../../../interfaces/ProvisionTypes';

/**
 * Swap Title Placeholder with either Name or Title
 */
export const FilePrimaryColumnNames = ['FileLeafRef', 'LinkFilenameNoMenu', 'LinkFilename'];
export const ItemPrimaryColumnNames = ['Title', 'LinkTitleNoMenu', 'LinkTitle'];

export function fixTitleNameInViews(doList: boolean, list: IMakeThisList): IMakeThisList {

  list.createTheseViews.map(view => {
    if (view.iFields) {
      const correctedFields: IViewField[] = [];
      view.iFields.map(field => {
        let isTitleField: number = -1;
        let isNameField: number = -1;

        if (typeof field === 'object') {
          isTitleField = ItemPrimaryColumnNames.indexOf(field.name);
          isNameField = FilePrimaryColumnNames.indexOf(field.name);

        } else if (typeof field === 'string') {
          isTitleField = ItemPrimaryColumnNames.indexOf(field);
          isNameField = FilePrimaryColumnNames.indexOf(field);
        }

        if (doList === true && isNameField > -1) {
          correctedFields.push(ItemPrimaryColumnNames[isNameField]);

        } else if (doList === false && isTitleField > -1) {
          correctedFields.push(FilePrimaryColumnNames[isTitleField]);

        } else {
          correctedFields.push(field);
        }

      });
      view.iFields = correctedFields;
    }
  });

  return list;

}

