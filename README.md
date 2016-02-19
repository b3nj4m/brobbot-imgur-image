# brobbot-imgur-image

A brobbot plugin for image searches.

```
brobbot image [me] <query>
```

Searches Imgur for `query` and returns 1st result's URL.

```
brobbot animate [me] <query>
```

Searches Imgur for `query` and tries to return the first animated GIF result.

## Configuration

### Client ID

```bash
BROBBOT_IMGUR_IMAGE_CLIENT_ID=ID
```

Set the client ID used to connect to the Imgur API.
See https://api.imgur.com
