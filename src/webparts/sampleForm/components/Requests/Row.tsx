/* eslint-disable dot-notation */

import * as React from 'react';

import { getHighlightedText } from '@mikezimm/fps-library-v2/lib/components/atoms/Elements/HighlightedText';

import { ISourceRowRender } from '@mikezimm/fps-library-v2/lib/components/molecules/SourcePage/ISourceRowRender';
import { IFPSLabelRequestRead } from './functions/requestLabel';

// require ('@mikezimm/fps-styles/dist/easyAnalytics.css');
// require ('@mikezimm/fps-styles/dist/fpsGeneralCSS.css');


// export const requestRowHeaders: string[] = [ 'Link', 'Gulp', 'Age', 'Who', 'lang', 'Loc', 'Web','Page', 'perf', 'CodeVersion' ];

export function createRequestsRow( props: ISourceRowRender ): JSX.Element { // eslint-disable-line @typescript-eslint/no-explicit-any
  const { item, onClick, searchText, onParentCall } = props; // details, showItemType, onOpenPanel

  const thisItem: IFPSLabelRequestRead = item as IFPSLabelRequestRead;

  const { Title, Id, Created, Label, LibraryGuid, LibraryName, LibraryTitle, Author, LibraryLink, SiteUrl, WebUrl } = thisItem; // , BannerImageUrl, PromotedState

  const age = thisItem.FPSItem && thisItem.FPSItem.Stamp && thisItem.FPSItem.Stamp.created ? thisItem.FPSItem.Stamp.created.age : null;

  const row = <tr className={ 'ezAnalyticsItem' } onClick = { () => onClick( Id, 'generic', item ) }>

    <td onClick= { () => props.onParentCall( 'Item', item.Id, '', item ) } title={ null } >{ Id }</td>
    <td title={ null } >{ getHighlightedText( Title, searchText ) }</td>
    <td title={ null } >{ getHighlightedText( Label, searchText ) }</td>
    <td title={ null } >{ getHighlightedText( LibraryTitle, searchText ) }</td>
    <td title={ null } >{ getHighlightedText( WebUrl, searchText ) }</td>
    <td title={ Created } >{ age ? age.toFixed( 2 ) : '' }</td>

  </tr>;

  return row;

}


