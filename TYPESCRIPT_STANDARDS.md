# TypeScript Interface Standards & Code Organization

## Overview

This document outlines the standardized approach for TypeScript interfaces and code organization in the Pantry React Native application. All interfaces are centralized in `/src/types/index.ts` to ensure consistency and maintainability.

## 📁 File Structure

```
src/
├── types/
│   └── index.ts          # Centralized type definitions
├── stores/
│   └── features/
│       ├── products/
│       │   └── productsSlice.ts
│       ├── cart/
│       │   └── cartSlice.ts
│       └── registration/
│           └── registrationSlice.ts
├── api/
│   ├── productsApi.ts
│   ├── cartApi.ts
│   └── authApi.ts
└── features/
    ├── products/
    │   └── ProductsListingScreen.tsx
    ├── cart/
    │   └── screens/
    │       └── CartScreen.tsx
    └── home/
        └── HomeScreen.tsx
```

## 🏗️ Core Entity Interfaces

### Product Interface
```typescript
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
```

### Cart Item Interface
```typescript
export interface CartItem extends Product {
  quantity: number;
}
```

### User & Authentication Interfaces
```typescript
export interface User {
  id: string | number;
  username: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegistrationData {
  username: string;
  password: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}
```

## 🔄 Redux State Interfaces

### Base State Pattern
All Redux slices extend a common `BaseState` interface:

```typescript
export interface BaseState {
  loading: boolean;
  error: string | null;
}
```

### Specific State Interfaces
```typescript
export interface ProductsState extends BaseState {
  items: Product[];
  selectedProduct: Product | null;
}

export interface CartState extends BaseState {
  items: CartItem[];
  total: number;
}

export interface AuthState extends BaseState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}
```

## 📡 API Response Interfaces

### Generic API Response
```typescript
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}
```

### Paginated Response
```typescript
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
```

## 🎯 Component Props Interfaces

### Navigation Props
```typescript
export interface NavigationProps {
  navigation: any;
  route: any;
}
```

### Product Card Props
```typescript
export interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onPress?: (product: Product) => void;
}
```

### Cart Item Props
```typescript
export interface CartItemProps {
  item: CartItem;
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
  onRemove: (id: number) => void;
}
```

## 🔧 Utility Types & Enums

### Status Enum
```typescript
export enum AsyncStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
}
```

### Product Category Enum
```typescript
export enum ProductCategory {
  ELECTRONICS = 'electronics',
  JEWELERY = 'jewelery',
  MENS_CLOTHING = "men's clothing",
  WOMENS_CLOTHING = "women's clothing",
  ALL = 'all',
}
```

### Utility Types
```typescript
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type Required<T, K extends keyof T> = T & Required<Pick<T, K>>;
```

## 📋 Form Interfaces

### Form Field Pattern
```typescript
export interface FormField {
  value: string;
  error?: string;
  touched: boolean;
}
```

### Form Interfaces
```typescript
export interface LoginForm {
  username: FormField;
  password: FormField;
}

export interface RegistrationForm {
  username: FormField;
  password: FormField;
  confirmPassword: FormField;
  email?: FormField;
  firstName?: FormField;
  lastName?: FormField;
}
```

## 🎨 Naming Conventions

### Interface Naming
- **Entities**: PascalCase (e.g., `Product`, `User`, `CartItem`)
- **States**: PascalCase + "State" suffix (e.g., `ProductsState`, `CartState`)
- **Props**: PascalCase + "Props" suffix (e.g., `ProductCardProps`, `CartItemProps`)
- **Forms**: PascalCase + "Form" suffix (e.g., `LoginForm`, `RegistrationForm`)

### File Naming
- **Types**: `index.ts` (centralized)
- **Slices**: `[feature]Slice.ts`
- **APIs**: `[feature]Api.ts`
- **Components**: PascalCase (e.g., `ProductsListingScreen.tsx`)

## 🔄 Usage Patterns

### Importing Types
```typescript
// ✅ Correct - Import from centralized types
import { Product, CartItem, ProductCategory } from '@/types';

// ❌ Incorrect - Don't define interfaces in components
interface Product { ... }
```

### Redux Slice Pattern
```typescript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product, ProductsState } from '@/types';

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
  selectedProduct: null,
};
```

### API Function Pattern
```typescript
import { Product } from '@/types';

export const getAllProducts = async (): Promise<Product[]> => {
  // Implementation
};
```

### Component Props Pattern
```typescript
import { Product, ProductCardProps } from '@/types';

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  // Implementation
};
```

## ✅ Benefits of This Approach

1. **Consistency**: All interfaces follow the same patterns
2. **Maintainability**: Changes to interfaces are centralized
3. **Type Safety**: Full TypeScript support across the application
4. **Reusability**: Interfaces can be easily shared between components
5. **Documentation**: Self-documenting code with clear interfaces
6. **Scalability**: Easy to extend and modify as the app grows

## 🚀 Migration Checklist

- [x] Create centralized `/src/types/index.ts`
- [x] Define core entity interfaces (`Product`, `User`, `CartItem`)
- [x] Define Redux state interfaces (`ProductsState`, `CartState`, `AuthState`)
- [x] Define API response interfaces
- [x] Define component props interfaces
- [x] Update all Redux slices to use standardized interfaces
- [x] Update all API functions to use proper typing
- [x] Update all components to import from centralized types
- [x] Remove duplicate interface definitions
- [x] Add utility types and enums
- [x] Document the standards

## 📝 Future Enhancements

1. **Generic API Client**: Create a generic API client using the standardized interfaces
2. **Form Validation**: Implement form validation using the form interfaces
3. **Error Handling**: Standardize error handling across all API calls
4. **Testing**: Create type-safe test utilities using the interfaces
5. **Documentation**: Auto-generate API documentation from TypeScript interfaces
