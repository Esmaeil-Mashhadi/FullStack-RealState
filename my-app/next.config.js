/** @type {import('next').NextConfig} */
module.exports = {
    webpack: (config) => {
      config.resolve.fallback = {
        "mongodb-client-encryption": false ,
        "aws4": false
      };
  
      return config;
    }}
