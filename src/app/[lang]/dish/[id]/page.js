import DishPage, { generateMetadata as baseMetadata } from "@/app/dish/[id]/page";

export { baseMetadata as generateMetadata };

export default async function LocalizedDishPage(props) {
  return <DishPage {...props} />;
}
