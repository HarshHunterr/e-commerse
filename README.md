# Namita Suit Sansaar - Production Ready E-commerce

A dark-themed full-stack e-commerce platform for women’s suits and ethnic wear, built with **Next.js + MongoDB**.

## Features
- JWT auth (register/login/logout) with secure password hashing.
- Google Login via NextAuth + user sync to custom JWT session.
- Role-based routes (`admin`, `user`) with middleware protection.
- Landing page, product listing/search/filter, product details.
- Cart + checkout (COD and UPI) + user order history.
- Admin dashboard: products CRUD, order status management, customer listing.
- Input validation via Zod, sanitized DB interactions through Mongoose.
- Responsive premium UI (dark + gold), toast notifications, loading skeletons.

## Folder Structure
- `app/` - pages + API routes
- `components/` - reusable UI/client components
- `models/` - MongoDB schemas (User, Product, Order)
- `lib/` - DB connection, auth, guards, validators
- `middleware.ts` - admin route protection

## Database Models
- **User**: name, email, password, role, provider, createdAt
- **Product**: title, description, price, images[], stock, category, createdAt
- **Order**: userId, products[], totalAmount, fullName, address, phone, pincode, status, paymentMethod, createdAt

## Local Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy env:
   ```bash
   cp .env.example .env.local
   ```
3. Update env values.
4. Run dev server:
   ```bash
   npm run dev
   ```

## Default Admin Credentials
Create one user, then update role to `admin` in MongoDB manually (changeable anytime).
Example login after role change:
- Email: `admin@namita.com`
- Password: `Admin@123`

## Deployment Guide
### Frontend + Backend (single Next.js app)
- Deploy to **Vercel** (recommended):
  1. Push repo to GitHub.
  2. Import project in Vercel.
  3. Add all environment variables from `.env.example`.
  4. Deploy.

### Database
- Use **MongoDB Atlas**:
  1. Create cluster.
  2. Add DB user and allow network access.
  3. Copy connection string into `MONGODB_URI`.

### Alternative split deployment
- Host app on Render/Railway (Node service) and use Atlas DB.

## Security Notes
- Use strong JWT/NextAuth secrets.
- Keep cookies HTTP-only.
- Restrict admin role access and rotate credentials regularly.
