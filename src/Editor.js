import React from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Font from '@ckeditor/ckeditor5-font/src/font';

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
        config={{
          plugins: [Font],
          toolbar: ['fontSize', 'fontColor', 'FontBackgroundColor'],
          fontSize: {
            options: [
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              16,
              17,
              18,
              19,
              20,
              21,
              23,
              25,
              27,
              29,
              31,
              33,
              35
            ]
          }
          //   language: 'de',
          //   ckfinder: {
          //     // Upload the images to the server using the CKFinder QuickUpload command
          //     // You have to change this address to your server that has the ckfinder php connector
          //     uploadUrl:
          //       'https://example.com/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images&responseType=json'
          //   }
        }}
      />
    </div>
  );
};

export default Editor;
