import axios from 'axios';
import React, { useContext, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { useForm } from 'react-hook-form';
import { Bounce, toast } from 'react-toastify';
import { UserContext } from '../context/UserContext';
import Loader from '../custom/Loader';

export default function ImageArea({user}) {

    const {register,handleSubmit,formState:{errors}} = useForm();
    const [imagePreview,setImagePreview] = useState(null);
    const [isLoading,setIsLoading] = useState(false);

    const updateImage = async (data)=>{
        const token = localStorage.getItem('userToken');
        const formData = new FormData();
        formData.append("image",data.image[0]);
        setIsLoading(true);
        try{
            const response = await axios.put(`${import.meta.env.VITE_BURL}/user/update-image`,formData,{
                headers:{
                    Authorization:`Tariq__${token}`
                }
            });
            if(response.status==200){
              toast.success(`image updated successfully`,{
                position:"top-right",
                autoClose:4000,
                hideProgressBar:false,
                closeOnClick:true,
                pauseOnHover:true,
                draggable:true,
                theme:"dark",
                transition:Bounce,
              });
            }
        }catch(error){
            toast.error(error,{
                position:"top-right",
                autoClose:4000,
                hideProgressBar:false,
                closeOnClick:true,
                pauseOnHover:true,
                draggable:true,
                theme:"dark",
                transition:Bounce,
              });
        }finally{
            setIsLoading(false);
        }
    }
    const handleImageChange = (event)=>{
        const file = event.target.files[0];
        setImagePreview(URL.createObjectURL(file));
    }
    if(isLoading){
       return <Loader/>
    }
  return (
    <div>
        <Form onSubmit={handleSubmit(updateImage)} encType='multipart/form-data'>

            <div className='d-flex gap-5 py-4'>
            <div>
            {imagePreview ? <img src={imagePreview} width={300} height={300}/> : <img src={user.image.secure_url} width={300} height={300}/>}
            </div>
            <div>
            <Form.Group controlId='updateImage' >
                <Form.Label className='py-1'>change profile picture</Form.Label>
                <Form.Control className='my-3' type='file' {...register('image')} onChange={handleImageChange}></Form.Control>
            </Form.Group>
            <Button type='submit'>update</Button>
            </div>
            </div>

        </Form>
      
    </div>
  )
}
