# Cloudia Wetter Website

# Use tailwind css

start using tailwind classes in html!
when using style tags, they need a lang="postcss" attribute to use tailwind

-> https://tailwindcss.com/docs/guides/sveltekit


# User Data in supabase

tutorial: https://supabase.com/docs/guides/auth/managing-user-data

data:
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

````
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