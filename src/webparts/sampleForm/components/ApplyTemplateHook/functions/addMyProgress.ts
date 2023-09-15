import { IMyProgress, } from '@mikezimm/fps-library-v2/lib/common/interfaces/fps/IMyInterfaces';
import { makeid } from '@mikezimm/fps-library-v2/lib/logic/Strings/guids';

// export function addMyProgress( progressHidden: boolean, itemType: 'E' | 'Field' | 'View' | 'Item' | string, current: number , ofThese: number, color: string, icon: string, logLabel: string, label: string, description: string, ref: string = null ) : IMyProgress {

export function addMyProgress( progress: IMyProgress[], progressHidden: boolean, itemType: 'E' | 'Field' | 'View' | 'Item' | string, 
  i: number, n: number, color: string, icon: string, name: string, step: string, verb: string, status: string, 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setProgress : (progress : IMyProgress[]) => void, refLabel: string = null, checkValue: any = null, returnField: any = null, item: any = null): IMyProgress[] {

  const temp: IMyProgress = createProgressObject( false, progressHidden, itemType, i, n, color, icon, name, step, verb, status, refLabel, checkValue, returnField, item );
  progress.unshift( temp );

  if ( setProgress ) setProgress( progress );

  return progress;
}

export function createProgressObject( consoleLog: boolean, progressHidden: boolean, itemType: 'E' | 'Field' | 'View' | 'Item' | string, 
i: number, n: number, color: string, icon: string, name: string, step: string, verb: string, status: string, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
refLabel: string = null, checkValue: any = null, returnField: any = null, item: any = null ) : IMyProgress {

  // await new Promise(resolve => setTimeout(resolve, 350)); // Pause for effect
  const thisTime = new Date();
  const timeMS = thisTime.getTime();
  const timeStr = thisTime.toLocaleTimeString();

  const overRide = verb.indexOf('###') === 0 ? true : false;

  const percentComplete = n !== 0 ? i / n : 0;
  const id: string = makeid(5);
  let label = `${itemType}s ${i} of ${n} : ${name} - at ${timeStr}`;
  let logLabelX = ` ${step} Adding ${itemType} to list ( ${name} ): - at ${timeStr}`;
  let descriptionX = `${itemType}s ${i} of ${n} : ${name}`;

  if ( icon === 'TimePicker' ) {
    // This is the first one of the itemType
    label = `${name}`;
    logLabelX =  `${name}`;
    descriptionX = refLabel;
  } else if ( icon === 'Next' ) {
    // This is the beginning of a step
    label = `##### ${step}`;
    logLabelX =  refLabel;

  } else { // THis is a normal log
    //
  }



  const MyProgress: IMyProgress = {
    id: id,
    timeMS: timeMS,
    rowLabel: `${step} [ ${itemType} ${i} of ${n} ${id}] => ${name + ' - at ' + timeStr}`,
    refLabel: refLabel,
    time: timeStr,
    logLabel: logLabelX,
    label: label,
    description: descriptionX,
    current: i,
    ofThese: n,
    array: itemType,
    percentComplete: percentComplete,
    progressHidden: progressHidden,
    color: color,
    icon: icon,

    // Addedd from IServiceLog used in notify function
    step: step,
    verb: verb,
    status: status,
    checkValue: checkValue,
    returnField: returnField,
    item: item,

  };

  // parsing it to insure it's not mutating somewhere
  const result: IMyProgress = JSON.parse(JSON.stringify(MyProgress));
  if ( consoleLog === true ) console.log( `createProgressObject: `, id, refLabel,  MyProgress );

  return result;
}