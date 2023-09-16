// eslint-disable-next-line @rushstack/no-new-null

export function getValueTag(thisValue: string, type: string | null = null): string {
  let result = '';
  if (typeof thisValue === 'string' && thisValue.indexOf('<Value') > -1) { //Some of these are pre-made so do not add the value tag
    result = thisValue;
  } else { //Only add the Value tag when it's required.
    if (type !== null || type !== '') {
      result = '<Value Type="' + type + '">' + thisValue + '</Value>';
      //Sample of thisXML:       <Value Type="Text">BEG</Value>
    } else {
      alert('Bad type in \'' + thisValue + '\': Can\'t use \'' + type + '\'');
      result = null;

    }

  }
  return result;
}
