import {
    Edit3,
    Eye,
    Plus,
    Search,
    Trash2,
} from "lucide-react";

import { useMemo, useState } from "react";

import AdminModal from "@/components/admin/AdminModal";
import Section from "@/components/ui/Section";
import { useToast } from "@/context/ToastContext";
import { useAdminCustomizationMutations, useAdminCustomizations } from "@/hooks/adminQueries";

const EMPTY_ITEMS = [];

const emptyCustomizationForm = {
  name: "",
  id: "",
  image: "",
};

export default function Customizations() {
  const { showToast } = useToast();
  const { data: response, error, isPending, isFetching } = useAdminCustomizations();
  const { create, update, remove } = useAdminCustomizationMutations();
  const items = response?.data || EMPTY_ITEMS;
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [formData, setFormData] = useState(emptyCustomizationForm);

  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [items, search]);

  const handleDelete = (itemId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this customization item?",
    );

    if (!confirmed) return;

    remove.mutate(itemId, { onSuccess: () => showToast("Customization item deleted.", "success"), onError: (deleteError) => showToast(deleteError.message || "Unable to delete item.", "error") });
  };

  const openAddItem = () => {
    setFormMode("add");
    setFormData(emptyCustomizationForm);
    setIsFormOpen(true);
  };

  const openViewItem = (item) => {
    setSelectedItem(item);
    setIsDetailsOpen(true);
  };

  const openEditItem = (item) => {
    setFormMode("edit");
    setFormData({
      name: item.name,
      id: item.id,
      image: item.image,
    });
    setSelectedItem(item);
    setIsFormOpen(true);
  };

  const handleSaveItem = async (event) => {
    event.preventDefault();

    const nextItem = {
      id: formData.id || formData.name.toLowerCase().replace(/\s+/g, "-"),
      name: formData.name,
      image: formData.image,
    };

    try {
      const payload = { slug: nextItem.id, name: nextItem.name, image: nextItem.image || null };
      if (formMode === "edit" && selectedItem) await update.mutateAsync({ id: selectedItem.id, data: payload });
      else await create.mutateAsync(payload);
      showToast(formMode === "edit" ? "Customization item updated." : "Customization item created.", "success");
    } catch (saveError) { showToast(saveError.message || "Unable to save item.", "error"); }

    setIsFormOpen(false);
    setSelectedItem(null);
    setFormData(emptyCustomizationForm);
  };

  return (
    <Section className="py-8 lg:py-10">
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
            Admin
          </p>

          <h1 className="mt-3 text-5xl font-black tracking-tight">
            Customizations
          </h1>

          <p className="mt-4 max-w-xl text-neutral-600">
            Manage the individual items customers can choose when creating a customized PREP'D box.
          </p>
        </div>

        <button
          onClick={openAddItem}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-6 py-3 font-semibold text-white transition hover:bg-neutral-800"
        >
          <Plus size={18} />
          Add Item
        </button>
      </div>

      <div className="mb-8 max-w-md">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
          />

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search customization items..."
            className="w-full rounded-full border border-neutral-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-black"
          />
        </div>
      </div>

      {error && <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error.message}</div>}
      {isFetching && !isPending && <p className="mb-4 text-xs text-neutral-500">Updating customization items...</p>}

      {!isPending && <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredItems.map((item) => (
          <article
            key={item.id}
            className="rounded-3xl border border-neutral-200 bg-white p-5"
          >
            <div className="flex aspect-square items-center justify-center rounded-2xl bg-neutral-100 p-8">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-contain"
                />
              ) : (
                <div className="text-sm text-neutral-400">No image</div>
              )}
            </div>

            <div className="mt-5">
              <h2 className="font-bold">{item.name}</h2>
              <p className="mt-1 text-xs text-neutral-500">{item.id}</p>
            </div>

            <div className="mt-5 flex gap-2">
              <button
                onClick={() => openViewItem(item)}
                className="flex flex-1 items-center justify-center gap-2 rounded-full border border-neutral-200 py-2.5 px-2 text-sm font-semibold transition hover:bg-neutral-50"
              >
                <Eye size={15} />
                View
              </button>

              <button
                onClick={() => openEditItem(item)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 transition hover:bg-neutral-50"
              >
                <Edit3 size={15} />
              </button>

              <button
                onClick={() => handleDelete(item.id)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-red-200 text-red-600 transition hover:bg-red-50"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </article>
        ))}
      </div>}

      <AdminModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        title={selectedItem ? selectedItem.name : "Customization details"}
        description="Preview the selected customization item."
        size="lg"
      >
        {selectedItem && (
          <div className="space-y-5">
            <div className="flex flex-col gap-5 rounded-3xl border border-neutral-200 bg-neutral-50 p-4 sm:flex-row sm:items-center">
              <div className="flex h-40 w-full items-center justify-center rounded-2xl bg-white p-4 sm:w-40">
                {selectedItem.image ? (
                  <img src={selectedItem.image} alt={selectedItem.name} className="h-full w-full object-contain" />
                ) : (
                  <p className="text-sm text-neutral-400">No image available</p>
                )}
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                  Customization item
                </p>
                <h3 className="mt-2 text-xl font-black">{selectedItem.name}</h3>
                <p className="mt-2 text-sm text-neutral-600">ID / slug: {selectedItem.id}</p>
              </div>
            </div>
          </div>
        )}
      </AdminModal>

      <AdminModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={formMode === "edit" ? "Edit customization" : "Add customization"}
        description="Store the item locally for now. No backend connection is included."
        size="lg"
      >
        <form onSubmit={handleSaveItem} className="space-y-4">
          <label className="block text-sm font-semibold text-neutral-700">
            Name
            <input
              required
              value={formData.name}
              onChange={(event) =>
                setFormData((current) => ({ ...current, name: event.target.value }))
              }
              className="mt-2 w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-black"
            />
          </label>

          <label className="block text-sm font-semibold text-neutral-700">
            ID / slug
            <input
              required
              value={formData.id}
              onChange={(event) =>
                setFormData((current) => ({ ...current, id: event.target.value }))
              }
              className="mt-2 w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-black"
            />
          </label>

          <label className="block text-sm font-semibold text-neutral-700">
            Image URL
            <input
              value={formData.image}
              onChange={(event) =>
                setFormData((current) => ({ ...current, image: event.target.value }))
              }
              className="mt-2 w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-black"
              placeholder="https://..."
            />
          </label>

          {formData.image && (
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Image preview
              </p>
              <div className="mt-3 flex h-40 items-center justify-center rounded-2xl bg-white p-4">
                <img src={formData.image} alt="Preview" className="h-full w-full object-contain" />
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="rounded-full border border-neutral-200 px-5 py-3 text-sm font-semibold transition hover:bg-neutral-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              Save item
            </button>
          </div>
        </form>
      </AdminModal>
    </Section>
  );
}