# Snippet Box

![Snippet library screenshot](./.github/img/snippets.png)

## Description

Snippet Box is a simple self-hosted app for organizing your code snippets. It allows you to easily create, edit, browse and manage your snippets in various languages. With built-in Markdown support, Snippet Box makes it very easy to add notes or simple documentation to your code.

## Technology

- Backend
  - Node.js
  - Typescript
  - Express.js
  - Sequelize ORM + SQLite
- Frontend
  - React
  - TypeScript
  - Bootstrap
- Deployment
  - Docker

## Development

```sh
# clone repository
git clone https://github.com/pawelmalak/snippet-box
cd snippet-box

# install dependencies (run only once)
npm run init

# start backend and frontend development servers
npm run dev
```

## Installation

### With Docker

#### Docker Hub

[Docker Hub image link](https://hub.docker.com/r/pawelmalak/snippet-box).
For arm platforms use `:arm` tag.

#### Building image

```sh
# Building image for Linux
docker build -t snippet-box .

# Build image for ARM
docker buildx build \
  --platform linux/arm/v7,linux/arm64 \
  -f Dockerfile.arm \
  -t snippet-box:arm .
```

#### Deployment

```sh
# run container
# for ARM use snippet-box:arm tag
docker run -p 5000:5000 -v /path/to/data:/app/data snippet-box
```

#### Docker Compose

```yaml
version: '3'
services:
  snippet-box:
    image: pawelmalak/snippet-box:latest
    container_name: snippet-box
    volumes:
      - /path/to/host/data:/app/data
    ports:
      - 5000:5000
    restart: unless-stopped
```

### Without Docker

Follow instructions from wiki - [Installation without Docker](https://github.com/pawelmalak/snippet-box/wiki/Installation-without-Docker)

## Functionality

- Search
  - Search your snippets with built-in tags and language filters
- Pinned snippets
  - Pin your favorite / important snippets to home screen for easy and quick access

![Homescreen screenshot](./.github/img/home.png)

- Snippet library
  - Manage your snippets through snippet library
  - Easily filter and access your code using tags

![Snippet library screenshot](./.github/img/snippets.png)

- Snippet
  - View your code, snippet details and documentation
  - Built-in syntax highlighting
  - Easily perform snippet actions like edit, pin or delete from a single place

![Snippet screenshot](./.github/img/snippet.png)

- Editor
  - Create and edit your snippets from simple and easy to use editor

![Editor screenshot](./.github/img/editor.png)

## Usage

### Search functionality

Visit wiki for search functionality and available filters reference: [Search functionality](https://github.com/pawelmalak/snippet-box/wiki/Search-functionality)
