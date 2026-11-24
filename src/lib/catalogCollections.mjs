export const catalogRootProducts = products => products.filter(product =>
  product.catalogVisible !== false && !product.catalogParentSlug);

export const catalogModels = (products, parentSlug) => products.filter(product =>
  product.catalogVisible !== false && product.catalogParentSlug === parentSlug)
  .sort((a, b) => (a.catalogOrder ?? 999) - (b.catalogOrder ?? 999));
