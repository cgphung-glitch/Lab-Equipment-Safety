import { EquipmentItem } from '../types/equipment';

export const EQUIPMENT_LIST: EquipmentItem[] = [
  {
    id: 'burette',
    name: 'Burette (Buret)',
    aliases: ['Volumetric burette', 'Titration tube', 'Stopcock buret'],
    category: 'glassware',
    categoryLabel: 'Precision Glassware',
    imageUrl: '/src/assets/images/glassware_buret_titration_1791406960839.jpg',
    schematicIcon: 'burette',
    description: 'A uniform-bore graduated glass cylinder with a precision ground stopcock at the lower end, engineered for quantitative titrations and micro-dispensation of standardized liquid solutions.',
    primaryApplications: [
      'Acid-base volumetric neutralization titrations',
      'Redox and complexometric analytical titrations',
      'Accurate delivery of calibrated chemical reagent aliquots'
    ],
    specs: {
      material: 'Borosilicate Glass 3.3 with PTFE / Glass Key Stopcock',
      capacity: '25 mL to 50 mL standard (0.05 mL subdivision)',
      tolerance: 'Class A: ±0.03 mL (ASTM E287 / ISO 385)',
      temperatureRange: '20°C calibrated baseline (max thermal limit: 250°C)',
      standards: 'ASTM E287 / ISO 385 Class A'
    },
    safety: {
      hazardLevel: 'moderate',
      ghsPictograms: ['corrosive', 'toxic'],
      primaryHazards: [
        'Chemical splash during eye-level funnel filling',
        'Laceration from glass barrel breakage if forced into rigid utility clamps',
        'Corrosive caustic leak from ungreased or loose stopcock plug'
      ],
      requiredPPE: ['safety_goggles', 'nitrile_gloves', 'flame_resistant_coat'],
      incompatibilities: [
        {
          reagent: 'Hydrofluoric Acid (HF)',
          risk: 'Dissolves silicate matrix releasing gaseous SiF4 and causes catastrophic barrel rupture.',
          guidance: 'Never use glass burettes with HF or fluorinated etching mixtures. Use PTFE/PFA apparatus.'
        },
        {
          reagent: 'Hot Concentrated Alkaline Solutions (NaOH, KOH > 2M)',
          risk: 'Etches precision glass graduations and causes glass stopcocks to permanently seize.',
          guidance: 'Drain and rinse thoroughly immediately after titrating strong hydroxide solutions.'
        }
      ],
      sop: {
        preInspection: [
          'Inspect entire length of barrel for micro-fractures, hairline star cracks, and chipped delivery tips.',
          'Verify PTFE stopcock lock-nut tension is firm enough to prevent leakage without binding.',
          'Ensure delivery tip is free of dried chemical precipitates or clogging air bubbles.'
        ],
        safeOperation: [
          'Lower the burette stand so the top funnel rim is below eye level prior to filling to prevent caustic face splashes.',
          'Use a dedicated clean small glass funnel; remove the funnel immediately after filling to avoid droplet creep.',
          'Purge all air bubbles from the jet tip by opening the stopcock rapidly over a waste beaker.',
          'Read the meniscus at true horizontal eye level using a Schellbach background card.'
        ],
        cleaningAndStorage: [
          'Drain titrant immediately into designated hazardous liquid waste container.',
          'Rinse three times with deionized water; invert in dedicated burette rack with stopcock left open.',
          'Store upside down in a dust-free cabinet; loosen PTFE stopcock nut to prevent barrel tension stress.'
        ],
        emergencyProtocol: [
          'If corrosive titrant splashes during filling: immediately flush affected eyes or skin at emergency eyewash for 15 minutes minimum.',
          'In case of glass breakage: alert nearby bench personnel, use hand broom and dustpan (never bare hands), and place fragments into rigid Broken Glass box.'
        ]
      },
      benchWarning: 'Never fill a burette above eye level. Always lower the support ring stand before pouring acids or bases.'
    }
  },
  {
    id: 'rotary-evaporator',
    name: 'Rotary Evaporator (Rotovap)',
    aliases: ['Rotovap', 'Büchi evaporator', 'Vacuum thin-film solvent stripper'],
    category: 'separation',
    categoryLabel: 'Separation & Vacuum',
    imageUrl: '/src/assets/images/rotary_evaporator_lab_1791406969764.jpg',
    schematicIcon: 'rotovap',
    description: 'An electro-mechanical distillation system that rapidly strips volatile solvents from chemical mixtures at reduced temperatures through vacuum depression, thin-film flask rotation, and heated water bath thermal transfer.',
    primaryApplications: [
      'Concentration of organic synthesis products and extraction crude oils',
      'Low-temperature recovery of heat-sensitive chemical reaction mixtures',
      'Distillation and recycling of non-aqueous solvent fractions'
    ],
    specs: {
      material: 'Borosilicate 3.3 glass assembly with PTFE/FKM vacuum lip seals',
      capacity: '50 mL to 2000 mL evaporating flasks',
      temperatureRange: 'Water bath ambient to 100°C (Oil bath to 180°C)',
      pressureRating: 'Ultimate vacuum down to < 2 mbar',
      standards: 'DIN EN 61010-1 / CE Safety Directive'
    },
    safety: {
      hazardLevel: 'critical',
      ghsPictograms: ['flammable', 'health_hazard', 'explosive'],
      primaryHazards: [
        'Catastrophic glass implosion of round-bottom flask under hard vacuum',
        'Solvent vapor auto-ignition from flammable vapors contacting hot water bath',
        'Violent thermal bumping projecting hot corrosive mixture into condenser coil',
        'Peroxide explosion when concentrating ether, THF, or dioxane solutions to dryness'
      ],
      requiredPPE: ['safety_goggles', 'face_shield', 'nitrile_gloves', 'flame_resistant_coat', 'fume_hood'],
      incompatibilities: [
        {
          reagent: 'Peroxide-forming solvents (Diethyl Ether, THF, 1,4-Dioxane)',
          risk: 'Severe explosive detonation when concentrated near dryness due to organic peroxide accumulation.',
          guidance: 'Always test for peroxides using test strips before evaporation. Never evaporate to complete dryness.'
        },
        {
          reagent: 'Explosive azides, diazo compounds, or dry organic perchlorates',
          risk: 'Shock, thermal, and friction-sensitive violent explosion during rotation or heating.',
          guidance: 'Do not use standard rotovaps for volatile azides or polynitro compounds without specialized blast shielding.'
        }
      ],
      sop: {
        preInspection: [
          'Perform tactile and light inspection of evaporating flask and bump trap for star-burst cracks or scratch defects.',
          'Verify condenser cooling chiller temperature is at least 20°C below solvent boiling point.',
          'Inspect plastic Keck joint clips for heat embrittlement or physical fatigue before mounting.'
        ],
        safeOperation: [
          'Fill evaporating flask to no more than 50% capacity (ideally 30-40%) to prevent solvent foaming.',
          'Always secure flask to vapor duct with proper size Keck clip.',
          'Start rotation FIRST, apply vacuum SECOND, and lower into heated water bath LAST.',
          'To terminate run: raise flask from bath FIRST, vent vacuum to atmosphere SECOND, stop rotation LAST.'
        ],
        cleaningAndStorage: [
          'Empty receiving flask into designated halogenated or non-halogenated organic waste drum after every run.',
          'Rinse vapor tube and bump trap with acetone or ethanol to remove cross-contaminants.',
          'Wipe bath basin with lint-free wipes; power down chiller and vacuum pump when idle.'
        ],
        emergencyProtocol: [
          'If glass implosion occurs: immediately isolate power at wall disconnect switch, vent system, and evacuate the immediate area for 10 minutes to allow solvent aerosol dispersion.',
          'If solvent vapors ignite in bath: activate dry chemical extinguisher; do not attempt to extinguish organic solvent bath with water.'
        ]
      },
      benchWarning: 'Always rotate flask BEFORE lowering into water bath. Always vent vacuum BEFORE turning off rotation.'
    }
  },
  {
    id: 'hotplate-magnetic-stirrer',
    name: 'Hotplate Magnetic Stirrer',
    aliases: ['Stirring hotplate', 'Digital magnetic stirrer', 'Ceramic lab heater'],
    category: 'heating',
    categoryLabel: 'Heating & Thermal',
    imageUrl: '/src/assets/images/magnetic_hotplate_stirrer_1791406979233.jpg',
    schematicIcon: 'hotplate',
    description: 'An essential benchtop thermal apparatus featuring an electrically heated chemical-resistant ceramic top plate and a motorized rotating magnetic field that drives a PTFE-coated stir bar inside reaction vessels.',
    primaryApplications: [
      'Constant-temperature heating of reaction mixtures with continuous agitation',
      'Dissolution of solid chemical reagents and crystallization studies',
      'Reflux boiling and oil/water bath temperature regulation'
    ],
    specs: {
      material: 'Solid white ceramic top plate with aluminum cast housing',
      temperatureRange: 'Ambient up to 540°C (Digital control ±1°C with PT1000 probe)',
      capacity: 'Stirring volume up to 15 Liters water',
      standards: 'IP 42 protection class, DIN EN 61010-2-010'
    },
    safety: {
      hazardLevel: 'high',
      ghsPictograms: ['flammable'],
      primaryHazards: [
        'Severe third-degree thermal contact burns from ceramic plate (which remains dangerously hot long after being powered off)',
        'Vapor flash fire if flammable solvents (ether, hexane) spill onto hotplate surface above their auto-ignition temperature',
        'Flask cracking from sudden thermal shock on dry ceramic surfaces'
      ],
      requiredPPE: ['safety_goggles', 'thermal_gloves', 'nitrile_gloves', 'flame_resistant_coat'],
      incompatibilities: [
        {
          reagent: 'Low Auto-Ignition Solvents (Carbon Disulfide [100°C], Diethyl Ether [160°C])',
          risk: 'Vapor cloud will auto-ignite on the heating element even in the absence of an open flame.',
          guidance: 'Always operate inside certified chemical fume hood. Never heat open containers of volatile solvents.'
        },
        {
          reagent: 'Strong Hydrofluoric Acid Solutions',
          risk: 'Chemically corrodes ceramic enamel top plate creating pitting and uneven hot spots.',
          guidance: 'Clean spills immediately with sodium bicarbonate neutralization paste.'
        }
      ],
      sop: {
        preInspection: [
          'Inspect power cable for thermal scorch marks, fraying, or chemical solvent degradation.',
          'Check ceramic plate surface for chipped enamel, cracks, or residual chemical crusts.',
          'Verify "HOT TOP" warning LED illuminates when surface temperature exceeds 50°C.'
        ],
        safeOperation: [
          'Place flat-bottom borosilicate vessels centered on the plate; never place thick volumetric flasks directly on hotplates.',
          'Spin up magnetic stir bar gradually from low RPM to prevent spin-out and glass breakage.',
          'Position all power cords well away from the hot ceramic heating element.',
          'When heating organic solvents, always set the upper safety limit temperature cutoff 25°C below solvent auto-ignition point.'
        ],
        cleaningAndStorage: [
          'Allow plate to cool completely until "HOT" residual indicator turns off before touching or cleaning.',
          'Wipe surface with mild detergent damp cloth; never spray cold liquids directly onto hot ceramic plates.',
          'Store magnetic stir bars in clean labeled box away from electronic balances and compasses.'
        ],
        emergencyProtocol: [
          'In case of thermal burn: immediately hold burned tissue under cool running tap water for at least 20 minutes; do not apply ointments or ice.',
          'If solvent spills and ignites on hotplate: immediately pull power cord plug, close fume hood sash completely, and discharge Class B/CO2 extinguisher.'
        ]
      },
      benchWarning: 'Ceramic plates remain dangerously hot (>50°C) for over 30 minutes after power-down. Never trust visual appearance alone.'
    }
  },
  {
    id: 'analytical-balance',
    name: 'Analytical Balance (4-Decimal Precision)',
    aliases: ['Micro-balance', 'Draft shield balance', 'Analytical scale'],
    category: 'analytical',
    categoryLabel: 'Analytical Instruments',
    imageUrl: '/src/assets/images/analytical_balance_scale_1791406988684.jpg',
    schematicIcon: 'balance',
    description: 'An ultra-sensitive electromagnetic force restoration weighing instrument featuring a draft-shielded glass chamber capable of measuring mass down to 0.0001 grams (0.1 milligrams).',
    primaryApplications: [
      'Gravimetric standard preparation and primary standard reagent weighing',
      'Quantitative stoichiometric yield determinations',
      'Quantitative analytical calibration standard preparation'
    ],
    specs: {
      material: 'Stainless steel weighing pan with antistatic borosilicate draft glass',
      capacity: '0.1 mg up to 220 g',
      tolerance: 'Readability: 0.0001 g (±0.0002 g linearity)',
      temperatureRange: 'Operates in climate-controlled room (15°C – 30°C, ±0.5°C/hr drift)',
      standards: 'USP Chapter <41> / OIML Class I'
    },
    safety: {
      hazardLevel: 'low',
      ghsPictograms: ['toxic', 'health_hazard'],
      primaryHazards: [
        'Inhalation of fine hazardous or toxic chemical powders during weighing inside draft shield',
        'Cross-contamination of allergens or active pharmaceutical ingredients (APIs)',
        'Corrosive attack of electromagnetic weighing cell mechanism by spilled salts'
      ],
      requiredPPE: ['safety_goggles', 'nitrile_gloves', 'flame_resistant_coat', 'respirator'],
      incompatibilities: [
        {
          reagent: 'Corrosive Acid Powders & Hygroscopic Salts (P2O5, AlCl3 anhydrous, NaOH pellets)',
          risk: 'Rapidly absorbs atmospheric moisture and corrodes stainless steel pan and internal flexure springs.',
          guidance: 'Always weigh hygroscopic or fuming materials inside closed tared weighing bottles.'
        },
        {
          reagent: 'Strong Permanent Magnets',
          risk: 'Permanently distorts electromagnetic force restoration magnetic core calibration.',
          guidance: 'Keep magnetic stir bars and magnetic tools at least 1 meter away from analytical balance.'
        }
      ],
      sop: {
        preInspection: [
          'Verify balance leveling bubble is dead-center within the indicator circle before tare.',
          'Check that weighing pan and draft chamber floor are completely clean of chemical powders.',
          'Perform internal motor calibration (Auto-Cal) before morning weighing runs.'
        ],
        safeOperation: [
          'Always close both glass draft shield doors before recording the final stabilized mass reading.',
          'Never add chemical reagents to a container while it sits directly on the balance pan; remove container, add reagent on bench, then reweigh.',
          'Use antistatic weighing paper, boats, or glass weighing bottles; handle containers with forceps or gloved hands to avoid skin oil deposition.',
          'Do not lean or place heavy books on the heavy marble vibration isolation table.'
        ],
        cleaningAndStorage: [
          'Immediately sweep any spilled powder using camel-hair brush from inside chamber into waste receptacle.',
          'Wipe stainless pan gently with 70% isopropanol lint-free wipe if chemical residue is detected.',
          'Keep draft doors closed at all times when not in use.'
        ],
        emergencyProtocol: [
          'If potent toxic or mutative powder is spilled inside balance: alert lab manager, place "OUT OF ORDER - CONTAMINATED" sign, and perform wet-wipe decontamination with appropriate neutralizer.',
          'If respiratory irritation occurs from aerosolized dust: move to fresh air and check SDS for chemical specifics.'
        ]
      },
      benchWarning: 'Never transfer powders inside the draft chamber. Always take the vessel out to add reagent, then place back on pan.'
    }
  },
  {
    id: 'fume-hood',
    name: 'Chemical Fume Hood Station',
    aliases: ['Laboratory exhaust hood', 'Sash containment station', 'Fume cupboard'],
    category: 'safety',
    categoryLabel: 'Safety Containment',
    imageUrl: '/src/assets/images/fume_hood_safety_station_1791406999400.jpg',
    schematicIcon: 'fumehood',
    description: 'A certified negative-pressure ventilated engineering control enclosure designed to limit worker exposure to hazardous, toxic, or flammable fumes, vapors, and chemical particulate mists through controlled aerodynamic face velocity.',
    primaryApplications: [
      'Containment of reactions evolving toxic gases (HCl, Cl2, NH3, HCN, SO2)',
      'Handling volatile organic solvents, lachrymators, and hazardous reagents',
      'Physical barrier protection against minor splashes, thermal flash fires, and aerosol releases'
    ],
    specs: {
      material: 'Chemical-resistant phenolic resin / epoxy liner with tempered laminated safety glass sash',
      capacity: '4 ft to 6 ft benchtop work surface',
      tolerance: 'Face velocity calibrated to 80 - 100 FPM (Feet Per Minute)',
      standards: 'ASHRAE 110-2016 containment certification / OSHA 1910.1450'
    },
    safety: {
      hazardLevel: 'critical',
      ghsPictograms: ['toxic', 'corrosive', 'flammable', 'compressed_gas'],
      primaryHazards: [
        'Vapor escape into laboratory room breathing zone if sash is opened above certified stop arrow',
        'Air turbulence vortices causing fume backflow when apparatus is placed closer than 6 inches from front lip',
        'Fire or chemical explosion inside exhaust ductwork if incompatible vapors are mixed'
      ],
      requiredPPE: ['safety_goggles', 'nitrile_gloves', 'flame_resistant_coat'],
      incompatibilities: [
        {
          reagent: 'Perchloric Acid (HClO4)',
          risk: 'Vapors condense in ductwork forming shock-sensitive explosive perchlorate salts with metal joints.',
          guidance: 'Standard fume hoods MUST NOT be used for perchloric acid digestions. Only use dedicated wash-down hoods.'
        },
        {
          reagent: 'Radioisotopes (unless designated)',
          risk: 'Contaminates non-shielded exhaust plenum and filter housings.',
          guidance: 'Requires dedicated radionuclide hood with lead shielding and HEPA/charcoal filtration.'
        }
      ],
      sop: {
        preInspection: [
          'Verify digital airflow monitor displays "NORMAL" (green indicator) and face velocity reads between 80–120 FPM.',
          'Confirm that the exhaust baffle slots at the back of the hood floor and roof are unobstructed.',
          'Verify chemical spill catchment lip at front airfoil is clear of debris.'
        ],
        safeOperation: [
          'Position all experimental apparatus and chemical containers at least 6 inches (15 cm) behind the sash plane.',
          'Keep the sliding sash lowered to the designated certification mark (or as low as practical) during active reactions.',
          'Elevate large heating blocks and bulky apparatus by 1–2 inches on laboratory jacks or blocks to maintain laminar floor airflow.',
          'Never put your head inside the hood chamber while reactions or chemical transfers are in progress.'
        ],
        cleaningAndStorage: [
          'Do NOT use the fume hood as permanent chemical storage; store bottles in designated yellow flammable or blue acid cabinets.',
          'Decontaminate epoxy base surface with neutral detergent and wipe dry with lint-free towels.',
          'Lower sash completely to the fully closed position at end of working day to conserve facility HVAC energy.'
        ],
        emergencyProtocol: [
          'If low airflow audible alarm sounds: immediately close all open chemical containers, terminate heating, pull sash all the way down, and notify the lab safety officer.',
          'If fire erupts in hood: close sash completely to contain flames, press emergency gas shutoff button, and initiate building evacuation if fire does not self-extinguish.'
        ]
      },
      benchWarning: 'Maintain all equipment at least 6 inches behind the sash plane. Never use a fume hood with the sash elevated above certified mark.'
    }
  },
  {
    id: 'volumetric-flask',
    name: 'Volumetric Flask (Class A)',
    aliases: ['Measuring flask', 'Graduated standard flask', 'Kohlrausch flask'],
    category: 'glassware',
    categoryLabel: 'Precision Glassware',
    schematicIcon: 'volumetric_flask',
    description: 'A pear-shaped, flat-bottomed laboratory vessel with an elongated narrow neck marked with a single etched calibration ring for preparing analytical solutions of precise concentrations at a certified reference temperature.',
    primaryApplications: [
      'Preparation of standard calibration solutions for HPLC, GC, and spectrophotometry',
      'Accurate quantitative serial dilutions',
      'Gravimetric dissolution of solid primary reference standards'
    ],
    specs: {
      material: 'Borosilicate Glass 3.3 with ground glass or polyethylene stopper',
      capacity: '10 mL to 2000 mL (50, 100, 250, 500 mL standard)',
      tolerance: 'Class A: ±0.08 mL for 100 mL, ±0.15 mL for 250 mL',
      temperatureRange: 'Calibrated at 20°C (Do NOT oven-dry above 60°C)',
      standards: 'ASTM E288 / ISO 1042 Class A'
    },
    safety: {
      hazardLevel: 'low',
      ghsPictograms: ['corrosive'],
      primaryHazards: [
        'Permanent volume calibration loss from thermal distortion caused by hot-air oven drying',
        'Exothermic heat of dissolution (e.g. dissolving concentrated H2SO4) boiling over or shattering flask neck',
        'Internal pressure build-up from volatile solvent vapors ejecting glass stopper'
      ],
      requiredPPE: ['safety_goggles', 'nitrile_gloves', 'flame_resistant_coat'],
      incompatibilities: [
        {
          reagent: 'Direct heating on open flame or hotplate surface',
          risk: 'Uneven thermal expansion permanently alters the certified volumetric internal volume of Class A glassware.',
          guidance: 'Never heat volumetric flasks on hotplates or direct flames.'
        },
        {
          reagent: 'Hot Concentrated Hydrofluoric Acid or Caustic Alkalies',
          risk: 'Etches calibrated internal neck line, rendering volumetric measurement invalid.',
          guidance: 'Avoid alkaline storage; prepare and transfer immediately.'
        }
      ],
      sop: {
        preInspection: [
          'Inspect neck and rim for chips or micro-cracks near the calibration ring.',
          'Ensure matching numbered ground glass stopper or clean PTFE stopper fits tightly without rocking.',
          'Check that internal glass walls are grease-free (water should sheet smoothly without droplet bead formation).'
        ],
        safeOperation: [
          'Dissolve solute completely in a separate beaker with ~50% required solvent volume before transferring quantitatively into volumetric flask.',
          'Bring solution to calibrated temperature (usually 20°C) BEFORE filling to final mark; liquids expand and contract significantly with temperature.',
          'Add final solvent drops using a Pasteur pipette until the bottom of the meniscus touches the top edge of the etched graduation ring at eye level.',
          'Stopper firmly and invert 15 to 20 times with thumb securing stopper to achieve complete homogeneity.'
        ],
        cleaningAndStorage: [
          'Rinse three times with deionized water immediately after use.',
          'Allow to air-dry inverted on pegboard rack; NEVER bake in glassware drying oven above 60°C.',
          'Insert paper shim between stopper and neck if storing with glass stopper in place to prevent ground joint freezing.'
        ],
        emergencyProtocol: [
          'If flask cracks while preparing concentrated solution: place beaker beneath, neutralize spill according to acid/base protocol, and dispose of glass safely.'
        ]
      },
      benchWarning: 'Never dry Class A volumetric glassware in hot ovens. Thermal expansion permanently destroys factory volume calibration.'
    }
  },
  {
    id: 'erlenmeyer-flask',
    name: 'Erlenmeyer Flask (Conical Flask)',
    aliases: ['Conical flask', 'Titration flask', 'Reaction flask'],
    category: 'glassware',
    categoryLabel: 'Precision Glassware',
    schematicIcon: 'erlenmeyer',
    description: 'A cone-shaped, flat-bottomed borosilicate vessel with a cylindrical neck, ideal for swirling liquids without risk of spilling, recrystallization, and boiling with reduced vapor loss.',
    primaryApplications: [
      'Manual titrations requiring vigorous hand swirling',
      'Recrystallization of organic solids and hot gravity filtration',
      'Temporary storage and preparation of culture broths or reaction media'
    ],
    specs: {
      material: 'Borosilicate Glass 3.3',
      capacity: '25 mL to 5000 mL (125, 250, 500 mL standard)',
      tolerance: 'Volume markings are approximate (±5% accuracy)',
      temperatureRange: '-50°C to +500°C (thermal shock resistance: ΔT = 100°C)',
      standards: 'ISO 1773 / ASTM E1404'
    },
    safety: {
      hazardLevel: 'low',
      ghsPictograms: ['corrosive', 'flammable'],
      primaryHazards: [
        'Vessel implosion if regular thin-walled Erlenmeyer flask is connected to vacuum filtration line (use heavy-walled filter flask instead)',
        'Vessel rupture if heated with stopper tightly sealed (pressure cooker effect)',
        'Thermal shock cracking if hot flask is set down on cold granite or metal benchtop'
      ],
      requiredPPE: ['safety_goggles', 'nitrile_gloves', 'flame_resistant_coat'],
      incompatibilities: [
        {
          reagent: 'Full Vacuum Line Connection',
          risk: 'Standard thin-walled Erlenmeyers have flat bases unable to withstand negative atmospheric pressure and will implode violently.',
          guidance: 'Only use heavy-walled Büchner filter flasks for vacuum work.'
        }
      ],
      sop: {
        preInspection: [
          'Inspect base and neck junction for star cracks or deep scratches.',
          'Ensure vessel has a fire-polished lip free from chips that could tear gloves.'
        ],
        safeOperation: [
          'Always leave flask mouth unsealed or vented through a drying tube when heating liquids.',
          'When heating to boiling, add boiling stones or a magnetic stir bar to prevent sudden superheated liquid eruption.',
          'Place hot flasks on cork rings or ceramic pads, never directly on cold stone workbenches.'
        ],
        cleaningAndStorage: [
          'Wash with lab brush and neutral detergent; rinse with deionized water and dry inverted.'
        ],
        emergencyProtocol: [
          'If boil-over occurs: immediately switch off heat source and evacuate the fume hood area.'
        ]
      },
      benchWarning: 'Never pull vacuum on standard Erlenmeyer flasks. Flat thin bottoms implode violently under negative pressure.'
    }
  },
  {
    id: 'buchner-funnel-flask',
    name: 'Büchner Funnel & Heavy-Walled Filter Flask',
    aliases: ['Vacuum filtration kit', 'Suction filter flask', 'Büchner funnel assembly'],
    category: 'separation',
    categoryLabel: 'Separation & Vacuum',
    schematicIcon: 'buchner',
    description: 'A heavy-walled borosilicate flask equipped with a sidearm tubulation and a perforated ceramic or porcelain funnel designed to rapidly separate crystalline solids from liquids under house vacuum or aspirator suction.',
    primaryApplications: [
      'Rapid isolation of synthetic precipitates and crystals from mother liquor',
      'Clarification of viscous solutions with filter aids (Celite)',
      'Washing and partial drying of collected chemical solids under suction'
    ],
    specs: {
      material: 'Extra heavy-wall Borosilicate 3.3 flask with glazed porcelain funnel & neoprene collar',
      capacity: '250 mL to 2000 mL flask; 50 mm to 150 mm funnel diameter',
      pressureRating: 'Full atmospheric vacuum (rated to withstand 1 atm differential)',
      standards: 'DIN 12476 / ASTM E1094'
    },
    safety: {
      hazardLevel: 'high',
      ghsPictograms: ['corrosive', 'toxic'],
      primaryHazards: [
        'Catastrophic glass implosion projecting sharp fragments if glass has microscopic flaws',
        'Liquid back-suction from water aspirator contaminating pure sample if vacuum drops suddenly',
        'Top-heavy tip-over spilling hazardous filtrate'
      ],
      requiredPPE: ['safety_goggles', 'face_shield', 'nitrile_gloves', 'flame_resistant_coat'],
      incompatibilities: [
        {
          reagent: 'Direct Water Aspirator connection without an in-line vacuum trap',
          risk: 'Sudden water line pressure drop creates reverse suction, pulling tap water into the filter flask.',
          guidance: 'Always insert a heavy-walled vacuum trap flask between the filter flask and the vacuum source.'
        }
      ],
      sop: {
        preInspection: [
          'Inspect thick glass walls of filter flask for any scratches, chips, or star cracks under bright light.',
          'Check that rubber/neoprene adapter collar provides an airtight seal without cracking.',
          'Confirm that heavy-duty vacuum tubing (thick rubber or reinforced PVC) is used, not thin latex hoses.'
        ],
        safeOperation: [
          'Always secure the filter flask firmly to a heavy support stand with a secure three-finger clamp to prevent tip-overs.',
          'Cut filter paper to lie completely flat over the porcelain perforated plate; wet with solvent and apply gentle suction to seat the paper before pouring slurry.',
          'Always disconnect vacuum line at the flask sidearm BEFORE turning off the water aspirator or vacuum pump to prevent reverse suction.'
        ],
        cleaningAndStorage: [
          'Scrape solid crystals gently with spatula without scraping porcelain glaze.',
          'Rinse funnel pores with back-flush solvent over waste container.',
          'Inspect rubber filter adapter and replace when stiff or embrittled.'
        ],
        emergencyProtocol: [
          'If flask implodes: turn off vacuum immediately, check for injuries, and sweep glass using protective leather gloves.'
        ]
      },
      benchWarning: 'Always clamp the filter flask to a ring stand. Top-heavy porcelain funnels cause sudden flask tipping and spills.'
    }
  },
  {
    id: 'separatory-funnel',
    name: 'Separatory Funnel (Sep Funnel)',
    aliases: ['Squibb sep funnel', 'Liquid-liquid extraction funnel', 'Pear-shaped separator'],
    category: 'glassware',
    categoryLabel: 'Precision Glassware',
    schematicIcon: 'separatory_funnel',
    description: 'A pear-shaped glass vessel featuring an upper ground glass stopper and a bottom PTFE stopcock, configured to partition solutes between two immiscible liquid phases (aqueous and organic).',
    primaryApplications: [
      'Liquid-liquid partitioning and solvent extractions',
      'Washing crude reaction mixtures (acid/base wash, brine wash)',
      'Aqueous phase separation in organic synthesis workups'
    ],
    specs: {
      material: 'Borosilicate Glass 3.3 with precision PTFE stopcock & ground stopper',
      capacity: '60 mL to 2000 mL (125, 250, 500 mL standard)',
      tolerance: 'Non-graduated or approximate graduation volume',
      standards: 'ISO 4800 / ASTM E1096'
    },
    safety: {
      hazardLevel: 'high',
      ghsPictograms: ['flammable', 'toxic', 'corrosive'],
      primaryHazards: [
        'Vapor pressure buildup exploding the funnel stopper during shaking with volatile solvents (diethyl ether, DCM)',
        'Violent chemical mist spray onto face or bench partner if vented in an unsafe direction',
        'Vessel falling through support ring if ring diameter is incorrectly matched'
      ],
      requiredPPE: ['safety_goggles', 'face_shield', 'nitrile_gloves', 'flame_resistant_coat', 'fume_hood'],
      incompatibilities: [
        {
          reagent: 'Volatile solvents mixed with carbonate/bicarbonate washes (NaHCO3 + acid)',
          risk: 'Massive carbon dioxide (CO2) gas generation creates explosive internal pressure within seconds of gentle inversion.',
          guidance: 'Swirl gently in open funnel FIRST until initial effervescence ceases before inserting stopper and venting frequently.'
        }
      ],
      sop: {
        preInspection: [
          'Ensure PTFE stopcock is snug, free of leaks, and turns smoothly.',
          'Verify that ground glass or PTFE stopper fits snugly and is secured with clip or index finger.',
          'Inspect the support iron ring; confirm it is lined with split rubber tubing to prevent metal-on-glass abrasion.'
        ],
        safeOperation: [
          'Always hold the stopper securely with the palm of your hand and hold the stopcock assembly with your other hand.',
          'Invert the funnel gently and IMMEDIATELY vent through the stopcock tip pointing AWAY from yourself and all colleagues towards the back of the fume hood.',
          'Vent frequently: every 2-3 shakes during initial mixing until no further gas discharge hiss is heard.',
          'Always remove the top stopper before opening the stopcock to drain the bottom layer; otherwise vacuum lock will prevent draining or cause sudden splattering.'
        ],
        cleaningAndStorage: [
          'Rinse thoroughly with appropriate solvent and deionized water; leave stopcock open during storage.'
        ],
        emergencyProtocol: [
          'If stopper blows off due to overpressure: immediately duck away, flush eyes at station if mist contacts face, and keep hood sash down.'
        ]
      },
      benchWarning: 'Always point the stem toward the back of the fume hood when venting. Never point toward yourself or bench partners.'
    }
  },
  {
    id: 'bunsen-burner',
    name: 'Bunsen Burner & Meker Burner',
    aliases: ['Gas burner', 'Laboratory flame burner', 'Tirrill burner'],
    category: 'heating',
    categoryLabel: 'Heating & Thermal',
    schematicIcon: 'bunsen_burner',
    description: 'A traditional gas burner producing a single open gas flame whose temperature and flame characteristics are regulated by adjusting the air intake collar and needle valve.',
    primaryApplications: [
      'Glass tube bending, fire-polishing, and flaring',
      'Sterilization of microbiological loops and tools',
      'Rapid boiling of non-flammable aqueous solutions'
    ],
    specs: {
      material: 'Chrome-plated brass barrel with heavy zinc die-cast base',
      temperatureRange: 'Outer cone flame reaches 1100°C to 1500°C (Meker up to 1750°C)',
      standards: 'DIN 30665 / ANSI Z21.69'
    },
    safety: {
      hazardLevel: 'critical',
      ghsPictograms: ['flammable'],
      primaryHazards: [
        'Flash ignition of flammable solvent vapors (acetone, ethanol, ether) present anywhere in the laboratory room',
        'Unattended open flame causing clothing or long hair ignition',
        'Strike-back burning inside barrel tube overheating burner base and melting rubber gas hose'
      ],
      requiredPPE: ['safety_goggles', 'flame_resistant_coat', 'thermal_gloves'],
      incompatibilities: [
        {
          reagent: 'Any Volatile Organic Solvents within 3 meters (10 feet)',
          risk: 'Vapors travel along the bench surface and ignite upon reaching the burner base.',
          guidance: 'Strictly prohibit open flames in any laboratory where organic solvents are open or being distilled.'
        }
      ],
      sop: {
        preInspection: [
          'Inspect flexible gas tubing for cracking, dry rot, loose hose barbs, or hose clamp slippage.',
          'Check that air collar turns freely and gas needle valve seats completely.'
        ],
        safeOperation: [
          'Tie back all long hair, roll up loose sleeves, and clear benchtop of all paper and reagents.',
          'Close air intake collar completely before lighting to produce a visible luminous yellow safety flame.',
          'Ignite using a flint spark striker held slightly above the rim; NEVER use paper matches or butane cigarette lighters.',
          'Open air collar gradually until non-luminous blue flame with clear inner cone appears (hottest point is just above inner cone tip).',
          'Never leave an ignited burner unattended even for 30 seconds.'
        ],
        cleaningAndStorage: [
          'Shut off gas valve at the main bench gas turret cock FIRST, then close burner needle valve.',
          'Allow burner barrel to cool for 15 minutes before touching or stowing away.'
        ],
        emergencyProtocol: [
          'If clothing catches fire: STOP, DROP, AND ROLL. Wrap victim in emergency fire blanket. Never spray dry chemical extinguisher directly into victim face.',
          'If gas leak smells: shut main emergency gas isolation valve immediately, open all windows, and evacuate.'
        ]
      },
      benchWarning: 'Never light a Bunsen burner in an organic chemistry lab. Invisible solvent vapors travel across benches and ignite instantly.'
    }
  },
  {
    id: 'ph-meter',
    name: 'Digital Benchtop pH Meter & Combination Electrode',
    aliases: ['pH/mV meter', 'Glass electrode pH sensor', 'Ion-selective meter'],
    category: 'analytical',
    categoryLabel: 'Analytical Instruments',
    schematicIcon: 'ph_meter',
    description: 'A precision potentiometric analytical instrument that measures the electromotive force (EMF) generated across a glass hydrogen-ion sensitive membrane relative to an internal reference half-cell.',
    primaryApplications: [
      'Accurate monitoring of reaction solution pH and buffer preparation',
      'Potentiometric titration endpoint determination',
      'Quality control testing of chemical, biochemical, and pharmaceutical products'
    ],
    specs: {
      material: 'Combination glass bulb / Ag/AgCl double junction electrode with gel electrolyte',
      capacity: 'pH range -2.00 to 16.00 / mV range ±2000 mV',
      tolerance: 'Accuracy ±0.01 pH with Automatic Temperature Compensation (ATC)',
      temperatureRange: '0°C to 100°C electrode operating range',
      standards: 'USP <791> / ISO 10523'
    },
    safety: {
      hazardLevel: 'low',
      ghsPictograms: ['irritant'],
      primaryHazards: [
        'Electrode glass membrane shattering upon impact with beaker wall or spinning magnetic stir bar',
        'Skin contact with 3M KCl electrode storage filling solution',
        'Contamination of sample solutions from cross-transferred buffer residues'
      ],
      requiredPPE: ['safety_goggles', 'nitrile_gloves', 'flame_resistant_coat'],
      incompatibilities: [
        {
          reagent: 'Deionized / Distilled Water for long-term electrode storage',
          risk: 'Osmotic leaching of ions from reference glass junction and internal electrolyte, permanently ruining the electrode calibration.',
          guidance: 'Always store pH electrode in saturated 3M KCl or designated storage solution. Never in DI water.'
        },
        {
          reagent: 'Hydrofluoric Acid (HF) Solutions',
          risk: 'Instantly dissolves the fragile pH-sensitive thin glass bulb membrane.',
          guidance: 'Use ISFET (non-glass semiconductor) pH probes for fluoride-containing solutions.'
        }
      ],
      sop: {
        preInspection: [
          'Verify glass bulb is clean, hydrated, and free of cracks or air bubbles trapped in the tip.',
          'Ensure electrode storage bottle contains adequate 3M KCl electrolyte solution.',
          'Perform minimum 2-point or 3-point calibration using certified pH 4.01, 7.00, and 10.01 buffers.'
        ],
        safeOperation: [
          'Rinse electrode tip with deionized water squirt bottle between every measurement; blot gently with lint-free lab wipe (never rub glass bulb, which causes static charge errors).',
          'Ensure magnetic stir bar cannot collide with electrode bulb inside beaker.',
          'Allow temperature reading to stabilize before taking final calibrated pH readout.'
        ],
        cleaningAndStorage: [
          'Rinse with DI water and immerse into electrode storage bottle containing 3M KCl.',
          'If organic films coat the bulb: clean briefly with 0.1M HCl or ethanol, rinse thoroughly, and soak in KCl for 2 hours.'
        ],
        emergencyProtocol: [
          'If glass electrode breaks inside sample: discard contaminated sample, clean shards into broken glass container, and replace probe.'
        ]
      },
      benchWarning: 'Never store pH electrodes in deionized water. Always use 3M KCl storage solution to prevent electrolyte leaching.'
    }
  },
  {
    id: 'heating-mantle',
    name: 'Heating Mantle with Variac Controller',
    aliases: ['Flask mantle', 'Spherical electric mantle', 'Distillation heater'],
    category: 'heating',
    categoryLabel: 'Heating & Thermal',
    schematicIcon: 'heating_mantle',
    description: 'An insulated spherical fabric mantle containing embedded nichrome resistance heating elements shaped to fit round-bottom flasks for uniform thermal conduction without open flames.',
    primaryApplications: [
      'Refluxing organic reaction mixtures in round-bottom flasks',
      'Fractional distillation of high-boiling chemical solvents',
      'Uniform heating of vacuum-distillation setups'
    ],
    specs: {
      material: 'Woven fiberglass yarn interior with aluminum outer shell',
      capacity: 'Matched to specific flask volumes (100 mL, 250 mL, 500 mL, 1000 mL)',
      temperatureRange: 'Up to 450°C regulated by external solid-state voltage controller (Variac)',
      standards: 'UL 499 / CE Certified'
    },
    safety: {
      hazardLevel: 'high',
      ghsPictograms: ['flammable'],
      primaryHazards: [
        'Electrical shock if chemical liquids spill into the porous fabric heating cavity',
        'Ignition of flammable solvent if liquid boils over directly onto hot heating elements',
        'Catastrophic thermal stress if flask size does not match mantle pocket dimensions'
      ],
      requiredPPE: ['safety_goggles', 'thermal_gloves', 'nitrile_gloves', 'flame_resistant_coat'],
      incompatibilities: [
        {
          reagent: 'Liquid Spills directly inside mantle well',
          risk: 'Liquids absorb into porous mineral insulation creating electrical short circuits, smoking, and toxic breakdown gases.',
          guidance: 'Always power off immediately if liquid enters the mantle cavity.'
        }
      ],
      sop: {
        preInspection: [
          'Inspect woven fiberglass interior for chemical discoloration, tears, or exposed heating wires.',
          'Verify that flask diameter matches mantle cavity size snugly without gaps.',
          'Inspect Variac power cord and grounding plug integrity.'
        ],
        safeOperation: [
          'Always mount heating mantle on a laboratory scissor jack so it can be rapidly lowered away from the flask in case of runaway thermal reaction.',
          'Never plug a heating mantle directly into an unregulated 120V/240V wall socket; always route through a Variac or proportional power controller.',
          'Add boiling stones or magnetic stir bar before heating starts.'
        ],
        cleaningAndStorage: [
          'Disconnect power and allow mantle to cool to room temperature before handling.',
          'Never immerse or rinse mantles with water or solvents; clean dry dust with vacuum if necessary.'
        ],
        emergencyProtocol: [
          'If reaction overheats or begins runaway boil: lower the lab jack immediately to drop the mantle away from the flask, and switch off power.'
        ]
      },
      benchWarning: 'Always support the heating mantle on a lab scissor jack. Dropping the jack is your only rapid heat shutoff during an exothermic runaway.'
    }
  },
  {
    id: 'spectrophotometer',
    name: 'UV-Visible Spectrophotometer',
    aliases: ['UV-Vis', 'Absorption spectrophotometer', 'Double-beam spectrometer'],
    category: 'analytical',
    categoryLabel: 'Analytical Instruments',
    schematicIcon: 'spectrophotometer',
    description: 'An optical analytical instrument that quantifies light absorption across ultraviolet (190–380 nm) and visible (380–1100 nm) wavelengths to determine chemical concentrations via the Beer-Lambert law.',
    primaryApplications: [
      'Quantitative determination of transition metal complexes and organic chromophores',
      'Enzyme kinetics and reaction rate measurement',
      'Purity verification of synthesized chemical and biochemical targets'
    ],
    specs: {
      material: 'Double-beam optical bench with deuterium and tungsten-halogen lamps',
      capacity: 'Standard 10 mm pathlength quartz / optical glass cuvettes',
      tolerance: 'Wavelength accuracy ±0.5 nm, photometric accuracy ±0.002 A',
      standards: 'ISO 9001 / USP Chapter <857>'
    },
    safety: {
      hazardLevel: 'low',
      ghsPictograms: ['irritant'],
      primaryHazards: [
        'Direct UV eye damage from unshielded deuterium arc lamp emission (never defeat lid interlocks)',
        'Sample cuvette breakage inside sample cell holder spilling corrosive solvent into internal optics',
        'Inhalation of hazardous organic solvents during open cell handling'
      ],
      requiredPPE: ['safety_goggles', 'nitrile_gloves', 'flame_resistant_coat'],
      incompatibilities: [
        {
          reagent: 'Plastic Polystyrene Cuvettes used with Organic Solvents (Acetone, Toluene, Chloroform)',
          risk: 'Solvent dissolves plastic optical windows within seconds, clouding cuvette and ruining detector holder.',
          guidance: 'Always use precision fused quartz cuvettes for non-aqueous solvents.'
        }
      ],
      sop: {
        preInspection: [
          'Power on system 20 minutes prior to use to allow deuterium and tungsten lamps to reach thermal equilibrium.',
          'Inspect quartz cuvettes for scratches, smudges, or interior chemical coatings.',
          'Ensure sample compartment is free of dust and spilled liquid residues.'
        ],
        safeOperation: [
          'Handle cuvettes strictly by the frosted sides; never touch optical clear windows with fingers.',
          'Wipe clear optical faces with lint-free optical lens paper before inserting into cell turret.',
          'Ensure cuvette orientation (pathlength beam direction) is consistent for both blank and samples.',
          'Keep sample chamber lid closed during all baseline and sample scans.'
        ],
        cleaningAndStorage: [
          'Rinse cuvettes immediately after use with clean solvent, then deionized water; invert on lint-free paper.',
          'Never sonic cleaning cuvettes in harsh ultrasonic baths which can break quartz fusion seams.'
        ],
        emergencyProtocol: [
          'If solvent spills into sample well: turn off instrument power immediately, wick fluid with lint-free swabs, and alert laboratory technician.'
        ]
      },
      benchWarning: 'Never touch the clear optical face of a quartz cuvette. Fingerprint oils introduce significant photometric absorption errors.'
    }
  },
  {
    id: 'centrifuge',
    name: 'Benchtop High-Speed Centrifuge',
    aliases: ['Microcentrifuge', 'Bench centrifuge', 'Centrifugal separator'],
    category: 'separation',
    categoryLabel: 'Separation & Vacuum',
    schematicIcon: 'centrifuge',
    description: 'An electro-mechanical rotating separator that applies centrifugal force thousands of times greater than gravity to separate phases of differing densities (precipitates, suspensions, colloids).',
    primaryApplications: [
      'Pelleting chemical precipitates and colloids from liquid media',
      'Clarification of difficult-to-filter particulate slurries',
      'Phase separation of stubborn liquid-liquid emulsions'
    ],
    specs: {
      material: 'Aerosol-tight aluminum fixed-angle rotor in armored steel chamber',
      capacity: '24 x 1.5/2.0 mL micro-tubes or 6 x 50 mL Falcon tubes',
      tolerance: 'Speeds up to 15,000 RPM (RCF > 21,000 x g)',
      standards: 'IEC 61010-2-020'
    },
    safety: {
      hazardLevel: 'critical',
      ghsPictograms: ['health_hazard'],
      primaryHazards: [
        'Catastrophic rotor explosion from severe mass imbalance at 15,000 RPM shattering containment armor',
        'Biohazard and chemical aerosolization if tube caps fail under centrifugal force',
        'Physical limb crush injury if lid safety latch is bypassed'
      ],
      requiredPPE: ['safety_goggles', 'nitrile_gloves', 'flame_resistant_coat'],
      incompatibilities: [
        {
          reagent: 'Unbalanced Tube Masses (> 0.1 g differential)',
          risk: 'Mass asymmetry creates massive harmonic vibration that damages drive shaft bearings and causes catastrophic rotor disintegration.',
          guidance: 'Always balance opposing centrifuge tubes on an analytical balance to within ±0.05 grams.'
        }
      ],
      sop: {
        preInspection: [
          'Inspect rotor cavities for corrosion pits, cracks, or spilled fluid deposits.',
          'Verify rotor fixing nut is securely tightened onto the central spindle.',
          'Inspect tube O-rings for aerosol-tight biocontainment lids.'
        ],
        safeOperation: [
          'Always balance opposing tubes across the center axis in pairs matched by mass, volume, and tube geometry.',
          'If running an odd number of samples, prepare an identical blank tube filled with equal density fluid.',
          'Screw on aerosol containment rotor cap before closing the main chamber lid.',
          'Remain at the centrifuge until rotor reaches set speed without abnormal vibration or shuddering sound.'
        ],
        cleaningAndStorage: [
          'Wipe bowl with neutral disinfectant after daily use; dry with soft towel.',
          'Store rotor lid unscrewed or off when not in use to allow rubber gaskets to relax.'
        ],
        emergencyProtocol: [
          'If loud rumbling or abnormal vibration occurs: abort cycle immediately (hit STOP button), cut power, and do not open lid until rotor has completely ceased rotation.'
        ]
      },
      benchWarning: 'Every tube must have a balanced counter-weight directly opposite. Rotor imbalance at high RPM destroys equipment and creates fatal projectile hazards.'
    }
  },
  {
    id: 'reflux-condenser',
    name: 'Liebig & Graham Reflux Condenser',
    aliases: ['Water-cooled condenser', 'Allihn condenser', 'Reflux cooling tube'],
    category: 'glassware',
    categoryLabel: 'Precision Glassware',
    schematicIcon: 'condenser',
    description: 'A double-walled borosilicate heat exchanger through which cold water circulates in an outer jacket to condense rising hot reaction vapors back into liquid and return them to the boiling flask.',
    primaryApplications: [
      'Maintaining boiling reaction mixtures at reflux without loss of solvent volume',
      'Distillation setups for condensation of fractionated solvent vapors',
      'Refluxing moisture-sensitive organic syntheses under inert gas'
    ],
    specs: {
      material: 'Borosilicate Glass 3.3 with standard taper ground glass joints (24/40 or 14/20)',
      capacity: 'Jacket length 200 mm to 400 mm',
      standards: 'DIN 12576 / ASTM E438'
    },
    safety: {
      hazardLevel: 'moderate',
      ghsPictograms: ['flammable'],
      primaryHazards: [
        'Cooling water hose popping off due to high water pressure, causing bench flooding and electrical shorts',
        'Vapor escape into laboratory if water flow stops unnoticed during solvent reflux',
        'Explosion if top of reflux condenser is sealed with a stopper (creates a sealed pressurized bomb)'
      ],
      requiredPPE: ['safety_goggles', 'nitrile_gloves', 'flame_resistant_coat'],
      incompatibilities: [
        {
          reagent: 'Sealing the top joint with a closed glass stopper',
          risk: 'Vapors heat and expand, generating rapid pressure increase until glassware shatters violently.',
          guidance: 'Top of condenser MUST always remain open to atmosphere or vented through a drying tube or mineral oil bubbler.'
        }
      ],
      sop: {
        preInspection: [
          'Inspect ground joints for chips, grease buildup, or cracks.',
          'Secure all water hose connections to serrated glass barbs with adjustable screw clamps or copper wire ties.'
        ],
        safeOperation: [
          'Always connect water supply hose to the BOTTOM inlet and the drain hose to the TOP outlet to ensure jacket fills completely without air pockets.',
          'Adjust water flow to a steady gentle stream (a violent blast creates backpressure that blows hoses off barbs).',
          'Clamp the condenser independently to the ring stand with a padded clamp.',
          'Never stopper the top opening during active heating.'
        ],
        cleaningAndStorage: [
          'Drain all cooling water from outer jacket before storage to prevent algae growth and freezing cracks.',
          'Clean inner vapor tube with acetone; store upright or in padded drawer.'
        ],
        emergencyProtocol: [
          'If water hose slips off and sprays water: isolate electrical devices on bench immediately, turn off tap valve, and terminate reaction heat.'
        ]
      },
      benchWarning: 'Cooling water must enter at the bottom hose barb and exit at the top. Never stopper the top opening during reflux.'
    }
  },
  {
    id: 'desiccator',
    name: 'Vacuum Glass Desiccator',
    aliases: ['Desiccating chamber', 'Drying cabinet jar', 'Moisture-free jar'],
    category: 'separation',
    categoryLabel: 'Separation & Vacuum',
    schematicIcon: 'desiccator',
    description: 'A heavy-walled cast borosilicate or soda-lime glass container with a ground flange lid and perforated porcelain plate, holding chemical desiccant beads to store anhydrous compounds away from moisture.',
    primaryApplications: [
      'Preservation of hygroscopic analytical standards and dry reagents',
      'Cooling heated crucibles and weighing bottles to room temperature without atmospheric moisture uptake',
      'Vacuum drying of analytical precipitates'
    ],
    specs: {
      material: 'Heavy-walled pressed glass with ground glass flange & PTFE vacuum sleeve',
      capacity: 'Internal diameter 150 mm to 300 mm',
      pressureRating: 'Withstands full vacuum (requires wire mesh safety cage)',
      standards: 'DIN 12491'
    },
    safety: {
      hazardLevel: 'high',
      ghsPictograms: ['irritant'],
      primaryHazards: [
        'Glass implosion under vacuum if deep chips or scratches exist on heavy glass rim',
        'Lid flying off or dropping if lifted vertically instead of slid horizontally',
        'Thermal shattering if red-hot crucibles are placed directly onto cold glass floor'
      ],
      requiredPPE: ['safety_goggles', 'nitrile_gloves', 'thermal_gloves', 'flame_resistant_coat'],
      incompatibilities: [
        {
          reagent: 'Unprotected Full Vacuum without safety shield or tape wrap',
          risk: 'Massive thick glass fragments ejected with high energy if an implosion occurs.',
          guidance: 'Always enclose evacuated glass desiccators in protective wire cages or wrap body with cross-hatch filament tape.'
        }
      ],
      sop: {
        preInspection: [
          'Inspect heavy ground glass rim and lid for micro-chips or fissures.',
          'Ensure desiccant granules (silica gel or Drierite) are active (blue indicator; if pink, regenerate by baking at 120°C).'
        ],
        safeOperation: [
          'Apply a thin, uniform film of vacuum grease to the ground glass flange to maintain seal.',
          'To open: slide lid horizontally with firm two-handed pressure; never attempt to pull lid straight up against vacuum.',
          'Allow red-hot crucibles to cool slightly in air on a wire gauze for 1 minute before placing inside desiccator to prevent lid popping from expanding air.'
        ],
        cleaningAndStorage: [
          'Wipe old vacuum grease from flange using hexane or isopropanol on a paper towel; re-grease lightly before storage.'
        ],
        emergencyProtocol: [
          'If vacuum desiccator implodes: treat cuts immediately and dispose of contaminated desiccant granules in solid chemical waste.'
        ]
      },
      benchWarning: 'Never pull the lid straight upward. Always slide the desiccator lid horizontally along the greased flange.'
    }
  },
  {
    id: 'safety-shower-eyewash',
    name: 'Emergency Safety Shower & Eyewash Station',
    aliases: ['Deluge shower', 'Eyewash station', 'Emergency decontamination unit'],
    category: 'safety',
    categoryLabel: 'Safety Containment',
    schematicIcon: 'safety_shower',
    description: 'An emergency first-aid station delivering high-volume, low-velocity tempered water designed to decontaminate individuals exposed to hazardous chemical spills or splashes.',
    primaryApplications: [
      'Immediate whole-body decontamination following catastrophic chemical splashes',
      'Flushing caustic or corrosive chemical droplets from eye globes and facial tissue',
      'Extinguishing clothing fires when safety blanket is inaccessible'
    ],
    specs: {
      material: 'Stainless steel piping with high-visibility ABS plastic eyewash bowl & shower head',
      tolerance: 'Flow rate: Shower ≥ 20 GPM (76 L/min); Eyewash ≥ 0.4 GPM (1.5 L/min)',
      temperatureRange: 'Tempered water 16°C to 38°C (60°F to 100°F)',
      standards: 'ANSI / ISEA Z358.1-2014 Compliance'
    },
    safety: {
      hazardLevel: 'low',
      ghsPictograms: [],
      primaryHazards: [
        'Delayed flushing because victim keeps eyes shut against stinging water reflex',
        'Hypothermia if victim is not monitored during mandatory 15-minute flush period',
        'Floor slip hazard from massive water deluge'
      ],
      requiredPPE: ['safety_goggles', 'nitrile_gloves', 'flame_resistant_coat'],
      incompatibilities: [
        {
          reagent: 'Elemental Alkali Metals (Sodium, Potassium, Lithium metal chunks on skin)',
          risk: 'Violent water reaction with molten metal generates hydrogen gas and corrosive hydroxide fire.',
          guidance: 'Brush off solid alkali metal chunks mechanically with tweezers BEFORE stepping into water shower.'
        }
      ],
      sop: {
        preInspection: [
          'Verify access pathway is completely unobstructed by carts, boxes, or chairs (must be reachable within 10 seconds).',
          'Perform weekly eyewash flush test for 3 minutes to clear rusty standing water and verify fluid pressure.',
          'Check that inspection tag is signed and up to date.'
        ],
        safeOperation: [
          'For Eye Contamination: push eyewash paddle firmly; hold eyelids wide open with fingers and roll eyeballs in all directions for a continuous 15 MINUTES.',
          'For Body Spill: pull overhead shower triangle pull-rod; immediately remove ALL contaminated clothing, footwear, and jewelry while under running water.',
          'Do NOT delay to preserve modesty—seconds count in preventing irreversible deep chemical burns.',
          'Have a laboratory partner summon emergency medical response (911/Campus Safety) immediately.'
        ],
        cleaningAndStorage: [
          'Mop flooded water promptly to prevent slipping hazards once medical evaluation is underway.'
        ],
        emergencyProtocol: [
          'Continue flushing for a minimum of 15 continuous minutes. Never reduce flush time for corrosive acids or bases.'
        ]
      },
      benchWarning: 'You must flush eyes or skin for 15 FULL continuous minutes. Never stop after 2 or 3 minutes.'
    }
  },
  {
    id: 'crucible-and-tongs',
    name: 'Porcelain Crucible & Crucible Tongs',
    aliases: ['Ashing crucible', 'Gooch crucible', 'Pipestem triangle and tongs'],
    category: 'heating',
    categoryLabel: 'Heating & Thermal',
    schematicIcon: 'crucible',
    description: 'A small high-temperature glazed porcelain cup and matching lid paired with stainless steel tongs, engineered for gravimetric ashing, calcination, and thermal decomposition of chemical compounds at extreme temperatures.',
    primaryApplications: [
      'Gravimetric determination of ash and volatile residues',
      'Quantitative thermal decomposition of metal oxalates and carbonates',
      'High-temperature inorganic fusion reactions'
    ],
    specs: {
      material: 'High-fired porcelain (fired to 1150°C) with chrome-plated nickel crucible tongs',
      capacity: '15 mL to 50 mL standard capacity',
      temperatureRange: 'Up to 1050°C continuous (withstands direct flame heating)',
      standards: 'DIN 12904'
    },
    safety: {
      hazardLevel: 'high',
      ghsPictograms: ['flammable'],
      primaryHazards: [
        'Crucible cracking from thermal shock if heated or cooled unevenly',
        'Severe third-degree thermal burns from grasping red-hot porcelain with improper tongs orientation',
        'Hot crucible slipping from tongs and shattering on the floor'
      ],
      requiredPPE: ['safety_goggles', 'thermal_gloves', 'flame_resistant_coat'],
      incompatibilities: [
        {
          reagent: 'Molten Sodium Hydroxide / Potassium Hydroxide Fluxes',
          risk: 'Molten caustic hydroxides dissolve the protective porcelain glaze and attack aluminosilicate body.',
          guidance: 'Use nickel or platinum crucibles for alkaline fusion procedures.'
        }
      ],
      sop: {
        preInspection: [
          'Tap crucible gently with pencil eraser; a clear ringing tone indicates soundness, while a dull thud signals internal cracks.',
          'Inspect crucible tongs; tips must align flush without wobble when closed.'
        ],
        safeOperation: [
          'Always support crucible on a clay pipestem triangle mounted on an iron support ring, never directly on wire gauze.',
          'Grasp hot crucibles using tongs with tips curved around crucible waist, or use the notched pinch grasp.',
          'Heat gently at first to drive off moisture before subjecting to roaring oxidizing flame.',
          'Allow crucible to cool to warm state on wire gauze for 1 minute before transferring to desiccator.'
        ],
        cleaningAndStorage: [
          'Clean residual inorganic oxides by boiling gently in 6M nitric acid (in fume hood), rinse with DI water, and ignite dry.'
        ],
        emergencyProtocol: [
          'If hot porcelain is dropped: do not try to catch falling crucible with hands; step back immediately.'
        ]
      },
      benchWarning: 'Always carry a hot crucible with tongs held above a ceramic tile or bench surface to catch drops.'
    }
  },
  {
    id: 'spill-kit',
    name: 'Chemical Spill Neutralization & Containment Kit',
    aliases: ['Acid spill kit', 'Solvent absorbent station', 'Lab spill containment kit'],
    category: 'safety',
    categoryLabel: 'Safety Containment',
    schematicIcon: 'spill_kit',
    description: 'A self-contained emergency response station containing color-indicating neutralizing powders, polypropylene absorbent pillows, and non-sparking scoops for immediate containment of laboratory spills.',
    primaryApplications: [
      'Neutralization and absorption of mineral acid spills (HCl, H2SO4, HNO3)',
      'Neutralization of caustic alkaline spills (NaOH, KOH, NH4OH)',
      'Absorption and vapor suppression of organic solvent releases'
    ],
    specs: {
      material: 'Sodium carbonate/calcium hydroxide blend with vermiculite and chem-sorb pads',
      capacity: 'Rated for spills up to 5 Liters concentrated acid / solvent',
      standards: 'OSHA 1910.120 (HAZWOPER) Compliant'
    },
    safety: {
      hazardLevel: 'moderate',
      ghsPictograms: ['corrosive', 'toxic'],
      primaryHazards: [
        'Vigorous foaming and thermal steam generation during acid neutralization if powder is dumped too rapidly',
        'Toxic vapor inhalation during cleanup of volatile solvent spills',
        'Skin contact with neutralized chemical slurry'
      ],
      requiredPPE: ['safety_goggles', 'face_shield', 'nitrile_gloves', 'flame_resistant_coat', 'respirator'],
      incompatibilities: [
        {
          reagent: 'Hydrofluoric Acid (HF) Spills',
          risk: 'Standard silica/vermiculite absorbents react with HF to release toxic silicon tetrafluoride gas.',
          guidance: 'Only use dedicated calcium gluconate/calcium carbonate HF neutralization kits.'
        }
      ],
      sop: {
        preInspection: [
          'Verify spill kit pail is fully stocked, sealed, and located in clearly marked, accessible position.',
          'Check expiration date on chemical neutralizer bottles and pH indicator powder.'
        ],
        safeOperation: [
          'Assess spill volume: if spill is > 1 Liter or involves highly toxic/flammable gas, evacuate lab and call hazmat team.',
          'Dike the perimeter of the spill first using absorbent socks to prevent migration into drains.',
          'Sprinkle neutralizer slowly from outside edges inward until color indicator confirms neutral pH (pH 6–8).',
          'Use non-sparking scoop and dustpan to collect slurry into heavy-duty polyethylene disposal bags.'
        ],
        cleaningAndStorage: [
          'Label disposal bags with exact chemical names and percentages; submit to hazardous waste coordinator.',
          'Restock spill kit supplies immediately.'
        ],
        emergencyProtocol: [
          'If spill generates noxious fumes: pull building fire alarm, evacuate all lab occupants, and notify safety office.'
        ]
      },
      benchWarning: 'If a chemical spill is greater than 1 Liter or emits hazardous vapors, do not clean it yourself. Evacuate and call Hazmat.'
    }
  },
  {
    id: 'chromatography-column',
    name: 'Flash Chromatography Column',
    aliases: ['Glass silica column', 'Flash column', 'Separation column'],
    category: 'separation',
    categoryLabel: 'Separation & Vacuum',
    schematicIcon: 'column',
    description: 'A heavy-walled vertical glass column with a sintered porous fritted disc at the base, designed to separate multi-component organic mixtures over silica gel or alumina stationary phases under positive air pressure.',
    primaryApplications: [
      'Purification of crude organic reaction products',
      'Separation of diastereomers and structural isomers',
      'Fractionation of natural product chemical extracts'
    ],
    specs: {
      material: 'Borosilicate Glass 3.3 with porosity 2/3 glass frit & PTFE stopcock',
      capacity: 'Column diameter 10 mm to 75 mm; Length 200 mm to 600 mm',
      pressureRating: 'Low positive pressure (0.2 to 0.5 bar / 3 to 7 psi)',
      standards: 'Still Flash Method Standard'
    },
    safety: {
      hazardLevel: 'high',
      ghsPictograms: ['health_hazard', 'flammable'],
      primaryHazards: [
        'Silica gel dust inhalation (Group 1 human carcinogen causing permanent silicosis)',
        'Glass column burst under excessive compressed air pressure',
        'Large volumes of volatile flammable solvents (hexanes, ethyl acetate) continuously evaporating on bench'
      ],
      requiredPPE: ['safety_goggles', 'nitrile_gloves', 'flame_resistant_coat', 'respirator', 'fume_hood'],
      incompatibilities: [
        {
          reagent: 'Unregulated High-Pressure Air Line (> 15 psi)',
          risk: 'Standard glass chromatography columns are not rated for high pressure and will violently explode.',
          guidance: 'Always use a pressure regulator or hand bellows pump limited to < 7 psi.'
        }
      ],
      sop: {
        preInspection: [
          'Always weigh and slurry-pack silica gel INSIDE a working chemical fume hood to prevent airborne dust inhalation.',
          'Inspect glass barrel for deep scratches or stress cracks.'
        ],
        safeOperation: [
          'Clamp column strictly vertical with two sturdy three-finger clamps.',
          'Never let the silica column run dry while solvent is flowing.',
          'Collect fractions in a well-ventilated fume hood to prevent solvent vapor buildup.'
        ],
        cleaningAndStorage: [
          'Blow remaining solvent into waste, flush dry with air in fume hood, and tap out dry silica into solid hazardous waste.',
          'Clean glass frit by back-washing with clean solvent.'
        ],
        emergencyProtocol: [
          'If column bursts under pressure: turn off air pressure line immediately and treat glass wounds.'
        ]
      },
      benchWarning: 'Always measure and slurry-pack silica gel inside a fume hood. Inhaling dry silica dust causes irreversible silicosis.'
    }
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'All Equipment', count: EQUIPMENT_LIST.length },
  { id: 'glassware', label: 'Precision Glassware', count: EQUIPMENT_LIST.filter(e => e.category === 'glassware').length },
  { id: 'heating', label: 'Heating & Thermal', count: EQUIPMENT_LIST.filter(e => e.category === 'heating').length },
  { id: 'analytical', label: 'Analytical Instruments', count: EQUIPMENT_LIST.filter(e => e.category === 'analytical').length },
  { id: 'separation', label: 'Separation & Vacuum', count: EQUIPMENT_LIST.filter(e => e.category === 'separation').length },
  { id: 'safety', label: 'Safety Containment', count: EQUIPMENT_LIST.filter(e => e.category === 'safety').length }
];
