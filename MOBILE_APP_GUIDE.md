# Waduha — Mobile App Install Guide

Two ways to get the app on your phone, depending on platform.

## 🅰️ Quickest path — install the PWA (no developer accounts, $0)

The website is now a **PWA** (Progressive Web App). It can be installed straight from Safari/Chrome with no App Store, no review, no $99/year fees.

### iPhone (iOS)
1. Open **https://karama-pantry-web.vercel.app** in Safari
2. Tap the **Share** button (square with up-arrow)
3. Scroll down → tap **"Add to Home Screen"**
4. Tap **Add**
5. Done — Waduha logo appears on your home screen, opens fullscreen like an app

### Android
1. Open the site in Chrome
2. Banner pops up: **"Install Waduha App"** → tap it
3. (Or: 3-dot menu → "Install app" / "Add to Home Screen")
4. Done — installs as an app, including in the app drawer

**The PWA install prompt now auto-shows** on first visit (after 8–12 seconds, dismissible for a week).

---

## 🅱️ Native app — install via Xcode / Android Studio (real `.apk` / `.ipa`)

If you want to test the **real native app** before paying $99/year for Apple Developer or $25 one-time for Google Play, you can sideload it for testing.

### iPhone — via Xcode (free, 7-day install)

**Requirements:**
- ✅ Mac with Xcode (already installed)
- ✅ Apple ID (free — any Apple ID works)
- ✅ USB cable (or wireless pairing once enabled)

**Steps:**

1. Open the iOS project:
```bash
cd ~/claudecode/karama-pantry-web
npx cap open ios
```
Xcode will open with the **App** project loaded.

2. **First time only**: Xcode will resolve Swift Package dependencies (~1 min). Wait for "Package Resolution" to finish.

3. Connect your iPhone via USB. Trust the computer if prompted.

4. In Xcode top toolbar, click the device picker (says "Any iOS Device") → select **your iPhone**.

5. Click **Signing & Capabilities** tab in left sidebar. In the **Team** dropdown:
   - Select **"Add an Account..."** → sign in with your Apple ID
   - Pick the team that appears (your name + Personal Team)

6. Click the **▶ Play** button in top-left. Xcode builds the app and installs it on your iPhone.

7. **First launch on iPhone**: iOS shows "Untrusted Developer" warning.
   - Settings → General → VPN & Device Management → tap your Apple ID → **Trust**
   - Re-open the app

8. ⚠️ **7-day expiry**: Apps signed with a free Apple ID expire after 7 days. Just re-run step 6 to re-install.

**To remove the 7-day limit**, you need an Apple Developer account ($99/year). With that, you upload to TestFlight and the app works for 90 days per build.

### Android — via Android Studio (free, no expiry)

**Requirements:**
- Install **Android Studio**: download free at https://developer.android.com/studio
  - Or via Homebrew: `brew install --cask android-studio`
  - First run downloads ~3 GB of SDK tools (~30 min on slow connection)

**Steps:**

1. Open the Android project:
```bash
cd ~/claudecode/karama-pantry-web
npx cap open android
```
Android Studio opens with the project. Wait for Gradle sync to finish (~2 min first time).

2. **Plug in your Android phone** via USB. On the phone:
   - Settings → About phone → tap **Build number** 7 times → developer mode unlocked
   - Settings → Developer options → enable **USB debugging**
   - Approve the USB debug prompt when you plug into your Mac

3. In Android Studio top toolbar, your phone should appear in the device picker.

4. Click the green **▶ Run 'app'** button. App builds and installs on your phone.

**No 7-day expiry on Android** — sideloaded apps work indefinitely.

To distribute on Google Play, you'll need:
- $25 one-time Google Play Developer account at https://play.google.com/console
- Build a signed `.aab` (Android App Bundle) — Android Studio: Build → Generate Signed Bundle
- Upload to Play Console + fill out store listing

---

## 🔧 Updating the app after code changes

After any change to the website code, run:
```bash
cd ~/claudecode/karama-pantry-web
npm run build         # rebuild web bundle
npx cap sync          # copy bundle into iOS + Android projects
```

Then re-run the app from Xcode / Android Studio. No App Store review needed during development.

When you eventually publish to App Store / Play Store, use:
- **iOS:** Xcode → Product → Archive → Distribute App
- **Android:** Android Studio → Build → Generate Signed Bundle / APK

---

## 📱 Push notifications (later)

Push notifications require:
- Firebase Cloud Messaging account (free)
- Add `@capacitor/push-notifications` plugin
- Some backend code to send notifications

Easy to add when you're ready. ~2 hours of setup.

---

## What's the difference between PWA and native app?

| | PWA | Native |
|---|---|---|
| Install method | Browser → "Add to Home Screen" | App Store / Play Store / sideload |
| Cost | $0 | $99/yr (Apple) + $25 once (Google) |
| App Store presence | ❌ Not in App Store | ✅ Searchable, ratings, reviews |
| Updates | Instant (no review) | 1–7 day review per update |
| Push notifications | iOS limited, Android works | Full support both |
| Camera/biometric/share | Limited | Full native access |
| Trust/legitimacy | Less obvious | More official feel |

**Recommendation:** PWA is great for now (free, instant). Native app is worth it once you're getting steady customers and want App Store credibility + push notifications.
