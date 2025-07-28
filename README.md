## Main Goal

My main goal was to keep everything as simple as possible, that’s something I always try to stick to when coding. I focused on exactly what was asked in the requirements, with just a couple of small extras. For example, I added an email field, which I thought made sense and still fits within the MVP approach.

To keep things simple, I avoided bringing in extra libraries. For example, instead of using AutoMapper and FluentValidation (which I do like), I handled mapping and validations manually to keep the code straightforward.

## Deployed to Azure App Service using GitHub Actions.

I also deployed the code to my private Azure App Serive and can be accessed here:

https://uk-fernando-magrina-interview.azurewebsites.net/

## Node.js Version

- I started the project using Node.js v20.16.0 LTS, as mentioned in the README from UK Parliament - Product Team Home Exercise.

- But when I tried running the Angular tests, I got an error saying it needed Node.js v20.19 or higher.

- I switched to v20.19.4, ran everything again, and the Jasmine tests now work fine.

<img width="1429" height="177" alt="image" src="https://github.com/user-attachments/assets/2479f888-fbac-427e-ac5c-3a8b40b694e5" />

## Tests

I focused on testing `person-editor.component.spec` since that’s where most of the key functionality and validations are.

I reused the edit-person section for both creating and updating users, so I removed the `getById` method as it wasn’t needed anymore.
