
/**
 * This function uses the Date object to get the current year and then loops through the next ten years, 
 *  adding each year as a string to an array. The resulting array contains ten strings, each representing 
 *  a year from the current year to ten years in the future.
 * 
 * @param qty 
 * @param offset 
 * @param nextOrPrior 
 * @returns 
 */
export function getXYearsAsNumbers( qty: number, offset: number, nextOrPrior: 'next' | 'prior' ): number[] {
  const currentYear = new Date().getFullYear();
  const years = [];

  const sign = nextOrPrior === 'next' ? 1 : -1 ;

  for (let i = 0; i <= qty -1 + Math.abs(offset) ; i++ ) {
    years.push(( currentYear + offset * ( sign )  + i * ( sign )  ));
  }

  return years;
}

export function getXYearsAsStrings( qty: number, offset: number, nextOrPrior: 'next' | 'prior'): string[] {
  const years = getXYearsAsNumbers( qty, offset, nextOrPrior, ).map( year => { return year.toString() } );
  return years;
}

/**
 * 
 * This can be used in codepen.io to test: 
  function getXYearsAsNumbers( qty, offset, nextOrPrior ) {
    const currentYear = new Date().getFullYear();
    console.log( 'year:', currentYear )
    const years = [];

    const sign = nextOrPrior === 'next' ? 1 : -1 ;
    for (let i = 0; i <= qty -1 + Math.abs(offset) ; i++) {
      years.push(( currentYear + offset * ( sign )  + i * ( sign ) ));
    }

    return years;
  }

  console.log( new Date() )
  const nums = getXYearsAsNumbers( 10, 0,'next');
  const years = nums.map( year => { return year.toString() } );
  console.log( nums )
  console.log( years )

 */