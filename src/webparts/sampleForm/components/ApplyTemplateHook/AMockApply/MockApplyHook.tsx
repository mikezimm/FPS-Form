import * as React from 'react';
import { useState, useEffect } from 'react';

import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';

import { IMyProgress, } from '@mikezimm/fps-library-v2/lib/common/interfaces/fps/IMyInterfaces';
import { provisionMockList } from './MockProvision';

require ('./MockApply.css');

export interface IMockApplyHookProps {

}

const MockApplyHook: React.FC<IMockApplyHookProps> = ( props ) => {

  /***
   *    db    db .d8888. d88888b      .d8888. d888888b  .d8b.  d888888b d88888b 
   *    88    88 88'  YP 88'          88'  YP `~~88~~' d8' `8b `~~88~~' 88'     
   *    88    88 `8bo.   88ooooo      `8bo.      88    88ooo88    88    88ooooo 
   *    88    88   `Y8b. 88~~~~~        `Y8b.    88    88~~~88    88    88~~~~~ 
   *    88b  d88 db   8D 88.          db   8D    88    88   88    88    88.     
   *    ~Y8888P' `8888Y' Y88888P      `8888Y'    YP    YP   YP    YP    Y88888P 
   *                                                                            
   *                                                                            
   */

  const [ fields, setFields ] = useState<IMyProgress[]>( [] );
  const [ total, setTotal ] = useState<number>( 0 );
  const [ current, setCurrent ] = useState<number>( 0 );
  const [ status, setStatus ] = useState<string>( 'Waiting' );
  const [ progressX, setProgressX ] = useState<IMyProgress>( null );

  const setProgress = ( progressHidden: boolean, list: 'E' | 'C' | 'V' | 'I', current: number , ofThese: number, color: string, icon: string, logLabel: string, label: string, description: string, ref: string = null ): void => {
    const thisTime = new Date().toLocaleTimeString();
    const percentComplete = ofThese !== 0 ? current/ofThese : 0;

    logLabel = current > 0 ? current + '/' + ofThese + ' - ' + logLabel : logLabel ;
    const progressX : IMyProgress = null;
    // const progressX: IMyProgress = {
    //     ref: ref,
    //     time: thisTime,
    //     logLabel: logLabel,
    //     label: label + '- at ' + thisTime,
    //     description: description,
    //     percentComplete: percentComplete,
    //     progressHidden: progressHidden,
    //     color: color,
    //     icon: icon,
    //   };

    const newTotal = total + 1;
    setTotal( newTotal );
    setCurrent( current );
    setProgressX( progressX );

  if ( list === 'C') {
      console.log( `setProgress: ${list}   ${fields.length}  ${current}  ${ofThese}   ${logLabel} `, progressX, fields );
      const newFields= JSON.parse(JSON.stringify(  [ progressX, ...fields ] ));
      setFields( newFields );

    }
  }

  const markComplete = () : void => {
    setStatus( 'Finished ~ 128' );
  }

  const applyThisTemplate = async (): Promise<void> => {
    console.log( `applyThisTemplate Start` );
    setStatus( 'Starting' );
    const listCreated: string[] = await provisionMockList( setProgress, markComplete , );
    console.log( `applyThisTemplate Finish: `, listCreated );
    setStatus( 'Finished ~ 135' );
  };

  const CurrentProgress = progressX === null ? <div style={{ height: '60px', display: 'inline-flex'}} >No Progress was found</div> : <ProgressIndicator
            label={progressX.label}
            description={progressX.description}
            percentComplete={progressX.percentComplete}
            progressHidden={progressX.progressHidden}/>;

  const ProgressPane: JSX.Element = <div>
    { CurrentProgress }
    <div>Status/current:  { status } / { current }</div>
    { fields.map( ( field: IMyProgress ) => {
        <div>{ field.logLabel }</div>
      })
    }
  </div>;

  const ButtonRow: JSX.Element = <div className='apply-template-dropdown' style={{ display: 'flex', justifyContent: 'space-between' }}>
      <button className={ '' }
        disabled={ false }
        onClick={ applyThisTemplate.bind( this ) }
        >
        Run Function
      </button>
  </div>

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

  console.log( 'MockTemplate: current, total, ', current, total );
  // console.log( 'MockTemplate: total', total );
  // console.log( 'MockTemplate: progressX', progressX );
  // console.log( 'MockTemplate: fields', fields );
  // console.log( 'MockTemplate: status', status );

  const FinalElement: JSX.Element =  <div className = { [ 'apply-template-page' ].join( ' ' ) } style={{ minHeight: '450px' }}>
    <div style={{ fontWeight: 600, fontSize: 'larger', marginBottom: '1em' }}>Want to kick-start your library with a Template?</div>
    { ButtonRow }
    { ProgressPane }

  </div>;

  return ( FinalElement );

}

export default MockApplyHook;