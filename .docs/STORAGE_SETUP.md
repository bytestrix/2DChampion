# Storage Setup Guide (For Maintainers)

## Overview

This guide explains how to set up Supabase Storage for profile pictures.

**Note:** This is maintainer-only documentation. Contributors don't need storage access.

---

## Profile Picture Storage

### Bucket: `DP`

**Purpose:** Store user profile pictures  
**Access:** Public read, authenticated write  
**File Size Limit:** 500KB

---

## Setup Steps (Supabase Dashboard)

### 1. Create Bucket

1. Go to **Supabase Dashboard** → **Storage**
2. Click **"New bucket"**
3. Configure:
   - **Name:** `DP`
   - **Public bucket:** ✅ ON (so images can be displayed publicly)
   - **File size limit:** 500 KB (or 0.5 MB)
   - **Allowed MIME types:** Leave empty (all image types allowed)

### 2. Set Up Policies

You need to create **Row Level Security (RLS)** policies for the bucket.

Go to **Storage** → **Policies** and create policies with these rules:

#### Required Policies:

**Policy 1: Allow Upload**
- Operation: INSERT
- Target: Authenticated users
- Purpose: Let logged-in users upload profile pictures

**Policy 2: Allow Read**
- Operation: SELECT
- Target: Public
- Purpose: Let anyone view profile pictures

**Policy 3: Allow Update**
- Operation: UPDATE
- Target: Authenticated users
- Purpose: Let users replace their profile pictures

**Policy 4: Allow Delete**
- Operation: DELETE
- Target: Authenticated users
- Purpose: Let users remove old profile pictures

---

## Verification

After setup, verify:

1. ✅ DP bucket exists and is public
2. ✅ File size limit is 500KB
3. ✅ 4 RLS policies are active
4. ✅ Test upload from profile page works

---

## Troubleshooting

### "Row violates row-level security policy" Error

**Cause:** Policies not set up correctly  
**Fix:** Check that all 4 policies exist and are enabled

### Upload Fails with 400 Error

**Possible causes:**
- Bucket doesn't exist
- Bucket is not public
- File exceeds size limit (500KB)
- RLS policies missing

**Fix checklist:**
1. Verify bucket name is exactly `DP`
2. Ensure "Public bucket" is toggled ON
3. Check file size limit is set to 500KB
4. Verify all 4 policies exist

### Images Not Displaying

**Possible causes:**
- Bucket is not public
- SELECT policy missing

**Fix:**
1. Go to Storage → DP → Settings
2. Enable "Public bucket"
3. Add SELECT policy for public access

---

## Security Best Practices

### ✅ DO:
- Keep bucket public for read access (so images display)
- Limit upload to authenticated users only
- Set reasonable file size limits (500KB)
- Use policies to control access

### ❌ DON'T:
- Share database credentials publicly
- Allow anonymous uploads
- Remove RLS policies (security risk)
- Set file size limit too high (storage costs)

---

## File Naming Convention

Profile pictures are stored with this naming pattern:
```
{userId}-{timestamp}.{extension}
```

Example:
```
8c6efb46-36bb-4300-9239-869d90991f2d-1771226281256.jpg
```

This ensures:
- Each user's files are uniquely identified
- No filename conflicts
- Easy to track who uploaded what

---

## Integration with Frontend

The `ProfilePictureUpload.tsx` component handles:
- ✅ File selection and validation
- ✅ Preview before upload
- ✅ Size checking (500KB limit)
- ✅ Upload to DP bucket
- ✅ Database profile update
- ✅ Error handling

No changes needed to the component if setup is correct.

---

## Cost Considerations

Supabase Storage pricing:
- **Free tier:** 1GB storage, 2GB bandwidth
- **Pro tier:** 100GB storage, 200GB bandwidth

**500KB per user** means:
- Free tier: ~2,000 users
- Pro tier: ~200,000 users

Monitor usage in Supabase Dashboard → Settings → Usage

---

## For Contributors

**You don't need to set this up!**

Contributors work on:
- Game components
- UI improvements
- Documentation
- Bug fixes

Maintainers handle all database and storage configuration.

---

## Contact

For setup help or issues, contact the repository maintainer:
- **Email:** bytestrix@gmail.com
- **GitHub:** [@bytestrix](https://github.com/bytestrix)
