// ============================================================================
// CORE ENTITY INTERFACES
// ============================================================================

/**
 * Standard Product interface used across the application
 * Based on FakeStore API structure
 */
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

/**
 * Cart Item interface extending Product with quantity
 */
export interface CartItem extends Product {
  quantity: number;
}

/**
 * User interface for authentication
 */
export interface User {
  id: string | number;
  username: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

/**
 * Authentication response interface
 */
export interface AuthResponse {
  token: string;
  user: User;
}

/**
 * Login credentials interface
 */
export interface LoginCredentials {
  username: string;
  password: string;
}

/**
 * Registration data interface
 */
export interface RegistrationData {
  username: string;
  password: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

// ============================================================================
// REDUX STATE INTERFACES
// ============================================================================

/**
 * Base state interface for all Redux slices
 */
export interface BaseState {
  loading: boolean;
  error: string | null;
}

/**
 * Products state interface
 */
export interface ProductsState extends BaseState {
  items: Product[];
  selectedProduct: Product | null;
  // When using TheMealDB API
  mealCategories?: string[];
  useMealsApi?: boolean;
}

/**
 * Cart state interface
 */
export interface CartState extends BaseState {
  items: CartItem[];
  total: number;
}

/**
 * Authentication state interface
 */
export interface AuthState extends BaseState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

// ============================================================================
// API RESPONSE INTERFACES
// ============================================================================

/**
 * Generic API response wrapper
 */
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

/**
 * Paginated response interface
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// ============================================================================
// COMPONENT PROPS INTERFACES
// ============================================================================

/**
 * Common navigation props
 */
export interface NavigationProps {
  navigation: any;
  route: any;
}

/**
 * Product card props
 */
export interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onPress?: (product: Product) => void;
}

/**
 * Cart item props
 */
export interface CartItemProps {
  item: CartItem;
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
  onRemove: (id: number) => void;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Optional utility type
 */
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Required utility type
 */
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * Status enum for async operations
 */
export enum AsyncStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
}

/**
 * Category enum for products
 */
export enum ProductCategory {
  ELECTRONICS = 'electronics',
  JEWELERY = 'jewelery',
  MENS_CLOTHING = "men's clothing",
  WOMENS_CLOTHING = "women's clothing",
  ALL = 'all',
}

// ============================================================================
// FORM INTERFACES
// ============================================================================

/**
 * Form field interface
 */
export interface FormField {
  value: string;
  error?: string;
  touched: boolean;
}

/**
 * Login form interface
 */
export interface LoginForm {
  username: FormField;
  password: FormField;
}

/**
 * Registration form interface
 */
export interface RegistrationForm {
  username: FormField;
  password: FormField;
  confirmPassword: FormField;
  email?: FormField;
  firstName?: FormField;
  lastName?: FormField;
}
