import { IViewWhere } from '@mikezimm/fps-library-v2/lib/components/molecules/Provisioning/interfaces/viewTypes';
import { IsNull, IsNotNull, Contains, MyOperator, BeginsWith } from '@mikezimm/fps-library-v2/lib/components/molecules/Provisioning/interfaces/viewTypes';
import { getValueTag } from './getValueTag';

// export function buildFieldWhereTag ( thisWhere: IViewWhere ): string {

export function buildFieldWhereTag(thisWhere: IViewWhere): string {
  let success = true;
  const tempWhere: IViewWhere = JSON.parse(JSON.stringify(thisWhere));
  const fieldName = typeof tempWhere.field === 'object' ? tempWhere.field.name : tempWhere.field;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fieldAny: any = tempWhere.field;
  const isFieldIndexed = typeof tempWhere.field === 'object' ? fieldAny.indexed : false;
  let thisXML = '<FieldRef Name="' + fieldName + '" />';
  //Sample of thisXML:         <FieldRef Name="Leader" />
  const thisOper: MyOperator = tempWhere.oper;
  const fieldVType = typeof tempWhere.field === 'object' ? tempWhere.field.fieldType.vType : typeof tempWhere.val === 'number' ? 'Number' : 'Text';
  const fieldNType = typeof tempWhere.field === 'object' ? tempWhere.field.fieldType.type : typeof tempWhere.val === 'number' ? 'Number' : 'Text';

  if (fieldVType === 'Boolean') {

    if (tempWhere.val === '1' || tempWhere.val === '0') { } //all is ok
    else if (tempWhere.val === 'false' || tempWhere.val === 'FALSE' || tempWhere.val === 'False') { tempWhere.val = '0'; }
    else if (tempWhere.val === 'true' || tempWhere.val === 'TRUE' || tempWhere.val === 'True') { tempWhere.val = '1'; }
    else { alert('Boolean value for \'' + fieldName + '\' can\'t be \'' + tempWhere.val + '\''); }

  }
  //console.log('buildFieldWhereTag', tempWhere, tempWhere.field, fieldVType, thisOper);
  if (thisOper.o == IsNull.o || thisOper.o == IsNotNull.o) {
    thisXML = '<' + thisOper.q + '>' + thisXML + '</' + thisOper.q + '>';
    //Sample of thisXML:      <IsNull><FieldRef Name="Leader" /></IsNull>
  } else if (thisOper.o == Contains.o || thisOper.o == BeginsWith.o || fieldVType === 'Text' || fieldVType === 'Choice' || fieldNType === 'SP.FieldMultiLineText') {
    //This is essentially what should be the Text loop... but includes Contains and Begins with because those should be text anyway.
    if (fieldVType !== 'Text' && fieldVType !== 'Choice' && fieldNType !== 'SP.FieldMultiLineText') {
      alert('Bad Where in \'' + fieldName + '\': Can\'t use \'' + thisOper.o + '\' with this type of field:' + fieldVType);
      success = false;

    } else {
      //I don't think Contains can be mixed with Indexed fields... or at least there may be a conflict.
      if (isFieldIndexed === true && (thisOper.o == Contains.o /*|| thisOper.o == BeginsWith.o */)) {
        alert('Can\'t do \'' + thisOper.o + '\' on the indexed field: \'' + fieldName + '\'');
        success = false;

      } else {
        thisXML = '<' + thisOper.q + '>' + thisXML + getValueTag(tempWhere.val, "Text") + '</' + thisOper.q + '>';
        //Sample of thisXML:       <Neq><FieldRef Name="StatusTMT" /><Value Type="Text">BEG</Value></Neq>
      }

    }

  } else {

    thisXML = '<' + thisOper.q + '>' + thisXML + getValueTag(tempWhere.val, fieldVType) + '</' + thisOper.q + '>';
    //Sample of thisXML:       <Neq><FieldRef Name="StatusTMT" /><Value Type="Text">BEG</Value></Neq>
  }

  //console.log('buildFieldWhereTag - thisXML:', thisXML);
  //NOTE:  Contains & Begins With can only be applied to Text, simple Multiline Text, Single Choice fields
  const result = success ? thisXML : '';

  return result;
}
