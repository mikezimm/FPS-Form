/* eslint-disable dot-notation */

import * as React from 'react';

import { getHighlightedText } from '@mikezimm/fps-library-v2/lib/components/atoms/Elements/HighlightedText';

import { ISourceRowRender } from '@mikezimm/fps-library-v2/lib/components/molecules/SourcePage/ISourceRowRender';

import styles from './RowStyles.module.scss';
import { IVerifiedSummary } from './IVerifiedSummary';

require ('@mikezimm/fps-styles/dist/fpsGeneralCSS.css');
const noWrap = `fps-gen-text-ellipse`; // From fps-stiles fpsGeneralCSS.css
const noWrapX = ``; // From fps-stiles fpsGeneralCSS.css

export const verifiedRowHeaders: string[] =[ 'Types', 'Items', 'Links', 'Url', 'Ids', ];

export function createVerifiedRow( props: ISourceRowRender ): JSX.Element { // eslint-disable-line @typescript-eslint/no-explicit-any
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { item, onClick, searchText, onParentCall } = props; // details, showItemType, onOpenPanel

  const thisItem: IVerifiedSummary = item as any;

  const { types, iCount, linkCount, find, all, allIds } = thisItem; // , BannerImageUrl, PromotedState

  // WHY IS THIS NECCESSARY NOW
  if ( !find ) return undefined;

  const row = <tr className={ styles.verifiedRow } onClick = { null }>

    <td className = { noWrapX } title={ types.join( ', ' ) } >{ getHighlightedText( types.join( ', ' ), searchText ) }</td>
    <td className = { noWrapX } title={ null } >{ iCount }</td>
    <td className = { noWrapX } title={ null } >{ linkCount }</td>
    <td title={ styles.cellLink } onClick= { () => props.onParentCall( 'Verified', -99, '', item ) }  >{ getHighlightedText( find, searchText ) }</td>
    <td className = { noWrapX } title={ null } >{ getHighlightedText( allIds.join( ', ' ), searchText )  }</td>

  </tr>;

  return row;

}


