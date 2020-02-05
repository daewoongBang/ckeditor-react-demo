import React from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';

// NOTE: Use the editor from source (not a build)!
// 설치되어 있다면 삭제 (yarn remove @ckeditor/ckeditor5-build-classic)
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Font from '@ckeditor/ckeditor5-font/src/font';

const editorConfiguration = {
  plugins: [Essentials, Bold, Italic, Paragraph, Font],
  toolbar: [
    'bold',
    'italic',
    '|',
    'fontSize',
    'fontColor',
    'fontBackgroundColor'
  ]
};

const Editor = () => {
  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        data='<p>Hello World! CKEditor!</p>'
        onInit={editor => {
          // editor를 저장해서 원할 때 쓸 수 있다.
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log({ event, editor, data });
        }}
        onBlur={(event, editor) => {
          console.log('Blur', editor);
        }}
        onFocus={(event, editor) => {
          console.log('Focus', editor);
        }}
        //   language: 'de',
        //   ckfinder: {
        //     // Upload the images to the server using the CKFinder QuickUpload command
        //     // You have to change this address to your server that has the ckfinder php connector
        //     uploadUrl:
        //       'https://example.com/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images&responseType=json'
        //   }
        config={editorConfiguration}
      />
    </div>
  );
};

export default Editor;
