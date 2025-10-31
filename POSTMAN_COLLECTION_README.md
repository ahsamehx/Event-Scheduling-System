# Event Scheduling System - Postman Collection

## Importing the Collection

1. Open Postman
2. Click **Import** in the top left
3. Drag and drop the `Event-Scheduling-System.postman_collection.json` file or browse to select it
4. Click **Import**

## Collection Structure

The collection is organized into the following folders:

### 1. Welcome
- **GET /** - Simple endpoint to verify the server is running

### 2. Authentication
- **POST /api/v1/auth/sign-up** - Register a new user
- **POST /api/v1/auth/sign-in** - Sign in with credentials
- **POST /api/v1/auth/sign-out** - Sign out

### 3. Users (Admin Only)
- **GET /api/v1/users** - Get all users
- **GET /api/v1/users/:id** - Get user by ID
- **PUT /api/v1/users/update/** - Update own user details
- **PUT /api/v1/users/update/:id** - Update any user (Admin)
- **PATCH /api/v1/users/changePassword/** - Change own password
- **PATCH /api/v1/users/changePassword/:id** - Change any user's password (Admin)
- **PATCH /api/v1/users/changeRole/:id** - Change user role (Admin)
- **DELETE /api/v1/users/delete/:id** - Delete user (Admin)

## Environment Variables

The collection uses the following environment variables:

- `base_url` - Set to `http://localhost:3000` by default
- `auth_token` - Automatically stored after signing in

### Setting Up Environment

1. In Postman, click on **Environments** in the left sidebar
2. Create a new environment named "Local Development" or use the existing one
3. Add the following variables:
   - **base_url**: `http://localhost:3000`
   - **auth_token**: (leave empty, will be auto-filled after sign in)

## Testing Flow

### Prerequisites
Make sure your server is running:
```bash
npm run dev
```

### Recommended Testing Order

1. **Start with Sign Up** to create a new user account with admin role
2. **Sign In** to authenticate and receive a token
3. The token is automatically stored in the `auth_token` variable
4. Use the authenticated endpoints in the Users folder

### Sample Test Data

#### Sign Up
```json
{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "SecurePass123!",
    "role": "admin"
}
```

#### Sign In
```json
{
    "email": "john.doe@example.com",
    "password": "SecurePass123!"
}
```

#### Update User
```json
{
    "name": "Updated Name",
    "email": "updated@example.com"
}
```

#### Change Password
```json
{
    "currentPassword": "SecurePass123!",
    "newPassword": "NewSecurePass123!"
}
```

#### Change Role
```json
{
    "role": "admin"
}
```

## Automatic Token Management

The collection includes pre-request scripts that automatically:
- Extract the authentication token from Sign Up and Sign In responses
- Store it in the `auth_token` environment variable
- Use it in subsequent requests requiring authentication

## Notes

- **Admin Role Required**: Most user management endpoints require an admin role
- **Authentication**: Token is required for all endpoints except Sign Up
- **Port**: Make sure your server is running on port 3000 (or update `base_url`)
- **CORS**: Configured to allow requests from `http://localhost:5173`

## Troubleshooting

### Token Not Working
- Make sure you've run Sign In successfully before using authenticated endpoints
- Check that the token was stored in the `auth_token` variable

### 403 Forbidden
- Ensure you're using an admin account
- Verify the token is valid and not expired

### 404 Not Found
- Verify the server is running
- Check that `base_url` is correct

### Connection Refused
- Make sure the server is running on the specified port
- Check your `.env` file for the correct PORT value

