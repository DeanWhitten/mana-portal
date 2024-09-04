# ManaVault Web Portal

## Overview
The ManaVault Web Portal is a React-based application designed to manage and display information about Magic: The Gathering cards. It includes features like favoriting cards, filtering and searching for cards, pagination, and theme customization. The app integrates with IndexedDB for offline data storage, allowing users to save their favorite cards and settings even when they are not connected to the internet.

## Features
- **Search and Filter**: Search for Magic: The Gathering cards and apply filters to narrow down the results by attributes such as color, rarity, type, and set.
- **Favorites**: Save cards to your favorites list, view them on the favorites page, and access them offline.
- **Pagination**: Easily navigate through large sets of cards using a custom pagination component.
- **Card Overlay**: Click on a card to view detailed information in an overlay, which includes additional data about the card.
- **Settings**: Customize your experience with options for offline mode and theme selection (light/dark mode). These settings are saved in IndexedDB for persistence.
- **Offline Support**: Leveraging IndexedDB, the application supports offline functionality, allowing users to access their favorite cards and settings without an internet connection.

## Getting Started
### Prerequisites
- Node.js (version 14.x or above)
- npm (version 6.x or above)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/mana-vault-web-portal.git
   cd mana-vault-web-portal
   
2. Install dependencies:
   ```bash
    npm install
   
3. Start the development server:
    ```bash
    npm start

## Usage
- Search and Filter
  -- Use the search bar and filter dropdowns in the sidebar to search and filter Magic: The Gathering cards. The results will be displayed on the main page with pagination controls for easy navigation.
- Favorites
  -- Click the star icon on any card to add it to your favorites. Access your favorited cards via the "Favorites" page, where they will be stored locally using IndexedDB. The favorites list is paginated for ease of navigation.
- Card Overlay
  -- Clicking on any card will bring up a detailed overlay with additional information about the card. This overlay is accessible from both the search results and favorites pages.
- Settings
  -- Access the settings page via the sidebar. Here, you can toggle offline mode, switch between light and dark themes, and clear your local storage. These settings are persisted using IndexedDB.

## File Structure
- src/components/: Contains all React components used in the application.
    - card/: Contains components related to card display, including CardList and CardOverlay.
    - sidebar/: Contains the sidebar component and related menu items.
    - settings/: Contains the settings page component.
- src/store/: Contains Redux slices and store configuration.
- src/types/: TypeScript type definitions.
- src/utils/: Utility functions, including IndexedDB-related functions.

## IndexedDB Integration
The application uses IndexedDB to store favorites and settings locally. The IndexedDB schema includes two object stores: favorites for storing card data and settings for storing user preferences. These are managed through utility functions in src/utils/indexedDB.ts.
