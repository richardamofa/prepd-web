import {
    Edit3,
    Eye,
    Package,
    Plus,
    Search,
    Trash2,
} from "lucide-react";

import { useMemo, useState } from "react";

import AdminModal from "@/components/admin/AdminModal";
import Section from "@/components/ui/Section";
import { products as initialProducts } from "@/constants/product";

const emptyProductForm = {
  name: "",
  slug: "",
  category: "",
  price: "",
  description: "",
  longDescription: "",
  image: "",
};

export default function Products() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [productFormMode, setProductFormMode] = useState("add");
  const [productForm, setProductForm] = useState(emptyProductForm);

  const categories = [
    "all",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        product.slug
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "all" || product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  const handleDelete = (productId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmed) return;

    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== productId),
    );
  };

  const openAddProduct = () => {
    setProductFormMode("add");
    setProductForm(emptyProductForm);
    setIsProductFormOpen(true);
  };

  const openViewProduct = (product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const openEditProduct = (product) => {
    setProductFormMode("edit");
    setProductForm({
      name: product.name,
      slug: product.slug,
      category: product.category,
      price: product.price,
      description: product.description,
      longDescription: product.longDescription || "",
      image: product.image,
    });
    setSelectedProduct(product);
    setIsProductFormOpen(true);
  };

  const handleSaveProduct = (event) => {
    event.preventDefault();

    const nextProduct = {
      ...selectedProduct,
      id: productForm.slug || selectedProduct?.id || `product-${Date.now()}`,
      name: productForm.name,
      slug: productForm.slug || productForm.name.toLowerCase().replace(/\s+/g, "-"),
      category: productForm.category,
      currency: selectedProduct?.currency || "GH₵",
      price: Number(productForm.price) || 0,
      description: productForm.description,
      longDescription: productForm.longDescription,
      image: productForm.image || selectedProduct?.image,
      items: selectedProduct?.items || [],
    };

    if (productFormMode === "edit" && selectedProduct) {
      setProducts((currentProducts) =>
        currentProducts.map((product) =>
          product.id === selectedProduct.id ? nextProduct : product,
        ),
      );
    } else {
      setProducts((currentProducts) => [nextProduct, ...currentProducts]);
    }

    setIsProductFormOpen(false);
    setSelectedProduct(null);
    setProductForm(emptyProductForm);
  };

  return (
    <Section className="pt-32">
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
            Admin
          </p>

          <h1 className="mt-3 text-5xl font-black tracking-tight">
            Products
          </h1>

          <p className="mt-4 max-w-xl text-neutral-600">
            Manage the PREP'D boxes and products available in the shop.
          </p>
        </div>

        <button
          onClick={openAddProduct}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-6 py-3 font-semibold text-white transition hover:bg-neutral-800"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      <div className="mb-8 flex flex-col gap-4 md:flex-row">
        <div className="relative w-full md:max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
          />

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search products..."
            className="w-full rounded-full border border-neutral-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-black"
          />
        </div>

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="rounded-full border border-neutral-200 bg-white px-5 py-3 text-sm outline-none focus:border-black"
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item === "all" ? "All Categories" : item}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {filteredProducts.map((product) => (
          <article
            key={product.id}
            className="overflow-hidden rounded-3xl border border-neutral-200 bg-white"
          >
            <div className="relative flex aspect-square items-center justify-center bg-neutral-100 p-10">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-contain transition duration-500 hover:scale-105"
              />

              <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-semibold">
                Active
              </span>
            </div>

            <div className="p-6">
              <p className="text-xs uppercase tracking-wider text-neutral-500">
                {product.category}
              </p>

              <h2 className="mt-2 text-xl font-bold">{product.name}</h2>

              <p className="mt-2 text-sm leading-6 text-neutral-500">
                {product.description}
              </p>

              <div className="mt-5 flex items-center justify-between">
                <p className="text-lg font-bold">
                  {product.currency} {Number(product.price).toFixed(2)}
                </p>

                <p className="text-sm text-neutral-500">
                  {product.items?.length || 0} items
                </p>
              </div>

              <div className="mt-6 flex gap-2">
                <button
                  onClick={() => openViewProduct(product)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full border border-neutral-200 px-4 py-3 text-sm font-semibold transition hover:bg-neutral-50"
                >
                  <Eye size={16} />
                  View
                </button>

                <button
                  onClick={() => openEditProduct(product)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 transition hover:bg-neutral-50"
                >
                  <Edit3 size={16} />
                </button>

                <button
                  onClick={() => handleDelete(product.id)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-red-200 text-red-600 transition hover:bg-red-50"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="rounded-3xl border border-dashed border-neutral-300 py-24 text-center">
          <Package size={40} className="mx-auto text-neutral-400" />

          <h2 className="mt-4 text-xl font-bold">No products found</h2>

          <p className="mt-2 text-sm text-neutral-500">
            Try changing your search or category filter.
          </p>
        </div>
      )}

      <AdminModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        title={selectedProduct ? selectedProduct.name : "Product details"}
        description="Quick view of the selected product and its included items."
        size="xl"
      >
        {selectedProduct && (
          <div className="space-y-6">
            <div className="flex flex-col gap-6 rounded-3xl border border-neutral-200 bg-neutral-50 p-4 md:flex-row md:items-start">
              <div className="flex h-48 w-full items-center justify-center rounded-2xl bg-white p-6 md:w-56">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                  {selectedProduct.category}
                </p>
                <h3 className="mt-2 text-2xl font-black">
                  {selectedProduct.name}
                </h3>
                <p className="mt-3 text-sm leading-7 text-neutral-600">
                  {selectedProduct.description}
                </p>
                <p className="mt-4 text-lg font-bold text-black">
                  {selectedProduct.currency} {Number(selectedProduct.price).toFixed(2)}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Long description
              </p>
              <p className="mt-2 text-sm leading-7 text-neutral-600">
                {selectedProduct.longDescription || selectedProduct.description}
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Included items
              </p>
              <div className="mt-4 space-y-3">
                {selectedProduct.items?.length ? (
                  selectedProduct.items.map((item, index) => (
                    <div key={`${item.name}-${index}`} className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3">
                      <p className="font-semibold text-neutral-900">{item.name}</p>
                      <p className="mt-1 text-sm text-neutral-600">{item.description}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-neutral-500">No included items listed.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </AdminModal>

      <AdminModal
        isOpen={isProductFormOpen}
        onClose={() => setIsProductFormOpen(false)}
        title={productFormMode === "edit" ? "Edit product" : "Add product"}
        description="Update the product details locally. This does not connect to an API yet."
        size="lg"
      >
        <form onSubmit={handleSaveProduct} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm font-semibold text-neutral-700">
              Product name
              <input
                required
                value={productForm.name}
                onChange={(event) =>
                  setProductForm((current) => ({ ...current, name: event.target.value }))
                }
                className="mt-2 w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-black"
              />
            </label>

            <label className="text-sm font-semibold text-neutral-700">
              Slug / ID
              <input
                required
                value={productForm.slug}
                onChange={(event) =>
                  setProductForm((current) => ({ ...current, slug: event.target.value }))
                }
                className="mt-2 w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-black"
              />
            </label>

            <label className="text-sm font-semibold text-neutral-700">
              Category
              <input
                required
                value={productForm.category}
                onChange={(event) =>
                  setProductForm((current) => ({ ...current, category: event.target.value }))
                }
                className="mt-2 w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-black"
              />
            </label>

            <label className="text-sm font-semibold text-neutral-700">
              Price
              <input
                required
                type="number"
                min="0"
                value={productForm.price}
                onChange={(event) =>
                  setProductForm((current) => ({ ...current, price: event.target.value }))
                }
                className="mt-2 w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-black"
              />
            </label>
          </div>

          <label className="block text-sm font-semibold text-neutral-700">
            Description
            <textarea
              required
              rows="3"
              value={productForm.description}
              onChange={(event) =>
                setProductForm((current) => ({ ...current, description: event.target.value }))
              }
              className="mt-2 w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-black"
            />
          </label>

          <label className="block text-sm font-semibold text-neutral-700">
            Long description
            <textarea
              rows="4"
              value={productForm.longDescription}
              onChange={(event) =>
                setProductForm((current) => ({ ...current, longDescription: event.target.value }))
              }
              className="mt-2 w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-black"
            />
          </label>

          <label className="block text-sm font-semibold text-neutral-700">
            Image URL
            <input
              value={productForm.image}
              onChange={(event) =>
                setProductForm((current) => ({ ...current, image: event.target.value }))
              }
              className="mt-2 w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-black"
              placeholder="https://..."
            />
          </label>

          {productForm.image && (
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Image preview
              </p>
              <div className="mt-3 flex h-40 items-center justify-center rounded-2xl bg-white p-4">
                <img src={productForm.image} alt="Preview" className="h-full w-full object-contain" />
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setIsProductFormOpen(false)}
              className="rounded-full border border-neutral-200 px-5 py-3 text-sm font-semibold transition hover:bg-neutral-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              Save product
            </button>
          </div>
        </form>
      </AdminModal>
    </Section>
  );
}