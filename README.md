# Laravel CRM System

## Project Structure

```
crm-project/
├── .github/                # GitHub configuration
├── .vscode/               # VS Code settings
├── app/                   # Application core code
│   ├── Http/
│   │   ├── Controllers/   # Controllers
│   │   └── Middleware/    # Custom middleware
│   ├── Models/            # Eloquent models
│   └── Services/          # Business logic
├── bootstrap/             # Framework bootstrap files
├── config/               # Configuration files
├── database/             # Database migrations & seeds
├── node_modules/         # NPM packages
├── public/               # Public assets
├── resources/            # Frontend resources
│   ├── js/              # JavaScript/React files
│   ├── css/             # Stylesheets
│   └── views/           # Blade templates
├── routes/               # Application routes
├── storage/              # Application storage
├── tests/                # Test files
└── vendor/               # Composer packages
```

## Tech Stack

### Backend

-   Laravel 10.x
-   PHP 8.2+
-   MySQL/PostgreSQL
-   Redis (optional)

### Frontend

-   React.js
-   TypeScript
-   TailwindCSS
-   Vite

## Prerequisites

-   PHP >= 8.2
-   Composer
-   Node.js >= 18
-   NPM/Yarn
-   MySQL/PostgreSQL
-   Git

## Installation

1. Clone the repository

```bash
git clone https://github.com/your-organization/crm-project.git
cd crm-project
```

2. Install PHP dependencies

```bash
composer install
```

3. Install Node.js dependencies

```bash
npm install
```

4. Create environment file

```bash
cp .env.example .env
```

5. Generate application key

```bash
php artisan key:generate
```

6. Configure database in .env

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

7. Run migrations and seeders

```bash
php artisan migrate --seed
```

8. Build frontend assets

```bash
npm run dev
```

9. Start the development server

```bash
php artisan serve
```

## Development

### Backend Development

-   Controllers in `app/Http/Controllers`
-   Models in `app/Models`
-   Routes in `routes/web.php` and `routes/api.php`
-   Migrations in `database/migrations`

### Frontend Development

-   React components in `resources/js/components`
-   Styles in `resources/css`
-   Assets in `public`
-   Build configuration in `vite.config.js`

### Running Development Servers

```bash
# Terminal 1 - Laravel Server
php artisan serve

# Terminal 2 - Vite Dev Server
npm run dev
```

## Features

### User Management

-   Authentication
-   Role-based access control
-   User profiles
-   Activity logging

### Customer Management

-   Customer profiles
-   Contact information
-   Interaction history
-   Document management

### Lead Management

-   Lead tracking
-   Pipeline management
-   Follow-up scheduling
-   Status tracking

### Task Management

-   Task creation
-   Assignment
-   Due date tracking
-   Status updates

### Reporting

-   Dashboard analytics
-   Custom reports
-   Export functionality
-   Data visualization

## Testing

### Backend Testing

```bash
# Run PHP tests
php artisan test

# Run specific test suite
php artisan test --filter CustomerTest
```

### Frontend Testing

```bash
# Run Jest tests
npm run test

# Run with coverage
npm run test:coverage
```

## Configuration

### Main Configuration Files

-   `.env` - Environment variables
-   `config/*.php` - Application configuration
-   `vite.config.js` - Frontend build configuration
-   `tailwind.config.js` - TailwindCSS configuration

### Key Environment Variables

```env
APP_NAME=CRM
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=crm
DB_USERNAME=root
DB_PASSWORD=

MAIL_MAILER=smtp
MAIL_HOST=mailhog
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS=null
MAIL_FROM_NAME="${APP_NAME}"
```

## Deployment

1. Set up production environment

```bash
# Update environment variables
cp .env.example .env
php artisan key:generate
```

2. Install dependencies

```bash
composer install --optimize-autoloader --no-dev
npm install --production
```

3. Build frontend assets

```bash
npm run build
```

4. Configure web server

-   Set document root to `/public`
-   Configure SSL certificate
-   Set up URL rewriting

5. Optimize Laravel

```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## Security Measures

-   CSRF protection
-   XSS prevention
-   SQL injection protection
-   Input validation
-   Authentication
-   Authorization
-   Data encryption

## Maintenance

### Regular Tasks

-   Database backups
-   Log rotation
-   Cache clearing
-   Security updates
-   Performance monitoring

### Cache Management

```bash
# Clear application cache
php artisan cache:clear

# Clear config cache
php artisan config:clear

# Clear route cache
php artisan route:clear
```

## Support

-   Technical Documentation: `/docs`
-   Issue Tracking: GitHub Issues
-   Email Support: support@your-domain.com

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

### Setup .env file

-   Ask for your teammate about that

### Run backend

```
composer install
php artisan migrate
php artisan db:seed
php artisan serve
```

### Run frontend

```
npm install
npm run dev
```

### Icons

```
https://github.com/480-Design/Solar-Icon-Set-React
```
