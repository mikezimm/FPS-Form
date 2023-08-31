import * as React from 'react';
import styles from './SampleForm.module.scss';
import { ISampleFormProps, ISampleFormState } from './Provision/interfaces/ISampleFormProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { TextField, MaskedTextField } from "office-ui-fabric-react";
import { Toggle, } from 'office-ui-fabric-react/lib/Toggle';
import { LabelExportJSON } from '../storedSecrets/AS303 Labels v3 - JSON Formatted';
import { createFPSLibrary } from './Provision/functions/createFPSLibrary';
import { createLibraryPnpjs } from "./Provision/functions/createLibraryPnpjs";
import { requstLibraryLabel } from "./Requests/functions/requestLabel";
import { makeid } from '@mikezimm/fps-library-v2/lib/logic/Strings/guids';
import { LabelRequestSource, fetchLabelRequests, fetchMinimalLabelRequests } from './Requests/functions/fetchLabelRequests';
import { ISourceProps } from '@mikezimm/fps-library-v2/lib/pnpjs/SourceItems/Interface';
import { IStateSource } from '@mikezimm/fps-library-v2/lib/pnpjs/Common/IStateSource';

import ListProvisionHook from './Provision/ListProvisionHook'

export default class SampleForm extends React.Component<ISampleFormProps, ISampleFormState> {

  private LabelOptions: IDropdownOption[] = LabelExportJSON.map( ( item ) => {
    return {
      key: item.RecordCode,
      text: `${item.RecordCode}: ${item.RecordTitle}`,
      title: item.RecordTitle,
    }
  });

  private DefaultLabel = this.LabelOptions[2].key;

  public constructor(props:ISampleFormProps){
    super(props);

    const constId: string = makeid(5);

    this.state = {
        libraryUrl: ``,
        libraryTitle: ``,
        libraryLabel: this.DefaultLabel as ``,
        libraryDescription: ``,
        libraryFullDescription: `Retention Label: [ ${this.DefaultLabel} ]}`,
        enableCreate: false,

        created: [],

        users : { fpsContentType: [ 'item' ], items: [], index: [], loaded: false, refreshId: constId, status: 'Unknown', e: null, },
        sites : { fpsContentType: [ 'item' ], items: [], index: [], loaded: false, refreshId: constId, status: 'Unknown', e: null },
        requests : { fpsContentType: [ 'item' ], items: [], index: [], loaded: false, refreshId: constId, status: 'Unknown', e: null },
        allRequests : { fpsContentType: [ 'item' ], items: [], index: [], loaded: false, refreshId: constId, status: 'Unknown', e: null },
    };
  }

  public async componentDidMount(): Promise<void> {

    const MockBannerProps = {
      FPSUser: { Title: this.props.context.pageContext.user.displayName },
      context: { pageContext: { site: {  serverRelativeUrl: this.props.context.pageContext.site.serverRelativeUrl }}}
    }
    const [ users, sites, requests ] = await fetchMinimalLabelRequests( MockBannerProps as any, null, [] );
    const all = await fetchLabelRequests( MockBannerProps as any, LabelRequestSource as ISourceProps , null );

    console.log( 'Found these Requests: users', users );
    console.log( 'Found these Requests: sites', sites );
    console.log( 'Found these Requests: requests', requests );
    console.log( 'Found these Requests: all', all );

    this.setState( { users: users, sites: sites, requests: requests, allRequests: all });

  }

  public render(): React.ReactElement<ISampleFormProps> {
    const {

    } = this.props;

    return (
      <ListProvisionHook 
        context={ this.props.context }
        labelItems={ LabelExportJSON }
      />
      // <section className={`${styles.sampleForm} ${hasTeamsContext ? styles.teams : ''}`}>
      //   <div className={ styles.requestForm }>
      //     <div className={ styles.editFields }>
      //       <TextField 
      //         label={ `Library Title` }
      //         disabled={ false }
      //         placeholder={ 'Enter Title here' }
      //         autoComplete='off'
      //         onChange={ this.titleChange.bind( this ) }
      //         onGetErrorMessage={ this.doesNotStartNumber.bind( this ) }
      //         required={ true }
      //       />
      //       <Dropdown 
      //         options={ this.LabelOptions }
      //         // styles={ { root: { width: '300px' } } }
      //         // selectedKey={ LabelOptions[2].key }
      //         defaultSelectedKey={ this.DefaultLabel }
      //         onChange={ this.labelChange.bind( this ) }
      //         label="Label to apply"
      //         required={true}
      //       />
      //       <TextField 
      //         label={ `Library Description` }
      //         disabled={ false }
      //         placeholder={ 'Your Label will automatically be added to your Description :)' }
      //         autoComplete='off'
      //         onChange={ this.descChange.bind( this ) }
      //         onGetErrorMessage={ this.doesNotStartNumber.bind( this ) }
      //         required={ true }
      //       />
      //     </div>

      //     <div className={ styles.displayFields } style={{ padding: '20px' }}>
      //       <div className={ styles.divField }>
      //         <div>Library Url:</div>
      //         <div>{ this.state.libraryUrl ? this.state.libraryUrl : 'Enter Title first' }</div>
      //       </div>
      //       <div className={ styles.divField }>
      //         <div>Library Description:</div>
      //         <div>{ this.state.libraryFullDescription }</div>
      //       </div>
      //     </div>

      //     <button className={ this.state.enableCreate === true ? styles.enabled : null }
      //       disabled={ !this.state.enableCreate }
      //       onClick={ this.createLibrary.bind( this ) }
      //       >
      //       Create Library
      //     </button>

      //   </div>
      // </section>
    );
  }

  private titleChange(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void {
    console.log( `titleChange:`, event, newValue );
    const libraryUrl = this.toCamelCase( newValue );
    const enableCreate = libraryUrl.length > 0 && newValue.length > 0 && !this.doesNotStartNumber( libraryUrl ) ? true : false;

    this.setState({ libraryUrl: this.toCamelCase( newValue ), libraryTitle: newValue, enableCreate: enableCreate });
  }

  private descChange(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void {
    const libraryFullDescription = `${ newValue ? `${ newValue } - ` : '' }Retention Label: [ ${this.state.libraryLabel} ]`;
    this.setState({ libraryDescription: newValue, libraryFullDescription: libraryFullDescription });
  }

  private labelChange(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number): void {
    console.log( `labelChange:`, event, option );
    const libraryFullDescription = `${ this.state.libraryDescription ? `${ this.state.libraryDescription } - ` : '' }Retention Label: [ ${ option.key } ]`;
    this.setState({ libraryLabel: option.key as ``, libraryFullDescription: libraryFullDescription });
  }

  private async createLibrary( event: React.MouseEventHandler<HTMLButtonElement> ) : Promise<void> {
    this.setState({ enableCreate: false });
    const results: IStateSource = await createLibraryPnpjs( this.props.context.pageContext.web.absoluteUrl, this.state.libraryTitle, this.state.libraryUrl, this.state.libraryFullDescription ) as IStateSource;
    await requstLibraryLabel( results.item, this.state.libraryLabel );
    console.log( 'createLibrary results:', results );
    const created: IStateSource[] = [ results, ...this.state.created, ];
    this.setState({ created: created });

  }


  /**
   * Here's the updated JavaScript function that converts the given string to camel case without spaces and replaces all non-alphanumeric characters with no character:
   * 
   * This function uses a helper function convert to achieve the desired result. The convert function is defined outside of the toCamelCase function and is used as a callback in the replace method. The convert function takes two arguments: word and index. If the index is 0, it returns the first character of the word in uppercase. Otherwise, it returns the first character of the word in uppercase and replaces all non-alphanumeric characters with no character and converts the first character of each non-first word to uppercase.

For example, if you pass the string "this is a sentance" to this function, it will return "ThisIsASentance". Similarly, if you pass the string "this is a sentance!@#" to this function, it will also return "ThisIsASentance".

   * @param str 
   * @returns 
   */
  private toCamelCase(str: string ): string {
    function convert( word: string, index: number ) : string {
      if (index === 0) {
        return word.toUpperCase();
      } else {
        return word.toUpperCase().replace(/[^a-zA-Z0-9]+(.)/g, function(match, chr) {
          return chr.toUpperCase();
        });
      }
    }

    let newStr = str.toLowerCase().replace(/(?:^\w|[A-Z]|\b\w)/g, convert).replace(/\s+/g, '');
    const special = /[*{}()'"`=+&^%$#@!~|[\\\].,\/\?<>-]/g;
    newStr = newStr.replace( special, '' );
    return newStr;
  }

  private doesNotStartNumber (value: string) : string | JSX.Element | undefined {
    const noNumberStart = /^[0-9]/;
    const result = noNumberStart.test(value);

    return result === true ? `DO NOT start with number` : undefined;
  }
}
