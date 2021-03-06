# Firebase와 CRA를 활용한 트위터 클론 앱

#### 소개

![simulate](https://user-images.githubusercontent.com/58724686/111955184-85877100-8b2c-11eb-9273-e757bea079db.gif)

#### 사용 기술

-   [firebase](https://firebase.google.com/)
-   [react](https://reactjs.org/)

#### 주요 기능

-   구글, 깃허브 소셜 로그인
-   프로필 생성 및 수정
-   리얼 타임 트윗 CRUD 및 이미지 업로드

#### 배포

-   [사이트](https://DevYuns.github.io/twitter-clone)

#### 설치

```
npm install && npm start
// or
yarn && yarn start
```

### 구조

```text
app/
├─ node_modules/
├─ public/
├─ src/
│  └─ components/
│     └─ App.js
│     └─ AuthFrom.js
│     └─ Navigation.js
│     └─ Nweet.js
│     └─ NweetFactory.js
│     └─ Router.js
│  └─ routes/
│     └─ Auth.js
│     └─ Home.js
│     └─ Profile.js
│  └─ fbInstance.js
│  └─ index.js
│  └─ styles.css
├─ .eslintrc.json
├─ .prettierrc.json
├─ .gitignore
├─ package.json
├─ package-lock.json
├─ README.md
├─ jsconfig.json
└─ yarn.lock
```
