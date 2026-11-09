import { readFile, writeFile } from 'node:fs/promises';
import { localCatalogProducts } from '../src/data/products.ts';
import { localProductFamilies } from '../src/data/productLines.ts';
import { stableId } from './content.mjs';
const map = JSON.parse(await readFile('.cms/site-map.json', 'utf8'));
// The original brand array is deliberately kept in the component for local builds.
const source = await readFile('src/components/BrandMarquee.astro', 'utf8');
const match = source.match(/const localBrands = (\[[\s\S]*?\n\]);/);
if (!match) throw new Error('Brand source not found.');
// Parse only this repository's trusted literal, never CMS or user input.
const brands = Function(`"use strict";return (${match[1]})`)();
const media = new Map(map.media.map(row => [row.id, row]));
for (const product of localCatalogProducts) for (const path of new Set([product.image,...product.gallery])) {
  const id = stableId(`image:${path}`);
  if (!media.has(id)) media.set(id, { id, source:path,title:product.name,page:'Catálogo de productos',file:null,status:'published',sort:media.size });
}
const rows = (values, key) => values.map((payload, sort) => ({ id:payload[key], status:'published', sort, revision:0, payload }));
const seed = {
  etapel_texts:map.texts.map(row=>({...row,revision:0})),
  etapel_media:[...media.values()].map(row=>({...row,revision:0})),
  etapel_products:rows(localCatalogProducts,'slug'),
  etapel_families:rows(localProductFamilies,'slug'),
  etapel_brands:rows(brands,'slug'),
};
await writeFile('.cms/seed.json',JSON.stringify(seed));
console.log(Object.fromEntries(Object.entries(seed).map(([key, value])=>[key,value.length])));
