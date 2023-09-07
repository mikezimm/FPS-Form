

export async function provisionMockList( setProgress: any, markComplete: any, ): Promise<string[]>{
  const result = await mockCreateField(['create','changesFinal'], [ 'Item1', 'Item2', 'Item3' ], setProgress,  );
  return result;
}

export async function mockCreateField( steps: string[], items: string[], setProgress : any) : Promise<string[]> {
  const results: string[]=[];
  for ( const step of steps ) {

    const n = items.length;
    let i = 0;
    for (const f of items) {
        await new Promise(resolve => setTimeout(resolve, 700)); // Pause for effect
        i++;
        setProgress(false, "C", i, n , 'darkgray', 'CalculatorSubtract', f, 'Adding fields to list (' + step +'): ', 'Field ' + i + ' of ' + n + ' : ' + f , step + ' anotherFunction ~ 34' );
      results.push( `${ step } ${i} ${ f }`)
    }
  }

  return results;

}