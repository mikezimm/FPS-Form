import { ISourceProps } from "@mikezimm/fps-library-v2/lib/pnpjs/SourceItems/Interface";
import { updateCommandItems } from "@mikezimm/fps-library-v2/lib/pnpjs/CommandItems/updateItem";
import { createSeriesSort } from "@mikezimm/fps-library-v2/lib/pnpjs/SourceItems/createOrderBy";
import { prepSourceColumns } from "@mikezimm/fps-library-v2/lib/pnpjs/SourceItems/prepSourceColumns";
import { IFixerUpperHookRead } from './IFixerUpperHookRead';
import { IStateSource } from "@mikezimm/fps-library-v2/lib/pnpjs/Common/IStateSource";
import { replaceHTMLEntities } from "@mikezimm/fps-library-v2/lib/logic/Strings/html";
import { IFixerUpperMode } from "./FixerUpperHook";
import { IVerifiedSummary, IVerifiedType } from "./IVerifiedSummary";
import { IReplaceOWizard } from "./IFixerUpperHookRead";

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

    item.ReplaceOWizard = null; // Needed to reset on subsequent calls so it does not just keep adding to last verified count
    const newItem = verifyLinks( item, );

    if ( newItem.ReplaceOWizard.hrefs.length > 0 || newItem.ReplaceOWizard.srcs.length > 0 ) { 
      verifiedItems.push( newItem );
    }

  });

  return verifiedItems;

}


//newItem = verifyLinks( item );
export function summarizeVerifiedItems( items: IFixerUpperHookRead[], ) : IVerifiedSummary[] {

  let verifiedSummaries: IVerifiedSummary[] = [];

  items.map( ( item: IFixerUpperHookRead ) => {

    verifiedSummaries = addItemToSummary( 'hrefs', verifiedSummaries, item );
    verifiedSummaries = addItemToSummary( 'srcs', verifiedSummaries, item );
    // if ( item.ReplaceOWizard.hrefs.length ) { 
    //   item.ReplaceOWizard.hrefs.map( link => {
    //     // Find a Verified Summary if it already exists.
    //     let idx = verifiedSummaries.length;
    //     verifiedSummaries.map( ( summary: IVerifiedSummary, isummary: number ) => { 
    //       if ( summary.find === link ) idx = isummary;
    //     });
    //     // Create new Verified Summary if it was not yet found.
    //     if ( idx === verifiedSummaries.length ) {
    //       verifiedSummaries.push({
    //         find: link, hrefs: [], srcs: [], all: [], types: [],
    //       });
    //     }
    //     verifiedSummaries[idx].hrefs.push( item );
    //     verifiedSummaries[idx].all.push( item );
    //     if ( verifiedSummaries[idx].types.indexOf( 'hrefs' ) === -1 ) verifiedSummaries[idx].types.push( 'hrefs' ) ;
    //   })

    // }

  });

  // Credit to bing chat :) - get Total sum of the counts of all the items
  const found = verifiedSummaries.reduce((total, obj) => total + obj.linkCount, 0);
  // Credit to bing chat :) - Sorts descending by total count
  verifiedSummaries.sort((a, b) => b.linkCount - a.linkCount);
  console.log( 'found total summarizable items:', found );

  const complexSums: IVerifiedSummary[] = [];
  verifiedSummaries.map( summary => { if ( summary.types.length > 1 ) complexSums.push( summary ) } );
  console.log( 'found total summarizable: Comp', complexSums)

  return verifiedSummaries;

}

export function addItemToSummary( check: IVerifiedType, verifiedSummaries: IVerifiedSummary[], item: IFixerUpperHookRead,  ): IVerifiedSummary[] {

  if ( item.ReplaceOWizard[ check ].length > 0 ) {
    // Go through each link in this item's check array ( either hrefs or srcs )
    item.ReplaceOWizard[ check ].map( link => {

      // Find a Verified Summary if it already exists.
      let idx = verifiedSummaries.length;
      verifiedSummaries.map( ( summary: IVerifiedSummary, isummary: number ) => { 
        if ( summary.find === link ) idx = isummary;
      });

      // Create new Verified Summary if it was not yet found.
      if ( idx === verifiedSummaries.length ) {
        verifiedSummaries.push({
          iCount: 0, linkCount: 0, find: link, types: [], hrefs: [], hrefsIds: [], hrefsCounts: [], srcs: [], srcsIds: [], srcsCounts: [], all: [], allIds: [], allCounts: [], FPSItem: null,
        });
      }

      // update verifiedSummaries item
      let itemIdxInChecksIds = verifiedSummaries[idx][ `${check}Ids` ].indexOf( item.Id );
      if ( itemIdxInChecksIds < 0 ) { 
        itemIdxInChecksIds = verifiedSummaries[idx][ `${check}Ids` ].length;
        verifiedSummaries[idx][ `${check}Ids` ].push( item.Id );  // adds Item.Id this Verified's check Ids if not already there
        verifiedSummaries[idx][ check ].push( item );
        verifiedSummaries[idx][ `${check}Counts` ].push( 0 );
      }

      verifiedSummaries[idx][ `${check}Counts` ][ itemIdxInChecksIds ] ++;

      let itemIdxInAllIds = verifiedSummaries[idx].allIds.indexOf( item.Id );
      if ( verifiedSummaries[idx].allIds.indexOf( item.Id ) < 0 ) {   // adds Item.Id this Verified's all Ids if not already there
        itemIdxInAllIds = verifiedSummaries[idx].allIds.length;
        verifiedSummaries[idx].allIds.push( item.Id ); // Add item's Id to the allIds array
        verifiedSummaries[idx].all.push( item ); // Add item to the all array
        verifiedSummaries[idx].iCount ++;
        verifiedSummaries[idx].allCounts.push( 0 );
      }
      verifiedSummaries[idx].allCounts[ itemIdxInAllIds ] ++;

      verifiedSummaries[idx].linkCount ++;

      // if ( verifiedSummaries[ idx ].find === link ) {
      //   const testItem = `https&#58;//alva-hlpfsp01\.alv\.autoliv\.int/ALC/CSVtoExcel\.gif`;
      //   if ( link === testItem ) {
      //     console.log( 'Found Test Object', link, verifiedSummaries[ idx ] );
      //   }
      //   verifiedSummaries[ idx ].linkCount += 1;
      //   if ( link === testItem ) {
      //     console.log( 'verifiedSummaries[ idx ].linkCount', verifiedSummaries[ idx ].linkCount );
      //   }
      // }

      // Adds either 'srcs' or 'hrefs' to the types array.
      if ( verifiedSummaries[ idx ].types.indexOf( check ) === -1 ) verifiedSummaries[ idx ].types.push( check ) ;
    });

    // // Add the total count of all of this summary item found in this item's array of links counting for multiple instances
    // item.ReplaceOWizard[ check ].map( link => { 
    //   if ( verifiedSummaries[ idx ].find === link ) {
    //     const testItem = "/sites/SP_GlobalItsSandboxRichText/Trainer Pics/Survey\\.png";
    //     if ( link === testItem ) {
    //       console.log( 'Found Test Object', link, verifiedSummaries[ idx ] );
    //     }
    //     verifiedSummaries[ idx ].linkCount += 1;
    //     if ( link === testItem ) {
    //       console.log( 'verifiedSummaries[ idx ].linkCount', verifiedSummaries[ idx ].linkCount );
    //     }
    //   }
    // });

    // verifiedSummaries[ idx ].linkCount += item.ReplaceOWizard[ check ].length;
  }

  verifiedSummaries.map( ( summary: IVerifiedSummary ) => {
    const { types, find, allIds } = summary;
    const meta = [
      ...types,
      find,
      allIds.join( ', ')
    ]
    const FPSItem = {
      Search: {
        searchText: meta.join( ' ||| '),
        searchTextLC: meta.join( ' ||| ').toLocaleLowerCase(),
        meta: meta,
    }}
    summary.FPSItem = FPSItem as any;
  } );

  return verifiedSummaries;

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
  // this regex finds either hrefs or srcs
  const regex = ele === 'href' ? /href="([^"]*)"/g : /src="([^"]*)"/g;
  // this regex replaces some other characters.... not exactly sure what though any more.
  const newStr = inputString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const hrefs = newStr.match(regex);
  // This finds an array of href or src links and then removes the href or src part and the trailing quote, puts into array:  cleanHrefs
  const cleanHrefs = hrefs ? hrefs.map( item => { 
    // replace the leading src=" and final quote"
    let tempLink = decodeURIComponent( item ).replace( `${ele}="`, '' ).replace(/"$/, '');
    // Found through testing that at this point, there was a \\. where every . should have been.
    tempLink = replaceHTMLEntities( tempLink ).replace( `\\.`, `.` );
    return tempLink;

  } ) : null;
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