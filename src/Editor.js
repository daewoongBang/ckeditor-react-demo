import React from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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
          language: 'de',
          ckfinder: {
            // Upload the images to the server using the CKFinder QuickUpload command
            // You have to change this address to your server that has the ckfinder php connector
            uploadUrl:
              'https://example.com/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images&responseType=json'
          }
        }}
      />
    </div>
  );
};

export default Editor;
