create table presents (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  published boolean default false,
  published_at timestamptz,
  pages jsonb not null default '[]',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Public read access for published presents (no auth needed)
alter table presents enable row level security;

create policy "Public can read published presents"
  on presents for select
  using (published = true);

create policy "Anyone can insert presents"
  on presents for insert
  with check (true);

create policy "Anyone can update presents"
  on presents for update
  using (true);

-- Seed: Emma's 30th Birthday (present_1 from mock data)
insert into presents (id, slug, title, published, published_at, pages, created_at, updated_at)
values (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'emma-30th',
  'Emma''s 30th Birthday',
  true,
  '2024-11-15T10:00:00.000Z',
  '[
    {
      "id": "page_landing_1",
      "type": "landing",
      "order": 0,
      "title": "Happy 30th, Emma",
      "subtitle": "A little something special for you",
      "coverImage": null,
      "buttonLabel": "See my gifts"
    },
    {
      "id": "page_gifts_1",
      "type": "gifts",
      "order": 1,
      "title": "Choose your gift",
      "gifts": [
        {
          "id": "gift_opt_1",
          "title": "Weekend Spa Retreat",
          "description": "Two nights at a luxury spa hotel of your choice.",
          "image": null,
          "price": "$300\u2013500",
          "link": null
        },
        {
          "id": "gift_opt_2",
          "title": "Cooking Masterclass",
          "description": "A full-day hands-on class with a professional chef.",
          "image": null,
          "price": "$150\u2013250",
          "link": null
        }
      ]
    },
    {
      "id": "page_detail_1",
      "type": "gift-detail",
      "order": 2,
      "giftId": "gift_opt_1"
    },
    {
      "id": "page_detail_2",
      "type": "gift-detail",
      "order": 3,
      "giftId": "gift_opt_2"
    },
    {
      "id": "page_final_1",
      "type": "final",
      "order": 4,
      "title": "Can''t wait to celebrate with you",
      "message": "Whatever you choose, it''ll be a brilliant day. Love you lots.",
      "image": null
    }
  ]',
  '2024-11-10T09:00:00.000Z',
  '2024-11-15T10:00:00.000Z'
);
