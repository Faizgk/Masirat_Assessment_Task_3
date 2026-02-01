Brief note on how I would secure API calls in production :

1. Authentication and Authorisation
   In production, we can't give the data to the client without authenticating the request.
   We can use JWT (JSON Web Tokens) to handle the authentication and authorisation
   When a user logs in, the server gives them a signed access token that has an expiry. Every time React asks for blog posts, it must pass the access token in the request header. if no token was passed, the server rejects the request stating "Access Denied."
   Additionally, authorization ensures that while any logged-in user can read posts, only users with a certain roles such as ADMIN have the permissions to perform certain action/request like create or delete post.
   Authorization can be performed by having the role of user be added to the access token when the user logs in.

2. Environment Variables
   Currently, the backend URL and API keys are hardcoded in the source code, which is a major security risk if the code is pushed to a public repository. To fix this, we use Environment Variables (.env files). This allows us to keep sensitive configuration such as database credentials in a separate file that stays on the server. The application reads these values only at runtime, keeping our secrets safe from the public eye.

3. Rate Limiting
   To protect our server from being overwhelmed, we need to limit how many requests a user can make in a short period. We can achieve this by Rate Limiting on the backend Spring Boot side to track the frequency of requests from a specific IP address or user. If a bot or a malicious user attempts to hit the "Refresh" button thousands of times to crash the site (i.e, DDoS attack), the server will return "Too Many Requests" error to maintain stability for everyone else.

4. CORS (Cross-Origin Resource Sharing)
   Browsers block scripts from making requests to a different domain than the one that served the web page. To allow our React app to talk to the backend Java/Spring Boot API, we must configure a CORS Policy on the backend. we can authorize our frontend by whitelisting it's domain, but if a request comes from an unauthorized domain, then the server will block it preventing malicious websites from making requests to our API.
