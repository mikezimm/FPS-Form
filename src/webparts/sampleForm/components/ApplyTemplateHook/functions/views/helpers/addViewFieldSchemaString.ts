import { IMyView, IViewField } from '@mikezimm/fps-library-v2/lib/components/molecules/Provisioning/interfaces/viewTypes';


export function addViewFieldSchemaString(v: IMyView): IMyView {

  const viewFieldsSchema = v.iFields.map(thisField => {
    const tempField: IViewField = JSON.parse(JSON.stringify(thisField));
    const fieldName = typeof tempField === 'object' ? tempField.name : tempField;
    return '<FieldRef Name="' + fieldName + '" />';
  });

  let viewFieldsSchemaString: string = '';
  if (viewFieldsSchema.length > 0) {
    //viewFieldsSchemaString = '<ViewFields>' + viewFieldsSchema.join('') + '</ViewFields>';
    viewFieldsSchemaString = viewFieldsSchema.join('');
  }

  v.viewFieldsSchemaString = viewFieldsSchemaString;
  return v;

}
