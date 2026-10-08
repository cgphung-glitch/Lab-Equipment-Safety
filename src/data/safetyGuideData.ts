export interface GHSPictogramInfo {
  id: string;
  name: string;
  code: string;
  hazardClass: string;
  description: string;
  precautions: string;
  examples: string;
  color: string;
}

export const GHS_PICTOGRAMS: Record<string, GHSPictogramInfo> = {
  flammable: {
    id: 'flammable',
    name: 'Flame (Flammable)',
    code: 'GHS02',
    hazardClass: 'Flammables, Pyrophorics, Self-Heating, Emits Flammable Gas',
    description: 'Materials that easily ignite and burn in air, or self-heat when exposed to oxygen.',
    precautions: 'Keep strictly away from open flames, hot plates, electrical sparks, and oxidizing agents. Store in certified flammables cabinet.',
    examples: 'Acetone, Ethanol, Diethyl Ether, Hexane, Toluene',
    color: 'amber'
  },
  corrosive: {
    id: 'corrosive',
    name: 'Corrosion (Corrosive)',
    code: 'GHS05',
    hazardClass: 'Skin Corrosion, Serious Eye Damage, Corrosive to Metals',
    description: 'Substances that cause irreversible full-thickness skin necrosis, corneal destruction, or attack structural metals.',
    precautions: 'Wear chemical splash goggles, neoprene/nitrile heavy gloves, and acid-resistant apron. Always add acid to water (AAA).',
    examples: 'Hydrochloric Acid, Sulfuric Acid, Sodium Hydroxide, Bromine',
    color: 'rose'
  },
  toxic: {
    id: 'toxic',
    name: 'Skull & Crossbones (Acute Toxicity)',
    code: 'GHS06',
    hazardClass: 'Fatal or Toxic Acute Toxicity (Oral, Dermal, Inhalation)',
    description: 'Chemicals that cause severe systemic toxicity or death in small quantities upon ingestion, inhalation, or skin absorption.',
    precautions: 'Must be handled solely within a certified chemical fume hood. Double-glove with certified barrier materials.',
    examples: 'Potassium Cyanide, Sodium Azide, Mercuric Chloride, Nicotine',
    color: 'rose'
  },
  health_hazard: {
    id: 'health_hazard',
    name: 'Health Hazard (Chronic / Target Organ)',
    code: 'GHS08',
    hazardClass: 'Carcinogenicity, Mutagenicity, Reproductive Toxicity, Organ Damage',
    description: 'Substances with long-term chronic health consequences including cancer, organ degradation, and respiratory sensitization.',
    precautions: 'Minimize inhalation exposure. Use fume hoods and certified respirators. Avoid any skin contact.',
    examples: 'Benzene, Chloroform, Dichloromethane, Formaldehyde, Silica Dust',
    color: 'indigo'
  },
  explosive: {
    id: 'explosive',
    name: 'Exploding Bomb (Explosive)',
    code: 'GHS01',
    hazardClass: 'Unstable Explosives, Self-Reactives, Organic Peroxides',
    description: 'Substances capable of sudden chemical reaction producing gas at such a temperature and pressure as to cause damage.',
    precautions: 'Shield with polycarbonate blast shield. Avoid shock, friction, static sparks, and localized heating.',
    examples: 'Picric Acid (dry), Benzoyl Peroxide, Heavy Metal Azides',
    color: 'red'
  },
  oxidizer: {
    id: 'oxidizer',
    name: 'Flame Over Circle (Oxidizing)',
    code: 'GHS03',
    hazardClass: 'Oxidizing Gases, Liquids, and Solids',
    description: 'Substances that supply oxygen or other oxidizing species, drastically intensifying fires with combustible matter.',
    precautions: 'Store separated from organic solvents, paper, and reducing agents. Never mix with flammables.',
    examples: 'Concentrated Nitric Acid, Hydrogen Peroxide > 30%, Potassium Permanganate',
    color: 'amber'
  },
  irritant: {
    id: 'irritant',
    name: 'Exclamation Mark (Irritant / Harmful)',
    code: 'GHS07',
    hazardClass: 'Skin/Eye Irritation, Dermal Sensitizer, Acute Toxicity Cat 4',
    description: 'Chemicals that cause reversible inflammation of skin or mucous membranes or mild systemic harm.',
    precautions: 'Wear standard nitrile gloves and safety glasses. Avoid breathing vapors.',
    examples: 'Isopropanol, Dilute Acetic Acid, Sodium Carbonate',
    color: 'amber'
  },
  compressed_gas: {
    id: 'compressed_gas',
    name: 'Gas Cylinder (Compressed Gas)',
    code: 'GHS04',
    hazardClass: 'Gases Under Pressure (Dissolved, Liquefied, Refrigerated)',
    description: 'Gases stored under pressure in cylinders; rapid release can cause violent rocket propulsion or asphyxiation.',
    precautions: 'Secure cylinders with heavy chain or floor bracket at 2/3 height. Keep valve protective caps on when not in use.',
    examples: 'Nitrogen, Argon, Carbon Dioxide, Compressed Air, Hydrogen',
    color: 'cyan'
  },
  environmental: {
    id: 'environmental',
    name: 'Environment (Aquatic Toxicity)',
    code: 'GHS09',
    hazardClass: 'Acute and Chronic Aquatic Hazards',
    description: 'Toxic to aquatic organisms with long-lasting ecosystem consequences.',
    precautions: 'Never dispose into laboratory sink drains. Collect in dedicated hazardous liquid or solid waste drums.',
    examples: 'Copper(II) Sulfate, Silver Nitrate, Heavy Metal Solutions',
    color: 'emerald'
  }
};

export const PPE_GUIDE = [
  {
    id: 'safety_goggles',
    name: 'Splash-Proof Chemical Goggles',
    rating: 'ANSI Z87.1 D3 Certified',
    description: 'Indirect-vent goggles with rubber seal that prevent corrosive liquids and aerosols from bypassing lens frame.',
    applicability: 'Mandatory for all work involving pouring acids, heating liquids, or under vacuum/pressure.'
  },
  {
    id: 'face_shield',
    name: 'Full-Face Polycarbonate Shield',
    rating: 'ANSI Z87.1 High Impact',
    description: 'Full facial coverage shielding chin, eyes, and forehead from violent eruptions and glass shatter.',
    applicability: 'Required when working with vacuum distillation, rotary evaporators, or cryogenic liquids.'
  },
  {
    id: 'nitrile_gloves',
    name: 'Disposable Nitrile Exam Gloves',
    rating: '4 mil to 8 mil thickness',
    description: 'Provides barrier protection against accidental micro-splashes. Offers short breakthrough protection for acids and salts.',
    applicability: 'General bench handling. Note: Dichloromethane, acetone, and toluene permeate standard nitrile in under 3 minutes!'
  },
  {
    id: 'thermal_gloves',
    name: 'Insulated Heat-Resistant Gloves',
    rating: 'Rated up to 350°C (Kevlar/Nomex)',
    description: 'Heavy insulated thermal mittens for handling hot beakers, crucibles, and heated ceramic surfaces.',
    applicability: 'Removing items from muffle furnaces, autoclaves, and hotplate heating blocks.'
  },
  {
    id: 'flame_resistant_coat',
    name: '100% Cotton / Nomex Lab Coat',
    rating: 'NFPA 2112 Compliant',
    description: 'Knee-length buttoned coat with knit cuffs that does not melt into skin upon exposure to flame (unlike polyester).',
    applicability: 'Required at all times in any active chemical synthesis or instrumental laboratory.'
  },
  {
    id: 'fume_hood',
    name: 'Chemical Fume Hood Containment',
    rating: 'Face Velocity 80–120 FPM',
    description: 'Engineered ventilation control maintaining negative pressure relative to the room.',
    applicability: 'Any procedure producing airborne toxic fumes, noxious odors, flammable vapors, or volatile acids.'
  }
];

export const INCOMPATIBLE_COMBINATIONS = [
  {
    groupA: 'Concentrated Nitric Acid (HNO3)',
    groupB: 'Organic Solvents (Ethanol, Acetone, Acetic Acid)',
    hazard: 'Violent exothermic runaway oxidation producing shock-sensitive explosive mixtures and toxic nitrogen dioxide (NO2) gas.',
    protocol: 'Store nitric acid in a separate secondary containment tray away from all organic solvents.'
  },
  {
    groupA: 'Elemental Alkali Metals (Na, K, Li)',
    groupB: 'Water, Alcohols, Halogenated Solvents',
    hazard: 'Extremely vigorous reaction evolving hydrogen gas that auto-ignites explosively in air forming caustic alkaline hydroxide fire.',
    protocol: 'Store under dry mineral oil. Quench scrap metal carefully using dry isopropanol, never water.'
  },
  {
    groupA: 'Cyanide / Sulfide Salts (KCN, Na2S)',
    groupB: 'Any Mineral Acids (HCl, H2SO4, HNO3)',
    hazard: 'Instant liberation of lethal Hydrogen Cyanide (HCN) or Hydrogen Sulfide (H2S) gas.',
    protocol: 'Store cyanides locked in basic cabinet; acidify only in sealed scrubber systems.'
  },
  {
    groupA: 'Borosilicate Glassware',
    groupB: 'Hydrofluoric Acid (HF)',
    hazard: 'HF readily dissolves silicon dioxide in glass forming silicon tetrafluoride gas, causing sudden flask structural failure.',
    protocol: 'Handle HF exclusively in fluoropolymer vessels (PTFE, PFA, FEP).'
  },
  {
    groupA: 'Acetone + Chloroform',
    groupB: 'Strong Bases (NaOH, KOH)',
    hazard: 'Reissert-type violent exothermic condensation reaction that can boil out or explode closed containers.',
    protocol: 'Never combine chloroform and acetone in waste containers containing basic residues.'
  }
];
