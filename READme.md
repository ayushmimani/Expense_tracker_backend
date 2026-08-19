# create config folder
  ## db.jd

# Controller  
# Models
# routes
# app.js
# server.js

# install Express, moongose, cors, dotenv
# install nodemon
# install react-toastify for notification alert
# install bcrypt

# create a schema 
# write logic in controller
# create route


## 🔐 Authentication (JWT)

### How it works
- **Register/Login** → server generates a JWT (`jsonwebtoken`) signed with `JWT_SECRET`, sent back to client.
- Client stores token (localStorage) and attaches it in every request:
  `Authorization: Bearer <token>`
- **Protected routes** use a `protect` middleware that verifies the token before allowing access.

### Password Security
- Passwords are **never stored in plain text**.
- `userSchema.pre("save")` hook auto-hashes password (via `bcrypt`) right before saving —
  only runs if password field was modified (`isModified("password")`) to avoid re-hashing on every save.
- `bcrypt.genSalt(10)` → generates random salt (10 = cost factor, security/speed tradeoff).
- `bcrypt.hash(password, salt)` → one-way hash, cannot be reversed.

### Login Verification
- `userSchema.methods.matchPassword()` → instance method available on every fetched user document.
- Called as `user.matchPassword(enteredPassword)` → `this` = the `user` document (JS rule: `this` = object before the dot).
- `this.password` = already-hashed password fetched via `User.findOne()` earlier — no extra DB call inside this method.
- `bcrypt.compare(entered, hashed)` re-hashes entered password internally and compares — returns `true`/`false`.

### Middleware (`protect`)
- Reads `Authorization` header → extracts token → `jwt.verify(token, JWT_SECRET)`.
- Decoded payload has `{ id: userId }` → fetch user from DB → attach as `req.user`.
- If invalid/missing token → `401 Unauthorized`.

### Key Files
| File | Purpose |
|---|---|
| `models/User.js` | Schema + password hashing + matchPassword |
| `utils/generateToken.js` | Signs JWT with user id |
| `controllers/authController.js` | register/login logic |
| `middleware/authMiddleware.js` | `protect` — verifies token on protected routes |

### Why this matters (interview points)
- Plain text passwords never touch the DB.
- Stateless auth (no session storage needed on server).
- Each user's data isolated via `user: req.user._id` on models.

# System	Import	Export
- CommonJS (jo tum baaki jagah use kar rahe ho)	require(...)	  module.exports = ...
- ES Modules	import ... from ...	   export default ...
