/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField, TextAreaField, VisuallyHidden } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "../../ui-components/utils";
import { generateClient } from "aws-amplify/api";
import { createComment } from "../../graphql/mutations";
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'

const client = generateClient();
export default function CommentCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    user,
    targetPost,
    ...rest
  } = props;
  const initialValues = {
    content: "",
    profileId: "",
  };
  const [content, setContent] = React.useState(initialValues.content);
  const [profileId, setProfileId] = React.useState(user.username);
  const [toggle, setToggle] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setContent(initialValues.content);
    setToggle(false);
    setErrors({});
  };
  const validations = {
    content: [{ type: "Required" }],
    profileId: []
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
    <div className="border-t border-t-black">
      <button className="text-bold relative text-left w-full py-2 bg-white hover:bg-gray-100 border-b border-b-black" 
        onClick={(e) => setToggle(!toggle)}
        >
        Post a comment
        {toggle ?
          <ChevronUpIcon className="w-4 h-4 absolute right-0 top-3 text-gray-400"/>
        :
          <ChevronDownIcon className="w-4 h-4 absolute right-0 top-3 text-gray-400"/>
        }
      </button>
      <div className={`transition-[height] overflow-hidden ${toggle ? 'h-52' : 'h-0'}`}>
    <Grid
      as="form"
      rowGap=""
      columnGap="15px"
      padding="10px 20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          content,
          profileId
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
              modelFields[key] = null;
            }
          });
          const create = await client.graphql({
            query: createComment,
            variables: {
              input: {
                ...modelFields,
                postCommentsId: targetPost.id
              },
            },
          });
          
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
            const messages = err.errors.map((e) => e.message).join("\n");
            console.log(err)
        }
      }}
      {...getOverrideProps(overrides, "CommentCreateForm")}
      {...rest}
    >
      <TextAreaField
        isRequired={true}
        isReadOnly={false}
        value={content}
        maxLength={200}
        onChange={(e) => {
          let { value } = e.target;
          if (errors.content?.hasError) {
            runValidationTasks("content", value);
          }
          setContent(value);
        }}
        onBlur={() => runValidationTasks("content", content)}
        errorMessage={errors.content?.errorMessage}
        hasError={errors.content?.hasError}
        {...getOverrideProps(overrides, "content")}
      ></TextAreaField>

      <VisuallyHidden>
      <TextField
        label="Profile id"
        isRequired={false}
        isReadOnly={true}
        value={profileId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              content,
              profileId: value,
            };
            const result = onChange(modelFields);
            value = result?.profileId ?? value;
          }
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
      <div className="flex gap-4 mt-4 w-full justify-end">
          <Button
            children="Cancel"
            type="reset"
            onClick={(event) => {
              event.preventDefault();
              resetStateValues();
            }}
            {...getOverrideProps(overrides, "ClearButton")}
          ></Button>
          <Button
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
