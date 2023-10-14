import { IAnySourceItem } from "@mikezimm/fps-library-v2/lib/components/molecules/AnyContent/IAnyContent";
import { check4This } from "../../fpsReferences";

export interface IEasyRegex {
  Customer1?: RegExp [];
  Customer2?: RegExp [];
  Facilities?: RegExp [];
  Products?: RegExp [];
  Global?: RegExp [];
  AAM?: RegExp [];
  AEU?: RegExp [];
  Asia?: RegExp [];
  IT?: RegExp [];
  Functions?: RegExp [];
  WoW?: RegExp [];
  FPSUse?: RegExp [];  // Optional to be passed in
}

const Customer1: RegExp [] = [
  /\bGM\b/g,
  /\bVW\b/g,
  /\bVolkswagon\b/gi,
  /\bBMW\b/g,
  /\bSTLA\b/g,
  /\bFord\b/gi,
  /\bNissan\b/gi,
  /\bFCA\b/gi,
  /\bStellantis\b/gi,
  /\bMercedes\b/gi,
  /\bHonda\b/gi,
];

const Customer2: RegExp [] = [
  /\bBU\b/g,
  /\bSales\b/gi,
  /\bBusiness\b/gi,
  /\bBSG\b/g,
  /\bQuotes?\b/g,
  /\bCustomers?\b/g,
  /\bProgram ?Management\b/g,
  
];

const Facilities: RegExp[] = [
  /\bFacility\b/g,
  /\bFacilities\b/g,
  // /\bFacility\b|^Facility\b/gi,
];

const Products: RegExp[] = [
  // /\bTextiles?\b|^Textiles?\b/gi,
  /\bTextiles?\b/gi,
  /\bAB\b/g,
  /\bSB\b/g,
  /\bSW\b/g,
  /\bIN\b/g,
  /\bBelts?\b/gi,
  /\bSeatBelts?\b/gi,
  /\bInflators?\b/gi,
  /\bDAB\b/g,
  /\bSAB\b/g,
  /\bPAB\b/g,
  /\bIC\b/g,
  /\bRRAB\b/g,
  /\bDU\b/g,
];

const Global: RegExp[] = [
  /\bGlobal\b/g,
];

const AAM: RegExp[] = [
  /\bANA\b/g,
  /\bAAM\b/g,
  /\bSA\b/g,
  /\bASA\b/g,
  /\bNA\b/g,
];

const AEU: RegExp[] = [
  /\bAEU\b/g,
  /\bÄEU\b/g,
  /\bEU\b/g,
];

const Asia: RegExp[] = [
  /\bAsia\b/gi,
  /\bChina\b/gi,
  /\bChinese\b/gi,
  /\bKorean?\b/gi,
  /\bJapan\b/gi,
  /\bJapanese\b/gi,
  /\bThailand\b/gi,
  /\bIndia\b/gi,
];

const IT: RegExp[] = [
  /\bSharePoint\b/g,
  /\bHub ?Connections\b/g,
  /\bService ?Delivery\b/gi,
  /\bUTS\b/g,
  /\bIT\b/g,
  /\bSample\b/g,
  /\bMicrosoft\b/gi,
];

const Functions: RegExp[] = [
  /\bPurchasing\b/gi,
  /\bSCM\b/gi, // For some reason was not finding The SCM Hub
  /\bFinance\b/g,
  /\bQuality\b/g,
  /\bCompliance\b/gi,
  /\bLegal\b/gi,
  /\bOperations\b/gi,
  /\bManagement\b/gi,
  /\bSustainability\b/gi,
  /\bCommunications?\b/gi,
  /\bHuman ?Resource?\b/gi,
];

const WoW: RegExp[] = [
  /\bVEVAs?\b/g,
  /\bQ5\b/g,
  /\bPolicy\b/gi,
  /\bPolicies\b/gi,
  /\bStrategies\b/gi,
  /\bStrategy\b/gi,
  /\bInnovations?\b/gi,
  /\bStandards?\b/gi,
  /\b1P1Ps?\b/g,
];

export const EasySearch:  IEasyRegex = {
  Facilities: Facilities,
  Global: Global,
  AAM: AAM,
  AEU: AEU,
  Asia: Asia,
  IT: IT,
  WoW: WoW,
  Functions: Functions,
  Customer1: Customer1,
  Customer2: Customer2,
  Products: Products,

}

export function addCustomHubSearch( items: IAnySourceItem[], keys: string[] ) : IAnySourceItem[] {

  Object.keys( EasySearch ).map( key => {
    items = addHubMeta( items, keys, EasySearch[ key as 'Customer1' ], key as 'Customer' );
  });

  // items = addHubMeta( items, keys, Customer, 'Customer' );

  // items = addHubMeta( items, keys, Facilities, 'Facilities' );

  // items = addHubMeta( items, keys, Products, 'Products' );

  // items = addHubMeta( items, keys, Global, 'Global' );

  // items = addHubMeta( items, keys, AAM, 'AAM' );

  // items = addHubMeta( items, keys, AEU, 'AEU' );

  // items = addHubMeta( items, keys, Asia, 'Asia' );

  // items = addHubMeta( items, keys, IT, 'IT' );

  // items = addHubMeta( items, keys, Functions, 'Functions' );

  // items.map( item => { if ( item.FPSItem.Search.topSearch.length === 0 ) item.FPSItem.Search.topSearch.push( 'Uncategorized' )} );

  return items;

}

export type IHubMetaLabels = 'Customer' | 'Facilities' | 'Products' | 'Global' | 'AAM' | 'AEU' | 'Asia' | 'IT' | 'Functions' | 'Uncategorized';
export const HubMetaLabels: IHubMetaLabels[] = [ 'Customer', 'Facilities', 'Products', 'Global', 'AAM', 'AEU', 'Asia', 'IT', 'Functions', 'Uncategorized' ]

function addHubMeta( items: IAnySourceItem[] , keys: string[] , ARegex: RegExp[], label: IHubMetaLabels, ): IAnySourceItem[] {

  items.forEach(item => {
    if ( !item.FPSItem.Search.topSearch ) item.FPSItem.Search.topSearch = [];
    if ( isAnyRegexFound( item, ARegex, keys ) === true ) {
      item.FPSItem.Search.topSearch.push ( label );
      item.FPSItem.Search.searchText += ` || ${label}`;
      item.FPSItem.Search.searchTextLC += ` || ${label.toLocaleLowerCase()}`;
    } else {
      if ( label === 'Customer' && check4This( 'showAllConsole=true', true ) ) console.log( 'addHubMeta test fail' ,ARegex, keys, item.Title, item );
    }

  });

  return items;
}

export function isAnyRegexFound( item: IAnySourceItem, ARegex: RegExp[], keys: string[] ) : boolean {
  let found = false;
  ARegex.map( filter => {
    keys.map( key => {
      if ( typeof item[ key as 'Title' ] === 'string' && item[ key as 'Title' ].match( filter ) ) found = true;
    });
  });
  return found;
}