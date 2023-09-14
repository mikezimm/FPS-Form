import { IFPSEnviro } from "@mikezimm/fps-library-v2/lib/common/interfaces/fps/IFPSEnviro";
import { IFPSUser } from "@mikezimm/fps-library-v2/lib/logic/Users/IUserInterfaces";
import { retrieveFPSUser } from "@mikezimm/fps-library-v2/lib/banner/FPSWebPartClass/functions/showTricks";
import { retrieveFPSEnviro } from "@mikezimm/fps-library-v2/lib/banner/features/FPSDOM/FPSEnviro";
import {  checkDeepProperty } from "@mikezimm/fps-library-v2/lib/logic/Objects/deep";
import { IStateSource } from "@mikezimm/fps-library-v2/lib/pnpjs/Common/IStateSource";

export function addMineSiteMeta( MineCol: string[], SiteCol: string[], stateSource: IStateSource, ): IStateSource {
  // DO something here to summarize

  const FPSUser: IFPSUser = retrieveFPSUser();
  const FPSEnviro: IFPSEnviro = retrieveFPSEnviro();
  // const currentSiteLC: string = FPSEnviro?.siteUrl.toLowerCase();
  const currentSiteLC: string = '/sites/FPS'.toLowerCase(); // FPSEnviro?.siteUrl.toLowerCase();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let isMine: any = false, isOthers: any = false, isThisSite: any = false, isOtherSite: any = false;

  stateSource.items.map( ( item ) => {
    let { searchText, } = item.FPSItem.Search;

    const ItemUser = checkDeepProperty( item, MineCol, 'EmptyString', false );

    // if ( ItemUser === FPSUser?.Title ) { searchText += ` || Mine`; isMine = true }
    if ( ItemUser === 'Mike Zimmerman' ) { searchText += ` || Mine`; isMine = true }
    else { searchText += ` || OtherPeople`; isOthers = true }

    const ItemSite = checkDeepProperty( item, SiteCol, 'EmptyString', false );

    if ( ItemSite.toLowerCase().indexOf( currentSiteLC ) > -1 ) 
      { searchText += ` || ThisSite`; isThisSite = true }
    else { searchText += ` || OtherSites`; isOtherSite = true }

    item.FPSItem.Search.searchText = searchText;
    item.FPSItem.Search.searchTextLC = searchText.toLowerCase();

  });

  const MineSiteMeta: string[] = [];
  if ( isMine === true ) MineSiteMeta.push( 'Mine' );
  if ( isOthers === true ) MineSiteMeta.push( 'OtherPeople' );
  if ( isThisSite === true ) MineSiteMeta.push( 'ThisSite' );
  if ( isOtherSite === true ) MineSiteMeta.push( 'OtherSites' );

  stateSource.meta1 = MineSiteMeta;

  return stateSource;
}


