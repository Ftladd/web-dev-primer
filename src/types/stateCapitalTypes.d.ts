type StateName =
  | 'Alaska'
  | 'Alabama'
  | 'Arkansas'
  | 'Arizona'
  | 'California'
  | 'Colorado'
  | 'Connecticut'
  | 'Delaware'
  | 'Florida'
  | 'Georgia'
  | 'Hawaii'
  | 'Iowa'
  | 'Idaho'
  | 'Illinois'
  | 'Indiana'
  | 'Kansas'
  | 'Kentucky'
  | 'Louisiana'
  | 'Massachusetts'
  | 'Maryland'
  | 'Maine'
  | 'Michigan'
  | 'Minnesota'
  | 'Missouri'
  | 'Mississippi'
  | 'Montana'
  | 'North Carolina'
  | 'North Dakota'
  | 'Nebraska'
  | 'New Hampshire'
  | 'New Jersey'
  | 'New Mexico'
  | 'Nevada'
  | 'New York'
  | 'Ohio'
  | 'Oklahoma'
  | 'Oregon'
  | 'Pennsylvania'
  | 'Rhode Island'
  | 'South Carolina'
  | 'South Dakota'
  | 'Tennessee'
  | 'Texas'
  | 'Utah'
  | 'Virginia'
  | 'Vermont'
  | 'Washington'
  | 'Wisconsin'
  | 'West Virginia'
  | 'Wyoming';

type StateCapitalPairs = Partial<Record<StateName, string>>;

type CapitalRequestQuery = {
  state: StateName;
};

type StateData = {
  state: StateName;
  capital: string;
};
