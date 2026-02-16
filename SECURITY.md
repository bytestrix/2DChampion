# Security Guidelines for 2D Champion

## ⚠️ **Important Security Practices**

### 1. **Never Commit Credentials**
The following files are already in `.gitignore` and should NEVER be committed:
- `.env`
- `.env.local`
- `.env*.local`
- Any file containing Supabase credentials (URL, anon key, service role key)

### 2. **Supabase Credentials**
Your Supabase credentials should ONLY be stored in:
- `/web/.env.local` (for local development)
- Your deployment platform's environment variables (Vercel, Netlify, etc.)

**Never share:**
- `SUPABASE_SERVICE_ROLE_KEY` - This has admin access to your database
- Database connection strings with passwords
- API keys or secrets

### 3. **What's Safe to Share**

**✅ Safe to commit:**
- `schema.sql` - Database structure (no credentials)
- `*.sql` migration files - Structure changes only
- Client-side code in `/web/src`
- Public documentation

**❌ Never commit:**
- `.env` files with credentials
- Supabase dashboard URLs with tokens
- Service role keys
- Database passwords

## 🔒 **Contributor Access**

### For Contributors
Contributors **DO NOT** need:
- Supabase access
- Database credentials
- Admin privileges

Contributors **ONLY** need:
- GitHub account to submit PRs
- Access to fork the public repository
- Ability to build and test games locally (without database if needed)

### For Maintainers
Maintainers handle:
- Database management
- Game registration in Supabase
- Deployment and production environment
- Reviewing and merging PRs

## 🛡️ **Row Level Security (RLS)**

The database uses RLS policies to ensure:
- Users can only update their own profiles
- Users can only submit scores for themselves
- Public data is readable by everyone
- Sensitive operations require authentication

## 📝 **Contribution Workflow**

1. **Contributor** creates game component and submits PR
2. **Maintainer** reviews code for security issues
3. **Maintainer** registers game in Supabase
4. **Maintainer** deploys and enables game on platform

This keeps database access restricted to trusted maintainers while allowing open collaboration.

## 🔍 **Security Checklist for Maintainers**

Before deploying:
- [ ] Verify no `.env` files are in git history
- [ ] Check all environment variables are set in deployment platform
- [ ] Ensure RLS policies are enabled on all tables
- [ ] Review new code for SQL injection vulnerabilities
- [ ] Test authentication flows
- [ ] Verify API keys are stored securely

## 📚 **Additional Resources**

- [Supabase Security Best Practices](https://supabase.com/docs/guides/auth/row-level-security)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [GitHub Security Best Practices](https://docs.github.com/en/code-security/getting-started/best-practices-for-preventing-data-leaks)
