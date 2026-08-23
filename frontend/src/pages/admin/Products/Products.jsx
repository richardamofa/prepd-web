import { Edit3, Eye, Package, Plus, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";

import AdminModal from "@/components/admin/AdminModal";
import StatusBadge from "@/components/admin/StatusBadge";
import ProductCardSkeleton from "@/components/common/ProductCardSkeleton";
import Section from "@/components/ui/Section";
import { useToast } from "@/context/ToastContext";
import { useAdminProductMutations, useAdminProducts } from "@/hooks/adminQueries";

const EMPTY_PRODUCTS = [];

const emptyProductForm = { name: "", slug: "", category: "", price: "", description: "", longDescription: "", images: "" };

export default function Products() {
  const { showToast } = useToast();
  const { data: response, error, isPending, isFetching } = useAdminProducts();
  const { create, update, remove } = useAdminProductMutations();
  const products = response?.data || EMPTY_PRODUCTS;
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [form, setForm] = useState(emptyProductForm);

  const categories = ["all", ...new Set(products.map((product) => product.category))];
  const filteredProducts = useMemo(() => products.filter((product) => {
    const term = search.toLowerCase();
    return (product.name.toLowerCase().includes(term) || product.slug.toLowerCase().includes(term)) && (category === "all" || product.category === category);
  }), [products, search, category]);

  const openAdd = () => { setFormMode("add"); setForm(emptyProductForm); setSelectedProduct(null); setFormOpen(true); };
  const openEdit = (product) => { setFormMode("edit"); setSelectedProduct(product); setForm({ name: product.name, slug: product.slug, category: product.category, price: product.price, description: product.description, longDescription: product.longDescription || "", images: (product.images || []).map((image) => image.src).join("\n") }); setFormOpen(true); };
  const deleteProduct = (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    remove.mutate(id, { onSuccess: () => showToast("Product deleted.", "success"), onError: (mutationError) => showToast(mutationError.message || "Unable to delete product.", "error") });
  };
  const saveProduct = async (event) => {
    event.preventDefault();
    const data = {
      name: form.name,
      slug: form.slug,
      category: form.category,
      currency: selectedProduct?.currency || "GH₵",
      price: Number(form.price),
      description: form.description,
      longDescription: form.longDescription || form.description,
      images: form.images.split(/\r?\n|,/).map((src) => src.trim()).filter(Boolean).map((src) => ({ src, altText: form.name })),
    };
    try {
      if (formMode === "edit") await update.mutateAsync({ id: selectedProduct.id, data });
      else await create.mutateAsync(data);
      showToast(formMode === "edit" ? "Product updated." : "Product created.", "success");
      setFormOpen(false);
      setForm(emptyProductForm);
    } catch (mutationError) { showToast(mutationError.message || "Unable to save product.", "error"); }
  };

  return <Section className="py-8 lg:py-10">
    <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"><div><p className="text-sm uppercase tracking-[0.3em] text-neutral-500">Admin</p><h1 className="mt-3 text-5xl font-black tracking-tight">Products</h1><p className="mt-4 max-w-xl text-neutral-600">Manage the PREP'D boxes and products available in the shop.</p></div><button onClick={openAdd} className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-6 py-3 font-semibold text-white"><Plus size={18} /> Add Product</button></div>
    <div className="mb-8 flex flex-col gap-4 md:flex-row"><div className="relative w-full md:max-w-md"><Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products..." className="w-full rounded-full border border-neutral-200 bg-white py-3 pl-11 pr-4 text-sm outline-none" /></div><select value={category} onChange={(event) => setCategory(event.target.value)} className="rounded-full border border-neutral-200 bg-white px-5 py-3 text-sm">{categories.map((item) => <option key={item} value={item}>{item === "all" ? "All Categories" : item}</option>)}</select></div>
    {error && <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error.message}</div>}
    {isFetching && !isPending && <p className="mb-4 text-xs text-neutral-500">Updating products...</p>}
    {isPending ? <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">{[1, 2, 3].map((item) => <ProductCardSkeleton key={item} />)}</div> : <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">{filteredProducts.map((product) => <article key={product.id} className="overflow-hidden rounded-3xl border border-neutral-200 bg-white"><div className="relative flex aspect-square items-center justify-center bg-neutral-100 p-10"><img src={product.images?.[0]?.src || "/images/placeholders/product-placeholder.png"} alt={product.name} className="h-full w-full object-contain" /><span className="absolute left-4 top-4"><StatusBadge status={product.isActive ? "ACTIVE" : "INACTIVE"} /></span></div><div className="p-6"><p className="text-xs uppercase tracking-wider text-neutral-500">{product.category}</p><h2 className="mt-2 text-xl font-bold">{product.name}</h2><p className="mt-2 text-sm leading-6 text-neutral-500">{product.description}</p><div className="mt-5 flex items-center justify-between"><p className="text-lg font-bold">{product.currency} {Number(product.price).toFixed(2)}</p><p className="text-sm text-neutral-500">{product.items?.length || 0} items</p></div><div className="mt-6 flex gap-2"><button onClick={() => setSelectedProduct(product)} className="flex flex-1 items-center justify-center gap-2 rounded-full border border-neutral-200 px-4 py-3 text-sm font-semibold"><Eye size={16} /> View</button><button onClick={() => openEdit(product)} className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200"><Edit3 size={16} /></button><button onClick={() => deleteProduct(product.id)} className="flex h-11 w-11 items-center justify-center rounded-full border border-red-200 text-red-600"><Trash2 size={16} /></button></div></div></article>)}</div>}
    {!isPending && filteredProducts.length === 0 && <div className="rounded-3xl border border-dashed border-neutral-300 py-24 text-center"><Package size={40} className="mx-auto text-neutral-400" /><h2 className="mt-4 text-xl font-bold">No products found</h2></div>}
    <AdminModal isOpen={Boolean(selectedProduct) && !formOpen} onClose={() => setSelectedProduct(null)} title={selectedProduct?.name || "Product details"} description="Product details and included items." size="lg">{selectedProduct && <div className="space-y-5"><img src={selectedProduct.images?.[0]?.src || "/images/placeholders/product-placeholder.png"} alt={selectedProduct.name} className="mx-auto h-64 w-full object-contain" /><p>{selectedProduct.description}</p><p className="font-bold">{selectedProduct.currency} {Number(selectedProduct.price).toFixed(2)}</p></div>}</AdminModal>
    <AdminModal isOpen={formOpen} onClose={() => setFormOpen(false)} title={formMode === "edit" ? "Edit product" : "Add product"} description="Save product details to the database." size="lg"><form onSubmit={saveProduct} className="space-y-4"><div className="grid gap-4 md:grid-cols-2">{[["name", "Product name"], ["slug", "Slug"], ["category", "Category"], ["price", "Price"]].map(([name, label]) => <label key={name} className="text-sm font-semibold">{label}<input required={name !== "slug"} type={name === "price" ? "number" : "text"} min={name === "price" ? "0" : undefined} value={form[name]} onChange={(event) => setForm((current) => ({ ...current, [name]: event.target.value }))} className="mt-2 w-full rounded-xl border border-neutral-200 px-4 py-3 font-normal" /></label>)}</div><label className="block text-sm font-semibold">Description<textarea required value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} className="mt-2 w-full rounded-xl border border-neutral-200 px-4 py-3 font-normal" /></label><label className="block text-sm font-semibold">Product images<input value={form.images} onChange={(event) => setForm((current) => ({ ...current, images: event.target.value }))} placeholder="One local image path per line" className="mt-2 w-full rounded-xl border border-neutral-200 px-4 py-3 font-normal" /></label><button disabled={create.isPending || update.isPending} className="rounded-full bg-black px-5 py-3 font-semibold text-white">Save product</button></form></AdminModal>
  </Section>;
}
