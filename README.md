# Signalwire Click to Call - With Next.js / React and Laravel

## Introduction

This repository contains a client side application built in [Next.js](https://nextjs.org) / [React](https://reactjs.org/), and a server side application built in [Laravel](https://laravel.com/) / [Laravel Breeze](https://laravel.com/docs/starter-kits), with [Laravel Sanctum](https://laravel.com/docs/sanctum) authentication. It is essentially a Lead Generation application for a fictitious painting company with a Click to Call example powered by [Signalwire](https://signalwire.com/).


## Installation

### Server-Side App

First, clone this repository, then navigate to the backend folder and copy the `.env.example` file to `.env` and install it's dependencies with `composer install` :

```bash
#Navigate to backend...
cd backend

# Configure backend environment variables...
cp .env.example .env


# Install backend dependencies...
composer install

#Run database migration...
composer migrate
```

Finally, run the application via `php artisan serve`. The application will be available at `http://localhost:8000` per the `APP_URL` environment variable set in .env :

```
#Serve the application...
php artisan serve
```


### Client-Side App

Navigate to the frontend folder and copy the `.env.example` file to `.env.local`. Then install it's dependencies with `yarn install` or `npm install` :

```bash
# Navigate to frontend...
cd ..
cd frontend

# Configure frontend environment variables...
cp .env.example .env.local

# Install dependencies...
yarn install or npm install
```

Finally, run the application via `yarn run dev` or `npm run dev`. The application will be available at `http://localhost:3000` per the `FRONTEND_URL` environment variable set in .env.local :



## Configure Signalwire
### Configure your Signalwire number
You will have to point your `Signalwire` number to your backend apps' `/api/incoming-call` route. If your are in a local dev environment you can expose the backend app via ngrok, local-tunnel, etc; or serve the app from a live server.
In your Signalwire dashboard, configure your phone number.
```
*ACCEPT INCOMING CALLS AS...
Voice Calls

*HANDLE CALLS USING...
LaML Webhooks

*WHEN A CALL COMES IN...
https://<url-to-your-backend-app>/api/incoming-call

*METHOD...
POST
```
Next you will need your `SpaceUrl`, `ProjectId`, `Token`, `SignalwireNumber` and a personal number such as your `CellPhoneNumber` to receive forwarded calls on.
## Using the application

### Landing Page
In your browser, navigate to `http://localhost:3000`. There you will see the apps' main entry point, the Lead Generation Landing page. It Will have a click-to-call link and button in the App Bar and  Hero Section respectively. You will also see the default `(555) 555-5555` phone number displayed, at the top, on the App Bar. This number will be displayed until you set your `Signalwire credentials` and `phone number`.

### Register
Navigate to the registration page via either the `Register link` in the bottom right hand of the footer of the Landing Page, or by manually navigating to `http://localhost:3000/register`. Only one user can be registered. All other user registry attempts will receive an unauthorized request message. To change this edit the backend `RegisteredUserController.php` file.

### Dashboard
After successful registration, you will be redirected to the Admin `Dashboard Page`. Here you can see the call history for the configured `Signalwire` number after configuration.

### Settings
Here is where you will configure your `Signalwire` credentials. You will need your `SpaceUrl`, `ProjectId`, `Token`, `SignalwireNumber (which will serve as the public facing business number)`, and your `cell phone` or any other phone number that you want to receive calls from the landing page on.

Next navigate back to the `Dashboard` and you will be able to view your call history here. Also, you will see your `Signalwire` number displayed on the `Landing Page`. When the `Click To Call Now!` button is clicked it triggers a call that will be forwarded to your cell phone. The caller will hear "Thanks for calling Perfect Painters. Please hold while I connect you".

## License

Signalwire Click to Call - With Next.js / React and Laravel is open-sourced software licensed under the [GNU license](LICENSE.md).
