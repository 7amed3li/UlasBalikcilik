import { menuData } from "@/data/menuData";
import menuTr from "@/i18n/menu/tr.json";

export function includeUnstoredNewMenuItems(items = []) {
  const savedIds = new Set(items.map((item) => item.id));
  const unsavedItems = menuData.flatMap((category) =>
    (category.items || [])
      .filter((item) => !savedIds.has(item.id))
      .map((item) => ({
        id: item.id,
        category_id: category.id,
        price: item.price || 0,
        image_url: item.image || null,
        tags: item.tags || [],
        is_trending: Boolean(item.trending),
        is_available: true,
        categories: {
          name_tr: menuTr.categories?.[category.id] || category.category?.tr || category.id,
          name_en: category.category?.en || category.id,
        },
        needsDatabaseInsert: true,
      }))
  );

  return [...items, ...unsavedItems];
}
