# android 버전수정
android -> app -> build.gradle -> versionCode 101~ / versionName "1.0.1"
Check.js 361번째줄 수정
Splash.js 128번째줄 수정

## android 앱 이름 수정
android/app/src/main/res/values/strings.xml  
<resources>
	<string name="app_name">새로운 앱 이름</string>
</resources>

# APK 추출
	$ cd android
	$ ./gradlew assembleRelease

    -> Loger_RN_ytt\android\app\build\outputs\apk\release : apk파일 만들어짐

# APK 인스톨
핸드폰 연결 후 adb devices 쳐서 나오나 확인하고  
adb install -r ./app/build/outputs/apk/release/app-release.apk  
release모드 잘 된거 확인 후 aab뽑기


# AAB 추출  
	$ cd android  
	$ ./gradlew bundleRelease  


react-native bundle --platform android --dev false --entry-file index.js \  
--bundle-output android/app/src/main/assets/index.bundle \  
--assets-dest android/app/src/main/res/  


- release에서 통신 잘 안되면 android:usesCleartextTraffic="true" 해보기!