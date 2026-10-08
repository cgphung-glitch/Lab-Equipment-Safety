export type CategoryType = 
  | 'glassware' 
  | 'heating' 
  | 'analytical' 
  | 'separation' 
  | 'safety';

export type HazardLevel = 'low' | 'moderate' | 'high' | 'critical';

export type GHSPictogram = 
  | 'flammable' 
  | 'corrosive' 
  | 'toxic' 
  | 'compressed_gas' 
  | 'explosive' 
  | 'health_hazard' 
  | 'irritant' 
  | 'oxidizer' 
  | 'environmental';

export type PPEItem = 
  | 'safety_goggles' 
  | 'face_shield' 
  | 'nitrile_gloves' 
  | 'thermal_gloves' 
  | 'cryo_gloves' 
  | 'flame_resistant_coat' 
  | 'fume_hood' 
  | 'respirator';

export interface ChemicalIncompatibility {
  reagent: string;
  risk: string;
  guidance: string;
}

export interface TechnicalSpecs {
  material: string;
  capacity?: string;
  temperatureRange?: string;
  pressureRating?: string;
  tolerance?: string;
  standards?: string;
}

export interface StandardOperatingProcedure {
  preInspection: string[];
  safeOperation: string[];
  cleaningAndStorage: string[];
  emergencyProtocol: string[];
}

export interface HazardRatings {
  chemical: number;
  electrical: number;
  physical: number;
  thermal: number;
}

export interface EquipmentItem {
  id: string;
  name: string;
  aliases: string[];
  category: CategoryType;
  categoryLabel: string;
  imageUrl?: string;
  schematicIcon: string; // Identifier for stylized SVG schematic
  description: string;
  primaryApplications: string[];
  specs: TechnicalSpecs;
  safety: {
    hazardLevel: HazardLevel;
    hazardRatings?: HazardRatings;
    ghsPictograms: GHSPictogram[];
    primaryHazards: string[];
    requiredPPE: PPEItem[];
    incompatibilities: ChemicalIncompatibility[];
    sop: StandardOperatingProcedure;
    benchWarning: string;
  };
}
