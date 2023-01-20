// const [allAirports, setAllAirports] = useState<Airport[]>([]);

export type CountryDataType = {
  HL: string[],
  idx: {
    M: number,
    N: number,
    Nu: number,
    P: number,
    global: number
  },
  topics?: StringNumberArray[]
}

export type StringNumberArray = [
  string, number
]

export type Country = {
  flag: string, 
  name: object,
  currencies: object[],
  languages: string[],
  region: string,
  demonyms: object,
  capital: string
}

export type Clicked = {
  name: string,
  'Alpha-2': string
}

export type NavbarProps = {
  mobile: boolean | undefined;
  setMenu: React.Dispatch<
    React.SetStateAction<boolean | SetMenuCallback | undefined>
  >;
};

export type SetMenuCallback = {
    (a: boolean): boolean
  }

export type MenuProps = {
  setMenu: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  userCountry: UserCountry | undefined;
  idx: string;
  setClicked: React.Dispatch<React.SetStateAction<Clicked>>;
};

export type UserCountry = {
  country_name: string,
  country_code: string
}