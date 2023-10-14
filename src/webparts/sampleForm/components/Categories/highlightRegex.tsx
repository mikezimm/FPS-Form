import * as React from 'react';

export function highlightStringBetweenB( str: string ): JSX.Element | string {

  const regex = /\\b(.*?)\\b/g;
  const splits = str.split('\\b');

  if ( splits.length !== 3 ) return <span style={{ backgroundColor: 'yellow' }}>{str}</span>;

  return <span>{`${ splits[0] }\\b`}<span style={{ backgroundColor: 'yellow' }}>{`${ splits[1] }`}</span>{`\\b${ splits[2] }`}</span>

  console.log( `highlightStringBetweenB ~ `, splits );
  return str;
  // if ( !matches ) return str;

  // const highlightedString = matches.map((match, index) => {
  //   if (index % 2 === 0) {
  //     return match;
  //   }
  //   console.log( `highlightStringBetweenB ~ index % 2 !== 0`, match );
  //   return <span key={ index } style={{ backgroundColor: 'yellow' }}>{match}</span>;
  // });
  // return <>{highlightedString.join('')}</>;
}