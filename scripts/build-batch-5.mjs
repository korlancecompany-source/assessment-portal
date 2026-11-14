import { applyBatch } from './build-batch-1.mjs'

export const batch5Questions = {
  "Auto CAD & CATIA": [
    {
      id: "ACAD-01",
      question: "In AutoCAD 2D drafting, what coordinate format represents a relative polar point 50 units away at an angle of 45 degrees?",
      options: {
        A: "@50,45",
        B: "@50<45",
        C: "#50<45",
        D: "50,45"
      },
      correct: "B"
    },
    {
      id: "ACAD-02",
      question: "Which AutoCAD feature enables the cursor to snap precisely to geometric points such as endpoints, midpoints, and circle centers?",
      options: {
        A: "Grid Snap (F9)",
        B: "Object Snap / OSNAP (F3)",
        C: "Ortho Mode (F8)",
        D: "Dynamic Input (F12)"
      },
      correct: "B"
    },
    {
      id: "ACAD-03",
      question: "What is the primary difference between a Line and a Polyline in AutoCAD?",
      options: {
        A: "A line is always curved while a polyline is always straight",
        B: "A line can only be drawn horizontally while a polyline can be drawn vertically",
        C: "A polyline is a single unified object consisting of connected line or arc segments, whereas individual lines are distinct independent entities",
        D: "A polyline cannot have any assigned line weight or color properties"
      },
      correct: "C"
    },
    {
      id: "ACAD-04",
      question: "What is the key advantage of inserting an External Reference (Xref) over embedding a standard Block in AutoCAD?",
      options: {
        A: "Xrefs increase the file size by converting all vectors into raster images",
        B: "Xrefs automatically delete the original source drawing upon saving",
        C: "Xrefs require no file path management across network drives",
        D: "Changes made in the source reference drawing are dynamically reflected in the host drawing whenever reloaded"
      },
      correct: "D"
    },
    {
      id: "ACAD-05",
      question: "In engineering drawings, what is the main distinction between First Angle and Third Angle projection?",
      options: {
        A: "In First Angle the object is between observer and projection plane, whereas in Third Angle the projection plane is between observer and object",
        B: "First Angle is used exclusively for 3D perspective while Third Angle is for 2D floor plans",
        C: "First Angle uses imperial feet and inches while Third Angle uses metric millimeters",
        D: "First Angle prohibits hidden dashed lines while Third Angle allows them"
      },
      correct: "A"
    },
    {
      id: "ACAD-06",
      question: "In CATIA Part Design, which feature creates a 3D solid body by extruding a 2D profile along a normal direction?",
      options: {
        A: "Shaft",
        B: "Pad",
        C: "Rib",
        D: "Pocket"
      },
      correct: "B"
    },
    {
      id: "ACAD-07",
      question: "In the CATIA Sketcher workbench, what does a green geometric profile signify?",
      options: {
        A: "The sketch contains unresolved syntax errors",
        B: "The sketch is under-constrained with unconstrained degrees of freedom",
        C: "The sketch is fully constrained with all geometric and dimensional limits satisfied",
        D: "The sketch is over-constrained with redundant conflicting dimensions"
      },
      correct: "C"
    },
    {
      id: "ACAD-08",
      question: "Which CATIA workbench is specialized for advanced freeform surface modeling, aerodynamic fairings, and Class A curvature styling?",
      options: {
        A: "Generative Sheetmetal Design",
        B: "Structural Analysis Bench",
        C: "Digital Mockup (DMU) Kinematics",
        D: "Generative Shape Design (GSD)"
      },
      correct: "D"
    },
    {
      id: "ACAD-09",
      question: "In CATIA Part Design, which operation removes material by revolving a 2D profile around a central reference axis?",
      options: {
        A: "Groove",
        B: "Shaft",
        C: "Slot",
        D: "Pocket"
      },
      correct: "A"
    },
    {
      id: "ACAD-10",
      question: "In CATIA Assembly Design, which constraint aligns the central axes of two cylindrical parts to make them concentric?",
      options: {
        A: "Offset constraint",
        B: "Coincidence constraint",
        C: "Angle constraint",
        D: "Contact constraint"
      },
      correct: "B"
    },
    {
      id: "ACAD-11",
      question: "What does the Hatch command create in an AutoCAD section drawing?",
      options: {
        A: "Automated leader lines pointing to fastener part numbers",
        B: "Orthographic perspective grids for 3D walkthroughs",
        C: "A repeating pattern of lines or textures within an enclosed boundary to indicate cut material",
        D: "Title block borders with approval signatures"
      },
      correct: "C"
    },
    {
      id: "ACAD-12",
      question: "In AutoCAD, what is the role of Paper Space (Layout tabs) versus Model Space?",
      options: {
        A: "Model Space is for writing LISP code and Paper Space is for compiling scripts",
        B: "Model Space is for 2D drafting and Paper Space is for 3D solid rendering",
        C: "Model Space is for plotting to PDF while Paper Space is for CNC machining exports",
        D: "Model Space is for drawing the full-scale 1 to 1 model, while Paper Space is for setting up printable sheets with title blocks, viewports, and specific scales"
      },
      correct: "D"
    },
    {
      id: "ACAD-13",
      question: "In CATIA Part Design, what does the Stiffener feature generate?",
      options: {
        A: "A thin structural reinforcement web or rib between solid walls based on an open wireframe profile",
        B: "A rubber vibration damping gasket between assembly joints",
        C: "A high-tension coil spring around a shaft",
        D: "A sheetmetal bend relief cutout"
      },
      correct: "A"
    },
    {
      id: "ACAD-14",
      question: "What is the primary function of Geometric Dimensioning and Tolerancing (GD and T) symbols on mechanical component drawings?",
      options: {
        A: "Calculating the retail selling price of manufactured parts",
        B: "Communicating allowable geometric variations for form, orientation, location, and runout to guarantee interchangeable fit",
        C: "Listing chemical safety warnings for toxic surface electroplating",
        D: "Specifying shipping container crate dimensions"
      },
      correct: "B"
    },
    {
      id: "ACAD-15",
      question: "In CATIA, what is the main benefit of Parametric Modeling?",
      options: {
        A: "Drawings are stored as uneditable read-only raster images",
        B: "Models cannot be revised once saved to disk",
        C: "Modifying an underlying dimension or parameter automatically updates the entire geometry, downstream features, and associated 2D drawings",
        D: "It eliminates the need for 3D graphics cards on CAD workstations"
      },
      correct: "C"
    },
    {
      id: "ACAD-16",
      question: "In AutoCAD, which command allows users to create a parallel copy of lines, concentric circles, or parallel curves at a specified distance?",
      options: {
        A: "Array",
        B: "Mirror",
        C: "Scale",
        D: "Offset"
      },
      correct: "D"
    },
    {
      id: "ACAD-17",
      question: "What is a Fillet in mechanical CAD design?",
      options: {
        A: "A rounded transition corner between two intersecting surfaces or edges to reduce stress concentrations",
        B: "A sharp 45-degree beveled cut along a metal edge",
        C: "A tapped hole drilled for metric machine screws",
        D: "A hollow core cavity created by sand casting"
      },
      correct: "A"
    },
    {
      id: "ACAD-18",
      question: "In CATIA Part Design, which feature creates a pocket (cavity) by removing material from an existing solid using a closed sketch?",
      options: {
        A: "Pad",
        B: "Pocket",
        C: "Hole",
        D: "Rib"
      },
      correct: "B"
    },
    {
      id: "ACAD-19",
      question: "In CATIA Drafting, which view shows internal details of a part as if cut open by an imaginary cutting plane?",
      options: {
        A: "Isometric View",
        B: "Detail View",
        C: "Section View",
        D: "Auxiliary View"
      },
      correct: "C"
    },
    {
      id: "ACAD-20",
      question: "In AutoCAD, what does the Purge command do?",
      options: {
        A: "Deletes all dimension styles and resets paper size to letter",
        B: "Permanently erases all geometry on the zero layer",
        C: "Formats the workstation hard disk to free RAM",
        D: "Removes unused named objects like unreferenced blocks, empty layers, and unused line types to reduce file size"
      },
      correct: "D"
    }
  ],
  "Auto CAD, SketchUp, Revit": [
    {
      id: "ASR-01",
      question: "What is the core paradigm of Building Information Modeling (BIM) as implemented in Autodesk Revit?",
      options: {
        A: "An intelligent, database-driven 3D modeling approach where elements carry real-world parametric data and updates reflect across all views, plans, and schedules simultaneously",
        B: "Drawing 2D vector wireframe lines without metadata on separate paper layers",
        C: "Rendering photo-realistic video walkthroughs using GPU ray tracing exclusively",
        D: "Converting architectural hand sketches into scanned PDF documents"
      },
      correct: "A"
    },
    {
      id: "ASR-02",
      question: "In Autodesk Revit, what are the three primary categories of component Families?",
      options: {
        A: "Structural, Architectural, and Mechanical families",
        B: "System Families, Loadable (Component) Families, and In-Place Families",
        C: "2D Families, 3D Families, and 4D Phasing families",
        D: "Residential, Commercial, and Industrial families"
      },
      correct: "B"
    },
    {
      id: "ASR-03",
      question: "In Trimble SketchUp, what is the signature tool used to extrude 2D planar faces into 3D volumetric forms?",
      options: {
        A: "Tape Measure tool",
        B: "Offset tool",
        C: "Push/Pull tool",
        D: "Follow Me tool"
      },
      correct: "C"
    },
    {
      id: "ASR-04",
      question: "In SketchUp modeling, what is the critical difference between creating a Group and creating a Component?",
      options: {
        A: "Groups can be textured while Components can only be rendered in grayscale",
        B: "Groups are saved to 3D Warehouse while Components remain local",
        C: "Groups cannot be rotated while Components can rotate freely",
        D: "Editing one instance of a Component automatically updates all other instances throughout the model, whereas Groups are independent copies"
      },
      correct: "D"
    },
    {
      id: "ASR-05",
      question: "In BIM project workflows, what does Level of Development (LOD) define?",
      options: {
        A: "The degree to which the element geometry and associated information have been thought through and can be relied upon by project stakeholders (from LOD 100 conceptual to LOD 500 as-built)",
        B: "The salary level and years of experience of the CAD draftsperson",
        C: "The physical floor height of a high-rise building structure",
        D: "The maximum number of polygons allowed in a real-time game engine"
      },
      correct: "A"
    },
    {
      id: "ASR-06",
      question: "In Trimble SketchUp, which specialized tool revolves or extrudes a 2D profile along a predefined 3D path, commonly used for molding and pipes?",
      options: {
        A: "Rotate tool",
        B: "Follow Me tool",
        C: "Scale tool",
        D: "Walkthrough tool"
      },
      correct: "B"
    },
    {
      id: "ASR-07",
      question: "In Revit, what is the primary role of a Schedule?",
      options: {
        A: "A calendar showing employee daily work shifts on construction sites",
        B: "A gantt chart tracking concrete drying durations across weather seasons",
        C: "A tabular display of extracted model data and quantities (such as doors, windows, and concrete volume) that dynamically updates with model changes",
        D: "A contract detailing architect hourly billing rates"
      },
      correct: "C"
    },
    {
      id: "ASR-08",
      question: "What does Clash Detection achieve in multi-disciplinary BIM coordination (Navisworks / Revit)?",
      options: {
        A: "Detecting font mismatches between architectural title blocks",
        B: "Checking whether two contractors are registered under identical company names",
        C: "Identifying stylistic discrepancies between exterior paint swatches",
        D: "Identifying spatial geometric conflicts where different building systems occupy the same physical space (such as HVAC ducts passing through structural beams)"
      },
      correct: "D"
    },
    {
      id: "ASR-09",
      question: "In Autodesk Revit, how are Levels defined in a building model?",
      options: {
        A: "Infinite horizontal reference planes from which level-hosted elements like floors, ceilings, and roofs derive their vertical position",
        B: "Categorical security clearance permissions granted to project managers",
        C: "The resolution quality setting for cloud rendering passes",
        D: "The number of nested sub-groups inside a complex wall assembly"
      },
      correct: "A"
    },
    {
      id: "ASR-10",
      question: "In SketchUp, what causes the phenomenon known as sticky geometry?",
      options: {
        A: "Excessive application of glossy reflection materials to surfaces",
        B: "Raw ungrouped edges and faces automatically sticking to and merging with other intersecting loose geometry",
        C: "Corrupted graphics card driver textures causing mouse lag",
        D: "Saving models with high polygon tree assets from 3D Warehouse"
      },
      correct: "B"
    },
    {
      id: "ASR-11",
      question: "In architectural AutoCAD, what is the standard purpose of Viewports inside a Paper Space sheet layout?",
      options: {
        A: "Displaying live webcam video feeds from the construction site",
        B: "Converting 2D floor plans into animated MP4 videos",
        C: "Windows that look into Model Space, allowing views to be displayed at specific standard architectural scales like 1:50 or 1:100",
        D: "Blocking unauthorized users from printing copyrighted drawings"
      },
      correct: "C"
    },
    {
      id: "ASR-12",
      question: "In Autodesk Revit, what is the difference between a Type Parameter and an Instance Parameter?",
      options: {
        A: "Type parameters are only for doors while instance parameters are only for walls",
        B: "Type parameters require an internet connection while instance parameters work offline",
        C: "Type parameters are numerical while instance parameters must be text",
        D: "Changing a Type Parameter affects every element of that family type across the entire project, while changing an Instance Parameter affects only the selected individual element"
      },
      correct: "D"
    },
    {
      id: "ASR-13",
      question: "What is Trimble SketchUp LayOut primarily used for in professional architectural workflows?",
      options: {
        A: "Creating multi-page construction documents, presentation boards, and scaled drawings linked directly to the 3D SketchUp model",
        B: "Simulating thermodynamic solar radiation on glazed curtain walls",
        C: "Writing Ruby scripts for generative algorithmic parametric facades",
        D: "Calculating acoustic reverberation times in concert auditoriums"
      },
      correct: "A"
    },
    {
      id: "ASR-14",
      question: "In Autodesk Revit, what is the function of the Worksharing feature in central models?",
      options: {
        A: "Distributing social media marketing renderings to public clients",
        B: "Enabling multiple team members to work concurrently on the same building model using local copies synchronized with a central file",
        C: "Splitting software licensing fees across multiple architectural firms",
        D: "Sharing workstation GPU cores over local Wi-Fi networks"
      },
      correct: "B"
    },
    {
      id: "ASR-15",
      question: "What does an Underlay setting allow a Revit draftsperson to do in a floor plan view?",
      options: {
        A: "Permanently delete basement foundation walls from structural calculations",
        B: "Export CAD DWG files directly to CNC laser cutters",
        C: "Display another level (such as the floor below or ceiling above) in halftone to assist with alignment and coordination",
        D: "Generate photorealistic raytraced shadows under furniture items"
      },
      correct: "C"
    },
    {
      id: "ASR-16",
      question: "In SketchUp, which feature allows you to save specific camera perspectives, layer visibilities, styles, and shadow settings for quick presentation transitions?",
      options: {
        A: "Materials panel",
        B: "Model Info window",
        C: "Entity Info tray",
        D: "Scenes"
      },
      correct: "D"
    },
    {
      id: "ASR-17",
      question: "In architectural AutoCAD drafting, why is following the standard AIA (American Institute of Architects) Layer Naming Guideline recommended?",
      options: {
        A: "It provides a clear, universally recognized discipline and element hierarchy (e.g. A-WALL, A-DOOR, E-POWR) that ensures consistency across consultant teams",
        B: "It prevents AutoCAD from crashing when drawing curved spline geometry",
        C: "It encrypts DWG files against reverse-engineering by competitors",
        D: "It forces drawings to render in metric millimeters automatically"
      },
      correct: "A"
    },
    {
      id: "ASR-18",
      question: "In Autodesk Revit, what is the role of a Curtain Wall element?",
      options: {
        A: "A decorative fabric drapery hung across conference room windows",
        B: "An exterior non-structural building envelope wall consisting of an interlocking grid of mullions and glazed or solid panels",
        C: "A temporary plastic dust barrier erected during site demolition",
        D: "A heavy reinforced concrete retaining wall resisting lateral earth pressure"
      },
      correct: "B"
    },
    {
      id: "ASR-19",
      question: "What is the primary role of the Section Box tool in Revit 3D views?",
      options: {
        A: "Boxing up drawing sheets for archival zip compression",
        B: "Calculating structural wind shear loads on exterior columns",
        C: "Clipping the 3D model with an adjustable bounding box to isolate and inspect interior building sections and details",
        D: "Generating bill of materials tables for HVAC equipment"
      },
      correct: "C"
    },
    {
      id: "ASR-20",
      question: "In SketchUp, which tool measures distances, creates temporary guideline construction lines, and scales the entire model proportionally?",
      options: {
        A: "Protractor tool",
        B: "Dimension tool",
        C: "Walk tool",
        D: "Tape Measure tool"
      },
      correct: "D"
    }
  ],
  "Agriculture Domains": [
    {
      id: "AG-01",
      question: "What is the primary objective of Precision Agriculture compared to conventional broadcast farming?",
      options: {
        A: "Applying farm inputs (water, fertilizer, pesticides) at variable rates based on spatial and temporal field variability to maximize efficiency and reduce waste",
        B: "Planting only a single crop variety across entire continents",
        C: "Eliminating the use of digital sensors and tractors in farming",
        D: "Relying strictly on historical rainfall averages without live weather forecasts"
      },
      correct: "A"
    },
    {
      id: "AG-02",
      question: "In remote sensing for agriculture, what does the Normalized Difference Vegetation Index (NDVI) measure?",
      options: {
        A: "The market price fluctuation of grain commodities on futures exchanges",
        B: "Plant health and canopy vigor by calculating the ratio between reflected near-infrared and red light absorption by chlorophyll",
        C: "The concentration of dissolved salts in sub-surface irrigation runoff",
        D: "The mechanical compaction of soil beneath tractor wheel ruts"
      },
      correct: "B"
    },
    {
      id: "AG-03",
      question: "Which irrigation technique delivers water directly to the plant root zone through emitters, achieving the highest water-use efficiency (up to 95 percent)?",
      options: {
        A: "Flood or furrow irrigation",
        B: "Center pivot overhead irrigation",
        C: "Drip (micro) irrigation",
        D: "Wild flooding basin irrigation"
      },
      correct: "C"
    },
    {
      id: "AG-04",
      question: "What are the three primary macronutrients required for healthy plant growth represented by the acronym N-P-K?",
      options: {
        A: "Nickel, Platinum, Krypton",
        B: "Sodium, Phosphorus, Calcium",
        C: "Nitrogen, Potassium, Carbon",
        D: "Nitrogen, Phosphorus, Potassium"
      },
      correct: "D"
    },
    {
      id: "AG-05",
      question: "What is Integrated Pest Management (IPM)?",
      options: {
        A: "An ecosystem-based strategy that combines biological control, cultural practices, habitat manipulation, and targeted chemical use to manage pests below economic damage levels",
        B: "Spraying chemical insecticides across all fields at fixed weekly calendar intervals regardless of pest presence",
        C: "Relying solely on genetically modified synthetic chemical poisons",
        D: "Allowing pests to destroy entire harvests to promote natural wildlife biodiversity"
      },
      correct: "A"
    },
    {
      id: "AG-06",
      question: "What agronomic benefit does rotating cereal crops with leguminous plants (such as soybeans, chickpeas, or alfalfa) provide to the soil?",
      options: {
        A: "Increasing soil compaction to prevent root growth",
        B: "Biological nitrogen fixation through symbiotic Rhizobium bacteria in root nodules, replenishing soil fertility",
        C: "Lowering groundwater levels by absorbing excess aquifer storage",
        D: "Preventing soil earthworms from colonizing topsoil"
      },
      correct: "B"
    },
    {
      id: "AG-07",
      question: "What does soil pH measure, and why is an optimal range (typically 6.0 to 7.0) crucial for crop cultivation?",
      options: {
        A: "The percentage of sand grains relative to organic matter",
        B: "The depth of topsoil before bedrock is encountered",
        C: "The acidity or alkalinity of the soil, which directly governs the bioavailability and solubility of essential plant nutrients",
        D: "The rate at which soil absorbs solar ultraviolet radiation"
      },
      correct: "C"
    },
    {
      id: "AG-08",
      question: "What is fertigation in modern crop production?",
      options: {
        A: "Applying organic compost using aerial crop dusting airplanes",
        B: "Flooding fields with recycled industrial wastewater",
        C: "Measuring soil electrical conductivity with handheld electrodes",
        D: "The simultaneous application of water-soluble fertilizers dissolved into an automated drip or sprinkler irrigation system"
      },
      correct: "D"
    },
    {
      id: "AG-09",
      question: "Which soilless cultivation method suspends plant roots in an enclosed chamber and periodically mists them with a nutrient-rich aqueous solution?",
      options: {
        A: "Aeroponics",
        B: "Aquaponics with fish stocking",
        C: "Deep Water Culture (DWC)",
        D: "Nutrient Film Technique (NFT)"
      },
      correct: "A"
    },
    {
      id: "AG-10",
      question: "What is Cation Exchange Capacity (CEC) in soil science?",
      options: {
        A: "The total volume of pore space occupied by air inside dry clay",
        B: "A measure of the soil capacity to hold and exchange positively charged nutrient ions (like calcium, magnesium, potassium), indicating inherent soil fertility",
        C: "The rate at which earthworms digest organic compost per hectare",
        D: "The speed of subterranean groundwater lateral seepage"
      },
      correct: "B"
    },
    {
      id: "AG-11",
      question: "In post-harvest technology, what is the primary purpose of precooling freshly harvested fruits and vegetables?",
      options: {
        A: "Freezing produce solid to prevent surface bruising during export shipping",
        B: "Destroying plant cellular wall structures to accelerate fruit softening",
        C: "Rapidly removing field heat to reduce metabolic respiration rates, inhibit pathogen growth, and extend shelf life",
        D: "Bleaching fruit skins to enhance uniform market coloration"
      },
      correct: "C"
    },
    {
      id: "AG-12",
      question: "What does Variable Rate Technology (VRT) in precision agricultural machinery accomplish?",
      options: {
        A: "Varying tractor engine RPM based on operator radio volume",
        B: "Changing the combine harvester blade angle every thirty seconds",
        C: "Altering tire inflation pressure to match steering wheel turn velocity",
        D: "Using GPS and prescription maps to automatically modulate seed density, fertilizer dosage, or pesticide volume across specific field zones"
      },
      correct: "D"
    },
    {
      id: "AG-13",
      question: "What is Green Manuring in sustainable agronomy?",
      options: {
        A: "Growing specific quick-growing crops and plowing them into the soil while still green to enhance organic matter, nitrogen, and soil structure",
        B: "Painting farm tractors green to prevent rust corrosion",
        C: "Applying green copper sulfate spray to neutralize fungal spores",
        D: "Adding crushed green glass bottles to sandy soil to improve drainage"
      },
      correct: "A"
    },
    {
      id: "AG-14",
      question: "In greenhouse climate control, what does Vapor Pressure Deficit (VPD) represent?",
      options: {
        A: "The financial cost of propane used in greenhouse winter heating boilers",
        B: "The difference between the pressure exerted by water vapor inside the leaf saturated air and the vapor pressure of the surrounding atmosphere, driving plant transpiration",
        C: "The volume of carbon dioxide absorbed by plants during nighttime respiration",
        D: "The air pressure difference between the indoor greenhouse and outside storm winds"
      },
      correct: "B"
    },
    {
      id: "AG-15",
      question: "What is the primary ecological risk associated with excessive agricultural runoff carrying high concentrations of nitrogen and phosphorus into lakes and rivers?",
      options: {
        A: "Depletion of atmospheric ozone layers above rural communities",
        B: "Acidification of regional rainwater precipitation",
        C: "Eutrophication, leading to dense algal blooms, oxygen depletion (hypoxia), and widespread aquatic life mortality",
        D: "Sudden tectonic land subsidence near river estuaries"
      },
      correct: "C"
    },
    {
      id: "AG-16",
      question: "What does conservation tillage (including no-till and minimum tillage) primarily aim to achieve?",
      options: {
        A: "Completely turning over the top thirty centimeters of soil twice a year",
        B: "Burning crop residue to sterilize weed seeds",
        C: "Compacting the soil surface to resist rainfall penetration",
        D: "Minimizing soil disruption and leaving crop residues on the surface to prevent soil erosion, retain moisture, and improve organic matter"
      },
      correct: "D"
    },
    {
      id: "AG-17",
      question: "What is an agricultural drone primarily utilized for in modern smart farming operations?",
      options: {
        A: "Aerial crop health multispectral monitoring, weed mapping, and precision spot-spraying of inputs",
        B: "Transporting heavy 50 kg grain sacks from field to warehouse",
        C: "Digging irrigation drainage ditches along field boundaries",
        D: "Directly harvesting ripe root tubers from underground soil"
      },
      correct: "A"
    },
    {
      id: "AG-18",
      question: "Which plant hormone is commonly known as the ripening hormone and is commercially used to initiate uniform fruit ripening during transport?",
      options: {
        A: "Gibberellic Acid",
        B: "Ethylene",
        C: "Cytokinin",
        D: "Abscisic Acid"
      },
      correct: "B"
    },
    {
      id: "AG-19",
      question: "What is biological pest control in crop management?",
      options: {
        A: "Using synthetic organophosphate chemical sprays to exterminate all insects",
        B: "Applying nuclear radiation to farmland to eliminate bacteria",
        C: "The deliberate use of natural predators, parasitoids, or pathogens (such as ladybugs against aphids or Bacillus thuringiensis against larvae) to suppress pest populations",
        D: "Setting up electrified wire fences around field perimeters"
      },
      correct: "C"
    },
    {
      id: "AG-20",
      question: "What soil property is determined by the relative proportion of sand, silt, and clay particles as illustrated on the USDA Soil Texture Triangle?",
      options: {
        A: "Soil fertility rating",
        B: "Soil microbial biomass",
        C: "Soil magnetic susceptibility",
        D: "Soil texture"
      },
      correct: "D"
    }
  ]
}

if (process.argv[1] && process.argv[1].endsWith('build-batch-5.mjs')) {
  applyBatch(batch5Questions)
}
