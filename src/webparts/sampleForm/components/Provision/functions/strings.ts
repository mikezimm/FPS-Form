

export function toCamelCase(str: string ): string {
  function convert( word: string, index: number ) : string {
    if (index === 0) {
      return word.toUpperCase();
    } else {
      return word.toUpperCase().replace(/[^a-zA-Z0-9]+(.)/g, function(match, chr) {
        return chr.toUpperCase();
      });
    }
  }

  let newStr = str.toLowerCase().replace(/(?:^\w|[A-Z]|\b\w)/g, convert).replace(/\s+/g, '');
  const special = /[*{}()'"`=+&^%$#@!~|[\\\].,\/\?<>-]/g;
  newStr = newStr.replace( special, '' );
  return newStr;
}

export function doesNotStartNumber (value: string) : string | JSX.Element | undefined {
  const noNumberStart = /^[0-9]/;
  const result = noNumberStart.test(value);

  return result === true ? `DO NOT start with number` : undefined;
}