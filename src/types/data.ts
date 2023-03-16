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

export interface Fixture {
  ID: number;
  Universe: number;
  Address: number;
  Channels: number;
}

export interface DataExport {
  projectName: string;
  data: Fixture[];
}
