# Deployment Guide (CN + Global)

The workflow `.github/workflows/deploy-dual-sites.yml` is now in the repository.

It will run on every push to `master` and run two jobs:

- `deploy-netlify-cn` -> deploy to Netlify (domestic region)
- `deploy-vercel-global` -> deploy to Vercel (global region)

## 1) GitHub push status

Current branch is synced:

- Remote: `origin/master`
- Last commit: `17bf4f6`

## 2) Required GitHub Actions Secrets

Open `Settings -> Secrets and variables -> Actions` and add:

### Netlify (CN)
- `NETLIFY_AUTH_TOKEN`
- `NETLIFY_SITE_ID`

### Vercel (Global)
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## 3) How to link domains

1. In Netlify dashboard, connect this GitHub repo and copy Site ID.
2. In Vercel dashboard, create/open the matching project and copy Org ID / Project ID.
3. Add the secrets above, then run workflow:
   `Actions -> Deploy Site (CN + Global) -> Run workflow`.

## 4) First publish check

- After secrets are in place, run one manual workflow to verify both jobs finish.
- Future commits to `master` will auto-trigger both deploy jobs.
- If one site fails, open the failed job logs and check the corresponding platform token / project binding.
