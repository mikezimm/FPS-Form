import { ISourceProps } from "@mikezimm/fps-library-v2/lib/pnpjs/SourceItems/Interface";
import { updateCommandItems } from "@mikezimm/fps-library-v2/lib/pnpjs/CommandItems/updateItem";
import { createSeriesSort } from "@mikezimm/fps-library-v2/lib/pnpjs/SourceItems/createOrderBy";
import { prepSourceColumns } from "@mikezimm/fps-library-v2/lib/pnpjs/SourceItems/prepSourceColumns";
import { IFixerUpperHookRead } from "./Row";
import { IStateSource } from "@mikezimm/fps-library-v2/lib/pnpjs/Common/IStateSource";
import { IFixerUpperMode } from "./FixerUpperHook";




export function getFixerUpperSource(): ISourceProps {

  const key = 'fixMe';
  const siteUrl = `/sites/SP_GlobalItsSandboxRichText`;
  const listUrl = `Trainer FAQs`;
  const listTitle = 'TrainerFAQs';
  const fetchColumns = [ '*', 'ID', 'Title', 'Question', 'Answer', 'Category', 'Link_x002f_URL', 'Role', 'Deliverable_x0020_type', 'Modified', 'Editor/Title' ];
  const FixSourceProps: ISourceProps = prepSourceColumns( {
    key: key,
    defType: key,
    webUrl: `${window.location.origin}${siteUrl}`,// /${analyticsListX}
    webRelativeLink: `/lists/${listUrl}`,
    searchSource: key,
    searchSourceDesc: key,
    listTitle: listTitle,
    columns: fetchColumns,
    searchProps: fetchColumns,
    selectThese: fetchColumns,
    isModern: true,
    defSearchButtons: [],
    orderBy: createSeriesSort( 'Id', false ),
    fetchCount: 5000,
    performanceSettings: { label: 'analytics', updateMiliseconds: true, includeMsStr: true, op: 'fetch' },
    fpsContentType: [ 'item' ],
  }, null );

  return FixSourceProps;

}

export function getFilteredItems( stateSource: IStateSource, mode: IFixerUpperMode, count: number = 0  ) : IFixerUpperHookRead[] {


  const finalItems: IFixerUpperHookRead[] = [];
  const fixedItems: any[] = [];

  stateSource.items.map( ( item: IFixerUpperHookRead ) => {
    const newItem = shouldWeUpdate( item, mode );

    if ( newItem && newItem.ReplaceOWizard && newItem.ReplaceOWizard.changes.length > 0 ) { 
      finalItems.push( item );
      fixedItems.push( newItem );
    }

  });

  return finalItems;

}

//newItem = verifyLinks( item );
export function getVerifiedItems( items: IFixerUpperHookRead[], ) : IFixerUpperHookRead[] {

  const verifiedItems: IFixerUpperHookRead[] = [];

  items.map( ( item: IFixerUpperHookRead ) => {
    const newItem = verifyLinks( item, );

    if ( newItem.ReplaceOWizard.hrefs.length > 0 || newItem.ReplaceOWizard.srcs.length > 0 ) { 
      verifiedItems.push( newItem );
    }

  });

  return verifiedItems;

}

export function globalReplace ( inputString: string, replaceMe: string, withMe: string ): [number, string ] {
  // eslint-disable-next-line @rushstack/security/no-unsafe-regexp
  const regex = new RegExp(replaceMe.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
  // const regex = new RegExp(replaceMe, 'g');
  let count = 0;
  const result = inputString.replace(regex, function (x) {
    count += 1;
    return withMe;
  });
  return [ count, result ];
}

export interface IReplacementObject {
  prop: string;
  orig: string;
  new: string;
  tags?: string[];
}

const FixerReplacements: IReplacementObject[] = [
  {
    prop: 'Answer',
    orig: `/_layouts/15/listform.aspx?PageType=4&amp;ListId=%7b9F7D0069-748F-4CEE-AB84-82DA52DD7115%7d&amp;`,
    new: `/Lists/Trainer FAQs/DispForm.aspx?`,
  },
  {
    prop: 'Answer',
    orig: `&amp;ContentTypeID=0x0100AC74B0905AD58946AEC4E5884A923411`,
    new: ``,
  }
]

export interface IReplaceOWizard {
  changes: IReplaceOWizardHistory[],
  hrefs: string[];
  srcs: string[];
}

export interface IReplaceOWizardHistory {
  count: number;
  replace: IReplacementObject;
}

const EmptyReplaceOWizard: IReplaceOWizard = {
  changes: [],
  hrefs: [],
  srcs: [],
};


export function shouldWeUpdate( item: IFixerUpperHookRead, mode: IFixerUpperMode, ): IFixerUpperHookRead {

  let shouldUpdate: any = false;
  let newItem: IFixerUpperHookRead = null;
  const ReplaceOWizard = item.ReplaceOWizard ? item.ReplaceOWizard : JSON.parse(JSON.stringify( EmptyReplaceOWizard ) );

  FixerReplacements.map( fixer => {
    if ( item[ fixer.prop as 'Answer' ] && item[ fixer.prop as 'Answer' ].indexOf( fixer.orig ) > -1 ) {
      shouldUpdate = true;
      if ( !newItem ) newItem = mode === 'Test' ? JSON.parse( JSON.stringify( item )) : { [fixer.prop] : item[ fixer.prop as 'Answer' ] } ;
      const [ count, newText ] = globalReplace( newItem[ fixer.prop as 'Answer' ], fixer.orig, fixer.new );
      newItem[ fixer.prop as 'Answer' ] = newText;

      // const oldLength = item[ fixer.prop as 'Answer' ].length;
      // const newLength = newItem[ fixer.prop as 'Answer' ].length;
      // const deltaLength = oldLength - newLength;
      if ( count !== 0 ) {
        // const perDelta = fixer.orig.length - fixer.new.length;
        // const deltaCount = perDelta !== 0 ? deltaLength / perDelta : -97;

        ReplaceOWizard.changes.push(
          {
            count: count,
            replace: fixer,
          }
        );
      }
    }
  });

  if ( shouldUpdate === true ) { 
    newItem.Id = item.Id;
    newItem.ReplaceOWizard = ReplaceOWizard;
  }


  return newItem;

}

function findUrls(ele: 'href' | 'src' , inputString: string): string[] {
  const regex = ele === 'href' ? /href="([^"]*)"/g : /src="([^"]*)"/g;
  const newStr = inputString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const hrefs = newStr.match(regex);
  const cleanHrefs = hrefs ? hrefs.map( item => { return decodeURIComponent( item ) } ) : null;
  return cleanHrefs;
}

// export async function  updateItems( finalItems: IFixerUpperHookRead[], mode: IFixerUpperMode, count: number = 0 ) : Promise<IFixerUpperHookRead[]> {
export function updateItems( finalItems: IFixerUpperHookRead[], mode: IFixerUpperMode, count: number = 5000 ) : IFixerUpperHookRead[] {
  const fixedItems: any[] = [];

  finalItems.map( ( item: IFixerUpperHookRead ) => {
    if ( fixedItems.length < count ) {
      const newItem = shouldWeUpdate( item, mode );

      if ( newItem && newItem.ReplaceOWizard.changes.length > 0 ) {
        fixedItems.push( newItem );
      }
    }
  });

  return fixedItems;

}

// export async function  updateItems( finalItems: IFixerUpperHookRead[], mode: IFixerUpperMode, count: number = 0 ) : Promise<IFixerUpperHookRead[]> {
  export function verifyLinks( item: IFixerUpperHookRead, ) : IFixerUpperHookRead {
    const checkedProps: string[] = [];  
    item.ReplaceOWizard = item.ReplaceOWizard ? item.ReplaceOWizard : JSON.parse(JSON.stringify( EmptyReplaceOWizard ) );

      FixerReplacements.map( fixer => {
        if ( item[ fixer.prop as 'Answer' ] && checkedProps.indexOf( fixer.prop ) < 0 ) {
          checkedProps.push( fixer.prop );
          const hrefs = findUrls( 'href', item[ fixer.prop as 'Answer' ] );
          const srcs = findUrls( 'src', item[ fixer.prop as 'Answer' ] );
          if ( hrefs ) item.ReplaceOWizard.hrefs.push( ...hrefs );
          if ( srcs ) item.ReplaceOWizard.srcs.push( ...srcs );
        } 
      });

    return item;

  }

// export async function  updateItems( finalItems: IFixerUpperHookRead[], mode: IFixerUpperMode, count: number = 0 ) : Promise<IFixerUpperHookRead[]> {
  export async function updateItemsAsync( sourceProps: ISourceProps, finalItems: IFixerUpperHookRead[], count: number = 5000 ) : Promise<IFixerUpperHookRead[]> {
    const updateTheseItems: any[] = updateItems( finalItems, 'Real', count );
    const updatedItems: any[] = [];
    if ( updateTheseItems.length > 0 ) {
      for (let item of updateTheseItems ) {
        const trimmedItem = JSON.parse(JSON.stringify(item));
        delete trimmedItem.Id;
        delete trimmedItem.ReplaceOWizard;
        const updatedItem = await updateCommandItems({
          webUrl: sourceProps.absoluteWebUrl,
          listTitle: sourceProps.listTitle,
          Id: item.Id,
          itemUpdate: trimmedItem,
          alertMe: '',
          consoleLog: 'true',
        });
        updatedItems.push( updatedItem );
        console.log(`updateItemsAsync Item updated: ${ item.Id} `, item.ReplaceOWizard, updatedItem.response );
      }
    }
    console.log(`updateItemsAsync ItemS updated: ${updatedItems.length}`, updatedItems );
    return updateTheseItems;

  }

  // export async function  updateItems( finalItems: IFixerUpperHookRead[], mode: IFixerUpperMode, count: number = 0 ) : Promise<IFixerUpperHookRead[]> {
    // export async function updateItemsAsync( sourceProps: ISourceProps, finalItems: IFixerUpperHookRead[], mode: IFixerUpperMode, count: number = 5000 ) : Promise<IFixerUpperHookRead[]> {
    //   const updateTheseItems: any[] = updateItems( finalItems, mode, count );
    //   const updatedItems: any[] = [];
    //   if ( updateTheseItems.length > 0 ) {
    //     updateTheseItems.map( item => {
    //       const trimmedItem = JSON.parse(JSON.stringify(item));
    //       delete trimmedItem.Id;
    //       const updatedItem = await updateCommandItems({
    //         webUrl: sourceProps.webUrl,
    //         listTitle: sourceProps.listTitle,
    //         Id: item.Id,
    //         itemUpdate: trimmedItem,
    //         alertMe: 'false',
    //         consoleLog: 'true',
    //       });
          
    //     })
  
    //   }
  
    //   return updateTheseItems;
  
    // }