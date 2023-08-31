/* eslint-disable dot-notation */

import * as React from 'react';

import { getHighlightedText } from '../../../../../components/atoms/Elements/HighlightedText';

import { buildClickableIcon } from '../../../../../components/atoms/Icons/stdIconsBuildersV02';
import { IZFetchedAnalytics } from '../interfaces/IStateSourceA';
import { ISourceRowRender } from '../../../../../components/molecules/SourcePage/ISourceRowRender';
import { IAnalyticsLinkIcon, getBestAnalyticsLinkAndIcon } from './getBestAnalyticsLinkAndIcon';
import { checkDeepProperty } from '../../../../../logic/Objects/deep';
import { getPageTitle } from './getPageTitle';

require ('@mikezimm/fps-styles/dist/easyAnalytics.css');
require ('@mikezimm/fps-styles/dist/fpsGeneralCSS.css');

export const ezAnalyticsItemHeaders1: string[] = [ 'Id', ];
export const ezAnalyticsItemHeaders2: string[] = [ 'Link', 'Gulp', 'Age', 'Who', 'lang', 'Loc', 'Web','Page', 'perf', 'CodeVersion' ];

export function createItemsRow( props: ISourceRowRender ): JSX.Element { // eslint-disable-line @typescript-eslint/no-explicit-any
  const { item, onClick, searchText, onParentCall } = props; // details, showItemType, onOpenPanel

  const thisItem: IZFetchedAnalytics = item as IZFetchedAnalytics;

  const { Title, Id, Created, SiteTitle, CodeVersion, } = thisItem; // , BannerImageUrl, PromotedState
  const age = thisItem.FPSItem && thisItem.FPSItem.Stamp && thisItem.FPSItem.Stamp.created ? thisItem.FPSItem.Stamp.created.age : null;

  const isItem: boolean = Id ? true : false;
  const siteUrl = thisItem.SiteLink ? `${thisItem.SiteLink.Url}` : '';

  const performanceOp = thisItem.performanceObj ? checkDeepProperty( thisItem.performanceObj, [ 'ops', 'fetch' ] , 'EmptyString' ) : 'na';
  const performanceObj = performanceOp === 'na' ? null : thisItem.performanceObj.ops.fetch;
  const performanceLabel = performanceObj ? performanceObj.label && ( typeof performanceObj.ms === 'number' || performanceObj.ms.indexOf('paused') < 0 ) ? `${ performanceObj.ms} - ${performanceObj.label }` : `click`  : '-na-';

  const row = !isItem ? undefined : <tr className={ 'ezAnalyticsItem' } onClick = { () => onClick( Id, 'generic', item ) }>
    <td title={ null }  onClick= { thisItem.Id ? () => props.onParentCall( 'PerformancePanel', item.Id, '', item ) : undefined } 
      style={{ cursor: performanceObj ? 'pointer' : 'default' }}
      >{ getHighlightedText( `${thisItem.Id}`, searchText ) }</td>

    {  !props.optionalColumns1 ? undefined : props.optionalColumns1.map( ( prop: string ) => {
      return <td title={ null } >{ 
        getHighlightedText( `${checkDeepProperty( thisItem, prop.split( '.' ), 'EmptyString' )}`, searchText )
      }</td>
    })}

    <td title={ null } >{ getSiteIcon( thisItem, false ) }</td>
    <td title={ null } >{ getSiteIcon( thisItem, true ) }</td>
    <td title={ Created } >{ age ? age.toFixed( 2 ) : '' }</td>
    <td title={ null } >{ getHighlightedText( thisItem[ 'Author/Title' ], searchText ) }</td>
    <td title={ null } >{ getHighlightedText( thisItem[ 'language' ], searchText ) }</td>
    <td title={ null } >{ getHighlightedText( thisItem[ 'Author/Office' ], searchText ) }</td>
    <td className={ siteUrl ? 'fps-gen-goToLink' : '' } title={ siteUrl } onClick= { () => {  window.open( siteUrl ,'_blank') }}>{ getHighlightedText( SiteTitle, searchText ) }</td>
    <td title={ null } >{ getPageTitle( thisItem ) }</td>
    <td title={ null } onClick= { performanceObj ? () => props.onParentCall( 'PerformancePanel', item.Id, '', item ) : undefined }
        style={{ cursor: performanceObj ? 'pointer' : 'default' }}> { performanceLabel }</td>
    <td title={ null } >{ CodeVersion }</td>

    {  !props.optionalColumns2 ? undefined : props.optionalColumns2.map( ( prop: string ) => {
      return <td title={ null } >{
        getHighlightedText( `${checkDeepProperty( thisItem, prop.split( '.' ), 'EmptyString' )}`, searchText )
      }</td>

    })}

  </tr>;

  return row;

}

export const ProcessingRunIcon : string = 'ProcessingRun';
export const SharepointLogo : string = 'SharepointLogo';

export const gulpParam1 = 'debug=true&noredir=true&debugManifestsFile=https://localhost:4321/temp/manifests.js';

export function getSiteIcon( item: IZFetchedAnalytics, gulpMe: boolean ): JSX.Element {
  if ( !item ) { console.log(`EasyAnalytics ERROR: getSiteIcon item is undefined!`, item); return undefined; }

  const itemLinkInfo: IAnalyticsLinkIcon = getBestAnalyticsLinkAndIcon( item, gulpMe, [ 'PageURL' , 'PageLink' , 'SiteLink' ] );
  const { iconName, linkUrl } = itemLinkInfo;

  if ( !linkUrl ) { console.log(`EasyAnalytics ERROR: getSiteIcon linkUrl is undefined!`, item); return undefined; }

  const result = buildClickableIcon( 'EasyContents' , iconName, `Go to Site - ${linkUrl}`, null, () => { window.open( linkUrl ,'_blank') }, item.Id, item.SiteTitle, );
  return result;
}

