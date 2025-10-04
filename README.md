
# Crypto Exchanges Purchase Outputs Comparison Tool [![Vercel](https://skillicons.dev/icons?i=vercel&theme=dark&perline=15)](https://fee-comparison.vercel.app/)

A simple React-Vite app that displays maker/taker outputs of various digital assets across different crypto exchanges. It’s built with TypeScript for type safety and Vite for fast development and optimized builds.



<p align="center">
  <a href="https://skillicons.dev">
    <img src="demo.gif" />
  </a>
</p>

# Tech Stack
<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=react,vite,typescript" />
  </a>
</p>

# Features
- Filter entries by pairs / exchanges
- Sort results in ascending / descending orders
- Pagination for large entries
- Mobile devices support


# Setup

1. Clone the repo
```
git clone https://github.com/7moodev/fee-comparison.git
cd fee-comparison
```
2. Install dependencies
```
npm install
```
3. Run locally
```
npm run dev
```
4. Build for production
```
npm run build
```
5. Preview the production build
```
npm run preview
```



# General Assumptions:
- The key 'fees' in the provided data object contained maker/taker outputs for various notionals. The values 100, 500, and 1000 were interpreted as quote amounts (in this case, EUR), and their corresponding entries represent the resulting token outputs.
- Instead of a simple text-based search bar for tokens and exchanges, a searchable dropdown (combo box) was implemented to enhance user experience and usability.
- The formatting transformation from XRPEUR → XRP/EUR was implemented using a predefined list of common quote assets. In future iterations, this approach can be extended to dynamically support additional quote currencies.

