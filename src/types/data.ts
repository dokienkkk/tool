export interface ProjectData {
  project: string;
  universe: UniverseData[];
}

export interface UniverseData {
  idUniverse: string;
  data: AddressData[];
}

export interface AddressData {
  STT: number;
  address: number;
  typeDevice: number;
}
