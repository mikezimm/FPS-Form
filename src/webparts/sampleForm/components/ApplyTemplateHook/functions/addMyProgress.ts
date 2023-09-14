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

  const percentComplete = n !== 0 ? i / n : 0;
  const id: string = makeid(5);
  const label = `${itemType}s ${i} of ${n} : ${name}`;
  const MyProgress: IMyProgress = {
    id: id,
    timeMS: timeMS,
    rowLabel: `${step} [ ${itemType} ${i} of ${n} ${id}] => ${name + ' - at ' + timeStr}`,
    refLabel: refLabel,
    time: timeStr,
    logLabel: ` ${step} Adding ${itemType} to list ( ${name} ): `,
    label: label + '- at ' + timeStr,
    description: `${itemType}s ${i} of ${n} : ${name}`,
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