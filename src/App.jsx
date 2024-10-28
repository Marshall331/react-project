import { Input } from "./components/forms/Input.jsx"
import { Checkbox } from "./components/forms/Checkbox.jsx"
import { ProductCategoryRow } from "./components/Products/ProductCategoryRow.jsx"
import { ProductRow } from "./components/Products/ProductRow.jsx"
import { useState } from "react"

const PRODUCTS = [
  { id: 1, category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { id: 2, category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { id: 3, category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { id: 4, category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { id: 5, category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { id: 6, category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
]

function App() {

  const [showStockedOnly, setShowStockedOnly] = useState(false);
  const [search, setSearch] = useState('');

  const visibleProducts = PRODUCTS.filter(product => {
    if (showStockedOnly && !product.stocked) {
      return false
    }

    if(search.trim() && !product.name.includes(search)){
      return false
    }

    return true
  })

  return (
    <div className="container my-4">
      <SearchBar
        search={search}
        onSearch={setSearch}
        showStockedOnly={showStockedOnly}
        onStockedOnlyChanged={setShowStockedOnly}>
      </SearchBar>
      <ProductTable products={visibleProducts}></ProductTable>
    </div>)
}

function SearchBar({ showStockedOnly, onStockedOnlyChanged, search, onSearch }) {
  return (
    <div>
      <div className="mb-3">
        <Input
          value={search}
          onChange={onSearch}
          placeholder="Rechercher..."
        />
        <Checkbox
          id="stocked"
          checked={showStockedOnly}
          onChange={onStockedOnlyChanged}
          label="N'afficher que les produits en stock"
        />
      </div>
    </div>
  );
}

function ProductTable({ products }) {
  const rows = []
  let lastCategory = null

  for (let product of products) {
    if (product.category !== lastCategory) {
      rows.push(<ProductCategoryRow key={product.category} name={product.category}></ProductCategoryRow>)
    }
    lastCategory = product.category
    rows.push(<ProductRow product={product} key={product.name}></ProductRow>)
  }

  return <table className="table table-hover">
    <thead>
      <tr>
        <th>Nom</th>
        <th>Prix</th>
      </tr>
    </thead>
    <tbody>
      {rows}
    </tbody>
  </table>
}

export default App
