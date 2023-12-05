import * as React from "react";
import { generateClient } from "aws-amplify/api";
import { uploadData, getUrl, list, remove } from 'aws-amplify/storage';
import { TrashIcon } from '@heroicons/react/24/outline'

const client = generateClient();

const ImageUploader = ({id}) => {
    const [imageUrl, setImageUrl] = React.useState('');
    const [status, setStatus] = React.useState('init');
    const [error, setError] = React.useState('');
    const fileInputRef = React.useRef();
    const extCheck = ['.jpg','.png'];
    const sizeCheck = 1000000;

    React.useEffect(() => {
      const validateImage = async (postId) => {
        try {
          const validUrl = await list({
            prefix: id
          });
          if (validUrl.items.length > 0) {
            const res = await getUrl({
              key: id,
              options: {
                accessLevel: 'public',
              }
            });
            setImageUrl(res.url.toString());
            setStatus('loaded');
          }
        } catch (err) {
          console.log('error',err);
          setStatus('idle');
        }
    }

    if(status === 'upload' || status === 'init') {
        const interval = setInterval(() => {
          validateImage();
        }, 3000);
        return () => clearInterval(interval); 
      }
    }, [id,status]);

    const uploadDataInBrowser = async (event) => {
      if (event?.target?.files) {
        const file = event.target.files[0];
        if (!file) { return false }
        
        const ext = file.name.toLowerCase().substring(file.name.length - 4);
        const size = file.size;
        console.log(ext + ' ' + !extCheck.includes(ext))
        if ( extCheck.includes(ext) !== true ) { 
          setError('Only .jpg or .png');
          return false;
        }
        if ( size > sizeCheck) { 
          setError('Only files under 1MB');
          return false;
        }
        setError('');
        try {
          const result = await uploadData({
            key: id,
            data: file,
            options: {
              accessLevel: 'public'
            }
          }).result;
          console.log('Succeeded: ', result);
          setStatus('upload');
        } catch (error) {
          console.log('Error : ', error);
        }
      }
    };

    const deleteImage = async (event) => {
      try {
        setImageUrl('');
        await remove({ key: id, options: { accessLevel: 'public' } });
      } catch (error) {
        console.log('Error ', error);
      }
    }

    return (
      <div className="amplify-flex amplify-field amplify-textfield">
        <h4 className="amplify-label">Image</h4>
          {imageUrl ?
            <div className="relative border rounded w-44">
              <button className="absolute -top-4 -right-4 rounded-full text-white w-8 h-8 p-1 bg-red-700 hover:bg-black" onClick={() => deleteImage()} title="edit"><TrashIcon className="w-6 h-6"/></button>
              <img className="w-full h-auto" src={imageUrl} alt="Uploaded"/>
            </div>
          :
            <>
              {(status === 'upload') ? 
                <div className="w-44 rounded border bg-white text-sm text-grey-300 inline-block text-center py-16">
                  Uploading...
                </div>
              :
                <>
                <div className="w-44 rounded border bg-white cursor-pointer text-sm text-grey-300 inline-block text-center py-16" 
                onClick={() => fileInputRef.current.click()}>
                  Click to Upload
                  <input 
                    className="hidden" 
                    type="file" 
                    filename={id} 
                    ref={fileInputRef} 
                    onChange={(e) => {
                      uploadDataInBrowser(e)
                    }
                  } />
                </div>
                { error && <p className="text-red-700 text-xs">{error}</p>}
                </>
              }
            </>
        }
        
      </div>
    )

}

export default ImageUploader;

