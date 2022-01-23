# AlignedMobile

## Environment Setup
1. Install react native
    
    `npm install -g react-native-cli`
    
    `npm install -g react-native`
    
1. Initialize project directory

    `react-native init AlignedMobile`
    
1. Connect to the GitHub
    1. `git init`
    1. `git remote add origin https://github.com/nmark00/AlignedMobile.git`
    1. `git branch -M main`
    1. `git pull`
    1. `npm install`


4. FOR iOS:
    1. Download GoogleService-Info.plist from Firebase
    2. Copy plist file into `/ios` folder
    
    3. `cd` into `/ios` and edit `AlignedMobile/AppDelegate.m`
        
        Add to the top of file:
        
        `#import <Firebase.h>`
        
        Then find code:
        
        ```
        - (BOOL)application:(UIApplication *)application
            didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
          [FIRApp configure]; // ADD THIS LINE HERE
          ...
        }
        ```
    4. Then run `pod install`
    
1. Go to main directory and start app with `npx react-native run-ios`


Notes:

In node_modules/react-native-gifted-chat/lib/MessageContainer.js, do the following:
```
this.attachKeyboardListeners = () => {
    const { invertibleScrollViewProps: invertibleProps } = this.props;
    if (invertibleProps) {
-        Keyboard.addListener('keyboardWillShow', invertibleProps.onKeyboardWillShow);
-        Keyboard.addListener('keyboardDidShow', invertibleProps.onKeyboardDidShow);
-        Keyboard.addListener('keyboardWillHide', invertibleProps.onKeyboardWillHide);
-        Keyboard.addListener('keyboardDidHide', invertibleProps.onKeyboardDidHide);
+        this.willShowSub = Keyboard.addListener('keyboardWillShow', invertibleProps.onKeyboardWillShow);
+        this.didShowSub = Keyboard.addListener('keyboardDidShow', invertibleProps.onKeyboardDidShow);
+        this.willHideSub = Keyboard.addListener('keyboardWillHide', invertibleProps.onKeyboardWillHide);
+        this.didHideSub = Keyboard.addListener('keyboardDidHide', invertibleProps.onKeyboardDidHide);
    }
};
this.detachKeyboardListeners = () => {
    const { invertibleScrollViewProps: invertibleProps } = this.props;
-    Keyboard.removeListener('keyboardWillShow', invertibleProps.onKeyboardWillShow);
-    Keyboard.removeListener('keyboardDidShow', invertibleProps.onKeyboardDidShow);
-    Keyboard.removeListener('keyboardWillHide', invertibleProps.onKeyboardWillHide);
-    Keyboard.removeListener('keyboardDidHide', invertibleProps.onKeyboardDidHide);
+    this.willShowSub?.remove();
+    this.didShowSub?.remove();
+    this.willHideSub?.remove();
+    this.didHideSub?.remove();
};

```