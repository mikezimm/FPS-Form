import * as React from 'react';
import stylesC from './Categories.module.scss';
import { ICategoriesProps, ICategoriesState } from './ICategoriesProps';

import { ILoadPerformance, } from "../../fpsReferences";
import { highlightStringBetweenB } from './highlightRegex';

// export default class FpsCore1152Banner extends React.Component<ICategoriesProps, IFpsCore1152BannerState> {
export default class Categories extends React.Component<ICategoriesProps, ICategoriesState> {

  private _performance: ILoadPerformance = null;

 /***
*     .o88b.  .d88b.  d8b   db .d8888. d888888b d8888b. db    db  .o88b. d888888b  .d88b.  d8888b. 
*    d8P  Y8 .8P  Y8. 888o  88 88'  YP `~~88~~' 88  `8D 88    88 d8P  Y8 `~~88~~' .8P  Y8. 88  `8D 
*    8P      88    88 88V8o 88 `8bo.      88    88oobY' 88    88 8P         88    88    88 88oobY' 
*    8b      88    88 88 V8o88   `Y8b.    88    88`8b   88    88 8b         88    88    88 88`8b   
*    Y8b  d8 `8b  d8' 88  V888 db   8D    88    88 `88. 88b  d88 Y8b  d8    88    `8b  d8' 88 `88. 
*     `Y88P'  `Y88P'  VP   V8P `8888Y'    YP    88   YD ~Y8888P'  `Y88P'    YP     `Y88P'  88   YD 
*                                                                                                  
*                                                                                                  
*/

  public constructor(props:ICategoriesProps){
    super(props);

    const { text1, text2 } = this.props;
    this.state = {
      text1: text1 ? text1.value : '',
      text2: text2 ? text2.value : '',
      testString: '',
      searchText: '',
      topSearch: [],
      topIdx: null,
      topMeta: '',
      topSearchLabels: [],
    };
  }

  public async componentDidMount(): Promise<void> {
    //
  }

  /***
   *         d8888b. d888888b d8888b.      db    db d8888b. d8888b.  .d8b.  d888888b d88888b 
   *         88  `8D   `88'   88  `8D      88    88 88  `8D 88  `8D d8' `8b `~~88~~' 88'     
   *         88   88    88    88   88      88    88 88oodD' 88   88 88ooo88    88    88ooooo 
   *         88   88    88    88   88      88    88 88~~~   88   88 88~~~88    88    88~~~~~ 
   *         88  .8D   .88.   88  .8D      88b  d88 88      88  .8D 88   88    88    88.     
   *         Y8888D' Y888888P Y8888D'      ~Y8888P' 88      Y8888D' YP   YP    YP    Y88888P 
   *         
   *         
   */

  public async componentDidUpdate( prevProps: ICategoriesProps, prevState: ICategoriesState ): Promise<void> {
    //
  }

  public _updatePerformance (): boolean  {
    //
    return true;
  }

  public render(): React.ReactElement<ICategoriesProps> {
    const { EasySearch, } = this.props;
    const { text1, text2, } = this.state;

    const testString = `${ text1 } --- ${ text2 }`;

    console.log( 'HubCategories ~ render' );

    if ( this.props.expandedState !== true ) return ( <div>{}</div> );
    const MatchedRegex: RegExp[] = [];
    const EasySearchElement: JSX.Element = <div className={ stylesC.regArrays }>
      { Object.keys( EasySearch ).map( key => {
        return <div key={ key }className={ stylesC.ARegexCat }>
          <h2 >{ key }</h2>
          <ul>
            {
              EasySearch[ key as 'Customer1' ].map( reg => {
                const wasFound: boolean = testString.match( reg ) ? true : false;
                if ( wasFound === true ) MatchedRegex.push( reg );
                const highlighted = wasFound === false ? highlightStringBetweenB( `${reg}`, false ) : highlightStringBetweenB( `${reg}`, true );
                // console.log( `render highlighted type = ${ typeof highlighted }`, `${reg}`);
                return <li className = { wasFound === true ? stylesC.regMatch : stylesC.regNull } key={ `${reg}` }>{ highlighted }</li>
              })
            }
          </ul>
        </div>
      })
      }
    </div>

    // eslint-disable-next-line @rushstack/security/no-unsafe-regexp
    const combinedRegex = new RegExp(MatchedRegex.map(r => r.source).join('|'), 'g');
    const stringToSearch = testString;
    const matches = stringToSearch.match(combinedRegex);

    console.log( 'HubCategories ~ render matches', matches );

    // [ styles.Categories, bannerProps.bannerPillShape === true ? styles.bannerPillShapeSideMargin : '', ${hasTeamsContext ? styles.teams : '' ].join(' ')
    return (
      <section className={[ stylesC.allCategories ].join(' ')}>
        <h2>Testing this string:</h2>
        <div style={{ marginBottom: '20px' }}>{ testString }</div>
        { EasySearchElement }
      </section>
    );
  }


}
