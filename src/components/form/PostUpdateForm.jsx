/* eslint-disable */
import * as React from "react";
import { Button, Grid, CheckboxField, TextField, VisuallyHidden } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "../../ui-components/utils";
import { generateClient } from "aws-amplify/api";
import ImageUploader from './ImageUploader'
import { getPost } from "../../graphql/queries";
import { updatePost, createPost } from "../../graphql/mutations";
import { XMarkIcon } from '@heroicons/react/24/outline'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Cache } from 'aws-amplify/utils';

const client = generateClient();
export default function PostUpdateForm(props) {
  const {
    id: idProp,
    post: postModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    setEditor,
    setStatus,
    username,
    blogList,
    ...rest
  } = props;
  const initialValues = {
    title: "",
    body: "",
    image: "",
    postId: "",
    profileId: "",
    blogs: []
  };
  const [title, setTitle] = React.useState(initialValues.title);
  const [body, setBody] = React.useState(initialValues.body);
  const [image, setImage] = React.useState(initialValues.image);
  const [postId, setPostId] = React.useState(initialValues.postId);
  const [profileId, setProfileId] = React.useState(initialValues.profileId);
  const [tags, setTags] = React.useState(initialValues.tags);
  const [imageFile, setImageFile] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = postRecord
      ? { ...initialValues, ...postRecord }
      : initialValues;
    setTitle(cleanValues.title);
    setBody(cleanValues.body);
    setImage(cleanValues.image);
    setPostId(cleanValues.postId);
    setProfileId(cleanValues.profileId);
    setTags(cleanValues.tags);
    setErrors({});
  };
  const [postRecord, setPostRecord] = React.useState(postModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getPost.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getPost
        : postModelProp;
      setPostRecord(record);
    };
    queryData();
  }, [idProp, postModelProp]);
  React.useEffect(resetStateValues, [postRecord]);
  const validations = {
    title: [{ type: "Required" }],
    body: [],
    image: [],
    postId: [],
    profileId: [],
    tags: []
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };

  return (
    <div className="fixed w-full h-full z-50 bg-black bg-opacity-80 top-0 left-0 p-8 overflow-y-scroll">
      <div className=" relative w-full max-w-3xl mx-auto p-4 bg-white rounded" >
        <h3 className="font-bebas text-lg text-red-700 font-bold w-full inline-block pb-1 mb-1 border-b border-b-black">{idProp ? 'Edit Post' : 'Create Post'}</h3>
        <button className="absolute right-2 top-2 block w-8 h-8 text-black hover:text-red-700 bg-white rounded-full" onClick={(e) => setEditor(false)}><XMarkIcon/></button>
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          title,
          body: body ?? null,
          image: image ?? null,
          postId: postId ?? null,
          profileId: profileId ?? null,
          tags: tags ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = (key === 'profileId') ? username : null;
            }
          });
          
          if (postRecord) {
            await client.graphql({
              query: updatePost.replaceAll("__typename", ""),
              variables: {
                input: {
                  id: postRecord.id,
                  ...modelFields,
                },
              },
            });
          } else {
            await client.graphql({
              query: createPost.replaceAll("__typename", ""),
              variables: {
                input: {
                  ...modelFields,
                },
              },
            });
          }
          Cache.removeItem('posts');
          setStatus('refresh');
          setEditor(false);

        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "PostUpdateForm")}
      {...rest}
    >
      <TextField
        label="Title"
        isRequired={true}
        isReadOnly={false}
        value={title}
        onChange={(e) => {
          let { value } = e.target;
          if (errors.title?.hasError) {
            runValidationTasks("title", value);
          }
          if(!idProp){
            setPostId(value.toString().toLowerCase().trim().replace(/[^A-Za-z0-9-]/g, '-'))
          }
          setTitle(value);
        }}
        onBlur={() => runValidationTasks("title", title)}
        errorMessage={errors.title?.errorMessage}
        hasError={errors.title?.hasError}
        {...getOverrideProps(overrides, "title")}
      ></TextField>

      <ImageUploader id={idProp} image={image} setImage={setImage}/>

      {blogList &&
      <div className="amplify-flex amplify-field amplify-textfield">
        <h4 className="amplify-label">Tags</h4>
        {blogList.map(blog =>
          <CheckboxField
            key={blog.name}
            value={blog.blogId}
            label={blog.name}
            checked={tags && tags.includes(blog.blogId)}
            onChange={(e) => {
              let {value} = e.target;
              let newTags = [];
              if (e.target.checked){  
                newTags = tags ? [...tags, value] : [value];
              }else{
                newTags = tags && tags.filter(tag => tag != value);
              }
              setTags(newTags);
            }}
          />
        )}
      </div>
      }
      <div className="amplify-flex amplify-field amplify-textfield">
        <h4 className="amplify-label">Body</h4>
        <ReactQuill 
          theme="snow" 
          value={body} 
          onChange={setBody} />
      </div>
      <VisuallyHidden>
        <TextField
          label="Post id"
          isRequired={false}
          isReadOnly={true}
          value={postId}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.postId?.hasError) {
              runValidationTasks("postId", value);
            }
            setPostId(value);
          }}
          onBlur={() => runValidationTasks("postId", postId)}
          errorMessage={errors.postId?.errorMessage}
          hasError={errors.postId?.hasError}
          {...getOverrideProps(overrides, "postId")}
        ></TextField>
        <TextField
          label="Profile id"
          isRequired={false}
          isReadOnly={false}
          value={profileId}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.profileId?.hasError) {
              runValidationTasks("profileId", value);
            }
            setProfileId(value);
          }}
          onBlur={() => runValidationTasks("profileId", profileId)}
          errorMessage={errors.profileId?.errorMessage}
          hasError={errors.profileId?.hasError}
          {...getOverrideProps(overrides, "profileId")}
        ></TextField>
      </VisuallyHidden>
      <div className="clear-both w-full pt-6 text-center">
          <Button
            className="w-full max-w-sm mx-auto"
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
      </div>
    </Grid>
    </div>
    </div>
  );
}
