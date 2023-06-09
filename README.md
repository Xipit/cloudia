# Cloudia Wetter Website

# Technologies

## SvelteKit

SvelteKit is a JavaScript Framework that uses [Svelte](https://svelte.dev/docs) for its components. Additionally it supports Server Side Rendering and includes a router and other state management tools.

-> https://kit.svelte.dev/docs/introduction

## Tailwind

when using style tags, they need a lang="postcss" attribute to use tailwind

-> https://tailwindcss.com/docs/guides/sveltekit


# Commonly used svelteKit features

## html form action data

html forms can be used to post data to a specific endpoint. This endpoint is usually inside the corresponding +page.server.ts for every route. These endpoints are also called Actions in sveltekit.

## load functions

+page.ts and +page.server.ts can both export a load function. This function is automatically executed when a page/route is accessed. The corresponding +page.svelte can access the return variables from the load function using `export let data: PageData;`.


# User Data in supabase

tutorial: https://supabase.com/docs/guides/auth/managing-user-data

## authentification

uses [supabase authentication](https://supabase.com/docs/guides/auth) to manage login, signup, email verification, etc...

### savedLocations (one entry per location)
- authID
- locationName
```
create table saved_locations (
  id uuid default uuid_generate_v4(),
  user_id uuid not null references auth.users on delete cascade,
  location_name text not null,

  primary key (id)
);

alter table saved_locations enable row level security;

create policy "Users can view their saved_locations."
  on saved_locations for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own saved_locations."
  on saved_locations for insert
  with check ( auth.uid() = user_id );

create policy "Users can update own saved_locations."
  on saved_locations for update
  using ( auth.uid() = user_id );

create policy "Users can delete their own saved_locations."
  on saved_locations for delete
  using ( auth.uid() = user_id );
```


### settings (one entry per person)
- authID
- temperatureUnit ('celsius', 'kelvin' or 'fahrenheit')
- speedUnit ('kmh', 'ms', 'beaufort', 'knot')
- (maybe height-/ length unit)

```
create table settings (
  id uuid not null references auth.users on delete cascade,
  temperature_unit text not null default 'celsius',
  speed_unit text not null default 'kmh',

  constraint check_temperature_unit check (temperature_unit in ('celsius', 'kelvin', 'fahrenheit')),
  constraint check_speed_unit check (speed_unit in ('kmh', 'ms', 'beaufort', 'knot')),

  primary key (id)
);

alter table settings enable row level security;

create policy "Users can view their settings."
  on settings for select
  using ( auth.uid() = id );

create policy "Users can insert their own settings."
  on settings for insert
  with check ( auth.uid() = id );

create policy "Users can update own settings."
  on settings for update
  using ( auth.uid() = id );

```

# Known Bugs

- Micro interactions in forms are broken, but theoretically there. These are the small feedback texts that show up in the page when e.g. the password is invalid.
```
{#if form?.errors?.password}
  <span class="text-red-500">
    {form?.errors?.password[0]}
  </span>
{/if}
```
