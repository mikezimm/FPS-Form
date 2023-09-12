import * as React from 'react';
import { useState, useEffect } from 'react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { HoverCard, HoverCardType } from 'office-ui-fabric-react/lib/HoverCard';

import { IMyProgress, } from '@mikezimm/fps-library-v2/lib/common/interfaces/fps/IMyInterfaces';
import { autoDetailsList } from '@mikezimm/fps-library-v2/lib/components/molecules/ReactListV1/atoms/detailsList';

require ('./FPSLogListHook.css');

/***
 *     .o88b.  .d88b.  d8b   db .d8888. d888888b  .d8b.  d8b   db d888888b .d8888. 
 *    d8P  Y8 .8P  Y8. 888o  88 88'  YP `~~88~~' d8' `8b 888o  88 `~~88~~' 88'  YP 
 *    8P      88    88 88V8o 88 `8bo.      88    88ooo88 88V8o 88    88    `8bo.   
 *    8b      88    88 88 V8o88   `Y8b.    88    88~~~88 88 V8o88    88      `Y8b. 
 *    Y8b  d8 `8b  d8' 88  V888 db   8D    88    88   88 88  V888    88    db   8D 
 *     `Y88P'  `Y88P'  VP   V8P `8888Y'    YP    YP   YP VP   V8P    YP    `8888Y' 
 *                                                                                 
 *                                                                                 
 */


/***
 *    db   db  .d88b.   .d88b.  db   dD      d8888b. d8888b.  .d88b.  d8888b. .d8888. 
 *    88   88 .8P  Y8. .8P  Y8. 88 ,8P'      88  `8D 88  `8D .8P  Y8. 88  `8D 88'  YP 
 *    88ooo88 88    88 88    88 88,8P        88oodD' 88oobY' 88    88 88oodD' `8bo.   
 *    88~~~88 88    88 88    88 88`8b        88~~~   88`8b   88    88 88~~~     `Y8b. 
 *    88   88 `8b  d8' `8b  d8' 88 `88.      88      88 `88. `8b  d8' 88      db   8D 
 *    YP   YP  `Y88P'   `Y88P'  YP   YD      88      88   YD  `Y88P'  88      `8888Y' 
 *                                                                                    
 *                                                                                    
 */

export interface IFPSLogListHookProps {
  title: string;
  titles: [];
  items: IMyProgress[];
  descending: boolean;
  showWhenEmpty: boolean;  // Default = true
  maxChars?: number;
}


/***
 *    .d8888. d888888b  .d8b.  d8888b. d888888b      db   db  .d88b.   .d88b.  db   dD 
 *    88'  YP `~~88~~' d8' `8b 88  `8D `~~88~~'      88   88 .8P  Y8. .8P  Y8. 88 ,8P' 
 *    `8bo.      88    88ooo88 88oobY'    88         88ooo88 88    88 88    88 88,8P   
 *      `Y8b.    88    88~~~88 88`8b      88         88~~~88 88    88 88    88 88`8b   
 *    db   8D    88    88   88 88 `88.    88         88   88 `8b  d8' `8b  d8' 88 `88. 
 *    `8888Y'    YP    YP   YP 88   YD    YP         YP   YP  `Y88P'   `Y88P'  YP   YD 
 *                                                                                     
 *                                                                                     
 */

const FPSLogListHook: React.FC<IFPSLogListHookProps> = ( props ) => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { items, showWhenEmpty, title } = props;

  useEffect(() => {
    console.log( 'FPSLogListHook - render' );
  }, );

  const maxChars = props.maxChars ? props.maxChars : 20;
  /***
   *    d88888b db      d88888b .88b  d88. d88888b d8b   db d888888b .d8888. 
   *    88'     88      88'     88'YbdP`88 88'     888o  88 `~~88~~' 88'  YP 
   *    88ooooo 88      88ooooo 88  88  88 88ooooo 88V8o 88    88    `8bo.   
   *    88~~~~~ 88      88~~~~~ 88  88  88 88~~~~~ 88 V8o88    88      `Y8b. 
   *    88.     88booo. 88.     88  88  88 88.     88  V888    88    db   8D 
   *    Y88888P Y88888P Y88888P YP  YP  YP Y88888P VP   V8P    YP    `8888Y' 
   *                                                                         
   *                                                                         
   */
    const itemRows = items.length === 0 ? null : items.map( ( item, index ) => { 
      const actionCell = <div><span>
        {/* { itemIcon } // was always null in Easy Contents */}
        {/* { item.label.length > maxChars ? item.label.slice(0,maxChars) + '...' : item.label }</span> */}
        { item.label }</span>
      </div>;

      const iconStyles: any = { root: {
        color: item.color ? item.color : "blue",
        fontWeight: '700',
      }};

      const normalIcon = <Icon iconName={ item.icon ? item.icon : "Info"} className={ 'progressRowIcon' } styles = {iconStyles}/>;

      //import { buildPropsHoverCard } from '../../../../../services/hoverCardService';
      // const detailsCards = autoDetailsList( item, ["refElement","time","logLabel","label","description"], [] , false );

      const onRenderPlainCard = ( ): JSX.Element => {
        const showTheseProps = autoDetailsList( item, ["refElement","time","logLabel","label","description", "refLabel"], [] , false );
        const tipLine = showTheseProps.length > 20 ?  <p><span style={{fontSize: 'x-large', fontWeight: 600, color: 'darkblue'}}><mark>TIP: </mark>Use Mouse Wheel to scroll down page, Don't use scroll bar!</span></p> : null ;

        const detailsElement = <div className='progressHoverElement'>
          <div>
            { tipLine }
            { showTheseProps }
          </div>
        </div>
        return detailsElement;
      };

      const hoverCard: JSX.Element =
        <HoverCard
          cardDismissDelay={ 300 }
          type={ HoverCardType.plain }
          plainCardProps={{
            onRenderPlainCard: onRenderPlainCard,
          }}>
          <div style={{ whiteSpace: 'nowrap'}}>{ normalIcon }</div>
        </HoverCard>

      return <tr key={ index } className='progressRow'>
        <td> { actionCell }</td>
        <td>{ hoverCard }</td>
      </tr>; 
    });

  const logTable = <table style={{ display: 'block'}} className={ 'progressTable' }>
      <tr><th>{ title }</th><th>Info</th></tr>
      { itemRows }
  </table>;

  /***
   *    d88888b d888888b d8b   db  .d8b.  db           d88888b db      d88888b .88b  d88. d88888b d8b   db d888888b 
   *    88'       `88'   888o  88 d8' `8b 88           88'     88      88'     88'YbdP`88 88'     888o  88 `~~88~~' 
   *    88ooo      88    88V8o 88 88ooo88 88           88ooooo 88      88ooooo 88  88  88 88ooooo 88V8o 88    88    
   *    88~~~      88    88 V8o88 88~~~88 88           88~~~~~ 88      88~~~~~ 88  88  88 88~~~~~ 88 V8o88    88    
   *    88        .88.   88  V888 88   88 88booo.      88.     88booo. 88.     88  88  88 88.     88  V888    88    
   *    YP      Y888888P VP   V8P YP   YP Y88888P      Y88888P Y88888P Y88888P YP  YP  YP Y88888P VP   V8P    YP    
   *                                                                                                                
   *                                                                                                                
   */

  const FinalElement: JSX.Element = items.length === 0 && showWhenEmpty === false ? null : <div className={ '' }>
    <h2>{ title + 's'}</h2>
    { logTable }
  </div>;

  return ( FinalElement );

}

export default FPSLogListHook;