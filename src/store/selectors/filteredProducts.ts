import { RootState } from '../store'

export const filteredProductsSelector = (state: RootState) => {
  const products = state.products
  const query = state.query.trim().toLowerCase()

  // Returns initial array if query === ''
  return products.filter((product) =>
    product.title.trim().toLowerCase().includes(query)
  )
}
