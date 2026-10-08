import { CategoryType, HazardRatings } from '../types/equipment';
import { EQUIPMENT_LIST } from './equipmentData';

export interface HazardDimensionInfo {
  key: keyof HazardRatings;
  label: string;
  description: string;
  iconName: string;
  colorClass: string;
}

export const HAZARD_DIMENSIONS: HazardDimensionInfo[] = [
  {
    key: 'chemical',
    label: 'Chemical',
    description: 'Exposure to corrosives, toxic vapors, reactive reagents, and exotherms',
    iconName: 'FlaskConical',
    colorClass: 'text-amber-500 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800'
  },
  {
    key: 'electrical',
    label: 'Electrical',
    description: 'Line voltages, motorized drives, high-draw heating elements, and short-circuit sparks',
    iconName: 'Zap',
    colorClass: 'text-yellow-500 bg-yellow-50 dark:bg-yellow-950/40 border-yellow-200 dark:border-yellow-800'
  },
  {
    key: 'physical',
    label: 'Physical',
    description: 'Glass implosion/explosion, mechanical pinch/shear, rotor burst, and sharp lacerations',
    iconName: 'ShieldAlert',
    colorClass: 'text-blue-500 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800'
  },
  {
    key: 'thermal',
    label: 'Thermal',
    description: 'Extreme heat (up to 540°C), open flames, flash boiling, and cryogenic burns',
    iconName: 'Flame',
    colorClass: 'text-rose-500 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800'
  }
];

// Calibrated hazard ratings for every equipment item in the catalog (scale 0.0 to 10.0)
export const EQUIPMENT_HAZARD_RATINGS: Record<string, HazardRatings> = {
  // Precision Glassware
  'burette': {
    chemical: 8.2,
    electrical: 0.0,
    physical: 7.8,
    thermal: 2.5
  },
  'volumetric-flask': {
    chemical: 7.4,
    electrical: 0.0,
    physical: 7.0,
    thermal: 2.0
  },
  'erlenmeyer-flask': {
    chemical: 7.0,
    electrical: 0.0,
    physical: 6.5,
    thermal: 6.2
  },
  'separatory-funnel': {
    chemical: 8.6,
    electrical: 0.0,
    physical: 8.4,
    thermal: 2.2
  },
  'reflux-condenser': {
    chemical: 7.8,
    electrical: 0.0,
    physical: 7.9,
    thermal: 6.8
  },

  // Heating & Thermal
  'hotplate-magnetic-stirrer': {
    chemical: 6.6,
    electrical: 8.4,
    physical: 4.8,
    thermal: 9.6
  },
  'bunsen-burner': {
    chemical: 7.2,
    electrical: 1.0,
    physical: 5.2,
    thermal: 9.9
  },
  'heating-mantle': {
    chemical: 6.2,
    electrical: 8.8,
    physical: 4.0,
    thermal: 9.4
  },
  'crucible-and-tongs': {
    chemical: 4.6,
    electrical: 0.0,
    physical: 6.8,
    thermal: 9.8
  },

  // Analytical Instruments
  'analytical-balance': {
    chemical: 4.6,
    electrical: 6.0,
    physical: 2.2,
    thermal: 1.0
  },
  'ph-meter': {
    chemical: 5.2,
    electrical: 5.4,
    physical: 3.6,
    thermal: 2.0
  },
  'spectrophotometer': {
    chemical: 4.2,
    electrical: 7.6,
    physical: 3.0,
    thermal: 3.4
  },

  // Separation & Vacuum
  'rotary-evaporator': {
    chemical: 9.2,
    electrical: 8.2,
    physical: 9.0,
    thermal: 7.6
  },
  'buchner-funnel-flask': {
    chemical: 7.6,
    electrical: 5.8,
    physical: 8.6,
    thermal: 3.2
  },
  'centrifuge': {
    chemical: 6.8,
    electrical: 8.6,
    physical: 9.6,
    thermal: 4.2
  },
  'desiccator': {
    chemical: 6.2,
    electrical: 2.5,
    physical: 9.0,
    thermal: 2.8
  },
  'chromatography-column': {
    chemical: 8.8,
    electrical: 1.8,
    physical: 7.8,
    thermal: 2.6
  },

  // Safety Containment
  'fume-hood': {
    chemical: 7.6,
    electrical: 6.4,
    physical: 5.6,
    thermal: 4.8
  },
  'safety-shower-eyewash': {
    chemical: 3.2,
    electrical: 1.2,
    physical: 4.2,
    thermal: 3.0
  },
  'spill-kit': {
    chemical: 8.4,
    electrical: 0.8,
    physical: 4.8,
    thermal: 5.8
  }
};

export interface CategoryHazardConfig {
  id: string;
  name: string;
  shortLabel: string;
  strokeColor: string;
  fillColor: string;
  fillOpacity: number;
  dominantHazard: keyof HazardRatings;
  safetySummary: string;
  mitigationProtocol: string;
  ppeTier: string;
}

export const CATEGORY_HAZARD_CONFIGS: Record<string, CategoryHazardConfig> = {
  all: {
    id: 'all',
    name: 'All Lab Categories (Aggregate)',
    shortLabel: 'Lab Baseline',
    strokeColor: '#3b82f6', // blue-500
    fillColor: '#60a5fa',
    fillOpacity: 0.25,
    dominantHazard: 'physical',
    safetySummary: 'Average laboratory hazard distribution across glassware, heating, analytical, separation, and containment apparatus.',
    mitigationProtocol: 'Adhere to universal standard laboratory operating procedures (SOPs), full PPE coverage, and eye wash availability.',
    ppeTier: 'Tier 2 (Goggles, Lab Coat, Nitrile Gloves)'
  },
  glassware: {
    id: 'glassware',
    name: 'Precision Glassware',
    shortLabel: 'Glassware',
    strokeColor: '#059669', // emerald-600
    fillColor: '#34d399',
    fillOpacity: 0.35,
    dominantHazard: 'physical',
    safetySummary: 'High physical laceration and chemical splash profile. Zero electrical hazard.',
    mitigationProtocol: 'Pre-inspect for star cracks, never clamp barrels rigidly with bare metal, lower filling funnels below eye level.',
    ppeTier: 'Tier 2 (Safety Goggles, Nitrile Gloves, Lab Coat)'
  },
  heating: {
    id: 'heating',
    name: 'Heating & Thermal',
    shortLabel: 'Thermal',
    strokeColor: '#ea580c', // orange-600
    fillColor: '#fb923c',
    fillOpacity: 0.35,
    dominantHazard: 'thermal',
    safetySummary: 'Extreme thermal burn danger (up to 540°C) and electrical line current draw; auto-ignition vapor threat.',
    mitigationProtocol: 'Check residual hot warnings, inspect power cords, never boil in sealed vessels, keep flammables 3m away.',
    ppeTier: 'Tier 3 (Thermal Resistant Gloves, Flame-Resistant Coat, Face Shield)'
  },
  analytical: {
    id: 'analytical',
    name: 'Analytical Instruments',
    shortLabel: 'Analytical',
    strokeColor: '#7c3aed', // violet-600
    fillColor: '#a78bfa',
    fillOpacity: 0.35,
    dominantHazard: 'electrical',
    safetySummary: 'Dominated by precision electronics and lamp power supplies. Low physical/thermal footprint.',
    mitigationProtocol: 'Prevent reagent spills inside weighing cells, maintain line voltage surge protection, tare closed vessels.',
    ppeTier: 'Tier 1 (Splash Goggles, Nitrile Gloves, Antistatic Boats)'
  },
  separation: {
    id: 'separation',
    name: 'Separation & Vacuum',
    shortLabel: 'Separation',
    strokeColor: '#0284c7', // sky-600
    fillColor: '#38bdf8',
    fillOpacity: 0.35,
    dominantHazard: 'physical',
    safetySummary: 'Severe mechanical stress from full negative pressure (implosion risk), high-speed centrifugal torque, and solvent vapor concentration.',
    mitigationProtocol: 'Check Keck clips, balance centrifuge tubes by weight within 0.05g, test ethers for peroxides before concentration.',
    ppeTier: 'Tier 3 (Safety Goggles + Face Shield, Vacuum Trap, Heavy Nitrile Gloves)'
  },
  safety: {
    id: 'safety',
    name: 'Safety Containment',
    shortLabel: 'Safety / PPE',
    strokeColor: '#0d9488', // teal-600
    fillColor: '#2dd4bf',
    fillOpacity: 0.35,
    dominantHazard: 'chemical',
    safetySummary: 'Engineered barrier stations handling toxic aerosols, caustic emergencies, and spill response.',
    mitigationProtocol: 'Maintain 100 fpm face velocity, keep sash below certified arrow height, verify weekly shower pull test.',
    ppeTier: 'Tier 4 (Heavy Neoprene Gloves, Vapor Respirator, Chemical Apron)'
  }
};

// Calculate category average hazard ratings
export function calculateCategoryHazardAverage(category: string): HazardRatings {
  const items = category === 'all' 
    ? EQUIPMENT_LIST 
    : EQUIPMENT_LIST.filter(item => item.category === category);

  if (items.length === 0) {
    return { chemical: 0, electrical: 0, physical: 0, thermal: 0 };
  }

  const totals = items.reduce(
    (acc, item) => {
      const ratings = EQUIPMENT_HAZARD_RATINGS[item.id] || { chemical: 5, electrical: 2, physical: 5, thermal: 3 };
      return {
        chemical: acc.chemical + ratings.chemical,
        electrical: acc.electrical + ratings.electrical,
        physical: acc.physical + ratings.physical,
        thermal: acc.thermal + ratings.thermal,
      };
    },
    { chemical: 0, electrical: 0, physical: 0, thermal: 0 }
  );

  return {
    chemical: Number((totals.chemical / items.length).toFixed(1)),
    electrical: Number((totals.electrical / items.length).toFixed(1)),
    physical: Number((totals.physical / items.length).toFixed(1)),
    thermal: Number((totals.thermal / items.length).toFixed(1)),
  };
}

// Format radar dataset for Recharts
export interface RadarChartDataPoint {
  dimension: string;
  fullMark: number;
  [categoryKey: string]: string | number;
}

export function buildRadarChartData(
  categoryIds: string[],
  selectedEquipmentId?: string | null
): RadarChartDataPoint[] {
  const dimensions: (keyof HazardRatings)[] = ['chemical', 'electrical', 'physical', 'thermal'];
  const dimensionLabels: Record<keyof HazardRatings, string> = {
    chemical: 'Chemical',
    electrical: 'Electrical',
    physical: 'Physical',
    thermal: 'Thermal'
  };

  return dimensions.map(dim => {
    const point: RadarChartDataPoint = {
      dimension: dimensionLabels[dim],
      fullMark: 10
    };

    categoryIds.forEach(catId => {
      const avg = calculateCategoryHazardAverage(catId);
      point[catId] = avg[dim];
    });

    if (selectedEquipmentId && EQUIPMENT_HAZARD_RATINGS[selectedEquipmentId]) {
      point['equipment'] = EQUIPMENT_HAZARD_RATINGS[selectedEquipmentId][dim];
    }

    return point;
  });
}
