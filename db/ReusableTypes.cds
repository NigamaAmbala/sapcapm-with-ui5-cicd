namespace reusable.types;


type Amount      : Decimal(10, 2);
type Email       : String @assert.format: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$';
aspect PersonDetails {
    fName : String;
    lName : String;
}