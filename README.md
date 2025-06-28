# Product Ideas Daily

Product Ideas Daily is an Angular application that helps you discover and track daily product ideas and opportunities.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`.

## Building

To build the project run:

```bash
ng build
```

## Firebase Hosting deployment

To deploy the application to Firebase Hosting

1. Create .firebaserc file in the root directory. Example:

```json
{
  "projects": {
    "default": "????"
  }
}
```

2. Replace value in environment.ts file

3. Build the project

```bash
ng build --configuration production
```

4. Deploy to Firebase Hosting

```bash
firebase deploy --only hosting
```

