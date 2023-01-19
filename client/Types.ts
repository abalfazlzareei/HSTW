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

export type Clicked {
  name: string,
  'Alpha-2': string
}