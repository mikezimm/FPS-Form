/**
 * export const testProjectView : IMyView = {

    ServerRelativeUrl: 'TestQuery',
    iFields: 	stdViewFields,
    wheres: 	[ 	{f: StatusTMT, 	c:'OR', 	o: Eq, 		v: "1" },
                    {f: Everyone, 	c:'OR', 	o: Eq, 		v: "1" },
                    {f: ootbAuthor, c:'OR', 	o: IsNull, 	v: "1" },
                    {f: Leader, 	c:'OR', 	o: Eq, 		v: "1" },
                    {f: Team, 		c:'OR', 	o: Eq, 		v: queryValueCurrentUser },
                ],
    orders: [ {f: ootbID, o: 'asc'}],
    groups: { collapse: false, limit: 25,
        fields: [
            {f: ootbAuthor, o: ''},
            {f: ootbCreated, o: 'asc'},
        ],
    },
};
 */
/***
 *    .d8888. db    db d8888b. d8888b.  .d88b.  d8888b. d888888b
 *    88'  YP 88    88 88  `8D 88  `8D .8P  Y8. 88  `8D `~~88~~'
 *    `8bo.   88    88 88oodD' 88oodD' 88    88 88oobY'    88
 *      `Y8b. 88    88 88~~~   88~~~   88    88 88`8b      88
 *    db   8D 88b  d88 88      88      `8b  d8' 88 `88.    88
 *    `8888Y' ~Y8888P' 88      88       `Y88P'  88   YD    YP
 *
 *
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any

export function buildFieldOrderTag(thisOrder: any): string {
  const tempOrder = JSON.parse(JSON.stringify(thisOrder));
  const fieldName = typeof tempOrder.field === 'object' ? tempOrder.field.name : tempOrder.field;
  let thisXML = '<FieldRef Name="' + fieldName + '"'; // + '" />'

  if (thisOrder.asc === false) { thisXML += ' Ascending="FALSE"'; }

  thisXML += ' />';

  return thisXML;
}
