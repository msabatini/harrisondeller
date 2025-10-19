# GitHub Actions - Quick Reference

## 📋 What's Running on GitHub

### Main CI Pipeline (ci.yml)
**Triggers:** Every push to `main` or `develop`

```
┌──────────────────────────────┐
│   BACKEND JOBS (Parallel)    │    FRONTEND JOBS (Parallel)
│ ✓ Lint & Format              │    ✓ Format Check
│ ✓ Build NestJS               │    ✓ Build Angular
│ ✓ Unit Tests (Jest)          │    ✓ Unit Tests (Karma)
└──────────────────────────────┘
           ↓
┌──────────────────────────────────┐
│ VALIDATION (Dependency & Breaking │
│ Changes Detection)                 │
└──────────────────────────────────┘
           ↓
       ✅ CI Status
```

**Time:** ~3-4 minutes total
**Status Location:** GitHub → Actions tab

### PR Checks (pr-checks.yml)
**Triggers:** When opening/updating a PR

- Title format validation
- Code comment detection
- File change summary
- Test file verification
- Merge conflict detection
- Branch comparison

---

## 🔴 What Fails the Build

| Issue | What Happens | How to Fix |
|-------|--------------|-----------|
| ESLint error | Build fails | `npm run lint` → `git push` |
| Formatting error | Build fails | `npx prettier --write ...` → `git push` |
| TypeScript error | Build fails | Fix the error → `git push` |
| Test failure | Logged but continues | Fix test locally → `git push` |
| Build fails | Stops workflow | Read error message → Fix → Push |

---

## 🟢 What Makes it Pass

✅ No ESLint violations  
✅ All code properly formatted  
✅ TypeScript compiles  
✅ Backend builds successfully  
✅ Frontend builds successfully  
✅ Dependencies are valid  

Tests passing = nice but not required (logged only)

---

## 📍 How to View Results

### Step 1: Go to GitHub
```
github.com/msabatini/harrisondeller → Actions tab
```

### Step 2: Click on your workflow run
Shows: ✅ or ❌ status

### Step 3: Click on failed job (if any)
Shows: Exact error with file/line number

### Step 4: Fix locally & push
Workflow runs automatically again

---

## 💻 Run Same Checks Locally

**Before pushing, run locally:**

### Backend
```bash
cd backend

# Check everything
npm run lint
npx prettier --check "src/**/*.ts" "test/**/*.ts"
npm run build
npm run test
```

### Frontend
```bash
cd frontend

# Check everything
npx prettier --check "src/**/*.ts" "src/**/*.html" "src/**/*.scss"
npm run build
npm run test -- --no-watch --browsers=ChromeHeadless
```

---

## 🚀 Common Scenarios

### Scenario 1: You push code
```
GitHub Actions automatically:
1. Pulls your code
2. Installs dependencies
3. Runs all checks
4. Shows result in 3-4 minutes
```

### Scenario 2: ESLint fails
```
Error: Expected comma
File: src/app.module.ts
Line: 42

Local fix:
$ npm run lint
$ git add . && git commit -m "fix: lint issues"
$ git push
```

### Scenario 3: Test fails
```
Error: Expected true but got false
File: src/auth.service.spec.ts

Local fix:
1. Open the file
2. Update test assertion
3. $ npm run test
4. $ git push
```

### Scenario 4: Breaking change detected
```
⚠️ Detected changes in src/auth.controller.ts

What to do:
1. Review the API changes
2. Update tests if routes changed
3. Update documentation if routes changed
4. Push again
```

---

## 📊 Dashboard View

When you go to the **Actions** tab, you'll see:

```
✅ CI/CD Pipeline - feat: add new feature [42 seconds ago]
❌ CI/CD Pipeline - fix: bug fix [30 minutes ago]
✅ Pull Request Checks - New PR [1 hour ago]
✅ CI/CD Pipeline - docs: update readme [2 hours ago]
```

Click any row to see details.

---

## 🔔 Notifications

GitHub sends notifications when:
- ✅ Workflow completes successfully
- ❌ Workflow fails
- ⚠️ Warnings in workflow

You can change notification settings in GitHub → Settings → Notifications

---

## 🆘 Troubleshooting

### "I don't see my workflow running"
1. Check you pushed to `main` or `develop`
2. Go to Actions tab
3. If empty, wait 30 seconds and refresh
4. Check workflow file is in `.github/workflows/`

### "Workflow stuck or taking too long"
- Backend build: 45 sec
- Frontend build: 120 sec
- Tests: 60-90 sec
- Total: 3-4 minutes

If taking >5 min, something is wrong:
1. Click the run
2. Find which job is slow
3. Click that job for details

### "I can't find the error"
1. Click on failed job
2. Scroll to failed step (red ✗)
3. Expand that step to see full logs
4. Search for "error" in the output

---

## 📚 Files Created

```
.github/
  └── workflows/
      ├── ci.yml              (Main pipeline)
      └── pr-checks.yml       (PR-specific checks)

.zencoder/
  ├── CI_CD_SETUP_GUIDE.md    (This folder - detailed guide)
  └── GITHUB_ACTIONS_QUICK_REFERENCE.md (This file)
```

---

## ⚡ Tips & Tricks

**Tip 1:** Run checks locally before pushing
```bash
npm run lint && npm run build && npm run test
```

**Tip 2:** Autofix common issues
```bash
npm run lint --fix  # Auto-fixes most lint issues
npx prettier --write "src/**/*.ts"  # Auto-formats code
```

**Tip 3:** Watch GitHub Actions in real-time
- Open Actions tab
- Click the running workflow
- Refresh every 10 seconds to see progress

**Tip 4:** Add PR labels
After creating a PR, GitHub lets you add labels like:
- `bug` = This is a bug fix
- `feature` = This is a new feature
- `docs` = Documentation only
- `wip` = Work in progress

---

## 🎯 Next Steps

1. ✅ Push to GitHub (workflow runs automatically)
2. ✅ Go to Actions tab to watch
3. ✅ Fix any failures
4. ✅ Create a Pull Request
5. ✅ Watch PR checks run

**That's it! You're all set.** 🚀

---

**Questions?** See `CI_CD_SETUP_GUIDE.md` for detailed documentation.