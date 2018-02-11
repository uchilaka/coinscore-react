# Building the code 
To build the static code, run the following script:
```js
yarn install && yarn build
```

To debug the script, run the following:
```js
yarn start 
```

# Publish to Github Pages
To run a build that will publish for github pages (with your next push), run the following script from the root of the project:
```
./build-for-ghpages
```

# Configuring Github Pages
* Follow the instructions at this URL: https://help.github.com/articles/troubleshooting-custom-domains/#dns-configuration-errors
* Be sure to set the custom domain to `www.coinstore.co` on github pages
* Create the following DNS records with your domain registrar:
    ```
    coinscore.co        3600    IN      A       192.30.252.153
    coinscore.co        3600    IN      A       192.30.252.154
    www.coinscore.co    3600    IN      CNAME   {{username}}.github.io
    ```