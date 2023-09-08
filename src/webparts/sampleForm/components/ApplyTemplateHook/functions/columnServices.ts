
import { IFieldAddResult, FieldTypes, UrlFieldFormatType,
    ChoiceFieldFormatType,
    DateTimeFieldFormatType, CalendarType, DateTimeFieldFriendlyFormatType,
    FieldUserSelectionMode,
    IField, } from "@pnp/sp/fields/types";

import { IMyFieldTypes, } from '@mikezimm/fps-library-v2/lib/components/molecules/Provisioning/interfaces/columnTypes';

import { changes, cBool, cCalcT, cCalcN, cChoice, cMChoice, cCurr, cDate, 
  cMText, cText, cNumb, cURL, cUser, cMUser } from '@mikezimm/fps-library-v2/lib/components/molecules/Provisioning/interfaces/columnTypes';

import { doesObjectExistInArray } from '@mikezimm/fps-library-v2/lib/logic/Arrays/searching/objectfind';

import { IMyListInfo, IServiceLog, notify } from '@mikezimm/fps-library-v2/lib/components/molecules/Provisioning/interfaces/listTypes';

import { getHelpfullErrorV2 } from '@mikezimm/fps-library-v2/lib/logic/Errors/friendly';
import { BaseErrorTrace } from '@mikezimm/fps-library-v2/lib/PackageConst';  //, [ BaseErrorTrace , 'Failed', 'try switchType ~ 324', helpfulErrorEnd ].join('|')   let helpfulErrorEnd = [ myList.title, f.name, i, n ].join('|');

import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/fields";
import "@pnp/sp/fields/list";
import { IMyProgress } from "@mikezimm/fps-library-v2/lib/common/interfaces/fps/IMyInterfaces";
import { addMyProgress } from "./addMyProgress";

export interface IFieldLog extends IServiceLog {
    field?: string;
}

export const minInfinity: number = -1.7976931348623157e+308;
export const maxInfinity: number = -1 * minInfinity ;

function checkForKnownColumnIssues(){

    //Need to add something to check the following:
    //Columns that are Hidden, can't be 'Required' or they will be editable or cause issues.

}

// addText(title: string, maxLength?: number, properties?: IFieldCreationProperties)
// ensure(title: string, desc?: string, template?: number, enableContentTypes?: boolean, additionalSettings?: Partial<IListInfo>): Promise<IListEnsureResult>;

//private async ensureTrackTimeList(myListName: string, myListDesc: string, ProjectOrTime: string): Promise<boolean> {

/**
 * 
 * @param steps - array of pre-defined steps... makes it easier to separate 'Create' process from 'updates' which need to happen later on.
 * @param readOnly - If this is just in 'Test' mode, then don't actually make changes
 * @param myList - list definition object
 * @param ensuredList - ensured list which should be done prior to calling these functions so it's only done one time
 * @param currentFields - list of existing fields fetched prior to calling this function
 * @param fieldsToAdd - array of typed field objects you want to create or verify... code will do them in order of the array
 * @param alertMe - used for logging and testing
 * @param consoleLog - used for logging and testing
 * @param skipTry - was used prior to adding 'currentFields' so you wouldn't have to 'try' adding/checking if column existed before creating it.
 */
export async function addTheseFields( steps : changes[], readOnly: boolean, myList: IMyListInfo, ensuredList: any, currentFields: IField[] , fieldsToAdd: IMyFieldTypes[], setProgress: any, alertMe: boolean, consoleLog: boolean, skipTry = false): Promise<IFieldLog[]>{

    let statusLog : IMyProgress[] = [];

    let listFields = null;

    if (readOnly === false ) {
        if ( ensuredList.list === undefined ) {
            listFields = ensuredList.fields;
        } else {
            listFields = ensuredList.list.fields;
        }
    } else { 
        listFields = ensuredList.fields;
    }
    

    //alert('Need to check for checkForKnownColumnIssues here');

      /**
    * @param progressHidden 
    * @param current : current index of progress
    * @param ofThese : total count of items in progress
    * @param color : color of label like red, yellow, green, null
    * @param icon : Fabric Icon name if desired
    * @param logLabel : short label of item used for displaying in list
    * @param label : longer label used in Progress Indicator and hover card
    * @param description 
   */

    statusLog = await addMyProgress( statusLog, false, 'Field', 0, 0 , '', 'TimePicker', myList.title, 'Adding FIELDS to list', 'Add' , `Starting` , setProgress, `Checking for FIELDS` );

    for ( const step of steps ) {

        //https://stackoverflow.com/a/6121234
        const fieldsToDo = step ==='create' ? fieldsToAdd : fieldsToAdd.filter(x => x[ step as 'title' ] !== null);
        let i = 0;
        const n = fieldsToDo.length;


        if (n > 0 ) {
            // setProgress(false, "C", 0, n , '', 'Next', '##### ' + step, 'Adding FIELDS to list: ' + myList.title, 'Checking for FIELDS', step + ' ~ 93' );
            statusLog = await addMyProgress( statusLog, false, 'Field', 0, n , '', 'Next', myList.title, step, 'Start Adding Fields', 'Started' , setProgress, `Checking for FIELDS ${ step } ~ 93`, );
        }

        for (const f of fieldsToDo) {
          const helpfulErrorEnd = [ myList.title, f.name, i, n ].join('|');
            //console.log(step + ' trying adding column:', f);
            i++;
            let foundField = skipTry === true ? true : false;
            let skipTryField : boolean;

            // setProgress(false, "C", i, n , 'darkgray', 'CalculatorSubtract', f.name, 'Adding fields to list (' + step +'): ' + myList.title, 'Field ' + i + ' of ' + n + ' : ' + f.name , step + ' fieldsToDo ~ 102' );
            statusLog = await addMyProgress( statusLog, false, 'Field', i, n , 'darkgray', 'CalculatorSubtract', f.name, step , 'Add Field', 'Starting',  setProgress, `fieldsToDo ~ 102`, );


            if (readOnly === true ) { 
                foundField = false;//
                skipTryField = false;

            } else if ( step !== 'create' && step !== 'setForm' && f[step] != null ) {
                //Skip trying field because it's not having anything done to it
                foundField = false;//
                skipTryField = false;
            } else { skipTryField = skipTry; }

            let foundFieldIndex = null;
            if ( skipTryField != true ) {
                try {

                    //const checkField = await listFields.getByInternalNameOrTitle(f.name).get();
                    //statusLog = notify(statusLog, step, f,  'Checked', 'Found', checkField);

                    //Assuming that if I'm creating a column, it's an object with .name value.
                    const checkField = f.name ;
                    foundFieldIndex = doesObjectExistInArray(currentFields, 'StaticName', checkField );
                    if ( foundFieldIndex ) {
                        foundField = true;
                    } else {
                        foundField = false;
                        const err = `The ${myList.title} list does not have this column yet:  ${checkField}`;
                        // statusLog = notify(statusLog, 'Checked Field', err, step, f,  null);
                        statusLog = await addMyProgress( statusLog, false, 'Field', i, n , 'darkgray', 'CalculatorSubtract', f.name, step , 'Check Exists', 'Not Found', setProgress, err, );
                    }

                    //console.log('newTryField tested: ', foundField );

                } catch (e) {
                    // if any of the fields does not exist, raise an exception in the console log
                    const errOutput = getHelpfullErrorV2(e, alertMe, consoleLog, [ BaseErrorTrace , 'Failed', 'skipTryField ~ 146', helpfulErrorEnd ].join('|') );
                    if (errOutput.friendly.indexOf('missing a column') > -1) {
                        const err = `The ${myList.title} list does not have this column yet:  ${f.name}`;
                        // statusLog = notify(statusLog, 'Checked Field', err, step, f, null);
                        statusLog = await addMyProgress( statusLog, false, 'Field', i, n , 'darkgray', 'CalculatorSubtract', f.name, step, 'Check Exists', 'Error' , setProgress, err, );
                    } else {
                        const err = `The ${myList.title} list had this error so the webpart may not work correctly unless fixed:  `;
                        // statusLog = notify(statusLog, 'Checked Field', err, step, f, null);
                        statusLog = await addMyProgress( statusLog, false, 'Field', i, n , 'darkgray', 'CalculatorSubtract', f.name, step, 'Check Exists', 'Error' , setProgress, err, );
                    }
                    setProgress(false, "E", i, n , 'darkred', 'ErrorBadge', 'Col: ' + f.name, 'Houston we have a problem: ' + myList.title, 'Field ' + i + ' of ' + n + ' : ' + f.name, step + ' Error! ~ 156' );
                }
            }

            if (readOnly === true || foundField === true) { 
                if (foundField === true ) { 

                    const verifyField : any = checkIfFieldMatches( f, currentFields[foundFieldIndex as any] );
                    
                    console.log('checkIfFieldMatches ' + f.name, verifyField, f );

                    if ( verifyField === true ) {
                        // setProgress(false, "C", i, n , 'blueviolet', 'CheckMark', f.name, 'Check Field: ' + myList.title, 'Field ' + i + ' of ' + n + ' : ' + f.name, step + ' Looks ok ~ 160' + ' - NOT updating ' + verifyField );

                        statusLog = await addMyProgress( statusLog, false, 'Field', i, n , 'blueviolet', 'CheckMark', f.name, step, 'Check Field', 'Verified', setProgress, step + ' Looks ok ~ 160 - NOT updating ' + verifyField, );

                    } else {
                        // setProgress(false, "E", i, n , 'darkorange', 'Warning12', f.name, 'Check Field: ' + myList.title, 'Field ' + i + ' of ' + n + ' : ' + f.name, step + ' Something Changed! ~ 162 ' + verifyField );
                        statusLog = await addMyProgress( statusLog, false, 'Field', i, n , 'darkorange', 'Warning12', f.name, step, 'Check Field', 'Something Changed', setProgress, step + ' Something Changed! ~ 162 - NOT updating ' + verifyField, );
                    }


                } else { //Log that field was not found
                    // setProgress(false, "E", i, n , 'darkred', 'ErrorBadge', 'Col: ' + f.name, 'Missing Field: ' + myList.title, 'Field ' + i + ' of ' + n + ' : ' + f.name, step + ' Missing Field! ~ 167' );
                    statusLog = await addMyProgress( statusLog, false, 'Field', i, n , 'darkred', 'ErrorBadge', f.name, step, 'Check Field', 'Not Found', setProgress, step + ' Missing Field! ~ 167 - NOT updating ' );
                }

            }

            //Have to do this in order for TS not to throw error
            const thisField = JSON.parse(JSON.stringify(f));
            //onCreateProps?: IFieldCreationProperties;  //Initial Properties at time of creating field
            //onCreateChanges?: IFieldCreationProperties;  //Properties you want changed right after creating field (like update Title so it's matches calculated column titles)
            let actualField : IFieldAddResult = null;

            if ( readOnly === false ) {

                if ( step === 'create' && foundField === false) {
                    if (thisField.xml) {
                        try {
                            actualField = await listFields.createFieldAsXml(thisField.xml);
                        } catch (e) {
                            // if any of the fields does not get created, raise an exception in the console log
                            const errOutput = getHelpfullErrorV2(e, alertMe, consoleLog, [ BaseErrorTrace , 'Failed', 'try actualField ~ 194', helpfulErrorEnd ].join('|') );
                            if (errOutput.friendly.indexOf('missing a column') > -1) {
                                const err = `The ${myList.title} list does not have this column yet:  ${f.name}`;
                                
                                // statusLog = notify(statusLog, 'Create XML Field', err, step, f, null);
                                statusLog = await addMyProgress( statusLog, false, 'Field', i, n , 'darkred', 'ErrorBadge', f.name, step, 'Create XML Field', 'Missing Column' , setProgress, err );

                            } else {
                                const err = `The ${myList.title} list had this error so there was a problem:  `;
                                statusLog = await addMyProgress( statusLog, false, 'Field', i, n , 'darkred', 'ErrorBadge', f.name, step, 'Create XML Field', 'List Error' , setProgress, err );
                                // statusLog = notify(statusLog, 'Create XML Field', err, step, f, null);
                            }
                            // setProgress(false, "E", i, n , 'red', 'Error', f.name, 'Error Creating Field: ' + myList.title, 'Field ' + i + ' of ' + n + ' : ' + f.name, step + ' create XML ~ 201' );
                            statusLog = await addMyProgress( statusLog, false, 'Field', i, n , 'red', 'Error', f.name, step, 'Create XML Field', 'Error' , setProgress, step + ' create XML ~ 201' );
                        }

    
                    } else {
                      
                        const thisFieldType = f.fieldType; // ['fieldType'];
                        const thisType = thisFieldType.type; // ['type'];
                        const vType = thisFieldType.vType; // ['vType'];

                        console.log('Creating field',f);

                        try {
                            switch ( thisType ){
                                case cText.type :
                                    actualField = await listFields.addText( thisField.name,
                                        thisField.maxLength ? thisField.maxLength : 255,
                                        thisField.onCreateProps );
                                    break ;
        
                                case cMText.type :
                                    actualField = await listFields.addMultilineText(thisField.name,
                                        thisField.numberOfLines ? thisField.numberOfLines : 6,
                                        thisField.richText ? thisField.richText : false,
                                        thisField.restrictedMode ? thisField.restrictedMode : false,
                                        thisField.appendOnly ? thisField.appendOnly : false,
                                        thisField.allowHyperlink ? thisField.allowHyperlink : false,
                                        thisField.onCreateProps);
        
                                    break ;
        
                                case cNumb.type :
                                    actualField = await listFields.addNumber(thisField.name,
                                        thisField.minValue === null || thisField.minValue === undefined ? minInfinity : thisField.minValue ,
                                        thisField.maxValue === null || thisField.maxValue === undefined ? maxInfinity : thisField.maxValue ,
                                        thisField.onCreateProps);
                                    break ;
        
                                case cURL.type :
                                    actualField = await listFields.addUrl(thisField.name,
                                        thisField.displayFormat ? thisField.displayFormat : UrlFieldFormatType.Hyperlink,
                                        thisField.onCreateProps);
                                    break ;
        
                                case cChoice.type :
                                    actualField = await listFields.addChoice(thisField.name, thisField.choices,
                                        thisField.format ? thisField.format : ChoiceFieldFormatType.Dropdown,
                                        thisField.fillIn ? thisField.fillIn : false,
                                        thisField.onCreateProps);
                                    break ;
        
                                case cMChoice.type :
                                        actualField = await listFields.addMultiChoice(thisField.name, thisField.choices,
                                            thisField.fillIn ? thisField.fillIn : false,
                                            thisField.onCreateProps);
                                        break ;
        
                                case cUser.type :
                                    actualField = await listFields.addUser(thisField.name,
                                        thisField.selectionMode ?  thisField.selectionMode : FieldUserSelectionMode.PeopleOnly,
                                        thisField.onCreateProps);
                                    break ;
        
                                case cMUser.type : {
                                    const fieldName = thisField.name;
                                    const fieldTitle = thisField.title ? thisField.title : thisField.Title ? thisField.Title : thisField.onCreateProps.Title ? thisField.onCreateProps.Title : fieldName;
                                    const fieldGroup = thisField.onCreateProps.Group ? thisField.onCreateProps.Group : '';
                                    const fieldDesc = thisField.onCreateProps.Description ? thisField.onCreateProps.Description : '';
                                    const fieldSelectMode = thisField.selectionMode;
                                    const fieldRequired = thisField.onCreateProps.Required === true ? "TRUE" : "FALSE";
                                    let thisSchema = '<Field DisplayName="' + fieldTitle + '" Type="UserMulti"';
                                    thisSchema += ' Required="' + fieldRequired + '"';
                                    thisSchema += ' StaticName="' + fieldName + '" Name="' + fieldName + '"';
                                    thisSchema += ' UserSelectionMode="' + fieldSelectMode + '"';
                                    thisSchema += ' Group="' + fieldGroup + '"';
                                    thisSchema += ' Description="' + fieldDesc + '"';
                                    thisSchema += ' EnforceUniqueValues="FALSE" ShowField="ImnName" UserSelectionScope="0" Mult="TRUE" Sortable="FALSE"/>';
                                    // ^^^^ I think ShowField=ImnName shows field as skype jellybean; ShowField=Name shows account name ; ShowField="EMail" shows email address
                                    // ^^^^ EnforceUniqueValues & Sortable need to be false for Multi-select fields.
        
                                    actualField = await listFields.createFieldAsXml(thisSchema);
        
                                    break ;
                                  }
                                case cCalcN.type || cCalcT.type :
                                    actualField = await listFields.addCalculated(thisField.name,
                                        thisField.formula,
                                        thisField.dateFormat ? thisField.dateFormat : DateTimeFieldFormatType.DateOnly,
                                        vType === 'Number'? FieldTypes.Number : FieldTypes.Text,  //FieldTypes.Number is used for Calculated Link columns
                                        thisField.onCreateProps);
                                    break ;
        
                                case cDate.type :
                                    actualField = await listFields.addDateTime(thisField.name,
                                        thisField.displayFormat ? thisField.displayFormat : DateTimeFieldFormatType.DateOnly,
                                        thisField.calendarType ? thisField.calendarType : CalendarType.Gregorian,
                                        thisField.friendlyDisplayFormat ? thisField.friendlyDisplayFormat : DateTimeFieldFriendlyFormatType.Disabled,
                                        thisField.onCreateProps);
                                    break ;
        
                                case cBool.type :
                                    actualField = await listFields.addBoolean( thisField.name, thisField.onCreateProps );
                                    break ;
        
                                case cCurr.type :
                                    actualField = await listFields.addCurrency(thisField.name,
                                        thisField.minValue === null || thisField.minValue === undefined ? minInfinity : thisField.minValue ,
                                        thisField.maxValue === null || thisField.maxValue === undefined ? maxInfinity : thisField.maxValue ,
                                        thisField.currencyLocalId ? thisField.currencyLocalId : maxInfinity,
                                        thisField.onCreateProps);
                                    break ;
        
                                default :   // stuff
                                    alert('Didn\'t find field type for ' + thisField.name + ':  ' + JSON.stringify(thisField.fieldType));
                                    break ;
                            }
                            foundField = true;
                            // statusLog = notify(statusLog, 'Created Field', 'Complete', step, f, actualField);
                            // setProgress(false, "C", i, n , 'darkgreen', 'Add', f.name, 'Created Field: ' + myList.title, 'Field ' + i + ' of ' + n + ' : ' + f.name, step + ' created ~ 258' );

                            statusLog = await addMyProgress( statusLog, false, 'Field', i, n , 'red', 'Error', f.name, step, 'Create Field', 'Error' , setProgress, step + ' created ~ 258' );


                        } catch (e) {
                            foundField = true;
                            // if any of the fields does not get created, raise an exception in the console log
                            const errOutput = getHelpfullErrorV2(e, alertMe, consoleLog, [ BaseErrorTrace , 'Failed', 'try switchType ~ 324', helpfulErrorEnd ].join('|') );
                            if ( errOutput.friendly.indexOf('The formula refers to a column that does not exist.') > -1 || errOutput.friendly.indexOf('Check the formula') > -1 || errOutput.friendly.indexOf('circular reference') > -1 ) {
                                const errField: any = f;
                                const err = `Here's the formula you have for ${f.name} \n\n ${ errField.formula}`;
                                // statusLog = notify(statusLog, 'Create Field', err, step, f, null);
                                statusLog = await addMyProgress( statusLog, false, 'Field', i, n , 'red', 'Error', f.name, step, 'Create Field', 'Error' , setProgress, err );
                                errOutput.friendly = err + '\n\n' + errOutput.friendly;

                            } else if ( thisFieldType['type'] === cMChoice.type ) {
                                if ( thisField.onCreateProps && thisField.onCreateProps.Indexed ) {
                                    const err = `You are trying to Index a MultiChoice column ( ${f.name} ) which is NOT allowed :).\n\nGo to column settings and make sure choices are set by hand.`;
                                    // statusLog = notify(statusLog, 'Create Field', err, step, f, null);
                                    statusLog = await addMyProgress( statusLog, false, 'Field', i, n , 'red', 'Error', f.name, step, 'Create Field', 'Error' , setProgress, err );

                                    errOutput.friendly = err + '\n\n' + errOutput.friendly;
                                }

                            } else {
                                const err = `The ${myList.title} list had this error so the webpart may not work correctly unless fixed:  `;
                                // statusLog = notify(statusLog, 'Create Field', err, step, f, null);
                                statusLog = await addMyProgress( statusLog, false, 'Field', i, n , 'red', 'Error', f.name, step, 'Create Field', 'Error' , setProgress, err );
                            }
                            // setProgress(false, "E", i, n , 'red', 'Error', f.name, 'Error Creating Field: ' + myList.title, 'Field ' + i + ' of ' + n + ' : ' + f.name, errOutput.friendly + ' ~ 331' );
                            statusLog = await addMyProgress( statusLog, false, 'Field',i, n , 'red', 'Error', f.name, step, 'Create Field', 'Error' , setProgress, errOutput.friendly + ' ~ 331' );

                        }
                    }

                }

                if ( step !== 'setForm' && step !== 'create' ) { // Will do changes1, changes2, changes3 and changesFinal
                    //Loop through other types of changes

                    if ( thisField[step] !== null ) {
                        const otherChanges = await listFields.getByInternalNameOrTitle(f.name).update(thisField[step]);
                        // statusLog = notify(statusLog, step + ' Field', JSON.stringify(thisField[step]), step, f, otherChanges);
                        // setProgress(false, "C", i, n , 'midnightblue', 'Sync', f.name, 'Updated Field: ' + myList.title, 'Field ' + i + ' of ' + n + ' : ' + f.name, step + ' other ~ 269' );

                        statusLog = await addMyProgress( statusLog, false, 'Field', i, n , 'midnightblue', 'Sync', f.name, step, 'Updated Field', 'Error' , setProgress, step + ' other ~ 269' );

                    }

                } else if ( foundField === true ) {
                    if ( step === 'create' || step === 'setForm' ) {
                        if ( thisField.showNew === false || thisField.showNew === true ) {
                            const setDisp = await listFields.getByInternalNameOrTitle(f.name).setShowInNewForm(thisField.showNew);
                            // statusLog = notify(statusLog, 'setShowNew Field', 'Complete',step, f, setDisp);
                            // setProgress(false, "C", i, n , 'slategrey', 'AddTo', f.name, 'setShowNew Field: ' + myList.title, 'Field ' + i + ' of ' + n + ' : ' + f.name, step + ' showNew ~ 277' );
                            statusLog = await addMyProgress( statusLog, false, 'Field', i, n , 'slategrey', 'AddTo', f.name, step, 'setShowNew Field', 'Success' , setProgress, step + ' showNew ~ 277' );

                        }

                        if ( thisField.showEdit === false || thisField.showNew === true ) {
                            const setDisp = await listFields.getByInternalNameOrTitle(f.name).setShowInEditForm(thisField.showEdit);
                            // statusLog = notify(statusLog, 'setShowEdit Field', 'Complete', step, f, setDisp);
                            // setProgress(false, "C", i, n , 'saddlebrown', 'PageHeaderEdit', f.name, 'setShowEdit Field: ' + myList.title, 'Field ' + i + ' of ' + n + ' : ' + f.name, step + ' showEdit ~ 283' );
                            statusLog = await addMyProgress( statusLog, false, 'Field', i, n , 'saddlebrown', 'PageHeaderEdit', f.name, step, 'setShowEdit Field', 'Success' , setProgress, step + ' showEdit ~ 283' );

                        }

                        if ( thisField.showDisplay === false || thisField.showNew === true ) {
                            const setDisp = await listFields.getByInternalNameOrTitle(f.name).setShowInDisplayForm(thisField.showDisplay);
                            // statusLog = notify(statusLog, 'setShowDisplay Field', 'Complete', step, f, setDisp);
                            // setProgress(false, "C", i, n , 'midnightblue', 'EntryView', f.name, 'setShowDisplay Field: ' + myList.title, 'Field ' + i + ' of ' + n + ' : ' + f.name, step + ' showDisplay ~ 289' );
                            statusLog = await addMyProgress( statusLog, false, 'Field', i, n , 'midnightblue', 'EntryView', f.name, step, 'setShowDisplay Field', 'Success' , setProgress, step + ' showDisplay ~ 289' );
                        }
                    } //END: if ( step === 'create' || step === 'setForm' ) {

                    if ( step === 'create') {
                        if (thisField.onCreateChanges) {
                            const createChanges = await listFields.getByInternalNameOrTitle(f.name).update(thisField.onCreateChanges);
                            // statusLog = notify(statusLog, 'onCreateChanges Field', 'update===' + JSON.stringify(thisField.onCreateChanges), step, f, createChanges);
                            // setProgress(false, "C", i, n , 'darkred', 'SyncStatus', f.name, 'onCreateChanges Field: ' + myList.title, 'Field ' + i + ' of ' + n + ' : ' + f.name, step + ' onCreateChanges ~ 297' );
                            statusLog = await addMyProgress( statusLog, false, 'Field', i, n , 'darkred', 'SyncStatus', f.name, step, 'Update', 'update===' + JSON.stringify(thisField.onCreateChanges) , setProgress, step + ' onCreateChanges ~ 297' );

                        } //END: if (thisField.onCreateChanges) {

                    }

                }  //END:  if ( foundField === true ) {

            } //END:  if ( readOnly === false ) {

        }  //END: for (let f of fieldsToAdd) {
    }  //END: for ( let step of steps ) {

    //console.log('addTheseFields', statusLog);
    return statusLog;

}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function checkIfFieldMatches( definition : IMyFieldTypes, actual : any ) : any {

    let result = '';
    if ( definition.fieldType.type !== actual['odata.type'] ) { 
        if (  definition.fieldType.type === 'SP.FieldUserMulti' && actual['odata.type'] === 'SP.FieldUser' ) {
            //This is known difference between code and reality to get it all to work.  Ignore difference
        } else {
            result += `\nType is ${actual['odata.type']}, expected ${definition.fieldType.type}`; 
        }
    }

    const indexed = getExpectedFieldProperty(definition, 'Indexed' );
    if ( indexed !== actual.Indexed ) { result = indexed === 'Not Found' && actual.Indexed === false ? result : result += `\nIndexed is ${actual.Indexed}, expected ${indexed}`; }

    const required = getExpectedFieldProperty(definition, 'Required' );
    if ( required !== actual.Required ) { result = required === 'Not Found' && actual.Required === false ? result : result += `\nRequired is ${actual.Required}, expected ${required}`; }

    const hidden = getExpectedFieldProperty(definition, 'Hidden' );
    if ( hidden !== actual.Hidden ) { result = hidden === 'Not Found' && actual.Hidden === false ? result : result += `\nHidden is ${actual.Hidden}, expected ${hidden}`; }

    const title = getExpectedFieldProperty(definition, 'Title' );
    if ( title !== actual.Title ) {
        if ( title === 'Not Found' && actual.Title !== actual.StaticName) {
            result += `\nTitle is ${actual.Title}, expected ${actual.StaticName}`;
        }
    }

    const formula = getExpectedFieldProperty(definition, 'formula' );  //Note formula is lowerCase on object, ProperCase on actual field.
    if ( formula !== true ) {
        if ( formula === 'Not Found' && actual.Formula ) {
            result += `Formula is ${actual.Formula}, expected Nothing`;
        }
    }

    if ( result !== '' ) { console.log('FAILED CHECK definition: ',definition, actual, result); }

    return result === '' ? true : result;

}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function checkValueOnFieldObject( definition : IMyFieldTypes, key: string, value: any) : any {

    if ( definition[key as 'title'] !== undefined ) { return definition[key as 'title'] === value ? true : definition[key as 'title'] ;}
    else if ( definition.onCreateProps !== undefined && definition.onCreateProps[key] !== undefined  ) { return definition.onCreateProps[key] === value ? true : false ;}
    else if ( definition.onCreateChanges !== undefined && definition.onCreateChanges[key] !== undefined  ) { return definition.onCreateChanges[key] === value ? true : false ;}
    else if ( definition.changesFinal !== undefined && definition.changesFinal[key] !== undefined  ) { return definition.changesFinal[key] === value ? true : false ;}
    else if ( definition.changes1 !== undefined && definition.changes1[key] !== undefined  ) { return definition.changes1[key] === value ? true : false ;}
    else if ( definition.changes2 !== undefined && definition.changes2[key] !== undefined  ) { return definition.changes2[key] === value ? true : false ;}
    else if ( definition.changes3 !== undefined && definition.changes3[key] !== undefined  ) { return definition.changes3[key] === value ? true : false ;}

    return 'Not Found';

}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getExpectedFieldProperty( definition : IMyFieldTypes, key: string ) : any {

    if ( definition[key as 'title'] !== undefined ) { return definition[key as 'title'] ;}
    else if ( definition.onCreateProps !== undefined && definition.onCreateProps[key] !== undefined  ) { return definition.onCreateProps[key] ;}
    else if ( definition.onCreateChanges !== undefined && definition.onCreateChanges[key] !== undefined  ) { return definition.onCreateChanges[key] ;}
    else if ( definition.changesFinal !== undefined && definition.changesFinal[key] !== undefined  ) { return definition.changesFinal[key] ;}
    else if ( definition.changes1 !== undefined && definition.changes1[key] !== undefined  ) { return definition.changes1[key] ;}
    else if ( definition.changes2 !== undefined && definition.changes2[key] !== undefined  ) { return definition.changes2[key] ;}
    else if ( definition.changes3 !== undefined && definition.changes3[key] !== undefined  ) { return definition.changes3[key] ;}

    return 'Not Found';

}

