import * as React from 'react';

export function highlightStringBetweenB( str: string, highlight: boolean ): JSX.Element {

  const splits = str.split('\\b');

  if ( splits.length !== 3 ) return <span style={{ backgroundColor: highlight === true ? 'yellow' : null }}>{str}</span>;

  return <span><span>{`${ splits[0] }\\b`}</span><span>{`${ splits[1] }`}</span><span>{`\\b${ splits[2] }`}</span></span>;

}