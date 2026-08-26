import type { CatalogProduct } from './productTypes';

interface ClientCatalogSeed {
  slug: string;
  name: string;
  brand: string;
  familySlug: CatalogProduct['familySlug'];
  division: string;
  category: string;
  sourceUrl?: string;
  image: string;
  specs: CatalogProduct['specs'];
  downloads: NonNullable<CatalogProduct['downloads']>;
}

const clientCatalogSeeds: ClientCatalogSeed[] = [
  {
    "slug": "drester-classic-1050",
    "name": "Drester Classic 1050",
    "brand": "Hedson",
    "familySlug": "pintura",
    "division": "Pintura y Aplicación",
    "category": "Accesorios pistolas",
    "sourceUrl": "https://www.hedson.com/products/drester-classic-1050/",
    "image": "/images/products/client-catalog/drester-classic-1050.webp",
    "specs": [
      {
        "label": "Drester Classic 1050",
        "value": "Part.no. 1050 (standard unit)"
      },
      {
        "label": "Shipping dimensions",
        "value": "1 pcs on ½ pallet, 600*800 mm"
      },
      {
        "label": "Weight",
        "value": "21 kg"
      },
      {
        "label": "Air consumption",
        "value": "100 l/min (4 cfm)"
      },
      {
        "label": "Flow through brush",
        "value": "1,5-2 l/min"
      },
      {
        "label": "Air supply",
        "value": "5-12 bar (80-180 psi)"
      }
    ],
    "downloads": [
      {
        "label": "Download",
        "url": "https://www.hedson.com/wp-content/uploads/2017/02/14927_R-_INS_INSTRUKTION-DRESTER-1050.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://www.hedson.com/products/drester-classic-1050/"
      }
    ]
  },
  {
    "slug": "drester-classic-3600",
    "name": "Drester Classic 3600",
    "brand": "Hedson",
    "familySlug": "pintura",
    "division": "Pintura y Aplicación",
    "category": "Accesorios pistolas",
    "sourceUrl": "https://www.hedson.com/products/drester-classic-3600/",
    "image": "/images/products/client-catalog/drester-classic-3600.webp",
    "specs": [
      {
        "label": "Drester Cleaning 3600",
        "value": "Part.no. 3600"
      },
      {
        "label": "Shipment dimensions",
        "value": "1 pcs on ½ pallet, 600*800 mm, 35 kg"
      },
      {
        "label": "Weight",
        "value": "30 kg (67 lb)"
      },
      {
        "label": "Height",
        "value": "990 mm (39”)"
      },
      {
        "label": "Width",
        "value": "700 mm (27,5”)"
      },
      {
        "label": "Air consumption",
        "value": "250l/min (9 c.m.f)"
      }
    ],
    "downloads": [
      {
        "label": "Download",
        "url": "https://www.hedson.com/wp-content/uploads/2018/01/9168_R-_INS_DRESTER-3600.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://www.hedson.com/products/drester-classic-3600/"
      }
    ]
  },
  {
    "slug": "cabinas-de-pintura-usi-italia",
    "name": "Cabinas de pintura — USI Italia",
    "brand": "USI Italia",
    "familySlug": "cabinas-y-preparacion",
    "division": "Pintura y Aplicación",
    "category": "Cabinas de pintura",
    "sourceUrl": "https://www.usiitalia.com/en/category_products/booths/",
    "image": "https://www.usiitalia.com/wp-content/uploads/2021/07/prod_1-optimized.png",
    "specs": [],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://www.usiitalia.com/en/category_products/booths/"
      }
    ]
  },
  {
    "slug": "cabinas-de-pintura-millibar",
    "name": "Cabinas de pintura — Millibar",
    "brand": "Millibar",
    "familySlug": "cabinas-y-preparacion",
    "division": "Pintura y Aplicación",
    "category": "Cabinas de pintura",
    "sourceUrl": "https://www.millibar.it/wp-content/uploads/2020/11/MILLIBAR_Scheda_SDLINE_sc.pdf",
    "image": "https://www.usiitalia.com/wp-content/uploads/2021/07/prod_2-optimized.png",
    "specs": [],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://www.millibar.it/wp-content/uploads/2020/11/MILLIBAR_Scheda_SDLINE_sc.pdf"
      }
    ]
  },
  {
    "slug": "zonas-de-prepracion-usi-italia",
    "name": "Zonas de prepracion — USI Italia",
    "brand": "USI Italia",
    "familySlug": "cabinas-y-preparacion",
    "division": "Pintura y Aplicación",
    "category": "Zonas de prepracion",
    "sourceUrl": "https://www.usiitalia.com/en/category_products/zones-en/",
    "image": "/images/cabinas-preparacion.webp",
    "specs": [],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://www.usiitalia.com/en/category_products/zones-en/"
      }
    ]
  },
  {
    "slug": "zonas-de-prepracion-millibar",
    "name": "Zonas de prepracion — Millibar",
    "brand": "Millibar",
    "familySlug": "cabinas-y-preparacion",
    "division": "Pintura y Aplicación",
    "category": "Zonas de prepracion",
    "sourceUrl": "https://www.millibar.it/products/preparation-areas/",
    "image": "/images/cabinas-preparacion.webp",
    "specs": [],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://www.millibar.it/products/preparation-areas/"
      }
    ]
  },
  {
    "slug": "plenum",
    "name": "Plenum",
    "brand": "Speritex",
    "familySlug": "mecanica-y-aire",
    "division": "Pintura y Aplicación",
    "category": "Tecnologia de filtros y aire comprimido",
    "sourceUrl": "https://www.speritex.com/en/",
    "image": "/images/mecanica-aire.webp",
    "specs": [],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://www.speritex.com/en/"
      }
    ]
  },
  {
    "slug": "bolsa",
    "name": "Filtro de cabina tipo bolsa",
    "brand": "Etapel",
    "familySlug": "mecanica-y-aire",
    "division": "Pintura y Aplicación",
    "category": "Tecnologia de filtros y aire comprimido",
    "sourceUrl": "",
    "image": "/images/mecanica-aire.webp",
    "specs": [],
    "downloads": []
  },
  {
    "slug": "piso",
    "name": "Filtro de piso para cabina",
    "brand": "Etapel",
    "familySlug": "mecanica-y-aire",
    "division": "Pintura y Aplicación",
    "category": "Tecnologia de filtros y aire comprimido",
    "sourceUrl": "",
    "image": "/images/mecanica-aire.webp",
    "specs": [],
    "downloads": []
  },
  {
    "slug": "tecnologia-de-filtros-y-aire-comprimido-prevost",
    "name": "Tecnologia de filtros y aire comprimido — Prevost",
    "brand": "Prevost",
    "familySlug": "mecanica-y-aire",
    "division": "Pintura y Aplicación",
    "category": "Tecnologia de filtros y aire comprimido",
    "sourceUrl": "",
    "image": "/images/mecanica-aire.webp",
    "specs": [],
    "downloads": []
  },
  {
    "slug": "solary-seeb1-lampara-infrarroja-de-onda-corta",
    "name": "Solary SEEB1 — Lámpara infrarroja de onda corta",
    "brand": "Solary",
    "familySlug": "mecanica-y-aire",
    "division": "Pintura y Aplicación",
    "category": "Lamparas Infrarojo",
    "sourceUrl": "https://solary.us/products/solary-short-wave-infrared-curing-lamp?_pos=1&_sid=3a697456d&_ss=r",
    "image": "/images/products/client-catalog/solary-electricals-single-head-short-wave-paint-to-dry-infrared-curing-lamp-for-car-bodywork-repair-paint-dryer.webp",
    "specs": [],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://solary.us/products/solary-short-wave-infrared-curing-lamp?_pos=1&_sid=3a697456d&_ss=r"
      }
    ]
  },
  {
    "slug": "solary-infrared-paint-curing-lamp-2-head-short-wave-infrared-lamp-for-painting-model-b2ea",
    "name": "Solary SEEBB2EA — Lámpara infrarroja de dos cabezales",
    "brand": "Solary",
    "familySlug": "mecanica-y-aire",
    "division": "Pintura y Aplicación",
    "category": "Lamparas Infrarojo",
    "sourceUrl": "https://solary.us/products/2-head-shortwave-infrared-paint-curing-b2ea?_pos=3&_sid=9f73c5e41&_ss=r",
    "image": "/images/products/client-catalog/solary-infrared-paint-curing-lamp-2-head-short-wave-infrared-lamp-for-painting-model-b2ea.webp",
    "specs": [],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://solary.us/products/2-head-shortwave-infrared-paint-curing-b2ea?_pos=3&_sid=9f73c5e41&_ss=r"
      }
    ]
  },
  {
    "slug": "irt-prep-3",
    "name": "IRT Prep 3",
    "brand": "Hedson",
    "familySlug": "mecanica-y-aire",
    "division": "Pintura y Aplicación",
    "category": "Lamparas Infrarojo",
    "sourceUrl": "https://www.hedson.com/products/irt-prep-3/",
    "image": "/images/products/client-catalog/prepcure.webp",
    "specs": [],
    "downloads": [
      {
        "label": "Download",
        "url": "https://www.hedson.com/wp-content/uploads/2025/08/IRT-PrepCure-2025-EN-rev3-1.pdf"
      },
      {
        "label": "Download",
        "url": "https://www.hedson.com/wp-content/uploads/2025/08/IRT-PrepCure-2025-DE-rev3-1.pdf"
      },
      {
        "label": "Download",
        "url": "https://www.hedson.com/wp-content/uploads/2025/08/IRT-PrepCure-2025-FR-rev2.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://www.hedson.com/products/irt-prep-3/"
      }
    ]
  },
  {
    "slug": "irt-prep-x-ldp",
    "name": "IRT Prep X LDP",
    "brand": "Hedson",
    "familySlug": "mecanica-y-aire",
    "division": "Pintura y Aplicación",
    "category": "Lamparas Infrarojo",
    "sourceUrl": "https://www.hedson.com/products/irt-prep-x-ldp/",
    "image": "/images/products/client-catalog/prepcure-42.webp",
    "specs": [],
    "downloads": [
      {
        "label": "Download",
        "url": "https://www.hedson.com/wp-content/uploads/2025/08/IRT-PrepCure-2025-EN-rev3-1.pdf"
      },
      {
        "label": "Download",
        "url": "https://www.hedson.com/wp-content/uploads/2025/08/IRT-PrepCure-2025-DE-rev3-1.pdf"
      },
      {
        "label": "Download",
        "url": "https://www.hedson.com/wp-content/uploads/2025/08/IRT-PrepCure-2025-FR-rev2.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://www.hedson.com/products/irt-prep-x-ldp/"
      }
    ]
  },
  {
    "slug": "irt-prep-4",
    "name": "IRT Prep 4",
    "brand": "Hedson",
    "familySlug": "mecanica-y-aire",
    "division": "Pintura y Aplicación",
    "category": "Lamparas Infrarojo",
    "sourceUrl": "https://www.hedson.com/products/irt-prep-4/",
    "image": "/images/products/client-catalog/prepcure-43.webp",
    "specs": [],
    "downloads": [
      {
        "label": "Download",
        "url": "https://www.hedson.com/wp-content/uploads/2025/08/IRT-PrepCure-2025-EN-rev3-1.pdf"
      },
      {
        "label": "Download",
        "url": "https://www.hedson.com/wp-content/uploads/2025/08/IRT-PrepCure-2025-DE-rev3-1.pdf"
      },
      {
        "label": "Download",
        "url": "https://www.hedson.com/wp-content/uploads/2025/08/IRT-PrepCure-2025-FR-rev2.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://www.hedson.com/products/irt-prep-4/"
      }
    ]
  },
  {
    "slug": "lijadora-neumatica-de-palma-orbital-aleatoria-con-plato-de-12-mm-y-orbita-de-3mm-skorpioiii",
    "name": "Lijadora neumática de palma orbital aleatoria con plato de 12 mm y órbita de 3mm - SKORPIOIII",
    "brand": "RUPES",
    "familySlug": "pintura",
    "division": "Preparación y acabado",
    "category": "Sistemas de lijado",
    "sourceUrl": "https://www.rupes.com/es/product/random-orbital-palm-pneumatic-sander-with-150mm-pad-and-3mm-orbit-skorpioiii/",
    "image": "/images/products/client-catalog/lijadora-neumatica-de-palma-orbital-aleatoria-con-plato-de-12-mm-y-orbita-de-3mm-skorpioiii.webp",
    "specs": [],
    "downloads": [
      {
        "label": "Catalogo ES",
        "url": "https://www.rupes.com/catalogue/2026/RUPES_Catàlogo-2026_ES.pdf"
      },
      {
        "label": "Catalogo IT",
        "url": "https://www.rupes.com/catalogue/2026/RUPES_Catalogo-2026_IT.pdf"
      },
      {
        "label": "Catalogue EN",
        "url": "https://www.rupes.com/catalogue/2026/RUPES_Catalogue-2026_EN.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://www.rupes.com/es/product/random-orbital-palm-pneumatic-sander-with-150mm-pad-and-3mm-orbit-skorpioiii/"
      }
    ]
  },
  {
    "slug": "aspirador-profesional-de-45-litros",
    "name": "Aspirador profesional de 45 litros",
    "brand": "RUPES",
    "familySlug": "pintura",
    "division": "Preparación y acabado",
    "category": "Sistemas de lijado",
    "sourceUrl": "https://www.rupes.com/es/product/45-liter-professional-vacuum-cleaner/",
    "image": "/images/products/client-catalog/aspirador-profesional-de-45-litros.webp",
    "specs": [],
    "downloads": [
      {
        "label": "Catalogo ES",
        "url": "https://www.rupes.com/catalogue/2026/RUPES_Catàlogo-2026_ES.pdf"
      },
      {
        "label": "Catalogo IT",
        "url": "https://www.rupes.com/catalogue/2026/RUPES_Catalogo-2026_IT.pdf"
      },
      {
        "label": "Catalogue EN",
        "url": "https://www.rupes.com/catalogue/2026/RUPES_Catalogue-2026_EN.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://www.rupes.com/es/product/45-liter-professional-vacuum-cleaner/"
      }
    ]
  },
  {
    "slug": "sistema-de-pulido-shinemate",
    "name": "Sistema de pulido — ShineMate",
    "brand": "ShineMate",
    "familySlug": "pintura",
    "division": "Preparación y acabado",
    "category": "Sistema de pulido",
    "sourceUrl": "https://www.shinemate.com/",
    "image": "/images/products/client-catalog/sistema-de-pulido-shinemate.webp",
    "specs": [],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://www.shinemate.com/"
      }
    ]
  },
  {
    "slug": "pulidora-orbital-aleatoria-bigfoot-lhr21-mark-v",
    "name": "Pulidora orbital aleatoria BigFoot LHR21 Mark V",
    "brand": "RUPES",
    "familySlug": "pintura",
    "division": "Preparación y acabado",
    "category": "Sistema de pulido",
    "sourceUrl": "https://www.rupes.com/es/product/random-orbital-polisher-bigfoot-lhr21-mark-v/",
    "image": "/images/products/client-catalog/pulidora-orbital-aleatoria-bigfoot-lhr21-mark-v.webp",
    "specs": [
      {
        "label": "Ø backing pad (mm/in)",
        "value": "150 – 6″"
      },
      {
        "label": "Ø orbit (mm/in)",
        "value": "21-13/16”"
      },
      {
        "label": "Power (W)",
        "value": "500"
      },
      {
        "label": "R.P.M.",
        "value": "3000 – 4500"
      },
      {
        "label": "Weight (Kg/lbs)",
        "value": "2,44 – 5,38"
      },
      {
        "label": "Speed control",
        "value": "•"
      }
    ],
    "downloads": [
      {
        "label": "Catalogo ES",
        "url": "https://www.rupes.com/catalogue/2026/RUPES_Catàlogo-2026_ES.pdf"
      },
      {
        "label": "Catalogo IT",
        "url": "https://www.rupes.com/catalogue/2026/RUPES_Catalogo-2026_IT.pdf"
      },
      {
        "label": "Catalogue EN",
        "url": "https://www.rupes.com/catalogue/2026/RUPES_Catalogue-2026_EN.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://www.rupes.com/es/product/random-orbital-polisher-bigfoot-lhr21-mark-v/"
      }
    ]
  },
  {
    "slug": "borlas-rupes",
    "name": "borlas rupes",
    "brand": "RUPES",
    "familySlug": "pintura",
    "division": "Preparación y acabado",
    "category": "Sistema de pulido",
    "sourceUrl": "",
    "image": "/images/products/sata/jet-x/1200394-main.webp",
    "specs": [],
    "downloads": []
  },
  {
    "slug": "benchracktm",
    "name": "BenchRack™",
    "brand": "Car-O-Liner",
    "familySlug": "soldadura-y-enderezado",
    "division": "Enderezado de carroceria",
    "category": "Bancos de enderezado autos y suv",
    "sourceUrl": "https://car-o-liner.com/es/producto/benchrack/",
    "image": "/images/products/client-catalog/benchracktm.webp",
    "specs": [],
    "downloads": [
      {
        "label": "General Sales Conditions",
        "url": "https://car-o-liner.com/wp-content/uploads/2026-03-25-COL_AB_Terms_and_Conditions-med-tillagg-privacy-policy.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://car-o-liner.com/es/producto/benchrack/"
      }
    ]
  },
  {
    "slug": "benchracktm-versa",
    "name": "BENCHRACK™ VERSA",
    "brand": "Car-O-Liner",
    "familySlug": "soldadura-y-enderezado",
    "division": "Enderezado de carroceria",
    "category": "Bancos de enderezado autos y suv",
    "sourceUrl": "https://car-o-liner.com/es/producto/benchrack-versa/",
    "image": "/images/products/client-catalog/benchracktm-versa.webp",
    "specs": [],
    "downloads": [
      {
        "label": "General Sales Conditions",
        "url": "https://car-o-liner.com/wp-content/uploads/2026-03-25-COL_AB_Terms_and_Conditions-med-tillagg-privacy-policy.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://car-o-liner.com/es/producto/benchrack-versa/"
      }
    ]
  },
  {
    "slug": "speedtm-3t-speedtm-3t-plus",
    "name": "SPEED™ 3T/SPEED™ 3T PLUS",
    "brand": "Car-O-Liner",
    "familySlug": "soldadura-y-enderezado",
    "division": "Enderezado de carroceria",
    "category": "Bancos de enderezado autos y suv",
    "sourceUrl": "https://car-o-liner.com/es/producto/speed-speed-plus/",
    "image": "/images/products/client-catalog/speedtm-3t-speedtm-3t-plus.webp",
    "specs": [],
    "downloads": [
      {
        "label": "General Sales Conditions",
        "url": "https://car-o-liner.com/wp-content/uploads/2026-03-25-COL_AB_Terms_and_Conditions-med-tillagg-privacy-policy.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://car-o-liner.com/es/producto/speed-speed-plus/"
      }
    ]
  },
  {
    "slug": "pointx-ii",
    "name": "POINTX® II",
    "brand": "Car-O-Liner",
    "familySlug": "soldadura-y-enderezado",
    "division": "Enderezado de carroceria",
    "category": "Equipos de medición",
    "sourceUrl": "https://car-o-liner.com/es/producto/pointx-ii/",
    "image": "/images/products/client-catalog/pointx-ii.webp",
    "specs": [],
    "downloads": [
      {
        "label": "General Sales Conditions",
        "url": "https://car-o-liner.com/wp-content/uploads/2026-03-25-COL_AB_Terms_and_Conditions-med-tillagg-privacy-policy.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://car-o-liner.com/es/producto/pointx-ii/"
      }
    ]
  },
  {
    "slug": "car-o-tronic",
    "name": "Car-O-Tronic®",
    "brand": "Car-O-Liner",
    "familySlug": "soldadura-y-enderezado",
    "division": "Enderezado de carroceria",
    "category": "Equipos de medición",
    "sourceUrl": "https://car-o-liner.com/es/producto/car-o-tronic/",
    "image": "/images/products/client-catalog/car-o-tronic.webp",
    "specs": [],
    "downloads": [
      {
        "label": "General Sales Conditions",
        "url": "https://car-o-liner.com/wp-content/uploads/2026-03-25-COL_AB_Terms_and_Conditions-med-tillagg-privacy-policy.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://car-o-liner.com/es/producto/car-o-tronic/"
      }
    ]
  },
  {
    "slug": "b731",
    "name": "B731",
    "brand": "Car-O-Liner",
    "familySlug": "soldadura-y-enderezado",
    "division": "Enderezado de carroceria",
    "category": "Accesorios car o liner",
    "sourceUrl": "https://car-o-liner.com/es/producto/b731/",
    "image": "/images/products/client-catalog/b731.webp",
    "specs": [],
    "downloads": [
      {
        "label": "General Sales Conditions",
        "url": "https://car-o-liner.com/wp-content/uploads/2026-03-25-COL_AB_Terms_and_Conditions-med-tillagg-privacy-policy.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://car-o-liner.com/es/producto/b731/"
      }
    ]
  },
  {
    "slug": "evo-1-2-y-3",
    "name": "EVO 1,2 y 3",
    "brand": "Etapel",
    "familySlug": "soldadura-y-enderezado",
    "division": "Enderezado de carroceria",
    "category": "Accesorios car o liner",
    "sourceUrl": "",
    "image": "/images/category-soldadoras.webp",
    "specs": [],
    "downloads": []
  },
  {
    "slug": "cam-alinger",
    "name": "Cam alinger",
    "brand": "JOSAM",
    "familySlug": "soldadura-y-enderezado",
    "division": "Enderezado de carroceria",
    "category": "Alineacion y Enderezado Vehiculos pesados",
    "sourceUrl": "https://josam.se/es/product/cam-aligner/",
    "image": "/images/category-soldadoras.webp",
    "specs": [],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://josam.se/es/product/cam-aligner/"
      }
    ]
  },
  {
    "slug": "frame-press",
    "name": "Frame Press",
    "brand": "JOSAM",
    "familySlug": "soldadura-y-enderezado",
    "division": "Enderezado de carroceria",
    "category": "Alineacion y Enderezado Vehiculos pesados",
    "sourceUrl": "https://josam.se/es/product/frame-press/",
    "image": "/images/products/client-catalog/frame-press.webp",
    "specs": [],
    "downloads": [
      {
        "label": "Folleto",
        "url": "https://josam.se/wp-content/uploads/Global-Wheel-alignment-kits.pdf"
      },
      {
        "label": "Folleto",
        "url": "https://josam.se/wp-content/uploads/12_50-Collision-repair-catalogue.pdf"
      },
      {
        "label": "Folleto",
        "url": "https://josam.se/wp-content/uploads/Josam-induction-heating_es.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://josam.se/es/product/frame-press/"
      }
    ]
  },
  {
    "slug": "inductor-de-calor",
    "name": "Inductor de calor",
    "brand": "JOSAM",
    "familySlug": "soldadura-y-enderezado",
    "division": "Enderezado de carroceria",
    "category": "Alineacion y Enderezado Vehiculos pesados",
    "sourceUrl": "https://josam.se/es/products/calentamiento-por-induccion/",
    "image": "/images/category-soldadoras.webp",
    "specs": [],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://josam.se/es/products/calentamiento-por-induccion/"
      }
    ]
  },
  {
    "slug": "gyspot-27-02",
    "name": "GYSPOT 27.02",
    "brand": "GYS",
    "familySlug": "soldadura-y-enderezado",
    "division": "Desabollo de carroceria",
    "category": "Desabollo de carroceria auto y SUV",
    "sourceUrl": "https://planet.gys.fr/prod-055353-/_/_/es?lang=es",
    "image": "/images/products/client-catalog/gyspot-27-02.webp",
    "specs": [
      {
        "label": "Referencia",
        "value": "055353"
      },
      {
        "label": "Dimensiones de empaque",
        "value": "36.5*24.5*30.5 cm"
      },
      {
        "label": "Peso",
        "value": "17.9 kg"
      }
    ],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://planet.gys.fr/prod-055353-/_/_/es?lang=es"
      }
    ]
  },
  {
    "slug": "gyspot-34-02",
    "name": "GYSPOT 34.02",
    "brand": "GYS",
    "familySlug": "soldadura-y-enderezado",
    "division": "Desabollo de carroceria",
    "category": "Desabollo de carroceria auto y SUV",
    "sourceUrl": "https://planet.gys.fr/prod-065741-/-/-/es?lang=es",
    "image": "/images/products/client-catalog/gyspot-34-02.webp",
    "specs": [
      {
        "label": "Referencia",
        "value": "065741"
      },
      {
        "label": "Dimensiones de empaque",
        "value": "41.5*36*30.5 cm"
      },
      {
        "label": "Peso",
        "value": "23.8 kg"
      }
    ],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://planet.gys.fr/prod-065741-/-/-/es?lang=es"
      }
    ]
  },
  {
    "slug": "gyspot-3902",
    "name": "GYSPOT 3902",
    "brand": "GYS",
    "familySlug": "soldadura-y-enderezado",
    "division": "Desabollo de carroceria",
    "category": "Desabollo de carroceria auto y SUV",
    "sourceUrl": "https://planet.gys.fr/prod-052215-/_/_/es?lang=es",
    "image": "/images/products/client-catalog/gyspot-3902.webp",
    "specs": [
      {
        "label": "Referencia",
        "value": "052215"
      },
      {
        "label": "Dimensiones de empaque",
        "value": "48.5*37.5*29 cm"
      },
      {
        "label": "Peso",
        "value": "25.54 kg"
      }
    ],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://planet.gys.fr/prod-052215-/_/_/es?lang=es"
      }
    ]
  },
  {
    "slug": "gyspot-alu-pro-fv",
    "name": "GYSPOT ALU PRO FV",
    "brand": "GYS",
    "familySlug": "soldadura-y-enderezado",
    "division": "Desabollo de carroceria",
    "category": "Desabollo de carroceria auto y SUV",
    "sourceUrl": "https://planet.gys.fr/prod-021990-/_/_/es?lang=es",
    "image": "/images/products/client-catalog/gyspot-alu-pro-fv.webp",
    "specs": [
      {
        "label": "Referencia",
        "value": "021990"
      },
      {
        "label": "Dimensiones de empaque",
        "value": "48.5*37.5*29 cm"
      },
      {
        "label": "Peso",
        "value": "14.18 kg"
      }
    ],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://planet.gys.fr/prod-021990-/_/_/es?lang=es"
      }
    ]
  },
  {
    "slug": "gyspot-arcpull-200-collision-repair",
    "name": "GYSPOT ARCPULL 200 COLLISION REPAIR",
    "brand": "GYS",
    "familySlug": "soldadura-y-enderezado",
    "division": "Desabollo de carroceria",
    "category": "Desabollo de carroceria auto y SUV",
    "sourceUrl": "https://planet.gys.fr/prod-057470-/-/-/es?lang=es",
    "image": "/images/products/client-catalog/gyspot-arcpull-200-collision-repair.webp",
    "specs": [
      {
        "label": "Referencia",
        "value": "057470"
      },
      {
        "label": "Dimensiones de empaque",
        "value": "48.5*37*29.5 cm"
      },
      {
        "label": "Peso",
        "value": "15.1 kg"
      }
    ],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://planet.gys.fr/prod-057470-/-/-/es?lang=es"
      }
    ]
  },
  {
    "slug": "speedliner-v2-pro-230",
    "name": "SPEEDLINER V2 PRO 230",
    "brand": "GYS",
    "familySlug": "soldadura-y-enderezado",
    "division": "Desabollo de carroceria",
    "category": "Desabollo de carroceria auto y SUV",
    "sourceUrl": "https://planet.gys.fr/prod-074446-/_/_/es?lang=es",
    "image": "/images/products/client-catalog/speedliner-v2-pro-230.webp",
    "specs": [
      {
        "label": "Referencia",
        "value": "074446"
      }
    ],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://planet.gys.fr/prod-074446-/_/_/es?lang=es"
      }
    ]
  },
  {
    "slug": "speedliner-v2-alu-pro-fv",
    "name": "SPEEDLINER V2 ALU PRO FV",
    "brand": "GYS",
    "familySlug": "soldadura-y-enderezado",
    "division": "Desabollo de carroceria",
    "category": "Desabollo de carroceria auto y SUV",
    "sourceUrl": "https://planet.gys.fr/prod-074552-/_/_/es?lang=es",
    "image": "/images/products/client-catalog/speedliner-v2-alu-pro-fv.webp",
    "specs": [
      {
        "label": "Referencia",
        "value": "074552"
      },
      {
        "label": "Dimensiones de empaque",
        "value": "0*0*0 cm"
      }
    ],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://planet.gys.fr/prod-074552-/_/_/es?lang=es"
      }
    ]
  },
  {
    "slug": "dentstation-39-02",
    "name": "DENTSTATION 39.02",
    "brand": "GYS",
    "familySlug": "soldadura-y-enderezado",
    "division": "Desabollo de carroceria",
    "category": "Desabollo de carroceria auto y SUV",
    "sourceUrl": "https://planet.gys.fr/prod-078161-/_/_/es?lang=es",
    "image": "/images/products/client-catalog/dentstation-39-02.webp",
    "specs": [
      {
        "label": "Referencia",
        "value": "078161"
      }
    ],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://planet.gys.fr/prod-078161-/_/_/es?lang=es"
      }
    ]
  },
  {
    "slug": "speedliner-premium-v2-arcpull-200",
    "name": "SPEEDLINER PREMIUM V2 ARCPULL 200",
    "brand": "GYS",
    "familySlug": "soldadura-y-enderezado",
    "division": "Desabollo de carroceria",
    "category": "Desabollo de carroceria auto y SUV",
    "sourceUrl": "https://planet.gys.fr/prod-073999-/_/_/es?lang=es",
    "image": "/images/products/client-catalog/speedliner-premium-v2-arcpull-200.webp",
    "specs": [
      {
        "label": "Referencia",
        "value": "073999"
      }
    ],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://planet.gys.fr/prod-073999-/_/_/es?lang=es"
      }
    ]
  },
  {
    "slug": "sistemas-de-traccion-para-enderezado",
    "name": "Sistemas de traccion para enderezado",
    "brand": "TELWIN",
    "familySlug": "soldadura-y-enderezado",
    "division": "Desabollo de carroceria",
    "category": "Desabollo de carroceria auto y SUV",
    "sourceUrl": "https://www.telwin.com/intl/es/productos/sistemas-smart-repair/804930",
    "image": "/images/category-soldadoras.webp",
    "specs": [],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://www.telwin.com/intl/es/productos/sistemas-smart-repair/804930"
      }
    ]
  },
  {
    "slug": "gyspot-pti-neo-complete-g1-g2-g4-208-240v",
    "name": "GYSPOT PTI NEO COMPLETE (G1 G2 G4) - 208/240V",
    "brand": "GYS",
    "familySlug": "soldadura-y-enderezado",
    "division": "Desabollo de carroceria",
    "category": "Desabollo de carroceria auto y SUV",
    "sourceUrl": "https://planet.gys.fr/prod-084841-K502/_K502/GYSPOT_PTI_NEO_COMPLETE_(G1+G2+G4)_-_208_240V/en?lang=en",
    "image": "/images/products/client-catalog/gyspot-pti-neo-complete-g1-g2-g4-208-240v.webp",
    "specs": [
      {
        "label": "Referencia",
        "value": "084841"
      },
      {
        "label": "Dimensiones de empaque",
        "value": "78.5*60*71 cm"
      },
      {
        "label": "Peso",
        "value": "80.5 kg"
      }
    ],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://planet.gys.fr/prod-084841-K502/_K502/GYSPOT_PTI_NEO_COMPLETE_(G1+G2+G4)_-_208_240V/en?lang=en"
      }
    ]
  },
  {
    "slug": "gyspot-pti-expert-5m-208-240v",
    "name": "GYSPOT PTI EXPERT (5M) - 208/240V",
    "brand": "GYS",
    "familySlug": "soldadura-y-enderezado",
    "division": "Desabollo de carroceria",
    "category": "Desabollo de carroceria auto y SUV",
    "sourceUrl": "https://planet.gys.fr/prod-083950-/_/_/en?lang=en",
    "image": "/images/products/client-catalog/gyspot-pti-expert-5m-208-240v.webp",
    "specs": [
      {
        "label": "Referencia",
        "value": "083950"
      }
    ],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://planet.gys.fr/prod-083950-/_/_/en?lang=en"
      }
    ]
  },
  {
    "slug": "remachadora-gyspress-premium-10t-push-pull",
    "name": "REMACHADORA GYSPRESS PREMIUM 10T PUSH-PULL",
    "brand": "GYS",
    "familySlug": "soldadura-y-enderezado",
    "division": "Desabollo de carroceria",
    "category": "Desabollo de carroceria auto y SUV",
    "sourceUrl": "https://planet.gys.fr/prod-077065-/_/_/es?lang=es",
    "image": "/images/products/client-catalog/remachadora-gyspress-premium-10t-push-pull.webp",
    "specs": [
      {
        "label": "Referencia",
        "value": "077065"
      },
      {
        "label": "Dimensiones de empaque",
        "value": "58.5*50*16 cm"
      },
      {
        "label": "Peso",
        "value": "13.12 kg"
      }
    ],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://planet.gys.fr/prod-077065-/_/_/es?lang=es"
      }
    ]
  },
  {
    "slug": "smartmig-162-regulator-not-included",
    "name": "SMARTMIG 162 (regulator not included)",
    "brand": "GYS",
    "familySlug": "soldadura-y-enderezado",
    "division": "Desabollo de carroceria",
    "category": "Desabollo de carroceria auto y SUV",
    "sourceUrl": "https://planet.gys.fr/prod-033160-/_/_/en?lang=en",
    "image": "/images/products/client-catalog/smartmig-162-regulator-not-included.webp",
    "specs": [
      {
        "label": "Referencia",
        "value": "033160"
      },
      {
        "label": "Dimensiones de empaque",
        "value": "55.5*25.5*45.9 cm"
      },
      {
        "label": "Peso",
        "value": "28.131 kg"
      }
    ],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://planet.gys.fr/prod-033160-/_/_/en?lang=en"
      }
    ]
  },
  {
    "slug": "carmig-e-auto-with-accessories",
    "name": "CARMIG-E AUTO - WITH ACCESSORIES",
    "brand": "GYS",
    "familySlug": "soldadura-y-enderezado",
    "division": "Desabollo de carroceria",
    "category": "Desabollo de carroceria auto y SUV",
    "sourceUrl": "https://planet.gys.fr/prod-087675-/_/_/en?lang=en",
    "image": "/images/products/client-catalog/carmig-e-auto-with-accessories.webp",
    "specs": [
      {
        "label": "Referencia",
        "value": "087675"
      },
      {
        "label": "Dimensiones de empaque",
        "value": "78.5*38.5*67 cm"
      },
      {
        "label": "Peso",
        "value": "42 kg"
      }
    ],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://planet.gys.fr/prod-087675-/_/_/en?lang=en"
      }
    ]
  },
  {
    "slug": "e2-gys-auto-with-accessories",
    "name": "E2 GYS AUTO - WITH ACCESSORIES",
    "brand": "GYS",
    "familySlug": "soldadura-y-enderezado",
    "division": "Desabollo de carroceria",
    "category": "Desabollo de carroceria auto y SUV",
    "sourceUrl": "https://planet.gys.fr/prod-075139-/_/_/en?lang=en",
    "image": "/images/products/client-catalog/e2-gys-auto-with-accessories.webp",
    "specs": [
      {
        "label": "Referencia",
        "value": "075139"
      },
      {
        "label": "Dimensiones de empaque",
        "value": "72*37*105 cm"
      },
      {
        "label": "Peso",
        "value": "59.5 kg"
      }
    ],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://planet.gys.fr/prod-075139-/_/_/en?lang=en"
      }
    ]
  },
  {
    "slug": "e3-gys-auto-with-accessories",
    "name": "E3 GYS AUTO - WITH ACCESSORIES",
    "brand": "GYS",
    "familySlug": "soldadura-y-enderezado",
    "division": "Desabollo de carroceria",
    "category": "Desabollo de carroceria auto y SUV",
    "sourceUrl": "https://planet.gys.fr/prod-075160-/_/_/en?lang=en",
    "image": "/images/products/client-catalog/e3-gys-auto-with-accessories.webp",
    "specs": [
      {
        "label": "Referencia",
        "value": "075160"
      },
      {
        "label": "Dimensiones de empaque",
        "value": "73*38*108 cm"
      },
      {
        "label": "Peso",
        "value": "64 kg"
      }
    ],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://planet.gys.fr/prod-075160-/_/_/en?lang=en"
      }
    ]
  },
  {
    "slug": "autopulse-220-m3-3-torches-included",
    "name": "AUTOPULSE 220-M3 - 3 TORCHES INCLUDED",
    "brand": "GYS",
    "familySlug": "soldadura-y-enderezado",
    "division": "Desabollo de carroceria",
    "category": "Desabollo de carroceria auto y SUV",
    "sourceUrl": "https://planet.gys.fr/prod-036703-/_/_/en?lang=en",
    "image": "/images/products/client-catalog/autopulse-220-m3-3-torches-included.webp",
    "specs": [
      {
        "label": "Referencia",
        "value": "036703"
      },
      {
        "label": "Dimensiones de empaque",
        "value": "75*41*94 cm"
      },
      {
        "label": "Peso",
        "value": "80 kg"
      }
    ],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://planet.gys.fr/prod-036703-/_/_/en?lang=en"
      }
    ]
  },
  {
    "slug": "easycut-30-fv-with-torch",
    "name": "EASYCUT 30 FV (WITH TORCH)",
    "brand": "GYS",
    "familySlug": "soldadura-y-enderezado",
    "division": "Desabollo de carroceria",
    "category": "Desabollo de carroceria auto y SUV",
    "sourceUrl": "https://planet.gys.fr/prod-013858-/_/_/en?lang=en",
    "image": "/images/products/client-catalog/easycut-30-fv-with-torch.webp",
    "specs": [
      {
        "label": "Referencia",
        "value": "013858"
      },
      {
        "label": "Dimensiones de empaque",
        "value": "51*28.5*36.5 cm"
      },
      {
        "label": "Peso",
        "value": "14.28 kg"
      }
    ],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://planet.gys.fr/prod-013858-/_/_/en?lang=en"
      }
    ]
  },
  {
    "slug": "cutter-45-ct-16-without-torch",
    "name": "CUTTER 45 CT 16 - WITHOUT TORCH",
    "brand": "GYS",
    "familySlug": "soldadura-y-enderezado",
    "division": "Desabollo de carroceria",
    "category": "Desabollo de carroceria auto y SUV",
    "sourceUrl": "https://planet.gys.fr/prod-014787-/_/_/en?lang=en",
    "image": "/images/products/client-catalog/cutter-45-ct-16-without-torch.webp",
    "specs": [
      {
        "label": "Referencia",
        "value": "014787"
      },
      {
        "label": "Dimensiones de empaque",
        "value": "51*32*46 cm"
      },
      {
        "label": "Peso",
        "value": "14.9 kg"
      }
    ],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://planet.gys.fr/prod-014787-/_/_/en?lang=en"
      }
    ]
  },
  {
    "slug": "gysduction-auto-dent-repair-generator-dent-pulling-inductor",
    "name": "GYSDUCTION AUTO DENT REPAIR (Generator dent pulling inductor)",
    "brand": "GYS",
    "familySlug": "soldadura-y-enderezado",
    "division": "Desabollo de carroceria",
    "category": "Desabollo de carroceria auto y SUV",
    "sourceUrl": "https://planet.gys.fr/prod-054981-/_/_/en?lang=en",
    "image": "/images/products/client-catalog/gysduction-auto-dent-repair-generator-dent-pulling-inductor.webp",
    "specs": [
      {
        "label": "Referencia",
        "value": "054981"
      },
      {
        "label": "Dimensiones de empaque",
        "value": "51.7*30*36.7 cm"
      },
      {
        "label": "Peso",
        "value": "9.36 kg"
      }
    ],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://planet.gys.fr/prod-054981-/_/_/en?lang=en"
      }
    ]
  },
  {
    "slug": "gysduction-auto-complete-generator-3-inductors",
    "name": "GYSDUCTION AUTO COMPLETE (Generator 3 inductors)",
    "brand": "GYS",
    "familySlug": "soldadura-y-enderezado",
    "division": "Desabollo de carroceria",
    "category": "Desabollo de carroceria auto y SUV",
    "sourceUrl": "https://planet.gys.fr/prod-053380-/_/_/en?lang=en",
    "image": "/images/products/client-catalog/gysduction-auto-complete-generator-3-inductors.webp",
    "specs": [
      {
        "label": "Referencia",
        "value": "053380"
      },
      {
        "label": "Dimensiones de empaque",
        "value": "51.5*29.9*36.7 cm"
      },
      {
        "label": "Peso",
        "value": "13.12 kg"
      }
    ],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://planet.gys.fr/prod-053380-/_/_/en?lang=en"
      }
    ]
  },
  {
    "slug": "frame-press-2",
    "name": "Frame Press",
    "brand": "JOSAM",
    "familySlug": "soldadura-y-enderezado",
    "division": "Desabollo de carroceria",
    "category": "Desabollo de carroceria vehiculos pesados",
    "sourceUrl": "https://josam.se/es/producto/frame-press/",
    "image": "/images/products/client-catalog/frame-press-95.webp",
    "specs": [],
    "downloads": [
      {
        "label": "Folleto",
        "url": "https://josam.se/wp-content/uploads/Global-Wheel-alignment-kits.pdf"
      },
      {
        "label": "Folleto",
        "url": "https://josam.se/wp-content/uploads/12_50-Collision-repair-catalogue.pdf"
      },
      {
        "label": "Folleto",
        "url": "https://josam.se/wp-content/uploads/Josam-induction-heating_es.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://josam.se/es/producto/frame-press/"
      }
    ]
  },
  {
    "slug": "cam-aligner",
    "name": "Cam-Aligner",
    "brand": "JOSAM",
    "familySlug": "soldadura-y-enderezado",
    "division": "Desabollo de carroceria",
    "category": "Desabollo de carroceria vehiculos pesados",
    "sourceUrl": "https://josam.se/es/producto/cam-aligner/",
    "image": "/images/products/client-catalog/cam-aligner.webp",
    "specs": [],
    "downloads": [
      {
        "label": "Folleto",
        "url": "https://josam.se/wp-content/uploads/Global-Wheel-alignment-kits.pdf"
      },
      {
        "label": "Folleto",
        "url": "https://josam.se/wp-content/uploads/12_50-Collision-repair-catalogue.pdf"
      },
      {
        "label": "Folleto",
        "url": "https://josam.se/wp-content/uploads/Josam-induction-heating_es.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://josam.se/es/producto/cam-aligner/"
      }
    ]
  },
  {
    "slug": "jh1500",
    "name": "JH1500",
    "brand": "JOSAM",
    "familySlug": "soldadura-y-enderezado",
    "division": "Desabollo de carroceria",
    "category": "Desabollo de carroceria vehiculos pesados",
    "sourceUrl": "https://josam.se/es/producto/jh1500/",
    "image": "/images/products/client-catalog/jh1500.webp",
    "specs": [],
    "downloads": [
      {
        "label": "Folleto",
        "url": "https://josam.se/wp-content/uploads/Global-Wheel-alignment-kits.pdf"
      },
      {
        "label": "Folleto",
        "url": "https://josam.se/wp-content/uploads/12_50-Collision-repair-catalogue.pdf"
      },
      {
        "label": "Folleto",
        "url": "https://josam.se/wp-content/uploads/Josam-induction-heating_es.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://josam.se/es/producto/jh1500/"
      }
    ]
  },
  {
    "slug": "mec-600-metal-edge-cutter",
    "name": "MEC 600 Metal Edge Cutter",
    "brand": "Wieländer+Schill",
    "familySlug": "soldadura-y-enderezado",
    "division": "Desabollo de carroceria",
    "category": "Desabollo de carroceria vehiculos pesados",
    "sourceUrl": "https://www.wielanderschill.com/en/mec-600-metal-edge-cutter-full-set-with-case-640080",
    "image": "/images/products/client-catalog/mec-600-metal-edge-cutter.webp",
    "specs": [
      {
        "label": "Air consumption",
        "value": "0,56 m³/min"
      },
      {
        "label": "Air consumption at idle",
        "value": "0,67 m³/min"
      },
      {
        "label": "Air humidity",
        "value": "10 - 95 %"
      },
      {
        "label": "Air quality",
        "value": "ISO 8573-1"
      },
      {
        "label": "Content",
        "value": "1 stück, 1 piece"
      },
      {
        "label": "Diameter Ø",
        "value": "Spannzange: 6,0 mm"
      }
    ],
    "downloads": [
      {
        "label": "Repair Order",
        "url": "https://www.wielanderschill.com/media/a2/33/b8/1702030534/Repair_order.pdf"
      },
      {
        "label": "MEC 600 Kantenfräser | DE",
        "url": "https://www.wielanderschill.com/media/c3/c6/2a/1747128517/640080_Mec-600_Kantenfraeser_DE.pdf?ts=174712851"
      },
      {
        "label": "MEC 600 Metal Edge Cutter | ENG",
        "url": "https://www.wielanderschill.com/media/ee/71/21/1728908015/640080_Mec-600_Metal_Edge_Cutter_ENG.pdf?ts=1768385513"
      },
      {
        "label": "Información del fabricante",
        "url": "https://www.wielanderschill.com/en/mec-600-metal-edge-cutter-full-set-with-case-640080"
      }
    ]
  },
  {
    "slug": "trolley-iw1",
    "name": "TROLLEY IW1",
    "brand": "GYS",
    "familySlug": "soldadura-y-enderezado",
    "division": "Desabollo de carroceria",
    "category": "Desabollo de carroceria vehiculos pesados",
    "sourceUrl": "https://www.gys.fr/prod-063136-/-/-/fr?lang=fr",
    "image": "/images/products/client-catalog/trolley-iw1.webp",
    "specs": [
      {
        "label": "Referencia",
        "value": "063136"
      }
    ],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://www.gys.fr/prod-063136-/-/-/fr?lang=fr"
      }
    ]
  },
  {
    "slug": "plasma-cutter-45-ct-32-with-torch",
    "name": "PLASMA CUTTER 45 CT 32 - WITH TORCH",
    "brand": "GYS",
    "familySlug": "soldadura-y-enderezado",
    "division": "Desabollo de carroceria",
    "category": "Desabollo de carroceria vehiculos pesados",
    "sourceUrl": "https://planet.gys.fr/prod-088399-/_/_/en?lang=en",
    "image": "/images/products/client-catalog/plasma-cutter-45-ct-32-with-torch.webp",
    "specs": [
      {
        "label": "Referencia",
        "value": "088399"
      },
      {
        "label": "Dimensiones de empaque",
        "value": "51*31*46.5 cm"
      },
      {
        "label": "Peso",
        "value": "17.5 kg"
      }
    ],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://planet.gys.fr/prod-088399-/_/_/en?lang=en"
      }
    ]
  },
  {
    "slug": "speedliner-expert-230-arcpull-200",
    "name": "SPEEDLINER EXPERT 230   ARCPULL 200",
    "brand": "GYS",
    "familySlug": "soldadura-y-enderezado",
    "division": "Desabollo de carroceria",
    "category": "Desabollo de carroceria vehiculos pesados",
    "sourceUrl": "https://planet.gys.fr/prod-074538-/_/_/en?lang=en",
    "image": "/images/products/client-catalog/speedliner-expert-230-arcpull-200.webp",
    "specs": [
      {
        "label": "Referencia",
        "value": "074538"
      }
    ],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://planet.gys.fr/prod-074538-/_/_/en?lang=en"
      }
    ]
  },
  {
    "slug": "gyspot-expert-400",
    "name": "GYSPOT EXPERT 400",
    "brand": "GYS",
    "familySlug": "soldadura-y-enderezado",
    "division": "Desabollo de carroceria",
    "category": "Desabollo de carroceria vehiculos pesados",
    "sourceUrl": "https://planet.gys.fr/prod-058859-/_/_/en?lang=en",
    "image": "/images/products/client-catalog/gyspot-expert-400.webp",
    "specs": [
      {
        "label": "Referencia",
        "value": "058859"
      },
      {
        "label": "Dimensiones de empaque",
        "value": "48.5*37.5*29 cm"
      },
      {
        "label": "Peso",
        "value": "32.85 kg"
      }
    ],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://planet.gys.fr/prod-058859-/_/_/en?lang=en"
      }
    ]
  },
  {
    "slug": "gyspot-pti-genius-plus-6m-208-240v",
    "name": "GYSPOT PTI GENIUS PLUS (6m) - 208/240V",
    "brand": "GYS",
    "familySlug": "soldadura-y-enderezado",
    "division": "Desabollo de carroceria",
    "category": "Desabollo de carroceria vehiculos pesados",
    "sourceUrl": "https://planet.gys.fr/prod-083288-/_/_/en?lang=en",
    "image": "/images/products/client-catalog/gyspot-pti-genius-plus-6m-208-240v.webp",
    "specs": [
      {
        "label": "Referencia",
        "value": "083288"
      },
      {
        "label": "Dimensiones de empaque",
        "value": "91*70*120 cm"
      },
      {
        "label": "Peso",
        "value": "133 kg"
      }
    ],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://planet.gys.fr/prod-083288-/_/_/en?lang=en"
      }
    ]
  },
  {
    "slug": "nitro-fuzer-classic-nitrogen-plastic-welder-with-cart",
    "name": "Nitro-Fuzer Classic Nitrogen Plastic Welder - With Cart",
    "brand": "Polyvance",
    "familySlug": "soldadura-y-enderezado",
    "division": "Desabollo de carroceria",
    "category": "Reparacion de plasticos",
    "sourceUrl": "https://www.polyvance.com/products/nitro-fuzer-classic-nitrogen-plastic-welder?variant=46200491606255",
    "image": "/images/products/client-catalog/nitro-fuzer-classic-nitrogen-plastic-welder-with-cart.webp",
    "specs": [],
    "downloads": [
      {
        "label": "product sheet",
        "url": "https://cdn.shopify.com/s/files/1/0724/7973/6047/files/Nitro-Fuzer-Classic-Product-Sheet.pdf?v=1761839227"
      },
      {
        "label": "\"The Book of Plastic Repair\"",
        "url": "https://cdn.shopify.com/s/files/1/0724/7973/6047/files/The-Book-of-Plastic-Repair.pdf?v=1749218235"
      },
      {
        "label": "Información del fabricante",
        "url": "https://www.polyvance.com/products/nitro-fuzer-classic-nitrogen-plastic-welder?variant=46200491606255"
      }
    ]
  },
  {
    "slug": "nitro-fuzer-touch-nitrogen-plastic-welder-with-cart",
    "name": "Nitro-Fuzer Touch Nitrogen Plastic Welder - With Cart",
    "brand": "Polyvance",
    "familySlug": "soldadura-y-enderezado",
    "division": "Desabollo de carroceria",
    "category": "Reparacion de plasticos",
    "sourceUrl": "https://www.polyvance.com/products/nitro-fuzer-touch-nitrogen-plastic-welder?variant=46200479973615",
    "image": "/images/products/client-catalog/nitro-fuzer-touch-nitrogen-plastic-welder-with-cart.webp",
    "specs": [],
    "downloads": [
      {
        "label": "product sheet",
        "url": "https://cdn.shopify.com/s/files/1/0724/7973/6047/files/Nitro-Fuzer-Touch-Product-Sheet.pdf?v=1761839227"
      },
      {
        "label": "\"The Book of Plastic Repair\"",
        "url": "https://cdn.shopify.com/s/files/1/0724/7973/6047/files/The-Book-of-Plastic-Repair.pdf?v=1749218235"
      },
      {
        "label": "Información del fabricante",
        "url": "https://www.polyvance.com/products/nitro-fuzer-touch-nitrogen-plastic-welder?variant=46200479973615"
      }
    ]
  },
  {
    "slug": "nitro-fuzer-classic-nitrogen-plastic-welder-with-cart-2",
    "name": "Nitro-Fuzer Classic Nitrogen Plastic Welder - With Cart",
    "brand": "Polyvance",
    "familySlug": "soldadura-y-enderezado",
    "division": "Desabollo de carroceria",
    "category": "Reparacion de plasticos",
    "sourceUrl": "https://www.polyvance.com/products/nitro-fuzer-classic-nitrogen-plastic-welder?variant=46200491573487",
    "image": "/images/products/client-catalog/nitro-fuzer-classic-nitrogen-plastic-welder-with-cart-114.webp",
    "specs": [],
    "downloads": [
      {
        "label": "product sheet",
        "url": "https://cdn.shopify.com/s/files/1/0724/7973/6047/files/Nitro-Fuzer-Classic-Product-Sheet.pdf?v=1761839227"
      },
      {
        "label": "Información del fabricante",
        "url": "https://www.polyvance.com/products/nitro-fuzer-classic-nitrogen-plastic-welder?variant=46200491573487"
      }
    ]
  },
  {
    "slug": "nitro-fuzer-touch-nitrogen-plastic-welder",
    "name": "Nitro-Fuzer Touch Nitrogen Plastic Welder",
    "brand": "Polyvance",
    "familySlug": "soldadura-y-enderezado",
    "division": "Desabollo de carroceria",
    "category": "Reparacion de plasticos",
    "sourceUrl": "https://www.polyvance.com/products/nitro-fuzer-touch-base?variant=46462217224431",
    "image": "/images/products/client-catalog/nitro-fuzer-touch-nitrogen-plastic-welder.webp",
    "specs": [],
    "downloads": [
      {
        "label": "\"The Book of Plastic Repair\"",
        "url": "https://cdn.shopify.com/s/files/1/0724/7973/6047/files/The-Book-of-Plastic-Repair.pdf?v=1749218235"
      },
      {
        "label": "Información del fabricante",
        "url": "https://www.polyvance.com/products/nitro-fuzer-touch-base?variant=46462217224431"
      }
    ]
  },
  {
    "slug": "nitro-fuzer-classic-nitrogen-plastic-welder",
    "name": "Nitro-Fuzer Classic Nitrogen Plastic Welder",
    "brand": "Polyvance",
    "familySlug": "soldadura-y-enderezado",
    "division": "Desabollo de carroceria",
    "category": "Reparacion de plasticos",
    "sourceUrl": "https://www.polyvance.com/products/nitro-fuzer-classic-base?variant=46462218043631",
    "image": "/images/products/client-catalog/nitro-fuzer-classic-nitrogen-plastic-welder.webp",
    "specs": [],
    "downloads": [
      {
        "label": "\"The Book of Plastic Repair\"",
        "url": "https://cdn.shopify.com/s/files/1/0724/7973/6047/files/The-Book-of-Plastic-Repair.pdf?v=1749218235"
      },
      {
        "label": "Información del fabricante",
        "url": "https://www.polyvance.com/products/nitro-fuzer-classic-base?variant=46462218043631"
      }
    ]
  },
  {
    "slug": "gysflash-101-12-cnt-fv-5m-cables",
    "name": "GYSFLASH 101.12 CNT FV (5m Cables) * **",
    "brand": "GYS",
    "familySlug": "mecanica-y-aire",
    "division": "Cargadores  y arrancadores de  baterias",
    "category": "Cargadores",
    "sourceUrl": "https://planet.gys.fr/prod-026988-/_/_/en?lang=en",
    "image": "/images/products/client-catalog/gysflash-101-12-cnt-fv-5m-cables.webp",
    "specs": [
      {
        "label": "Referencia",
        "value": "026988"
      },
      {
        "label": "Dimensiones de empaque",
        "value": "35.5*23*35 cm"
      },
      {
        "label": "Peso",
        "value": "8.6 kg"
      }
    ],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://planet.gys.fr/prod-026988-/_/_/en?lang=en"
      }
    ]
  },
  {
    "slug": "startium-480e-12-24-v",
    "name": "STARTIUM 480E - 12/24 V",
    "brand": "GYS",
    "familySlug": "mecanica-y-aire",
    "division": "Cargadores  y arrancadores de  baterias",
    "category": "Cargadores",
    "sourceUrl": "https://planet.gys.fr/prod-026483-/_/_/en?lang=en",
    "image": "/images/products/client-catalog/startium-480e-12-24-v.webp",
    "specs": [
      {
        "label": "Referencia",
        "value": "026483"
      },
      {
        "label": "Dimensiones de empaque",
        "value": "64*37*31 cm"
      },
      {
        "label": "Peso",
        "value": "28.64 kg"
      }
    ],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://planet.gys.fr/prod-026483-/_/_/en?lang=en"
      }
    ]
  },
  {
    "slug": "comprobador-de-baterias-pbt-924-compatible-start-stop",
    "name": "Comprobador de baterías  PBT 924 - compatible Start   Stop",
    "brand": "GYS",
    "familySlug": "mecanica-y-aire",
    "division": "Cargadores  y arrancadores de  baterias",
    "category": "Cargadores",
    "sourceUrl": "https://www.gys.fr/prod-088306-/-/-/es?lang=es",
    "image": "/images/products/client-catalog/comprobador-de-baterias-pbt-924-compatible-start-stop.webp",
    "specs": [
      {
        "label": "Referencia",
        "value": "088306"
      },
      {
        "label": "Dimensiones de empaque",
        "value": "47*34*12 cm"
      },
      {
        "label": "Peso",
        "value": "3.14 kg"
      }
    ],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://www.gys.fr/prod-088306-/-/-/es?lang=es"
      }
    ]
  },
  {
    "slug": "redes-aire-comprimido",
    "name": "Redes aire comprimido",
    "brand": "Prevost",
    "familySlug": "mecanica-y-aire",
    "division": "Cargadores  y arrancadores de  baterias",
    "category": "Líneas de aire comprimido",
    "sourceUrl": "https://www.prevost.es/redes-aire-comprimido-53386",
    "image": "/images/products/client-catalog/redes-aire-comprimido.webp",
    "specs": [],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://www.prevost.es/redes-aire-comprimido-53386"
      }
    ]
  },
  {
    "slug": "compresor-de-tornillo-denair-con-secador-integrado",
    "name": "Compresor de tornillo DENAIR con secador integrado",
    "brand": "Denair",
    "familySlug": "mecanica-y-aire",
    "division": "Cargadores  y arrancadores de  baterias",
    "category": "Compresores Denair",
    "sourceUrl": "",
    "image": "/images/products/client-catalog/denair-compresor-integrado.webp",
    "specs": [
      {
        "label": "Potencia disponible",
        "value": "5.5 a 22 kW"
      },
      {
        "label": "Presión máxima",
        "value": "8 a 15.5 bar"
      },
      {
        "label": "Depósito de aire",
        "value": "270 o 500 L según modelo"
      },
      {
        "label": "Nivel sonoro",
        "value": "62 a 66 dB(A) según modelo"
      },
      {
        "label": "Protección del motor",
        "value": "IP54 / IP55"
      }
    ],
    "downloads": []
  },
  {
    "slug": "deltron-nxt",
    "name": "Deltron® NXT",
    "brand": "PPG",
    "familySlug": "pintura",
    "division": "Pintura",
    "category": "PPG automotriz",
    "sourceUrl": "https://www.ppg.com/en-US/refinish/products/deltron-nxt",
    "image": "/images/products/client-catalog/deltron-nxt.webp",
    "specs": [],
    "downloads": [
      {
        "label": "Antelope Valley AQMD",
        "url": "https://assets-eu-01.kc-usercontent.com:443/cce44467-0106-013b-6c0b-26132a361492/8015bce1-0cc4-4535-aa92-af5efaa670a9/Deltron%2BAntelope%2BValley%2BAQMD%2B9%2B13.pdf"
      },
      {
        "label": "Bay Area AQMD Rule 45",
        "url": "https://assets-eu-01.kc-usercontent.com:443/cce44467-0106-013b-6c0b-26132a361492/37eddbf2-baa4-4609-83d7-83129a758947/Rule45Deltron%2B9%2B13.pdf"
      },
      {
        "label": "Canadian Nat Rule",
        "url": "https://assets-eu-01.kc-usercontent.com:443/cce44467-0106-013b-6c0b-26132a361492/d611705e-aa8d-4c04-99ca-2703208719b5/Can%2BNat%2BRule%2BDeltron%2B9%2B13.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://www.ppg.com/en-US/refinish/products/deltron-nxt"
      }
    ]
  },
  {
    "slug": "autolux",
    "name": "AUTOLUX",
    "brand": "PPG",
    "familySlug": "pintura",
    "division": "Pintura",
    "category": "PPG automotriz",
    "sourceUrl": "https://www.ppg.com/es-ES/automotive-refinish/autolux",
    "image": "/images/products/sata/jet-x/1200394-main.webp",
    "specs": [],
    "downloads": [
      {
        "label": "Canada Forced Labour Statement - PPG Canada and Architectural Coatings Canada",
        "url": "https://assets-eu-01.kc-usercontent.com:443/cce44467-0106-013b-6c0b-26132a361492/b4cca063-0fc1-4d4e-a5e4-18e834e4103c/2025%20Canada%20Forced%20Labor%20Statement%20-%20PPG%20Canada%20%28May%202026%29%20%285-14-26%20Final%29%281452604.1%29.pdf"
      },
      {
        "label": "Canada Forced Labour Statement - Ennis Paint Canada",
        "url": "https://assets-eu-01.kc-usercontent.com:443/cce44467-0106-013b-6c0b-26132a361492/943789e9-b0e7-45b6-b0bb-9e9bd20975e8/2025%20Canada%20Forced%20Labor%20Statement%20-%20Ennis%20Paint%20Canada%20%28May%202026%29%20%285-14-26%20Final%29%281452605.1%29.pdf"
      },
      {
        "label": "Canada Forced Labour Statement - Metokote Canada",
        "url": "https://assets-eu-01.kc-usercontent.com:443/cce44467-0106-013b-6c0b-26132a361492/fd67b853-8683-4cce-a2db-16152febda03/2025%20Canada%20Forced%20Labor%20Statement%20-%20Metokote%20Canada%20%28May%202026%29%20%285-14-26%20Final%29%281452606.1%29.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://www.ppg.com/es-ES/automotive-refinish/autolux"
      }
    ]
  },
  {
    "slug": "envirobase-high-performance",
    "name": "Envirobase® High Performance",
    "brand": "PPG",
    "familySlug": "pintura",
    "division": "Pintura",
    "category": "PPG automotriz",
    "sourceUrl": "https://www.ppg.com/en-US/refinish/products/envirobase-high-performance",
    "image": "/images/products/client-catalog/envirobase-high-performance.webp",
    "specs": [],
    "downloads": [
      {
        "label": "Antelope Valley AQMD",
        "url": "https://assets-eu-01.kc-usercontent.com:443/cce44467-0106-013b-6c0b-26132a361492/ccae80e3-2ea0-4371-82b2-a525f299c376/EHP%20Antelope%20Valley%20CA%20AQMD%202-2026.pdf"
      },
      {
        "label": "Bay Area AQMD Rule 45",
        "url": "https://assets-eu-01.kc-usercontent.com:443/cce44467-0106-013b-6c0b-26132a361492/41b2ecb7-c031-487a-82f1-d0ffced62e5d/EHP%20Bay%20Area%20AQMD%202-2026.pdf"
      },
      {
        "label": "Canadian National Rule",
        "url": "https://assets-eu-01.kc-usercontent.com:443/cce44467-0106-013b-6c0b-26132a361492/fbb1393c-d796-40e9-bb80-07217a17645f/EHP%20Canadian%20National%20Rule%2001%2026%20%281%29.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://www.ppg.com/en-US/refinish/products/envirobase-high-performance"
      }
    ]
  },
  {
    "slug": "ppg-versolontm",
    "name": "PPG Versolon™",
    "brand": "PPG",
    "familySlug": "pintura",
    "division": "Pintura",
    "category": "PPG industrial",
    "sourceUrl": "https://www.ppg.com/en-US/refinish/products/ppg-versolon",
    "image": "/images/products/client-catalog/ppg-versolontm.webp",
    "specs": [],
    "downloads": [
      {
        "label": "ALK-110",
        "url": "https://assets-eu-01.kc-usercontent.com:443/cce44467-0106-013b-6c0b-26132a361492/d18a4b0f-ce2f-4145-a76d-052b21621639/ALK-110%20Appl%20Guide_07-31-23.pdf"
      },
      {
        "label": "ALK-200",
        "url": "https://assets-eu-01.kc-usercontent.com:443/cce44467-0106-013b-6c0b-26132a361492/9f63c033-2bb2-426e-b126-8680b7e408a3/ALK-200%20Appl%20Guide_04-11-23.pdf"
      },
      {
        "label": "ALK-300E",
        "url": "https://assets-eu-01.kc-usercontent.com:443/cce44467-0106-013b-6c0b-26132a361492/f3881820-f3ab-4227-a7ba-832df3c3b0ad/ALK-300E%20Appl%20Guide%206-9-2023.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://www.ppg.com/en-US/refinish/products/ppg-versolon"
      }
    ]
  },
  {
    "slug": "envirocron-extreme-protection-edge-plus",
    "name": "Envirocron Extreme Protection Edge Plus",
    "brand": "PPG",
    "familySlug": "pintura",
    "division": "Pintura",
    "category": "Pintura en Polvo",
    "sourceUrl": "https://www.ppg.com/en-US/industrialcoatings/powder-coatings/envirocron-extreme-protection-edge-plus",
    "image": "/images/products/sata/jet-x/1200394-main.webp",
    "specs": [],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://www.ppg.com/en-US/industrialcoatings/powder-coatings/envirocron-extreme-protection-edge-plus"
      }
    ]
  },
  {
    "slug": "envirocron-high-transfer-efficiency-hte-powder",
    "name": "Envirocron® High Transfer Efficiency (HTE) Powder",
    "brand": "PPG",
    "familySlug": "pintura",
    "division": "Pintura",
    "category": "Pintura en Polvo",
    "sourceUrl": "https://www.ppg.com/en-US/industrialcoatings/powder-coatings/envirocron-high-transfer-efficiency",
    "image": "/images/products/client-catalog/envirocron-high-transfer-efficiency-hte-powder.webp",
    "specs": [],
    "downloads": [
      {
        "label": "Envirocron HTE product sheet",
        "url": "https://assets-eu-01.kc-usercontent.com:443/cce44467-0106-013b-6c0b-26132a361492/1da7c533-8269-4e9d-a4af-0fc5b581a6b3/Envirocron%20HTE%20-%20Sell%20Sheet.pdf"
      },
      {
        "label": "Canada Forced Labour Statement - PPG Canada and Architectural Coatings Canada",
        "url": "https://assets-eu-01.kc-usercontent.com:443/cce44467-0106-013b-6c0b-26132a361492/b4cca063-0fc1-4d4e-a5e4-18e834e4103c/2025%20Canada%20Forced%20Labor%20Statement%20-%20PPG%20Canada%20%28May%202026%29%20%285-14-26%20Final%29%281452604.1%29.pdf"
      },
      {
        "label": "Canada Forced Labour Statement - Ennis Paint Canada",
        "url": "https://assets-eu-01.kc-usercontent.com:443/cce44467-0106-013b-6c0b-26132a361492/943789e9-b0e7-45b6-b0bb-9e9bd20975e8/2025%20Canada%20Forced%20Labor%20Statement%20-%20Ennis%20Paint%20Canada%20%28May%202026%29%20%285-14-26%20Final%29%281452605.1%29.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://www.ppg.com/en-US/industrialcoatings/powder-coatings/envirocron-high-transfer-efficiency"
      }
    ]
  },
  {
    "slug": "coraflon-platinum-powder-coating",
    "name": "Coraflon® Platinum Powder Coating",
    "brand": "PPG",
    "familySlug": "pintura",
    "division": "Pintura",
    "category": "Pintura en Polvo",
    "sourceUrl": "https://www.ppg.com/en-US/industrialcoatings/powder-coatings/coraflon-platinum-powder-coating",
    "image": "/images/products/client-catalog/coraflon-platinum-powder-coating.webp",
    "specs": [],
    "downloads": [
      {
        "label": "Coraflon Platinum Product Sheet",
        "url": "https://assets-eu-01.kc-usercontent.com:443/cce44467-0106-013b-6c0b-26132a361492/6384c057-ff16-4c35-87aa-1f949bdb6c34/Coraflon%20Platinum%20Refreshed%20Sell%20Sheet__final.pdf"
      },
      {
        "label": "Coraflon Platinum Color & Gloss Study",
        "url": "https://assets-eu-01.kc-usercontent.com:443/cce44467-0106-013b-6c0b-26132a361492/7c76f090-8a7f-4dcf-9636-ae033fae0ffc/Coraflon%20Platinum%20ColorGloss_0125.pdf"
      },
      {
        "label": "Coraflon Platinum Case Study",
        "url": "https://assets-eu-01.kc-usercontent.com:443/cce44467-0106-013b-6c0b-26132a361492/7fdeeef1-45dd-4e4f-9ea0-bbcf26ebdbc3/the-tower-at-pnc-plaza-pittsburgh-pennsylvania_11.07.22.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://www.ppg.com/en-US/industrialcoatings/powder-coatings/coraflon-platinum-powder-coating"
      }
    ]
  },
  {
    "slug": "ppg-primeron",
    "name": "PPG Primeron®",
    "brand": "PPG",
    "familySlug": "pintura",
    "division": "Pintura",
    "category": "Pintura en Polvo",
    "sourceUrl": "https://www.ppg.com/en-US/industrialcoatings/primeron",
    "image": "/images/products/client-catalog/ppg-primeron.webp",
    "specs": [],
    "downloads": [
      {
        "label": "Canada Forced Labour Statement - PPG Canada and Architectural Coatings Canada",
        "url": "https://assets-eu-01.kc-usercontent.com:443/cce44467-0106-013b-6c0b-26132a361492/b4cca063-0fc1-4d4e-a5e4-18e834e4103c/2025%20Canada%20Forced%20Labor%20Statement%20-%20PPG%20Canada%20%28May%202026%29%20%285-14-26%20Final%29%281452604.1%29.pdf"
      },
      {
        "label": "Canada Forced Labour Statement - Ennis Paint Canada",
        "url": "https://assets-eu-01.kc-usercontent.com:443/cce44467-0106-013b-6c0b-26132a361492/943789e9-b0e7-45b6-b0bb-9e9bd20975e8/2025%20Canada%20Forced%20Labor%20Statement%20-%20Ennis%20Paint%20Canada%20%28May%202026%29%20%285-14-26%20Final%29%281452605.1%29.pdf"
      },
      {
        "label": "Canada Forced Labour Statement - Metokote Canada",
        "url": "https://assets-eu-01.kc-usercontent.com:443/cce44467-0106-013b-6c0b-26132a361492/fd67b853-8683-4cce-a2db-16152febda03/2025%20Canada%20Forced%20Labor%20Statement%20-%20Metokote%20Canada%20%28May%202026%29%20%285-14-26%20Final%29%281452606.1%29.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://www.ppg.com/en-US/industrialcoatings/primeron"
      }
    ]
  },
  {
    "slug": "rampas-y-elevadores-eae",
    "name": "Rampas y elevadores EAE",
    "brand": "EAE",
    "familySlug": "mecanica-y-aire",
    "division": "Mecanica",
    "category": "Rampas y elevadores  EAE",
    "sourceUrl": "",
    "image": "/images/mecanica-aire.webp",
    "specs": [],
    "downloads": []
  },
  {
    "slug": "scanner",
    "name": "Escáner de diagnóstico SUN",
    "brand": "SUN",
    "familySlug": "mecanica-y-aire",
    "division": "Mecanica",
    "category": "Scanner",
    "sourceUrl": "",
    "image": "/images/mecanica-aire.webp",
    "specs": [],
    "downloads": []
  },
  {
    "slug": "geoliner-609",
    "name": "GEOLINER® 609",
    "brand": "Hofmann",
    "familySlug": "mecanica-y-aire",
    "division": "Mecanica",
    "category": "Alineadoras",
    "sourceUrl": "https://hofmann-equipment.com/la-es/geoliner-609",
    "image": "/images/products/client-catalog/geoliner-609.webp",
    "specs": [
      {
        "label": "EAK0363J88A",
        "value": "(Kit de movilidad opcional)"
      },
      {
        "label": "EAK0363J89A",
        "value": "(Carro de almacenamiento con abrazadera)"
      }
    ],
    "downloads": [
      {
        "label": "descargar",
        "url": "https://hofmann-equipment.com/uploads/media-pdf-files/sswa23075b_geoliner-609_EU-sp[WEB].pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://hofmann-equipment.com/la-es/geoliner-609"
      }
    ]
  },
  {
    "slug": "geoliner-630",
    "name": "GEOLINER® 630",
    "brand": "Hofmann",
    "familySlug": "mecanica-y-aire",
    "division": "Mecanica",
    "category": "Alineadoras",
    "sourceUrl": "https://hofmann-equipment.com/la-es/geoliner-630",
    "image": "/images/products/client-catalog/geoliner-630.webp",
    "specs": [],
    "downloads": [
      {
        "label": "descargar",
        "url": "https://hofmann-equipment.com/uploads/media-pdf-files/sswa23087a_geoliner-630_LA-ES.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://hofmann-equipment.com/la-es/geoliner-630"
      }
    ]
  },
  {
    "slug": "monty-3300-20-smart-gp-plus",
    "name": "monty® 3300-20 SMART GP PLUS",
    "brand": "Hofmann",
    "familySlug": "mecanica-y-aire",
    "division": "Mecanica",
    "category": "Desmontadora",
    "sourceUrl": "https://hofmann-equipment.com/la-es/monty-3300-20",
    "image": "/images/products/client-catalog/monty-3300-20-smart-gp-plus.webp",
    "specs": [
      {
        "label": "EEWH765AEP",
        "value": "monty® 3300-20 SMART PLUS no tsbs"
      },
      {
        "label": "EEWH765AE9",
        "value": "monty® 3300-20 SMART EM no tsbs, plus kit"
      },
      {
        "label": "EEWH765AE1",
        "value": "monty® 3300-20 SMART no tsbs, plus kit, em"
      },
      {
        "label": "EEWH765AEG",
        "value": "monty® 3300-20 SMART GP no plus kit"
      }
    ],
    "downloads": [
      {
        "label": "descargar",
        "url": "https://hofmann-equipment.com/uploads/media-pdf-files/sswh23019 - monty 3550_LA-ES.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://hofmann-equipment.com/la-es/monty-3300-20"
      }
    ]
  },
  {
    "slug": "geodyna-7100",
    "name": "geodyna® 7100",
    "brand": "Hofmann",
    "familySlug": "mecanica-y-aire",
    "division": "Mecanica",
    "category": "Balanceadoras",
    "sourceUrl": "https://hofmann-equipment.com/la-es/geodyna-7100",
    "image": "/images/products/client-catalog/geodyna-7100.webp",
    "specs": [],
    "downloads": [
      {
        "label": "descargar",
        "url": "https://hofmann-equipment.com/uploads/media-pdf-files/sswb23028 - geodyna 7100_LA-ES.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://hofmann-equipment.com/la-es/geodyna-7100"
      }
    ]
  },
  {
    "slug": "breeze-iv",
    "name": "BREEZE IV",
    "brand": "SUN",
    "familySlug": "mecanica-y-aire",
    "division": "Mecanica",
    "category": "Aire acondicionado",
    "sourceUrl": "https://eu.sun-workshopsolutions.com/es/products/airconditioning/breeze-iv",
    "image": "/images/products/client-catalog/breeze-iv.webp",
    "specs": [],
    "downloads": [
      {
        "label": "Descargar",
        "url": "https://eu.sun-workshopsolutions.com/sites/default/files/2026-04/ssmi23041_SUN_Koolkare-ATF-Gearkare-Catalogue_EU-es_2.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://eu.sun-workshopsolutions.com/es/products/airconditioning/breeze-iv"
      }
    ]
  },
  {
    "slug": "blizzard-qtech-iv",
    "name": "BLIZZARD QTECH IV",
    "brand": "SUN",
    "familySlug": "mecanica-y-aire",
    "division": "Mecanica",
    "category": "Aire acondicionado",
    "sourceUrl": "https://eu.sun-workshopsolutions.com/es/products/airconditioning/blizzard-qtech-iv",
    "image": "/images/products/client-catalog/blizzard-qtech-iv.webp",
    "specs": [],
    "downloads": [
      {
        "label": "Descargar",
        "url": "https://eu.sun-workshopsolutions.com/sites/default/files/2026-04/ssmi23041_SUN_Koolkare-ATF-Gearkare-Catalogue_EU-es_0.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://eu.sun-workshopsolutions.com/es/products/airconditioning/blizzard-qtech-iv"
      }
    ]
  },
  {
    "slug": "ez-adas-recalibration-system",
    "name": "EZ-ADAS Recalibration System",
    "brand": "SUN",
    "familySlug": "mecanica-y-aire",
    "division": "Mecanica",
    "category": "ADAS",
    "sourceUrl": "https://eu.sun-workshopsolutions.com/es/node/1471",
    "image": "/images/products/client-catalog/ez-adas-recalibration-system.webp",
    "specs": [
      {
        "label": "Basic",
        "value": "Deluxe"
      },
      {
        "label": "Subaru®",
        "value": "√"
      },
      {
        "label": "Mitsubishi®",
        "value": "√"
      },
      {
        "label": "Audi®|Volkswagen®",
        "value": "√"
      },
      {
        "label": "Mercedes-Benz®",
        "value": "√"
      },
      {
        "label": "Honda®|Acura®",
        "value": "√"
      }
    ],
    "downloads": [
      {
        "label": "Download brochure",
        "url": "https://eu.sun-workshopsolutions.com/sites/default/files/brochure%20EZ-ADAS%20SUN%20EN.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://eu.sun-workshopsolutions.com/es/node/1471"
      }
    ]
  },
  {
    "slug": "tecnologia-ceramica",
    "name": "Lijas de tecnología cerámica",
    "brand": "Etapel",
    "familySlug": "consumibles",
    "division": "Consumibles pintura",
    "category": "Lijas",
    "sourceUrl": "",
    "image": "/images/products/sata/catalog/rps-the-original.webp",
    "specs": [],
    "downloads": []
  },
  {
    "slug": "premium",
    "name": "Premium",
    "brand": "Kovax",
    "familySlug": "consumibles",
    "division": "Consumibles pintura",
    "category": "Lijas",
    "sourceUrl": "https://en.kovax.com/products/premium/",
    "image": "/images/products/client-catalog/premium.webp",
    "specs": [],
    "downloads": [
      {
        "label": "Premium_StickonDiscRoll（Catalog）",
        "url": "https://en.kovax.com/wp-content/themes/kovax/pdf/catalog/Premium_StickonDiscRoll.pdf"
      },
      {
        "label": "Premium_SuperTackDisc（Catalog）",
        "url": "https://en.kovax.com/wp-content/themes/kovax/pdf/catalog/Premium_SuperTackDisc.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://en.kovax.com/products/premium/"
      }
    ]
  },
  {
    "slug": "sistema-buflex-eagle-abrasives",
    "name": "Sistema Buflex - Eagle Abrasives",
    "brand": "Eagle Abrasives",
    "familySlug": "consumibles",
    "division": "Consumibles pintura",
    "category": "Lijas",
    "sourceUrl": "https://eagleabrasives.com/sp/info/buflex",
    "image": "/images/products/client-catalog/sistema-buflex-eagle-abrasives.webp",
    "specs": [
      {
        "label": "Disponible en",
        "value": "Discos, Lijas"
      },
      {
        "label": "Aspiradora",
        "value": "7 Agujeros, 15 Agujeros"
      },
      {
        "label": "Aplicación",
        "value": "Pulido"
      },
      {
        "label": "Tipo de Reverso",
        "value": "Super-Tack (Fieltro), Stickon (Adhesivo)"
      }
    ],
    "downloads": [
      {
        "label": "Documentación",
        "url": "https://eagleabrasives.com/documents/flyer/ke4211_sp.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://eagleabrasives.com/sp/info/buflex"
      }
    ]
  },
  {
    "slug": "papel-de-enmascarar-premium",
    "name": "Papel de Enmascarar (Premium)",
    "brand": "Colad",
    "familySlug": "consumibles",
    "division": "Consumibles pintura",
    "category": "Enmascarado",
    "sourceUrl": "https://colad.com/es/enmascarado/papel-de-enmascarar/papel-de-enmascarar-premium",
    "image": "/images/products/client-catalog/papel-de-enmascarar-premium.webp",
    "specs": [
      {
        "label": "Marca",
        "value": "Colad"
      },
      {
        "label": "Número",
        "value": "2060xxx"
      },
      {
        "label": "Longitud del rollo",
        "value": "300 m"
      },
      {
        "label": "Ancho del rollo",
        "value": "21 - 150 cm"
      },
      {
        "label": "Material",
        "value": "papel reciclado"
      },
      {
        "label": "absorción",
        "value": "22 g/m2"
      }
    ],
    "downloads": [
      {
        "label": "398 KB",
        "url": "https://colad.com/Files/Files/product_files/technical_data_sheet/2060xxx_Colad_TDS_EN.pdf"
      },
      {
        "label": "398 KB",
        "url": "https://colad.com/Files/Files/product_files/technical_data_sheet/2060xxx_Colad_TDS_NL.pdf"
      },
      {
        "label": "400 KB",
        "url": "https://colad.com/Files/Files/product_files/technical_data_sheet/2060xxx_Colad_TDS_ES.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://colad.com/es/enmascarado/papel-de-enmascarar/papel-de-enmascarar-premium"
      }
    ]
  },
  {
    "slug": "cinta-de-enmascarar-premium",
    "name": "Cinta de Enmascarar Premium",
    "brand": "Colad",
    "familySlug": "consumibles",
    "division": "Consumibles pintura",
    "category": "Enmascarado",
    "sourceUrl": "https://colad.com/es/enmascarado/cinta-de-enmascarar/cinta-de-enmascarar-premium",
    "image": "/images/products/client-catalog/cinta-de-enmascarar-premium.webp",
    "specs": [
      {
        "label": "Marca",
        "value": "Colad"
      },
      {
        "label": "Número",
        "value": "9070xx"
      }
    ],
    "downloads": [
      {
        "label": "370 KB",
        "url": "https://colad.com/Files/Files/product_files/technical_data_sheet/technical-data-sheet_907019_LANG1.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://colad.com/es/enmascarado/cinta-de-enmascarar/cinta-de-enmascarar-premium"
      }
    ]
  },
  {
    "slug": "plastico-de-enmascarar-premium",
    "name": "Plástico de enmascarar Premium",
    "brand": "Colad",
    "familySlug": "consumibles",
    "division": "Consumibles pintura",
    "category": "Enmascarado",
    "sourceUrl": "https://colad.com/es/enmascarado/film-de-enmascarar/plastico-de-enmascarar-premium",
    "image": "/images/products/client-catalog/plastico-de-enmascarar-premium.webp",
    "specs": [
      {
        "label": "Marca",
        "value": "Colad"
      },
      {
        "label": "Número",
        "value": "6365xxx"
      },
      {
        "label": "Color",
        "value": "Transparente"
      },
      {
        "label": "Material",
        "value": "HDPE"
      },
      {
        "label": "Embalaje",
        "value": "Un rollo en una caja. En rollo en una caja de cart"
      },
      {
        "label": "Espesor",
        "value": "10 microns"
      }
    ],
    "downloads": [
      {
        "label": "528 KB",
        "url": "https://colad.com/Files/Files/product_files/technical_data_sheet/6365xxx_Colad_TDS_EN.pdf"
      },
      {
        "label": "1263 KB",
        "url": "https://colad.com/Files/Files/product_files/product_sheet/6365xxx_Colad_PDS_EN.pdf"
      },
      {
        "label": "530 KB",
        "url": "https://colad.com/Files/Files/product_files/technical_data_sheet/6365xxx_Colad_TDS_NL.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://colad.com/es/enmascarado/film-de-enmascarar/plastico-de-enmascarar-premium"
      }
    ]
  },
  {
    "slug": "protectores",
    "name": "Protectores de enmascarado",
    "brand": "Etapel",
    "familySlug": "consumibles",
    "division": "Consumibles pintura",
    "category": "Enmascarado",
    "sourceUrl": "",
    "image": "/images/products/sata/catalog/rps-the-original.webp",
    "specs": [],
    "downloads": []
  },
  {
    "slug": "compuestos-para-pulido",
    "name": "Compuestos para pulido",
    "brand": "RUPES",
    "familySlug": "consumibles",
    "division": "Consumibles pintura",
    "category": "Pulimento",
    "sourceUrl": "https://www.rupes.com/es/category-product/consumables/consumables-polishing-compounds/",
    "image": "/images/products/client-catalog/compuestos-para-pulido.webp",
    "specs": [],
    "downloads": [
      {
        "label": "Catalogo ES",
        "url": "https://www.rupes.com/catalogue/2026/RUPES_Catàlogo-2026_ES.pdf"
      },
      {
        "label": "Catalogo IT",
        "url": "https://www.rupes.com/catalogue/2026/RUPES_Catalogo-2026_IT.pdf"
      },
      {
        "label": "Catalogue EN",
        "url": "https://www.rupes.com/catalogue/2026/RUPES_Catalogue-2026_EN.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://www.rupes.com/es/category-product/consumables/consumables-polishing-compounds/"
      }
    ]
  },
  {
    "slug": "pulimento-de-corte-g3-premium",
    "name": "pulimento de corte g3 premium",
    "brand": "Farécla",
    "familySlug": "consumibles",
    "division": "Consumibles pintura",
    "category": "Pulimento",
    "sourceUrl": "https://www.farecla.com/es/products/pulimento-de-corte-g3-premium",
    "image": "/images/products/sata/catalog/rps-the-original.webp",
    "specs": [],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://www.farecla.com/es/products/pulimento-de-corte-g3-premium"
      }
    ]
  },
  {
    "slug": "compounds",
    "name": "Compounds",
    "brand": "Detroit Surface Care",
    "familySlug": "consumibles",
    "division": "Consumibles pintura",
    "category": "Pulimento",
    "sourceUrl": "https://detroitsurfacecare.com/collections/compounds-1",
    "image": "/images/products/client-catalog/compounds.webp",
    "specs": [],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://detroitsurfacecare.com/collections/compounds-1"
      }
    ]
  },
  {
    "slug": "borlas-frecla",
    "name": "borlas Frecla",
    "brand": "Farécla",
    "familySlug": "consumibles",
    "division": "Consumibles pintura",
    "category": "Pulimento",
    "sourceUrl": "https://www.farecla.com/es/products/almohadilla-de-corte-super-alto-g-mop-rojo",
    "image": "/images/products/sata/catalog/rps-the-original.webp",
    "specs": [],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://www.farecla.com/es/products/almohadilla-de-corte-super-alto-g-mop-rojo"
      }
    ]
  },
  {
    "slug": "almohadillas-de-pulido",
    "name": "Almohadillas de pulido",
    "brand": "RUPES",
    "familySlug": "consumibles",
    "division": "Consumibles pintura",
    "category": "Pulimento",
    "sourceUrl": "https://www.rupes.com/es/category-product/consumables/consumables-polishing-pads/",
    "image": "/images/products/client-catalog/almohadillas-de-pulido.webp",
    "specs": [],
    "downloads": [
      {
        "label": "Catalogo ES",
        "url": "https://www.rupes.com/catalogue/2026/RUPES_Catàlogo-2026_ES.pdf"
      },
      {
        "label": "Catalogo IT",
        "url": "https://www.rupes.com/catalogue/2026/RUPES_Catalogo-2026_IT.pdf"
      },
      {
        "label": "Catalogue EN",
        "url": "https://www.rupes.com/catalogue/2026/RUPES_Catalogue-2026_EN.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://www.rupes.com/es/category-product/consumables/consumables-polishing-pads/"
      }
    ]
  },
  {
    "slug": "disposable-nitrile-gloves-black-60-gloves",
    "name": "Disposable Nitrile Gloves Black 60 gloves",
    "brand": "Colad",
    "familySlug": "consumibles",
    "division": "Consumibles pintura",
    "category": "Seguridad Personal",
    "sourceUrl": "https://colad.com/en-gb/personal-protection/gloves/disposable-nitrile-gloves-black-60-gloves",
    "image": "/images/products/client-catalog/disposable-nitrile-gloves-black-60-gloves.webp",
    "specs": [
      {
        "label": "Brand",
        "value": "Colad"
      },
      {
        "label": "Number",
        "value": "53600x"
      },
      {
        "label": "Colour",
        "value": "Black"
      },
      {
        "label": "Sleeve length",
        "value": "285 mm"
      },
      {
        "label": "Material",
        "value": "Nitrile"
      },
      {
        "label": "Packaging",
        "value": "Dispenser box with 60 gloves"
      }
    ],
    "downloads": [
      {
        "label": "the manual.",
        "url": "https://colad.com/Files/Files/product_files/manual/manual_536000_LANG1.pdf"
      },
      {
        "label": "488 KB",
        "url": "https://colad.com/Files/Files/product_files/technical_data_sheet/53600x_Colad_TDS_EN.pdf"
      },
      {
        "label": "1559 KB",
        "url": "https://colad.com/Files/Files/product_files/product_sheet/536xxx_Colad_PDS_EN.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://colad.com/en-gb/personal-protection/gloves/disposable-nitrile-gloves-black-60-gloves"
      }
    ]
  },
  {
    "slug": "disposable-nitrile-gloves-grey",
    "name": "Disposable Nitrile Gloves Grey",
    "brand": "Colad",
    "familySlug": "consumibles",
    "division": "Consumibles pintura",
    "category": "Seguridad Personal",
    "sourceUrl": "https://colad.com/en-gb/personal-protection/gloves/disposable-nitrile-gloves-grey",
    "image": "/images/products/client-catalog/disposable-nitrile-gloves-grey.webp",
    "specs": [
      {
        "label": "Brand",
        "value": "Colad"
      },
      {
        "label": "Number",
        "value": "53820x"
      },
      {
        "label": "Colour",
        "value": "Grey"
      },
      {
        "label": "Sleeve length",
        "value": "300 mm"
      },
      {
        "label": "Material",
        "value": "Nitrile"
      },
      {
        "label": "Packaging",
        "value": "Dispenser box with 50 gloves"
      }
    ],
    "downloads": [
      {
        "label": "the manual.",
        "url": "https://colad.com/Files/Files/product_files/manual/manual_538200_LANG1.pdf"
      },
      {
        "label": "425 KB",
        "url": "https://colad.com/Files/Images/TDS_EN_53820x.pdf"
      },
      {
        "label": "165 KB",
        "url": "https://colad.com/Files/Files/product_files/declaration/declaration_538200_LANG1.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://colad.com/en-gb/personal-protection/gloves/disposable-nitrile-gloves-grey"
      }
    ]
  },
  {
    "slug": "disposable-nitrile-gloves-blue",
    "name": "Disposable Nitrile Gloves Blue",
    "brand": "Colad",
    "familySlug": "consumibles",
    "division": "Consumibles pintura",
    "category": "Seguridad Personal",
    "sourceUrl": "https://colad.com/en-gb/personal-protection/gloves/disposable-nitrile-gloves-blue",
    "image": "/images/products/client-catalog/disposable-nitrile-gloves-blue.webp",
    "specs": [
      {
        "label": "Brand",
        "value": "Colad"
      },
      {
        "label": "Number",
        "value": "53090x"
      },
      {
        "label": "Colour",
        "value": "Blue"
      },
      {
        "label": "Sleeve length",
        "value": "245 mm"
      },
      {
        "label": "Material",
        "value": "Nitrile"
      },
      {
        "label": "Packaging",
        "value": "Dispenser box with 100 gloves"
      }
    ],
    "downloads": [
      {
        "label": "Documento técnico",
        "url": "https://colad.com/Files/Images/Manual%20Glove%20Blue%20-%20100%20pcs%20(05-2025).pdf"
      },
      {
        "label": "511 KB",
        "url": "https://colad.com/Files/Files/product_files/technical_data_sheet/53090x_COLAD_TDS_EN.pdf"
      },
      {
        "label": "635 KB",
        "url": "https://colad.com/Files/Images/Manual Glove Blue - 100 pcs (05-2025).pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://colad.com/en-gb/personal-protection/gloves/disposable-nitrile-gloves-blue"
      }
    ]
  },
  {
    "slug": "industrial-neoprene-gloves",
    "name": "Industrial Neoprene Gloves",
    "brand": "Colad",
    "familySlug": "consumibles",
    "division": "Consumibles pintura",
    "category": "Seguridad Personal",
    "sourceUrl": "https://colad.com/en-gb/personal-protection/gloves/industrial-neoprene-gloves",
    "image": "/images/products/client-catalog/industrial-neoprene-gloves.webp",
    "specs": [
      {
        "label": "Brand",
        "value": "Colad"
      },
      {
        "label": "Number",
        "value": "531000x"
      },
      {
        "label": "Colour",
        "value": "Black"
      },
      {
        "label": "Material",
        "value": "Neoprene"
      },
      {
        "label": "Packaging",
        "value": "One pair in a plastic bag with size indication"
      },
      {
        "label": "Outer Packaging",
        "value": "12 pairs in a carton"
      }
    ],
    "downloads": [
      {
        "label": "the manual.",
        "url": "http://colad.com/Files/Files/product_files/manual/manual_5310000_LANG1.pdf"
      },
      {
        "label": "413 KB",
        "url": "https://colad.com/Files/Files/product_files/technical_data_sheet/technical-data-sheet_5310000_LANG1.pdf"
      },
      {
        "label": "627 KB",
        "url": "https://colad.com/Files/Files/product_files/manual/manual_5310000_LANG1.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://colad.com/en-gb/personal-protection/gloves/industrial-neoprene-gloves"
      }
    ]
  },
  {
    "slug": "industrial-nitrile-gloves",
    "name": "Industrial Nitrile Gloves",
    "brand": "Colad",
    "familySlug": "consumibles",
    "division": "Consumibles pintura",
    "category": "Seguridad Personal",
    "sourceUrl": "https://colad.com/en-gb/personal-protection/gloves/industrial-nitrile-gloves",
    "image": "/images/products/client-catalog/industrial-nitrile-gloves.webp",
    "specs": [
      {
        "label": "Brand",
        "value": "Colad"
      },
      {
        "label": "Number",
        "value": "533000x"
      },
      {
        "label": "Colour",
        "value": "green"
      },
      {
        "label": "Material",
        "value": "Nitrile"
      },
      {
        "label": "Packaging",
        "value": "One pair in a plastic bag with size indication"
      },
      {
        "label": "Outer Packaging",
        "value": "12 pairs in a carton"
      }
    ],
    "downloads": [
      {
        "label": "Documento técnico",
        "url": "http://colad.com/Files/Files/product_files/manual/manual_5330000_LANG1.pdf"
      },
      {
        "label": "454 KB",
        "url": "https://colad.com/Files/Files/product_files/technical_data_sheet/technical-data-sheet_5330000_LANG1.pdf"
      },
      {
        "label": "666 KB",
        "url": "https://colad.com/Files/Files/product_files/manual/manual_5330000_LANG1.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://colad.com/en-gb/personal-protection/gloves/industrial-nitrile-gloves"
      }
    ]
  },
  {
    "slug": "bodyguard-overall",
    "name": "BodyGuard® Overall",
    "brand": "Colad",
    "familySlug": "consumibles",
    "division": "Consumibles pintura",
    "category": "Seguridad Personal",
    "sourceUrl": "https://colad.com/en-gb/personal-protection/paint-overalls/bodyguard-overall",
    "image": "/images/products/client-catalog/bodyguard-overall.webp",
    "specs": [
      {
        "label": "Brand",
        "value": "Colad"
      },
      {
        "label": "Number",
        "value": "5200xx"
      },
      {
        "label": "Colour",
        "value": "Grey"
      },
      {
        "label": "Packaging",
        "value": "Per piece in a box"
      },
      {
        "label": "Dust free",
        "value": "Yes"
      },
      {
        "label": "Lint free",
        "value": "Yes"
      }
    ],
    "downloads": [
      {
        "label": "the manual",
        "url": "https://colad.com/Files/Files/product_files/manual/5200XX%20_%20COLAD%20_%20MANUAL_EN_NL_DE_FR_IT_ES_PT_PL_SE_V5.pdf"
      },
      {
        "label": "413 KB",
        "url": "https://colad.com/Files/Files/product_files/technical_data_sheet/5200xx_Colad_TDS_EN_V7.pdf"
      },
      {
        "label": "1852 KB",
        "url": "https://colad.com/Files/Files/product_files/product_sheet/5200XX_COLAD_PRODUCTSHEET_EN_V5.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://colad.com/en-gb/personal-protection/paint-overalls/bodyguard-overall"
      }
    ]
  },
  {
    "slug": "respirator-a1p2",
    "name": "Respirator A1P2",
    "brand": "Colad",
    "familySlug": "consumibles",
    "division": "Consumibles pintura",
    "category": "Seguridad Personal",
    "sourceUrl": "https://colad.com/en-gb/personal-protection/dust-spray-masks-head-protection/respirator-a1p2",
    "image": "/images/products/client-catalog/respirator-a1p2.webp",
    "specs": [
      {
        "label": "Brand",
        "value": "Colad"
      },
      {
        "label": "Number",
        "value": "5000"
      },
      {
        "label": "EAN",
        "value": "8714247001578"
      }
    ],
    "downloads": [
      {
        "label": "273 KB",
        "url": "https://colad.com/Files/Files/product_files/technical_data_sheet/technical-data-sheet_5000_LANG1.pdf"
      },
      {
        "label": "178 KB",
        "url": "https://colad.com/Files/Files/product_files/declaration/Art. 5000 DoC Colad EN 14-08-25.pdf"
      },
      {
        "label": "274 KB",
        "url": "https://colad.com/Files/Files/product_files/technical_data_sheet/technical-data-sheet_5000_LANG4.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://colad.com/en-gb/personal-protection/dust-spray-masks-head-protection/respirator-a1p2"
      }
    ]
  },
  {
    "slug": "coladores",
    "name": "Coladores para pintura",
    "brand": "Colad",
    "familySlug": "consumibles",
    "division": "Consumibles pintura",
    "category": "Otros",
    "sourceUrl": "",
    "image": "/images/products/sata/catalog/rps-the-original.webp",
    "specs": [],
    "downloads": []
  },
  {
    "slug": "sata-rps-0-3-l-200-m",
    "name": "SATA RPS 0.3 L — 200 µm",
    "brand": "SATA",
    "familySlug": "consumibles",
    "division": "Consumibles pintura",
    "category": "Otros",
    "sourceUrl": "https://www.sata.com/es/sistema-de-vasos-multiuso-rps-0-3-l-200-m-tamiz-de-enchufe-qcc-embalaje-de-50-unidades-para-mezclar-pintar-reutilizar-y-almacenar-sistemas-de-pintura-con-disolventes-y-base-agua/1202077",
    "image": "/images/products/client-catalog/1202077.webp",
    "specs": [],
    "downloads": [
      {
        "label": "14.10.2025 2.37 MB Folletos IT-PROSPETTI-SATA-RPS.PDF",
        "url": "https://www.sata.com/media/65/54/30/1776086104/IT-PROSPETTI-SATA-RPS.PDF.PDF?ts=1776086104"
      },
      {
        "label": "14.10.2025 1.33 MB Manual de instrucciones BETRIEBSANLEITUNG-SATA-RPS.PDF",
        "url": "https://www.sata.com/media/b1/10/73/1782472101/BETRIEBSANLEITUNG-SATA-RPS.PDF.PDF?ts=1782472101"
      },
      {
        "label": "Información del fabricante",
        "url": "https://www.sata.com/es/sistema-de-vasos-multiuso-rps-0-3-l-200-m-tamiz-de-enchufe-qcc-embalaje-de-50-unidades-para-mezclar-pintar-reutilizar-y-almacenar-sistemas-de-pintura-con-disolventes-y-base-agua/1202077"
      }
    ]
  },
  {
    "slug": "sata-rps-0-6-l-125-m",
    "name": "SATA RPS 0.6 L — 125 µm",
    "brand": "SATA",
    "familySlug": "consumibles",
    "division": "Consumibles pintura",
    "category": "Otros",
    "sourceUrl": "https://www.sata.com/es/sistema-de-vasos-multiuso-rps-0-6-l-125-m-tamiz-plano-qcc-embalaje-de-50-unidades-para-mezclar-pintar-reutilizar-y-almacenar-sistemas-de-pintura-con-disolventes-y-base-agua/1202100",
    "image": "/images/products/client-catalog/1202100.webp",
    "specs": [],
    "downloads": [
      {
        "label": "14.10.2025 2.37 MB Folletos IT-PROSPETTI-SATA-RPS.PDF",
        "url": "https://www.sata.com/media/65/54/30/1776086104/IT-PROSPETTI-SATA-RPS.PDF.PDF?ts=1776086104"
      },
      {
        "label": "14.10.2025 1.33 MB Manual de instrucciones BETRIEBSANLEITUNG-SATA-RPS.PDF",
        "url": "https://www.sata.com/media/b1/10/73/1782472101/BETRIEBSANLEITUNG-SATA-RPS.PDF.PDF?ts=1782472101"
      },
      {
        "label": "Información del fabricante",
        "url": "https://www.sata.com/es/sistema-de-vasos-multiuso-rps-0-6-l-125-m-tamiz-plano-qcc-embalaje-de-50-unidades-para-mezclar-pintar-reutilizar-y-almacenar-sistemas-de-pintura-con-disolventes-y-base-agua/1202100"
      }
    ]
  },
  {
    "slug": "sata-rps-0-9-l-200-m",
    "name": "SATA RPS 0.9 L — 200 µm",
    "brand": "SATA",
    "familySlug": "consumibles",
    "division": "Consumibles pintura",
    "category": "Otros",
    "sourceUrl": "https://www.sata.com/es/sistema-de-vasos-multiuso-rps-0-9-l-200-m-tamiz-de-enchufe-qcc-embalaje-de-50-unidades-para-mezclar-pintar-reutilizar-y-almacenar-sistemas-de-pintura-con-disolventes-y-base-agua/1202267",
    "image": "/images/products/client-catalog/1202267.webp",
    "specs": [],
    "downloads": [
      {
        "label": "14.10.2025 2.37 MB Folletos IT-PROSPETTI-SATA-RPS.PDF",
        "url": "https://www.sata.com/media/65/54/30/1776086104/IT-PROSPETTI-SATA-RPS.PDF.PDF?ts=1776086104"
      },
      {
        "label": "14.10.2025 1.33 MB Manual de instrucciones BETRIEBSANLEITUNG-SATA-RPS.PDF",
        "url": "https://www.sata.com/media/b1/10/73/1782472101/BETRIEBSANLEITUNG-SATA-RPS.PDF.PDF?ts=1782472101"
      },
      {
        "label": "Información del fabricante",
        "url": "https://www.sata.com/es/sistema-de-vasos-multiuso-rps-0-9-l-200-m-tamiz-de-enchufe-qcc-embalaje-de-50-unidades-para-mezclar-pintar-reutilizar-y-almacenar-sistemas-de-pintura-con-disolventes-y-base-agua/1202267"
      }
    ]
  },
  {
    "slug": "paper-spray-samples-with-hole",
    "name": "Paper Spray Samples with Hole",
    "brand": "Colad",
    "familySlug": "consumibles",
    "division": "Consumibles pintura",
    "category": "Otros",
    "sourceUrl": "https://colad.com/en-gb/paint-preparation/spray-samples/paper-spray-samples-with-hole",
    "image": "/images/products/client-catalog/paper-spray-samples-with-hole.webp",
    "specs": [
      {
        "label": "Brand",
        "value": "Colad"
      },
      {
        "label": "Number",
        "value": "9310"
      },
      {
        "label": "EAN",
        "value": "8714247003466"
      }
    ],
    "downloads": [
      {
        "label": "396 KB",
        "url": "https://colad.com/Files/Files/product_files/technical_data_sheet/technical-data-sheet_9310_LANG1.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://colad.com/en-gb/paint-preparation/spray-samples/paper-spray-samples-with-hole"
      }
    ]
  },
  {
    "slug": "metal-spray-samples",
    "name": "Metal Spray Samples",
    "brand": "Colad",
    "familySlug": "consumibles",
    "division": "Consumibles pintura",
    "category": "Otros",
    "sourceUrl": "https://colad.com/en-gb/paint-preparation/spray-samples/metal-spray-samples",
    "image": "/images/products/client-catalog/metal-spray-samples.webp",
    "specs": [
      {
        "label": "Brand",
        "value": "Colad"
      },
      {
        "label": "Number",
        "value": "9315xxx"
      }
    ],
    "downloads": [
      {
        "label": "321 KB",
        "url": "https://colad.com/Files/Files/product_files/technical_data_sheet/technical-data-sheet_9315_LANG1.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://colad.com/en-gb/paint-preparation/spray-samples/metal-spray-samples"
      }
    ]
  },
  {
    "slug": "toallitas-de-limpieza-sata-wet-dry",
    "name": "Toallitas de limpieza SATA wet & dry",
    "brand": "SATA",
    "familySlug": "consumibles",
    "division": "Consumibles pintura",
    "category": "Otros",
    "sourceUrl": "https://www.sata.com/es/toallitas-de-limpieza-sata-wet-dry-paquete-de-10-unidades-por-favor-tenga-en-cuenta-que-el-producto-tiene-una-fecha-de-durabilidad-limitada/75358",
    "image": "/images/products/client-catalog/toallitas-de-limpieza-sata-wet-dry-paquete-de-10-unidades-por-favor-tenga-en-cuenta-que-el-producto-tiene-una-fecha.webp",
    "specs": [],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://www.sata.com/es/toallitas-de-limpieza-sata-wet-dry-paquete-de-10-unidades-por-favor-tenga-en-cuenta-que-el-producto-tiene-una-fecha-de-durabilidad-limitada/75358"
      }
    ]
  },
  {
    "slug": "coagulante-para-lavadoras-base-agua",
    "name": "Coagulante para lavadoras base agua",
    "brand": "Etapel",
    "familySlug": "consumibles",
    "division": "Consumibles pintura",
    "category": "Otros",
    "sourceUrl": "",
    "image": "/images/products/sata/catalog/rps-the-original.webp",
    "specs": [],
    "downloads": []
  },
  {
    "slug": "poly-flex",
    "name": "Poly-Flex",
    "brand": "Evercoat",
    "familySlug": "consumibles",
    "division": "Consumibles de hojalateria",
    "category": "Masillas y rellenadores",
    "sourceUrl": "https://www.evercoat.com/es/product/polyflex/",
    "image": "/images/products/client-catalog/100411.webp",
    "specs": [],
    "downloads": [
      {
        "label": "Finishing Putties",
        "url": "https://www.evercoat.com/wp-content/uploads/2022/08/Finishing-Putty-Brochure-DIGITAL.pdf"
      },
      {
        "label": "TDS_100411_POLY_FLEX_GLAZING_PUTTY_2_2015_EN.pdf",
        "url": "https://www.evercoat.com/wp-content/uploads/2022/08/TDS_100411_POLY_FLEX_GLAZING_PUTTY_2_2015_EN.pdf"
      },
      {
        "label": "Política de Privacidad",
        "url": "https://www.evercoat.com/wp-content/uploads/2022/11/Evercoat-Privacy-Policy-11.2022.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://www.evercoat.com/es/product/polyflex/"
      }
    ]
  },
  {
    "slug": "rage-optex-gallon",
    "name": "RAGE OPTEX Gallon",
    "brand": "Evercoat",
    "familySlug": "consumibles",
    "division": "Consumibles de hojalateria",
    "category": "Masillas y rellenadores",
    "sourceUrl": "https://www.evercoat.com/es/product/rage-optex-gallon/",
    "image": "/images/products/client-catalog/100135.webp",
    "specs": [],
    "downloads": [
      {
        "label": "Aluminum Repair Best Practices",
        "url": "https://www.evercoat.com/wp-content/uploads/2022/08/AluminumRepair_Brochure_small.pdf"
      },
      {
        "label": "Rage Optex Product Brochure",
        "url": "https://www.evercoat.com/wp-content/uploads/2022/08/RageOPTEX_BodyFiller_SellSheet_WEB.pdf"
      },
      {
        "label": "TDS_100135_RAGE-OPTEX-4.2021---US-ENG.pdf",
        "url": "https://www.evercoat.com/wp-content/uploads/2022/08/RAGE-OPTEX-4.2021-US-ENG.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://www.evercoat.com/es/product/rage-optex-gallon/"
      }
    ]
  },
  {
    "slug": "lite-weight-optex-gallon",
    "name": "Lite Weight Optex Gallon",
    "brand": "Evercoat",
    "familySlug": "consumibles",
    "division": "Consumibles de hojalateria",
    "category": "Masillas y rellenadores",
    "sourceUrl": "https://www.evercoat.com/es/product/100356-lite-weight-optex-gallon/",
    "image": "/images/products/client-catalog/100356.webp",
    "specs": [],
    "downloads": [
      {
        "label": "Lite Weight OPTEX Sell Sheet",
        "url": "https://www.evercoat.com/es/wp-content/uploads/sites/2/2022/10/704479-100356-Lite-Weight-Optex-Filler-Sell-Sheet-3.2024-editable_Spanish.pdf"
      },
      {
        "label": "OPTEX Family Brochure",
        "url": "https://www.evercoat.com/wp-content/uploads/2022/09/704481_OptexFamilyBrochure_9.pdf"
      },
      {
        "label": "TDS_100356_LITE_WEIGHT_OPTEX_FILLER_9_2022_EN.pdf",
        "url": "https://www.evercoat.com/wp-content/uploads/2022/09/TDS_100356_LIGHT-WEIGHT-OPTEX-FILLER-7.2022-US-ENG.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://www.evercoat.com/es/product/100356-lite-weight-optex-gallon/"
      }
    ]
  },
  {
    "slug": "z-grip-optex-gallon",
    "name": "Z-Grip Optex Gallon",
    "brand": "Evercoat",
    "familySlug": "consumibles",
    "division": "Consumibles de hojalateria",
    "category": "Masillas y rellenadores",
    "sourceUrl": "https://www.evercoat.com/es/product/100382-z-grip-optex-gallon/",
    "image": "/images/products/sata/catalog/rps-the-original.webp",
    "specs": [],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://www.evercoat.com/es/product/100382-z-grip-optex-gallon/"
      }
    ]
  },
  {
    "slug": "spot-lite",
    "name": "Spot-Lite",
    "brand": "Evercoat",
    "familySlug": "consumibles",
    "division": "Consumibles de hojalateria",
    "category": "Masillas y rellenadores",
    "sourceUrl": "https://www.evercoat.com/es/product/spot-lite-1-2-gallon-3-3-lbs/",
    "image": "/images/products/client-catalog/100446.webp",
    "specs": [],
    "downloads": [
      {
        "label": "Finishing Putties",
        "url": "https://www.evercoat.com/wp-content/uploads/2022/08/Finishing-Putty-Brochure-DIGITAL.pdf"
      },
      {
        "label": "TDS_100445_SPOT_LITE_2_2015_EN.pdf",
        "url": "https://www.evercoat.com/wp-content/uploads/2022/08/TDS_100445_SPOT_LITE_2_2015_EN.pdf"
      },
      {
        "label": "Política de Privacidad",
        "url": "https://www.evercoat.com/wp-content/uploads/2022/11/Evercoat-Privacy-Policy-11.2022.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://www.evercoat.com/es/product/spot-lite-1-2-gallon-3-3-lbs/"
      }
    ]
  },
  {
    "slug": "masilla-acrilica-fina-beige-200gr",
    "name": "MASILLA ACRÍLICA FINA BEIGE 200gr",
    "brand": "Etapel",
    "familySlug": "consumibles",
    "division": "Consumibles de hojalateria",
    "category": "Masillas y rellenadores",
    "sourceUrl": "",
    "image": "/images/products/sata/catalog/rps-the-original.webp",
    "specs": [],
    "downloads": []
  },
  {
    "slug": "undercoating-m80-repaintable",
    "name": "Undercoating M80 - Repaintable",
    "brand": "Colad",
    "familySlug": "consumibles",
    "division": "Consumibles de hojalateria",
    "category": "Antipiedras y selladores",
    "sourceUrl": "https://www.emm.com/en-gb/repair-bonding-sealing/undercoating/undercoating-m80-repaintable",
    "image": "/images/products/client-catalog/undercoating-m80-repaintable.webp",
    "specs": [
      {
        "label": "Brand",
        "value": "Colad"
      },
      {
        "label": "Number",
        "value": "40x0"
      }
    ],
    "downloads": [
      {
        "label": "191 KB",
        "url": "https://www.emm.com/Files/Files/product_files/safety_data_sheet/4030_COLAD_SDS_SE.pdf"
      },
      {
        "label": "190 KB",
        "url": "https://www.emm.com/Files/Files/product_files/safety_data_sheet/4010_COLAD_SDS_SE.pdf"
      },
      {
        "label": "182 KB",
        "url": "https://www.emm.com/Files/Files/product_files/safety_data_sheet/4010_COLAD_SDS_EN.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://www.emm.com/en-gb/repair-bonding-sealing/undercoating/undercoating-m80-repaintable"
      }
    ]
  },
  {
    "slug": "sellador-auto-adherible-antirruido-de-25-x-50-cm-cja-c-8-pzs",
    "name": "Sellador auto adherible (antirruido) de 25 x 50 cm (Cja. c/8 pzs)",
    "brand": "Etapel",
    "familySlug": "consumibles",
    "division": "Consumibles de hojalateria",
    "category": "Antipiedras y selladores",
    "sourceUrl": "",
    "image": "/images/products/sata/catalog/rps-the-original.webp",
    "specs": [],
    "downloads": []
  },
  {
    "slug": "masilla-p-carroceria-sellador-gris",
    "name": "Masilla p/carrocería (sellador gris)",
    "brand": "Etapel",
    "familySlug": "consumibles",
    "division": "Consumibles de hojalateria",
    "category": "Antipiedras y selladores",
    "sourceUrl": "",
    "image": "/images/products/sata/catalog/rps-the-original.webp",
    "specs": [],
    "downloads": []
  },
  {
    "slug": "100-arandelas-8x16mm",
    "name": "100 ARANDELAS Ø8x16mm",
    "brand": "GYS",
    "familySlug": "consumibles",
    "division": "Consumibles de hojalateria",
    "category": "Consumibles herramientas",
    "sourceUrl": "https://planet.gys.fr/prod-049444-/_/_/es?lang=es",
    "image": "/images/products/client-catalog/100-arandelas-8x16mm.webp",
    "specs": [
      {
        "label": "Referencia",
        "value": "049444"
      },
      {
        "label": "Dimensiones de empaque",
        "value": "7.3*11.1*1.7 cm"
      },
      {
        "label": "Peso",
        "value": "0.174 kg"
      }
    ],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://planet.gys.fr/prod-049444-/_/_/es?lang=es"
      }
    ]
  },
  {
    "slug": "lapiz-de-carbon",
    "name": "Lápiz de carbón",
    "brand": "Etapel",
    "familySlug": "consumibles",
    "division": "Consumibles de hojalateria",
    "category": "Consumibles herramientas",
    "sourceUrl": "",
    "image": "/images/products/sata/catalog/rps-the-original.webp",
    "specs": [],
    "downloads": []
  },
  {
    "slug": "kit-hilo-ondulado-50-hebras-diam-1-8-long-290",
    "name": "KIT HILO ONDULADO 50 HEBRAS Diam=1.8, Long=290",
    "brand": "GYS",
    "familySlug": "consumibles",
    "division": "Consumibles de hojalateria",
    "category": "Consumibles herramientas",
    "sourceUrl": "https://planet.gys.fr/prod-049727-/_/_/es?lang=es",
    "image": "/images/products/client-catalog/kit-hilo-ondulado-50-hebras-diam-1-8-long-290.webp",
    "specs": [
      {
        "label": "Referencia",
        "value": "049727"
      },
      {
        "label": "Dimensiones de empaque",
        "value": "3*10*35 cm"
      },
      {
        "label": "Peso",
        "value": "0.62 kg"
      }
    ],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://planet.gys.fr/prod-049727-/_/_/es?lang=es"
      }
    ]
  },
  {
    "slug": "50-anillas-de-tiro-torcidas",
    "name": "50 ANILLAS DE TIRO TORCIDAS",
    "brand": "GYS",
    "familySlug": "consumibles",
    "division": "Consumibles de hojalateria",
    "category": "Consumibles herramientas",
    "sourceUrl": "https://planet.gys.fr/prod-050631-/_/_/es?lang=es",
    "image": "/images/products/client-catalog/50-anillas-de-tiro-torcidas.webp",
    "specs": [
      {
        "label": "Referencia",
        "value": "050631"
      },
      {
        "label": "Dimensiones de empaque",
        "value": "2.4*11.1*19.2 cm"
      },
      {
        "label": "Peso",
        "value": "0.346 kg"
      }
    ],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://planet.gys.fr/prod-050631-/_/_/es?lang=es"
      }
    ]
  },
  {
    "slug": "100-anillas-de-tiro-recto",
    "name": "100 ANILLAS DE TIRO RECTO",
    "brand": "GYS",
    "familySlug": "consumibles",
    "division": "Consumibles de hojalateria",
    "category": "Consumibles herramientas",
    "sourceUrl": "https://planet.gys.fr/prod-050648-/_/_/es?lang=es",
    "image": "/images/products/client-catalog/100-anillas-de-tiro-recto.webp",
    "specs": [
      {
        "label": "Referencia",
        "value": "050648"
      },
      {
        "label": "Dimensiones de empaque",
        "value": "19.6*10.8*3.4 cm"
      },
      {
        "label": "Peso",
        "value": "0.699 kg"
      }
    ],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://planet.gys.fr/prod-050648-/_/_/es?lang=es"
      }
    ]
  },
  {
    "slug": "20-estrellas-tiraclavos-proteccion-cobre",
    "name": "20 ESTRELLAS TIRACLAVOS PROTECCIÓN COBRE",
    "brand": "GYS",
    "familySlug": "consumibles",
    "division": "Consumibles de hojalateria",
    "category": "Consumibles herramientas",
    "sourceUrl": "https://planet.gys.fr/prod-052239-/_/_/es?lang=es",
    "image": "/images/products/client-catalog/20-estrellas-tiraclavos-proteccion-cobre.webp",
    "specs": [
      {
        "label": "Referencia",
        "value": "052239"
      },
      {
        "label": "Dimensiones de empaque",
        "value": "7.3*12.8*2.7 cm"
      },
      {
        "label": "Peso",
        "value": "0.331 kg"
      }
    ],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://planet.gys.fr/prod-052239-/_/_/es?lang=es"
      }
    ]
  },
  {
    "slug": "hilo-mag-acero-0-6-bobina-plastico-s200-5kg-er70s-6-g3si1",
    "name": "HILO MAG ACERO Ø0,6 - BOBINA PLÁSTICO S200 5Kg - ER70S-6 / G3Si1",
    "brand": "GYS",
    "familySlug": "consumibles",
    "division": "Consumibles de hojalateria",
    "category": "Consumibles herramientas",
    "sourceUrl": "https://planet.gys.fr/prod-086111-/_/_/es?lang=es",
    "image": "/images/products/client-catalog/hilo-mag-acero-0-6-bobina-plastico-s200-5kg-er70s-6-g3si1.webp",
    "specs": [
      {
        "label": "Referencia",
        "value": "086111"
      },
      {
        "label": "Dimensiones de empaque",
        "value": "21.5*21.5*7 cm"
      },
      {
        "label": "Peso",
        "value": "5.22 kg"
      }
    ],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://planet.gys.fr/prod-086111-/_/_/es?lang=es"
      }
    ]
  },
  {
    "slug": "broca-diam-8mm",
    "name": "Broca (diam.8mm.)",
    "brand": "Etapel",
    "familySlug": "consumibles",
    "division": "Consumibles de hojalateria",
    "category": "Consumibles herramientas",
    "sourceUrl": "",
    "image": "/images/products/sata/catalog/rps-the-original.webp",
    "specs": [],
    "downloads": []
  },
  {
    "slug": "segueta-24-dientes",
    "name": "Segueta (24-dientes)",
    "brand": "Etapel",
    "familySlug": "consumibles",
    "division": "Consumibles de hojalateria",
    "category": "Consumibles herramientas",
    "sourceUrl": "",
    "image": "/images/products/sata/catalog/rps-the-original.webp",
    "specs": [],
    "downloads": []
  },
  {
    "slug": "82202-air-caulking-gun",
    "name": "82202 — Air Caulking Gun",
    "brand": "PneuTrend",
    "familySlug": "soldadura-y-enderezado",
    "division": "Herramientas hojalateria",
    "category": "Neumáticas",
    "sourceUrl": "https://www.pneutrend.com.tw/product.aspx?productid=2098",
    "image": "/images/products/client-catalog/82202-air-caulking-gun.webp",
    "specs": [
      {
        "label": "Modelo",
        "value": "82202"
      },
      {
        "label": "Capacity",
        "value": "310 ml (11 oz) Cartridge"
      },
      {
        "label": "Tube ID",
        "value": "50 mm (2\")"
      },
      {
        "label": "Tube Length",
        "value": "210 mm (8.25\")"
      },
      {
        "label": "Working Pressure",
        "value": "4 Bar (58 PSI)"
      },
      {
        "label": "Air Consumption",
        "value": "200 ~ 300 LPM"
      },
      {
        "label": "Length",
        "value": "310 mm (12.2\")"
      }
    ],
    "downloads": [
      {
        "label": "Partlist",
        "url": "https://ftp.pneutrend.com.tw/PTI-82202(B008).pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://www.pneutrend.com.tw/product.aspx?productid=2098"
      }
    ]
  },
  {
    "slug": "82100-punch-flange-tool",
    "name": "82100 — Punch & Flange Tool",
    "brand": "PneuTrend",
    "familySlug": "soldadura-y-enderezado",
    "division": "Herramientas hojalateria",
    "category": "Neumáticas",
    "sourceUrl": "https://www.pneutrend.com.tw/product.aspx?productid=3577",
    "image": "/images/products/client-catalog/82100-punch-flange-tool.webp",
    "specs": [
      {
        "label": "Modelo",
        "value": "82100"
      },
      {
        "label": "Flange Capacity",
        "value": "1.6 mm (1/16\")"
      },
      {
        "label": "Punch Capacity",
        "value": "5 mm (0.2\")"
      },
      {
        "label": "Air Consumption",
        "value": "6 LPM (0.2 CFM)"
      },
      {
        "label": "Noise LpA / LwA",
        "value": "81.5 DB / 92.5 DB"
      },
      {
        "label": "Vibration",
        "value": "< 2.5 m/s2"
      },
      {
        "label": "Length",
        "value": "242 mm (9.53\")"
      }
    ],
    "downloads": [
      {
        "label": "Partlist",
        "url": "https://ftp.pneutrend.com.tw/PTI-82100(Q001).pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://www.pneutrend.com.tw/product.aspx?productid=3577"
      }
    ]
  },
  {
    "slug": "74020-1-4-angle-die-grinder",
    "name": "74020 — 1/4\" Angle Die Grinder",
    "brand": "PneuTrend",
    "familySlug": "soldadura-y-enderezado",
    "division": "Herramientas hojalateria",
    "category": "Neumáticas",
    "sourceUrl": "https://www.pneutrend.com.tw/product.aspx?productid=2439",
    "image": "/images/products/client-catalog/74020-1-4-angle-die-grinder.webp",
    "specs": [
      {
        "label": "Modelo",
        "value": "74020"
      },
      {
        "label": "Free Speed",
        "value": "20,000 RPM"
      },
      {
        "label": "Collet",
        "value": "6 mm or 1/4¨"
      },
      {
        "label": "Power",
        "value": "0.22 KW (0.3 HP)"
      },
      {
        "label": "Air Inlet",
        "value": "1/4¨"
      },
      {
        "label": "Air Consumsion",
        "value": "60 LPM (2.1 CFM)"
      },
      {
        "label": "Noise LpA / LwA",
        "value": "77.3 DB / 88.3 DB"
      }
    ],
    "downloads": [
      {
        "label": "Partlist",
        "url": "https://ftp.pneutrend.com.tw/PTI-74020(R009).pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://www.pneutrend.com.tw/product.aspx?productid=2439"
      }
    ]
  },
  {
    "slug": "71000-1-4-die-grinder",
    "name": "71000 — 1/4\" Die Grinder",
    "brand": "PneuTrend",
    "familySlug": "soldadura-y-enderezado",
    "division": "Herramientas hojalateria",
    "category": "Neumáticas",
    "sourceUrl": "https://www.pneutrend.com.tw/product.aspx?productid=2032",
    "image": "/images/products/client-catalog/71000-1-4-die-grinder.webp",
    "specs": [
      {
        "label": "Modelo",
        "value": "71000"
      },
      {
        "label": "Free Speed",
        "value": "22,000 RPM"
      },
      {
        "label": "Collet",
        "value": "6 mm or 1/4¨"
      },
      {
        "label": "Power",
        "value": "0.37 KW (0.5 HP)"
      },
      {
        "label": "Air Inlet",
        "value": "1/4¨"
      },
      {
        "label": "Air Consumption",
        "value": "62 LPM (2.2 CFM)"
      },
      {
        "label": "Noise LpA / LwA",
        "value": "87.0 DB / 98.0 DB"
      }
    ],
    "downloads": [
      {
        "label": "Partlist",
        "url": "https://ftp.pneutrend.com.tw/PTI-71000(W004).pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://www.pneutrend.com.tw/product.aspx?productid=2032"
      }
    ]
  },
  {
    "slug": "14200b-3-8-palm-ratchet-wrench",
    "name": "14200B — 3/8\" Palm Ratchet Wrench",
    "brand": "PneuTrend",
    "familySlug": "soldadura-y-enderezado",
    "division": "Herramientas hojalateria",
    "category": "Neumáticas",
    "sourceUrl": "https://www.pneutrend.com.tw/product.aspx?productid=1919",
    "image": "/images/products/client-catalog/14200b-3-8-palm-ratchet-wrench.webp",
    "specs": [
      {
        "label": "Modelo",
        "value": "14200B"
      },
      {
        "label": "Speed",
        "value": "300 RPM"
      },
      {
        "label": "Max. Torque",
        "value": "30 Nm (22 ft-lb)"
      },
      {
        "label": "Air Inlet",
        "value": "1/4\""
      },
      {
        "label": "Air Consumption",
        "value": "110 LPM (3.89 CFM)"
      },
      {
        "label": "Noise LpA / LwA",
        "value": "85.5 DB / 96.5 DB"
      },
      {
        "label": "Vibration",
        "value": "4.29 m/s2"
      }
    ],
    "downloads": [
      {
        "label": "DM",
        "url": "https://ftp.pneutrend.com.tw/2023_P20_Ratchet.pdf"
      },
      {
        "label": "Partlist",
        "url": "https://ftp.pneutrend.com.tw/PTI-14200B(W004).pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://www.pneutrend.com.tw/product.aspx?productid=1919"
      }
    ]
  },
  {
    "slug": "80031-air-body-saw",
    "name": "80031 — Air Body Saw",
    "brand": "PneuTrend",
    "familySlug": "soldadura-y-enderezado",
    "division": "Herramientas hojalateria",
    "category": "Neumáticas",
    "sourceUrl": "https://www.pneutrend.com.tw/product.aspx?productid=2073",
    "image": "/images/products/client-catalog/80031-air-body-saw.webp",
    "specs": [
      {
        "label": "Modelo",
        "value": "80031"
      },
      {
        "label": "Free Speed",
        "value": "10,000 BPM"
      },
      {
        "label": "Air Inlet",
        "value": "1/4¨"
      },
      {
        "label": "Stroke",
        "value": "10 mm (0.4¨)"
      },
      {
        "label": "Air Hose I.D.",
        "value": "3/8¨"
      },
      {
        "label": "Air Consumption",
        "value": "160 LPM (5.6 CFM)"
      },
      {
        "label": "Noise LpA / LwA",
        "value": "81.1 DB / 92.1 DB"
      }
    ],
    "downloads": [
      {
        "label": "DM",
        "url": "https://ftp.pneutrend.com.tw/2019_P44.pdf"
      },
      {
        "label": "Partlist",
        "url": "https://ftp.pneutrend.com.tw/PTI-80031(R002).pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://www.pneutrend.com.tw/product.aspx?productid=2073"
      }
    ]
  },
  {
    "slug": "80038-vibration-reduced-air-saw",
    "name": "80038 — Vibration Reduced Air Saw",
    "brand": "PneuTrend",
    "familySlug": "soldadura-y-enderezado",
    "division": "Herramientas hojalateria",
    "category": "Neumáticas",
    "sourceUrl": "https://www.pneutrend.com.tw/product.aspx?productid=3223",
    "image": "/images/products/client-catalog/80038-vibration-reduced-air-saw.webp",
    "specs": [
      {
        "label": "Modelo",
        "value": "80038"
      },
      {
        "label": "Speed",
        "value": "10,000 BPM"
      },
      {
        "label": "Stroke",
        "value": "10 mm (0.4\")"
      },
      {
        "label": "Air Consumption",
        "value": "65 LPM /(2.3 CFM)"
      },
      {
        "label": "Air Inlet",
        "value": "1/4\""
      },
      {
        "label": "Vibration",
        "value": "2.28 m/s2"
      },
      {
        "label": "Noise LpA / LwA",
        "value": "83.9 DB / 94.9 DB"
      }
    ],
    "downloads": [
      {
        "label": "DM",
        "url": "https://ftp.pneutrend.com.tw/2019_P44.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://www.pneutrend.com.tw/product.aspx?productid=3223"
      }
    ]
  },
  {
    "slug": "55010-belt-sander-10-x-330-mm",
    "name": "55010 — Belt Sander (10 x 330 mm)",
    "brand": "PneuTrend",
    "familySlug": "soldadura-y-enderezado",
    "division": "Herramientas hojalateria",
    "category": "Neumáticas",
    "sourceUrl": "https://www.pneutrend.com.tw/product.aspx?productid=1997",
    "image": "/images/products/client-catalog/55010-belt-sander-10-x-330-mm.webp",
    "specs": [
      {
        "label": "Modelo",
        "value": "55010"
      },
      {
        "label": "Free Speed",
        "value": "18,000 RPM"
      },
      {
        "label": "Belt Size",
        "value": "10 x 330 mm (3/8¨ x 13¨)"
      }
    ],
    "downloads": [
      {
        "label": "Partlist",
        "url": "https://ftp.pneutrend.com.tw/PTI-55010(R002).pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://www.pneutrend.com.tw/product.aspx?productid=1997"
      }
    ]
  },
  {
    "slug": "33500-1-air-spot-drill-with-hook",
    "name": "33500-1 — Air Spot Drill with Hook",
    "brand": "PneuTrend",
    "familySlug": "soldadura-y-enderezado",
    "division": "Herramientas hojalateria",
    "category": "Neumáticas",
    "sourceUrl": "https://www.pneutrend.com.tw/product.aspx?productid=1946",
    "image": "/images/products/client-catalog/33500-1-air-spot-drill-with-hook.webp",
    "specs": [
      {
        "label": "Modelo",
        "value": "33500-1"
      },
      {
        "label": "Free Speed",
        "value": "1,600 RPM"
      },
      {
        "label": "Air Inlet",
        "value": "1/4\""
      },
      {
        "label": "Air Hose I.D.",
        "value": "3/8\""
      },
      {
        "label": "Exhaust",
        "value": "Handle"
      },
      {
        "label": "Air Consumption",
        "value": "71 LPM (2.5 CFM)"
      },
      {
        "label": "Noise LpA / LwA",
        "value": "92.8 DB / 103.8 DB"
      }
    ],
    "downloads": [
      {
        "label": "Partlist",
        "url": "https://ftp.pneutrend.com.tw/PTI-33500-1(Q001).pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://www.pneutrend.com.tw/product.aspx?productid=1946"
      }
    ]
  },
  {
    "slug": "24238-1-2-stubby-impact-wrench-ecd",
    "name": "24238 — 1/2\" Stubby Impact Wrench (ECD)",
    "brand": "PneuTrend",
    "familySlug": "soldadura-y-enderezado",
    "division": "Herramientas hojalateria",
    "category": "Neumáticas",
    "sourceUrl": "https://www.pneutrend.com.tw/product.aspx?productid=3042",
    "image": "/images/products/client-catalog/24238-1-2-stubby-impact-wrench-ecd.webp",
    "specs": [
      {
        "label": "Modelo",
        "value": "24238"
      },
      {
        "label": "Drive Size",
        "value": "1/2\""
      },
      {
        "label": "Free Speed",
        "value": "10,000 RPM"
      },
      {
        "label": "Max Torque",
        "value": "816 NM (600 ft-lb)"
      },
      {
        "label": "Clutch Type",
        "value": "Twin Hammer"
      },
      {
        "label": "Air Inlet",
        "value": "1/4\""
      },
      {
        "label": "Air Hose ID",
        "value": "3/8\""
      }
    ],
    "downloads": [
      {
        "label": "DM",
        "url": "https://ftp.pneutrend.com.tw/2023_P11_ECD.pdf"
      },
      {
        "label": "Partlist",
        "url": "https://ftp.pneutrend.com.tw/PTI-24238(C003).pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://www.pneutrend.com.tw/product.aspx?productid=3042"
      }
    ]
  },
  {
    "slug": "b-41102hk-190-mm-barrel-air-hammer-combo-kit-hex-shank",
    "name": "B-41102HK — 190 mm Barrel Air Hammer Combo Kit (Hex. Shank)",
    "brand": "PneuTrend",
    "familySlug": "soldadura-y-enderezado",
    "division": "Herramientas hojalateria",
    "category": "Neumáticas",
    "sourceUrl": "https://www.pneutrend.com.tw/product.aspx?productid=1952",
    "image": "/images/products/client-catalog/b-41102hk-190-mm-barrel-air-hammer-combo-kit-hex-shank.webp",
    "specs": [
      {
        "label": "Modelo",
        "value": "B-41102HK"
      },
      {
        "label": "Chisel Shank",
        "value": "10 mm (0.4¨) Hex."
      },
      {
        "label": "Speed",
        "value": "3,500 BPM"
      },
      {
        "label": "Stroke",
        "value": "66 mm (2-5/8¨)"
      },
      {
        "label": "Air Inlet",
        "value": "1/4¨"
      },
      {
        "label": "Air Hose I.D.",
        "value": "3/8¨"
      },
      {
        "label": "Noise LpA / LwA",
        "value": "103 DB / 114 DB"
      }
    ],
    "downloads": [
      {
        "label": "Partlist",
        "url": "https://ftp.pneutrend.com.tw/PTI-41102(B008).pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://www.pneutrend.com.tw/product.aspx?productid=1952"
      }
    ]
  },
  {
    "slug": "cofre-cilindro-hidraulico-10t-pro",
    "name": "COFRE CILINDRO HIDRÁULICO 10T PRO",
    "brand": "GYS",
    "familySlug": "soldadura-y-enderezado",
    "division": "Herramientas hojalateria",
    "category": "Eléctricas",
    "sourceUrl": "https://planet.gys.fr/prod-057449-/_/_/es?lang=es",
    "image": "/images/products/client-catalog/cofre-cilindro-hidraulico-10t-pro.webp",
    "specs": [
      {
        "label": "Referencia",
        "value": "057449"
      },
      {
        "label": "Dimensiones de empaque",
        "value": "96*41*20 cm"
      },
      {
        "label": "Peso",
        "value": "34 kg"
      }
    ],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://planet.gys.fr/prod-057449-/_/_/es?lang=es"
      }
    ]
  },
  {
    "slug": "c-7dw136",
    "name": "C-7DW136",
    "brand": "Jonnesway",
    "familySlug": "soldadura-y-enderezado",
    "division": "Herramientas hojalateria",
    "category": "Carritos de herramientas",
    "sourceUrl": "https://www.jonnesway.com/en_US/product/show_products.asp?catalog=1&subtree=32&p=049135113054141035060041050115118033192066235215252149133167110",
    "image": "/images/products/client-catalog/c-7dw136.webp",
    "specs": [],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://www.jonnesway.com/en_US/product/show_products.asp?catalog=1&subtree=32&p=049135113054141035060041050115118033192066235215252149133167110"
      }
    ]
  },
  {
    "slug": "carrito-sun-para-electricos",
    "name": "Carrito SUN para electricos",
    "brand": "SUN",
    "familySlug": "soldadura-y-enderezado",
    "division": "Herramientas hojalateria",
    "category": "Carritos de herramientas",
    "sourceUrl": "",
    "image": "/images/category-soldadoras.webp",
    "specs": [],
    "downloads": []
  },
  {
    "slug": "garlopas-shinemate",
    "name": "Garlopas shinemate",
    "brand": "ShineMate",
    "familySlug": "soldadura-y-enderezado",
    "division": "Herramientas hojalateria",
    "category": "Manuales??",
    "sourceUrl": "",
    "image": "/images/category-soldadoras.webp",
    "specs": [],
    "downloads": []
  },
  {
    "slug": "file-with-handle",
    "name": "File with handle",
    "brand": "Wieländer+Schill",
    "familySlug": "soldadura-y-enderezado",
    "division": "Herramientas hojalateria",
    "category": "Manuales??",
    "sourceUrl": "https://www.wielanderschill.com/en/file-with-handle-cut-3-fine-521203",
    "image": "/images/products/client-catalog/file-with-handle.webp",
    "specs": [
      {
        "label": "Content",
        "value": "2-piece, 1 set"
      },
      {
        "label": "Length × width × height",
        "value": "420 x 35 x 35 mm"
      },
      {
        "label": "Material",
        "value": "Hardened steel, Plastic, Steel, kunststoff"
      },
      {
        "label": "Weight",
        "value": "0,650 kg"
      }
    ],
    "downloads": [
      {
        "label": "Repair Order",
        "url": "https://www.wielanderschill.com/media/a2/33/b8/1702030534/Repair_order.pdf"
      },
      {
        "label": "ISO 9001",
        "url": "https://www.wielanderschill.com/media/29/c3/30/1689167023/ISO_9001_2024-07-19_gb.pdf"
      },
      {
        "label": "ISO 14001",
        "url": "https://www.wielanderschill.com/media/30/43/83/1689166782/ISO_14001_2022-05-23_gb.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://www.wielanderschill.com/en/file-with-handle-cut-3-fine-521203"
      }
    ]
  },
  {
    "slug": "file-with-handle-2",
    "name": "File with handle",
    "brand": "Wieländer+Schill",
    "familySlug": "soldadura-y-enderezado",
    "division": "Herramientas hojalateria",
    "category": "Manuales??",
    "sourceUrl": "https://www.wielanderschill.com/en/file-with-handle-cut-1-medium-521201",
    "image": "/images/products/client-catalog/file-with-handle-228.webp",
    "specs": [
      {
        "label": "Content",
        "value": "2-piece, 1 set"
      },
      {
        "label": "Length × width × height",
        "value": "425 x 35 x 30 mm"
      },
      {
        "label": "Material",
        "value": "Hardened steel, Plastic, Steel, kunststoff"
      },
      {
        "label": "Weight",
        "value": "0,610 kg"
      }
    ],
    "downloads": [
      {
        "label": "Repair Order",
        "url": "https://www.wielanderschill.com/media/a2/33/b8/1702030534/Repair_order.pdf"
      },
      {
        "label": "ISO 9001",
        "url": "https://www.wielanderschill.com/media/29/c3/30/1689167023/ISO_9001_2024-07-19_gb.pdf"
      },
      {
        "label": "ISO 14001",
        "url": "https://www.wielanderschill.com/media/30/43/83/1689166782/ISO_14001_2022-05-23_gb.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://www.wielanderschill.com/en/file-with-handle-cut-1-medium-521201"
      }
    ]
  },
  {
    "slug": "japanese-putty-knives",
    "name": "Japanese Putty Knives",
    "brand": "Colad",
    "familySlug": "soldadura-y-enderezado",
    "division": "Herramientas hojalateria",
    "category": "Manuales??",
    "sourceUrl": "https://www.emm.com/en-gb/putties-uv/accessories/japanese-putty-knives",
    "image": "/images/products/client-catalog/japanese-putty-knives.webp",
    "specs": [
      {
        "label": "Brand",
        "value": "Colad"
      },
      {
        "label": "Number",
        "value": "9100"
      },
      {
        "label": "EAN",
        "value": "8714247003152"
      }
    ],
    "downloads": [
      {
        "label": "259 KB",
        "url": "https://www.emm.com/Files/Files/product_files/technical_data_sheet/technical-data-sheet_9100_LANG1.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://www.emm.com/en-gb/putties-uv/accessories/japanese-putty-knives"
      }
    ]
  },
  {
    "slug": "plastic-spreader",
    "name": "Plastic Spreader",
    "brand": "Colad",
    "familySlug": "soldadura-y-enderezado",
    "division": "Herramientas hojalateria",
    "category": "Manuales??",
    "sourceUrl": "https://www.emm.com/en-gb/putties-uv/accessories/plastic-spreader",
    "image": "/images/products/client-catalog/plastic-spreader.webp",
    "specs": [
      {
        "label": "Brand",
        "value": "Colad"
      },
      {
        "label": "Number",
        "value": "910x"
      }
    ],
    "downloads": [
      {
        "label": "274 KB",
        "url": "https://www.emm.com/Files/Files/product_files/technical_data_sheet/technical-data-sheet_9105_LANG1.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://www.emm.com/en-gb/putties-uv/accessories/plastic-spreader"
      }
    ]
  },
  {
    "slug": "orbital-polisher-eb351-5-15-shinemate-global",
    "name": "Orbital Polisher EB351-5/15-ShineMate Global",
    "brand": "ShineMate",
    "familySlug": "pintura",
    "division": "Detallado",
    "category": "Pulidoras",
    "sourceUrl": "https://shinemate.com/products/info/2.html",
    "image": "/images/products/client-catalog/orbital-polisher-eb351-5-15-shinemate-global.webp",
    "specs": [],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://shinemate.com/products/info/2.html"
      }
    ]
  },
  {
    "slug": "rotary-polisher-ep802-shinemate-global",
    "name": "Rotary Polisher EP802-ShineMate Global",
    "brand": "ShineMate",
    "familySlug": "pintura",
    "division": "Detallado",
    "category": "Pulidoras",
    "sourceUrl": "https://shinemate.com/products/info/17.html",
    "image": "/images/products/client-catalog/rotary-polisher-ep802-shinemate-global.webp",
    "specs": [],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://shinemate.com/products/info/17.html"
      }
    ]
  },
  {
    "slug": "orbital-polisher-ex603-shinemate-global",
    "name": "Orbital Polisher EX603-ShineMate Global",
    "brand": "ShineMate",
    "familySlug": "pintura",
    "division": "Detallado",
    "category": "Pulidoras",
    "sourceUrl": "https://shinemate.com/products/info/34.html",
    "image": "/images/products/client-catalog/orbital-polisher-ex603-shinemate-global.webp",
    "specs": [],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://shinemate.com/products/info/34.html"
      }
    ]
  },
  {
    "slug": "orbital-polisher-eb350-5-9-shinemate-global",
    "name": "Orbital Polisher EB350-5/9-ShineMate Global",
    "brand": "ShineMate",
    "familySlug": "pintura",
    "division": "Detallado",
    "category": "Pulidoras",
    "sourceUrl": "https://shinemate.com/products/info/22.html",
    "image": "/images/products/client-catalog/orbital-polisher-eb350-5-9-shinemate-global.webp",
    "specs": [],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://shinemate.com/products/info/22.html"
      }
    ]
  },
  {
    "slug": "mini-pulidora-orbital-neumatica-aletoria-lhr75",
    "name": "MINI PULIDORA ORBITAL NEUMATICA ALETORIA LHR75",
    "brand": "RUPES",
    "familySlug": "pintura",
    "division": "Detallado",
    "category": "Pulidoras",
    "sourceUrl": "https://www.rupes.com/es/product/pneumatic-mini-random-orbital-polisher-15mm-orbit-lhr75/",
    "image": "/images/products/client-catalog/mini-pulidora-orbital-neumatica-aletoria-lhr75.webp",
    "specs": [
      {
        "label": "Regulación de la velocidad",
        "value": "•"
      },
      {
        "label": "Consumo max de aire (l/min)",
        "value": "320"
      },
      {
        "label": "Peso (kg)",
        "value": "0,650"
      },
      {
        "label": "R.P.M.",
        "value": "0 – 11000"
      },
      {
        "label": "Presión de trabajo (bar)",
        "value": "6"
      },
      {
        "label": "Ø órbita (mm)",
        "value": "15"
      }
    ],
    "downloads": [
      {
        "label": "Catalogo ES",
        "url": "https://www.rupes.com/catalogue/2026/RUPES_Catàlogo-2026_ES.pdf"
      },
      {
        "label": "Catalogo IT",
        "url": "https://www.rupes.com/catalogue/2026/RUPES_Catalogo-2026_IT.pdf"
      },
      {
        "label": "Catalogue EN",
        "url": "https://www.rupes.com/catalogue/2026/RUPES_Catalogue-2026_EN.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://www.rupes.com/es/product/pneumatic-mini-random-orbital-polisher-15mm-orbit-lhr75/"
      }
    ]
  },
  {
    "slug": "pulidora-orbital-aletoria-bigfoot-lhr21-mark-iii",
    "name": "PULIDORA ORBITAL ALETORIA - Bigfoot LHR21 Mark III",
    "brand": "RUPES",
    "familySlug": "pintura",
    "division": "Detallado",
    "category": "Pulidoras",
    "sourceUrl": "https://www.rupes.com/es/product/lhr21iii/",
    "image": "/images/products/client-catalog/pulidora-orbital-aletoria-bigfoot-lhr21-mark-iii.webp",
    "specs": [
      {
        "label": "Ø platillo (mm/in)",
        "value": "180"
      },
      {
        "label": "Ø orbita (mm)",
        "value": "21-13/16”"
      },
      {
        "label": "Potencia (W)",
        "value": "500"
      },
      {
        "label": "R.P.M.",
        "value": "3000 – 4500"
      },
      {
        "label": "Peso (Kg/lbs)",
        "value": "2,7 – 5,95"
      },
      {
        "label": "Regulación electrónica de la velocidad",
        "value": "•"
      }
    ],
    "downloads": [
      {
        "label": "Catalogo ES",
        "url": "https://www.rupes.com/catalogue/2026/RUPES_Catàlogo-2026_ES.pdf"
      },
      {
        "label": "Catalogo IT",
        "url": "https://www.rupes.com/catalogue/2026/RUPES_Catalogo-2026_IT.pdf"
      },
      {
        "label": "Catalogue EN",
        "url": "https://www.rupes.com/catalogue/2026/RUPES_Catalogue-2026_EN.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://www.rupes.com/es/product/lhr21iii/"
      }
    ]
  },
  {
    "slug": "pulidora-orbital-aleatoria-bigfoot-lhr15-mark-v",
    "name": "Pulidora orbital aleatoria BigFoot LHR15 Mark V",
    "brand": "RUPES",
    "familySlug": "pintura",
    "division": "Detallado",
    "category": "Pulidoras",
    "sourceUrl": "https://www.rupes.com/es/product/random-orbital-polisher-bigfoot-lhr15-mark-v/",
    "image": "/images/products/client-catalog/pulidora-orbital-aleatoria-bigfoot-lhr15-mark-v.webp",
    "specs": [
      {
        "label": "Ø backing pad (mm/in)",
        "value": "125 – 5″"
      },
      {
        "label": "Ø orbit (mm/in)",
        "value": "15-19/32”"
      },
      {
        "label": "Power (W)",
        "value": "500"
      },
      {
        "label": "R.P.M.",
        "value": "3000 – 5200"
      },
      {
        "label": "Weight (Kg/lbs)",
        "value": "2,35 – 5,18"
      },
      {
        "label": "Speed control",
        "value": "•"
      }
    ],
    "downloads": [
      {
        "label": "Catalogo ES",
        "url": "https://www.rupes.com/catalogue/2026/RUPES_Catàlogo-2026_ES.pdf"
      },
      {
        "label": "Catalogo IT",
        "url": "https://www.rupes.com/catalogue/2026/RUPES_Catalogo-2026_IT.pdf"
      },
      {
        "label": "Catalogue EN",
        "url": "https://www.rupes.com/catalogue/2026/RUPES_Catalogue-2026_EN.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://www.rupes.com/es/product/random-orbital-polisher-bigfoot-lhr15-mark-v/"
      }
    ]
  },
  {
    "slug": "diamond-foam-pad-t120-shinemate-global",
    "name": "Diamond Foam Pad T120-ShineMate Global",
    "brand": "ShineMate",
    "familySlug": "pintura",
    "division": "Detallado",
    "category": "Pulidoras",
    "sourceUrl": "https://shinemate.com/products/info/56.html",
    "image": "/images/products/client-catalog/diamond-foam-pad-t120-shinemate-global.webp",
    "specs": [],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://shinemate.com/products/info/56.html"
      }
    ]
  },
  {
    "slug": "diamond-foam-pad-t10",
    "name": "Diamond Foam Pad T10",
    "brand": "ShineMate",
    "familySlug": "pintura",
    "division": "Detallado",
    "category": "Pulidoras",
    "sourceUrl": "https://shinemate.com/products/info/52.html",
    "image": "/images/products/sata/jet-x/1200394-main.webp",
    "specs": [],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://shinemate.com/products/info/52.html"
      }
    ]
  },
  {
    "slug": "flat-face-foam-pad-t120-shinemate-global",
    "name": "Flat-face Foam Pad T120-ShineMate Global",
    "brand": "ShineMate",
    "familySlug": "pintura",
    "division": "Detallado",
    "category": "Pulidoras",
    "sourceUrl": "https://shinemate.com/products/info/69.html",
    "image": "/images/products/client-catalog/flat-face-foam-pad-t120-shinemate-global.webp",
    "specs": [],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://shinemate.com/products/info/69.html"
      }
    ]
  },
  {
    "slug": "flat-face-foam-pad-t80-shinemate-global",
    "name": "Flat-face Foam Pad T80-ShineMate Global",
    "brand": "ShineMate",
    "familySlug": "pintura",
    "division": "Detallado",
    "category": "Pulidoras",
    "sourceUrl": "https://shinemate.com/products/info/68.html",
    "image": "/images/products/client-catalog/flat-face-foam-pad-t80-shinemate-global.webp",
    "specs": [],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://shinemate.com/products/info/68.html"
      }
    ]
  },
  {
    "slug": "flat-face-foam-pad-t10-shinemate-global",
    "name": "Flat-face Foam Pad T10-ShineMate Global",
    "brand": "ShineMate",
    "familySlug": "pintura",
    "division": "Detallado",
    "category": "Pulidoras",
    "sourceUrl": "https://shinemate.com/products/info/64.html",
    "image": "/images/products/client-catalog/flat-face-foam-pad-t10-shinemate-global.webp",
    "specs": [],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://shinemate.com/products/info/64.html"
      }
    ]
  },
  {
    "slug": "heavy-cut-wool-pad-t160-shinemate-global",
    "name": "Heavy-Cut Wool Pad T160-ShineMate Global",
    "brand": "ShineMate",
    "familySlug": "pintura",
    "division": "Detallado",
    "category": "Pulidoras",
    "sourceUrl": "https://shinemate.com/products/info/59.html",
    "image": "/images/products/client-catalog/heavy-cut-wool-pad-t160-shinemate-global.webp",
    "specs": [],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://shinemate.com/products/info/59.html"
      }
    ]
  },
  {
    "slug": "heavy-cut-wool-pad-t140-shinemate-global",
    "name": "Heavy-Cut Wool Pad T140-ShineMate Global",
    "brand": "ShineMate",
    "familySlug": "pintura",
    "division": "Detallado",
    "category": "Pulidoras",
    "sourceUrl": "https://shinemate.com/products/info/58.html",
    "image": "/images/products/client-catalog/heavy-cut-wool-pad-t140-shinemate-global.webp",
    "specs": [],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://shinemate.com/products/info/58.html"
      }
    ]
  },
  {
    "slug": "heavy-cut-wool-pad-t140-shinemate-global-2",
    "name": "Heavy-Cut Wool Pad T140-ShineMate Global",
    "brand": "ShineMate",
    "familySlug": "pintura",
    "division": "Detallado",
    "category": "Pulidoras",
    "sourceUrl": "https://shinemate.com/products/info/57.html",
    "image": "/images/products/sata/jet-x/1200394-main.webp",
    "specs": [],
    "downloads": [
      {
        "label": "Información del fabricante",
        "url": "https://shinemate.com/products/info/57.html"
      }
    ]
  },
  {
    "slug": "d-a-coarse-wool-polishing-pad",
    "name": "D-A COARSE Wool Polishing Pad",
    "brand": "RUPES",
    "familySlug": "pintura",
    "division": "Detallado",
    "category": "Pulidoras",
    "sourceUrl": "https://www.rupes.com/es/product/d-a-coarse-wool-polishing-pad-new/",
    "image": "/images/products/client-catalog/d-a-coarse-wool-polishing-pad.webp",
    "specs": [],
    "downloads": [
      {
        "label": "Catalogo ES",
        "url": "https://www.rupes.com/catalogue/2026/RUPES_Catàlogo-2026_ES.pdf"
      },
      {
        "label": "Catalogo IT",
        "url": "https://www.rupes.com/catalogue/2026/RUPES_Catalogo-2026_IT.pdf"
      },
      {
        "label": "Catalogue EN",
        "url": "https://www.rupes.com/catalogue/2026/RUPES_Catalogue-2026_EN.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://www.rupes.com/es/product/d-a-coarse-wool-polishing-pad-new/"
      }
    ]
  },
  {
    "slug": "smartfix-double-sided-fine-foam-pad",
    "name": "SMARTFIX Double-Sided Fine Foam Pad",
    "brand": "RUPES",
    "familySlug": "pintura",
    "division": "Detallado",
    "category": "Pulidoras",
    "sourceUrl": "https://www.rupes.com/es/product/smartfix-double-sided-fine-foam-pad/",
    "image": "/images/products/client-catalog/smartfix-double-sided-fine-foam-pad.webp",
    "specs": [],
    "downloads": [
      {
        "label": "Catalogo ES",
        "url": "https://www.rupes.com/catalogue/2026/RUPES_Catàlogo-2026_ES.pdf"
      },
      {
        "label": "Catalogo IT",
        "url": "https://www.rupes.com/catalogue/2026/RUPES_Catalogo-2026_IT.pdf"
      },
      {
        "label": "Catalogue EN",
        "url": "https://www.rupes.com/catalogue/2026/RUPES_Catalogue-2026_EN.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://www.rupes.com/es/product/smartfix-double-sided-fine-foam-pad/"
      }
    ]
  },
  {
    "slug": "smartfix-double-sided-coarse-foam-pad",
    "name": "SMARTFIX Double-Sided Coarse Foam Pad",
    "brand": "RUPES",
    "familySlug": "pintura",
    "division": "Detallado",
    "category": "Pulidoras",
    "sourceUrl": "https://www.rupes.com/es/product/smartfix-double-sided-coarse-foam-pad/",
    "image": "/images/products/client-catalog/smartfix-double-sided-coarse-foam-pad.webp",
    "specs": [],
    "downloads": [
      {
        "label": "Catalogo ES",
        "url": "https://www.rupes.com/catalogue/2026/RUPES_Catàlogo-2026_ES.pdf"
      },
      {
        "label": "Catalogo IT",
        "url": "https://www.rupes.com/catalogue/2026/RUPES_Catalogo-2026_IT.pdf"
      },
      {
        "label": "Catalogue EN",
        "url": "https://www.rupes.com/catalogue/2026/RUPES_Catalogue-2026_EN.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://www.rupes.com/es/product/smartfix-double-sided-coarse-foam-pad/"
      }
    ]
  },
  {
    "slug": "d-a-fine-finishing-foam-pad",
    "name": "D-A FINE Finishing Foam Pad",
    "brand": "RUPES",
    "familySlug": "pintura",
    "division": "Detallado",
    "category": "Pulidoras",
    "sourceUrl": "https://www.rupes.com/es/product/high-performance-fine-finishing-foam-pad-d-a-fine/",
    "image": "/images/products/client-catalog/d-a-fine-finishing-foam-pad.webp",
    "specs": [],
    "downloads": [
      {
        "label": "Catalogo ES",
        "url": "https://www.rupes.com/catalogue/2026/RUPES_Catàlogo-2026_ES.pdf"
      },
      {
        "label": "Catalogo IT",
        "url": "https://www.rupes.com/catalogue/2026/RUPES_Catalogo-2026_IT.pdf"
      },
      {
        "label": "Catalogue EN",
        "url": "https://www.rupes.com/catalogue/2026/RUPES_Catalogue-2026_EN.pdf"
      },
      {
        "label": "Información del fabricante",
        "url": "https://www.rupes.com/es/product/high-performance-fine-finishing-foam-pad-d-a-fine/"
      }
    ]
  }
];

const familyCopy: Record<string, { process: string; integration: string }> = {
  pintura: { process: 'procesos de pintura, preparación y acabado', integration: 'pistolas, filtración, protección y consumibles' },
  'cabinas-y-preparacion': { process: 'cabinas y áreas de preparación', integration: 'extracción, iluminación, filtración y equipos de aplicación' },
  'soldadura-y-enderezado': { process: 'reparación estructural y de carrocería', integration: 'medición, tracción, soldadura y herramientas de reparación' },
  'mecanica-y-aire': { process: 'operación mecánica y suministro de aire', integration: 'redes de aire, diagnóstico y equipos de taller' },
  consumibles: { process: 'preparación, protección y acabado', integration: 'equipos, abrasivos y materiales de uso recurrente' }
};

const uniqueClientCatalogSeeds = clientCatalogSeeds.filter(
  (seed, index, seeds) => seeds.findIndex((item) => item.brand === seed.brand && item.name === seed.name) === index
);

const workbookProductCopy: Record<string, Pick<CatalogProduct, 'summary' | 'description' | 'highlights' | 'detailBlocks'>> = {
  'drester-classic-1050': {
    summary: 'Lavadora manual compacta para pistolas de gravedad que trabajan con pintura base agua.',
    description: 'La Drester Classic 1050 limpia pistolas de gravedad con un consumo reducido de agua. Su bomba de diafragma alimenta el cepillo de lavado y el sistema de doble filtración permite reutilizar el agua dentro del proceso.',
    highlights: [
      'Limpieza manual para pistolas de gravedad base agua.',
      'Bomba de diafragma con cuatro años de garantía del fabricante.',
      'Doble filtración con capacidad aproximada de 10 galones.'
    ],
    detailBlocks: [
      { title: 'Proceso de limpieza', body: 'El agua circula a través del cepillo para facilitar la limpieza manual de la pistola utilizando una cantidad reducida de líquido.' },
      { title: 'Filtración y reutilización', body: 'El sistema de doble filtración retiene residuos y permite mantener el agua dentro del circuito de trabajo.' },
      { title: 'Selección técnica', body: 'Etapel puede confirmar alimentación de aire, espacio de instalación, consumibles y accesorios de acuerdo con la operación del taller.' }
    ]
  },
  'drester-classic-3600': {
    summary: 'Lavadora para pistolas con solvente, con ciclo automático y enjuague manual.',
    description: 'La Drester Classic 3600 combina lavado automático con la reconocida bomba Drester, enjuague manual y extracción integrada para limpiar pistolas que trabajan con productos base solvente.',
    highlights: [
      'Ciclo de lavado automático para pinturas base solvente.',
      'Enjuague manual y extracción integrados en la misma unidad.',
      'Bomba Drester con tres años de garantía del fabricante.'
    ],
    detailBlocks: [
      { title: 'Lavado automático', body: 'El compartimento de lavado permite automatizar el ciclo principal y reducir la manipulación durante la limpieza.' },
      { title: 'Acabado manual', body: 'El enjuague manual permite completar la limpieza de las zonas críticas de la pistola antes de volver a utilizarla.' },
      { title: 'Instalación', body: 'La unidad integra extracción; Etapel puede revisar alimentación neumática, solventes compatibles y ubicación dentro del área de pintura.' }
    ]
  },
  'compresor-de-tornillo-denair-con-secador-integrado': {
    summary: 'Compresor de tornillo Denair compacto con secador refrigerativo integrado.',
    description: 'Solución de aire comprimido todo en uno que integra compresor, separación de condensados, secador refrigerativo y control inteligente en un conjunto compacto para talleres con espacio limitado.',
    highlights: [
      'Secador refrigerativo integrado para reducir humedad y condensados.',
      'Controlador inteligente multilingüe con historial de fallas y avisos de servicio.',
      'Tren motriz de 5 a 22 kW, disponible con transmisión por banda o directa.'
    ],
    detailBlocks: [
      { title: 'Tratamiento del aire', body: 'El separador tipo spin-on y el secador refrigerativo integrado ayudan a entregar aire más seco y estable al proceso.' },
      { title: 'Construcción industrial', body: 'Motor TEFC de alta eficiencia con protección IP54/IP55, unidad de tornillo Denair, acero de origen estadounidense y rodamientos SKF.' },
      { title: 'Operación exigente', body: 'El conjunto está diseñado para trabajar en ambientes de hasta 55 °C. Etapel puede dimensionar capacidad, presión, depósito y red según la demanda real.' }
    ]
  }
};

export const clientCatalogProducts: CatalogProduct[] = uniqueClientCatalogSeeds.map((seed) => {
  const copy = familyCopy[seed.familySlug] || familyCopy.pintura;
  const category = seed.category
    .replace('prepracion', 'preparación')
    .replace('Manuales??', 'Herramientas manuales')
    .replace('Alineacion', 'Alineación')
    .replace('Vehiculos', 'Vehículos')
    .replace('Reparacion', 'Reparación')
    .replace('Lamparas Infrarojo', 'Lámparas infrarrojas')
    .replace('Tecnologia', 'Tecnología')
    .replace('Scanner', 'Escáner');
  const division = /aire comprimido|compresores/i.test(category)
    ? 'Mecánica y aire comprimido'
    : seed.division
      .replace('Enderezado de carroceria', 'Enderezado de carrocería')
      .replace('Desabollo de carroceria', 'Desabollo de carrocería')
      .replace('Consumibles pintura', 'Consumibles de pintura')
      .replace('Herramientas hojalateria', 'Herramientas de hojalatería');
  const image = seed.image === '/images/products/sata/catalog/rps-the-original.webp'
    ? '/images/products/sata/imported/rps-the-original.webp'
    : seed.image;
  const gallery = seed.brand === 'Denair'
    ? [image, '/images/products/client-catalog/denair-compresor-integrado-vista.webp']
    : [image];
  const technicalSpecs = [
    { label: 'Marca', value: seed.brand },
    { label: 'División', value: division },
    { label: 'Categoría', value: category },
    ...seed.specs
  ].slice(0, 8);
  const workbookCopy = workbookProductCopy[seed.slug];
  return {
    slug: `catalogo-${seed.slug}`,
    brand: seed.brand,
    familySlug: seed.familySlug,
    category,
    technology: 'Tecnología profesional',
    sprayPattern: 'No aplica',
    nozzleTechnology: 'No aplica',
    interest: category,
    application: division,
    name: seed.name,
    summary: workbookCopy?.summary || `${seed.name}, solución ${seed.brand} para ${category.toLowerCase()}.`,
    description: workbookCopy?.description || `Equipo o producto profesional para ${copy.process}. Etapel acompaña la selección de ${seed.name} de acuerdo con la aplicación, capacidad y condiciones reales del taller.`,
    image,
    gallery,
    badges: [seed.brand, category, division],
    specs: technicalSpecs,
    variants: [{ name: 'Configuración bajo consulta', note: 'Modelo, capacidad y accesorios por confirmar según la aplicación.' }],
    highlights: workbookCopy?.highlights || [
      `Solución ${seed.brand} para ${category.toLowerCase()}.`,
      `Puede integrarse con ${copy.integration}.`,
      'Etapel brinda orientación técnica, cotización y soporte de selección.'
    ],
    detailBlocks: workbookCopy?.detailBlocks || [
      { title: 'Uso recomendado', body: `Aplicaciones profesionales de ${category.toLowerCase()} dentro de la división ${division}.` },
      { title: 'Selección técnica', body: 'La configuración final debe confirmarse considerando el proceso, el volumen de trabajo, las instalaciones y los accesorios requeridos.' },
      { title: 'Integración con el taller', body: `Etapel puede revisar la compatibilidad con ${copy.integration}.` }
    ],
    downloads: seed.downloads,
    spareParts: ['Refacciones y consumibles bajo consulta', 'Accesorios compatibles', 'Soporte técnico Etapel'],
    sourceUrl: seed.sourceUrl
  };
});
