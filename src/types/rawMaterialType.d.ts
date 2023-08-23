export interface UltraFinesProps {
  particleSize:string;
  grading:string;
  grainDensity:string;
  // Ultra-fine specific data

  fallThrough2mm:string;
  fallThrough0125mm:string;
  fallThrough0063mm:string;
  vormvastheid:string;
  emissionOfHazardousSubstances:string;
}

export interface AggregatesProps {
  particleSize:string;
  grading:string;
  tolerance:string;
  granularShape:string;
  grainShape:string;
  shellContent:string;
  grainDensity:string;
  amountFineParts:string;
  qualityFineParts:string;
  roundAndBrokenPieces:string;
  resistanceToCrushing:string;
  waterAbsorption:string;
  classification:string;
  chloride:string;
  contentOfAcidSolubleSulfate:string;
  contentOfWaterSolubleSulfate:string;
  totalSulfur:string;
  affectBindingTime:string;

  humusOrOrganicMatterContent:string;
  alkaliSilicaActivity:string;
  resistanceToWear:string;
  emissionOfRadioactivity:string;
  leachingOfHeavyMetals:string;
  asbestos:string;
  chimicalComposition:string;
  leachingAnions:string;
  freezeThawSensitivity:string;
}
