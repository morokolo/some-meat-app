# Pantry App UI Screens

This React Native Expo app replicates the UI screens for a grocery shopping app called "Pantry by Marble". The app includes three main screens:

## Screens

### 1. Registration Screen
- Welcome message with "Pantry by Marble" branding
- Form fields for full name, email, mobile number, and password
- Pre-filled sample data (John Doe)
- Clear buttons (X) for each input field
- Password visibility toggle
- Sign up and "Explore our app" buttons
- Terms and conditions footer

### 2. Products Listing Screen
- "Meat" category title
- Horizontal category tabs (All, Beef, Fish, Pork, Poultry)
- "Based on your selection" and "Our products" headers
- Two-column product grid with placeholder images
- Product names and prices
- Shopping cart icons on each product
- Filter button in header

### 3. Cart Screen
- Cart title
- List of cart items with placeholder images
- Quantity controls (Remove, -, +)
- Promo code input field with Apply button
- Order summary (Sub total, Delivery, Total)
- Checkout button

## Features

- **Responsive Design**: All screens are optimized for mobile devices
- **Consistent Styling**: Shared color scheme and common styles
- **Interactive Elements**: Touchable buttons and form inputs
- **Placeholder Images**: Gray placeholder boxes where images would be
- **Navigation**: Simple tab-based navigation between screens

## Color Scheme

- Primary Green: #2D5A27 (dark green)
- Secondary Green: #4A7C59 (medium green)
- Light Green: #6B8E6B
- Background: White (#FFFFFF)
- Text: Dark gray (#2C2C2C)
- Light Text: #666666
- Borders: Light gray (#E5E5E5)

## Getting Started

1. Install dependencies:
   ```bash
   yarn install
   # or
   npm install
   ```

2. Start the development server:
   ```bash
   yarn start
   # or
   npm start
   ```

3. Use the bottom navigation tabs to switch between screens:
   - Registration
   - Products
   - Cart

## File Structure

```
src/
├── styles/
│   ├── colors.ts          # Color definitions
│   └── commonStyles.ts    # Shared styles
└── screens/
    ├── RegistrationScreen.tsx
    ├── ProductsListingScreen.tsx
    └── CartScreen.tsx
```

## Notes

- All images are replaced with placeholder gray boxes
- Form data is not persisted (resets on screen change)
- Cart functionality is simulated (no actual state management)
- Designed to match the provided UI mockups exactly
