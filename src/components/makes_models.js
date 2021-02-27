import React from 'react';

const makesList = [
  {
    'id': 'acura',
    'name': 'Acura',
    'models': [
      'ILX', 'MDX', 'MDX Sport Hybrid', 'RDX', 'RLX', 'RLX Sport Hybrid', 'TL', 'TLX', 'TSX',
    ]
  },
  {
    'id': 'alfa',
    'name': 'Alfa Romeo',
    'models': [
      'Giulia', 'Stelvio',
    ]
  },
  {
    'id': 'audi',
    'name': 'Audi',
    'models': [
      'A3', 'A3 Sportback e-tron', 'A4', 'A4 allroad', 'A5', 'A6', 'A7', 'A8', 'allroad', 'Q3', 'Q5', 'Q7', 'Q8',
      'RS 5', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'SQ5', 'TT',
    ]
  },
  {
    'id': 'bmw',
    'name': 'BMW',
    'models': [
      '1 Series', '2 Series', '3 Series', '4 Series', '5 Series', '6 Series', '7 Series', 'i3', 'M2', 'M3', 'M4', 'M5',
      'M6', 'X1', 'X2', 'X3', 'X4', 'X5', 'X5 M', 'X6', 'Z4',
    ]
  },
  {
    'id': 'buick',
    'name': 'Buick',
    'models': [
      'Cascada', 'Enclave', 'Encore', 'Encore GX', 'Envision', 'LaCrosse', 'Lucerne', 'Regal', 'Regal Sportback',
      'Regal TourX', 'Verano',
    ]
  },
  {
    'id': 'cadillac',
    'name': 'Cadillac',
    'models': [
      'ATS', 'ATS-V', 'CT4', 'CT5', 'CT6', 'CTS', 'DTS', 'ELR', 'Escalade', 'Escalade ESV', 'SRX', 'XT4', 'XT5', 'XT6',
      'XTS',
    ]
  },
  {
    'id': 'chevy',
    'name': 'Chevrolet',
    'models': [
      'Avalanche', 'Blazer', 'Bolt EV', 'Camaro', 'Captiva Sport', 'City Express', 'Cobalt', 'Colorado Crew Cab',
      'Colorado Extended Cab', 'Corvette', 'Cruze', 'Cruze Limited', 'Equinox', 'Impala', 'Impala Limited', 'Malibu',
      'Malibu Limited', 'Silverado 1500 Crew Cab', 'Silverado 1500 Double Cab', 'Silverado 1500 Extended Cab',
      'Silverado 1500 LD Double Cab', 'Silverado 1500 Regular Cab', 'Silverado 2500 HD Crew Cab',
      'Silverado 2500 HD Double Cab', 'Silverado 2500 HD Extended Cab', 'Silverado 3500 HD Crew Cab', 'Sonic', 'Spark',
      'Spark EV', 'SS', 'Suburban', 'Suburban 1500', 'Tahoe', 'Traverse', 'Trax', 'Volt',
    ]
  },
  {
    'id': 'chrysler',
    'name': 'Chrysler',
    'models': [
      '200', '300', 'Pacifica', 'Pacifica Hybrid', 'PT Cruiser', 'Town & County', 'Voyager',
    ]
  },
  {
    'id': 'dodge',
    'name': 'Dodge',
    'models': [
      'Avenger', 'Challenger', 'Charger', 'Dart', 'Durango', 'Grand Caravan Passenger', 'Journey',
    ]
  },
  {
    'id': 'fiat',
    'name': 'FIAT',
    'models': [
      '124 Spider', '500', '500 Abarth', '500c', '500e', '500L', '500X',
    ]
  },
  {
    'id': 'ford',
    'name': 'Ford',
    'models': [
      'C-MAX Energi', 'C-MAX Hybrid', 'E350 Super Duty Passenger', 'EcoSport', 'Edge', 'Escape', 'Expedition',
      'Expedition EL', 'Expedition MAX', 'Explorer', 'F150 Regular Cab', 'F150 Super Cab', 'F150 SuperCrew Cab',
      'F250 Super Duty Crew Cab', 'F250 Super Duty Regular Cab', 'Fiesta', 'Flex', 'Focus', 'Focus ST', 'Fusion',
      'Fusion Energi', 'Mustang', 'Ranger Regular Cab', 'Ranger Super Cab', 'Ranger SuperCab', 'Ranger SuperCrew',
      'Taurus', 'Transit 250 Van', 'Transit 350 Passenger Van', 'Transit Connect Cargo', 'Transit Connect Passenger',
    ]
  },
  {
    'id': 'genesis',
    'name': 'Genesis',
    'models': [
      'G70', 'G80', 'G90',
    ]
  },
  {
    'id': 'gmc',
    'name': 'GMC',
    'models': [
      'Acadia', 'Acadia Limited', 'Canyon Crew Cab', 'Canyon Extended Cab', 'Savana 2500 Cargo',
      'Sierra 1500 Crew Cab', 'Sierra 1500 Double Cab', 'Sierra 1500 Extended Cab', 'Sierra 1500 Limited Double Cab',
      'Sierra 1500 Regular Cab', 'Sierra 2500 HD Crew Cab', 'Sierra 2500 HD Double Cab', 'Terrain', 'Yukon',
      'Yukon XL', 'Yukon XL 1500',
    ]
  },
  {
    'id': 'honda',
    'name': 'Honda',
    'models': [
      'Accord', 'Accord Crosstour', 'Accord Hybrid', 'Civic', 'Civic Type R', 'Clarity Plug-in Hybrid', 'CR-V', 'CR-Z',
      'Crosstour', 'Element', 'Fit', 'HR-V', 'Insight', 'Odyssey', 'Passport', 'Pilot', 'Ridgeline',
    ]
  },
  {
    'id': 'hyundai',
    'name': 'Hyundai',
    'models': [
      'Accent', 'Azera', 'Elantra', 'Elantra GT', 'Equus', 'Genesis', 'Genesis Coupe', 'Ioniq Electric',
      'Ioniq Hybrid', 'Ioniq Plug-in Hybrid', 'Kona', 'Kona Electric', 'Palisade', 'Santa Fe', 'Santa Fe Sport',
      'Santa Fe XL', 'Sonata', 'Sonata Hybrid', 'Sonata Plug-in Hybrid', 'Tucson', 'Veloster', 'Venue', 'Veracruz',
    ]
  },
  {
    'id': 'infiniti',
    'name': 'INFINITI',
    'models': [
      'EX', 'FX', 'G', 'JX', 'M', 'Q40', 'Q50', 'Q60', 'Q70', 'QX', 'QX30', 'QX50', 'QX60', 'QX70', 'QX80',
    ]
  },
  {
    'id': 'jaguar',
    'name': 'Jaguar',
    'models': [
      'E-PACE', 'F-PACE', 'F-TYPE', 'I-PACE', 'XE', 'XF', 'XJ', 'XK',
    ]
  },
  {
    'id': 'jeep',
    'name': 'Jeep',
    'models': [
      'Cherokee', 'Compass', 'Gladiator', 'Grand Cherokee', 'Liberty', 'Patriot', 'Renegade', 'Wrangler',
      'Wrangler Unlimited',
    ]
  },
  {
    'id': 'kia',
    'name': 'Kia',
    'models': [
      'Cadenza', 'Forte', 'Forte Koup', 'Forte5', 'K900', 'Niro', 'Niro EV', 'Niro Plug-in Hybrid', 'Optima',
      'Optima Hybrid', 'Optima Plug-in Hybrid', 'Rio', 'Sedona', 'Sorento', 'Soul', 'Soul EV', 'Sportage',
      'Stinger', 'Telluride',
    ]
  },
  {
    'id': 'rover',
    'name': 'Land Rover',
    'models': [
      'Discovery', 'Discovery Sport', 'LR2', 'LR4', 'Range Rover', 'Range Rover Evoque', 'Range Rover Sport',
      'Range Rover Velar',
    ]
  },
  {
    'id': 'lexus',
    'name': 'Lexus',
    'models': [
      'CT', 'ES', 'GS', 'GX', 'HS', 'IS', 'LS', 'LX', 'NX', 'RC', 'RX', 'UX',
    ]
  },
  {
    'id': 'lincoln',
    'name': 'Lincoln',
    'models': [
      'Continental', 'Corsair', 'MKC', 'MKS', 'MKT', 'MKX', 'MKZ', 'Nautilus', 'Navigator', 'Navigator L', 'Town Car',
    ]
  },
  {
    'id': 'maserati',
    'name': 'Maserati',
    'models': [
      'Ghibli', 'GranTurismo', 'Quattroporte',
    ]
  },
  {
    'id': 'mazda',
    'name': 'Mazda',
    'models': [
      'CX-3', 'CX-30', 'CX-5', 'CX-7', 'CX-9', 'MAZDA2', 'MAZDA3', 'MAZDA5', 'MAZDA6', 'MX-5 Miata', 'MX-5 Miata RF',
    ]
  },
  {
    'id': 'benz',
    'name': 'Mercedes-Benz',
    'models': [
      'A-Class', 'B-Class', 'C-Class', 'CL-Class', 'CLA', 'CLA-Class', 'CLK-Class', 'CLS-Class', 'E-Class', 'GL-Class',
      'GLA', 'GLA-Class', 'GLB', 'GLC', 'GLC Coupe', 'GLE', 'GLE Coupe', 'GLK-Class', 'GLS', 'M-Class',
      'Mercedes-AMG C-Class', 'Mercedes-AMG CLA', 'Mercedes-AMG GLC', 'Mercedes-AMG GLE', 'Metris Cargo',
      'Metris Passenger', 'R-Class', 'S-Class', 'SL', 'SL-Class', 'SLC', 'SLK-Class',
    ]
  },
  {
    'id': 'mini',
    'name': 'MINI',
    'models': [
      'Clubman', 'Convertible', 'Countryman', 'Coupe', 'Hardtop', 'Hardtop 2 Door', 'Hardtop 4 Door', 'Paceman',
      'Roadster',
    ]
  },
  {
    'id': 'mitsubishi',
    'name': 'Mitsubishi',
    'models': [
      'Eclipse Cross', 'i-MiEV', 'Lancer', 'Lancer Evolution', 'Mirage', 'Mirage G4', 'Outlander', 'Outlander PHEV',
      'Outlander Sport',
    ]
  },
  {
    'id': 'nissan',
    'name': 'Nissan',
    'models': [
      '370Z', 'Altima', 'Armada', 'cube', 'Frontier Crew Cab', 'Frontier King Cab', 'JUKE', 'Kicks', 'LEAF', 'Maxima',
      'Murano', 'Pathfinder', 'Quest', 'Rogue', 'Rogue Select', 'Rogue Sport', 'Sentra', 'Titan Crew Cab',
      'Titan King Cab', 'TITAN Single Cab', 'TITAN XD Crew Cab', 'Versa', 'Versa Note', 'Xterra',
    ]
  },
  {
    'id': 'porsche',
    'name': 'Porsche',
    'models': [
      '718 Boxster', '911', 'Boxster', 'Cayenne', 'Cayman', 'Macan', 'Panamera',
    ]
  },
  {
    'id': 'ram',
    'name': 'Ram',
    'models': [
      '1500 Classic Crew Cab', '1500 Classic Quad Cab', '1500 Classic Regular Cab', '1500 Crew Cab', '1500 Quad Cab',
      '1500 Regular Cab', '2500 Crew Cab', 'ProMaster Cargo Van',
    ]
  },
  {
    'id': 'saab',
    'name': 'Saab',
    'models': [
      '9-3',
    ]
  },
  {
    'id': 'scion',
    'name': 'Scion',
    'models': [
      'FR-S', 'iA', 'iM', 'iQ', 'tC', 'xB', 'xD',
    ]
  },
  {
    'id': 'smart',
    'name': 'smart',
    'models': [
      'fortwo', 'fortwo electric drive',
    ]
  },
  {
    'id': 'subaru',
    'name': 'Subaru',
    'models': [
      'Ascent', 'BRZ', 'Crosstrek', 'Forester', 'Impreza', 'Legacy', 'Outback', 'WRX', 'XV Crosstrek',
    ]
  },
  {
    'id': 'tesla',
    'name': 'Tesla',
    'models': [
      'Model 3', 'Model S', 'Model X',
    ]
  },
  {
    'id': 'toyota',
    'name': 'Toyota',
    'models': [
      '4Runner', '86', 'Avalon', 'Avalon Hybrid', 'C-HR', 'Camry', 'Camry Hybrid', 'Corolla', 'Corolla Hatchback',
      'Corolla Hybrid', 'Corolla iM', 'FJ Cruiser', 'GR Supra', 'Highlander', 'Highlander Hybrid', 'Matrix', 'Prius',
      'Prius c', 'Prius Plug-in Hybrid', 'Prius Prime', 'Prius v', 'RAV4', 'RAV4 Hybrid', 'Sequoia', 'Sienna',
      'Tacoma Access Cab', 'Tacoma Double Cab', 'Tacoma Regular Cab', 'Tundra CrewMax', 'Tundra Double Cab', 'Venza',
      'Yaris', 'Yaris iA',
    ]
  },
  {
    'id': 'volks',
    'name': 'Volkswagen',
    'models': [
      'Arteon', 'Atlas', 'Atlas Cross Sport', 'Beetle', 'CC', 'e-Golf', 'Eos', 'Golf', 'Golf Alltrack', 'Golf GTI',
      'Golf R', 'Golf SportWagen', 'GTI', 'Jetta', 'Jetta GLI', 'Jetta SportWagen', 'Passat', 'Routan', 'Tiguan',
      'Tiguan Limited', 'Touareg',
    ]
  },
  {
    'id': 'volvo',
    'name': 'Volvo',
    'models': [
      'C30', 'C70', 'S40', 'S60', 'S80', 'S90', 'V60', 'V90', 'XC40', 'XC60', 'XC70', 'XC90',
    ]
  }
];

const modelsList = [
  'Acura ILX', 'Acura MDX', 'Acura MDX Sport Hybrid', 'Acura RDX', 'Acura RLX', 'Acura RLX Sport Hybrid', 'Acura TL',
  'Acura TLX', 'Acura TSX',

  'Alfa Romeo Giulia', 'Alfa Romeo Stelvio',

  'Audi A3', 'Audi A3 Sportback e-tron', 'Audi A4', 'Audi A4 allroad', 'Audi A5', 'Audi A6', 'Audi A7', 'Audi A8',
  'Audi allroad', 'Audi Q3', 'Audi Q5', 'Audi Q7', 'Audi Q8', 'Audi RS 5', 'Audi S3', 'Audi S4', 'Audi S5', 'Audi S6',
  'Audi S7', 'Audi S8', 'Audi SQ5', 'Audi TT',

  'BMW 1 Series', 'BMW 2 Series', 'BMW 3 Series', 'BMW 4 Series', 'BMW 5 Series', 'BMW 6 Series', 'BMW 7 Series',
  'BMW i3', 'BMW M2', 'BMW M3', 'BMW M4', 'BMW M5', 'BMW M6', 'BMW X1', 'BMW X2', 'BMW X3', 'BMW X4', 'BMW X5',
  'BMW X5 M', 'BMW X6', 'BMW Z4',

  'Buick Cascada', 'Buick Enclave', 'Buick Encore', 'Buick Encore GX', 'Buick Envision', 'Buick LaCrosse',
  'Buick Lucerne', 'Buick Regal', 'Buick Regal Sportback', 'Buick Regal TourX', 'Buick Verano',

  'Cadillac ATS', 'Cadillac ATS-V', 'Cadillac CT4', 'Cadillac CT5', 'Cadillac CT6', 'Cadillac CTS', 'Cadillac DTS',
  'Cadillac ELR', 'Cadillac Escalade', 'Cadillac Escalade ESV', 'Cadillac SRX', 'Cadillac XT4', 'Cadillac XT5',
  'Cadillac XT6', 'Cadillac XTS',

  'Chevrolet Avalanche', 'Chevrolet Blazer', 'Chevrolet Bolt EV', 'Chevrolet Camaro', 'Chevrolet Captiva Sport',
  'Chevrolet City Express', 'Chevrolet Cobalt', 'Chevrolet Colorado Crew Cab', 'Chevrolet Colorado Extended Cab',
  'Chevrolet Corvette', 'Chevrolet Cruze', 'Chevrolet Cruze Limited', 'Chevrolet Equinox', 'Chevrolet Impala',
  'Chevrolet Impala Limited', 'Chevrolet Malibu', 'Chevrolet Malibu Limited', 'Chevrolet Silverado 1500 Crew Cab',
  'Chevrolet Silverado 1500 Double Cab', 'Chevrolet Silverado 1500 Extended Cab',
  'Chevrolet Silverado 1500 LD Double Cab', 'Chevrolet Silverado 1500 Regular Cab',
  'Chevrolet Silverado 2500 HD Crew Cab', 'Chevrolet Silverado 2500 HD Double Cab',
  'Chevrolet Silverado 2500 HD Extended Cab', 'Chevrolet Silverado 3500 HD Crew Cab', 'Chevrolet Sonic',
  'Chevrolet Spark', 'Chevrolet Spark EV', 'Chevrolet SS', 'Chevrolet Suburban', 'Chevrolet Suburban 1500',
  'Chevrolet Tahoe', 'Chevrolet Traverse', 'Chevrolet Trax', 'Chevrolet Volt',

  'Chrysler 200', 'Chrysler 300', 'Chrysler Pacifica', 'Chrysler Pacifica Hybrid', 'Chrysler PT Cruiser',
  'Chrysler Town & County', 'Chrysler Voyager',

  'Dodge Avenger', 'Dodge Challenger', 'Dodge Charger', 'Dodge Dart', 'Dodge Durango',
  'Dodge Grand Caravan Passenger', 'Dodge Journey',

  'FIAT 124 Spider', 'FIAT 500', 'FIAT 500 Abarth', 'FIAT 500c', 'FIAT 500e', 'FIAT 500L', 'FIAT 500X',

  'Ford C-MAX Energi', 'Ford C-MAX Hybrid', 'Ford E350 Super Duty Passenger', 'Ford EcoSport', 'Ford Edge',
  'Ford Escape', 'Ford Expedition', 'Ford Expedition EL', 'Ford Expedition MAX', 'Ford Explorer',
  'Ford F150 Regular Cab', 'Ford F150 Super Cab', 'Ford F150 SuperCrew Cab', 'Ford F250 Super Duty Crew Cab',
  'Ford F250 Super Duty Regular Cab', 'Ford Fiesta', 'Ford Flex', 'Ford Focus', 'Ford Focus ST', 'Ford Fusion',
  'Ford Fusion Energi', 'Ford Mustang', 'Ford Ranger Regular Cab', 'Ford Ranger Super Cab', 'Ford Ranger SuperCab',
  'Ford Ranger SuperCrew', 'Ford Taurus', 'Ford Transit 250 Van', 'Ford Transit 350 Passenger Van',
  'Ford Transit Connect Cargo', 'Ford Transit Connect Passenger',

  'Genesis G70', 'Genesis G80', 'Genesis G90',

  'GMC Acadia', 'GMC Acadia Limited', 'GMC Canyon Crew Cab', 'GMC Canyon Extended Cab', 'GMC Savana 2500 Cargo',
  'GMC Sierra 1500 Crew Cab', 'GMC Sierra 1500 Double Cab', 'GMC Sierra 1500 Extended Cab',
  'GMC Sierra 1500 Limited Double Cab', 'GMC Sierra 1500 Regular Cab', 'GMC Sierra 2500 HD Crew Cab',
  'GMC Sierra 2500 HD Double Cab', 'GMC Terrain', 'GMC Yukon', 'GMC Yukon XL', 'GMC Yukon XL 1500',

  'Honda Accord', 'Honda Accord Crosstour', 'Honda Accord Hybrid', 'Honda Civic', 'Honda Civic Type R',
  'Honda Clarity Plug-in Hybrid', 'Honda CR-V', 'Honda CR-Z', 'Honda Crosstour', 'Honda Element', 'Honda Fit',
  'Honda HR-V', 'Honda Insight', 'Honda Odyssey', 'Honda Passport', 'Honda Pilot', 'Honda Ridgeline',

  'Hyundai Accent', 'Hyundai Azera', 'Hyundai Elantra', 'Hyundai Elantra GT', 'Hyundai Equus', 'Hyundai Genesis',
  'Hyundai Genesis Coupe', 'Hyundai Ioniq Electric', 'Hyundai Ioniq Hybrid', 'Hyundai Ioniq Plug-in Hybrid',
  'Hyundai Kona', 'Hyundai Kona Electric', 'Hyundai Palisade', 'Hyundai Santa Fe', 'Hyundai Santa Fe Sport',
  'Hyundai Santa Fe XL', 'Hyundai Sonata', 'Hyundai Sonata Hybrid', 'Hyundai Sonata Plug-in Hybrid', 'Hyundai Tucson',
  'Hyundai Veloster', 'Hyundai Venue', 'Hyundai Veracruz',

  'INFINITI EX', 'INFINITI FX', 'INFINITI G', 'INFINITI JX', 'INFINITI M', 'INFINITI Q40', 'INFINITI Q50',
  'INFINITI Q60', 'INFINITI Q70', 'INFINITI QX', 'INFINITI QX30', 'INFINITI QX50', 'INFINITI QX60', 'INFINITI QX70',
  'INFINITI QX80',

  'Jaguar E-PACE', 'Jaguar F-PACE', 'Jaguar F-TYPE', 'Jaguar I-PACE', 'Jaguar XE', 'Jaguar XF', 'Jaguar XJ',
  'Jaguar XK',

  'Jeep Cherokee', 'Jeep Compass', 'Jeep Gladiator', 'Jeep Grand Cherokee', 'Jeep Liberty', 'Jeep Patriot',
  'Jeep Renegade', 'Jeep Wrangler', 'Jeep Wrangler Unlimited',

  'Kia Cadenza', 'Kia Forte', 'Kia Forte Koup', 'Kia Forte5', 'Kia K900', 'Kia Niro', 'Kia Niro EV',
  'Kia Niro Plug-in Hybrid', 'Kia Optima', 'Kia Optima Hybrid', 'Kia Optima Plug-in Hybrid', 'Kia Rio', 'Kia Sedona',
  'Kia Sorento', 'Kia Soul', 'Kia Soul EV', 'Kia Sportage', 'Kia Stinger', 'Kia Telluride',

  'Land Rover Discovery', 'Land Rover Discovery Sport', 'Land Rover LR2', 'Land Rover LR4', 'Land Rover Range Rover',
  'Land Rover Range Rover Evoque', 'Land Rover Range Rover Sport', 'Land Rover Range Rover Velar',

  'Lexus CT', 'Lexus ES', 'Lexus GS', 'Lexus GX', 'Lexus HS', 'Lexus IS', 'Lexus LS', 'Lexus LX', 'Lexus NX',
  'Lexus RC', 'Lexus RX', 'Lexus UX',

  'Lincoln Continental', 'Lincoln Corsair', 'Lincoln MKC', 'Lincoln MKS', 'Lincoln MKT', 'Lincoln MKX', 'Lincoln MKZ',
  'Lincoln Nautilus', 'Lincoln Navigator', 'Lincoln Navigator L', 'Lincoln Town Car',

  'Maserati Ghibli', 'Maserati GranTurismo', 'Maserati Quattroporte',

  'Mazda CX-3', 'Mazda CX-30', 'Mazda CX-5', 'Mazda CX-7', 'Mazda CX-9', 'Mazda MAZDA2', 'Mazda MAZDA3',
  'Mazda MAZDA5', 'Mazda MAZDA6', 'Mazda MX-5 Miata', 'Mazda MX-5 Miata RF',

  'Mercedes-Benz A-Class', 'Mercedes-Benz B-Class', 'Mercedes-Benz C-Class', 'Mercedes-Benz CL-Class',
  'Mercedes-Benz CLA', 'Mercedes-Benz CLA-Class', 'Mercedes-Benz CLK-Class', 'Mercedes-Benz CLS-Class',
  'Mercedes-Benz E-Class', 'Mercedes-Benz GL-Class', 'Mercedes-Benz GLA', 'Mercedes-Benz GLA-Class',
  'Mercedes-Benz GLB', 'Mercedes-Benz GLC', 'Mercedes-Benz GLC Coupe', 'Mercedes-Benz GLE', 'Mercedes-Benz GLE Coupe',
  'Mercedes-Benz GLK-Class', 'Mercedes-Benz GLS', 'Mercedes-Benz M-Class', 'Mercedes-Benz Mercedes-AMG C-Class',
  'Mercedes-Benz Mercedes-AMG CLA', 'Mercedes-Benz Mercedes-AMG GLC', 'Mercedes-Benz Mercedes-AMG GLE',
  'Mercedes-Benz Metris Cargo', 'Mercedes-Benz Metris Passenger', 'Mercedes-Benz R-Class', 'Mercedes-Benz S-Class',
  'Mercedes-Benz SL', 'Mercedes-Benz SL-Class', 'Mercedes-Benz SLC', 'Mercedes-Benz SLK-Class',

  'MINI Clubman', 'MINI Convertible', 'MINI Countryman', 'MINI Coupe', 'MINI Hardtop', 'MINI Hardtop 2 Door',
  'MINI Hardtop 4 Door', 'MINI Paceman', 'MINI Roadster',

  'Mitsubishi Eclipse Cross', 'Mitsubishi i-MiEV', 'Mitsubishi Lancer', 'Mitsubishi Lancer Evolution',
  'Mitsubishi Mirage', 'Mitsubishi Mirage G4', 'Mitsubishi Outlander', 'Mitsubishi Outlander PHEV',
  'Mitsubishi Outlander Sport',

  'Nissan 370Z', 'Nissan Altima', 'Nissan Armada', 'Nissan cube', 'Nissan Frontier Crew Cab',
  'Nissan Frontier King Cab', 'Nissan JUKE', 'Nissan Kicks', 'Nissan LEAF', 'Nissan Maxima', 'Nissan Murano',
  'Nissan Pathfinder', 'Nissan Quest', 'Nissan Rogue', 'Nissan Rogue Select', 'Nissan Rogue Sport', 'Nissan Sentra',
  'Nissan Titan Crew Cab', 'Nissan Titan King Cab', 'Nissan TITAN Single Cab', 'Nissan TITAN XD Crew Cab',
  'Nissan Versa', 'Nissan Versa Note', 'Nissan Xterra',

  'Porsche 718 Boxster', 'Porsche 911', 'Porsche Boxster', 'Porsche Cayenne', 'Porsche Cayman', 'Porsche Macan',
  'Porsche Panamera',

  'Ram 1500 Classic Crew Cab', 'Ram 1500 Classic Quad Cab', 'Ram 1500 Classic Regular Cab', 'Ram 1500 Crew Cab',
  'Ram 1500 Quad Cab', 'Ram 1500 Regular Cab', 'Ram 2500 Crew Cab', 'Ram ProMaster Cargo Van',

  'Saab 9-3',

  'Scion FR-S', 'Scion iA', 'Scion iM', 'Scion iQ', 'Scion tC', 'Scion xB', 'Scion xD',

  'smart fortwo', 'smart fortwo electric drive',

  'Subaru Ascent', 'Subaru BRZ', 'Subaru Crosstrek', 'Subaru Forester', 'Subaru Impreza', 'Subaru Legacy',
  'Subaru Outback', 'Subaru WRX', 'Subaru XV Crosstrek',

  'Tesla Model 3', 'Tesla Model S', 'Tesla Model X',

  'Toyota 4Runner', 'Toyota 86', 'Toyota Avalon', 'Toyota Avalon Hybrid', 'Toyota C-HR', 'Toyota Camry',
  'Toyota Camry Hybrid', 'Toyota Corolla', 'Toyota Corolla Hatchback', 'Toyota Corolla Hybrid', 'Toyota Corolla iM',
  'Toyota FJ Cruiser', 'Toyota GR Supra', 'Toyota Highlander', 'Toyota Highlander Hybrid', 'Toyota Matrix',
  'Toyota Prius', 'Toyota Prius c', 'Toyota Prius Plug-in Hybrid', 'Toyota Prius Prime', 'Toyota Prius v',
  'Toyota RAV4', 'Toyota RAV4 Hybrid', 'Toyota Sequoia', 'Toyota Sienna', 'Toyota Tacoma Access Cab',
  'Toyota Tacoma Double Cab', 'Toyota Tacoma Regular Cab', 'Toyota Tundra CrewMax', 'Toyota Tundra Double Cab',
  'Toyota Venza', 'Toyota Yaris', 'Toyota Yaris iA',

  'Volkswagen Arteon', 'Volkswagen Atlas', 'Volkswagen Atlas Cross Sport', 'Volkswagen Beetle', 'Volkswagen CC',
  'Volkswagen e-Golf', 'Volkswagen Eos', 'Volkswagen Golf', 'Volkswagen Golf Alltrack', 'Volkswagen Golf GTI',
  'Volkswagen Golf R', 'Volkswagen Golf SportWagen', 'Volkswagen GTI', 'Volkswagen Jetta', 'Volkswagen Jetta GLI',
  'Volkswagen Jetta SportWagen', 'Volkswagen Passat', 'Volkswagen Routan', 'Volkswagen Tiguan',
  'Volkswagen Tiguan Limited', 'Volkswagen Touareg',

  'Volvo C30', 'Volvo C70', 'Volvo S40', 'Volvo S60', 'Volvo S80', 'Volvo S90', 'Volvo V60', 'Volvo V90', 'Volvo XC40',
  'Volvo XC60', 'Volvo XC70', 'Volvo XC90',
];

export {makesList, modelsList};
