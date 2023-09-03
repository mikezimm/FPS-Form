/* eslint-disable dot-notation */

import * as React from 'react';

import { getHighlightedText } from '@mikezimm/fps-library-v2/lib/components/atoms/Elements/HighlightedText';

import { ISourceRowRender } from '@mikezimm/fps-library-v2/lib/components/molecules/SourcePage/ISourceRowRender';

import styles from './RowStyles.module.scss';
import { IAnySourceItem } from '@mikezimm/fps-library-v2/lib/components/molecules/AnyContent/IAnyContent';

require ('@mikezimm/fps-styles/dist/fpsGeneralCSS.css');
const noWrap = `fps-gen-text-ellipse`; // From fps-stiles fpsGeneralCSS.css

export interface IExampleHookRead extends IAnySourceItem {

}

export const exampleRowHeaders: string[] = [ 'Id', 'Title', 'Author', 'Created', 'Editor', 'Modified', ];

export function createApplyTemplateRow( props: ISourceRowRender ): JSX.Element { // eslint-disable-line @typescript-eslint/no-explicit-any
  const { item, onClick, searchText, onParentCall } = props; // details, showItemType, onOpenPanel

  const thisItem: IExampleHookRead = item as IExampleHookRead;

  const { Title, Id, Created, Author, Modified, Editor } = thisItem; // , BannerImageUrl, PromotedState

  const created = thisItem?.FPSItem?.Stamp?.created;
  const CreateDate = created ? created.dayYYYYMMDD : '';
  const CreateAge = created ? created.age.toFixed( 1 ) : '';

  const modified = thisItem?.FPSItem?.Stamp?.modified;
  const ModifiedDate = modified ? modified.dayYYYYMMDD : '';
  const ModifiedAge = modified ? modified.age.toFixed( 1 ) : '';

  const row = <tr className={ styles.requestsRow } onClick = { () => onClick( Id, 'generic', item ) }>

    <td title={ null } onClick= { () => props.onParentCall( 'Item', item.Id, '', item ) }  >{ Id }</td>
    <td className = { noWrap } title={ Title } >{ getHighlightedText( Title, searchText ) }</td>

    <td className = { noWrap } title={ Created } >{ CreateDate } -{ CreateAge } days</td>
    <td className = { noWrap } title={ Author.Title } >{ getHighlightedText( Author.Title, searchText ) }</td>

    <td className = { noWrap } title={ Modified } >{ ModifiedDate } -{ ModifiedAge } days</td>
    <td className = { noWrap } title={ Editor.Title } >{ getHighlightedText( Editor.Title, searchText ) }</td>

    {/* This is an example of adding an on-click to filter on column value */}
    {/* <td className = { noWrap } title={ null } onClick= { () => { props.onPropFilter( 'Status', Status, ) }}  >{ Status }</td> */}

    {/* This is an example of adding an on-click with a link */}
    {/* <td className = { noWrap } title={ WebUrl } onClick= { () => {  window.open( WebUrl ,'_blank') }} >{ getHighlightedText( WebUrl, searchText ) }</td> */}
  </tr>;

  return row;

}


