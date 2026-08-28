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


## ⚠️ Mongoose `pre('save')` hook — async vs next() (IMPORTANT)

**Rule:** Never mix `async` function with `next` parameter in Mongoose hooks.
Causes: `TypeError: next is not a function`

### ❌ Wrong (async + next mixed)
```js
UserModel.pre('save', async function(next){
    if(!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
})
```

### ✅ Correct (async, no next)
```js
UserModel.pre('save', async function(){
    if(!this.isModified("password")) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});
```

### Why it works without `next()`
- `async` function automatically returns a **Promise**.
- Mongoose tracks that Promise internally — when it **resolves** (function returns/ends), Mongoose treats it as "done, proceed with save."
- No manual signal (`next()`) needed — the Promise resolving *is* the signal.

### Two valid patterns (don't mix)
| Style | Use `next`? | Use `async/await`? |
|---|---|---|
| Callback-based | ✅ Yes — call `next()` when done | ❌ No |
| Async/Promise-based | ❌ No — just `return`/`throw` | ✅ Yes |

### Don't confuse with Express middleware `next`
```js
// Express middleware — next() IS required, unrelated to Mongoose
const auth = async (req, res, next) => {
    ...
    next(); // tells Express to move to next handler — always needed here
}
```
Express doesn't auto-track Promises like Mongoose hooks do — `next()` must always be called manually in Express middleware/routes, regardless of `async`.


# install  cookie-parser
# use middleware app.use(cookieParser()).

# create a getme route when page referh than that route caals and get user info and maintain userinfo in redux 

# jest — testing framework (test likhne aur run karne ke liye)
# supertest — API endpoints ko bina real server chalaye test karne ke liye
# mongodb-memory-server — fake temporary MongoDB, taaki real database touch na ho


-- mongodb-memory-server	RAM mein ek fake temporary MongoDB banata hai — test ke baad khatam ho jaata  -- hai. Real database ko chhuta bhi nahi.upertest	Bina real server chalaye (app.listen()), Express app -- pe directly HTTP requests bhejta hai
-- jest	Poora test run + assertions karta hai (jo already samajh chuke ho)

# npm install groq-sdk