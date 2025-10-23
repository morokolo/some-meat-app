# Pantry App UI Screens

This React Native Expo app replicates the UI screens for a grocery shopping app called "Pantry by Marble". The app includes a registration flow that leads to a main app with tab navigation.

## App Flow

### 1. Registration Screen (Initial)
- Welcome message with "Pantry by Marble" branding
- Form fields for full name, email, mobile number, and password
- Pre-filled sample data (John Doe)
- Clear buttons (X) for each input field
- Password visibility toggle
- **Sign up** and **Explore our app** buttons that navigate to the main app

### 2. Main App (Tab Navigation)
After registration, users are taken to the main app with 5 tabs:

#### Home Tab
- "Meat" category title
- Horizontal category tabs (All, Beef, Fish, Pork, Poultry)
- "Based on your selection" and "Our products" headers
- Two-column product grid with placeholder images
- Product names and prices
- Shopping cart icons on each product
- Filter button in header

#### Favourites Tab
- Placeholder screen for saved items
- "Your saved items" section

#### Search Tab
- Placeholder screen for product search
- "Find your products" functionality

#### Cart Tab
- Cart title
- List of cart items with placeholder images
- Quantity controls (Remove, -, +)
- Promo code input field with Apply button
- Order summary (Sub total, Delivery, Total)
- Checkout button

#### Profile Tab
- Placeholder screen for user account
- "Your account" management

## Features

- **React Navigation**: Proper navigation flow from registration to main app
- **Tab Navigation**: Bottom tab bar with 5 main sections
- **Responsive Design**: All screens are optimized for mobile devices
- **Consistent Styling**: Shared color scheme and common styles
- **Interactive Elements**: Touchable buttons and form inputs
- **Placeholder Images**: Gray placeholder boxes where images would be
- **Navigation Flow**: Registration → Main App Tabs

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

3. Navigate through the app:
   - Start at the Registration screen
   - Click "Sign up" or "Explore our app" to enter the main app
   - Use the bottom tabs to navigate between sections

## File Structure

```
src/
├── navigation/
│   ├── AppNavigator.tsx     # Main navigation structure
│   └── TabNavigator.tsx     # Bottom tab navigation
├── styles/
│   ├── colors.ts            # Color definitions
│   └── commonStyles.ts      # Shared styles
└── screens/
    ├── RegistrationScreen.tsx
    ├── HomeScreen.tsx       # Products listing (was ProductsListingScreen)
    ├── FavouritesScreen.tsx
    ├── SearchScreen.tsx
    ├── CartScreen.tsx
    └── ProfileScreen.tsx
```

## Navigation Structure

```
App
├── Registration Screen
└── Main App (Tab Navigator)
    ├── Home (Products)
    ├── Favourites
    ├── Search
    ├── Cart
    └── Profile
```

## Notes

- All images are replaced with placeholder gray boxes
- Form data is not persisted (resets on screen change)
- Cart functionality is simulated (no actual state management)
- Designed to match the provided UI mockups exactly
- Uses React Navigation v6 for proper navigation flow
