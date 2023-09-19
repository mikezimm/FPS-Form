/* eslint-disable dot-notation */

import * as React from 'react';

import { getHighlightedText } from '@mikezimm/fps-library-v2/lib/components/atoms/Elements/HighlightedText';

import { ISourceRowRender } from '@mikezimm/fps-library-v2/lib/components/molecules/SourcePage/ISourceRowRender';

import styles from './RowStyles.module.scss';
import { IAnySourceItem } from '@mikezimm/fps-library-v2/lib/components/molecules/AnyContent/IAnyContent';
import { ISimpleLink } from '@mikezimm/fps-library-v2/lib/logic/Links/Interfaces';
import { IReplaceOWizard, IReplaceOWizardHistory, } from './updateListData';

require ('@mikezimm/fps-styles/dist/fpsGeneralCSS.css');
const noWrap = `fps-gen-text-ellipse`; // From fps-stiles fpsGeneralCSS.css
const noWrapX = ``; // From fps-stiles fpsGeneralCSS.css

export interface IFixerUpperHookRead extends IAnySourceItem {
  ID: number;
  Title: string;
  Question: string;
  Answer: string;
  Category: string;
  Link_x002f_URL: ISimpleLink;
  Role: string;
  Deliverable_x0020_type: string;
  Modified: string;
  Editor: any;
  ReplaceOWizard: IReplaceOWizard;
}

export const exampleRowHeaders: string[] =[ 'ID', 'Title', 'Question', 'Answer', 'Category', 'Link', 'Role', 'Replacement', ];

export function createFixerUpperRow( props: ISourceRowRender ): JSX.Element { // eslint-disable-line @typescript-eslint/no-explicit-any
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { item, onClick, searchText, onParentCall } = props; // details, showItemType, onOpenPanel

  const thisItem: IFixerUpperHookRead = item as IFixerUpperHookRead;

  const { Title, Id, Created, Author, Modified, Editor, Question, Answer, Category, Link_x002f_URL, Role, Deliverable_x0020_type, ReplaceOWizard } = thisItem; // , BannerImageUrl, PromotedState

  const created = thisItem?.FPSItem?.Stamp?.created;
  const CreateDate = created ? created.dayYYYYMMDD : '';
  const CreateAge = created ? created.age.toFixed( 1 ) : '';

  const modified = thisItem?.FPSItem?.Stamp?.modified;
  const ModifiedDate = modified ? modified.dayYYYYMMDD : '';
  const ModifiedAge = modified ? modified.age.toFixed( 1 ) : '';

  // Link_x002f_URL', 'Role', 'Deliverable_x0020_type'

  const row = <tr className={ styles.requestsRow } onClick = { () => onClick( Id, 'generic', item ) }>

    <td title={ null } onClick= { () => props.onParentCall( 'Item', item.Id, '', item ) }  >{ Id }</td>
    <td className = { noWrapX } title={ Title } >{ getHighlightedText( Title, searchText ) }</td>
    <td className = { noWrapX } title={ Title } >{ getHighlightedText( Question, searchText ) }</td>
    <td className = { styles.cellRich } title={ Title } >{ getHighlightedText( Answer, searchText ) }</td>
    <td className = { noWrapX} title={ Title } >{ getHighlightedText( Category, searchText ) }</td>
    {/* <td className = { noWrapX } title={ Title } >{ getHighlightedText( Link_x002f_URL.Description, searchText ) }</td> */}
    <td className = { noWrapX } title={ Title } >Add Link column here</td>
    <td className = { noWrapX } title={ Title } >{ getHighlightedText( Role, searchText ) }</td>
    {/* <td className = { noWrapX } title={ Title } >{ getHighlightedText( Deliverable_x0020_type, searchText ) }</td> */}
    {/* <td className = { noWrapX } title={ Title } >Add Deliverable column here</td> */}
    <td className = { ReplaceOWizard ? styles.cellReplace : '' } title={ Title } >{ ReplaceOWizard ? JSON.stringify( ReplaceOWizard ) : `-na-` }</td>

    {/* This is an example of adding an on-click to filter on column value */}
    {/* <td className = { noWrap } title={ null } onClick= { () => { props.onPropFilter( 'Status', Status, ) }}  >{ Status }</td> */}

    {/* This is an example of adding an on-click with a link */}
    {/* <td className = { noWrap } title={ WebUrl } onClick= { () => {  window.open( WebUrl ,'_blank') }} >{ getHighlightedText( WebUrl, searchText ) }</td> */}
  </tr>;

  return row;

}


