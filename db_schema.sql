-- Enable Row Level Security
-- Note: auth.users usually has RLS enabled by default. we cannot alter it here.

-- 1. Profiles: Stores additional user specific data
create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  email text,
  username text,
  avatar_url text,
  updated_at timestamp with time zone,
  
  primary key (id),
  constraint username_length check (char_length(username) >= 3)
);

alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- 2. Produits (Products)
-- Simplified structure. In a real app, might need more fields like sku, stock, etc.
create table public.products (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  price numeric,
  image_url text,
  category text,
  brand text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.products enable row level security;

-- Products should be viewable by everyone (public)
create policy "Products are viewable by everyone"
  on products for select
  using ( true );

-- Only authenticated users (or service role) can insert/update - simplistic approach
-- Ideally, reserved for admins. For now, we'll leave insert/update policies disabled 
-- which means only service_role can modify data, which is safe.

-- 3. Historique recherches (Search History)
create table public.search_history (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  query text not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.search_history enable row level security;

-- Users can see their own history
create policy "Users can view own search history"
  on search_history for select
  using ( auth.uid() = user_id );

-- Users can insert their own history
create policy "Users can create search history"
  on search_history for insert
  with check ( auth.uid() = user_id );

-- 4. Sélections produits (Selections/Wishlist)
create table public.product_selections (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  product_id uuid references public.products(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.product_selections enable row level security;

-- Users can view their own selections
create policy "Users can view own selections"
  on product_selections for select
  using ( auth.uid() = user_id );

-- Users can insert selections
create policy "Users can add selections"
  on product_selections for insert
  with check ( auth.uid() = user_id );

-- Users can delete their own selections
create policy "Users can remove selections"
  on product_selections for delete
  using ( auth.uid() = user_id );
