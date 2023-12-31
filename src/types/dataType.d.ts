import internal from "stream";
import { AggregatesProps, UltraFinesProps } from "./rawMaterialType";

export interface BuildProps {
  id: string;
  name: string;
  constructor: string;
}

export interface RawMaterialProps {
  id: number;
  sand: string;
  dateOfProduction: Date;
}
export interface MaterialProps {
  id              : int      
  dateOfProduction: string
  name             :string
  producer         :string
  materialType     :string
}

export interface ProductionProps {
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
    materialId?: int
    productId?: int
  }

export interface MaterialProductLinkProp {
  id: int
  materialId: int
  productId: int
}

type testProp = BuildProps | RawMaterialProps | ProductionProps | MaterialProps | AggregatesProps | UltraFinesProps | MaterialProductLinkProp;

export default testProp;
