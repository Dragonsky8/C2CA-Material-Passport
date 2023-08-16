interface BuildProps {
  id: string;
  name: string;
  constructor: string;
}

interface RawMaterialProps {
  id: number;
  sand: string;
  dateOfProduction: Date;
}

interface ProductionProps {
  name: string;
  // Dimensions
  weight: number;
  volume: number;
  density: number;
  area: number;
  // Structural Data
  compressionStrength: number;
  loadBearing: number;
  stability: number;
  resistance: number;
}

export type ResObj = {
    id: string;
    dateOfProduction: Date;
    name: string;
    materialType: string;
    producer: string;
  }

type testProp = BuildProps | RawMaterialProps | ProductionProps;

export default testProp;
