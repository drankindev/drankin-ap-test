/* eslint-disable */
import * as React from "react";
import { Button, Grid, TextAreaField } from "@aws-amplify/ui-react";
import ImageUploader from './ImageUploader'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { updateUserAttributes } from 'aws-amplify/auth';

export default function ProfileUpdateForm(props) {
    const {
        user,
        onSuccess,
        onError,
        onSubmit,
        onValidate,
        onChange,
        overrides,
        setEditor,
        setStatus,
        userAttributes,
        setUserAttributes,
        ...rest
    } = props;
    const [profile, setProfile] = React.useState(userAttributes.profile);
    const [image, setImage] = React.useState(userAttributes.picture);
    return (
        <div className="fixed w-full h-full z-50 bg-black bg-opacity-80 top-0 left-0 p-8 overflow-y-scroll">
            <div className=" relative w-full max-w-3xl mx-auto p-4 bg-white rounded" >
                <h3 className="font-bebas text-lg text-red-700 font-bold w-full inline-block pb-1 mb-1 border-b border-b-black">Edit Profile</h3>
                <button className="absolute right-2 top-2 block w-8 h-8 text-black hover:text-red-700 bg-white rounded-full" onClick={(e) => setEditor(false)}><XMarkIcon/></button>
            
                <Grid
                    as="form"
                    rowGap="15px"
                    columnGap="15px"
                    padding="20px"
                    onSubmit={async (event) => {
                        event.preventDefault();  
                        let modelFields = {
                            picture: image ?? null,
                            profile: profile ?? null
                        };
                        try {
                            const attributes = await updateUserAttributes({
                                userAttributes: {
                                    ...modelFields
                                },
                            });
                            setUserAttributes({
                                ...userAttributes,
                                ...modelFields
                            })
                            setEditor(false);
                        } catch (err) {
                            console.log(err)
                            if (onError) {
                                const messages = err.errors.map((e) => e.message).join("\n");
                                onError(modelFields, messages);
                            }
                        }
                    }}
                >

                    <ImageUploader id={user.username} image={image} setImage={setImage}/>  
                
                    <TextAreaField 
                        label={"Profile"}
                        value={profile} 
                        onChange={(e) => {
                            let {value} = e.target;
                            setProfile(value);
                        }} />

                    <div className="clear-both w-full pt-6 text-center">
                        <Button
                            className="w-full max-w-sm mx-auto"
                            children="Submit"
                            type="submit"
                            variation="primary"
                        ></Button>
                    </div>
                </Grid>
            </div>
        </div>
    );
}
