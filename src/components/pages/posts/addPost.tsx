import React, { useState } from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
import axiosFetch from '@/api/axios';
import Button from '../../cubes/Button';
import TextField from '../../cubes/TextField';
import { toast } from 'react-toastify';

const AddInstagramPostForm = () => {
  const [images, setImages] = useState<File[]>([]);
  const [caption, setCaption] = useState('');
  const [isPending, setIsPending] = useState(false);
  const handleImagesChange = (files: File[]) => {
    setImages(files);
  };

  const addInstagramPost = async (data: FormData) => {
      try {
        const res = await axiosFetch.post('/posts', data);
        setIsPending(false);
        toast.success(res.data.message)
        return res.data;
      } catch (err: any) {
        setIsPending(false);
        toast.error(err.response.data.message)
        throw new Error(err.response.data.message);
      }
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsPending(true);
    const formData = new FormData();
    images.forEach((image) => formData.append('images', image));
    formData.append('caption', caption);

    try {
      await addInstagramPost(formData);
      // handle success
    } catch (err:any) {
      // handle error
      toast.error(err.response.data.message)
    }
    };  
    
  

  

  return (
    <form  className='flex flex-col' >
      { isPending && <div className='bg-neutral-500 z-50 opacity-75 fixed bottom-0 left-0 h-screen w-screen'></div>} 
      <DropzoneArea
        acceptedFiles={['image/*,.mp4,.mkv,.avi']}
        dropzoneText='فایل های پست رو انتخاب کنید'
        getFileAddedMessage={(name) => 'فایل اضافه شد' + name}
        maxFileSize={10000000}
        filesLimit={10}
        onChange={handleImagesChange}
      />
      <TextField className='py-2 px-3 rounded mt-3 ' placeholder='کپشن رو وارد کنید.'  onChange={setCaption} isTextArea/>
      <Button disabled={isPending} onClick={handleSubmit} className='py-3 px-5 mt-3 rounded-lg bg-green-500' type='submit'>
        <p>بارگزاری</p>
      </Button>
    </form>
  );
};

export default AddInstagramPostForm;
