import * as React from "react";
import { uploadData, getUrl, list, remove } from 'aws-amplify/storage';
import { TrashIcon } from '@heroicons/react/24/outline'

const ImageUploader = ({id, image, setImage}) => {
    const [imageUrl, setImageUrl] = React.useState('');
    const [status, setStatus] = React.useState('init');
    const [error, setError] = React.useState('');
    const [filename, setFilename] = React.useState(image);
    const fileInputRef = React.useRef();
    const extCheck = ['.jpg','.png'];
    const sizeCheck = 1000000;

    React.useEffect(() => {
      if (image) { setStatus('loading');}
      setFilename(image);
    },[image]);
    
    React.useEffect(() => {
      const validateImage = async () => {
        try {
          const validUrl = await list({
            prefix: filename
          });
          if (validUrl.items.length > 0) {
            setStatus('loading');
            const res = await getUrl({
              key: filename,
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

      if(filename && (status === 'upload' || status === 'loading')) {
        const interval = setInterval(() => {
          validateImage();
        }, 3000);
        return () => clearInterval(interval); 
      }
    }, [filename,status]);

    const uploadDataInBrowser = async (event) => {
      if (event?.target?.files) {
        const file = event.target.files[0];
        if (!file) { return false }
        
        const ext = file.name.toLowerCase().substring(file.name.length - 4);
        const size = file.size;
        const newFileName =  id ? id : 'tmp-'+ (Math.random() * 100000);
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

          await uploadData({
            key: newFileName,
            data: file,
            options: {
              accessLevel: 'public'
            }
          });
          setStatus('upload');
          setFilename(newFileName);
          setImage(newFileName);
        } catch (error) {
          console.log('Error : ', error);
        }
      }
    };

    const deleteImage = async (event) => {
      try {
        setImageUrl('');
        setImage('');
        await remove({ key: filename, options: { accessLevel: 'public' } });
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
              {(status === 'upload' || status === 'loading') ? 
                <div className="w-44 rounded border bg-white text-sm text-grey-300 inline-block text-center py-16">
                  Loading...
                </div>
              :
                <>
                <div className="w-44 rounded border bg-white cursor-pointer text-sm text-grey-300 inline-block text-center py-16" 
                onClick={() => fileInputRef.current.click()}>
                  Click to Upload
                  <input 
                    className="hidden" 
                    type="file" 
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

