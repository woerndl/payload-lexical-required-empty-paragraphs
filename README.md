# Required Lexical field accepts two empty paragraphs

Minimal reproduction on the blank template, Payload 3.91.0. The `posts` collection has one field: `{ name: 'body', type: 'richText', required: true }`, with the default `lexicalEditor()`.

## Run

Tested with Node 22.23.4 and pnpm 10.34.7. Payload needs a running MongoDB.

```sh
cp .env.example .env     # set DATABASE_URL and PAYLOAD_SECRET
docker compose up -d mongo   # MongoDB on port 27017, as in the example DATABASE_URL
pnpm install
pnpm generate:importmap
pnpm dev
```

## Admin

1. Create the first user, then open Posts and click Create New.
2. Click Save without touching Body. The save fails with "This field is required."
3. Click into Body and press Enter once. The editor now holds two empty paragraphs.
4. Click Save. The post is created.

## Local API

```sh
pnpm payload run src/repro.ts
```

Output:

```
one empty paragraph: rejected (The following field is invalid: Body)
two empty paragraphs: saved <id>
```
