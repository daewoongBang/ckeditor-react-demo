# CKEditor React Demo

### Quick Start

아래 명령으로 기본적인 classic Editor를 import 하여 사용할 수 있다.

```
yarn add @ckeditor/ckeditor5-react @ckeditor/ckeditor5-build-classic
```

classic만으로도 Editor 기본 사용은 가능하지만 커스텀하여 사용하려면 webpack 설정 변경과 필요한 기능들을 모두 설치하여 import 해야 한다.

### Install Custom Editor

CKEditor를 custom하여 사용하려면 플러그인을 추가하거나 수정할 때마다 CKEditor를 다시 빌드해야한다. Editor의 재빌드 과정 없이 리액트 Application 코드와 유기적으로 통합시키려면 설정파일을 추출해서 몇 가지 환경설정을 변경해주어야 한다.(**create react-app** 기준)  
즉 Custom Editor를 사용하려면 webpack 설정 변경과 기본 제공되던 플러그인들도 모두 설치 후 import 하여 사용해야 한다.

webpack 설정을 변경하기 위해서 설정파일을 추출한다.

```
yarn eject
yarn add @babel/plugin-transform-react-jsx @babel/plugin-transform-react-jsx-self
```

필요한 몇 가지 기본 dependencies 설치.

```
yarn add \
    raw-loader@3 \
    @ckeditor/ckeditor5-dev-utils \
    @ckeditor/ckeditor5-theme-lark \
    @ckeditor/ckeditor5-react \
    @ckeditor/ckeditor5-editor-classic \
    @ckeditor/ckeditor5-essentials \
    @ckeditor/ckeditor5-paragraph \
    @ckeditor/ckeditor5-basic-styles
```

**config/webpack.config.js 수정**

1. PostCSS에 대한 구성을 생성하는 객체를 가져오는 코드 추가.

```javascript
const { styles } = require('@ckeditor/ckeditor5-dev-utils');
```

2. `module.rules`에 두 개의 새 요소를 추가한다. CKEditor 5 source를 처리하는데 필요한 SVG와 CSS loader이다.

```javascript
{
    test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
    use: [ 'raw-loader' ]
},
{
    test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
    use: [
        {
            loader: 'style-loader',
            options: {
                injectType: 'singletonStyleTag'
            }
        },
        {
            loader: 'postcss-loader',
            options: styles.getPostCssConfig( {
                themeImporter: {
                    themePath: require.resolve( '@ckeditor/ckeditor5-theme-lark' )
                },
                minify: true
            } )
        }
    ]
}
```

3. CKEditor 5가 사용하는 CSS 파일을 프로젝트의 CSS 로더에서 제외해야 한다. (웹에는 css 적용안되게 하기 위해서)  
   `test: cssRegex` 의 exclude 부분 수정

```javascript
{
    test: cssRegex,
    exclude: [
        cssModuleRegex,
        /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
    ],
    // (...)
}
```

바로 아래에 있는 `test: cssModuleRegex` 부분도 수정

```javascript
{
    test: cssModuleRegex,
    exclude: [
        /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
    ],
    // (...)
}
```

4. 마지막으로 CKEditor 5 SVG 와 CSS 파일들을 file-loader 로부터 제외시킨다.  
   module.rules 배열의 `loader: require.resolve('file-loader')`에서 exclude부분을 다음과 같이 수정한다.

```javascript
{
    loader: require.resolve( 'file-loader' ),
    // Exclude `js` files to keep the "css" loader working as it injects
    // its runtime that would otherwise be processed through the "file" loader.
    // Also exclude `html` and `json` extensions so they get processed
    // by webpack's internal loaders.
    exclude: [
        /\.(js|mjs|jsx|ts|tsx)$/,
        /\.html$/,
        /\.json$/,
        /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
        /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/
    ],
    options: {
        name: 'static/media/[name].[hash:8].[ext]',
    }
}
```

### Features

**Essentials**  
`@ckeditor/ckeditor5-essentials`  
Essentials은 다음과 같은 필수 편집 기능을 포함하고 있는 plugin

- Clipboard,
- Enter,
- ShiftEnter,
- Typing,
- Undo.

**Heading**  
`@ckeditor/ckeditor5-heading`
헤더 관련 plugin

**Font**  
`@ckeditor/ckeditor5-font`
Font 관련 plugin

- FontFamily
- FontSize
- FontColor
- FontBackgroundColor

<hr>

**reference:**

- CKEditor Doc  
  <https://ckeditor.com/docs/ckeditor5/latest/features/index.html>
