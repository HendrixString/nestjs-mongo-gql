# Nextjs real estate demo

This frontend supports many things:
0. signup and login with JWT (In the future I will add `refresh-token` as well)
1. API client with `graph-ql`
2. User session management, which is reactive
3. Creating assets (for Admin roles only, navigate to `/assets/create`)
4. Searching and Filttering with pagination
5. Owning an asset
6. React Hooks to support
  - `useUser` - reactive user state
  - `useAssets` - pagination and filtering

## Getting Started

First, add an env file
```bash
touch .env
```

The, fill it with your graph-ql api endpoint
```bash
NEXT_PUBLIC_API_SERVER="http://localhost:5000/graphql"
```

Then, run
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Dev Guide
`/app` - contains the nextjs app router.  
`comps` - reusable react components.  
`lib` - client lib for interacting with backend

## Todo
1. Add `refresh-token`
2. Profile page

## License
This work belongs to Tomer Shalev. If you want to use it, you will have to
be granted a permission. Opinions are my own.