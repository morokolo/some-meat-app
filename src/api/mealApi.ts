const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

type MealCategoryApi = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb?: string;
  strCategoryDescription?: string;
};

type MealSummaryApi = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

export async function getMealCategories(): Promise<string[]> {
  const res = await fetch(`${BASE_URL}/categories.php`);
  if (!res.ok) throw new Error('Failed to fetch meal categories');
  const json = await res.json();
  const categories = (json?.categories as MealCategoryApi[] | undefined) ?? [];
  return categories.map(c => c.strCategory);
}

export async function getMealsByCategory(category: string): Promise<MealSummaryApi[]> {
  const res = await fetch(`${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`);
  if (!res.ok) throw new Error('Failed to fetch meals by category');
  const json = await res.json();
  return (json?.meals as MealSummaryApi[] | undefined) ?? [];
}

export async function getAllMeals(): Promise<MealSummaryApi[]> {
  // TheMealDB returns a large list when s is empty
  const res = await fetch(`${BASE_URL}/search.php?s=`);
  if (!res.ok) throw new Error('Failed to fetch all meals');
  const json = await res.json();
  return (json?.meals as MealSummaryApi[] | undefined) ?? [];
}


