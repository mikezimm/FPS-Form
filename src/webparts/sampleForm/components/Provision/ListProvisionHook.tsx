import * as React from 'react';
import { useState, useEffect } from 'react';

import { WebPartContext } from "@microsoft/sp-webpart-base";

import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { TextField, MaskedTextField } from "office-ui-fabric-react";

import styles from '../SampleForm.module.scss';
import { doesNotStartNumber, toCamelCase } from './functions/strings';

import { IStateSource } from '@mikezimm/fps-library-v2/lib/pnpjs/Common/IStateSource';
import { createLibraryPnpjs } from './functions/createLibraryPnpjs';
import { requstLibraryLabel } from '../Requests/functions/requestLabel';
import { ICorpLabelsSource } from '../../storedSecrets/AS303 Labels v3 - JSON Formatted';
import { ILoadPerformance, IPerformanceOp } from '@mikezimm/fps-library-v2/lib/components/molecules/Performance/IPerformance';
import { createPerformanceRows } from '@mikezimm/fps-library-v2/lib/components/molecules/Performance/tables';

export interface IListProvisionHookProps {
  context: WebPartContext;
  labelItems: ICorpLabelsSource[];

}

export type ITopButtons = 'Mine' | 'OtherPeeps' | 'ThisSite' | 'OtherSites';
export const TopButtons: ITopButtons[] = [ 'Mine', 'OtherPeeps', 'ThisSite', 'OtherSites' ];

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

const ListProvisionHook: React.FC<IListProvisionHookProps> = ( props ) => {

  const { context, labelItems } = props;

  const [ procPerformance, setProcPerformance ] = useState<IPerformanceOp[]>( [] );

  const [ libTitle, setLibTitle ] = useState< string >( );
  const [ libUrl, setLibUrl ] = useState< string >( );

  const [ libDescription, setLibDescription ] = useState< string >( );
  const [ libFullDescription, setLibFullDescription ] = useState< string >( );
  const [ enableCreate, setenableCreate ] = useState< boolean >( false );
  const [ created, setcreated ] = useState< IStateSource[] >( [] );
  const[ libLabelOptions, setLibLabelOptions ] = useState< IDropdownOption[] >( labelItems.map( ( item ) => {
    return {
      key: item.RecordCode,
      text: `${item.RecordCode}: ${item.RecordTitle}`,
      title: item.RecordTitle,
    }
  }) );

  const [ libLabel, setLibLabel ] = useState< string >( labelItems.length > 0 ? labelItems[0].RecordCode : `` );

  /***
   *     .d88b.  d8b   db       .o88b. db      d888888b  .o88b. db   dD .d8888. 
   *    .8P  Y8. 888o  88      d8P  Y8 88        `88'   d8P  Y8 88 ,8P' 88'  YP 
   *    88    88 88V8o 88      8P      88         88    8P      88,8P   `8bo.   
   *    88    88 88 V8o88      8b      88         88    8b      88`8b     `Y8b. 
   *    `8b  d8' 88  V888      Y8b  d8 88booo.   .88.   Y8b  d8 88 `88. db   8D 
   *     `Y88P'  VP   V8P       `Y88P' Y88888P Y888888P  `Y88P' YP   YD `8888Y' 
   *                                                                            
   *                                                                            
   */

  const titleChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void => {
    console.log( `titleChange:`, event, newValue );
    const libraryUrl = toCamelCase( newValue );
    const enableCreate = libraryUrl.length > 0 && newValue.length > 0 && !doesNotStartNumber( libraryUrl ) ? true : false;
    setLibUrl( libraryUrl );
    setLibTitle( newValue );
    setenableCreate( enableCreate );
  }

  const descChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void => {
    const libraryFullDescription = `${ newValue ? `${ newValue } - ` : '' }Retention Label: [ ${libLabel} ]`;
    setLibDescription( newValue );
    setLibFullDescription( libraryFullDescription );
  }

  const labelChange = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number): void => {
    console.log( `labelChange:`, event, option );
    const libraryFullDescription = `${ libDescription ? `${ libDescription } - ` : '' }Retention Label: [ ${ option.key } ]`;
    setLibLabel( option.key as `` );
    setLibFullDescription( libraryFullDescription );

  }

  const createLibrary = async ( event: React.MouseEventHandler<HTMLButtonElement> ) : Promise<void> => {

    setenableCreate( false );
    const results: IStateSource = await createLibraryPnpjs( context.pageContext.web.absoluteUrl, libTitle, libUrl, libFullDescription ) as IStateSource;
    await requstLibraryLabel( results.item, libLabel );
    console.log( 'createLibrary results:', results );
    const allCreated: IStateSource[] = [ results, ...created, ];
    setcreated( allCreated );

  }

  /***
 *    d88888b db      d88888b .88b  d88. d88888b d8b   db d888888b 
 *    88'     88      88'     88'YbdP`88 88'     888o  88 `~~88~~' 
 *    88ooooo 88      88ooooo 88  88  88 88ooooo 88V8o 88    88    
 *    88~~~~~ 88      88~~~~~ 88  88  88 88~~~~~ 88 V8o88    88    
 *    88.     88booo. 88.     88  88  88 88.     88  V888    88    
 *    Y88888P Y88888P Y88888P YP  YP  YP Y88888P VP   V8P    YP    
 *                                                                 
 *                                                                 
 */


const ProvisionListElement: JSX.Element = <section className={``}>
  <div className={ styles.requestForm }>
    <div className={ styles.editFields }>
      <TextField 
        label={ `Library Title` }
        disabled={ false }
        placeholder={ 'Enter Title here' }
        autoComplete='off'
        onChange={titleChange.bind( this ) }
        onGetErrorMessage={doesNotStartNumber.bind( this ) }
        required={ true }
      />
      <Dropdown 
        options={ libLabelOptions }
        // styles={ { root: { width: '300px' } } }
        // selectedKey={ LabelOptions[2].key }
        defaultSelectedKey={ libLabelOptions[0].key }
        onChange={labelChange.bind( this ) }
        label="Label to apply"
        required={true}
      />
      <TextField 
        label={ `Library Description` }
        disabled={ false }
        placeholder={ 'Your Label will automatically be added to your Description :)' }
        autoComplete='off'
        onChange={ descChange.bind( this ) }
        onGetErrorMessage={ doesNotStartNumber.bind( this ) }
        required={ true }
      />
    </div>

    <div className={ styles.displayFields } style={{ padding: '20px' }}>
      <div className={ styles.divField }>
        <div>Library Url:</div>
        <div>{ libUrl ? libUrl : 'Enter Title first' }</div>
      </div>
      <div className={ styles.divField }>
        <div>Library Description:</div>
        <div>{ libFullDescription }</div>
      </div>
    </div>

    <button className={ enableCreate === true ? styles.enabled : null }
      disabled={ !enableCreate }
      onClick={ createLibrary.bind( this ) }
      >
      Create Library
    </button>

  </div>
</section>;

  return ( ProvisionListElement );

}

export default ListProvisionHook;