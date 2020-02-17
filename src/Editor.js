import React from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';

// NOTE: Use the editor from source (not a build)!
// 설치되어 있다면 삭제 (yarn remove @ckeditor/ckeditor5-build-classic)
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Font from '@ckeditor/ckeditor5-font/src/font';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
import Clipboard from '@ckeditor/ckeditor5-clipboard/src/clipboard';

const editorConfiguration = {
  plugins: [
    Essentials,
    Paragraph,
    Heading,
    Bold,
    Italic,
    Font,
    Link,
    List,
    Image,
    ImageUpload,
    CKFinder,
    Clipboard
  ],
  toolbar: [
    'heading',
    '|',
    'bold',
    'italic',
    'link',
    'bulletedList',
    'numberedList',
    '|',
    'fontSize',
    'fontColor',
    'fontBackgroundColor',
    '|',
    'imageUpload',
    'ckfinder'
  ],
  ckfinder: {
    // Upload the images to the server using the CKFinder QuickUpload command.
    uploadUrl: 'http://localhost:8080//file_upload',
    headers: []
  }
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
          // drag & drop 방지
          editor.editing.view.document.on(
            'drop',
            (evt, data) => {
              evt.stop();
              data.preventDefault();
            },
            { priority: 'high' }
          );
          editor.editing.view.document.on(
            'dragover',
            (evt, data) => {
              evt.stop();
              data.preventDefault();
            },
            { priority: 'high' }
          );
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
        config={editorConfiguration}
      />
    </div>
  );
};

export default Editor;
