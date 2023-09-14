
import * as React from 'react';

import styles from './SampleForm.module.scss';
import { provTabs } from './SampleForm';

export function ProvisionInstructions(): JSX.Element {

  const result = <div style={{ padding: '1em 2em' }}>
  <div className={ styles.tabHeadingElement } style={{  }} >What to to do here:</div>
    <ul>
      <li style={{  }}><span style={{ fontWeight: 600 }}>Tab:  { provTabs[1] }</span>
        <div>Create a new library with a specific Retention Label automatically applied.</div>
        <ol>
          <li>Pick an AS-303 Retention Label</li>
          <li>Enter a Title for your new library</li>
          <li>Enter a Description for your new library</li>
          <li>Press { `'Create'` }</li>
        </ol>
      </li>
      <li style={{ paddingTop: '10px' }}><span style={{ fontWeight: 600, }}>Tab:  { provTabs[2] }</span>
      <div>Apply a template to a library:  Adds pre-built Columns and Views for some common scenarios.</div>
        <ol>
            <li>Create a library on the { provTabs[1] } Tab</li>
            <li>Go to the { provTabs[2] } Tab</li>
            <li>Select a Template</li>
            <li>Review the Columns and Views it will Add</li>
            <li>Press { `'Apply Template'` }</li>
            <li>Wait for this web part to do the work for you</li>
            <li>Verify your library</li>
          </ol>
      </li>
      <li style={{ paddingTop: '10px' }}><span style={{ fontWeight: 600 }}>Tab:  { provTabs[3] }</span>
      <div>Check status of Provisioning done through this web part.</div>
      <ul>
        <li>See all the libraries <b>on this site that</b> were requested to have a label added</li>
        <li>See all the libraries <b>Everywhere in SharePoint Online where YOU requested</b> to have a label added</li>
        <ul>
          <li>Get links to all the Libraries for those requests</li>
          <li>Get links to all the Sites for those requests</li>
          <li>See what Retention labels were requested</li>
          <li>Check the status of the request</li>
        </ul>
      </ul>
      </li>
    </ul>
  </div>;
  return result;
} 