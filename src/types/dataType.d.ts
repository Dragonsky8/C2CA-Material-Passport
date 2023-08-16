interface BuildProps {
  id: string;
  name: string;
  constructor: string;
}

interface RawMaterialProps {
  id: number;
  sand: string;
}

interface ProductionProps {
  name: string;
  // Dimensions
  weight: number;
  volume: number;
  density: number;
  area: Decimal;
  // Structural Data
  compressionStrength: number;
  loadBearing: number;
  stability: number;
  resistance: number;
}

type testProp = BuildProps | RawMaterialProps | ProductionProps;

export default testProp;
