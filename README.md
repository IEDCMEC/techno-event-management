<div align="center">
  <h1 align="center">Techno Event Management</h1>
  <h3>A powerful event management suite.</h3>
</div>

<div align="center">
  <a href="#">technoevent.live</a>
</div>

<br/>

<div align="center">
  <a href="https://github.com/alapanoski/qr/stargazers"><img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/iedc/technoevent"></a>
  <!-- <a href="#"><img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/technoevent"></a> -->
  <!-- <a href="https://github.com/mfts/papermark/blob/main/LICENSE"><img alt="License" src="https://img.shields.io/badge/license-AGPLv3-purple"></a> -->
</div>

<br/>

Techno Event Management is an event management suite which helps with managing all aspects of an event from registration to tracking participants during the event and more.

## Features

- **Real-time participant tracking:** Track all the participants using a qr code during the event.
- **Analytics:** Get insights about the event.

<!-- ## Demo

![Techno Event Welcome GIF](.github/images/techno-welcome.gif) -->

## Getting Started

### Prerequisites

Here's what you need to be able to run Techno Event:

- Node.js (version >= 18)
- PostgreSQL

### 1. Clone the repository

```shell
git clone https://github.com
cd techno-event-management
```

### 2. Install npm dependencies

```shell
pnpm install
```

### 3. Copy the environment variables to `.env`

```shell
cp .env.example .env
```

### 4. Configure the variables in `.env`

| Variable        | Value                                  |
| --------------- | -------------------------------------- |
| NEXTAUTH_SECRET | a random string                        |
| NEXTAUTH_URL    | < Your base doamin or localhost:3000 > |

### 5. Run the dev server

```shell
pnpm run dev
```

### 6. Open the app in your browser

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Our Contributors ✨

<a href="https://github.com/alapanoski/qr/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=alapanoski/qr" />
</a>
