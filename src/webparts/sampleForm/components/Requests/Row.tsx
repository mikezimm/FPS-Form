/* eslint-disable dot-notation */

import * as React from 'react';

import { getHighlightedText } from '@mikezimm/fps-library-v2/lib/components/atoms/Elements/HighlightedText';

import { ISourceRowRender } from '@mikezimm/fps-library-v2/lib/components/molecules/SourcePage/ISourceRowRender';
import { IFPSLabelRequestRead } from './functions/requestLabel';

import styles from './RowStyles.module.scss';
require ('@mikezimm/fps-styles/dist/fpsGeneralCSS.css');

export const requestRowHeaders: string[] = [ 'Id', 'Label', 'Library', 'WebUrl', 'Requested', 'Status', 'Completed' ];

export function createRequestsRow( props: ISourceRowRender ): JSX.Element { // eslint-disable-line @typescript-eslint/no-explicit-any
  const { item, onClick, searchText, onParentCall } = props; // details, showItemType, onOpenPanel

  const thisItem: IFPSLabelRequestRead = item as IFPSLabelRequestRead;

  const { Title, Id, Created, Label, LibraryGuid, LibraryName, LibraryTitle, Author, LibraryLink, SiteUrl, WebUrl, Status, CompleteTime } = thisItem; // , BannerImageUrl, PromotedState

  const created = thisItem?.FPSItem?.Stamp?.created;

  const CreateDate = created ? created.dayYYYYMMDD : '';
  const CreateAge = created ? created.age.toFixed( 1 ) : '';

  const noWrap = `fps-gen-text-ellipse`;

  const row = <tr className={ styles.requestsRow } onClick = { () => onClick( Id, 'generic', item ) }>

    <td title={ null } onClick= { () => props.onParentCall( 'Item', item.Id, '', item ) }  >{ Id }</td>
    {/* <td className = { noWrap } title={ null } >{ getHighlightedText( Title, searchText ) }</td> */}
    <td className = { noWrap } title={ null } onClick= { () => { props.onPropFilter( 'Label', Label, ) }} >{ getHighlightedText( Label, searchText ) }</td>
    <td className = { noWrap } title={ LibraryTitle } onClick= { () => {  window.open( LibraryLink.Url ,'_blank') }} >{ getHighlightedText( LibraryTitle, searchText ) }</td>
    <td className = { noWrap } title={ WebUrl } onClick= { () => {  window.open( WebUrl ,'_blank') }} >{ getHighlightedText( WebUrl, searchText ) }</td>
    <td className = { noWrap } title={ Created } >{ CreateDate } -{ CreateAge } days</td>
    <td className = { noWrap } title={ null } onClick= { () => { props.onPropFilter( 'Status', Status, ) }}  >{ getHighlightedText( Status, searchText ) }</td>
    <td className = { noWrap } title={ null } >{ CompleteTime }</td>

  </tr>;

  return row;

}


